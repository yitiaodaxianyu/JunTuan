import { ActivityManager, ActivityType } from "../../Activity/ActivityManager";
import { BossChallengeManager, ChallengeMode } from "../../Activity/BossChallenge";
import GameManager from "../../GameManager";
import { FunctionDefinitionManager } from "../../JsonData/FunctionDefinition";
import { LanguageIndex } from "../../multiLanguage/LanguageConstants";
import LanguageManager from "../../multiLanguage/LanguageManager";
import { MusicIndex, SoundIndex } from "../../Sound/AudioConstants";
import { FuncType, GameMode, Go_Type } from "../../Constants";
import FollowManager from "../../multiLanguage/FollowManager";
import { Follow_Type } from "../../multiLanguage/FollowConstants";
import { LevelManager } from "../../Level/LevelManager";
import TowerManager from "../../Tower/TowerManager";
import { UIManager } from "../UIManager";
import MyTool from "../../Tools/MyTool";
import { MazeManager } from "../../Maze/MazeManager";
import { PropManager } from "../../Prop/PropManager";
import { PropId } from "../../Prop/PropConfig";
import { UIPath, UILayerLevel } from "../UIConfig";
import ToPlayMainUi from "./ToPlayMainUi";
import TextLanguage from "../../multiLanguage/TextLanguage";
import { MissionLevelManager } from "../../Level/MissionLevel";
import endlesschallenges from "../../copy/endlesschallenges/endlesschallenges";
import { TheStorageManager } from "../../Storage/StorageManager";
import { StorageKey } from "../../Storage/StorageConfig";
import VoidScene from "../../copy/voidcrack/VoidScene";
import Times from "../../Turntable/Times";
import { RogueHexagonTypesManager } from "../../copy/voidcrack/RogueHexagonTypes";


const {ccclass, property} = cc._decorator;

@ccclass
export default class ActivityUi extends cc.Component {

    @property(cc.SpriteAtlas)
    activity_ui:cc.SpriteAtlas = null;


    @property(cc.Node)
    btnMaze:cc.Node = null;//虚空裂缝

    @property(cc.Node)
    btnBoss:cc.Node = null;//BOSS挑战

    @property(cc.Node)
    btnEndless:cc.Node = null;//无尽挑战



    protected onLoad(): void {
        this.adaptation();
        // this.node.on(cc.Node.EventType.POSITION_CHANGED,this.onPositionChange,this);
    }

    // protected onDestroy(): void {
    //     // this.node.off(cc.Node.EventType.POSITION_CHANGED,this.onPositionChange,this);
    // }

    // onPositionChange(){
    //     if(this.node.x==0){
    //         this.onEnable();
    //     }
    // }

    protected start(): void {
        //UIManager.getInstance().preloadPrefab('ui/home/tower_ui');

        let GeRenBoss=this.btnBoss.getChildByName("itme")
        let WuJinTiao=this.btnEndless.getChildByName("itme")
        let MiGongZhan=this.btnMaze.getChildByName("itme")

        let GeRenBossitem=[10002]
        let WuJinTiaoitem=[10001]
        let MiGongZhanitem=[60001,90002,20012]

        for (let index = 0; index < GeRenBossitem.length; index++) {
            let item=PropManager.getInstance().createPropItem(GeRenBossitem[index],0);
            item.scale=0.85
            item.parent=GeRenBoss
        }
        for (let index = 0; index < WuJinTiaoitem.length; index++) {
            let item=PropManager.getInstance().createPropItem(WuJinTiaoitem[index],0);
            item.scale=0.85
            item.parent=WuJinTiao
        }
        for (let index = 0; index < MiGongZhanitem.length; index++) {
            let item=PropManager.getInstance().createPropItem(MiGongZhanitem[index],0);
            item.scale=0.85
            item.parent=MiGongZhan
        }

    }

