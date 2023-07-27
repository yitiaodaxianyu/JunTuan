import { FuncType, GameMode, GameScene, IsDebug, JianTou_Type} from "../../Constants";
import GameData from "../../GameData";
import GameManager from "../../GameManager";
import { LanguageIndex, OnLanguageChange } from "../../multiLanguage/LanguageConstants";
import LanguageManager from "../../multiLanguage/LanguageManager";
import { MusicIndex, SoundIndex } from "../../Sound/AudioConstants";
import FollowManager from "../../multiLanguage/FollowManager";
import { Follow_Type } from "../../multiLanguage/FollowConstants";
import { VipManager } from "../../Ads/VipManager";
import TutorailsManager from "../../Tutorials/TutorailsManager";
import { LevelManager } from "../../Level/LevelManager";
import { MissionLevelManager } from "../../Level/MissionLevel";
import { OfflineRevenueManager } from "../../JsonData/OfflineRevenue";
import { FunctionDefinitionManager } from "../../JsonData/FunctionDefinition";
import { UIManager } from "../UIManager";
import FuncTypeBtn from "./FuncTypeBtn";
import GuaJiGift from "../../GuaJi/Ui/GuaJiGift";
import { UILayerLevel, UIPath } from "../UIConfig";
import OfflineUi from "../../GuaJi/Ui/OfflineUi";
import ToPlayMainUi from "./ToPlayMainUi";
import MapManager from "../../GuaJi/MapManager";
import { TutorialLevelManager } from "../../Level/TutorialLevel";
import TaskManager from "../../Task/TaskManager";
import TextLanguage from "../../multiLanguage/TextLanguage";
import { StorageKey } from "../../Storage/StorageConfig";
import { TheStorageManager } from "../../Storage/StorageManager";
import { HttpManager, AccessName } from "../.././NetWork/HttpManager";
import { HeroManager } from "../../Hero/Data/HeroManager";
import UserData from "../../UserData";

const {ccclass, property} = cc._decorator;

@ccclass
export default class MainUi extends cc.Component {
    
    cur_selected_level:number=1;
    cur_level_name:cc.Node=null;
    cur_avatar:cc.Node=null;

    @property([cc.SpriteFrame])
    sp_level_bg:cc.SpriteFrame[]=[];

    @property(cc.SpriteFrame)
    sp_boss:cc.SpriteFrame=null;

    @property(cc.Node)
    BigMap:cc.Node=null;

    onLoad()
    {
        this.cur_selected_level=LevelManager.getInstance().finish_level+1;
        if(this.cur_selected_level>MissionLevelManager.getMaxLevel())
        {
            this.cur_selected_level=MissionLevelManager.getMaxLevel();
        }
        // cc.resources.load('ui/home/map_ui');
        // cc.resources.load('ui/home/team_select_ui');
        cc.director.on(OnLanguageChange,this.showLevelName,this);
        this.node.on(cc.Node.EventType.POSITION_CHANGED,this.onPositionChange,this);
    }

    protected onDestroy(): void {        
        cc.director.off(OnLanguageChange,this.showLevelName,this);
        this.node.off(cc.Node.EventType.POSITION_CHANGED,this.onPositionChange,this);
    }

    onPositionChange(){
        if(this.node.x==0){
            this.onEnable();
        }
    }

    start()
    {
        // this.showLevelInfo();
    }

    onEnable()
    {
        FollowManager.getInstance().followEvent(Follow_Type.首页主界面展示总次数);
        HttpManager.post(AccessName.updateUserInfo,this.getZongZhanLiJsonString());
        this.refreshLeftRight();
        this.refreshMainTaskUi();
        if(GameManager.getInstance().cur_game_scene==GameScene.home){
            // GameManager.getInstance().music_manager.playMusic(MusicIndex.BGM_GuajiBgm);
        }
    }

    refreshLeftRight(){
        this.refreshLeft();
        this.refreshRight();
    }
    
