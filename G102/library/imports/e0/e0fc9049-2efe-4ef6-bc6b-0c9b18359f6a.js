"use strict";
cc._RF.push(module, 'e0fc9BJLv5O9rxrDJsYNZ9q', 'Loading');
// Scripts/Loading/Loading.ts

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
var ABTestManager_1 = require("../ABTest/ABTestManager");
var ApkManager_1 = require("../Ads/ApkManager");
var Constants_1 = require("../Constants");
var EquipmentManager_1 = require("../Equipment/EquipmentManager");
var GameData_1 = require("../GameData");
var GameManager_1 = require("../GameManager");
var FollowConstants_1 = require("../multiLanguage/FollowConstants");
var FollowManager_1 = require("../multiLanguage/FollowManager");
var LanguageSprite_1 = require("../multiLanguage/LanguageSprite");
var TutorailsManager_1 = require("../Tutorials/TutorailsManager");
var HeroManager_1 = require("../Hero/Data/HeroManager");
var TextManagement_1 = require("../JsonData/TextManagement");
var Jackpot_1 = require("../JsonData/Jackpot");
var LevelManager_1 = require("../Level/LevelManager");
var MonsterDataManager_1 = require("../Monster/Data/MonsterDataManager");
var OfflineRevenue_1 = require("../JsonData/OfflineRevenue");
var UserData_1 = require("../UserData");
var SignIn_1 = require("../JsonData/SignIn");
var LoadManager_1 = require("./LoadManager");
var PlayerLevelUp_1 = require("../JsonData/PlayerLevelUp");
var FunctionDefinition_1 = require("../JsonData/FunctionDefinition");
var TowerLevel_1 = require("../Tower/TowerLevel");
var TowerReward_1 = require("../Tower/TowerReward");
var JackpotCollection_1 = require("../JsonData/JackpotCollection");
var CustomsClearanceRebate_1 = require("../JsonData/CustomsClearanceRebate");
var LevelUpRebate_1 = require("../JsonData/LevelUpRebate");
var BattlePassManager_1 = require("../BattlePass/BattlePassManager");
var UIManager_1 = require("../UI/UIManager");
var SignNum_1 = require("../JsonData/SignNum");
var PetManager_1 = require("../Pet/PetManager");
var PropManager_1 = require("../Prop/PropManager");
var CoinShopManagement_1 = require("../JsonData/CoinShopManagement");
var SkillLevelUnlock_1 = require("../Hero/Data/SkillLevelUnlock");
var CumulativeCard_1 = require("../Wish/CumulativeCard");
var WishSpend_1 = require("../Wish/WishSpend");
var MazeManager_1 = require("../Maze/MazeManager");
var CommodityManagement_1 = require("../JsonData/CommodityManagement");
var ExclusiveEnhancement_1 = require("../JsonData/ExclusiveEnhancement");
var ExclusiveWeaponMessage_1 = require("../JsonData/ExclusiveWeaponMessage");
var ExclusiveWeaponSkill_1 = require("../JsonData/ExclusiveWeaponSkill");
var TaskInformation_1 = require("../Task/Data/TaskInformation");
var ThreadTaskInformation_1 = require("../Task/Data/ThreadTaskInformation");
var AccumulatedInformation_1 = require("../Task/Data/AccumulatedInformation");
var RoguePetsLease_1 = require("../Maze/Data/RoguePetsLease");
var EggCumulative_1 = require("../TakeEgg/EggCumulative");
var PayManager_1 = require("../Payment/PayManager");
var CyclePack_1 = require("../Payment/Data/CyclePack");
var EndlessLevels_1 = require("../Activity/EndlessLevels");
var EndlessReward_1 = require("../Activity/EndlessReward");
var BossChallenge_1 = require("../Activity/BossChallenge");
var BossReward_1 = require("../Activity/BossReward");
var EggInformation_1 = require("../TakeEgg/EggInformation");
var ChapterPack_1 = require("../Store/ChapterPack");
var DailyShop_1 = require("../Store/DailyShop");
var DiamondsRecharge_1 = require("../Store/DiamondsRecharge");
var DrawCardInformation_1 = require("../Store/DrawCardInformation");
var PurchaseCoins_1 = require("../Store/PurchaseCoins");
var CommodityInformation_1 = require("../Store/CommodityInformation");
var Image_Language_1 = require("../Multilingual/Image_Language");
var DrawCardProbability_1 = require("../Store/DrawCardProbability");
var TurntableInformation_1 = require("../Turntable/TurntableInformation");
var TaskManager_1 = require("../Task/TaskManager");
var AchievenmentTask_1 = require("../Task/Data/AchievenmentTask");
var BattlePassData_1 = require("../BattlePass/BattlePassData");
var TutorialLevel_1 = require("../Level/TutorialLevel");
var CourseText_1 = require("../Tutorials/CourseText");
var CumulativeRecharges_1 = require("../AccumulatedRecharge/CumulativeRecharges");
var UserInfo_1 = require("../UserInfo/UserInfo");
var BossWeeklyReward_1 = require("../copy/endlesschallenges/BossWeeklyReward");
var EndlessBuff_1 = require("../copy/endlesschallenges/EndlessBuff");
var ConstantConfiguration_1 = require("../JsonData/ConstantConfiguration");
var MissionLevel_1 = require("../Level/MissionLevel");
var RogueGiftInformation_1 = require("../copy/endlesschallenges/RogueGiftInformation");
var RogueShop_1 = require("../copy/endlesschallenges/RogueShop");
var RogueHexagonTypes_1 = require("../copy/voidcrack/RogueHexagonTypes");
var FirstCompleteReward_1 = require("../Level/FirstCompleteReward");
var RogueLevel_1 = require("../copy/voidcrack/RogueLevel");
var RoguefastPass_1 = require("../copy/voidcrack/RoguefastPass");
var WXManagerEX_1 = require("../../startscene/WXManagerEX");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var Loading = /** @class */ (function (_super) {
    __extends(Loading, _super);
    function Loading() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.is_start = false;
        _this.issued_data = null;
        _this.is_issued_finish = false;
        _this.scene_progress = 0;
        _this.loadingBar = null;
        _this.loadLabel = null;
        _this.max_load_time = 10;
        _this.load_total_time = 0;
        _this.cartoon = null;
        return _this;
    }
    Loading.prototype.onLoad = function () {
        var _this = this;
        if (TutorailsManager_1.default.getInstance().isShowTutorials(200)) {
            //显示漫画
            this.cartoon.active = true;
        }
        this.closeJiaoCheng();
        if (Constants_1.IsGM && LoadManager_1.LoadManager.load_mode == LoadManager_1.Load_Mode.remote) {
            var isOk_1 = false;
            cc.assetManager.loadRemote(LoadManager_1.LoadManager.remote_url_json + "HeroAttribute.json", function (error, assets) {
                if (error) {
                    console.log(error);
                    _this.node.parent.getChildByName('ipEditBox').getComponent(cc.EditBox).string = LoadManager_1.LoadManager.remote_url_json;
                    _this.node.parent.getChildByName('ipEditBox').active = true;
                    return;
                }
                isOk_1 = true;
                _this.loadAll();
            });
            this.scheduleOnce(function () {
                if (isOk_1 == false) {
                    _this.node.parent.getChildByName('ipEditBox').getComponent(cc.EditBox).string = LoadManager_1.LoadManager.remote_url_json;
                    _this.node.parent.getChildByName('ipEditBox').active = true;
                }
            }, 2);
            //this.loadAll()
        }
        else {
            this.node.parent.getChildByName('ipEditBox').active = false;
            this.loadAll();
        }
        //cc.log("w1,314,56.65".match(/\d+(\.\d+)?/g));
        if (Constants_1.IsDebug && Constants_1.IsGM) {
            console.error(Constants_1.local_version);
        }
    };
    Loading.prototype.closeJiaoCheng = function () {
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
    };
    Loading.prototype.loadAll = function () {
        LoadManager_1.LoadManager.init();
        UserData_1.default.getInstance();
        GameManager_1.default.getInstance().cur_game_scene = Constants_1.GameScene.load;
        TutorailsManager_1.default.getInstance();
        TutorialLevel_1.TutorialLevelManager.getInstance();
        CourseText_1.CourseTextManager.getInstance();
        ABTestManager_1.default.getInstance();
        EquipmentManager_1.EquipmentManager.getInstance();
        HeroManager_1.HeroManager.getInstance();
        TextManagement_1.TextManagementManager.getInstance();
        Image_Language_1.Image_LanguageManager.getInstance();
        Jackpot_1.JackpotManager.getInstance();
        JackpotCollection_1.JackpotCollectionManager.getInstance();
        MonsterDataManager_1.MonsterDataManager.getInstance();
        LevelManager_1.LevelManager.getInstance();
        OfflineRevenue_1.OfflineRevenueManager.getInstance();
        SignIn_1.SignInManager.getInstance();
        PlayerLevelUp_1.PlayerLevelUpManager.getInstance();
        FunctionDefinition_1.FunctionDefinitionManager.getInstance();
        TowerLevel_1.TowerLevelManager.getInstance();
        TowerReward_1.TowerRewardManager.getInstance();
        CustomsClearanceRebate_1.CustomsClearanceRebateManager.getInstance();
        LevelUpRebate_1.LevelUpRebateManager.getInstance();
        BattlePassManager_1.BattlePassManager.getInstance();
        PropManager_1.PropManager.getInstance();
        SignNum_1.SignNumManager.getInstance();
        PetManager_1.PetManager.getInstance();
        CoinShopManagement_1.CoinShopManagementManager.getInstance();
        SkillLevelUnlock_1.SkillLevelUnlockManager.getInstance();
        CumulativeCard_1.CumulativeCardManager.getInstance();
        WishSpend_1.WishSpendManager.getInstance();
        MazeManager_1.MazeManager.getInstance();
        CommodityManagement_1.CommodityManagementManager.getInstance();
        ExclusiveEnhancement_1.ExclusiveEnhancementManager.getInstance();
        ExclusiveWeaponMessage_1.ExclusiveWeaponMessageManager.getInstance();
        ExclusiveWeaponSkill_1.ExclusiveWeaponSkillManager.getInstance();
        TaskInformation_1.TaskInformationManager.getInstance();
        ThreadTaskInformation_1.ThreadTaskInformationManager.getInstance();
        AccumulatedInformation_1.AccumulatedInformationManager.getInstance();
        RoguePetsLease_1.RoguePetsLeaseManager.getInstance();
        EggCumulative_1.EggCumulativeManager.getInstance();
        EggInformation_1.EggInformationManager.getInstance();
        PayManager_1.PayManager.getInstance();
        CyclePack_1.CyclePackManager.getInstance();
        EndlessLevels_1.EndlessLevelsManager.getInstance();
        EndlessReward_1.EndlessRewardManager.getInstance();
        BossChallenge_1.BossChallengeManager.getInstance();
        BossReward_1.BossRewardManager.getInstance();
        ChapterPack_1.ChapterPackManager.getInstance();
        CommodityManagement_1.CommodityManagementManager.getInstance();
        DailyShop_1.DailyShopManager.getInstance();
        DiamondsRecharge_1.DiamondsRechargeManager.getInstance();
        DrawCardInformation_1.DrawCardInformationManager.getInstance();
        PurchaseCoins_1.PurchaseCoinsManager.getInstance();
        CommodityInformation_1.CommodityInformationManager.getInstance();
        DrawCardProbability_1.DrawCardProbabilityManager.getInstance();
        TurntableInformation_1.TurntableInformationManager.getInstance();
        AchievenmentTask_1.AchievenmentTaskManager.getInstance();
        BattlePassData_1.BattlePassDataManager.getInstance();
        CumulativeRecharges_1.CumulativeRechargesManager.getInstance();
        BossWeeklyReward_1.BossWeeklyRewardManager.getInstance();
        GameData_1.default.getInstance().refreshServerTime();
        EndlessBuff_1.EndlessBuffManager.getInstance();
        ConstantConfiguration_1.ConstantConfigurationManager.getInstance();
        RogueGiftInformation_1.RogueGiftInformationManager.getInstance();
        RogueShop_1.RogueShopManager.getInstance();
        RogueLevel_1.RogueLevelManager.getInstance();
        RogueHexagonTypes_1.RogueHexagonTypesManager.getInstance();
        RoguefastPass_1.RoguefastPassManager.getInstance();
        UserInfo_1.UserInfo.getInstance();
        // cc.assetManager.loadRemote("http://game-bucket.oss-eu-central-1.aliyuncs.com/game/admin/GameQuality/G202/LuckyCardTable.csv",(error: Error, assets:any)=> {
        //     if(error){
        //         console.log(error);
        //         return;
        //     }
        //     console.log(assets);
        // });
    };
    Loading.prototype.start = function () {
        var bgLoading = UIManager_1.UIManager.getInstance().getLoadingNode();
        var title = bgLoading.getChildByName('title');
        title.opacity = 0;
        var bg_loading_1 = this.cartoon.getChildByName("bg_loading_1");
        var title_1 = bg_loading_1.getChildByName('title');
        title_1.opacity = 0;
        cc.tween(title).delay(1).call(function () {
            //ApkManager.getInstance().setABTestPar('{"rank_show":false}');
            FollowManager_1.default.getInstance().followEvent(FollowConstants_1.Follow_Type.Load页展示总次数);
            title.getComponent(LanguageSprite_1.default).startTranslation();
        }).to(1, { opacity: 255 }).start();
        cc.tween(title_1).delay(1).call(function () {
            title_1.getComponent(LanguageSprite_1.default).startTranslation();
        }).to(1, { opacity: 255 }).start();
        bgLoading.getChildByName('ProgressBar').active = false;
        // bgLoading.getChildByName('load').active=false;
        bg_loading_1.getChildByName('ProgressBar').active = false;
        bg_loading_1.getChildByName('load').active = false;
        //1。先判断本地是否有uid测试阶段，先用游客身份登陆
        this.startLoad();
        if (Constants_1.IsTestServer) {
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
        }
        else {
            this.is_issued_finish = true;
        }
        //this.startLoad();
    };
    Loading.prototype.onClickOK = function (btn) {
        var eb = this.node.parent.getChildByName('ipEditBox').getComponent(cc.EditBox);
        LoadManager_1.LoadManager.remote_url_json = eb.string;
        btn.currentTarget.parent.active = false;
        this.loadAll();
    };
    Loading.prototype.startLoad = function () {
        var _this = this;
        if (this.is_start == true)
            return;
        this.is_start = true;
        var bgLoading = UIManager_1.UIManager.getInstance().getLoadingNode();
        bgLoading.getChildByName('ProgressBar').active = true;
        bgLoading.getChildByName('load').active = true;
        bgLoading.active = true;
        var bgLoading_1 = this.cartoon.getChildByName("bg_loading_1");
        bgLoading_1.getChildByName('ProgressBar').active = true;
        bgLoading_1.getChildByName('load').active = true;
        bgLoading_1.active = true;
        this.loadingBar = bgLoading.getChildByName('ProgressBar').getComponent(cc.ProgressBar);
        this.loadLabel = this.loadingBar.node.getChildByName('loadLabel').getComponent(cc.Label);
        //GameManager.getInstance().cur_game_scene=GameScene.home;
        cc.director.preloadScene(Constants_1.GameScene.home, function (completedCount, totalCount, item) {
            //真实进度
            _this.scene_progress = completedCount / totalCount;
        }, function () {
            _this.cheakLoadToScene(0.5);
        });
        this.scheduleOnce(this.loadAllUi, 1);
        if (Constants_1.IsDebug) {
            ApkManager_1.default.getInstance().ad_loaded_num = ApkManager_1.default.getInstance().max_load_num;
        }
        this.scheduleOnce(function () {
            if (ApkManager_1.default.getInstance().ad_loaded_num < ApkManager_1.default.getInstance().max_load_num) {
                ApkManager_1.default.getInstance().ad_loaded_num = ApkManager_1.default.getInstance().max_load_num;
            }
            _this.is_issued_finish = true;
        }, this.max_load_time);
    };
    Loading.prototype.cheakLoadToScene = function (dt) {
        var _this = this;
        cc.log('cheakLoadToScene');
        this.load_total_time += dt;
        if (this.load_total_time >= 10) {
            this.unschedule(this.cheakLoadToScene);
            cc.director.loadScene("load");
            return;
        }
        if (Constants_1.IsDebug) {
            console.log(LoadManager_1.LoadManager.getIsLoadComplete(), UserData_1.default.getInstance().version_is_ok, UserData_1.default.getInstance().is_load_ok, ApkManager_1.default.getInstance().ad_loaded_num >= ApkManager_1.default.getInstance().max_load_num);
        }
        if (LoadManager_1.LoadManager.getIsLoadComplete() && UserData_1.default.getInstance().version_is_ok && UserData_1.default.getInstance().is_load_ok && ApkManager_1.default.getInstance().ad_loaded_num >= ApkManager_1.default.getInstance().max_load_num) {
            this.onLoadFinish();
        }
        else {
            //this.unschedule(this.cheakLoadToScene);
            dt += 0.1;
            this.scheduleOnce(function () {
                _this.cheakLoadToScene(dt);
            }, dt);
        }
    };
    Loading.prototype.onLoadFinish = function () {
        if (FollowManager_1.default.getInstance().getFirstDo(FollowConstants_1.Follow_Type.首次登录) <= 0) {
            FollowManager_1.default.getInstance().addFirstDo(FollowConstants_1.Follow_Type.首次登录);
            FollowManager_1.default.getInstance().followEvent(FollowConstants_1.Follow_Type.首次登录);
        }
        GameManager_1.default.getInstance().cur_load_progress = this.loadingBar.progress;
        // UserInfo.getInstance().refreshData();
        OfflineRevenue_1.OfflineRevenueManager.getInstance().getNowEquipIdList();
        HeroManager_1.HeroManager.getInstance().onLoadHeroData();
        PropManager_1.PropManager.getInstance().loadPropData();
        // PetManager.getInstance().onLoadPetData();
        this.unschedule(this.cheakLoadToScene);
        TaskManager_1.default.getInstance();
        if (TutorailsManager_1.default.getInstance().isShowTutorials(200)) {
            //显示按钮
            this.cartoon.getChildByName("butn").active = true;
            this.cartoon.getChildByName("btn").active = true;
            this.cartoon.getChildByName("Loading").active = false;
            return;
        }
        if (Constants_1.IsTestCode) {
            cc.director.loadScene('zhengxing');
        }
        else {
            GameManager_1.default.getInstance().cur_game_scene = Constants_1.GameScene.home;
            cc.director.loadScene(Constants_1.GameScene.home);
        }
        this.checkExcel();
    };
    Loading.prototype.checkExcel = function () {
        if (cc.sys.isNative == false && Constants_1.IsDebug) {
            MissionLevel_1.MissionLevelManager.getInstance().check();
            FirstCompleteReward_1.FirstCompleteRewardManager.getInstance().check();
            EndlessLevels_1.EndlessLevelsManager.getInstance().check();
            DailyShop_1.DailyShopManager.getInstance().check();
        }
    };
    Loading.prototype.loadAllUi = function () {
        if (!TutorailsManager_1.default.getInstance().is_finish) {
            WXManagerEX_1.default.getInstance().resourcesBundle.loadDir('tutorials');
        }
    };
    Loading.prototype.update = function (dt) {
        //资源进度
        // let assetsPro=LoadManager.loaded_completed/LoadManager.max_num_loading;
        // //广告进度
        // let adPro=ApkManager.getInstance().ad_loaded_num/ApkManager.getInstance().max_load_num;
        // let pp=(this.scene_progress+assetsPro+adPro)/3;
        // //假的进度
        var progressFalse = this.loadingBar.progress + dt / this.max_load_time;
        if (progressFalse > 1) {
            progressFalse = 1;
        }
        this.loadingBar.progress = progressFalse;
        this.loadLabel.string = (this.loadingBar.progress * 100).toFixed(0) + '%';
        GameManager_1.default.getInstance().cur_load_progress = progressFalse;
    };
    __decorate([
        property(cc.Node)
    ], Loading.prototype, "cartoon", void 0);
    Loading = __decorate([
        ccclass
    ], Loading);
    return Loading;
}(cc.Component));
exports.default = Loading;

cc._RF.pop();