    protected onEnable(): void {
        // this.setActivity();
        if(FollowManager.getInstance().getFirstDo(Follow_Type.首次进入副本页面)<=0){
            FollowManager.getInstance().addFirstDo(Follow_Type.首次进入副本页面);
            FollowManager.getInstance().followEvent(Follow_Type.首次进入副本页面);
        }
        // if(TowerManager.is_show_tower && FunctionDefinitionManager.getInstance().getIsUnlock(FuncType.PaTa)){
        //     GameManager.getInstance().cur_game_mode=GameMode.Tower;
        //     // UIManager.getInstance().showTowerUi();
        //     UIManager.getInstance().showUiDialog(UIPath.Tower,UILayerLevel.One,{onCompleted:(uiNode)=> {},});
        // }
        GameManager.getInstance().music_manager.playMusic(MusicIndex.BGM_Fuben);
        let WuJinTiaoZhanType=FunctionDefinitionManager.getInstance().getUnlockConditionType(FuncType.WuJinTiaoZhan)
        let WuJinTiaoZhanParameter=FunctionDefinitionManager.getInstance().getUnlockCondictionParameter(FuncType.WuJinTiaoZhan)

        let GeRenBossType=FunctionDefinitionManager.getInstance().getUnlockConditionType(FuncType.GeRenBoss)
        let GeRenBossParameter=FunctionDefinitionManager.getInstance().getUnlockCondictionParameter(FuncType.GeRenBoss)

        let MiGongZhanType=FunctionDefinitionManager.getInstance().getUnlockConditionType(FuncType.MiGong)
        let MiGongZhanParameter=FunctionDefinitionManager.getInstance().getUnlockCondictionParameter(FuncType.MiGong)
            

        if(LevelManager.getInstance().finish_level<WuJinTiaoZhanParameter){
            if(WuJinTiaoZhanType==1){
                this.btnEndless.getChildByName("text").getComponent(TextLanguage).setTextId(100051)
                this.btnEndless.getChildByName("text").getComponent(TextLanguage).setReplaceValue('.','.'+(WuJinTiaoZhanParameter) + '');
            }else if(WuJinTiaoZhanType==2){
                this.btnEndless.getChildByName("text").getComponent(TextLanguage).setTextId(100052)
                let nums=MissionLevelManager.getInstance().getLevelName((WuJinTiaoZhanParameter))
                this.btnEndless.getChildByName("text").getComponent(TextLanguage).setReplaceValue('~',(nums) + '');
            }
            this.btnEndless.getChildByName("itme").active=false
            this.btnEndless.getChildByName("text").active=true
            this.btnEndless.getChildByName("btnPlay").active=false
            this.btnEndless.getChildByName("icon").getComponent(cc.Sprite).setMaterial(0, cc.Material.getBuiltinMaterial("2d-gray-sprite"));
            this.btnEndless.getChildByName("First_Text_1_CN").getComponent(cc.Sprite).setMaterial(0, cc.Material.getBuiltinMaterial("2d-gray-sprite"));
        }else{
            this.btnEndless.getChildByName("itme").active=true
            this.btnEndless.getChildByName("text").active=false
            this.btnEndless.getChildByName("btnPlay").active=true
            this.btnEndless.getChildByName("icon").getComponent(cc.Sprite).setMaterial(0, cc.Material.getBuiltinMaterial("2d-sprite"));
            this.btnEndless.getChildByName("First_Text_1_CN").getComponent(cc.Sprite).setMaterial(0, cc.Material.getBuiltinMaterial("2d-sprite"));
            let num=TheStorageManager.getInstance().getInt(StorageKey.UnlimitedChallengeTimes,0);
            this.btnEndless.getChildByName("btnPlay").getChildByName("red").active=num>0;
        }
        if(LevelManager.getInstance().finish_level<GeRenBossParameter){
            if(GeRenBossType==1){
                this.btnBoss.getChildByName("text").getComponent(TextLanguage).setTextId(100051)
                this.btnBoss.getChildByName("text").getComponent(TextLanguage).setReplaceValue('.','.'+(GeRenBossParameter) + '');
            }else if(GeRenBossType==2){
                this.btnBoss.getChildByName("text").getComponent(TextLanguage).setTextId(100052)
                let nums=MissionLevelManager.getInstance().getLevelName((GeRenBossParameter))
                this.btnBoss.getChildByName("text").getComponent(TextLanguage).setReplaceValue('~',(nums) + '');
            }
            this.btnBoss.getChildByName("itme").active=false
            this.btnBoss.getChildByName("text").active=true
            this.btnBoss.getChildByName("btnPlay").active=false
            this.btnBoss.getChildByName("icon").getComponent(cc.Sprite).setMaterial(0, cc.Material.getBuiltinMaterial("2d-gray-sprite"));
            this.btnBoss.getChildByName("First_Text_1_CN").getComponent(cc.Sprite).setMaterial(0, cc.Material.getBuiltinMaterial("2d-gray-sprite"));
        }else{
            this.btnBoss.getChildByName("itme").active=true
            this.btnBoss.getChildByName("text").active=false
            this.btnBoss.getChildByName("btnPlay").active=true
            this.btnBoss.getChildByName("icon").getComponent(cc.Sprite).setMaterial(0, cc.Material.getBuiltinMaterial("2d-sprite"));
            this.btnBoss.getChildByName("First_Text_1_CN").getComponent(cc.Sprite).setMaterial(0, cc.Material.getBuiltinMaterial("2d-sprite"));
            this.btnBoss.getChildByName("btnPlay").getChildByName("red").active=TheStorageManager.getInstance().getInt(StorageKey.BossChallengeTimes,0)>0;
        }
        if(LevelManager.getInstance().finish_level<MiGongZhanParameter){
            if(MiGongZhanType==1){
                this.btnMaze.getChildByName("text").getComponent(TextLanguage).setTextId(100051)
                this.btnMaze.getChildByName("text").getComponent(TextLanguage).setReplaceValue('.','.'+(MiGongZhanParameter) + '');
            }else if(MiGongZhanType==2){
                this.btnMaze.getChildByName("text").getComponent(TextLanguage).setTextId(100052)
                let nums=MissionLevelManager.getInstance().getLevelName((MiGongZhanParameter))
                this.btnMaze.getChildByName("text").getComponent(TextLanguage).setReplaceValue('~',(nums) + '');
            }
            this.btnMaze.getChildByName("itme").active=false
            this.btnMaze.getChildByName("text").active=true
            this.btnMaze.getChildByName("btnPlay").active=false
            this.btnMaze.getChildByName("icon").getComponent(cc.Sprite).setMaterial(0, cc.Material.getBuiltinMaterial("2d-gray-sprite"));
            this.btnMaze.getChildByName("First_Text_1_CN").getComponent(cc.Sprite).setMaterial(0, cc.Material.getBuiltinMaterial("2d-gray-sprite"));
        }else{
            this.btnMaze.getChildByName("itme").active=true
            this.btnMaze.getChildByName("text").active=false
            this.btnMaze.getChildByName("btnPlay").active=true
            this.btnMaze.getChildByName("icon").getComponent(cc.Sprite).setMaterial(0, cc.Material.getBuiltinMaterial("2d-sprite"));
            this.btnMaze.getChildByName("First_Text_1_CN").getComponent(cc.Sprite).setMaterial(0, cc.Material.getBuiltinMaterial("2d-sprite"));
            //this.btnMaze.getChildByName("btnPlay").getChildByName("red").active=TheStorageManager.getInstance().getInt()

        }
        if(GameManager.getInstance().game_to_home==Go_Type.Activity_Endless){
            this.scheduleOnce(function(){
                this.clickBtnActivity(null,""+1)
            },0.1)
           
        }
        else if(GameManager.getInstance().game_to_home==Go_Type.Activity_Boss){
            this.scheduleOnce(function(){
                this.clickBtnActivity(null,""+2)
            },0.1)
        }

        else if(GameManager.getInstance().game_to_home==Go_Type.Activity_Maze){
            this.scheduleOnce(function(){
                // this.clickBtnActivity(null,""+2)
                UIManager.getInstance().showUiDialog(UIPath.VoidScene,UILayerLevel.One,{onCompleted:(uiNode)=> {
                    let id= Times.voidsensid
                    let type=RogueHexagonTypesManager.getInstance().getLayers(id)
                    let Rowsnumber=RogueHexagonTypesManager.getInstance().getRows(id)
                    let Positionnumber=RogueHexagonTypesManager.getInstance().getPosition(id)
                    // let index=this.PageView.getComponent(cc.PageView).getCurrentPageIndex()
                    uiNode.getComponent(VoidScene).initUi(type,Rowsnumber,Positionnumber)
                    uiNode.getComponent(VoidScene).init(
                        {onClose:()=>{

                        }}
                    );
                    uiNode.getComponent(VoidScene).Rowsnumber=Rowsnumber//行数
                    uiNode.getComponent(VoidScene).Positionnumber=Positionnumber//位置数
                    uiNode.getComponent(VoidScene).Refresh()
                },})
            },0.1)
        }

        else if(GameManager.getInstance().game_to_home==Go_Type.Activity_Maze_lose){
            this.scheduleOnce(function(){
                UIManager.getInstance().showUiDialog(UIPath.VndlessChallenges,UILayerLevel.One,{onCompleted:(uiNode)=> {
                    uiNode.getComponent(endlesschallenges).init({
                        onClose:()=>{
        
                        }
                    })
                    uiNode.getComponent(endlesschallenges).initUi(4)//2:无尽挑战   3：boss挑战
                },});
            },0.1)
        }
                
        // let content = this.node.getChildByName("scrollView").getComponent(cc.ScrollView).content;
        // let overTime = new Date(new Date().toLocaleDateString()).getTime();
        // let t = 24*60*60;
        // content.getChildByName("btnEndless").getChildByName('unlock').getChildByName("time").getComponent(cc.Label).string = MyTool.getTimeStr(Math.floor(t-(Date.now() - overTime)/1000));
        // content.getChildByName("btnBoss").getChildByName('unlock').getChildByName("time").getComponent(cc.Label).string = MyTool.getTimeStr(Math.floor(t-(Date.now() - overTime)/1000));
        // content.getChildByName("btnMaze").getChildByName('unlock').getChildByName("time").getComponent(cc.Label).string = MyTool.getTimeStr(Math.floor(MazeManager.getInstance().getRemainTime()));
        // this.schedule(() =>{
        //     // console.log(MyTool.getTimeStr(Math.floor(Date.now() - overTime)),);
        //     // content.getChildByName("btnEndless").getChildByName('unlock').getChildByName("time").getComponent(cc.Label).string = MyTool.getTimeStr(Math.floor(t-(Date.now() - overTime)/1000));
        //     // content.getChildByName("btnBoss").getChildByName('unlock').getChildByName("time").getComponent(cc.Label).string = MyTool.getTimeStr(Math.floor(t-(Date.now() - overTime)/1000));
        //     // content.getChildByName("btnMaze").getChildByName('unlock').getChildByName("time").getComponent(cc.Label).string = MyTool.getTimeStr(Math.floor(MazeManager.getInstance().getRemainTime()));
        // },1,cc.macro.REPEAT_FOREVER,0);
    }


