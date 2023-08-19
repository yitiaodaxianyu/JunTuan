
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
var PropManager_1 = require("../../Prop/PropManager");
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
        cc.director.on("OnSharBack", this.onSharBack, this);
    };
    MainUi.prototype.onDestroy = function () {
        cc.director.off(LanguageConstants_1.OnLanguageChange, this.showLevelName, this);
        cc.director.off("OnSharBack", this.onSharBack, this);
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
    MainUi.prototype.onSharBack = function () {
        this.refreshLeft();
        var reward = PropManager_1.PropManager.getInstance().createPropItem(10002, 300);
        PropManager_1.PropManager.getInstance().changePropNum(10002, 300);
        GameManager_1.default.getInstance().showGetTip(reward);
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
        taskUi.active = false;
        effect.active = false;
        return;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0c1xcVUlcXGhvbWVcXE1haW5VaS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSw2Q0FBc0Y7QUFFdEYsaURBQTRDO0FBQzVDLDJFQUF3RjtBQUN4Rix1RUFBa0U7QUFDbEUsNkRBQW9FO0FBQ3BFLG1FQUE4RDtBQUM5RCx1RUFBa0U7QUFFbEUscUVBQWdFO0FBQ2hFLHlEQUF3RDtBQUN4RCx5REFBK0Q7QUFDL0QsZ0VBQXNFO0FBQ3RFLHdFQUE4RTtBQUM5RSwwQ0FBeUM7QUFDekMsNkNBQXdDO0FBQ3hDLHNEQUFpRDtBQUNqRCx3Q0FBbUQ7QUFDbkQsc0RBQWlEO0FBQ2pELCtDQUEwQztBQUMxQyxxREFBZ0Q7QUFDaEQsMkRBQWlFO0FBQ2pFLHNEQUFpRDtBQUNqRCxpRUFBNEQ7QUFDNUQsNkRBQXlEO0FBQ3pELCtEQUFpRTtBQUNqRSwyREFBc0U7QUFDdEUsMkRBQTBEO0FBQzFELDJDQUFzQztBQUN0QyxzREFBcUQ7QUFFL0MsSUFBQSxLQUFzQixFQUFFLENBQUMsVUFBVSxFQUFsQyxPQUFPLGFBQUEsRUFBRSxRQUFRLGNBQWlCLENBQUM7QUFHMUM7SUFBb0MsMEJBQVk7SUFBaEQ7UUFBQSxxRUE0YkM7UUExYkcsd0JBQWtCLEdBQVEsQ0FBQyxDQUFDO1FBQzVCLG9CQUFjLEdBQVMsSUFBSSxDQUFDO1FBQzVCLGdCQUFVLEdBQVMsSUFBSSxDQUFDO1FBR3hCLGlCQUFXLEdBQWtCLEVBQUUsQ0FBQztRQUdoQyxhQUFPLEdBQWdCLElBQUksQ0FBQztRQUc1QixZQUFNLEdBQVMsSUFBSSxDQUFDOztJQStheEIsQ0FBQztJQTdhRyx1QkFBTSxHQUFOO1FBRUksSUFBSSxDQUFDLGtCQUFrQixHQUFDLDJCQUFZLENBQUMsV0FBVyxFQUFFLENBQUMsWUFBWSxHQUFDLENBQUMsQ0FBQztRQUNsRSxJQUFHLElBQUksQ0FBQyxrQkFBa0IsR0FBQyxrQ0FBbUIsQ0FB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VyxDQUFDLENBQUMsWUFBWSxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUMsQ0FBQyxNQUFNLEdBQUcsU0FBUyxDQUFDLFNBQVMsR0FBRyxFQUFFLENBQUM7SUFDaEcsQ0FBQztJQUVPLHdDQUF1QixHQUEvQjtRQUNJLElBQUksR0FBRyxHQUFDLGtCQUFRLENBQUMsV0FBVyxFQUFFLENBQUMsU0FBUyxFQUFFLENBQUM7UUFDM0MsSUFBSSxVQUFVLEdBQUcseUJBQVcsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDO1FBQzlELE9BQU8sSUFBSSxDQUFDLFNBQVMsQ0FBQztZQUNsQixJQUFJLEVBQUMsQ0FBQztZQUNOLEdBQUcsRUFBQyxHQUFHO1lBQ1AsS0FBSyxFQUFDLFVBQVU7U0FDbkIsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQW5iRDtRQURDLFFBQVEsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxXQUFXLENBQUMsQ0FBQzsrQ0FDSztJQUdoQztRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsV0FBVyxDQUFDOzJDQUNHO0lBRzVCO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUM7MENBQ0U7SUFiSCxNQUFNO1FBRDFCLE9BQU87T0FDYSxNQUFNLENBNGIxQjtJQUFELGFBQUM7Q0E1YkQsQUE0YkMsQ0E1Ym1DLEVBQUUsQ0FBQyxTQUFTLEdBNGIvQztrQkE1Ym9CLE1BQU0iLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBGdW5jVHlwZSwgR2FtZU1vZGUsIEdhbWVTY2VuZSwgSXNEZWJ1ZywgSmlhblRvdV9UeXBlfSBmcm9tIFwiLi4vLi4vQ29uc3RhbnRzXCI7XHJcbmltcG9ydCBHYW1lRGF0YSBmcm9tIFwiLi4vLi4vR2FtZURhdGFcIjtcclxuaW1wb3J0IEdhbWVNYW5hZ2VyIGZyb20gXCIuLi8uLi9HYW1lTWFuYWdlclwiO1xyXG5pbXBvcnQgeyBMYW5ndWFnZUluZGV4LCBPbkxhbmd1YWdlQ2hhbmdlIH0gZnJvbSBcIi4uLy4uL211bHRpTGFuZ3VhZ2UvTGFuZ3VhZ2VDb25zdGFudHNcIjtcclxuaW1wb3J0IExhbmd1YWdlTWFuYWdlciBmcm9tIFwiLi4vLi4vbXVsdGlMYW5ndWFnZS9MYW5ndWFnZU1hbmFnZXJcIjtcclxuaW1wb3J0IHsgTXVzaWNJbmRleCwgU291bmRJbmRleCB9IGZyb20gXCIuLi8uLi9Tb3VuZC9BdWRpb0NvbnN0YW50c1wiO1xyXG5pbXBvcnQgRm9sbG93TWFuYWdlciBmcm9tIFwiLi4vLi4vbXVsdGlMYW5ndWFnZS9Gb2xsb3dNYW5hZ2VyXCI7XHJcbmltcG9ydCB7IEZvbGxvd19UeXBlIH0gZnJvbSBcIi4uLy4uL211bHRpTGFuZ3VhZ2UvRm9sbG93Q29uc3RhbnRzXCI7XHJcbmltcG9ydCB7IFZpcE1hbmFnZXIgfSBmcm9tIFwiLi4vLi4vQWRzL1ZpcE1hbmFnZXJcIjtcclxuaW1wb3J0IFR1dG9yYWlsc01hbmFnZXIgZnJvbSBcIi4uLy4uL1R1dG9yaWFscy9UdXRvcmFpbHNNYW5hZ2VyXCI7XHJcbmltcG9ydCB7IExldmVsTWFuYWdlciB9IGZyb20gXCIuLi8uLi9MZXZlbC9MZXZlbE1hbmFnZXJcIjtcclxuaW1wb3J0IHsgTWlzc2lvbkxldmVsTWFuYWdlciB9IGZyb20gXCIuLi8uLi9MZXZlbC9NaXNzaW9uTGV2ZWxcIjtcclxuaW1wb3J0IHsgT2ZmbGluZVJldmVudWVNYW5hZ2VyIH0gZnJvbSBcIi4uLy4uL0pzb25EYXRhL09mZmxpbmVSZXZlbnVlXCI7XHJcbmltcG9ydCB7IEZ1bmN0aW9uRGVmaW5pdGlvbk1hbmFnZXIgfSBmcm9tIFwiLi4vLi4vSnNvbkRhdGEvRnVuY3Rpb25EZWZpbml0aW9uXCI7XHJcbmltcG9ydCB7IFVJTWFuYWdlciB9IGZyb20gXCIuLi9VSU1hbmFnZXJcIjtcclxuaW1wb3J0IEZ1bmNUeXBlQnRuIGZyb20gXCIuL0Z1bmNUeXBlQnRuXCI7XHJcbmltcG9ydCBHdWFKaUdpZnQgZnJvbSBcIi4uLy4uL0d1YUppL1VpL0d1YUppR2lmdFwiO1xyXG5pbXBvcnQgeyBVSUxheWVyTGV2ZWwsIFVJUGF0aCB9IGZyb20gXCIuLi9VSUNvbmZpZ1wiO1xyXG5pbXBvcnQgT2ZmbGluZVVpIGZyb20gXCIuLi8uLi9HdWFKaS9VaS9PZmZsaW5lVWlcIjtcclxuaW1wb3J0IFRvUGxheU1haW5VaSBmcm9tIFwiLi9Ub1BsYXlNYWluVWlcIjtcclxuaW1wb3J0IE1hcE1hbmFnZXIgZnJvbSBcIi4uLy4uL0d1YUppL01hcE1hbmFnZXJcIjtcclxuaW1wb3J0IHsgVHV0b3JpYWxMZXZlbE1hbmFnZXIgfSBmcm9tIFwiLi4vLi4vTGV2ZWwvVHV0b3JpYWxMZXZlbFwiO1xyXG5pbXBvcnQgVGFza01hbmFnZXIgZnJvbSBcIi4uLy4uL1Rhc2svVGFza01hbmFnZXJcIjtcclxuaW1wb3J0IFRleHRMYW5ndWFnZSBmcm9tIFwiLi4vLi4vbXVsdGlMYW5ndWFnZS9UZXh0TGFuZ3VhZ2VcIjtcclxuaW1wb3J0IHsgU3RvcmFnZUtleSB9IGZyb20gXCIuLi8uLi9TdG9yYWdlL1N0b3JhZ2VDb25maWdcIjtcclxuaW1wb3J0IHsgVGhlU3RvcmFnZU1hbmFnZXIgfSBmcm9tIFwiLi4vLi4vU3RvcmFnZS9TdG9yYWdlTWFuYWdlclwiO1xyXG5pbXBvcnQgeyBIdHRwTWFuYWdlciwgQWNjZXNzTmFtZSB9IGZyb20gXCIuLi8uLi8uL05ldFdvcmsvSHR0cE1hbmFnZXJcIjtcclxuaW1wb3J0IHsgSGVyb01hbmFnZXIgfSBmcm9tIFwiLi4vLi4vSGVyby9EYXRhL0hlcm9NYW5hZ2VyXCI7XHJcbmltcG9ydCBVc2VyRGF0YSBmcm9tIFwiLi4vLi4vVXNlckRhdGFcIjtcclxuaW1wb3J0IHsgUHJvcE1hbmFnZXIgfSBmcm9tIFwiLi4vLi4vUHJvcC9Qcm9wTWFuYWdlclwiO1xyXG5cclxuY29uc3Qge2NjY2xhc3MsIHByb3BlcnR5fSA9IGNjLl9kZWNvcmF0b3I7XHJcblxyXG5AY2NjbGFzc1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBNYWluVWkgZXh0ZW5kcyBjYy5Db21wb25lbnQge1xyXG4gICAgXHJcbiAgICBjdXJfc2VsZWN0ZWRfbGV2ZWw6bnVtYmVyPTE7XHJcbiAgICBjdXJfbGV2ZWxfbmFtZTpjYy5Ob2RlPW51bGw7XHJcbiAgICBjdXJfYXZhdGFyOmNjLk5vZGU9bnVsbDtcclxuXHJcbiAgICBAcHJvcGVydHkoW2NjLlNwcml0ZUZyYW1lXSlcclxuICAgIHNwX2xldmVsX2JnOmNjLlNwcml0ZUZyYW1lW109W107XHJcblxyXG4gICAgQHByb3BlcnR5KGNjLlNwcml0ZUZyYW1lKVxyXG4gICAgc3BfYm9zczpjYy5TcHJpdGVGcmFtZT1udWxsO1xyXG5cclxuICAgIEBwcm9wZXJ0eShjYy5Ob2RlKVxyXG4gICAgQmlnTWFwOmNjLk5vZGU9bnVsbDtcclxuXHJcbiAgICBvbkxvYWQoKVxyXG4gICAge1xyXG4gICAgICAgIHRoaXMuY3VyX3NlbGVjdGVkX2xldmVsPUxldmVsTWFuYWdlci5nZXRJbnN0YW5jZSgpLmZpbmlzaF9sZXZlbCsxO1xyXG4gICAgICAgIGlmKHRoaXMuY3VyX3NlbGVjdGVkX2xldmVsPk1pc3Npb25MZXZlbE1hbmFnZXIuZ2V0TWF4TGV2ZWwoKSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMuY3VyX3NlbGVjdGVkX2xldmVsPU1pc3Npb25MZXZlbE1hbmFnZXIuZ2V0TWF4TGV2ZWwoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy8gY2MucmVzb3VyY2VzLmxvYWQoJ3VpL2hvbWUvbWFwX3VpJyk7XHJcbiAgICAgICAgLy8gY2MucmVzb3VyY2VzLmxvYWQoJ3VpL2hvbWUvdGVhbV9zZWxlY3RfdWknKTtcclxuICAgICAgICBjYy5kaXJlY3Rvci5vbihPbkxhbmd1YWdlQ2hhbmdlLHRoaXMuc2hvd0xldmVsTmFtZSx0aGlzKTtcclxuICAgICAgICB0aGlzLm5vZGUub24oY2MuTm9kZS5FdmVudFR5cGUuUE9TSVRJT05fQ0hBTkdFRCx0aGlzLm9uUG9zaXRpb25DaGFuZ2UsdGhpcyk7XHJcblxyXG4gICAgICAgIGNjLmRpcmVjdG9yLm9uKFwiT25TaGFyQmFja1wiLHRoaXMub25TaGFyQmFjayx0aGlzKTtcclxuICAgICAgIFxyXG4gICAgfVxyXG5cclxuICAgIHByb3RlY3RlZCBvbkRlc3Ryb3koKTogdm9pZCB7ICAgICAgICBcclxuICAgICAgICBjYy5kaXJlY3Rvci5vZmYoT25MYW5ndWFnZUNoYW5nZSx0aGlzLnNob3dMZXZlbE5hbWUsdGhpcyk7XHJcbiAgICAgICAgY2MuZGlyZWN0b3Iub2ZmKFwiT25TaGFyQmFja1wiLHRoaXMub25TaGFyQmFjayx0aGlzKTtcclxuICAgICAgICB0aGlzLm5vZGUub2ZmKGNjLk5vZGUuRXZlbnRUeXBlLlBPU0lUSU9OX0NIQU5HRUQsdGhpcy5vblBvc2l0aW9uQ2hhbmdlLHRoaXMpO1xyXG4gICAgfVxyXG5cclxuICAgIG9uUG9zaXRpb25DaGFuZ2UoKXtcclxuICAgICAgICBpZih0aGlzLm5vZGUueD09MCl7XHJcbiAgICAgICAgICAgIHRoaXMub25FbmFibGUoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgc3RhcnQoKVxyXG4gICAge1xyXG4gICAgICAgIC8vIHRoaXMuc2hvd0xldmVsSW5mbygpO1xyXG4gICAgfVxyXG5cclxuICAgIG9uRW5hYmxlKClcclxuICAgIHtcclxuICAgICAgICBGb2xsb3dNYW5hZ2VyLmdldEluc3RhbmNlKCkuZm9sbG93RXZlbnQoRm9sbG93X1R5cGUu6aaW6aG15Li755WM6Z2i5bGV56S65oC75qyh5pWwKTtcclxuICAgICAgICBIdHRwTWFuYWdlci5wb3N0KEFjY2Vzc05hbWUudXBkYXRlVXNlckluZm8sdGhpcy5nZXRab25nWmhhbkxpSnNvblN0cmluZygpKTtcclxuICAgICAgICB0aGlzLnJlZnJlc2hMZWZ0UmlnaHQoKTtcclxuICAgICAgICB0aGlzLnJlZnJlc2hNYWluVGFza1VpKCk7XHJcbiAgICAgICAgaWYoR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5jdXJfZ2FtZV9zY2VuZT09R2FtZVNjZW5lLmhvbWUpe1xyXG4gICAgICAgICAgICAvLyBHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLm11c2ljX21hbmFnZXIucGxheU11c2ljKE11c2ljSW5kZXguQkdNX0d1YWppQmdtKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBwcml2YXRlIG9uU2hhckJhY2soKXtcclxuICAgICAgICB0aGlzLnJlZnJlc2hMZWZ0KCk7XHJcbiAgICAgICAgbGV0IHJld2FyZCA9IFByb3BNYW5hZ2VyLmdldEluc3RhbmNlKCkuY3JlYXRlUHJvcEl0ZW0oMTAwMDIsMzAwKTtcclxuICAgICAgICBQcm9wTWFuYWdlci5nZXRJbnN0YW5jZSgpLmNoYW5nZVByb3BOdW0oMTAwMDIsMzAwKTtcclxuICAgICAgICBHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNob3dHZXRUaXAocmV3YXJkKTtcclxuICAgIH1cclxuICAgIHJlZnJlc2hMZWZ0UmlnaHQoKXtcclxuICAgICAgICB0aGlzLnJlZnJlc2hMZWZ0KCk7XHJcbiAgICAgICAgdGhpcy5yZWZyZXNoUmlnaHQoKTtcclxuICAgIH1cclxuICAgIFxyXG4gICAgcmVmcmVzaExlZnQoKXtcclxuICAgICAgICBsZXQgbGVmdD10aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoJ2xlZnQnKTtcclxuICAgICAgICAvL+eul+WHuuacieWHoOS4quaYr+aYvuekuueahFxyXG4gICAgICAgIGxldCBzaG93TnVtPTA7XHJcbiAgICAgICAgbGV0IGJ0bnM9bGVmdC5nZXRDaGlsZEJ5TmFtZSgnYnRucycpO1xyXG4gICAgICAgIGZvcihsZXQgaT0wOyBpPGJ0bnMuY2hpbGRyZW5Db3VudDsgaSsrKXtcclxuICAgICAgICAgICAgLy8gbGV0IGlzU2hvdz1mYWxzZTtcclxuICAgICAgICAgICAgbGV0IGZiPWJ0bnMuY2hpbGRyZW5baV0uZ2V0Q29tcG9uZW50KEZ1bmNUeXBlQnRuKTtcclxuICAgICAgICAgICAgYnRucy5jaGlsZHJlbltpXS5hY3RpdmUgPSBmYi5yZWZyZXNoKCk7XHJcbiAgICAgICAgICAgIC8vIGlmKGZiKXtcclxuICAgICAgICAgICAgLy8gICAgIGlzU2hvdz1mYi5yZWZyZXNoKCk7XHJcbiAgICAgICAgICAgIC8vIH1lbHNle1xyXG4gICAgICAgICAgICAvLyAgICAgaXNTaG93PWJ0bnMuY2hpbGRyZW5baV0uYWN0aXZlOyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIC8vIH1cclxuICAgICAgICAgICAgLy8gaWYoaXNTaG93KXtcclxuICAgICAgICAgICAgLy8gICAgIGZiLm5vZGUueT0tNzctKDE1MCpzaG93TnVtKTtcclxuICAgICAgICAgICAgLy8gICAgIHNob3dOdW0rKztcclxuICAgICAgICAgICAgLy8gICAgIC8vIGlmKHNob3dOdW0gPiAxKVxyXG4gICAgICAgICAgICAvLyAgICAgLy8gICAgIGZiLm5vZGUueSAtPSA1MDtcclxuICAgICAgICAgICAgLy8gfVxyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLnNjaGVkdWxlT25jZSgoKT0+e1xyXG4gICAgICAgICAgICBsZWZ0LmhlaWdodCA9IGJ0bnMuaGVpZ2h0ICsgNztcclxuICAgICAgICB9LDAuMDMpO1xyXG4gICAgICAgIC8vIGxlZnQuYWN0aXZlPXNob3dOdW0+MDtcclxuICAgICAgICAvLyBpZihzaG93TnVtPjApe1xyXG4gICAgICAgIC8vICAgICB0aGlzLmRvVW5mb2xkKEppYW5Ub3VfVHlwZS5MRUZUKTtcclxuICAgICAgICAvLyB9XHJcbiAgICB9XHJcblxyXG4gICAgcmVmcmVzaFJpZ2h0KCl7XHJcbiAgICAgICAgbGV0IHJpZ2h0PXRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZSgncmlnaHQnKTtcclxuICAgICAgICAvL+eul+WHuuacieWHoOS4quaYr+aYvuekuueahFxyXG4gICAgICAgIGxldCBzaG93TnVtPTA7XHJcbiAgICAgICAgbGV0IGJ0bnM9cmlnaHQuZ2V0Q2hpbGRCeU5hbWUoJ2J0bnMnKTtcclxuICAgICAgICBmb3IobGV0IGk9MDsgaTxidG5zLmNoaWxkcmVuQ291bnQ7IGkrKyl7XHJcbiAgICAgICAgICAgIC8vIGxldCBpc1Nob3c9ZmFsc2U7XHJcbiAgICAgICAgICAgIGxldCBmYj1idG5zLmNoaWxkcmVuW2ldLmdldENvbXBvbmVudChGdW5jVHlwZUJ0bik7XHJcbiAgICAgICAgICAgIGJ0bnMuY2hpbGRyZW5baV0uYWN0aXZlID0gZmIucmVmcmVzaCgpO1xyXG4gICAgICAgICAgICAvLyBpZihmYil7XHJcbiAgICAgICAgICAgIC8vICAgICBpc1Nob3c9ZmIucmVmcmVzaCgpO1xyXG4gICAgICAgICAgICAvLyB9XHJcbiAgICAgICAgICAgIC8vIGlmKGlzU2hvdyl7XHJcbiAgICAgICAgICAgIC8vICAgICBmYi5ub2RlLnk9LTc3LSgxNTAqc2hvd051bSk7XHJcbiAgICAgICAgICAgIC8vICAgICBzaG93TnVtKys7XHJcbiAgICAgICAgICAgIC8vIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5zY2hlZHVsZU9uY2UoKCk9PntcclxuICAgICAgICAgICAgcmlnaHQuaGVpZ2h0ID0gYnRucy5oZWlnaHQgKyA3O1xyXG4gICAgICAgIH0sMC4wMyk7XHJcbiAgICAgICAgLy8gcmlnaHQuYWN0aXZlPXNob3dOdW0+MDtcclxuICAgICAgICAvLyBpZihzaG93TnVtPjApe1xyXG4gICAgICAgIC8vICAgICB0aGlzLmRvVW5mb2xkKEppYW5Ub3VfVHlwZS5SSUdIVCk7XHJcbiAgICAgICAgLy8gfVxyXG4gICAgfVxyXG4gICAgXHJcbiAgICBzaG93TGV2ZWxJbmZvKClcclxuICAgIHtcclxuICAgICAgICAvL+iOt+WPluW9k+WJjeWFs+WNoVxyXG4gICAgICAgIGxldCBsZXZlbD1MZXZlbE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5maW5pc2hfbGV2ZWwrMTtcclxuICAgICAgICBsZXQgc3RhcnRMZXZlbD0xO1xyXG4gICAgICAgIGlmKGxldmVsPk1pc3Npb25MZXZlbE1hbmFnZXIuZ2V0TWF4TGV2ZWwoKSl7XHJcbiAgICAgICAgICAgIGxldmVsPU1pc3Npb25MZXZlbE1hbmFnZXIuZ2V0TWF4TGV2ZWwoKTsgICAgICAgICAgICBcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYoTWlzc2lvbkxldmVsTWFuYWdlci5nZXRNYXhMZXZlbCgpLWxldmVsPjMpe1xyXG4gICAgICAgICAgICBzdGFydExldmVsPWxldmVsO1xyXG4gICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICBzdGFydExldmVsPU1pc3Npb25MZXZlbE1hbmFnZXIuZ2V0TWF4TGV2ZWwoKS0zO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvL+iOt+WPluW9k+WJjeeroOiKglxyXG4gICAgICAgIGxldCBjaGFwdGVyPU1pc3Npb25MZXZlbE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRDaGFwdGVyKGxldmVsKTtcclxuICAgICAgICAvL+iOt+WPlueroOiKguacgOWQjuS4gOWFs1xyXG4gICAgICAgIGxldCBsYXN0TGV2ZWw9TWlzc2lvbkxldmVsTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldExhc3RMZXZlbChsZXZlbCk7XHJcbiAgICAgICAgbGV0IGN1clNtYWxsTGV2ZWw9TWlzc2lvbkxldmVsTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldExldmVsTnVtKGxldmVsKTtcclxuICAgICAgICAvL+iOt+WPluaYvuekuueahOmmluS4quWFs+WNoeWSjOacq+WFs1xyXG4gICAgICAgIGxldCBzdGFydFNtYWxsTGV2ZWw9MTsgICAgICAgIFxyXG4gICAgICAgIGlmKGxhc3RMZXZlbC1jdXJTbWFsbExldmVsPjMpe1xyXG4gICAgICAgICAgICBzdGFydFNtYWxsTGV2ZWw9Y3VyU21hbGxMZXZlbCAgICAgICAgICAgIFxyXG4gICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICBzdGFydFNtYWxsTGV2ZWw9bGFzdExldmVsLTM7ICAgICAgICAgICAgXHJcbiAgICAgICAgfSAgICAgXHJcbiAgICAgICAgbGV0IGxldmVsUm9vdD10aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoJ2xldmVsJyk7XHJcbiAgICAgICAgLy/nq6DoioLmlbBcclxuICAgICAgICBsZXQgdGl0bGVMYWJlbD1sZXZlbFJvb3QuZ2V0Q2hpbGRCeU5hbWUoJ3RpdGxlTGFiZWwnKTtcclxuICAgICAgICBsZXQgdGl0bGVTdHI9TGFuZ3VhZ2VNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0U3RyQnlUZXh0SWQoMTAwMDUzKS5yZXBsYWNlKCd+JyxjaGFwdGVyKycnKTtcclxuICAgICAgICB0aXRsZUxhYmVsLmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nPXRpdGxlU3RyO1xyXG4gICAgICAgIC8v6L2mXHJcbiAgICAgICAgbGV0IGNhcj1sZXZlbFJvb3QuZ2V0Q2hpbGRCeU5hbWUoJ2NhcicpO1xyXG4gICAgICAgIC8vaWNvblxyXG4gICAgICAgIGxldCBpY29uUm9vdD1sZXZlbFJvb3QuZ2V0Q2hpbGRCeU5hbWUoJ2ljb25Sb290Jyk7XHJcbiAgICAgICAgaWNvblJvb3QucmVtb3ZlQWxsQ2hpbGRyZW4oKTtcclxuICAgICAgICBmb3IobGV0IGk9MTsgaTw9NDsgaSsrKXtcclxuICAgICAgICAgICAgbGV0IGxldmVsQmc9bGV2ZWxSb290LmdldENoaWxkQnlOYW1lKCdsZXZlbCcraSkuZ2V0Q29tcG9uZW50KGNjLlNwcml0ZSk7XHJcbiAgICAgICAgICAgIGxldCBsZXZlbExhYmVsPWxldmVsUm9vdC5nZXRDaGlsZEJ5TmFtZSgnbGFiZWwnK2kpLmdldENvbXBvbmVudChjYy5MYWJlbCk7XHJcbiAgICAgICAgICAgIGxldCBjdXJMZXZlbD0oc3RhcnRTbWFsbExldmVsK2ktMSk7XHJcbiAgICAgICAgICAgIGxldmVsTGFiZWwuc3RyaW5nPScnK2N1ckxldmVsOyAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBpZihjdXJMZXZlbCE9Y3VyU21hbGxMZXZlbCl7XHJcbiAgICAgICAgICAgICAgICBsZXZlbEJnLnNwcml0ZUZyYW1lPXRoaXMuc3BfbGV2ZWxfYmdbMV07XHJcbiAgICAgICAgICAgICAgICBsZXZlbExhYmVsLmZvbnRTaXplPTIyO1xyXG4gICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgIGxldmVsQmcuc3ByaXRlRnJhbWU9dGhpcy5zcF9sZXZlbF9iZ1swXTtcclxuICAgICAgICAgICAgICAgIGNhci54PWxldmVsQmcubm9kZS54O1xyXG4gICAgICAgICAgICAgICAgbGV2ZWxMYWJlbC5mb250U2l6ZT0zMDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAvL+WFs+WNoeS/oeaBr1xyXG4gICAgICAgICAgICBsZXQgbW9uc3RlckluZm89TWlzc2lvbkxldmVsTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldEZpZ2h0aW5nSW5mbyhzdGFydExldmVsK2ktMSk7XHJcbiAgICAgICAgICAgIGlmKG1vbnN0ZXJJbmZvLmdldElzSGF2ZUJvc3MoKSl7XHJcbiAgICAgICAgICAgICAgICBsZXQgYm9zc0ljb249bmV3IGNjLk5vZGUoJ2Jvc3NJY29uJylcclxuICAgICAgICAgICAgICAgIGJvc3NJY29uLmFkZENvbXBvbmVudChjYy5TcHJpdGUpLnNwcml0ZUZyYW1lPXRoaXMuc3BfYm9zcztcclxuICAgICAgICAgICAgICAgIGJvc3NJY29uLng9bGV2ZWxCZy5ub2RlLng7XHJcbiAgICAgICAgICAgICAgICBpY29uUm9vdC5hZGRDaGlsZChib3NzSWNvbik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgc2hvd0xldmVsTmFtZSgpe1xyXG4gICAgICAgIC8v6I635Y+W5b2T5YmN5YWz5Y2hXHJcbiAgICAgICAgbGV0IGxldmVsPUxldmVsTWFuYWdlci5nZXRJbnN0YW5jZSgpLmZpbmlzaF9sZXZlbCsxO1xyXG4gICAgICAgIGlmKGxldmVsPk1pc3Npb25MZXZlbE1hbmFnZXIuZ2V0TWF4TGV2ZWwoKSl7XHJcbiAgICAgICAgICAgIGxldmVsPU1pc3Npb25MZXZlbE1hbmFnZXIuZ2V0TWF4TGV2ZWwoKTsgICAgICAgICAgICBcclxuICAgICAgICB9XHJcbiAgICAgICAgLy/ojrflj5blvZPliY3nq6DoioJcclxuICAgICAgICBsZXQgY2hhcHRlcj1NaXNzaW9uTGV2ZWxNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0Q2hhcHRlcihsZXZlbCk7XHJcbiAgICAgICAgbGV0IGxldmVsUm9vdD10aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoJ2xldmVsJyk7XHJcbiAgICAgICAgLy/nq6DoioLmlbBcclxuICAgICAgICBsZXQgdGl0bGVMYWJlbD1sZXZlbFJvb3QuZ2V0Q2hpbGRCeU5hbWUoJ3RpdGxlTGFiZWwnKTtcclxuICAgICAgICBsZXQgdGl0bGVTdHI9TGFuZ3VhZ2VNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0U3RyQnlUZXh0SWQoMTAwMDUzKS5yZXBsYWNlKCd+JyxjaGFwdGVyKycnKTtcclxuICAgICAgICB0aXRsZUxhYmVsLmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nPXRpdGxlU3RyO1xyXG4gICAgfVxyXG5cclxuICAgIHNldExldmVsRGF0YSgpXHJcbiAgICB7XHJcbiAgICAgICAgbGV0IGdtPUdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCk7XHJcbiAgICAgICAgaWYoIVR1dG9yYWlsc01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5pc19maW5pc2hfZ2FtZSl7XHJcbiAgICAgICAgICAgIExldmVsTWFuYWdlci5nZXRJbnN0YW5jZSgpLnN0YXJ0X2xldmVsPUxldmVsTWFuYWdlci5nZXRJbnN0YW5jZSgpLmZpbmlzaF9sZXZlbCsxO1xyXG4gICAgICAgICAgICBNYXBNYW5hZ2VyLkN1cnJlbnRsZXZlbD1MZXZlbE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zdGFydF9sZXZlbDtcclxuICAgICAgICAgICAgZ20uZmlnaHRpbmdfaW5mbz1UdXRvcmlhbExldmVsTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldEZpZ2h0aW5nSW5mbyhMZXZlbE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zdGFydF9sZXZlbCk7XHJcbiAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgIGdtLmZpZ2h0aW5nX2luZm89TWlzc2lvbkxldmVsTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldEZpZ2h0aW5nSW5mbyhMZXZlbE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zdGFydF9sZXZlbCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8v5bGV5byAXHJcbiAgICBkb1VuZm9sZChqaWFudG91VHlwZTpKaWFuVG91X1R5cGUpXHJcbiAgICB7XHJcbiAgICAgICAgc3dpdGNoKGppYW50b3VUeXBlKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgY2FzZSBKaWFuVG91X1R5cGUuTEVGVDp7XHJcbiAgICAgICAgICAgICAgICAvL+iuoeeul+Wkp+Wwj+acgOWQjuS4gOS4quS9jee9risxMzhcclxuICAgICAgICAgICAgICAgIGxldCBsZWZ0PXRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZSgnbGVmdCcpO1xyXG4gICAgICAgICAgICAgICAgbGVmdC5zdG9wQWxsQWN0aW9ucygpO1xyXG4gICAgICAgICAgICAgICAgLy/nrpflh7rmnInlh6DkuKrmmK/mmL7npLrnmoRcclxuICAgICAgICAgICAgICAgIGxldCBzaG93TnVtPTA7XHJcbiAgICAgICAgICAgICAgICBsZXQgYnRucz1sZWZ0LmdldENoaWxkQnlOYW1lKCdidG5zJyk7XHJcbiAgICAgICAgICAgICAgICBmb3IobGV0IGk9MDsgaTxidG5zLmNoaWxkcmVuQ291bnQ7IGkrKyl7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IGJ0bj1idG5zLmNoaWxkcmVuW2ldO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmKGJ0bi5hY3RpdmUpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzaG93TnVtKys7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgbGV0IGRpc1k9MTY4KyhzaG93TnVtLTEpKjEyMyArIDUwO1xyXG4gICAgICAgICAgICAgICAgY2MudHdlZW4obGVmdCkudG8oMC4yLHtoZWlnaHQ6ZGlzWX0pLnN0YXJ0KCk7XHJcbiAgICAgICAgICAgIH1icmVhaztcclxuICAgICAgICAgICAgY2FzZSBKaWFuVG91X1R5cGUuUklHSFQ6e1xyXG4gICAgICAgICAgICAgICAgbGV0IHJpZ2h0PXRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZSgncmlnaHQnKTtcclxuICAgICAgICAgICAgICAgIHJpZ2h0LnN0b3BBbGxBY3Rpb25zKCk7XHJcbiAgICAgICAgICAgICAgICAvL+eul+WHuuacieWHoOS4quaYr+aYvuekuueahFxyXG4gICAgICAgICAgICAgICAgbGV0IHNob3dOdW09MDtcclxuICAgICAgICAgICAgICAgIGxldCBidG5zPXJpZ2h0LmdldENoaWxkQnlOYW1lKCdidG5zJyk7XHJcbiAgICAgICAgICAgICAgICBmb3IobGV0IGk9MDsgaTxidG5zLmNoaWxkcmVuQ291bnQ7IGkrKyl7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IGJ0bj1idG5zLmNoaWxkcmVuW2ldO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmKGJ0bi5hY3RpdmUpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzaG93TnVtKys7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgbGV0IGRpc1k9MTY4KyhzaG93TnVtLTEpKjEyMyArIDUwOyAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIGNjLnR3ZWVuKHJpZ2h0KS50bygwLjIse2hlaWdodDpkaXNZfSkuc3RhcnQoKTtcclxuICAgICAgICAgICAgfWJyZWFrO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvL+aKmOi1t1xyXG4gICAgZG9Gb2xkZWQoamlhbnRvdVR5cGU6SmlhblRvdV9UeXBlKVxyXG4gICAge1xyXG4gICAgICAgIHN3aXRjaChqaWFudG91VHlwZSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGNhc2UgSmlhblRvdV9UeXBlLkxFRlQ6e1xyXG4gICAgICAgICAgICAgICAgbGV0IGxlZnQ9dGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKCdsZWZ0Jyk7XHJcbiAgICAgICAgICAgICAgICBsZWZ0LnN0b3BBbGxBY3Rpb25zKCk7XHJcbiAgICAgICAgICAgICAgICBsZXQgZGlzWT0xNjgrMCoxMjM7XHJcbiAgICAgICAgICAgICAgICBjYy50d2VlbihsZWZ0KS50bygwLjEse2hlaWdodDpkaXNZfSkuc3RhcnQoKTtcclxuICAgICAgICAgICAgfWJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIEppYW5Ub3VfVHlwZS5SSUdIVDp7ICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgbGV0IHJpZ2h0PXRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZSgncmlnaHQnKTtcclxuICAgICAgICAgICAgICAgIHJpZ2h0LnN0b3BBbGxBY3Rpb25zKCk7XHJcbiAgICAgICAgICAgICAgICBsZXQgZGlzWT0xNjgrMCoxMjM7XHJcbiAgICAgICAgICAgICAgICBjYy50d2VlbihyaWdodCkudG8oMC4xLHtoZWlnaHQ6ZGlzWX0pLnN0YXJ0KCk7XHJcbiAgICAgICAgICAgIH1icmVhaztcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgY2xpY2tCdG5GYXN0KCl7XHJcbiAgICAgICAgR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zb3VuZF9tYW5hZ2VyLnBsYXlTb3VuZChTb3VuZEluZGV4LmNsaWNrKTtcclxuICAgICAgICBGb2xsb3dNYW5hZ2VyLmdldEluc3RhbmNlKCkuZm9sbG93RXZlbnQoRm9sbG93X1R5cGUu5Li76aG15b+r6YCf5oyC5py65oyJ6ZKu54K55Ye75qyh5pWwKTtcclxuICAgICAgICAvLyBVSU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zaG93RmFzdEd1YWppVWkoe29uQ2xvc2U6KCk9PntcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgLy8gfX0pO1xyXG4gICAgICAgIFVJTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNob3dVaURpYWxvZyhVSVBhdGguRmFzdEd1YUppLFVJTGF5ZXJMZXZlbC5PbmUse29uQ29tcGxldGVkOih1aU5vZGUpPT4ge30sfSk7XHJcbiAgICB9XHJcblxyXG4gICAgY2xpY2tCdG5TYW9EYW5nKClcclxuICAgIHtcclxuICAgICAgICBHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNvdW5kX21hbmFnZXIucGxheVNvdW5kKFNvdW5kSW5kZXguY2xpY2spO1xyXG4gICAgICAgXHJcbiAgICB9XHJcblxyXG4gICAgY2xpY2tCdG5TdGFydCAoKSB7XHJcbiAgICAgICAgRm9sbG93TWFuYWdlci5nZXRJbnN0YW5jZSgpLmZvbGxvd0V2ZW50KEZvbGxvd19UeXBlLuaMkeaImOaMiemSrueahOeCueWHu+asoeaVsCk7XHJcbiAgICAgICAgLy8gY29uc29sZS5sb2coXCJfX19fX19fX19fXCIsKE9mZmxpbmVSZXZlbnVlTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldFRpbWUoTGV2ZWxNYW5hZ2VyLmdldEluc3RhbmNlKCkuZmluaXNoX2xldmVsKSksTWlzc2lvbkxldmVsTWFuYWdlci5nZXRNYXhMZXZlbCgpKVxyXG4gICAgICAgIGlmKChMZXZlbE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5maW5pc2hfbGV2ZWwpPj1NaXNzaW9uTGV2ZWxNYW5hZ2VyLmdldE1heExldmVsKCkpe1xyXG4gICAgICAgICAgICBHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNob3dNZXNzYWdlKExhbmd1YWdlTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldFN0ckJ5VGV4dElkKDEwMDEyMSksMyk7XHJcbiAgICAgICAgICAgIHJldHVyblxyXG4gICAgICAgICAgICAvLyBHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNob3dNZXNzYWdlKFwi5L2g5aSq5Y6J5a6z5ZWm77yM5rWL6K+V54mI5pys5pqC5pe25rKh5pyJ5LqG77yM5pWs6K+35pyf5b6F5ZCO57ut54mI5pys77yB6K6w5b6X5YqgaWRcIiwzKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5jdXJfZ2FtZV9tb2RlPUdhbWVNb2RlLk1haW47XHJcbiAgICAgICAgRm9sbG93TWFuYWdlci5nZXRJbnN0YW5jZSgpLmZvbGxvd0V2ZW50KEZvbGxvd19UeXBlLueCueWHu+W8gOWni+aMkeaImOeUqOaIt+aVsCk7XHJcbiAgICAgICAgR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zb3VuZF9tYW5hZ2VyLnBsYXlTb3VuZChTb3VuZEluZGV4LmNsaWNrKTtcclxuICAgICAgICAvL0xldmVsTWFuYWdlci5nZXRJbnN0YW5jZSgpLnN0YXJ0X2xldmVsPXRoaXMuY3VyX3NlbGVjdGVkX2xldmVsO1xyXG4gICAgICAgIGlmKCFUdXRvcmFpbHNNYW5hZ2VyLmdldEluc3RhbmNlKCkuaXNfZmluaXNoX2dhbWUpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBMZXZlbE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zdGFydF9sZXZlbD1NYXBNYW5hZ2VyLkN1cnJlbnRsZXZlbD1MZXZlbE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5maW5pc2hfbGV2ZWwrMTtcclxuICAgICAgICAgICAgdGhpcy5zdGFydEdhbWUoKTtcclxuICAgICAgICB9ZWxzZVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgbGV0IG1heD1PZmZsaW5lUmV2ZW51ZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRUaW1lKExldmVsTWFuYWdlci5nZXRJbnN0YW5jZSgpLmZpbmlzaF9sZXZlbCk7XHJcbiAgICAgICAgICAgIGlmKE9mZmxpbmVSZXZlbnVlTWFuYWdlci5nZXRHdWFKaU1pbigpPj1tYXgpe1xyXG4gICAgICAgICAgICAgICAgLy8gVUlNYW5hZ2VyLmdldEluc3RhbmNlKCkuc2hvd09mZmxpbmVVaSh7XHJcbiAgICAgICAgICAgICAgICAvLyAgICAgb25SZWZyZXNoOigpPT57XHJcbiAgICAgICAgICAgICAgICAvLyAgICAgICAgIHRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZSgnYnRuT2ZmbGluZUdpZnQnKS5nZXRDb21wb25lbnQoR3VhSmlHaWZ0KS5jaGVhaygpO1xyXG4gICAgICAgICAgICAgICAgLy8gICAgIH1cclxuICAgICAgICAgICAgICAgIC8vIH0pO1xyXG4gICAgICAgICAgICAgICAgVUlNYW5hZ2VyLmdldEluc3RhbmNlKCkuc2hvd1VpRGlhbG9nKFVJUGF0aC5HdWFqaSxVSUxheWVyTGV2ZWwuT25lLHtvbkNvbXBsZXRlZDoodWlOb2RlKT0+IHtcclxuICAgICAgICAgICAgICAgICAgICB1aU5vZGUuZ2V0Q29tcG9uZW50KE9mZmxpbmVVaSkuaW5pdCh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG9uUmVmcmVzaDooKT0+e1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKCdidG5PZmZsaW5lR2lmdCcpLmdldENvbXBvbmVudChHdWFKaUdpZnQpLmNoZWFrKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgfSx9KVxyXG4gICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgIC8vIFVJTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNob3dNYXBVaSh7b25DbG9zZTooKT0+e1xyXG4gICAgICAgICAgICAgICAgLy8gICAgIHRoaXMuY3VyX3NlbGVjdGVkX2xldmVsPUxldmVsTWFuYWdlci5nZXRJbnN0YW5jZSgpLnN0YXJ0X2xldmVsOyAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAvLyAgICAgR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5yZWZyZXNoWmhhbmxpU2hvdygpO1xyXG4gICAgICAgICAgICAgICAgLy8gfX0pOyAgICAgXHJcbiAgICAgICAgICAgICAgICBpZihNYXBNYW5hZ2VyLkN1cnJlbnRsZXZlbD09MCl7XHJcbiAgICAgICAgICAgICAgICAgICAgTGV2ZWxNYW5hZ2VyLmdldEluc3RhbmNlKCkuc3RhcnRfbGV2ZWw9TWFwTWFuYWdlci5DdXJyZW50bGV2ZWw9TGV2ZWxNYW5hZ2VyLmdldEluc3RhbmNlKCkuZmluaXNoX2xldmVsKzE7XHJcbiAgICAgICAgICAgICAgICB9ICAgICAgICBcclxuICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgVUlNYW5hZ2VyLmdldEluc3RhbmNlKCkuc2hvd1VpRGlhbG9nKFVJUGF0aC5Ub1BsYXksVUlMYXllckxldmVsLk9uZSx7b25Db21wbGV0ZWQ6KHVpTm9kZSk9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgdWlOb2RlLmdldENvbXBvbmVudChUb1BsYXlNYWluVWkpLmluaXQoe29uQ2xvc2U6KCk9PntcclxuICAgICAgICAgICAgICAgICAgICAgICAgTWFwTWFuYWdlci5DdXJyZW50bGV2ZWw9TGV2ZWxNYW5hZ2VyLmdldEluc3RhbmNlKCkuZmluaXNoX2xldmVsKzE7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuY3VyX3NlbGVjdGVkX2xldmVsPUxldmVsTWFuYWdlci5nZXRJbnN0YW5jZSgpLnN0YXJ0X2xldmVsOyAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIEdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkucmVmcmVzaFpoYW5saVNob3coKTtcclxuICAgICAgICAgICAgICAgICAgICB9fSk7XHJcbiAgICAgICAgICAgICAgICB9LH0pXHJcbiAgICAgICAgICAgIH0gICAgICAgICAgICBcclxuICAgICAgICB9XHJcbiAgICB9ICAgIFxyXG5cclxuICAgIGNsaWNrQnRuUmFiYXRlKCl7XHJcbiAgICAgICAgR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zb3VuZF9tYW5hZ2VyLnBsYXlTb3VuZChTb3VuZEluZGV4LmNsaWNrKTtcclxuICAgICAgICBpZighRnVuY3Rpb25EZWZpbml0aW9uTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldElzVW5sb2NrKEZ1bmNUeXBlLkZhbkxpKSl7ICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIEdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuc2hvd01lc3NhZ2UoTGFuZ3VhZ2VNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0U3RyaW5nKExhbmd1YWdlSW5kZXguVW5sb2NrQWZ0ZXIpK0xhbmd1YWdlTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldFN0cmluZyhMYW5ndWFnZUluZGV4LlBsYXllckx2KStGdW5jdGlvbkRlZmluaXRpb25NYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0VW5sb2NrQ29uZGljdGlvblBhcmFtZXRlcihGdW5jVHlwZS5GYW5MaSkpO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vIFVJTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNob3dSYWJhdGVVaSgpO1xyXG4gICAgfVxyXG5cclxuICAgIGNsaWNrQnRuR2lmdCgpe1xyXG4gICAgICAgIEdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuc291bmRfbWFuYWdlci5wbGF5U291bmQoU291bmRJbmRleC5jbGljayk7XHJcbiAgICAgICAgaWYoIUZ1bmN0aW9uRGVmaW5pdGlvbk1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRJc1VubG9jayhGdW5jVHlwZS5MaUJhbykpeyAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNob3dNZXNzYWdlKExhbmd1YWdlTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldFN0cmluZyhMYW5ndWFnZUluZGV4LlVubG9ja0FmdGVyKStMYW5ndWFnZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRTdHJpbmcoTGFuZ3VhZ2VJbmRleC5QbGF5ZXJMdikrRnVuY3Rpb25EZWZpbml0aW9uTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldFVubG9ja0NvbmRpY3Rpb25QYXJhbWV0ZXIoRnVuY1R5cGUuTGlCYW8pKTtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvLyBVSU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zaG93R2lmdENlbnRlclVpKCk7XHJcbiAgICB9XHJcblxyXG4gICAgY2xpY2tCdG5XZWVrR2lmdCgpe1xyXG4gICAgICAgIEdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuc291bmRfbWFuYWdlci5wbGF5U291bmQoU291bmRJbmRleC5jbGljayk7XHJcbiAgICAgICAgaWYoIUZ1bmN0aW9uRGVmaW5pdGlvbk1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRJc1VubG9jayhGdW5jVHlwZS5aaG91TGlCYW8pKXsgICAgICAgICAgICBcclxuICAgICAgICAgICAgR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zaG93TWVzc2FnZShMYW5ndWFnZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRTdHJpbmcoTGFuZ3VhZ2VJbmRleC5VbmxvY2tBZnRlcikrTGFuZ3VhZ2VNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0U3RyaW5nKExhbmd1YWdlSW5kZXguUGxheWVyTHYpK0Z1bmN0aW9uRGVmaW5pdGlvbk1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRVbmxvY2tDb25kaWN0aW9uUGFyYW1ldGVyKEZ1bmNUeXBlLlpob3VMaUJhbykpO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIFxyXG4gICAgfVxyXG4gICAgY2xpY2tCdG5NYWluSWNvbk1hcCgpey8v5omT5byA5aSn5Zyw5Zu+ICBcclxuICAgICAgICBGb2xsb3dNYW5hZ2VyLmdldEluc3RhbmNlKCkuZm9sbG93RXZlbnQoRm9sbG93X1R5cGUu5aSn5Zyw5Zu+5oyJ6ZKu54K55Ye75qyh5pWwKTtcclxuICAgICAgICB0aGlzLkJpZ01hcC5hY3RpdmU9dHJ1ZVxyXG4gICAgfVxyXG4gICAgLyoq5pi+56S65oyC5py65aWW5Yqx55WM6Z2iICovXHJcbiAgICBjbGlja0J0bk1haW5JY29uSWRsZSgpe1xyXG4gICAgICAgIEZvbGxvd01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5mb2xsb3dFdmVudChGb2xsb3dfVHlwZS7nprvnur/mlLbnm4rmjInpkq7ngrnlh7vmrKHmlbApO1xyXG4gICAgICAgIFVJTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNob3dVaURpYWxvZyhVSVBhdGguR3VhamksVUlMYXllckxldmVsLk9uZSx7b25Db21wbGV0ZWQ6KCk9PntcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgfX0pO1xyXG4gICAgfVxyXG5cclxuICAgIHN0YXJ0R2FtZSgpXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy5zZXRMZXZlbERhdGEoKTtcclxuICAgICAgICBsZXQgYmdMb2FkaW5nPVVJTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldExvYWRpbmdOb2RlKCk7XHJcbiAgICAgICAgYmdMb2FkaW5nLmFjdGl2ZT10cnVlO1xyXG4gICAgICAgIGxldCBsb2FkaW5nQmFyPWJnTG9hZGluZy5nZXRDaGlsZEJ5TmFtZSgnUHJvZ3Jlc3NCYXInKS5nZXRDb21wb25lbnQoY2MuUHJvZ3Jlc3NCYXIpO1xyXG4gICAgICAgIGxldCBsb2FkTGFiZWw9bG9hZGluZ0Jhci5ub2RlLmdldENoaWxkQnlOYW1lKCdsb2FkTGFiZWwnKS5nZXRDb21wb25lbnQoY2MuTGFiZWwpO1xyXG4gICAgICAgIGNjLmRpcmVjdG9yLnByZWxvYWRTY2VuZShHYW1lU2NlbmUuZ2FtZSwoY29tcGxldGVkQ291bnQ6IG51bWJlciwgdG90YWxDb3VudDogbnVtYmVyLCBpdGVtOiBhbnkpPT57XHJcbiAgICAgICAgICAgIC8v55yf5a6e6L+b5bqmXHJcbiAgICAgICAgICAgIGxldCBwcm9ncmVzc1RydWU9Y29tcGxldGVkQ291bnQvdG90YWxDb3VudDtcclxuICAgICAgICAgICAgLy/lgYfnmoTov5vluqZcclxuICAgICAgICAgICAgbGV0IHByb2dyZXNzRmFsc2U9cHJvZ3Jlc3NUcnVlLzI7XHJcbiAgICAgICAgICAgIGxvYWRpbmdCYXIucHJvZ3Jlc3MgPSBwcm9ncmVzc0ZhbHNlO1xyXG4gICAgICAgICAgICBsb2FkTGFiZWwuc3RyaW5nPShsb2FkaW5nQmFyLnByb2dyZXNzKjEwMCkudG9GaXhlZCgwKSsnJSc7XHJcbiAgICAgICAgICAgIEdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuY3VyX2xvYWRfcHJvZ3Jlc3M9cHJvZ3Jlc3NGYWxzZTtcclxuICAgICAgICAgICAgLy90aGlzLmxvYWRpbmdfbGlnaHQueCA9IHRoaXMubG9hZGluZ19iYXIucHJvZ3Jlc3MqdGhpcy5sb2FkaW5nX2Jhci50b3RhbExlbmd0aC10aGlzLmxvYWRpbmdfYmFyLnRvdGFsTGVuZ3RoLzI7XHJcbiAgICAgICAgfSwoKT0+e1xyXG4gICAgICAgICAgICBjYy5kaXJlY3Rvci5sb2FkU2NlbmUoR2FtZVNjZW5lLmdhbWUpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIFxyXG4gICAgfVxyXG5cclxuICAgIHJlZnJlc2hNYWluVGFza1VpKCl7XHJcbiAgICAgICAgbGV0IHRhc2tVaSA9IHRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZShcIm1haW5UYXNrXCIpO1xyXG4gICAgICAgIGxldCBlZmZlY3QgPSB0aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJtYWluVGFza0VmZmVjdFwiKTtcclxuICAgICAgICBsZXQgbWFpbl9kYXRhID0gVGFza01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRNYWluVGFza0RhdGEoKTtcclxuXHJcbiAgICAgICAgdGFza1VpLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgIGVmZmVjdC5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICByZXR1cm47XHJcbiAgICAgICAgaWYobWFpbl9kYXRhID09IG51bGwpe1xyXG4gICAgICAgICAgICB0YXNrVWkuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgIGVmZmVjdC5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLnNjaGVkdWxlT25jZSgoKT0+e1xyXG4gICAgICAgICAgICBlZmZlY3QuaGVpZ2h0ID0gdGFza1VpLmhlaWdodDtcclxuICAgICAgICB9LDAuMDIpO1xyXG4gICAgICAgIGxldCBub3dOdW0gPSBUaGVTdG9yYWdlTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldE51bWJlcihTdG9yYWdlS2V5LlRhc2tNYWluTnVtICsgbWFpbl9kYXRhLlRhc2tUeXBlLDApO1xyXG4gICAgICAgIHRhc2tVaS5nZXRDaGlsZEJ5TmFtZShcImNvbnRlbnRcIikuZ2V0Q29tcG9uZW50KFRleHRMYW5ndWFnZSkuc2V0VGV4dElkKG1haW5fZGF0YS5UaHJlYWRUYXNrRGVzY3JpcHRpb24pO1xyXG4gICAgICAgIHRhc2tVaS5nZXRDaGlsZEJ5TmFtZShcImNvbnRlbnRcIikuZ2V0Q29tcG9uZW50SW5DaGlsZHJlbihjYy5MYWJlbCkuc3RyaW5nID0gbm93TnVtICsgJy8nICsgbWFpbl9kYXRhLlRhc2tQYXJhbWV0ZXJzXHJcbiAgICAgICAgbGV0IGNvbnRlbnQgPSB0YXNrVWkuZ2V0Q2hpbGRCeU5hbWUoXCJjb250ZW50XCIpO1xyXG4gICAgICAgIGlmKG5vd051bT49bWFpbl9kYXRhLlRhc2tQYXJhbWV0ZXJzKXtcclxuICAgICAgICAgICAgZWZmZWN0LmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgIGNvbnRlbnQuZ2V0Q2hpbGRCeU5hbWUoXCJudW1cIikuY29sb3IgPSBjYy5jb2xvcig0NywyNTUsNDIpO1xyXG4gICAgICAgICAgICBUaGVTdG9yYWdlTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNldEl0ZW0oU3RvcmFnZUtleS5UYXNrU3RhdGUgKyBtYWluX2RhdGEuVGhyZWFkVGFza0lELDEpO1xyXG4gICAgICAgICAgICBjb250ZW50LmdldENvbXBvbmVudEluQ2hpbGRyZW4oY2MuTGFiZWwpLnN0cmluZyA9IG1haW5fZGF0YS5UYXNrUGFyYW1ldGVycyArICcvJyArIG1haW5fZGF0YS5UYXNrUGFyYW1ldGVyc1xyXG4gICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICBjb250ZW50LmdldENoaWxkQnlOYW1lKFwibnVtXCIpLmNvbG9yID0gY2MuY29sb3IoMjU1LDI1NSwyNTUpO1xyXG4gICAgICAgICAgICBlZmZlY3QuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmKG1haW5fZGF0YS5UYXNrVHlwZSA9PSAxKXtcclxuICAgICAgICAgICAgdGFza1VpLmdldENoaWxkQnlOYW1lKFwiY29udGVudFwiKS5nZXRDb21wb25lbnRJbkNoaWxkcmVuKGNjLkxhYmVsKS5zdHJpbmcgPSAobm93TnVtPj1tYWluX2RhdGEuVGFza1BhcmFtZXRlcnM/MTowKSArICcvJyArIFwiMVwiO1xyXG4gICAgICAgIH1cclxuICAgICAgICBsZXQgcmV3YXJkID0gdGFza1VpLmdldENoaWxkQnlOYW1lKFwicmV3YXJkXCIpO1xyXG4gICAgICAgIHJld2FyZC5nZXRDaGlsZEJ5TmFtZShcImdlbUxhYmVsXCIpLmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nID0gbWFpbl9kYXRhLlByb3BOdW1fMiArICcnO1xyXG4gICAgICAgIHJld2FyZC5nZXRDaGlsZEJ5TmFtZShcImNvaW5MYWJlbFwiKS5nZXRDb21wb25lbnQoY2MuTGFiZWwpLnN0cmluZyA9IG1haW5fZGF0YS5Qcm9wTnVtXzEgKyAnJztcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGdldFpvbmdaaGFuTGlKc29uU3RyaW5nKCk6c3RyaW5ne1xyXG4gICAgICAgIGxldCB1aWQ9VXNlckRhdGEuZ2V0SW5zdGFuY2UoKS5nZXRVc2VySUQoKTtcclxuICAgICAgICBsZXQgem9uZ1poYW5MaSA9IEhlcm9NYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0QWxsSGVyb1poYW5saSgpO1xyXG4gICAgICAgIHJldHVybiBKU09OLnN0cmluZ2lmeSh7XHJcbiAgICAgICAgICAgIHR5cGU6MSxcclxuICAgICAgICAgICAgdWlkOnVpZCxcclxuICAgICAgICAgICAgdmFsdWU6em9uZ1poYW5MaSxcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbn1cclxuIl19