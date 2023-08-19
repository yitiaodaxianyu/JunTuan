
import { Btn_Index, FuncType, GameMode, GameScene, GameState, Go_Type } from "../../Constants";
import { MonsterDataManager } from "../../Monster/Data/MonsterDataManager";
import GameManager from "../../GameManager";
import { RewardData } from "../../JsonData/LevelJsonData";
import { LevelManager } from "../../Level/LevelManager";
import { MissionLevelManager } from "../../Level/MissionLevel";
import { Follow_Type } from "../../multiLanguage/FollowConstants";
import FollowManager from "../../multiLanguage/FollowManager";
import LanguageManager from "../../multiLanguage/LanguageManager";
import { SoundIndex } from "../../Sound/AudioConstants";
import TowerManager from "../../Tower/TowerManager";
import TutorailsManager from "../../Tutorials/TutorailsManager";
import { UIManager } from "../../UI/UIManager";
import UIComponent from "../../UI/UIComponent";
import { PropManager } from "../../Prop/PropManager";
import { PropId } from "../../Prop/PropConfig";
import MonsterManager from "../../Monster/MonsterManager";
import { MazeManager } from "../../Maze/MazeManager";
import { FunctionDefinitionManager } from "../../JsonData/FunctionDefinition";
import WallManager from "../../Wall/WallManager";
import PayFirstChargeUi from "../../Payment/PayFirstChargeUi";
import MainUi from "../../UI/home/MainUi";
import { UIPath, UILayerLevel } from "../../UI/UIConfig";
import { PayManager } from "../../Payment/PayManager";
import { RogueHexagonTypesManager } from "../../copy/voidcrack/RogueHexagonTypes";


const {ccclass, property} = cc._decorator;

@ccclass
export default class GameLose extends UIComponent {

    onEnable()
    {
        this.initUi();
        GameManager.getInstance().sound_manager.playSound(SoundIndex.YX_Lose);
        //MonsterDataManager.getInstance().saveAllKillEnemy();        
    }

    initUi()
    {
        //关卡字体
        let labelLevel=this.node.getChildByName('label_level');
        let btnReplay=this.node.getChildByName('btnReplay');
        switch(GameManager.getInstance().cur_game_mode){
            case GameMode.Main:{
                btnReplay.active=true;
                labelLevel.getComponent(cc.Label).string=GameManager.getInstance().fighting_info.title_name;
                FollowManager.getInstance().followEvent(Follow_Type.战斗失败展示次数_x关+GameManager.getInstance().fighting_info.title_name);
                FollowManager.getInstance().followEvent(Follow_Type.失败挑战关卡+LevelManager.getInstance().start_level);
                this.showReward();
            }break;
            case GameMode.Tower:{
                btnReplay.active=false;
                labelLevel.getComponent(cc.Label).string=labelLevel.getComponent(cc.Label).string=GameManager.getInstance().fighting_info.title_name;
                //FollowManager.getInstance().followEvent(Follow_Type+(TowerManager.getTowerLevel()-1));
            }break;
            case GameMode.Endless:{
                btnReplay.active=false;
                labelLevel.getComponent(cc.Label).string=""+LanguageManager.getInstance().getStrByTextId(800001);
                
            }break;
            case GameMode.Boss_Challenge:{ 
                btnReplay.active=false;
                labelLevel.getComponent(cc.Label).string=""+LanguageManager.getInstance().getStrByTextId(820001);
                // labelLevel.getComponent(cc.Label).string=BossChallengeManager.getInstance().cur_score+"";
                // FollowManager.getInstance().followEvent(Follow_Type.完成BOSS挑战次数);
            }break;
            case GameMode.Maze:{
                labelLevel.getComponent(cc.Label).string=GameManager.getInstance().fighting_info.title_name;
                btnReplay.active=false; 
                let mainWall=WallManager.getInstance().getMainWall();
                MazeManager.getInstance().setMazeSubHp((mainWall.getMaxHp()-mainWall.getCurHp())/mainWall.getMaxHp());
                let type=RogueHexagonTypesManager.getInstance().getHexagonType(MazeManager.getInstance().getFightingId());
                switch(type){
                    case 1:{
                        FollowManager.getInstance().followEvent(Follow_Type.rogue玩法普通关卡挑战失败的次数);
                    }break;
                    case 2:{
                        FollowManager.getInstance().followEvent(Follow_Type.rogue玩法精英关卡挑战失败的次数);
                    }break;
                    case 6:{
                        FollowManager.getInstance().followEvent(Follow_Type.rogue玩法BOSS关卡挑战失败的次数);
                    }break;
                }
            }break;
        }        
    }

