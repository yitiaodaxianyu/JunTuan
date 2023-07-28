
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Scripts/UI/home/MainUi.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'ede11DSTgVF/JBsenAQQmQg', 'MainUi');
// Scripts/UI/home/MainUi.ts

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
var LanguageConstants_1 = require("../../multiLanguage/LanguageConstants");
var LanguageManager_1 = require("../../multiLanguage/LanguageManager");
var AudioConstants_1 = require("../../Sound/AudioConstants");
var FollowManager_1 = require("../../multiLanguage/FollowManager");
var FollowConstants_1 = require("../../multiLanguage/FollowConstants");
var TutorailsManager_1 = require("../../Tutorials/TutorailsManager");
var LevelManager_1 = require("../../Level/LevelManager");
var MissionLevel_1 = require("../../Level/MissionLevel");
var OfflineRevenue_1 = require("../../JsonData/OfflineRevenue");
var FunctionDefinition_1 = require("../../JsonData/FunctionDefinition");
var UIManager_1 = require("../UIManager");
var FuncTypeBtn_1 = require("./FuncTypeBtn");
var GuaJiGift_1 = require("../../GuaJi/Ui/GuaJiGift");
var UIConfig_1 = require("../UIConfig");
var OfflineUi_1 = require("../../GuaJi/Ui/OfflineUi");
var ToPlayMainUi_1 = require("./ToPlayMainUi");
var MapManager_1 = require("../../GuaJi/MapManager");
var TutorialLevel_1 = require("../../Level/TutorialLevel");
var TaskManager_1 = require("../../Task/TaskManager");
var TextLanguage_1 = require("../../multiLanguage/TextLanguage");
var StorageConfig_1 = require("../../Storage/StorageConfig");
var StorageManager_1 = require("../../Storage/StorageManager");
var HttpManager_1 = require("../.././NetWork/HttpManager");
var HeroManager_1 = require("../../Hero/Data/HeroManager");
var UserData_1 = require("../../UserData");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var MainUi = /** @class */ (function (_super) {
    __extends(MainUi, _super);
    function MainUi() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.cur_selected_level = 1;
        _this.cur_level_name = null;
        _this.cur_avatar = null;
        _this.sp_level_bg = [];
        _this.sp_boss = null;
        _this.BigMap = null;
        return _this;
    }
    MainUi.prototype.onLoad = function () {
        this.cur_selected_level = LevelManager_1.LevelManager.getInstance().finish_level + 1;
        if (this.cur_selected_level > MissionLevel_1.MissionLevelManager.getMaxLevel()) {
            this.cur_selected_level = MissionLevel_1.MissionLevelManager.getMaxLevel();
        }
        // cc.resources.load('ui/home/map_ui');
        // cc.resources.load('ui/home/team_select_ui');
        cc.director.on(LanguageConstants_1.OnLanguageChange, this.showLevelName, this);
        this.node.on(cc.Node.EventType.POSITION_CHANGED, this.onPositionChange, this);
    };
    MainUi.prototype.onDestroy = function () {
        cc.director.off(LanguageConstants_1.OnLanguageChange, this.showLevelName, this);
        this.node.off(cc.Node.EventType.POSITION_CHANGED, this.onPositionChange, this);
    };
    MainUi.prototype.onPositionChange = function () {
        if (this.node.x == 0) {
            this.onEnable();
        }
    };
    MainUi.prototype.start = function () {
        // this.showLevelInfo();
    };
    MainUi.prototype.onEnable = function () {
        FollowManager_1.default.getInstance().followEvent(FollowConstants_1.Follow_Type.首页主界面展示总次数);
        HttpManager_1.HttpManager.post(HttpManager_1.AccessName.updateUserInfo, this.getZongZhanLiJsonString());
        this.refreshLeftRight();
        this.refreshMainTaskUi();
        if (GameManager_1.default.getInstance().cur_game_scene == Constants_1.GameScene.home) {
            // GameManager.getInstance().music_manager.playMusic(MusicIndex.BGM_GuajiBgm);
        }
    };
    MainUi.prototype.refreshLeftRight = function () {
        this.refreshLeft();
        this.refreshRight();
    };
    MainUi.prototype.refreshLeft = function () {
        var left = this.node.getChildByName('left');
        //算出有几个是显示的
        var showNum = 0;
        var btns = left.getChildByName('btns');
        for (var i = 0; i < btns.childrenCount; i++) {
            // let isShow=false;
            var fb = btns.children[i].getComponent(FuncTypeBtn_1.default);
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
        this.scheduleOnce(function () {
            left.height = btns.height + 7;
        }, 0.03);
        // left.active=showNum>0;
        // if(showNum>0){
        //     this.doUnfold(JianTou_Type.LEFT);
        // }
    };
    MainUi.prototype.refreshRight = function () {
        var right = this.node.getChildByName('right');
        //算出有几个是显示的
        var showNum = 0;
        var btns = right.getChildByName('btns');
        for (var i = 0; i < btns.childrenCount; i++) {
            // let isShow=false;
            var fb = btns.children[i].getComponent(FuncTypeBtn_1.default);
            btns.children[i].active = fb.refresh();
            // if(fb){
            //     isShow=fb.refresh();
            // }
            // if(isShow){
            //     fb.node.y=-77-(150*showNum);
            //     showNum++;
            // }
        }
        this.scheduleOnce(function () {
            right.height = btns.height + 7;
        }, 0.03);
        // right.active=showNum>0;
        // if(showNum>0){
        //     this.doUnfold(JianTou_Type.RIGHT);
        // }
    };
    MainUi.prototype.showLevelInfo = function () {
        //获取当前关卡
        var level = LevelManager_1.LevelManager.getInstance().finish_level + 1;
        var startLevel = 1;
        if (level > MissionLevel_1.MissionLevelManager.getMaxLevel()) {
            level = MissionLevel_1.MissionLevelManager.getMaxLevel();
        }
        if (MissionLevel_1.MissionLevelManager.getMaxLevel() - level > 3) {
            startLevel = level;
        }
        else {
            startLevel = MissionLevel_1.MissionLevelManager.getMaxLevel() - 3;
        }
        //获取当前章节
        var chapter = MissionLevel_1.MissionLevelManager.getInstance().getChapter(level);
        //获取章节最后一关
        var lastLevel = MissionLevel_1.MissionLevelManager.getInstance().getLastLevel(level);
        var curSmallLevel = MissionLevel_1.MissionLevelManager.getInstance().getLevelNum(level);
        //获取显示的首个关卡和末关
        var startSmallLevel = 1;
        if (lastLevel - curSmallLevel > 3) {
            startSmallLevel = curSmallLevel;
        }
        else {
            startSmallLevel = lastLevel - 3;
        }
        var levelRoot = this.node.getChildByName('level');
        //章节数
        var titleLabel = levelRoot.getChildByName('titleLabel');
        var titleStr = LanguageManager_1.default.getInstance().getStrByTextId(100053).replace('~', chapter + '');
        titleLabel.getComponent(cc.Label).string = titleStr;
        //车
        var car = levelRoot.getChildByName('car');
        //icon
        var iconRoot = levelRoot.getChildByName('iconRoot');
        iconRoot.removeAllChildren();
        for (var i = 1; i <= 4; i++) {
            var levelBg = levelRoot.getChildByName('level' + i).getComponent(cc.Sprite);
            var levelLabel = levelRoot.getChildByName('label' + i).getComponent(cc.Label);
            var curLevel = (startSmallLevel + i - 1);
            levelLabel.string = '' + curLevel;
            if (curLevel != curSmallLevel) {
                levelBg.spriteFrame = this.sp_level_bg[1];
                levelLabel.fontSize = 22;
            }
            else {
                levelBg.spriteFrame = this.sp_level_bg[0];
                car.x = levelBg.node.x;
                levelLabel.fontSize = 30;
            }
            //关卡信息
            var monsterInfo = MissionLevel_1.MissionLevelManager.getInstance().getFightingInfo(startLevel + i - 1);
            if (monsterInfo.getIsHaveBoss()) {
                var bossIcon = new cc.Node('bossIcon');
                bossIcon.addComponent(cc.Sprite).spriteFrame = this.sp_boss;
                bossIcon.x = levelBg.node.x;
                iconRoot.addChild(bossIcon);
            }
        }
    };
    MainUi.prototype.showLevelName = function () {
        //获取当前关卡
        var level = LevelManager_1.LevelManager.getInstance().finish_level + 1;
        if (level > MissionLevel_1.MissionLevelManager.getMaxLevel()) {
            level = MissionLevel_1.MissionLevelManager.getMaxLevel();
        }
        //获取当前章节
        var chapter = MissionLevel_1.MissionLevelManager.getInstance().getChapter(level);
        var levelRoot = this.node.getChildByName('level');
        //章节数
        var titleLabel = levelRoot.getChildByName('titleLabel');
        var titleStr = LanguageManager_1.default.getInstance().getStrByTextId(100053).replace('~', chapter + '');
        titleLabel.getComponent(cc.Label).string = titleStr;
    };
    MainUi.prototype.setLevelData = function () {
        var gm = GameManager_1.default.getInstance();
        if (!TutorailsManager_1.default.getInstance().is_finish_game) {
            LevelManager_1.LevelManager.getInstance().start_level = LevelManager_1.LevelManager.getInstance().finish_level + 1;
            MapManager_1.default.Currentlevel = LevelManager_1.LevelManager.getInstance().start_level;
            gm.fighting_info = TutorialLevel_1.TutorialLevelManager.getInstance().getFightingInfo(LevelManager_1.LevelManager.getInstance().start_level);
        }
        else {
            gm.fighting_info = MissionLevel_1.MissionLevelManager.getInstance().getFightingInfo(LevelManager_1.LevelManager.getInstance().start_level);
        }
    };
    //展开
    MainUi.prototype.doUnfold = function (jiantouType) {
        switch (jiantouType) {
            case Constants_1.JianTou_Type.LEFT:
                {
                    //计算大小最后一个位置+138
                    var left = this.node.getChildByName('left');
                    left.stopAllActions();
                    //算出有几个是显示的
                    var showNum = 0;
                    var btns = left.getChildByName('btns');
                    for (var i = 0; i < btns.childrenCount; i++) {
                        var btn = btns.children[i];
                        if (btn.active) {
                            showNum++;
                        }
                    }
                    var disY = 168 + (showNum - 1) * 123 + 50;
                    cc.tween(left).to(0.2, { height: disY }).start();
                }
                break;
            case Constants_1.JianTou_Type.RIGHT:
                {
                    var right = this.node.getChildByName('right');
                    right.stopAllActions();
                    //算出有几个是显示的
                    var showNum = 0;
                    var btns = right.getChildByName('btns');
                    for (var i = 0; i < btns.childrenCount; i++) {
                        var btn = btns.children[i];
                        if (btn.active) {
                            showNum++;
                        }
                    }
                    var disY = 168 + (showNum - 1) * 123 + 50;
                    cc.tween(right).to(0.2, { height: disY }).start();
                }
                break;
        }
    };
    //折起
    MainUi.prototype.doFolded = function (jiantouType) {
        switch (jiantouType) {
            case Constants_1.JianTou_Type.LEFT:
                {
                    var left = this.node.getChildByName('left');
                    left.stopAllActions();
                    var disY = 168 + 0 * 123;
                    cc.tween(left).to(0.1, { height: disY }).start();
                }
                break;
            case Constants_1.JianTou_Type.RIGHT:
                {
                    var right = this.node.getChildByName('right');
                    right.stopAllActions();
                    var disY = 168 + 0 * 123;
                    cc.tween(right).to(0.1, { height: disY }).start();
                }
                break;
        }
    };
    MainUi.prototype.clickBtnFast = function () {
        GameManager_1.default.getInstance().sound_manager.playSound(AudioConstants_1.SoundIndex.click);
        FollowManager_1.default.getInstance().followEvent(FollowConstants_1.Follow_Type.主页快速挂机按钮点击次数);
        // UIManager.getInstance().showFastGuajiUi({onClose:()=>{
        // }});
        UIManager_1.UIManager.getInstance().showUiDialog(UIConfig_1.UIPath.FastGuaJi, UIConfig_1.UILayerLevel.One, { onCompleted: function (uiNode) { }, });
    };
    MainUi.prototype.clickBtnSaoDang = function () {
        GameManager_1.default.getInstance().sound_manager.playSound(AudioConstants_1.SoundIndex.click);
    };
    MainUi.prototype.clickBtnStart = function () {
        var _this = this;
        FollowManager_1.default.getInstance().followEvent(FollowConstants_1.Follow_Type.挑战按钮的点击次数);
        // console.log("__________",(OfflineRevenueManager.getInstance().getTime(LevelManager.getInstance().finish_level)),MissionLevelManager.getMaxLevel())
        if ((LevelManager_1.LevelManager.getInstance().finish_level) >= MissionLevel_1.MissionLevelManager.getMaxLevel()) {
            GameManager_1.default.getInstance().showMessage(LanguageManager_1.default.getInstance().getStrByTextId(100121), 3);
            return;
            // GameManager.getInstance().showMessage("你太厉害啦，测试版本暂时没有了，敬请期待后续版本！记得加id",3);
        }
        GameManager_1.default.getInstance().cur_game_mode = Constants_1.GameMode.Main;
        FollowManager_1.default.getInstance().followEvent(FollowConstants_1.Follow_Type.点击开始挑战用户数);
        GameManager_1.default.getInstance().sound_manager.playSound(AudioConstants_1.SoundIndex.click);
        //LevelManager.getInstance().start_level=this.cur_selected_level;
        if (!TutorailsManager_1.default.getInstance().is_finish_game) {
            LevelManager_1.LevelManager.getInstance().start_level = MapManager_1.default.Currentlevel = LevelManager_1.LevelManager.getInstance().finish_level + 1;
            this.startGame();
        }
        else {
            var max = OfflineRevenue_1.OfflineRevenueManager.getInstance().getTime(LevelManager_1.LevelManager.getInstance().finish_level);
            if (OfflineRevenue_1.OfflineRevenueManager.getGuaJiMin() >= max) {
                // UIManager.getInstance().showOfflineUi({
                //     onRefresh:()=>{
                //         this.node.getChildByName('btnOfflineGift').getComponent(GuaJiGift).cheak();
                //     }
                // });
                UIManager_1.UIManager.getInstance().showUiDialog(UIConfig_1.UIPath.Guaji, UIConfig_1.UILayerLevel.One, { onCompleted: function (uiNode) {
                        uiNode.getComponent(OfflineUi_1.default).init({
                            onRefresh: function () {
                                _this.node.getChildByName('btnOfflineGift').getComponent(GuaJiGift_1.default).cheak();
                            }
                        });
                    }, });
            }
            else {
                // UIManager.getInstance().showMapUi({onClose:()=>{
                //     this.cur_selected_level=LevelManager.getInstance().start_level;                    
                //     GameManager.getInstance().refreshZhanliShow();
                // }});     
                if (MapManager_1.default.Currentlevel == 0) {
                    LevelManager_1.LevelManager.getInstance().start_level = MapManager_1.default.Currentlevel = LevelManager_1.LevelManager.getInstance().finish_level + 1;
                }
                UIManager_1.UIManager.getInstance().showUiDialog(UIConfig_1.UIPath.ToPlay, UIConfig_1.UILayerLevel.One, { onCompleted: function (uiNode) {
                        uiNode.getComponent(ToPlayMainUi_1.default).init({ onClose: function () {
                                MapManager_1.default.Currentlevel = LevelManager_1.LevelManager.getInstance().finish_level + 1;
                                _this.cur_selected_level = LevelManager_1.LevelManager.getInstance().start_level;
                                GameManager_1.default.getInstance().refreshZhanliShow();
                            } });
                    }, });
            }
        }
    };
    MainUi.prototype.clickBtnRabate = function () {
        GameManager_1.default.getInstance().sound_manager.playSound(AudioConstants_1.SoundIndex.click);
        if (!FunctionDefinition_1.FunctionDefinitionManager.getInstance().getIsUnlock(Constants_1.FuncType.FanLi)) {
            GameManager_1.default.getInstance().showMessage(LanguageManager_1.default.getInstance().getString(LanguageConstants_1.LanguageIndex.UnlockAfter) + LanguageManager_1.default.getInstance().getString(LanguageConstants_1.LanguageIndex.PlayerLv) + FunctionDefinition_1.FunctionDefinitionManager.getInstance().getUnlockCondictionParameter(Constants_1.FuncType.FanLi));
            return;
        }
        // UIManager.getInstance().showRabateUi();
    };
    MainUi.prototype.clickBtnGift = function () {
        GameManager_1.default.getInstance().sound_manager.playSound(AudioConstants_1.SoundIndex.click);
        if (!FunctionDefinition_1.FunctionDefinitionManager.getInstance().getIsUnlock(Constants_1.FuncType.LiBao)) {
            GameManager_1.default.getInstance().showMessage(LanguageManager_1.default.getInstance().getString(LanguageConstants_1.LanguageIndex.UnlockAfter) + LanguageManager_1.default.getInstance().getString(LanguageConstants_1.LanguageIndex.PlayerLv) + FunctionDefinition_1.FunctionDefinitionManager.getInstance().getUnlockCondictionParameter(Constants_1.FuncType.LiBao));
            return;
        }
        // UIManager.getInstance().showGiftCenterUi();
    };
    MainUi.prototype.clickBtnWeekGift = function () {
        GameManager_1.default.getInstance().sound_manager.playSound(AudioConstants_1.SoundIndex.click);
        if (!FunctionDefinition_1.FunctionDefinitionManager.getInstance().getIsUnlock(Constants_1.FuncType.ZhouLiBao)) {
            GameManager_1.default.getInstance().showMessage(LanguageManager_1.default.getInstance().getString(LanguageConstants_1.LanguageIndex.UnlockAfter) + LanguageManager_1.default.getInstance().getString(LanguageConstants_1.LanguageIndex.PlayerLv) + FunctionDefinition_1.FunctionDefinitionManager.getInstance().getUnlockCondictionParameter(Constants_1.FuncType.ZhouLiBao));
            return;
        }
    };
    MainUi.prototype.clickBtnMainIconMap = function () {
        FollowManager_1.default.getInstance().followEvent(FollowConstants_1.Follow_Type.大地图按钮点击次数);
        this.BigMap.active = true;
    };
    /**显示挂机奖励界面 */
    MainUi.prototype.clickBtnMainIconIdle = function () {
        FollowManager_1.default.getInstance().followEvent(FollowConstants_1.Follow_Type.离线收益按钮点击次数);
        UIManager_1.UIManager.getInstance().showUiDialog(UIConfig_1.UIPath.Guaji, UIConfig_1.UILayerLevel.One, { onCompleted: function () {
            } });
    };
    MainUi.prototype.startGame = function () {
        this.setLevelData();
        var bgLoading = UIManager_1.UIManager.getInstance().getLoadingNode();
        bgLoading.active = true;
        var loadingBar = bgLoading.getChildByName('ProgressBar').getComponent(cc.ProgressBar);
        var loadLabel = loadingBar.node.getChildByName('loadLabel').getComponent(cc.Label);
        cc.director.preloadScene(Constants_1.GameScene.game, function (completedCount, totalCount, item) {
            //真实进度
            var progressTrue = completedCount / totalCount;
            //假的进度
            var progressFalse = progressTrue / 2;
            loadingBar.progress = progressFalse;
            loadLabel.string = (loadingBar.progress * 100).toFixed(0) + '%';
            GameManager_1.default.getInstance().cur_load_progress = progressFalse;
            //this.loading_light.x = this.loading_bar.progress*this.loading_bar.totalLength-this.loading_bar.totalLength/2;
        }, function () {
            cc.director.loadScene(Constants_1.GameScene.game);
        });
    };
    MainUi.prototype.refreshMainTaskUi = function () {
        var taskUi = this.node.getChildByName("mainTask");
        var effect = this.node.getChildByName("mainTaskEffect");
        var main_data = TaskManager_1.default.getInstance().getMainTaskData();
        if (main_data == null) {
            taskUi.active = false;
            effect.active = false;
            return;
        }
        this.scheduleOnce(function () {
            effect.height = taskUi.height;
        }, 0.02);
        var nowNum = StorageManager_1.TheStorageManager.getInstance().getNumber(StorageConfig_1.StorageKey.TaskMainNum + main_data.TaskType, 0);
        taskUi.getChildByName("content").getComponent(TextLanguage_1.default).setTextId(main_data.ThreadTaskDescription);
        taskUi.getChildByName("content").getComponentInChildren(cc.Label).string = nowNum + '/' + main_data.TaskParameters;
        var content = taskUi.getChildByName("content");
        if (nowNum >= main_data.TaskParameters) {
            effect.active = true;
            content.getChildByName("num").color = cc.color(47, 255, 42);
            StorageManager_1.TheStorageManager.getInstance().setItem(StorageConfig_1.StorageKey.TaskState + main_data.ThreadTaskID, 1);
            content.getComponentInChildren(cc.Label).string = main_data.TaskParameters + '/' + main_data.TaskParameters;
        }
        else {
            content.getChildByName("num").color = cc.color(255, 255, 255);
            effect.active = false;
        }
        if (main_data.TaskType == 1) {
            taskUi.getChildByName("content").getComponentInChildren(cc.Label).string = (nowNum >= main_data.TaskParameters ? 1 : 0) + '/' + "1";
        }
        var reward = taskUi.getChildByName("reward");
        reward.getChildByName("gemLabel").getComponent(cc.Label).string = main_data.PropNum_2 + '';
        reward.getChildByName("coinLabel").getComponent(cc.Label).string = main_data.PropNum_1 + '';
    };
    MainUi.prototype.getZongZhanLiJsonString = function () {
        var uid = UserData_1.default.getInstance().getUserID();
        var zongZhanLi = HeroManager_1.HeroManager.getInstance().getAllHeroZhanli();
        return JSON.stringify({
            type: 1,
            uid: uid,
            value: zongZhanLi,
        });
    };
    __decorate([
        property([cc.SpriteFrame])
    ], MainUi.prototype, "sp_level_bg", void 0);
    __decorate([
        property(cc.SpriteFrame)
    ], MainUi.prototype, "sp_boss", void 0);
    __decorate([
        property(cc.Node)
    ], MainUi.prototype, "BigMap", void 0);
    MainUi = __decorate([
        ccclass
    ], MainUi);
    return MainUi;
}(cc.Component));
exports.default = MainUi;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0c1xcVUlcXGhvbWVcXE1haW5VaS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSw2Q0FBc0Y7QUFFdEYsaURBQTRDO0FBQzVDLDJFQUF3RjtBQUN4Rix1RUFBa0U7QUFDbEUsNkRBQW9FO0FBQ3BFLG1FQUE4RDtBQUM5RCx1RUFBa0U7QUFFbEUscUVBQWdFO0FBQ2hFLHlEQUF3RDtBQUN4RCx5REFBK0Q7QUFDL0QsZ0VBQXNFO0FBQ3RFLHdFQUE4RTtBQUM5RSwwQ0FBeUM7QUFDekMsNkNBQXdDO0FBQ3hDLHNEQUFpRDtBQUNqRCx3Q0FBbUQ7QUFDbkQsc0RBQWlEO0FBQ2pELCtDQUEwQztBQUMxQyxxREFBZ0Q7QUFDaEQsMkRBQWlFO0FBQ2pFLHNEQUFpRDtBQUNqRCxpRUFBNEQ7QUFDNUQsNkRBQXlEO0FBQ3pELCtEQUFpRTtBQUNqRSwyREFBc0U7QUFDdEUsMkRBQTBEO0FBQzFELDJDQUFzQztBQUVoQyxJQUFBLEtBQXNCLEVBQUUsQ0FBQyxVQUFVLEVBQWxDLE9BQU8sYUFBQSxFQUFFLFFBQVEsY0FBaUIsQ0FBQztBQUcxQztJQUFvQywwQkFBWTtJQUFoRDtRQUFBLHFFQSthQztRQTdhRyx3QkFBa0IsR0FBUSxDQUFDLENBQUM7UUFDNUIsb0JBQWMsR0FBUyxJQUFJLENBQUM7UUFDNUIsZ0JBQVUsR0FBUyxJQUFJLENBQUM7UUFHeEIsaUJBQVcsR0FBa0IsRUFBRSxDQUFDO1FBR2hDLGFBQU8sR0FBZ0IsSUFBSSxDQUFDO1FBRzVCLFlBQU0sR0FBUyxJQUFJLENBQUM7O0lBa2F4QixDQUFDO0lBaGFHLHVCQUFNLEdBQU47UUFFSSxJQUFJLENBQUMsa0JBQWtCLEdBQUMsMkJBQVksQ0FBQyxXQUFXLEVBQUUsQ0FBQyxZQUFZLEdBQUMsQ0FBQyxDQUFDO1FBQ2xFLElBQUcsSUFBSSxDQUFDLGtCQUFrQixHQUFDLGtDQUFtQixDQUFDLFdBQVcsRUFBRSxF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QUQxQixPQUFPO09BQ2EsTUFBTSxDQSthMUI7SUFBRCxhQUFDO0NBL2FELEFBK2FDLENBL2FtQyxFQUFFLENBQUMsU0FBUyxHQSthL0M7a0JBL2FvQixNQUFNIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRnVuY1R5cGUsIEdhbWVNb2RlLCBHYW1lU2NlbmUsIElzRGVidWcsIEppYW5Ub3VfVHlwZX0gZnJvbSBcIi4uLy4uL0NvbnN0YW50c1wiO1xyXG5pbXBvcnQgR2FtZURhdGEgZnJvbSBcIi4uLy4uL0dhbWVEYXRhXCI7XHJcbmltcG9ydCBHYW1lTWFuYWdlciBmcm9tIFwiLi4vLi4vR2FtZU1hbmFnZXJcIjtcclxuaW1wb3J0IHsgTGFuZ3VhZ2VJbmRleCwgT25MYW5ndWFnZUNoYW5nZSB9IGZyb20gXCIuLi8uLi9tdWx0aUxhbmd1YWdlL0xhbmd1YWdlQ29uc3RhbnRzXCI7XHJcbmltcG9ydCBMYW5ndWFnZU1hbmFnZXIgZnJvbSBcIi4uLy4uL211bHRpTGFuZ3VhZ2UvTGFuZ3VhZ2VNYW5hZ2VyXCI7XHJcbmltcG9ydCB7IE11c2ljSW5kZXgsIFNvdW5kSW5kZXggfSBmcm9tIFwiLi4vLi4vU291bmQvQXVkaW9Db25zdGFudHNcIjtcclxuaW1wb3J0IEZvbGxvd01hbmFnZXIgZnJvbSBcIi4uLy4uL211bHRpTGFuZ3VhZ2UvRm9sbG93TWFuYWdlclwiO1xyXG5pbXBvcnQgeyBGb2xsb3dfVHlwZSB9IGZyb20gXCIuLi8uLi9tdWx0aUxhbmd1YWdlL0ZvbGxvd0NvbnN0YW50c1wiO1xyXG5pbXBvcnQgeyBWaXBNYW5hZ2VyIH0gZnJvbSBcIi4uLy4uL0Fkcy9WaXBNYW5hZ2VyXCI7XHJcbmltcG9ydCBUdXRvcmFpbHNNYW5hZ2VyIGZyb20gXCIuLi8uLi9UdXRvcmlhbHMvVHV0b3JhaWxzTWFuYWdlclwiO1xyXG5pbXBvcnQgeyBMZXZlbE1hbmFnZXIgfSBmcm9tIFwiLi4vLi4vTGV2ZWwvTGV2ZWxNYW5hZ2VyXCI7XHJcbmltcG9ydCB7IE1pc3Npb25MZXZlbE1hbmFnZXIgfSBmcm9tIFwiLi4vLi4vTGV2ZWwvTWlzc2lvbkxldmVsXCI7XHJcbmltcG9ydCB7IE9mZmxpbmVSZXZlbnVlTWFuYWdlciB9IGZyb20gXCIuLi8uLi9Kc29uRGF0YS9PZmZsaW5lUmV2ZW51ZVwiO1xyXG5pbXBvcnQgeyBGdW5jdGlvbkRlZmluaXRpb25NYW5hZ2VyIH0gZnJvbSBcIi4uLy4uL0pzb25EYXRhL0Z1bmN0aW9uRGVmaW5pdGlvblwiO1xyXG5pbXBvcnQgeyBVSU1hbmFnZXIgfSBmcm9tIFwiLi4vVUlNYW5hZ2VyXCI7XHJcbmltcG9ydCBGdW5jVHlwZUJ0biBmcm9tIFwiLi9GdW5jVHlwZUJ0blwiO1xyXG5pbXBvcnQgR3VhSmlHaWZ0IGZyb20gXCIuLi8uLi9HdWFKaS9VaS9HdWFKaUdpZnRcIjtcclxuaW1wb3J0IHsgVUlMYXllckxldmVsLCBVSVBhdGggfSBmcm9tIFwiLi4vVUlDb25maWdcIjtcclxuaW1wb3J0IE9mZmxpbmVVaSBmcm9tIFwiLi4vLi4vR3VhSmkvVWkvT2ZmbGluZVVpXCI7XHJcbmltcG9ydCBUb1BsYXlNYWluVWkgZnJvbSBcIi4vVG9QbGF5TWFpblVpXCI7XHJcbmltcG9ydCBNYXBNYW5hZ2VyIGZyb20gXCIuLi8uLi9HdWFKaS9NYXBNYW5hZ2VyXCI7XHJcbmltcG9ydCB7IFR1dG9yaWFsTGV2ZWxNYW5hZ2VyIH0gZnJvbSBcIi4uLy4uL0xldmVsL1R1dG9yaWFsTGV2ZWxcIjtcclxuaW1wb3J0IFRhc2tNYW5hZ2VyIGZyb20gXCIuLi8uLi9UYXNrL1Rhc2tNYW5hZ2VyXCI7XHJcbmltcG9ydCBUZXh0TGFuZ3VhZ2UgZnJvbSBcIi4uLy4uL211bHRpTGFuZ3VhZ2UvVGV4dExhbmd1YWdlXCI7XHJcbmltcG9ydCB7IFN0b3JhZ2VLZXkgfSBmcm9tIFwiLi4vLi4vU3RvcmFnZS9TdG9yYWdlQ29uZmlnXCI7XHJcbmltcG9ydCB7IFRoZVN0b3JhZ2VNYW5hZ2VyIH0gZnJvbSBcIi4uLy4uL1N0b3JhZ2UvU3RvcmFnZU1hbmFnZXJcIjtcclxuaW1wb3J0IHsgSHR0cE1hbmFnZXIsIEFjY2Vzc05hbWUgfSBmcm9tIFwiLi4vLi4vLi9OZXRXb3JrL0h0dHBNYW5hZ2VyXCI7XHJcbmltcG9ydCB7IEhlcm9NYW5hZ2VyIH0gZnJvbSBcIi4uLy4uL0hlcm8vRGF0YS9IZXJvTWFuYWdlclwiO1xyXG5pbXBvcnQgVXNlckRhdGEgZnJvbSBcIi4uLy4uL1VzZXJEYXRhXCI7XHJcblxyXG5jb25zdCB7Y2NjbGFzcywgcHJvcGVydHl9ID0gY2MuX2RlY29yYXRvcjtcclxuXHJcbkBjY2NsYXNzXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIE1haW5VaSBleHRlbmRzIGNjLkNvbXBvbmVudCB7XHJcbiAgICBcclxuICAgIGN1cl9zZWxlY3RlZF9sZXZlbDpudW1iZXI9MTtcclxuICAgIGN1cl9sZXZlbF9uYW1lOmNjLk5vZGU9bnVsbDtcclxuICAgIGN1cl9hdmF0YXI6Y2MuTm9kZT1udWxsO1xyXG5cclxuICAgIEBwcm9wZXJ0eShbY2MuU3ByaXRlRnJhbWVdKVxyXG4gICAgc3BfbGV2ZWxfYmc6Y2MuU3ByaXRlRnJhbWVbXT1bXTtcclxuXHJcbiAgICBAcHJvcGVydHkoY2MuU3ByaXRlRnJhbWUpXHJcbiAgICBzcF9ib3NzOmNjLlNwcml0ZUZyYW1lPW51bGw7XHJcblxyXG4gICAgQHByb3BlcnR5KGNjLk5vZGUpXHJcbiAgICBCaWdNYXA6Y2MuTm9kZT1udWxsO1xyXG5cclxuICAgIG9uTG9hZCgpXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy5jdXJfc2VsZWN0ZWRfbGV2ZWw9TGV2ZWxNYW5hZ2VyLmdldEluc3RhbmNlKCkuZmluaXNoX2xldmVsKzE7XHJcbiAgICAgICAgaWYodGhpcy5jdXJfc2VsZWN0ZWRfbGV2ZWw+TWlzc2lvbkxldmVsTWFuYWdlci5nZXRNYXhMZXZlbCgpKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5jdXJfc2VsZWN0ZWRfbGV2ZWw9TWlzc2lvbkxldmVsTWFuYWdlci5nZXRNYXhMZXZlbCgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvLyBjYy5yZXNvdXJjZXMubG9hZCgndWkvaG9tZS9tYXBfdWknKTtcclxuICAgICAgICAvLyBjYy5yZXNvdXJjZXMubG9hZCgndWkvaG9tZS90ZWFtX3NlbGVjdF91aScpO1xyXG4gICAgICAgIGNjLmRpcmVjdG9yLm9uKE9uTGFuZ3VhZ2VDaGFuZ2UsdGhpcy5zaG93TGV2ZWxOYW1lLHRoaXMpO1xyXG4gICAgICAgIHRoaXMubm9kZS5vbihjYy5Ob2RlLkV2ZW50VHlwZS5QT1NJVElPTl9DSEFOR0VELHRoaXMub25Qb3NpdGlvbkNoYW5nZSx0aGlzKTtcclxuICAgIH1cclxuXHJcbiAgICBwcm90ZWN0ZWQgb25EZXN0cm95KCk6IHZvaWQgeyAgICAgICAgXHJcbiAgICAgICAgY2MuZGlyZWN0b3Iub2ZmKE9uTGFuZ3VhZ2VDaGFuZ2UsdGhpcy5zaG93TGV2ZWxOYW1lLHRoaXMpO1xyXG4gICAgICAgIHRoaXMubm9kZS5vZmYoY2MuTm9kZS5FdmVudFR5cGUuUE9TSVRJT05fQ0hBTkdFRCx0aGlzLm9uUG9zaXRpb25DaGFuZ2UsdGhpcyk7XHJcbiAgICB9XHJcblxyXG4gICAgb25Qb3NpdGlvbkNoYW5nZSgpe1xyXG4gICAgICAgIGlmKHRoaXMubm9kZS54PT0wKXtcclxuICAgICAgICAgICAgdGhpcy5vbkVuYWJsZSgpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBzdGFydCgpXHJcbiAgICB7XHJcbiAgICAgICAgLy8gdGhpcy5zaG93TGV2ZWxJbmZvKCk7XHJcbiAgICB9XHJcblxyXG4gICAgb25FbmFibGUoKVxyXG4gICAge1xyXG4gICAgICAgIEZvbGxvd01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5mb2xsb3dFdmVudChGb2xsb3dfVHlwZS7pppbpobXkuLvnlYzpnaLlsZXnpLrmgLvmrKHmlbApO1xyXG4gICAgICAgIEh0dHBNYW5hZ2VyLnBvc3QoQWNjZXNzTmFtZS51cGRhdGVVc2VySW5mbyx0aGlzLmdldFpvbmdaaGFuTGlKc29uU3RyaW5nKCkpO1xyXG4gICAgICAgIHRoaXMucmVmcmVzaExlZnRSaWdodCgpO1xyXG4gICAgICAgIHRoaXMucmVmcmVzaE1haW5UYXNrVWkoKTtcclxuICAgICAgICBpZihHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLmN1cl9nYW1lX3NjZW5lPT1HYW1lU2NlbmUuaG9tZSl7XHJcbiAgICAgICAgICAgIC8vIEdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkubXVzaWNfbWFuYWdlci5wbGF5TXVzaWMoTXVzaWNJbmRleC5CR01fR3VhamlCZ20pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICByZWZyZXNoTGVmdFJpZ2h0KCl7XHJcbiAgICAgICAgdGhpcy5yZWZyZXNoTGVmdCgpO1xyXG4gICAgICAgIHRoaXMucmVmcmVzaFJpZ2h0KCk7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIHJlZnJlc2hMZWZ0KCl7XHJcbiAgICAgICAgbGV0IGxlZnQ9dGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKCdsZWZ0Jyk7XHJcbiAgICAgICAgLy/nrpflh7rmnInlh6DkuKrmmK/mmL7npLrnmoRcclxuICAgICAgICBsZXQgc2hvd051bT0wO1xyXG4gICAgICAgIGxldCBidG5zPWxlZnQuZ2V0Q2hpbGRCeU5hbWUoJ2J0bnMnKTtcclxuICAgICAgICBmb3IobGV0IGk9MDsgaTxidG5zLmNoaWxkcmVuQ291bnQ7IGkrKyl7XHJcbiAgICAgICAgICAgIC8vIGxldCBpc1Nob3c9ZmFsc2U7XHJcbiAgICAgICAgICAgIGxldCBmYj1idG5zLmNoaWxkcmVuW2ldLmdldENvbXBvbmVudChGdW5jVHlwZUJ0bik7XHJcbiAgICAgICAgICAgIGJ0bnMuY2hpbGRyZW5baV0uYWN0aXZlID0gZmIucmVmcmVzaCgpO1xyXG4gICAgICAgICAgICAvLyBpZihmYil7XHJcbiAgICAgICAgICAgIC8vICAgICBpc1Nob3c9ZmIucmVmcmVzaCgpO1xyXG4gICAgICAgICAgICAvLyB9ZWxzZXtcclxuICAgICAgICAgICAgLy8gICAgIGlzU2hvdz1idG5zLmNoaWxkcmVuW2ldLmFjdGl2ZTsgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAvLyB9XHJcbiAgICAgICAgICAgIC8vIGlmKGlzU2hvdyl7XHJcbiAgICAgICAgICAgIC8vICAgICBmYi5ub2RlLnk9LTc3LSgxNTAqc2hvd051bSk7XHJcbiAgICAgICAgICAgIC8vICAgICBzaG93TnVtKys7XHJcbiAgICAgICAgICAgIC8vICAgICAvLyBpZihzaG93TnVtID4gMSlcclxuICAgICAgICAgICAgLy8gICAgIC8vICAgICBmYi5ub2RlLnkgLT0gNTA7XHJcbiAgICAgICAgICAgIC8vIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5zY2hlZHVsZU9uY2UoKCk9PntcclxuICAgICAgICAgICAgbGVmdC5oZWlnaHQgPSBidG5zLmhlaWdodCArIDc7XHJcbiAgICAgICAgfSwwLjAzKTtcclxuICAgICAgICAvLyBsZWZ0LmFjdGl2ZT1zaG93TnVtPjA7XHJcbiAgICAgICAgLy8gaWYoc2hvd051bT4wKXtcclxuICAgICAgICAvLyAgICAgdGhpcy5kb1VuZm9sZChKaWFuVG91X1R5cGUuTEVGVCk7XHJcbiAgICAgICAgLy8gfVxyXG4gICAgfVxyXG5cclxuICAgIHJlZnJlc2hSaWdodCgpe1xyXG4gICAgICAgIGxldCByaWdodD10aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoJ3JpZ2h0Jyk7XHJcbiAgICAgICAgLy/nrpflh7rmnInlh6DkuKrmmK/mmL7npLrnmoRcclxuICAgICAgICBsZXQgc2hvd051bT0wO1xyXG4gICAgICAgIGxldCBidG5zPXJpZ2h0LmdldENoaWxkQnlOYW1lKCdidG5zJyk7XHJcbiAgICAgICAgZm9yKGxldCBpPTA7IGk8YnRucy5jaGlsZHJlbkNvdW50OyBpKyspe1xyXG4gICAgICAgICAgICAvLyBsZXQgaXNTaG93PWZhbHNlO1xyXG4gICAgICAgICAgICBsZXQgZmI9YnRucy5jaGlsZHJlbltpXS5nZXRDb21wb25lbnQoRnVuY1R5cGVCdG4pO1xyXG4gICAgICAgICAgICBidG5zLmNoaWxkcmVuW2ldLmFjdGl2ZSA9IGZiLnJlZnJlc2goKTtcclxuICAgICAgICAgICAgLy8gaWYoZmIpe1xyXG4gICAgICAgICAgICAvLyAgICAgaXNTaG93PWZiLnJlZnJlc2goKTtcclxuICAgICAgICAgICAgLy8gfVxyXG4gICAgICAgICAgICAvLyBpZihpc1Nob3cpe1xyXG4gICAgICAgICAgICAvLyAgICAgZmIubm9kZS55PS03Ny0oMTUwKnNob3dOdW0pO1xyXG4gICAgICAgICAgICAvLyAgICAgc2hvd051bSsrO1xyXG4gICAgICAgICAgICAvLyB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuc2NoZWR1bGVPbmNlKCgpPT57XHJcbiAgICAgICAgICAgIHJpZ2h0LmhlaWdodCA9IGJ0bnMuaGVpZ2h0ICsgNztcclxuICAgICAgICB9LDAuMDMpO1xyXG4gICAgICAgIC8vIHJpZ2h0LmFjdGl2ZT1zaG93TnVtPjA7XHJcbiAgICAgICAgLy8gaWYoc2hvd051bT4wKXtcclxuICAgICAgICAvLyAgICAgdGhpcy5kb1VuZm9sZChKaWFuVG91X1R5cGUuUklHSFQpO1xyXG4gICAgICAgIC8vIH1cclxuICAgIH1cclxuICAgIFxyXG4gICAgc2hvd0xldmVsSW5mbygpXHJcbiAgICB7XHJcbiAgICAgICAgLy/ojrflj5blvZPliY3lhbPljaFcclxuICAgICAgICBsZXQgbGV2ZWw9TGV2ZWxNYW5hZ2VyLmdldEluc3RhbmNlKCkuZmluaXNoX2xldmVsKzE7XHJcbiAgICAgICAgbGV0IHN0YXJ0TGV2ZWw9MTtcclxuICAgICAgICBpZihsZXZlbD5NaXNzaW9uTGV2ZWxNYW5hZ2VyLmdldE1heExldmVsKCkpe1xyXG4gICAgICAgICAgICBsZXZlbD1NaXNzaW9uTGV2ZWxNYW5hZ2VyLmdldE1heExldmVsKCk7ICAgICAgICAgICAgXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmKE1pc3Npb25MZXZlbE1hbmFnZXIuZ2V0TWF4TGV2ZWwoKS1sZXZlbD4zKXtcclxuICAgICAgICAgICAgc3RhcnRMZXZlbD1sZXZlbDtcclxuICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgc3RhcnRMZXZlbD1NaXNzaW9uTGV2ZWxNYW5hZ2VyLmdldE1heExldmVsKCktMztcclxuICAgICAgICB9XHJcbiAgICAgICAgLy/ojrflj5blvZPliY3nq6DoioJcclxuICAgICAgICBsZXQgY2hhcHRlcj1NaXNzaW9uTGV2ZWxNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0Q2hhcHRlcihsZXZlbCk7XHJcbiAgICAgICAgLy/ojrflj5bnq6DoioLmnIDlkI7kuIDlhbNcclxuICAgICAgICBsZXQgbGFzdExldmVsPU1pc3Npb25MZXZlbE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRMYXN0TGV2ZWwobGV2ZWwpO1xyXG4gICAgICAgIGxldCBjdXJTbWFsbExldmVsPU1pc3Npb25MZXZlbE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRMZXZlbE51bShsZXZlbCk7XHJcbiAgICAgICAgLy/ojrflj5bmmL7npLrnmoTpppbkuKrlhbPljaHlkozmnKvlhbNcclxuICAgICAgICBsZXQgc3RhcnRTbWFsbExldmVsPTE7ICAgICAgICBcclxuICAgICAgICBpZihsYXN0TGV2ZWwtY3VyU21hbGxMZXZlbD4zKXtcclxuICAgICAgICAgICAgc3RhcnRTbWFsbExldmVsPWN1clNtYWxsTGV2ZWwgICAgICAgICAgICBcclxuICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgc3RhcnRTbWFsbExldmVsPWxhc3RMZXZlbC0zOyAgICAgICAgICAgIFxyXG4gICAgICAgIH0gICAgIFxyXG4gICAgICAgIGxldCBsZXZlbFJvb3Q9dGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKCdsZXZlbCcpO1xyXG4gICAgICAgIC8v56ug6IqC5pWwXHJcbiAgICAgICAgbGV0IHRpdGxlTGFiZWw9bGV2ZWxSb290LmdldENoaWxkQnlOYW1lKCd0aXRsZUxhYmVsJyk7XHJcbiAgICAgICAgbGV0IHRpdGxlU3RyPUxhbmd1YWdlTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldFN0ckJ5VGV4dElkKDEwMDA1MykucmVwbGFjZSgnficsY2hhcHRlcisnJyk7XHJcbiAgICAgICAgdGl0bGVMYWJlbC5nZXRDb21wb25lbnQoY2MuTGFiZWwpLnN0cmluZz10aXRsZVN0cjtcclxuICAgICAgICAvL+i9plxyXG4gICAgICAgIGxldCBjYXI9bGV2ZWxSb290LmdldENoaWxkQnlOYW1lKCdjYXInKTtcclxuICAgICAgICAvL2ljb25cclxuICAgICAgICBsZXQgaWNvblJvb3Q9bGV2ZWxSb290LmdldENoaWxkQnlOYW1lKCdpY29uUm9vdCcpO1xyXG4gICAgICAgIGljb25Sb290LnJlbW92ZUFsbENoaWxkcmVuKCk7XHJcbiAgICAgICAgZm9yKGxldCBpPTE7IGk8PTQ7IGkrKyl7XHJcbiAgICAgICAgICAgIGxldCBsZXZlbEJnPWxldmVsUm9vdC5nZXRDaGlsZEJ5TmFtZSgnbGV2ZWwnK2kpLmdldENvbXBvbmVudChjYy5TcHJpdGUpO1xyXG4gICAgICAgICAgICBsZXQgbGV2ZWxMYWJlbD1sZXZlbFJvb3QuZ2V0Q2hpbGRCeU5hbWUoJ2xhYmVsJytpKS5nZXRDb21wb25lbnQoY2MuTGFiZWwpO1xyXG4gICAgICAgICAgICBsZXQgY3VyTGV2ZWw9KHN0YXJ0U21hbGxMZXZlbCtpLTEpO1xyXG4gICAgICAgICAgICBsZXZlbExhYmVsLnN0cmluZz0nJytjdXJMZXZlbDsgICAgICAgICAgICBcclxuICAgICAgICAgICAgaWYoY3VyTGV2ZWwhPWN1clNtYWxsTGV2ZWwpe1xyXG4gICAgICAgICAgICAgICAgbGV2ZWxCZy5zcHJpdGVGcmFtZT10aGlzLnNwX2xldmVsX2JnWzFdO1xyXG4gICAgICAgICAgICAgICAgbGV2ZWxMYWJlbC5mb250U2l6ZT0yMjtcclxuICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICBsZXZlbEJnLnNwcml0ZUZyYW1lPXRoaXMuc3BfbGV2ZWxfYmdbMF07XHJcbiAgICAgICAgICAgICAgICBjYXIueD1sZXZlbEJnLm5vZGUueDtcclxuICAgICAgICAgICAgICAgIGxldmVsTGFiZWwuZm9udFNpemU9MzA7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgLy/lhbPljaHkv6Hmga9cclxuICAgICAgICAgICAgbGV0IG1vbnN0ZXJJbmZvPU1pc3Npb25MZXZlbE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRGaWdodGluZ0luZm8oc3RhcnRMZXZlbCtpLTEpO1xyXG4gICAgICAgICAgICBpZihtb25zdGVySW5mby5nZXRJc0hhdmVCb3NzKCkpe1xyXG4gICAgICAgICAgICAgICAgbGV0IGJvc3NJY29uPW5ldyBjYy5Ob2RlKCdib3NzSWNvbicpXHJcbiAgICAgICAgICAgICAgICBib3NzSWNvbi5hZGRDb21wb25lbnQoY2MuU3ByaXRlKS5zcHJpdGVGcmFtZT10aGlzLnNwX2Jvc3M7XHJcbiAgICAgICAgICAgICAgICBib3NzSWNvbi54PWxldmVsQmcubm9kZS54O1xyXG4gICAgICAgICAgICAgICAgaWNvblJvb3QuYWRkQ2hpbGQoYm9zc0ljb24pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHNob3dMZXZlbE5hbWUoKXtcclxuICAgICAgICAvL+iOt+WPluW9k+WJjeWFs+WNoVxyXG4gICAgICAgIGxldCBsZXZlbD1MZXZlbE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5maW5pc2hfbGV2ZWwrMTtcclxuICAgICAgICBpZihsZXZlbD5NaXNzaW9uTGV2ZWxNYW5hZ2VyLmdldE1heExldmVsKCkpe1xyXG4gICAgICAgICAgICBsZXZlbD1NaXNzaW9uTGV2ZWxNYW5hZ2VyLmdldE1heExldmVsKCk7ICAgICAgICAgICAgXHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8v6I635Y+W5b2T5YmN56ug6IqCXHJcbiAgICAgICAgbGV0IGNoYXB0ZXI9TWlzc2lvbkxldmVsTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldENoYXB0ZXIobGV2ZWwpO1xyXG4gICAgICAgIGxldCBsZXZlbFJvb3Q9dGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKCdsZXZlbCcpO1xyXG4gICAgICAgIC8v56ug6IqC5pWwXHJcbiAgICAgICAgbGV0IHRpdGxlTGFiZWw9bGV2ZWxSb290LmdldENoaWxkQnlOYW1lKCd0aXRsZUxhYmVsJyk7XHJcbiAgICAgICAgbGV0IHRpdGxlU3RyPUxhbmd1YWdlTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldFN0ckJ5VGV4dElkKDEwMDA1MykucmVwbGFjZSgnficsY2hhcHRlcisnJyk7XHJcbiAgICAgICAgdGl0bGVMYWJlbC5nZXRDb21wb25lbnQoY2MuTGFiZWwpLnN0cmluZz10aXRsZVN0cjtcclxuICAgIH1cclxuXHJcbiAgICBzZXRMZXZlbERhdGEoKVxyXG4gICAge1xyXG4gICAgICAgIGxldCBnbT1HYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpO1xyXG4gICAgICAgIGlmKCFUdXRvcmFpbHNNYW5hZ2VyLmdldEluc3RhbmNlKCkuaXNfZmluaXNoX2dhbWUpe1xyXG4gICAgICAgICAgICBMZXZlbE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zdGFydF9sZXZlbD1MZXZlbE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5maW5pc2hfbGV2ZWwrMTtcclxuICAgICAgICAgICAgTWFwTWFuYWdlci5DdXJyZW50bGV2ZWw9TGV2ZWxNYW5hZ2VyLmdldEluc3RhbmNlKCkuc3RhcnRfbGV2ZWw7XHJcbiAgICAgICAgICAgIGdtLmZpZ2h0aW5nX2luZm89VHV0b3JpYWxMZXZlbE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRGaWdodGluZ0luZm8oTGV2ZWxNYW5hZ2VyLmdldEluc3RhbmNlKCkuc3RhcnRfbGV2ZWwpO1xyXG4gICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICBnbS5maWdodGluZ19pbmZvPU1pc3Npb25MZXZlbE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRGaWdodGluZ0luZm8oTGV2ZWxNYW5hZ2VyLmdldEluc3RhbmNlKCkuc3RhcnRfbGV2ZWwpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvL+WxleW8gFxyXG4gICAgZG9VbmZvbGQoamlhbnRvdVR5cGU6SmlhblRvdV9UeXBlKVxyXG4gICAge1xyXG4gICAgICAgIHN3aXRjaChqaWFudG91VHlwZSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGNhc2UgSmlhblRvdV9UeXBlLkxFRlQ6e1xyXG4gICAgICAgICAgICAgICAgLy/orqHnrpflpKflsI/mnIDlkI7kuIDkuKrkvY3nva4rMTM4XHJcbiAgICAgICAgICAgICAgICBsZXQgbGVmdD10aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoJ2xlZnQnKTtcclxuICAgICAgICAgICAgICAgIGxlZnQuc3RvcEFsbEFjdGlvbnMoKTtcclxuICAgICAgICAgICAgICAgIC8v566X5Ye65pyJ5Yeg5Liq5piv5pi+56S655qEXHJcbiAgICAgICAgICAgICAgICBsZXQgc2hvd051bT0wO1xyXG4gICAgICAgICAgICAgICAgbGV0IGJ0bnM9bGVmdC5nZXRDaGlsZEJ5TmFtZSgnYnRucycpO1xyXG4gICAgICAgICAgICAgICAgZm9yKGxldCBpPTA7IGk8YnRucy5jaGlsZHJlbkNvdW50OyBpKyspe1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBidG49YnRucy5jaGlsZHJlbltpXTtcclxuICAgICAgICAgICAgICAgICAgICBpZihidG4uYWN0aXZlKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgc2hvd051bSsrO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGxldCBkaXNZPTE2OCsoc2hvd051bS0xKSoxMjMgKyA1MDtcclxuICAgICAgICAgICAgICAgIGNjLnR3ZWVuKGxlZnQpLnRvKDAuMix7aGVpZ2h0OmRpc1l9KS5zdGFydCgpO1xyXG4gICAgICAgICAgICB9YnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgSmlhblRvdV9UeXBlLlJJR0hUOntcclxuICAgICAgICAgICAgICAgIGxldCByaWdodD10aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoJ3JpZ2h0Jyk7XHJcbiAgICAgICAgICAgICAgICByaWdodC5zdG9wQWxsQWN0aW9ucygpO1xyXG4gICAgICAgICAgICAgICAgLy/nrpflh7rmnInlh6DkuKrmmK/mmL7npLrnmoRcclxuICAgICAgICAgICAgICAgIGxldCBzaG93TnVtPTA7XHJcbiAgICAgICAgICAgICAgICBsZXQgYnRucz1yaWdodC5nZXRDaGlsZEJ5TmFtZSgnYnRucycpO1xyXG4gICAgICAgICAgICAgICAgZm9yKGxldCBpPTA7IGk8YnRucy5jaGlsZHJlbkNvdW50OyBpKyspe1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBidG49YnRucy5jaGlsZHJlbltpXTtcclxuICAgICAgICAgICAgICAgICAgICBpZihidG4uYWN0aXZlKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgc2hvd051bSsrO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGxldCBkaXNZPTE2OCsoc2hvd051bS0xKSoxMjMgKyA1MDsgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICBjYy50d2VlbihyaWdodCkudG8oMC4yLHtoZWlnaHQ6ZGlzWX0pLnN0YXJ0KCk7XHJcbiAgICAgICAgICAgIH1icmVhaztcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLy/mipjotbdcclxuICAgIGRvRm9sZGVkKGppYW50b3VUeXBlOkppYW5Ub3VfVHlwZSlcclxuICAgIHtcclxuICAgICAgICBzd2l0Y2goamlhbnRvdVR5cGUpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBjYXNlIEppYW5Ub3VfVHlwZS5MRUZUOntcclxuICAgICAgICAgICAgICAgIGxldCBsZWZ0PXRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZSgnbGVmdCcpO1xyXG4gICAgICAgICAgICAgICAgbGVmdC5zdG9wQWxsQWN0aW9ucygpO1xyXG4gICAgICAgICAgICAgICAgbGV0IGRpc1k9MTY4KzAqMTIzO1xyXG4gICAgICAgICAgICAgICAgY2MudHdlZW4obGVmdCkudG8oMC4xLHtoZWlnaHQ6ZGlzWX0pLnN0YXJ0KCk7XHJcbiAgICAgICAgICAgIH1icmVhaztcclxuICAgICAgICAgICAgY2FzZSBKaWFuVG91X1R5cGUuUklHSFQ6eyAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIGxldCByaWdodD10aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoJ3JpZ2h0Jyk7XHJcbiAgICAgICAgICAgICAgICByaWdodC5zdG9wQWxsQWN0aW9ucygpO1xyXG4gICAgICAgICAgICAgICAgbGV0IGRpc1k9MTY4KzAqMTIzO1xyXG4gICAgICAgICAgICAgICAgY2MudHdlZW4ocmlnaHQpLnRvKDAuMSx7aGVpZ2h0OmRpc1l9KS5zdGFydCgpO1xyXG4gICAgICAgICAgICB9YnJlYWs7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGNsaWNrQnRuRmFzdCgpe1xyXG4gICAgICAgIEdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuc291bmRfbWFuYWdlci5wbGF5U291bmQoU291bmRJbmRleC5jbGljayk7XHJcbiAgICAgICAgRm9sbG93TWFuYWdlci5nZXRJbnN0YW5jZSgpLmZvbGxvd0V2ZW50KEZvbGxvd19UeXBlLuS4u+mhteW/q+mAn+aMguacuuaMiemSrueCueWHu+asoeaVsCk7XHJcbiAgICAgICAgLy8gVUlNYW5hZ2VyLmdldEluc3RhbmNlKCkuc2hvd0Zhc3RHdWFqaVVpKHtvbkNsb3NlOigpPT57XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgIC8vIH19KTtcclxuICAgICAgICBVSU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zaG93VWlEaWFsb2coVUlQYXRoLkZhc3RHdWFKaSxVSUxheWVyTGV2ZWwuT25lLHtvbkNvbXBsZXRlZDoodWlOb2RlKT0+IHt9LH0pO1xyXG4gICAgfVxyXG5cclxuICAgIGNsaWNrQnRuU2FvRGFuZygpXHJcbiAgICB7XHJcbiAgICAgICAgR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zb3VuZF9tYW5hZ2VyLnBsYXlTb3VuZChTb3VuZEluZGV4LmNsaWNrKTtcclxuICAgICAgIFxyXG4gICAgfVxyXG5cclxuICAgIGNsaWNrQnRuU3RhcnQgKCkge1xyXG4gICAgICAgIEZvbGxvd01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5mb2xsb3dFdmVudChGb2xsb3dfVHlwZS7mjJHmiJjmjInpkq7nmoTngrnlh7vmrKHmlbApO1xyXG4gICAgICAgIC8vIGNvbnNvbGUubG9nKFwiX19fX19fX19fX1wiLChPZmZsaW5lUmV2ZW51ZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRUaW1lKExldmVsTWFuYWdlci5nZXRJbnN0YW5jZSgpLmZpbmlzaF9sZXZlbCkpLE1pc3Npb25MZXZlbE1hbmFnZXIuZ2V0TWF4TGV2ZWwoKSlcclxuICAgICAgICBpZigoTGV2ZWxNYW5hZ2VyLmdldEluc3RhbmNlKCkuZmluaXNoX2xldmVsKT49TWlzc2lvbkxldmVsTWFuYWdlci5nZXRNYXhMZXZlbCgpKXtcclxuICAgICAgICAgICAgR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zaG93TWVzc2FnZShMYW5ndWFnZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRTdHJCeVRleHRJZCgxMDAxMjEpLDMpO1xyXG4gICAgICAgICAgICByZXR1cm5cclxuICAgICAgICAgICAgLy8gR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zaG93TWVzc2FnZShcIuS9oOWkquWOieWus+WVpu+8jOa1i+ivleeJiOacrOaaguaXtuayoeacieS6hu+8jOaVrOivt+acn+W+heWQjue7reeJiOacrO+8geiusOW+l+WKoGlkXCIsMyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIEdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuY3VyX2dhbWVfbW9kZT1HYW1lTW9kZS5NYWluO1xyXG4gICAgICAgIEZvbGxvd01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5mb2xsb3dFdmVudChGb2xsb3dfVHlwZS7ngrnlh7vlvIDlp4vmjJHmiJjnlKjmiLfmlbApO1xyXG4gICAgICAgIEdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuc291bmRfbWFuYWdlci5wbGF5U291bmQoU291bmRJbmRleC5jbGljayk7XHJcbiAgICAgICAgLy9MZXZlbE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zdGFydF9sZXZlbD10aGlzLmN1cl9zZWxlY3RlZF9sZXZlbDtcclxuICAgICAgICBpZighVHV0b3JhaWxzTWFuYWdlci5nZXRJbnN0YW5jZSgpLmlzX2ZpbmlzaF9nYW1lKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgTGV2ZWxNYW5hZ2VyLmdldEluc3RhbmNlKCkuc3RhcnRfbGV2ZWw9TWFwTWFuYWdlci5DdXJyZW50bGV2ZWw9TGV2ZWxNYW5hZ2VyLmdldEluc3RhbmNlKCkuZmluaXNoX2xldmVsKzE7XHJcbiAgICAgICAgICAgIHRoaXMuc3RhcnRHYW1lKCk7XHJcbiAgICAgICAgfWVsc2VcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGxldCBtYXg9T2ZmbGluZVJldmVudWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0VGltZShMZXZlbE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5maW5pc2hfbGV2ZWwpO1xyXG4gICAgICAgICAgICBpZihPZmZsaW5lUmV2ZW51ZU1hbmFnZXIuZ2V0R3VhSmlNaW4oKT49bWF4KXtcclxuICAgICAgICAgICAgICAgIC8vIFVJTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNob3dPZmZsaW5lVWkoe1xyXG4gICAgICAgICAgICAgICAgLy8gICAgIG9uUmVmcmVzaDooKT0+e1xyXG4gICAgICAgICAgICAgICAgLy8gICAgICAgICB0aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoJ2J0bk9mZmxpbmVHaWZ0JykuZ2V0Q29tcG9uZW50KEd1YUppR2lmdCkuY2hlYWsoKTtcclxuICAgICAgICAgICAgICAgIC8vICAgICB9XHJcbiAgICAgICAgICAgICAgICAvLyB9KTtcclxuICAgICAgICAgICAgICAgIFVJTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNob3dVaURpYWxvZyhVSVBhdGguR3VhamksVUlMYXllckxldmVsLk9uZSx7b25Db21wbGV0ZWQ6KHVpTm9kZSk9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgdWlOb2RlLmdldENvbXBvbmVudChPZmZsaW5lVWkpLmluaXQoe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBvblJlZnJlc2g6KCk9PntcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZSgnYnRuT2ZmbGluZUdpZnQnKS5nZXRDb21wb25lbnQoR3VhSmlHaWZ0KS5jaGVhaygpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIH0sfSlcclxuICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICAvLyBVSU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zaG93TWFwVWkoe29uQ2xvc2U6KCk9PntcclxuICAgICAgICAgICAgICAgIC8vICAgICB0aGlzLmN1cl9zZWxlY3RlZF9sZXZlbD1MZXZlbE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zdGFydF9sZXZlbDsgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgLy8gICAgIEdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkucmVmcmVzaFpoYW5saVNob3coKTtcclxuICAgICAgICAgICAgICAgIC8vIH19KTsgICAgIFxyXG4gICAgICAgICAgICAgICAgaWYoTWFwTWFuYWdlci5DdXJyZW50bGV2ZWw9PTApe1xyXG4gICAgICAgICAgICAgICAgICAgIExldmVsTWFuYWdlci5nZXRJbnN0YW5jZSgpLnN0YXJ0X2xldmVsPU1hcE1hbmFnZXIuQ3VycmVudGxldmVsPUxldmVsTWFuYWdlci5nZXRJbnN0YW5jZSgpLmZpbmlzaF9sZXZlbCsxO1xyXG4gICAgICAgICAgICAgICAgfSAgICAgICAgXHJcbiAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIFVJTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNob3dVaURpYWxvZyhVSVBhdGguVG9QbGF5LFVJTGF5ZXJMZXZlbC5PbmUse29uQ29tcGxldGVkOih1aU5vZGUpPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHVpTm9kZS5nZXRDb21wb25lbnQoVG9QbGF5TWFpblVpKS5pbml0KHtvbkNsb3NlOigpPT57XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIE1hcE1hbmFnZXIuQ3VycmVudGxldmVsPUxldmVsTWFuYWdlci5nZXRJbnN0YW5jZSgpLmZpbmlzaF9sZXZlbCsxO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmN1cl9zZWxlY3RlZF9sZXZlbD1MZXZlbE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zdGFydF9sZXZlbDsgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLnJlZnJlc2haaGFubGlTaG93KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfX0pO1xyXG4gICAgICAgICAgICAgICAgfSx9KVxyXG4gICAgICAgICAgICB9ICAgICAgICAgICAgXHJcbiAgICAgICAgfVxyXG4gICAgfSAgICBcclxuXHJcbiAgICBjbGlja0J0blJhYmF0ZSgpe1xyXG4gICAgICAgIEdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuc291bmRfbWFuYWdlci5wbGF5U291bmQoU291bmRJbmRleC5jbGljayk7XHJcbiAgICAgICAgaWYoIUZ1bmN0aW9uRGVmaW5pdGlvbk1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRJc1VubG9jayhGdW5jVHlwZS5GYW5MaSkpeyAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNob3dNZXNzYWdlKExhbmd1YWdlTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldFN0cmluZyhMYW5ndWFnZUluZGV4LlVubG9ja0FmdGVyKStMYW5ndWFnZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRTdHJpbmcoTGFuZ3VhZ2VJbmRleC5QbGF5ZXJMdikrRnVuY3Rpb25EZWZpbml0aW9uTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldFVubG9ja0NvbmRpY3Rpb25QYXJhbWV0ZXIoRnVuY1R5cGUuRmFuTGkpKTtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvLyBVSU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zaG93UmFiYXRlVWkoKTtcclxuICAgIH1cclxuXHJcbiAgICBjbGlja0J0bkdpZnQoKXtcclxuICAgICAgICBHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNvdW5kX21hbmFnZXIucGxheVNvdW5kKFNvdW5kSW5kZXguY2xpY2spO1xyXG4gICAgICAgIGlmKCFGdW5jdGlvbkRlZmluaXRpb25NYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0SXNVbmxvY2soRnVuY1R5cGUuTGlCYW8pKXsgICAgICAgICAgICBcclxuICAgICAgICAgICAgR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zaG93TWVzc2FnZShMYW5ndWFnZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRTdHJpbmcoTGFuZ3VhZ2VJbmRleC5VbmxvY2tBZnRlcikrTGFuZ3VhZ2VNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0U3RyaW5nKExhbmd1YWdlSW5kZXguUGxheWVyTHYpK0Z1bmN0aW9uRGVmaW5pdGlvbk1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRVbmxvY2tDb25kaWN0aW9uUGFyYW1ldGVyKEZ1bmNUeXBlLkxpQmFvKSk7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy8gVUlNYW5hZ2VyLmdldEluc3RhbmNlKCkuc2hvd0dpZnRDZW50ZXJVaSgpO1xyXG4gICAgfVxyXG5cclxuICAgIGNsaWNrQnRuV2Vla0dpZnQoKXtcclxuICAgICAgICBHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNvdW5kX21hbmFnZXIucGxheVNvdW5kKFNvdW5kSW5kZXguY2xpY2spO1xyXG4gICAgICAgIGlmKCFGdW5jdGlvbkRlZmluaXRpb25NYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0SXNVbmxvY2soRnVuY1R5cGUuWmhvdUxpQmFvKSl7ICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIEdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuc2hvd01lc3NhZ2UoTGFuZ3VhZ2VNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0U3RyaW5nKExhbmd1YWdlSW5kZXguVW5sb2NrQWZ0ZXIpK0xhbmd1YWdlTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldFN0cmluZyhMYW5ndWFnZUluZGV4LlBsYXllckx2KStGdW5jdGlvbkRlZmluaXRpb25NYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0VW5sb2NrQ29uZGljdGlvblBhcmFtZXRlcihGdW5jVHlwZS5aaG91TGlCYW8pKTtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICBcclxuICAgIH1cclxuICAgIGNsaWNrQnRuTWFpbkljb25NYXAoKXsvL+aJk+W8gOWkp+WcsOWbviAgXHJcbiAgICAgICAgRm9sbG93TWFuYWdlci5nZXRJbnN0YW5jZSgpLmZvbGxvd0V2ZW50KEZvbGxvd19UeXBlLuWkp+WcsOWbvuaMiemSrueCueWHu+asoeaVsCk7XHJcbiAgICAgICAgdGhpcy5CaWdNYXAuYWN0aXZlPXRydWVcclxuICAgIH1cclxuICAgIC8qKuaYvuekuuaMguacuuWlluWKseeVjOmdoiAqL1xyXG4gICAgY2xpY2tCdG5NYWluSWNvbklkbGUoKXtcclxuICAgICAgICBGb2xsb3dNYW5hZ2VyLmdldEluc3RhbmNlKCkuZm9sbG93RXZlbnQoRm9sbG93X1R5cGUu56a757q/5pS255uK5oyJ6ZKu54K55Ye75qyh5pWwKTtcclxuICAgICAgICBVSU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zaG93VWlEaWFsb2coVUlQYXRoLkd1YWppLFVJTGF5ZXJMZXZlbC5PbmUse29uQ29tcGxldGVkOigpPT57XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgIH19KTtcclxuICAgIH1cclxuXHJcbiAgICBzdGFydEdhbWUoKVxyXG4gICAge1xyXG4gICAgICAgIHRoaXMuc2V0TGV2ZWxEYXRhKCk7XHJcbiAgICAgICAgbGV0IGJnTG9hZGluZz1VSU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRMb2FkaW5nTm9kZSgpO1xyXG4gICAgICAgIGJnTG9hZGluZy5hY3RpdmU9dHJ1ZTtcclxuICAgICAgICBsZXQgbG9hZGluZ0Jhcj1iZ0xvYWRpbmcuZ2V0Q2hpbGRCeU5hbWUoJ1Byb2dyZXNzQmFyJykuZ2V0Q29tcG9uZW50KGNjLlByb2dyZXNzQmFyKTtcclxuICAgICAgICBsZXQgbG9hZExhYmVsPWxvYWRpbmdCYXIubm9kZS5nZXRDaGlsZEJ5TmFtZSgnbG9hZExhYmVsJykuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKTtcclxuICAgICAgICBjYy5kaXJlY3Rvci5wcmVsb2FkU2NlbmUoR2FtZVNjZW5lLmdhbWUsKGNvbXBsZXRlZENvdW50OiBudW1iZXIsIHRvdGFsQ291bnQ6IG51bWJlciwgaXRlbTogYW55KT0+e1xyXG4gICAgICAgICAgICAvL+ecn+Wunui/m+W6plxyXG4gICAgICAgICAgICBsZXQgcHJvZ3Jlc3NUcnVlPWNvbXBsZXRlZENvdW50L3RvdGFsQ291bnQ7XHJcbiAgICAgICAgICAgIC8v5YGH55qE6L+b5bqmXHJcbiAgICAgICAgICAgIGxldCBwcm9ncmVzc0ZhbHNlPXByb2dyZXNzVHJ1ZS8yO1xyXG4gICAgICAgICAgICBsb2FkaW5nQmFyLnByb2dyZXNzID0gcHJvZ3Jlc3NGYWxzZTtcclxuICAgICAgICAgICAgbG9hZExhYmVsLnN0cmluZz0obG9hZGluZ0Jhci5wcm9ncmVzcyoxMDApLnRvRml4ZWQoMCkrJyUnO1xyXG4gICAgICAgICAgICBHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLmN1cl9sb2FkX3Byb2dyZXNzPXByb2dyZXNzRmFsc2U7XHJcbiAgICAgICAgICAgIC8vdGhpcy5sb2FkaW5nX2xpZ2h0LnggPSB0aGlzLmxvYWRpbmdfYmFyLnByb2dyZXNzKnRoaXMubG9hZGluZ19iYXIudG90YWxMZW5ndGgtdGhpcy5sb2FkaW5nX2Jhci50b3RhbExlbmd0aC8yO1xyXG4gICAgICAgIH0sKCk9PntcclxuICAgICAgICAgICAgY2MuZGlyZWN0b3IubG9hZFNjZW5lKEdhbWVTY2VuZS5nYW1lKTtcclxuICAgICAgICB9KTtcclxuICAgICAgICBcclxuICAgIH1cclxuXHJcbiAgICByZWZyZXNoTWFpblRhc2tVaSgpe1xyXG4gICAgICAgIGxldCB0YXNrVWkgPSB0aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJtYWluVGFza1wiKTtcclxuICAgICAgICBsZXQgZWZmZWN0ID0gdGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKFwibWFpblRhc2tFZmZlY3RcIik7XHJcbiAgICAgICAgbGV0IG1haW5fZGF0YSA9IFRhc2tNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0TWFpblRhc2tEYXRhKCk7XHJcbiAgICAgICAgaWYobWFpbl9kYXRhID09IG51bGwpe1xyXG4gICAgICAgICAgICB0YXNrVWkuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgIGVmZmVjdC5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLnNjaGVkdWxlT25jZSgoKT0+e1xyXG4gICAgICAgICAgICBlZmZlY3QuaGVpZ2h0ID0gdGFza1VpLmhlaWdodDtcclxuICAgICAgICB9LDAuMDIpO1xyXG4gICAgICAgIGxldCBub3dOdW0gPSBUaGVTdG9yYWdlTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldE51bWJlcihTdG9yYWdlS2V5LlRhc2tNYWluTnVtICsgbWFpbl9kYXRhLlRhc2tUeXBlLDApO1xyXG4gICAgICAgIHRhc2tVaS5nZXRDaGlsZEJ5TmFtZShcImNvbnRlbnRcIikuZ2V0Q29tcG9uZW50KFRleHRMYW5ndWFnZSkuc2V0VGV4dElkKG1haW5fZGF0YS5UaHJlYWRUYXNrRGVzY3JpcHRpb24pO1xyXG4gICAgICAgIHRhc2tVaS5nZXRDaGlsZEJ5TmFtZShcImNvbnRlbnRcIikuZ2V0Q29tcG9uZW50SW5DaGlsZHJlbihjYy5MYWJlbCkuc3RyaW5nID0gbm93TnVtICsgJy8nICsgbWFpbl9kYXRhLlRhc2tQYXJhbWV0ZXJzXHJcbiAgICAgICAgbGV0IGNvbnRlbnQgPSB0YXNrVWkuZ2V0Q2hpbGRCeU5hbWUoXCJjb250ZW50XCIpO1xyXG4gICAgICAgIGlmKG5vd051bT49bWFpbl9kYXRhLlRhc2tQYXJhbWV0ZXJzKXtcclxuICAgICAgICAgICAgZWZmZWN0LmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgIGNvbnRlbnQuZ2V0Q2hpbGRCeU5hbWUoXCJudW1cIikuY29sb3IgPSBjYy5jb2xvcig0NywyNTUsNDIpO1xyXG4gICAgICAgICAgICBUaGVTdG9yYWdlTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNldEl0ZW0oU3RvcmFnZUtleS5UYXNrU3RhdGUgKyBtYWluX2RhdGEuVGhyZWFkVGFza0lELDEpO1xyXG4gICAgICAgICAgICBjb250ZW50LmdldENvbXBvbmVudEluQ2hpbGRyZW4oY2MuTGFiZWwpLnN0cmluZyA9IG1haW5fZGF0YS5UYXNrUGFyYW1ldGVycyArICcvJyArIG1haW5fZGF0YS5UYXNrUGFyYW1ldGVyc1xyXG4gICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICBjb250ZW50LmdldENoaWxkQnlOYW1lKFwibnVtXCIpLmNvbG9yID0gY2MuY29sb3IoMjU1LDI1NSwyNTUpO1xyXG4gICAgICAgICAgICBlZmZlY3QuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmKG1haW5fZGF0YS5UYXNrVHlwZSA9PSAxKXtcclxuICAgICAgICAgICAgdGFza1VpLmdldENoaWxkQnlOYW1lKFwiY29udGVudFwiKS5nZXRDb21wb25lbnRJbkNoaWxkcmVuKGNjLkxhYmVsKS5zdHJpbmcgPSAobm93TnVtPj1tYWluX2RhdGEuVGFza1BhcmFtZXRlcnM/MTowKSArICcvJyArIFwiMVwiO1xyXG4gICAgICAgIH1cclxuICAgICAgICBsZXQgcmV3YXJkID0gdGFza1VpLmdldENoaWxkQnlOYW1lKFwicmV3YXJkXCIpO1xyXG4gICAgICAgIHJld2FyZC5nZXRDaGlsZEJ5TmFtZShcImdlbUxhYmVsXCIpLmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nID0gbWFpbl9kYXRhLlByb3BOdW1fMiArICcnO1xyXG4gICAgICAgIHJld2FyZC5nZXRDaGlsZEJ5TmFtZShcImNvaW5MYWJlbFwiKS5nZXRDb21wb25lbnQoY2MuTGFiZWwpLnN0cmluZyA9IG1haW5fZGF0YS5Qcm9wTnVtXzEgKyAnJztcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGdldFpvbmdaaGFuTGlKc29uU3RyaW5nKCk6c3RyaW5ne1xyXG4gICAgICAgIGxldCB1aWQ9VXNlckRhdGEuZ2V0SW5zdGFuY2UoKS5nZXRVc2VySUQoKTtcclxuICAgICAgICBsZXQgem9uZ1poYW5MaSA9IEhlcm9NYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0QWxsSGVyb1poYW5saSgpO1xyXG4gICAgICAgIHJldHVybiBKU09OLnN0cmluZ2lmeSh7XHJcbiAgICAgICAgICAgIHR5cGU6MSxcclxuICAgICAgICAgICAgdWlkOnVpZCxcclxuICAgICAgICAgICAgdmFsdWU6em9uZ1poYW5MaSxcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbn1cclxuIl19