    // protected onDisable(): void {
    //     this.unscheduleAllCallbacks();
    // }

    private adaptation()
    {
        //上下模块
        let topUi=cc.find('Canvas/Top_Ui');
        //let down=topUi.getChildByName('down');
        let top=topUi.getChildByName('top');
        let height=(top.y-top.height/2)*2;
        let scrollView=this.node.getChildByName('scrollView');
        scrollView.height=height;
        scrollView.getChildByName('view').height=height;        
    }

    // setActivity(){
    //     let scrollView=this.node.getChildByName('scrollView').getComponent(cc.ScrollView);
    //     let content=scrollView.content;
    //     let am=ActivityManager.getInstance();
    //     let lm=LanguageManager.getInstance();
    //     for(let i=0; i<=3; i++){
    //         let btn=content.children[i];
    //         let unlock = btn.getChildByName("unlock")
    //         let type=i+1;
    //         //判断是否解锁
    //         let isUnlock=am.getIsUnlock(type);
    //         //需要设置的控件
    //         let unlockText=btn.getChildByName("lock").getChildByName('unlockText');
    //         let numRoot=unlock.getChildByName('numRoot');
    //         // let btnPlay=lock.getChildByName('btnPlay');
    //         // let typeIcon=lock.getChildByName('typeIcon');
    //         // let kuang=lock.getChildByName('kuang');
    //         if(type==ActivityType.Boss){
    //             // let btnHard=btn.getChildByName('btnHard');
    //             content.getChildByName("btnBoss").getChildByName('unlock').getChildByName("Raid_Btn_1").active = isUnlock;
    //         }
            
