"use strict";
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