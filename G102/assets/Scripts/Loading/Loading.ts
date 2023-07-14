
import ABTestManager from "../ABTest/ABTestManager";
import ApkManager from "../Ads/ApkManager";
import { GameScene, IsDebug, IsGM, IsTestCode, IsTestServer, local_version } from "../Constants";
import { EquipmentManager } from "../Equipment/EquipmentManager";
import GameData from "../GameData";
import GameManager from "../GameManager";
import { Follow_Type } from "../multiLanguage/FollowConstants";
import FollowManager from "../multiLanguage/FollowManager";
import SpriteLanguage from "../multiLanguage/LanguageSprite";
import TutorailsManager from "../Tutorials/TutorailsManager";
import { HeroManager } from "../Hero/Data/HeroManager";
import { TextManagementManager } from "../JsonData/TextManagement";
import { JackpotManager } from "../JsonData/Jackpot";
import { LevelManager } from "../Level/LevelManager";
import { MonsterDataManager } from "../Monster/Data/MonsterDataManager";
import { OfflineRevenueManager } from "../JsonData/OfflineRevenue";
import UserData from "../UserData";
import { SignInManager } from "../JsonData/SignIn";
import { LoadManager, Load_Mode } from "./LoadManager";
import { PlayerLevelUpManager } from "../JsonData/PlayerLevelUp";
import { FunctionDefinitionManager } from "../JsonData/FunctionDefinition";
import { TowerLevelManager } from "../Tower/TowerLevel";
import { TowerRewardManager } from "../Tower/TowerReward";
import { JackpotCollectionManager } from "../JsonData/JackpotCollection";
import { CustomsClearanceRebateManager } from "../JsonData/CustomsClearanceRebate";
import { LevelUpRebateManager } from "../JsonData/LevelUpRebate";
import { BattlePassManager } from "../BattlePass/BattlePassManager";
import { InjuredData } from "../Monster/MonsterData";
import { UIManager } from "../UI/UIManager";
import { SignNumManager } from "../JsonData/SignNum";
import { PetManager } from "../Pet/PetManager";
import { PropManager } from "../Prop/PropManager";
import { CoinShopManagementManager } from "../JsonData/CoinShopManagement";
import { SkillLevelUnlockManager } from "../Hero/Data/SkillLevelUnlock";
import { CumulativeCardManager } from "../Wish/CumulativeCard";
import { WishSpendManager } from "../Wish/WishSpend";
import { MazeManager } from "../Maze/MazeManager";
import { CommodityManagementManager } from "../JsonData/CommodityManagement";
import { ExclusiveEnhancementManager } from "../JsonData/ExclusiveEnhancement";
import { ExclusiveWeaponMessageManager } from "../JsonData/ExclusiveWeaponMessage";
import { ExclusiveWeaponSkillManager } from "../JsonData/ExclusiveWeaponSkill";
import { TaskInformationManager } from "../Task/Data/TaskInformation";
import { ThreadTaskInformationManager } from "../Task/Data/ThreadTaskInformation";
import { AccumulatedInformationManager } from "../Task/Data/AccumulatedInformation";
import { RoguePetsLeaseManager } from "../Maze/Data/RoguePetsLease";
import { EggCumulativeManager } from "../TakeEgg/EggCumulative";
import { PayManager } from "../Payment/PayManager";
import { CyclePackManager } from "../Payment/Data/CyclePack";
import { EndlessLevelsManager } from "../Activity/EndlessLevels";
import { EndlessRewardManager } from "../Activity/EndlessReward";
import { BossChallengeManager } from "../Activity/BossChallenge";
import { BossRewardManager } from "../Activity/BossReward";
import { EggInformationManager } from "../TakeEgg/EggInformation";
import { ChapterPackManager } from "../Store/ChapterPack";
import { DailyShopManager } from "../Store/DailyShop";
import { DiamondsRechargeManager } from "../Store/DiamondsRecharge";
import { DrawCardInformationManager } from "../Store/DrawCardInformation";
import { PurchaseCoinsManager } from "../Store/PurchaseCoins";
import { CommodityInformationManager } from "../Store/CommodityInformation";
import { Image_LanguageManager } from "../Multilingual/Image_Language";
import { DrawCardProbabilityManager } from "../Store/DrawCardProbability";
import { TurntableInformationManager } from "../Turntable/TurntableInformation";
import TaskManager from "../Task/TaskManager";
import { AchievenmentTaskManager } from "../Task/Data/AchievenmentTask";
import { BattlePassDataManager } from "../BattlePass/BattlePassData";
import { TutorialLevelManager } from "../Level/TutorialLevel";
import { CourseTextManager } from "../Tutorials/CourseText";
import { CumulativeRechargesManager } from "../AccumulatedRecharge/CumulativeRecharges";
import { UserInfo } from "../UserInfo/UserInfo";
import { BossWeeklyRewardManager } from "../copy/endlesschallenges/BossWeeklyReward";
import { EndlessBuffManager } from "../copy/endlesschallenges/EndlessBuff";
import { ConstantConfigurationManager } from "../JsonData/ConstantConfiguration";
import { MissionLevelManager } from "../Level/MissionLevel";
import { RogueGiftInformationManager } from "../copy/endlesschallenges/RogueGiftInformation";
import { RogueShopManager } from "../copy/endlesschallenges/RogueShop";
import { RogueHexagonTypesManager } from "../copy/voidcrack/RogueHexagonTypes";
import { FirstCompleteRewardManager } from "../Level/FirstCompleteReward";
import { RogueLevelManager } from "../copy/voidcrack/RogueLevel";
import { RoguefastPassManager } from "../copy/voidcrack/RoguefastPass";