    //         btn.getComponent(cc.Button).interactable=isUnlock;
    //         // unlockText.active=!isUnlock;
    //         numRoot.active=isUnlock&&(type==ActivityType.Boss || type==ActivityType.Endless);
    //         // btnPlay.active=isUnlock;
    //         // typeIcon.active=isUnlock&&type!=ActivityType.Tower;
    //         // kuang.active=isUnlock&&type!=ActivityType.Tower;

    //         if(isUnlock){
    //             let numText=numRoot.getChildByName('num').getComponent(cc.Label);
    //             let needText=numRoot.getChildByName('need').getComponent(cc.Label);
    //             let num=am.getTicket(type);
    //             let needNum=1;
    //             numText.string=""+num;
    //             needText.string="/"+needNum
    //             numText.node.color=num>=needNum?cc.Color.WHITE:cc.Color.RED;
    //             btn.getChildByName('lock').active = false;
    //             btn.getChildByName('unlock').active = true;
    //         }else{
    //             btn.getChildByName('lock').active = true;
    //             btn.getChildByName('unlock').active = false;
    //             //获得解锁条件
    //             let unlockType=FunctionDefinitionManager.getInstance().getUnlockConditionType(am.getFuncType(type));
    //             if(unlockType==1){
    //                 unlockText.getComponent(cc.Label).string=lm.getString(LanguageIndex.UnlockAfter)+lm.getString(LanguageIndex.PlayerLv)+FunctionDefinitionManager.getInstance().getUnlockCondictionParameter(am.getFuncType(type));
    //             }else{
    //                 unlockText.getComponent(cc.Label).string=lm.getString(LanguageIndex.UnlockAfter)+lm.getString(LanguageIndex.Level)+LevelManager.getLevelName(FunctionDefinitionManager.getInstance().getUnlockCondictionParameter(am.getFuncType(type)));
    //             }
    //         }            
    //     }
    // }

