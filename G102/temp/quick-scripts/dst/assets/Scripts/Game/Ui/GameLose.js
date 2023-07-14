
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
var PayFirstChargeUi_1 = require("../../Payment/PayFirstChargeUi");
var UIConfig_1 = require("../../UI/UIConfig");
var PayManager_1 = require("../../Payment/PayManager");
var RogueHexagonTypes_1 = require("../../copy/voidcrack/RogueHexagonTypes");
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
                            UIManager_1.UIManager.getInstance().showUiDialog(UIConfig_1.UIPath.FirstCharge, UIConfig_1.UILayerLevel.One, { onCompleted: function (uiNode) {
                                    uiNode.getComponent(PayFirstChargeUi_1.default).init({
                                        onClose: function () {
                                        }
                                    });
                                }, });
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
        if (goType == Constants_1.Go_Type.Activity) {
            // if(FunctionDefinitionManager.getInstance().getIsUnlockIndex(Btn_Index.Btn_FuBen)==false){
            var type = FunctionDefinition_1.FunctionDefinitionManager.getInstance().getUnlockConditionType(Constants_1.FuncType.GeRenBoss);
            var num = FunctionDefinition_1.FunctionDefinitionManager.getInstance().getUnlockCondictionParameter(Constants_1.FuncType.GeRenBoss);
            if (LevelManager_1.LevelManager.getInstance().finish_level < num) {
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
            // let textStr=LanguageManager.getInstance().getStrByTextId(100052);
            // let nums="3-10"//MissionLevelManager.getInstance().getLevelName((num))
            // let str=textStr.replace('~',''+nums)
            // GameManager.getInstance().showMessage(str);
            // }
        }
        if (goType == 1) {
            FollowManager_1.default.getInstance().followEvent(FollowConstants_1.Follow_Type.失败页_强化养成跳转按钮点击次数);
        }
        if (goType == 10) {
            FollowManager_1.default.getInstance().followEvent(FollowConstants_1.Follow_Type.失败页_获取资源跳转按钮点击次数);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0c1xcR2FtZVxcVWlcXEdhbWVMb3NlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUNBLDZDQUErRjtBQUUvRixpREFBNEM7QUFDNUMsOERBQTBEO0FBQzFELHlEQUF3RDtBQUN4RCx5REFBK0Q7QUFDL0QsdUVBQWtFO0FBQ2xFLG1FQUE4RDtBQUM5RCx1RUFBa0U7QUFDbEUsNkRBQXdEO0FBQ3hELHlEQUFvRDtBQUNwRCxxRUFBZ0U7QUFDaEUsZ0RBQStDO0FBQy9DLG9EQUErQztBQUMvQyxzREFBcUQ7QUFDckQsb0RBQStDO0FBQy9DLCtEQUEwRDtBQUMxRCxzREFBcUQ7QUFDckQsd0VBQThFO0FBQzlFLHNEQUFpRDtBQUNqRCxtRUFBOEQ7QUFFOUQsOENBQXlEO0FBQ3pELHVEQUFzRDtBQUN0RCw0RUFBa0Y7QUFHNUUsSUFBQSxLQUFzQixFQUFFLENBQUMsVUFBVSxFQUFsQyxPQUFPLGFBQUEsRUFBRSxRQUFRLGNBQWlCLENBQUM7QUFHMUM7SUFBc0MsNEJBQVc7SUFBakQ7O0lBaVBBLENBQUM7SUEvT0csMkJBQVEsR0FBUjtRQUVJLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQztRQUNkLHFCQUFXLENBQUMsV0FBVyxFQUFFLENBQUMsYUFBYSxDQUFDLFNBQVMsQ0FBQywyQkFBVSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQ3RFLDhEQUE4RDtJQUNsRSxDQUFDO0lBRUQseUJBQU0sR0FBTjtRQUVJLE1BQU07UUFDTixJQUFJLFVBQVUsR0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxhQUFhLENBQUMsQ0FBQztRQUN2RCxJQUFJLFNBQVMsR0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxXQUFXLENBQUMsQ0FBQztRQUNwRCxRQUFPLHFCQUFXLENBQUMsV0FBVyxFQUFFLENBQUMsYUFBYSxFQUFDO1lBQzNDLEtBQUssb0JBQVEsQ0FB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QUFXLEVBQUUsQ0FBQyxpQkFBaUIsRUFBRSxDQUFDO0lBQ2hELENBQUM7SUFoUGdCLFFBQVE7UUFENUIsT0FBTztPQUNhLFFBQVEsQ0FpUDVCO0lBQUQsZUFBQztDQWpQRCxBQWlQQyxDQWpQcUMscUJBQVcsR0FpUGhEO2tCQWpQb0IsUUFBUSIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbIlxyXG5pbXBvcnQgeyBCdG5fSW5kZXgsIEZ1bmNUeXBlLCBHYW1lTW9kZSwgR2FtZVNjZW5lLCBHYW1lU3RhdGUsIEdvX1R5cGUgfSBmcm9tIFwiLi4vLi4vQ29uc3RhbnRzXCI7XHJcbmltcG9ydCB7IE1vbnN0ZXJEYXRhTWFuYWdlciB9IGZyb20gXCIuLi8uLi9Nb25zdGVyL0RhdGEvTW9uc3RlckRhdGFNYW5hZ2VyXCI7XHJcbmltcG9ydCBHYW1lTWFuYWdlciBmcm9tIFwiLi4vLi4vR2FtZU1hbmFnZXJcIjtcclxuaW1wb3J0IHsgUmV3YXJkRGF0YSB9IGZyb20gXCIuLi8uLi9Kc29uRGF0YS9MZXZlbEpzb25EYXRhXCI7XHJcbmltcG9ydCB7IExldmVsTWFuYWdlciB9IGZyb20gXCIuLi8uLi9MZXZlbC9MZXZlbE1hbmFnZXJcIjtcclxuaW1wb3J0IHsgTWlzc2lvbkxldmVsTWFuYWdlciB9IGZyb20gXCIuLi8uLi9MZXZlbC9NaXNzaW9uTGV2ZWxcIjtcclxuaW1wb3J0IHsgRm9sbG93X1R5cGUgfSBmcm9tIFwiLi4vLi4vbXVsdGlMYW5ndWFnZS9Gb2xsb3dDb25zdGFudHNcIjtcclxuaW1wb3J0IEZvbGxvd01hbmFnZXIgZnJvbSBcIi4uLy4uL211bHRpTGFuZ3VhZ2UvRm9sbG93TWFuYWdlclwiO1xyXG5pbXBvcnQgTGFuZ3VhZ2VNYW5hZ2VyIGZyb20gXCIuLi8uLi9tdWx0aUxhbmd1YWdlL0xhbmd1YWdlTWFuYWdlclwiO1xyXG5pbXBvcnQgeyBTb3VuZEluZGV4IH0gZnJvbSBcIi4uLy4uL1NvdW5kL0F1ZGlvQ29uc3RhbnRzXCI7XHJcbmltcG9ydCBUb3dlck1hbmFnZXIgZnJvbSBcIi4uLy4uL1Rvd2VyL1Rvd2VyTWFuYWdlclwiO1xyXG5pbXBvcnQgVHV0b3JhaWxzTWFuYWdlciBmcm9tIFwiLi4vLi4vVHV0b3JpYWxzL1R1dG9yYWlsc01hbmFnZXJcIjtcclxuaW1wb3J0IHsgVUlNYW5hZ2VyIH0gZnJvbSBcIi4uLy4uL1VJL1VJTWFuYWdlclwiO1xyXG5pbXBvcnQgVUlDb21wb25lbnQgZnJvbSBcIi4uLy4uL1VJL1VJQ29tcG9uZW50XCI7XHJcbmltcG9ydCB7IFByb3BNYW5hZ2VyIH0gZnJvbSBcIi4uLy4uL1Byb3AvUHJvcE1hbmFnZXJcIjtcclxuaW1wb3J0IHsgUHJvcElkIH0gZnJvbSBcIi4uLy4uL1Byb3AvUHJvcENvbmZpZ1wiO1xyXG5pbXBvcnQgTW9uc3Rlck1hbmFnZXIgZnJvbSBcIi4uLy4uL01vbnN0ZXIvTW9uc3Rlck1hbmFnZXJcIjtcclxuaW1wb3J0IHsgTWF6ZU1hbmFnZXIgfSBmcm9tIFwiLi4vLi4vTWF6ZS9NYXplTWFuYWdlclwiO1xyXG5pbXBvcnQgeyBGdW5jdGlvbkRlZmluaXRpb25NYW5hZ2VyIH0gZnJvbSBcIi4uLy4uL0pzb25EYXRhL0Z1bmN0aW9uRGVmaW5pdGlvblwiO1xyXG5pbXBvcnQgV2FsbE1hbmFnZXIgZnJvbSBcIi4uLy4uL1dhbGwvV2FsbE1hbmFnZXJcIjtcclxuaW1wb3J0IFBheUZpcnN0Q2hhcmdlVWkgZnJvbSBcIi4uLy4uL1BheW1lbnQvUGF5Rmlyc3RDaGFyZ2VVaVwiO1xyXG5pbXBvcnQgTWFpblVpIGZyb20gXCIuLi8uLi9VSS9ob21lL01haW5VaVwiO1xyXG5pbXBvcnQgeyBVSVBhdGgsIFVJTGF5ZXJMZXZlbCB9IGZyb20gXCIuLi8uLi9VSS9VSUNvbmZpZ1wiO1xyXG5pbXBvcnQgeyBQYXlNYW5hZ2VyIH0gZnJvbSBcIi4uLy4uL1BheW1lbnQvUGF5TWFuYWdlclwiO1xyXG5pbXBvcnQgeyBSb2d1ZUhleGFnb25UeXBlc01hbmFnZXIgfSBmcm9tIFwiLi4vLi4vY29weS92b2lkY3JhY2svUm9ndWVIZXhhZ29uVHlwZXNcIjtcclxuXHJcblxyXG5jb25zdCB7Y2NjbGFzcywgcHJvcGVydHl9ID0gY2MuX2RlY29yYXRvcjtcclxuXHJcbkBjY2NsYXNzXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEdhbWVMb3NlIGV4dGVuZHMgVUlDb21wb25lbnQge1xyXG5cclxuICAgIG9uRW5hYmxlKClcclxuICAgIHtcclxuICAgICAgICB0aGlzLmluaXRVaSgpO1xyXG4gICAgICAgIEdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuc291bmRfbWFuYWdlci5wbGF5U291bmQoU291bmRJbmRleC5ZWF9Mb3NlKTtcclxuICAgICAgICAvL01vbnN0ZXJEYXRhTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNhdmVBbGxLaWxsRW5lbXkoKTsgICAgICAgIFxyXG4gICAgfVxyXG5cclxuICAgIGluaXRVaSgpXHJcbiAgICB7XHJcbiAgICAgICAgLy/lhbPljaHlrZfkvZNcclxuICAgICAgICBsZXQgbGFiZWxMZXZlbD10aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoJ2xhYmVsX2xldmVsJyk7XHJcbiAgICAgICAgbGV0IGJ0blJlcGxheT10aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoJ2J0blJlcGxheScpO1xyXG4gICAgICAgIHN3aXRjaChHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLmN1cl9nYW1lX21vZGUpe1xyXG4gICAgICAgICAgICBjYXNlIEdhbWVNb2RlLk1haW46e1xyXG4gICAgICAgICAgICAgICAgYnRuUmVwbGF5LmFjdGl2ZT10cnVlO1xyXG4gICAgICAgICAgICAgICAgbGFiZWxMZXZlbC5nZXRDb21wb25lbnQoY2MuTGFiZWwpLnN0cmluZz1HYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLmZpZ2h0aW5nX2luZm8udGl0bGVfbmFtZTtcclxuICAgICAgICAgICAgICAgIEZvbGxvd01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5mb2xsb3dFdmVudChGb2xsb3dfVHlwZS7miJjmlpflpLHotKXlsZXnpLrmrKHmlbBfeOWFsytHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLmZpZ2h0aW5nX2luZm8udGl0bGVfbmFtZSk7XHJcbiAgICAgICAgICAgICAgICBGb2xsb3dNYW5hZ2VyLmdldEluc3RhbmNlKCkuZm9sbG93RXZlbnQoRm9sbG93X1R5cGUu5aSx6LSl5oyR5oiY5YWz5Y2hK0xldmVsTWFuYWdlci5nZXRJbnN0YW5jZSgpLnN0YXJ0X2xldmVsKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2hvd1Jld2FyZCgpO1xyXG4gICAgICAgICAgICB9YnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgR2FtZU1vZGUuVG93ZXI6e1xyXG4gICAgICAgICAgICAgICAgYnRuUmVwbGF5LmFjdGl2ZT1mYWxzZTtcclxuICAgICAgICAgICAgICAgIGxhYmVsTGV2ZWwuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmc9bGFiZWxMZXZlbC5nZXRDb21wb25lbnQoY2MuTGFiZWwpLnN0cmluZz1HYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLmZpZ2h0aW5nX2luZm8udGl0bGVfbmFtZTtcclxuICAgICAgICAgICAgICAgIC8vRm9sbG93TWFuYWdlci5nZXRJbnN0YW5jZSgpLmZvbGxvd0V2ZW50KEZvbGxvd19UeXBlKyhUb3dlck1hbmFnZXIuZ2V0VG93ZXJMZXZlbCgpLTEpKTtcclxuICAgICAgICAgICAgfWJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIEdhbWVNb2RlLkVuZGxlc3M6e1xyXG4gICAgICAgICAgICAgICAgYnRuUmVwbGF5LmFjdGl2ZT1mYWxzZTtcclxuICAgICAgICAgICAgICAgIGxhYmVsTGV2ZWwuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmc9XCJcIitMYW5ndWFnZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRTdHJCeVRleHRJZCg4MDAwMDEpO1xyXG4gICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIH1icmVhaztcclxuICAgICAgICAgICAgY2FzZSBHYW1lTW9kZS5Cb3NzX0NoYWxsZW5nZTp7IFxyXG4gICAgICAgICAgICAgICAgYnRuUmVwbGF5LmFjdGl2ZT1mYWxzZTtcclxuICAgICAgICAgICAgICAgIGxhYmVsTGV2ZWwuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmc9XCJcIitMYW5ndWFnZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRTdHJCeVRleHRJZCg4MjAwMDEpO1xyXG4gICAgICAgICAgICAgICAgLy8gbGFiZWxMZXZlbC5nZXRDb21wb25lbnQoY2MuTGFiZWwpLnN0cmluZz1Cb3NzQ2hhbGxlbmdlTWFuYWdlci5nZXRJbnN0YW5jZSgpLmN1cl9zY29yZStcIlwiO1xyXG4gICAgICAgICAgICAgICAgLy8gRm9sbG93TWFuYWdlci5nZXRJbnN0YW5jZSgpLmZvbGxvd0V2ZW50KEZvbGxvd19UeXBlLuWujOaIkEJPU1PmjJHmiJjmrKHmlbApO1xyXG4gICAgICAgICAgICB9YnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgR2FtZU1vZGUuTWF6ZTp7XHJcbiAgICAgICAgICAgICAgICBsYWJlbExldmVsLmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nPUdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuZmlnaHRpbmdfaW5mby50aXRsZV9uYW1lO1xyXG4gICAgICAgICAgICAgICAgYnRuUmVwbGF5LmFjdGl2ZT1mYWxzZTsgXHJcbiAgICAgICAgICAgICAgICBsZXQgbWFpbldhbGw9V2FsbE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRNYWluV2FsbCgpO1xyXG4gICAgICAgICAgICAgICAgTWF6ZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zZXRNYXplU3ViSHAoKG1haW5XYWxsLmdldE1heEhwKCktbWFpbldhbGwuZ2V0Q3VySHAoKSkvbWFpbldhbGwuZ2V0TWF4SHAoKSk7XHJcbiAgICAgICAgICAgICAgICBsZXQgdHlwZT1Sb2d1ZUhleGFnb25UeXBlc01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRIZXhhZ29uVHlwZShNYXplTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldEZpZ2h0aW5nSWQoKSk7XHJcbiAgICAgICAgICAgICAgICBzd2l0Y2godHlwZSl7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAxOntcclxuICAgICAgICAgICAgICAgICAgICAgICAgRm9sbG93TWFuYWdlci5nZXRJbnN0YW5jZSgpLmZvbGxvd0V2ZW50KEZvbGxvd19UeXBlLnJvZ3Vl546p5rOV5pmu6YCa5YWz5Y2h5oyR5oiY5aSx6LSl55qE5qyh5pWwKTtcclxuICAgICAgICAgICAgICAgICAgICB9YnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAyOntcclxuICAgICAgICAgICAgICAgICAgICAgICAgRm9sbG93TWFuYWdlci5nZXRJbnN0YW5jZSgpLmZvbGxvd0V2ZW50KEZvbGxvd19UeXBlLnJvZ3Vl546p5rOV57K+6Iux5YWz5Y2h5oyR5oiY5aSx6LSl55qE5qyh5pWwKTtcclxuICAgICAgICAgICAgICAgICAgICB9YnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSA2OntcclxuICAgICAgICAgICAgICAgICAgICAgICAgRm9sbG93TWFuYWdlci5nZXRJbnN0YW5jZSgpLmZvbGxvd0V2ZW50KEZvbGxvd19UeXBlLnJvZ3Vl546p5rOVQk9TU+WFs+WNoeaMkeaImOWksei0peeahOasoeaVsCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfWJyZWFrO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9YnJlYWs7XHJcbiAgICAgICAgfSAgICAgICAgXHJcbiAgICB9XHJcblxyXG4gICAgc2hvd1Jld2FyZCgpXHJcbiAgICB7XHJcbiAgICAgICAgc3dpdGNoKEdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuY3VyX2dhbWVfbW9kZSl7XHJcbiAgICAgICAgICAgIGNhc2UgR2FtZU1vZGUuTWFpbjp7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNob3dNYWluUmV3YXJkKCk7XHJcbiAgICAgICAgICAgIH1icmVhaztcclxuICAgICAgICAgICAgY2FzZSBHYW1lTW9kZS5Ub3dlcjp7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNob3dUb3dlclJld2FyZCgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHNob3dNYWluUmV3YXJkKCl7XHJcbiAgICAgICAgbGV0IHN0YXJ0TGV2ZWw9TGV2ZWxNYW5hZ2VyLmdldEluc3RhbmNlKCkuc3RhcnRfbGV2ZWw7XHJcbiAgICAgICAgLy9sZXQgZ209R2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKTtcclxuICAgICAgICAvL2xldCBzY3JvbGxWaWV3PXRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZSgncmV3YXJkUm9vdCcpLmdldENoaWxkQnlOYW1lKCdwcm9wc1Njcm9sbFZpZXcnKTtcclxuICAgICAgICAvL2xldCBjb250ZW50PXNjcm9sbFZpZXcuZ2V0Q29tcG9uZW50KGNjLlNjcm9sbFZpZXcpLmNvbnRlbnQ7XHJcbiAgICAgICAgbGV0IHBlcj1Nb25zdGVyTWFuYWdlci5nZXRJbnN0YW5jZSgpLmtpbGxlZF9tb25zdGVyX251bS9Nb25zdGVyTWFuYWdlci5nZXRJbnN0YW5jZSgpLnRvdGFsX21vbnN0ZXJfbnVtO1xyXG4gICAgICAgIGxldCByZXdhcmRDb2luPU1hdGgucm91bmQoTWlzc2lvbkxldmVsTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldFBhc3NSZXdhcmRfQ29pbihzdGFydExldmVsKSpwZXIpO1xyXG4gICAgICAgIGxldCByZD1uZXcgUmV3YXJkRGF0YSgpO1xyXG4gICAgICAgIHJkLnJld2FyZF9pZD1Qcm9wSWQuQ29pbjtcclxuICAgICAgICByZC5yZXdhcmRfbnVtPXJld2FyZENvaW47XHJcbiAgICAgICAgLy8gbGV0IGl0ZW09Z20uYm94X2pzb25fZGF0YS5jcmVhdGVCb3hJdGVtKHJkLnJld2FyZF9pZCxyZC5yZXdhcmRfbnVtKTtcclxuICAgICAgICAvLyBjb250ZW50LmFkZENoaWxkKGl0ZW0pO1xyXG4gICAgICAgIFByb3BNYW5hZ2VyLmdldEluc3RhbmNlKCkuY2hhbmdlUHJvcE51bShyZC5yZXdhcmRfaWQscmQucmV3YXJkX251bSk7ICAgICAgICBcclxuICAgICAgICB0aGlzLmNoZWNrVHV0b3JhaWxzKCk7XHJcbiAgICB9XHJcblxyXG4gICAgc2hvd1Rvd2VyUmV3YXJkKCl7XHJcbiAgICAgICAgLy8gbGV0IGdtPUdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCk7XHJcbiAgICAgICAgLy8gbGV0IHNjcm9sbFZpZXc9dGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKCdyZXdhcmRSb290JykuZ2V0Q2hpbGRCeU5hbWUoJ3Byb3BzU2Nyb2xsVmlldycpO1xyXG4gICAgICAgIC8vIGxldCBjb250ZW50PXNjcm9sbFZpZXcuZ2V0Q29tcG9uZW50KGNjLlNjcm9sbFZpZXcpLmNvbnRlbnQ7XHJcbiAgICAgICAgLy8gbGV0IHJld2FyZENvaW49MTAwO1xyXG4gICAgICAgIC8vIGxldCByZD1uZXcgUmV3YXJkRGF0YSgpO1xyXG4gICAgICAgIC8vIHJkLnJld2FyZF9pZD0xO1xyXG4gICAgICAgIC8vIHJkLnJld2FyZF9udW09cmV3YXJkQ29pbjtcclxuICAgICAgICAvLyBsZXQgaXRlbT1nbS5ib3hfanNvbl9kYXRhLmNyZWF0ZUJveEl0ZW0ocmQucmV3YXJkX2lkLHJkLnJld2FyZF9udW0pO1xyXG4gICAgICAgIC8vIGNvbnRlbnQuYWRkQ2hpbGQoaXRlbSk7XHJcbiAgICAgICAgLy8gZ20uYm94X2pzb25fZGF0YS5nZXRSZXdhcmRCeWlkKHJkLnJld2FyZF9pZCxyZC5yZXdhcmRfbnVtKTtcclxuICAgICAgICAvL0FkTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNob3dJbnRlcnN0aXRpYWwoJycpOyAgICAgICAgXHJcbiAgICB9XHJcblxyXG4gICAgY2hlY2tUdXRvcmFpbHMoKXtcclxuICAgICAgICBpZihHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLmN1cl9nYW1lX21vZGU9PUdhbWVNb2RlLk1haW4pXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBpZihUdXRvcmFpbHNNYW5hZ2VyLmdldEluc3RhbmNlKCkuaXNTaG93VHV0b3JpYWxzKDMwMSkpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIFByb3BNYW5hZ2VyLmdldEluc3RhbmNlKCkuY2hhbmdlUHJvcE51bShQcm9wSWQuQ29pbiwxMDApO1xyXG4gICAgICAgICAgICAgICAgVHV0b3JhaWxzTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNob3dUdXRvcmlhbHMoMzAxLCgpPT57XHJcbiAgICAgICAgICAgICAgICAgICAgVHV0b3JhaWxzTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNhdmVUdXRvcmlhbHMoMzAxKTsgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgfSwoKT0+e1xyXG4gICAgICAgICAgICAgICAgICAgIFR1dG9yYWlsc01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5pc190dXRvcmFpbHNfc3RhdGU9ZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfWVsc2UgaWYoVHV0b3JhaWxzTWFuYWdlci5nZXRJbnN0YW5jZSgpLmlzU2hvd1R1dG9yaWFscygzMTEpKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBQcm9wTWFuYWdlci5nZXRJbnN0YW5jZSgpLmNoYW5nZVByb3BOdW0oMTAwMDAzLDMwKTtcclxuICAgICAgICAgICAgICAgIFR1dG9yYWlsc01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zaG93VHV0b3JpYWxzKDMxMSwoKT0+e1xyXG4gICAgICAgICAgICAgICAgICAgIFR1dG9yYWlsc01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zYXZlVHV0b3JpYWxzKDMxMSk7XHJcbiAgICAgICAgICAgICAgICB9LCgpPT57XHJcbiAgICAgICAgICAgICAgICAgICAgVHV0b3JhaWxzTWFuYWdlci5nZXRJbnN0YW5jZSgpLmlzX3R1dG9yYWlsc19zdGF0ZT1mYWxzZTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9ZWxzZVxyXG4gICAgICAgICAgICBpZihUdXRvcmFpbHNNYW5hZ2VyLmdldEluc3RhbmNlKCkuaXNTaG93VHV0b3JpYWxzKDMwMSk9PWZhbHNlJiZUdXRvcmFpbHNNYW5hZ2VyLmdldEluc3RhbmNlKCkuaXNTaG93VHV0b3JpYWxzKDMxMSk9PWZhbHNlKXtcclxuICAgICAgICAgICAgICAgIGlmKFR1dG9yYWlsc01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5pc1Nob3dUdXRvcmlhbHMoMzMxKSl7XHJcbiAgICAgICAgICAgICAgICAgICAgVHV0b3JhaWxzTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNob3dUdXRvcmlhbHMoMzMxLCgpPT57XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFR1dG9yYWlsc01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zYXZlVHV0b3JpYWxzKDMzMSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSwoKT0+e1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZihQYXlNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0UGF5TnVtKCdjMzAxJyk8PTApe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgVUlNYW5hZ2VyLmdldEluc3RhbmNlKCkuc2hvd1VpRGlhbG9nKFVJUGF0aC5GaXJzdENoYXJnZSxVSUxheWVyTGV2ZWwuT25lLHtvbkNvbXBsZXRlZDoodWlOb2RlKT0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB1aU5vZGUuZ2V0Q29tcG9uZW50KFBheUZpcnN0Q2hhcmdlVWkpLmluaXQoe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbkNsb3NlOigpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIH0gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcblxyXG4gICAgY2xpY2tCdG5Ib21lKClcclxuICAgIHsgICAgICAgIFxyXG4gICAgICAgIEZvbGxvd01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5mb2xsb3dFdmVudChGb2xsb3dfVHlwZS7lpLHotKXpobVf5Li76aG15oyJ6ZKu54K55Ye75qyh5pWwKTtcclxuICAgICAgICBHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNvdW5kX21hbmFnZXIucGxheVNvdW5kKFNvdW5kSW5kZXguY2xpY2spO1xyXG4gICAgICAgIHN3aXRjaChHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLmN1cl9nYW1lX21vZGUpe1xyXG4gICAgICAgICAgICBjYXNlIEdhbWVNb2RlLk1haW46eyAgICAgXHJcbiAgICAgICAgICAgICAgICBHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdhbWVfdG9faG9tZT1Hb19UeXBlLk1haW47XHJcbiAgICAgICAgICAgICAgICBHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLmJhY2tUb0hvbWUoKTsgICAgICAgXHJcbiAgICAgICAgICAgIH1icmVhaztcclxuICAgICAgICAgICAgY2FzZSBHYW1lTW9kZS5NYXplOntcclxuICAgICAgICAgICAgICAgIEdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2FtZV90b19ob21lPUdvX1R5cGUuQWN0aXZpdHlfTWF6ZV9sb3NlO1xyXG4gICAgICAgICAgICAgICAgR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5iYWNrVG9Ib21lKCk7XHJcbiAgICAgICAgICAgIH1icmVhaztcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgY2xpY2tCdG5HbyhidG4saW5kZXhTdHI6c3RyaW5nKVxyXG4gICAge1xyXG4gICAgICAgIEdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuc291bmRfbWFuYWdlci5wbGF5U291bmQoU291bmRJbmRleC5jbGljayk7XHJcbiAgICAgICAgbGV0IGdvVHlwZT1wYXJzZUludChpbmRleFN0cik7XHJcbiAgICAgICAgaWYoZ29UeXBlPT1Hb19UeXBlLlBldExpc3Qpe1xyXG4gICAgICAgIFxyXG4gICAgICAgICAgICBpZihGdW5jdGlvbkRlZmluaXRpb25NYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0SXNVbmxvY2tJbmRleChCdG5fSW5kZXguQnRuX1BldCk9PWZhbHNlKXtcclxuICAgICAgICAgICAgICAgIGxldCB0eXBlPUZ1bmN0aW9uRGVmaW5pdGlvbk1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRVbmxvY2tDb25kaXRpb25UeXBlKEZ1bmNUeXBlLkNob25nV3VYaVRvbmcpXHJcbiAgICAgICAgICAgICAgICBsZXQgbnVtPUZ1bmN0aW9uRGVmaW5pdGlvbk1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRVbmxvY2tDb25kaWN0aW9uUGFyYW1ldGVyKEZ1bmNUeXBlLkNob25nV3VYaVRvbmcpXHJcbiAgICAgICAgICAgICAgICBpZih0eXBlPT0xKXtcclxuICAgICAgICAgICAgICAgICAgICBHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNob3dNZXNzYWdlKExhbmd1YWdlTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldFN0ckJ5VGV4dElkKDEwMDA1MSkrXCI6XCIrbnVtKTtcclxuICAgICAgICAgICAgICAgIH1lbHNlIGlmKHR5cGU9PTIpe1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCB0ZXh0U3RyPUxhbmd1YWdlTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldFN0ckJ5VGV4dElkKDEwMDA1Mik7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IG51bXM9TWlzc2lvbkxldmVsTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldExldmVsTmFtZSgobnVtKSlcclxuICAgICAgICAgICAgICAgICAgICBsZXQgc3RyPXRleHRTdHIucmVwbGFjZSgnficsJycrbnVtcylcclxuICAgICAgICAgICAgICAgICAgICBHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNob3dNZXNzYWdlKHN0cik7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmKGdvVHlwZT09R29fVHlwZS5BY3Rpdml0eSl7XHJcbiAgICAgICAgICAgIC8vIGlmKEZ1bmN0aW9uRGVmaW5pdGlvbk1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRJc1VubG9ja0luZGV4KEJ0bl9JbmRleC5CdG5fRnVCZW4pPT1mYWxzZSl7XHJcbiAgICAgICAgICAgICAgICBsZXQgdHlwZT1GdW5jdGlvbkRlZmluaXRpb25NYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0VW5sb2NrQ29uZGl0aW9uVHlwZShGdW5jVHlwZS5HZVJlbkJvc3MpXHJcbiAgICAgICAgICAgICAgICBsZXQgbnVtPUZ1bmN0aW9uRGVmaW5pdGlvbk1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRVbmxvY2tDb25kaWN0aW9uUGFyYW1ldGVyKEZ1bmNUeXBlLkdlUmVuQm9zcylcclxuICAgICAgICAgICAgICAgIGlmKExldmVsTWFuYWdlci5nZXRJbnN0YW5jZSgpLmZpbmlzaF9sZXZlbDxudW0pe1xyXG4gICAgICAgICAgICAgICAgICAgIGlmKHR5cGU9PTEpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNob3dNZXNzYWdlKExhbmd1YWdlTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldFN0ckJ5VGV4dElkKDEwMDA1MSkrXCI6XCIrbnVtKTtcclxuICAgICAgICAgICAgICAgICAgICB9ZWxzZSBpZih0eXBlPT0yKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHRleHRTdHI9TGFuZ3VhZ2VNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0U3RyQnlUZXh0SWQoMTAwMDUyKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IG51bXM9TWlzc2lvbkxldmVsTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldExldmVsTmFtZSgobnVtKSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHN0cj10ZXh0U3RyLnJlcGxhY2UoJ34nLCcnK251bXMpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIEdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuc2hvd01lc3NhZ2Uoc3RyKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgLy8gbGV0IHRleHRTdHI9TGFuZ3VhZ2VNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0U3RyQnlUZXh0SWQoMTAwMDUyKTtcclxuICAgICAgICAgICAgICAgIC8vIGxldCBudW1zPVwiMy0xMFwiLy9NaXNzaW9uTGV2ZWxNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0TGV2ZWxOYW1lKChudW0pKVxyXG4gICAgICAgICAgICAgICAgLy8gbGV0IHN0cj10ZXh0U3RyLnJlcGxhY2UoJ34nLCcnK251bXMpXHJcbiAgICAgICAgICAgICAgICAvLyBHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNob3dNZXNzYWdlKHN0cik7XHJcblxyXG4gICAgICAgICAgICAvLyB9XHJcblxyXG4gICAgICAgIH1cclxuICAgICAgICBpZihnb1R5cGU9PTEpe1xyXG4gICAgICAgICAgICBGb2xsb3dNYW5hZ2VyLmdldEluc3RhbmNlKCkuZm9sbG93RXZlbnQoRm9sbG93X1R5cGUu5aSx6LSl6aG1X+W8uuWMluWFu+aIkOi3s+i9rOaMiemSrueCueWHu+asoeaVsCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmKGdvVHlwZT09MTApe1xyXG4gICAgICAgICAgICBGb2xsb3dNYW5hZ2VyLmdldEluc3RhbmNlKCkuZm9sbG93RXZlbnQoRm9sbG93X1R5cGUu5aSx6LSl6aG1X+iOt+WPlui1hOa6kOi3s+i9rOaMiemSrueCueWHu+asoeaVsCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmKGdvVHlwZT09OSl7XHJcbiAgICAgICAgICAgIEZvbGxvd01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5mb2xsb3dFdmVudChGb2xsb3dfVHlwZS7lpLHotKXpobVf5YmN5b6A5ZWG5Z+O6Lez6L2s5oyJ6ZKu54K55Ye75qyh5pWwKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy8gY29uc29sZS5sb2coXCJfX19fX19fX3R5cGUxXCIsZ29UeXBlKVxyXG4gICAgICAgIEdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2FtZV90b19ob21lPWdvVHlwZTtcclxuICAgICAgICBHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLmJhY2tUb0hvbWUoKTtcclxuICAgIH1cclxuXHJcbiAgICBjbGlja0J0blJlcGxheSgpXHJcbiAgICB7XHJcbiAgICAgICAgRm9sbG93TWFuYWdlci5nZXRJbnN0YW5jZSgpLmZvbGxvd0V2ZW50KEZvbGxvd19UeXBlLuWksei0pemhtV/ph43mlrDmjJHmiJjmjInpkq7ngrnlh7vmrKHmlbApO1xyXG4gICAgICAgIEdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuc291bmRfbWFuYWdlci5wbGF5U291bmQoU291bmRJbmRleC5jbGljayk7ICAgICAgICBcclxuICAgICAgICBjYy5kaXJlY3Rvci5sb2FkU2NlbmUoR2FtZVNjZW5lLmdhbWUpO1xyXG4gICAgfVxyXG5cclxuICAgIGNsaWNrQnRuUm9sZSgpe1xyXG4gICAgICAgIEdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuc291bmRfbWFuYWdlci5wbGF5U291bmQoU291bmRJbmRleC5jbGljayk7XHJcbiAgICAgICAgR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5iYWNrVG9Ib21lKCk7XHJcbiAgICB9XHJcblxyXG4gICAgY2xpY2tCdG5Paygpe1xyXG4gICAgICAgIEdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuc291bmRfbWFuYWdlci5wbGF5U291bmQoU291bmRJbmRleC5jbGljayk7XHJcbiAgICAgICAgR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nYW1lX3RvX2hvbWU9R29fVHlwZS5BY3Rpdml0eTtcclxuICAgICAgICBpZihHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLmN1cl9nYW1lX21vZGU9PUdhbWVNb2RlLlRvd2VyKXtcclxuICAgICAgICAgICAgVG93ZXJNYW5hZ2VyLmlzX3Nob3dfdG93ZXI9dHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5iYWNrVG9Ib21lKCk7XHJcbiAgICB9XHJcblxyXG4gICAgY2xpY2tCdG5TdGF0cygpe1xyXG4gICAgICAgIEdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuc291bmRfbWFuYWdlci5wbGF5U291bmQoU291bmRJbmRleC5jbGljayk7XHJcbiAgICAgICAgVUlNYW5hZ2VyLmdldEluc3RhbmNlKCkuc2hvd0RhbWFnZVN0YXRzVWkoKTtcclxuICAgIH1cclxufVxyXG4iXX0=