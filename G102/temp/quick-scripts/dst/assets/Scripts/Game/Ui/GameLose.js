
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Scripts/Game/Ui/GameLose.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'd83f8GPkehBFYiLLhSmEJK8', 'GameLose');
// Scripts/Game/Ui/GameLose.ts

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
var Constants_1 = require("../../Constants");
var GameManager_1 = require("../../GameManager");
var LevelJsonData_1 = require("../../JsonData/LevelJsonData");
var LevelManager_1 = require("../../Level/LevelManager");
var MissionLevel_1 = require("../../Level/MissionLevel");
var FollowConstants_1 = require("../../multiLanguage/FollowConstants");
var FollowManager_1 = require("../../multiLanguage/FollowManager");
var LanguageManager_1 = require("../../multiLanguage/LanguageManager");
var AudioConstants_1 = require("../../Sound/AudioConstants");
var TowerManager_1 = require("../../Tower/TowerManager");
var TutorailsManager_1 = require("../../Tutorials/TutorailsManager");
var UIManager_1 = require("../../UI/UIManager");
var UIComponent_1 = require("../../UI/UIComponent");
var PropManager_1 = require("../../Prop/PropManager");
var PropConfig_1 = require("../../Prop/PropConfig");
var MonsterManager_1 = require("../../Monster/MonsterManager");
var MazeManager_1 = require("../../Maze/MazeManager");
var FunctionDefinition_1 = require("../../JsonData/FunctionDefinition");
var WallManager_1 = require("../../Wall/WallManager");
var UIConfig_1 = require("../../UI/UIConfig");
var PayManager_1 = require("../../Payment/PayManager");
var RogueHexagonTypes_1 = require("../../copy/voidcrack/RogueHexagonTypes");
var Turmtable_1 = require("../../Turntable/Turmtable");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var GameLose = /** @class */ (function (_super) {
    __extends(GameLose, _super);
    function GameLose() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    GameLose.prototype.onEnable = function () {
        this.initUi();
        GameManager_1.default.getInstance().sound_manager.playSound(AudioConstants_1.SoundIndex.YX_Lose);
        //MonsterDataManager.getInstance().saveAllKillEnemy();        
    };
    GameLose.prototype.initUi = function () {
        //关卡字体
        var labelLevel = this.node.getChildByName('label_level');
        var btnReplay = this.node.getChildByName('btnReplay');
        switch (GameManager_1.default.getInstance().cur_game_mode) {
            case Constants_1.GameMode.Main:
                {
                    btnReplay.active = true;
                    labelLevel.getComponent(cc.Label).string = GameManager_1.default.getInstance().fighting_info.title_name;
                    FollowManager_1.default.getInstance().followEvent(FollowConstants_1.Follow_Type.战斗失败展示次数_x关 + GameManager_1.default.getInstance().fighting_info.title_name);
                    FollowManager_1.default.getInstance().followEvent(FollowConstants_1.Follow_Type.失败挑战关卡 + LevelManager_1.LevelManager.getInstance().start_level);
                    this.showReward();
                }
                break;
            case Constants_1.GameMode.Tower:
                {
                    btnReplay.active = false;
                    labelLevel.getComponent(cc.Label).string = labelLevel.getComponent(cc.Label).string = GameManager_1.default.getInstance().fighting_info.title_name;
                    //FollowManager.getInstance().followEvent(Follow_Type+(TowerManager.getTowerLevel()-1));
                }
                break;
            case Constants_1.GameMode.Endless:
                {
                    btnReplay.active = false;
                    labelLevel.getComponent(cc.Label).string = "" + LanguageManager_1.default.getInstance().getStrByTextId(800001);
                }
                break;
            case Constants_1.GameMode.Boss_Challenge:
                {
                    btnReplay.active = false;
                    labelLevel.getComponent(cc.Label).string = "" + LanguageManager_1.default.getInstance().getStrByTextId(820001);
                    // labelLevel.getComponent(cc.Label).string=BossChallengeManager.getInstance().cur_score+"";
                    // FollowManager.getInstance().followEvent(Follow_Type.完成BOSS挑战次数);
                }
                break;
            case Constants_1.GameMode.Maze:
                {
                    labelLevel.getComponent(cc.Label).string = GameManager_1.default.getInstance().fighting_info.title_name;
                    btnReplay.active = false;
                    var mainWall = WallManager_1.default.getInstance().getMainWall();
                    MazeManager_1.MazeManager.getInstance().setMazeSubHp((mainWall.getMaxHp() - mainWall.getCurHp()) / mainWall.getMaxHp());
                    var type = RogueHexagonTypes_1.RogueHexagonTypesManager.getInstance().getHexagonType(MazeManager_1.MazeManager.getInstance().getFightingId());
                    switch (type) {
                        case 1:
                            {
                                FollowManager_1.default.getInstance().followEvent(FollowConstants_1.Follow_Type.rogue玩法普通关卡挑战失败的次数);
                            }
                            break;
                        case 2:
                            {
                                FollowManager_1.default.getInstance().followEvent(FollowConstants_1.Follow_Type.rogue玩法精英关卡挑战失败的次数);
                            }
                            break;
                        case 6:
                            {
                                FollowManager_1.default.getInstance().followEvent(FollowConstants_1.Follow_Type.rogue玩法BOSS关卡挑战失败的次数);
                            }
                            break;
                    }
                }
                break;
        }
    };
    GameLose.prototype.showReward = function () {
        switch (GameManager_1.default.getInstance().cur_game_mode) {
            case Constants_1.GameMode.Main:
                {
                    this.showMainReward();
                }
                break;
            case Constants_1.GameMode.Tower: {
                this.showTowerReward();
            }
        }
    };
    GameLose.prototype.showMainReward = function () {
        var startLevel = LevelManager_1.LevelManager.getInstance().start_level;
        //let gm=GameManager.getInstance();
        //let scrollView=this.node.getChildByName('rewardRoot').getChildByName('propsScrollView');
        //let content=scrollView.getComponent(cc.ScrollView).content;
        var per = MonsterManager_1.default.getInstance().killed_monster_num / MonsterManager_1.default.getInstance().total_monster_num;
        var rewardCoin = Math.round(MissionLevel_1.MissionLevelManager.getInstance().getPassReward_Coin(startLevel) * per);
        var rd = new LevelJsonData_1.RewardData();
        rd.reward_id = PropConfig_1.PropId.Coin;
        rd.reward_num = rewardCoin;
        // let item=gm.box_json_data.createBoxItem(rd.reward_id,rd.reward_num);
        // content.addChild(item);
        PropManager_1.PropManager.getInstance().changePropNum(rd.reward_id, rd.reward_num);
        this.checkTutorails();
    };
    GameLose.prototype.showTowerReward = function () {
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
    };
    GameLose.prototype.checkTutorails = function () {
        if (GameManager_1.default.getInstance().cur_game_mode == Constants_1.GameMode.Main) {
            if (TutorailsManager_1.default.getInstance().isShowTutorials(301)) {
                PropManager_1.PropManager.getInstance().changePropNum(PropConfig_1.PropId.Coin, 100);
                TutorailsManager_1.default.getInstance().showTutorials(301, function () {
                    TutorailsManager_1.default.getInstance().saveTutorials(301);
                }, function () {
                    TutorailsManager_1.default.getInstance().is_tutorails_state = false;
                });
            }
            else if (TutorailsManager_1.default.getInstance().isShowTutorials(311)) {
                PropManager_1.PropManager.getInstance().changePropNum(100003, 30);
                TutorailsManager_1.default.getInstance().showTutorials(311, function () {
                    TutorailsManager_1.default.getInstance().saveTutorials(311);
                }, function () {
                    TutorailsManager_1.default.getInstance().is_tutorails_state = false;
                });
            }
            else if (TutorailsManager_1.default.getInstance().isShowTutorials(301) == false && TutorailsManager_1.default.getInstance().isShowTutorials(311) == false) {
                if (TutorailsManager_1.default.getInstance().isShowTutorials(331)) {
                    TutorailsManager_1.default.getInstance().showTutorials(331, function () {
                        TutorailsManager_1.default.getInstance().saveTutorials(331);
                    }, function () {
                        if (PayManager_1.PayManager.getInstance().getPayNum('c301') <= 0) {
                            // UIManager.getInstance().showUiDialog(UIPath.FirstCharge,UILayerLevel.One,{onCompleted:(uiNode)=> {
                            //     uiNode.getComponent(PayFirstChargeUi).init({
                            //         onClose:() => {
                            //         }
                            //     });
                            // },});
                        }
                    });
                }
            }
        }
    };
    GameLose.prototype.clickBtnHome = function () {
        FollowManager_1.default.getInstance().followEvent(FollowConstants_1.Follow_Type.失败页_主页按钮点击次数);
        GameManager_1.default.getInstance().sound_manager.playSound(AudioConstants_1.SoundIndex.click);
        switch (GameManager_1.default.getInstance().cur_game_mode) {
            case Constants_1.GameMode.Main:
                {
                    GameManager_1.default.getInstance().game_to_home = Constants_1.Go_Type.Main;
                    GameManager_1.default.getInstance().backToHome();
                }
                break;
            case Constants_1.GameMode.Maze:
                {
                    GameManager_1.default.getInstance().game_to_home = Constants_1.Go_Type.Activity_Maze_lose;
                    GameManager_1.default.getInstance().backToHome();
                }
                break;
        }
    };
    GameLose.prototype.clickBtnGo = function (btn, indexStr) {
        GameManager_1.default.getInstance().sound_manager.playSound(AudioConstants_1.SoundIndex.click);
        var goType = parseInt(indexStr);
        if (goType == Constants_1.Go_Type.PetList) {
            if (FunctionDefinition_1.FunctionDefinitionManager.getInstance().getIsUnlockIndex(Constants_1.Btn_Index.Btn_Pet) == false) {
                var type = FunctionDefinition_1.FunctionDefinitionManager.getInstance().getUnlockConditionType(Constants_1.FuncType.ChongWuXiTong);
                var num = FunctionDefinition_1.FunctionDefinitionManager.getInstance().getUnlockCondictionParameter(Constants_1.FuncType.ChongWuXiTong);
                if (type == 1) {
                    GameManager_1.default.getInstance().showMessage(LanguageManager_1.default.getInstance().getStrByTextId(100051) + ":" + num);
                }
                else if (type == 2) {
                    var textStr = LanguageManager_1.default.getInstance().getStrByTextId(100052);
                    var nums = MissionLevel_1.MissionLevelManager.getInstance().getLevelName((num));
                    var str = textStr.replace('~', '' + nums);
                    GameManager_1.default.getInstance().showMessage(str);
                }
                return;
            }
        }
        // if(goType==Go_Type.Activity){
        //     // if(FunctionDefinitionManager.getInstance().getIsUnlockIndex(Btn_Index.Btn_FuBen)==false){
        //         let type=FunctionDefinitionManager.getInstance().getUnlockConditionType(FuncType.GeRenBoss)
        //         let num=FunctionDefinitionManager.getInstance().getUnlockCondictionParameter(FuncType.GeRenBoss)
        //         if(LevelManager.getInstance().finish_level<num){
        //             if(type==1){
        //                 GameManager.getInstance().showMessage(LanguageManager.getInstance().getStrByTextId(100051)+":"+num);
        //             }else if(type==2){
        //                 let textStr=LanguageManager.getInstance().getStrByTextId(100052);
        //                 let nums=MissionLevelManager.getInstance().getLevelName((num))
        //                 let str=textStr.replace('~',''+nums)
        //                 GameManager.getInstance().showMessage(str);
        //             }
        //             return;
        //         }
        //         // let textStr=LanguageManager.getInstance().getStrByTextId(100052);
        //         // let nums="3-10"//MissionLevelManager.getInstance().getLevelName((num))
        //         // let str=textStr.replace('~',''+nums)
        //         // GameManager.getInstance().showMessage(str);
        //     // }
        // }
        if (goType == 1) {
            FollowManager_1.default.getInstance().followEvent(FollowConstants_1.Follow_Type.失败页_强化养成跳转按钮点击次数);
        }
        if (goType == 10) {
            var um = UIManager_1.UIManager.getInstance();
            FollowManager_1.default.getInstance().followEvent(FollowConstants_1.Follow_Type.失败页_获取资源跳转按钮点击次数);
            FollowManager_1.default.getInstance().followEvent(FollowConstants_1.Follow_Type.转盘的打开次数);
            um.showUiDialog(UIConfig_1.UIPath.Turntable, UIConfig_1.UILayerLevel.One, { onCompleted: function (uiNode) {
                    uiNode.getComponent(Turmtable_1.default).initUi();
                }, }); //转盘
            return;
        }
        if (goType == 9) {
            FollowManager_1.default.getInstance().followEvent(FollowConstants_1.Follow_Type.失败页_前往商城跳转按钮点击次数);
        }
        // console.log("________type1",goType)
        GameManager_1.default.getInstance().game_to_home = goType;
        GameManager_1.default.getInstance().backToHome();
    };
    GameLose.prototype.clickBtnReplay = function () {
        FollowManager_1.default.getInstance().followEvent(FollowConstants_1.Follow_Type.失败页_重新挑战按钮点击次数);
        GameManager_1.default.getInstance().sound_manager.playSound(AudioConstants_1.SoundIndex.click);
        cc.director.loadScene(Constants_1.GameScene.game);
    };
    GameLose.prototype.clickBtnRole = function () {
        GameManager_1.default.getInstance().sound_manager.playSound(AudioConstants_1.SoundIndex.click);
        GameManager_1.default.getInstance().backToHome();
    };
    GameLose.prototype.clickBtnOk = function () {
        GameManager_1.default.getInstance().sound_manager.playSound(AudioConstants_1.SoundIndex.click);
        GameManager_1.default.getInstance().game_to_home = Constants_1.Go_Type.Activity;
        if (GameManager_1.default.getInstance().cur_game_mode == Constants_1.GameMode.Tower) {
            TowerManager_1.default.is_show_tower = true;
        }
        GameManager_1.default.getInstance().backToHome();
    };
    GameLose.prototype.clickBtnStats = function () {
        GameManager_1.default.getInstance().sound_manager.playSound(AudioConstants_1.SoundIndex.click);
        UIManager_1.UIManager.getInstance().showDamageStatsUi();
    };
    GameLose = __decorate([
        ccclass
    ], GameLose);
    return GameLose;
}(UIComponent_1.default));
exports.default = GameLose;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0c1xcR2FtZVxcVWlcXEdhbWVMb3NlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUNBLDZDQUErRjtBQUUvRixpREFBNEM7QUFDNUMsOERBQTBEO0FBQzFELHlEQUF3RDtBQUN4RCx5REFBK0Q7QUFDL0QsdUVBQWtFO0FBQ2xFLG1FQUE4RDtBQUM5RCx1RUFBa0U7QUFDbEUsNkRBQXdEO0FBQ3hELHlEQUFvRDtBQUNwRCxxRUFBZ0U7QUFDaEUsZ0RBQStDO0FBQy9DLG9EQUErQztBQUMvQyxzREFBcUQ7QUFDckQsb0RBQStDO0FBQy9DLCtEQUEwRDtBQUMxRCxzREFBcUQ7QUFDckQsd0VBQThFO0FBQzlFLHNEQUFpRDtBQUdqRCw4Q0FBeUQ7QUFDekQsdURBQXNEO0FBQ3RELDRFQUFrRjtBQUNsRix1REFBa0Q7QUFHNUMsSUFBQSxLQUFzQixFQUFFLENBQUMsVUFBVSxFQUFsQyxPQUFPLGFBQUEsRUFBRSxRQUFRLGNBQWlCLENBQUM7QUFHMUM7SUFBc0MsNEJBQVc7SUFBakQ7O0lBd1BBLENBQUM7SUF0UEcsMkJBQVEsR0FBUjtRQUVJLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQztRQUNkLHFCQUFXLENBQUMsV0FBVyxFQUFFLENBQUMsYUFBYSxDQUFDLFNBQVMsQ0FBQywyQkFBVSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQ3RFLDhEQUE4RDtJQUNsRSxDQUFDO0lBRUQseUJBQU0sR0FBTjtRQUVJLE1BQU07UUFDTixJQUFJLFVBQVUsR0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxhQUFhLENBQUMsQ0FBQztRQUN2RCxJQUFJLFNBQVMsR0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxXQUFXLENBQUMsQ0FBQztRQUNwRCxRQUFPLHFCQUFXLENBQUMsV0FBVyxFQUFFLENBQUMsYUFBYSxFQUFDO1lBQzNDLEtBQUssb0JBQVEsQ0FB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Q0FBQyxVQUFVLEVBQUUsQ0FBQztJQUMzQyxDQUFDO0lBRUQsNkJBQVUsR0FBVjtRQUNJLHFCQUFXLENBQUMsV0FBVyxFQUFFLENBQUMsYUFBYSxDQUFDLFNBQVMsQ0FBQywyQkFBVSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ3BFLHFCQUFXLENBQUMsV0FBVyxFQUFFLENBQUMsWUFBWSxHQUFDLG1CQUFPLENBQUMsUUFBUSxDQUFDO1FBQ3hELElBQUcscUJBQVcsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxhQUFhLElBQUUsb0JBQVEsQ0FBQyxLQUFLLEVBQUM7WUFDdkQsc0JBQVksQ0FBQyxhQUFhLEdBQUMsSUFBSSxDQUFDO1NBQ25DO1FBQ0QscUJBQVcsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxVQUFVLEVBQUUsQ0FBQztJQUMzQyxDQUFDO0lBRUQsZ0NBQWEsR0FBYjtRQUNJLHFCQUFXLENBQUMsV0FBVyxFQUFFLENBQUMsYUFBYSxDQUFDLFNBQVMsQ0FBQywyQkFBVSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ3BFLHFCQUFTLENBQUMsV0FBVyxFQUFFLENBQUMsaUJBQWlCLEVBQUUsQ0FBQztJQUNoRCxDQUFDO0lBdlBnQixRQUFRO1FBRDVCLE9BQU87T0FDYSxRQUFRLENBd1A1QjtJQUFELGVBQUM7Q0F4UEQsQUF3UEMsQ0F4UHFDLHFCQUFXLEdBd1BoRDtrQkF4UG9CLFFBQVEiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJcclxuaW1wb3J0IHsgQnRuX0luZGV4LCBGdW5jVHlwZSwgR2FtZU1vZGUsIEdhbWVTY2VuZSwgR2FtZVN0YXRlLCBHb19UeXBlIH0gZnJvbSBcIi4uLy4uL0NvbnN0YW50c1wiO1xyXG5pbXBvcnQgeyBNb25zdGVyRGF0YU1hbmFnZXIgfSBmcm9tIFwiLi4vLi4vTW9uc3Rlci9EYXRhL01vbnN0ZXJEYXRhTWFuYWdlclwiO1xyXG5pbXBvcnQgR2FtZU1hbmFnZXIgZnJvbSBcIi4uLy4uL0dhbWVNYW5hZ2VyXCI7XHJcbmltcG9ydCB7IFJld2FyZERhdGEgfSBmcm9tIFwiLi4vLi4vSnNvbkRhdGEvTGV2ZWxKc29uRGF0YVwiO1xyXG5pbXBvcnQgeyBMZXZlbE1hbmFnZXIgfSBmcm9tIFwiLi4vLi4vTGV2ZWwvTGV2ZWxNYW5hZ2VyXCI7XHJcbmltcG9ydCB7IE1pc3Npb25MZXZlbE1hbmFnZXIgfSBmcm9tIFwiLi4vLi4vTGV2ZWwvTWlzc2lvbkxldmVsXCI7XHJcbmltcG9ydCB7IEZvbGxvd19UeXBlIH0gZnJvbSBcIi4uLy4uL211bHRpTGFuZ3VhZ2UvRm9sbG93Q29uc3RhbnRzXCI7XHJcbmltcG9ydCBGb2xsb3dNYW5hZ2VyIGZyb20gXCIuLi8uLi9tdWx0aUxhbmd1YWdlL0ZvbGxvd01hbmFnZXJcIjtcclxuaW1wb3J0IExhbmd1YWdlTWFuYWdlciBmcm9tIFwiLi4vLi4vbXVsdGlMYW5ndWFnZS9MYW5ndWFnZU1hbmFnZXJcIjtcclxuaW1wb3J0IHsgU291bmRJbmRleCB9IGZyb20gXCIuLi8uLi9Tb3VuZC9BdWRpb0NvbnN0YW50c1wiO1xyXG5pbXBvcnQgVG93ZXJNYW5hZ2VyIGZyb20gXCIuLi8uLi9Ub3dlci9Ub3dlck1hbmFnZXJcIjtcclxuaW1wb3J0IFR1dG9yYWlsc01hbmFnZXIgZnJvbSBcIi4uLy4uL1R1dG9yaWFscy9UdXRvcmFpbHNNYW5hZ2VyXCI7XHJcbmltcG9ydCB7IFVJTWFuYWdlciB9IGZyb20gXCIuLi8uLi9VSS9VSU1hbmFnZXJcIjtcclxuaW1wb3J0IFVJQ29tcG9uZW50IGZyb20gXCIuLi8uLi9VSS9VSUNvbXBvbmVudFwiO1xyXG5pbXBvcnQgeyBQcm9wTWFuYWdlciB9IGZyb20gXCIuLi8uLi9Qcm9wL1Byb3BNYW5hZ2VyXCI7XHJcbmltcG9ydCB7IFByb3BJZCB9IGZyb20gXCIuLi8uLi9Qcm9wL1Byb3BDb25maWdcIjtcclxuaW1wb3J0IE1vbnN0ZXJNYW5hZ2VyIGZyb20gXCIuLi8uLi9Nb25zdGVyL01vbnN0ZXJNYW5hZ2VyXCI7XHJcbmltcG9ydCB7IE1hemVNYW5hZ2VyIH0gZnJvbSBcIi4uLy4uL01hemUvTWF6ZU1hbmFnZXJcIjtcclxuaW1wb3J0IHsgRnVuY3Rpb25EZWZpbml0aW9uTWFuYWdlciB9IGZyb20gXCIuLi8uLi9Kc29uRGF0YS9GdW5jdGlvbkRlZmluaXRpb25cIjtcclxuaW1wb3J0IFdhbGxNYW5hZ2VyIGZyb20gXCIuLi8uLi9XYWxsL1dhbGxNYW5hZ2VyXCI7XHJcbmltcG9ydCBQYXlGaXJzdENoYXJnZVVpIGZyb20gXCIuLi8uLi9QYXltZW50L1BheUZpcnN0Q2hhcmdlVWlcIjtcclxuaW1wb3J0IE1haW5VaSBmcm9tIFwiLi4vLi4vVUkvaG9tZS9NYWluVWlcIjtcclxuaW1wb3J0IHsgVUlQYXRoLCBVSUxheWVyTGV2ZWwgfSBmcm9tIFwiLi4vLi4vVUkvVUlDb25maWdcIjtcclxuaW1wb3J0IHsgUGF5TWFuYWdlciB9IGZyb20gXCIuLi8uLi9QYXltZW50L1BheU1hbmFnZXJcIjtcclxuaW1wb3J0IHsgUm9ndWVIZXhhZ29uVHlwZXNNYW5hZ2VyIH0gZnJvbSBcIi4uLy4uL2NvcHkvdm9pZGNyYWNrL1JvZ3VlSGV4YWdvblR5cGVzXCI7XHJcbmltcG9ydCBUdXJtdGFibGUgZnJvbSBcIi4uLy4uL1R1cm50YWJsZS9UdXJtdGFibGVcIjtcclxuXHJcblxyXG5jb25zdCB7Y2NjbGFzcywgcHJvcGVydHl9ID0gY2MuX2RlY29yYXRvcjtcclxuXHJcbkBjY2NsYXNzXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEdhbWVMb3NlIGV4dGVuZHMgVUlDb21wb25lbnQge1xyXG5cclxuICAgIG9uRW5hYmxlKClcclxuICAgIHtcclxuICAgICAgICB0aGlzLmluaXRVaSgpO1xyXG4gICAgICAgIEdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuc291bmRfbWFuYWdlci5wbGF5U291bmQoU291bmRJbmRleC5ZWF9Mb3NlKTtcclxuICAgICAgICAvL01vbnN0ZXJEYXRhTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNhdmVBbGxLaWxsRW5lbXkoKTsgICAgICAgIFxyXG4gICAgfVxyXG5cclxuICAgIGluaXRVaSgpXHJcbiAgICB7XHJcbiAgICAgICAgLy/lhbPljaHlrZfkvZNcclxuICAgICAgICBsZXQgbGFiZWxMZXZlbD10aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoJ2xhYmVsX2xldmVsJyk7XHJcbiAgICAgICAgbGV0IGJ0blJlcGxheT10aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoJ2J0blJlcGxheScpO1xyXG4gICAgICAgIHN3aXRjaChHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLmN1cl9nYW1lX21vZGUpe1xyXG4gICAgICAgICAgICBjYXNlIEdhbWVNb2RlLk1haW46e1xyXG4gICAgICAgICAgICAgICAgYnRuUmVwbGF5LmFjdGl2ZT10cnVlO1xyXG4gICAgICAgICAgICAgICAgbGFiZWxMZXZlbC5nZXRDb21wb25lbnQoY2MuTGFiZWwpLnN0cmluZz1HYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLmZpZ2h0aW5nX2luZm8udGl0bGVfbmFtZTtcclxuICAgICAgICAgICAgICAgIEZvbGxvd01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5mb2xsb3dFdmVudChGb2xsb3dfVHlwZS7miJjmlpflpLHotKXlsZXnpLrmrKHmlbBfeOWFsytHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLmZpZ2h0aW5nX2luZm8udGl0bGVfbmFtZSk7XHJcbiAgICAgICAgICAgICAgICBGb2xsb3dNYW5hZ2VyLmdldEluc3RhbmNlKCkuZm9sbG93RXZlbnQoRm9sbG93X1R5cGUu5aSx6LSl5oyR5oiY5YWz5Y2hK0xldmVsTWFuYWdlci5nZXRJbnN0YW5jZSgpLnN0YXJ0X2xldmVsKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2hvd1Jld2FyZCgpO1xyXG4gICAgICAgICAgICB9YnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgR2FtZU1vZGUuVG93ZXI6e1xyXG4gICAgICAgICAgICAgICAgYnRuUmVwbGF5LmFjdGl2ZT1mYWxzZTtcclxuICAgICAgICAgICAgICAgIGxhYmVsTGV2ZWwuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmc9bGFiZWxMZXZlbC5nZXRDb21wb25lbnQoY2MuTGFiZWwpLnN0cmluZz1HYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLmZpZ2h0aW5nX2luZm8udGl0bGVfbmFtZTtcclxuICAgICAgICAgICAgICAgIC8vRm9sbG93TWFuYWdlci5nZXRJbnN0YW5jZSgpLmZvbGxvd0V2ZW50KEZvbGxvd19UeXBlKyhUb3dlck1hbmFnZXIuZ2V0VG93ZXJMZXZlbCgpLTEpKTtcclxuICAgICAgICAgICAgfWJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIEdhbWVNb2RlLkVuZGxlc3M6e1xyXG4gICAgICAgICAgICAgICAgYnRuUmVwbGF5LmFjdGl2ZT1mYWxzZTtcclxuICAgICAgICAgICAgICAgIGxhYmVsTGV2ZWwuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmc9XCJcIitMYW5ndWFnZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRTdHJCeVRleHRJZCg4MDAwMDEpO1xyXG4gICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIH1icmVhaztcclxuICAgICAgICAgICAgY2FzZSBHYW1lTW9kZS5Cb3NzX0NoYWxsZW5nZTp7IFxyXG4gICAgICAgICAgICAgICAgYnRuUmVwbGF5LmFjdGl2ZT1mYWxzZTtcclxuICAgICAgICAgICAgICAgIGxhYmVsTGV2ZWwuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmc9XCJcIitMYW5ndWFnZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRTdHJCeVRleHRJZCg4MjAwMDEpO1xyXG4gICAgICAgICAgICAgICAgLy8gbGFiZWxMZXZlbC5nZXRDb21wb25lbnQoY2MuTGFiZWwpLnN0cmluZz1Cb3NzQ2hhbGxlbmdlTWFuYWdlci5nZXRJbnN0YW5jZSgpLmN1cl9zY29yZStcIlwiO1xyXG4gICAgICAgICAgICAgICAgLy8gRm9sbG93TWFuYWdlci5nZXRJbnN0YW5jZSgpLmZvbGxvd0V2ZW50KEZvbGxvd19UeXBlLuWujOaIkEJPU1PmjJHmiJjmrKHmlbApO1xyXG4gICAgICAgICAgICB9YnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgR2FtZU1vZGUuTWF6ZTp7XHJcbiAgICAgICAgICAgICAgICBsYWJlbExldmVsLmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nPUdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuZmlnaHRpbmdfaW5mby50aXRsZV9uYW1lO1xyXG4gICAgICAgICAgICAgICAgYnRuUmVwbGF5LmFjdGl2ZT1mYWxzZTsgXHJcbiAgICAgICAgICAgICAgICBsZXQgbWFpbldhbGw9V2FsbE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRNYWluV2FsbCgpO1xyXG4gICAgICAgICAgICAgICAgTWF6ZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zZXRNYXplU3ViSHAoKG1haW5XYWxsLmdldE1heEhwKCktbWFpbldhbGwuZ2V0Q3VySHAoKSkvbWFpbldhbGwuZ2V0TWF4SHAoKSk7XHJcbiAgICAgICAgICAgICAgICBsZXQgdHlwZT1Sb2d1ZUhleGFnb25UeXBlc01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRIZXhhZ29uVHlwZShNYXplTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldEZpZ2h0aW5nSWQoKSk7XHJcbiAgICAgICAgICAgICAgICBzd2l0Y2godHlwZSl7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAxOntcclxuICAgICAgICAgICAgICAgICAgICAgICAgRm9sbG93TWFuYWdlci5nZXRJbnN0YW5jZSgpLmZvbGxvd0V2ZW50KEZvbGxvd19UeXBlLnJvZ3Vl546p5rOV5pmu6YCa5YWz5Y2h5oyR5oiY5aSx6LSl55qE5qyh5pWwKTtcclxuICAgICAgICAgICAgICAgICAgICB9YnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAyOntcclxuICAgICAgICAgICAgICAgICAgICAgICAgRm9sbG93TWFuYWdlci5nZXRJbnN0YW5jZSgpLmZvbGxvd0V2ZW50KEZvbGxvd19UeXBlLnJvZ3Vl546p5rOV57K+6Iux5YWz5Y2h5oyR5oiY5aSx6LSl55qE5qyh5pWwKTtcclxuICAgICAgICAgICAgICAgICAgICB9YnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSA2OntcclxuICAgICAgICAgICAgICAgICAgICAgICAgRm9sbG93TWFuYWdlci5nZXRJbnN0YW5jZSgpLmZvbGxvd0V2ZW50KEZvbGxvd19UeXBlLnJvZ3Vl546p5rOVQk9TU+WFs+WNoeaMkeaImOWksei0peeahOasoeaVsCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfWJyZWFrO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9YnJlYWs7XHJcbiAgICAgICAgfSAgICAgICAgXHJcbiAgICB9XHJcblxyXG4gICAgc2hvd1Jld2FyZCgpXHJcbiAgICB7XHJcbiAgICAgICAgc3dpdGNoKEdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuY3VyX2dhbWVfbW9kZSl7XHJcbiAgICAgICAgICAgIGNhc2UgR2FtZU1vZGUuTWFpbjp7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNob3dNYWluUmV3YXJkKCk7XHJcbiAgICAgICAgICAgIH1icmVhaztcclxuICAgICAgICAgICAgY2FzZSBHYW1lTW9kZS5Ub3dlcjp7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNob3dUb3dlclJld2FyZCgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHNob3dNYWluUmV3YXJkKCl7XHJcbiAgICAgICAgbGV0IHN0YXJ0TGV2ZWw9TGV2ZWxNYW5hZ2VyLmdldEluc3RhbmNlKCkuc3RhcnRfbGV2ZWw7XHJcbiAgICAgICAgLy9sZXQgZ209R2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKTtcclxuICAgICAgICAvL2xldCBzY3JvbGxWaWV3PXRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZSgncmV3YXJkUm9vdCcpLmdldENoaWxkQnlOYW1lKCdwcm9wc1Njcm9sbFZpZXcnKTtcclxuICAgICAgICAvL2xldCBjb250ZW50PXNjcm9sbFZpZXcuZ2V0Q29tcG9uZW50KGNjLlNjcm9sbFZpZXcpLmNvbnRlbnQ7XHJcbiAgICAgICAgbGV0IHBlcj1Nb25zdGVyTWFuYWdlci5nZXRJbnN0YW5jZSgpLmtpbGxlZF9tb25zdGVyX251bS9Nb25zdGVyTWFuYWdlci5nZXRJbnN0YW5jZSgpLnRvdGFsX21vbnN0ZXJfbnVtO1xyXG4gICAgICAgIGxldCByZXdhcmRDb2luPU1hdGgucm91bmQoTWlzc2lvbkxldmVsTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldFBhc3NSZXdhcmRfQ29pbihzdGFydExldmVsKSpwZXIpO1xyXG4gICAgICAgIGxldCByZD1uZXcgUmV3YXJkRGF0YSgpO1xyXG4gICAgICAgIHJkLnJld2FyZF9pZD1Qcm9wSWQuQ29pbjtcclxuICAgICAgICByZC5yZXdhcmRfbnVtPXJld2FyZENvaW47XHJcbiAgICAgICAgLy8gbGV0IGl0ZW09Z20uYm94X2pzb25fZGF0YS5jcmVhdGVCb3hJdGVtKHJkLnJld2FyZF9pZCxyZC5yZXdhcmRfbnVtKTtcclxuICAgICAgICAvLyBjb250ZW50LmFkZENoaWxkKGl0ZW0pO1xyXG4gICAgICAgIFByb3BNYW5hZ2VyLmdldEluc3RhbmNlKCkuY2hhbmdlUHJvcE51bShyZC5yZXdhcmRfaWQscmQucmV3YXJkX251bSk7ICAgICAgICBcclxuICAgICAgICB0aGlzLmNoZWNrVHV0b3JhaWxzKCk7XHJcbiAgICB9XHJcblxyXG4gICAgc2hvd1Rvd2VyUmV3YXJkKCl7XHJcbiAgICAgICAgLy8gbGV0IGdtPUdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCk7XHJcbiAgICAgICAgLy8gbGV0IHNjcm9sbFZpZXc9dGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKCdyZXdhcmRSb290JykuZ2V0Q2hpbGRCeU5hbWUoJ3Byb3BzU2Nyb2xsVmlldycpO1xyXG4gICAgICAgIC8vIGxldCBjb250ZW50PXNjcm9sbFZpZXcuZ2V0Q29tcG9uZW50KGNjLlNjcm9sbFZpZXcpLmNvbnRlbnQ7XHJcbiAgICAgICAgLy8gbGV0IHJld2FyZENvaW49MTAwO1xyXG4gICAgICAgIC8vIGxldCByZD1uZXcgUmV3YXJkRGF0YSgpO1xyXG4gICAgICAgIC8vIHJkLnJld2FyZF9pZD0xO1xyXG4gICAgICAgIC8vIHJkLnJld2FyZF9udW09cmV3YXJkQ29pbjtcclxuICAgICAgICAvLyBsZXQgaXRlbT1nbS5ib3hfanNvbl9kYXRhLmNyZWF0ZUJveEl0ZW0ocmQucmV3YXJkX2lkLHJkLnJld2FyZF9udW0pO1xyXG4gICAgICAgIC8vIGNvbnRlbnQuYWRkQ2hpbGQoaXRlbSk7XHJcbiAgICAgICAgLy8gZ20uYm94X2pzb25fZGF0YS5nZXRSZXdhcmRCeWlkKHJkLnJld2FyZF9pZCxyZC5yZXdhcmRfbnVtKTtcclxuICAgICAgICAvL0FkTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNob3dJbnRlcnN0aXRpYWwoJycpOyAgICAgICAgXHJcbiAgICB9XHJcblxyXG4gICAgY2hlY2tUdXRvcmFpbHMoKXtcclxuICAgICAgICBpZihHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLmN1cl9nYW1lX21vZGU9PUdhbWVNb2RlLk1haW4pXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBpZihUdXRvcmFpbHNNYW5hZ2VyLmdldEluc3RhbmNlKCkuaXNTaG93VHV0b3JpYWxzKDMwMSkpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIFByb3BNYW5hZ2VyLmdldEluc3RhbmNlKCkuY2hhbmdlUHJvcE51bShQcm9wSWQuQ29pbiwxMDApO1xyXG4gICAgICAgICAgICAgICAgVHV0b3JhaWxzTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNob3dUdXRvcmlhbHMoMzAxLCgpPT57XHJcbiAgICAgICAgICAgICAgICAgICAgVHV0b3JhaWxzTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNhdmVUdXRvcmlhbHMoMzAxKTsgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgfSwoKT0+e1xyXG4gICAgICAgICAgICAgICAgICAgIFR1dG9yYWlsc01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5pc190dXRvcmFpbHNfc3RhdGU9ZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfWVsc2UgaWYoVHV0b3JhaWxzTWFuYWdlci5nZXRJbnN0YW5jZSgpLmlzU2hvd1R1dG9yaWFscygzMTEpKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBQcm9wTWFuYWdlci5nZXRJbnN0YW5jZSgpLmNoYW5nZVByb3BOdW0oMTAwMDAzLDMwKTtcclxuICAgICAgICAgICAgICAgIFR1dG9yYWlsc01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zaG93VHV0b3JpYWxzKDMxMSwoKT0+e1xyXG4gICAgICAgICAgICAgICAgICAgIFR1dG9yYWlsc01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zYXZlVHV0b3JpYWxzKDMxMSk7XHJcbiAgICAgICAgICAgICAgICB9LCgpPT57XHJcbiAgICAgICAgICAgICAgICAgICAgVHV0b3JhaWxzTWFuYWdlci5nZXRJbnN0YW5jZSgpLmlzX3R1dG9yYWlsc19zdGF0ZT1mYWxzZTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9ZWxzZVxyXG4gICAgICAgICAgICBpZihUdXRvcmFpbHNNYW5hZ2VyLmdldEluc3RhbmNlKCkuaXNTaG93VHV0b3JpYWxzKDMwMSk9PWZhbHNlJiZUdXRvcmFpbHNNYW5hZ2VyLmdldEluc3RhbmNlKCkuaXNTaG93VHV0b3JpYWxzKDMxMSk9PWZhbHNlKXtcclxuICAgICAgICAgICAgICAgIGlmKFR1dG9yYWlsc01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5pc1Nob3dUdXRvcmlhbHMoMzMxKSl7XHJcbiAgICAgICAgICAgICAgICAgICAgVHV0b3JhaWxzTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNob3dUdXRvcmlhbHMoMzMxLCgpPT57XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFR1dG9yYWlsc01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zYXZlVHV0b3JpYWxzKDMzMSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSwoKT0+e1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZihQYXlNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0UGF5TnVtKCdjMzAxJyk8PTApe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gVUlNYW5hZ2VyLmdldEluc3RhbmNlKCkuc2hvd1VpRGlhbG9nKFVJUGF0aC5GaXJzdENoYXJnZSxVSUxheWVyTGV2ZWwuT25lLHtvbkNvbXBsZXRlZDoodWlOb2RlKT0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgICB1aU5vZGUuZ2V0Q29tcG9uZW50KFBheUZpcnN0Q2hhcmdlVWkpLmluaXQoe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgICBvbkNsb3NlOigpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyB9LH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIH0gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcblxyXG4gICAgY2xpY2tCdG5Ib21lKClcclxuICAgIHsgICAgICAgIFxyXG4gICAgICAgIEZvbGxvd01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5mb2xsb3dFdmVudChGb2xsb3dfVHlwZS7lpLHotKXpobVf5Li76aG15oyJ6ZKu54K55Ye75qyh5pWwKTtcclxuICAgICAgICBHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNvdW5kX21hbmFnZXIucGxheVNvdW5kKFNvdW5kSW5kZXguY2xpY2spO1xyXG4gICAgICAgIHN3aXRjaChHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLmN1cl9nYW1lX21vZGUpe1xyXG4gICAgICAgICAgICBjYXNlIEdhbWVNb2RlLk1haW46eyAgICAgXHJcbiAgICAgICAgICAgICAgICBHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdhbWVfdG9faG9tZT1Hb19UeXBlLk1haW47XHJcbiAgICAgICAgICAgICAgICBHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLmJhY2tUb0hvbWUoKTsgICAgICAgXHJcbiAgICAgICAgICAgIH1icmVhaztcclxuICAgICAgICAgICAgY2FzZSBHYW1lTW9kZS5NYXplOntcclxuICAgICAgICAgICAgICAgIEdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2FtZV90b19ob21lPUdvX1R5cGUuQWN0aXZpdHlfTWF6ZV9sb3NlO1xyXG4gICAgICAgICAgICAgICAgR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5iYWNrVG9Ib21lKCk7XHJcbiAgICAgICAgICAgIH1icmVhaztcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgY2xpY2tCdG5HbyhidG4saW5kZXhTdHI6c3RyaW5nKVxyXG4gICAge1xyXG4gICAgICAgIEdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuc291bmRfbWFuYWdlci5wbGF5U291bmQoU291bmRJbmRleC5jbGljayk7XHJcbiAgICAgICAgbGV0IGdvVHlwZT1wYXJzZUludChpbmRleFN0cik7XHJcbiAgICAgICAgaWYoZ29UeXBlPT1Hb19UeXBlLlBldExpc3Qpe1xyXG4gICAgICAgIFxyXG4gICAgICAgICAgICBpZihGdW5jdGlvbkRlZmluaXRpb25NYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0SXNVbmxvY2tJbmRleChCdG5fSW5kZXguQnRuX1BldCk9PWZhbHNlKXtcclxuICAgICAgICAgICAgICAgIGxldCB0eXBlPUZ1bmN0aW9uRGVmaW5pdGlvbk1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRVbmxvY2tDb25kaXRpb25UeXBlKEZ1bmNUeXBlLkNob25nV3VYaVRvbmcpXHJcbiAgICAgICAgICAgICAgICBsZXQgbnVtPUZ1bmN0aW9uRGVmaW5pdGlvbk1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRVbmxvY2tDb25kaWN0aW9uUGFyYW1ldGVyKEZ1bmNUeXBlLkNob25nV3VYaVRvbmcpXHJcbiAgICAgICAgICAgICAgICBpZih0eXBlPT0xKXtcclxuICAgICAgICAgICAgICAgICAgICBHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNob3dNZXNzYWdlKExhbmd1YWdlTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldFN0ckJ5VGV4dElkKDEwMDA1MSkrXCI6XCIrbnVtKTtcclxuICAgICAgICAgICAgICAgIH1lbHNlIGlmKHR5cGU9PTIpe1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCB0ZXh0U3RyPUxhbmd1YWdlTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldFN0ckJ5VGV4dElkKDEwMDA1Mik7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IG51bXM9TWlzc2lvbkxldmVsTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldExldmVsTmFtZSgobnVtKSlcclxuICAgICAgICAgICAgICAgICAgICBsZXQgc3RyPXRleHRTdHIucmVwbGFjZSgnficsJycrbnVtcylcclxuICAgICAgICAgICAgICAgICAgICBHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNob3dNZXNzYWdlKHN0cik7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgXHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vIGlmKGdvVHlwZT09R29fVHlwZS5BY3Rpdml0eSl7XHJcbiAgICAgICAgLy8gICAgIC8vIGlmKEZ1bmN0aW9uRGVmaW5pdGlvbk1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRJc1VubG9ja0luZGV4KEJ0bl9JbmRleC5CdG5fRnVCZW4pPT1mYWxzZSl7XHJcbiAgICAgICAgLy8gICAgICAgICBsZXQgdHlwZT1GdW5jdGlvbkRlZmluaXRpb25NYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0VW5sb2NrQ29uZGl0aW9uVHlwZShGdW5jVHlwZS5HZVJlbkJvc3MpXHJcbiAgICAgICAgLy8gICAgICAgICBsZXQgbnVtPUZ1bmN0aW9uRGVmaW5pdGlvbk1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRVbmxvY2tDb25kaWN0aW9uUGFyYW1ldGVyKEZ1bmNUeXBlLkdlUmVuQm9zcylcclxuICAgICAgICAvLyAgICAgICAgIGlmKExldmVsTWFuYWdlci5nZXRJbnN0YW5jZSgpLmZpbmlzaF9sZXZlbDxudW0pe1xyXG4gICAgICAgIC8vICAgICAgICAgICAgIGlmKHR5cGU9PTEpe1xyXG4gICAgICAgIC8vICAgICAgICAgICAgICAgICBHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNob3dNZXNzYWdlKExhbmd1YWdlTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldFN0ckJ5VGV4dElkKDEwMDA1MSkrXCI6XCIrbnVtKTtcclxuICAgICAgICAvLyAgICAgICAgICAgICB9ZWxzZSBpZih0eXBlPT0yKXtcclxuICAgICAgICAvLyAgICAgICAgICAgICAgICAgbGV0IHRleHRTdHI9TGFuZ3VhZ2VNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0U3RyQnlUZXh0SWQoMTAwMDUyKTtcclxuICAgICAgICAvLyAgICAgICAgICAgICAgICAgbGV0IG51bXM9TWlzc2lvbkxldmVsTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldExldmVsTmFtZSgobnVtKSlcclxuICAgICAgICAvLyAgICAgICAgICAgICAgICAgbGV0IHN0cj10ZXh0U3RyLnJlcGxhY2UoJ34nLCcnK251bXMpXHJcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgIEdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuc2hvd01lc3NhZ2Uoc3RyKTtcclxuICAgICAgICAvLyAgICAgICAgICAgICB9XHJcbiAgICAgICAgLy8gICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIC8vICAgICAgICAgfVxyXG4gICAgICAgIC8vICAgICAgICAgLy8gbGV0IHRleHRTdHI9TGFuZ3VhZ2VNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0U3RyQnlUZXh0SWQoMTAwMDUyKTtcclxuICAgICAgICAvLyAgICAgICAgIC8vIGxldCBudW1zPVwiMy0xMFwiLy9NaXNzaW9uTGV2ZWxNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0TGV2ZWxOYW1lKChudW0pKVxyXG4gICAgICAgIC8vICAgICAgICAgLy8gbGV0IHN0cj10ZXh0U3RyLnJlcGxhY2UoJ34nLCcnK251bXMpXHJcbiAgICAgICAgLy8gICAgICAgICAvLyBHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNob3dNZXNzYWdlKHN0cik7XHJcblxyXG4gICAgICAgIC8vICAgICAvLyB9XHJcblxyXG4gICAgICAgIC8vIH1cclxuICAgICAgICBpZihnb1R5cGU9PTEpe1xyXG4gICAgICAgICAgICBGb2xsb3dNYW5hZ2VyLmdldEluc3RhbmNlKCkuZm9sbG93RXZlbnQoRm9sbG93X1R5cGUu5aSx6LSl6aG1X+W8uuWMluWFu+aIkOi3s+i9rOaMiemSrueCueWHu+asoeaVsCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmKGdvVHlwZT09MTApe1xyXG4gICAgICAgICAgICBsZXQgdW09VUlNYW5hZ2VyLmdldEluc3RhbmNlKCk7XHJcbiAgICAgICAgICAgIEZvbGxvd01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5mb2xsb3dFdmVudChGb2xsb3dfVHlwZS7lpLHotKXpobVf6I635Y+W6LWE5rqQ6Lez6L2s5oyJ6ZKu54K55Ye75qyh5pWwKTtcclxuICAgICAgICAgICAgRm9sbG93TWFuYWdlci5nZXRJbnN0YW5jZSgpLmZvbGxvd0V2ZW50KEZvbGxvd19UeXBlLui9rOebmOeahOaJk+W8gOasoeaVsCk7XHJcbiAgICAgICAgICAgIHVtLnNob3dVaURpYWxvZyhVSVBhdGguVHVybnRhYmxlLFVJTGF5ZXJMZXZlbC5PbmUse29uQ29tcGxldGVkOih1aU5vZGUpPT4ge1xyXG4gICAgICAgICAgICAgICAgdWlOb2RlLmdldENvbXBvbmVudChUdXJtdGFibGUpLmluaXRVaSgpXHJcbiAgICAgICAgICAgIH0sfSk7Ly/ovaznm5hcclxuXHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYoZ29UeXBlPT05KXtcclxuICAgICAgICAgICAgRm9sbG93TWFuYWdlci5nZXRJbnN0YW5jZSgpLmZvbGxvd0V2ZW50KEZvbGxvd19UeXBlLuWksei0pemhtV/liY3lvoDllYbln47ot7PovazmjInpkq7ngrnlh7vmrKHmlbApO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvLyBjb25zb2xlLmxvZyhcIl9fX19fX19fdHlwZTFcIixnb1R5cGUpXHJcbiAgICAgICAgR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nYW1lX3RvX2hvbWU9Z29UeXBlO1xyXG4gICAgICAgIEdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuYmFja1RvSG9tZSgpO1xyXG4gICAgfVxyXG5cclxuICAgIGNsaWNrQnRuUmVwbGF5KClcclxuICAgIHtcclxuICAgICAgICBGb2xsb3dNYW5hZ2VyLmdldEluc3RhbmNlKCkuZm9sbG93RXZlbnQoRm9sbG93X1R5cGUu5aSx6LSl6aG1X+mHjeaWsOaMkeaImOaMiemSrueCueWHu+asoeaVsCk7XHJcbiAgICAgICAgR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zb3VuZF9tYW5hZ2VyLnBsYXlTb3VuZChTb3VuZEluZGV4LmNsaWNrKTsgICAgICAgIFxyXG4gICAgICAgIGNjLmRpcmVjdG9yLmxvYWRTY2VuZShHYW1lU2NlbmUuZ2FtZSk7XHJcbiAgICB9XHJcblxyXG4gICAgY2xpY2tCdG5Sb2xlKCl7XHJcbiAgICAgICAgR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zb3VuZF9tYW5hZ2VyLnBsYXlTb3VuZChTb3VuZEluZGV4LmNsaWNrKTtcclxuICAgICAgICBHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLmJhY2tUb0hvbWUoKTtcclxuICAgIH1cclxuXHJcbiAgICBjbGlja0J0bk9rKCl7XHJcbiAgICAgICAgR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zb3VuZF9tYW5hZ2VyLnBsYXlTb3VuZChTb3VuZEluZGV4LmNsaWNrKTtcclxuICAgICAgICBHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdhbWVfdG9faG9tZT1Hb19UeXBlLkFjdGl2aXR5O1xyXG4gICAgICAgIGlmKEdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuY3VyX2dhbWVfbW9kZT09R2FtZU1vZGUuVG93ZXIpe1xyXG4gICAgICAgICAgICBUb3dlck1hbmFnZXIuaXNfc2hvd190b3dlcj10cnVlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLmJhY2tUb0hvbWUoKTtcclxuICAgIH1cclxuXHJcbiAgICBjbGlja0J0blN0YXRzKCl7XHJcbiAgICAgICAgR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zb3VuZF9tYW5hZ2VyLnBsYXlTb3VuZChTb3VuZEluZGV4LmNsaWNrKTtcclxuICAgICAgICBVSU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zaG93RGFtYWdlU3RhdHNVaSgpO1xyXG4gICAgfVxyXG59XHJcbiJdfQ==