    showReward()
    {
        switch(GameManager.getInstance().cur_game_mode){
            case GameMode.Main:{
                this.showMainReward();
            }break;
            case GameMode.Tower:{
                this.showTowerReward();
            }
        }
    }

    showMainReward(){
        let startLevel=LevelManager.getInstance().start_level;
        //let gm=GameManager.getInstance();
        //let scrollView=this.node.getChildByName('rewardRoot').getChildByName('propsScrollView');
        //let content=scrollView.getComponent(cc.ScrollView).content;
        let per=MonsterManager.getInstance().killed_monster_num/MonsterManager.getInstance().total_monster_num;
        let rewardCoin=Math.round(MissionLevelManager.getInstance().getPassReward_Coin(startLevel)*per);
        let rd=new RewardData();
        rd.reward_id=PropId.Coin;
        rd.reward_num=rewardCoin;
        // let item=gm.box_json_data.createBoxItem(rd.reward_id,rd.reward_num);
        // content.addChild(item);
        PropManager.getInstance().changePropNum(rd.reward_id,rd.reward_num);        
        this.checkTutorails();
    }

    showTowerReward(){
        // let gm=GameManager.getInstance();
        // let scrollView=this.node.getChildByName('rewardRoot').getChildByName('propsScrollView');
        // let content=scrollView.getComponent(cc.ScrollView).content;
        // let rewardCoin=100;
        // let rd=new RewardData();
        // rd.reward_id=1;
        // rd.reward_num=rewardCoin;
        // let item=gm.box_json_data.createBoxItem(rd.reward_id,rd.reward_num);
        // content.addChild(item);
        // gm.box_json_data.getRewardByid(rd.reward_id,rd.reward_num);
        //AdManager.getInstance().showInterstitial('');        
    }

    checkTutorails(){
        if(GameManager.getInstance().cur_game_mode==GameMode.Main)
        {
            if(TutorailsManager.getInstance().isShowTutorials(301))
            {
                PropManager.getInstance().changePropNum(PropId.Coin,100);
                TutorailsManager.getInstance().showTutorials(301,()=>{
                    TutorailsManager.getInstance().saveTutorials(301);                    
                },()=>{
                    TutorailsManager.getInstance().is_tutorails_state=false;
                });
            }else if(TutorailsManager.getInstance().isShowTutorials(311))
            {
                PropManager.getInstance().changePropNum(100003,30);
                TutorailsManager.getInstance().showTutorials(311,()=>{
                    TutorailsManager.getInstance().saveTutorials(311);
                },()=>{
                    TutorailsManager.getInstance().is_tutorails_state=false;
                });
            }else
            if(TutorailsManager.getInstance().isShowTutorials(301)==false&&TutorailsManager.getInstance().isShowTutorials(311)==false){
                if(TutorailsManager.getInstance().isShowTutorials(331)){
                    TutorailsManager.getInstance().showTutorials(331,()=>{
                        TutorailsManager.getInstance().saveTutorials(331);
                    },()=>{
                        if(PayManager.getInstance().getPayNum('c301')<=0){
                            // UIManager.getInstance().showUiDialog(UIPath.FirstCharge,UILayerLevel.One,{onCompleted:(uiNode)=> {
                            //     uiNode.getComponent(PayFirstChargeUi).init({
                            //         onClose:() => {
                                        
                            //         }
                            //     });
                            // },});
                        }
                    })
                }                                                                                                      
            }
        }
    }