    clickBtnActivity(btn:cc.Event.EventTouch,indexStr:string){
        // console.log("_____________进副本")
        GameManager.getInstance().sound_manager.playSound(SoundIndex.click);
        let index=parseInt(indexStr);
        switch(index){
            case ActivityType.Endless:{//无尽挑战
                let WuJinTiaoZhanType=FunctionDefinitionManager.getInstance().getUnlockConditionType(FuncType.WuJinTiaoZhan)
                let WuJinTiaoZhanParameter=FunctionDefinitionManager.getInstance().getUnlockCondictionParameter(FuncType.WuJinTiaoZhan)
                if(LevelManager.getInstance().finish_level<WuJinTiaoZhanParameter){
                    if(WuJinTiaoZhanType==1){
                        GameManager.getInstance().showMessage(LanguageManager.getInstance().getStrByTextId(100051)+":"+WuJinTiaoZhanParameter);
                    }else if(WuJinTiaoZhanType==2){
                        let textStr=LanguageManager.getInstance().getStrByTextId(100052);
                        let nums=MissionLevelManager.getInstance().getLevelName((WuJinTiaoZhanParameter))
                        let str=textStr.replace('~',''+nums)
                        GameManager.getInstance().showMessage(str);
                    }
                }else{
                    // console.log("进入无尽挑战")
                    UIManager.getInstance().showUiDialog(UIPath.VndlessChallenges,UILayerLevel.One,{onCompleted:(uiNode)=> {
                        uiNode.getComponent(endlesschallenges).init({
                            onClose:()=>{
                                let num=TheStorageManager.getInstance().getInt(StorageKey.UnlimitedChallengeTimes,0);
                                this.btnEndless.getChildByName("btnPlay").getChildByName("red").active=num>0;
                            }
                        })
                        uiNode.getComponent(endlesschallenges).initUi(2)//2:无尽挑战   3：boss挑战
                    },});
                }
                // if(PropManager.getInstance().getPropNum(PropId.EndlessChallenge) > 0){
                //     GameManager.getInstance().cur_game_mode=GameMode.Endless;       
                //     // UIManager.getInstance().showMapUi({onClose:()=>{
                //     //     this.setActivity();
                //     // }});  
                //     UIManager.getInstance().showUiDialog(UIPath.ToPlay,UILayerLevel.One,{onCompleted:(uiNode)=> {
                //         uiNode.getComponent(ToPlayMainUi).init({onClose:()=>{
                //             this.setActivity();
                //         }});
                //     },})
                // }else{
                //     GameManager.getInstance().showMessage(LanguageManager.getInstance().getStrByTextId(800002));
                // }
            } break;
            case ActivityType.Boss:{//Boss挑战
                // return
                let GeRenBossType=FunctionDefinitionManager.getInstance().getUnlockConditionType(FuncType.GeRenBoss)
                let GeRenBossParameter=FunctionDefinitionManager.getInstance().getUnlockCondictionParameter(FuncType.GeRenBoss)
                if(LevelManager.getInstance().finish_level<GeRenBossParameter){
                    if(GeRenBossType==1){
                        GameManager.getInstance().showMessage(LanguageManager.getInstance().getStrByTextId(100051)+":"+GeRenBossParameter);
                    }else if(GeRenBossType==2){
                        let textStr=LanguageManager.getInstance().getStrByTextId(100052);
                        let nums=MissionLevelManager.getInstance().getLevelName((GeRenBossParameter))
                        let str=textStr.replace('~',''+nums)
                        GameManager.getInstance().showMessage(str);
                    }
                }else{
                    // console.log("进入boss挑战")
                    UIManager.getInstance().showUiDialog(UIPath.VndlessChallenges,UILayerLevel.One,{onCompleted:(uiNode)=> {
                        uiNode.getComponent(endlesschallenges).init({
                            onClose:()=>{
                                this.btnBoss.getChildByName("btnPlay").getChildByName("red").active=TheStorageManager.getInstance().getInt(StorageKey.BossChallengeTimes,0)>0;
                            }
                        })
                        uiNode.getComponent(endlesschallenges).initUi(3)//2:无尽挑战   3：boss挑战
                    },});
                }
                // if(PropManager.getInstance().getPropNum(PropId.BossTicket) > 0){
                //     GameManager.getInstance().cur_game_mode=GameMode.Boss_Challenge;
                //     // UIManager.getInstance().showMapUi({onClose:()=>{
                //     //     this.setActivity();
                //     // }});
                //     UIManager.getInstance().showUiDialog(UIPath.ToPlay,UILayerLevel.One,{onCompleted:(uiNode)=> {
                //         uiNode.getComponent(ToPlayMainUi).init({onClose:()=>{
                //             this.setActivity();
                //         }});
                //     },})
                // }else{
                //     GameManager.getInstance().showMessage(LanguageManager.getInstance().getStrByTextId(800002));
                // }
            } break;
            case ActivityType.Tower:{//爬塔//暂未开放
                GameManager.getInstance().showMessage(LanguageManager.getInstance().getStrByTextId(100113),3);//暂未开放
                return
                // GameManager.getInstance().cur_game_mode=GameMode.Tower;
                // // UIManager.getInstance().showTowerUi();
                // UIManager.getInstance().showUiDialog(UIPath.Tower,UILayerLevel.One,{onCompleted:(uiNode)=> {},});
            } break;
            case ActivityType.Maze:{//虚空裂缝
                let MiGongZhanType=FunctionDefinitionManager.getInstance().getUnlockConditionType(FuncType.MiGong)
                let MiGongZhanParameter=FunctionDefinitionManager.getInstance().getUnlockCondictionParameter(FuncType.MiGong)
                if(LevelManager.getInstance().finish_level<MiGongZhanParameter){
                    if(MiGongZhanType==1){
                        GameManager.getInstance().showMessage(LanguageManager.getInstance().getStrByTextId(100051)+":"+MiGongZhanParameter);
                    }else if(MiGongZhanType==2){
                        let textStr=LanguageManager.getInstance().getStrByTextId(100052);
                        let nums=MissionLevelManager.getInstance().getLevelName((MiGongZhanParameter))
                        let str=textStr.replace('~',''+nums)
                        GameManager.getInstance().showMessage(str);
                    }
                }else{
                    // console.log("进入虚空裂缝")
                    UIManager.getInstance().showUiDialog(UIPath.VndlessChallenges,UILayerLevel.One,{onCompleted:(uiNode)=> {
                        uiNode.getComponent(endlesschallenges).init({
                            onClose:()=>{
    
                            }
                        })
                        uiNode.getComponent(endlesschallenges).initUi(4)//2:无尽挑战   3：boss挑战  4：虚空裂缝
                    },});
                }
                // GameManager.getInstance().cur_game_mode=GameMode.Maze;
                // UIManager.getInstance().showMazeUi();
            } break;
        }
                 
    }

