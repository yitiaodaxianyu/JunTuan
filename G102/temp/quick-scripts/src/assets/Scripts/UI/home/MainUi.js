"use strict";
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