const {ccclass, property} = cc._decorator;

@ccclass
export default class Loading extends cc.Component {

    is_start:boolean=false;
    issued_data:any=null;
    is_issued_finish:boolean=false;
    scene_progress:number=0;
    loadingBar:cc.ProgressBar=null;
    loadLabel:cc.Label=null;
    max_load_time:number=10;
    load_total_time:number=0;

    @property(cc.Node)
    cartoon:cc.Node=null;
    
    protected onLoad(): void {
        if(TutorailsManager.getInstance().isShowTutorials(200)){
            //显示漫画
            this.cartoon.active=true
        }
        this.closeJiaoCheng();
        if(IsGM&&LoadManager.load_mode==Load_Mode.remote){
            let isOk=false;
            cc.assetManager.loadRemote(LoadManager.remote_url_json+"HeroAttribute.json",(error: Error, assets:cc.JsonAsset)=> {
                if(error){
                    console.log(error);
                    this.node.parent.getChildByName('ipEditBox').getComponent(cc.EditBox).string=LoadManager.remote_url_json;
                    this.node.parent.getChildByName('ipEditBox').active=true;
                    return;
                }
                isOk=true;
                this.loadAll();
            });
            this.scheduleOnce(()=>{
                if(isOk==false){
                    this.node.parent.getChildByName('ipEditBox').getComponent(cc.EditBox).string=LoadManager.remote_url_json;
                    this.node.parent.getChildByName('ipEditBox').active=true;
                }
            },2);
            //this.loadAll()
        }else{
            this.node.parent.getChildByName('ipEditBox').active=false;
            this.loadAll()
        }
        //cc.log("w1,314,56.65".match(/\d+(\.\d+)?/g));
        if(IsDebug&&IsGM){
            console.error(local_version);
        }
    }