    refreshLeft(){
        let left=this.node.getChildByName('left');
        //算出有几个是显示的
        let showNum=0;
        let btns=left.getChildByName('btns');
        for(let i=0; i<btns.childrenCount; i++){
            // let isShow=false;
            let fb=btns.children[i].getComponent(FuncTypeBtn);
            btns.children[i].active = fb.refresh();
            // if(fb){
            //     isShow=fb.refresh();
            // }else{
            //     isShow=btns.children[i].active;                                
            // }
            // if(isShow){
            //     fb.node.y=-77-(150*showNum);
            //     showNum++;
            //     // if(showNum > 1)
            //     //     fb.node.y -= 50;
            // }
        }
        this.scheduleOnce(()=>{
            left.height = btns.height + 7;
        },0.03);
        // left.active=showNum>0;
        // if(showNum>0){
        //     this.doUnfold(JianTou_Type.LEFT);
        // }
    }

    refreshRight(){
        let right=this.node.getChildByName('right');
        //算出有几个是显示的
        let showNum=0;
        let btns=right.getChildByName('btns');
        for(let i=0; i<btns.childrenCount; i++){
            // let isShow=false;
            let fb=btns.children[i].getComponent(FuncTypeBtn);
            btns.children[i].active = fb.refresh();
            // if(fb){
            //     isShow=fb.refresh();
            // }
            // if(isShow){
            //     fb.node.y=-77-(150*showNum);
            //     showNum++;
            // }
        }
        this.scheduleOnce(()=>{
            right.height = btns.height + 7;
        },0.03);
        // right.active=showNum>0;
        // if(showNum>0){
        //     this.doUnfold(JianTou_Type.RIGHT);
        // }
    }
    
    showLevelInfo()
    {
        //获取当前关卡
        let level=LevelManager.getInstance().finish_level+1;
        let startLevel=1;
        if(level>MissionLevelManager.getMaxLevel()){
            level=MissionLevelManager.getMaxLevel();            
        }
        if(MissionLevelManager.getMaxLevel()-level>3){
            startLevel=level;
        }else{
            startLevel=MissionLevelManager.getMaxLevel()-3;
        }
        //获取当前章节
        let chapter=MissionLevelManager.getInstance().getChapter(level);
        //获取章节最后一关
        let lastLevel=MissionLevelManager.getInstance().getLastLevel(level);
        let curSmallLevel=MissionLevelManager.getInstance().getLevelNum(level);
        //获取显示的首个关卡和末关
        let startSmallLevel=1;        
        if(lastLevel-curSmallLevel>3){
            startSmallLevel=curSmallLevel            
        }else{
            startSmallLevel=lastLevel-3;            
        }     
        let levelRoot=this.node.getChildByName('level');
        //章节数
        let titleLabel=levelRoot.getChildByName('titleLabel');
        let titleStr=LanguageManager.getInstance().getStrByTextId(100053).replace('~',chapter+'');
        titleLabel.getComponent(cc.Label).string=titleStr;
        //车
        let car=levelRoot.getChildByName('car');
        //icon
        let iconRoot=levelRoot.getChildByName('iconRoot');
        iconRoot.removeAllChildren();
        for(let i=1; i<=4; i++){
            let levelBg=levelRoot.getChildByName('level'+i).getComponent(cc.Sprite);
            let levelLabel=levelRoot.getChildByName('label'+i).getComponent(cc.Label);
            let curLevel=(startSmallLevel+i-1);
            levelLabel.string=''+curLevel;            
            if(curLevel!=curSmallLevel){
                levelBg.spriteFrame=this.sp_level_bg[1];
                levelLabel.fontSize=22;
            }else{
                levelBg.spriteFrame=this.sp_level_bg[0];
                car.x=levelBg.node.x;
                levelLabel.fontSize=30;
            }
            //关卡信息
            let monsterInfo=MissionLevelManager.getInstance().getFightingInfo(startLevel+i-1);
            if(monsterInfo.getIsHaveBoss()){
                let bossIcon=new cc.Node('bossIcon')
                bossIcon.addComponent(cc.Sprite).spriteFrame=this.sp_boss;
                bossIcon.x=levelBg.node.x;
                iconRoot.addChild(bossIcon);
            }
        }
    }