    clickBtnHome()
    {        
        FollowManager.getInstance().followEvent(Follow_Type.失败页_主页按钮点击次数);
        GameManager.getInstance().sound_manager.playSound(SoundIndex.click);
        switch(GameManager.getInstance().cur_game_mode){
            case GameMode.Main:{     
                GameManager.getInstance().game_to_home=Go_Type.Main;
                GameManager.getInstance().backToHome();       
            }break;
            case GameMode.Maze:{
                GameManager.getInstance().game_to_home=Go_Type.Activity_Maze_lose;
                GameManager.getInstance().backToHome();
            }break;
        }
    }

    clickBtnGo(btn,indexStr:string)
    {
        GameManager.getInstance().sound_manager.playSound(SoundIndex.click);
        let goType=parseInt(indexStr);
        if(goType==Go_Type.PetList){
        
            if(FunctionDefinitionManager.getInstance().getIsUnlockIndex(Btn_Index.Btn_Pet)==false){
                let type=FunctionDefinitionManager.getInstance().getUnlockConditionType(FuncType.ChongWuXiTong)
                let num=FunctionDefinitionManager.getInstance().getUnlockCondictionParameter(FuncType.ChongWuXiTong)
                if(type==1){
                    GameManager.getInstance().showMessage(LanguageManager.getInstance().getStrByTextId(100051)+":"+num);
                }else if(type==2){
                    let textStr=LanguageManager.getInstance().getStrByTextId(100052);
                    let nums=MissionLevelManager.getInstance().getLevelName((num))
                    let str=textStr.replace('~',''+nums)
                    GameManager.getInstance().showMessage(str);
                }
                return;
            }
            
        }
        if(goType==Go_Type.Activity){
            // if(FunctionDefinitionManager.getInstance().getIsUnlockIndex(Btn_Index.Btn_FuBen)==false){
                let type=FunctionDefinitionManager.getInstance().getUnlockConditionType(FuncType.GeRenBoss)
                let num=FunctionDefinitionManager.getInstance().getUnlockCondictionParameter(FuncType.GeRenBoss)
                if(LevelManager.getInstance().finish_level<num){
                    if(type==1){
                        GameManager.getInstance().showMessage(LanguageManager.getInstance().getStrByTextId(100051)+":"+num);
                    }else if(type==2){
                        let textStr=LanguageManager.getInstance().getStrByTextId(100052);
                        let nums=MissionLevelManager.getInstance().getLevelName((num))
                        let str=textStr.replace('~',''+nums)
                        GameManager.getInstance().showMessage(str);
                    }
                    return;
                }
                // let textStr=LanguageManager.getInstance().getStrByTextId(100052);
                // let nums="3-10"//MissionLevelManager.getInstance().getLevelName((num))
                // let str=textStr.replace('~',''+nums)
                // GameManager.getInstance().showMessage(str);

            // }

        }
        if(goType==1){
            FollowManager.getInstance().followEvent(Follow_Type.失败页_强化养成跳转按钮点击次数);
        }
        if(goType==10){
            FollowManager.getInstance().followEvent(Follow_Type.失败页_获取资源跳转按钮点击次数);
        }
        if(goType==9){
            FollowManager.getInstance().followEvent(Follow_Type.失败页_前往商城跳转按钮点击次数);
        }
        // console.log("________type1",goType)
        GameManager.getInstance().game_to_home=goType;
        GameManager.getInstance().backToHome();
    }

    clickBtnReplay()
    {
        FollowManager.getInstance().followEvent(Follow_Type.失败页_重新挑战按钮点击次数);
        GameManager.getInstance().sound_manager.playSound(SoundIndex.click);        
        cc.director.loadScene(GameScene.game);
    }

    clickBtnRole(){
        GameManager.getInstance().sound_manager.playSound(SoundIndex.click);
        GameManager.getInstance().backToHome();
    }

    clickBtnOk(){
        GameManager.getInstance().sound_manager.playSound(SoundIndex.click);
        GameManager.getInstance().game_to_home=Go_Type.Activity;
        if(GameManager.getInstance().cur_game_mode==GameMode.Tower){
            TowerManager.is_show_tower=true;
        }
        GameManager.getInstance().backToHome();
    }

    clickBtnStats(){
        GameManager.getInstance().sound_manager.playSound(SoundIndex.click);
        UIManager.getInstance().showDamageStatsUi();
    }
}