    closeJiaoCheng(){
        //TutorailsManager.getInstance().saveTutorials(201);
        //TutorailsManager.getInstance().saveTutorials(202);
        //TutorailsManager.getInstance().saveTutorials(203);
        //TutorailsManager.getInstance().saveTutorials(204);
        // TutorailsManager.getInstance().saveTutorials(205);
        // TutorailsManager.getInstance().saveTutorials(206);
        // TutorailsManager.getInstance().saveTutorials(207);
        //TutorailsManager.getInstance().saveTutorials(208);
        // TutorailsManager.getInstance().saveTutorials(209);
        // TutorailsManager.getInstance().saveTutorials(210);
        // TutorailsManager.getInstance().saveTutorials(211);
        // TutorailsManager.getInstance().saveTutorials(212);
        //TutorailsManager.getInstance().saveTutorials(213);
        //TutorailsManager.getInstance().saveTutorials(214);
        //TutorailsManager.getInstance().saveTutorials(215);
        // TutorailsManager.getInstance().saveTutorials(216);
        // TutorailsManager.getInstance().saveTutorials(217);
        // TutorailsManager.getInstance().saveTutorials(218);
        // TutorailsManager.getInstance().saveTutorials(219);
        // TutorailsManager.getInstance().saveTutorials(220);
        // TutorailsManager.getInstance().saveTutorials(221);
        // TutorailsManager.getInstance().saveTutorials(222);
        // TutorailsManager.getInstance().saveTutorials(223);
        // TutorailsManager.getInstance().saveTutorials(224);
    }

    loadAll(){
        LoadManager.init();
        UserData.getInstance();
        GameManager.getInstance().cur_game_scene=GameScene.load;
        TutorailsManager.getInstance();
        TutorialLevelManager.getInstance();
        CourseTextManager.getInstance();
        ABTestManager.getInstance();
        EquipmentManager.getInstance();
        HeroManager.getInstance();
        TextManagementManager.getInstance();
        Image_LanguageManager.getInstance();
        JackpotManager.getInstance();
        JackpotCollectionManager.getInstance();
        MonsterDataManager.getInstance();
        LevelManager.getInstance();
        OfflineRevenueManager.getInstance();
        SignInManager.getInstance();
        PlayerLevelUpManager.getInstance();
        FunctionDefinitionManager.getInstance();
        TowerLevelManager.getInstance();
        TowerRewardManager.getInstance();
        CustomsClearanceRebateManager.getInstance();
        LevelUpRebateManager.getInstance();
        BattlePassManager.getInstance();
        PropManager.getInstance();
        SignNumManager.getInstance();
        PetManager.getInstance();
        CoinShopManagementManager.getInstance();
        SkillLevelUnlockManager.getInstance();        
        CumulativeCardManager.getInstance();
        WishSpendManager.getInstance();
        MazeManager.getInstance()
        CommodityManagementManager.getInstance();        
        ExclusiveEnhancementManager.getInstance();
        ExclusiveWeaponMessageManager.getInstance();
        ExclusiveWeaponSkillManager.getInstance();
        TaskInformationManager.getInstance();
        ThreadTaskInformationManager.getInstance();
        AccumulatedInformationManager.getInstance();
        RoguePetsLeaseManager.getInstance();
        EggCumulativeManager.getInstance();
        EggInformationManager.getInstance();
        PayManager.getInstance();
        CyclePackManager.getInstance();
        EndlessLevelsManager.getInstance();
        EndlessRewardManager.getInstance();
        BossChallengeManager.getInstance();
        BossRewardManager.getInstance();
        ChapterPackManager.getInstance();
        CommodityManagementManager.getInstance();
        DailyShopManager.getInstance();
        DiamondsRechargeManager.getInstance();
        DrawCardInformationManager.getInstance();
        PurchaseCoinsManager.getInstance();
        CommodityInformationManager.getInstance();
        DrawCardProbabilityManager.getInstance();
        TurntableInformationManager.getInstance();
        AchievenmentTaskManager.getInstance();
        BattlePassDataManager.getInstance();
        CumulativeRechargesManager.getInstance();
        
        BossWeeklyRewardManager.getInstance();
        GameData.getInstance().refreshServerTime();
        EndlessBuffManager.getInstance();
        ConstantConfigurationManager.getInstance();
        RogueGiftInformationManager.getInstance();
        RogueShopManager.getInstance();
        RogueLevelManager.getInstance();
        RogueHexagonTypesManager.getInstance();
        RoguefastPassManager.getInstance();

        UserInfo.getInstance();
        // cc.assetManager.loadRemote("http://game-bucket.oss-eu-central-1.aliyuncs.com/game/admin/GameQuality/G202/LuckyCardTable.csv",(error: Error, assets:any)=> {
        //     if(error){
        //         console.log(error);
        //         return;
        //     }
        //     console.log(assets);
        // });

    }