    showLevelName(){
        //获取当前关卡
        let level=LevelManager.getInstance().finish_level+1;
        if(level>MissionLevelManager.getMaxLevel()){
            level=MissionLevelManager.getMaxLevel();            
        }
        //获取当前章节
        let chapter=MissionLevelManager.getInstance().getChapter(level);
        let levelRoot=this.node.getChildByName('level');
        //章节数
        let titleLabel=levelRoot.getChildByName('titleLabel');
        let titleStr=LanguageManager.getInstance().getStrByTextId(100053).replace('~',chapter+'');
        titleLabel.getComponent(cc.Label).string=titleStr;
    }

    setLevelData()
    {
        let gm=GameManager.getInstance();
        if(!TutorailsManager.getInstance().is_finish_game){
            LevelManager.getInstance().start_level=LevelManager.getInstance().finish_level+1;
            MapManager.Currentlevel=LevelManager.getInstance().start_level;
            gm.fighting_info=TutorialLevelManager.getInstance().getFightingInfo(LevelManager.getInstance().start_level);
        }else{
            gm.fighting_info=MissionLevelManager.getInstance().getFightingInfo(LevelManager.getInstance().start_level);
        }
    }

    //展开
    doUnfold(jiantouType:JianTou_Type)
    {
        switch(jiantouType)
        {
            case JianTou_Type.LEFT:{
                //计算大小最后一个位置+138
                let left=this.node.getChildByName('left');
                left.stopAllActions();
                //算出有几个是显示的
                let showNum=0;
                let btns=left.getChildByName('btns');
                for(let i=0; i<btns.childrenCount; i++){
                    let btn=btns.children[i];
                    if(btn.active){
                        showNum++;
                    }
                }
                let disY=168+(showNum-1)*123 + 50;
                cc.tween(left).to(0.2,{height:disY}).start();
            }break;
            case JianTou_Type.RIGHT:{
                let right=this.node.getChildByName('right');
                right.stopAllActions();
                //算出有几个是显示的
                let showNum=0;
                let btns=right.getChildByName('btns');
                for(let i=0; i<btns.childrenCount; i++){
                    let btn=btns.children[i];
                    if(btn.active){
                        showNum++;
                    }
                }
                let disY=168+(showNum-1)*123 + 50;                
                cc.tween(right).to(0.2,{height:disY}).start();
            }break;
        }
    }

    //折起
    doFolded(jiantouType:JianTou_Type)
    {
        switch(jiantouType)
        {
            case JianTou_Type.LEFT:{
                let left=this.node.getChildByName('left');
                left.stopAllActions();
                let disY=168+0*123;
                cc.tween(left).to(0.1,{height:disY}).start();
            }break;
            case JianTou_Type.RIGHT:{                
                let right=this.node.getChildByName('right');
                right.stopAllActions();
                let disY=168+0*123;
                cc.tween(right).to(0.1,{height:disY}).start();
            }break;
        }
    }

    clickBtnFast(){
        GameManager.getInstance().sound_manager.playSound(SoundIndex.click);
        FollowManager.getInstance().followEvent(Follow_Type.主页快速挂机按钮点击次数);
        // UIManager.getInstance().showFastGuajiUi({onClose:()=>{
            
        // }});
        UIManager.getInstance().showUiDialog(UIPath.FastGuaJi,UILayerLevel.One,{onCompleted:(uiNode)=> {},});
    }

    clickBtnSaoDang()
    {
        GameManager.getInstance().sound_manager.playSound(SoundIndex.click);
       
    }