    // onClickModeChoose(e,num:number){
    //     num = Number(num);
    //     let content = this.node.getChildByName("scrollView").getComponent(cc.ScrollView).content;
    //     if(num == 1){
    //         BossChallengeManager.getInstance().cur_challenge_mode=ChallengeMode.Noamal;
    //         content.getChildByName("btnBoss").getChildByName('unlock').getChildByName("Raid_Btn_0").getComponent(cc.Sprite).spriteFrame = this.activity_ui.getSpriteFrame("Raid_Btn_0_1");
    //         content.getChildByName("btnBoss").getChildByName('unlock').getChildByName("Raid_Btn_0").children[0].y = -25;
    //         content.getChildByName("btnBoss").getChildByName('unlock').getChildByName("Raid_Btn_1").getComponent(cc.Sprite).spriteFrame = this.activity_ui.getSpriteFrame("Raid_Btn_1");
    //         content.getChildByName("btnBoss").getChildByName('unlock').getChildByName("Raid_Btn_1").children[0].y = -15;
    //         content.getChildByName("btnBoss").getChildByName("icon").getComponent(cc.Sprite).spriteFrame = this.activity_ui.getSpriteFrame("Raid_Banner_2");
    //     }else{
    //         BossChallengeManager.getInstance().cur_challenge_mode=ChallengeMode.Hard;
    //         content.getChildByName("btnBoss").getChildByName('unlock').getChildByName("Raid_Btn_0").getComponent(cc.Sprite).spriteFrame = this.activity_ui.getSpriteFrame("Raid_Btn_0");
    //         content.getChildByName("btnBoss").getChildByName('unlock').getChildByName("Raid_Btn_0").children[0].y = -15;
    //         content.getChildByName("btnBoss").getChildByName('unlock').getChildByName("Raid_Btn_1").getComponent(cc.Sprite).spriteFrame = this.activity_ui.getSpriteFrame("Raid_Btn_1_1");
    //         content.getChildByName("btnBoss").getChildByName('unlock').getChildByName("Raid_Btn_1").children[0].y = -25;
    //         content.getChildByName("btnBoss").getChildByName("icon").getComponent(cc.Sprite).spriteFrame = this.activity_ui.getSpriteFrame("Raid_Banner_2_1");
    //     }
    // }

    // clickBtnHard(){
    //     GameManager.getInstance().sound_manager.playSound(SoundIndex.click);
    //     GameManager.getInstance().cur_game_mode=GameMode.Boss_Challenge;
    //     BossChallengeManager.getInstance().cur_challenge_mode=ChallengeMode.Hard;

    // }
}
