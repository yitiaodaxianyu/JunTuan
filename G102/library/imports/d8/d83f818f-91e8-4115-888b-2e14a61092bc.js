"use strict";
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