    clickBtnStart () {
        FollowManager.getInstance().followEvent(Follow_Type.挑战按钮的点击次数);
        // console.log("__________",(OfflineRevenueManager.getInstance().getTime(LevelManager.getInstance().finish_level)),MissionLevelManager.getMaxLevel())
        if((LevelManager.getInstance().finish_level)>=MissionLevelManager.getMaxLevel()){
            GameManager.getInstance().showMessage(LanguageManager.getInstance().getStrByTextId(100121),3);
            return
            // GameManager.getInstance().showMessage("你太厉害啦，测试版本暂时没有了，敬请期待后续版本！记得加id",3);
        }
        GameManager.getInstance().cur_game_mode=GameMode.Main;
        FollowManager.getInstance().followEvent(Follow_Type.点击开始挑战用户数);
        GameManager.getInstance().sound_manager.playSound(SoundIndex.click);
        //LevelManager.getInstance().start_level=this.cur_selected_level;
        if(!TutorailsManager.getInstance().is_finish_game)
        {
            LevelManager.getInstance().start_level=MapManager.Currentlevel=LevelManager.getInstance().finish_level+1;
            this.startGame();
        }else
        {
            let max=OfflineRevenueManager.getInstance().getTime(LevelManager.getInstance().finish_level);
            if(OfflineRevenueManager.getGuaJiMin()>=max){
                // UIManager.getInstance().showOfflineUi({
                //     onRefresh:()=>{
                //         this.node.getChildByName('btnOfflineGift').getComponent(GuaJiGift).cheak();
                //     }
                // });
                UIManager.getInstance().showUiDialog(UIPath.Guaji,UILayerLevel.One,{onCompleted:(uiNode)=> {
                    uiNode.getComponent(OfflineUi).init({
                        onRefresh:()=>{
                            this.node.getChildByName('btnOfflineGift').getComponent(GuaJiGift).cheak();
                        }
                    })
                },})
            }else{
                // UIManager.getInstance().showMapUi({onClose:()=>{
                //     this.cur_selected_level=LevelManager.getInstance().start_level;                    
                //     GameManager.getInstance().refreshZhanliShow();
                // }});     
                           
                // LevelManager.getInstance().start_level=MapManager.Currentlevel=LevelManager.getInstance().finish_level+1;
                UIManager.getInstance().showUiDialog(UIPath.ToPlay,UILayerLevel.One,{onCompleted:(uiNode)=> {
                    uiNode.getComponent(ToPlayMainUi).init({onClose:()=>{
                        MapManager.Currentlevel=LevelManager.getInstance().finish_level+1;
                        this.cur_selected_level=LevelManager.getInstance().start_level;                    
                        GameManager.getInstance().refreshZhanliShow();
                    }});
                },})
            }            
        }
    }    

    clickBtnRabate(){
        GameManager.getInstance().sound_manager.playSound(SoundIndex.click);
        if(!FunctionDefinitionManager.getInstance().getIsUnlock(FuncType.FanLi)){            
            GameManager.getInstance().showMessage(LanguageManager.getInstance().getString(LanguageIndex.UnlockAfter)+LanguageManager.getInstance().getString(LanguageIndex.PlayerLv)+FunctionDefinitionManager.getInstance().getUnlockCondictionParameter(FuncType.FanLi));
            return;
        }
        // UIManager.getInstance().showRabateUi();
    }

    clickBtnGift(){
        GameManager.getInstance().sound_manager.playSound(SoundIndex.click);
        if(!FunctionDefinitionManager.getInstance().getIsUnlock(FuncType.LiBao)){            
            GameManager.getInstance().showMessage(LanguageManager.getInstance().getString(LanguageIndex.UnlockAfter)+LanguageManager.getInstance().getString(LanguageIndex.PlayerLv)+FunctionDefinitionManager.getInstance().getUnlockCondictionParameter(FuncType.LiBao));
            return;
        }
        // UIManager.getInstance().showGiftCenterUi();
    }

