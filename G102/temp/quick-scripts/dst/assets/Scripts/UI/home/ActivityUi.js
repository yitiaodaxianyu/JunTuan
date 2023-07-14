
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Scripts/UI/home/ActivityUi.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '28c08MDmYhFGLIatN5j/Bka', 'ActivityUi');
// Scripts/UI/home/ActivityUi.ts

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
var ActivityManager_1 = require("../../Activity/ActivityManager");
var GameManager_1 = require("../../GameManager");
var FunctionDefinition_1 = require("../../JsonData/FunctionDefinition");
var LanguageManager_1 = require("../../multiLanguage/LanguageManager");
var AudioConstants_1 = require("../../Sound/AudioConstants");
var Constants_1 = require("../../Constants");
var FollowManager_1 = require("../../multiLanguage/FollowManager");
var FollowConstants_1 = require("../../multiLanguage/FollowConstants");
var LevelManager_1 = require("../../Level/LevelManager");
var UIManager_1 = require("../UIManager");
var PropManager_1 = require("../../Prop/PropManager");
var UIConfig_1 = require("../UIConfig");
var TextLanguage_1 = require("../../multiLanguage/TextLanguage");
var MissionLevel_1 = require("../../Level/MissionLevel");
var endlesschallenges_1 = require("../../copy/endlesschallenges/endlesschallenges");
var StorageManager_1 = require("../../Storage/StorageManager");
var StorageConfig_1 = require("../../Storage/StorageConfig");
var VoidScene_1 = require("../../copy/voidcrack/VoidScene");
var Times_1 = require("../../Turntable/Times");
var RogueHexagonTypes_1 = require("../../copy/voidcrack/RogueHexagonTypes");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var ActivityUi = /** @class */ (function (_super) {
    __extends(ActivityUi, _super);
    function ActivityUi() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.activity_ui = null;
        _this.btnMaze = null; //虚空裂缝
        _this.btnBoss = null; //BOSS挑战
        _this.btnEndless = null; //无尽挑战
        return _this;
        // onClickModeChoose(e,num:number){
        //     num = Number(num);
        //     let content = this.node.getChildByName("scrollView").getComponent(cc.ScrollView).content;
        //     if(num == 1){
        //         BossChallengeManager.getInstance().cur_challenge_mode=ChallengeMode.Noamal;
        //         content.getChildByName("btnBoss").getChildByName('unlock').getChildByName("Raid_Btn_0").getComponent(cc.Sprite).spriteFrame = this.activity_ui.getSpriteFrame("Raid_Btn_0_1");
        //         content.getChildByName("btnBoss").getChildByName('unlock').getChildByName("Raid_Btn_0").children[0].y = -25;
        //         content.getChildByName("btnBoss").getChildByName('unlock').getChildByName("Raid_Btn_1").getComponent(cc.Sprite).spriteFrame = this.activity_ui.getSpriteFrame("Raid_Btn_1");
        //         content.getChildByName("btnBoss").getChildByName('unlock').getChildByName("Raid_Btn_1").children[0].y = -15;
        //         content.getChildByName("btnBoss").getChildByName("icon").getComponent(cc.Sprite).spriteFrame = this.activity_ui.getSpriteFrame("Raid_Banner_2");
        //     }else{
        //         BossChallengeManager.getInstance().cur_challenge_mode=ChallengeMode.Hard;
        //         content.getChildByName("btnBoss").getChildByName('unlock').getChildByName("Raid_Btn_0").getComponent(cc.Sprite).spriteFrame = this.activity_ui.getSpriteFrame("Raid_Btn_0");
        //         content.getChildByName("btnBoss").getChildByName('unlock').getChildByName("Raid_Btn_0").children[0].y = -15;
        //         content.getChildByName("btnBoss").getChildByName('unlock').getChildByName("Raid_Btn_1").getComponent(cc.Sprite).spriteFrame = this.activity_ui.getSpriteFrame("Raid_Btn_1_1");
        //         content.getChildByName("btnBoss").getChildByName('unlock').getChildByName("Raid_Btn_1").children[0].y = -25;
        //         content.getChildByName("btnBoss").getChildByName("icon").getComponent(cc.Sprite).spriteFrame = this.activity_ui.getSpriteFrame("Raid_Banner_2_1");
        //     }
        // }
        // clickBtnHard(){
        //     GameManager.getInstance().sound_manager.playSound(SoundIndex.click);
        //     GameManager.getInstance().cur_game_mode=GameMode.Boss_Challenge;
        //     BossChallengeManager.getInstance().cur_challenge_mode=ChallengeMode.Hard;
        // }
    }
    ActivityUi.prototype.onLoad = function () {
        this.adaptation();
        // this.node.on(cc.Node.EventType.POSITION_CHANGED,this.onPositionChange,this);
    };
    // protected onDestroy(): void {
    //     // this.node.off(cc.Node.EventType.POSITION_CHANGED,this.onPositionChange,this);
    // }
    // onPositionChange(){
    //     if(this.node.x==0){
    //         this.onEnable();
    //     }
    // }
    ActivityUi.prototype.start = function () {
        //UIManager.getInstance().preloadPrefab('ui/home/tower_ui');
        var GeRenBoss = this.btnBoss.getChildByName("itme");
        var WuJinTiao = this.btnEndless.getChildByName("itme");
        var MiGongZhan = this.btnMaze.getChildByName("itme");
        var GeRenBossitem = [40006, 20003, 10002];
        var WuJinTiaoitem = [10001];
        var MiGongZhanitem = [60001, 90002, 20012];
        for (var index = 0; index < GeRenBossitem.length; index++) {
            var item = PropManager_1.PropManager.getInstance().createPropItem(GeRenBossitem[index], 0);
            item.scale = 0.85;
            item.parent = GeRenBoss;
        }
        for (var index = 0; index < WuJinTiaoitem.length; index++) {
            var item = PropManager_1.PropManager.getInstance().createPropItem(WuJinTiaoitem[index], 0);
            item.scale = 0.85;
            item.parent = WuJinTiao;
        }
        for (var index = 0; index < MiGongZhanitem.length; index++) {
            var item = PropManager_1.PropManager.getInstance().createPropItem(MiGongZhanitem[index], 0);
            item.scale = 0.85;
            item.parent = MiGongZhan;
        }
    };
    ActivityUi.prototype.onEnable = function () {
        // this.setActivity();
        if (FollowManager_1.default.getInstance().getFirstDo(FollowConstants_1.Follow_Type.首次进入副本页面) <= 0) {
            FollowManager_1.default.getInstance().addFirstDo(FollowConstants_1.Follow_Type.首次进入副本页面);
            FollowManager_1.default.getInstance().followEvent(FollowConstants_1.Follow_Type.首次进入副本页面);
        }
        // if(TowerManager.is_show_tower && FunctionDefinitionManager.getInstance().getIsUnlock(FuncType.PaTa)){
        //     GameManager.getInstance().cur_game_mode=GameMode.Tower;
        //     // UIManager.getInstance().showTowerUi();
        //     UIManager.getInstance().showUiDialog(UIPath.Tower,UILayerLevel.One,{onCompleted:(uiNode)=> {},});
        // }
        GameManager_1.default.getInstance().music_manager.playMusic(AudioConstants_1.MusicIndex.BGM_Fuben);
        var WuJinTiaoZhanType = FunctionDefinition_1.FunctionDefinitionManager.getInstance().getUnlockConditionType(Constants_1.FuncType.WuJinTiaoZhan);
        var WuJinTiaoZhanParameter = FunctionDefinition_1.FunctionDefinitionManager.getInstance().getUnlockCondictionParameter(Constants_1.FuncType.WuJinTiaoZhan);
        var GeRenBossType = FunctionDefinition_1.FunctionDefinitionManager.getInstance().getUnlockConditionType(Constants_1.FuncType.GeRenBoss);
        var GeRenBossParameter = FunctionDefinition_1.FunctionDefinitionManager.getInstance().getUnlockCondictionParameter(Constants_1.FuncType.GeRenBoss);
        var MiGongZhanType = FunctionDefinition_1.FunctionDefinitionManager.getInstance().getUnlockConditionType(Constants_1.FuncType.MiGong);
        var MiGongZhanParameter = FunctionDefinition_1.FunctionDefinitionManager.getInstance().getUnlockCondictionParameter(Constants_1.FuncType.MiGong);
        if (LevelManager_1.LevelManager.getInstance().finish_level < WuJinTiaoZhanParameter) {
            if (WuJinTiaoZhanType == 1) {
                this.btnEndless.getChildByName("text").getComponent(TextLanguage_1.default).setTextId(100051);
                this.btnEndless.getChildByName("text").getComponent(TextLanguage_1.default).setReplaceValue('.', '.' + (WuJinTiaoZhanParameter) + '');
            }
            else if (WuJinTiaoZhanType == 2) {
                this.btnEndless.getChildByName("text").getComponent(TextLanguage_1.default).setTextId(100052);
                var nums = MissionLevel_1.MissionLevelManager.getInstance().getLevelName((WuJinTiaoZhanParameter));
                this.btnEndless.getChildByName("text").getComponent(TextLanguage_1.default).setReplaceValue('~', (nums) + '');
            }
            this.btnEndless.getChildByName("itme").active = false;
            this.btnEndless.getChildByName("text").active = true;
            this.btnEndless.getChildByName("btnPlay").active = false;
            this.btnEndless.getChildByName("icon").getComponent(cc.Sprite).setMaterial(0, cc.Material.getBuiltinMaterial("2d-gray-sprite"));
            this.btnEndless.getChildByName("First_Text_1_CN").getComponent(cc.Sprite).setMaterial(0, cc.Material.getBuiltinMaterial("2d-gray-sprite"));
        }
        else {
            this.btnEndless.getChildByName("itme").active = true;
            this.btnEndless.getChildByName("text").active = false;
            this.btnEndless.getChildByName("btnPlay").active = true;
            this.btnEndless.getChildByName("icon").getComponent(cc.Sprite).setMaterial(0, cc.Material.getBuiltinMaterial("2d-sprite"));
            this.btnEndless.getChildByName("First_Text_1_CN").getComponent(cc.Sprite).setMaterial(0, cc.Material.getBuiltinMaterial("2d-sprite"));
            var num = StorageManager_1.TheStorageManager.getInstance().getInt(StorageConfig_1.StorageKey.UnlimitedChallengeTimes, 0);
            this.btnEndless.getChildByName("btnPlay").getChildByName("red").active = num > 0;
        }
        if (LevelManager_1.LevelManager.getInstance().finish_level < GeRenBossParameter) {
            if (GeRenBossType == 1) {
                this.btnBoss.getChildByName("text").getComponent(TextLanguage_1.default).setTextId(100051);
                this.btnBoss.getChildByName("text").getComponent(TextLanguage_1.default).setReplaceValue('.', '.' + (GeRenBossParameter) + '');
            }
            else if (GeRenBossType == 2) {
                this.btnBoss.getChildByName("text").getComponent(TextLanguage_1.default).setTextId(100052);
                var nums = MissionLevel_1.MissionLevelManager.getInstance().getLevelName((GeRenBossParameter));
                this.btnBoss.getChildByName("text").getComponent(TextLanguage_1.default).setReplaceValue('~', (nums) + '');
            }
            this.btnBoss.getChildByName("itme").active = false;
            this.btnBoss.getChildByName("text").active = true;
            this.btnBoss.getChildByName("btnPlay").active = false;
            this.btnBoss.getChildByName("icon").getComponent(cc.Sprite).setMaterial(0, cc.Material.getBuiltinMaterial("2d-gray-sprite"));
            this.btnBoss.getChildByName("First_Text_1_CN").getComponent(cc.Sprite).setMaterial(0, cc.Material.getBuiltinMaterial("2d-gray-sprite"));
        }
        else {
            this.btnBoss.getChildByName("itme").active = true;
            this.btnBoss.getChildByName("text").active = false;
            this.btnBoss.getChildByName("btnPlay").active = true;
            this.btnBoss.getChildByName("icon").getComponent(cc.Sprite).setMaterial(0, cc.Material.getBuiltinMaterial("2d-sprite"));
            this.btnBoss.getChildByName("First_Text_1_CN").getComponent(cc.Sprite).setMaterial(0, cc.Material.getBuiltinMaterial("2d-sprite"));
            this.btnBoss.getChildByName("btnPlay").getChildByName("red").active = StorageManager_1.TheStorageManager.getInstance().getInt(StorageConfig_1.StorageKey.BossChallengeTimes, 0) > 0;
        }
        if (LevelManager_1.LevelManager.getInstance().finish_level < MiGongZhanParameter) {
            if (MiGongZhanType == 1) {
                this.btnMaze.getChildByName("text").getComponent(TextLanguage_1.default).setTextId(100051);
                this.btnMaze.getChildByName("text").getComponent(TextLanguage_1.default).setReplaceValue('.', '.' + (MiGongZhanParameter) + '');
            }
            else if (MiGongZhanType == 2) {
                this.btnMaze.getChildByName("text").getComponent(TextLanguage_1.default).setTextId(100052);
                var nums = MissionLevel_1.MissionLevelManager.getInstance().getLevelName((MiGongZhanParameter));
                this.btnMaze.getChildByName("text").getComponent(TextLanguage_1.default).setReplaceValue('~', (nums) + '');
            }
            this.btnMaze.getChildByName("itme").active = false;
            this.btnMaze.getChildByName("text").active = true;
            this.btnMaze.getChildByName("btnPlay").active = false;
            this.btnMaze.getChildByName("icon").getComponent(cc.Sprite).setMaterial(0, cc.Material.getBuiltinMaterial("2d-gray-sprite"));
            this.btnMaze.getChildByName("First_Text_1_CN").getComponent(cc.Sprite).setMaterial(0, cc.Material.getBuiltinMaterial("2d-gray-sprite"));
        }
        else {
            this.btnMaze.getChildByName("itme").active = true;
            this.btnMaze.getChildByName("text").active = false;
            this.btnMaze.getChildByName("btnPlay").active = true;
            this.btnMaze.getChildByName("icon").getComponent(cc.Sprite).setMaterial(0, cc.Material.getBuiltinMaterial("2d-sprite"));
            this.btnMaze.getChildByName("First_Text_1_CN").getComponent(cc.Sprite).setMaterial(0, cc.Material.getBuiltinMaterial("2d-sprite"));
            //this.btnMaze.getChildByName("btnPlay").getChildByName("red").active=TheStorageManager.getInstance().getInt()
        }
        if (GameManager_1.default.getInstance().game_to_home == Constants_1.Go_Type.Activity_Endless) {
            this.scheduleOnce(function () {
                this.clickBtnActivity(null, "" + 1);
            }, 0.1);
        }
        else if (GameManager_1.default.getInstance().game_to_home == Constants_1.Go_Type.Activity_Boss) {
            this.scheduleOnce(function () {
                this.clickBtnActivity(null, "" + 2);
            }, 0.1);
        }
        else if (GameManager_1.default.getInstance().game_to_home == Constants_1.Go_Type.Activity_Maze) {
            this.scheduleOnce(function () {
                // this.clickBtnActivity(null,""+2)
                UIManager_1.UIManager.getInstance().showUiDialog(UIConfig_1.UIPath.VoidScene, UIConfig_1.UILayerLevel.One, { onCompleted: function (uiNode) {
                        var id = Times_1.default.voidsensid;
                        var type = RogueHexagonTypes_1.RogueHexagonTypesManager.getInstance().getLayers(id);
                        var Rowsnumber = RogueHexagonTypes_1.RogueHexagonTypesManager.getInstance().getRows(id);
                        var Positionnumber = RogueHexagonTypes_1.RogueHexagonTypesManager.getInstance().getPosition(id);
                        // let index=this.PageView.getComponent(cc.PageView).getCurrentPageIndex()
                        uiNode.getComponent(VoidScene_1.default).initUi(type, Rowsnumber, Positionnumber);
                        uiNode.getComponent(VoidScene_1.default).init({ onClose: function () {
                            } });
                        uiNode.getComponent(VoidScene_1.default).Rowsnumber = Rowsnumber; //行数
                        uiNode.getComponent(VoidScene_1.default).Positionnumber = Positionnumber; //位置数
                        uiNode.getComponent(VoidScene_1.default).Refresh();
                    }, });
            }, 0.1);
        }
        else if (GameManager_1.default.getInstance().game_to_home == Constants_1.Go_Type.Activity_Maze_lose) {
            this.scheduleOnce(function () {
                UIManager_1.UIManager.getInstance().showUiDialog(UIConfig_1.UIPath.VndlessChallenges, UIConfig_1.UILayerLevel.One, { onCompleted: function (uiNode) {
                        uiNode.getComponent(endlesschallenges_1.default).init({
                            onClose: function () {
                            }
                        });
                        uiNode.getComponent(endlesschallenges_1.default).initUi(4); //2:无尽挑战   3：boss挑战
                    }, });
            }, 0.1);
        }
        // let content = this.node.getChildByName("scrollView").getComponent(cc.ScrollView).content;
        // let overTime = new Date(new Date().toLocaleDateString()).getTime();
        // let t = 24*60*60;
        // content.getChildByName("btnEndless").getChildByName('unlock').getChildByName("time").getComponent(cc.Label).string = MyTool.getTimeStr(Math.floor(t-(Date.now() - overTime)/1000));
        // content.getChildByName("btnBoss").getChildByName('unlock').getChildByName("time").getComponent(cc.Label).string = MyTool.getTimeStr(Math.floor(t-(Date.now() - overTime)/1000));
        // content.getChildByName("btnMaze").getChildByName('unlock').getChildByName("time").getComponent(cc.Label).string = MyTool.getTimeStr(Math.floor(MazeManager.getInstance().getRemainTime()));
        // this.schedule(() =>{
        //     // console.log(MyTool.getTimeStr(Math.floor(Date.now() - overTime)),);
        //     // content.getChildByName("btnEndless").getChildByName('unlock').getChildByName("time").getComponent(cc.Label).string = MyTool.getTimeStr(Math.floor(t-(Date.now() - overTime)/1000));
        //     // content.getChildByName("btnBoss").getChildByName('unlock').getChildByName("time").getComponent(cc.Label).string = MyTool.getTimeStr(Math.floor(t-(Date.now() - overTime)/1000));
        //     // content.getChildByName("btnMaze").getChildByName('unlock').getChildByName("time").getComponent(cc.Label).string = MyTool.getTimeStr(Math.floor(MazeManager.getInstance().getRemainTime()));
        // },1,cc.macro.REPEAT_FOREVER,0);
    };
    // protected onDisable(): void {
    //     this.unscheduleAllCallbacks();
    // }
    ActivityUi.prototype.adaptation = function () {
        //上下模块
        var topUi = cc.find('Canvas/Top_Ui');
        //let down=topUi.getChildByName('down');
        var top = topUi.getChildByName('top');
        var height = (top.y - top.height / 2) * 2;
        var scrollView = this.node.getChildByName('scrollView');
        scrollView.height = height;
        scrollView.getChildByName('view').height = height;
    };
    // setActivity(){
    //     let scrollView=this.node.getChildByName('scrollView').getComponent(cc.ScrollView);
    //     let content=scrollView.content;
    //     let am=ActivityManager.getInstance();
    //     let lm=LanguageManager.getInstance();
    //     for(let i=0; i<=3; i++){
    //         let btn=content.children[i];
    //         let unlock = btn.getChildByName("unlock")
    //         let type=i+1;
    //         //判断是否解锁
    //         let isUnlock=am.getIsUnlock(type);
    //         //需要设置的控件
    //         let unlockText=btn.getChildByName("lock").getChildByName('unlockText');
    //         let numRoot=unlock.getChildByName('numRoot');
    //         // let btnPlay=lock.getChildByName('btnPlay');
    //         // let typeIcon=lock.getChildByName('typeIcon');
    //         // let kuang=lock.getChildByName('kuang');
    //         if(type==ActivityType.Boss){
    //             // let btnHard=btn.getChildByName('btnHard');
    //             content.getChildByName("btnBoss").getChildByName('unlock').getChildByName("Raid_Btn_1").active = isUnlock;
    //         }
    //         btn.getComponent(cc.Button).interactable=isUnlock;
    //         // unlockText.active=!isUnlock;
    //         numRoot.active=isUnlock&&(type==ActivityType.Boss || type==ActivityType.Endless);
    //         // btnPlay.active=isUnlock;
    //         // typeIcon.active=isUnlock&&type!=ActivityType.Tower;
    //         // kuang.active=isUnlock&&type!=ActivityType.Tower;
    //         if(isUnlock){
    //             let numText=numRoot.getChildByName('num').getComponent(cc.Label);
    //             let needText=numRoot.getChildByName('need').getComponent(cc.Label);
    //             let num=am.getTicket(type);
    //             let needNum=1;
    //             numText.string=""+num;
    //             needText.string="/"+needNum
    //             numText.node.color=num>=needNum?cc.Color.WHITE:cc.Color.RED;
    //             btn.getChildByName('lock').active = false;
    //             btn.getChildByName('unlock').active = true;
    //         }else{
    //             btn.getChildByName('lock').active = true;
    //             btn.getChildByName('unlock').active = false;
    //             //获得解锁条件
    //             let unlockType=FunctionDefinitionManager.getInstance().getUnlockConditionType(am.getFuncType(type));
    //             if(unlockType==1){
    //                 unlockText.getComponent(cc.Label).string=lm.getString(LanguageIndex.UnlockAfter)+lm.getString(LanguageIndex.PlayerLv)+FunctionDefinitionManager.getInstance().getUnlockCondictionParameter(am.getFuncType(type));
    //             }else{
    //                 unlockText.getComponent(cc.Label).string=lm.getString(LanguageIndex.UnlockAfter)+lm.getString(LanguageIndex.Level)+LevelManager.getLevelName(FunctionDefinitionManager.getInstance().getUnlockCondictionParameter(am.getFuncType(type)));
    //             }
    //         }            
    //     }
    // }
    ActivityUi.prototype.clickBtnActivity = function (btn, indexStr) {
        var _this = this;
        // console.log("_____________进副本")
        GameManager_1.default.getInstance().sound_manager.playSound(AudioConstants_1.SoundIndex.click);
        var index = parseInt(indexStr);
        switch (index) {
            case ActivityManager_1.ActivityType.Endless:
                { //无尽挑战
                    var WuJinTiaoZhanType = FunctionDefinition_1.FunctionDefinitionManager.getInstance().getUnlockConditionType(Constants_1.FuncType.WuJinTiaoZhan);
                    var WuJinTiaoZhanParameter = FunctionDefinition_1.FunctionDefinitionManager.getInstance().getUnlockCondictionParameter(Constants_1.FuncType.WuJinTiaoZhan);
                    if (LevelManager_1.LevelManager.getInstance().finish_level < WuJinTiaoZhanParameter) {
                        if (WuJinTiaoZhanType == 1) {
                            GameManager_1.default.getInstance().showMessage(LanguageManager_1.default.getInstance().getStrByTextId(100051) + ":" + WuJinTiaoZhanParameter);
                        }
                        else if (WuJinTiaoZhanType == 2) {
                            var textStr = LanguageManager_1.default.getInstance().getStrByTextId(100052);
                            var nums = MissionLevel_1.MissionLevelManager.getInstance().getLevelName((WuJinTiaoZhanParameter));
                            var str = textStr.replace('~', '' + nums);
                            GameManager_1.default.getInstance().showMessage(str);
                        }
                    }
                    else {
                        // console.log("进入无尽挑战")
                        UIManager_1.UIManager.getInstance().showUiDialog(UIConfig_1.UIPath.VndlessChallenges, UIConfig_1.UILayerLevel.One, { onCompleted: function (uiNode) {
                                uiNode.getComponent(endlesschallenges_1.default).init({
                                    onClose: function () {
                                        var num = StorageManager_1.TheStorageManager.getInstance().getInt(StorageConfig_1.StorageKey.UnlimitedChallengeTimes, 0);
                                        _this.btnEndless.getChildByName("btnPlay").getChildByName("red").active = num > 0;
                                    }
                                });
                                uiNode.getComponent(endlesschallenges_1.default).initUi(2); //2:无尽挑战   3：boss挑战
                            }, });
                    }
                    // if(PropManager.getInstance().getPropNum(PropId.EndlessChallenge) > 0){
                    //     GameManager.getInstance().cur_game_mode=GameMode.Endless;       
                    //     // UIManager.getInstance().showMapUi({onClose:()=>{
                    //     //     this.setActivity();
                    //     // }});  
                    //     UIManager.getInstance().showUiDialog(UIPath.ToPlay,UILayerLevel.One,{onCompleted:(uiNode)=> {
                    //         uiNode.getComponent(ToPlayMainUi).init({onClose:()=>{
                    //             this.setActivity();
                    //         }});
                    //     },})
                    // }else{
                    //     GameManager.getInstance().showMessage(LanguageManager.getInstance().getStrByTextId(800002));
                    // }
                }
                break;
            case ActivityManager_1.ActivityType.Boss:
                { //Boss挑战
                    // return
                    var GeRenBossType = FunctionDefinition_1.FunctionDefinitionManager.getInstance().getUnlockConditionType(Constants_1.FuncType.GeRenBoss);
                    var GeRenBossParameter = FunctionDefinition_1.FunctionDefinitionManager.getInstance().getUnlockCondictionParameter(Constants_1.FuncType.GeRenBoss);
                    if (LevelManager_1.LevelManager.getInstance().finish_level < GeRenBossParameter) {
                        if (GeRenBossType == 1) {
                            GameManager_1.default.getInstance().showMessage(LanguageManager_1.default.getInstance().getStrByTextId(100051) + ":" + GeRenBossParameter);
                        }
                        else if (GeRenBossType == 2) {
                            var textStr = LanguageManager_1.default.getInstance().getStrByTextId(100052);
                            var nums = MissionLevel_1.MissionLevelManager.getInstance().getLevelName((GeRenBossParameter));
                            var str = textStr.replace('~', '' + nums);
                            GameManager_1.default.getInstance().showMessage(str);
                        }
                    }
                    else {
                        // console.log("进入boss挑战")
                        UIManager_1.UIManager.getInstance().showUiDialog(UIConfig_1.UIPath.VndlessChallenges, UIConfig_1.UILayerLevel.One, { onCompleted: function (uiNode) {
                                uiNode.getComponent(endlesschallenges_1.default).init({
                                    onClose: function () {
                                        _this.btnBoss.getChildByName("btnPlay").getChildByName("red").active = StorageManager_1.TheStorageManager.getInstance().getInt(StorageConfig_1.StorageKey.BossChallengeTimes, 0) > 0;
                                    }
                                });
                                uiNode.getComponent(endlesschallenges_1.default).initUi(3); //2:无尽挑战   3：boss挑战
                            }, });
                    }
                    // if(PropManager.getInstance().getPropNum(PropId.BossTicket) > 0){
                    //     GameManager.getInstance().cur_game_mode=GameMode.Boss_Challenge;
                    //     // UIManager.getInstance().showMapUi({onClose:()=>{
                    //     //     this.setActivity();
                    //     // }});
                    //     UIManager.getInstance().showUiDialog(UIPath.ToPlay,UILayerLevel.One,{onCompleted:(uiNode)=> {
                    //         uiNode.getComponent(ToPlayMainUi).init({onClose:()=>{
                    //             this.setActivity();
                    //         }});
                    //     },})
                    // }else{
                    //     GameManager.getInstance().showMessage(LanguageManager.getInstance().getStrByTextId(800002));
                    // }
                }
                break;
            case ActivityManager_1.ActivityType.Tower:
                { //爬塔//暂未开放
                    GameManager_1.default.getInstance().showMessage(LanguageManager_1.default.getInstance().getStrByTextId(100113), 3); //暂未开放
                    return;
                    // GameManager.getInstance().cur_game_mode=GameMode.Tower;
                    // // UIManager.getInstance().showTowerUi();
                    // UIManager.getInstance().showUiDialog(UIPath.Tower,UILayerLevel.One,{onCompleted:(uiNode)=> {},});
                }
                break;
            case ActivityManager_1.ActivityType.Maze:
                { //虚空裂缝
                    var MiGongZhanType = FunctionDefinition_1.FunctionDefinitionManager.getInstance().getUnlockConditionType(Constants_1.FuncType.MiGong);
                    var MiGongZhanParameter = FunctionDefinition_1.FunctionDefinitionManager.getInstance().getUnlockCondictionParameter(Constants_1.FuncType.MiGong);
                    if (LevelManager_1.LevelManager.getInstance().finish_level < MiGongZhanParameter) {
                        if (MiGongZhanType == 1) {
                            GameManager_1.default.getInstance().showMessage(LanguageManager_1.default.getInstance().getStrByTextId(100051) + ":" + MiGongZhanParameter);
                        }
                        else if (MiGongZhanType == 2) {
                            var textStr = LanguageManager_1.default.getInstance().getStrByTextId(100052);
                            var nums = MissionLevel_1.MissionLevelManager.getInstance().getLevelName((MiGongZhanParameter));
                            var str = textStr.replace('~', '' + nums);
                            GameManager_1.default.getInstance().showMessage(str);
                        }
                    }
                    else {
                        // console.log("进入虚空裂缝")
                        UIManager_1.UIManager.getInstance().showUiDialog(UIConfig_1.UIPath.VndlessChallenges, UIConfig_1.UILayerLevel.One, { onCompleted: function (uiNode) {
                                uiNode.getComponent(endlesschallenges_1.default).init({
                                    onClose: function () {
                                    }
                                });
                                uiNode.getComponent(endlesschallenges_1.default).initUi(4); //2:无尽挑战   3：boss挑战  4：虚空裂缝
                            }, });
                    }
                    // GameManager.getInstance().cur_game_mode=GameMode.Maze;
                    // UIManager.getInstance().showMazeUi();
                }
                break;
        }
    };
    __decorate([
        property(cc.SpriteAtlas)
    ], ActivityUi.prototype, "activity_ui", void 0);
    __decorate([
        property(cc.Node)
    ], ActivityUi.prototype, "btnMaze", void 0);
    __decorate([
        property(cc.Node)
    ], ActivityUi.prototype, "btnBoss", void 0);
    __decorate([
        property(cc.Node)
    ], ActivityUi.prototype, "btnEndless", void 0);
    ActivityUi = __decorate([
        ccclass
    ], ActivityUi);
    return ActivityUi;
}(cc.Component));
exports.default = ActivityUi;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0c1xcVUlcXGhvbWVcXEFjdGl2aXR5VWkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsa0VBQStFO0FBRS9FLGlEQUE0QztBQUM1Qyx3RUFBOEU7QUFFOUUsdUVBQWtFO0FBQ2xFLDZEQUFvRTtBQUNwRSw2Q0FBOEQ7QUFDOUQsbUVBQThEO0FBQzlELHVFQUFrRTtBQUNsRSx5REFBd0Q7QUFFeEQsMENBQXlDO0FBR3pDLHNEQUFxRDtBQUVyRCx3Q0FBbUQ7QUFFbkQsaUVBQTREO0FBQzVELHlEQUErRDtBQUMvRCxvRkFBK0U7QUFDL0UsK0RBQWlFO0FBQ2pFLDZEQUF5RDtBQUN6RCw0REFBdUQ7QUFDdkQsK0NBQTBDO0FBQzFDLDRFQUFrRjtBQUc1RSxJQUFBLEtBQXNCLEVBQUUsQ0FBQyxVQUFVLEVBQWxDLE9BQU8sYUFBQSxFQUFFLFFBQVEsY0FBaUIsQ0FBQztBQUcxQztJQUF3Qyw4QkFBWTtJQUFwRDtRQUFBLHFFQTBhQztRQXZhRyxpQkFBVyxHQUFrQixJQUFJLENBQUM7UUFJbEMsYUFBTyxHQUFXLElBQUksQ0FBQyxDQUFBLE1BQU07UUFHN0IsYUFBTyxHQUFXLElBQUksQ0FBQyxDQUFBLFFBQVE7UUFHL0IsZ0JBQVUsR0FBVyxJQUFJLENBQUMsQ0FBQSxNQUFNOztRQW1ZaEMsbUNBQW1DO1FBQ25DLHlCQUF5QjtRQUN6QixnR0FBZ0c7UUFDaEcsb0JBQW9CO1FBQ3BCLHNGQUFzRjtRQUN0Rix5TEFBeUw7UUFDekwsdUhBQXVIO1FBQ3ZILHVMQUF1TDtRQUN2TCx1SEFBdUg7UUFDdkgsMkpBQTJKO1FBQzNKLGFBQWE7UUFDYixvRkFBb0Y7UUFDcEYsdUxBQXVMO1FBQ3ZMLHVIQUF1SDtRQUN2SCx5TEFBeUw7UUFDekwsdUhBQXVIO1FBQ3ZILDZKQUE2SjtRQUM3SixRQUFRO1FBQ1IsSUFBSTtRQUVKLGtCQUFrQjtRQUNsQiwyRUFBMkU7UUFDM0Us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QUN4QixxQkFBUyxDQUFDLFdBQVcsRUFBRSxDQUFDLFlBQVksQ0FBQyxpQkFBTSxDQUFDLGlCQUFpQixFQUFDLHVCQUFZLENBQUMsR0FBRyxFQUFDLEVBQUMsV0FBVyxFQUFDLFVBQUMsTUFBTTtnQ0FDL0YsTUFBTSxDQUFDLFlBQVksQ0FBQywyQkFBaUIsQ0FBQyxDQUFDLElBQUksQ0FBQztvQ0FDeEMsT0FBTyxFQUFDO29DQUVSLENBQUM7aUNBQ0osQ0FBQyxDQUFBO2dDQUNGLE1BQU0sQ0FBQyxZQUFZLENBQUMsMkJBQWlCLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUEsQ0FBQSwyQkFBMkI7NEJBQy9FLENBQUMsR0FBRSxDQUFDLENBQUM7cUJBQ1I7b0JBQ0QseURBQXlEO29CQUN6RCx3Q0FBd0M7aUJBQzNDO2dCQUFDLE1BQU07U0FDWDtJQUVMLENBQUM7SUEzWUQ7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLFdBQVcsQ0FBQzttREFDUztJQUlsQztRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDOytDQUNLO0lBR3ZCO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUM7K0NBQ0s7SUFHdkI7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQztrREFDUTtJQWJULFVBQVU7UUFEOUIsT0FBTztPQUNhLFVBQVUsQ0EwYTlCO0lBQUQsaUJBQUM7Q0ExYUQsQUEwYUMsQ0ExYXVDLEVBQUUsQ0FBQyxTQUFTLEdBMGFuRDtrQkExYW9CLFVBQVUiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBBY3Rpdml0eU1hbmFnZXIsIEFjdGl2aXR5VHlwZSB9IGZyb20gXCIuLi8uLi9BY3Rpdml0eS9BY3Rpdml0eU1hbmFnZXJcIjtcclxuaW1wb3J0IHsgQm9zc0NoYWxsZW5nZU1hbmFnZXIsIENoYWxsZW5nZU1vZGUgfSBmcm9tIFwiLi4vLi4vQWN0aXZpdHkvQm9zc0NoYWxsZW5nZVwiO1xyXG5pbXBvcnQgR2FtZU1hbmFnZXIgZnJvbSBcIi4uLy4uL0dhbWVNYW5hZ2VyXCI7XHJcbmltcG9ydCB7IEZ1bmN0aW9uRGVmaW5pdGlvbk1hbmFnZXIgfSBmcm9tIFwiLi4vLi4vSnNvbkRhdGEvRnVuY3Rpb25EZWZpbml0aW9uXCI7XHJcbmltcG9ydCB7IExhbmd1YWdlSW5kZXggfSBmcm9tIFwiLi4vLi4vbXVsdGlMYW5ndWFnZS9MYW5ndWFnZUNvbnN0YW50c1wiO1xyXG5pbXBvcnQgTGFuZ3VhZ2VNYW5hZ2VyIGZyb20gXCIuLi8uLi9tdWx0aUxhbmd1YWdlL0xhbmd1YWdlTWFuYWdlclwiO1xyXG5pbXBvcnQgeyBNdXNpY0luZGV4LCBTb3VuZEluZGV4IH0gZnJvbSBcIi4uLy4uL1NvdW5kL0F1ZGlvQ29uc3RhbnRzXCI7XHJcbmltcG9ydCB7IEZ1bmNUeXBlLCBHYW1lTW9kZSwgR29fVHlwZSB9IGZyb20gXCIuLi8uLi9Db25zdGFudHNcIjtcclxuaW1wb3J0IEZvbGxvd01hbmFnZXIgZnJvbSBcIi4uLy4uL211bHRpTGFuZ3VhZ2UvRm9sbG93TWFuYWdlclwiO1xyXG5pbXBvcnQgeyBGb2xsb3dfVHlwZSB9IGZyb20gXCIuLi8uLi9tdWx0aUxhbmd1YWdlL0ZvbGxvd0NvbnN0YW50c1wiO1xyXG5pbXBvcnQgeyBMZXZlbE1hbmFnZXIgfSBmcm9tIFwiLi4vLi4vTGV2ZWwvTGV2ZWxNYW5hZ2VyXCI7XHJcbmltcG9ydCBUb3dlck1hbmFnZXIgZnJvbSBcIi4uLy4uL1Rvd2VyL1Rvd2VyTWFuYWdlclwiO1xyXG5pbXBvcnQgeyBVSU1hbmFnZXIgfSBmcm9tIFwiLi4vVUlNYW5hZ2VyXCI7XHJcbmltcG9ydCBNeVRvb2wgZnJvbSBcIi4uLy4uL1Rvb2xzL015VG9vbFwiO1xyXG5pbXBvcnQgeyBNYXplTWFuYWdlciB9IGZyb20gXCIuLi8uLi9NYXplL01hemVNYW5hZ2VyXCI7XHJcbmltcG9ydCB7IFByb3BNYW5hZ2VyIH0gZnJvbSBcIi4uLy4uL1Byb3AvUHJvcE1hbmFnZXJcIjtcclxuaW1wb3J0IHsgUHJvcElkIH0gZnJvbSBcIi4uLy4uL1Byb3AvUHJvcENvbmZpZ1wiO1xyXG5pbXBvcnQgeyBVSVBhdGgsIFVJTGF5ZXJMZXZlbCB9IGZyb20gXCIuLi9VSUNvbmZpZ1wiO1xyXG5pbXBvcnQgVG9QbGF5TWFpblVpIGZyb20gXCIuL1RvUGxheU1haW5VaVwiO1xyXG5pbXBvcnQgVGV4dExhbmd1YWdlIGZyb20gXCIuLi8uLi9tdWx0aUxhbmd1YWdlL1RleHRMYW5ndWFnZVwiO1xyXG5pbXBvcnQgeyBNaXNzaW9uTGV2ZWxNYW5hZ2VyIH0gZnJvbSBcIi4uLy4uL0xldmVsL01pc3Npb25MZXZlbFwiO1xyXG5pbXBvcnQgZW5kbGVzc2NoYWxsZW5nZXMgZnJvbSBcIi4uLy4uL2NvcHkvZW5kbGVzc2NoYWxsZW5nZXMvZW5kbGVzc2NoYWxsZW5nZXNcIjtcclxuaW1wb3J0IHsgVGhlU3RvcmFnZU1hbmFnZXIgfSBmcm9tIFwiLi4vLi4vU3RvcmFnZS9TdG9yYWdlTWFuYWdlclwiO1xyXG5pbXBvcnQgeyBTdG9yYWdlS2V5IH0gZnJvbSBcIi4uLy4uL1N0b3JhZ2UvU3RvcmFnZUNvbmZpZ1wiO1xyXG5pbXBvcnQgVm9pZFNjZW5lIGZyb20gXCIuLi8uLi9jb3B5L3ZvaWRjcmFjay9Wb2lkU2NlbmVcIjtcclxuaW1wb3J0IFRpbWVzIGZyb20gXCIuLi8uLi9UdXJudGFibGUvVGltZXNcIjtcclxuaW1wb3J0IHsgUm9ndWVIZXhhZ29uVHlwZXNNYW5hZ2VyIH0gZnJvbSBcIi4uLy4uL2NvcHkvdm9pZGNyYWNrL1JvZ3VlSGV4YWdvblR5cGVzXCI7XHJcblxyXG5cclxuY29uc3Qge2NjY2xhc3MsIHByb3BlcnR5fSA9IGNjLl9kZWNvcmF0b3I7XHJcblxyXG5AY2NjbGFzc1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBBY3Rpdml0eVVpIGV4dGVuZHMgY2MuQ29tcG9uZW50IHtcclxuXHJcbiAgICBAcHJvcGVydHkoY2MuU3ByaXRlQXRsYXMpXHJcbiAgICBhY3Rpdml0eV91aTpjYy5TcHJpdGVBdGxhcyA9IG51bGw7XHJcblxyXG5cclxuICAgIEBwcm9wZXJ0eShjYy5Ob2RlKVxyXG4gICAgYnRuTWF6ZTpjYy5Ob2RlID0gbnVsbDsvL+iZmuepuuijgue8nVxyXG5cclxuICAgIEBwcm9wZXJ0eShjYy5Ob2RlKVxyXG4gICAgYnRuQm9zczpjYy5Ob2RlID0gbnVsbDsvL0JPU1PmjJHmiJhcclxuXHJcbiAgICBAcHJvcGVydHkoY2MuTm9kZSlcclxuICAgIGJ0bkVuZGxlc3M6Y2MuTm9kZSA9IG51bGw7Ly/ml6DlsL3mjJHmiJhcclxuXHJcblxyXG5cclxuICAgIHByb3RlY3RlZCBvbkxvYWQoKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5hZGFwdGF0aW9uKCk7XHJcbiAgICAgICAgLy8gdGhpcy5ub2RlLm9uKGNjLk5vZGUuRXZlbnRUeXBlLlBPU0lUSU9OX0NIQU5HRUQsdGhpcy5vblBvc2l0aW9uQ2hhbmdlLHRoaXMpO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIHByb3RlY3RlZCBvbkRlc3Ryb3koKTogdm9pZCB7XHJcbiAgICAvLyAgICAgLy8gdGhpcy5ub2RlLm9mZihjYy5Ob2RlLkV2ZW50VHlwZS5QT1NJVElPTl9DSEFOR0VELHRoaXMub25Qb3NpdGlvbkNoYW5nZSx0aGlzKTtcclxuICAgIC8vIH1cclxuXHJcbiAgICAvLyBvblBvc2l0aW9uQ2hhbmdlKCl7XHJcbiAgICAvLyAgICAgaWYodGhpcy5ub2RlLng9PTApe1xyXG4gICAgLy8gICAgICAgICB0aGlzLm9uRW5hYmxlKCk7XHJcbiAgICAvLyAgICAgfVxyXG4gICAgLy8gfVxyXG5cclxuICAgIHByb3RlY3RlZCBzdGFydCgpOiB2b2lkIHtcclxuICAgICAgICAvL1VJTWFuYWdlci5nZXRJbnN0YW5jZSgpLnByZWxvYWRQcmVmYWIoJ3VpL2hvbWUvdG93ZXJfdWknKTtcclxuXHJcbiAgICAgICAgbGV0IEdlUmVuQm9zcz10aGlzLmJ0bkJvc3MuZ2V0Q2hpbGRCeU5hbWUoXCJpdG1lXCIpXHJcbiAgICAgICAgbGV0IFd1SmluVGlhbz10aGlzLmJ0bkVuZGxlc3MuZ2V0Q2hpbGRCeU5hbWUoXCJpdG1lXCIpXHJcbiAgICAgICAgbGV0IE1pR29uZ1poYW49dGhpcy5idG5NYXplLmdldENoaWxkQnlOYW1lKFwiaXRtZVwiKVxyXG5cclxuICAgICAgICBsZXQgR2VSZW5Cb3NzaXRlbT1bNDAwMDYsMjAwMDMsMTAwMDJdXHJcbiAgICAgICAgbGV0IFd1SmluVGlhb2l0ZW09WzEwMDAxXVxyXG4gICAgICAgIGxldCBNaUdvbmdaaGFuaXRlbT1bNjAwMDEsOTAwMDIsMjAwMTJdXHJcblxyXG4gICAgICAgIGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCBHZVJlbkJvc3NpdGVtLmxlbmd0aDsgaW5kZXgrKykge1xyXG4gICAgICAgICAgICBsZXQgaXRlbT1Qcm9wTWFuYWdlci5nZXRJbnN0YW5jZSgpLmNyZWF0ZVByb3BJdGVtKEdlUmVuQm9zc2l0ZW1baW5kZXhdLDApO1xyXG4gICAgICAgICAgICBpdGVtLnNjYWxlPTAuODVcclxuICAgICAgICAgICAgaXRlbS5wYXJlbnQ9R2VSZW5Cb3NzXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCBXdUppblRpYW9pdGVtLmxlbmd0aDsgaW5kZXgrKykge1xyXG4gICAgICAgICAgICBsZXQgaXRlbT1Qcm9wTWFuYWdlci5nZXRJbnN0YW5jZSgpLmNyZWF0ZVByb3BJdGVtKFd1SmluVGlhb2l0ZW1baW5kZXhdLDApO1xyXG4gICAgICAgICAgICBpdGVtLnNjYWxlPTAuODVcclxuICAgICAgICAgICAgaXRlbS5wYXJlbnQ9V3VKaW5UaWFvXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCBNaUdvbmdaaGFuaXRlbS5sZW5ndGg7IGluZGV4KyspIHtcclxuICAgICAgICAgICAgbGV0IGl0ZW09UHJvcE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5jcmVhdGVQcm9wSXRlbShNaUdvbmdaaGFuaXRlbVtpbmRleF0sMCk7XHJcbiAgICAgICAgICAgIGl0ZW0uc2NhbGU9MC44NVxyXG4gICAgICAgICAgICBpdGVtLnBhcmVudD1NaUdvbmdaaGFuXHJcbiAgICAgICAgfVxyXG5cclxuICAgIH1cclxuXHJcbiAgICBwcm90ZWN0ZWQgb25FbmFibGUoKTogdm9pZCB7XHJcbiAgICAgICAgLy8gdGhpcy5zZXRBY3Rpdml0eSgpO1xyXG4gICAgICAgIGlmKEZvbGxvd01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRGaXJzdERvKEZvbGxvd19UeXBlLummluasoei/m+WFpeWJr+acrOmhtemdoik8PTApe1xyXG4gICAgICAgICAgICBGb2xsb3dNYW5hZ2VyLmdldEluc3RhbmNlKCkuYWRkRmlyc3REbyhGb2xsb3dfVHlwZS7pppbmrKHov5vlhaXlia/mnKzpobXpnaIpO1xyXG4gICAgICAgICAgICBGb2xsb3dNYW5hZ2VyLmdldEluc3RhbmNlKCkuZm9sbG93RXZlbnQoRm9sbG93X1R5cGUu6aaW5qyh6L+b5YWl5Ymv5pys6aG16Z2iKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy8gaWYoVG93ZXJNYW5hZ2VyLmlzX3Nob3dfdG93ZXIgJiYgRnVuY3Rpb25EZWZpbml0aW9uTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldElzVW5sb2NrKEZ1bmNUeXBlLlBhVGEpKXtcclxuICAgICAgICAvLyAgICAgR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5jdXJfZ2FtZV9tb2RlPUdhbWVNb2RlLlRvd2VyO1xyXG4gICAgICAgIC8vICAgICAvLyBVSU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zaG93VG93ZXJVaSgpO1xyXG4gICAgICAgIC8vICAgICBVSU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zaG93VWlEaWFsb2coVUlQYXRoLlRvd2VyLFVJTGF5ZXJMZXZlbC5PbmUse29uQ29tcGxldGVkOih1aU5vZGUpPT4ge30sfSk7XHJcbiAgICAgICAgLy8gfVxyXG4gICAgICAgIEdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkubXVzaWNfbWFuYWdlci5wbGF5TXVzaWMoTXVzaWNJbmRleC5CR01fRnViZW4pO1xyXG4gICAgICAgIGxldCBXdUppblRpYW9aaGFuVHlwZT1GdW5jdGlvbkRlZmluaXRpb25NYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0VW5sb2NrQ29uZGl0aW9uVHlwZShGdW5jVHlwZS5XdUppblRpYW9aaGFuKVxyXG4gICAgICAgIGxldCBXdUppblRpYW9aaGFuUGFyYW1ldGVyPUZ1bmN0aW9uRGVmaW5pdGlvbk1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRVbmxvY2tDb25kaWN0aW9uUGFyYW1ldGVyKEZ1bmNUeXBlLld1SmluVGlhb1poYW4pXHJcblxyXG4gICAgICAgIGxldCBHZVJlbkJvc3NUeXBlPUZ1bmN0aW9uRGVmaW5pdGlvbk1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRVbmxvY2tDb25kaXRpb25UeXBlKEZ1bmNUeXBlLkdlUmVuQm9zcylcclxuICAgICAgICBsZXQgR2VSZW5Cb3NzUGFyYW1ldGVyPUZ1bmN0aW9uRGVmaW5pdGlvbk1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRVbmxvY2tDb25kaWN0aW9uUGFyYW1ldGVyKEZ1bmNUeXBlLkdlUmVuQm9zcylcclxuXHJcbiAgICAgICAgbGV0IE1pR29uZ1poYW5UeXBlPUZ1bmN0aW9uRGVmaW5pdGlvbk1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRVbmxvY2tDb25kaXRpb25UeXBlKEZ1bmNUeXBlLk1pR29uZylcclxuICAgICAgICBsZXQgTWlHb25nWmhhblBhcmFtZXRlcj1GdW5jdGlvbkRlZmluaXRpb25NYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0VW5sb2NrQ29uZGljdGlvblBhcmFtZXRlcihGdW5jVHlwZS5NaUdvbmcpXHJcbiAgICAgICAgICAgIFxyXG5cclxuICAgICAgICBpZihMZXZlbE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5maW5pc2hfbGV2ZWw8V3VKaW5UaWFvWmhhblBhcmFtZXRlcil7XHJcbiAgICAgICAgICAgIGlmKFd1SmluVGlhb1poYW5UeXBlPT0xKXtcclxuICAgICAgICAgICAgICAgIHRoaXMuYnRuRW5kbGVzcy5nZXRDaGlsZEJ5TmFtZShcInRleHRcIikuZ2V0Q29tcG9uZW50KFRleHRMYW5ndWFnZSkuc2V0VGV4dElkKDEwMDA1MSlcclxuICAgICAgICAgICAgICAgIHRoaXMuYnRuRW5kbGVzcy5nZXRDaGlsZEJ5TmFtZShcInRleHRcIikuZ2V0Q29tcG9uZW50KFRleHRMYW5ndWFnZSkuc2V0UmVwbGFjZVZhbHVlKCcuJywnLicrKFd1SmluVGlhb1poYW5QYXJhbWV0ZXIpICsgJycpO1xyXG4gICAgICAgICAgICB9ZWxzZSBpZihXdUppblRpYW9aaGFuVHlwZT09Mil7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmJ0bkVuZGxlc3MuZ2V0Q2hpbGRCeU5hbWUoXCJ0ZXh0XCIpLmdldENvbXBvbmVudChUZXh0TGFuZ3VhZ2UpLnNldFRleHRJZCgxMDAwNTIpXHJcbiAgICAgICAgICAgICAgICBsZXQgbnVtcz1NaXNzaW9uTGV2ZWxNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0TGV2ZWxOYW1lKChXdUppblRpYW9aaGFuUGFyYW1ldGVyKSlcclxuICAgICAgICAgICAgICAgIHRoaXMuYnRuRW5kbGVzcy5nZXRDaGlsZEJ5TmFtZShcInRleHRcIikuZ2V0Q29tcG9uZW50KFRleHRMYW5ndWFnZSkuc2V0UmVwbGFjZVZhbHVlKCd+JywobnVtcykgKyAnJyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy5idG5FbmRsZXNzLmdldENoaWxkQnlOYW1lKFwiaXRtZVwiKS5hY3RpdmU9ZmFsc2VcclxuICAgICAgICAgICAgdGhpcy5idG5FbmRsZXNzLmdldENoaWxkQnlOYW1lKFwidGV4dFwiKS5hY3RpdmU9dHJ1ZVxyXG4gICAgICAgICAgICB0aGlzLmJ0bkVuZGxlc3MuZ2V0Q2hpbGRCeU5hbWUoXCJidG5QbGF5XCIpLmFjdGl2ZT1mYWxzZVxyXG4gICAgICAgICAgICB0aGlzLmJ0bkVuZGxlc3MuZ2V0Q2hpbGRCeU5hbWUoXCJpY29uXCIpLmdldENvbXBvbmVudChjYy5TcHJpdGUpLnNldE1hdGVyaWFsKDAsIGNjLk1hdGVyaWFsLmdldEJ1aWx0aW5NYXRlcmlhbChcIjJkLWdyYXktc3ByaXRlXCIpKTtcclxuICAgICAgICAgICAgdGhpcy5idG5FbmRsZXNzLmdldENoaWxkQnlOYW1lKFwiRmlyc3RfVGV4dF8xX0NOXCIpLmdldENvbXBvbmVudChjYy5TcHJpdGUpLnNldE1hdGVyaWFsKDAsIGNjLk1hdGVyaWFsLmdldEJ1aWx0aW5NYXRlcmlhbChcIjJkLWdyYXktc3ByaXRlXCIpKTtcclxuICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgdGhpcy5idG5FbmRsZXNzLmdldENoaWxkQnlOYW1lKFwiaXRtZVwiKS5hY3RpdmU9dHJ1ZVxyXG4gICAgICAgICAgICB0aGlzLmJ0bkVuZGxlc3MuZ2V0Q2hpbGRCeU5hbWUoXCJ0ZXh0XCIpLmFjdGl2ZT1mYWxzZVxyXG4gICAgICAgICAgICB0aGlzLmJ0bkVuZGxlc3MuZ2V0Q2hpbGRCeU5hbWUoXCJidG5QbGF5XCIpLmFjdGl2ZT10cnVlXHJcbiAgICAgICAgICAgIHRoaXMuYnRuRW5kbGVzcy5nZXRDaGlsZEJ5TmFtZShcImljb25cIikuZ2V0Q29tcG9uZW50KGNjLlNwcml0ZSkuc2V0TWF0ZXJpYWwoMCwgY2MuTWF0ZXJpYWwuZ2V0QnVpbHRpbk1hdGVyaWFsKFwiMmQtc3ByaXRlXCIpKTtcclxuICAgICAgICAgICAgdGhpcy5idG5FbmRsZXNzLmdldENoaWxkQnlOYW1lKFwiRmlyc3RfVGV4dF8xX0NOXCIpLmdldENvbXBvbmVudChjYy5TcHJpdGUpLnNldE1hdGVyaWFsKDAsIGNjLk1hdGVyaWFsLmdldEJ1aWx0aW5NYXRlcmlhbChcIjJkLXNwcml0ZVwiKSk7XHJcbiAgICAgICAgICAgIGxldCBudW09VGhlU3RvcmFnZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRJbnQoU3RvcmFnZUtleS5VbmxpbWl0ZWRDaGFsbGVuZ2VUaW1lcywwKTtcclxuICAgICAgICAgICAgdGhpcy5idG5FbmRsZXNzLmdldENoaWxkQnlOYW1lKFwiYnRuUGxheVwiKS5nZXRDaGlsZEJ5TmFtZShcInJlZFwiKS5hY3RpdmU9bnVtPjA7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmKExldmVsTWFuYWdlci5nZXRJbnN0YW5jZSgpLmZpbmlzaF9sZXZlbDxHZVJlbkJvc3NQYXJhbWV0ZXIpe1xyXG4gICAgICAgICAgICBpZihHZVJlbkJvc3NUeXBlPT0xKXtcclxuICAgICAgICAgICAgICAgIHRoaXMuYnRuQm9zcy5nZXRDaGlsZEJ5TmFtZShcInRleHRcIikuZ2V0Q29tcG9uZW50KFRleHRMYW5ndWFnZSkuc2V0VGV4dElkKDEwMDA1MSlcclxuICAgICAgICAgICAgICAgIHRoaXMuYnRuQm9zcy5nZXRDaGlsZEJ5TmFtZShcInRleHRcIikuZ2V0Q29tcG9uZW50KFRleHRMYW5ndWFnZSkuc2V0UmVwbGFjZVZhbHVlKCcuJywnLicrKEdlUmVuQm9zc1BhcmFtZXRlcikgKyAnJyk7XHJcbiAgICAgICAgICAgIH1lbHNlIGlmKEdlUmVuQm9zc1R5cGU9PTIpe1xyXG4gICAgICAgICAgICAgICAgdGhpcy5idG5Cb3NzLmdldENoaWxkQnlOYW1lKFwidGV4dFwiKS5nZXRDb21wb25lbnQoVGV4dExhbmd1YWdlKS5zZXRUZXh0SWQoMTAwMDUyKVxyXG4gICAgICAgICAgICAgICAgbGV0IG51bXM9TWlzc2lvbkxldmVsTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldExldmVsTmFtZSgoR2VSZW5Cb3NzUGFyYW1ldGVyKSlcclxuICAgICAgICAgICAgICAgIHRoaXMuYnRuQm9zcy5nZXRDaGlsZEJ5TmFtZShcInRleHRcIikuZ2V0Q29tcG9uZW50KFRleHRMYW5ndWFnZSkuc2V0UmVwbGFjZVZhbHVlKCd+JywobnVtcykgKyAnJyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy5idG5Cb3NzLmdldENoaWxkQnlOYW1lKFwiaXRtZVwiKS5hY3RpdmU9ZmFsc2VcclxuICAgICAgICAgICAgdGhpcy5idG5Cb3NzLmdldENoaWxkQnlOYW1lKFwidGV4dFwiKS5hY3RpdmU9dHJ1ZVxyXG4gICAgICAgICAgICB0aGlzLmJ0bkJvc3MuZ2V0Q2hpbGRCeU5hbWUoXCJidG5QbGF5XCIpLmFjdGl2ZT1mYWxzZVxyXG4gICAgICAgICAgICB0aGlzLmJ0bkJvc3MuZ2V0Q2hpbGRCeU5hbWUoXCJpY29uXCIpLmdldENvbXBvbmVudChjYy5TcHJpdGUpLnNldE1hdGVyaWFsKDAsIGNjLk1hdGVyaWFsLmdldEJ1aWx0aW5NYXRlcmlhbChcIjJkLWdyYXktc3ByaXRlXCIpKTtcclxuICAgICAgICAgICAgdGhpcy5idG5Cb3NzLmdldENoaWxkQnlOYW1lKFwiRmlyc3RfVGV4dF8xX0NOXCIpLmdldENvbXBvbmVudChjYy5TcHJpdGUpLnNldE1hdGVyaWFsKDAsIGNjLk1hdGVyaWFsLmdldEJ1aWx0aW5NYXRlcmlhbChcIjJkLWdyYXktc3ByaXRlXCIpKTtcclxuICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgdGhpcy5idG5Cb3NzLmdldENoaWxkQnlOYW1lKFwiaXRtZVwiKS5hY3RpdmU9dHJ1ZVxyXG4gICAgICAgICAgICB0aGlzLmJ0bkJvc3MuZ2V0Q2hpbGRCeU5hbWUoXCJ0ZXh0XCIpLmFjdGl2ZT1mYWxzZVxyXG4gICAgICAgICAgICB0aGlzLmJ0bkJvc3MuZ2V0Q2hpbGRCeU5hbWUoXCJidG5QbGF5XCIpLmFjdGl2ZT10cnVlXHJcbiAgICAgICAgICAgIHRoaXMuYnRuQm9zcy5nZXRDaGlsZEJ5TmFtZShcImljb25cIikuZ2V0Q29tcG9uZW50KGNjLlNwcml0ZSkuc2V0TWF0ZXJpYWwoMCwgY2MuTWF0ZXJpYWwuZ2V0QnVpbHRpbk1hdGVyaWFsKFwiMmQtc3ByaXRlXCIpKTtcclxuICAgICAgICAgICAgdGhpcy5idG5Cb3NzLmdldENoaWxkQnlOYW1lKFwiRmlyc3RfVGV4dF8xX0NOXCIpLmdldENvbXBvbmVudChjYy5TcHJpdGUpLnNldE1hdGVyaWFsKDAsIGNjLk1hdGVyaWFsLmdldEJ1aWx0aW5NYXRlcmlhbChcIjJkLXNwcml0ZVwiKSk7XHJcbiAgICAgICAgICAgIHRoaXMuYnRuQm9zcy5nZXRDaGlsZEJ5TmFtZShcImJ0blBsYXlcIikuZ2V0Q2hpbGRCeU5hbWUoXCJyZWRcIikuYWN0aXZlPVRoZVN0b3JhZ2VNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0SW50KFN0b3JhZ2VLZXkuQm9zc0NoYWxsZW5nZVRpbWVzLDApPjA7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmKExldmVsTWFuYWdlci5nZXRJbnN0YW5jZSgpLmZpbmlzaF9sZXZlbDxNaUdvbmdaaGFuUGFyYW1ldGVyKXtcclxuICAgICAgICAgICAgaWYoTWlHb25nWmhhblR5cGU9PTEpe1xyXG4gICAgICAgICAgICAgICAgdGhpcy5idG5NYXplLmdldENoaWxkQnlOYW1lKFwidGV4dFwiKS5nZXRDb21wb25lbnQoVGV4dExhbmd1YWdlKS5zZXRUZXh0SWQoMTAwMDUxKVxyXG4gICAgICAgICAgICAgICAgdGhpcy5idG5NYXplLmdldENoaWxkQnlOYW1lKFwidGV4dFwiKS5nZXRDb21wb25lbnQoVGV4dExhbmd1YWdlKS5zZXRSZXBsYWNlVmFsdWUoJy4nLCcuJysoTWlHb25nWmhhblBhcmFtZXRlcikgKyAnJyk7XHJcbiAgICAgICAgICAgIH1lbHNlIGlmKE1pR29uZ1poYW5UeXBlPT0yKXtcclxuICAgICAgICAgICAgICAgIHRoaXMuYnRuTWF6ZS5nZXRDaGlsZEJ5TmFtZShcInRleHRcIikuZ2V0Q29tcG9uZW50KFRleHRMYW5ndWFnZSkuc2V0VGV4dElkKDEwMDA1MilcclxuICAgICAgICAgICAgICAgIGxldCBudW1zPU1pc3Npb25MZXZlbE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRMZXZlbE5hbWUoKE1pR29uZ1poYW5QYXJhbWV0ZXIpKVxyXG4gICAgICAgICAgICAgICAgdGhpcy5idG5NYXplLmdldENoaWxkQnlOYW1lKFwidGV4dFwiKS5nZXRDb21wb25lbnQoVGV4dExhbmd1YWdlKS5zZXRSZXBsYWNlVmFsdWUoJ34nLChudW1zKSArICcnKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLmJ0bk1hemUuZ2V0Q2hpbGRCeU5hbWUoXCJpdG1lXCIpLmFjdGl2ZT1mYWxzZVxyXG4gICAgICAgICAgICB0aGlzLmJ0bk1hemUuZ2V0Q2hpbGRCeU5hbWUoXCJ0ZXh0XCIpLmFjdGl2ZT10cnVlXHJcbiAgICAgICAgICAgIHRoaXMuYnRuTWF6ZS5nZXRDaGlsZEJ5TmFtZShcImJ0blBsYXlcIikuYWN0aXZlPWZhbHNlXHJcbiAgICAgICAgICAgIHRoaXMuYnRuTWF6ZS5nZXRDaGlsZEJ5TmFtZShcImljb25cIikuZ2V0Q29tcG9uZW50KGNjLlNwcml0ZSkuc2V0TWF0ZXJpYWwoMCwgY2MuTWF0ZXJpYWwuZ2V0QnVpbHRpbk1hdGVyaWFsKFwiMmQtZ3JheS1zcHJpdGVcIikpO1xyXG4gICAgICAgICAgICB0aGlzLmJ0bk1hemUuZ2V0Q2hpbGRCeU5hbWUoXCJGaXJzdF9UZXh0XzFfQ05cIikuZ2V0Q29tcG9uZW50KGNjLlNwcml0ZSkuc2V0TWF0ZXJpYWwoMCwgY2MuTWF0ZXJpYWwuZ2V0QnVpbHRpbk1hdGVyaWFsKFwiMmQtZ3JheS1zcHJpdGVcIikpO1xyXG4gICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICB0aGlzLmJ0bk1hemUuZ2V0Q2hpbGRCeU5hbWUoXCJpdG1lXCIpLmFjdGl2ZT10cnVlXHJcbiAgICAgICAgICAgIHRoaXMuYnRuTWF6ZS5nZXRDaGlsZEJ5TmFtZShcInRleHRcIikuYWN0aXZlPWZhbHNlXHJcbiAgICAgICAgICAgIHRoaXMuYnRuTWF6ZS5nZXRDaGlsZEJ5TmFtZShcImJ0blBsYXlcIikuYWN0aXZlPXRydWVcclxuICAgICAgICAgICAgdGhpcy5idG5NYXplLmdldENoaWxkQnlOYW1lKFwiaWNvblwiKS5nZXRDb21wb25lbnQoY2MuU3ByaXRlKS5zZXRNYXRlcmlhbCgwLCBjYy5NYXRlcmlhbC5nZXRCdWlsdGluTWF0ZXJpYWwoXCIyZC1zcHJpdGVcIikpO1xyXG4gICAgICAgICAgICB0aGlzLmJ0bk1hemUuZ2V0Q2hpbGRCeU5hbWUoXCJGaXJzdF9UZXh0XzFfQ05cIikuZ2V0Q29tcG9uZW50KGNjLlNwcml0ZSkuc2V0TWF0ZXJpYWwoMCwgY2MuTWF0ZXJpYWwuZ2V0QnVpbHRpbk1hdGVyaWFsKFwiMmQtc3ByaXRlXCIpKTtcclxuICAgICAgICAgICAgLy90aGlzLmJ0bk1hemUuZ2V0Q2hpbGRCeU5hbWUoXCJidG5QbGF5XCIpLmdldENoaWxkQnlOYW1lKFwicmVkXCIpLmFjdGl2ZT1UaGVTdG9yYWdlTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldEludCgpXHJcblxyXG4gICAgICAgIH1cclxuICAgICAgICBpZihHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdhbWVfdG9faG9tZT09R29fVHlwZS5BY3Rpdml0eV9FbmRsZXNzKXtcclxuICAgICAgICAgICAgdGhpcy5zY2hlZHVsZU9uY2UoZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgICAgIHRoaXMuY2xpY2tCdG5BY3Rpdml0eShudWxsLFwiXCIrMSlcclxuICAgICAgICAgICAgfSwwLjEpXHJcbiAgICAgICAgICAgXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYoR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nYW1lX3RvX2hvbWU9PUdvX1R5cGUuQWN0aXZpdHlfQm9zcyl7XHJcbiAgICAgICAgICAgIHRoaXMuc2NoZWR1bGVPbmNlKGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNsaWNrQnRuQWN0aXZpdHkobnVsbCxcIlwiKzIpXHJcbiAgICAgICAgICAgIH0sMC4xKVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZWxzZSBpZihHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdhbWVfdG9faG9tZT09R29fVHlwZS5BY3Rpdml0eV9NYXplKXtcclxuICAgICAgICAgICAgdGhpcy5zY2hlZHVsZU9uY2UoZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgICAgIC8vIHRoaXMuY2xpY2tCdG5BY3Rpdml0eShudWxsLFwiXCIrMilcclxuICAgICAgICAgICAgICAgIFVJTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNob3dVaURpYWxvZyhVSVBhdGguVm9pZFNjZW5lLFVJTGF5ZXJMZXZlbC5PbmUse29uQ29tcGxldGVkOih1aU5vZGUpPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBpZD0gVGltZXMudm9pZHNlbnNpZFxyXG4gICAgICAgICAgICAgICAgICAgIGxldCB0eXBlPVJvZ3VlSGV4YWdvblR5cGVzTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldExheWVycyhpZClcclxuICAgICAgICAgICAgICAgICAgICBsZXQgUm93c251bWJlcj1Sb2d1ZUhleGFnb25UeXBlc01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRSb3dzKGlkKVxyXG4gICAgICAgICAgICAgICAgICAgIGxldCBQb3NpdGlvbm51bWJlcj1Sb2d1ZUhleGFnb25UeXBlc01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRQb3NpdGlvbihpZClcclxuICAgICAgICAgICAgICAgICAgICAvLyBsZXQgaW5kZXg9dGhpcy5QYWdlVmlldy5nZXRDb21wb25lbnQoY2MuUGFnZVZpZXcpLmdldEN1cnJlbnRQYWdlSW5kZXgoKVxyXG4gICAgICAgICAgICAgICAgICAgIHVpTm9kZS5nZXRDb21wb25lbnQoVm9pZFNjZW5lKS5pbml0VWkodHlwZSxSb3dzbnVtYmVyLFBvc2l0aW9ubnVtYmVyKVxyXG4gICAgICAgICAgICAgICAgICAgIHVpTm9kZS5nZXRDb21wb25lbnQoVm9pZFNjZW5lKS5pbml0KFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB7b25DbG9zZTooKT0+e1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgfX1cclxuICAgICAgICAgICAgICAgICAgICApO1xyXG4gICAgICAgICAgICAgICAgICAgIHVpTm9kZS5nZXRDb21wb25lbnQoVm9pZFNjZW5lKS5Sb3dzbnVtYmVyPVJvd3NudW1iZXIvL+ihjOaVsFxyXG4gICAgICAgICAgICAgICAgICAgIHVpTm9kZS5nZXRDb21wb25lbnQoVm9pZFNjZW5lKS5Qb3NpdGlvbm51bWJlcj1Qb3NpdGlvbm51bWJlci8v5L2N572u5pWwXHJcbiAgICAgICAgICAgICAgICAgICAgdWlOb2RlLmdldENvbXBvbmVudChWb2lkU2NlbmUpLlJlZnJlc2goKVxyXG4gICAgICAgICAgICAgICAgfSx9KVxyXG4gICAgICAgICAgICB9LDAuMSlcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGVsc2UgaWYoR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nYW1lX3RvX2hvbWU9PUdvX1R5cGUuQWN0aXZpdHlfTWF6ZV9sb3NlKXtcclxuICAgICAgICAgICAgdGhpcy5zY2hlZHVsZU9uY2UoZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgICAgIFVJTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNob3dVaURpYWxvZyhVSVBhdGguVm5kbGVzc0NoYWxsZW5nZXMsVUlMYXllckxldmVsLk9uZSx7b25Db21wbGV0ZWQ6KHVpTm9kZSk9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgdWlOb2RlLmdldENvbXBvbmVudChlbmRsZXNzY2hhbGxlbmdlcykuaW5pdCh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2xvc2U6KCk9PntcclxuICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgdWlOb2RlLmdldENvbXBvbmVudChlbmRsZXNzY2hhbGxlbmdlcykuaW5pdFVpKDQpLy8yOuaXoOWwveaMkeaImCAgIDPvvJpib3Nz5oyR5oiYXHJcbiAgICAgICAgICAgICAgICB9LH0pO1xyXG4gICAgICAgICAgICB9LDAuMSlcclxuICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBcclxuICAgICAgICAvLyBsZXQgY29udGVudCA9IHRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZShcInNjcm9sbFZpZXdcIikuZ2V0Q29tcG9uZW50KGNjLlNjcm9sbFZpZXcpLmNvbnRlbnQ7XHJcbiAgICAgICAgLy8gbGV0IG92ZXJUaW1lID0gbmV3IERhdGUobmV3IERhdGUoKS50b0xvY2FsZURhdGVTdHJpbmcoKSkuZ2V0VGltZSgpO1xyXG4gICAgICAgIC8vIGxldCB0ID0gMjQqNjAqNjA7XHJcbiAgICAgICAgLy8gY29udGVudC5nZXRDaGlsZEJ5TmFtZShcImJ0bkVuZGxlc3NcIikuZ2V0Q2hpbGRCeU5hbWUoJ3VubG9jaycpLmdldENoaWxkQnlOYW1lKFwidGltZVwiKS5nZXRDb21wb25lbnQoY2MuTGFiZWwpLnN0cmluZyA9IE15VG9vbC5nZXRUaW1lU3RyKE1hdGguZmxvb3IodC0oRGF0ZS5ub3coKSAtIG92ZXJUaW1lKS8xMDAwKSk7XHJcbiAgICAgICAgLy8gY29udGVudC5nZXRDaGlsZEJ5TmFtZShcImJ0bkJvc3NcIikuZ2V0Q2hpbGRCeU5hbWUoJ3VubG9jaycpLmdldENoaWxkQnlOYW1lKFwidGltZVwiKS5nZXRDb21wb25lbnQoY2MuTGFiZWwpLnN0cmluZyA9IE15VG9vbC5nZXRUaW1lU3RyKE1hdGguZmxvb3IodC0oRGF0ZS5ub3coKSAtIG92ZXJUaW1lKS8xMDAwKSk7XHJcbiAgICAgICAgLy8gY29udGVudC5nZXRDaGlsZEJ5TmFtZShcImJ0bk1hemVcIikuZ2V0Q2hpbGRCeU5hbWUoJ3VubG9jaycpLmdldENoaWxkQnlOYW1lKFwidGltZVwiKS5nZXRDb21wb25lbnQoY2MuTGFiZWwpLnN0cmluZyA9IE15VG9vbC5nZXRUaW1lU3RyKE1hdGguZmxvb3IoTWF6ZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRSZW1haW5UaW1lKCkpKTtcclxuICAgICAgICAvLyB0aGlzLnNjaGVkdWxlKCgpID0+e1xyXG4gICAgICAgIC8vICAgICAvLyBjb25zb2xlLmxvZyhNeVRvb2wuZ2V0VGltZVN0cihNYXRoLmZsb29yKERhdGUubm93KCkgLSBvdmVyVGltZSkpLCk7XHJcbiAgICAgICAgLy8gICAgIC8vIGNvbnRlbnQuZ2V0Q2hpbGRCeU5hbWUoXCJidG5FbmRsZXNzXCIpLmdldENoaWxkQnlOYW1lKCd1bmxvY2snKS5nZXRDaGlsZEJ5TmFtZShcInRpbWVcIikuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmcgPSBNeVRvb2wuZ2V0VGltZVN0cihNYXRoLmZsb29yKHQtKERhdGUubm93KCkgLSBvdmVyVGltZSkvMTAwMCkpO1xyXG4gICAgICAgIC8vICAgICAvLyBjb250ZW50LmdldENoaWxkQnlOYW1lKFwiYnRuQm9zc1wiKS5nZXRDaGlsZEJ5TmFtZSgndW5sb2NrJykuZ2V0Q2hpbGRCeU5hbWUoXCJ0aW1lXCIpLmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nID0gTXlUb29sLmdldFRpbWVTdHIoTWF0aC5mbG9vcih0LShEYXRlLm5vdygpIC0gb3ZlclRpbWUpLzEwMDApKTtcclxuICAgICAgICAvLyAgICAgLy8gY29udGVudC5nZXRDaGlsZEJ5TmFtZShcImJ0bk1hemVcIikuZ2V0Q2hpbGRCeU5hbWUoJ3VubG9jaycpLmdldENoaWxkQnlOYW1lKFwidGltZVwiKS5nZXRDb21wb25lbnQoY2MuTGFiZWwpLnN0cmluZyA9IE15VG9vbC5nZXRUaW1lU3RyKE1hdGguZmxvb3IoTWF6ZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRSZW1haW5UaW1lKCkpKTtcclxuICAgICAgICAvLyB9LDEsY2MubWFjcm8uUkVQRUFUX0ZPUkVWRVIsMCk7XHJcbiAgICB9XHJcblxyXG5cclxuICAgIC8vIHByb3RlY3RlZCBvbkRpc2FibGUoKTogdm9pZCB7XHJcbiAgICAvLyAgICAgdGhpcy51bnNjaGVkdWxlQWxsQ2FsbGJhY2tzKCk7XHJcbiAgICAvLyB9XHJcblxyXG4gICAgcHJpdmF0ZSBhZGFwdGF0aW9uKClcclxuICAgIHtcclxuICAgICAgICAvL+S4iuS4i+aooeWdl1xyXG4gICAgICAgIGxldCB0b3BVaT1jYy5maW5kKCdDYW52YXMvVG9wX1VpJyk7XHJcbiAgICAgICAgLy9sZXQgZG93bj10b3BVaS5nZXRDaGlsZEJ5TmFtZSgnZG93bicpO1xyXG4gICAgICAgIGxldCB0b3A9dG9wVWkuZ2V0Q2hpbGRCeU5hbWUoJ3RvcCcpO1xyXG4gICAgICAgIGxldCBoZWlnaHQ9KHRvcC55LXRvcC5oZWlnaHQvMikqMjtcclxuICAgICAgICBsZXQgc2Nyb2xsVmlldz10aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoJ3Njcm9sbFZpZXcnKTtcclxuICAgICAgICBzY3JvbGxWaWV3LmhlaWdodD1oZWlnaHQ7XHJcbiAgICAgICAgc2Nyb2xsVmlldy5nZXRDaGlsZEJ5TmFtZSgndmlldycpLmhlaWdodD1oZWlnaHQ7ICAgICAgICBcclxuICAgIH1cclxuXHJcbiAgICAvLyBzZXRBY3Rpdml0eSgpe1xyXG4gICAgLy8gICAgIGxldCBzY3JvbGxWaWV3PXRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZSgnc2Nyb2xsVmlldycpLmdldENvbXBvbmVudChjYy5TY3JvbGxWaWV3KTtcclxuICAgIC8vICAgICBsZXQgY29udGVudD1zY3JvbGxWaWV3LmNvbnRlbnQ7XHJcbiAgICAvLyAgICAgbGV0IGFtPUFjdGl2aXR5TWFuYWdlci5nZXRJbnN0YW5jZSgpO1xyXG4gICAgLy8gICAgIGxldCBsbT1MYW5ndWFnZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKTtcclxuICAgIC8vICAgICBmb3IobGV0IGk9MDsgaTw9MzsgaSsrKXtcclxuICAgIC8vICAgICAgICAgbGV0IGJ0bj1jb250ZW50LmNoaWxkcmVuW2ldO1xyXG4gICAgLy8gICAgICAgICBsZXQgdW5sb2NrID0gYnRuLmdldENoaWxkQnlOYW1lKFwidW5sb2NrXCIpXHJcbiAgICAvLyAgICAgICAgIGxldCB0eXBlPWkrMTtcclxuICAgIC8vICAgICAgICAgLy/liKTmlq3mmK/lkKbop6PplIFcclxuICAgIC8vICAgICAgICAgbGV0IGlzVW5sb2NrPWFtLmdldElzVW5sb2NrKHR5cGUpO1xyXG4gICAgLy8gICAgICAgICAvL+mcgOimgeiuvue9rueahOaOp+S7tlxyXG4gICAgLy8gICAgICAgICBsZXQgdW5sb2NrVGV4dD1idG4uZ2V0Q2hpbGRCeU5hbWUoXCJsb2NrXCIpLmdldENoaWxkQnlOYW1lKCd1bmxvY2tUZXh0Jyk7XHJcbiAgICAvLyAgICAgICAgIGxldCBudW1Sb290PXVubG9jay5nZXRDaGlsZEJ5TmFtZSgnbnVtUm9vdCcpO1xyXG4gICAgLy8gICAgICAgICAvLyBsZXQgYnRuUGxheT1sb2NrLmdldENoaWxkQnlOYW1lKCdidG5QbGF5Jyk7XHJcbiAgICAvLyAgICAgICAgIC8vIGxldCB0eXBlSWNvbj1sb2NrLmdldENoaWxkQnlOYW1lKCd0eXBlSWNvbicpO1xyXG4gICAgLy8gICAgICAgICAvLyBsZXQga3Vhbmc9bG9jay5nZXRDaGlsZEJ5TmFtZSgna3VhbmcnKTtcclxuICAgIC8vICAgICAgICAgaWYodHlwZT09QWN0aXZpdHlUeXBlLkJvc3Mpe1xyXG4gICAgLy8gICAgICAgICAgICAgLy8gbGV0IGJ0bkhhcmQ9YnRuLmdldENoaWxkQnlOYW1lKCdidG5IYXJkJyk7XHJcbiAgICAvLyAgICAgICAgICAgICBjb250ZW50LmdldENoaWxkQnlOYW1lKFwiYnRuQm9zc1wiKS5nZXRDaGlsZEJ5TmFtZSgndW5sb2NrJykuZ2V0Q2hpbGRCeU5hbWUoXCJSYWlkX0J0bl8xXCIpLmFjdGl2ZSA9IGlzVW5sb2NrO1xyXG4gICAgLy8gICAgICAgICB9XHJcbiAgICAgICAgICAgIFxyXG4gICAgLy8gICAgICAgICBidG4uZ2V0Q29tcG9uZW50KGNjLkJ1dHRvbikuaW50ZXJhY3RhYmxlPWlzVW5sb2NrO1xyXG4gICAgLy8gICAgICAgICAvLyB1bmxvY2tUZXh0LmFjdGl2ZT0haXNVbmxvY2s7XHJcbiAgICAvLyAgICAgICAgIG51bVJvb3QuYWN0aXZlPWlzVW5sb2NrJiYodHlwZT09QWN0aXZpdHlUeXBlLkJvc3MgfHwgdHlwZT09QWN0aXZpdHlUeXBlLkVuZGxlc3MpO1xyXG4gICAgLy8gICAgICAgICAvLyBidG5QbGF5LmFjdGl2ZT1pc1VubG9jaztcclxuICAgIC8vICAgICAgICAgLy8gdHlwZUljb24uYWN0aXZlPWlzVW5sb2NrJiZ0eXBlIT1BY3Rpdml0eVR5cGUuVG93ZXI7XHJcbiAgICAvLyAgICAgICAgIC8vIGt1YW5nLmFjdGl2ZT1pc1VubG9jayYmdHlwZSE9QWN0aXZpdHlUeXBlLlRvd2VyO1xyXG5cclxuICAgIC8vICAgICAgICAgaWYoaXNVbmxvY2spe1xyXG4gICAgLy8gICAgICAgICAgICAgbGV0IG51bVRleHQ9bnVtUm9vdC5nZXRDaGlsZEJ5TmFtZSgnbnVtJykuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKTtcclxuICAgIC8vICAgICAgICAgICAgIGxldCBuZWVkVGV4dD1udW1Sb290LmdldENoaWxkQnlOYW1lKCduZWVkJykuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKTtcclxuICAgIC8vICAgICAgICAgICAgIGxldCBudW09YW0uZ2V0VGlja2V0KHR5cGUpO1xyXG4gICAgLy8gICAgICAgICAgICAgbGV0IG5lZWROdW09MTtcclxuICAgIC8vICAgICAgICAgICAgIG51bVRleHQuc3RyaW5nPVwiXCIrbnVtO1xyXG4gICAgLy8gICAgICAgICAgICAgbmVlZFRleHQuc3RyaW5nPVwiL1wiK25lZWROdW1cclxuICAgIC8vICAgICAgICAgICAgIG51bVRleHQubm9kZS5jb2xvcj1udW0+PW5lZWROdW0/Y2MuQ29sb3IuV0hJVEU6Y2MuQ29sb3IuUkVEO1xyXG4gICAgLy8gICAgICAgICAgICAgYnRuLmdldENoaWxkQnlOYW1lKCdsb2NrJykuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAvLyAgICAgICAgICAgICBidG4uZ2V0Q2hpbGRCeU5hbWUoJ3VubG9jaycpLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAvLyAgICAgICAgIH1lbHNle1xyXG4gICAgLy8gICAgICAgICAgICAgYnRuLmdldENoaWxkQnlOYW1lKCdsb2NrJykuYWN0aXZlID0gdHJ1ZTtcclxuICAgIC8vICAgICAgICAgICAgIGJ0bi5nZXRDaGlsZEJ5TmFtZSgndW5sb2NrJykuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAvLyAgICAgICAgICAgICAvL+iOt+W+l+ino+mUgeadoeS7tlxyXG4gICAgLy8gICAgICAgICAgICAgbGV0IHVubG9ja1R5cGU9RnVuY3Rpb25EZWZpbml0aW9uTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldFVubG9ja0NvbmRpdGlvblR5cGUoYW0uZ2V0RnVuY1R5cGUodHlwZSkpO1xyXG4gICAgLy8gICAgICAgICAgICAgaWYodW5sb2NrVHlwZT09MSl7XHJcbiAgICAvLyAgICAgICAgICAgICAgICAgdW5sb2NrVGV4dC5nZXRDb21wb25lbnQoY2MuTGFiZWwpLnN0cmluZz1sbS5nZXRTdHJpbmcoTGFuZ3VhZ2VJbmRleC5VbmxvY2tBZnRlcikrbG0uZ2V0U3RyaW5nKExhbmd1YWdlSW5kZXguUGxheWVyTHYpK0Z1bmN0aW9uRGVmaW5pdGlvbk1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRVbmxvY2tDb25kaWN0aW9uUGFyYW1ldGVyKGFtLmdldEZ1bmNUeXBlKHR5cGUpKTtcclxuICAgIC8vICAgICAgICAgICAgIH1lbHNle1xyXG4gICAgLy8gICAgICAgICAgICAgICAgIHVubG9ja1RleHQuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmc9bG0uZ2V0U3RyaW5nKExhbmd1YWdlSW5kZXguVW5sb2NrQWZ0ZXIpK2xtLmdldFN0cmluZyhMYW5ndWFnZUluZGV4LkxldmVsKStMZXZlbE1hbmFnZXIuZ2V0TGV2ZWxOYW1lKEZ1bmN0aW9uRGVmaW5pdGlvbk1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRVbmxvY2tDb25kaWN0aW9uUGFyYW1ldGVyKGFtLmdldEZ1bmNUeXBlKHR5cGUpKSk7XHJcbiAgICAvLyAgICAgICAgICAgICB9XHJcbiAgICAvLyAgICAgICAgIH0gICAgICAgICAgICBcclxuICAgIC8vICAgICB9XHJcbiAgICAvLyB9XHJcblxyXG4gICAgY2xpY2tCdG5BY3Rpdml0eShidG46Y2MuRXZlbnQuRXZlbnRUb3VjaCxpbmRleFN0cjpzdHJpbmcpe1xyXG4gICAgICAgIC8vIGNvbnNvbGUubG9nKFwiX19fX19fX19fX19fX+i/m+WJr+acrFwiKVxyXG4gICAgICAgIEdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuc291bmRfbWFuYWdlci5wbGF5U291bmQoU291bmRJbmRleC5jbGljayk7XHJcbiAgICAgICAgbGV0IGluZGV4PXBhcnNlSW50KGluZGV4U3RyKTtcclxuICAgICAgICBzd2l0Y2goaW5kZXgpe1xyXG4gICAgICAgICAgICBjYXNlIEFjdGl2aXR5VHlwZS5FbmRsZXNzOnsvL+aXoOWwveaMkeaImFxyXG4gICAgICAgICAgICAgICAgbGV0IFd1SmluVGlhb1poYW5UeXBlPUZ1bmN0aW9uRGVmaW5pdGlvbk1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRVbmxvY2tDb25kaXRpb25UeXBlKEZ1bmNUeXBlLld1SmluVGlhb1poYW4pXHJcbiAgICAgICAgICAgICAgICBsZXQgV3VKaW5UaWFvWmhhblBhcmFtZXRlcj1GdW5jdGlvbkRlZmluaXRpb25NYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0VW5sb2NrQ29uZGljdGlvblBhcmFtZXRlcihGdW5jVHlwZS5XdUppblRpYW9aaGFuKVxyXG4gICAgICAgICAgICAgICAgaWYoTGV2ZWxNYW5hZ2VyLmdldEluc3RhbmNlKCkuZmluaXNoX2xldmVsPFd1SmluVGlhb1poYW5QYXJhbWV0ZXIpe1xyXG4gICAgICAgICAgICAgICAgICAgIGlmKFd1SmluVGlhb1poYW5UeXBlPT0xKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zaG93TWVzc2FnZShMYW5ndWFnZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRTdHJCeVRleHRJZCgxMDAwNTEpK1wiOlwiK1d1SmluVGlhb1poYW5QYXJhbWV0ZXIpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1lbHNlIGlmKFd1SmluVGlhb1poYW5UeXBlPT0yKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHRleHRTdHI9TGFuZ3VhZ2VNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0U3RyQnlUZXh0SWQoMTAwMDUyKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IG51bXM9TWlzc2lvbkxldmVsTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldExldmVsTmFtZSgoV3VKaW5UaWFvWmhhblBhcmFtZXRlcikpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBzdHI9dGV4dFN0ci5yZXBsYWNlKCd+JywnJytudW1zKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNob3dNZXNzYWdlKHN0cik7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gY29uc29sZS5sb2coXCLov5vlhaXml6DlsL3mjJHmiJhcIilcclxuICAgICAgICAgICAgICAgICAgICBVSU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zaG93VWlEaWFsb2coVUlQYXRoLlZuZGxlc3NDaGFsbGVuZ2VzLFVJTGF5ZXJMZXZlbC5PbmUse29uQ29tcGxldGVkOih1aU5vZGUpPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB1aU5vZGUuZ2V0Q29tcG9uZW50KGVuZGxlc3NjaGFsbGVuZ2VzKS5pbml0KHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2xvc2U6KCk9PntcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgbnVtPVRoZVN0b3JhZ2VNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0SW50KFN0b3JhZ2VLZXkuVW5saW1pdGVkQ2hhbGxlbmdlVGltZXMsMCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5idG5FbmRsZXNzLmdldENoaWxkQnlOYW1lKFwiYnRuUGxheVwiKS5nZXRDaGlsZEJ5TmFtZShcInJlZFwiKS5hY3RpdmU9bnVtPjA7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHVpTm9kZS5nZXRDb21wb25lbnQoZW5kbGVzc2NoYWxsZW5nZXMpLmluaXRVaSgyKS8vMjrml6DlsL3mjJHmiJggICAz77yaYm9zc+aMkeaImFxyXG4gICAgICAgICAgICAgICAgICAgIH0sfSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAvLyBpZihQcm9wTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldFByb3BOdW0oUHJvcElkLkVuZGxlc3NDaGFsbGVuZ2UpID4gMCl7XHJcbiAgICAgICAgICAgICAgICAvLyAgICAgR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5jdXJfZ2FtZV9tb2RlPUdhbWVNb2RlLkVuZGxlc3M7ICAgICAgIFxyXG4gICAgICAgICAgICAgICAgLy8gICAgIC8vIFVJTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNob3dNYXBVaSh7b25DbG9zZTooKT0+e1xyXG4gICAgICAgICAgICAgICAgLy8gICAgIC8vICAgICB0aGlzLnNldEFjdGl2aXR5KCk7XHJcbiAgICAgICAgICAgICAgICAvLyAgICAgLy8gfX0pOyAgXHJcbiAgICAgICAgICAgICAgICAvLyAgICAgVUlNYW5hZ2VyLmdldEluc3RhbmNlKCkuc2hvd1VpRGlhbG9nKFVJUGF0aC5Ub1BsYXksVUlMYXllckxldmVsLk9uZSx7b25Db21wbGV0ZWQ6KHVpTm9kZSk9PiB7XHJcbiAgICAgICAgICAgICAgICAvLyAgICAgICAgIHVpTm9kZS5nZXRDb21wb25lbnQoVG9QbGF5TWFpblVpKS5pbml0KHtvbkNsb3NlOigpPT57XHJcbiAgICAgICAgICAgICAgICAvLyAgICAgICAgICAgICB0aGlzLnNldEFjdGl2aXR5KCk7XHJcbiAgICAgICAgICAgICAgICAvLyAgICAgICAgIH19KTtcclxuICAgICAgICAgICAgICAgIC8vICAgICB9LH0pXHJcbiAgICAgICAgICAgICAgICAvLyB9ZWxzZXtcclxuICAgICAgICAgICAgICAgIC8vICAgICBHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNob3dNZXNzYWdlKExhbmd1YWdlTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldFN0ckJ5VGV4dElkKDgwMDAwMikpO1xyXG4gICAgICAgICAgICAgICAgLy8gfVxyXG4gICAgICAgICAgICB9IGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIEFjdGl2aXR5VHlwZS5Cb3NzOnsvL0Jvc3PmjJHmiJhcclxuICAgICAgICAgICAgICAgIC8vIHJldHVyblxyXG4gICAgICAgICAgICAgICAgbGV0IEdlUmVuQm9zc1R5cGU9RnVuY3Rpb25EZWZpbml0aW9uTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldFVubG9ja0NvbmRpdGlvblR5cGUoRnVuY1R5cGUuR2VSZW5Cb3NzKVxyXG4gICAgICAgICAgICAgICAgbGV0IEdlUmVuQm9zc1BhcmFtZXRlcj1GdW5jdGlvbkRlZmluaXRpb25NYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0VW5sb2NrQ29uZGljdGlvblBhcmFtZXRlcihGdW5jVHlwZS5HZVJlbkJvc3MpXHJcbiAgICAgICAgICAgICAgICBpZihMZXZlbE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5maW5pc2hfbGV2ZWw8R2VSZW5Cb3NzUGFyYW1ldGVyKXtcclxuICAgICAgICAgICAgICAgICAgICBpZihHZVJlbkJvc3NUeXBlPT0xKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zaG93TWVzc2FnZShMYW5ndWFnZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRTdHJCeVRleHRJZCgxMDAwNTEpK1wiOlwiK0dlUmVuQm9zc1BhcmFtZXRlcik7XHJcbiAgICAgICAgICAgICAgICAgICAgfWVsc2UgaWYoR2VSZW5Cb3NzVHlwZT09Mil7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCB0ZXh0U3RyPUxhbmd1YWdlTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldFN0ckJ5VGV4dElkKDEwMDA1Mik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBudW1zPU1pc3Npb25MZXZlbE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRMZXZlbE5hbWUoKEdlUmVuQm9zc1BhcmFtZXRlcikpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBzdHI9dGV4dFN0ci5yZXBsYWNlKCd+JywnJytudW1zKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNob3dNZXNzYWdlKHN0cik7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gY29uc29sZS5sb2coXCLov5vlhaVib3Nz5oyR5oiYXCIpXHJcbiAgICAgICAgICAgICAgICAgICAgVUlNYW5hZ2VyLmdldEluc3RhbmNlKCkuc2hvd1VpRGlhbG9nKFVJUGF0aC5WbmRsZXNzQ2hhbGxlbmdlcyxVSUxheWVyTGV2ZWwuT25lLHtvbkNvbXBsZXRlZDoodWlOb2RlKT0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdWlOb2RlLmdldENvbXBvbmVudChlbmRsZXNzY2hhbGxlbmdlcykuaW5pdCh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbkNsb3NlOigpPT57XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5idG5Cb3NzLmdldENoaWxkQnlOYW1lKFwiYnRuUGxheVwiKS5nZXRDaGlsZEJ5TmFtZShcInJlZFwiKS5hY3RpdmU9VGhlU3RvcmFnZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRJbnQoU3RvcmFnZUtleS5Cb3NzQ2hhbGxlbmdlVGltZXMsMCk+MDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgdWlOb2RlLmdldENvbXBvbmVudChlbmRsZXNzY2hhbGxlbmdlcykuaW5pdFVpKDMpLy8yOuaXoOWwveaMkeaImCAgIDPvvJpib3Nz5oyR5oiYXHJcbiAgICAgICAgICAgICAgICAgICAgfSx9KTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIC8vIGlmKFByb3BNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0UHJvcE51bShQcm9wSWQuQm9zc1RpY2tldCkgPiAwKXtcclxuICAgICAgICAgICAgICAgIC8vICAgICBHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLmN1cl9nYW1lX21vZGU9R2FtZU1vZGUuQm9zc19DaGFsbGVuZ2U7XHJcbiAgICAgICAgICAgICAgICAvLyAgICAgLy8gVUlNYW5hZ2VyLmdldEluc3RhbmNlKCkuc2hvd01hcFVpKHtvbkNsb3NlOigpPT57XHJcbiAgICAgICAgICAgICAgICAvLyAgICAgLy8gICAgIHRoaXMuc2V0QWN0aXZpdHkoKTtcclxuICAgICAgICAgICAgICAgIC8vICAgICAvLyB9fSk7XHJcbiAgICAgICAgICAgICAgICAvLyAgICAgVUlNYW5hZ2VyLmdldEluc3RhbmNlKCkuc2hvd1VpRGlhbG9nKFVJUGF0aC5Ub1BsYXksVUlMYXllckxldmVsLk9uZSx7b25Db21wbGV0ZWQ6KHVpTm9kZSk9PiB7XHJcbiAgICAgICAgICAgICAgICAvLyAgICAgICAgIHVpTm9kZS5nZXRDb21wb25lbnQoVG9QbGF5TWFpblVpKS5pbml0KHtvbkNsb3NlOigpPT57XHJcbiAgICAgICAgICAgICAgICAvLyAgICAgICAgICAgICB0aGlzLnNldEFjdGl2aXR5KCk7XHJcbiAgICAgICAgICAgICAgICAvLyAgICAgICAgIH19KTtcclxuICAgICAgICAgICAgICAgIC8vICAgICB9LH0pXHJcbiAgICAgICAgICAgICAgICAvLyB9ZWxzZXtcclxuICAgICAgICAgICAgICAgIC8vICAgICBHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNob3dNZXNzYWdlKExhbmd1YWdlTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldFN0ckJ5VGV4dElkKDgwMDAwMikpO1xyXG4gICAgICAgICAgICAgICAgLy8gfVxyXG4gICAgICAgICAgICB9IGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIEFjdGl2aXR5VHlwZS5Ub3dlcjp7Ly/niKzloZQvL+aaguacquW8gOaUvlxyXG4gICAgICAgICAgICAgICAgR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zaG93TWVzc2FnZShMYW5ndWFnZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRTdHJCeVRleHRJZCgxMDAxMTMpLDMpOy8v5pqC5pyq5byA5pS+XHJcbiAgICAgICAgICAgICAgICByZXR1cm5cclxuICAgICAgICAgICAgICAgIC8vIEdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuY3VyX2dhbWVfbW9kZT1HYW1lTW9kZS5Ub3dlcjtcclxuICAgICAgICAgICAgICAgIC8vIC8vIFVJTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNob3dUb3dlclVpKCk7XHJcbiAgICAgICAgICAgICAgICAvLyBVSU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zaG93VWlEaWFsb2coVUlQYXRoLlRvd2VyLFVJTGF5ZXJMZXZlbC5PbmUse29uQ29tcGxldGVkOih1aU5vZGUpPT4ge30sfSk7XHJcbiAgICAgICAgICAgIH0gYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgQWN0aXZpdHlUeXBlLk1hemU6ey8v6Jma56m66KOC57ydXHJcbiAgICAgICAgICAgICAgICBsZXQgTWlHb25nWmhhblR5cGU9RnVuY3Rpb25EZWZpbml0aW9uTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldFVubG9ja0NvbmRpdGlvblR5cGUoRnVuY1R5cGUuTWlHb25nKVxyXG4gICAgICAgICAgICAgICAgbGV0IE1pR29uZ1poYW5QYXJhbWV0ZXI9RnVuY3Rpb25EZWZpbml0aW9uTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldFVubG9ja0NvbmRpY3Rpb25QYXJhbWV0ZXIoRnVuY1R5cGUuTWlHb25nKVxyXG4gICAgICAgICAgICAgICAgaWYoTGV2ZWxNYW5hZ2VyLmdldEluc3RhbmNlKCkuZmluaXNoX2xldmVsPE1pR29uZ1poYW5QYXJhbWV0ZXIpe1xyXG4gICAgICAgICAgICAgICAgICAgIGlmKE1pR29uZ1poYW5UeXBlPT0xKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zaG93TWVzc2FnZShMYW5ndWFnZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRTdHJCeVRleHRJZCgxMDAwNTEpK1wiOlwiK01pR29uZ1poYW5QYXJhbWV0ZXIpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1lbHNlIGlmKE1pR29uZ1poYW5UeXBlPT0yKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHRleHRTdHI9TGFuZ3VhZ2VNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0U3RyQnlUZXh0SWQoMTAwMDUyKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IG51bXM9TWlzc2lvbkxldmVsTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldExldmVsTmFtZSgoTWlHb25nWmhhblBhcmFtZXRlcikpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBzdHI9dGV4dFN0ci5yZXBsYWNlKCd+JywnJytudW1zKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNob3dNZXNzYWdlKHN0cik7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gY29uc29sZS5sb2coXCLov5vlhaXomZrnqbroo4LnvJ1cIilcclxuICAgICAgICAgICAgICAgICAgICBVSU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zaG93VWlEaWFsb2coVUlQYXRoLlZuZGxlc3NDaGFsbGVuZ2VzLFVJTGF5ZXJMZXZlbC5PbmUse29uQ29tcGxldGVkOih1aU5vZGUpPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB1aU5vZGUuZ2V0Q29tcG9uZW50KGVuZGxlc3NjaGFsbGVuZ2VzKS5pbml0KHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2xvc2U6KCk9PntcclxuICAgIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB1aU5vZGUuZ2V0Q29tcG9uZW50KGVuZGxlc3NjaGFsbGVuZ2VzKS5pbml0VWkoNCkvLzI65peg5bC95oyR5oiYICAgM++8mmJvc3PmjJHmiJggIDTvvJromZrnqbroo4LnvJ1cclxuICAgICAgICAgICAgICAgICAgICB9LH0pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgLy8gR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5jdXJfZ2FtZV9tb2RlPUdhbWVNb2RlLk1hemU7XHJcbiAgICAgICAgICAgICAgICAvLyBVSU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zaG93TWF6ZVVpKCk7XHJcbiAgICAgICAgICAgIH0gYnJlYWs7XHJcbiAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgIFxyXG4gICAgfVxyXG5cclxuICAgIC8vIG9uQ2xpY2tNb2RlQ2hvb3NlKGUsbnVtOm51bWJlcil7XHJcbiAgICAvLyAgICAgbnVtID0gTnVtYmVyKG51bSk7XHJcbiAgICAvLyAgICAgbGV0IGNvbnRlbnQgPSB0aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJzY3JvbGxWaWV3XCIpLmdldENvbXBvbmVudChjYy5TY3JvbGxWaWV3KS5jb250ZW50O1xyXG4gICAgLy8gICAgIGlmKG51bSA9PSAxKXtcclxuICAgIC8vICAgICAgICAgQm9zc0NoYWxsZW5nZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5jdXJfY2hhbGxlbmdlX21vZGU9Q2hhbGxlbmdlTW9kZS5Ob2FtYWw7XHJcbiAgICAvLyAgICAgICAgIGNvbnRlbnQuZ2V0Q2hpbGRCeU5hbWUoXCJidG5Cb3NzXCIpLmdldENoaWxkQnlOYW1lKCd1bmxvY2snKS5nZXRDaGlsZEJ5TmFtZShcIlJhaWRfQnRuXzBcIikuZ2V0Q29tcG9uZW50KGNjLlNwcml0ZSkuc3ByaXRlRnJhbWUgPSB0aGlzLmFjdGl2aXR5X3VpLmdldFNwcml0ZUZyYW1lKFwiUmFpZF9CdG5fMF8xXCIpO1xyXG4gICAgLy8gICAgICAgICBjb250ZW50LmdldENoaWxkQnlOYW1lKFwiYnRuQm9zc1wiKS5nZXRDaGlsZEJ5TmFtZSgndW5sb2NrJykuZ2V0Q2hpbGRCeU5hbWUoXCJSYWlkX0J0bl8wXCIpLmNoaWxkcmVuWzBdLnkgPSAtMjU7XHJcbiAgICAvLyAgICAgICAgIGNvbnRlbnQuZ2V0Q2hpbGRCeU5hbWUoXCJidG5Cb3NzXCIpLmdldENoaWxkQnlOYW1lKCd1bmxvY2snKS5nZXRDaGlsZEJ5TmFtZShcIlJhaWRfQnRuXzFcIikuZ2V0Q29tcG9uZW50KGNjLlNwcml0ZSkuc3ByaXRlRnJhbWUgPSB0aGlzLmFjdGl2aXR5X3VpLmdldFNwcml0ZUZyYW1lKFwiUmFpZF9CdG5fMVwiKTtcclxuICAgIC8vICAgICAgICAgY29udGVudC5nZXRDaGlsZEJ5TmFtZShcImJ0bkJvc3NcIikuZ2V0Q2hpbGRCeU5hbWUoJ3VubG9jaycpLmdldENoaWxkQnlOYW1lKFwiUmFpZF9CdG5fMVwiKS5jaGlsZHJlblswXS55ID0gLTE1O1xyXG4gICAgLy8gICAgICAgICBjb250ZW50LmdldENoaWxkQnlOYW1lKFwiYnRuQm9zc1wiKS5nZXRDaGlsZEJ5TmFtZShcImljb25cIikuZ2V0Q29tcG9uZW50KGNjLlNwcml0ZSkuc3ByaXRlRnJhbWUgPSB0aGlzLmFjdGl2aXR5X3VpLmdldFNwcml0ZUZyYW1lKFwiUmFpZF9CYW5uZXJfMlwiKTtcclxuICAgIC8vICAgICB9ZWxzZXtcclxuICAgIC8vICAgICAgICAgQm9zc0NoYWxsZW5nZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5jdXJfY2hhbGxlbmdlX21vZGU9Q2hhbGxlbmdlTW9kZS5IYXJkO1xyXG4gICAgLy8gICAgICAgICBjb250ZW50LmdldENoaWxkQnlOYW1lKFwiYnRuQm9zc1wiKS5nZXRDaGlsZEJ5TmFtZSgndW5sb2NrJykuZ2V0Q2hpbGRCeU5hbWUoXCJSYWlkX0J0bl8wXCIpLmdldENvbXBvbmVudChjYy5TcHJpdGUpLnNwcml0ZUZyYW1lID0gdGhpcy5hY3Rpdml0eV91aS5nZXRTcHJpdGVGcmFtZShcIlJhaWRfQnRuXzBcIik7XHJcbiAgICAvLyAgICAgICAgIGNvbnRlbnQuZ2V0Q2hpbGRCeU5hbWUoXCJidG5Cb3NzXCIpLmdldENoaWxkQnlOYW1lKCd1bmxvY2snKS5nZXRDaGlsZEJ5TmFtZShcIlJhaWRfQnRuXzBcIikuY2hpbGRyZW5bMF0ueSA9IC0xNTtcclxuICAgIC8vICAgICAgICAgY29udGVudC5nZXRDaGlsZEJ5TmFtZShcImJ0bkJvc3NcIikuZ2V0Q2hpbGRCeU5hbWUoJ3VubG9jaycpLmdldENoaWxkQnlOYW1lKFwiUmFpZF9CdG5fMVwiKS5nZXRDb21wb25lbnQoY2MuU3ByaXRlKS5zcHJpdGVGcmFtZSA9IHRoaXMuYWN0aXZpdHlfdWkuZ2V0U3ByaXRlRnJhbWUoXCJSYWlkX0J0bl8xXzFcIik7XHJcbiAgICAvLyAgICAgICAgIGNvbnRlbnQuZ2V0Q2hpbGRCeU5hbWUoXCJidG5Cb3NzXCIpLmdldENoaWxkQnlOYW1lKCd1bmxvY2snKS5nZXRDaGlsZEJ5TmFtZShcIlJhaWRfQnRuXzFcIikuY2hpbGRyZW5bMF0ueSA9IC0yNTtcclxuICAgIC8vICAgICAgICAgY29udGVudC5nZXRDaGlsZEJ5TmFtZShcImJ0bkJvc3NcIikuZ2V0Q2hpbGRCeU5hbWUoXCJpY29uXCIpLmdldENvbXBvbmVudChjYy5TcHJpdGUpLnNwcml0ZUZyYW1lID0gdGhpcy5hY3Rpdml0eV91aS5nZXRTcHJpdGVGcmFtZShcIlJhaWRfQmFubmVyXzJfMVwiKTtcclxuICAgIC8vICAgICB9XHJcbiAgICAvLyB9XHJcblxyXG4gICAgLy8gY2xpY2tCdG5IYXJkKCl7XHJcbiAgICAvLyAgICAgR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zb3VuZF9tYW5hZ2VyLnBsYXlTb3VuZChTb3VuZEluZGV4LmNsaWNrKTtcclxuICAgIC8vICAgICBHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLmN1cl9nYW1lX21vZGU9R2FtZU1vZGUuQm9zc19DaGFsbGVuZ2U7XHJcbiAgICAvLyAgICAgQm9zc0NoYWxsZW5nZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5jdXJfY2hhbGxlbmdlX21vZGU9Q2hhbGxlbmdlTW9kZS5IYXJkO1xyXG5cclxuICAgIC8vIH1cclxufVxyXG4iXX0=