    start()
    {
        let bgLoading=UIManager.getInstance().getLoadingNode();
        let title=bgLoading.getChildByName('title');
        title.opacity=0;

        let bg_loading_1=this.cartoon.getChildByName("bg_loading_1")
        let title_1=bg_loading_1.getChildByName('title');
        title_1.opacity=0;
        
        cc.tween(title).delay(1).call(()=>{
            //ApkManager.getInstance().setABTestPar('{"rank_show":false}');
            FollowManager.getInstance().followEvent(Follow_Type.Load页展示总次数);
            title.getComponent(SpriteLanguage).startTranslation();
        }).to(1,{opacity:255}).start();

        cc.tween(title_1).delay(1).call(()=>{
            title_1.getComponent(SpriteLanguage).startTranslation();
        }).to(1,{opacity:255}).start();

        bgLoading.getChildByName('ProgressBar').active=false;
        bgLoading.getChildByName('load').active=false;
        
        bg_loading_1.getChildByName('ProgressBar').active=false;
        bg_loading_1.getChildByName('load').active=false;

        //1。先判断本地是否有uid测试阶段，先用游客身份登陆
        this.startLoad();
        if(IsTestServer)
        {
            // if(UserData.getInstance().getUserID())
            // {
            //     ApkManager.getInstance().setUid();
            // }else
            // {
            //     ApkManager.getInstance().uploadAndGetUid((userInfo:any)=>{
            //         this.is_issued_finish=true;
            //         console.log(userInfo);
            //         let json=JSON.parse(userInfo);
            //         if(json.uid)
            //         {
            //             UserData.getInstance().saveUserID(json.uid);                        
            //         }else
            //         {
            //             this.startLoad();
            //         }
            //     })
            // }
        }else
        {
            this.is_issued_finish=true;
        }
        //this.startLoad();

    }

    onClickOK(btn:cc.Event.EventTouch){
        let eb=this.node.parent.getChildByName('ipEditBox').getComponent(cc.EditBox);
        LoadManager.remote_url_json=eb.string;
        btn.currentTarget.parent.active=false;
        this.loadAll();
    }

    startLoad()
    {
        if(this.is_start==true)
        return;
        this.is_start=true;        
        let bgLoading=UIManager.getInstance().getLoadingNode();
        bgLoading.getChildByName('ProgressBar').active=true;
        bgLoading.getChildByName('load').active=true;
        bgLoading.active=true;
        let bgLoading_1=this.cartoon.getChildByName("bg_loading_1")
        bgLoading_1.getChildByName('ProgressBar').active=true;
        bgLoading_1.getChildByName('load').active=true;
        bgLoading_1.active=true;

        this.loadingBar=bgLoading.getChildByName('ProgressBar').getComponent(cc.ProgressBar);
        this.loadLabel=this.loadingBar.node.getChildByName('loadLabel').getComponent(cc.Label);
        //GameManager.getInstance().cur_game_scene=GameScene.home;
        cc.director.preloadScene(GameScene.home,(completedCount: number, totalCount: number, item: any)=>{
            //真实进度
            this.scene_progress=completedCount/totalCount;            
        },()=>{
            this.cheakLoadToScene(0.5);
        });
        this.scheduleOnce(this.loadAllUi,1);
        if(IsDebug){
            ApkManager.getInstance().ad_loaded_num=ApkManager.getInstance().max_load_num
        }
        this.scheduleOnce(()=>{
            if(ApkManager.getInstance().ad_loaded_num<ApkManager.getInstance().max_load_num){
                ApkManager.getInstance().ad_loaded_num=ApkManager.getInstance().max_load_num;
            }
            this.is_issued_finish=true;
        },this.max_load_time);
    }

