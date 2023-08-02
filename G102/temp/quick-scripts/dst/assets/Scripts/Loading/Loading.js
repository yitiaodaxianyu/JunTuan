
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0c1xcTG9hZGluZ1xcTG9hZGluZy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFDQSx5REFBb0Q7QUFDcEQsZ0RBQTJDO0FBQzNDLDBDQUFpRztBQUNqRyxrRUFBaUU7QUFDakUsd0NBQW1DO0FBQ25DLDhDQUF5QztBQUN6QyxvRUFBK0Q7QUFDL0QsZ0VBQTJEO0FBQzNELGtFQUE2RDtBQUM3RCxrRUFBNkQ7QUFDN0Qsd0RBQXVEO0FBQ3ZELDZEQUFtRTtBQUNuRSwrQ0FBcUQ7QUFDckQsc0RBQXFEO0FBQ3JELHlFQUF3RTtBQUN4RSw2REFBbUU7QUFDbkUsd0NBQW1DO0FBQ25DLDZDQUFtRDtBQUNuRCw2Q0FBdUQ7QUFDdkQsMkRBQWlFO0FBQ2pFLHFFQUEyRTtBQUMzRSxrREFBd0Q7QUFDeEQsb0RBQTBEO0FBQzFELG1FQUF5RTtBQUN6RSw2RUFBbUY7QUFDbkYsMkRBQWlFO0FBQ2pFLHFFQUFvRTtBQUVwRSw2Q0FBNEM7QUFDNUMsK0NBQXFEO0FBQ3JELGdEQUErQztBQUMvQyxtREFBa0Q7QUFDbEQscUVBQTJFO0FBQzNFLGtFQUF3RTtBQUN4RSx5REFBK0Q7QUFDL0QsK0NBQXFEO0FBQ3JELG1EQUFrRDtBQUNsRCx1RUFBNkU7QUFDN0UseUVBQStFO0FBQy9FLDZFQUFtRjtBQUNuRix5RUFBK0U7QUFDL0UsZ0VBQXNFO0FBQ3RFLDRFQUFrRjtBQUNsRiw4RUFBb0Y7QUFDcEYsOERBQW9FO0FBQ3BFLDBEQUFnRTtBQUNoRSxvREFBbUQ7QUFDbkQsdURBQTZEO0FBQzdELDJEQUFpRTtBQUNqRSwyREFBaUU7QUFDakUsMkRBQWlFO0FBQ2pFLHFEQUEyRDtBQUMzRCw0REFBa0U7QUFDbEUsb0RBQTBEO0FBQzFELGdEQUFzRDtBQUN0RCw4REFBb0U7QUFDcEUsb0VBQTBFO0FBQzFFLHdEQUE4RDtBQUM5RCxzRUFBNEU7QUFDNUUsaUVBQXVFO0FBQ3ZFLG9FQUEw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UUFBUSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUM7NENBQ0c7SUFaSixPQUFPO1FBRDNCLE9BQU87T0FDYSxPQUFPLENBMFYzQjtJQUFELGNBQUM7Q0ExVkQsQUEwVkMsQ0ExVm9DLEVBQUUsQ0FBQyxTQUFTLEdBMFZoRDtrQkExVm9CLE9BQU8iLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJcclxuaW1wb3J0IEFCVGVzdE1hbmFnZXIgZnJvbSBcIi4uL0FCVGVzdC9BQlRlc3RNYW5hZ2VyXCI7XHJcbmltcG9ydCBBcGtNYW5hZ2VyIGZyb20gXCIuLi9BZHMvQXBrTWFuYWdlclwiO1xyXG5pbXBvcnQgeyBHYW1lU2NlbmUsIElzRGVidWcsIElzR00sIElzVGVzdENvZGUsIElzVGVzdFNlcnZlciwgbG9jYWxfdmVyc2lvbiB9IGZyb20gXCIuLi9Db25zdGFudHNcIjtcclxuaW1wb3J0IHsgRXF1aXBtZW50TWFuYWdlciB9IGZyb20gXCIuLi9FcXVpcG1lbnQvRXF1aXBtZW50TWFuYWdlclwiO1xyXG5pbXBvcnQgR2FtZURhdGEgZnJvbSBcIi4uL0dhbWVEYXRhXCI7XHJcbmltcG9ydCBHYW1lTWFuYWdlciBmcm9tIFwiLi4vR2FtZU1hbmFnZXJcIjtcclxuaW1wb3J0IHsgRm9sbG93X1R5cGUgfSBmcm9tIFwiLi4vbXVsdGlMYW5ndWFnZS9Gb2xsb3dDb25zdGFudHNcIjtcclxuaW1wb3J0IEZvbGxvd01hbmFnZXIgZnJvbSBcIi4uL211bHRpTGFuZ3VhZ2UvRm9sbG93TWFuYWdlclwiO1xyXG5pbXBvcnQgU3ByaXRlTGFuZ3VhZ2UgZnJvbSBcIi4uL211bHRpTGFuZ3VhZ2UvTGFuZ3VhZ2VTcHJpdGVcIjtcclxuaW1wb3J0IFR1dG9yYWlsc01hbmFnZXIgZnJvbSBcIi4uL1R1dG9yaWFscy9UdXRvcmFpbHNNYW5hZ2VyXCI7XHJcbmltcG9ydCB7IEhlcm9NYW5hZ2VyIH0gZnJvbSBcIi4uL0hlcm8vRGF0YS9IZXJvTWFuYWdlclwiO1xyXG5pbXBvcnQgeyBUZXh0TWFuYWdlbWVudE1hbmFnZXIgfSBmcm9tIFwiLi4vSnNvbkRhdGEvVGV4dE1hbmFnZW1lbnRcIjtcclxuaW1wb3J0IHsgSmFja3BvdE1hbmFnZXIgfSBmcm9tIFwiLi4vSnNvbkRhdGEvSmFja3BvdFwiO1xyXG5pbXBvcnQgeyBMZXZlbE1hbmFnZXIgfSBmcm9tIFwiLi4vTGV2ZWwvTGV2ZWxNYW5hZ2VyXCI7XHJcbmltcG9ydCB7IE1vbnN0ZXJEYXRhTWFuYWdlciB9IGZyb20gXCIuLi9Nb25zdGVyL0RhdGEvTW9uc3RlckRhdGFNYW5hZ2VyXCI7XHJcbmltcG9ydCB7IE9mZmxpbmVSZXZlbnVlTWFuYWdlciB9IGZyb20gXCIuLi9Kc29uRGF0YS9PZmZsaW5lUmV2ZW51ZVwiO1xyXG5pbXBvcnQgVXNlckRhdGEgZnJvbSBcIi4uL1VzZXJEYXRhXCI7XHJcbmltcG9ydCB7IFNpZ25Jbk1hbmFnZXIgfSBmcm9tIFwiLi4vSnNvbkRhdGEvU2lnbkluXCI7XHJcbmltcG9ydCB7IExvYWRNYW5hZ2VyLCBMb2FkX01vZGUgfSBmcm9tIFwiLi9Mb2FkTWFuYWdlclwiO1xyXG5pbXBvcnQgeyBQbGF5ZXJMZXZlbFVwTWFuYWdlciB9IGZyb20gXCIuLi9Kc29uRGF0YS9QbGF5ZXJMZXZlbFVwXCI7XHJcbmltcG9ydCB7IEZ1bmN0aW9uRGVmaW5pdGlvbk1hbmFnZXIgfSBmcm9tIFwiLi4vSnNvbkRhdGEvRnVuY3Rpb25EZWZpbml0aW9uXCI7XHJcbmltcG9ydCB7IFRvd2VyTGV2ZWxNYW5hZ2VyIH0gZnJvbSBcIi4uL1Rvd2VyL1Rvd2VyTGV2ZWxcIjtcclxuaW1wb3J0IHsgVG93ZXJSZXdhcmRNYW5hZ2VyIH0gZnJvbSBcIi4uL1Rvd2VyL1Rvd2VyUmV3YXJkXCI7XHJcbmltcG9ydCB7IEphY2twb3RDb2xsZWN0aW9uTWFuYWdlciB9IGZyb20gXCIuLi9Kc29uRGF0YS9KYWNrcG90Q29sbGVjdGlvblwiO1xyXG5pbXBvcnQgeyBDdXN0b21zQ2xlYXJhbmNlUmViYXRlTWFuYWdlciB9IGZyb20gXCIuLi9Kc29uRGF0YS9DdXN0b21zQ2xlYXJhbmNlUmViYXRlXCI7XHJcbmltcG9ydCB7IExldmVsVXBSZWJhdGVNYW5hZ2VyIH0gZnJvbSBcIi4uL0pzb25EYXRhL0xldmVsVXBSZWJhdGVcIjtcclxuaW1wb3J0IHsgQmF0dGxlUGFzc01hbmFnZXIgfSBmcm9tIFwiLi4vQmF0dGxlUGFzcy9CYXR0bGVQYXNzTWFuYWdlclwiO1xyXG5pbXBvcnQgeyBJbmp1cmVkRGF0YSB9IGZyb20gXCIuLi9Nb25zdGVyL01vbnN0ZXJEYXRhXCI7XHJcbmltcG9ydCB7IFVJTWFuYWdlciB9IGZyb20gXCIuLi9VSS9VSU1hbmFnZXJcIjtcclxuaW1wb3J0IHsgU2lnbk51bU1hbmFnZXIgfSBmcm9tIFwiLi4vSnNvbkRhdGEvU2lnbk51bVwiO1xyXG5pbXBvcnQgeyBQZXRNYW5hZ2VyIH0gZnJvbSBcIi4uL1BldC9QZXRNYW5hZ2VyXCI7XHJcbmltcG9ydCB7IFByb3BNYW5hZ2VyIH0gZnJvbSBcIi4uL1Byb3AvUHJvcE1hbmFnZXJcIjtcclxuaW1wb3J0IHsgQ29pblNob3BNYW5hZ2VtZW50TWFuYWdlciB9IGZyb20gXCIuLi9Kc29uRGF0YS9Db2luU2hvcE1hbmFnZW1lbnRcIjtcclxuaW1wb3J0IHsgU2tpbGxMZXZlbFVubG9ja01hbmFnZXIgfSBmcm9tIFwiLi4vSGVyby9EYXRhL1NraWxsTGV2ZWxVbmxvY2tcIjtcclxuaW1wb3J0IHsgQ3VtdWxhdGl2ZUNhcmRNYW5hZ2VyIH0gZnJvbSBcIi4uL1dpc2gvQ3VtdWxhdGl2ZUNhcmRcIjtcclxuaW1wb3J0IHsgV2lzaFNwZW5kTWFuYWdlciB9IGZyb20gXCIuLi9XaXNoL1dpc2hTcGVuZFwiO1xyXG5pbXBvcnQgeyBNYXplTWFuYWdlciB9IGZyb20gXCIuLi9NYXplL01hemVNYW5hZ2VyXCI7XHJcbmltcG9ydCB7IENvbW1vZGl0eU1hbmFnZW1lbnRNYW5hZ2VyIH0gZnJvbSBcIi4uL0pzb25EYXRhL0NvbW1vZGl0eU1hbmFnZW1lbnRcIjtcclxuaW1wb3J0IHsgRXhjbHVzaXZlRW5oYW5jZW1lbnRNYW5hZ2VyIH0gZnJvbSBcIi4uL0pzb25EYXRhL0V4Y2x1c2l2ZUVuaGFuY2VtZW50XCI7XHJcbmltcG9ydCB7IEV4Y2x1c2l2ZVdlYXBvbk1lc3NhZ2VNYW5hZ2VyIH0gZnJvbSBcIi4uL0pzb25EYXRhL0V4Y2x1c2l2ZVdlYXBvbk1lc3NhZ2VcIjtcclxuaW1wb3J0IHsgRXhjbHVzaXZlV2VhcG9uU2tpbGxNYW5hZ2VyIH0gZnJvbSBcIi4uL0pzb25EYXRhL0V4Y2x1c2l2ZVdlYXBvblNraWxsXCI7XHJcbmltcG9ydCB7IFRhc2tJbmZvcm1hdGlvbk1hbmFnZXIgfSBmcm9tIFwiLi4vVGFzay9EYXRhL1Rhc2tJbmZvcm1hdGlvblwiO1xyXG5pbXBvcnQgeyBUaHJlYWRUYXNrSW5mb3JtYXRpb25NYW5hZ2VyIH0gZnJvbSBcIi4uL1Rhc2svRGF0YS9UaHJlYWRUYXNrSW5mb3JtYXRpb25cIjtcclxuaW1wb3J0IHsgQWNjdW11bGF0ZWRJbmZvcm1hdGlvbk1hbmFnZXIgfSBmcm9tIFwiLi4vVGFzay9EYXRhL0FjY3VtdWxhdGVkSW5mb3JtYXRpb25cIjtcclxuaW1wb3J0IHsgUm9ndWVQZXRzTGVhc2VNYW5hZ2VyIH0gZnJvbSBcIi4uL01hemUvRGF0YS9Sb2d1ZVBldHNMZWFzZVwiO1xyXG5pbXBvcnQgeyBFZ2dDdW11bGF0aXZlTWFuYWdlciB9IGZyb20gXCIuLi9UYWtlRWdnL0VnZ0N1bXVsYXRpdmVcIjtcclxuaW1wb3J0IHsgUGF5TWFuYWdlciB9IGZyb20gXCIuLi9QYXltZW50L1BheU1hbmFnZXJcIjtcclxuaW1wb3J0IHsgQ3ljbGVQYWNrTWFuYWdlciB9IGZyb20gXCIuLi9QYXltZW50L0RhdGEvQ3ljbGVQYWNrXCI7XHJcbmltcG9ydCB7IEVuZGxlc3NMZXZlbHNNYW5hZ2VyIH0gZnJvbSBcIi4uL0FjdGl2aXR5L0VuZGxlc3NMZXZlbHNcIjtcclxuaW1wb3J0IHsgRW5kbGVzc1Jld2FyZE1hbmFnZXIgfSBmcm9tIFwiLi4vQWN0aXZpdHkvRW5kbGVzc1Jld2FyZFwiO1xyXG5pbXBvcnQgeyBCb3NzQ2hhbGxlbmdlTWFuYWdlciB9IGZyb20gXCIuLi9BY3Rpdml0eS9Cb3NzQ2hhbGxlbmdlXCI7XHJcbmltcG9ydCB7IEJvc3NSZXdhcmRNYW5hZ2VyIH0gZnJvbSBcIi4uL0FjdGl2aXR5L0Jvc3NSZXdhcmRcIjtcclxuaW1wb3J0IHsgRWdnSW5mb3JtYXRpb25NYW5hZ2VyIH0gZnJvbSBcIi4uL1Rha2VFZ2cvRWdnSW5mb3JtYXRpb25cIjtcclxuaW1wb3J0IHsgQ2hhcHRlclBhY2tNYW5hZ2VyIH0gZnJvbSBcIi4uL1N0b3JlL0NoYXB0ZXJQYWNrXCI7XHJcbmltcG9ydCB7IERhaWx5U2hvcE1hbmFnZXIgfSBmcm9tIFwiLi4vU3RvcmUvRGFpbHlTaG9wXCI7XHJcbmltcG9ydCB7IERpYW1vbmRzUmVjaGFyZ2VNYW5hZ2VyIH0gZnJvbSBcIi4uL1N0b3JlL0RpYW1vbmRzUmVjaGFyZ2VcIjtcclxuaW1wb3J0IHsgRHJhd0NhcmRJbmZvcm1hdGlvbk1hbmFnZXIgfSBmcm9tIFwiLi4vU3RvcmUvRHJhd0NhcmRJbmZvcm1hdGlvblwiO1xyXG5pbXBvcnQgeyBQdXJjaGFzZUNvaW5zTWFuYWdlciB9IGZyb20gXCIuLi9TdG9yZS9QdXJjaGFzZUNvaW5zXCI7XHJcbmltcG9ydCB7IENvbW1vZGl0eUluZm9ybWF0aW9uTWFuYWdlciB9IGZyb20gXCIuLi9TdG9yZS9Db21tb2RpdHlJbmZvcm1hdGlvblwiO1xyXG5pbXBvcnQgeyBJbWFnZV9MYW5ndWFnZU1hbmFnZXIgfSBmcm9tIFwiLi4vTXVsdGlsaW5ndWFsL0ltYWdlX0xhbmd1YWdlXCI7XHJcbmltcG9ydCB7IERyYXdDYXJkUHJvYmFiaWxpdHlNYW5hZ2VyIH0gZnJvbSBcIi4uL1N0b3JlL0RyYXdDYXJkUHJvYmFiaWxpdHlcIjtcclxuaW1wb3J0IHsgVHVybnRhYmxlSW5mb3JtYXRpb25NYW5hZ2VyIH0gZnJvbSBcIi4uL1R1cm50YWJsZS9UdXJudGFibGVJbmZvcm1hdGlvblwiO1xyXG5pbXBvcnQgVGFza01hbmFnZXIgZnJvbSBcIi4uL1Rhc2svVGFza01hbmFnZXJcIjtcclxuaW1wb3J0IHsgQWNoaWV2ZW5tZW50VGFza01hbmFnZXIgfSBmcm9tIFwiLi4vVGFzay9EYXRhL0FjaGlldmVubWVudFRhc2tcIjtcclxuaW1wb3J0IHsgQmF0dGxlUGFzc0RhdGFNYW5hZ2VyIH0gZnJvbSBcIi4uL0JhdHRsZVBhc3MvQmF0dGxlUGFzc0RhdGFcIjtcclxuaW1wb3J0IHsgVHV0b3JpYWxMZXZlbE1hbmFnZXIgfSBmcm9tIFwiLi4vTGV2ZWwvVHV0b3JpYWxMZXZlbFwiO1xyXG5pbXBvcnQgeyBDb3Vyc2VUZXh0TWFuYWdlciB9IGZyb20gXCIuLi9UdXRvcmlhbHMvQ291cnNlVGV4dFwiO1xyXG5pbXBvcnQgeyBDdW11bGF0aXZlUmVjaGFyZ2VzTWFuYWdlciB9IGZyb20gXCIuLi9BY2N1bXVsYXRlZFJlY2hhcmdlL0N1bXVsYXRpdmVSZWNoYXJnZXNcIjtcclxuaW1wb3J0IHsgVXNlckluZm8gfSBmcm9tIFwiLi4vVXNlckluZm8vVXNlckluZm9cIjtcclxuaW1wb3J0IHsgQm9zc1dlZWtseVJld2FyZE1hbmFnZXIgfSBmcm9tIFwiLi4vY29weS9lbmRsZXNzY2hhbGxlbmdlcy9Cb3NzV2Vla2x5UmV3YXJkXCI7XHJcbmltcG9ydCB7IEVuZGxlc3NCdWZmTWFuYWdlciB9IGZyb20gXCIuLi9jb3B5L2VuZGxlc3NjaGFsbGVuZ2VzL0VuZGxlc3NCdWZmXCI7XHJcbmltcG9ydCB7IENvbnN0YW50Q29uZmlndXJhdGlvbk1hbmFnZXIgfSBmcm9tIFwiLi4vSnNvbkRhdGEvQ29uc3RhbnRDb25maWd1cmF0aW9uXCI7XHJcbmltcG9ydCB7IE1pc3Npb25MZXZlbE1hbmFnZXIgfSBmcm9tIFwiLi4vTGV2ZWwvTWlzc2lvbkxldmVsXCI7XHJcbmltcG9ydCB7IFJvZ3VlR2lmdEluZm9ybWF0aW9uTWFuYWdlciB9IGZyb20gXCIuLi9jb3B5L2VuZGxlc3NjaGFsbGVuZ2VzL1JvZ3VlR2lmdEluZm9ybWF0aW9uXCI7XHJcbmltcG9ydCB7IFJvZ3VlU2hvcE1hbmFnZXIgfSBmcm9tIFwiLi4vY29weS9lbmRsZXNzY2hhbGxlbmdlcy9Sb2d1ZVNob3BcIjtcclxuaW1wb3J0IHsgUm9ndWVIZXhhZ29uVHlwZXNNYW5hZ2VyIH0gZnJvbSBcIi4uL2NvcHkvdm9pZGNyYWNrL1JvZ3VlSGV4YWdvblR5cGVzXCI7XHJcbmltcG9ydCB7IEZpcnN0Q29tcGxldGVSZXdhcmRNYW5hZ2VyIH0gZnJvbSBcIi4uL0xldmVsL0ZpcnN0Q29tcGxldGVSZXdhcmRcIjtcclxuaW1wb3J0IHsgUm9ndWVMZXZlbE1hbmFnZXIgfSBmcm9tIFwiLi4vY29weS92b2lkY3JhY2svUm9ndWVMZXZlbFwiO1xyXG5pbXBvcnQgeyBSb2d1ZWZhc3RQYXNzTWFuYWdlciB9IGZyb20gXCIuLi9jb3B5L3ZvaWRjcmFjay9Sb2d1ZWZhc3RQYXNzXCI7XHJcbmltcG9ydCBXWE1hbmFnZXJFWCBmcm9tIFwiLi4vLi4vc3RhcnRzY2VuZS9XWE1hbmFnZXJFWFwiO1xyXG5cclxuXHJcbmNvbnN0IHtjY2NsYXNzLCBwcm9wZXJ0eX0gPSBjYy5fZGVjb3JhdG9yO1xyXG5cclxuQGNjY2xhc3NcclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTG9hZGluZyBleHRlbmRzIGNjLkNvbXBvbmVudCB7XHJcblxyXG4gICAgaXNfc3RhcnQ6Ym9vbGVhbj1mYWxzZTtcclxuICAgIGlzc3VlZF9kYXRhOmFueT1udWxsO1xyXG4gICAgaXNfaXNzdWVkX2ZpbmlzaDpib29sZWFuPWZhbHNlO1xyXG4gICAgc2NlbmVfcHJvZ3Jlc3M6bnVtYmVyPTA7XHJcbiAgICBsb2FkaW5nQmFyOmNjLlByb2dyZXNzQmFyPW51bGw7XHJcbiAgICBsb2FkTGFiZWw6Y2MuTGFiZWw9bnVsbDtcclxuICAgIG1heF9sb2FkX3RpbWU6bnVtYmVyPTEwO1xyXG4gICAgbG9hZF90b3RhbF90aW1lOm51bWJlcj0wO1xyXG5cclxuICAgIEBwcm9wZXJ0eShjYy5Ob2RlKVxyXG4gICAgY2FydG9vbjpjYy5Ob2RlPW51bGw7XHJcbiAgICBcclxuICAgIHByb3RlY3RlZCBvbkxvYWQoKTogdm9pZCB7XHJcbiAgICAgICAgaWYoVHV0b3JhaWxzTWFuYWdlci5nZXRJbnN0YW5jZSgpLmlzU2hvd1R1dG9yaWFscygyMDApKXtcclxuICAgICAgICAgICAgLy/mmL7npLrmvKvnlLtcclxuICAgICAgICAgICAgdGhpcy5jYXJ0b29uLmFjdGl2ZT10cnVlXHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuY2xvc2VKaWFvQ2hlbmcoKTtcclxuICAgICAgICBpZihJc0dNJiZMb2FkTWFuYWdlci5sb2FkX21vZGU9PUxvYWRfTW9kZS5yZW1vdGUpe1xyXG4gICAgICAgICAgICBsZXQgaXNPaz1mYWxzZTtcclxuICAgICAgICAgICAgY2MuYXNzZXRNYW5hZ2VyLmxvYWRSZW1vdGUoTG9hZE1hbmFnZXIucmVtb3RlX3VybF9qc29uK1wiSGVyb0F0dHJpYnV0ZS5qc29uXCIsKGVycm9yOiBFcnJvciwgYXNzZXRzOmNjLkpzb25Bc3NldCk9PiB7XHJcbiAgICAgICAgICAgICAgICBpZihlcnJvcil7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coZXJyb3IpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMubm9kZS5wYXJlbnQuZ2V0Q2hpbGRCeU5hbWUoJ2lwRWRpdEJveCcpLmdldENvbXBvbmVudChjYy5FZGl0Qm94KS5zdHJpbmc9TG9hZE1hbmFnZXIucmVtb3RlX3VybF9qc29uO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMubm9kZS5wYXJlbnQuZ2V0Q2hpbGRCeU5hbWUoJ2lwRWRpdEJveCcpLmFjdGl2ZT10cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGlzT2s9dHJ1ZTtcclxuICAgICAgICAgICAgICAgIHRoaXMubG9hZEFsbCgpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgdGhpcy5zY2hlZHVsZU9uY2UoKCk9PntcclxuICAgICAgICAgICAgICAgIGlmKGlzT2s9PWZhbHNlKXtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLm5vZGUucGFyZW50LmdldENoaWxkQnlOYW1lKCdpcEVkaXRCb3gnKS5nZXRDb21wb25lbnQoY2MuRWRpdEJveCkuc3RyaW5nPUxvYWRNYW5hZ2VyLnJlbW90ZV91cmxfanNvbjtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLm5vZGUucGFyZW50LmdldENoaWxkQnlOYW1lKCdpcEVkaXRCb3gnKS5hY3RpdmU9dHJ1ZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSwyKTtcclxuICAgICAgICAgICAgLy90aGlzLmxvYWRBbGwoKVxyXG4gICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICB0aGlzLm5vZGUucGFyZW50LmdldENoaWxkQnlOYW1lKCdpcEVkaXRCb3gnKS5hY3RpdmU9ZmFsc2U7XHJcbiAgICAgICAgICAgIHRoaXMubG9hZEFsbCgpXHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vY2MubG9nKFwidzEsMzE0LDU2LjY1XCIubWF0Y2goL1xcZCsoXFwuXFxkKyk/L2cpKTtcclxuICAgICAgICBpZihJc0RlYnVnJiZJc0dNKXtcclxuICAgICAgICAgICAgY29uc29sZS5lcnJvcihsb2NhbF92ZXJzaW9uKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgY2xvc2VKaWFvQ2hlbmcoKXtcclxuICAgICAgICAvL1R1dG9yYWlsc01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zYXZlVHV0b3JpYWxzKDIwMSk7XHJcbiAgICAgICAgLy9UdXRvcmFpbHNNYW5hZ2VyLmdldEluc3RhbmNlKCkuc2F2ZVR1dG9yaWFscygyMDIpO1xyXG4gICAgICAgIC8vVHV0b3JhaWxzTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNhdmVUdXRvcmlhbHMoMjAzKTtcclxuICAgICAgICAvL1R1dG9yYWlsc01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zYXZlVHV0b3JpYWxzKDIwNCk7XHJcbiAgICAgICAgLy8gVHV0b3JhaWxzTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNhdmVUdXRvcmlhbHMoMjA1KTtcclxuICAgICAgICAvLyBUdXRvcmFpbHNNYW5hZ2VyLmdldEluc3RhbmNlKCkuc2F2ZVR1dG9yaWFscygyMDYpO1xyXG4gICAgICAgIC8vIFR1dG9yYWlsc01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zYXZlVHV0b3JpYWxzKDIwNyk7XHJcbiAgICAgICAgLy9UdXRvcmFpbHNNYW5hZ2VyLmdldEluc3RhbmNlKCkuc2F2ZVR1dG9yaWFscygyMDgpO1xyXG4gICAgICAgIC8vIFR1dG9yYWlsc01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zYXZlVHV0b3JpYWxzKDIwOSk7XHJcbiAgICAgICAgLy8gVHV0b3JhaWxzTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNhdmVUdXRvcmlhbHMoMjEwKTtcclxuICAgICAgICAvLyBUdXRvcmFpbHNNYW5hZ2VyLmdldEluc3RhbmNlKCkuc2F2ZVR1dG9yaWFscygyMTEpO1xyXG4gICAgICAgIC8vIFR1dG9yYWlsc01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zYXZlVHV0b3JpYWxzKDIxMik7XHJcbiAgICAgICAgLy9UdXRvcmFpbHNNYW5hZ2VyLmdldEluc3RhbmNlKCkuc2F2ZVR1dG9yaWFscygyMTMpO1xyXG4gICAgICAgIC8vVHV0b3JhaWxzTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNhdmVUdXRvcmlhbHMoMjE0KTtcclxuICAgICAgICAvL1R1dG9yYWlsc01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zYXZlVHV0b3JpYWxzKDIxNSk7XHJcbiAgICAgICAgLy8gVHV0b3JhaWxzTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNhdmVUdXRvcmlhbHMoMjE2KTtcclxuICAgICAgICAvLyBUdXRvcmFpbHNNYW5hZ2VyLmdldEluc3RhbmNlKCkuc2F2ZVR1dG9yaWFscygyMTcpO1xyXG4gICAgICAgIC8vIFR1dG9yYWlsc01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zYXZlVHV0b3JpYWxzKDIxOCk7XHJcbiAgICAgICAgLy8gVHV0b3JhaWxzTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNhdmVUdXRvcmlhbHMoMjE5KTtcclxuICAgICAgICAvLyBUdXRvcmFpbHNNYW5hZ2VyLmdldEluc3RhbmNlKCkuc2F2ZVR1dG9yaWFscygyMjApO1xyXG4gICAgICAgIC8vIFR1dG9yYWlsc01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zYXZlVHV0b3JpYWxzKDIyMSk7XHJcbiAgICAgICAgLy8gVHV0b3JhaWxzTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNhdmVUdXRvcmlhbHMoMjIyKTtcclxuICAgICAgICAvLyBUdXRvcmFpbHNNYW5hZ2VyLmdldEluc3RhbmNlKCkuc2F2ZVR1dG9yaWFscygyMjMpO1xyXG4gICAgICAgIC8vIFR1dG9yYWlsc01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zYXZlVHV0b3JpYWxzKDIyNCk7XHJcbiAgICB9XHJcblxyXG4gICAgbG9hZEFsbCgpe1xyXG4gICAgICAgIExvYWRNYW5hZ2VyLmluaXQoKTtcclxuICAgICAgICBVc2VyRGF0YS5nZXRJbnN0YW5jZSgpO1xyXG4gICAgICAgIEdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuY3VyX2dhbWVfc2NlbmU9R2FtZVNjZW5lLmxvYWQ7XHJcbiAgICAgICAgVHV0b3JhaWxzTWFuYWdlci5nZXRJbnN0YW5jZSgpO1xyXG4gICAgICAgIFR1dG9yaWFsTGV2ZWxNYW5hZ2VyLmdldEluc3RhbmNlKCk7XHJcbiAgICAgICAgQ291cnNlVGV4dE1hbmFnZXIuZ2V0SW5zdGFuY2UoKTtcclxuICAgICAgICBBQlRlc3RNYW5hZ2VyLmdldEluc3RhbmNlKCk7XHJcbiAgICAgICAgRXF1aXBtZW50TWFuYWdlci5nZXRJbnN0YW5jZSgpO1xyXG4gICAgICAgIEhlcm9NYW5hZ2VyLmdldEluc3RhbmNlKCk7XHJcbiAgICAgICAgVGV4dE1hbmFnZW1lbnRNYW5hZ2VyLmdldEluc3RhbmNlKCk7XHJcbiAgICAgICAgSW1hZ2VfTGFuZ3VhZ2VNYW5hZ2VyLmdldEluc3RhbmNlKCk7XHJcbiAgICAgICAgSmFja3BvdE1hbmFnZXIuZ2V0SW5zdGFuY2UoKTtcclxuICAgICAgICBKYWNrcG90Q29sbGVjdGlvbk1hbmFnZXIuZ2V0SW5zdGFuY2UoKTtcclxuICAgICAgICBNb25zdGVyRGF0YU1hbmFnZXIuZ2V0SW5zdGFuY2UoKTtcclxuICAgICAgICBMZXZlbE1hbmFnZXIuZ2V0SW5zdGFuY2UoKTtcclxuICAgICAgICBPZmZsaW5lUmV2ZW51ZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKTtcclxuICAgICAgICBTaWduSW5NYW5hZ2VyLmdldEluc3RhbmNlKCk7XHJcbiAgICAgICAgUGxheWVyTGV2ZWxVcE1hbmFnZXIuZ2V0SW5zdGFuY2UoKTtcclxuICAgICAgICBGdW5jdGlvbkRlZmluaXRpb25NYW5hZ2VyLmdldEluc3RhbmNlKCk7XHJcbiAgICAgICAgVG93ZXJMZXZlbE1hbmFnZXIuZ2V0SW5zdGFuY2UoKTtcclxuICAgICAgICBUb3dlclJld2FyZE1hbmFnZXIuZ2V0SW5zdGFuY2UoKTtcclxuICAgICAgICBDdXN0b21zQ2xlYXJhbmNlUmViYXRlTWFuYWdlci5nZXRJbnN0YW5jZSgpO1xyXG4gICAgICAgIExldmVsVXBSZWJhdGVNYW5hZ2VyLmdldEluc3RhbmNlKCk7XHJcbiAgICAgICAgQmF0dGxlUGFzc01hbmFnZXIuZ2V0SW5zdGFuY2UoKTtcclxuICAgICAgICBQcm9wTWFuYWdlci5nZXRJbnN0YW5jZSgpO1xyXG4gICAgICAgIFNpZ25OdW1NYW5hZ2VyLmdldEluc3RhbmNlKCk7XHJcbiAgICAgICAgUGV0TWFuYWdlci5nZXRJbnN0YW5jZSgpO1xyXG4gICAgICAgIENvaW5TaG9wTWFuYWdlbWVudE1hbmFnZXIuZ2V0SW5zdGFuY2UoKTtcclxuICAgICAgICBTa2lsbExldmVsVW5sb2NrTWFuYWdlci5nZXRJbnN0YW5jZSgpOyAgICAgICAgXHJcbiAgICAgICAgQ3VtdWxhdGl2ZUNhcmRNYW5hZ2VyLmdldEluc3RhbmNlKCk7XHJcbiAgICAgICAgV2lzaFNwZW5kTWFuYWdlci5nZXRJbnN0YW5jZSgpO1xyXG4gICAgICAgIE1hemVNYW5hZ2VyLmdldEluc3RhbmNlKClcclxuICAgICAgICBDb21tb2RpdHlNYW5hZ2VtZW50TWFuYWdlci5nZXRJbnN0YW5jZSgpOyAgICAgICAgXHJcbiAgICAgICAgRXhjbHVzaXZlRW5oYW5jZW1lbnRNYW5hZ2VyLmdldEluc3RhbmNlKCk7XHJcbiAgICAgICAgRXhjbHVzaXZlV2VhcG9uTWVzc2FnZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKTtcclxuICAgICAgICBFeGNsdXNpdmVXZWFwb25Ta2lsbE1hbmFnZXIuZ2V0SW5zdGFuY2UoKTtcclxuICAgICAgICBUYXNrSW5mb3JtYXRpb25NYW5hZ2VyLmdldEluc3RhbmNlKCk7XHJcbiAgICAgICAgVGhyZWFkVGFza0luZm9ybWF0aW9uTWFuYWdlci5nZXRJbnN0YW5jZSgpO1xyXG4gICAgICAgIEFjY3VtdWxhdGVkSW5mb3JtYXRpb25NYW5hZ2VyLmdldEluc3RhbmNlKCk7XHJcbiAgICAgICAgUm9ndWVQZXRzTGVhc2VNYW5hZ2VyLmdldEluc3RhbmNlKCk7XHJcbiAgICAgICAgRWdnQ3VtdWxhdGl2ZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKTtcclxuICAgICAgICBFZ2dJbmZvcm1hdGlvbk1hbmFnZXIuZ2V0SW5zdGFuY2UoKTtcclxuICAgICAgICBQYXlNYW5hZ2VyLmdldEluc3RhbmNlKCk7XHJcbiAgICAgICAgQ3ljbGVQYWNrTWFuYWdlci5nZXRJbnN0YW5jZSgpO1xyXG4gICAgICAgIEVuZGxlc3NMZXZlbHNNYW5hZ2VyLmdldEluc3RhbmNlKCk7XHJcbiAgICAgICAgRW5kbGVzc1Jld2FyZE1hbmFnZXIuZ2V0SW5zdGFuY2UoKTtcclxuICAgICAgICBCb3NzQ2hhbGxlbmdlTWFuYWdlci5nZXRJbnN0YW5jZSgpO1xyXG4gICAgICAgIEJvc3NSZXdhcmRNYW5hZ2VyLmdldEluc3RhbmNlKCk7XHJcbiAgICAgICAgQ2hhcHRlclBhY2tNYW5hZ2VyLmdldEluc3RhbmNlKCk7XHJcbiAgICAgICAgQ29tbW9kaXR5TWFuYWdlbWVudE1hbmFnZXIuZ2V0SW5zdGFuY2UoKTtcclxuICAgICAgICBEYWlseVNob3BNYW5hZ2VyLmdldEluc3RhbmNlKCk7XHJcbiAgICAgICAgRGlhbW9uZHNSZWNoYXJnZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKTtcclxuICAgICAgICBEcmF3Q2FyZEluZm9ybWF0aW9uTWFuYWdlci5nZXRJbnN0YW5jZSgpO1xyXG4gICAgICAgIFB1cmNoYXNlQ29pbnNNYW5hZ2VyLmdldEluc3RhbmNlKCk7XHJcbiAgICAgICAgQ29tbW9kaXR5SW5mb3JtYXRpb25NYW5hZ2VyLmdldEluc3RhbmNlKCk7XHJcbiAgICAgICAgRHJhd0NhcmRQcm9iYWJpbGl0eU1hbmFnZXIuZ2V0SW5zdGFuY2UoKTtcclxuICAgICAgICBUdXJudGFibGVJbmZvcm1hdGlvbk1hbmFnZXIuZ2V0SW5zdGFuY2UoKTtcclxuICAgICAgICBBY2hpZXZlbm1lbnRUYXNrTWFuYWdlci5nZXRJbnN0YW5jZSgpO1xyXG4gICAgICAgIEJhdHRsZVBhc3NEYXRhTWFuYWdlci5nZXRJbnN0YW5jZSgpO1xyXG4gICAgICAgIEN1bXVsYXRpdmVSZWNoYXJnZXNNYW5hZ2VyLmdldEluc3RhbmNlKCk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgQm9zc1dlZWtseVJld2FyZE1hbmFnZXIuZ2V0SW5zdGFuY2UoKTtcclxuICAgICAgICBHYW1lRGF0YS5nZXRJbnN0YW5jZSgpLnJlZnJlc2hTZXJ2ZXJUaW1lKCk7XHJcbiAgICAgICAgRW5kbGVzc0J1ZmZNYW5hZ2VyLmdldEluc3RhbmNlKCk7XHJcbiAgICAgICAgQ29uc3RhbnRDb25maWd1cmF0aW9uTWFuYWdlci5nZXRJbnN0YW5jZSgpO1xyXG4gICAgICAgIFJvZ3VlR2lmdEluZm9ybWF0aW9uTWFuYWdlci5nZXRJbnN0YW5jZSgpO1xyXG4gICAgICAgIFJvZ3VlU2hvcE1hbmFnZXIuZ2V0SW5zdGFuY2UoKTtcclxuICAgICAgICBSb2d1ZUxldmVsTWFuYWdlci5nZXRJbnN0YW5jZSgpO1xyXG4gICAgICAgIFJvZ3VlSGV4YWdvblR5cGVzTWFuYWdlci5nZXRJbnN0YW5jZSgpO1xyXG4gICAgICAgIFJvZ3VlZmFzdFBhc3NNYW5hZ2VyLmdldEluc3RhbmNlKCk7XHJcblxyXG4gICAgICAgIFVzZXJJbmZvLmdldEluc3RhbmNlKCk7XHJcbiAgICAgICAgLy8gY2MuYXNzZXRNYW5hZ2VyLmxvYWRSZW1vdGUoXCJodHRwOi8vZ2FtZS1idWNrZXQub3NzLWV1LWNlbnRyYWwtMS5hbGl5dW5jcy5jb20vZ2FtZS9hZG1pbi9HYW1lUXVhbGl0eS9HMjAyL0x1Y2t5Q2FyZFRhYmxlLmNzdlwiLChlcnJvcjogRXJyb3IsIGFzc2V0czphbnkpPT4ge1xyXG4gICAgICAgIC8vICAgICBpZihlcnJvcil7XHJcbiAgICAgICAgLy8gICAgICAgICBjb25zb2xlLmxvZyhlcnJvcik7XHJcbiAgICAgICAgLy8gICAgICAgICByZXR1cm47XHJcbiAgICAgICAgLy8gICAgIH1cclxuICAgICAgICAvLyAgICAgY29uc29sZS5sb2coYXNzZXRzKTtcclxuICAgICAgICAvLyB9KTtcclxuXHJcbiAgICB9XHJcblxyXG4gICAgc3RhcnQoKVxyXG4gICAge1xyXG4gICAgICAgIGxldCBiZ0xvYWRpbmc9VUlNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0TG9hZGluZ05vZGUoKTtcclxuICAgICAgICBsZXQgdGl0bGU9YmdMb2FkaW5nLmdldENoaWxkQnlOYW1lKCd0aXRsZScpO1xyXG4gICAgICAgIHRpdGxlLm9wYWNpdHk9MDtcclxuXHJcbiAgICAgICAgbGV0IGJnX2xvYWRpbmdfMT10aGlzLmNhcnRvb24uZ2V0Q2hpbGRCeU5hbWUoXCJiZ19sb2FkaW5nXzFcIilcclxuICAgICAgICBsZXQgdGl0bGVfMT1iZ19sb2FkaW5nXzEuZ2V0Q2hpbGRCeU5hbWUoJ3RpdGxlJyk7XHJcbiAgICAgICAgdGl0bGVfMS5vcGFjaXR5PTA7XHJcbiAgICAgICAgXHJcbiAgICAgICAgY2MudHdlZW4odGl0bGUpLmRlbGF5KDEpLmNhbGwoKCk9PntcclxuICAgICAgICAgICAgLy9BcGtNYW5hZ2VyLmdldEluc3RhbmNlKCkuc2V0QUJUZXN0UGFyKCd7XCJyYW5rX3Nob3dcIjpmYWxzZX0nKTtcclxuICAgICAgICAgICAgRm9sbG93TWFuYWdlci5nZXRJbnN0YW5jZSgpLmZvbGxvd0V2ZW50KEZvbGxvd19UeXBlLkxvYWTpobXlsZXnpLrmgLvmrKHmlbApO1xyXG4gICAgICAgICAgICB0aXRsZS5nZXRDb21wb25lbnQoU3ByaXRlTGFuZ3VhZ2UpLnN0YXJ0VHJhbnNsYXRpb24oKTtcclxuICAgICAgICB9KS50bygxLHtvcGFjaXR5OjI1NX0pLnN0YXJ0KCk7XHJcblxyXG4gICAgICAgIGNjLnR3ZWVuKHRpdGxlXzEpLmRlbGF5KDEpLmNhbGwoKCk9PntcclxuICAgICAgICAgICAgdGl0bGVfMS5nZXRDb21wb25lbnQoU3ByaXRlTGFuZ3VhZ2UpLnN0YXJ0VHJhbnNsYXRpb24oKTtcclxuICAgICAgICB9KS50bygxLHtvcGFjaXR5OjI1NX0pLnN0YXJ0KCk7XHJcblxyXG4gICAgICAgIGJnTG9hZGluZy5nZXRDaGlsZEJ5TmFtZSgnUHJvZ3Jlc3NCYXInKS5hY3RpdmU9ZmFsc2U7XHJcbiAgICAgICAgYmdMb2FkaW5nLmdldENoaWxkQnlOYW1lKCdsb2FkJykuYWN0aXZlPWZhbHNlO1xyXG4gICAgICAgIFxyXG4gICAgICAgIGJnX2xvYWRpbmdfMS5nZXRDaGlsZEJ5TmFtZSgnUHJvZ3Jlc3NCYXInKS5hY3RpdmU9ZmFsc2U7XHJcbiAgICAgICAgYmdfbG9hZGluZ18xLmdldENoaWxkQnlOYW1lKCdsb2FkJykuYWN0aXZlPWZhbHNlO1xyXG5cclxuICAgICAgICAvLzHjgILlhYjliKTmlq3mnKzlnLDmmK/lkKbmnIl1aWTmtYvor5XpmLbmrrXvvIzlhYjnlKjmuLjlrqLouqvku73nmbvpmYZcclxuICAgICAgICB0aGlzLnN0YXJ0TG9hZCgpO1xyXG4gICAgICAgIGlmKElzVGVzdFNlcnZlcilcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIC8vIGlmKFVzZXJEYXRhLmdldEluc3RhbmNlKCkuZ2V0VXNlcklEKCkpXHJcbiAgICAgICAgICAgIC8vIHtcclxuICAgICAgICAgICAgLy8gICAgIEFwa01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zZXRVaWQoKTtcclxuICAgICAgICAgICAgLy8gfWVsc2VcclxuICAgICAgICAgICAgLy8ge1xyXG4gICAgICAgICAgICAvLyAgICAgQXBrTWFuYWdlci5nZXRJbnN0YW5jZSgpLnVwbG9hZEFuZEdldFVpZCgodXNlckluZm86YW55KT0+e1xyXG4gICAgICAgICAgICAvLyAgICAgICAgIHRoaXMuaXNfaXNzdWVkX2ZpbmlzaD10cnVlO1xyXG4gICAgICAgICAgICAvLyAgICAgICAgIGNvbnNvbGUubG9nKHVzZXJJbmZvKTtcclxuICAgICAgICAgICAgLy8gICAgICAgICBsZXQganNvbj1KU09OLnBhcnNlKHVzZXJJbmZvKTtcclxuICAgICAgICAgICAgLy8gICAgICAgICBpZihqc29uLnVpZClcclxuICAgICAgICAgICAgLy8gICAgICAgICB7XHJcbiAgICAgICAgICAgIC8vICAgICAgICAgICAgIFVzZXJEYXRhLmdldEluc3RhbmNlKCkuc2F2ZVVzZXJJRChqc29uLnVpZCk7ICAgICAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIC8vICAgICAgICAgfWVsc2VcclxuICAgICAgICAgICAgLy8gICAgICAgICB7XHJcbiAgICAgICAgICAgIC8vICAgICAgICAgICAgIHRoaXMuc3RhcnRMb2FkKCk7XHJcbiAgICAgICAgICAgIC8vICAgICAgICAgfVxyXG4gICAgICAgICAgICAvLyAgICAgfSlcclxuICAgICAgICAgICAgLy8gfVxyXG4gICAgICAgIH1lbHNlXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLmlzX2lzc3VlZF9maW5pc2g9dHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy90aGlzLnN0YXJ0TG9hZCgpO1xyXG5cclxuICAgIH1cclxuXHJcbiAgICBvbkNsaWNrT0soYnRuOmNjLkV2ZW50LkV2ZW50VG91Y2gpe1xyXG4gICAgICAgIGxldCBlYj10aGlzLm5vZGUucGFyZW50LmdldENoaWxkQnlOYW1lKCdpcEVkaXRCb3gnKS5nZXRDb21wb25lbnQoY2MuRWRpdEJveCk7XHJcbiAgICAgICAgTG9hZE1hbmFnZXIucmVtb3RlX3VybF9qc29uPWViLnN0cmluZztcclxuICAgICAgICBidG4uY3VycmVudFRhcmdldC5wYXJlbnQuYWN0aXZlPWZhbHNlO1xyXG4gICAgICAgIHRoaXMubG9hZEFsbCgpO1xyXG4gICAgfVxyXG5cclxuICAgIHN0YXJ0TG9hZCgpXHJcbiAgICB7XHJcbiAgICAgICAgaWYodGhpcy5pc19zdGFydD09dHJ1ZSlcclxuICAgICAgICByZXR1cm47XHJcbiAgICAgICAgdGhpcy5pc19zdGFydD10cnVlOyAgICAgICAgXHJcbiAgICAgICAgbGV0IGJnTG9hZGluZz1VSU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRMb2FkaW5nTm9kZSgpO1xyXG4gICAgICAgIGJnTG9hZGluZy5nZXRDaGlsZEJ5TmFtZSgnUHJvZ3Jlc3NCYXInKS5hY3RpdmU9dHJ1ZTtcclxuICAgICAgICBiZ0xvYWRpbmcuZ2V0Q2hpbGRCeU5hbWUoJ2xvYWQnKS5hY3RpdmU9dHJ1ZTtcclxuICAgICAgICBiZ0xvYWRpbmcuYWN0aXZlPXRydWU7XHJcbiAgICAgICAgbGV0IGJnTG9hZGluZ18xPXRoaXMuY2FydG9vbi5nZXRDaGlsZEJ5TmFtZShcImJnX2xvYWRpbmdfMVwiKVxyXG4gICAgICAgIGJnTG9hZGluZ18xLmdldENoaWxkQnlOYW1lKCdQcm9ncmVzc0JhcicpLmFjdGl2ZT10cnVlO1xyXG4gICAgICAgIGJnTG9hZGluZ18xLmdldENoaWxkQnlOYW1lKCdsb2FkJykuYWN0aXZlPXRydWU7XHJcbiAgICAgICAgYmdMb2FkaW5nXzEuYWN0aXZlPXRydWU7XHJcblxyXG4gICAgICAgIHRoaXMubG9hZGluZ0Jhcj1iZ0xvYWRpbmcuZ2V0Q2hpbGRCeU5hbWUoJ1Byb2dyZXNzQmFyJykuZ2V0Q29tcG9uZW50KGNjLlByb2dyZXNzQmFyKTtcclxuICAgICAgICB0aGlzLmxvYWRMYWJlbD10aGlzLmxvYWRpbmdCYXIubm9kZS5nZXRDaGlsZEJ5TmFtZSgnbG9hZExhYmVsJykuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKTtcclxuICAgICAgICAvL0dhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuY3VyX2dhbWVfc2NlbmU9R2FtZVNjZW5lLmhvbWU7XHJcbiAgICAgICAgY2MuZGlyZWN0b3IucHJlbG9hZFNjZW5lKEdhbWVTY2VuZS5ob21lLChjb21wbGV0ZWRDb3VudDogbnVtYmVyLCB0b3RhbENvdW50OiBudW1iZXIsIGl0ZW06IGFueSk9PntcclxuICAgICAgICAgICAgLy/nnJ/lrp7ov5vluqZcclxuICAgICAgICAgICAgdGhpcy5zY2VuZV9wcm9ncmVzcz1jb21wbGV0ZWRDb3VudC90b3RhbENvdW50OyAgICAgICAgICAgIFxyXG4gICAgICAgIH0sKCk9PntcclxuICAgICAgICAgICAgdGhpcy5jaGVha0xvYWRUb1NjZW5lKDAuNSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgdGhpcy5zY2hlZHVsZU9uY2UodGhpcy5sb2FkQWxsVWksMSk7XHJcbiAgICAgICAgaWYoSXNEZWJ1Zyl7XHJcbiAgICAgICAgICAgIEFwa01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5hZF9sb2FkZWRfbnVtPUFwa01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5tYXhfbG9hZF9udW1cclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5zY2hlZHVsZU9uY2UoKCk9PntcclxuICAgICAgICAgICAgaWYoQXBrTWFuYWdlci5nZXRJbnN0YW5jZSgpLmFkX2xvYWRlZF9udW08QXBrTWFuYWdlci5nZXRJbnN0YW5jZSgpLm1heF9sb2FkX251bSl7XHJcbiAgICAgICAgICAgICAgICBBcGtNYW5hZ2VyLmdldEluc3RhbmNlKCkuYWRfbG9hZGVkX251bT1BcGtNYW5hZ2VyLmdldEluc3RhbmNlKCkubWF4X2xvYWRfbnVtO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMuaXNfaXNzdWVkX2ZpbmlzaD10cnVlO1xyXG4gICAgICAgIH0sdGhpcy5tYXhfbG9hZF90aW1lKTtcclxuICAgIH1cclxuXHJcbiAgICBjaGVha0xvYWRUb1NjZW5lKGR0KVxyXG4gICAge1xyXG4gICAgICAgIGNjLmxvZygnY2hlYWtMb2FkVG9TY2VuZScpO1xyXG4gICAgICAgIHRoaXMubG9hZF90b3RhbF90aW1lKz1kdDtcclxuICAgICAgICBpZih0aGlzLmxvYWRfdG90YWxfdGltZT49MTApe1xyXG4gICAgICAgICAgICB0aGlzLnVuc2NoZWR1bGUodGhpcy5jaGVha0xvYWRUb1NjZW5lKTtcclxuICAgICAgICAgICAgY2MuZGlyZWN0b3IubG9hZFNjZW5lKFwibG9hZFwiKTtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZihJc0RlYnVnKXtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coTG9hZE1hbmFnZXIuZ2V0SXNMb2FkQ29tcGxldGUoKSxVc2VyRGF0YS5nZXRJbnN0YW5jZSgpLnZlcnNpb25faXNfb2ssVXNlckRhdGEuZ2V0SW5zdGFuY2UoKS5pc19sb2FkX29rLEFwa01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5hZF9sb2FkZWRfbnVtPj1BcGtNYW5hZ2VyLmdldEluc3RhbmNlKCkubWF4X2xvYWRfbnVtKVxyXG4gICAgICAgIH1cclxuICAgICAgICBpZihMb2FkTWFuYWdlci5nZXRJc0xvYWRDb21wbGV0ZSgpJiZVc2VyRGF0YS5nZXRJbnN0YW5jZSgpLnZlcnNpb25faXNfb2smJlVzZXJEYXRhLmdldEluc3RhbmNlKCkuaXNfbG9hZF9vayYmQXBrTWFuYWdlci5nZXRJbnN0YW5jZSgpLmFkX2xvYWRlZF9udW0+PUFwa01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5tYXhfbG9hZF9udW0pXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLm9uTG9hZEZpbmlzaCgpO1xyXG4gICAgICAgIH1lbHNlXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICAvL3RoaXMudW5zY2hlZHVsZSh0aGlzLmNoZWFrTG9hZFRvU2NlbmUpO1xyXG4gICAgICAgICAgICBkdCs9MC4xO1xyXG4gICAgICAgICAgICB0aGlzLnNjaGVkdWxlT25jZSgoKT0+e1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jaGVha0xvYWRUb1NjZW5lKGR0KTtcclxuICAgICAgICAgICAgfSxkdCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIG9uTG9hZEZpbmlzaCgpe1xyXG4gICAgICAgIGlmKEZvbGxvd01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRGaXJzdERvKEZvbGxvd19UeXBlLummluasoeeZu+W9lSk8PTApe1xyXG4gICAgICAgICAgICBGb2xsb3dNYW5hZ2VyLmdldEluc3RhbmNlKCkuYWRkRmlyc3REbyhGb2xsb3dfVHlwZS7pppbmrKHnmbvlvZUpO1xyXG4gICAgICAgICAgICBGb2xsb3dNYW5hZ2VyLmdldEluc3RhbmNlKCkuZm9sbG93RXZlbnQoRm9sbG93X1R5cGUu6aaW5qyh55m75b2VKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5jdXJfbG9hZF9wcm9ncmVzcz10aGlzLmxvYWRpbmdCYXIucHJvZ3Jlc3M7XHJcbiAgICAgICAgLy8gVXNlckluZm8uZ2V0SW5zdGFuY2UoKS5yZWZyZXNoRGF0YSgpO1xyXG4gICAgICAgIE9mZmxpbmVSZXZlbnVlTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldE5vd0VxdWlwSWRMaXN0KCk7XHJcbiAgICAgICAgSGVyb01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5vbkxvYWRIZXJvRGF0YSgpO1xyXG4gICAgICAgIFByb3BNYW5hZ2VyLmdldEluc3RhbmNlKCkubG9hZFByb3BEYXRhKCk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgLy8gUGV0TWFuYWdlci5nZXRJbnN0YW5jZSgpLm9uTG9hZFBldERhdGEoKTtcclxuICAgICAgICB0aGlzLnVuc2NoZWR1bGUodGhpcy5jaGVha0xvYWRUb1NjZW5lKTtcclxuICAgICAgICBUYXNrTWFuYWdlci5nZXRJbnN0YW5jZSgpO1xyXG4gICAgICAgIGlmKFR1dG9yYWlsc01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5pc1Nob3dUdXRvcmlhbHMoMjAwKSl7XHJcbiAgICAgICAgICAgIC8v5pi+56S65oyJ6ZKuXHJcbiAgICAgICAgICAgIHRoaXMuY2FydG9vbi5nZXRDaGlsZEJ5TmFtZShcImJ1dG5cIikuYWN0aXZlPXRydWVcclxuICAgICAgICAgICAgdGhpcy5jYXJ0b29uLmdldENoaWxkQnlOYW1lKFwiYnRuXCIpLmFjdGl2ZT10cnVlXHJcbiAgICAgICAgICAgIHRoaXMuY2FydG9vbi5nZXRDaGlsZEJ5TmFtZShcIkxvYWRpbmdcIikuYWN0aXZlPWZhbHNlXHJcbiAgICAgICAgICAgIHJldHVyblxyXG4gICAgICAgIH1cclxuICAgICAgICBpZihJc1Rlc3RDb2RlKXtcclxuICAgICAgICAgICAgY2MuZGlyZWN0b3IubG9hZFNjZW5lKCd6aGVuZ3hpbmcnKTtcclxuICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5jdXJfZ2FtZV9zY2VuZT1HYW1lU2NlbmUuaG9tZTtcclxuICAgICAgICAgICAgY2MuZGlyZWN0b3IubG9hZFNjZW5lKEdhbWVTY2VuZS5ob21lKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5jaGVja0V4Y2VsKCk7XHJcbiAgICB9XHJcblxyXG4gICAgY2hlY2tFeGNlbCgpe1xyXG4gICAgICAgIGlmKGNjLnN5cy5pc05hdGl2ZT09ZmFsc2UgJiYgSXNEZWJ1Zyl7XHJcbiAgICAgICAgICAgIE1pc3Npb25MZXZlbE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5jaGVjaygpO1xyXG4gICAgICAgICAgICBGaXJzdENvbXBsZXRlUmV3YXJkTWFuYWdlci5nZXRJbnN0YW5jZSgpLmNoZWNrKCk7XHJcbiAgICAgICAgICAgIEVuZGxlc3NMZXZlbHNNYW5hZ2VyLmdldEluc3RhbmNlKCkuY2hlY2soKTtcclxuICAgICAgICAgICAgRGFpbHlTaG9wTWFuYWdlci5nZXRJbnN0YW5jZSgpLmNoZWNrKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgXHJcbiAgICBsb2FkQWxsVWkoKVxyXG4gICAgeyAgICAgICAgXHJcbiAgICAgICAgaWYoIVR1dG9yYWlsc01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5pc19maW5pc2gpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBXWE1hbmFnZXJFWC5nZXRJbnN0YW5jZSgpLnJlc291cmNlc0J1bmRsZS5sb2FkRGlyKCd0dXRvcmlhbHMnKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJvdGVjdGVkIHVwZGF0ZShkdDogbnVtYmVyKTogdm9pZCB7XHJcbiAgICAgICAgICAgIC8v6LWE5rqQ6L+b5bqmXHJcbiAgICAgICAgICAgIC8vIGxldCBhc3NldHNQcm89TG9hZE1hbmFnZXIubG9hZGVkX2NvbXBsZXRlZC9Mb2FkTWFuYWdlci5tYXhfbnVtX2xvYWRpbmc7XHJcbiAgICAgICAgICAgIC8vIC8v5bm/5ZGK6L+b5bqmXHJcbiAgICAgICAgICAgIC8vIGxldCBhZFBybz1BcGtNYW5hZ2VyLmdldEluc3RhbmNlKCkuYWRfbG9hZGVkX251bS9BcGtNYW5hZ2VyLmdldEluc3RhbmNlKCkubWF4X2xvYWRfbnVtO1xyXG4gICAgICAgICAgICAvLyBsZXQgcHA9KHRoaXMuc2NlbmVfcHJvZ3Jlc3MrYXNzZXRzUHJvK2FkUHJvKS8zO1xyXG4gICAgICAgICAgICAvLyAvL+WBh+eahOi/m+W6plxyXG4gICAgICAgICAgICBsZXQgcHJvZ3Jlc3NGYWxzZT10aGlzLmxvYWRpbmdCYXIucHJvZ3Jlc3MrZHQvdGhpcy5tYXhfbG9hZF90aW1lO1xyXG4gICAgICAgICAgICBpZihwcm9ncmVzc0ZhbHNlPjEpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHByb2dyZXNzRmFsc2U9MTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLmxvYWRpbmdCYXIucHJvZ3Jlc3MgPSBwcm9ncmVzc0ZhbHNlO1xyXG4gICAgICAgICAgICB0aGlzLmxvYWRMYWJlbC5zdHJpbmc9KHRoaXMubG9hZGluZ0Jhci5wcm9ncmVzcyoxMDApLnRvRml4ZWQoMCkrJyUnO1xyXG4gICAgICAgICAgICBHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLmN1cl9sb2FkX3Byb2dyZXNzPXByb2dyZXNzRmFsc2U7XHJcbiAgICB9XHJcblxyXG59XHJcbiJdfQ==