    clickBtnWeekGift(){
        GameManager.getInstance().sound_manager.playSound(SoundIndex.click);
        if(!FunctionDefinitionManager.getInstance().getIsUnlock(FuncType.ZhouLiBao)){            
            GameManager.getInstance().showMessage(LanguageManager.getInstance().getString(LanguageIndex.UnlockAfter)+LanguageManager.getInstance().getString(LanguageIndex.PlayerLv)+FunctionDefinitionManager.getInstance().getUnlockCondictionParameter(FuncType.ZhouLiBao));
            return;
        }
        
    }
    clickBtnMainIconMap(){//打开大地图  
        FollowManager.getInstance().followEvent(Follow_Type.大地图按钮点击次数);
        this.BigMap.active=true
    }
    /**显示挂机奖励界面 */
    clickBtnMainIconIdle(){
        FollowManager.getInstance().followEvent(Follow_Type.离线收益按钮点击次数);
        UIManager.getInstance().showUiDialog(UIPath.Guaji,UILayerLevel.One,{onCompleted:()=>{
            
        }});
    }

    startGame()
    {
        this.setLevelData();
        let bgLoading=UIManager.getInstance().getLoadingNode();
        bgLoading.active=true;
        let loadingBar=bgLoading.getChildByName('ProgressBar').getComponent(cc.ProgressBar);
        let loadLabel=loadingBar.node.getChildByName('loadLabel').getComponent(cc.Label);
        cc.director.preloadScene(GameScene.game,(completedCount: number, totalCount: number, item: any)=>{
            //真实进度
            let progressTrue=completedCount/totalCount;
            //假的进度
            let progressFalse=progressTrue/2;
            loadingBar.progress = progressFalse;
            loadLabel.string=(loadingBar.progress*100).toFixed(0)+'%';
            GameManager.getInstance().cur_load_progress=progressFalse;
            //this.loading_light.x = this.loading_bar.progress*this.loading_bar.totalLength-this.loading_bar.totalLength/2;
        },()=>{
            cc.director.loadScene(GameScene.game);
        });
        
    }

    refreshMainTaskUi(){
        let taskUi = this.node.getChildByName("mainTask");
        let effect = this.node.getChildByName("mainTaskEffect");
        let main_data = TaskManager.getInstance().getMainTaskData();
        if(main_data == null){
            taskUi.active = false;
            effect.active = false;
            return;
        }
        this.scheduleOnce(()=>{
            effect.height = taskUi.height;
        },0.02);
        let nowNum = TheStorageManager.getInstance().getNumber(StorageKey.TaskMainNum + main_data.TaskType,0);
        taskUi.getChildByName("content").getComponent(TextLanguage).setTextId(main_data.ThreadTaskDescription);
        taskUi.getChildByName("content").getComponentInChildren(cc.Label).string = nowNum + '/' + main_data.TaskParameters
        let content = taskUi.getChildByName("content");
        if(nowNum>=main_data.TaskParameters){
            effect.active = true;
            content.getChildByName("num").color = cc.color(47,255,42);
            TheStorageManager.getInstance().setItem(StorageKey.TaskState + main_data.ThreadTaskID,1);
            content.getComponentInChildren(cc.Label).string = main_data.TaskParameters + '/' + main_data.TaskParameters
        }else{
            content.getChildByName("num").color = cc.color(255,255,255);
            effect.active = false;
        }
        if(main_data.TaskType == 1){
            taskUi.getChildByName("content").getComponentInChildren(cc.Label).string = (nowNum>=main_data.TaskParameters?1:0) + '/' + "1";
        }
        let reward = taskUi.getChildByName("reward");
        reward.getChildByName("gemLabel").getComponent(cc.Label).string = main_data.PropNum_2 + '';
        reward.getChildByName("coinLabel").getComponent(cc.Label).string = main_data.PropNum_1 + '';
    }

    private getZongZhanLiJsonString():string{
        let uid=UserData.getInstance().getUserID();
        let zongZhanLi = HeroManager.getInstance().getAllHeroZhanli();
        return JSON.stringify({
            type:1,
            uid:uid,
            value:zongZhanLi,
        });
    }

}