    cheakLoadToScene(dt)
    {
        cc.log('cheakLoadToScene');
        this.load_total_time+=dt;
        if(this.load_total_time>=10){
            this.unschedule(this.cheakLoadToScene);
            cc.director.loadScene("load");
            return;
        }
        if(IsDebug){
            console.log(LoadManager.getIsLoadComplete(),UserData.getInstance().version_is_ok,UserData.getInstance().is_load_ok,ApkManager.getInstance().ad_loaded_num>=ApkManager.getInstance().max_load_num)
        }
        if(LoadManager.getIsLoadComplete()&&UserData.getInstance().version_is_ok&&UserData.getInstance().is_load_ok&&ApkManager.getInstance().ad_loaded_num>=ApkManager.getInstance().max_load_num)
        {
            this.onLoadFinish();
        }else
        {
            //this.unschedule(this.cheakLoadToScene);
            dt+=0.1;
            this.scheduleOnce(()=>{
                this.cheakLoadToScene(dt);
            },dt);
        }
    }

    onLoadFinish(){
        if(FollowManager.getInstance().getFirstDo(Follow_Type.首次登录)<=0){
            FollowManager.getInstance().addFirstDo(Follow_Type.首次登录);
            FollowManager.getInstance().followEvent(Follow_Type.首次登录);
        }
        GameManager.getInstance().cur_load_progress=this.loadingBar.progress;
        // UserInfo.getInstance().refreshData();
        OfflineRevenueManager.getInstance().getNowEquipIdList();
        HeroManager.getInstance().onLoadHeroData();
        PropManager.getInstance().loadPropData();
        
        // PetManager.getInstance().onLoadPetData();
        this.unschedule(this.cheakLoadToScene);
        TaskManager.getInstance();
        if(TutorailsManager.getInstance().isShowTutorials(200)){
            //显示按钮
            this.cartoon.getChildByName("butn").active=true
            this.cartoon.getChildByName("btn").active=true
            this.cartoon.getChildByName("Loading").active=false
            return
        }
        if(IsTestCode){
            cc.director.loadScene('zhengxing');
        }else{
            GameManager.getInstance().cur_game_scene=GameScene.home;
            cc.director.loadScene(GameScene.home);
        }
        this.checkExcel();
    }

    checkExcel(){
        if(cc.sys.isNative==false && IsDebug){
            MissionLevelManager.getInstance().check();
            FirstCompleteRewardManager.getInstance().check();
            EndlessLevelsManager.getInstance().check();
            DailyShopManager.getInstance().check();
        }
    }
    
    loadAllUi()
    {        
        if(!TutorailsManager.getInstance().is_finish)
        {
            cc.resources.loadDir('tutorials');
        }
    }

    protected update(dt: number): void {
            //资源进度
            // let assetsPro=LoadManager.loaded_completed/LoadManager.max_num_loading;
            // //广告进度
            // let adPro=ApkManager.getInstance().ad_loaded_num/ApkManager.getInstance().max_load_num;
            // let pp=(this.scene_progress+assetsPro+adPro)/3;
            // //假的进度
            let progressFalse=this.loadingBar.progress+dt/this.max_load_time;
            if(progressFalse>1)
            {
                progressFalse=1;
            }
            this.loadingBar.progress = progressFalse;
            this.loadLabel.string=(this.loadingBar.progress*100).toFixed(0)+'%';
            GameManager.getInstance().cur_load_progress=progressFalse;
    }

}
