
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
                LevelManager_1.LevelManager.getInstance().start_level = MapManager_1.default.Currentlevel = LevelManager_1.LevelManager.getInstance().finish_level + 1;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0c1xcVUlcXGhvbWVcXE1haW5VaS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSw2Q0FBc0Y7QUFFdEYsaURBQTRDO0FBQzVDLDJFQUF3RjtBQUN4Rix1RUFBa0U7QUFDbEUsNkRBQW9FO0FBQ3BFLG1FQUE4RDtBQUM5RCx1RUFBa0U7QUFFbEUscUVBQWdFO0FBQ2hFLHlEQUF3RDtBQUN4RCx5REFBK0Q7QUFDL0QsZ0VBQXNFO0FBQ3RFLHdFQUE4RTtBQUM5RSwwQ0FBeUM7QUFDekMsNkNBQXdDO0FBQ3hDLHNEQUFpRDtBQUNqRCx3Q0FBbUQ7QUFDbkQsc0RBQWlEO0FBQ2pELCtDQUEwQztBQUMxQyxxREFBZ0Q7QUFDaEQsMkRBQWlFO0FBQ2pFLHNEQUFpRDtBQUNqRCxpRUFBNEQ7QUFDNUQsNkRBQXlEO0FBQ3pELCtEQUFpRTtBQUNqRSwyREFBc0U7QUFDdEUsMkRBQTBEO0FBQzFELDJDQUFzQztBQUVoQyxJQUFBLEtBQXNCLEVBQUUsQ0FBQyxVQUFVLEVBQWxDLE9BQU8sYUFBQSxFQUFFLFFBQVEsY0FBaUIsQ0FBQztBQUcxQztJQUFvQywwQkFBWTtJQUFoRDtRQUFBLHFFQTRhQztRQTFhRyx3QkFBa0IsR0FBUSxDQUFDLENBQUM7UUFDNUIsb0JBQWMsR0FBUyxJQUFJLENBQUM7UUFDNUIsZ0JBQVUsR0FBUyxJQUFJLENBQUM7UUFHeEIsaUJBQVcsR0FBa0IsRUFBRSxDQUFDO1FBR2hDLGFBQU8sR0FBZ0IsSUFBSSxDQUFDO1FBRzVCLFlBQU0sR0FBUyxJQUFJLENBQUM7O0lBK1p4QixDQUFDO0lBN1pHLHVCQUFNLEdBQU47UUFFSSxJQUFJLENBQUMsa0JBQWtCLEdBQUMsMkJBQVksQ0FBQyxXQUFXLEVBQUUsQ0FBQyxZQUFZLEdBQUMsQ0FBQyxDQUFDO1FBQ2xFLElBQUcsSUFBSSxDQUFDLGtCQUFrQixHQUFDLGtDQUFtQixDQUFDLFdBQVcsRUFBRSxF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Q0E1YW1DLEVBQUUsQ0FBQyxTQUFTLEdBNGEvQztrQkE1YW9CLE1BQU0iLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBGdW5jVHlwZSwgR2FtZU1vZGUsIEdhbWVTY2VuZSwgSXNEZWJ1ZywgSmlhblRvdV9UeXBlfSBmcm9tIFwiLi4vLi4vQ29uc3RhbnRzXCI7XHJcbmltcG9ydCBHYW1lRGF0YSBmcm9tIFwiLi4vLi4vR2FtZURhdGFcIjtcclxuaW1wb3J0IEdhbWVNYW5hZ2VyIGZyb20gXCIuLi8uLi9HYW1lTWFuYWdlclwiO1xyXG5pbXBvcnQgeyBMYW5ndWFnZUluZGV4LCBPbkxhbmd1YWdlQ2hhbmdlIH0gZnJvbSBcIi4uLy4uL211bHRpTGFuZ3VhZ2UvTGFuZ3VhZ2VDb25zdGFudHNcIjtcclxuaW1wb3J0IExhbmd1YWdlTWFuYWdlciBmcm9tIFwiLi4vLi4vbXVsdGlMYW5ndWFnZS9MYW5ndWFnZU1hbmFnZXJcIjtcclxuaW1wb3J0IHsgTXVzaWNJbmRleCwgU291bmRJbmRleCB9IGZyb20gXCIuLi8uLi9Tb3VuZC9BdWRpb0NvbnN0YW50c1wiO1xyXG5pbXBvcnQgRm9sbG93TWFuYWdlciBmcm9tIFwiLi4vLi4vbXVsdGlMYW5ndWFnZS9Gb2xsb3dNYW5hZ2VyXCI7XHJcbmltcG9ydCB7IEZvbGxvd19UeXBlIH0gZnJvbSBcIi4uLy4uL211bHRpTGFuZ3VhZ2UvRm9sbG93Q29uc3RhbnRzXCI7XHJcbmltcG9ydCB7IFZpcE1hbmFnZXIgfSBmcm9tIFwiLi4vLi4vQWRzL1ZpcE1hbmFnZXJcIjtcclxuaW1wb3J0IFR1dG9yYWlsc01hbmFnZXIgZnJvbSBcIi4uLy4uL1R1dG9yaWFscy9UdXRvcmFpbHNNYW5hZ2VyXCI7XHJcbmltcG9ydCB7IExldmVsTWFuYWdlciB9IGZyb20gXCIuLi8uLi9MZXZlbC9MZXZlbE1hbmFnZXJcIjtcclxuaW1wb3J0IHsgTWlzc2lvbkxldmVsTWFuYWdlciB9IGZyb20gXCIuLi8uLi9MZXZlbC9NaXNzaW9uTGV2ZWxcIjtcclxuaW1wb3J0IHsgT2ZmbGluZVJldmVudWVNYW5hZ2VyIH0gZnJvbSBcIi4uLy4uL0pzb25EYXRhL09mZmxpbmVSZXZlbnVlXCI7XHJcbmltcG9ydCB7IEZ1bmN0aW9uRGVmaW5pdGlvbk1hbmFnZXIgfSBmcm9tIFwiLi4vLi4vSnNvbkRhdGEvRnVuY3Rpb25EZWZpbml0aW9uXCI7XHJcbmltcG9ydCB7IFVJTWFuYWdlciB9IGZyb20gXCIuLi9VSU1hbmFnZXJcIjtcclxuaW1wb3J0IEZ1bmNUeXBlQnRuIGZyb20gXCIuL0Z1bmNUeXBlQnRuXCI7XHJcbmltcG9ydCBHdWFKaUdpZnQgZnJvbSBcIi4uLy4uL0d1YUppL1VpL0d1YUppR2lmdFwiO1xyXG5pbXBvcnQgeyBVSUxheWVyTGV2ZWwsIFVJUGF0aCB9IGZyb20gXCIuLi9VSUNvbmZpZ1wiO1xyXG5pbXBvcnQgT2ZmbGluZVVpIGZyb20gXCIuLi8uLi9HdWFKaS9VaS9PZmZsaW5lVWlcIjtcclxuaW1wb3J0IFRvUGxheU1haW5VaSBmcm9tIFwiLi9Ub1BsYXlNYWluVWlcIjtcclxuaW1wb3J0IE1hcE1hbmFnZXIgZnJvbSBcIi4uLy4uL0d1YUppL01hcE1hbmFnZXJcIjtcclxuaW1wb3J0IHsgVHV0b3JpYWxMZXZlbE1hbmFnZXIgfSBmcm9tIFwiLi4vLi4vTGV2ZWwvVHV0b3JpYWxMZXZlbFwiO1xyXG5pbXBvcnQgVGFza01hbmFnZXIgZnJvbSBcIi4uLy4uL1Rhc2svVGFza01hbmFnZXJcIjtcclxuaW1wb3J0IFRleHRMYW5ndWFnZSBmcm9tIFwiLi4vLi4vbXVsdGlMYW5ndWFnZS9UZXh0TGFuZ3VhZ2VcIjtcclxuaW1wb3J0IHsgU3RvcmFnZUtleSB9IGZyb20gXCIuLi8uLi9TdG9yYWdlL1N0b3JhZ2VDb25maWdcIjtcclxuaW1wb3J0IHsgVGhlU3RvcmFnZU1hbmFnZXIgfSBmcm9tIFwiLi4vLi4vU3RvcmFnZS9TdG9yYWdlTWFuYWdlclwiO1xyXG5pbXBvcnQgeyBIdHRwTWFuYWdlciwgQWNjZXNzTmFtZSB9IGZyb20gXCIuLi8uLi8uL05ldFdvcmsvSHR0cE1hbmFnZXJcIjtcclxuaW1wb3J0IHsgSGVyb01hbmFnZXIgfSBmcm9tIFwiLi4vLi4vSGVyby9EYXRhL0hlcm9NYW5hZ2VyXCI7XHJcbmltcG9ydCBVc2VyRGF0YSBmcm9tIFwiLi4vLi4vVXNlckRhdGFcIjtcclxuXHJcbmNvbnN0IHtjY2NsYXNzLCBwcm9wZXJ0eX0gPSBjYy5fZGVjb3JhdG9yO1xyXG5cclxuQGNjY2xhc3NcclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTWFpblVpIGV4dGVuZHMgY2MuQ29tcG9uZW50IHtcclxuICAgIFxyXG4gICAgY3VyX3NlbGVjdGVkX2xldmVsOm51bWJlcj0xO1xyXG4gICAgY3VyX2xldmVsX25hbWU6Y2MuTm9kZT1udWxsO1xyXG4gICAgY3VyX2F2YXRhcjpjYy5Ob2RlPW51bGw7XHJcblxyXG4gICAgQHByb3BlcnR5KFtjYy5TcHJpdGVGcmFtZV0pXHJcbiAgICBzcF9sZXZlbF9iZzpjYy5TcHJpdGVGcmFtZVtdPVtdO1xyXG5cclxuICAgIEBwcm9wZXJ0eShjYy5TcHJpdGVGcmFtZSlcclxuICAgIHNwX2Jvc3M6Y2MuU3ByaXRlRnJhbWU9bnVsbDtcclxuXHJcbiAgICBAcHJvcGVydHkoY2MuTm9kZSlcclxuICAgIEJpZ01hcDpjYy5Ob2RlPW51bGw7XHJcblxyXG4gICAgb25Mb2FkKClcclxuICAgIHtcclxuICAgICAgICB0aGlzLmN1cl9zZWxlY3RlZF9sZXZlbD1MZXZlbE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5maW5pc2hfbGV2ZWwrMTtcclxuICAgICAgICBpZih0aGlzLmN1cl9zZWxlY3RlZF9sZXZlbD5NaXNzaW9uTGV2ZWxNYW5hZ2VyLmdldE1heExldmVsKCkpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLmN1cl9zZWxlY3RlZF9sZXZlbD1NaXNzaW9uTGV2ZWxNYW5hZ2VyLmdldE1heExldmVsKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vIGNjLnJlc291cmNlcy5sb2FkKCd1aS9ob21lL21hcF91aScpO1xyXG4gICAgICAgIC8vIGNjLnJlc291cmNlcy5sb2FkKCd1aS9ob21lL3RlYW1fc2VsZWN0X3VpJyk7XHJcbiAgICAgICAgY2MuZGlyZWN0b3Iub24oT25MYW5ndWFnZUNoYW5nZSx0aGlzLnNob3dMZXZlbE5hbWUsdGhpcyk7XHJcbiAgICAgICAgdGhpcy5ub2RlLm9uKGNjLk5vZGUuRXZlbnRUeXBlLlBPU0lUSU9OX0NIQU5HRUQsdGhpcy5vblBvc2l0aW9uQ2hhbmdlLHRoaXMpO1xyXG4gICAgfVxyXG5cclxuICAgIHByb3RlY3RlZCBvbkRlc3Ryb3koKTogdm9pZCB7ICAgICAgICBcclxuICAgICAgICBjYy5kaXJlY3Rvci5vZmYoT25MYW5ndWFnZUNoYW5nZSx0aGlzLnNob3dMZXZlbE5hbWUsdGhpcyk7XHJcbiAgICAgICAgdGhpcy5ub2RlLm9mZihjYy5Ob2RlLkV2ZW50VHlwZS5QT1NJVElPTl9DSEFOR0VELHRoaXMub25Qb3NpdGlvbkNoYW5nZSx0aGlzKTtcclxuICAgIH1cclxuXHJcbiAgICBvblBvc2l0aW9uQ2hhbmdlKCl7XHJcbiAgICAgICAgaWYodGhpcy5ub2RlLng9PTApe1xyXG4gICAgICAgICAgICB0aGlzLm9uRW5hYmxlKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHN0YXJ0KClcclxuICAgIHtcclxuICAgICAgICAvLyB0aGlzLnNob3dMZXZlbEluZm8oKTtcclxuICAgIH1cclxuXHJcbiAgICBvbkVuYWJsZSgpXHJcbiAgICB7XHJcbiAgICAgICAgRm9sbG93TWFuYWdlci5nZXRJbnN0YW5jZSgpLmZvbGxvd0V2ZW50KEZvbGxvd19UeXBlLummlumhteS4u+eVjOmdouWxleekuuaAu+asoeaVsCk7XHJcbiAgICAgICAgSHR0cE1hbmFnZXIucG9zdChBY2Nlc3NOYW1lLnVwZGF0ZVVzZXJJbmZvLHRoaXMuZ2V0Wm9uZ1poYW5MaUpzb25TdHJpbmcoKSk7XHJcbiAgICAgICAgdGhpcy5yZWZyZXNoTGVmdFJpZ2h0KCk7XHJcbiAgICAgICAgdGhpcy5yZWZyZXNoTWFpblRhc2tVaSgpO1xyXG4gICAgICAgIGlmKEdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuY3VyX2dhbWVfc2NlbmU9PUdhbWVTY2VuZS5ob21lKXtcclxuICAgICAgICAgICAgLy8gR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5tdXNpY19tYW5hZ2VyLnBsYXlNdXNpYyhNdXNpY0luZGV4LkJHTV9HdWFqaUJnbSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHJlZnJlc2hMZWZ0UmlnaHQoKXtcclxuICAgICAgICB0aGlzLnJlZnJlc2hMZWZ0KCk7XHJcbiAgICAgICAgdGhpcy5yZWZyZXNoUmlnaHQoKTtcclxuICAgIH1cclxuICAgIFxyXG4gICAgcmVmcmVzaExlZnQoKXtcclxuICAgICAgICBsZXQgbGVmdD10aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoJ2xlZnQnKTtcclxuICAgICAgICAvL+eul+WHuuacieWHoOS4quaYr+aYvuekuueahFxyXG4gICAgICAgIGxldCBzaG93TnVtPTA7XHJcbiAgICAgICAgbGV0IGJ0bnM9bGVmdC5nZXRDaGlsZEJ5TmFtZSgnYnRucycpO1xyXG4gICAgICAgIGZvcihsZXQgaT0wOyBpPGJ0bnMuY2hpbGRyZW5Db3VudDsgaSsrKXtcclxuICAgICAgICAgICAgLy8gbGV0IGlzU2hvdz1mYWxzZTtcclxuICAgICAgICAgICAgbGV0IGZiPWJ0bnMuY2hpbGRyZW5baV0uZ2V0Q29tcG9uZW50KEZ1bmNUeXBlQnRuKTtcclxuICAgICAgICAgICAgYnRucy5jaGlsZHJlbltpXS5hY3RpdmUgPSBmYi5yZWZyZXNoKCk7XHJcbiAgICAgICAgICAgIC8vIGlmKGZiKXtcclxuICAgICAgICAgICAgLy8gICAgIGlzU2hvdz1mYi5yZWZyZXNoKCk7XHJcbiAgICAgICAgICAgIC8vIH1lbHNle1xyXG4gICAgICAgICAgICAvLyAgICAgaXNTaG93PWJ0bnMuY2hpbGRyZW5baV0uYWN0aXZlOyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIC8vIH1cclxuICAgICAgICAgICAgLy8gaWYoaXNTaG93KXtcclxuICAgICAgICAgICAgLy8gICAgIGZiLm5vZGUueT0tNzctKDE1MCpzaG93TnVtKTtcclxuICAgICAgICAgICAgLy8gICAgIHNob3dOdW0rKztcclxuICAgICAgICAgICAgLy8gICAgIC8vIGlmKHNob3dOdW0gPiAxKVxyXG4gICAgICAgICAgICAvLyAgICAgLy8gICAgIGZiLm5vZGUueSAtPSA1MDtcclxuICAgICAgICAgICAgLy8gfVxyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLnNjaGVkdWxlT25jZSgoKT0+e1xyXG4gICAgICAgICAgICBsZWZ0LmhlaWdodCA9IGJ0bnMuaGVpZ2h0ICsgNztcclxuICAgICAgICB9LDAuMDMpO1xyXG4gICAgICAgIC8vIGxlZnQuYWN0aXZlPXNob3dOdW0+MDtcclxuICAgICAgICAvLyBpZihzaG93TnVtPjApe1xyXG4gICAgICAgIC8vICAgICB0aGlzLmRvVW5mb2xkKEppYW5Ub3VfVHlwZS5MRUZUKTtcclxuICAgICAgICAvLyB9XHJcbiAgICB9XHJcblxyXG4gICAgcmVmcmVzaFJpZ2h0KCl7XHJcbiAgICAgICAgbGV0IHJpZ2h0PXRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZSgncmlnaHQnKTtcclxuICAgICAgICAvL+eul+WHuuacieWHoOS4quaYr+aYvuekuueahFxyXG4gICAgICAgIGxldCBzaG93TnVtPTA7XHJcbiAgICAgICAgbGV0IGJ0bnM9cmlnaHQuZ2V0Q2hpbGRCeU5hbWUoJ2J0bnMnKTtcclxuICAgICAgICBmb3IobGV0IGk9MDsgaTxidG5zLmNoaWxkcmVuQ291bnQ7IGkrKyl7XHJcbiAgICAgICAgICAgIC8vIGxldCBpc1Nob3c9ZmFsc2U7XHJcbiAgICAgICAgICAgIGxldCBmYj1idG5zLmNoaWxkcmVuW2ldLmdldENvbXBvbmVudChGdW5jVHlwZUJ0bik7XHJcbiAgICAgICAgICAgIGJ0bnMuY2hpbGRyZW5baV0uYWN0aXZlID0gZmIucmVmcmVzaCgpO1xyXG4gICAgICAgICAgICAvLyBpZihmYil7XHJcbiAgICAgICAgICAgIC8vICAgICBpc1Nob3c9ZmIucmVmcmVzaCgpO1xyXG4gICAgICAgICAgICAvLyB9XHJcbiAgICAgICAgICAgIC8vIGlmKGlzU2hvdyl7XHJcbiAgICAgICAgICAgIC8vICAgICBmYi5ub2RlLnk9LTc3LSgxNTAqc2hvd051bSk7XHJcbiAgICAgICAgICAgIC8vICAgICBzaG93TnVtKys7XHJcbiAgICAgICAgICAgIC8vIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5zY2hlZHVsZU9uY2UoKCk9PntcclxuICAgICAgICAgICAgcmlnaHQuaGVpZ2h0ID0gYnRucy5oZWlnaHQgKyA3O1xyXG4gICAgICAgIH0sMC4wMyk7XHJcbiAgICAgICAgLy8gcmlnaHQuYWN0aXZlPXNob3dOdW0+MDtcclxuICAgICAgICAvLyBpZihzaG93TnVtPjApe1xyXG4gICAgICAgIC8vICAgICB0aGlzLmRvVW5mb2xkKEppYW5Ub3VfVHlwZS5SSUdIVCk7XHJcbiAgICAgICAgLy8gfVxyXG4gICAgfVxyXG4gICAgXHJcbiAgICBzaG93TGV2ZWxJbmZvKClcclxuICAgIHtcclxuICAgICAgICAvL+iOt+WPluW9k+WJjeWFs+WNoVxyXG4gICAgICAgIGxldCBsZXZlbD1MZXZlbE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5maW5pc2hfbGV2ZWwrMTtcclxuICAgICAgICBsZXQgc3RhcnRMZXZlbD0xO1xyXG4gICAgICAgIGlmKGxldmVsPk1pc3Npb25MZXZlbE1hbmFnZXIuZ2V0TWF4TGV2ZWwoKSl7XHJcbiAgICAgICAgICAgIGxldmVsPU1pc3Npb25MZXZlbE1hbmFnZXIuZ2V0TWF4TGV2ZWwoKTsgICAgICAgICAgICBcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYoTWlzc2lvbkxldmVsTWFuYWdlci5nZXRNYXhMZXZlbCgpLWxldmVsPjMpe1xyXG4gICAgICAgICAgICBzdGFydExldmVsPWxldmVsO1xyXG4gICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICBzdGFydExldmVsPU1pc3Npb25MZXZlbE1hbmFnZXIuZ2V0TWF4TGV2ZWwoKS0zO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvL+iOt+WPluW9k+WJjeeroOiKglxyXG4gICAgICAgIGxldCBjaGFwdGVyPU1pc3Npb25MZXZlbE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRDaGFwdGVyKGxldmVsKTtcclxuICAgICAgICAvL+iOt+WPlueroOiKguacgOWQjuS4gOWFs1xyXG4gICAgICAgIGxldCBsYXN0TGV2ZWw9TWlzc2lvbkxldmVsTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldExhc3RMZXZlbChsZXZlbCk7XHJcbiAgICAgICAgbGV0IGN1clNtYWxsTGV2ZWw9TWlzc2lvbkxldmVsTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldExldmVsTnVtKGxldmVsKTtcclxuICAgICAgICAvL+iOt+WPluaYvuekuueahOmmluS4quWFs+WNoeWSjOacq+WFs1xyXG4gICAgICAgIGxldCBzdGFydFNtYWxsTGV2ZWw9MTsgICAgICAgIFxyXG4gICAgICAgIGlmKGxhc3RMZXZlbC1jdXJTbWFsbExldmVsPjMpe1xyXG4gICAgICAgICAgICBzdGFydFNtYWxsTGV2ZWw9Y3VyU21hbGxMZXZlbCAgICAgICAgICAgIFxyXG4gICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICBzdGFydFNtYWxsTGV2ZWw9bGFzdExldmVsLTM7ICAgICAgICAgICAgXHJcbiAgICAgICAgfSAgICAgXHJcbiAgICAgICAgbGV0IGxldmVsUm9vdD10aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoJ2xldmVsJyk7XHJcbiAgICAgICAgLy/nq6DoioLmlbBcclxuICAgICAgICBsZXQgdGl0bGVMYWJlbD1sZXZlbFJvb3QuZ2V0Q2hpbGRCeU5hbWUoJ3RpdGxlTGFiZWwnKTtcclxuICAgICAgICBsZXQgdGl0bGVTdHI9TGFuZ3VhZ2VNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0U3RyQnlUZXh0SWQoMTAwMDUzKS5yZXBsYWNlKCd+JyxjaGFwdGVyKycnKTtcclxuICAgICAgICB0aXRsZUxhYmVsLmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nPXRpdGxlU3RyO1xyXG4gICAgICAgIC8v6L2mXHJcbiAgICAgICAgbGV0IGNhcj1sZXZlbFJvb3QuZ2V0Q2hpbGRCeU5hbWUoJ2NhcicpO1xyXG4gICAgICAgIC8vaWNvblxyXG4gICAgICAgIGxldCBpY29uUm9vdD1sZXZlbFJvb3QuZ2V0Q2hpbGRCeU5hbWUoJ2ljb25Sb290Jyk7XHJcbiAgICAgICAgaWNvblJvb3QucmVtb3ZlQWxsQ2hpbGRyZW4oKTtcclxuICAgICAgICBmb3IobGV0IGk9MTsgaTw9NDsgaSsrKXtcclxuICAgICAgICAgICAgbGV0IGxldmVsQmc9bGV2ZWxSb290LmdldENoaWxkQnlOYW1lKCdsZXZlbCcraSkuZ2V0Q29tcG9uZW50KGNjLlNwcml0ZSk7XHJcbiAgICAgICAgICAgIGxldCBsZXZlbExhYmVsPWxldmVsUm9vdC5nZXRDaGlsZEJ5TmFtZSgnbGFiZWwnK2kpLmdldENvbXBvbmVudChjYy5MYWJlbCk7XHJcbiAgICAgICAgICAgIGxldCBjdXJMZXZlbD0oc3RhcnRTbWFsbExldmVsK2ktMSk7XHJcbiAgICAgICAgICAgIGxldmVsTGFiZWwuc3RyaW5nPScnK2N1ckxldmVsOyAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBpZihjdXJMZXZlbCE9Y3VyU21hbGxMZXZlbCl7XHJcbiAgICAgICAgICAgICAgICBsZXZlbEJnLnNwcml0ZUZyYW1lPXRoaXMuc3BfbGV2ZWxfYmdbMV07XHJcbiAgICAgICAgICAgICAgICBsZXZlbExhYmVsLmZvbnRTaXplPTIyO1xyXG4gICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgIGxldmVsQmcuc3ByaXRlRnJhbWU9dGhpcy5zcF9sZXZlbF9iZ1swXTtcclxuICAgICAgICAgICAgICAgIGNhci54PWxldmVsQmcubm9kZS54O1xyXG4gICAgICAgICAgICAgICAgbGV2ZWxMYWJlbC5mb250U2l6ZT0zMDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAvL+WFs+WNoeS/oeaBr1xyXG4gICAgICAgICAgICBsZXQgbW9uc3RlckluZm89TWlzc2lvbkxldmVsTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldEZpZ2h0aW5nSW5mbyhzdGFydExldmVsK2ktMSk7XHJcbiAgICAgICAgICAgIGlmKG1vbnN0ZXJJbmZvLmdldElzSGF2ZUJvc3MoKSl7XHJcbiAgICAgICAgICAgICAgICBsZXQgYm9zc0ljb249bmV3IGNjLk5vZGUoJ2Jvc3NJY29uJylcclxuICAgICAgICAgICAgICAgIGJvc3NJY29uLmFkZENvbXBvbmVudChjYy5TcHJpdGUpLnNwcml0ZUZyYW1lPXRoaXMuc3BfYm9zcztcclxuICAgICAgICAgICAgICAgIGJvc3NJY29uLng9bGV2ZWxCZy5ub2RlLng7XHJcbiAgICAgICAgICAgICAgICBpY29uUm9vdC5hZGRDaGlsZChib3NzSWNvbik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgc2hvd0xldmVsTmFtZSgpe1xyXG4gICAgICAgIC8v6I635Y+W5b2T5YmN5YWz5Y2hXHJcbiAgICAgICAgbGV0IGxldmVsPUxldmVsTWFuYWdlci5nZXRJbnN0YW5jZSgpLmZpbmlzaF9sZXZlbCsxO1xyXG4gICAgICAgIGlmKGxldmVsPk1pc3Npb25MZXZlbE1hbmFnZXIuZ2V0TWF4TGV2ZWwoKSl7XHJcbiAgICAgICAgICAgIGxldmVsPU1pc3Npb25MZXZlbE1hbmFnZXIuZ2V0TWF4TGV2ZWwoKTsgICAgICAgICAgICBcclxuICAgICAgICB9XHJcbiAgICAgICAgLy/ojrflj5blvZPliY3nq6DoioJcclxuICAgICAgICBsZXQgY2hhcHRlcj1NaXNzaW9uTGV2ZWxNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0Q2hhcHRlcihsZXZlbCk7XHJcbiAgICAgICAgbGV0IGxldmVsUm9vdD10aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoJ2xldmVsJyk7XHJcbiAgICAgICAgLy/nq6DoioLmlbBcclxuICAgICAgICBsZXQgdGl0bGVMYWJlbD1sZXZlbFJvb3QuZ2V0Q2hpbGRCeU5hbWUoJ3RpdGxlTGFiZWwnKTtcclxuICAgICAgICBsZXQgdGl0bGVTdHI9TGFuZ3VhZ2VNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0U3RyQnlUZXh0SWQoMTAwMDUzKS5yZXBsYWNlKCd+JyxjaGFwdGVyKycnKTtcclxuICAgICAgICB0aXRsZUxhYmVsLmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nPXRpdGxlU3RyO1xyXG4gICAgfVxyXG5cclxuICAgIHNldExldmVsRGF0YSgpXHJcbiAgICB7XHJcbiAgICAgICAgbGV0IGdtPUdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCk7XHJcbiAgICAgICAgaWYoIVR1dG9yYWlsc01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5pc19maW5pc2hfZ2FtZSl7XHJcbiAgICAgICAgICAgIExldmVsTWFuYWdlci5nZXRJbnN0YW5jZSgpLnN0YXJ0X2xldmVsPUxldmVsTWFuYWdlci5nZXRJbnN0YW5jZSgpLmZpbmlzaF9sZXZlbCsxO1xyXG4gICAgICAgICAgICBNYXBNYW5hZ2VyLkN1cnJlbnRsZXZlbD1MZXZlbE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zdGFydF9sZXZlbDtcclxuICAgICAgICAgICAgZ20uZmlnaHRpbmdfaW5mbz1UdXRvcmlhbExldmVsTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldEZpZ2h0aW5nSW5mbyhMZXZlbE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zdGFydF9sZXZlbCk7XHJcbiAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgIGdtLmZpZ2h0aW5nX2luZm89TWlzc2lvbkxldmVsTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldEZpZ2h0aW5nSW5mbyhMZXZlbE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zdGFydF9sZXZlbCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8v5bGV5byAXHJcbiAgICBkb1VuZm9sZChqaWFudG91VHlwZTpKaWFuVG91X1R5cGUpXHJcbiAgICB7XHJcbiAgICAgICAgc3dpdGNoKGppYW50b3VUeXBlKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgY2FzZSBKaWFuVG91X1R5cGUuTEVGVDp7XHJcbiAgICAgICAgICAgICAgICAvL+iuoeeul+Wkp+Wwj+acgOWQjuS4gOS4quS9jee9risxMzhcclxuICAgICAgICAgICAgICAgIGxldCBsZWZ0PXRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZSgnbGVmdCcpO1xyXG4gICAgICAgICAgICAgICAgbGVmdC5zdG9wQWxsQWN0aW9ucygpO1xyXG4gICAgICAgICAgICAgICAgLy/nrpflh7rmnInlh6DkuKrmmK/mmL7npLrnmoRcclxuICAgICAgICAgICAgICAgIGxldCBzaG93TnVtPTA7XHJcbiAgICAgICAgICAgICAgICBsZXQgYnRucz1sZWZ0LmdldENoaWxkQnlOYW1lKCdidG5zJyk7XHJcbiAgICAgICAgICAgICAgICBmb3IobGV0IGk9MDsgaTxidG5zLmNoaWxkcmVuQ291bnQ7IGkrKyl7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IGJ0bj1idG5zLmNoaWxkcmVuW2ldO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmKGJ0bi5hY3RpdmUpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzaG93TnVtKys7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgbGV0IGRpc1k9MTY4KyhzaG93TnVtLTEpKjEyMyArIDUwO1xyXG4gICAgICAgICAgICAgICAgY2MudHdlZW4obGVmdCkudG8oMC4yLHtoZWlnaHQ6ZGlzWX0pLnN0YXJ0KCk7XHJcbiAgICAgICAgICAgIH1icmVhaztcclxuICAgICAgICAgICAgY2FzZSBKaWFuVG91X1R5cGUuUklHSFQ6e1xyXG4gICAgICAgICAgICAgICAgbGV0IHJpZ2h0PXRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZSgncmlnaHQnKTtcclxuICAgICAgICAgICAgICAgIHJpZ2h0LnN0b3BBbGxBY3Rpb25zKCk7XHJcbiAgICAgICAgICAgICAgICAvL+eul+WHuuacieWHoOS4quaYr+aYvuekuueahFxyXG4gICAgICAgICAgICAgICAgbGV0IHNob3dOdW09MDtcclxuICAgICAgICAgICAgICAgIGxldCBidG5zPXJpZ2h0LmdldENoaWxkQnlOYW1lKCdidG5zJyk7XHJcbiAgICAgICAgICAgICAgICBmb3IobGV0IGk9MDsgaTxidG5zLmNoaWxkcmVuQ291bnQ7IGkrKyl7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IGJ0bj1idG5zLmNoaWxkcmVuW2ldO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmKGJ0bi5hY3RpdmUpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzaG93TnVtKys7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgbGV0IGRpc1k9MTY4KyhzaG93TnVtLTEpKjEyMyArIDUwOyAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIGNjLnR3ZWVuKHJpZ2h0KS50bygwLjIse2hlaWdodDpkaXNZfSkuc3RhcnQoKTtcclxuICAgICAgICAgICAgfWJyZWFrO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvL+aKmOi1t1xyXG4gICAgZG9Gb2xkZWQoamlhbnRvdVR5cGU6SmlhblRvdV9UeXBlKVxyXG4gICAge1xyXG4gICAgICAgIHN3aXRjaChqaWFudG91VHlwZSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGNhc2UgSmlhblRvdV9UeXBlLkxFRlQ6e1xyXG4gICAgICAgICAgICAgICAgbGV0IGxlZnQ9dGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKCdsZWZ0Jyk7XHJcbiAgICAgICAgICAgICAgICBsZWZ0LnN0b3BBbGxBY3Rpb25zKCk7XHJcbiAgICAgICAgICAgICAgICBsZXQgZGlzWT0xNjgrMCoxMjM7XHJcbiAgICAgICAgICAgICAgICBjYy50d2VlbihsZWZ0KS50bygwLjEse2hlaWdodDpkaXNZfSkuc3RhcnQoKTtcclxuICAgICAgICAgICAgfWJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIEppYW5Ub3VfVHlwZS5SSUdIVDp7ICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgbGV0IHJpZ2h0PXRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZSgncmlnaHQnKTtcclxuICAgICAgICAgICAgICAgIHJpZ2h0LnN0b3BBbGxBY3Rpb25zKCk7XHJcbiAgICAgICAgICAgICAgICBsZXQgZGlzWT0xNjgrMCoxMjM7XHJcbiAgICAgICAgICAgICAgICBjYy50d2VlbihyaWdodCkudG8oMC4xLHtoZWlnaHQ6ZGlzWX0pLnN0YXJ0KCk7XHJcbiAgICAgICAgICAgIH1icmVhaztcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgY2xpY2tCdG5GYXN0KCl7XHJcbiAgICAgICAgR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zb3VuZF9tYW5hZ2VyLnBsYXlTb3VuZChTb3VuZEluZGV4LmNsaWNrKTtcclxuICAgICAgICBGb2xsb3dNYW5hZ2VyLmdldEluc3RhbmNlKCkuZm9sbG93RXZlbnQoRm9sbG93X1R5cGUu5Li76aG15b+r6YCf5oyC5py65oyJ6ZKu54K55Ye75qyh5pWwKTtcclxuICAgICAgICAvLyBVSU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zaG93RmFzdEd1YWppVWkoe29uQ2xvc2U6KCk9PntcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgLy8gfX0pO1xyXG4gICAgICAgIFVJTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNob3dVaURpYWxvZyhVSVBhdGguRmFzdEd1YUppLFVJTGF5ZXJMZXZlbC5PbmUse29uQ29tcGxldGVkOih1aU5vZGUpPT4ge30sfSk7XHJcbiAgICB9XHJcblxyXG4gICAgY2xpY2tCdG5TYW9EYW5nKClcclxuICAgIHtcclxuICAgICAgICBHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNvdW5kX21hbmFnZXIucGxheVNvdW5kKFNvdW5kSW5kZXguY2xpY2spO1xyXG4gICAgICAgXHJcbiAgICB9XHJcblxyXG4gICAgY2xpY2tCdG5TdGFydCAoKSB7XHJcbiAgICAgICAgRm9sbG93TWFuYWdlci5nZXRJbnN0YW5jZSgpLmZvbGxvd0V2ZW50KEZvbGxvd19UeXBlLuaMkeaImOaMiemSrueahOeCueWHu+asoeaVsCk7XHJcbiAgICAgICAgLy8gY29uc29sZS5sb2coXCJfX19fX19fX19fXCIsKE9mZmxpbmVSZXZlbnVlTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldFRpbWUoTGV2ZWxNYW5hZ2VyLmdldEluc3RhbmNlKCkuZmluaXNoX2xldmVsKSksTWlzc2lvbkxldmVsTWFuYWdlci5nZXRNYXhMZXZlbCgpKVxyXG4gICAgICAgIGlmKChMZXZlbE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5maW5pc2hfbGV2ZWwpPj1NaXNzaW9uTGV2ZWxNYW5hZ2VyLmdldE1heExldmVsKCkpe1xyXG4gICAgICAgICAgICBHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNob3dNZXNzYWdlKExhbmd1YWdlTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldFN0ckJ5VGV4dElkKDEwMDEyMSksMyk7XHJcbiAgICAgICAgICAgIHJldHVyblxyXG4gICAgICAgICAgICAvLyBHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNob3dNZXNzYWdlKFwi5L2g5aSq5Y6J5a6z5ZWm77yM5rWL6K+V54mI5pys5pqC5pe25rKh5pyJ5LqG77yM5pWs6K+35pyf5b6F5ZCO57ut54mI5pys77yB6K6w5b6X5YqgaWRcIiwzKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5jdXJfZ2FtZV9tb2RlPUdhbWVNb2RlLk1haW47XHJcbiAgICAgICAgRm9sbG93TWFuYWdlci5nZXRJbnN0YW5jZSgpLmZvbGxvd0V2ZW50KEZvbGxvd19UeXBlLueCueWHu+W8gOWni+aMkeaImOeUqOaIt+aVsCk7XHJcbiAgICAgICAgR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zb3VuZF9tYW5hZ2VyLnBsYXlTb3VuZChTb3VuZEluZGV4LmNsaWNrKTtcclxuICAgICAgICAvL0xldmVsTWFuYWdlci5nZXRJbnN0YW5jZSgpLnN0YXJ0X2xldmVsPXRoaXMuY3VyX3NlbGVjdGVkX2xldmVsO1xyXG4gICAgICAgIGlmKCFUdXRvcmFpbHNNYW5hZ2VyLmdldEluc3RhbmNlKCkuaXNfZmluaXNoX2dhbWUpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBMZXZlbE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zdGFydF9sZXZlbD1NYXBNYW5hZ2VyLkN1cnJlbnRsZXZlbD1MZXZlbE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5maW5pc2hfbGV2ZWwrMTtcclxuICAgICAgICAgICAgdGhpcy5zdGFydEdhbWUoKTtcclxuICAgICAgICB9ZWxzZVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgbGV0IG1heD1PZmZsaW5lUmV2ZW51ZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRUaW1lKExldmVsTWFuYWdlci5nZXRJbnN0YW5jZSgpLmZpbmlzaF9sZXZlbCk7XHJcbiAgICAgICAgICAgIGlmKE9mZmxpbmVSZXZlbnVlTWFuYWdlci5nZXRHdWFKaU1pbigpPj1tYXgpe1xyXG4gICAgICAgICAgICAgICAgLy8gVUlNYW5hZ2VyLmdldEluc3RhbmNlKCkuc2hvd09mZmxpbmVVaSh7XHJcbiAgICAgICAgICAgICAgICAvLyAgICAgb25SZWZyZXNoOigpPT57XHJcbiAgICAgICAgICAgICAgICAvLyAgICAgICAgIHRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZSgnYnRuT2ZmbGluZUdpZnQnKS5nZXRDb21wb25lbnQoR3VhSmlHaWZ0KS5jaGVhaygpO1xyXG4gICAgICAgICAgICAgICAgLy8gICAgIH1cclxuICAgICAgICAgICAgICAgIC8vIH0pO1xyXG4gICAgICAgICAgICAgICAgVUlNYW5hZ2VyLmdldEluc3RhbmNlKCkuc2hvd1VpRGlhbG9nKFVJUGF0aC5HdWFqaSxVSUxheWVyTGV2ZWwuT25lLHtvbkNvbXBsZXRlZDoodWlOb2RlKT0+IHtcclxuICAgICAgICAgICAgICAgICAgICB1aU5vZGUuZ2V0Q29tcG9uZW50KE9mZmxpbmVVaSkuaW5pdCh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG9uUmVmcmVzaDooKT0+e1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKCdidG5PZmZsaW5lR2lmdCcpLmdldENvbXBvbmVudChHdWFKaUdpZnQpLmNoZWFrKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgfSx9KVxyXG4gICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgIC8vIFVJTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNob3dNYXBVaSh7b25DbG9zZTooKT0+e1xyXG4gICAgICAgICAgICAgICAgLy8gICAgIHRoaXMuY3VyX3NlbGVjdGVkX2xldmVsPUxldmVsTWFuYWdlci5nZXRJbnN0YW5jZSgpLnN0YXJ0X2xldmVsOyAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAvLyAgICAgR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5yZWZyZXNoWmhhbmxpU2hvdygpO1xyXG4gICAgICAgICAgICAgICAgLy8gfX0pO1xyXG4gICAgICAgICAgICAgICAgTGV2ZWxNYW5hZ2VyLmdldEluc3RhbmNlKCkuc3RhcnRfbGV2ZWw9TWFwTWFuYWdlci5DdXJyZW50bGV2ZWw9TGV2ZWxNYW5hZ2VyLmdldEluc3RhbmNlKCkuZmluaXNoX2xldmVsKzE7XHJcbiAgICAgICAgICAgICAgICBVSU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zaG93VWlEaWFsb2coVUlQYXRoLlRvUGxheSxVSUxheWVyTGV2ZWwuT25lLHtvbkNvbXBsZXRlZDoodWlOb2RlKT0+IHtcclxuICAgICAgICAgICAgICAgICAgICB1aU5vZGUuZ2V0Q29tcG9uZW50KFRvUGxheU1haW5VaSkuaW5pdCh7b25DbG9zZTooKT0+e1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBNYXBNYW5hZ2VyLkN1cnJlbnRsZXZlbD1MZXZlbE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5maW5pc2hfbGV2ZWwrMTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5jdXJfc2VsZWN0ZWRfbGV2ZWw9TGV2ZWxNYW5hZ2VyLmdldEluc3RhbmNlKCkuc3RhcnRfbGV2ZWw7ICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICAgICAgR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5yZWZyZXNoWmhhbmxpU2hvdygpO1xyXG4gICAgICAgICAgICAgICAgICAgIH19KTtcclxuICAgICAgICAgICAgICAgIH0sfSlcclxuICAgICAgICAgICAgfSAgICAgICAgICAgIFxyXG4gICAgICAgIH1cclxuICAgIH0gICAgXHJcblxyXG4gICAgY2xpY2tCdG5SYWJhdGUoKXtcclxuICAgICAgICBHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNvdW5kX21hbmFnZXIucGxheVNvdW5kKFNvdW5kSW5kZXguY2xpY2spO1xyXG4gICAgICAgIGlmKCFGdW5jdGlvbkRlZmluaXRpb25NYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0SXNVbmxvY2soRnVuY1R5cGUuRmFuTGkpKXsgICAgICAgICAgICBcclxuICAgICAgICAgICAgR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zaG93TWVzc2FnZShMYW5ndWFnZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRTdHJpbmcoTGFuZ3VhZ2VJbmRleC5VbmxvY2tBZnRlcikrTGFuZ3VhZ2VNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0U3RyaW5nKExhbmd1YWdlSW5kZXguUGxheWVyTHYpK0Z1bmN0aW9uRGVmaW5pdGlvbk1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRVbmxvY2tDb25kaWN0aW9uUGFyYW1ldGVyKEZ1bmNUeXBlLkZhbkxpKSk7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy8gVUlNYW5hZ2VyLmdldEluc3RhbmNlKCkuc2hvd1JhYmF0ZVVpKCk7XHJcbiAgICB9XHJcblxyXG4gICAgY2xpY2tCdG5HaWZ0KCl7XHJcbiAgICAgICAgR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zb3VuZF9tYW5hZ2VyLnBsYXlTb3VuZChTb3VuZEluZGV4LmNsaWNrKTtcclxuICAgICAgICBpZighRnVuY3Rpb25EZWZpbml0aW9uTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldElzVW5sb2NrKEZ1bmNUeXBlLkxpQmFvKSl7ICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIEdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuc2hvd01lc3NhZ2UoTGFuZ3VhZ2VNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0U3RyaW5nKExhbmd1YWdlSW5kZXguVW5sb2NrQWZ0ZXIpK0xhbmd1YWdlTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldFN0cmluZyhMYW5ndWFnZUluZGV4LlBsYXllckx2KStGdW5jdGlvbkRlZmluaXRpb25NYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0VW5sb2NrQ29uZGljdGlvblBhcmFtZXRlcihGdW5jVHlwZS5MaUJhbykpO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vIFVJTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNob3dHaWZ0Q2VudGVyVWkoKTtcclxuICAgIH1cclxuXHJcbiAgICBjbGlja0J0bldlZWtHaWZ0KCl7XHJcbiAgICAgICAgR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zb3VuZF9tYW5hZ2VyLnBsYXlTb3VuZChTb3VuZEluZGV4LmNsaWNrKTtcclxuICAgICAgICBpZighRnVuY3Rpb25EZWZpbml0aW9uTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldElzVW5sb2NrKEZ1bmNUeXBlLlpob3VMaUJhbykpeyAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNob3dNZXNzYWdlKExhbmd1YWdlTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldFN0cmluZyhMYW5ndWFnZUluZGV4LlVubG9ja0FmdGVyKStMYW5ndWFnZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRTdHJpbmcoTGFuZ3VhZ2VJbmRleC5QbGF5ZXJMdikrRnVuY3Rpb25EZWZpbml0aW9uTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldFVubG9ja0NvbmRpY3Rpb25QYXJhbWV0ZXIoRnVuY1R5cGUuWmhvdUxpQmFvKSk7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgXHJcbiAgICB9XHJcbiAgICBjbGlja0J0bk1haW5JY29uTWFwKCl7Ly/miZPlvIDlpKflnLDlm74gIFxyXG4gICAgICAgIEZvbGxvd01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5mb2xsb3dFdmVudChGb2xsb3dfVHlwZS7lpKflnLDlm77mjInpkq7ngrnlh7vmrKHmlbApO1xyXG4gICAgICAgIHRoaXMuQmlnTWFwLmFjdGl2ZT10cnVlXHJcbiAgICB9XHJcbiAgICAvKirmmL7npLrmjILmnLrlpZblirHnlYzpnaIgKi9cclxuICAgIGNsaWNrQnRuTWFpbkljb25JZGxlKCl7XHJcbiAgICAgICAgRm9sbG93TWFuYWdlci5nZXRJbnN0YW5jZSgpLmZvbGxvd0V2ZW50KEZvbGxvd19UeXBlLuemu+e6v+aUtuebiuaMiemSrueCueWHu+asoeaVsCk7XHJcbiAgICAgICAgVUlNYW5hZ2VyLmdldEluc3RhbmNlKCkuc2hvd1VpRGlhbG9nKFVJUGF0aC5HdWFqaSxVSUxheWVyTGV2ZWwuT25lLHtvbkNvbXBsZXRlZDooKT0+e1xyXG4gICAgICAgICAgICBcclxuICAgICAgICB9fSk7XHJcbiAgICB9XHJcblxyXG4gICAgc3RhcnRHYW1lKClcclxuICAgIHtcclxuICAgICAgICB0aGlzLnNldExldmVsRGF0YSgpO1xyXG4gICAgICAgIGxldCBiZ0xvYWRpbmc9VUlNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0TG9hZGluZ05vZGUoKTtcclxuICAgICAgICBiZ0xvYWRpbmcuYWN0aXZlPXRydWU7XHJcbiAgICAgICAgbGV0IGxvYWRpbmdCYXI9YmdMb2FkaW5nLmdldENoaWxkQnlOYW1lKCdQcm9ncmVzc0JhcicpLmdldENvbXBvbmVudChjYy5Qcm9ncmVzc0Jhcik7XHJcbiAgICAgICAgbGV0IGxvYWRMYWJlbD1sb2FkaW5nQmFyLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoJ2xvYWRMYWJlbCcpLmdldENvbXBvbmVudChjYy5MYWJlbCk7XHJcbiAgICAgICAgY2MuZGlyZWN0b3IucHJlbG9hZFNjZW5lKEdhbWVTY2VuZS5nYW1lLChjb21wbGV0ZWRDb3VudDogbnVtYmVyLCB0b3RhbENvdW50OiBudW1iZXIsIGl0ZW06IGFueSk9PntcclxuICAgICAgICAgICAgLy/nnJ/lrp7ov5vluqZcclxuICAgICAgICAgICAgbGV0IHByb2dyZXNzVHJ1ZT1jb21wbGV0ZWRDb3VudC90b3RhbENvdW50O1xyXG4gICAgICAgICAgICAvL+WBh+eahOi/m+W6plxyXG4gICAgICAgICAgICBsZXQgcHJvZ3Jlc3NGYWxzZT1wcm9ncmVzc1RydWUvMjtcclxuICAgICAgICAgICAgbG9hZGluZ0Jhci5wcm9ncmVzcyA9IHByb2dyZXNzRmFsc2U7XHJcbiAgICAgICAgICAgIGxvYWRMYWJlbC5zdHJpbmc9KGxvYWRpbmdCYXIucHJvZ3Jlc3MqMTAwKS50b0ZpeGVkKDApKyclJztcclxuICAgICAgICAgICAgR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5jdXJfbG9hZF9wcm9ncmVzcz1wcm9ncmVzc0ZhbHNlO1xyXG4gICAgICAgICAgICAvL3RoaXMubG9hZGluZ19saWdodC54ID0gdGhpcy5sb2FkaW5nX2Jhci5wcm9ncmVzcyp0aGlzLmxvYWRpbmdfYmFyLnRvdGFsTGVuZ3RoLXRoaXMubG9hZGluZ19iYXIudG90YWxMZW5ndGgvMjtcclxuICAgICAgICB9LCgpPT57XHJcbiAgICAgICAgICAgIGNjLmRpcmVjdG9yLmxvYWRTY2VuZShHYW1lU2NlbmUuZ2FtZSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgXHJcbiAgICB9XHJcblxyXG4gICAgcmVmcmVzaE1haW5UYXNrVWkoKXtcclxuICAgICAgICBsZXQgdGFza1VpID0gdGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKFwibWFpblRhc2tcIik7XHJcbiAgICAgICAgbGV0IGVmZmVjdCA9IHRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZShcIm1haW5UYXNrRWZmZWN0XCIpO1xyXG4gICAgICAgIGxldCBtYWluX2RhdGEgPSBUYXNrTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldE1haW5UYXNrRGF0YSgpO1xyXG4gICAgICAgIGlmKG1haW5fZGF0YSA9PSBudWxsKXtcclxuICAgICAgICAgICAgdGFza1VpLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICBlZmZlY3QuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5zY2hlZHVsZU9uY2UoKCk9PntcclxuICAgICAgICAgICAgZWZmZWN0LmhlaWdodCA9IHRhc2tVaS5oZWlnaHQ7XHJcbiAgICAgICAgfSwwLjAyKTtcclxuICAgICAgICBsZXQgbm93TnVtID0gVGhlU3RvcmFnZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXROdW1iZXIoU3RvcmFnZUtleS5UYXNrTWFpbk51bSArIG1haW5fZGF0YS5UYXNrVHlwZSwwKTtcclxuICAgICAgICB0YXNrVWkuZ2V0Q2hpbGRCeU5hbWUoXCJjb250ZW50XCIpLmdldENvbXBvbmVudChUZXh0TGFuZ3VhZ2UpLnNldFRleHRJZChtYWluX2RhdGEuVGhyZWFkVGFza0Rlc2NyaXB0aW9uKTtcclxuICAgICAgICB0YXNrVWkuZ2V0Q2hpbGRCeU5hbWUoXCJjb250ZW50XCIpLmdldENvbXBvbmVudEluQ2hpbGRyZW4oY2MuTGFiZWwpLnN0cmluZyA9IG5vd051bSArICcvJyArIG1haW5fZGF0YS5UYXNrUGFyYW1ldGVyc1xyXG4gICAgICAgIGxldCBjb250ZW50ID0gdGFza1VpLmdldENoaWxkQnlOYW1lKFwiY29udGVudFwiKTtcclxuICAgICAgICBpZihub3dOdW0+PW1haW5fZGF0YS5UYXNrUGFyYW1ldGVycyl7XHJcbiAgICAgICAgICAgIGVmZmVjdC5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICBjb250ZW50LmdldENoaWxkQnlOYW1lKFwibnVtXCIpLmNvbG9yID0gY2MuY29sb3IoNDcsMjU1LDQyKTtcclxuICAgICAgICAgICAgVGhlU3RvcmFnZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zZXRJdGVtKFN0b3JhZ2VLZXkuVGFza1N0YXRlICsgbWFpbl9kYXRhLlRocmVhZFRhc2tJRCwxKTtcclxuICAgICAgICAgICAgY29udGVudC5nZXRDb21wb25lbnRJbkNoaWxkcmVuKGNjLkxhYmVsKS5zdHJpbmcgPSBtYWluX2RhdGEuVGFza1BhcmFtZXRlcnMgKyAnLycgKyBtYWluX2RhdGEuVGFza1BhcmFtZXRlcnNcclxuICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgY29udGVudC5nZXRDaGlsZEJ5TmFtZShcIm51bVwiKS5jb2xvciA9IGNjLmNvbG9yKDI1NSwyNTUsMjU1KTtcclxuICAgICAgICAgICAgZWZmZWN0LmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZihtYWluX2RhdGEuVGFza1R5cGUgPT0gMSl7XHJcbiAgICAgICAgICAgIHRhc2tVaS5nZXRDaGlsZEJ5TmFtZShcImNvbnRlbnRcIikuZ2V0Q29tcG9uZW50SW5DaGlsZHJlbihjYy5MYWJlbCkuc3RyaW5nID0gKG5vd051bT49bWFpbl9kYXRhLlRhc2tQYXJhbWV0ZXJzPzE6MCkgKyAnLycgKyBcIjFcIjtcclxuICAgICAgICB9XHJcbiAgICAgICAgbGV0IHJld2FyZCA9IHRhc2tVaS5nZXRDaGlsZEJ5TmFtZShcInJld2FyZFwiKTtcclxuICAgICAgICByZXdhcmQuZ2V0Q2hpbGRCeU5hbWUoXCJnZW1MYWJlbFwiKS5nZXRDb21wb25lbnQoY2MuTGFiZWwpLnN0cmluZyA9IG1haW5fZGF0YS5Qcm9wTnVtXzIgKyAnJztcclxuICAgICAgICByZXdhcmQuZ2V0Q2hpbGRCeU5hbWUoXCJjb2luTGFiZWxcIikuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmcgPSBtYWluX2RhdGEuUHJvcE51bV8xICsgJyc7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBnZXRab25nWmhhbkxpSnNvblN0cmluZygpOnN0cmluZ3tcclxuICAgICAgICBsZXQgdWlkPVVzZXJEYXRhLmdldEluc3RhbmNlKCkuZ2V0VXNlcklEKCk7XHJcbiAgICAgICAgbGV0IHpvbmdaaGFuTGkgPSBIZXJvTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldEFsbEhlcm9aaGFubGkoKTtcclxuICAgICAgICByZXR1cm4gSlNPTi5zdHJpbmdpZnkoe1xyXG4gICAgICAgICAgICB0eXBlOjEsXHJcbiAgICAgICAgICAgIHVpZDp1aWQsXHJcbiAgICAgICAgICAgIHZhbHVlOnpvbmdaaGFuTGksXHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG59XHJcbiJdfQ==