
import { HttpManager, AccessName } from "../.././NetWork/HttpManager";
import { BossChallengeManager } from "../../Activity/BossChallenge";
import { BossRewardManager } from "../../Activity/BossReward";
import { EndlessLevelsManager } from "../../Activity/EndlessLevels";
import { EndlessRewardManager } from "../../Activity/EndlessReward";
import AdManager from "../../Ads/AdManager";
import { GameMode, GameScene, Go_Type, VIDEO_TYPE } from "../../Constants";
import { RogueHexagonTypesManager } from "../../copy/voidcrack/RogueHexagonTypes";
import GameManager from "../../GameManager";
import MapManager from "../../GuaJi/MapManager";
import { HeroManager } from "../../Hero/Data/HeroManager";
import { Hero_Type } from "../../Hero/Game/HeroConfig";
import { JackpotManager } from "../../JsonData/Jackpot";
import { RewardData } from "../../JsonData/LevelJsonData";
import { PlayerLevelUpManager } from "../../JsonData/PlayerLevelUp";
import { FirstCompleteRewardManager } from "../../Level/FirstCompleteReward";
import { LevelManager } from "../../Level/LevelManager";
import { MissionLevelManager } from "../../Level/MissionLevel";
import { TutorialLevelManager } from "../../Level/TutorialLevel";
import { RogueRewardManager } from "../../Maze/Data/RogueReward";
import { MazeManager } from "../../Maze/MazeManager";
import { MonsterDataManager } from "../../Monster/Data/MonsterDataManager";
import { Follow_Type } from "../../multiLanguage/FollowConstants";
import FollowManager from "../../multiLanguage/FollowManager";
import { LanguageIndex } from "../../multiLanguage/LanguageConstants";
import LanguageManager from "../../multiLanguage/LanguageManager";
import TextLanguage from "../../multiLanguage/TextLanguage";
import { PropId } from "../../Prop/PropConfig";
import { PropManager } from "../../Prop/PropManager";
import { SoundIndex } from "../../Sound/AudioConstants";
import { StorageKey } from "../../Storage/StorageConfig";
import { TheStorageManager } from "../../Storage/StorageManager";
import { TaskItem } from "../../Task/TaskEnum";
import TaskManager from "../../Task/TaskManager";
import { TowerLevelManager } from "../../Tower/TowerLevel";
import TowerManager from "../../Tower/TowerManager";
import { TowerRewardManager } from "../../Tower/TowerReward";
import Times from "../../Turntable/Times";
import RewardSSUi from "../../Tutorials/RewardSSUi";
import TutorailsManager from "../../Tutorials/TutorailsManager";
import UIComponent from "../../UI/UIComponent";
import { UIPath, UILayerLevel } from "../../UI/UIConfig";
import { UIManager } from "../../UI/UIManager";
import UserData from "../../UserData";
import { WallType } from "../../Wall/WallConfig";
import WallManager from "../../Wall/WallManager";


const {ccclass, property} = cc._decorator;

@ccclass
export default class GameWin extends UIComponent {    

    @property(cc.Prefab)
    hero_stats:cc.Prefab=null;
    @property(cc.Node)
    ScrollView:cc.Node=null;

    //跟着本次完成的星星数量
    @property(cc.Node)
    task:cc.Node[]=[];//任务文字
    @property(cc.Node)
    Star:cc.Node[]=[];//大的星星
    @property(cc.Node)
    Staranmtion:cc.Node[]=[];//大的星星的动画

    //跟着最大完成的星星数量
    @property(cc.Node)
    SmallStar:cc.Node[]=[];//小的星星一颗
    @property(cc.Node)
    SmallStar2:cc.Node[]=[];//小的星星二颗
    @property(cc.Node)
    SmallStar3:cc.Node[]=[];//小的星星三颗
    @property(cc.Node)
    End_Bg_hei:cc.Node[]=[];//黑色布之前任务领取的勾
    @property(cc.Node)
    txt:cc.Node[]=[];//已领取文字  之前任务领取的勾

    @property(cc.Node)
    go:cc.Node=null;//本次任务完成的勾


    @property(cc.Node)
    End_Star:cc.Node[]=[];//黑色的星星

    @property(cc.Node)
    label_level:cc.Node=null;//关卡


    @property(cc.Node)
    jiangli:cc.Node=null;//奖励
    
    @property(cc.Node)
    winText:cc.Node=null;//标题文字
    
    @property(cc.Node)
    First_Text_1_CN:cc.Node=null;//新纪录

    @property(cc.Node)
    Highesttxt:cc.Node=null;///本次挑战最高波次~
    
    @property(cc.Node)
    text:cc.Node=null;///副本确认按钮
    
    texts: number[] = [100126, 100128, 100129]//战力:~波数:~伤害:~

    @property(cc.Node)
    RankingSelf: cc.Node = null//自己的头像  排名 
    initUi()
    {
        GameManager.getInstance().sound_manager.playSound(SoundIndex.YX_Win);
        //MonsterDataManager.getInstance().saveAllKillEnemy();


        this.showUserLevel();
        this.showReward();
    }    

    showTeamLevel(level:number){
        let userLevel=this.node.getChildByName('userLevel');
        userLevel.getComponent(cc.Label).string='Lv.'+level;       
    }

    showUserLevel(){
        let userLevel=this.node.getChildByName('userLevel');
        let level=UserData.getInstance().getUserLevel();
        userLevel.getComponent(cc.Label).string='Lv.'+level;
        //进度
        let curExp=UserData.getInstance().getUserExp();
        let maxExp=PlayerLevelUpManager.getInstance().getPlayerExpCost(level);
        this.node.getChildByName('userExp').getComponent(cc.ProgressBar).progress=curExp/maxExp;
    }

