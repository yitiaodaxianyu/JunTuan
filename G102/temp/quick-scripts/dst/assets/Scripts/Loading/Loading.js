
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Scripts/Loading/Loading.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
        bgLoading.getChildByName('load').active = false;
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
            cc.resources.loadDir('tutorials');
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0c1xcTG9hZGluZ1xcTG9hZGluZy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFDQSx5REFBb0Q7QUFDcEQsZ0RBQTJDO0FBQzNDLDBDQUFpRztBQUNqRyxrRUFBaUU7QUFDakUsd0NBQW1DO0FBQ25DLDhDQUF5QztBQUN6QyxvRUFBK0Q7QUFDL0QsZ0VBQTJEO0FBQzNELGtFQUE2RDtBQUM3RCxrRUFBNkQ7QUFDN0Qsd0RBQXVEO0FBQ3ZELDZEQUFtRTtBQUNuRSwrQ0FBcUQ7QUFDckQsc0RBQXFEO0FBQ3JELHlFQUF3RTtBQUN4RSw2REFBbUU7QUFDbkUsd0NBQW1DO0FBQ25DLDZDQUFtRDtBQUNuRCw2Q0FBdUQ7QUFDdkQsMkRBQWlFO0FBQ2pFLHFFQUEyRTtBQUMzRSxrREFBd0Q7QUFDeEQsb0RBQTBEO0FBQzFELG1FQUF5RTtBQUN6RSw2RUFBbUY7QUFDbkYsMkRBQWlFO0FBQ2pFLHFFQUFvRTtBQUVwRSw2Q0FBNEM7QUFDNUMsK0NBQXFEO0FBQ3JELGdEQUErQztBQUMvQyxtREFBa0Q7QUFDbEQscUVBQTJFO0FBQzNFLGtFQUF3RTtBQUN4RSx5REFBK0Q7QUFDL0QsK0NBQXFEO0FBQ3JELG1EQUFrRDtBQUNsRCx1RUFBNkU7QUFDN0UseUVBQStFO0FBQy9FLDZFQUFtRjtBQUNuRix5RUFBK0U7QUFDL0UsZ0VBQXNFO0FBQ3RFLDRFQUFrRjtBQUNsRiw4RUFBb0Y7QUFDcEYsOERBQW9FO0FBQ3BFLDBEQUFnRTtBQUNoRSxvREFBbUQ7QUFDbkQsdURBQTZEO0FBQzdELDJEQUFpRTtBQUNqRSwyREFBaUU7QUFDakUsMkRBQWlFO0FBQ2pFLHFEQUEyRDtBQUMzRCw0REFBa0U7QUFDbEUsb0RBQTBEO0FBQzFELGdEQUFzRDtBQUN0RCw4REFBb0U7QUFDcEUsb0VBQTBFO0FBQzFFLHdEQUE4RDtBQUM5RCxzRUFBNEU7QUFDNUUsaUVBQXVFO0FBQ3ZFLG9FQUEw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OzRDQUNHO0lBWkosT0FBTztRQUQzQixPQUFPO09BQ2EsT0FBTyxDQTBWM0I7SUFBRCxjQUFDO0NBMVZELEFBMFZDLENBMVZvQyxFQUFFLENBQUMsU0FBUyxHQTBWaEQ7a0JBMVZvQixPQUFPIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiXHJcbmltcG9ydCBBQlRlc3RNYW5hZ2VyIGZyb20gXCIuLi9BQlRlc3QvQUJUZXN0TWFuYWdlclwiO1xyXG5pbXBvcnQgQXBrTWFuYWdlciBmcm9tIFwiLi4vQWRzL0Fwa01hbmFnZXJcIjtcclxuaW1wb3J0IHsgR2FtZVNjZW5lLCBJc0RlYnVnLCBJc0dNLCBJc1Rlc3RDb2RlLCBJc1Rlc3RTZXJ2ZXIsIGxvY2FsX3ZlcnNpb24gfSBmcm9tIFwiLi4vQ29uc3RhbnRzXCI7XHJcbmltcG9ydCB7IEVxdWlwbWVudE1hbmFnZXIgfSBmcm9tIFwiLi4vRXF1aXBtZW50L0VxdWlwbWVudE1hbmFnZXJcIjtcclxuaW1wb3J0IEdhbWVEYXRhIGZyb20gXCIuLi9HYW1lRGF0YVwiO1xyXG5pbXBvcnQgR2FtZU1hbmFnZXIgZnJvbSBcIi4uL0dhbWVNYW5hZ2VyXCI7XHJcbmltcG9ydCB7IEZvbGxvd19UeXBlIH0gZnJvbSBcIi4uL211bHRpTGFuZ3VhZ2UvRm9sbG93Q29uc3RhbnRzXCI7XHJcbmltcG9ydCBGb2xsb3dNYW5hZ2VyIGZyb20gXCIuLi9tdWx0aUxhbmd1YWdlL0ZvbGxvd01hbmFnZXJcIjtcclxuaW1wb3J0IFNwcml0ZUxhbmd1YWdlIGZyb20gXCIuLi9tdWx0aUxhbmd1YWdlL0xhbmd1YWdlU3ByaXRlXCI7XHJcbmltcG9ydCBUdXRvcmFpbHNNYW5hZ2VyIGZyb20gXCIuLi9UdXRvcmlhbHMvVHV0b3JhaWxzTWFuYWdlclwiO1xyXG5pbXBvcnQgeyBIZXJvTWFuYWdlciB9IGZyb20gXCIuLi9IZXJvL0RhdGEvSGVyb01hbmFnZXJcIjtcclxuaW1wb3J0IHsgVGV4dE1hbmFnZW1lbnRNYW5hZ2VyIH0gZnJvbSBcIi4uL0pzb25EYXRhL1RleHRNYW5hZ2VtZW50XCI7XHJcbmltcG9ydCB7IEphY2twb3RNYW5hZ2VyIH0gZnJvbSBcIi4uL0pzb25EYXRhL0phY2twb3RcIjtcclxuaW1wb3J0IHsgTGV2ZWxNYW5hZ2VyIH0gZnJvbSBcIi4uL0xldmVsL0xldmVsTWFuYWdlclwiO1xyXG5pbXBvcnQgeyBNb25zdGVyRGF0YU1hbmFnZXIgfSBmcm9tIFwiLi4vTW9uc3Rlci9EYXRhL01vbnN0ZXJEYXRhTWFuYWdlclwiO1xyXG5pbXBvcnQgeyBPZmZsaW5lUmV2ZW51ZU1hbmFnZXIgfSBmcm9tIFwiLi4vSnNvbkRhdGEvT2ZmbGluZVJldmVudWVcIjtcclxuaW1wb3J0IFVzZXJEYXRhIGZyb20gXCIuLi9Vc2VyRGF0YVwiO1xyXG5pbXBvcnQgeyBTaWduSW5NYW5hZ2VyIH0gZnJvbSBcIi4uL0pzb25EYXRhL1NpZ25JblwiO1xyXG5pbXBvcnQgeyBMb2FkTWFuYWdlciwgTG9hZF9Nb2RlIH0gZnJvbSBcIi4vTG9hZE1hbmFnZXJcIjtcclxuaW1wb3J0IHsgUGxheWVyTGV2ZWxVcE1hbmFnZXIgfSBmcm9tIFwiLi4vSnNvbkRhdGEvUGxheWVyTGV2ZWxVcFwiO1xyXG5pbXBvcnQgeyBGdW5jdGlvbkRlZmluaXRpb25NYW5hZ2VyIH0gZnJvbSBcIi4uL0pzb25EYXRhL0Z1bmN0aW9uRGVmaW5pdGlvblwiO1xyXG5pbXBvcnQgeyBUb3dlckxldmVsTWFuYWdlciB9IGZyb20gXCIuLi9Ub3dlci9Ub3dlckxldmVsXCI7XHJcbmltcG9ydCB7IFRvd2VyUmV3YXJkTWFuYWdlciB9IGZyb20gXCIuLi9Ub3dlci9Ub3dlclJld2FyZFwiO1xyXG5pbXBvcnQgeyBKYWNrcG90Q29sbGVjdGlvbk1hbmFnZXIgfSBmcm9tIFwiLi4vSnNvbkRhdGEvSmFja3BvdENvbGxlY3Rpb25cIjtcclxuaW1wb3J0IHsgQ3VzdG9tc0NsZWFyYW5jZVJlYmF0ZU1hbmFnZXIgfSBmcm9tIFwiLi4vSnNvbkRhdGEvQ3VzdG9tc0NsZWFyYW5jZVJlYmF0ZVwiO1xyXG5pbXBvcnQgeyBMZXZlbFVwUmViYXRlTWFuYWdlciB9IGZyb20gXCIuLi9Kc29uRGF0YS9MZXZlbFVwUmViYXRlXCI7XHJcbmltcG9ydCB7IEJhdHRsZVBhc3NNYW5hZ2VyIH0gZnJvbSBcIi4uL0JhdHRsZVBhc3MvQmF0dGxlUGFzc01hbmFnZXJcIjtcclxuaW1wb3J0IHsgSW5qdXJlZERhdGEgfSBmcm9tIFwiLi4vTW9uc3Rlci9Nb25zdGVyRGF0YVwiO1xyXG5pbXBvcnQgeyBVSU1hbmFnZXIgfSBmcm9tIFwiLi4vVUkvVUlNYW5hZ2VyXCI7XHJcbmltcG9ydCB7IFNpZ25OdW1NYW5hZ2VyIH0gZnJvbSBcIi4uL0pzb25EYXRhL1NpZ25OdW1cIjtcclxuaW1wb3J0IHsgUGV0TWFuYWdlciB9IGZyb20gXCIuLi9QZXQvUGV0TWFuYWdlclwiO1xyXG5pbXBvcnQgeyBQcm9wTWFuYWdlciB9IGZyb20gXCIuLi9Qcm9wL1Byb3BNYW5hZ2VyXCI7XHJcbmltcG9ydCB7IENvaW5TaG9wTWFuYWdlbWVudE1hbmFnZXIgfSBmcm9tIFwiLi4vSnNvbkRhdGEvQ29pblNob3BNYW5hZ2VtZW50XCI7XHJcbmltcG9ydCB7IFNraWxsTGV2ZWxVbmxvY2tNYW5hZ2VyIH0gZnJvbSBcIi4uL0hlcm8vRGF0YS9Ta2lsbExldmVsVW5sb2NrXCI7XHJcbmltcG9ydCB7IEN1bXVsYXRpdmVDYXJkTWFuYWdlciB9IGZyb20gXCIuLi9XaXNoL0N1bXVsYXRpdmVDYXJkXCI7XHJcbmltcG9ydCB7IFdpc2hTcGVuZE1hbmFnZXIgfSBmcm9tIFwiLi4vV2lzaC9XaXNoU3BlbmRcIjtcclxuaW1wb3J0IHsgTWF6ZU1hbmFnZXIgfSBmcm9tIFwiLi4vTWF6ZS9NYXplTWFuYWdlclwiO1xyXG5pbXBvcnQgeyBDb21tb2RpdHlNYW5hZ2VtZW50TWFuYWdlciB9IGZyb20gXCIuLi9Kc29uRGF0YS9Db21tb2RpdHlNYW5hZ2VtZW50XCI7XHJcbmltcG9ydCB7IEV4Y2x1c2l2ZUVuaGFuY2VtZW50TWFuYWdlciB9IGZyb20gXCIuLi9Kc29uRGF0YS9FeGNsdXNpdmVFbmhhbmNlbWVudFwiO1xyXG5pbXBvcnQgeyBFeGNsdXNpdmVXZWFwb25NZXNzYWdlTWFuYWdlciB9IGZyb20gXCIuLi9Kc29uRGF0YS9FeGNsdXNpdmVXZWFwb25NZXNzYWdlXCI7XHJcbmltcG9ydCB7IEV4Y2x1c2l2ZVdlYXBvblNraWxsTWFuYWdlciB9IGZyb20gXCIuLi9Kc29uRGF0YS9FeGNsdXNpdmVXZWFwb25Ta2lsbFwiO1xyXG5pbXBvcnQgeyBUYXNrSW5mb3JtYXRpb25NYW5hZ2VyIH0gZnJvbSBcIi4uL1Rhc2svRGF0YS9UYXNrSW5mb3JtYXRpb25cIjtcclxuaW1wb3J0IHsgVGhyZWFkVGFza0luZm9ybWF0aW9uTWFuYWdlciB9IGZyb20gXCIuLi9UYXNrL0RhdGEvVGhyZWFkVGFza0luZm9ybWF0aW9uXCI7XHJcbmltcG9ydCB7IEFjY3VtdWxhdGVkSW5mb3JtYXRpb25NYW5hZ2VyIH0gZnJvbSBcIi4uL1Rhc2svRGF0YS9BY2N1bXVsYXRlZEluZm9ybWF0aW9uXCI7XHJcbmltcG9ydCB7IFJvZ3VlUGV0c0xlYXNlTWFuYWdlciB9IGZyb20gXCIuLi9NYXplL0RhdGEvUm9ndWVQZXRzTGVhc2VcIjtcclxuaW1wb3J0IHsgRWdnQ3VtdWxhdGl2ZU1hbmFnZXIgfSBmcm9tIFwiLi4vVGFrZUVnZy9FZ2dDdW11bGF0aXZlXCI7XHJcbmltcG9ydCB7IFBheU1hbmFnZXIgfSBmcm9tIFwiLi4vUGF5bWVudC9QYXlNYW5hZ2VyXCI7XHJcbmltcG9ydCB7IEN5Y2xlUGFja01hbmFnZXIgfSBmcm9tIFwiLi4vUGF5bWVudC9EYXRhL0N5Y2xlUGFja1wiO1xyXG5pbXBvcnQgeyBFbmRsZXNzTGV2ZWxzTWFuYWdlciB9IGZyb20gXCIuLi9BY3Rpdml0eS9FbmRsZXNzTGV2ZWxzXCI7XHJcbmltcG9ydCB7IEVuZGxlc3NSZXdhcmRNYW5hZ2VyIH0gZnJvbSBcIi4uL0FjdGl2aXR5L0VuZGxlc3NSZXdhcmRcIjtcclxuaW1wb3J0IHsgQm9zc0NoYWxsZW5nZU1hbmFnZXIgfSBmcm9tIFwiLi4vQWN0aXZpdHkvQm9zc0NoYWxsZW5nZVwiO1xyXG5pbXBvcnQgeyBCb3NzUmV3YXJkTWFuYWdlciB9IGZyb20gXCIuLi9BY3Rpdml0eS9Cb3NzUmV3YXJkXCI7XHJcbmltcG9ydCB7IEVnZ0luZm9ybWF0aW9uTWFuYWdlciB9IGZyb20gXCIuLi9UYWtlRWdnL0VnZ0luZm9ybWF0aW9uXCI7XHJcbmltcG9ydCB7IENoYXB0ZXJQYWNrTWFuYWdlciB9IGZyb20gXCIuLi9TdG9yZS9DaGFwdGVyUGFja1wiO1xyXG5pbXBvcnQgeyBEYWlseVNob3BNYW5hZ2VyIH0gZnJvbSBcIi4uL1N0b3JlL0RhaWx5U2hvcFwiO1xyXG5pbXBvcnQgeyBEaWFtb25kc1JlY2hhcmdlTWFuYWdlciB9IGZyb20gXCIuLi9TdG9yZS9EaWFtb25kc1JlY2hhcmdlXCI7XHJcbmltcG9ydCB7IERyYXdDYXJkSW5mb3JtYXRpb25NYW5hZ2VyIH0gZnJvbSBcIi4uL1N0b3JlL0RyYXdDYXJkSW5mb3JtYXRpb25cIjtcclxuaW1wb3J0IHsgUHVyY2hhc2VDb2luc01hbmFnZXIgfSBmcm9tIFwiLi4vU3RvcmUvUHVyY2hhc2VDb2luc1wiO1xyXG5pbXBvcnQgeyBDb21tb2RpdHlJbmZvcm1hdGlvbk1hbmFnZXIgfSBmcm9tIFwiLi4vU3RvcmUvQ29tbW9kaXR5SW5mb3JtYXRpb25cIjtcclxuaW1wb3J0IHsgSW1hZ2VfTGFuZ3VhZ2VNYW5hZ2VyIH0gZnJvbSBcIi4uL011bHRpbGluZ3VhbC9JbWFnZV9MYW5ndWFnZVwiO1xyXG5pbXBvcnQgeyBEcmF3Q2FyZFByb2JhYmlsaXR5TWFuYWdlciB9IGZyb20gXCIuLi9TdG9yZS9EcmF3Q2FyZFByb2JhYmlsaXR5XCI7XHJcbmltcG9ydCB7IFR1cm50YWJsZUluZm9ybWF0aW9uTWFuYWdlciB9IGZyb20gXCIuLi9UdXJudGFibGUvVHVybnRhYmxlSW5mb3JtYXRpb25cIjtcclxuaW1wb3J0IFRhc2tNYW5hZ2VyIGZyb20gXCIuLi9UYXNrL1Rhc2tNYW5hZ2VyXCI7XHJcbmltcG9ydCB7IEFjaGlldmVubWVudFRhc2tNYW5hZ2VyIH0gZnJvbSBcIi4uL1Rhc2svRGF0YS9BY2hpZXZlbm1lbnRUYXNrXCI7XHJcbmltcG9ydCB7IEJhdHRsZVBhc3NEYXRhTWFuYWdlciB9IGZyb20gXCIuLi9CYXR0bGVQYXNzL0JhdHRsZVBhc3NEYXRhXCI7XHJcbmltcG9ydCB7IFR1dG9yaWFsTGV2ZWxNYW5hZ2VyIH0gZnJvbSBcIi4uL0xldmVsL1R1dG9yaWFsTGV2ZWxcIjtcclxuaW1wb3J0IHsgQ291cnNlVGV4dE1hbmFnZXIgfSBmcm9tIFwiLi4vVHV0b3JpYWxzL0NvdXJzZVRleHRcIjtcclxuaW1wb3J0IHsgQ3VtdWxhdGl2ZVJlY2hhcmdlc01hbmFnZXIgfSBmcm9tIFwiLi4vQWNjdW11bGF0ZWRSZWNoYXJnZS9DdW11bGF0aXZlUmVjaGFyZ2VzXCI7XHJcbmltcG9ydCB7IFVzZXJJbmZvIH0gZnJvbSBcIi4uL1VzZXJJbmZvL1VzZXJJbmZvXCI7XHJcbmltcG9ydCB7IEJvc3NXZWVrbHlSZXdhcmRNYW5hZ2VyIH0gZnJvbSBcIi4uL2NvcHkvZW5kbGVzc2NoYWxsZW5nZXMvQm9zc1dlZWtseVJld2FyZFwiO1xyXG5pbXBvcnQgeyBFbmRsZXNzQnVmZk1hbmFnZXIgfSBmcm9tIFwiLi4vY29weS9lbmRsZXNzY2hhbGxlbmdlcy9FbmRsZXNzQnVmZlwiO1xyXG5pbXBvcnQgeyBDb25zdGFudENvbmZpZ3VyYXRpb25NYW5hZ2VyIH0gZnJvbSBcIi4uL0pzb25EYXRhL0NvbnN0YW50Q29uZmlndXJhdGlvblwiO1xyXG5pbXBvcnQgeyBNaXNzaW9uTGV2ZWxNYW5hZ2VyIH0gZnJvbSBcIi4uL0xldmVsL01pc3Npb25MZXZlbFwiO1xyXG5pbXBvcnQgeyBSb2d1ZUdpZnRJbmZvcm1hdGlvbk1hbmFnZXIgfSBmcm9tIFwiLi4vY29weS9lbmRsZXNzY2hhbGxlbmdlcy9Sb2d1ZUdpZnRJbmZvcm1hdGlvblwiO1xyXG5pbXBvcnQgeyBSb2d1ZVNob3BNYW5hZ2VyIH0gZnJvbSBcIi4uL2NvcHkvZW5kbGVzc2NoYWxsZW5nZXMvUm9ndWVTaG9wXCI7XHJcbmltcG9ydCB7IFJvZ3VlSGV4YWdvblR5cGVzTWFuYWdlciB9IGZyb20gXCIuLi9jb3B5L3ZvaWRjcmFjay9Sb2d1ZUhleGFnb25UeXBlc1wiO1xyXG5pbXBvcnQgeyBGaXJzdENvbXBsZXRlUmV3YXJkTWFuYWdlciB9IGZyb20gXCIuLi9MZXZlbC9GaXJzdENvbXBsZXRlUmV3YXJkXCI7XHJcbmltcG9ydCB7IFJvZ3VlTGV2ZWxNYW5hZ2VyIH0gZnJvbSBcIi4uL2NvcHkvdm9pZGNyYWNrL1JvZ3VlTGV2ZWxcIjtcclxuaW1wb3J0IHsgUm9ndWVmYXN0UGFzc01hbmFnZXIgfSBmcm9tIFwiLi4vY29weS92b2lkY3JhY2svUm9ndWVmYXN0UGFzc1wiO1xyXG5cclxuXHJcbmNvbnN0IHtjY2NsYXNzLCBwcm9wZXJ0eX0gPSBjYy5fZGVjb3JhdG9yO1xyXG5cclxuQGNjY2xhc3NcclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTG9hZGluZyBleHRlbmRzIGNjLkNvbXBvbmVudCB7XHJcblxyXG4gICAgaXNfc3RhcnQ6Ym9vbGVhbj1mYWxzZTtcclxuICAgIGlzc3VlZF9kYXRhOmFueT1udWxsO1xyXG4gICAgaXNfaXNzdWVkX2ZpbmlzaDpib29sZWFuPWZhbHNlO1xyXG4gICAgc2NlbmVfcHJvZ3Jlc3M6bnVtYmVyPTA7XHJcbiAgICBsb2FkaW5nQmFyOmNjLlByb2dyZXNzQmFyPW51bGw7XHJcbiAgICBsb2FkTGFiZWw6Y2MuTGFiZWw9bnVsbDtcclxuICAgIG1heF9sb2FkX3RpbWU6bnVtYmVyPTEwO1xyXG4gICAgbG9hZF90b3RhbF90aW1lOm51bWJlcj0wO1xyXG5cclxuICAgIEBwcm9wZXJ0eShjYy5Ob2RlKVxyXG4gICAgY2FydG9vbjpjYy5Ob2RlPW51bGw7XHJcbiAgICBcclxuICAgIHByb3RlY3RlZCBvbkxvYWQoKTogdm9pZCB7XHJcbiAgICAgICAgaWYoVHV0b3JhaWxzTWFuYWdlci5nZXRJbnN0YW5jZSgpLmlzU2hvd1R1dG9yaWFscygyMDApKXtcclxuICAgICAgICAgICAgLy/mmL7npLrmvKvnlLtcclxuICAgICAgICAgICAgdGhpcy5jYXJ0b29uLmFjdGl2ZT10cnVlXHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuY2xvc2VKaWFvQ2hlbmcoKTtcclxuICAgICAgICBpZihJc0dNJiZMb2FkTWFuYWdlci5sb2FkX21vZGU9PUxvYWRfTW9kZS5yZW1vdGUpe1xyXG4gICAgICAgICAgICBsZXQgaXNPaz1mYWxzZTtcclxuICAgICAgICAgICAgY2MuYXNzZXRNYW5hZ2VyLmxvYWRSZW1vdGUoTG9hZE1hbmFnZXIucmVtb3RlX3VybF9qc29uK1wiSGVyb0F0dHJpYnV0ZS5qc29uXCIsKGVycm9yOiBFcnJvciwgYXNzZXRzOmNjLkpzb25Bc3NldCk9PiB7XHJcbiAgICAgICAgICAgICAgICBpZihlcnJvcil7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coZXJyb3IpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMubm9kZS5wYXJlbnQuZ2V0Q2hpbGRCeU5hbWUoJ2lwRWRpdEJveCcpLmdldENvbXBvbmVudChjYy5FZGl0Qm94KS5zdHJpbmc9TG9hZE1hbmFnZXIucmVtb3RlX3VybF9qc29uO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMubm9kZS5wYXJlbnQuZ2V0Q2hpbGRCeU5hbWUoJ2lwRWRpdEJveCcpLmFjdGl2ZT10cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGlzT2s9dHJ1ZTtcclxuICAgICAgICAgICAgICAgIHRoaXMubG9hZEFsbCgpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgdGhpcy5zY2hlZHVsZU9uY2UoKCk9PntcclxuICAgICAgICAgICAgICAgIGlmKGlzT2s9PWZhbHNlKXtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLm5vZGUucGFyZW50LmdldENoaWxkQnlOYW1lKCdpcEVkaXRCb3gnKS5nZXRDb21wb25lbnQoY2MuRWRpdEJveCkuc3RyaW5nPUxvYWRNYW5hZ2VyLnJlbW90ZV91cmxfanNvbjtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLm5vZGUucGFyZW50LmdldENoaWxkQnlOYW1lKCdpcEVkaXRCb3gnKS5hY3RpdmU9dHJ1ZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSwyKTtcclxuICAgICAgICAgICAgLy90aGlzLmxvYWRBbGwoKVxyXG4gICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICB0aGlzLm5vZGUucGFyZW50LmdldENoaWxkQnlOYW1lKCdpcEVkaXRCb3gnKS5hY3RpdmU9ZmFsc2U7XHJcbiAgICAgICAgICAgIHRoaXMubG9hZEFsbCgpXHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vY2MubG9nKFwidzEsMzE0LDU2LjY1XCIubWF0Y2goL1xcZCsoXFwuXFxkKyk/L2cpKTtcclxuICAgICAgICBpZihJc0RlYnVnJiZJc0dNKXtcclxuICAgICAgICAgICAgY29uc29sZS5lcnJvcihsb2NhbF92ZXJzaW9uKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgY2xvc2VKaWFvQ2hlbmcoKXtcclxuICAgICAgICAvL1R1dG9yYWlsc01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zYXZlVHV0b3JpYWxzKDIwMSk7XHJcbiAgICAgICAgLy9UdXRvcmFpbHNNYW5hZ2VyLmdldEluc3RhbmNlKCkuc2F2ZVR1dG9yaWFscygyMDIpO1xyXG4gICAgICAgIC8vVHV0b3JhaWxzTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNhdmVUdXRvcmlhbHMoMjAzKTtcclxuICAgICAgICAvL1R1dG9yYWlsc01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zYXZlVHV0b3JpYWxzKDIwNCk7XHJcbiAgICAgICAgLy8gVHV0b3JhaWxzTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNhdmVUdXRvcmlhbHMoMjA1KTtcclxuICAgICAgICAvLyBUdXRvcmFpbHNNYW5hZ2VyLmdldEluc3RhbmNlKCkuc2F2ZVR1dG9yaWFscygyMDYpO1xyXG4gICAgICAgIC8vIFR1dG9yYWlsc01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zYXZlVHV0b3JpYWxzKDIwNyk7XHJcbiAgICAgICAgLy9UdXRvcmFpbHNNYW5hZ2VyLmdldEluc3RhbmNlKCkuc2F2ZVR1dG9yaWFscygyMDgpO1xyXG4gICAgICAgIC8vIFR1dG9yYWlsc01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zYXZlVHV0b3JpYWxzKDIwOSk7XHJcbiAgICAgICAgLy8gVHV0b3JhaWxzTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNhdmVUdXRvcmlhbHMoMjEwKTtcclxuICAgICAgICAvLyBUdXRvcmFpbHNNYW5hZ2VyLmdldEluc3RhbmNlKCkuc2F2ZVR1dG9yaWFscygyMTEpO1xyXG4gICAgICAgIC8vIFR1dG9yYWlsc01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zYXZlVHV0b3JpYWxzKDIxMik7XHJcbiAgICAgICAgLy9UdXRvcmFpbHNNYW5hZ2VyLmdldEluc3RhbmNlKCkuc2F2ZVR1dG9yaWFscygyMTMpO1xyXG4gICAgICAgIC8vVHV0b3JhaWxzTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNhdmVUdXRvcmlhbHMoMjE0KTtcclxuICAgICAgICAvL1R1dG9yYWlsc01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zYXZlVHV0b3JpYWxzKDIxNSk7XHJcbiAgICAgICAgLy8gVHV0b3JhaWxzTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNhdmVUdXRvcmlhbHMoMjE2KTtcclxuICAgICAgICAvLyBUdXRvcmFpbHNNYW5hZ2VyLmdldEluc3RhbmNlKCkuc2F2ZVR1dG9yaWFscygyMTcpO1xyXG4gICAgICAgIC8vIFR1dG9yYWlsc01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zYXZlVHV0b3JpYWxzKDIxOCk7XHJcbiAgICAgICAgLy8gVHV0b3JhaWxzTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNhdmVUdXRvcmlhbHMoMjE5KTtcclxuICAgICAgICAvLyBUdXRvcmFpbHNNYW5hZ2VyLmdldEluc3RhbmNlKCkuc2F2ZVR1dG9yaWFscygyMjApO1xyXG4gICAgICAgIC8vIFR1dG9yYWlsc01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zYXZlVHV0b3JpYWxzKDIyMSk7XHJcbiAgICAgICAgLy8gVHV0b3JhaWxzTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNhdmVUdXRvcmlhbHMoMjIyKTtcclxuICAgICAgICAvLyBUdXRvcmFpbHNNYW5hZ2VyLmdldEluc3RhbmNlKCkuc2F2ZVR1dG9yaWFscygyMjMpO1xyXG4gICAgICAgIC8vIFR1dG9yYWlsc01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zYXZlVHV0b3JpYWxzKDIyNCk7XHJcbiAgICB9XHJcblxyXG4gICAgbG9hZEFsbCgpe1xyXG4gICAgICAgIExvYWRNYW5hZ2VyLmluaXQoKTtcclxuICAgICAgICBVc2VyRGF0YS5nZXRJbnN0YW5jZSgpO1xyXG4gICAgICAgIEdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuY3VyX2dhbWVfc2NlbmU9R2FtZVNjZW5lLmxvYWQ7XHJcbiAgICAgICAgVHV0b3JhaWxzTWFuYWdlci5nZXRJbnN0YW5jZSgpO1xyXG4gICAgICAgIFR1dG9yaWFsTGV2ZWxNYW5hZ2VyLmdldEluc3RhbmNlKCk7XHJcbiAgICAgICAgQ291cnNlVGV4dE1hbmFnZXIuZ2V0SW5zdGFuY2UoKTtcclxuICAgICAgICBBQlRlc3RNYW5hZ2VyLmdldEluc3RhbmNlKCk7XHJcbiAgICAgICAgRXF1aXBtZW50TWFuYWdlci5nZXRJbnN0YW5jZSgpO1xyXG4gICAgICAgIEhlcm9NYW5hZ2VyLmdldEluc3RhbmNlKCk7XHJcbiAgICAgICAgVGV4dE1hbmFnZW1lbnRNYW5hZ2VyLmdldEluc3RhbmNlKCk7XHJcbiAgICAgICAgSW1hZ2VfTGFuZ3VhZ2VNYW5hZ2VyLmdldEluc3RhbmNlKCk7XHJcbiAgICAgICAgSmFja3BvdE1hbmFnZXIuZ2V0SW5zdGFuY2UoKTtcclxuICAgICAgICBKYWNrcG90Q29sbGVjdGlvbk1hbmFnZXIuZ2V0SW5zdGFuY2UoKTtcclxuICAgICAgICBNb25zdGVyRGF0YU1hbmFnZXIuZ2V0SW5zdGFuY2UoKTtcclxuICAgICAgICBMZXZlbE1hbmFnZXIuZ2V0SW5zdGFuY2UoKTtcclxuICAgICAgICBPZmZsaW5lUmV2ZW51ZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKTtcclxuICAgICAgICBTaWduSW5NYW5hZ2VyLmdldEluc3RhbmNlKCk7XHJcbiAgICAgICAgUGxheWVyTGV2ZWxVcE1hbmFnZXIuZ2V0SW5zdGFuY2UoKTtcclxuICAgICAgICBGdW5jdGlvbkRlZmluaXRpb25NYW5hZ2VyLmdldEluc3RhbmNlKCk7XHJcbiAgICAgICAgVG93ZXJMZXZlbE1hbmFnZXIuZ2V0SW5zdGFuY2UoKTtcclxuICAgICAgICBUb3dlclJld2FyZE1hbmFnZXIuZ2V0SW5zdGFuY2UoKTtcclxuICAgICAgICBDdXN0b21zQ2xlYXJhbmNlUmViYXRlTWFuYWdlci5nZXRJbnN0YW5jZSgpO1xyXG4gICAgICAgIExldmVsVXBSZWJhdGVNYW5hZ2VyLmdldEluc3RhbmNlKCk7XHJcbiAgICAgICAgQmF0dGxlUGFzc01hbmFnZXIuZ2V0SW5zdGFuY2UoKTtcclxuICAgICAgICBQcm9wTWFuYWdlci5nZXRJbnN0YW5jZSgpO1xyXG4gICAgICAgIFNpZ25OdW1NYW5hZ2VyLmdldEluc3RhbmNlKCk7XHJcbiAgICAgICAgUGV0TWFuYWdlci5nZXRJbnN0YW5jZSgpO1xyXG4gICAgICAgIENvaW5TaG9wTWFuYWdlbWVudE1hbmFnZXIuZ2V0SW5zdGFuY2UoKTtcclxuICAgICAgICBTa2lsbExldmVsVW5sb2NrTWFuYWdlci5nZXRJbnN0YW5jZSgpOyAgICAgICAgXHJcbiAgICAgICAgQ3VtdWxhdGl2ZUNhcmRNYW5hZ2VyLmdldEluc3RhbmNlKCk7XHJcbiAgICAgICAgV2lzaFNwZW5kTWFuYWdlci5nZXRJbnN0YW5jZSgpO1xyXG4gICAgICAgIE1hemVNYW5hZ2VyLmdldEluc3RhbmNlKClcclxuICAgICAgICBDb21tb2RpdHlNYW5hZ2VtZW50TWFuYWdlci5nZXRJbnN0YW5jZSgpOyAgICAgICAgXHJcbiAgICAgICAgRXhjbHVzaXZlRW5oYW5jZW1lbnRNYW5hZ2VyLmdldEluc3RhbmNlKCk7XHJcbiAgICAgICAgRXhjbHVzaXZlV2VhcG9uTWVzc2FnZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKTtcclxuICAgICAgICBFeGNsdXNpdmVXZWFwb25Ta2lsbE1hbmFnZXIuZ2V0SW5zdGFuY2UoKTtcclxuICAgICAgICBUYXNrSW5mb3JtYXRpb25NYW5hZ2VyLmdldEluc3RhbmNlKCk7XHJcbiAgICAgICAgVGhyZWFkVGFza0luZm9ybWF0aW9uTWFuYWdlci5nZXRJbnN0YW5jZSgpO1xyXG4gICAgICAgIEFjY3VtdWxhdGVkSW5mb3JtYXRpb25NYW5hZ2VyLmdldEluc3RhbmNlKCk7XHJcbiAgICAgICAgUm9ndWVQZXRzTGVhc2VNYW5hZ2VyLmdldEluc3RhbmNlKCk7XHJcbiAgICAgICAgRWdnQ3VtdWxhdGl2ZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKTtcclxuICAgICAgICBFZ2dJbmZvcm1hdGlvbk1hbmFnZXIuZ2V0SW5zdGFuY2UoKTtcclxuICAgICAgICBQYXlNYW5hZ2VyLmdldEluc3RhbmNlKCk7XHJcbiAgICAgICAgQ3ljbGVQYWNrTWFuYWdlci5nZXRJbnN0YW5jZSgpO1xyXG4gICAgICAgIEVuZGxlc3NMZXZlbHNNYW5hZ2VyLmdldEluc3RhbmNlKCk7XHJcbiAgICAgICAgRW5kbGVzc1Jld2FyZE1hbmFnZXIuZ2V0SW5zdGFuY2UoKTtcclxuICAgICAgICBCb3NzQ2hhbGxlbmdlTWFuYWdlci5nZXRJbnN0YW5jZSgpO1xyXG4gICAgICAgIEJvc3NSZXdhcmRNYW5hZ2VyLmdldEluc3RhbmNlKCk7XHJcbiAgICAgICAgQ2hhcHRlclBhY2tNYW5hZ2VyLmdldEluc3RhbmNlKCk7XHJcbiAgICAgICAgQ29tbW9kaXR5TWFuYWdlbWVudE1hbmFnZXIuZ2V0SW5zdGFuY2UoKTtcclxuICAgICAgICBEYWlseVNob3BNYW5hZ2VyLmdldEluc3RhbmNlKCk7XHJcbiAgICAgICAgRGlhbW9uZHNSZWNoYXJnZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKTtcclxuICAgICAgICBEcmF3Q2FyZEluZm9ybWF0aW9uTWFuYWdlci5nZXRJbnN0YW5jZSgpO1xyXG4gICAgICAgIFB1cmNoYXNlQ29pbnNNYW5hZ2VyLmdldEluc3RhbmNlKCk7XHJcbiAgICAgICAgQ29tbW9kaXR5SW5mb3JtYXRpb25NYW5hZ2VyLmdldEluc3RhbmNlKCk7XHJcbiAgICAgICAgRHJhd0NhcmRQcm9iYWJpbGl0eU1hbmFnZXIuZ2V0SW5zdGFuY2UoKTtcclxuICAgICAgICBUdXJudGFibGVJbmZvcm1hdGlvbk1hbmFnZXIuZ2V0SW5zdGFuY2UoKTtcclxuICAgICAgICBBY2hpZXZlbm1lbnRUYXNrTWFuYWdlci5nZXRJbnN0YW5jZSgpO1xyXG4gICAgICAgIEJhdHRsZVBhc3NEYXRhTWFuYWdlci5nZXRJbnN0YW5jZSgpO1xyXG4gICAgICAgIEN1bXVsYXRpdmVSZWNoYXJnZXNNYW5hZ2VyLmdldEluc3RhbmNlKCk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgQm9zc1dlZWtseVJld2FyZE1hbmFnZXIuZ2V0SW5zdGFuY2UoKTtcclxuICAgICAgICBHYW1lRGF0YS5nZXRJbnN0YW5jZSgpLnJlZnJlc2hTZXJ2ZXJUaW1lKCk7XHJcbiAgICAgICAgRW5kbGVzc0J1ZmZNYW5hZ2VyLmdldEluc3RhbmNlKCk7XHJcbiAgICAgICAgQ29uc3RhbnRDb25maWd1cmF0aW9uTWFuYWdlci5nZXRJbnN0YW5jZSgpO1xyXG4gICAgICAgIFJvZ3VlR2lmdEluZm9ybWF0aW9uTWFuYWdlci5nZXRJbnN0YW5jZSgpO1xyXG4gICAgICAgIFJvZ3VlU2hvcE1hbmFnZXIuZ2V0SW5zdGFuY2UoKTtcclxuICAgICAgICBSb2d1ZUxldmVsTWFuYWdlci5nZXRJbnN0YW5jZSgpO1xyXG4gICAgICAgIFJvZ3VlSGV4YWdvblR5cGVzTWFuYWdlci5nZXRJbnN0YW5jZSgpO1xyXG4gICAgICAgIFJvZ3VlZmFzdFBhc3NNYW5hZ2VyLmdldEluc3RhbmNlKCk7XHJcblxyXG4gICAgICAgIFVzZXJJbmZvLmdldEluc3RhbmNlKCk7XHJcbiAgICAgICAgLy8gY2MuYXNzZXRNYW5hZ2VyLmxvYWRSZW1vdGUoXCJodHRwOi8vZ2FtZS1idWNrZXQub3NzLWV1LWNlbnRyYWwtMS5hbGl5dW5jcy5jb20vZ2FtZS9hZG1pbi9HYW1lUXVhbGl0eS9HMjAyL0x1Y2t5Q2FyZFRhYmxlLmNzdlwiLChlcnJvcjogRXJyb3IsIGFzc2V0czphbnkpPT4ge1xyXG4gICAgICAgIC8vICAgICBpZihlcnJvcil7XHJcbiAgICAgICAgLy8gICAgICAgICBjb25zb2xlLmxvZyhlcnJvcik7XHJcbiAgICAgICAgLy8gICAgICAgICByZXR1cm47XHJcbiAgICAgICAgLy8gICAgIH1cclxuICAgICAgICAvLyAgICAgY29uc29sZS5sb2coYXNzZXRzKTtcclxuICAgICAgICAvLyB9KTtcclxuXHJcbiAgICB9XHJcblxyXG4gICAgc3RhcnQoKVxyXG4gICAge1xyXG4gICAgICAgIGxldCBiZ0xvYWRpbmc9VUlNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0TG9hZGluZ05vZGUoKTtcclxuICAgICAgICBsZXQgdGl0bGU9YmdMb2FkaW5nLmdldENoaWxkQnlOYW1lKCd0aXRsZScpO1xyXG4gICAgICAgIHRpdGxlLm9wYWNpdHk9MDtcclxuXHJcbiAgICAgICAgbGV0IGJnX2xvYWRpbmdfMT10aGlzLmNhcnRvb24uZ2V0Q2hpbGRCeU5hbWUoXCJiZ19sb2FkaW5nXzFcIilcclxuICAgICAgICBsZXQgdGl0bGVfMT1iZ19sb2FkaW5nXzEuZ2V0Q2hpbGRCeU5hbWUoJ3RpdGxlJyk7XHJcbiAgICAgICAgdGl0bGVfMS5vcGFjaXR5PTA7XHJcbiAgICAgICAgXHJcbiAgICAgICAgY2MudHdlZW4odGl0bGUpLmRlbGF5KDEpLmNhbGwoKCk9PntcclxuICAgICAgICAgICAgLy9BcGtNYW5hZ2VyLmdldEluc3RhbmNlKCkuc2V0QUJUZXN0UGFyKCd7XCJyYW5rX3Nob3dcIjpmYWxzZX0nKTtcclxuICAgICAgICAgICAgRm9sbG93TWFuYWdlci5nZXRJbnN0YW5jZSgpLmZvbGxvd0V2ZW50KEZvbGxvd19UeXBlLkxvYWTpobXlsZXnpLrmgLvmrKHmlbApO1xyXG4gICAgICAgICAgICB0aXRsZS5nZXRDb21wb25lbnQoU3ByaXRlTGFuZ3VhZ2UpLnN0YXJ0VHJhbnNsYXRpb24oKTtcclxuICAgICAgICB9KS50bygxLHtvcGFjaXR5OjI1NX0pLnN0YXJ0KCk7XHJcblxyXG4gICAgICAgIGNjLnR3ZWVuKHRpdGxlXzEpLmRlbGF5KDEpLmNhbGwoKCk9PntcclxuICAgICAgICAgICAgdGl0bGVfMS5nZXRDb21wb25lbnQoU3ByaXRlTGFuZ3VhZ2UpLnN0YXJ0VHJhbnNsYXRpb24oKTtcclxuICAgICAgICB9KS50bygxLHtvcGFjaXR5OjI1NX0pLnN0YXJ0KCk7XHJcblxyXG4gICAgICAgIGJnTG9hZGluZy5nZXRDaGlsZEJ5TmFtZSgnUHJvZ3Jlc3NCYXInKS5hY3RpdmU9ZmFsc2U7XHJcbiAgICAgICAgYmdMb2FkaW5nLmdldENoaWxkQnlOYW1lKCdsb2FkJykuYWN0aXZlPWZhbHNlO1xyXG4gICAgICAgIFxyXG4gICAgICAgIGJnX2xvYWRpbmdfMS5nZXRDaGlsZEJ5TmFtZSgnUHJvZ3Jlc3NCYXInKS5hY3RpdmU9ZmFsc2U7XHJcbiAgICAgICAgYmdfbG9hZGluZ18xLmdldENoaWxkQnlOYW1lKCdsb2FkJykuYWN0aXZlPWZhbHNlO1xyXG5cclxuICAgICAgICAvLzHjgILlhYjliKTmlq3mnKzlnLDmmK/lkKbmnIl1aWTmtYvor5XpmLbmrrXvvIzlhYjnlKjmuLjlrqLouqvku73nmbvpmYZcclxuICAgICAgICB0aGlzLnN0YXJ0TG9hZCgpO1xyXG4gICAgICAgIGlmKElzVGVzdFNlcnZlcilcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIC8vIGlmKFVzZXJEYXRhLmdldEluc3RhbmNlKCkuZ2V0VXNlcklEKCkpXHJcbiAgICAgICAgICAgIC8vIHtcclxuICAgICAgICAgICAgLy8gICAgIEFwa01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zZXRVaWQoKTtcclxuICAgICAgICAgICAgLy8gfWVsc2VcclxuICAgICAgICAgICAgLy8ge1xyXG4gICAgICAgICAgICAvLyAgICAgQXBrTWFuYWdlci5nZXRJbnN0YW5jZSgpLnVwbG9hZEFuZEdldFVpZCgodXNlckluZm86YW55KT0+e1xyXG4gICAgICAgICAgICAvLyAgICAgICAgIHRoaXMuaXNfaXNzdWVkX2ZpbmlzaD10cnVlO1xyXG4gICAgICAgICAgICAvLyAgICAgICAgIGNvbnNvbGUubG9nKHVzZXJJbmZvKTtcclxuICAgICAgICAgICAgLy8gICAgICAgICBsZXQganNvbj1KU09OLnBhcnNlKHVzZXJJbmZvKTtcclxuICAgICAgICAgICAgLy8gICAgICAgICBpZihqc29uLnVpZClcclxuICAgICAgICAgICAgLy8gICAgICAgICB7XHJcbiAgICAgICAgICAgIC8vICAgICAgICAgICAgIFVzZXJEYXRhLmdldEluc3RhbmNlKCkuc2F2ZVVzZXJJRChqc29uLnVpZCk7ICAgICAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIC8vICAgICAgICAgfWVsc2VcclxuICAgICAgICAgICAgLy8gICAgICAgICB7XHJcbiAgICAgICAgICAgIC8vICAgICAgICAgICAgIHRoaXMuc3RhcnRMb2FkKCk7XHJcbiAgICAgICAgICAgIC8vICAgICAgICAgfVxyXG4gICAgICAgICAgICAvLyAgICAgfSlcclxuICAgICAgICAgICAgLy8gfVxyXG4gICAgICAgIH1lbHNlXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLmlzX2lzc3VlZF9maW5pc2g9dHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy90aGlzLnN0YXJ0TG9hZCgpO1xyXG5cclxuICAgIH1cclxuXHJcbiAgICBvbkNsaWNrT0soYnRuOmNjLkV2ZW50LkV2ZW50VG91Y2gpe1xyXG4gICAgICAgIGxldCBlYj10aGlzLm5vZGUucGFyZW50LmdldENoaWxkQnlOYW1lKCdpcEVkaXRCb3gnKS5nZXRDb21wb25lbnQoY2MuRWRpdEJveCk7XHJcbiAgICAgICAgTG9hZE1hbmFnZXIucmVtb3RlX3VybF9qc29uPWViLnN0cmluZztcclxuICAgICAgICBidG4uY3VycmVudFRhcmdldC5wYXJlbnQuYWN0aXZlPWZhbHNlO1xyXG4gICAgICAgIHRoaXMubG9hZEFsbCgpO1xyXG4gICAgfVxyXG5cclxuICAgIHN0YXJ0TG9hZCgpXHJcbiAgICB7XHJcbiAgICAgICAgaWYodGhpcy5pc19zdGFydD09dHJ1ZSlcclxuICAgICAgICByZXR1cm47XHJcbiAgICAgICAgdGhpcy5pc19zdGFydD10cnVlOyAgICAgICAgXHJcbiAgICAgICAgbGV0IGJnTG9hZGluZz1VSU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRMb2FkaW5nTm9kZSgpO1xyXG4gICAgICAgIGJnTG9hZGluZy5nZXRDaGlsZEJ5TmFtZSgnUHJvZ3Jlc3NCYXInKS5hY3RpdmU9dHJ1ZTtcclxuICAgICAgICBiZ0xvYWRpbmcuZ2V0Q2hpbGRCeU5hbWUoJ2xvYWQnKS5hY3RpdmU9dHJ1ZTtcclxuICAgICAgICBiZ0xvYWRpbmcuYWN0aXZlPXRydWU7XHJcbiAgICAgICAgbGV0IGJnTG9hZGluZ18xPXRoaXMuY2FydG9vbi5nZXRDaGlsZEJ5TmFtZShcImJnX2xvYWRpbmdfMVwiKVxyXG4gICAgICAgIGJnTG9hZGluZ18xLmdldENoaWxkQnlOYW1lKCdQcm9ncmVzc0JhcicpLmFjdGl2ZT10cnVlO1xyXG4gICAgICAgIGJnTG9hZGluZ18xLmdldENoaWxkQnlOYW1lKCdsb2FkJykuYWN0aXZlPXRydWU7XHJcbiAgICAgICAgYmdMb2FkaW5nXzEuYWN0aXZlPXRydWU7XHJcblxyXG4gICAgICAgIHRoaXMubG9hZGluZ0Jhcj1iZ0xvYWRpbmcuZ2V0Q2hpbGRCeU5hbWUoJ1Byb2dyZXNzQmFyJykuZ2V0Q29tcG9uZW50KGNjLlByb2dyZXNzQmFyKTtcclxuICAgICAgICB0aGlzLmxvYWRMYWJlbD10aGlzLmxvYWRpbmdCYXIubm9kZS5nZXRDaGlsZEJ5TmFtZSgnbG9hZExhYmVsJykuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKTtcclxuICAgICAgICAvL0dhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuY3VyX2dhbWVfc2NlbmU9R2FtZVNjZW5lLmhvbWU7XHJcbiAgICAgICAgY2MuZGlyZWN0b3IucHJlbG9hZFNjZW5lKEdhbWVTY2VuZS5ob21lLChjb21wbGV0ZWRDb3VudDogbnVtYmVyLCB0b3RhbENvdW50OiBudW1iZXIsIGl0ZW06IGFueSk9PntcclxuICAgICAgICAgICAgLy/nnJ/lrp7ov5vluqZcclxuICAgICAgICAgICAgdGhpcy5zY2VuZV9wcm9ncmVzcz1jb21wbGV0ZWRDb3VudC90b3RhbENvdW50OyAgICAgICAgICAgIFxyXG4gICAgICAgIH0sKCk9PntcclxuICAgICAgICAgICAgdGhpcy5jaGVha0xvYWRUb1NjZW5lKDAuNSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgdGhpcy5zY2hlZHVsZU9uY2UodGhpcy5sb2FkQWxsVWksMSk7XHJcbiAgICAgICAgaWYoSXNEZWJ1Zyl7XHJcbiAgICAgICAgICAgIEFwa01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5hZF9sb2FkZWRfbnVtPUFwa01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5tYXhfbG9hZF9udW1cclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5zY2hlZHVsZU9uY2UoKCk9PntcclxuICAgICAgICAgICAgaWYoQXBrTWFuYWdlci5nZXRJbnN0YW5jZSgpLmFkX2xvYWRlZF9udW08QXBrTWFuYWdlci5nZXRJbnN0YW5jZSgpLm1heF9sb2FkX251bSl7XHJcbiAgICAgICAgICAgICAgICBBcGtNYW5hZ2VyLmdldEluc3RhbmNlKCkuYWRfbG9hZGVkX251bT1BcGtNYW5hZ2VyLmdldEluc3RhbmNlKCkubWF4X2xvYWRfbnVtO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMuaXNfaXNzdWVkX2ZpbmlzaD10cnVlO1xyXG4gICAgICAgIH0sdGhpcy5tYXhfbG9hZF90aW1lKTtcclxuICAgIH1cclxuXHJcbiAgICBjaGVha0xvYWRUb1NjZW5lKGR0KVxyXG4gICAge1xyXG4gICAgICAgIGNjLmxvZygnY2hlYWtMb2FkVG9TY2VuZScpO1xyXG4gICAgICAgIHRoaXMubG9hZF90b3RhbF90aW1lKz1kdDtcclxuICAgICAgICBpZih0aGlzLmxvYWRfdG90YWxfdGltZT49MTApe1xyXG4gICAgICAgICAgICB0aGlzLnVuc2NoZWR1bGUodGhpcy5jaGVha0xvYWRUb1NjZW5lKTtcclxuICAgICAgICAgICAgY2MuZGlyZWN0b3IubG9hZFNjZW5lKFwibG9hZFwiKTtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZihJc0RlYnVnKXtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coTG9hZE1hbmFnZXIuZ2V0SXNMb2FkQ29tcGxldGUoKSxVc2VyRGF0YS5nZXRJbnN0YW5jZSgpLnZlcnNpb25faXNfb2ssVXNlckRhdGEuZ2V0SW5zdGFuY2UoKS5pc19sb2FkX29rLEFwa01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5hZF9sb2FkZWRfbnVtPj1BcGtNYW5hZ2VyLmdldEluc3RhbmNlKCkubWF4X2xvYWRfbnVtKVxyXG4gICAgICAgIH1cclxuICAgICAgICBpZihMb2FkTWFuYWdlci5nZXRJc0xvYWRDb21wbGV0ZSgpJiZVc2VyRGF0YS5nZXRJbnN0YW5jZSgpLnZlcnNpb25faXNfb2smJlVzZXJEYXRhLmdldEluc3RhbmNlKCkuaXNfbG9hZF9vayYmQXBrTWFuYWdlci5nZXRJbnN0YW5jZSgpLmFkX2xvYWRlZF9udW0+PUFwa01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5tYXhfbG9hZF9udW0pXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLm9uTG9hZEZpbmlzaCgpO1xyXG4gICAgICAgIH1lbHNlXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICAvL3RoaXMudW5zY2hlZHVsZSh0aGlzLmNoZWFrTG9hZFRvU2NlbmUpO1xyXG4gICAgICAgICAgICBkdCs9MC4xO1xyXG4gICAgICAgICAgICB0aGlzLnNjaGVkdWxlT25jZSgoKT0+e1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jaGVha0xvYWRUb1NjZW5lKGR0KTtcclxuICAgICAgICAgICAgfSxkdCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIG9uTG9hZEZpbmlzaCgpe1xyXG4gICAgICAgIGlmKEZvbGxvd01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRGaXJzdERvKEZvbGxvd19UeXBlLummluasoeeZu+W9lSk8PTApe1xyXG4gICAgICAgICAgICBGb2xsb3dNYW5hZ2VyLmdldEluc3RhbmNlKCkuYWRkRmlyc3REbyhGb2xsb3dfVHlwZS7pppbmrKHnmbvlvZUpO1xyXG4gICAgICAgICAgICBGb2xsb3dNYW5hZ2VyLmdldEluc3RhbmNlKCkuZm9sbG93RXZlbnQoRm9sbG93X1R5cGUu6aaW5qyh55m75b2VKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5jdXJfbG9hZF9wcm9ncmVzcz10aGlzLmxvYWRpbmdCYXIucHJvZ3Jlc3M7XHJcbiAgICAgICAgLy8gVXNlckluZm8uZ2V0SW5zdGFuY2UoKS5yZWZyZXNoRGF0YSgpO1xyXG4gICAgICAgIE9mZmxpbmVSZXZlbnVlTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldE5vd0VxdWlwSWRMaXN0KCk7XHJcbiAgICAgICAgSGVyb01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5vbkxvYWRIZXJvRGF0YSgpO1xyXG4gICAgICAgIFByb3BNYW5hZ2VyLmdldEluc3RhbmNlKCkubG9hZFByb3BEYXRhKCk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgLy8gUGV0TWFuYWdlci5nZXRJbnN0YW5jZSgpLm9uTG9hZFBldERhdGEoKTtcclxuICAgICAgICB0aGlzLnVuc2NoZWR1bGUodGhpcy5jaGVha0xvYWRUb1NjZW5lKTtcclxuICAgICAgICBUYXNrTWFuYWdlci5nZXRJbnN0YW5jZSgpO1xyXG4gICAgICAgIGlmKFR1dG9yYWlsc01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5pc1Nob3dUdXRvcmlhbHMoMjAwKSl7XHJcbiAgICAgICAgICAgIC8v5pi+56S65oyJ6ZKuXHJcbiAgICAgICAgICAgIHRoaXMuY2FydG9vbi5nZXRDaGlsZEJ5TmFtZShcImJ1dG5cIikuYWN0aXZlPXRydWVcclxuICAgICAgICAgICAgdGhpcy5jYXJ0b29uLmdldENoaWxkQnlOYW1lKFwiYnRuXCIpLmFjdGl2ZT10cnVlXHJcbiAgICAgICAgICAgIHRoaXMuY2FydG9vbi5nZXRDaGlsZEJ5TmFtZShcIkxvYWRpbmdcIikuYWN0aXZlPWZhbHNlXHJcbiAgICAgICAgICAgIHJldHVyblxyXG4gICAgICAgIH1cclxuICAgICAgICBpZihJc1Rlc3RDb2RlKXtcclxuICAgICAgICAgICAgY2MuZGlyZWN0b3IubG9hZFNjZW5lKCd6aGVuZ3hpbmcnKTtcclxuICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5jdXJfZ2FtZV9zY2VuZT1HYW1lU2NlbmUuaG9tZTtcclxuICAgICAgICAgICAgY2MuZGlyZWN0b3IubG9hZFNjZW5lKEdhbWVTY2VuZS5ob21lKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5jaGVja0V4Y2VsKCk7XHJcbiAgICB9XHJcblxyXG4gICAgY2hlY2tFeGNlbCgpe1xyXG4gICAgICAgIGlmKGNjLnN5cy5pc05hdGl2ZT09ZmFsc2UgJiYgSXNEZWJ1Zyl7XHJcbiAgICAgICAgICAgIE1pc3Npb25MZXZlbE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5jaGVjaygpO1xyXG4gICAgICAgICAgICBGaXJzdENvbXBsZXRlUmV3YXJkTWFuYWdlci5nZXRJbnN0YW5jZSgpLmNoZWNrKCk7XHJcbiAgICAgICAgICAgIEVuZGxlc3NMZXZlbHNNYW5hZ2VyLmdldEluc3RhbmNlKCkuY2hlY2soKTtcclxuICAgICAgICAgICAgRGFpbHlTaG9wTWFuYWdlci5nZXRJbnN0YW5jZSgpLmNoZWNrKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgXHJcbiAgICBsb2FkQWxsVWkoKVxyXG4gICAgeyAgICAgICAgXHJcbiAgICAgICAgaWYoIVR1dG9yYWlsc01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5pc19maW5pc2gpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBjYy5yZXNvdXJjZXMubG9hZERpcigndHV0b3JpYWxzJyk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHByb3RlY3RlZCB1cGRhdGUoZHQ6IG51bWJlcik6IHZvaWQge1xyXG4gICAgICAgICAgICAvL+i1hOa6kOi/m+W6plxyXG4gICAgICAgICAgICAvLyBsZXQgYXNzZXRzUHJvPUxvYWRNYW5hZ2VyLmxvYWRlZF9jb21wbGV0ZWQvTG9hZE1hbmFnZXIubWF4X251bV9sb2FkaW5nO1xyXG4gICAgICAgICAgICAvLyAvL+W5v+WRiui/m+W6plxyXG4gICAgICAgICAgICAvLyBsZXQgYWRQcm89QXBrTWFuYWdlci5nZXRJbnN0YW5jZSgpLmFkX2xvYWRlZF9udW0vQXBrTWFuYWdlci5nZXRJbnN0YW5jZSgpLm1heF9sb2FkX251bTtcclxuICAgICAgICAgICAgLy8gbGV0IHBwPSh0aGlzLnNjZW5lX3Byb2dyZXNzK2Fzc2V0c1BybythZFBybykvMztcclxuICAgICAgICAgICAgLy8gLy/lgYfnmoTov5vluqZcclxuICAgICAgICAgICAgbGV0IHByb2dyZXNzRmFsc2U9dGhpcy5sb2FkaW5nQmFyLnByb2dyZXNzK2R0L3RoaXMubWF4X2xvYWRfdGltZTtcclxuICAgICAgICAgICAgaWYocHJvZ3Jlc3NGYWxzZT4xKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBwcm9ncmVzc0ZhbHNlPTE7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy5sb2FkaW5nQmFyLnByb2dyZXNzID0gcHJvZ3Jlc3NGYWxzZTtcclxuICAgICAgICAgICAgdGhpcy5sb2FkTGFiZWwuc3RyaW5nPSh0aGlzLmxvYWRpbmdCYXIucHJvZ3Jlc3MqMTAwKS50b0ZpeGVkKDApKyclJztcclxuICAgICAgICAgICAgR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5jdXJfbG9hZF9wcm9ncmVzcz1wcm9ncmVzc0ZhbHNlO1xyXG4gICAgfVxyXG5cclxufVxyXG4iXX0=