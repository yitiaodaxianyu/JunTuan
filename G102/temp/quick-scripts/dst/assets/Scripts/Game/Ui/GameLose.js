
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0c1xcR2FtZVxcVWlcXEdhbWVMb3NlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUNBLDZDQUErRjtBQUUvRixpREFBNEM7QUFDNUMsOERBQTBEO0FBQzFELHlEQUF3RDtBQUN4RCx5REFBK0Q7QUFDL0QsdUVBQWtFO0FBQ2xFLG1FQUE4RDtBQUM5RCx1RUFBa0U7QUFDbEUsNkRBQXdEO0FBQ3hELHlEQUFvRDtBQUNwRCxxRUFBZ0U7QUFDaEUsZ0RBQStDO0FBQy9DLG9EQUErQztBQUMvQyxzREFBcUQ7QUFDckQsb0RBQStDO0FBQy9DLCtEQUEwRDtBQUMxRCxzREFBcUQ7QUFDckQsd0VBQThFO0FBQzlFLHNEQUFpRDtBQUlqRCx1REFBc0Q7QUFDdEQsNEVBQWtGO0FBRzVFLElBQUEsS0FBc0IsRUFBRSxDQUFDLFVBQVUsRUFBbEMsT0FBTyxhQUFBLEVBQUUsUUFBUSxjQUFpQixDQUFDO0FBRzFDO0lBQXNDLDRCQUFXO0lBQWpEOztJQWlQQSxDQUFDO0lBL09HLDJCQUFRLEdBQVI7UUFFSSxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUM7UUFDZCxxQkFBVyxDQUFDLFdBQVcsRUFBRSxDQUFDLGFBQWEsQ0FBQyxTQUFTLENBQUMsMkJBQVUsQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUN0RSw4REFBOEQ7SUFDbEUsQ0FBQztJQUVELHlCQUFNLEdBQU47UUFFSSxNQUFNO1FBQ04sSUFBSSxVQUFVLEdBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsYUFBYSxDQUFDLENBQUM7UUFDdkQsSUFBSSxTQUFTLEdBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsV0FBVyxDQUFDLENBQUM7UUFDcEQsUUFBTyxxQkFBVyxDQUFDLFdBQVcsRUFBRSxDQUFDLGFBQWEsRUFBQztZQUMzQyxLQUFLLG9CQUFRLENBQUMsSUFBSTtnQkFBQztvQkFDZixTQUFTLENB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XHJcbmltcG9ydCB7IEJ0bl9JbmRleCwgRnVuY1R5cGUsIEdhbWVNb2RlLCBHYW1lU2NlbmUsIEdhbWVTdGF0ZSwgR29fVHlwZSB9IGZyb20gXCIuLi8uLi9Db25zdGFudHNcIjtcclxuaW1wb3J0IHsgTW9uc3RlckRhdGFNYW5hZ2VyIH0gZnJvbSBcIi4uLy4uL01vbnN0ZXIvRGF0YS9Nb25zdGVyRGF0YU1hbmFnZXJcIjtcclxuaW1wb3J0IEdhbWVNYW5hZ2VyIGZyb20gXCIuLi8uLi9HYW1lTWFuYWdlclwiO1xyXG5pbXBvcnQgeyBSZXdhcmREYXRhIH0gZnJvbSBcIi4uLy4uL0pzb25EYXRhL0xldmVsSnNvbkRhdGFcIjtcclxuaW1wb3J0IHsgTGV2ZWxNYW5hZ2VyIH0gZnJvbSBcIi4uLy4uL0xldmVsL0xldmVsTWFuYWdlclwiO1xyXG5pbXBvcnQgeyBNaXNzaW9uTGV2ZWxNYW5hZ2VyIH0gZnJvbSBcIi4uLy4uL0xldmVsL01pc3Npb25MZXZlbFwiO1xyXG5pbXBvcnQgeyBGb2xsb3dfVHlwZSB9IGZyb20gXCIuLi8uLi9tdWx0aUxhbmd1YWdlL0ZvbGxvd0NvbnN0YW50c1wiO1xyXG5pbXBvcnQgRm9sbG93TWFuYWdlciBmcm9tIFwiLi4vLi4vbXVsdGlMYW5ndWFnZS9Gb2xsb3dNYW5hZ2VyXCI7XHJcbmltcG9ydCBMYW5ndWFnZU1hbmFnZXIgZnJvbSBcIi4uLy4uL211bHRpTGFuZ3VhZ2UvTGFuZ3VhZ2VNYW5hZ2VyXCI7XHJcbmltcG9ydCB7IFNvdW5kSW5kZXggfSBmcm9tIFwiLi4vLi4vU291bmQvQXVkaW9Db25zdGFudHNcIjtcclxuaW1wb3J0IFRvd2VyTWFuYWdlciBmcm9tIFwiLi4vLi4vVG93ZXIvVG93ZXJNYW5hZ2VyXCI7XHJcbmltcG9ydCBUdXRvcmFpbHNNYW5hZ2VyIGZyb20gXCIuLi8uLi9UdXRvcmlhbHMvVHV0b3JhaWxzTWFuYWdlclwiO1xyXG5pbXBvcnQgeyBVSU1hbmFnZXIgfSBmcm9tIFwiLi4vLi4vVUkvVUlNYW5hZ2VyXCI7XHJcbmltcG9ydCBVSUNvbXBvbmVudCBmcm9tIFwiLi4vLi4vVUkvVUlDb21wb25lbnRcIjtcclxuaW1wb3J0IHsgUHJvcE1hbmFnZXIgfSBmcm9tIFwiLi4vLi4vUHJvcC9Qcm9wTWFuYWdlclwiO1xyXG5pbXBvcnQgeyBQcm9wSWQgfSBmcm9tIFwiLi4vLi4vUHJvcC9Qcm9wQ29uZmlnXCI7XHJcbmltcG9ydCBNb25zdGVyTWFuYWdlciBmcm9tIFwiLi4vLi4vTW9uc3Rlci9Nb25zdGVyTWFuYWdlclwiO1xyXG5pbXBvcnQgeyBNYXplTWFuYWdlciB9IGZyb20gXCIuLi8uLi9NYXplL01hemVNYW5hZ2VyXCI7XHJcbmltcG9ydCB7IEZ1bmN0aW9uRGVmaW5pdGlvbk1hbmFnZXIgfSBmcm9tIFwiLi4vLi4vSnNvbkRhdGEvRnVuY3Rpb25EZWZpbml0aW9uXCI7XHJcbmltcG9ydCBXYWxsTWFuYWdlciBmcm9tIFwiLi4vLi4vV2FsbC9XYWxsTWFuYWdlclwiO1xyXG5pbXBvcnQgUGF5Rmlyc3RDaGFyZ2VVaSBmcm9tIFwiLi4vLi4vUGF5bWVudC9QYXlGaXJzdENoYXJnZVVpXCI7XHJcbmltcG9ydCBNYWluVWkgZnJvbSBcIi4uLy4uL1VJL2hvbWUvTWFpblVpXCI7XHJcbmltcG9ydCB7IFVJUGF0aCwgVUlMYXllckxldmVsIH0gZnJvbSBcIi4uLy4uL1VJL1VJQ29uZmlnXCI7XHJcbmltcG9ydCB7IFBheU1hbmFnZXIgfSBmcm9tIFwiLi4vLi4vUGF5bWVudC9QYXlNYW5hZ2VyXCI7XHJcbmltcG9ydCB7IFJvZ3VlSGV4YWdvblR5cGVzTWFuYWdlciB9IGZyb20gXCIuLi8uLi9jb3B5L3ZvaWRjcmFjay9Sb2d1ZUhleGFnb25UeXBlc1wiO1xyXG5cclxuXHJcbmNvbnN0IHtjY2NsYXNzLCBwcm9wZXJ0eX0gPSBjYy5fZGVjb3JhdG9yO1xyXG5cclxuQGNjY2xhc3NcclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgR2FtZUxvc2UgZXh0ZW5kcyBVSUNvbXBvbmVudCB7XHJcblxyXG4gICAgb25FbmFibGUoKVxyXG4gICAge1xyXG4gICAgICAgIHRoaXMuaW5pdFVpKCk7XHJcbiAgICAgICAgR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zb3VuZF9tYW5hZ2VyLnBsYXlTb3VuZChTb3VuZEluZGV4LllYX0xvc2UpO1xyXG4gICAgICAgIC8vTW9uc3RlckRhdGFNYW5hZ2VyLmdldEluc3RhbmNlKCkuc2F2ZUFsbEtpbGxFbmVteSgpOyAgICAgICAgXHJcbiAgICB9XHJcblxyXG4gICAgaW5pdFVpKClcclxuICAgIHtcclxuICAgICAgICAvL+WFs+WNoeWtl+S9k1xyXG4gICAgICAgIGxldCBsYWJlbExldmVsPXRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZSgnbGFiZWxfbGV2ZWwnKTtcclxuICAgICAgICBsZXQgYnRuUmVwbGF5PXRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZSgnYnRuUmVwbGF5Jyk7XHJcbiAgICAgICAgc3dpdGNoKEdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuY3VyX2dhbWVfbW9kZSl7XHJcbiAgICAgICAgICAgIGNhc2UgR2FtZU1vZGUuTWFpbjp7XHJcbiAgICAgICAgICAgICAgICBidG5SZXBsYXkuYWN0aXZlPXRydWU7XHJcbiAgICAgICAgICAgICAgICBsYWJlbExldmVsLmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nPUdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuZmlnaHRpbmdfaW5mby50aXRsZV9uYW1lO1xyXG4gICAgICAgICAgICAgICAgRm9sbG93TWFuYWdlci5nZXRJbnN0YW5jZSgpLmZvbGxvd0V2ZW50KEZvbGxvd19UeXBlLuaImOaWl+Wksei0peWxleekuuasoeaVsF945YWzK0dhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuZmlnaHRpbmdfaW5mby50aXRsZV9uYW1lKTtcclxuICAgICAgICAgICAgICAgIEZvbGxvd01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5mb2xsb3dFdmVudChGb2xsb3dfVHlwZS7lpLHotKXmjJHmiJjlhbPljaErTGV2ZWxNYW5hZ2VyLmdldEluc3RhbmNlKCkuc3RhcnRfbGV2ZWwpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zaG93UmV3YXJkKCk7XHJcbiAgICAgICAgICAgIH1icmVhaztcclxuICAgICAgICAgICAgY2FzZSBHYW1lTW9kZS5Ub3dlcjp7XHJcbiAgICAgICAgICAgICAgICBidG5SZXBsYXkuYWN0aXZlPWZhbHNlO1xyXG4gICAgICAgICAgICAgICAgbGFiZWxMZXZlbC5nZXRDb21wb25lbnQoY2MuTGFiZWwpLnN0cmluZz1sYWJlbExldmVsLmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nPUdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuZmlnaHRpbmdfaW5mby50aXRsZV9uYW1lO1xyXG4gICAgICAgICAgICAgICAgLy9Gb2xsb3dNYW5hZ2VyLmdldEluc3RhbmNlKCkuZm9sbG93RXZlbnQoRm9sbG93X1R5cGUrKFRvd2VyTWFuYWdlci5nZXRUb3dlckxldmVsKCktMSkpO1xyXG4gICAgICAgICAgICB9YnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgR2FtZU1vZGUuRW5kbGVzczp7XHJcbiAgICAgICAgICAgICAgICBidG5SZXBsYXkuYWN0aXZlPWZhbHNlO1xyXG4gICAgICAgICAgICAgICAgbGFiZWxMZXZlbC5nZXRDb21wb25lbnQoY2MuTGFiZWwpLnN0cmluZz1cIlwiK0xhbmd1YWdlTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldFN0ckJ5VGV4dElkKDgwMDAwMSk7XHJcbiAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgfWJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIEdhbWVNb2RlLkJvc3NfQ2hhbGxlbmdlOnsgXHJcbiAgICAgICAgICAgICAgICBidG5SZXBsYXkuYWN0aXZlPWZhbHNlO1xyXG4gICAgICAgICAgICAgICAgbGFiZWxMZXZlbC5nZXRDb21wb25lbnQoY2MuTGFiZWwpLnN0cmluZz1cIlwiK0xhbmd1YWdlTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldFN0ckJ5VGV4dElkKDgyMDAwMSk7XHJcbiAgICAgICAgICAgICAgICAvLyBsYWJlbExldmVsLmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nPUJvc3NDaGFsbGVuZ2VNYW5hZ2VyLmdldEluc3RhbmNlKCkuY3VyX3Njb3JlK1wiXCI7XHJcbiAgICAgICAgICAgICAgICAvLyBGb2xsb3dNYW5hZ2VyLmdldEluc3RhbmNlKCkuZm9sbG93RXZlbnQoRm9sbG93X1R5cGUu5a6M5oiQQk9TU+aMkeaImOasoeaVsCk7XHJcbiAgICAgICAgICAgIH1icmVhaztcclxuICAgICAgICAgICAgY2FzZSBHYW1lTW9kZS5NYXplOntcclxuICAgICAgICAgICAgICAgIGxhYmVsTGV2ZWwuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmc9R2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5maWdodGluZ19pbmZvLnRpdGxlX25hbWU7XHJcbiAgICAgICAgICAgICAgICBidG5SZXBsYXkuYWN0aXZlPWZhbHNlOyBcclxuICAgICAgICAgICAgICAgIGxldCBtYWluV2FsbD1XYWxsTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldE1haW5XYWxsKCk7XHJcbiAgICAgICAgICAgICAgICBNYXplTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNldE1hemVTdWJIcCgobWFpbldhbGwuZ2V0TWF4SHAoKS1tYWluV2FsbC5nZXRDdXJIcCgpKS9tYWluV2FsbC5nZXRNYXhIcCgpKTtcclxuICAgICAgICAgICAgICAgIGxldCB0eXBlPVJvZ3VlSGV4YWdvblR5cGVzTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldEhleGFnb25UeXBlKE1hemVNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0RmlnaHRpbmdJZCgpKTtcclxuICAgICAgICAgICAgICAgIHN3aXRjaCh0eXBlKXtcclxuICAgICAgICAgICAgICAgICAgICBjYXNlIDE6e1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBGb2xsb3dNYW5hZ2VyLmdldEluc3RhbmNlKCkuZm9sbG93RXZlbnQoRm9sbG93X1R5cGUucm9ndWXnjqnms5Xmma7pgJrlhbPljaHmjJHmiJjlpLHotKXnmoTmrKHmlbApO1xyXG4gICAgICAgICAgICAgICAgICAgIH1icmVhaztcclxuICAgICAgICAgICAgICAgICAgICBjYXNlIDI6e1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBGb2xsb3dNYW5hZ2VyLmdldEluc3RhbmNlKCkuZm9sbG93RXZlbnQoRm9sbG93X1R5cGUucm9ndWXnjqnms5Xnsr7oi7HlhbPljaHmjJHmiJjlpLHotKXnmoTmrKHmlbApO1xyXG4gICAgICAgICAgICAgICAgICAgIH1icmVhaztcclxuICAgICAgICAgICAgICAgICAgICBjYXNlIDY6e1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBGb2xsb3dNYW5hZ2VyLmdldEluc3RhbmNlKCkuZm9sbG93RXZlbnQoRm9sbG93X1R5cGUucm9ndWXnjqnms5VCT1NT5YWz5Y2h5oyR5oiY5aSx6LSl55qE5qyh5pWwKTtcclxuICAgICAgICAgICAgICAgICAgICB9YnJlYWs7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1icmVhaztcclxuICAgICAgICB9ICAgICAgICBcclxuICAgIH1cclxuXHJcbiAgICBzaG93UmV3YXJkKClcclxuICAgIHtcclxuICAgICAgICBzd2l0Y2goR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5jdXJfZ2FtZV9tb2RlKXtcclxuICAgICAgICAgICAgY2FzZSBHYW1lTW9kZS5NYWluOntcclxuICAgICAgICAgICAgICAgIHRoaXMuc2hvd01haW5SZXdhcmQoKTtcclxuICAgICAgICAgICAgfWJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIEdhbWVNb2RlLlRvd2VyOntcclxuICAgICAgICAgICAgICAgIHRoaXMuc2hvd1Rvd2VyUmV3YXJkKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgc2hvd01haW5SZXdhcmQoKXtcclxuICAgICAgICBsZXQgc3RhcnRMZXZlbD1MZXZlbE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zdGFydF9sZXZlbDtcclxuICAgICAgICAvL2xldCBnbT1HYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpO1xyXG4gICAgICAgIC8vbGV0IHNjcm9sbFZpZXc9dGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKCdyZXdhcmRSb290JykuZ2V0Q2hpbGRCeU5hbWUoJ3Byb3BzU2Nyb2xsVmlldycpO1xyXG4gICAgICAgIC8vbGV0IGNvbnRlbnQ9c2Nyb2xsVmlldy5nZXRDb21wb25lbnQoY2MuU2Nyb2xsVmlldykuY29udGVudDtcclxuICAgICAgICBsZXQgcGVyPU1vbnN0ZXJNYW5hZ2VyLmdldEluc3RhbmNlKCkua2lsbGVkX21vbnN0ZXJfbnVtL01vbnN0ZXJNYW5hZ2VyLmdldEluc3RhbmNlKCkudG90YWxfbW9uc3Rlcl9udW07XHJcbiAgICAgICAgbGV0IHJld2FyZENvaW49TWF0aC5yb3VuZChNaXNzaW9uTGV2ZWxNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0UGFzc1Jld2FyZF9Db2luKHN0YXJ0TGV2ZWwpKnBlcik7XHJcbiAgICAgICAgbGV0IHJkPW5ldyBSZXdhcmREYXRhKCk7XHJcbiAgICAgICAgcmQucmV3YXJkX2lkPVByb3BJZC5Db2luO1xyXG4gICAgICAgIHJkLnJld2FyZF9udW09cmV3YXJkQ29pbjtcclxuICAgICAgICAvLyBsZXQgaXRlbT1nbS5ib3hfanNvbl9kYXRhLmNyZWF0ZUJveEl0ZW0ocmQucmV3YXJkX2lkLHJkLnJld2FyZF9udW0pO1xyXG4gICAgICAgIC8vIGNvbnRlbnQuYWRkQ2hpbGQoaXRlbSk7XHJcbiAgICAgICAgUHJvcE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5jaGFuZ2VQcm9wTnVtKHJkLnJld2FyZF9pZCxyZC5yZXdhcmRfbnVtKTsgICAgICAgIFxyXG4gICAgICAgIHRoaXMuY2hlY2tUdXRvcmFpbHMoKTtcclxuICAgIH1cclxuXHJcbiAgICBzaG93VG93ZXJSZXdhcmQoKXtcclxuICAgICAgICAvLyBsZXQgZ209R2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKTtcclxuICAgICAgICAvLyBsZXQgc2Nyb2xsVmlldz10aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoJ3Jld2FyZFJvb3QnKS5nZXRDaGlsZEJ5TmFtZSgncHJvcHNTY3JvbGxWaWV3Jyk7XHJcbiAgICAgICAgLy8gbGV0IGNvbnRlbnQ9c2Nyb2xsVmlldy5nZXRDb21wb25lbnQoY2MuU2Nyb2xsVmlldykuY29udGVudDtcclxuICAgICAgICAvLyBsZXQgcmV3YXJkQ29pbj0xMDA7XHJcbiAgICAgICAgLy8gbGV0IHJkPW5ldyBSZXdhcmREYXRhKCk7XHJcbiAgICAgICAgLy8gcmQucmV3YXJkX2lkPTE7XHJcbiAgICAgICAgLy8gcmQucmV3YXJkX251bT1yZXdhcmRDb2luO1xyXG4gICAgICAgIC8vIGxldCBpdGVtPWdtLmJveF9qc29uX2RhdGEuY3JlYXRlQm94SXRlbShyZC5yZXdhcmRfaWQscmQucmV3YXJkX251bSk7XHJcbiAgICAgICAgLy8gY29udGVudC5hZGRDaGlsZChpdGVtKTtcclxuICAgICAgICAvLyBnbS5ib3hfanNvbl9kYXRhLmdldFJld2FyZEJ5aWQocmQucmV3YXJkX2lkLHJkLnJld2FyZF9udW0pO1xyXG4gICAgICAgIC8vQWRNYW5hZ2VyLmdldEluc3RhbmNlKCkuc2hvd0ludGVyc3RpdGlhbCgnJyk7ICAgICAgICBcclxuICAgIH1cclxuXHJcbiAgICBjaGVja1R1dG9yYWlscygpe1xyXG4gICAgICAgIGlmKEdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuY3VyX2dhbWVfbW9kZT09R2FtZU1vZGUuTWFpbilcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGlmKFR1dG9yYWlsc01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5pc1Nob3dUdXRvcmlhbHMoMzAxKSlcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgUHJvcE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5jaGFuZ2VQcm9wTnVtKFByb3BJZC5Db2luLDEwMCk7XHJcbiAgICAgICAgICAgICAgICBUdXRvcmFpbHNNYW5hZ2VyLmdldEluc3RhbmNlKCkuc2hvd1R1dG9yaWFscygzMDEsKCk9PntcclxuICAgICAgICAgICAgICAgICAgICBUdXRvcmFpbHNNYW5hZ2VyLmdldEluc3RhbmNlKCkuc2F2ZVR1dG9yaWFscygzMDEpOyAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICB9LCgpPT57XHJcbiAgICAgICAgICAgICAgICAgICAgVHV0b3JhaWxzTWFuYWdlci5nZXRJbnN0YW5jZSgpLmlzX3R1dG9yYWlsc19zdGF0ZT1mYWxzZTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9ZWxzZSBpZihUdXRvcmFpbHNNYW5hZ2VyLmdldEluc3RhbmNlKCkuaXNTaG93VHV0b3JpYWxzKDMxMSkpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIFByb3BNYW5hZ2VyLmdldEluc3RhbmNlKCkuY2hhbmdlUHJvcE51bSgxMDAwMDMsMzApO1xyXG4gICAgICAgICAgICAgICAgVHV0b3JhaWxzTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNob3dUdXRvcmlhbHMoMzExLCgpPT57XHJcbiAgICAgICAgICAgICAgICAgICAgVHV0b3JhaWxzTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNhdmVUdXRvcmlhbHMoMzExKTtcclxuICAgICAgICAgICAgICAgIH0sKCk9PntcclxuICAgICAgICAgICAgICAgICAgICBUdXRvcmFpbHNNYW5hZ2VyLmdldEluc3RhbmNlKCkuaXNfdHV0b3JhaWxzX3N0YXRlPWZhbHNlO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1lbHNlXHJcbiAgICAgICAgICAgIGlmKFR1dG9yYWlsc01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5pc1Nob3dUdXRvcmlhbHMoMzAxKT09ZmFsc2UmJlR1dG9yYWlsc01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5pc1Nob3dUdXRvcmlhbHMoMzExKT09ZmFsc2Upe1xyXG4gICAgICAgICAgICAgICAgaWYoVHV0b3JhaWxzTWFuYWdlci5nZXRJbnN0YW5jZSgpLmlzU2hvd1R1dG9yaWFscygzMzEpKXtcclxuICAgICAgICAgICAgICAgICAgICBUdXRvcmFpbHNNYW5hZ2VyLmdldEluc3RhbmNlKCkuc2hvd1R1dG9yaWFscygzMzEsKCk9PntcclxuICAgICAgICAgICAgICAgICAgICAgICAgVHV0b3JhaWxzTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNhdmVUdXRvcmlhbHMoMzMxKTtcclxuICAgICAgICAgICAgICAgICAgICB9LCgpPT57XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmKFBheU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRQYXlOdW0oJ2MzMDEnKTw9MCl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBVSU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zaG93VWlEaWFsb2coVUlQYXRoLkZpcnN0Q2hhcmdlLFVJTGF5ZXJMZXZlbC5PbmUse29uQ29tcGxldGVkOih1aU5vZGUpPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgIHVpTm9kZS5nZXRDb21wb25lbnQoUGF5Rmlyc3RDaGFyZ2VVaSkuaW5pdCh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgIG9uQ2xvc2U6KCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIH0sfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgfSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuXHJcbiAgICBjbGlja0J0bkhvbWUoKVxyXG4gICAgeyAgICAgICAgXHJcbiAgICAgICAgRm9sbG93TWFuYWdlci5nZXRJbnN0YW5jZSgpLmZvbGxvd0V2ZW50KEZvbGxvd19UeXBlLuWksei0pemhtV/kuLvpobXmjInpkq7ngrnlh7vmrKHmlbApO1xyXG4gICAgICAgIEdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuc291bmRfbWFuYWdlci5wbGF5U291bmQoU291bmRJbmRleC5jbGljayk7XHJcbiAgICAgICAgc3dpdGNoKEdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuY3VyX2dhbWVfbW9kZSl7XHJcbiAgICAgICAgICAgIGNhc2UgR2FtZU1vZGUuTWFpbjp7ICAgICBcclxuICAgICAgICAgICAgICAgIEdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2FtZV90b19ob21lPUdvX1R5cGUuTWFpbjtcclxuICAgICAgICAgICAgICAgIEdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuYmFja1RvSG9tZSgpOyAgICAgICBcclxuICAgICAgICAgICAgfWJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIEdhbWVNb2RlLk1hemU6e1xyXG4gICAgICAgICAgICAgICAgR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nYW1lX3RvX2hvbWU9R29fVHlwZS5BY3Rpdml0eV9NYXplX2xvc2U7XHJcbiAgICAgICAgICAgICAgICBHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLmJhY2tUb0hvbWUoKTtcclxuICAgICAgICAgICAgfWJyZWFrO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBjbGlja0J0bkdvKGJ0bixpbmRleFN0cjpzdHJpbmcpXHJcbiAgICB7XHJcbiAgICAgICAgR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zb3VuZF9tYW5hZ2VyLnBsYXlTb3VuZChTb3VuZEluZGV4LmNsaWNrKTtcclxuICAgICAgICBsZXQgZ29UeXBlPXBhcnNlSW50KGluZGV4U3RyKTtcclxuICAgICAgICBpZihnb1R5cGU9PUdvX1R5cGUuUGV0TGlzdCl7XHJcbiAgICAgICAgXHJcbiAgICAgICAgICAgIGlmKEZ1bmN0aW9uRGVmaW5pdGlvbk1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRJc1VubG9ja0luZGV4KEJ0bl9JbmRleC5CdG5fUGV0KT09ZmFsc2Upe1xyXG4gICAgICAgICAgICAgICAgbGV0IHR5cGU9RnVuY3Rpb25EZWZpbml0aW9uTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldFVubG9ja0NvbmRpdGlvblR5cGUoRnVuY1R5cGUuQ2hvbmdXdVhpVG9uZylcclxuICAgICAgICAgICAgICAgIGxldCBudW09RnVuY3Rpb25EZWZpbml0aW9uTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldFVubG9ja0NvbmRpY3Rpb25QYXJhbWV0ZXIoRnVuY1R5cGUuQ2hvbmdXdVhpVG9uZylcclxuICAgICAgICAgICAgICAgIGlmKHR5cGU9PTEpe1xyXG4gICAgICAgICAgICAgICAgICAgIEdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuc2hvd01lc3NhZ2UoTGFuZ3VhZ2VNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0U3RyQnlUZXh0SWQoMTAwMDUxKStcIjpcIitudW0pO1xyXG4gICAgICAgICAgICAgICAgfWVsc2UgaWYodHlwZT09Mil7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IHRleHRTdHI9TGFuZ3VhZ2VNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0U3RyQnlUZXh0SWQoMTAwMDUyKTtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgbnVtcz1NaXNzaW9uTGV2ZWxNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0TGV2ZWxOYW1lKChudW0pKVxyXG4gICAgICAgICAgICAgICAgICAgIGxldCBzdHI9dGV4dFN0ci5yZXBsYWNlKCd+JywnJytudW1zKVxyXG4gICAgICAgICAgICAgICAgICAgIEdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuc2hvd01lc3NhZ2Uoc3RyKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYoZ29UeXBlPT1Hb19UeXBlLkFjdGl2aXR5KXtcclxuICAgICAgICAgICAgLy8gaWYoRnVuY3Rpb25EZWZpbml0aW9uTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldElzVW5sb2NrSW5kZXgoQnRuX0luZGV4LkJ0bl9GdUJlbik9PWZhbHNlKXtcclxuICAgICAgICAgICAgICAgIGxldCB0eXBlPUZ1bmN0aW9uRGVmaW5pdGlvbk1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRVbmxvY2tDb25kaXRpb25UeXBlKEZ1bmNUeXBlLkdlUmVuQm9zcylcclxuICAgICAgICAgICAgICAgIGxldCBudW09RnVuY3Rpb25EZWZpbml0aW9uTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldFVubG9ja0NvbmRpY3Rpb25QYXJhbWV0ZXIoRnVuY1R5cGUuR2VSZW5Cb3NzKVxyXG4gICAgICAgICAgICAgICAgaWYoTGV2ZWxNYW5hZ2VyLmdldEluc3RhbmNlKCkuZmluaXNoX2xldmVsPG51bSl7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYodHlwZT09MSl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIEdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuc2hvd01lc3NhZ2UoTGFuZ3VhZ2VNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0U3RyQnlUZXh0SWQoMTAwMDUxKStcIjpcIitudW0pO1xyXG4gICAgICAgICAgICAgICAgICAgIH1lbHNlIGlmKHR5cGU9PTIpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgdGV4dFN0cj1MYW5ndWFnZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRTdHJCeVRleHRJZCgxMDAwNTIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgbnVtcz1NaXNzaW9uTGV2ZWxNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0TGV2ZWxOYW1lKChudW0pKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgc3RyPXRleHRTdHIucmVwbGFjZSgnficsJycrbnVtcylcclxuICAgICAgICAgICAgICAgICAgICAgICAgR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zaG93TWVzc2FnZShzdHIpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAvLyBsZXQgdGV4dFN0cj1MYW5ndWFnZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRTdHJCeVRleHRJZCgxMDAwNTIpO1xyXG4gICAgICAgICAgICAgICAgLy8gbGV0IG51bXM9XCIzLTEwXCIvL01pc3Npb25MZXZlbE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRMZXZlbE5hbWUoKG51bSkpXHJcbiAgICAgICAgICAgICAgICAvLyBsZXQgc3RyPXRleHRTdHIucmVwbGFjZSgnficsJycrbnVtcylcclxuICAgICAgICAgICAgICAgIC8vIEdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuc2hvd01lc3NhZ2Uoc3RyKTtcclxuXHJcbiAgICAgICAgICAgIC8vIH1cclxuXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmKGdvVHlwZT09MSl7XHJcbiAgICAgICAgICAgIEZvbGxvd01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5mb2xsb3dFdmVudChGb2xsb3dfVHlwZS7lpLHotKXpobVf5by65YyW5YW75oiQ6Lez6L2s5oyJ6ZKu54K55Ye75qyh5pWwKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYoZ29UeXBlPT0xMCl7XHJcbiAgICAgICAgICAgIEZvbGxvd01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5mb2xsb3dFdmVudChGb2xsb3dfVHlwZS7lpLHotKXpobVf6I635Y+W6LWE5rqQ6Lez6L2s5oyJ6ZKu54K55Ye75qyh5pWwKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYoZ29UeXBlPT05KXtcclxuICAgICAgICAgICAgRm9sbG93TWFuYWdlci5nZXRJbnN0YW5jZSgpLmZvbGxvd0V2ZW50KEZvbGxvd19UeXBlLuWksei0pemhtV/liY3lvoDllYbln47ot7PovazmjInpkq7ngrnlh7vmrKHmlbApO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvLyBjb25zb2xlLmxvZyhcIl9fX19fX19fdHlwZTFcIixnb1R5cGUpXHJcbiAgICAgICAgR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nYW1lX3RvX2hvbWU9Z29UeXBlO1xyXG4gICAgICAgIEdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuYmFja1RvSG9tZSgpO1xyXG4gICAgfVxyXG5cclxuICAgIGNsaWNrQnRuUmVwbGF5KClcclxuICAgIHtcclxuICAgICAgICBGb2xsb3dNYW5hZ2VyLmdldEluc3RhbmNlKCkuZm9sbG93RXZlbnQoRm9sbG93X1R5cGUu5aSx6LSl6aG1X+mHjeaWsOaMkeaImOaMiemSrueCueWHu+asoeaVsCk7XHJcbiAgICAgICAgR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zb3VuZF9tYW5hZ2VyLnBsYXlTb3VuZChTb3VuZEluZGV4LmNsaWNrKTsgICAgICAgIFxyXG4gICAgICAgIGNjLmRpcmVjdG9yLmxvYWRTY2VuZShHYW1lU2NlbmUuZ2FtZSk7XHJcbiAgICB9XHJcblxyXG4gICAgY2xpY2tCdG5Sb2xlKCl7XHJcbiAgICAgICAgR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zb3VuZF9tYW5hZ2VyLnBsYXlTb3VuZChTb3VuZEluZGV4LmNsaWNrKTtcclxuICAgICAgICBHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLmJhY2tUb0hvbWUoKTtcclxuICAgIH1cclxuXHJcbiAgICBjbGlja0J0bk9rKCl7XHJcbiAgICAgICAgR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zb3VuZF9tYW5hZ2VyLnBsYXlTb3VuZChTb3VuZEluZGV4LmNsaWNrKTtcclxuICAgICAgICBHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdhbWVfdG9faG9tZT1Hb19UeXBlLkFjdGl2aXR5O1xyXG4gICAgICAgIGlmKEdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuY3VyX2dhbWVfbW9kZT09R2FtZU1vZGUuVG93ZXIpe1xyXG4gICAgICAgICAgICBUb3dlck1hbmFnZXIuaXNfc2hvd190b3dlcj10cnVlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLmJhY2tUb0hvbWUoKTtcclxuICAgIH1cclxuXHJcbiAgICBjbGlja0J0blN0YXRzKCl7XHJcbiAgICAgICAgR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zb3VuZF9tYW5hZ2VyLnBsYXlTb3VuZChTb3VuZEluZGV4LmNsaWNrKTtcclxuICAgICAgICBVSU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zaG93RGFtYWdlU3RhdHNVaSgpO1xyXG4gICAgfVxyXG59XHJcbiJdfQ==