    showUserExpAnimation(exp:number){
        //进度
        let level=UserData.getInstance().getUserLevel();
        let curExp=UserData.getInstance().getUserExp();
        let maxExp=PlayerLevelUpManager.getInstance().getPlayerExpCost(level);        
        let progress=this.node.getChildByName('userExp').getComponent(cc.ProgressBar);
        progress.progress=curExp/maxExp;
        let num=30;
        let startNum=0;
        let isShow=false;
        this.showTeamLevel(level);
        this.schedule(()=>{
            curExp+=exp/num;
            let pro=curExp/maxExp;;
            if(pro<1){
                progress.progress=pro;
            }else{
                level++;
                progress.progress=pro%1;
                curExp-=maxExp;
                maxExp=PlayerLevelUpManager.getInstance().getPlayerExpCost(level);                   
                this.showTeamLevel(level);
                //this.showUserLevel();
            }
            startNum++;
            if(!isShow&&startNum>num){
                isShow=true;
                UserData.getInstance().changeUserExp(exp);
                //this.showUserLevel();
            }
        },0.015,num);
        this.showUserLevel();
        //.progress=curExp/maxExp;
    }

    cancelRemainTime()
    {
        let btnHome=this.node.getChildByName('btnHome');
        let label=btnHome.getChildByName('Label').getComponent(cc.Label);
        label.string=LanguageManager.getInstance().getString(LanguageIndex.HOME);
        btnHome.getChildByName('ads').active=false;
        btnHome.getChildByName('time').active=false;
    }

    showReward()
    {
        switch(GameManager.getInstance().cur_game_mode){
            case GameMode.Main:{
                this.showMainReward();
            }break;
            case GameMode.Endless:{
                this.showEndlessReward();
                //BattlePassManager.addTodayTaskProgress(BattlePassTask.Endless);
            }break;
            case GameMode.Boss_Challenge:{
                this.showBossChallengeReward();
                //BattlePassManager.addTodayTaskProgress(BattlePassTask.Boss);
            }break;
            case GameMode.Tower:{
                this.showTowerReward();
                //BattlePassManager.addTodayTaskProgress(BattlePassTask.Tower3);
            }break
            case GameMode.Maze:{
                this.showMazeReward();
                
            }break
        }
    }

