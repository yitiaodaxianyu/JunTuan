
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
        _this.btnNext = null; //下一关按钮
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
                    this.btnNext.active = false;
                    this.showMainReward();
                }
                break;
            case Constants_1.GameMode.Endless:
                {
                    this.btnNext.active = true;
                    this.showEndlessReward();
                    //BattlePassManager.addTodayTaskProgress(BattlePassTask.Endless);
                }
                break;
            case Constants_1.GameMode.Boss_Challenge:
                {
                    this.btnNext.active = false;
                    this.showBossChallengeReward();
                    //BattlePassManager.addTodayTaskProgress(BattlePassTask.Boss);
                }
                break;
            case Constants_1.GameMode.Tower:
                {
                    this.btnNext.active = false;
                    this.showTowerReward();
                    //BattlePassManager.addTodayTaskProgress(BattlePassTask.Tower3);
                }
                break;
            case Constants_1.GameMode.Maze:
                {
                    this.btnNext.active = true;
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
    __decorate([
        property(cc.Node)
    ], GameWin.prototype, "btnNext", void 0);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0c1xcR2FtZVxcVWlcXEdhbWVXaW4udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQ0EsMkRBQXNFO0FBQ3RFLDhEQUFvRTtBQUNwRSx3REFBOEQ7QUFDOUQsOERBQW9FO0FBQ3BFLDhEQUFvRTtBQUNwRSxpREFBNEM7QUFDNUMsNkNBQTJFO0FBQzNFLDRFQUFrRjtBQUNsRixpREFBNEM7QUFDNUMscURBQWdEO0FBQ2hELDJEQUEwRDtBQUMxRCx5REFBdUQ7QUFDdkQsa0RBQXdEO0FBRXhELDhEQUFvRTtBQUNwRSx1RUFBNkU7QUFDN0UseURBQXdEO0FBQ3hELHlEQUErRDtBQUMvRCwyREFBaUU7QUFFakUsc0RBQXFEO0FBRXJELHVFQUFrRTtBQUNsRSxtRUFBOEQ7QUFDOUQsMkVBQXNFO0FBQ3RFLHVFQUFrRTtBQUNsRSxpRUFBNEQ7QUFDNUQsb0RBQStDO0FBQy9DLHNEQUFxRDtBQUNyRCw2REFBd0Q7QUFDeEQsNkRBQXlEO0FBQ3pELCtEQUFpRTtBQUNqRSxnREFBK0M7QUFDL0Msc0RBQWlEO0FBQ2pELHFEQUEyRDtBQUMzRCx5REFBb0Q7QUFDcEQsdURBQTZEO0FBQzdELCtDQUEwQztBQUMxQyx5REFBb0Q7QUFDcEQscUVBQWdFO0FBQ2hFLG9EQUErQztBQUMvQyw4Q0FBeUQ7QUFDekQsZ0RBQStDO0FBQy9DLDJDQUFzQztBQUV0QyxzREFBaUQ7QUFHM0MsSUFBQSxLQUFzQixFQUFFLENBQUMsVUFBVSxFQUFsQyxPQUFPLGFBQUEsRUFBRSxRQUFRLGNBQWlCLENBQUM7QUFHMUM7SUFBcUMsMkJBQVc7SUFBaEQ7UUFBQSxxRUFvcENDO1FBanBDRyxnQkFBVSxHQUFXLElBQUksQ0FBQztRQUUxQixnQkFBVSxHQUFTLElBQUksQ0FBQztRQUV4QixhQUFhO1FBRWIsVUFBSSxHQUFXLEVBQUUsQ0FBQyxDQUFBLE1BQU07UUFFeEIsVUFBSSxHQUFXLEVBQUUsQ0FB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bGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbIlxyXG5pbXBvcnQgeyBIdHRwTWFuYWdlciwgQWNjZXNzTmFtZSB9IGZyb20gXCIuLi8uLi8uL05ldFdvcmsvSHR0cE1hbmFnZXJcIjtcclxuaW1wb3J0IHsgQm9zc0NoYWxsZW5nZU1hbmFnZXIgfSBmcm9tIFwiLi4vLi4vQWN0aXZpdHkvQm9zc0NoYWxsZW5nZVwiO1xyXG5pbXBvcnQgeyBCb3NzUmV3YXJkTWFuYWdlciB9IGZyb20gXCIuLi8uLi9BY3Rpdml0eS9Cb3NzUmV3YXJkXCI7XHJcbmltcG9ydCB7IEVuZGxlc3NMZXZlbHNNYW5hZ2VyIH0gZnJvbSBcIi4uLy4uL0FjdGl2aXR5L0VuZGxlc3NMZXZlbHNcIjtcclxuaW1wb3J0IHsgRW5kbGVzc1Jld2FyZE1hbmFnZXIgfSBmcm9tIFwiLi4vLi4vQWN0aXZpdHkvRW5kbGVzc1Jld2FyZFwiO1xyXG5pbXBvcnQgQWRNYW5hZ2VyIGZyb20gXCIuLi8uLi9BZHMvQWRNYW5hZ2VyXCI7XHJcbmltcG9ydCB7IEdhbWVNb2RlLCBHYW1lU2NlbmUsIEdvX1R5cGUsIFZJREVPX1RZUEUgfSBmcm9tIFwiLi4vLi4vQ29uc3RhbnRzXCI7XHJcbmltcG9ydCB7IFJvZ3VlSGV4YWdvblR5cGVzTWFuYWdlciB9IGZyb20gXCIuLi8uLi9jb3B5L3ZvaWRjcmFjay9Sb2d1ZUhleGFnb25UeXBlc1wiO1xyXG5pbXBvcnQgR2FtZU1hbmFnZXIgZnJvbSBcIi4uLy4uL0dhbWVNYW5hZ2VyXCI7XHJcbmltcG9ydCBNYXBNYW5hZ2VyIGZyb20gXCIuLi8uLi9HdWFKaS9NYXBNYW5hZ2VyXCI7XHJcbmltcG9ydCB7IEhlcm9NYW5hZ2VyIH0gZnJvbSBcIi4uLy4uL0hlcm8vRGF0YS9IZXJvTWFuYWdlclwiO1xyXG5pbXBvcnQgeyBIZXJvX1R5cGUgfSBmcm9tIFwiLi4vLi4vSGVyby9HYW1lL0hlcm9Db25maWdcIjtcclxuaW1wb3J0IHsgSmFja3BvdE1hbmFnZXIgfSBmcm9tIFwiLi4vLi4vSnNvbkRhdGEvSmFja3BvdFwiO1xyXG5pbXBvcnQgeyBSZXdhcmREYXRhIH0gZnJvbSBcIi4uLy4uL0pzb25EYXRhL0xldmVsSnNvbkRhdGFcIjtcclxuaW1wb3J0IHsgUGxheWVyTGV2ZWxVcE1hbmFnZXIgfSBmcm9tIFwiLi4vLi4vSnNvbkRhdGEvUGxheWVyTGV2ZWxVcFwiO1xyXG5pbXBvcnQgeyBGaXJzdENvbXBsZXRlUmV3YXJkTWFuYWdlciB9IGZyb20gXCIuLi8uLi9MZXZlbC9GaXJzdENvbXBsZXRlUmV3YXJkXCI7XHJcbmltcG9ydCB7IExldmVsTWFuYWdlciB9IGZyb20gXCIuLi8uLi9MZXZlbC9MZXZlbE1hbmFnZXJcIjtcclxuaW1wb3J0IHsgTWlzc2lvbkxldmVsTWFuYWdlciB9IGZyb20gXCIuLi8uLi9MZXZlbC9NaXNzaW9uTGV2ZWxcIjtcclxuaW1wb3J0IHsgVHV0b3JpYWxMZXZlbE1hbmFnZXIgfSBmcm9tIFwiLi4vLi4vTGV2ZWwvVHV0b3JpYWxMZXZlbFwiO1xyXG5pbXBvcnQgeyBSb2d1ZVJld2FyZE1hbmFnZXIgfSBmcm9tIFwiLi4vLi4vTWF6ZS9EYXRhL1JvZ3VlUmV3YXJkXCI7XHJcbmltcG9ydCB7IE1hemVNYW5hZ2VyIH0gZnJvbSBcIi4uLy4uL01hemUvTWF6ZU1hbmFnZXJcIjtcclxuaW1wb3J0IHsgTW9uc3RlckRhdGFNYW5hZ2VyIH0gZnJvbSBcIi4uLy4uL01vbnN0ZXIvRGF0YS9Nb25zdGVyRGF0YU1hbmFnZXJcIjtcclxuaW1wb3J0IHsgRm9sbG93X1R5cGUgfSBmcm9tIFwiLi4vLi4vbXVsdGlMYW5ndWFnZS9Gb2xsb3dDb25zdGFudHNcIjtcclxuaW1wb3J0IEZvbGxvd01hbmFnZXIgZnJvbSBcIi4uLy4uL211bHRpTGFuZ3VhZ2UvRm9sbG93TWFuYWdlclwiO1xyXG5pbXBvcnQgeyBMYW5ndWFnZUluZGV4IH0gZnJvbSBcIi4uLy4uL211bHRpTGFuZ3VhZ2UvTGFuZ3VhZ2VDb25zdGFudHNcIjtcclxuaW1wb3J0IExhbmd1YWdlTWFuYWdlciBmcm9tIFwiLi4vLi4vbXVsdGlMYW5ndWFnZS9MYW5ndWFnZU1hbmFnZXJcIjtcclxuaW1wb3J0IFRleHRMYW5ndWFnZSBmcm9tIFwiLi4vLi4vbXVsdGlMYW5ndWFnZS9UZXh0TGFuZ3VhZ2VcIjtcclxuaW1wb3J0IHsgUHJvcElkIH0gZnJvbSBcIi4uLy4uL1Byb3AvUHJvcENvbmZpZ1wiO1xyXG5pbXBvcnQgeyBQcm9wTWFuYWdlciB9IGZyb20gXCIuLi8uLi9Qcm9wL1Byb3BNYW5hZ2VyXCI7XHJcbmltcG9ydCB7IFNvdW5kSW5kZXggfSBmcm9tIFwiLi4vLi4vU291bmQvQXVkaW9Db25zdGFudHNcIjtcclxuaW1wb3J0IHsgU3RvcmFnZUtleSB9IGZyb20gXCIuLi8uLi9TdG9yYWdlL1N0b3JhZ2VDb25maWdcIjtcclxuaW1wb3J0IHsgVGhlU3RvcmFnZU1hbmFnZXIgfSBmcm9tIFwiLi4vLi4vU3RvcmFnZS9TdG9yYWdlTWFuYWdlclwiO1xyXG5pbXBvcnQgeyBUYXNrSXRlbSB9IGZyb20gXCIuLi8uLi9UYXNrL1Rhc2tFbnVtXCI7XHJcbmltcG9ydCBUYXNrTWFuYWdlciBmcm9tIFwiLi4vLi4vVGFzay9UYXNrTWFuYWdlclwiO1xyXG5pbXBvcnQgeyBUb3dlckxldmVsTWFuYWdlciB9IGZyb20gXCIuLi8uLi9Ub3dlci9Ub3dlckxldmVsXCI7XHJcbmltcG9ydCBUb3dlck1hbmFnZXIgZnJvbSBcIi4uLy4uL1Rvd2VyL1Rvd2VyTWFuYWdlclwiO1xyXG5pbXBvcnQgeyBUb3dlclJld2FyZE1hbmFnZXIgfSBmcm9tIFwiLi4vLi4vVG93ZXIvVG93ZXJSZXdhcmRcIjtcclxuaW1wb3J0IFRpbWVzIGZyb20gXCIuLi8uLi9UdXJudGFibGUvVGltZXNcIjtcclxuaW1wb3J0IFJld2FyZFNTVWkgZnJvbSBcIi4uLy4uL1R1dG9yaWFscy9SZXdhcmRTU1VpXCI7XHJcbmltcG9ydCBUdXRvcmFpbHNNYW5hZ2VyIGZyb20gXCIuLi8uLi9UdXRvcmlhbHMvVHV0b3JhaWxzTWFuYWdlclwiO1xyXG5pbXBvcnQgVUlDb21wb25lbnQgZnJvbSBcIi4uLy4uL1VJL1VJQ29tcG9uZW50XCI7XHJcbmltcG9ydCB7IFVJUGF0aCwgVUlMYXllckxldmVsIH0gZnJvbSBcIi4uLy4uL1VJL1VJQ29uZmlnXCI7XHJcbmltcG9ydCB7IFVJTWFuYWdlciB9IGZyb20gXCIuLi8uLi9VSS9VSU1hbmFnZXJcIjtcclxuaW1wb3J0IFVzZXJEYXRhIGZyb20gXCIuLi8uLi9Vc2VyRGF0YVwiO1xyXG5pbXBvcnQgeyBXYWxsVHlwZSB9IGZyb20gXCIuLi8uLi9XYWxsL1dhbGxDb25maWdcIjtcclxuaW1wb3J0IFdhbGxNYW5hZ2VyIGZyb20gXCIuLi8uLi9XYWxsL1dhbGxNYW5hZ2VyXCI7XHJcblxyXG5cclxuY29uc3Qge2NjY2xhc3MsIHByb3BlcnR5fSA9IGNjLl9kZWNvcmF0b3I7XHJcblxyXG5AY2NjbGFzc1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBHYW1lV2luIGV4dGVuZHMgVUlDb21wb25lbnQgeyAgICBcclxuXHJcbiAgICBAcHJvcGVydHkoY2MuUHJlZmFiKVxyXG4gICAgaGVyb19zdGF0czpjYy5QcmVmYWI9bnVsbDtcclxuICAgIEBwcm9wZXJ0eShjYy5Ob2RlKVxyXG4gICAgU2Nyb2xsVmlldzpjYy5Ob2RlPW51bGw7XHJcblxyXG4gICAgLy/ot5/nnYDmnKzmrKHlrozmiJDnmoTmmJ/mmJ/mlbDph49cclxuICAgIEBwcm9wZXJ0eShjYy5Ob2RlKVxyXG4gICAgdGFzazpjYy5Ob2RlW109W107Ly/ku7vliqHmloflrZdcclxuICAgIEBwcm9wZXJ0eShjYy5Ob2RlKVxyXG4gICAgU3RhcjpjYy5Ob2RlW109W107Ly/lpKfnmoTmmJ/mmJ9cclxuICAgIEBwcm9wZXJ0eShjYy5Ob2RlKVxyXG4gICAgU3RhcmFubXRpb246Y2MuTm9kZVtdPVtdOy8v5aSn55qE5pif5pif55qE5Yqo55S7XHJcblxyXG4gICAgLy/ot5/nnYDmnIDlpKflrozmiJDnmoTmmJ/mmJ/mlbDph49cclxuICAgIEBwcm9wZXJ0eShjYy5Ob2RlKVxyXG4gICAgU21hbGxTdGFyOmNjLk5vZGVbXT1bXTsvL+Wwj+eahOaYn+aYn+S4gOmil1xyXG4gICAgQHByb3BlcnR5KGNjLk5vZGUpXHJcbiAgICBTbWFsbFN0YXIyOmNjLk5vZGVbXT1bXTsvL+Wwj+eahOaYn+aYn+S6jOmil1xyXG4gICAgQHByb3BlcnR5KGNjLk5vZGUpXHJcbiAgICBTbWFsbFN0YXIzOmNjLk5vZGVbXT1bXTsvL+Wwj+eahOaYn+aYn+S4iemil1xyXG4gICAgQHByb3BlcnR5KGNjLk5vZGUpXHJcbiAgICBFbmRfQmdfaGVpOmNjLk5vZGVbXT1bXTsvL+m7keiJsuW4g+S5i+WJjeS7u+WKoemihuWPlueahOWLvlxyXG4gICAgQHByb3BlcnR5KGNjLk5vZGUpXHJcbiAgICB0eHQ6Y2MuTm9kZVtdPVtdOy8v5bey6aKG5Y+W5paH5a2XICDkuYvliY3ku7vliqHpooblj5bnmoTli75cclxuXHJcbiAgICBAcHJvcGVydHkoY2MuTm9kZSlcclxuICAgIGdvOmNjLk5vZGU9bnVsbDsvL+acrOasoeS7u+WKoeWujOaIkOeahOWLvlxyXG5cclxuXHJcbiAgICBAcHJvcGVydHkoY2MuTm9kZSlcclxuICAgIEVuZF9TdGFyOmNjLk5vZGVbXT1bXTsvL+m7keiJsueahOaYn+aYn1xyXG5cclxuICAgIEBwcm9wZXJ0eShjYy5Ob2RlKVxyXG4gICAgbGFiZWxfbGV2ZWw6Y2MuTm9kZT1udWxsOy8v5YWz5Y2hXHJcblxyXG5cclxuICAgIEBwcm9wZXJ0eShjYy5Ob2RlKVxyXG4gICAgamlhbmdsaTpjYy5Ob2RlPW51bGw7Ly/lpZblirFcclxuICAgIFxyXG4gICAgQHByb3BlcnR5KGNjLk5vZGUpXHJcbiAgICB3aW5UZXh0OmNjLk5vZGU9bnVsbDsvL+agh+mimOaWh+Wtl1xyXG4gICAgXHJcbiAgICBAcHJvcGVydHkoY2MuTm9kZSlcclxuICAgIEZpcnN0X1RleHRfMV9DTjpjYy5Ob2RlPW51bGw7Ly/mlrDnuqrlvZVcclxuXHJcbiAgICBAcHJvcGVydHkoY2MuTm9kZSlcclxuICAgIEhpZ2hlc3R0eHQ6Y2MuTm9kZT1udWxsOy8vL+acrOasoeaMkeaImOacgOmrmOazouasoX5cclxuICAgIFxyXG4gICAgQHByb3BlcnR5KGNjLk5vZGUpXHJcbiAgICB0ZXh0OmNjLk5vZGU9bnVsbDsvLy/lia/mnKznoa7orqTmjInpkq5cclxuICAgIFxyXG4gICAgdGV4dHM6IG51bWJlcltdID0gWzEwMDEyNiwgMTAwMTI4LCAxMDAxMjldLy/miJjlips6fuazouaVsDp+5Lyk5a6zOn5cclxuXHJcbiAgICBAcHJvcGVydHkoY2MuTm9kZSlcclxuICAgIFJhbmtpbmdTZWxmOiBjYy5Ob2RlID0gbnVsbC8v6Ieq5bex55qE5aS05YOPICDmjpLlkI0gXHJcblxyXG4gICAgQHByb3BlcnR5KGNjLk5vZGUpXHJcbiAgICBidG5OZXh0OiBjYy5Ob2RlID0gbnVsbC8v5LiL5LiA5YWz5oyJ6ZKuXHJcbiAgICBcclxuICAgIGluaXRVaSgpXHJcbiAgICB7XHJcbiAgICAgICAgR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zb3VuZF9tYW5hZ2VyLnBsYXlTb3VuZChTb3VuZEluZGV4LllYX1dpbik7XHJcbiAgICAgICAgLy9Nb25zdGVyRGF0YU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zYXZlQWxsS2lsbEVuZW15KCk7XHJcblxyXG5cclxuICAgICAgICB0aGlzLnNob3dVc2VyTGV2ZWwoKTtcclxuICAgICAgICB0aGlzLnNob3dSZXdhcmQoKTtcclxuICAgIH0gICAgXHJcblxyXG4gICAgc2hvd1RlYW1MZXZlbChsZXZlbDpudW1iZXIpe1xyXG4gICAgICAgIGxldCB1c2VyTGV2ZWw9dGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKCd1c2VyTGV2ZWwnKTtcclxuICAgICAgICB1c2VyTGV2ZWwuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmc9J0x2LicrbGV2ZWw7ICAgICAgIFxyXG4gICAgfVxyXG5cclxuICAgIHNob3dVc2VyTGV2ZWwoKXtcclxuICAgICAgICBsZXQgdXNlckxldmVsPXRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZSgndXNlckxldmVsJyk7XHJcbiAgICAgICAgbGV0IGxldmVsPVVzZXJEYXRhLmdldEluc3RhbmNlKCkuZ2V0VXNlckxldmVsKCk7XHJcbiAgICAgICAgdXNlckxldmVsLmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nPSdMdi4nK2xldmVsO1xyXG4gICAgICAgIC8v6L+b5bqmXHJcbiAgICAgICAgbGV0IGN1ckV4cD1Vc2VyRGF0YS5nZXRJbnN0YW5jZSgpLmdldFVzZXJFeHAoKTtcclxuICAgICAgICBsZXQgbWF4RXhwPVBsYXllckxldmVsVXBNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0UGxheWVyRXhwQ29zdChsZXZlbCk7XHJcbiAgICAgICAgdGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKCd1c2VyRXhwJykuZ2V0Q29tcG9uZW50KGNjLlByb2dyZXNzQmFyKS5wcm9ncmVzcz1jdXJFeHAvbWF4RXhwO1xyXG4gICAgfVxyXG5cclxuICAgIHNob3dVc2VyRXhwQW5pbWF0aW9uKGV4cDpudW1iZXIpe1xyXG4gICAgICAgIC8v6L+b5bqmXHJcbiAgICAgICAgbGV0IGxldmVsPVVzZXJEYXRhLmdldEluc3RhbmNlKCkuZ2V0VXNlckxldmVsKCk7XHJcbiAgICAgICAgbGV0IGN1ckV4cD1Vc2VyRGF0YS5nZXRJbnN0YW5jZSgpLmdldFVzZXJFeHAoKTtcclxuICAgICAgICBsZXQgbWF4RXhwPVBsYXllckxldmVsVXBNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0UGxheWVyRXhwQ29zdChsZXZlbCk7ICAgICAgICBcclxuICAgICAgICBsZXQgcHJvZ3Jlc3M9dGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKCd1c2VyRXhwJykuZ2V0Q29tcG9uZW50KGNjLlByb2dyZXNzQmFyKTtcclxuICAgICAgICBwcm9ncmVzcy5wcm9ncmVzcz1jdXJFeHAvbWF4RXhwO1xyXG4gICAgICAgIGxldCBudW09MzA7XHJcbiAgICAgICAgbGV0IHN0YXJ0TnVtPTA7XHJcbiAgICAgICAgbGV0IGlzU2hvdz1mYWxzZTtcclxuICAgICAgICB0aGlzLnNob3dUZWFtTGV2ZWwobGV2ZWwpO1xyXG4gICAgICAgIHRoaXMuc2NoZWR1bGUoKCk9PntcclxuICAgICAgICAgICAgY3VyRXhwKz1leHAvbnVtO1xyXG4gICAgICAgICAgICBsZXQgcHJvPWN1ckV4cC9tYXhFeHA7O1xyXG4gICAgICAgICAgICBpZihwcm88MSl7XHJcbiAgICAgICAgICAgICAgICBwcm9ncmVzcy5wcm9ncmVzcz1wcm87XHJcbiAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgbGV2ZWwrKztcclxuICAgICAgICAgICAgICAgIHByb2dyZXNzLnByb2dyZXNzPXBybyUxO1xyXG4gICAgICAgICAgICAgICAgY3VyRXhwLT1tYXhFeHA7XHJcbiAgICAgICAgICAgICAgICBtYXhFeHA9UGxheWVyTGV2ZWxVcE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRQbGF5ZXJFeHBDb3N0KGxldmVsKTsgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICB0aGlzLnNob3dUZWFtTGV2ZWwobGV2ZWwpO1xyXG4gICAgICAgICAgICAgICAgLy90aGlzLnNob3dVc2VyTGV2ZWwoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBzdGFydE51bSsrO1xyXG4gICAgICAgICAgICBpZighaXNTaG93JiZzdGFydE51bT5udW0pe1xyXG4gICAgICAgICAgICAgICAgaXNTaG93PXRydWU7XHJcbiAgICAgICAgICAgICAgICBVc2VyRGF0YS5nZXRJbnN0YW5jZSgpLmNoYW5nZVVzZXJFeHAoZXhwKTtcclxuICAgICAgICAgICAgICAgIC8vdGhpcy5zaG93VXNlckxldmVsKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LDAuMDE1LG51bSk7XHJcbiAgICAgICAgdGhpcy5zaG93VXNlckxldmVsKCk7XHJcbiAgICAgICAgLy8ucHJvZ3Jlc3M9Y3VyRXhwL21heEV4cDtcclxuICAgIH1cclxuXHJcbiAgICBjYW5jZWxSZW1haW5UaW1lKClcclxuICAgIHtcclxuICAgICAgICBsZXQgYnRuSG9tZT10aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoJ2J0bkhvbWUnKTtcclxuICAgICAgICBsZXQgbGFiZWw9YnRuSG9tZS5nZXRDaGlsZEJ5TmFtZSgnTGFiZWwnKS5nZXRDb21wb25lbnQoY2MuTGFiZWwpO1xyXG4gICAgICAgIGxhYmVsLnN0cmluZz1MYW5ndWFnZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRTdHJpbmcoTGFuZ3VhZ2VJbmRleC5IT01FKTtcclxuICAgICAgICBidG5Ib21lLmdldENoaWxkQnlOYW1lKCdhZHMnKS5hY3RpdmU9ZmFsc2U7XHJcbiAgICAgICAgYnRuSG9tZS5nZXRDaGlsZEJ5TmFtZSgndGltZScpLmFjdGl2ZT1mYWxzZTtcclxuICAgIH1cclxuXHJcbiAgICBzaG93UmV3YXJkKClcclxuICAgIHtcclxuICAgICAgICBzd2l0Y2goR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5jdXJfZ2FtZV9tb2RlKXtcclxuICAgICAgICAgICAgY2FzZSBHYW1lTW9kZS5NYWluOntcclxuICAgICAgICAgICAgICAgIHRoaXMuYnRuTmV4dC5hY3RpdmU9ZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNob3dNYWluUmV3YXJkKCk7XHJcbiAgICAgICAgICAgIH1icmVhaztcclxuICAgICAgICAgICAgY2FzZSBHYW1lTW9kZS5FbmRsZXNzOntcclxuICAgICAgICAgICAgICAgIHRoaXMuYnRuTmV4dC5hY3RpdmU9dHJ1ZTtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2hvd0VuZGxlc3NSZXdhcmQoKTtcclxuICAgICAgICAgICAgICAgIC8vQmF0dGxlUGFzc01hbmFnZXIuYWRkVG9kYXlUYXNrUHJvZ3Jlc3MoQmF0dGxlUGFzc1Rhc2suRW5kbGVzcyk7XHJcbiAgICAgICAgICAgIH1icmVhaztcclxuICAgICAgICAgICAgY2FzZSBHYW1lTW9kZS5Cb3NzX0NoYWxsZW5nZTp7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmJ0bk5leHQuYWN0aXZlPWZhbHNlO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zaG93Qm9zc0NoYWxsZW5nZVJld2FyZCgpO1xyXG4gICAgICAgICAgICAgICAgLy9CYXR0bGVQYXNzTWFuYWdlci5hZGRUb2RheVRhc2tQcm9ncmVzcyhCYXR0bGVQYXNzVGFzay5Cb3NzKTtcclxuICAgICAgICAgICAgfWJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIEdhbWVNb2RlLlRvd2VyOntcclxuICAgICAgICAgICAgICAgIHRoaXMuYnRuTmV4dC5hY3RpdmU9ZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNob3dUb3dlclJld2FyZCgpO1xyXG4gICAgICAgICAgICAgICAgLy9CYXR0bGVQYXNzTWFuYWdlci5hZGRUb2RheVRhc2tQcm9ncmVzcyhCYXR0bGVQYXNzVGFzay5Ub3dlcjMpO1xyXG4gICAgICAgICAgICB9YnJlYWtcclxuICAgICAgICAgICAgY2FzZSBHYW1lTW9kZS5NYXplOntcclxuICAgICAgICAgICAgICAgIHRoaXMuYnRuTmV4dC5hY3RpdmU9dHJ1ZTtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2hvd01hemVSZXdhcmQoKTtcclxuICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICB9YnJlYWtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgc2hvd01haW5SZXdhcmQoKXtcclxuICAgICAgICBcclxuICAgICAgICBmb3IgKGxldCBqaWFuZ2xpaW5kZXggPSAwOyBqaWFuZ2xpaW5kZXggPCB0aGlzLmppYW5nbGkuY2hpbGRyZW4ubGVuZ3RoOyBqaWFuZ2xpaW5kZXgrKykge1xyXG4gICAgICAgICAgICB0aGlzLmppYW5nbGkuY2hpbGRyZW5bamlhbmdsaWluZGV4XS5kZXN0cm95KClcclxuICAgICAgICB9XHJcbiAgICAgICAgbGV0IHN0YXJ0TGV2ZWw9IE1hcE1hbmFnZXIuQ3VycmVudGxldmVsOyAgICAgICBcclxuXHJcbiAgICAgICAgaWYoc3RhcnRMZXZlbCA+IFRhc2tNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0VGFza05vd1Byb2dyZXNzKFRhc2tJdGVtLue0r+iuoemAmui/h1jlhbMpKXtcclxuICAgICAgICAgICAgVGFza01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5lbWl0VGFzayhUYXNrSXRlbS7ntK/orqHpgJrov4dY5YWzKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmKHN0YXJ0TGV2ZWwgPiBUYXNrTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldFRhc2tOb3dQcm9ncmVzcyhUYXNrSXRlbS7pgJrlhbNYKSl7XHJcbiAgICAgICAgICAgIFRhc2tNYW5hZ2VyLmdldEluc3RhbmNlKCkuZW1pdFRhc2soVGFza0l0ZW0u6YCa5YWzWCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmKExldmVsTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldEZpbmlzaENoYXB0ZXIoKSA+IFRhc2tNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0VGFza05vd1Byb2dyZXNzKFRhc2tJdGVtLumAmuWFs1gpKXtcclxuICAgICAgICAgICAgVGFza01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5lbWl0VGFzayhUYXNrSXRlbS7pgJrov4fnrKxY56ugKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy8gbGV0IGxhYmVsTGV2ZWw9dGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKCdsYWJlbF9sZXZlbCcpO1xyXG5cclxuICAgICAgICBsZXQgZ209R2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKTtcclxuICAgICAgICBsZXQgY3VyU3RhcnM9W2ZhbHNlLGZhbHNlLGZhbHNlXSAvL0xldmVsTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldEFsbExldmVsU3RhcnMoc3RhcnRMZXZlbCk7XHJcblxyXG4gICAgICAgIHRoaXMubGFiZWxfbGV2ZWwuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmc9XCJcIitNaXNzaW9uTGV2ZWxNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0TGV2ZWxOYW1lKChzdGFydExldmVsKSlcclxuICAgICAgICBsZXQgbWFpbldhbGw9V2FsbE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRNYWluV2FsbCgpO1xyXG4gICAgICAgIGN1clN0YXJzWzBdPXRydWU7XHJcbiAgICAgICAgY3VyU3RhcnNbMV09Y3VyU3RhcnNbMV0/dHJ1ZTptYWluV2FsbC5nZXRDdXJIcFBlcigpPj0wLjUwO1xyXG4gICAgICAgIGN1clN0YXJzWzJdPWN1clN0YXJzWzJdP3RydWU6bWFpbldhbGwuZ2V0Q3VySHBQZXIoKT49MC45MDtcclxuXHJcbiAgICAgICAgbGV0IFN0YXJudW1iZXI9MFxyXG4gICAgICAgIGxldCBjdXJTdGFyc251bWJlcj0wXHJcblxyXG5cclxuICAgICAgICBGb2xsb3dNYW5hZ2VyLmdldEluc3RhbmNlKCkuZm9sbG93RXZlbnQoRm9sbG93X1R5cGUu5oiY5paX5oiQ5YqfMeaYn+WxleekuuasoeaVsF945YWzICsgc3RhcnRMZXZlbCk7XHJcblxyXG4gICAgICAgIGlmKGN1clN0YXJzWzFdKXtcclxuICAgICAgICAgICAgRm9sbG93TWFuYWdlci5nZXRJbnN0YW5jZSgpLmZvbGxvd0V2ZW50KEZvbGxvd19UeXBlLuaImOaWl+aIkOWKnzLmmJ/lsZXnpLrmrKHmlbBfeOWFsyArIHN0YXJ0TGV2ZWwpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZihjdXJTdGFyc1syXSl7XHJcbiAgICAgICAgICAgIEZvbGxvd01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5mb2xsb3dFdmVudChGb2xsb3dfVHlwZS7miJjmlpfmiJDlip8z5pif5bGV56S65qyh5pWwX3jlhbMgKyBzdGFydExldmVsKTtcclxuICAgICAgICB9XHJcblxyXG5cclxuXHJcbiAgICAgICAgLy/kuYvliY3mmK/lkKbmiZPov4fmmJ/mmJ/mlbDph49cclxuICAgICAgICBmb3IgKGxldCBMZXZlbFN0YXJpbmRleCA9IDE7IExldmVsU3RhcmluZGV4IDw0OyBMZXZlbFN0YXJpbmRleCsrKSB7XHJcbiAgICAgICAgICAgIGlmKExldmVsTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldEFMZXZlbFN0YXIoc3RhcnRMZXZlbCxMZXZlbFN0YXJpbmRleCkpe1xyXG4gICAgICAgICAgICAgICAgU3Rhcm51bWJlcisrXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8v6L+Z5qyh5omT55qE5pif5pif5pWw6YePXHJcbiAgICAgICAgZm9yIChsZXQgY3Vyc3RhcnNpbmRleCA9IDA7IGN1cnN0YXJzaW5kZXggPCBjdXJTdGFycy5sZW5ndGg7IGN1cnN0YXJzaW5kZXgrKykge1xyXG4gICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhcIisrKysrKytcIixjdXJTdGFycylcclxuICAgICAgICAgICAgdGhpcy5TdGFyW2N1cnN0YXJzaW5kZXhdLnNjYWxlPTBcclxuICAgICAgICAgICBpZihjdXJTdGFyc1tjdXJzdGFyc2luZGV4XSl7XHJcbiAgICAgICAgICAgICAgICBjdXJTdGFyc251bWJlcisrXHJcbiAgICAgICAgICAgICAgICB0aGlzLnRhc2tbY3Vyc3RhcnNpbmRleF0uY29sb3I9Y2MuY29sb3IoODUsMjM0LDg1KS8v5Lu75Yqh5paH5a2X55qE6aKc6ImyXHJcbiAgICAgICAgICAgICAgICB0aGlzLlN0YXJbY3Vyc3RhcnNpbmRleF0uYWN0aXZlPXRydWUvL+Wkp+aYn+aYn+aYr+WQpuS6rui1t1xyXG4gICAgICAgICAgICAgICAgLy/ku7vliqHmloflrZfnmoTmloflrZfmmK/lkKblrozmiJBcclxuICAgICAgICAgICAgICAgIHRoaXMudGFza1tjdXJzdGFyc2luZGV4XS5nZXRDb21wb25lbnQoVGV4dExhbmd1YWdlKS5zZXRUZXh0SWQoWzE0MDAwOCtjdXJzdGFyc2luZGV4LDE0MDAxNF0sXCJcIik7Ly8xNDAwMTQg5a6M5oiQICAgMTQwMDE15pyq5a6M5oiQXHJcbiAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnRhc2tbY3Vyc3RhcnNpbmRleF0uY29sb3I9Y2MuY29sb3IoMTcxLDE2MywxNTMpXHJcbiAgICAgICAgICAgICAgICB0aGlzLlN0YXJbY3Vyc3RhcnNpbmRleF0uYWN0aXZlPWZhbHNlXHJcbiAgICAgICAgICAgICAgICB0aGlzLnRhc2tbY3Vyc3RhcnNpbmRleF0uZ2V0Q29tcG9uZW50KFRleHRMYW5ndWFnZSkuc2V0VGV4dElkKFsxNDAwMDgrY3Vyc3RhcnNpbmRleCwxNDAwMTVdLFwiXCIpOy8vMTQwMDE0IOWujOaIkCAgIDE0MDAxNeacquWujOaIkFxyXG4gICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8v5aaC5p6c6L+Z5qyh55qE5pif5pif5pWw6YeP6LaF6L+H5LqG5LmL5YmN55qE5pif5pif5pWw6YePICAgICDlsLHlsIbov5nmrKHnmoTmlbDph4/lrZjmnKzlnLAgICBcclxuICAgICAgICBpZihjdXJTdGFyc251bWJlcj5TdGFybnVtYmVyKXtcclxuICAgICAgICAgICAgTGV2ZWxNYW5hZ2VyLmdldEluc3RhbmNlKCkuc2F2ZUFsbExldmVsU3RhcnMoc3RhcnRMZXZlbCxjdXJTdGFycyk7XHJcbiAgICAgICAgICAgIC8v6L+Z5qyh55qE5pif5pif5q+U5LmL5YmN55qE5pif5pif5aSa5LqG5Yeg6aKXICAgIFxyXG4gICAgICAgICAgICBcclxuICAgICAgICB9XHJcbiAgICAgICAgbGV0IGNoYT1jdXJTdGFyc251bWJlci1TdGFybnVtYmVyXHJcbiAgICAgICAgbGV0IGl0bWVhbm10b2luPVtdLy/lrZjmiYDmnInmiZPpkqnnmoTlpZblirFcclxuICAgICAgICBmb3IgKGxldCBTdGFyaW5kZXggPSAxOyBTdGFyaW5kZXggPD0gMzsgU3RhcmluZGV4KyspIHtcclxuICAgICAgICAgICAgbGV0IGxldmVsSWQ9Rmlyc3RDb21wbGV0ZVJld2FyZE1hbmFnZXIuZ2V0SWQoc3RhcnRMZXZlbCxTdGFyaW5kZXgpOy8v6buY6K6kM+S4qumDveWujOaIkCAgXHJcbiAgICAgICAgICAgIGxldCBSZXdhcmREYXRhPUZpcnN0Q29tcGxldGVSZXdhcmRNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0Rmlyc3RSZXdhcmRBcnIobGV2ZWxJZCk7XHJcbiAgICAgICAgICAgIC8v5piv5ZCm5a6M5oiQXHJcbiAgICAgICAgICAgIGxldCBpc0ZpbmlzaD1jdXJTdGFyc1tTdGFyaW5kZXgtMV07XHJcbiAgICAgICAgICAgIGZvciAobGV0IGxldmVsMyA9IDA7IGxldmVsMyA8IFJld2FyZERhdGEubGVuZ3RoOyBsZXZlbDMrKykge1xyXG4gICAgICAgICAgICAgICAgbGV0IHJld2FyZERhdGE9UmV3YXJkRGF0YVtsZXZlbDNdO1xyXG4gICAgICAgICAgICAgICAgLy/lj6/ku6XojrflvpflpZblk4FcclxuICAgICAgICAgICAgICAgIC8vIHRoaXMuc2NoZWR1bGVPbmNlKCgpPT57XHJcbiAgICAgICAgICAgICAgICBsZXQgaXRlbT1Qcm9wTWFuYWdlci5nZXRJbnN0YW5jZSgpLmNyZWF0ZVByb3BJdGVtKHJld2FyZERhdGEucmV3YXJkX2lkLHJld2FyZERhdGEucmV3YXJkX251bSk7XHJcbiAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIGl0ZW0ueD0tNTcrbGV2ZWwzKjEwMDtcclxuICAgICAgICAgICAgICAgIGl0ZW0ueT0tMTMxLVN0YXJpbmRleCoxMjArMTIwOy8vaXRlbS55PS0zNzErU3RhcmluZGV4KjEyMC0xMjA7XHJcbiAgICAgICAgICAgICAgICBpdGVtLnNjYWxlPTA7XHJcbiAgICAgICAgICAgICAgICBpZihjaGE+MCl7Ly/lt67lpKfkuo4w77yM5Luj6KGo6L+Z5qyh55qE5pif5pif5pWw6YeP5q+U5LmL5YmN55qE5pif5pif5pWw6YeP5aSaICAgIFxyXG4gICAgICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKFwi5pif5pif5beu77yaXCIsY2hhLFN0YXJpbmRleCxTdGFybnVtYmVyLGN1clN0YXJzbnVtYmVyKVxyXG4gICAgICAgICAgICAgICAgICAgIGlmKFN0YXJpbmRleDw9U3Rhcm51bWJlcil7Ly/ov5nkuKrmmJ/mmJ/lsI/kuo7nrYnkuo7kuYvliY3miZPnmoTmmJ/mmJ8gICAg5bCx5pi+56S65bey6aKG5Y+WXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuRW5kX0JnX2hlaVsoU3RhcmluZGV4LTEpXS5hY3RpdmU9dHJ1ZS8v5bey6aKG5Y+W55qE6buR5biDXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMudHh0WyhTdGFyaW5kZXgtMSldLmFjdGl2ZT10cnVlICAgLy/lt7Lpooblj5bnmoTmloflrZdcclxuICAgICAgICAgICAgICAgICAgICAgICAgaXRlbS5zY2FsZT0wLjgzO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBpZihTdGFyaW5kZXg+U3Rhcm51bWJlcil7Ly/ov5nkuKrmmJ/mmJ/lpKfkuo7nrYnkuo7kuYvliY3miZPnmoTmmJ/mmJ8gICDmnKrpooblj5ZcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYoU3RhcmluZGV4PmN1clN0YXJzbnVtYmVyKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuRW5kX0JnX2hlaVsoU3RhcmluZGV4LTEpXS5hY3RpdmU9ZmFsc2UvL+W3sumihuWPlueahOm7keW4g1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy50eHRbKFN0YXJpbmRleC0xKV0uYWN0aXZlPWZhbHNlICAgLy/lt7Lpooblj5bnmoTmloflrZdcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKFwi5rKh5pyJ5Yu+77yM5rKh5pyJ6buR5biDXCIpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpdGVtLnNjYWxlPTAuODM7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gY29uc29sZS5sb2coXCLmnInli75cIilcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGl0ZW0uc2NhbGU9MDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuRW5kX0JnX2hlaVsoU3RhcmluZGV4LTEpXS5hY3RpdmU9ZmFsc2UvL+W3sumihuWPlueahOm7keW4g1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy50eHRbKFN0YXJpbmRleC0xKV0uYWN0aXZlPWZhbHNlICAgLy/lt7Lpooblj5bnmoTmloflrZdcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBteWdvPWNjLmluc3RhbnRpYXRlKHRoaXMuZ28pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBteWdvLnNldFBvc2l0aW9uKDAsMClcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG15Z28uYWN0aXZlPXRydWVcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG15Z28ucGFyZW50PWl0ZW1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGl0bWVhbm10b2luLnB1c2goaXRlbSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFByb3BNYW5hZ2VyLmdldEluc3RhbmNlKCkuY2hhbmdlUHJvcE51bShyZXdhcmREYXRhLnJld2FyZF9pZCxyZXdhcmREYXRhLnJld2FyZF9udW0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfWVsc2V7Ly/lt67lsI/kuo4w77yM5Luj6KGo6L+Z5qyh55qE5pif5pif5pWw6YeP5q+U5LmL5YmN55qE5pif5pif5pWw6YeP5bCRIFxyXG4gICAgICAgICAgICAgICAgICAgIGl0ZW0uc2NhbGU9MC44MztcclxuICAgICAgICAgICAgICAgICAgICBpZihTdGFyaW5kZXg8PVN0YXJudW1iZXIpey8v6L+Z5Liq5pif5pif5bCP5LqO562J5LqO5LmL5YmN5omT55qE5pif5pifICAgIOWwseaYvuekuuW3sumihuWPllxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLkVuZF9CZ19oZWlbKFN0YXJpbmRleC0xKV0uYWN0aXZlPXRydWUvL+W3sumihuWPlueahOm7keW4g1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnR4dFsoU3RhcmluZGV4LTEpXS5hY3RpdmU9dHJ1ZSAgIC8v5bey6aKG5Y+W55qE5paH5a2XXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmKFN0YXJpbmRleD5TdGFybnVtYmVyKXsvL+i/meS4quaYn+aYn+Wkp+S6juetieS6juS5i+WJjeaJk+eahOaYn+aYnyAgIOacqumihuWPllxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLkVuZF9CZ19oZWlbKFN0YXJpbmRleC0xKV0uYWN0aXZlPWZhbHNlLy/lt7Lpooblj5bnmoTpu5HluINcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy50eHRbKFN0YXJpbmRleC0xKV0uYWN0aXZlPWZhbHNlICAgLy/lt7Lpooblj5bnmoTmloflrZdcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB0aGlzLmppYW5nbGkuYWRkQ2hpbGQoaXRlbSk7XHJcbiAgICAgICAgICAgICAgICAvLyB9LGxldmVsMyowLjEpO1xyXG4gICAgICAgICAgICAgICAgLy8gXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIGxldCBzY3JvbGxWaWV3PXRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZSgncHJvcHNTY3JvbGxWaWV3Jyk7XHJcbiAgICAgICAgLy9sZXQgY29udGVudD1zY3JvbGxWaWV3LmdldENvbXBvbmVudChjYy5TY3JvbGxWaWV3KS5jb250ZW50O1xyXG4gICAgICAgIFxyXG4gICAgICAgIC8vIGxldCBhbGxSZXdhcmREYXRhPW5ldyBBcnJheTxSZXdhcmREYXRhPigpOyAgICAgICAgXHJcbiAgICAgICAgLy8gbGV0IG5uPUxldmVsTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldFBhc3NOdW0oc3RhcnRMZXZlbCk7XHJcbiAgICAgICAgLy8gLy/kvZPliptcclxuICAgICAgICAvLyBpZihubj09MClcclxuICAgICAgICAvLyB7XHJcbiAgICAgICAgLy8gICAgIC8vSHR0cE1hbmFnZXIucG9zdFRvVXBsb2FkKFVSTF9UWVBFLnJhbmtfdXBsb2FkLFBhcmFtc19UeXBlLnJhbmtfbWF4X2xldmVsKTtcclxuICAgICAgICAvLyAgICAgLy9CYXR0bGVQYXNzTWFuYWdlci5hZGRUb2RheVRhc2tQcm9ncmVzcyhCYXR0bGVQYXNzVGFzay5VbmxvY2tNaXNzaW9uKTtcclxuICAgICAgICAvLyB9XHJcblxyXG5cclxuICAgICAgICAvLyB0aGlzLnRhc2tbMF0uZ2V0Q29tcG9uZW50KFRleHRMYW5ndWFnZSkuc2V0VGV4dElkKFsxNDAwMDgsMTQwMDE0XSxcIlwiKTsvLzE0MDAxNCDlrozmiJAgICAxNDAwMTXmnKrlrozmiJBcclxuICAgICAgICAvLyB0aGlzLnRhc2tbMV0uZ2V0Q29tcG9uZW50KFRleHRMYW5ndWFnZSkuc2V0VGV4dElkKFsxNDAwMDksMTQwMDE0XSxcIlwiKTsvLzE0MDAxNCDlrozmiJAgICAxNDAwMTXmnKrlrozmiJBcclxuICAgICAgICAvLyB0aGlzLnRhc2tbMl0uZ2V0Q29tcG9uZW50KFRleHRMYW5ndWFnZSkuc2V0VGV4dElkKFsxNDAwMTAsMTQwMDE0XSxcIlwiKTsvLzE0MDAxNCDlrozmiJAgICAxNDAwMTXmnKrlrozmiJBcclxuICAgICAgICB0aGlzLlNjcm9sbFZpZXcuZ2V0Q29tcG9uZW50KGNjLlNjcm9sbFZpZXcpLnNjcm9sbFRvQm90dG9tKDIpXHJcblxyXG5cclxuICAgICAgICAvLyBmb3IobGV0IGk9MTsgaTw9NDsgaSsrKXtcclxuICAgICAgICAvLyAgICAgaWYoanNvbkRhdGFbJ1Jld2FyZEl0ZW1fJytpXT4wICYmIGpzb25EYXRhWydSZXdhcmROdW1fJytpXT4wKXtcclxuICAgICAgICAvLyAgICAgICAgIGxldCByZD1uZXcgUmV3YXJkRGF0YSgpO1xyXG4gICAgICAgIC8vICAgICAgICAgcmQucmV3YXJkX2lkPWpzb25EYXRhWydSZXdhcmRJdGVtXycraV07XHJcbiAgICAgICAgLy8gICAgICAgICByZC5yZXdhcmRfbnVtPWpzb25EYXRhWydSZXdhcmROdW1fJytpXTtcclxuICAgICAgICAvLyAgICAgICAgIGFsbFJld2FyZERhdGEucHVzaChyZCk7XHJcbiAgICAgICAgLy8gICAgIH1cclxuICAgICAgICAvLyB9XHJcbiAgICAgICAgXHJcbiAgICAgICAgLy8gbGV0IGxlbj1hbGxSZXdhcmREYXRhLmxlbmd0aDtcclxuICAgICAgICAvLyBmb3IobGV0IGk9MDsgaTxsZW47IGkrKylcclxuICAgICAgICAvLyB7XHJcbiAgICAgICAgLy8gICAgIGxldCByZXdhcmREYXRhPWFsbFJld2FyZERhdGFbaV07XHJcbiAgICAgICAgLy8gICAgIC8v5Y+v5Lul6I635b6X5aWW5ZOBXHJcbiAgICAgICAgLy8gICAgIHRoaXMuc2NoZWR1bGVPbmNlKCgpPT57XHJcbiAgICAgICAgLy8gICAgICAgICBsZXQgaXRlbT1Qcm9wTWFuYWdlci5nZXRJbnN0YW5jZSgpLmNyZWF0ZVByb3BJdGVtKHJld2FyZERhdGEucmV3YXJkX2lkLHJld2FyZERhdGEucmV3YXJkX251bSk7XHJcbiAgICAgICAgLy8gICAgICAgICB0aGlzLm5vZGUuYWRkQ2hpbGQoaXRlbSk7XHJcbiAgICAgICAgLy8gICAgICAgICBpdGVtLng9OTAraSo2MDtcclxuICAgICAgICAvLyAgICAgICAgIGl0ZW0ueT0xNTA7XHJcbiAgICAgICAgLy8gICAgICAgICBpdGVtLnNjYWxlPTE7XHJcbiAgICAgICAgLy8gICAgIH0saSowLjEpO1xyXG4gICAgICAgIC8vICAgICBQcm9wTWFuYWdlci5nZXRJbnN0YW5jZSgpLmNoYW5nZVByb3BOdW0ocmV3YXJkRGF0YS5yZXdhcmRfaWQscmV3YXJkRGF0YS5yZXdhcmRfbnVtKTtcclxuICAgICAgICAvLyB9XHJcbiAgICAgICAgLy/miorliY3pnaLnmoTms6LmlbDorr7nva7kuLrlt7Lnu4/pgJrov4dcclxuICAgICAgICBmb3IobGV0IGk9MDsgaTw9Z20uY3VyX3dhdmU7IGkrKylcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIExldmVsTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNldE5vdEZpcnN0UGFzc0xldmVsKHN0YXJ0TGV2ZWwsaSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIEdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkucGFzc19sZXZlbF9udW0rKztcclxuICAgICAgICAvLyBpZihNYXBNYW5hZ2VyLkN1cnJlbnRsZXZlbDxNaXNzaW9uTGV2ZWxNYW5hZ2VyLmdldE1heExldmVsKCkpe1xyXG4gICAgICAgIFxyXG4gICAgICAgIC8vIH1cclxuICAgICAgICBsZXQgVXA9dGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKFwiVXBcIilcclxuICAgICAgICBsZXQgSW5zPXRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZShcIkluc1wiKVxyXG4gICAgICAgIGxldCBJbj10aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJJblwiKVxyXG4gICAgICAgIGxldCBEb3duPXRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZShcIkRvd25cIilcclxuICAgICAgICBVcC5zZXRTY2FsZSgwLDApXHJcbiAgICAgICAgVXAueT0xMDBcclxuICAgICAgICBJbnMueT0tMzAwXHJcbiAgICAgICAgSW5zLm9wYWNpdHk9MFxyXG4gICAgICAgIEluLm9wYWNpdHk9MFxyXG4gICAgICAgIERvd24ub3BhY2l0eT0wXHJcbiAgICAgICAgRG93bi5nZXRDaGlsZEJ5TmFtZShcImJnXCIpLmFjdGl2ZT10cnVlXHJcbiAgICAgICAgRG93bi5nZXRDaGlsZEJ5TmFtZShcImJ0bkhvbWVcIikuYWN0aXZlPXRydWVcclxuXHJcbiAgICAgICAgVXAuZ2V0Q2hpbGRCeU5hbWUoXCJXaW5cIikuZ2V0Q29tcG9uZW50KHNwLlNrZWxldG9uKS5zZXRBbmltYXRpb24oMCxcIldpbl9TdGFydFwiLGZhbHNlKVxyXG4gICAgICAgIGNjLnR3ZWVuKFVwKS8v5LiK6Z2i55qE57695q+b5pS+5aSn5Ye65p2lXHJcbiAgICAgICAgLnRvKDAuMjQsIHsgc2NhbGVYOjEuMixzY2FsZVk6MS4yfSlcclxuICAgICAgICAuY2FsbCgoKSA9PiB7XHJcbiAgICAgICAgICAgIGNjLnR3ZWVuKElucykvL+S4reS4iueahOS7u+WKoeWHuuadpVxyXG4gICAgICAgICAgICAudG8oMC4yNCwge29wYWNpdHkgOjI1NX0pIFxyXG4gICAgICAgICAgICAuc3RhcnQoKSAgIFxyXG4gICAgICAgIH0pXHJcbiAgICAgICAgLnRvKDAuMjQsIHsgc2NhbGVYOjAuOSxzY2FsZVk6MC45fSkvL+e+veavm+aUvuWwj1xyXG4gICAgICAgIC50bygwLjI2LCB7IHNjYWxlWDoxLHNjYWxlWToxfSkvL+e+veavm+aUvuWkp1xyXG4gICAgICAgIC5jYWxsKCgpID0+IHtcclxuICAgICAgICAgICAgLy/nvr3mr5vliqjnlLtcclxuICAgICAgICAgICAgVXAuZ2V0Q2hpbGRCeU5hbWUoXCJXaW5cIikuZ2V0Q29tcG9uZW50KHNwLlNrZWxldG9uKS5zZXRBbmltYXRpb24oMCxcIldpbl9Mb29wXCIsdHJ1ZSlcclxuICAgICAgICAgICAgLy/mmJ/mmJ/liqjnlLtcclxuICAgICAgICAgICAgZm9yIChsZXQgaW5kZXggPSAwOyBpbmRleCA8IHRoaXMuU3Rhci5sZW5ndGg7IGluZGV4KyspIHtcclxuICAgICAgICAgICAgICAgIGlmKHRoaXMuU3RhcltpbmRleF0uYWN0aXZlPT10cnVlKXtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnNjaGVkdWxlT25jZShmdW5jdGlvbigpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLlN0YXJhbm10aW9uW2luZGV4XS5nZXRDb21wb25lbnQoY2MuQW5pbWF0aW9uKS5wbGF5KClcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5TdGFyW2luZGV4XS5nZXRDb21wb25lbnQoY2MuQW5pbWF0aW9uKS5wbGF5KClcclxuICAgICAgICAgICAgICAgICAgICB9LDAuNDcqaW5kZXgpXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KVxyXG4gICAgICAgIC5kZWxheSgxLjUpLy/nrYnlvoVcclxuICAgICAgICAuY2FsbCgoKSA9PiB7XHJcbiAgICAgICAgICAgIGNjLnR3ZWVuKFVwKVxyXG4gICAgICAgICAgICAudG8oMC4xNiwge3kgOjQwMH0pIC8v57695q+b5LiK5Y67XHJcbiAgICAgICAgICAgIC5zdGFydCgpXHJcbiAgICAgICAgICAgIGNjLnR3ZWVuKElucylcclxuICAgICAgICAgICAgLnRvKDAuMTYsIHt5IDowfSkgLy/ku7vliqHkuIrljrtcclxuICAgICAgICAgICAgLnN0YXJ0KClcclxuICAgICAgICB9KVxyXG4gICAgICAgIC5kZWxheSgwLjE2KS8v562J5b6FXHJcbiAgICAgICAgLmNhbGwoKCkgPT4ge1xyXG4gICAgICAgICAgICBjYy50d2VlbihJbikvL+WlluWKseWHuuadpVxyXG4gICAgICAgICAgICAudG8oMC4zMywge29wYWNpdHkgOjI1NX0pIFxyXG4gICAgICAgICAgICAuc3RhcnQoKSAgIFxyXG4gICAgICAgIH0pXHJcbiAgICAgICAgLmRlbGF5KDAuMzMpLy/nrYnlvoVcclxuICAgICAgICAuY2FsbCgoKSA9PiB7XHJcbiAgICAgICAgICAgIGlmKGl0bWVhbm10b2luLmxlbmd0aD09MCl7Ly/lpoLmnpzmsqHmnInlj6/pooblj5bnmoTlpZblirHnm7TmjqXlh7rmnaXmjInpkq5cclxuICAgICAgICAgICAgICAgIGNjLnR3ZWVuKERvd24pXHJcbiAgICAgICAgICAgICAgICAudG8oMC4zMywge29wYWNpdHkgOjI1NX0pIFxyXG4gICAgICAgICAgICAgICAgLmNhbGwoKCk9PntcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmNoZWNrVHV0b3JhaWxzKClcclxuICAgICAgICAgICAgICAgICAgICBEb3duLmdldENoaWxkQnlOYW1lKFwiYmdcIikuYWN0aXZlPWZhbHNlXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLnN0YXJ0KCkgIFxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2V7Ly/miYDmnInlj6/pooblj5bnmoTlpZblirHmlL7lpKfnvKnlsI8tLS3kuIDotbfmlL7lpKfnvKnlsI8gICAg5LmL5ZCO5by55Ye65oyJ6ZKuICAgIGPmnIDlkI7lvLnmlrDmiYvmlZnnqItcclxuICAgICAgICAgICAgICAgIGZvciAobGV0IGl0bWVhbm10aW9uaW5kZXggPSAwOyBpdG1lYW5tdGlvbmluZGV4IDwgaXRtZWFubXRvaW4ubGVuZ3RoOyBpdG1lYW5tdGlvbmluZGV4KyspIHtcclxuICAgICAgICAgICAgICAgICAgICBpdG1lYW5tdG9pbltpdG1lYW5tdGlvbmluZGV4XS5zY2FsZT0wO1xyXG4gICAgICAgICAgICAgICAgICAgIGNjLnR3ZWVuKGl0bWVhbm10b2luW2l0bWVhbm10aW9uaW5kZXhdKVxyXG4gICAgICAgICAgICAgICAgICAgIC5kZWxheShpdG1lYW5tdGlvbmluZGV4KjAuMTcpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC50bygwLjE3LHtzY2FsZTowLjgzfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgLmNhbGwoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYoaXRtZWFubXRpb25pbmRleD09KGl0bWVhbm10b2luLmxlbmd0aC0xKSl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9yIChsZXQgaW5kZXggPSAwOyBpbmRleCA8IGl0bWVhbm10b2luLmxlbmd0aDsgaW5kZXgrKykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYy50d2VlbihpdG1lYW5tdG9pbltpbmRleF0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC50bygwLjIyLHtzY2FsZTowLjgzKzAuM30pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5kZWxheSgwLjEpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC50bygwLjIyLHtzY2FsZTowLjgzfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmNhbGwoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYoaW5kZXg9PShpdG1lYW5tdG9pbi5sZW5ndGgtMSkpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNjLnR3ZWVuKERvd24pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLnRvKDAuMzMsIHtvcGFjaXR5IDoyNTV9KSBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuY2FsbCgoKT0+e1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmNoZWNrVHV0b3JhaWxzKClcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgRG93bi5nZXRDaGlsZEJ5TmFtZShcImJnXCIpLmFjdGl2ZT1mYWxzZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLnN0YXJ0KCkgIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuc3RhcnQoKSAgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAuc3RhcnQoKVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSlcclxuICAgICAgICAuc3RhcnQoKVxyXG4gICAgfVxyXG5cclxuICAgIGNoZWNrVHV0b3JhaWxzKCl7XHJcbiAgICAgICAgbGV0IGJ0bkhvbWU9dGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKCdEb3duJykuZ2V0Q2hpbGRCeU5hbWUoJ2J0bkhvbWUnKTtcclxuICAgICAgICBidG5Ib21lLmFjdGl2ZT10cnVlXHJcbiAgICAgICAgaWYoIVR1dG9yYWlsc01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5pc19maW5pc2gmJkdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuY3VyX2dhbWVfbW9kZT09R2FtZU1vZGUuTWFpbilcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGlmKExldmVsTWFuYWdlci5nZXRJbnN0YW5jZSgpLnN0YXJ0X2xldmVsPT01ICYmIFR1dG9yYWlsc01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5pc1Nob3dUdXRvcmlhbHMoMjA1KSlcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgVUlNYW5hZ2VyLmdldEluc3RhbmNlKCkuc2hvd1VpRGlhbG9nKFVJUGF0aC5SZXdhcmRTU1VJLFVJTGF5ZXJMZXZlbC5Ud28se29uQ29tcGxldGVkOih1aU5vZGUpPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHVpTm9kZS5nZXRDb21wb25lbnQoUmV3YXJkU1NVaSkuaW5pdERhdGEoMSk7XHJcbiAgICAgICAgICAgICAgICB9fSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgLy8gZWxzZSBpZihUdXRvcmFpbHNNYW5hZ2VyLmdldEluc3RhbmNlKCkuaXNTaG93VHV0b3JpYWxzKDIxNCkpXHJcbiAgICAgICAgICAgIC8vIHtcclxuICAgICAgICAgICAgLy8gICAgIGJ0bkhvbWUuYWN0aXZlPWZhbHNlXHJcbiAgICAgICAgICAgIC8vICAgICBUdXRvcmFpbHNNYW5hZ2VyLmdldEluc3RhbmNlKCkuc2hvd1R1dG9yaWFscygyMTQsKCk9PntcclxuICAgICAgICAgICAgLy8gICAgICAgICBUdXRvcmFpbHNNYW5hZ2VyLmdldEluc3RhbmNlKCkuc2F2ZVR1dG9yaWFscygyMTEpO1xyXG4gICAgICAgICAgICAvLyAgICAgICAgIFR1dG9yYWlsc01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zYXZlVHV0b3JpYWxzKDIxMik7XHJcbiAgICAgICAgICAgIC8vICAgICAgICAgVHV0b3JhaWxzTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNhdmVUdXRvcmlhbHMoMjEzKTtcclxuICAgICAgICAgICAgLy8gICAgICAgICBUdXRvcmFpbHNNYW5hZ2VyLmdldEluc3RhbmNlKCkuc2F2ZVR1dG9yaWFscygyMTQpO1xyXG4gICAgICAgICAgICAvLyAgICAgfSwoKT0+e1xyXG4gICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAvLyAgICAgfSk7XHJcbiAgICAgICAgICAgIC8vICAgICBUdXRvcmFpbHNNYW5hZ2VyLmdldEluc3RhbmNlKCkuaXNfdHV0b3JhaWxzX3N0YXRlPWZhbHNlO1xyXG4gICAgICAgICAgICAvLyB9ZWxzZSBpZihMZXZlbE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zdGFydF9sZXZlbD09MyAmJiBUdXRvcmFpbHNNYW5hZ2VyLmdldEluc3RhbmNlKCkuaXNTaG93VHV0b3JpYWxzKDIyMSkpXHJcbiAgICAgICAgICAgIC8vIHtcclxuICAgICAgICAgICAgLy8gICAgIFR1dG9yYWlsc01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zaG93VHV0b3JpYWxzKDIyMSxudWxsLCgpPT57XHJcbiAgICAgICAgICAgIC8vICAgICAgICAgLy/ot7PovazliLDllYblnLosQ+eJiOacrC3llYbln47mi5vli5/lvIDlkK9cclxuICAgICAgICAgICAgLy8gICAgICAgICBHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdhbWVfdG9faG9tZT1Hb19UeXBlLk1haW47XHJcbiAgICAgICAgICAgIC8vICAgICAgICAgVHV0b3JhaWxzTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNhdmVUdXRvcmlhbHMoMjIxKTtcclxuICAgICAgICAgICAgLy8gICAgICAgICB0aGlzLmNsaWNrQnRuSG9tZSgpO1xyXG4gICAgICAgICAgICAvLyAgICAgfSk7XHJcbiAgICAgICAgICAgIC8vICAgICBUdXRvcmFpbHNNYW5hZ2VyLmdldEluc3RhbmNlKCkuaXNfdHV0b3JhaWxzX3N0YXRlPWZhbHNlO1xyXG4gICAgICAgICAgICAvLyB9XHJcbiAgICAgICAgICAgIC8vIGVsc2UgaWYoTGV2ZWxNYW5hZ2VyLmdldEluc3RhbmNlKCkuc3RhcnRfbGV2ZWw9PTQgJiYgVHV0b3JhaWxzTWFuYWdlci5nZXRJbnN0YW5jZSgpLmlzU2hvd1R1dG9yaWFscygyMzEpKVxyXG4gICAgICAgICAgICAvLyB7XHJcbiAgICAgICAgICAgIC8vICAgICBsZXQgYnRuSG9tZT10aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoJ0Rvd24nKS5nZXRDaGlsZEJ5TmFtZSgnYnRuSG9tZScpO1xyXG4gICAgICAgICAgICAvLyAgICAgYnRuSG9tZS5hY3RpdmU9ZmFsc2VcclxuICAgICAgICAgICAgLy8gICAgIFR1dG9yYWlsc01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zaG93VHV0b3JpYWxzKDIzMSxudWxsLCgpPT57XHJcbiAgICAgICAgICAgIC8vICAgICAgICAgLy/kuIvkuIDlhbNcclxuICAgICAgICAgICAgLy8gICAgICAgICBUdXRvcmFpbHNNYW5hZ2VyLmdldEluc3RhbmNlKCkuc2F2ZVR1dG9yaWFscygyMTApO1xyXG4gICAgICAgICAgICAvLyAgICAgfSk7XHJcbiAgICAgICAgICAgIC8vICAgICBUdXRvcmFpbHNNYW5hZ2VyLmdldEluc3RhbmNlKCkuaXNfdHV0b3JhaWxzX3N0YXRlPWZhbHNlO1xyXG4gICAgICAgICAgICAvLyB9XHJcbiAgICAgICAgICAgIC8vIGVsc2UgaWYoTGV2ZWxNYW5hZ2VyLmdldEluc3RhbmNlKCkuc3RhcnRfbGV2ZWw9PTUgJiYgVHV0b3JhaWxzTWFuYWdlci5nZXRJbnN0YW5jZSgpLmlzU2hvd1R1dG9yaWFscygyNTMpKVxyXG4gICAgICAgICAgICAvLyB7XHJcbiAgICAgICAgICAgIC8vICAgICBUdXRvcmFpbHNNYW5hZ2VyLmdldEluc3RhbmNlKCkuc2F2ZVR1dG9yaWFscygyNDEpO1xyXG4gICAgICAgICAgICAvLyAgICAgVHV0b3JhaWxzTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNhdmVUdXRvcmlhbHMoMjUxKTtcclxuICAgICAgICAgICAgLy8gICAgIFR1dG9yYWlsc01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zYXZlVHV0b3JpYWxzKDI1Mik7ICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAvLyAgICAgVHV0b3JhaWxzTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNhdmVGaW5pc2hGcm9tR2FtZSgpO1xyXG4gICAgICAgICAgICAvLyAgICAgVHV0b3JhaWxzTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNob3dUdXRvcmlhbHMoMjUzLCgpPT57XHJcbiAgICAgICAgICAgIC8vICAgICAgICAgVHV0b3JhaWxzTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNhdmVUdXRvcmlhbHMoMjUzKTtcclxuICAgICAgICAgICAgLy8gICAgIH0sKCk9PntcclxuICAgICAgICAgICAgLy8gICAgICAgICBsZXQgaGVybz1HYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLmFsbF9oZXJvLmdldChIZXJvX1R5cGUuR29uZ0ppYW5TaG91KTtcclxuICAgICAgICAgICAgLy8gICAgICAgICBpZihoZXJvKXtcclxuICAgICAgICAgICAgLy8gICAgICAgICAgICAgaGVyby5oaWRlSGVybygpO1xyXG4gICAgICAgICAgICAvLyAgICAgICAgICAgICBoZXJvLm5vZGUucmVtb3ZlQWxsQ2hpbGRyZW4oKTtcclxuICAgICAgICAgICAgLy8gICAgICAgICAgICAgR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5hbGxfaGVyby5kZWxldGUoSGVyb19UeXBlLkdvbmdKaWFuU2hvdSk7XHJcbiAgICAgICAgICAgIC8vICAgICAgICAgfVxyXG4gICAgICAgICAgICAvLyAgICAgICAgIFR1dG9yYWlsc01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zaG93VHV0b3JpYWxzKDI2MSwoKT0+e1xyXG4gICAgICAgICAgICAvLyAgICAgICAgICAgICBUdXRvcmFpbHNNYW5hZ2VyLmdldEluc3RhbmNlKCkuc2F2ZVR1dG9yaWFscygyNjEpO1xyXG4gICAgICAgICAgICAvLyAgICAgICAgIH0sbnVsbCk7XHJcbiAgICAgICAgICAgIC8vICAgICB9KTtcclxuICAgICAgICAgICAgLy8gICAgIFR1dG9yYWlsc01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5pc190dXRvcmFpbHNfc3RhdGU9ZmFsc2U7XHJcbiAgICAgICAgICAgIC8vIH1cclxuICAgICAgICAgICAgLy8gZWxzZSBpZihMZXZlbE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zdGFydF9sZXZlbD09NyAmJiBUdXRvcmFpbHNNYW5hZ2VyLmdldEluc3RhbmNlKCkuaXNTaG93VHV0b3JpYWxzKDIyMSkpXHJcbiAgICAgICAgICAgIC8vIHtcclxuICAgICAgICAgICAgLy8gICAgIFR1dG9yYWlsc01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zaG93VHV0b3JpYWxzKDIyMSxudWxsLCgpPT57XHJcbiAgICAgICAgICAgIC8vICAgICAgICAgVHV0b3JhaWxzTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNhdmVUdXRvcmlhbHMoMjIxKTtcclxuICAgICAgICAgICAgLy8gICAgIH0pO1xyXG4gICAgICAgICAgICAvLyAgICAgVHV0b3JhaWxzTWFuYWdlci5nZXRJbnN0YW5jZSgpLmlzX3R1dG9yYWlsc19zdGF0ZT1mYWxzZTtcclxuICAgICAgICAgICAgLy8gfVxyXG4gICAgICAgICAgICAvLyBlbHNlIGlmKExldmVsTWFuYWdlci5nZXRJbnN0YW5jZSgpLnN0YXJ0X2xldmVsPT05ICYmIFR1dG9yYWlsc01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5pc1Nob3dUdXRvcmlhbHMoMjIzKSlcclxuICAgICAgICAgICAgLy8ge1xyXG4gICAgICAgICAgICAvLyAgICAgVHV0b3JhaWxzTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNob3dUdXRvcmlhbHMoMjIzLG51bGwsKCk9PntcclxuICAgICAgICAgICAgLy8gICAgICAgICBUdXRvcmFpbHNNYW5hZ2VyLmdldEluc3RhbmNlKCkuc2F2ZVR1dG9yaWFscygyMjMpOyAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIC8vICAgICB9KTtcclxuICAgICAgICAgICAgLy8gICAgIFR1dG9yYWlsc01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5pc190dXRvcmFpbHNfc3RhdGU9ZmFsc2U7XHJcbiAgICAgICAgICAgIC8vIH0gICAgICAgICAgICBcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgc2hvd0VuZGxlc3NSZXdhcmQoKXtcclxuICAgICAgICBsZXQgZ209R2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKTtcclxuICAgICAgICAvLyBjb25zb2xlLmxvZyhcIuaXoOWwveaMkeaImOiDnOWIqeeVjOmdolwiKVxyXG4gICAgICAgIFxyXG4gICAgICAgIEZvbGxvd01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5mb2xsb3dFdmVudChGb2xsb3dfVHlwZS7lrozmiJDml6DlsL3mjJHmiJjmrKHmlbApO1xyXG4gICAgXHJcblxyXG4gICAgICAgIFxyXG4gICAgICAgIC8v6buR6Imy5pif5pif6ZqQ6JePXHJcbiAgICAgICAgZm9yIChsZXQgaW5kZXggPSAwOyBpbmRleCA8IHRoaXMuRW5kX1N0YXIubGVuZ3RoOyBpbmRleCsrKSB7XHJcbiAgICAgICAgICAgIHRoaXMuRW5kX1N0YXJbaW5kZXhdLmFjdGl2ZT1mYWxzZVxyXG4gICAgICAgIH1cclxuICAgICAgICAvL+makOiXj+WFs+WNoeaVsFxyXG4gICAgICAgIHRoaXMubGFiZWxfbGV2ZWwuYWN0aXZlPWZhbHNlXHJcbiAgICAgICAgLy/moIfpopjkv67mlLlcclxuICAgICAgICB0aGlzLndpblRleHQuZ2V0Q29tcG9uZW50KFRleHRMYW5ndWFnZSkuc2V0VGV4dElkKDgwMDAyNykvL+WujOaIkOaMkeaImFxyXG4gICAgICAgIC8v5pys5qyh5oyR5oiY5pyA6auY5rOi5qyhflxyXG4gICAgICAgIHRoaXMuSGlnaGVzdHR4dC5hY3RpdmU9dHJ1ZVxyXG4gICAgICAgIHRoaXMuSGlnaGVzdHR4dC5nZXRDb21wb25lbnQoVGV4dExhbmd1YWdlKS5zZXRUZXh0SWQoODAwMDI4KVxyXG4gICAgICAgIGxldCBDaGFsbGVuZ2VEYW1hZ2U9VGhlU3RvcmFnZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXROdW1iZXIoU3RvcmFnZUtleS5VbmxpbWl0ZWRDaGFsbGVuZ2VEYW1hZ2UsMClcclxuICAgICAgICB0aGlzLkhpZ2hlc3R0eHQuZ2V0Q29tcG9uZW50KFRleHRMYW5ndWFnZSkuc2V0UmVwbGFjZVZhbHVlKCd+JyxUaGVTdG9yYWdlTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldE51bWJlcihTdG9yYWdlS2V5LlVubGltaXRlZENoYWxsZW5nZURhbWFnZSwwKSArICcnKTtcclxuICAgICAgICAvL+aYr+WQpuaYvuekuuaWsOe6quW9lVxyXG5cclxuXHJcbiAgICAgICAgaWYoQ2hhbGxlbmdlRGFtYWdlPkVuZGxlc3NMZXZlbHNNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0TWF4V2F2ZSgpKXtcclxuICAgICAgICAgICAgdGhpcy5GaXJzdF9UZXh0XzFfQ04uYWN0aXZlPXRydWVcclxuXHJcbiAgICAgICAgICAgIGxldCB0b3RhbG51bT1UaGVTdG9yYWdlTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldE51bWJlcihTdG9yYWdlS2V5LlRvdGFsVW5saW1pdGVkQ2hhbGxlbmdlVGltZXMsMCk7XHJcbiAgICAgICAgICAgIHRvdGFsbnVtKytcclxuICAgICAgICAgICAgVGhlU3RvcmFnZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zZXRJdGVtKFN0b3JhZ2VLZXkuVG90YWxVbmxpbWl0ZWRDaGFsbGVuZ2VUaW1lcyx0b3RhbG51bSk7XHJcblxyXG4gICAgICAgICAgICBFbmRsZXNzTGV2ZWxzTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNldFdhdmUoQ2hhbGxlbmdlRGFtYWdlKS8v5ri45oiP6IOc5Yip5LmL5ZCO5L+d5a2YXHJcbiAgICAgICAgfVxyXG5cclxuXHJcblxyXG4gICAgICAgIEZvbGxvd01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5mb2xsb3dFdmVudChGb2xsb3dfVHlwZS7ml6DlsL3mjJHmiJhf5a6M5oiQ5pe25Yiw6L6+55qE5rOi5qyhK0NoYWxsZW5nZURhbWFnZSk7XHJcbiAgICAgICAgLy/lia/mnKznoa7orqTmjInpkq5cclxuICAgICAgICB0aGlzLnRleHQuZ2V0Q29tcG9uZW50KFRleHRMYW5ndWFnZSkuc2V0VGV4dElkKDEwMDAwMSlcclxuICAgICAgICBsZXQgVXA9dGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKFwiVXBcIilcclxuICAgICAgICBsZXQgZW5kbGVzcz10aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJlbmRsZXNzXCIpXHJcbiAgICAgICAgbGV0IERvd249dGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKFwiRG93blwiKVxyXG4gICAgICAgIFVwLnNldFNjYWxlKDAsMClcclxuICAgICAgICBVcC55PTEwMFxyXG4gICAgICAgIGVuZGxlc3Mub3BhY2l0eT0wXHJcbiAgICAgICAgRG93bi5vcGFjaXR5PTBcclxuICAgICAgICBEb3duLnk9NzJcclxuICAgICAgICBEb3duLmdldENoaWxkQnlOYW1lKFwiYnRuSG9tZVwiKS5hY3RpdmU9dHJ1ZVxyXG4gICAgICAgIERvd24uZ2V0Q2hpbGRCeU5hbWUoXCJiZ1wiKS5hY3RpdmU9dHJ1ZVxyXG4gICAgICAgIFVwLmdldENoaWxkQnlOYW1lKFwiV2luXCIpLmdldENvbXBvbmVudChzcC5Ta2VsZXRvbikuc2V0QW5pbWF0aW9uKDAsXCJXaW5fU3RhcnRcIixmYWxzZSlcclxuICAgICAgICBsZXQgY29tYmF0UG93ZXI9MFxyXG4gICAgICAgIGxldCBzZWxmcmFua2luZyA9IC0xXHJcbiAgICAgICAgY29tYmF0UG93ZXIgPSBFbmRsZXNzTGV2ZWxzTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldE1heFdhdmUoKS8vSGVyb01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRBbGxIZXJvWmhhbmxpKCkvL+iOt+WPluazouaVsFxyXG4gICAgICAgIGxldCBDb21iYXRQb3dlciA9IHRoaXMuUmFua2luZ1NlbGYuZ2V0Q2hpbGRCeU5hbWUoXCJDb21iYXRQb3dlclwiKVxyXG4gICAgICAgIGxldCBTZXJpYWxObyA9IHRoaXMuUmFua2luZ1NlbGYuZ2V0Q2hpbGRCeU5hbWUoXCJTZXJpYWxOb1wiKVxyXG4gICAgICAgIGxldCBuYW1lID0gdGhpcy5SYW5raW5nU2VsZi5nZXRDaGlsZEJ5TmFtZShcIm5hbWVcIilcclxuICAgICAgICBsZXQgYnRuQXZhdGFyID0gdGhpcy5SYW5raW5nU2VsZi5nZXRDaGlsZEJ5TmFtZShcImhlYWRQb3J0cmFpdFwiKS5nZXRDaGlsZEJ5TmFtZShcImJ0bkF2YXRhclwiKVxyXG4gICAgICAgIENvbWJhdFBvd2VyLmdldENvbXBvbmVudChUZXh0TGFuZ3VhZ2UpLnNldFRleHRJZCh0aGlzLnRleHRzWzFdKS8v5piv5ZOq5Liq5o6S6KGM5qacXHJcbiAgICAgICAgQ29tYmF0UG93ZXIuZ2V0Q29tcG9uZW50KFRleHRMYW5ndWFnZSkuc2V0UmVwbGFjZVZhbHVlKCd+JywgKGNvbWJhdFBvd2VyKSArICcnKTsvL+aOkuihjOamnOaImOWKm+aVsOaNrlxyXG4gICAgICAgIEh0dHBNYW5hZ2VyLnBvc3QoQWNjZXNzTmFtZS5sZWFkZXJib2FyZEJ5VXNlciwgdGhpcy5nZXRMZWFkZXJib2FyZEJ5VXNlckpzb25TdHJpbmcoMiksIGZhbHNlKS50aGVuKChkYXRhOiBhbnkpID0+IHtcclxuICAgICAgICAgICAgbGV0IG1heCA9IGRhdGEubGVuZ3RoO1xyXG4gICAgICAgICAgICBmb3IgKGxldCBpbmRleCA9IDA7IGluZGV4IDwgbWF4OyBpbmRleCsrKSB7XHJcbiAgICAgICAgICAgICAgICBpZihkYXRhW2luZGV4XS51aWQ9PVVzZXJEYXRhLmdldEluc3RhbmNlKCkuZ2V0VXNlcklEKCkpeyAgICAvL+WmguaenOWcqOWQjuWPsOaLieWPlueahOaOkuWQjeS4reaciWlk6Lef546p5a6255qEaWTkuIDmoLfvvIzpgqPkuYjnjqnlrrbnmoTmjpLlkI3lnKjliY0xMDDlkI3kuK0gIOWwhuaYvuekuueOqeWutuaOkuWQjSAgIOWQpuWImeaYvuekuuacquS4iuamnFxyXG4gICAgICAgICAgICAgICAgICAgIHNlbGZyYW5raW5nPShpbmRleCsxKVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmIChzZWxmcmFua2luZyA9PSAtMSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5SYW5raW5nU2VsZi5nZXRDaGlsZEJ5TmFtZShcIk5vdGxpc3RlZFwiKS5hY3RpdmUgPSB0cnVlXHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBTZXJpYWxOby5hY3RpdmU9dHJ1ZVxyXG4gICAgICAgICAgICAgICAgU2VyaWFsTm8uZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmcgPSBcIlwiICsgKHNlbGZyYW5raW5nKS8v5bqP5Y+3XHJcbiAgICAgICAgICAgICAgICB0aGlzLlJhbmtpbmdTZWxmLmdldENoaWxkQnlOYW1lKFwiTm90bGlzdGVkXCIpLmFjdGl2ZSA9IGZhbHNlXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgICAgICBsZXQgbXluYW1lID0gVXNlckRhdGEuZ2V0SW5zdGFuY2UoKS5nZXRVc2VyTmFtZSgpOyAvL+eOqeWutuWQjeWtl1xyXG4gICAgICAgIGxldCBzcGhlYSA9IFVzZXJEYXRhLmdldEluc3RhbmNlKCkuZ2V0VXNlckF2YXRhcigpOy8v546p5a625aS05YOPXHJcbiAgICAgICAgbmFtZS5nZXRDb21wb25lbnQoY2MuTGFiZWwpLnN0cmluZyA9IFwiXCIgKyBteW5hbWUvL+eOqeWutuWQjeWtl1xyXG4gICAgICAgIGJ0bkF2YXRhci5nZXRDb21wb25lbnQoY2MuU3ByaXRlKS5zcHJpdGVGcmFtZSA9IFByb3BNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0U3BoZWFkUG9ydHJhaXRUeXBlKHNwaGVhKS8v5aS05YOPaWRcclxuICAgICAgICAvL+eUn+aIkOi/measoeaJgOiOt+W+l+eahOWlluWKsVxyXG4gICAgICAgIGVuZGxlc3MuZ2V0Q2hpbGRCeU5hbWUoXCJpdGVtXCIpLng9MFxyXG4gICAgICAgIGVuZGxlc3MuZ2V0Q2hpbGRCeU5hbWUoXCJpdGVtMVwiKS54PTBcclxuICAgICAgICBsZXQgbXlpdGVtPVByb3BNYW5hZ2VyLmdldEluc3RhbmNlKCkuY3JlYXRlUHJvcEl0ZW0oRW5kbGVzc1Jld2FyZE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRSZXdhcmRJdGVtKENoYWxsZW5nZURhbWFnZSksRW5kbGVzc1Jld2FyZE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRSZXdhcmROdW0oQ2hhbGxlbmdlRGFtYWdlKSk7XHJcbiAgICAgICAgbXlpdGVtLnNjYWxlPTA7XHJcbiAgICAgICAgUHJvcE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5jaGFuZ2VQcm9wTnVtKEVuZGxlc3NSZXdhcmRNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0UmV3YXJkSXRlbShDaGFsbGVuZ2VEYW1hZ2UpLEVuZGxlc3NSZXdhcmRNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0UmV3YXJkTnVtKENoYWxsZW5nZURhbWFnZSkpO1xyXG4gICAgICAgIG15aXRlbS5wYXJlbnQ9ZW5kbGVzcy5nZXRDaGlsZEJ5TmFtZShcIml0ZW1cIilcclxuXHJcbiAgICAgICAgaWYoRW5kbGVzc0xldmVsc01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRNYXhXYXZlKCkgPiBUYXNrTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldFRhc2tOb3dQcm9ncmVzcyhUYXNrSXRlbS7ml6DlsL3mjJHmiJjliIbmlbDliLDovr5Y5rOi5qyhKSl7XHJcbiAgICAgICAgICAgIFRhc2tNYW5hZ2VyLmdldEluc3RhbmNlKCkuZW1pdFRhc2soVGFza0l0ZW0u5peg5bC95oyR5oiY5YiG5pWw5Yiw6L6+WOazouasoSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBjYy50d2VlbihVcCkvL+S4iumdoueahOe+veavm+aUvuWkp+WHuuadpVxyXG4gICAgICAgIC50bygwLjI0LCB7IHNjYWxlWDoxLjIsc2NhbGVZOjEuMn0pXHJcbiAgICAgICAgLnRvKDAuMjQsIHsgc2NhbGVYOjAuOSxzY2FsZVk6MC45fSkvL+e+veavm+aUvuWwj1xyXG4gICAgICAgIC50bygwLjI2LCB7IHNjYWxlWDoxLHNjYWxlWToxfSkvL+e+veavm+aUvuWkp1xyXG4gICAgICAgIC5jYWxsKCgpID0+IHtcclxuICAgICAgICAgICAgLy/nvr3mr5vliqjnlLtcclxuICAgICAgICAgICAgVXAuZ2V0Q2hpbGRCeU5hbWUoXCJXaW5cIikuZ2V0Q29tcG9uZW50KHNwLlNrZWxldG9uKS5zZXRBbmltYXRpb24oMCxcIldpbl9Mb29wXCIsdHJ1ZSlcclxuICAgICAgICB9KVxyXG4gICAgICAgIC5kZWxheSgxLjUpLy/nrYnlvoVcclxuICAgICAgICAuY2FsbCgoKSA9PiB7XHJcbiAgICAgICAgICAgIGNjLnR3ZWVuKFVwKVxyXG4gICAgICAgICAgICAudG8oMC4xNiwge3kgOjMyN30pIC8v57695q+b5LiK5Y67XHJcbiAgICAgICAgICAgIC5zdGFydCgpXHJcbiAgICAgICAgfSlcclxuICAgICAgICAuZGVsYXkoMC4xNikvL+etieW+hVxyXG4gICAgICAgIC5jYWxsKCgpID0+IHtcclxuICAgICAgICAgICAgY2MudHdlZW4oZW5kbGVzcykvL+WlluWKseWHuuadpVxyXG4gICAgICAgICAgICAudG8oMC4zMywge29wYWNpdHkgOjI1NX0pIFxyXG4gICAgICAgICAgICAuc3RhcnQoKSAgIFxyXG4gICAgICAgIH0pXHJcbiAgICAgICAgLmRlbGF5KDAuMzMpLy/nrYnlvoVcclxuICAgICAgICAuY2FsbCgoKSA9PiB7XHJcbiAgICAgICAgICAgIC8vIGxldCBteWl0ZW09UHJvcE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5jcmVhdGVQcm9wSXRlbShFbmRsZXNzUmV3YXJkTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldFJld2FyZEl0ZW0oQ2hhbGxlbmdlRGFtYWdlKSxFbmRsZXNzUmV3YXJkTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldFJld2FyZE51bShDaGFsbGVuZ2VEYW1hZ2UpKTtcclxuICAgICAgICAgICAgbXlpdGVtLnNjYWxlPTA7XHJcbiAgICAgICAgICAgIC8vIG15aXRlbS5wYXJlbnQ9ZW5kbGVzcy5nZXRDaGlsZEJ5TmFtZShcIml0ZW1cIilcclxuICAgICAgICAgICAgY2MudHdlZW4obXlpdGVtKVxyXG4gICAgICAgICAgICAudG8oMC4xNyx7c2NhbGU6MC44M30pXHJcbiAgICAgICAgICAgIC5jYWxsKCgpID0+IHtcclxuICAgICAgICAgICAgICAgIGNjLnR3ZWVuKERvd24pXHJcbiAgICAgICAgICAgICAgICAudG8oMC4zMywge29wYWNpdHkgOjI1NX0pIFxyXG4gICAgICAgICAgICAgICAgLmNhbGwoKCk9PntcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmNoZWNrVHV0b3JhaWxzKClcclxuICAgICAgICAgICAgICAgICAgICBEb3duLmdldENoaWxkQnlOYW1lKFwiYmdcIikuYWN0aXZlPWZhbHNlXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLnN0YXJ0KCkgIFxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAuc3RhcnQoKVxyXG4gICAgICAgIH0pXHJcbiAgICAgICAgLnN0YXJ0KClcclxuICAgIH1cclxuICAgIFxyXG4gICAgc2hvd0Jvc3NDaGFsbGVuZ2VSZXdhcmQoKXtcclxuICAgICAgICBsZXQgZ209R2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKTtcclxuICAgICAgICAvLyBjb25zb2xlLmxvZyhcIkJPU1PmjJHmiJjog5zliKnnlYzpnaJcIilcclxuICAgICAgICBGb2xsb3dNYW5hZ2VyLmdldEluc3RhbmNlKCkuZm9sbG93RXZlbnQoRm9sbG93X1R5cGUu5a6M5oiQQk9TU+aMkeaImOasoeaVsCk7XHJcbiAgICAgICAgLy/pu5HoibLmmJ/mmJ/pmpDol49cclxuICAgICAgICBmb3IgKGxldCBpbmRleCA9IDA7IGluZGV4IDwgdGhpcy5FbmRfU3Rhci5sZW5ndGg7IGluZGV4KyspIHtcclxuICAgICAgICAgICAgdGhpcy5FbmRfU3RhcltpbmRleF0uYWN0aXZlPWZhbHNlXHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8v6ZqQ6JeP5YWz5Y2h5pWwXHJcbiAgICAgICAgdGhpcy5sYWJlbF9sZXZlbC5hY3RpdmU9ZmFsc2VcclxuICAgICAgICAvL+agh+mimOS/ruaUuVxyXG4gICAgICAgIHRoaXMud2luVGV4dC5nZXRDb21wb25lbnQoVGV4dExhbmd1YWdlKS5zZXRUZXh0SWQoODAwMDI3KS8v5a6M5oiQ5oyR5oiYXHJcbiAgICAgICAgLy/mnKzmrKHmjJHmiJjmnIDpq5jms6LmrKF+XHJcbiAgICAgICAgdGhpcy5IaWdoZXN0dHh0LmFjdGl2ZT10cnVlXHJcbiAgICAgICAgdGhpcy5IaWdoZXN0dHh0LmdldENvbXBvbmVudChUZXh0TGFuZ3VhZ2UpLnNldFRleHRJZCg4MjAwMTgpXHJcbiAgICAgICAgbGV0IENoYWxsZW5nZURhbWFnZT1Cb3NzQ2hhbGxlbmdlTWFuYWdlci5nZXRJbnN0YW5jZSgpLmN1cl9zY29yZTsvL1RoZVN0b3JhZ2VNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0TnVtYmVyKFN0b3JhZ2VLZXkuQm9zc0NoYWxsZW5nZURhbWFnZSwwKVxyXG4gICAgICAgIHRoaXMuSGlnaGVzdHR4dC5nZXRDb21wb25lbnQoVGV4dExhbmd1YWdlKS5zZXRSZXBsYWNlVmFsdWUoJ34nLENoYWxsZW5nZURhbWFnZSArICcnKTtcclxuXHJcbiAgICAgICAgVGhlU3RvcmFnZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zZXRJdGVtKFN0b3JhZ2VLZXkuQm9zc0NoYWxsZW5nZURhbWFnZSxDaGFsbGVuZ2VEYW1hZ2UpO1xyXG4gICAgICAgIC8v5piv5ZCm5pi+56S65paw57qq5b2VXHJcbiAgICAgICAgbGV0IHpvbj1DaGFsbGVuZ2VEYW1hZ2UrQm9zc0NoYWxsZW5nZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRNYXhEYW1hZ2VOdW1iZXIoKVxyXG4gICAgICAgIC8vIGNvbnNvbGUubG9nKFwiKysrKysrKytcIix6b24sQ2hhbGxlbmdlRGFtYWdlLEJvc3NDaGFsbGVuZ2VNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0TWF4RGFtYWdlTnVtYmVyKCkpXHJcbiAgICAgICAgbGV0IHRvdGFsbnVtPVRoZVN0b3JhZ2VNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0TnVtYmVyKFN0b3JhZ2VLZXkuVG90YWxCb3NzQ2hhbGxlbmdlVGltZXMsMCk7XHJcbiAgICAgICAgdG90YWxudW0rK1xyXG4gICAgICAgIFRoZVN0b3JhZ2VNYW5hZ2VyLmdldEluc3RhbmNlKCkuc2V0SXRlbShTdG9yYWdlS2V5LlRvdGFsQm9zc0NoYWxsZW5nZVRpbWVzLHRvdGFsbnVtKTtcclxuXHJcbiAgICAgICAgQm9zc0NoYWxsZW5nZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zZXREYW1hZ2VOdW1iZXIoem9uKS8v5ri45oiP6IOc5Yip5LmL5ZCO5L+d5a2YXHJcbiAgICAgICAgLy8gaWYoQ2hhbGxlbmdlRGFtYWdlPkJvc3NDaGFsbGVuZ2VNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0TWF4RGFtYWdlTnVtYmVyKCkpe1xyXG4gICAgICAgIC8vICAgICB0aGlzLkZpcnN0X1RleHRfMV9DTi5hY3RpdmU9dHJ1ZVxyXG4gICAgICAgIC8vICAgICBCb3NzQ2hhbGxlbmdlTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNldERhbWFnZU51bWJlcihDaGFsbGVuZ2VEYW1hZ2UpLy/muLjmiI/og5zliKnkuYvlkI7kv53lrZhcclxuICAgICAgICAvLyB9XHJcblxyXG4gICAgICAgIC8v5Ymv5pys56Gu6K6k5oyJ6ZKuXHJcbiAgICAgICAgdGhpcy50ZXh0LmdldENvbXBvbmVudChUZXh0TGFuZ3VhZ2UpLnNldFRleHRJZCgxMDAwMDEpXHJcbiAgICAgICAgbGV0IFVwPXRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZShcIlVwXCIpXHJcbiAgICAgICAgbGV0IGVuZGxlc3M9dGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKFwiZW5kbGVzc1wiKVxyXG4gICAgICAgIGxldCBEb3duPXRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZShcIkRvd25cIilcclxuICAgICAgICBVcC5zZXRTY2FsZSgwLDApXHJcbiAgICAgICAgVXAueT0xMDBcclxuICAgICAgICBEb3duLmdldENoaWxkQnlOYW1lKFwiYnRuSG9tZVwiKS5hY3RpdmU9dHJ1ZVxyXG4gICAgICAgIGVuZGxlc3Mub3BhY2l0eT0wXHJcbiAgICAgICAgRG93bi5vcGFjaXR5PTBcclxuICAgICAgICBEb3duLnk9NzJcclxuICAgICAgICBEb3duLmdldENoaWxkQnlOYW1lKFwiYmdcIikuYWN0aXZlPXRydWVcclxuICAgICAgICBVcC5nZXRDaGlsZEJ5TmFtZShcIldpblwiKS5nZXRDb21wb25lbnQoc3AuU2tlbGV0b24pLnNldEFuaW1hdGlvbigwLFwiV2luX1N0YXJ0XCIsZmFsc2UpXHJcbiAgICAgICAgbGV0IGNvbWJhdFBvd2Vycz0wXHJcbiAgICAgICAgbGV0IHNlbGZyYW5raW5nID0gLTFcclxuICAgICAgICBjb21iYXRQb3dlcnMgPSBCb3NzQ2hhbGxlbmdlTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldE1heERhbWFnZU51bWJlcigpLy9IZXJvTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldEFsbEhlcm9aaGFubGkoKS8v6I635Y+W5Lyk5a6zXHJcbiAgICAgICAgbGV0IENvbWJhdFBvd2VyID0gdGhpcy5SYW5raW5nU2VsZi5nZXRDaGlsZEJ5TmFtZShcIkNvbWJhdFBvd2VyXCIpXHJcbiAgICAgICAgbGV0IFNlcmlhbE5vID0gdGhpcy5SYW5raW5nU2VsZi5nZXRDaGlsZEJ5TmFtZShcIlNlcmlhbE5vXCIpXHJcbiAgICAgICAgbGV0IG5hbWUgPSB0aGlzLlJhbmtpbmdTZWxmLmdldENoaWxkQnlOYW1lKFwibmFtZVwiKVxyXG4gICAgICAgIGxldCBidG5BdmF0YXIgPSB0aGlzLlJhbmtpbmdTZWxmLmdldENoaWxkQnlOYW1lKFwiaGVhZFBvcnRyYWl0XCIpLmdldENoaWxkQnlOYW1lKFwiYnRuQXZhdGFyXCIpXHJcbiAgICAgICAgQ29tYmF0UG93ZXIuZ2V0Q29tcG9uZW50KFRleHRMYW5ndWFnZSkuc2V0VGV4dElkKHRoaXMudGV4dHNbMl0pLy/mmK/lk6rkuKrmjpLooYzmppxcclxuICAgICAgICBDb21iYXRQb3dlci5nZXRDb21wb25lbnQoVGV4dExhbmd1YWdlKS5zZXRSZXBsYWNlVmFsdWUoJ34nLCAoY29tYmF0UG93ZXJzKSArICcnKTsvL+aOkuihjOamnOaImOWKm+aVsOaNrlxyXG4gICAgICAgIEh0dHBNYW5hZ2VyLnBvc3QoQWNjZXNzTmFtZS5sZWFkZXJib2FyZEJ5VXNlciwgdGhpcy5nZXRMZWFkZXJib2FyZEJ5VXNlckpzb25TdHJpbmcoMyksIGZhbHNlKS50aGVuKChkYXRhOiBhbnkpID0+IHtcclxuICAgICAgICAgICAgbGV0IG1heCA9IGRhdGEubGVuZ3RoO1xyXG4gICAgICAgICAgICBmb3IgKGxldCBpbmRleCA9IDA7IGluZGV4IDwgbWF4OyBpbmRleCsrKSB7XHJcbiAgICAgICAgICAgICAgICBpZihkYXRhW2luZGV4XS51aWQ9PVVzZXJEYXRhLmdldEluc3RhbmNlKCkuZ2V0VXNlcklEKCkpeyAgICAvL+WmguaenOWcqOWQjuWPsOaLieWPlueahOaOkuWQjeS4reaciWlk6Lef546p5a6255qEaWTkuIDmoLfvvIzpgqPkuYjnjqnlrrbnmoTmjpLlkI3lnKjliY0xMDDlkI3kuK0gIOWwhuaYvuekuueOqeWutuaOkuWQjSAgIOWQpuWImeaYvuekuuacquS4iuamnFxyXG4gICAgICAgICAgICAgICAgICAgIHNlbGZyYW5raW5nPShpbmRleCsxKVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmIChzZWxmcmFua2luZyA9PSAtMSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5SYW5raW5nU2VsZi5nZXRDaGlsZEJ5TmFtZShcIk5vdGxpc3RlZFwiKS5hY3RpdmUgPSB0cnVlXHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBTZXJpYWxOby5hY3RpdmU9dHJ1ZVxyXG4gICAgICAgICAgICAgICAgU2VyaWFsTm8uZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmcgPSBcIlwiICsgKHNlbGZyYW5raW5nKS8v5bqP5Y+3XHJcbiAgICAgICAgICAgICAgICB0aGlzLlJhbmtpbmdTZWxmLmdldENoaWxkQnlOYW1lKFwiTm90bGlzdGVkXCIpLmFjdGl2ZSA9IGZhbHNlXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgICAgICBsZXQgbXluYW1lID0gVXNlckRhdGEuZ2V0SW5zdGFuY2UoKS5nZXRVc2VyTmFtZSgpOyAvL+eOqeWutuWQjeWtl1xyXG4gICAgICAgIGxldCBzcGhlYSA9IFVzZXJEYXRhLmdldEluc3RhbmNlKCkuZ2V0VXNlckF2YXRhcigpOy8v546p5a625aS05YOPXHJcbiAgICAgICAgbmFtZS5nZXRDb21wb25lbnQoY2MuTGFiZWwpLnN0cmluZyA9IFwiXCIgKyBteW5hbWUvL+eOqeWutuWQjeWtl1xyXG4gICAgICAgIGJ0bkF2YXRhci5nZXRDb21wb25lbnQoY2MuU3ByaXRlKS5zcHJpdGVGcmFtZSA9IFByb3BNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0U3BoZWFkUG9ydHJhaXRUeXBlKHNwaGVhKS8v5aS05YOPaWRcclxuICAgICAgICAvL+eUn+aIkOi/measoeaJgOiOt+W+l+eahOWlluWKsVxyXG4gICAgICAgIGxldCBkYXRhPUJvc3NSZXdhcmRNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0UmV3YXJkQnlTY29yZShCb3NzQ2hhbGxlbmdlTWFuYWdlci5nZXRJbnN0YW5jZSgpLmN1cl9jaGFsbGVuZ2VfbW9kZSxDaGFsbGVuZ2VEYW1hZ2UpO1xyXG4gICAgICAgIGVuZGxlc3MuZ2V0Q2hpbGRCeU5hbWUoXCJpdGVtXCIpLng9LTgwXHJcbiAgICAgICAgZW5kbGVzcy5nZXRDaGlsZEJ5TmFtZShcIml0ZW0xXCIpLng9ODBcclxuXHJcbiAgICAgICAgbGV0IG15aXRlbT1Qcm9wTWFuYWdlci5nZXRJbnN0YW5jZSgpLmNyZWF0ZVByb3BJdGVtKEJvc3NSZXdhcmRNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0UmV3YXJkSXRlbShkYXRhLmN1ckRhdGEuUmV3YXJkTGV2ZWwpLEJvc3NSZXdhcmRNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0UmV3YXJkTnVtKGRhdGEuY3VyRGF0YS5SZXdhcmRMZXZlbCkpO1xyXG4gICAgICAgIG15aXRlbS5zY2FsZT0wO1xyXG4gICAgICAgIFByb3BNYW5hZ2VyLmdldEluc3RhbmNlKCkuY2hhbmdlUHJvcE51bShCb3NzUmV3YXJkTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldFJld2FyZEl0ZW0oZGF0YS5jdXJEYXRhLlJld2FyZExldmVsKSxCb3NzUmV3YXJkTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldFJld2FyZE51bShkYXRhLmN1ckRhdGEuUmV3YXJkTGV2ZWwpKTtcclxuICAgICAgICBGb2xsb3dNYW5hZ2VyLmdldEluc3RhbmNlKCkuZm9sbG93RXZlbnQoRm9sbG93X1R5cGUuQk9TU+aMkeaImF/lrozmiJDml7bmi7/liLDnmoTlpZblirHnuqfliKsrZGF0YS5jdXJEYXRhLlJld2FyZExldmVsKTtcclxuXHJcbiAgICAgICAgbXlpdGVtLnBhcmVudD1lbmRsZXNzLmdldENoaWxkQnlOYW1lKFwiaXRlbVwiKVxyXG5cclxuICAgICAgICBsZXQgbXlpdGVtMT1Qcm9wTWFuYWdlci5nZXRJbnN0YW5jZSgpLmNyZWF0ZVByb3BJdGVtKEJvc3NSZXdhcmRNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0UmV3YXJkSXRlbV8yKGRhdGEuY3VyRGF0YS5SZXdhcmRMZXZlbCksQm9zc1Jld2FyZE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRSZXdhcmROdW1fMihkYXRhLmN1ckRhdGEuUmV3YXJkTGV2ZWwpKTtcclxuICAgICAgICBteWl0ZW0xLnNjYWxlPTA7XHJcbiAgICAgICAgUHJvcE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5jaGFuZ2VQcm9wTnVtKEJvc3NSZXdhcmRNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0UmV3YXJkSXRlbV8yKGRhdGEuY3VyRGF0YS5SZXdhcmRMZXZlbCksQm9zc1Jld2FyZE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRSZXdhcmROdW1fMihkYXRhLmN1ckRhdGEuUmV3YXJkTGV2ZWwpKTtcclxuICAgICAgICBcclxuICAgICAgICBteWl0ZW0xLnBhcmVudD1lbmRsZXNzLmdldENoaWxkQnlOYW1lKFwiaXRlbTFcIilcclxuXHJcbiAgICAgICAgaWYoQm9zc0NoYWxsZW5nZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRNYXhEYW1hZ2VOdW1iZXIoKSA+IFRhc2tNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0VGFza05vd1Byb2dyZXNzKFRhc2tJdGVtLmJvc3Pni6nnjI7liIbmlbDliLDovr5Y5Lyk5a6zKSl7XHJcbiAgICAgICAgICAgIFRhc2tNYW5hZ2VyLmdldEluc3RhbmNlKCkuZW1pdFRhc2soVGFza0l0ZW0uYm9zc+eLqeeMjuWIhuaVsOWIsOi+vljkvKTlrrMpO1xyXG4gICAgICAgIH1cclxuXHJcblxyXG4gICAgICAgIGNjLnR3ZWVuKFVwKS8v5LiK6Z2i55qE57695q+b5pS+5aSn5Ye65p2lc1xyXG4gICAgICAgIC50bygwLjI0LCB7IHNjYWxlWDoxLjIsc2NhbGVZOjEuMn0pXHJcbiAgICAgICAgLnRvKDAuMjQsIHsgc2NhbGVYOjAuOSxzY2FsZVk6MC45fSkvL+e+veavm+aUvuWwj1xyXG4gICAgICAgIC50bygwLjI2LCB7IHNjYWxlWDoxLHNjYWxlWToxfSkvL+e+veavm+aUvuWkp1xyXG4gICAgICAgIC5jYWxsKCgpID0+IHtcclxuICAgICAgICAgICAgLy/nvr3mr5vliqjnlLtcclxuICAgICAgICAgICAgVXAuZ2V0Q2hpbGRCeU5hbWUoXCJXaW5cIikuZ2V0Q29tcG9uZW50KHNwLlNrZWxldG9uKS5zZXRBbmltYXRpb24oMCxcIldpbl9Mb29wXCIsdHJ1ZSlcclxuICAgICAgICB9KVxyXG4gICAgICAgIC5kZWxheSgxLjUpLy/nrYnlvoVcclxuICAgICAgICAuY2FsbCgoKSA9PiB7XHJcbiAgICAgICAgICAgIGNjLnR3ZWVuKFVwKVxyXG4gICAgICAgICAgICAudG8oMC4xNiwge3kgOjMyN30pIC8v57695q+b5LiK5Y67XHJcbiAgICAgICAgICAgIC5zdGFydCgpXHJcbiAgICAgICAgfSlcclxuICAgICAgICAuZGVsYXkoMC4xNikvL+etieW+hVxyXG4gICAgICAgIC5jYWxsKCgpID0+IHtcclxuICAgICAgICAgICAgY2MudHdlZW4oZW5kbGVzcykvL+WlluWKseWHuuadpVxyXG4gICAgICAgICAgICAudG8oMC4zMywge29wYWNpdHkgOjI1NX0pIFxyXG4gICAgICAgICAgICAuc3RhcnQoKSAgIFxyXG4gICAgICAgIH0pXHJcbiAgICAgICAgLmRlbGF5KDAuMzMpLy/nrYnlvoVcclxuICAgICAgICAuY2FsbCgoKSA9PiB7XHJcbiAgICAgICAgICAgIC8vIGxldCBteWl0ZW09UHJvcE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5jcmVhdGVQcm9wSXRlbShFbmRsZXNzUmV3YXJkTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldFJld2FyZEl0ZW0oQ2hhbGxlbmdlRGFtYWdlKSxFbmRsZXNzUmV3YXJkTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldFJld2FyZE51bShDaGFsbGVuZ2VEYW1hZ2UpKTtcclxuICAgICAgICAgICAgbXlpdGVtLnNjYWxlPTA7XHJcbiAgICAgICAgICAgIG15aXRlbTEuc2NhbGU9MDtcclxuICAgICAgICAgICAgLy8gbXlpdGVtLnBhcmVudD1lbmRsZXNzLmdldENoaWxkQnlOYW1lKFwiaXRlbVwiKVxyXG4gICAgICAgICAgICBjYy50d2VlbihteWl0ZW0pXHJcbiAgICAgICAgICAgIC50bygwLjE3LHtzY2FsZTowLjgzfSlcclxuICAgICAgICAgICAgLmNhbGwoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgY2MudHdlZW4obXlpdGVtMSlcclxuICAgICAgICAgICAgICAgIC50bygwLjE3LHtzY2FsZTowLjgzfSlcclxuICAgICAgICAgICAgICAgIC5jYWxsKCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBjYy50d2VlbihteWl0ZW0pXHJcbiAgICAgICAgICAgICAgICAgICAgLnRvKDAuMTcse3NjYWxlOjF9KVxyXG4gICAgICAgICAgICAgICAgICAgIC50bygwLjE3LHtzY2FsZTowLjgzfSlcclxuICAgICAgICAgICAgICAgICAgICAuc3RhcnQoKVxyXG4gICAgICAgICAgICAgICAgICAgIGNjLnR3ZWVuKG15aXRlbTEpXHJcbiAgICAgICAgICAgICAgICAgICAgLnRvKDAuMTcse3NjYWxlOjF9KVxyXG4gICAgICAgICAgICAgICAgICAgIC50bygwLjE3LHtzY2FsZTowLjgzfSlcclxuICAgICAgICAgICAgICAgICAgICAuY2FsbCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNjLnR3ZWVuKERvd24pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC50bygwLjMzLCB7b3BhY2l0eSA6MjU1fSkgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5jYWxsKCgpPT57XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmNoZWNrVHV0b3JhaWxzKClcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIERvd24uZ2V0Q2hpbGRCeU5hbWUoXCJiZ1wiKS5hY3RpdmU9ZmFsc2VcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgLnN0YXJ0KCkgIFxyXG4gICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgLnN0YXJ0KClcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuc3RhcnQoKVxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAuc3RhcnQoKVxyXG4gICAgICAgIH0pXHJcbiAgICAgICAgLnN0YXJ0KClcclxuICAgICAgICAvLyBsZXQgc2Nyb2xsVmlldz10aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoJ3Byb3BzU2Nyb2xsVmlldycpO1xyXG4gICAgICAgIC8vIGxldCBjb250ZW50PXNjcm9sbFZpZXcuZ2V0Q29tcG9uZW50KGNjLlNjcm9sbFZpZXcpLmNvbnRlbnQ7XHJcbiAgICAgICAgLy8gbGV0IG1vZGU9Qm9zc0NoYWxsZW5nZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5jdXJfY2hhbGxlbmdlX21vZGU7XHJcbiAgICAgICAgLy8gbGV0IHNjb3JlPUJvc3NDaGFsbGVuZ2VNYW5hZ2VyLmdldEluc3RhbmNlKCkuY3VyX3Njb3JlO1xyXG4gICAgICAgIC8vIGxldCBhbGxSZXdhcmREYXRhPUJvc3NSZXdhcmRNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0Qm9zc1Jld2FyZChtb2RlLHNjb3JlKTtcclxuICAgICAgICAvLyBsZXQgbGVuPWFsbFJld2FyZERhdGEubGVuZ3RoO1xyXG4gICAgICAgIC8vIGZvcihsZXQgaT0wOyBpPGxlbjsgaSsrKVxyXG4gICAgICAgIC8vIHtcclxuICAgICAgICAvLyAgICAgbGV0IHJld2FyZERhdGE9YWxsUmV3YXJkRGF0YVtpXTtcclxuICAgICAgICAvLyAgICAgLy/lj6/ku6XojrflvpflpZblk4FcclxuICAgICAgICAvLyAgICAgdGhpcy5zY2hlZHVsZU9uY2UoKCk9PntcclxuICAgICAgICAvLyAgICAgICAgIGxldCBpdGVtPVByb3BNYW5hZ2VyLmdldEluc3RhbmNlKCkuY3JlYXRlUHJvcEl0ZW0ocmV3YXJkRGF0YS5yZXdhcmRfaWQscmV3YXJkRGF0YS5yZXdhcmRfbnVtKTtcclxuICAgICAgICAvLyAgICAgICAgIGNvbnRlbnQuYWRkQ2hpbGQoaXRlbSk7XHJcbiAgICAgICAgLy8gICAgIH0saSowLjEpO1xyXG4gICAgICAgIC8vICAgICBQcm9wTWFuYWdlci5nZXRJbnN0YW5jZSgpLmNoYW5nZVByb3BOdW0ocmV3YXJkRGF0YS5yZXdhcmRfaWQscmV3YXJkRGF0YS5yZXdhcmRfbnVtKTtcclxuICAgICAgICAvLyAgICAgLy/njqnlrrbnu4/pqoxcclxuICAgICAgICAvLyAgICAgaWYocmV3YXJkRGF0YS5yZXdhcmRfaWQ9PVByb3BJZC5Vc2VyRXhwJiZyZXdhcmREYXRhLnJld2FyZF9udW0+MCl7XHJcbiAgICAgICAgLy8gICAgICAgICB0aGlzLnNob3dVc2VyRXhwQW5pbWF0aW9uKHJld2FyZERhdGEucmV3YXJkX251bSk7XHJcbiAgICAgICAgLy8gICAgIH1cclxuICAgICAgICAvLyB9XHJcbiAgICAgICAgLy8gQm9zc0NoYWxsZW5nZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zYXZlQm9zc0NoYWxsZW5nZVN0YWdlKG1vZGUsc2NvcmUpO1xyXG4gICAgfVxyXG5cclxuICAgIHNob3dUb3dlclJld2FyZCgpe1xyXG4gICAgICAgIGxldCBzY3JvbGxWaWV3PXRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZSgncHJvcHNTY3JvbGxWaWV3Jyk7XHJcbiAgICAgICAgbGV0IGNvbnRlbnQ9c2Nyb2xsVmlldy5nZXRDb21wb25lbnQoY2MuU2Nyb2xsVmlldykuY29udGVudDtcclxuICAgICAgICAvL+a3u+WKoOmHkeW4geetiei1hOa6kOWIl+ihqFxyXG4gICAgICAgIGxldCByZXdhcmREYXRhPVRvd2VyUmV3YXJkTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldFJld2FyZERhdGFzKFRvd2VyTWFuYWdlci5nZXRUb3dlckxldmVsKCktMSk7XHJcbiAgICAgICAgZm9yKGxldCBpPTA7IGk8cmV3YXJkRGF0YS5sZW5ndGg7IGkrKyl7XHJcbiAgICAgICAgICAgIGxldCByZD1yZXdhcmREYXRhW2ldO1xyXG4gICAgICAgICAgICBQcm9wTWFuYWdlci5nZXRJbnN0YW5jZSgpLmNoYW5nZVByb3BOdW0ocmQucmV3YXJkX2lkLHJkLnJld2FyZF9udW0pO1xyXG4gICAgICAgICAgICB0aGlzLnNjaGVkdWxlT25jZSgoKT0+e1xyXG4gICAgICAgICAgICAgICAgY29udGVudC5hZGRDaGlsZChQcm9wTWFuYWdlci5nZXRJbnN0YW5jZSgpLmNyZWF0ZVByb3BJdGVtKHJkLnJld2FyZF9pZCxyZC5yZXdhcmRfbnVtKSk7XHJcbiAgICAgICAgICAgIH0saSowLjEpO1xyXG4gICAgICAgICAgICAvL+eOqeWutue7j+mqjFxyXG4gICAgICAgICAgICBpZihyZC5yZXdhcmRfaWQ9PVByb3BJZC5Vc2VyRXhwJiZyZC5yZXdhcmRfbnVtPjApe1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zaG93VXNlckV4cEFuaW1hdGlvbihyZC5yZXdhcmRfbnVtKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBUb3dlck1hbmFnZXIuaXNfc2hvd190b3dlcj10cnVlO1xyXG4gICAgfVxyXG5cclxuICAgIHNob3dNYXplUmV3YXJkKCl7XHJcblxyXG4gICAgICAgIGxldCBnbT1HYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpO1xyXG4gICAgICAgIC8vIGNvbnNvbGUubG9nKFwi6Jma56m66KOC57yd6IOc5Yip55WM6Z2iXCIpICBcclxuICAgICAgICBsZXQgaWQ9IFRpbWVzLnZvaWRzZW5zaWRcclxuICAgICAgICBsZXQgSGV4YWdvblR5cGU9Um9ndWVIZXhhZ29uVHlwZXNNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0SGV4YWdvblR5cGUoaWQpXHJcbiAgICAgICAgbGV0IExheWVycz1Sb2d1ZUhleGFnb25UeXBlc01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRMYXllcnMoaWQpXHJcbiAgICAgICAgaWYoSGV4YWdvblR5cGU9PTUpey8v5aaC5p6c5omT5a6MYm9zc+S6hu+8jOS7o+ihqOi/meS4gOWxguWujOe7k+S6hlxyXG4gICAgICAgICAgICBsZXQgZGFtYWdlPVRoZVN0b3JhZ2VNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0TnVtYmVyKFN0b3JhZ2VLZXkuVm9pZENyYWNrQ2hhbGxlbmdlRGFtYWdlLDApO1xyXG4gICAgICAgICAgICBpZihMYXllcnM+ZGFtYWdlKXtcclxuICAgICAgICAgICAgICAgIGRhbWFnZT1MYXllcnNcclxuICAgICAgICAgICAgICAgIFRoZVN0b3JhZ2VNYW5hZ2VyLmdldEluc3RhbmNlKCkuc2V0SXRlbShTdG9yYWdlS2V5LlZvaWRDcmFja0NoYWxsZW5nZURhbWFnZSxkYW1hZ2UpO1xyXG4gICAgICAgICAgICAgICAgaWYoZGFtYWdlID4gVGFza01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRUYXNrTm93UHJvZ3Jlc3MoVGFza0l0ZW0u6Jma56m65o6i6Zmp6YCa6L+H56ysWOeroCkpe1xyXG4gICAgICAgICAgICAgICAgICAgIFRhc2tNYW5hZ2VyLmdldEluc3RhbmNlKCkuZW1pdFRhc2soVGFza0l0ZW0u6Jma56m65o6i6Zmp6YCa6L+H56ysWOeroCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgLy/pu5HoibLmmJ/mmJ/pmpDol49cclxuICAgICAgICBmb3IgKGxldCBpbmRleCA9IDA7IGluZGV4IDwgdGhpcy5FbmRfU3Rhci5sZW5ndGg7IGluZGV4KyspIHtcclxuICAgICAgICAgICAgdGhpcy5FbmRfU3RhcltpbmRleF0uYWN0aXZlPWZhbHNlXHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8v6ZqQ6JeP5YWz5Y2h5pWwXHJcbiAgICAgICAgbGV0IHhhZ29uVHlwZT0gUm9ndWVIZXhhZ29uVHlwZXNNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0SGV4YWdvblR5cGUoVGltZXMudm9pZHNlbnNpZClcclxuICAgICAgICBpZih4YWdvblR5cGU9PTEpe1xyXG4gICAgICAgICAgICB0aGlzLmxhYmVsX2xldmVsLmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nPUxhbmd1YWdlTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldFN0ckJ5VGV4dElkKDgzMDAwMik7Ly/mma7pgJrmiJjlvblcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYoeGFnb25UeXBlPT0zKXtcclxuICAgICAgICAgICAgdGhpcy5sYWJlbF9sZXZlbC5nZXRDb21wb25lbnQoY2MuTGFiZWwpLnN0cmluZz1MYW5ndWFnZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRTdHJCeVRleHRJZCg4MzAwMDMpOy8v57K+6Iux5oiY5b25XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmKHhhZ29uVHlwZT09NSl7XHJcbiAgICAgICAgICAgIHRoaXMubGFiZWxfbGV2ZWwuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmc9TGFuZ3VhZ2VNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0U3RyQnlUZXh0SWQoODMwMDA0KTsvL2Jvc3PmiJjlvblcclxuICAgICAgICB9XHJcbiAgICAgICAgXHJcbiAgICAgICAgdGhpcy5sYWJlbF9sZXZlbC5hY3RpdmU9dHJ1ZVxyXG4gICAgICAgIC8v5qCH6aKY5L+u5pS5XHJcbiAgICAgICAgdGhpcy53aW5UZXh0LmdldENvbXBvbmVudChUZXh0TGFuZ3VhZ2UpLnNldFRleHRJZCg4MDAwMjcpLy/lrozmiJDmjJHmiJhcclxuXHJcbiAgICAgICAgLy/lia/mnKznoa7orqTmjInpkq5cclxuICAgICAgICB0aGlzLnRleHQuZ2V0Q29tcG9uZW50KFRleHRMYW5ndWFnZSkuc2V0VGV4dElkKDEwMDAwMSlcclxuICAgICAgICBsZXQgVXA9dGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKFwiVXBcIilcclxuICAgICAgICBsZXQgdm9pZHNlbnM9dGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKFwidm9pZHNlbnNcIilcclxuICAgICAgICBsZXQgRG93bj10aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJEb3duXCIpXHJcbiAgICAgICAgVXAuc2V0U2NhbGUoMCwwKVxyXG4gICAgICAgIFVwLnk9MTAwXHJcbiAgICAgICAgdm9pZHNlbnMub3BhY2l0eT0wXHJcbiAgICAgICAgRG93bi5vcGFjaXR5PTBcclxuICAgICAgICBEb3duLnk9MTY3XHJcbiAgICAgICAgRG93bi5nZXRDaGlsZEJ5TmFtZShcImJ0bkhvbWVcIikuYWN0aXZlPWZhbHNlXHJcbiAgICAgICAgRG93bi5nZXRDaGlsZEJ5TmFtZShcImJnXCIpLmFjdGl2ZT10cnVlXHJcbiAgICAgICAgVXAuZ2V0Q2hpbGRCeU5hbWUoXCJXaW5cIikuZ2V0Q29tcG9uZW50KHNwLlNrZWxldG9uKS5zZXRBbmltYXRpb24oMCxcIldpbl9TdGFydFwiLGZhbHNlKVxyXG5cclxuICAgICAgICAvL+eUn+aIkOi/measoeaJgOiOt+W+l+eahOWlluWKsVxyXG4gICAgICAgIGxldCBQcm9wMV9JRD1Sb2d1ZUhleGFnb25UeXBlc01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRSb2d1ZVByb3AxX0lEKFRpbWVzLnZvaWRzZW5zaWQpXHJcbiAgICAgICAgbGV0IFByb3AxX1N1bT1Sb2d1ZUhleGFnb25UeXBlc01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRSb2d1ZVByb3AxX1N1bShUaW1lcy52b2lkc2Vuc2lkKVxyXG4gICAgICAgIGxldCBQcm9wMl9JRD1Sb2d1ZUhleGFnb25UeXBlc01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRSb2d1ZVByb3AyX0lEKFRpbWVzLnZvaWRzZW5zaWQpXHJcbiAgICAgICAgbGV0IFByb3AyX1N1bT1Sb2d1ZUhleGFnb25UeXBlc01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRSb2d1ZVByb3AyX1N1bShUaW1lcy52b2lkc2Vuc2lkKVxyXG4gICAgICAgIGxldCByZD1KYWNrcG90TWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldFJld2FyZERhdGFCeUlkKFByb3AyX0lEKTtcclxuXHJcblxyXG4gICAgICAgIGxldCBteWl0ZW09UHJvcE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5jcmVhdGVQcm9wSXRlbShQcm9wMV9JRCxQcm9wMV9TdW0pO1xyXG4gICAgICAgIG15aXRlbS5zY2FsZT0wO1xyXG4gICAgICAgIFByb3BNYW5hZ2VyLmdldEluc3RhbmNlKCkuY2hhbmdlUHJvcE51bShQcm9wMV9JRCxQcm9wMV9TdW0pO1xyXG4gICAgICAgIG15aXRlbS5wYXJlbnQ9dm9pZHNlbnMuZ2V0Q2hpbGRCeU5hbWUoXCJpdGVtMVwiKVxyXG5cclxuICAgICAgICBsZXQgbXlpdGVtMT1Qcm9wTWFuYWdlci5nZXRJbnN0YW5jZSgpLmNyZWF0ZVByb3BJdGVtKHJkLnJld2FyZF9pZCxQcm9wMl9TdW0pO1xyXG4gICAgICAgIG15aXRlbTEuc2NhbGU9MDtcclxuICAgICAgICBQcm9wTWFuYWdlci5nZXRJbnN0YW5jZSgpLmNoYW5nZVByb3BOdW0ocmQucmV3YXJkX2lkLFByb3AyX1N1bSk7XHJcbiAgICAgICAgbXlpdGVtMS5wYXJlbnQ9dm9pZHNlbnMuZ2V0Q2hpbGRCeU5hbWUoXCJpdGVtMlwiKVxyXG5cclxuXHJcbiAgICAgICAgY2MudHdlZW4oVXApLy/kuIrpnaLnmoTnvr3mr5vmlL7lpKflh7rmnaVcclxuICAgICAgICAudG8oMC4yNCwgeyBzY2FsZVg6MS4yLHNjYWxlWToxLjJ9KVxyXG4gICAgICAgIC50bygwLjI0LCB7IHNjYWxlWDowLjksc2NhbGVZOjAuOX0pLy/nvr3mr5vmlL7lsI9cclxuICAgICAgICAudG8oMC4yNiwgeyBzY2FsZVg6MSxzY2FsZVk6MX0pLy/nvr3mr5vmlL7lpKdcclxuICAgICAgICAuY2FsbCgoKSA9PiB7XHJcbiAgICAgICAgICAgIC8v57695q+b5Yqo55S7XHJcbiAgICAgICAgICAgIFVwLmdldENoaWxkQnlOYW1lKFwiV2luXCIpLmdldENvbXBvbmVudChzcC5Ta2VsZXRvbikuc2V0QW5pbWF0aW9uKDAsXCJXaW5fTG9vcFwiLHRydWUpXHJcbiAgICAgICAgfSlcclxuICAgICAgICAuZGVsYXkoMS41KS8v562J5b6FXHJcbiAgICAgICAgLmNhbGwoKCkgPT4ge1xyXG4gICAgICAgICAgICBjYy50d2VlbihVcClcclxuICAgICAgICAgICAgLnRvKDAuMTYsIHt5IDozMjd9KSAvL+e+veavm+S4iuWOu1xyXG4gICAgICAgICAgICAuc3RhcnQoKVxyXG4gICAgICAgIH0pXHJcbiAgICAgICAgLmRlbGF5KDAuMTYpLy/nrYnlvoVcclxuICAgICAgICAuY2FsbCgoKSA9PiB7XHJcbiAgICAgICAgICAgIGNjLnR3ZWVuKHZvaWRzZW5zKS8v5aWW5Yqx5Ye65p2lXHJcbiAgICAgICAgICAgIC50bygwLjMzLCB7b3BhY2l0eSA6MjU1fSkgXHJcbiAgICAgICAgICAgIC5zdGFydCgpICAgXHJcbiAgICAgICAgfSlcclxuICAgICAgICAuZGVsYXkoMC4zMykvL+etieW+hVxyXG4gICAgICAgIC5jYWxsKCgpID0+IHtcclxuICAgICAgICAgICAgbXlpdGVtLnNjYWxlPTA7XHJcbiAgICAgICAgICAgIG15aXRlbTEuc2NhbGU9MDtcclxuICAgICAgICAgICAgY2MudHdlZW4obXlpdGVtKVxyXG4gICAgICAgICAgICAudG8oMC4xNyx7c2NhbGU6MC44M30pXHJcbiAgICAgICAgICAgIC5jYWxsKCgpID0+IHtcclxuICAgICAgICAgICAgICAgIGNjLnR3ZWVuKG15aXRlbTEpXHJcbiAgICAgICAgICAgICAgICAudG8oMC4xNyx7c2NhbGU6MC44M30pXHJcbiAgICAgICAgICAgICAgICAuY2FsbCgoKSA9PiB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGNjLnR3ZWVuKG15aXRlbTEpXHJcbiAgICAgICAgICAgICAgICAgICAgLnRvKDAuMTcse3NjYWxlOjF9KVxyXG4gICAgICAgICAgICAgICAgICAgIC50bygwLjE3LHtzY2FsZTowLjgzfSlcclxuICAgICAgICAgICAgICAgICAgICAuc3RhcnQoKVxyXG5cclxuICAgICAgICAgICAgICAgICAgICBjYy50d2VlbihteWl0ZW0pXHJcbiAgICAgICAgICAgICAgICAgICAgLnRvKDAuMTcse3NjYWxlOjF9KVxyXG4gICAgICAgICAgICAgICAgICAgIC50bygwLjE3LHtzY2FsZTowLjgzfSlcclxuICAgICAgICAgICAgICAgICAgICAuY2FsbCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNjLnR3ZWVuKERvd24pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC50bygwLjMzLCB7b3BhY2l0eSA6MjU1fSkgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5jYWxsKCgpPT57XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBEb3duLmdldENoaWxkQnlOYW1lKFwiYmdcIikuYWN0aXZlPWZhbHNlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5zdGFydCgpICBcclxuICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgIC5zdGFydCgpXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLnN0YXJ0KClcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgLnN0YXJ0KClcclxuICAgICAgICB9KVxyXG4gICAgICAgIC5zdGFydCgpXHJcbiAgICB9XHJcbiAgICBcclxuICAgIHNob3dVbmxvY2tIZXJvKClcclxuICAgIHtcclxuICAgICAgICAvL+WIpOaWreiLsembhOaYr+WQpuaWsOino+mUgVxyXG4gICAgICAgIGZvcihsZXQgaT1IZXJvX1R5cGUuUGFvU2hvdTsgaTxIZXJvX1R5cGUuSGVyb19OdW07IGkrKylcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGlmKEhlcm9NYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0SGVyb0xldmVsKGkpPjAgJiYgSGVyb01hbmFnZXIuZ2V0SGVyb0lzTmVlZFRpcChpKT09dHJ1ZSlcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgVUlNYW5hZ2VyLmdldEluc3RhbmNlKCkuc2hvd0dldEhlcm9VaShpKTsgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0gICBcclxuICAgIH1cclxuXHJcbiAgICAvLyBjaGVha0Z1bmNVbmxvY2soKXtcclxuICAgIC8vICAgICBsZXQgdW5sb2NrSWRzPW5ldyBBcnJheSgpO1xyXG4gICAgLy8gICAgIGxldCBmZG09RnVuY3Rpb25EZWZpbml0aW9uTWFuYWdlci5nZXRJbnN0YW5jZSgpO1xyXG4gICAgLy8gICAgIGxldCBmaW5pc2hMZXZlbD1MZXZlbE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5maW5pc2hfbGV2ZWw7XHJcbiAgICAvLyAgICAgZm9yKGxldCBpPUZ1bmNfVHlwZS5MaUNoZW5nQmVpOyBpPEZ1bmNfVHlwZS5OdW07IGkrKyl7XHJcbiAgICAvLyAgICAgICAgIGxldCBqc29uRGF0YT1mZG0uZ2V0SnNvbkZ1bmN0aW9uRGVmaW5pdGlvbihpKTtcclxuICAgIC8vICAgICAgICAgbGV0IHR5cGU9anNvbkRhdGEuVW5sb2NrQ29uZGl0aW9uVHlwZTtcclxuICAgIC8vICAgICAgICAgbGV0IHZhbHVlPWpzb25EYXRhLlVubG9ja0NvbmRpY3Rpb25QYXJhbWV0ZXI7XHJcbiAgICAvLyAgICAgICAgIGlmKHR5cGU9PTIpe1xyXG4gICAgLy8gICAgICAgICAgICAgaWYoZmluaXNoTGV2ZWw+PXZhbHVlKXtcclxuICAgIC8vICAgICAgICAgICAgICAgICAvL+WIpOaWreaYr+WQpuaPkOekuui/h1xyXG4gICAgLy8gICAgICAgICAgICAgICAgIGlmKEZ1bmN0aW9uRGVmaW5pdGlvbk1hbmFnZXIuZ2V0RnVuY0hpbnQoaSk8PTApe1xyXG4gICAgLy8gICAgICAgICAgICAgICAgICAgICB1bmxvY2tJZHMucHVzaChpKTtcclxuICAgIC8vICAgICAgICAgICAgICAgICB9XHJcbiAgICAvLyAgICAgICAgICAgICB9XHJcbiAgICAvLyAgICAgICAgIH1cclxuICAgIC8vICAgICB9XHJcbiAgICAvLyAgICAgLy/nm67liY3op6PplIHnmoRcclxuICAgIC8vICAgICBpZih1bmxvY2tJZHMubGVuZ3RoPjApe1xyXG4gICAgLy8gICAgICAgICBGdW5jdGlvbkRlZmluaXRpb25NYW5hZ2VyLnNhdmVGdW5jTGlzdCh1bmxvY2tJZHMpO1xyXG4gICAgLy8gICAgICAgICBGdW5jdGlvbkRlZmluaXRpb25NYW5hZ2VyLmNoZWFrRnVuY1VubG9jaygpO1xyXG4gICAgLy8gICAgIH1cclxuICAgIC8vIH1cclxuXHJcbiAgICBjaGVha1VzZXJMZXZlbCgpe1xyXG4gICAgICAgIFxyXG4gICAgfSAgICBcclxuXHJcbiAgICBnZXROYW1lQnlUeXBlKHR5cGU6R29fVHlwZSk6c3RyaW5nXHJcbiAgICB7XHJcbiAgICAgICAgbGV0IG5hbWU9Jyc7XHJcbiAgICAgICAgbGV0IGxtPUxhbmd1YWdlTWFuYWdlci5nZXRJbnN0YW5jZSgpO1xyXG4gICAgICAgIHN3aXRjaCh0eXBlKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgY2FzZSBHb19UeXBlLk1haW46IG5hbWU9bG0uZ2V0U3RyaW5nKExhbmd1YWdlSW5kZXguZmlnaHRpbmcpOyBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBHb19UeXBlLk1haW5fRW5lbXlJbmZvOiBuYW1lPWxtLmdldFN0cmluZyhMYW5ndWFnZUluZGV4Lk1vbnN0ZXJNYW51YWwpOyBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBHb19UeXBlLk1haW5fTWlsZXN0b25lOiBuYW1lPWxtLmdldFN0cmluZyhMYW5ndWFnZUluZGV4Lk1pbGVzdG9uZSk7IGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIEdvX1R5cGUuTWFpbl9TaWduOiBuYW1lPWxtLmdldFN0cmluZyhMYW5ndWFnZUluZGV4LlNpZ25faW4pOzsgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgR29fVHlwZS5NYWluX1NwaW46IG5hbWU9bG0uZ2V0U3RyaW5nKExhbmd1YWdlSW5kZXguTHVja3lfU3Bpbik7OyBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBHb19UeXBlLk1haW5fVGFzazogbmFtZT1sbS5nZXRTdHJpbmcoTGFuZ3VhZ2VJbmRleC5EYWlseV90YXNrKTs7IGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIEdvX1R5cGUuUm9sZTogbmFtZT1sbS5nZXRTdHJpbmcoTGFuZ3VhZ2VJbmRleC5oZXJvKTs7IGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIEdvX1R5cGUuUGV0TGlzdDogbmFtZT1sbS5nZXRTdHJpbmcoTGFuZ3VhZ2VJbmRleC5zaG9wKTs7IGJyZWFrO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIG5hbWU7XHJcbiAgICB9XHJcblxyXG4gICAgY2xpY2tCdG5Ib21lKClcclxuICAgIHtcclxuICAgICAgICBpZigoTWFwTWFuYWdlci5DdXJyZW50bGV2ZWwrMSk8TWlzc2lvbkxldmVsTWFuYWdlci5nZXRNYXhMZXZlbCgpKXtcclxuICAgICAgICAgICAgTWFwTWFuYWdlci5DdXJyZW50bGV2ZWw9TWFwTWFuYWdlci5DdXJyZW50bGV2ZWwrMVxyXG4gICAgICAgIH1cclxuIFxyXG4gICAgICAgIEdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuc291bmRfbWFuYWdlci5wbGF5U291bmQoU291bmRJbmRleC5jbGljayk7ICAgICAgICBcclxuICAgICAgICBzd2l0Y2goR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5jdXJfZ2FtZV9tb2RlKXtcclxuICAgICAgICAgICAgY2FzZSBHYW1lTW9kZS5NYWluOntcclxuICAgICAgICAgICAgICAgIEdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2FtZV90b19ob21lPUdvX1R5cGUuTWFpbjtcclxuICAgICAgICAgICAgfWJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIEdhbWVNb2RlLlRvd2VyOntcclxuICAgICAgICAgICAgICAgIEdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2FtZV90b19ob21lPUdvX1R5cGUuQWN0aXZpdHk7ICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIH1icmVhaztcclxuICAgICAgICAgICAgY2FzZSBHYW1lTW9kZS5FbmRsZXNzOntcclxuICAgICAgICAgICAgICAgIEdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2FtZV90b19ob21lPUdvX1R5cGUuQWN0aXZpdHk7XHJcbiAgICAgICAgICAgIH1icmVhaztcclxuICAgICAgICAgICAgY2FzZSBHYW1lTW9kZS5Cb3NzX0NoYWxsZW5nZTp7ICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nYW1lX3RvX2hvbWU9R29fVHlwZS5BY3Rpdml0eTtcclxuICAgICAgICAgICAgfWJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIEdhbWVNb2RlLk1hemU6e1xyXG4gICAgICAgICAgICAgICAgTWF6ZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5yZXNldEhlcm9CaW5kKCk7XHJcbiAgICAgICAgICAgIH1icmVhaztcclxuICAgICAgICB9XHJcbiAgICAgICAgR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5iYWNrVG9Ib21lKCk7XHJcbiAgICB9XHJcblxyXG4gICAgY2xpY2tCdG5WaWRlbygpXHJcbiAgICB7XHJcbiAgICAgICAgR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zb3VuZF9tYW5hZ2VyLnBsYXlTb3VuZChTb3VuZEluZGV4LmNsaWNrKTtcclxuICAgICAgICBsZXQgYnRuVmlkZW89dGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKCdidG5WaWRlbycpO1xyXG4gICAgICAgIGJ0blZpZGVvLmFjdGl2ZT1mYWxzZTtcclxuICAgICAgICBBZE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zaG93VmlkZW8oKGlzU3VjOmJvb2xlYW4pPT57XHJcbiAgICAgICAgICAgIGlmKGlzU3VjPT10cnVlKVxyXG4gICAgICAgICAgICB7ICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAvL+mHkeW4gXgzXHJcbiAgICAgICAgICAgICAgICBsZXQgY29pbj1NaXNzaW9uTGV2ZWxNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0UGFzc1Jld2FyZF9Db2luKExldmVsTWFuYWdlci5nZXRJbnN0YW5jZSgpLnN0YXJ0X2xldmVsKTtcclxuICAgICAgICAgICAgICAgIFByb3BNYW5hZ2VyLmdldEluc3RhbmNlKCkuY2hhbmdlUHJvcE51bShQcm9wSWQuQ29pbixjb2luKjMpO1xyXG4gICAgICAgICAgICAgICAgR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zaG93R2V0VGlwKFByb3BNYW5hZ2VyLmdldEluc3RhbmNlKCkuY3JlYXRlUHJvcEl0ZW0oUHJvcElkLkNvaW4sY29pbiozKSk7XHJcbiAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zaG93TWVzc2FnZShMYW5ndWFnZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRTdHJpbmcoTGFuZ3VhZ2VJbmRleC5UaGVfYWRfZmFpbGVkX3RvX3BsYXlfYW5kX3RoZV9yZXdhcmRfY2Fubm90X2JlX29idGFpbmVkKSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LFZJREVPX1RZUEUuQ29pbik7XHJcbiAgICB9XHJcblxyXG4gICAgY2xpY2tCdG5OZXh0KClcclxuICAgIHtcclxuXHJcbiAgICAgICAgbGV0IGdtPUdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCk7XHJcbiAgICAgICAgZ20uc291bmRfbWFuYWdlci5wbGF5U291bmQoU291bmRJbmRleC5jbGljayk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgc3dpdGNoKEdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuY3VyX2dhbWVfbW9kZSl7XHJcbiAgICAgICAgICAgIGNhc2UgR2FtZU1vZGUuTWFpbjp7ICAgICBcclxuICAgICAgICAgICAgICAgIE1hcE1hbmFnZXIuQ3VycmVudGxldmVsPU1hcE1hbmFnZXIuQ3VycmVudGxldmVsKzEgICAgICBcclxuICAgICAgICAgICAgICAgIGxldCBuZXh0TGV2ZWw9TWFwTWFuYWdlci5DdXJyZW50bGV2ZWw7ICAgLy9MZXZlbE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zdGFydF9sZXZlbCsxO1xyXG4gICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICBpZihuZXh0TGV2ZWw+TWlzc2lvbkxldmVsTWFuYWdlci5nZXRNYXhMZXZlbCgpKXtcclxuICAgICAgICAgICAgICAgICAgICBNYXBNYW5hZ2VyLkN1cnJlbnRsZXZlbD1NaXNzaW9uTGV2ZWxNYW5hZ2VyLmdldE1heExldmVsKClcclxuICAgICAgICAgICAgICAgICAgICBHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNob3dNZXNzYWdlKExhbmd1YWdlTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldFN0ckJ5VGV4dElkKDEwMDEyMSksMyk7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zaG93TWVzc2FnZShcIuS9oOWkquWOieWus+WVpu+8jOa1i+ivleeJiOacrOaaguaXtuayoeacieS6hu+8jOaVrOivt+acn+W+heWQjue7reeJiOacrO+8geiusOW+l+WKoGlkXCIsMyk7XHJcbiAgICAgICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgICAgICBpZihuZXh0TGV2ZWw8PShMZXZlbE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5maW5pc2hfbGV2ZWwrMSkpXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZighVHV0b3JhaWxzTWFuYWdlci5nZXRJbnN0YW5jZSgpLmlzX2ZpbmlzaF9nYW1lKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIExldmVsTWFuYWdlci5nZXRJbnN0YW5jZSgpLnN0YXJ0X2xldmVsPW5leHRMZXZlbDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGdtLmZpZ2h0aW5nX2luZm89VHV0b3JpYWxMZXZlbE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRGaWdodGluZ0luZm8oTGV2ZWxNYW5hZ2VyLmdldEluc3RhbmNlKCkuc3RhcnRfbGV2ZWwpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIExldmVsTWFuYWdlci5nZXRJbnN0YW5jZSgpLnN0YXJ0X2xldmVsPW5leHRMZXZlbDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGdtLmZpZ2h0aW5nX2luZm89TWlzc2lvbkxldmVsTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldEZpZ2h0aW5nSW5mbyhMZXZlbE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zdGFydF9sZXZlbCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLnN0YXJ0TmV4dExldmVsKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgc3VwZXIub25DbG9zZSgpO1xyXG4gICAgICAgICAgICAgICAgfSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIH1icmVhaztcclxuICAgICAgICAgICAgY2FzZSBHYW1lTW9kZS5Ub3dlcjp7XHJcbiAgICAgICAgICAgICAgICBpZihUb3dlck1hbmFnZXIuZ2V0VG93ZXJMZXZlbCgpPFRvd2VyTGV2ZWxNYW5hZ2VyLmdldE1heEZsb29yKCkpe1xyXG4gICAgICAgICAgICAgICAgICAgIEdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuc3RhcnROZXh0TGV2ZWwoKTtcclxuICAgICAgICAgICAgICAgICAgICBzdXBlci5vbkNsb3NlKCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1icmVhaztcclxuICAgICAgICAgICAgY2FzZSBHYW1lTW9kZS5FbmRsZXNzOntcclxuICAgICAgICAgICAgICAgICBHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdhbWVfdG9faG9tZT1Hb19UeXBlLkFjdGl2aXR5X0VuZGxlc3M7XHJcbiAgICAgICAgICAgICAgICAgR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5iYWNrVG9Ib21lKCk7XHJcbiAgICAgICAgICAgIH1icmVhaztcclxuICAgICAgICAgICAgY2FzZSBHYW1lTW9kZS5Cb3NzX0NoYWxsZW5nZTp7XHJcbiAgICAgICAgICAgICAgICBHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdhbWVfdG9faG9tZT1Hb19UeXBlLkFjdGl2aXR5X0Jvc3M7XHJcbiAgICAgICAgICAgICAgICBHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLmJhY2tUb0hvbWUoKTtcclxuICAgICAgICAgICAgfWJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIEdhbWVNb2RlLk1hemU6e1xyXG4gICAgICAgICAgICAgICAgbGV0IGlkPSBUaW1lcy52b2lkc2Vuc2lkXHJcbiAgICAgICAgICAgICAgICBsZXQgSGV4YWdvblR5cGU9Um9ndWVIZXhhZ29uVHlwZXNNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0SGV4YWdvblR5cGUoaWQpXHJcbiAgICAgICAgICAgICAgICBpZihIZXhhZ29uVHlwZT09NSl7Ly/lpoLmnpzmiZPlroxib3Nz5LqG77yM5Luj6KGo6L+Z5LiA5bGC5a6M57uT5LqGXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gbGV0IGRhbWFnZT1UaGVTdG9yYWdlTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldE51bWJlcihTdG9yYWdlS2V5LlZvaWRDcmFja0NoYWxsZW5nZURhbWFnZSwwKTtcclxuICAgICAgICAgICAgICAgICAgICAvLyBkYW1hZ2UrK1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIGlmKGRhbWFnZT44KXtcclxuICAgICAgICAgICAgICAgICAgICAvLyAgICAgZGFtYWdlPThcclxuICAgICAgICAgICAgICAgICAgICAvLyB9XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gVGhlU3RvcmFnZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zZXRJdGVtKFN0b3JhZ2VLZXkuVW5saW1pdGVkQ2hhbGxlbmdlRGFtYWdlLGRhbWFnZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nYW1lX3RvX2hvbWU9R29fVHlwZS5BY3Rpdml0eV9NYXplX2xvc2U7XHJcbiAgICAgICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgICAgICBHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdhbWVfdG9faG9tZT1Hb19UeXBlLkFjdGl2aXR5X01hemU7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLmJhY2tUb0hvbWUoKTtcclxuICAgICAgICAgICAgfWJyZWFrO1xyXG5cclxuXHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBjbGlja0J0bk9rKCl7XHJcbiAgICAgICAgR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zb3VuZF9tYW5hZ2VyLnBsYXlTb3VuZChTb3VuZEluZGV4LmNsaWNrKTtcclxuICAgICAgICBHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdhbWVfdG9faG9tZT1Hb19UeXBlLkFjdGl2aXR5O1xyXG4gICAgICAgIHN3aXRjaChHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLmN1cl9nYW1lX21vZGUpe1xyXG4gICAgICAgICAgICBjYXNlIEdhbWVNb2RlLk1hemU6e1xyXG4gICAgICAgICAgICAgICAgVUlNYW5hZ2VyLmdldEluc3RhbmNlKCkuc2hvd01hemVVaSgpO1xyXG4gICAgICAgICAgICAgICAgc3VwZXIub25DbG9zZSgpO1xyXG4gICAgICAgICAgICB9YnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgR2FtZU1vZGUuVG93ZXI6e1xyXG4gICAgICAgICAgICAgICAgR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zdGFydE5leHRMZXZlbCgpO1xyXG4gICAgICAgICAgICAgICAgc3VwZXIub25DbG9zZSgpO1xyXG4gICAgICAgICAgICB9YnJlYWs7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6e1xyXG4gICAgICAgICAgICAgICAgR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5iYWNrVG9Ib21lKCk7XHJcbiAgICAgICAgICAgIH1icmVhaztcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgY2xpY2tCdG5TdGF0cygpe1xyXG4gICAgICAgIEdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuc291bmRfbWFuYWdlci5wbGF5U291bmQoU291bmRJbmRleC5jbGljayk7XHJcbiAgICAgICAgVUlNYW5hZ2VyLmdldEluc3RhbmNlKCkuc2hvd0RhbWFnZVN0YXRzVWkoKTtcclxuICAgIH1cclxuICAgIHByaXZhdGUgZ2V0TGVhZGVyYm9hcmRCeVVzZXJKc29uU3RyaW5nKHR5cGU6IG51bWJlcik6IHN0cmluZyB7XHJcbiAgICAgICAgbGV0IHVpZCA9IFVzZXJEYXRhLmdldEluc3RhbmNlKCkuZ2V0VXNlcklEKCk7XHJcbiAgICAgICAgcmV0dXJuIEpTT04uc3RyaW5naWZ5KHtcclxuICAgICAgICAgICAgbGltaXQ6IDEwMCxcclxuICAgICAgICAgICAgdHlwZTogdHlwZSxcclxuICAgICAgICB9KTtcclxuICAgIH1cclxufVxyXG4iXX0=