    showMainReward(){
        
        for (let jiangliindex = 0; jiangliindex < this.jiangli.children.length; jiangliindex++) {
            this.jiangli.children[jiangliindex].destroy()
        }
        let startLevel= MapManager.Currentlevel;       

        if(startLevel > TaskManager.getInstance().getTaskNowProgress(TaskItem.累计通过X关)){
            TaskManager.getInstance().emitTask(TaskItem.累计通过X关);
        }

        if(startLevel > TaskManager.getInstance().getTaskNowProgress(TaskItem.通关X)){
            TaskManager.getInstance().emitTask(TaskItem.通关X);
        }
        if(LevelManager.getInstance().getFinishChapter() > TaskManager.getInstance().getTaskNowProgress(TaskItem.通关X)){
            TaskManager.getInstance().emitTask(TaskItem.通过第X章);
        }
        // let labelLevel=this.node.getChildByName('label_level');

        let gm=GameManager.getInstance();
        let curStars=[false,false,false] //LevelManager.getInstance().getAllLevelStars(startLevel);

        this.label_level.getComponent(cc.Label).string=""+MissionLevelManager.getInstance().getLevelName((startLevel))
        let mainWall=WallManager.getInstance().getMainWall();
        curStars[0]=true;
        curStars[1]=curStars[1]?true:mainWall.getCurHpPer()>=0.50;
        curStars[2]=curStars[2]?true:mainWall.getCurHpPer()>=0.90;

        let Starnumber=0
        let curStarsnumber=0


        FollowManager.getInstance().followEvent(Follow_Type.战斗成功1星展示次数_x关 + startLevel);

        if(curStars[1]){
            FollowManager.getInstance().followEvent(Follow_Type.战斗成功2星展示次数_x关 + startLevel);
        }
        if(curStars[2]){
            FollowManager.getInstance().followEvent(Follow_Type.战斗成功3星展示次数_x关 + startLevel);
        }



        //之前是否打过星星数量
        for (let LevelStarindex = 1; LevelStarindex <4; LevelStarindex++) {
            if(LevelManager.getInstance().getALevelStar(startLevel,LevelStarindex)){
                Starnumber++
            }
        }

        //这次打的星星数量
        for (let curstarsindex = 0; curstarsindex < curStars.length; curstarsindex++) {
            // console.log("+++++++",curStars)
            this.Star[curstarsindex].scale=0
           if(curStars[curstarsindex]){
                curStarsnumber++
                this.task[curstarsindex].color=cc.color(85,234,85)//任务文字的颜色
                this.Star[curstarsindex].active=true//大星星是否亮起
                //任务文字的文字是否完成
                this.task[curstarsindex].getComponent(TextLanguage).setTextId([140008+curstarsindex,140014],"");//140014 完成   140015未完成
           }else{
                this.task[curstarsindex].color=cc.color(171,163,153)
                this.Star[curstarsindex].active=false
                this.task[curstarsindex].getComponent(TextLanguage).setTextId([140008+curstarsindex,140015],"");//140014 完成   140015未完成
           }
        }

        //如果这次的星星数量超过了之前的星星数量     就将这次的数量存本地   
        if(curStarsnumber>Starnumber){
            LevelManager.getInstance().saveAllLevelStars(startLevel,curStars);
            //这次的星星比之前的星星多了几颗    
            
        }
        let cha=curStarsnumber-Starnumber
        let itmeanmtoin=[]//存所有打钩的奖励
        for (let Starindex = 1; Starindex <= 3; Starindex++) {
            let levelId=FirstCompleteRewardManager.getId(startLevel,Starindex);//默认3个都完成  
            let RewardData=FirstCompleteRewardManager.getInstance().getFirstRewardArr(levelId);
            //是否完成
            let isFinish=curStars[Starindex-1];
            for (let level3 = 0; level3 < RewardData.length; level3++) {
                let rewardData=RewardData[level3];
                //可以获得奖品
                // this.scheduleOnce(()=>{
                let item=PropManager.getInstance().createPropItem(rewardData.reward_id,rewardData.reward_num);
                
                item.x=-57+level3*100;
                item.y=-131-Starindex*120+120;//item.y=-371+Starindex*120-120;
                item.scale=0;
                if(cha>0){//差大于0，代表这次的星星数量比之前的星星数量多    
                    // console.log("星星差：",cha,Starindex,Starnumber,curStarsnumber)
                    if(Starindex<=Starnumber){//这个星星小于等于之前打的星星    就显示已领取
                        this.End_Bg_hei[(Starindex-1)].active=true//已领取的黑布
                        this.txt[(Starindex-1)].active=true   //已领取的文字
                        item.scale=0.83;
                    }
                    if(Starindex>Starnumber){//这个星星大于等于之前打的星星   未领取
                        if(Starindex>curStarsnumber){
                            this.End_Bg_hei[(Starindex-1)].active=false//已领取的黑布
                            this.txt[(Starindex-1)].active=false   //已领取的文字
                            // console.log("没有勾，没有黑布")
                            item.scale=0.83;
                        }else{
                            // console.log("有勾")
                            item.scale=0;
                            this.End_Bg_hei[(Starindex-1)].active=false//已领取的黑布
                            this.txt[(Starindex-1)].active=false   //已领取的文字
                            let mygo=cc.instantiate(this.go)
                            mygo.setPosition(0,0)
                            mygo.active=true
                            mygo.parent=item
                            itmeanmtoin.push(item)
                            PropManager.getInstance().changePropNum(rewardData.reward_id,rewardData.reward_num);
                        }
                    }
                }else{//差小于0，代表这次的星星数量比之前的星星数量少 
                    item.scale=0.83;
                    if(Starindex<=Starnumber){//这个星星小于等于之前打的星星    就显示已领取
                        this.End_Bg_hei[(Starindex-1)].active=true//已领取的黑布
                        this.txt[(Starindex-1)].active=true   //已领取的文字
                    }
                    if(Starindex>Starnumber){//这个星星大于等于之前打的星星   未领取
                        this.End_Bg_hei[(Starindex-1)].active=false//已领取的黑布
                        this.txt[(Starindex-1)].active=false   //已领取的文字
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
        this.ScrollView.getComponent(cc.ScrollView).scrollToBottom(2)


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
        for(let i=0; i<=gm.cur_wave; i++)
        {
            LevelManager.getInstance().setNotFirstPassLevel(startLevel,i);
        }
        GameManager.getInstance().pass_level_num++;
        // if(MapManager.Currentlevel<MissionLevelManager.getMaxLevel()){
        
        // }
        let Up=this.node.getChildByName("Up")
        let Ins=this.node.getChildByName("Ins")
        let In=this.node.getChildByName("In")
        let Down=this.node.getChildByName("Down")
        Up.setScale(0,0)
        Up.y=100
        Ins.y=-300
        Ins.opacity=0
        In.opacity=0
        Down.opacity=0
        Down.getChildByName("bg").active=true
        Down.getChildByName("btnHome").active=true

        Up.getChildByName("Win").getComponent(sp.Skeleton).setAnimation(0,"Win_Start",false)
        cc.tween(Up)//上面的羽毛放大出来
        .to(0.24, { scaleX:1.2,scaleY:1.2})
        .call(() => {
            cc.tween(Ins)//中上的任务出来
            .to(0.24, {opacity :255}) 
            .start()   
        })
        .to(0.24, { scaleX:0.9,scaleY:0.9})//羽毛放小
        .to(0.26, { scaleX:1,scaleY:1})//羽毛放大
        .call(() => {
            //羽毛动画
            Up.getChildByName("Win").getComponent(sp.Skeleton).setAnimation(0,"Win_Loop",true)
            //星星动画
            for (let index = 0; index < this.Star.length; index++) {
                if(this.Star[index].active==true){
                    this.scheduleOnce(function(){
                        this.Staranmtion[index].getComponent(cc.Animation).play()
                        this.Star[index].getComponent(cc.Animation).play()
                    },0.47*index)
                }
            }
        })
        .delay(1.5)//等待
        .call(() => {
            cc.tween(Up)
            .to(0.16, {y :400}) //羽毛上去
            .start()
            cc.tween(Ins)
            .to(0.16, {y :0}) //任务上去
            .start()
        })
        .delay(0.16)//等待
        .call(() => {
            cc.tween(In)//奖励出来
            .to(0.33, {opacity :255}) 
            .start()   
        })
        .delay(0.33)//等待
        .call(() => {
            if(itmeanmtoin.length==0){//如果没有可领取的奖励直接出来按钮
                cc.tween(Down)
                .to(0.33, {opacity :255}) 
                .call(()=>{
                    this.checkTutorails()
                    Down.getChildByName("bg").active=false
                })
                .start()  
            }
            else{//所有可领取的奖励放大缩小---一起放大缩小    之后弹出按钮    c最后弹新手教程
                for (let itmeanmtionindex = 0; itmeanmtionindex < itmeanmtoin.length; itmeanmtionindex++) {
                    itmeanmtoin[itmeanmtionindex].scale=0;
                    cc.tween(itmeanmtoin[itmeanmtionindex])
                    .delay(itmeanmtionindex*0.17)
                        .to(0.17,{scale:0.83})
                        .call(() => {
                            if(itmeanmtionindex==(itmeanmtoin.length-1)){
                                for (let index = 0; index < itmeanmtoin.length; index++) {
                                    cc.tween(itmeanmtoin[index])
                                    .to(0.22,{scale:0.83+0.3})
                                    .delay(0.1)
                                    .to(0.22,{scale:0.83})
                                    .call(() => {
                                        if(index==(itmeanmtoin.length-1)){
                                            cc.tween(Down)
                                            .to(0.33, {opacity :255}) 
                                            .call(()=>{
                                                this.checkTutorails()
                                                Down.getChildByName("bg").active=false
                                            })
                                            .start()  
                                        }
                                    })
                                    .start()  
                                }
                                    
                            }
                        })
                    .start()
                }
            }
        })
        .start()
    }

    checkTutorails(){
        let btnHome=this.node.getChildByName('Down').getChildByName('btnHome');
        btnHome.active=true
        if(!TutorailsManager.getInstance().is_finish&&GameManager.getInstance().cur_game_mode==GameMode.Main)
        {
            if(LevelManager.getInstance().start_level==5 && TutorailsManager.getInstance().isShowTutorials(205))
            {
                UIManager.getInstance().showUiDialog(UIPath.RewardSSUI,UILayerLevel.Two,{onCompleted:(uiNode)=> {
                    uiNode.getComponent(RewardSSUi).initData(1);
                }});
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
    }

    showEndlessReward(){
        let gm=GameManager.getInstance();
        // console.log("无尽挑战胜利界面")
        
        FollowManager.getInstance().followEvent(Follow_Type.完成无尽挑战次数);
    

        
        //黑色星星隐藏
        for (let index = 0; index < this.End_Star.length; index++) {
            this.End_Star[index].active=false
        }
        //隐藏关卡数
        this.label_level.active=false
        //标题修改
        this.winText.getComponent(TextLanguage).setTextId(800027)//完成挑战
        //本次挑战最高波次~
        this.Highesttxt.active=true
        this.Highesttxt.getComponent(TextLanguage).setTextId(800028)
        let ChallengeDamage=TheStorageManager.getInstance().getNumber(StorageKey.UnlimitedChallengeDamage,0)
        this.Highesttxt.getComponent(TextLanguage).setReplaceValue('~',TheStorageManager.getInstance().getNumber(StorageKey.UnlimitedChallengeDamage,0) + '');
        //是否显示新纪录


        if(ChallengeDamage>EndlessLevelsManager.getInstance().getMaxWave()){
            this.First_Text_1_CN.active=true

            let totalnum=TheStorageManager.getInstance().getNumber(StorageKey.TotalUnlimitedChallengeTimes,0);
            totalnum++
            TheStorageManager.getInstance().setItem(StorageKey.TotalUnlimitedChallengeTimes,totalnum);

            EndlessLevelsManager.getInstance().setWave(ChallengeDamage)//游戏胜利之后保存
        }



        FollowManager.getInstance().followEvent(Follow_Type.无尽挑战_完成时到达的波次+ChallengeDamage);
        //副本确认按钮
        this.text.getComponent(TextLanguage).setTextId(100001)
        let Up=this.node.getChildByName("Up")
        let endless=this.node.getChildByName("endless")
        let Down=this.node.getChildByName("Down")
        Up.setScale(0,0)
        Up.y=100
        endless.opacity=0
        Down.opacity=0
        Down.y=72
        Down.getChildByName("btnHome").active=true
        Down.getChildByName("bg").active=true
        Up.getChildByName("Win").getComponent(sp.Skeleton).setAnimation(0,"Win_Start",false)
        let combatPower=0
        let selfranking = -1
        combatPower = EndlessLevelsManager.getInstance().getMaxWave()//HeroManager.getInstance().getAllHeroZhanli()//获取波数
        let CombatPower = this.RankingSelf.getChildByName("CombatPower")
        let SerialNo = this.RankingSelf.getChildByName("SerialNo")
        let name = this.RankingSelf.getChildByName("name")
        let btnAvatar = this.RankingSelf.getChildByName("headPortrait").getChildByName("btnAvatar")
        CombatPower.getComponent(TextLanguage).setTextId(this.texts[1])//是哪个排行榜
        CombatPower.getComponent(TextLanguage).setReplaceValue('~', (combatPower) + '');//排行榜战力数据
        HttpManager.post(AccessName.leaderboardByUser, this.getLeaderboardByUserJsonString(2), false).then((data: any) => {
            let max = data.length;
            for (let index = 0; index < max; index++) {
                if(data[index].uid==UserData.getInstance().getUserID()){    //如果在后台拉取的排名中有id跟玩家的id一样，那么玩家的排名在前100名中  将显示玩家排名   否则显示未上榜
                    selfranking=(index+1)
                }
            }
            if (selfranking == -1) {
                this.RankingSelf.getChildByName("Notlisted").active = true
            } else {
                SerialNo.active=true
                SerialNo.getComponent(cc.Label).string = "" + (selfranking)//序号
                this.RankingSelf.getChildByName("Notlisted").active = false
            }
        });
        let myname = UserData.getInstance().getUserName(); //玩家名字
        let sphea = UserData.getInstance().getUserAvatar();//玩家头像
        name.getComponent(cc.Label).string = "" + myname//玩家名字
        btnAvatar.getComponent(cc.Sprite).spriteFrame = PropManager.getInstance().getSpheadPortraitType(sphea)//头像id
        //生成这次所获得的奖励
        endless.getChildByName("item").x=0
        endless.getChildByName("item1").x=0
        let myitem=PropManager.getInstance().createPropItem(EndlessRewardManager.getInstance().getRewardItem(ChallengeDamage),EndlessRewardManager.getInstance().getRewardNum(ChallengeDamage));
        myitem.scale=0;
        PropManager.getInstance().changePropNum(EndlessRewardManager.getInstance().getRewardItem(ChallengeDamage),EndlessRewardManager.getInstance().getRewardNum(ChallengeDamage));
        myitem.parent=endless.getChildByName("item")

        if(EndlessLevelsManager.getInstance().getMaxWave() > TaskManager.getInstance().getTaskNowProgress(TaskItem.无尽挑战分数到达X波次)){
            TaskManager.getInstance().emitTask(TaskItem.无尽挑战分数到达X波次);
        }

        cc.tween(Up)//上面的羽毛放大出来
        .to(0.24, { scaleX:1.2,scaleY:1.2})
        .to(0.24, { scaleX:0.9,scaleY:0.9})//羽毛放小
        .to(0.26, { scaleX:1,scaleY:1})//羽毛放大
        .call(() => {
            //羽毛动画
            Up.getChildByName("Win").getComponent(sp.Skeleton).setAnimation(0,"Win_Loop",true)
        })
        .delay(1.5)//等待
        .call(() => {
            cc.tween(Up)
            .to(0.16, {y :327}) //羽毛上去
            .start()
        })
        .delay(0.16)//等待
        .call(() => {
            cc.tween(endless)//奖励出来
            .to(0.33, {opacity :255}) 
            .start()   
        })
        .delay(0.33)//等待
        .call(() => {
            // let myitem=PropManager.getInstance().createPropItem(EndlessRewardManager.getInstance().getRewardItem(ChallengeDamage),EndlessRewardManager.getInstance().getRewardNum(ChallengeDamage));
            myitem.scale=0;
            // myitem.parent=endless.getChildByName("item")
            cc.tween(myitem)
            .to(0.17,{scale:0.83})
            .call(() => {
                cc.tween(Down)
                .to(0.33, {opacity :255}) 
                .call(()=>{
                    this.checkTutorails()
                    Down.getChildByName("bg").active=false
                })
                .start()  
            })
            .start()
        })
        .start()
    }
    
    showBossChallengeReward(){
        let gm=GameManager.getInstance();
        // console.log("BOSS挑战胜利界面")
        FollowManager.getInstance().followEvent(Follow_Type.完成BOSS挑战次数);
        //黑色星星隐藏
        for (let index = 0; index < this.End_Star.length; index++) {
            this.End_Star[index].active=false
        }
        //隐藏关卡数
        this.label_level.active=false
        //标题修改
        this.winText.getComponent(TextLanguage).setTextId(800027)//完成挑战
        //本次挑战最高波次~
        this.Highesttxt.active=true
        this.Highesttxt.getComponent(TextLanguage).setTextId(820018)
        let ChallengeDamage=BossChallengeManager.getInstance().cur_score;//TheStorageManager.getInstance().getNumber(StorageKey.BossChallengeDamage,0)
        this.Highesttxt.getComponent(TextLanguage).setReplaceValue('~',ChallengeDamage + '');

        TheStorageManager.getInstance().setItem(StorageKey.BossChallengeDamage,ChallengeDamage);
        //是否显示新纪录
        let zon=ChallengeDamage+BossChallengeManager.getInstance().getMaxDamageNumber()
        // console.log("++++++++",zon,ChallengeDamage,BossChallengeManager.getInstance().getMaxDamageNumber())
        let totalnum=TheStorageManager.getInstance().getNumber(StorageKey.TotalBossChallengeTimes,0);
        totalnum++
        TheStorageManager.getInstance().setItem(StorageKey.TotalBossChallengeTimes,totalnum);

        BossChallengeManager.getInstance().setDamageNumber(zon)//游戏胜利之后保存
        // if(ChallengeDamage>BossChallengeManager.getInstance().getMaxDamageNumber()){
        //     this.First_Text_1_CN.active=true
        //     BossChallengeManager.getInstance().setDamageNumber(ChallengeDamage)//游戏胜利之后保存
        // }

        //副本确认按钮
        this.text.getComponent(TextLanguage).setTextId(100001)
        let Up=this.node.getChildByName("Up")
        let endless=this.node.getChildByName("endless")
        let Down=this.node.getChildByName("Down")
        Up.setScale(0,0)
        Up.y=100
        Down.getChildByName("btnHome").active=true
        endless.opacity=0
        Down.opacity=0
        Down.y=72
        Down.getChildByName("bg").active=true
        Up.getChildByName("Win").getComponent(sp.Skeleton).setAnimation(0,"Win_Start",false)
        let combatPowers=0
        let selfranking = -1
        combatPowers = BossChallengeManager.getInstance().getMaxDamageNumber()//HeroManager.getInstance().getAllHeroZhanli()//获取伤害
        let CombatPower = this.RankingSelf.getChildByName("CombatPower")
        let SerialNo = this.RankingSelf.getChildByName("SerialNo")
        let name = this.RankingSelf.getChildByName("name")
        let btnAvatar = this.RankingSelf.getChildByName("headPortrait").getChildByName("btnAvatar")
        CombatPower.getComponent(TextLanguage).setTextId(this.texts[2])//是哪个排行榜
        CombatPower.getComponent(TextLanguage).setReplaceValue('~', (combatPowers) + '');//排行榜战力数据
        HttpManager.post(AccessName.leaderboardByUser, this.getLeaderboardByUserJsonString(3), false).then((data: any) => {
            let max = data.length;
            for (let index = 0; index < max; index++) {
                if(data[index].uid==UserData.getInstance().getUserID()){    //如果在后台拉取的排名中有id跟玩家的id一样，那么玩家的排名在前100名中  将显示玩家排名   否则显示未上榜
                    selfranking=(index+1)
                }
            }
            if (selfranking == -1) {
                this.RankingSelf.getChildByName("Notlisted").active = true
            } else {
                SerialNo.active=true
                SerialNo.getComponent(cc.Label).string = "" + (selfranking)//序号
                this.RankingSelf.getChildByName("Notlisted").active = false
            }
        });
        let myname = UserData.getInstance().getUserName(); //玩家名字
        let sphea = UserData.getInstance().getUserAvatar();//玩家头像
        name.getComponent(cc.Label).string = "" + myname//玩家名字
        btnAvatar.getComponent(cc.Sprite).spriteFrame = PropManager.getInstance().getSpheadPortraitType(sphea)//头像id
        //生成这次所获得的奖励
        let data=BossRewardManager.getInstance().getRewardByScore(BossChallengeManager.getInstance().cur_challenge_mode,ChallengeDamage);
        endless.getChildByName("item").x=-80
        endless.getChildByName("item1").x=80

        let myitem=PropManager.getInstance().createPropItem(BossRewardManager.getInstance().getRewardItem(data.curData.RewardLevel),BossRewardManager.getInstance().getRewardNum(data.curData.RewardLevel));
        myitem.scale=0;
        PropManager.getInstance().changePropNum(BossRewardManager.getInstance().getRewardItem(data.curData.RewardLevel),BossRewardManager.getInstance().getRewardNum(data.curData.RewardLevel));
        FollowManager.getInstance().followEvent(Follow_Type.BOSS挑战_完成时拿到的奖励级别+data.curData.RewardLevel);

        myitem.parent=endless.getChildByName("item")

        let myitem1=PropManager.getInstance().createPropItem(BossRewardManager.getInstance().getRewardItem_2(data.curData.RewardLevel),BossRewardManager.getInstance().getRewardNum_2(data.curData.RewardLevel));
        myitem1.scale=0;
        PropManager.getInstance().changePropNum(BossRewardManager.getInstance().getRewardItem_2(data.curData.RewardLevel),BossRewardManager.getInstance().getRewardNum_2(data.curData.RewardLevel));
        
        myitem1.parent=endless.getChildByName("item1")

        if(BossChallengeManager.getInstance().getMaxDamageNumber() > TaskManager.getInstance().getTaskNowProgress(TaskItem.boss狩猎分数到达X伤害)){
            TaskManager.getInstance().emitTask(TaskItem.boss狩猎分数到达X伤害);
        }


        cc.tween(Up)//上面的羽毛放大出来s
        .to(0.24, { scaleX:1.2,scaleY:1.2})
        .to(0.24, { scaleX:0.9,scaleY:0.9})//羽毛放小
        .to(0.26, { scaleX:1,scaleY:1})//羽毛放大
        .call(() => {
            //羽毛动画
            Up.getChildByName("Win").getComponent(sp.Skeleton).setAnimation(0,"Win_Loop",true)
        })
        .delay(1.5)//等待
        .call(() => {
            cc.tween(Up)
            .to(0.16, {y :327}) //羽毛上去
            .start()
        })
        .delay(0.16)//等待
        .call(() => {
            cc.tween(endless)//奖励出来
            .to(0.33, {opacity :255}) 
            .start()   
        })
        .delay(0.33)//等待
        .call(() => {
            // let myitem=PropManager.getInstance().createPropItem(EndlessRewardManager.getInstance().getRewardItem(ChallengeDamage),EndlessRewardManager.getInstance().getRewardNum(ChallengeDamage));
            myitem.scale=0;
            myitem1.scale=0;
            // myitem.parent=endless.getChildByName("item")
            cc.tween(myitem)
            .to(0.17,{scale:0.83})
            .call(() => {
                cc.tween(myitem1)
                .to(0.17,{scale:0.83})
                .call(() => {
                    cc.tween(myitem)
                    .to(0.17,{scale:1})
                    .to(0.17,{scale:0.83})
                    .start()
                    cc.tween(myitem1)
                    .to(0.17,{scale:1})
                    .to(0.17,{scale:0.83})
                    .call(() => {
                        cc.tween(Down)
                        .to(0.33, {opacity :255}) 
                        .call(()=>{
                            this.checkTutorails()
                            Down.getChildByName("bg").active=false
                        })
                        .start()  
                    })
                    .start()
                })
                .start()
            })
            .start()
        })
        .start()
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
    }

    showTowerReward(){
        let scrollView=this.node.getChildByName('propsScrollView');
        let content=scrollView.getComponent(cc.ScrollView).content;
        //添加金币等资源列表
        let rewardData=TowerRewardManager.getInstance().getRewardDatas(TowerManager.getTowerLevel()-1);
        for(let i=0; i<rewardData.length; i++){
            let rd=rewardData[i];
            PropManager.getInstance().changePropNum(rd.reward_id,rd.reward_num);
            this.scheduleOnce(()=>{
                content.addChild(PropManager.getInstance().createPropItem(rd.reward_id,rd.reward_num));
            },i*0.1);
            //玩家经验
            if(rd.reward_id==PropId.UserExp&&rd.reward_num>0){
                this.showUserExpAnimation(rd.reward_num);
            }
        }
        TowerManager.is_show_tower=true;
    }

    showMazeReward(){

        let gm=GameManager.getInstance();
        // console.log("虚空裂缝胜利界面")  
        let id= Times.voidsensid
        let HexagonType=RogueHexagonTypesManager.getInstance().getHexagonType(id)
        let Layers=RogueHexagonTypesManager.getInstance().getLayers(id)
        if(HexagonType==5){//如果打完boss了，代表这一层完结了
            let damage=TheStorageManager.getInstance().getNumber(StorageKey.VoidCrackChallengeDamage,0);
            if(Layers>damage){
                damage=Layers
                TheStorageManager.getInstance().setItem(StorageKey.VoidCrackChallengeDamage,damage);
                if(damage > TaskManager.getInstance().getTaskNowProgress(TaskItem.虚空探险通过第X章)){
                    TaskManager.getInstance().emitTask(TaskItem.虚空探险通过第X章);
                }
            }
        }
        //黑色星星隐藏
        for (let index = 0; index < this.End_Star.length; index++) {
            this.End_Star[index].active=false
        }
        //隐藏关卡数
        let xagonType= RogueHexagonTypesManager.getInstance().getHexagonType(Times.voidsensid)
        if(xagonType==1){
            this.label_level.getComponent(cc.Label).string=LanguageManager.getInstance().getStrByTextId(830002);//普通战役
        }
        if(xagonType==3){
            this.label_level.getComponent(cc.Label).string=LanguageManager.getInstance().getStrByTextId(830003);//精英战役
        }
        if(xagonType==5){
            this.label_level.getComponent(cc.Label).string=LanguageManager.getInstance().getStrByTextId(830004);//boss战役
        }
        
        this.label_level.active=true
        //标题修改
        this.winText.getComponent(TextLanguage).setTextId(800027)//完成挑战

        //副本确认按钮
        this.text.getComponent(TextLanguage).setTextId(100001)
        let Up=this.node.getChildByName("Up")
        let voidsens=this.node.getChildByName("voidsens")
        let Down=this.node.getChildByName("Down")
        Up.setScale(0,0)
        Up.y=100
        voidsens.opacity=0
        Down.opacity=0
        Down.y=167
        Down.getChildByName("btnHome").active=false
        Down.getChildByName("bg").active=true
        Up.getChildByName("Win").getComponent(sp.Skeleton).setAnimation(0,"Win_Start",false)

        //生成这次所获得的奖励
        let Prop1_ID=RogueHexagonTypesManager.getInstance().getRogueProp1_ID(Times.voidsensid)
        let Prop1_Sum=RogueHexagonTypesManager.getInstance().getRogueProp1_Sum(Times.voidsensid)
        let Prop2_ID=RogueHexagonTypesManager.getInstance().getRogueProp2_ID(Times.voidsensid)
        let Prop2_Sum=RogueHexagonTypesManager.getInstance().getRogueProp2_Sum(Times.voidsensid)
        let rd=JackpotManager.getInstance().getRewardDataById(Prop2_ID);


        let myitem=PropManager.getInstance().createPropItem(Prop1_ID,Prop1_Sum);
        myitem.scale=0;
        PropManager.getInstance().changePropNum(Prop1_ID,Prop1_Sum);
        myitem.parent=voidsens.getChildByName("item1")

        let myitem1=PropManager.getInstance().createPropItem(rd.reward_id,Prop2_Sum);
        myitem1.scale=0;
        PropManager.getInstance().changePropNum(rd.reward_id,Prop2_Sum);
        myitem1.parent=voidsens.getChildByName("item2")


        cc.tween(Up)//上面的羽毛放大出来
        .to(0.24, { scaleX:1.2,scaleY:1.2})
        .to(0.24, { scaleX:0.9,scaleY:0.9})//羽毛放小
        .to(0.26, { scaleX:1,scaleY:1})//羽毛放大
        .call(() => {
            //羽毛动画
            Up.getChildByName("Win").getComponent(sp.Skeleton).setAnimation(0,"Win_Loop",true)
        })
        .delay(1.5)//等待
        .call(() => {
            cc.tween(Up)
            .to(0.16, {y :327}) //羽毛上去
            .start()
        })
        .delay(0.16)//等待
        .call(() => {
            cc.tween(voidsens)//奖励出来
            .to(0.33, {opacity :255}) 
            .start()   
        })
        .delay(0.33)//等待
        .call(() => {
            myitem.scale=0;
            myitem1.scale=0;
            cc.tween(myitem)
            .to(0.17,{scale:0.83})
            .call(() => {
                cc.tween(myitem1)
                .to(0.17,{scale:0.83})
                .call(() => {

                    cc.tween(myitem1)
                    .to(0.17,{scale:1})
                    .to(0.17,{scale:0.83})
                    .start()

                    cc.tween(myitem)
                    .to(0.17,{scale:1})
                    .to(0.17,{scale:0.83})
                    .call(() => {
                        cc.tween(Down)
                        .to(0.33, {opacity :255}) 
                        .call(()=>{
                            Down.getChildByName("bg").active=false
                        })
                        .start()  
                    })
                    .start()
                })
                .start()
            })
            .start()
        })
        .start()
    }
    
    showUnlockHero()
    {
        //判断英雄是否新解锁
        for(let i=Hero_Type.PaoShou; i<Hero_Type.Hero_Num; i++)
        {
            if(HeroManager.getInstance().getHeroLevel(i)>0 && HeroManager.getHeroIsNeedTip(i)==true)
            {
                UIManager.getInstance().showGetHeroUi(i);                
                break;
            }
        }   
    }

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

    cheakUserLevel(){
        
    }    

    getNameByType(type:Go_Type):string
    {
        let name='';
        let lm=LanguageManager.getInstance();
        switch(type)
        {
            case Go_Type.Main: name=lm.getString(LanguageIndex.fighting); break;
            case Go_Type.Main_EnemyInfo: name=lm.getString(LanguageIndex.MonsterManual); break;
            case Go_Type.Main_Milestone: name=lm.getString(LanguageIndex.Milestone); break;
            case Go_Type.Main_Sign: name=lm.getString(LanguageIndex.Sign_in);; break;
            case Go_Type.Main_Spin: name=lm.getString(LanguageIndex.Lucky_Spin);; break;
            case Go_Type.Main_Task: name=lm.getString(LanguageIndex.Daily_task);; break;
            case Go_Type.Role: name=lm.getString(LanguageIndex.hero);; break;
            case Go_Type.PetList: name=lm.getString(LanguageIndex.shop);; break;
        }

        return name;
    }

    clickBtnHome()
    {
        if((MapManager.Currentlevel+1)<MissionLevelManager.getMaxLevel()){
            MapManager.Currentlevel=MapManager.Currentlevel+1
        }
 
        GameManager.getInstance().sound_manager.playSound(SoundIndex.click);        
        switch(GameManager.getInstance().cur_game_mode){
            case GameMode.Main:{
                GameManager.getInstance().game_to_home=Go_Type.Main;
            }break;
            case GameMode.Tower:{
                GameManager.getInstance().game_to_home=Go_Type.Activity;            
            }break;
            case GameMode.Endless:{
                GameManager.getInstance().game_to_home=Go_Type.Activity;
            }break;
            case GameMode.Boss_Challenge:{                
                GameManager.getInstance().game_to_home=Go_Type.Activity;
            }break;
            case GameMode.Maze:{
                MazeManager.getInstance().resetHeroBind();
            }break;
        }
        GameManager.getInstance().backToHome();
    }

    clickBtnVideo()
    {
        GameManager.getInstance().sound_manager.playSound(SoundIndex.click);
        let btnVideo=this.node.getChildByName('btnVideo');
        btnVideo.active=false;
        AdManager.getInstance().showVideo((isSuc:boolean)=>{
            if(isSuc==true)
            {               
                //金币x3
                let coin=MissionLevelManager.getInstance().getPassReward_Coin(LevelManager.getInstance().start_level);
                PropManager.getInstance().changePropNum(PropId.Coin,coin*3);
                GameManager.getInstance().showGetTip(PropManager.getInstance().createPropItem(PropId.Coin,coin*3));
            }else{
                GameManager.getInstance().showMessage(LanguageManager.getInstance().getString(LanguageIndex.The_ad_failed_to_play_and_the_reward_cannot_be_obtained));
            }
        },VIDEO_TYPE.Coin);
    }

    clickBtnNext()
    {

        let gm=GameManager.getInstance();
        gm.sound_manager.playSound(SoundIndex.click);
        
        switch(GameManager.getInstance().cur_game_mode){
            case GameMode.Main:{     
                MapManager.Currentlevel=MapManager.Currentlevel+1      
                let nextLevel=MapManager.Currentlevel;   //LevelManager.getInstance().start_level+1;
                
                if(nextLevel>MissionLevelManager.getMaxLevel()){
                    MapManager.Currentlevel=MissionLevelManager.getMaxLevel()
                    GameManager.getInstance().showMessage(LanguageManager.getInstance().getStrByTextId(100121),3);
                    // GameManager.getInstance().showMessage("你太厉害啦，测试版本暂时没有了，敬请期待后续版本！记得加id",3);
                }else{
                    if(nextLevel<=(LevelManager.getInstance().finish_level+1))
                    {
                        if(!TutorailsManager.getInstance().is_finish_game){
                            LevelManager.getInstance().start_level=nextLevel;
                            gm.fighting_info=TutorialLevelManager.getInstance().getFightingInfo(LevelManager.getInstance().start_level);
                        }else{
                            LevelManager.getInstance().start_level=nextLevel;
                            gm.fighting_info=MissionLevelManager.getInstance().getFightingInfo(LevelManager.getInstance().start_level);
                        }                    
                    }
                    GameManager.getInstance().startNextLevel();
                    super.onClose();
                }                                
            }break;
            case GameMode.Tower:{
                if(TowerManager.getTowerLevel()<TowerLevelManager.getMaxFloor()){
                    GameManager.getInstance().startNextLevel();
                    super.onClose();
                }
            }break;
            case GameMode.Endless:{
                 GameManager.getInstance().game_to_home=Go_Type.Activity_Endless;
                 GameManager.getInstance().backToHome();
            }break;
            case GameMode.Boss_Challenge:{
                GameManager.getInstance().game_to_home=Go_Type.Activity_Boss;
                GameManager.getInstance().backToHome();
            }break;
            case GameMode.Maze:{
                let id= Times.voidsensid
                let HexagonType=RogueHexagonTypesManager.getInstance().getHexagonType(id)
                if(HexagonType==5){//如果打完boss了，代表这一层完结了
                    // let damage=TheStorageManager.getInstance().getNumber(StorageKey.VoidCrackChallengeDamage,0);
                    // damage++
                    // if(damage>8){
                    //     damage=8
                    // }
                    // TheStorageManager.getInstance().setItem(StorageKey.UnlimitedChallengeDamage,damage);
                    GameManager.getInstance().game_to_home=Go_Type.Activity_Maze_lose;
                }else{
                    GameManager.getInstance().game_to_home=Go_Type.Activity_Maze;
                }
                GameManager.getInstance().backToHome();
            }break;


            
        }
    }

    clickBtnOk(){
        GameManager.getInstance().sound_manager.playSound(SoundIndex.click);
        GameManager.getInstance().game_to_home=Go_Type.Activity;
        switch(GameManager.getInstance().cur_game_mode){
            case GameMode.Maze:{
                UIManager.getInstance().showMazeUi();
                super.onClose();
            }break;
            case GameMode.Tower:{
                GameManager.getInstance().startNextLevel();
                super.onClose();
            }break;
            default:{
                GameManager.getInstance().backToHome();
            }break;
        }
    }

    clickBtnStats(){
        GameManager.getInstance().sound_manager.playSound(SoundIndex.click);
        UIManager.getInstance().showDamageStatsUi();
    }
    private getLeaderboardByUserJsonString(type: number): string {
        let uid = UserData.getInstance().getUserID();
        return JSON.stringify({
            limit: 100,
            type: type,
        });
    }
}
