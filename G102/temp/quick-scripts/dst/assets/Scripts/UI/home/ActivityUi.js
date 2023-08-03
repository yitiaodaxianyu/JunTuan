
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
        var GeRenBossitem = [10002];
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0c1xcVUlcXGhvbWVcXEFjdGl2aXR5VWkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsa0VBQStFO0FBRS9FLGlEQUE0QztBQUM1Qyx3RUFBOEU7QUFFOUUsdUVBQWtFO0FBQ2xFLDZEQUFvRTtBQUNwRSw2Q0FBOEQ7QUFDOUQsbUVBQThEO0FBQzlELHVFQUFrRTtBQUNsRSx5REFBd0Q7QUFFeEQsMENBQXlDO0FBR3pDLHNEQUFxRDtBQUVyRCx3Q0FBbUQ7QUFFbkQsaUVBQTREO0FBQzVELHlEQUErRDtBQUMvRCxvRkFBK0U7QUFDL0UsK0RBQWlFO0FBQ2pFLDZEQUF5RDtBQUN6RCw0REFBdUQ7QUFDdkQsK0NBQTBDO0FBQzFDLDRFQUFrRjtBQUc1RSxJQUFBLEtBQXNCLEVBQUUsQ0FBQyxVQUFVLEVBQWxDLE9BQU8sYUFBQSxFQUFFLFFBQVEsY0FBaUIsQ0FBQztBQUcxQztJQUF3Qyw4QkFBWTtJQUFwRDtRQUFBLHFFQTBhQztRQXZhRyxpQkFBVyxHQUFrQixJQUFJLENBQUM7UUFJbEMsYUFBTyxHQUFXLElBQUksQ0FBQyxDQUFBLE1BQU07UUFHN0IsYUFBTyxHQUFXLElBQUksQ0FBQyxDQUFBLFFBQVE7UUFHL0IsZ0JBQVUsR0FBVyxJQUFJLENBQUMsQ0FBQSxNQUFNOztRQW1ZaEMsbUNBQW1DO1FBQ25DLHlCQUF5QjtRQUN6QixnR0FBZ0c7UUFDaEcsb0JBQW9CO1FBQ3BCLHNGQUFzRjtRQUN0Rix5TEFBeUw7UUFDekwsdUhBQXVIO1FBQ3ZILHVMQUF1TDtRQUN2TCx1SEFBdUg7UUFDdkgsMkpBQTJKO1FBQzNKLGFBQWE7UUFDYixvRkFBb0Y7UUFDcEYsdUxBQXVMO1FBQ3ZMLHVIQUF1SDtRQUN2SCx5TEFBeUw7UUFDekwsdUhBQXVIO1FBQ3ZILDZKQUE2SjtRQUM3SixRQUFRO1FBQ1IsSUFBSTtRQUVKLGtCQUFrQjtRQUNsQiwyRUFBMkU7UUFDM0Us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LEVBQUUsQ0FBQyxZQUFZLENBQUMsaUJBQU0sQ0FBQyxpQkFBaUIsRUFBQyx1QkFBWSxDQUFDLEdBQUcsRUFBQyxFQUFDLFdBQVcsRUFBQyxVQUFDLE1BQU07Z0NBQy9GLE1BQU0sQ0FBQyxZQUFZLENBQUMsMkJBQWlCLENBQUMsQ0FBQyxJQUFJLENBQUM7b0NBQ3hDLE9BQU8sRUFBQztvQ0FFUixDQUFDO2lDQUNKLENBQUMsQ0FBQTtnQ0FDRixNQUFNLENBQUMsWUFBWSxDQUFDLDJCQUFpQixDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFBLENBQUEsMkJBQTJCOzRCQUMvRSxDQUFDLEdBQUUsQ0FBQyxDQUFDO3FCQUNSO29CQUNELHlEQUF5RDtvQkFDekQsd0NBQXdDO2lCQUMzQztnQkFBQyxNQUFNO1NBQ1g7SUFFTCxDQUFDO0lBM1lEO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxXQUFXLENBQUM7bURBQ1M7SUFJbEM7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQzsrQ0FDSztJQUd2QjtRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDOytDQUNLO0lBR3ZCO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUM7a0RBQ1E7SUFiVCxVQUFVO1FBRDlCLE9BQU87T0FDYSxVQUFVLENBMGE5QjtJQUFELGlCQUFDO0NBMWFELEFBMGFDLENBMWF1QyxFQUFFLENBQUMsU0FBUyxHQTBhbkQ7a0JBMWFvQixVQUFVIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQWN0aXZpdHlNYW5hZ2VyLCBBY3Rpdml0eVR5cGUgfSBmcm9tIFwiLi4vLi4vQWN0aXZpdHkvQWN0aXZpdHlNYW5hZ2VyXCI7XHJcbmltcG9ydCB7IEJvc3NDaGFsbGVuZ2VNYW5hZ2VyLCBDaGFsbGVuZ2VNb2RlIH0gZnJvbSBcIi4uLy4uL0FjdGl2aXR5L0Jvc3NDaGFsbGVuZ2VcIjtcclxuaW1wb3J0IEdhbWVNYW5hZ2VyIGZyb20gXCIuLi8uLi9HYW1lTWFuYWdlclwiO1xyXG5pbXBvcnQgeyBGdW5jdGlvbkRlZmluaXRpb25NYW5hZ2VyIH0gZnJvbSBcIi4uLy4uL0pzb25EYXRhL0Z1bmN0aW9uRGVmaW5pdGlvblwiO1xyXG5pbXBvcnQgeyBMYW5ndWFnZUluZGV4IH0gZnJvbSBcIi4uLy4uL211bHRpTGFuZ3VhZ2UvTGFuZ3VhZ2VDb25zdGFudHNcIjtcclxuaW1wb3J0IExhbmd1YWdlTWFuYWdlciBmcm9tIFwiLi4vLi4vbXVsdGlMYW5ndWFnZS9MYW5ndWFnZU1hbmFnZXJcIjtcclxuaW1wb3J0IHsgTXVzaWNJbmRleCwgU291bmRJbmRleCB9IGZyb20gXCIuLi8uLi9Tb3VuZC9BdWRpb0NvbnN0YW50c1wiO1xyXG5pbXBvcnQgeyBGdW5jVHlwZSwgR2FtZU1vZGUsIEdvX1R5cGUgfSBmcm9tIFwiLi4vLi4vQ29uc3RhbnRzXCI7XHJcbmltcG9ydCBGb2xsb3dNYW5hZ2VyIGZyb20gXCIuLi8uLi9tdWx0aUxhbmd1YWdlL0ZvbGxvd01hbmFnZXJcIjtcclxuaW1wb3J0IHsgRm9sbG93X1R5cGUgfSBmcm9tIFwiLi4vLi4vbXVsdGlMYW5ndWFnZS9Gb2xsb3dDb25zdGFudHNcIjtcclxuaW1wb3J0IHsgTGV2ZWxNYW5hZ2VyIH0gZnJvbSBcIi4uLy4uL0xldmVsL0xldmVsTWFuYWdlclwiO1xyXG5pbXBvcnQgVG93ZXJNYW5hZ2VyIGZyb20gXCIuLi8uLi9Ub3dlci9Ub3dlck1hbmFnZXJcIjtcclxuaW1wb3J0IHsgVUlNYW5hZ2VyIH0gZnJvbSBcIi4uL1VJTWFuYWdlclwiO1xyXG5pbXBvcnQgTXlUb29sIGZyb20gXCIuLi8uLi9Ub29scy9NeVRvb2xcIjtcclxuaW1wb3J0IHsgTWF6ZU1hbmFnZXIgfSBmcm9tIFwiLi4vLi4vTWF6ZS9NYXplTWFuYWdlclwiO1xyXG5pbXBvcnQgeyBQcm9wTWFuYWdlciB9IGZyb20gXCIuLi8uLi9Qcm9wL1Byb3BNYW5hZ2VyXCI7XHJcbmltcG9ydCB7IFByb3BJZCB9IGZyb20gXCIuLi8uLi9Qcm9wL1Byb3BDb25maWdcIjtcclxuaW1wb3J0IHsgVUlQYXRoLCBVSUxheWVyTGV2ZWwgfSBmcm9tIFwiLi4vVUlDb25maWdcIjtcclxuaW1wb3J0IFRvUGxheU1haW5VaSBmcm9tIFwiLi9Ub1BsYXlNYWluVWlcIjtcclxuaW1wb3J0IFRleHRMYW5ndWFnZSBmcm9tIFwiLi4vLi4vbXVsdGlMYW5ndWFnZS9UZXh0TGFuZ3VhZ2VcIjtcclxuaW1wb3J0IHsgTWlzc2lvbkxldmVsTWFuYWdlciB9IGZyb20gXCIuLi8uLi9MZXZlbC9NaXNzaW9uTGV2ZWxcIjtcclxuaW1wb3J0IGVuZGxlc3NjaGFsbGVuZ2VzIGZyb20gXCIuLi8uLi9jb3B5L2VuZGxlc3NjaGFsbGVuZ2VzL2VuZGxlc3NjaGFsbGVuZ2VzXCI7XHJcbmltcG9ydCB7IFRoZVN0b3JhZ2VNYW5hZ2VyIH0gZnJvbSBcIi4uLy4uL1N0b3JhZ2UvU3RvcmFnZU1hbmFnZXJcIjtcclxuaW1wb3J0IHsgU3RvcmFnZUtleSB9IGZyb20gXCIuLi8uLi9TdG9yYWdlL1N0b3JhZ2VDb25maWdcIjtcclxuaW1wb3J0IFZvaWRTY2VuZSBmcm9tIFwiLi4vLi4vY29weS92b2lkY3JhY2svVm9pZFNjZW5lXCI7XHJcbmltcG9ydCBUaW1lcyBmcm9tIFwiLi4vLi4vVHVybnRhYmxlL1RpbWVzXCI7XHJcbmltcG9ydCB7IFJvZ3VlSGV4YWdvblR5cGVzTWFuYWdlciB9IGZyb20gXCIuLi8uLi9jb3B5L3ZvaWRjcmFjay9Sb2d1ZUhleGFnb25UeXBlc1wiO1xyXG5cclxuXHJcbmNvbnN0IHtjY2NsYXNzLCBwcm9wZXJ0eX0gPSBjYy5fZGVjb3JhdG9yO1xyXG5cclxuQGNjY2xhc3NcclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQWN0aXZpdHlVaSBleHRlbmRzIGNjLkNvbXBvbmVudCB7XHJcblxyXG4gICAgQHByb3BlcnR5KGNjLlNwcml0ZUF0bGFzKVxyXG4gICAgYWN0aXZpdHlfdWk6Y2MuU3ByaXRlQXRsYXMgPSBudWxsO1xyXG5cclxuXHJcbiAgICBAcHJvcGVydHkoY2MuTm9kZSlcclxuICAgIGJ0bk1hemU6Y2MuTm9kZSA9IG51bGw7Ly/omZrnqbroo4LnvJ1cclxuXHJcbiAgICBAcHJvcGVydHkoY2MuTm9kZSlcclxuICAgIGJ0bkJvc3M6Y2MuTm9kZSA9IG51bGw7Ly9CT1NT5oyR5oiYXHJcblxyXG4gICAgQHByb3BlcnR5KGNjLk5vZGUpXHJcbiAgICBidG5FbmRsZXNzOmNjLk5vZGUgPSBudWxsOy8v5peg5bC95oyR5oiYXHJcblxyXG5cclxuXHJcbiAgICBwcm90ZWN0ZWQgb25Mb2FkKCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuYWRhcHRhdGlvbigpO1xyXG4gICAgICAgIC8vIHRoaXMubm9kZS5vbihjYy5Ob2RlLkV2ZW50VHlwZS5QT1NJVElPTl9DSEFOR0VELHRoaXMub25Qb3NpdGlvbkNoYW5nZSx0aGlzKTtcclxuICAgIH1cclxuXHJcbiAgICAvLyBwcm90ZWN0ZWQgb25EZXN0cm95KCk6IHZvaWQge1xyXG4gICAgLy8gICAgIC8vIHRoaXMubm9kZS5vZmYoY2MuTm9kZS5FdmVudFR5cGUuUE9TSVRJT05fQ0hBTkdFRCx0aGlzLm9uUG9zaXRpb25DaGFuZ2UsdGhpcyk7XHJcbiAgICAvLyB9XHJcblxyXG4gICAgLy8gb25Qb3NpdGlvbkNoYW5nZSgpe1xyXG4gICAgLy8gICAgIGlmKHRoaXMubm9kZS54PT0wKXtcclxuICAgIC8vICAgICAgICAgdGhpcy5vbkVuYWJsZSgpO1xyXG4gICAgLy8gICAgIH1cclxuICAgIC8vIH1cclxuXHJcbiAgICBwcm90ZWN0ZWQgc3RhcnQoKTogdm9pZCB7XHJcbiAgICAgICAgLy9VSU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5wcmVsb2FkUHJlZmFiKCd1aS9ob21lL3Rvd2VyX3VpJyk7XHJcblxyXG4gICAgICAgIGxldCBHZVJlbkJvc3M9dGhpcy5idG5Cb3NzLmdldENoaWxkQnlOYW1lKFwiaXRtZVwiKVxyXG4gICAgICAgIGxldCBXdUppblRpYW89dGhpcy5idG5FbmRsZXNzLmdldENoaWxkQnlOYW1lKFwiaXRtZVwiKVxyXG4gICAgICAgIGxldCBNaUdvbmdaaGFuPXRoaXMuYnRuTWF6ZS5nZXRDaGlsZEJ5TmFtZShcIml0bWVcIilcclxuXHJcbiAgICAgICAgbGV0IEdlUmVuQm9zc2l0ZW09WzEwMDAyXVxyXG4gICAgICAgIGxldCBXdUppblRpYW9pdGVtPVsxMDAwMV1cclxuICAgICAgICBsZXQgTWlHb25nWmhhbml0ZW09WzYwMDAxLDkwMDAyLDIwMDEyXVxyXG5cclxuICAgICAgICBmb3IgKGxldCBpbmRleCA9IDA7IGluZGV4IDwgR2VSZW5Cb3NzaXRlbS5sZW5ndGg7IGluZGV4KyspIHtcclxuICAgICAgICAgICAgbGV0IGl0ZW09UHJvcE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5jcmVhdGVQcm9wSXRlbShHZVJlbkJvc3NpdGVtW2luZGV4XSwwKTtcclxuICAgICAgICAgICAgaXRlbS5zY2FsZT0wLjg1XHJcbiAgICAgICAgICAgIGl0ZW0ucGFyZW50PUdlUmVuQm9zc1xyXG4gICAgICAgIH1cclxuICAgICAgICBmb3IgKGxldCBpbmRleCA9IDA7IGluZGV4IDwgV3VKaW5UaWFvaXRlbS5sZW5ndGg7IGluZGV4KyspIHtcclxuICAgICAgICAgICAgbGV0IGl0ZW09UHJvcE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5jcmVhdGVQcm9wSXRlbShXdUppblRpYW9pdGVtW2luZGV4XSwwKTtcclxuICAgICAgICAgICAgaXRlbS5zY2FsZT0wLjg1XHJcbiAgICAgICAgICAgIGl0ZW0ucGFyZW50PVd1SmluVGlhb1xyXG4gICAgICAgIH1cclxuICAgICAgICBmb3IgKGxldCBpbmRleCA9IDA7IGluZGV4IDwgTWlHb25nWmhhbml0ZW0ubGVuZ3RoOyBpbmRleCsrKSB7XHJcbiAgICAgICAgICAgIGxldCBpdGVtPVByb3BNYW5hZ2VyLmdldEluc3RhbmNlKCkuY3JlYXRlUHJvcEl0ZW0oTWlHb25nWmhhbml0ZW1baW5kZXhdLDApO1xyXG4gICAgICAgICAgICBpdGVtLnNjYWxlPTAuODVcclxuICAgICAgICAgICAgaXRlbS5wYXJlbnQ9TWlHb25nWmhhblxyXG4gICAgICAgIH1cclxuXHJcbiAgICB9XHJcblxyXG4gICAgcHJvdGVjdGVkIG9uRW5hYmxlKCk6IHZvaWQge1xyXG4gICAgICAgIC8vIHRoaXMuc2V0QWN0aXZpdHkoKTtcclxuICAgICAgICBpZihGb2xsb3dNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0Rmlyc3REbyhGb2xsb3dfVHlwZS7pppbmrKHov5vlhaXlia/mnKzpobXpnaIpPD0wKXtcclxuICAgICAgICAgICAgRm9sbG93TWFuYWdlci5nZXRJbnN0YW5jZSgpLmFkZEZpcnN0RG8oRm9sbG93X1R5cGUu6aaW5qyh6L+b5YWl5Ymv5pys6aG16Z2iKTtcclxuICAgICAgICAgICAgRm9sbG93TWFuYWdlci5nZXRJbnN0YW5jZSgpLmZvbGxvd0V2ZW50KEZvbGxvd19UeXBlLummluasoei/m+WFpeWJr+acrOmhtemdoik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vIGlmKFRvd2VyTWFuYWdlci5pc19zaG93X3Rvd2VyICYmIEZ1bmN0aW9uRGVmaW5pdGlvbk1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRJc1VubG9jayhGdW5jVHlwZS5QYVRhKSl7XHJcbiAgICAgICAgLy8gICAgIEdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuY3VyX2dhbWVfbW9kZT1HYW1lTW9kZS5Ub3dlcjtcclxuICAgICAgICAvLyAgICAgLy8gVUlNYW5hZ2VyLmdldEluc3RhbmNlKCkuc2hvd1Rvd2VyVWkoKTtcclxuICAgICAgICAvLyAgICAgVUlNYW5hZ2VyLmdldEluc3RhbmNlKCkuc2hvd1VpRGlhbG9nKFVJUGF0aC5Ub3dlcixVSUxheWVyTGV2ZWwuT25lLHtvbkNvbXBsZXRlZDoodWlOb2RlKT0+IHt9LH0pO1xyXG4gICAgICAgIC8vIH1cclxuICAgICAgICBHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLm11c2ljX21hbmFnZXIucGxheU11c2ljKE11c2ljSW5kZXguQkdNX0Z1YmVuKTtcclxuICAgICAgICBsZXQgV3VKaW5UaWFvWmhhblR5cGU9RnVuY3Rpb25EZWZpbml0aW9uTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldFVubG9ja0NvbmRpdGlvblR5cGUoRnVuY1R5cGUuV3VKaW5UaWFvWmhhbilcclxuICAgICAgICBsZXQgV3VKaW5UaWFvWmhhblBhcmFtZXRlcj1GdW5jdGlvbkRlZmluaXRpb25NYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0VW5sb2NrQ29uZGljdGlvblBhcmFtZXRlcihGdW5jVHlwZS5XdUppblRpYW9aaGFuKVxyXG5cclxuICAgICAgICBsZXQgR2VSZW5Cb3NzVHlwZT1GdW5jdGlvbkRlZmluaXRpb25NYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0VW5sb2NrQ29uZGl0aW9uVHlwZShGdW5jVHlwZS5HZVJlbkJvc3MpXHJcbiAgICAgICAgbGV0IEdlUmVuQm9zc1BhcmFtZXRlcj1GdW5jdGlvbkRlZmluaXRpb25NYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0VW5sb2NrQ29uZGljdGlvblBhcmFtZXRlcihGdW5jVHlwZS5HZVJlbkJvc3MpXHJcblxyXG4gICAgICAgIGxldCBNaUdvbmdaaGFuVHlwZT1GdW5jdGlvbkRlZmluaXRpb25NYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0VW5sb2NrQ29uZGl0aW9uVHlwZShGdW5jVHlwZS5NaUdvbmcpXHJcbiAgICAgICAgbGV0IE1pR29uZ1poYW5QYXJhbWV0ZXI9RnVuY3Rpb25EZWZpbml0aW9uTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldFVubG9ja0NvbmRpY3Rpb25QYXJhbWV0ZXIoRnVuY1R5cGUuTWlHb25nKVxyXG4gICAgICAgICAgICBcclxuXHJcbiAgICAgICAgaWYoTGV2ZWxNYW5hZ2VyLmdldEluc3RhbmNlKCkuZmluaXNoX2xldmVsPFd1SmluVGlhb1poYW5QYXJhbWV0ZXIpe1xyXG4gICAgICAgICAgICBpZihXdUppblRpYW9aaGFuVHlwZT09MSl7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmJ0bkVuZGxlc3MuZ2V0Q2hpbGRCeU5hbWUoXCJ0ZXh0XCIpLmdldENvbXBvbmVudChUZXh0TGFuZ3VhZ2UpLnNldFRleHRJZCgxMDAwNTEpXHJcbiAgICAgICAgICAgICAgICB0aGlzLmJ0bkVuZGxlc3MuZ2V0Q2hpbGRCeU5hbWUoXCJ0ZXh0XCIpLmdldENvbXBvbmVudChUZXh0TGFuZ3VhZ2UpLnNldFJlcGxhY2VWYWx1ZSgnLicsJy4nKyhXdUppblRpYW9aaGFuUGFyYW1ldGVyKSArICcnKTtcclxuICAgICAgICAgICAgfWVsc2UgaWYoV3VKaW5UaWFvWmhhblR5cGU9PTIpe1xyXG4gICAgICAgICAgICAgICAgdGhpcy5idG5FbmRsZXNzLmdldENoaWxkQnlOYW1lKFwidGV4dFwiKS5nZXRDb21wb25lbnQoVGV4dExhbmd1YWdlKS5zZXRUZXh0SWQoMTAwMDUyKVxyXG4gICAgICAgICAgICAgICAgbGV0IG51bXM9TWlzc2lvbkxldmVsTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldExldmVsTmFtZSgoV3VKaW5UaWFvWmhhblBhcmFtZXRlcikpXHJcbiAgICAgICAgICAgICAgICB0aGlzLmJ0bkVuZGxlc3MuZ2V0Q2hpbGRCeU5hbWUoXCJ0ZXh0XCIpLmdldENvbXBvbmVudChUZXh0TGFuZ3VhZ2UpLnNldFJlcGxhY2VWYWx1ZSgnficsKG51bXMpICsgJycpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMuYnRuRW5kbGVzcy5nZXRDaGlsZEJ5TmFtZShcIml0bWVcIikuYWN0aXZlPWZhbHNlXHJcbiAgICAgICAgICAgIHRoaXMuYnRuRW5kbGVzcy5nZXRDaGlsZEJ5TmFtZShcInRleHRcIikuYWN0aXZlPXRydWVcclxuICAgICAgICAgICAgdGhpcy5idG5FbmRsZXNzLmdldENoaWxkQnlOYW1lKFwiYnRuUGxheVwiKS5hY3RpdmU9ZmFsc2VcclxuICAgICAgICAgICAgdGhpcy5idG5FbmRsZXNzLmdldENoaWxkQnlOYW1lKFwiaWNvblwiKS5nZXRDb21wb25lbnQoY2MuU3ByaXRlKS5zZXRNYXRlcmlhbCgwLCBjYy5NYXRlcmlhbC5nZXRCdWlsdGluTWF0ZXJpYWwoXCIyZC1ncmF5LXNwcml0ZVwiKSk7XHJcbiAgICAgICAgICAgIHRoaXMuYnRuRW5kbGVzcy5nZXRDaGlsZEJ5TmFtZShcIkZpcnN0X1RleHRfMV9DTlwiKS5nZXRDb21wb25lbnQoY2MuU3ByaXRlKS5zZXRNYXRlcmlhbCgwLCBjYy5NYXRlcmlhbC5nZXRCdWlsdGluTWF0ZXJpYWwoXCIyZC1ncmF5LXNwcml0ZVwiKSk7XHJcbiAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgIHRoaXMuYnRuRW5kbGVzcy5nZXRDaGlsZEJ5TmFtZShcIml0bWVcIikuYWN0aXZlPXRydWVcclxuICAgICAgICAgICAgdGhpcy5idG5FbmRsZXNzLmdldENoaWxkQnlOYW1lKFwidGV4dFwiKS5hY3RpdmU9ZmFsc2VcclxuICAgICAgICAgICAgdGhpcy5idG5FbmRsZXNzLmdldENoaWxkQnlOYW1lKFwiYnRuUGxheVwiKS5hY3RpdmU9dHJ1ZVxyXG4gICAgICAgICAgICB0aGlzLmJ0bkVuZGxlc3MuZ2V0Q2hpbGRCeU5hbWUoXCJpY29uXCIpLmdldENvbXBvbmVudChjYy5TcHJpdGUpLnNldE1hdGVyaWFsKDAsIGNjLk1hdGVyaWFsLmdldEJ1aWx0aW5NYXRlcmlhbChcIjJkLXNwcml0ZVwiKSk7XHJcbiAgICAgICAgICAgIHRoaXMuYnRuRW5kbGVzcy5nZXRDaGlsZEJ5TmFtZShcIkZpcnN0X1RleHRfMV9DTlwiKS5nZXRDb21wb25lbnQoY2MuU3ByaXRlKS5zZXRNYXRlcmlhbCgwLCBjYy5NYXRlcmlhbC5nZXRCdWlsdGluTWF0ZXJpYWwoXCIyZC1zcHJpdGVcIikpO1xyXG4gICAgICAgICAgICBsZXQgbnVtPVRoZVN0b3JhZ2VNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0SW50KFN0b3JhZ2VLZXkuVW5saW1pdGVkQ2hhbGxlbmdlVGltZXMsMCk7XHJcbiAgICAgICAgICAgIHRoaXMuYnRuRW5kbGVzcy5nZXRDaGlsZEJ5TmFtZShcImJ0blBsYXlcIikuZ2V0Q2hpbGRCeU5hbWUoXCJyZWRcIikuYWN0aXZlPW51bT4wO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZihMZXZlbE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5maW5pc2hfbGV2ZWw8R2VSZW5Cb3NzUGFyYW1ldGVyKXtcclxuICAgICAgICAgICAgaWYoR2VSZW5Cb3NzVHlwZT09MSl7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmJ0bkJvc3MuZ2V0Q2hpbGRCeU5hbWUoXCJ0ZXh0XCIpLmdldENvbXBvbmVudChUZXh0TGFuZ3VhZ2UpLnNldFRleHRJZCgxMDAwNTEpXHJcbiAgICAgICAgICAgICAgICB0aGlzLmJ0bkJvc3MuZ2V0Q2hpbGRCeU5hbWUoXCJ0ZXh0XCIpLmdldENvbXBvbmVudChUZXh0TGFuZ3VhZ2UpLnNldFJlcGxhY2VWYWx1ZSgnLicsJy4nKyhHZVJlbkJvc3NQYXJhbWV0ZXIpICsgJycpO1xyXG4gICAgICAgICAgICB9ZWxzZSBpZihHZVJlbkJvc3NUeXBlPT0yKXtcclxuICAgICAgICAgICAgICAgIHRoaXMuYnRuQm9zcy5nZXRDaGlsZEJ5TmFtZShcInRleHRcIikuZ2V0Q29tcG9uZW50KFRleHRMYW5ndWFnZSkuc2V0VGV4dElkKDEwMDA1MilcclxuICAgICAgICAgICAgICAgIGxldCBudW1zPU1pc3Npb25MZXZlbE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRMZXZlbE5hbWUoKEdlUmVuQm9zc1BhcmFtZXRlcikpXHJcbiAgICAgICAgICAgICAgICB0aGlzLmJ0bkJvc3MuZ2V0Q2hpbGRCeU5hbWUoXCJ0ZXh0XCIpLmdldENvbXBvbmVudChUZXh0TGFuZ3VhZ2UpLnNldFJlcGxhY2VWYWx1ZSgnficsKG51bXMpICsgJycpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMuYnRuQm9zcy5nZXRDaGlsZEJ5TmFtZShcIml0bWVcIikuYWN0aXZlPWZhbHNlXHJcbiAgICAgICAgICAgIHRoaXMuYnRuQm9zcy5nZXRDaGlsZEJ5TmFtZShcInRleHRcIikuYWN0aXZlPXRydWVcclxuICAgICAgICAgICAgdGhpcy5idG5Cb3NzLmdldENoaWxkQnlOYW1lKFwiYnRuUGxheVwiKS5hY3RpdmU9ZmFsc2VcclxuICAgICAgICAgICAgdGhpcy5idG5Cb3NzLmdldENoaWxkQnlOYW1lKFwiaWNvblwiKS5nZXRDb21wb25lbnQoY2MuU3ByaXRlKS5zZXRNYXRlcmlhbCgwLCBjYy5NYXRlcmlhbC5nZXRCdWlsdGluTWF0ZXJpYWwoXCIyZC1ncmF5LXNwcml0ZVwiKSk7XHJcbiAgICAgICAgICAgIHRoaXMuYnRuQm9zcy5nZXRDaGlsZEJ5TmFtZShcIkZpcnN0X1RleHRfMV9DTlwiKS5nZXRDb21wb25lbnQoY2MuU3ByaXRlKS5zZXRNYXRlcmlhbCgwLCBjYy5NYXRlcmlhbC5nZXRCdWlsdGluTWF0ZXJpYWwoXCIyZC1ncmF5LXNwcml0ZVwiKSk7XHJcbiAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgIHRoaXMuYnRuQm9zcy5nZXRDaGlsZEJ5TmFtZShcIml0bWVcIikuYWN0aXZlPXRydWVcclxuICAgICAgICAgICAgdGhpcy5idG5Cb3NzLmdldENoaWxkQnlOYW1lKFwidGV4dFwiKS5hY3RpdmU9ZmFsc2VcclxuICAgICAgICAgICAgdGhpcy5idG5Cb3NzLmdldENoaWxkQnlOYW1lKFwiYnRuUGxheVwiKS5hY3RpdmU9dHJ1ZVxyXG4gICAgICAgICAgICB0aGlzLmJ0bkJvc3MuZ2V0Q2hpbGRCeU5hbWUoXCJpY29uXCIpLmdldENvbXBvbmVudChjYy5TcHJpdGUpLnNldE1hdGVyaWFsKDAsIGNjLk1hdGVyaWFsLmdldEJ1aWx0aW5NYXRlcmlhbChcIjJkLXNwcml0ZVwiKSk7XHJcbiAgICAgICAgICAgIHRoaXMuYnRuQm9zcy5nZXRDaGlsZEJ5TmFtZShcIkZpcnN0X1RleHRfMV9DTlwiKS5nZXRDb21wb25lbnQoY2MuU3ByaXRlKS5zZXRNYXRlcmlhbCgwLCBjYy5NYXRlcmlhbC5nZXRCdWlsdGluTWF0ZXJpYWwoXCIyZC1zcHJpdGVcIikpO1xyXG4gICAgICAgICAgICB0aGlzLmJ0bkJvc3MuZ2V0Q2hpbGRCeU5hbWUoXCJidG5QbGF5XCIpLmdldENoaWxkQnlOYW1lKFwicmVkXCIpLmFjdGl2ZT1UaGVTdG9yYWdlTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldEludChTdG9yYWdlS2V5LkJvc3NDaGFsbGVuZ2VUaW1lcywwKT4wO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZihMZXZlbE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5maW5pc2hfbGV2ZWw8TWlHb25nWmhhblBhcmFtZXRlcil7XHJcbiAgICAgICAgICAgIGlmKE1pR29uZ1poYW5UeXBlPT0xKXtcclxuICAgICAgICAgICAgICAgIHRoaXMuYnRuTWF6ZS5nZXRDaGlsZEJ5TmFtZShcInRleHRcIikuZ2V0Q29tcG9uZW50KFRleHRMYW5ndWFnZSkuc2V0VGV4dElkKDEwMDA1MSlcclxuICAgICAgICAgICAgICAgIHRoaXMuYnRuTWF6ZS5nZXRDaGlsZEJ5TmFtZShcInRleHRcIikuZ2V0Q29tcG9uZW50KFRleHRMYW5ndWFnZSkuc2V0UmVwbGFjZVZhbHVlKCcuJywnLicrKE1pR29uZ1poYW5QYXJhbWV0ZXIpICsgJycpO1xyXG4gICAgICAgICAgICB9ZWxzZSBpZihNaUdvbmdaaGFuVHlwZT09Mil7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmJ0bk1hemUuZ2V0Q2hpbGRCeU5hbWUoXCJ0ZXh0XCIpLmdldENvbXBvbmVudChUZXh0TGFuZ3VhZ2UpLnNldFRleHRJZCgxMDAwNTIpXHJcbiAgICAgICAgICAgICAgICBsZXQgbnVtcz1NaXNzaW9uTGV2ZWxNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0TGV2ZWxOYW1lKChNaUdvbmdaaGFuUGFyYW1ldGVyKSlcclxuICAgICAgICAgICAgICAgIHRoaXMuYnRuTWF6ZS5nZXRDaGlsZEJ5TmFtZShcInRleHRcIikuZ2V0Q29tcG9uZW50KFRleHRMYW5ndWFnZSkuc2V0UmVwbGFjZVZhbHVlKCd+JywobnVtcykgKyAnJyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy5idG5NYXplLmdldENoaWxkQnlOYW1lKFwiaXRtZVwiKS5hY3RpdmU9ZmFsc2VcclxuICAgICAgICAgICAgdGhpcy5idG5NYXplLmdldENoaWxkQnlOYW1lKFwidGV4dFwiKS5hY3RpdmU9dHJ1ZVxyXG4gICAgICAgICAgICB0aGlzLmJ0bk1hemUuZ2V0Q2hpbGRCeU5hbWUoXCJidG5QbGF5XCIpLmFjdGl2ZT1mYWxzZVxyXG4gICAgICAgICAgICB0aGlzLmJ0bk1hemUuZ2V0Q2hpbGRCeU5hbWUoXCJpY29uXCIpLmdldENvbXBvbmVudChjYy5TcHJpdGUpLnNldE1hdGVyaWFsKDAsIGNjLk1hdGVyaWFsLmdldEJ1aWx0aW5NYXRlcmlhbChcIjJkLWdyYXktc3ByaXRlXCIpKTtcclxuICAgICAgICAgICAgdGhpcy5idG5NYXplLmdldENoaWxkQnlOYW1lKFwiRmlyc3RfVGV4dF8xX0NOXCIpLmdldENvbXBvbmVudChjYy5TcHJpdGUpLnNldE1hdGVyaWFsKDAsIGNjLk1hdGVyaWFsLmdldEJ1aWx0aW5NYXRlcmlhbChcIjJkLWdyYXktc3ByaXRlXCIpKTtcclxuICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgdGhpcy5idG5NYXplLmdldENoaWxkQnlOYW1lKFwiaXRtZVwiKS5hY3RpdmU9dHJ1ZVxyXG4gICAgICAgICAgICB0aGlzLmJ0bk1hemUuZ2V0Q2hpbGRCeU5hbWUoXCJ0ZXh0XCIpLmFjdGl2ZT1mYWxzZVxyXG4gICAgICAgICAgICB0aGlzLmJ0bk1hemUuZ2V0Q2hpbGRCeU5hbWUoXCJidG5QbGF5XCIpLmFjdGl2ZT10cnVlXHJcbiAgICAgICAgICAgIHRoaXMuYnRuTWF6ZS5nZXRDaGlsZEJ5TmFtZShcImljb25cIikuZ2V0Q29tcG9uZW50KGNjLlNwcml0ZSkuc2V0TWF0ZXJpYWwoMCwgY2MuTWF0ZXJpYWwuZ2V0QnVpbHRpbk1hdGVyaWFsKFwiMmQtc3ByaXRlXCIpKTtcclxuICAgICAgICAgICAgdGhpcy5idG5NYXplLmdldENoaWxkQnlOYW1lKFwiRmlyc3RfVGV4dF8xX0NOXCIpLmdldENvbXBvbmVudChjYy5TcHJpdGUpLnNldE1hdGVyaWFsKDAsIGNjLk1hdGVyaWFsLmdldEJ1aWx0aW5NYXRlcmlhbChcIjJkLXNwcml0ZVwiKSk7XHJcbiAgICAgICAgICAgIC8vdGhpcy5idG5NYXplLmdldENoaWxkQnlOYW1lKFwiYnRuUGxheVwiKS5nZXRDaGlsZEJ5TmFtZShcInJlZFwiKS5hY3RpdmU9VGhlU3RvcmFnZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRJbnQoKVxyXG5cclxuICAgICAgICB9XHJcbiAgICAgICAgaWYoR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nYW1lX3RvX2hvbWU9PUdvX1R5cGUuQWN0aXZpdHlfRW5kbGVzcyl7XHJcbiAgICAgICAgICAgIHRoaXMuc2NoZWR1bGVPbmNlKGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNsaWNrQnRuQWN0aXZpdHkobnVsbCxcIlwiKzEpXHJcbiAgICAgICAgICAgIH0sMC4xKVxyXG4gICAgICAgICAgIFxyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmKEdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2FtZV90b19ob21lPT1Hb19UeXBlLkFjdGl2aXR5X0Jvc3Mpe1xyXG4gICAgICAgICAgICB0aGlzLnNjaGVkdWxlT25jZShmdW5jdGlvbigpe1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jbGlja0J0bkFjdGl2aXR5KG51bGwsXCJcIisyKVxyXG4gICAgICAgICAgICB9LDAuMSlcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGVsc2UgaWYoR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nYW1lX3RvX2hvbWU9PUdvX1R5cGUuQWN0aXZpdHlfTWF6ZSl7XHJcbiAgICAgICAgICAgIHRoaXMuc2NoZWR1bGVPbmNlKGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgICAgICAvLyB0aGlzLmNsaWNrQnRuQWN0aXZpdHkobnVsbCxcIlwiKzIpXHJcbiAgICAgICAgICAgICAgICBVSU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zaG93VWlEaWFsb2coVUlQYXRoLlZvaWRTY2VuZSxVSUxheWVyTGV2ZWwuT25lLHtvbkNvbXBsZXRlZDoodWlOb2RlKT0+IHtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgaWQ9IFRpbWVzLnZvaWRzZW5zaWRcclxuICAgICAgICAgICAgICAgICAgICBsZXQgdHlwZT1Sb2d1ZUhleGFnb25UeXBlc01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRMYXllcnMoaWQpXHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IFJvd3NudW1iZXI9Um9ndWVIZXhhZ29uVHlwZXNNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0Um93cyhpZClcclxuICAgICAgICAgICAgICAgICAgICBsZXQgUG9zaXRpb25udW1iZXI9Um9ndWVIZXhhZ29uVHlwZXNNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0UG9zaXRpb24oaWQpXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gbGV0IGluZGV4PXRoaXMuUGFnZVZpZXcuZ2V0Q29tcG9uZW50KGNjLlBhZ2VWaWV3KS5nZXRDdXJyZW50UGFnZUluZGV4KClcclxuICAgICAgICAgICAgICAgICAgICB1aU5vZGUuZ2V0Q29tcG9uZW50KFZvaWRTY2VuZSkuaW5pdFVpKHR5cGUsUm93c251bWJlcixQb3NpdGlvbm51bWJlcilcclxuICAgICAgICAgICAgICAgICAgICB1aU5vZGUuZ2V0Q29tcG9uZW50KFZvaWRTY2VuZSkuaW5pdChcclxuICAgICAgICAgICAgICAgICAgICAgICAge29uQ2xvc2U6KCk9PntcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH19XHJcbiAgICAgICAgICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgICAgICAgICB1aU5vZGUuZ2V0Q29tcG9uZW50KFZvaWRTY2VuZSkuUm93c251bWJlcj1Sb3dzbnVtYmVyLy/ooYzmlbBcclxuICAgICAgICAgICAgICAgICAgICB1aU5vZGUuZ2V0Q29tcG9uZW50KFZvaWRTY2VuZSkuUG9zaXRpb25udW1iZXI9UG9zaXRpb25udW1iZXIvL+S9jee9ruaVsFxyXG4gICAgICAgICAgICAgICAgICAgIHVpTm9kZS5nZXRDb21wb25lbnQoVm9pZFNjZW5lKS5SZWZyZXNoKClcclxuICAgICAgICAgICAgICAgIH0sfSlcclxuICAgICAgICAgICAgfSwwLjEpXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBlbHNlIGlmKEdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2FtZV90b19ob21lPT1Hb19UeXBlLkFjdGl2aXR5X01hemVfbG9zZSl7XHJcbiAgICAgICAgICAgIHRoaXMuc2NoZWR1bGVPbmNlKGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgICAgICBVSU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zaG93VWlEaWFsb2coVUlQYXRoLlZuZGxlc3NDaGFsbGVuZ2VzLFVJTGF5ZXJMZXZlbC5PbmUse29uQ29tcGxldGVkOih1aU5vZGUpPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHVpTm9kZS5nZXRDb21wb25lbnQoZW5kbGVzc2NoYWxsZW5nZXMpLmluaXQoe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBvbkNsb3NlOigpPT57XHJcbiAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgIHVpTm9kZS5nZXRDb21wb25lbnQoZW5kbGVzc2NoYWxsZW5nZXMpLmluaXRVaSg0KS8vMjrml6DlsL3mjJHmiJggICAz77yaYm9zc+aMkeaImFxyXG4gICAgICAgICAgICAgICAgfSx9KTtcclxuICAgICAgICAgICAgfSwwLjEpXHJcbiAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgXHJcbiAgICAgICAgLy8gbGV0IGNvbnRlbnQgPSB0aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJzY3JvbGxWaWV3XCIpLmdldENvbXBvbmVudChjYy5TY3JvbGxWaWV3KS5jb250ZW50O1xyXG4gICAgICAgIC8vIGxldCBvdmVyVGltZSA9IG5ldyBEYXRlKG5ldyBEYXRlKCkudG9Mb2NhbGVEYXRlU3RyaW5nKCkpLmdldFRpbWUoKTtcclxuICAgICAgICAvLyBsZXQgdCA9IDI0KjYwKjYwO1xyXG4gICAgICAgIC8vIGNvbnRlbnQuZ2V0Q2hpbGRCeU5hbWUoXCJidG5FbmRsZXNzXCIpLmdldENoaWxkQnlOYW1lKCd1bmxvY2snKS5nZXRDaGlsZEJ5TmFtZShcInRpbWVcIikuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmcgPSBNeVRvb2wuZ2V0VGltZVN0cihNYXRoLmZsb29yKHQtKERhdGUubm93KCkgLSBvdmVyVGltZSkvMTAwMCkpO1xyXG4gICAgICAgIC8vIGNvbnRlbnQuZ2V0Q2hpbGRCeU5hbWUoXCJidG5Cb3NzXCIpLmdldENoaWxkQnlOYW1lKCd1bmxvY2snKS5nZXRDaGlsZEJ5TmFtZShcInRpbWVcIikuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmcgPSBNeVRvb2wuZ2V0VGltZVN0cihNYXRoLmZsb29yKHQtKERhdGUubm93KCkgLSBvdmVyVGltZSkvMTAwMCkpO1xyXG4gICAgICAgIC8vIGNvbnRlbnQuZ2V0Q2hpbGRCeU5hbWUoXCJidG5NYXplXCIpLmdldENoaWxkQnlOYW1lKCd1bmxvY2snKS5nZXRDaGlsZEJ5TmFtZShcInRpbWVcIikuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmcgPSBNeVRvb2wuZ2V0VGltZVN0cihNYXRoLmZsb29yKE1hemVNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0UmVtYWluVGltZSgpKSk7XHJcbiAgICAgICAgLy8gdGhpcy5zY2hlZHVsZSgoKSA9PntcclxuICAgICAgICAvLyAgICAgLy8gY29uc29sZS5sb2coTXlUb29sLmdldFRpbWVTdHIoTWF0aC5mbG9vcihEYXRlLm5vdygpIC0gb3ZlclRpbWUpKSwpO1xyXG4gICAgICAgIC8vICAgICAvLyBjb250ZW50LmdldENoaWxkQnlOYW1lKFwiYnRuRW5kbGVzc1wiKS5nZXRDaGlsZEJ5TmFtZSgndW5sb2NrJykuZ2V0Q2hpbGRCeU5hbWUoXCJ0aW1lXCIpLmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nID0gTXlUb29sLmdldFRpbWVTdHIoTWF0aC5mbG9vcih0LShEYXRlLm5vdygpIC0gb3ZlclRpbWUpLzEwMDApKTtcclxuICAgICAgICAvLyAgICAgLy8gY29udGVudC5nZXRDaGlsZEJ5TmFtZShcImJ0bkJvc3NcIikuZ2V0Q2hpbGRCeU5hbWUoJ3VubG9jaycpLmdldENoaWxkQnlOYW1lKFwidGltZVwiKS5nZXRDb21wb25lbnQoY2MuTGFiZWwpLnN0cmluZyA9IE15VG9vbC5nZXRUaW1lU3RyKE1hdGguZmxvb3IodC0oRGF0ZS5ub3coKSAtIG92ZXJUaW1lKS8xMDAwKSk7XHJcbiAgICAgICAgLy8gICAgIC8vIGNvbnRlbnQuZ2V0Q2hpbGRCeU5hbWUoXCJidG5NYXplXCIpLmdldENoaWxkQnlOYW1lKCd1bmxvY2snKS5nZXRDaGlsZEJ5TmFtZShcInRpbWVcIikuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmcgPSBNeVRvb2wuZ2V0VGltZVN0cihNYXRoLmZsb29yKE1hemVNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0UmVtYWluVGltZSgpKSk7XHJcbiAgICAgICAgLy8gfSwxLGNjLm1hY3JvLlJFUEVBVF9GT1JFVkVSLDApO1xyXG4gICAgfVxyXG5cclxuXHJcbiAgICAvLyBwcm90ZWN0ZWQgb25EaXNhYmxlKCk6IHZvaWQge1xyXG4gICAgLy8gICAgIHRoaXMudW5zY2hlZHVsZUFsbENhbGxiYWNrcygpO1xyXG4gICAgLy8gfVxyXG5cclxuICAgIHByaXZhdGUgYWRhcHRhdGlvbigpXHJcbiAgICB7XHJcbiAgICAgICAgLy/kuIrkuIvmqKHlnZdcclxuICAgICAgICBsZXQgdG9wVWk9Y2MuZmluZCgnQ2FudmFzL1RvcF9VaScpO1xyXG4gICAgICAgIC8vbGV0IGRvd249dG9wVWkuZ2V0Q2hpbGRCeU5hbWUoJ2Rvd24nKTtcclxuICAgICAgICBsZXQgdG9wPXRvcFVpLmdldENoaWxkQnlOYW1lKCd0b3AnKTtcclxuICAgICAgICBsZXQgaGVpZ2h0PSh0b3AueS10b3AuaGVpZ2h0LzIpKjI7XHJcbiAgICAgICAgbGV0IHNjcm9sbFZpZXc9dGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKCdzY3JvbGxWaWV3Jyk7XHJcbiAgICAgICAgc2Nyb2xsVmlldy5oZWlnaHQ9aGVpZ2h0O1xyXG4gICAgICAgIHNjcm9sbFZpZXcuZ2V0Q2hpbGRCeU5hbWUoJ3ZpZXcnKS5oZWlnaHQ9aGVpZ2h0OyAgICAgICAgXHJcbiAgICB9XHJcblxyXG4gICAgLy8gc2V0QWN0aXZpdHkoKXtcclxuICAgIC8vICAgICBsZXQgc2Nyb2xsVmlldz10aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoJ3Njcm9sbFZpZXcnKS5nZXRDb21wb25lbnQoY2MuU2Nyb2xsVmlldyk7XHJcbiAgICAvLyAgICAgbGV0IGNvbnRlbnQ9c2Nyb2xsVmlldy5jb250ZW50O1xyXG4gICAgLy8gICAgIGxldCBhbT1BY3Rpdml0eU1hbmFnZXIuZ2V0SW5zdGFuY2UoKTtcclxuICAgIC8vICAgICBsZXQgbG09TGFuZ3VhZ2VNYW5hZ2VyLmdldEluc3RhbmNlKCk7XHJcbiAgICAvLyAgICAgZm9yKGxldCBpPTA7IGk8PTM7IGkrKyl7XHJcbiAgICAvLyAgICAgICAgIGxldCBidG49Y29udGVudC5jaGlsZHJlbltpXTtcclxuICAgIC8vICAgICAgICAgbGV0IHVubG9jayA9IGJ0bi5nZXRDaGlsZEJ5TmFtZShcInVubG9ja1wiKVxyXG4gICAgLy8gICAgICAgICBsZXQgdHlwZT1pKzE7XHJcbiAgICAvLyAgICAgICAgIC8v5Yik5pat5piv5ZCm6Kej6ZSBXHJcbiAgICAvLyAgICAgICAgIGxldCBpc1VubG9jaz1hbS5nZXRJc1VubG9jayh0eXBlKTtcclxuICAgIC8vICAgICAgICAgLy/pnIDopoHorr7nva7nmoTmjqfku7ZcclxuICAgIC8vICAgICAgICAgbGV0IHVubG9ja1RleHQ9YnRuLmdldENoaWxkQnlOYW1lKFwibG9ja1wiKS5nZXRDaGlsZEJ5TmFtZSgndW5sb2NrVGV4dCcpO1xyXG4gICAgLy8gICAgICAgICBsZXQgbnVtUm9vdD11bmxvY2suZ2V0Q2hpbGRCeU5hbWUoJ251bVJvb3QnKTtcclxuICAgIC8vICAgICAgICAgLy8gbGV0IGJ0blBsYXk9bG9jay5nZXRDaGlsZEJ5TmFtZSgnYnRuUGxheScpO1xyXG4gICAgLy8gICAgICAgICAvLyBsZXQgdHlwZUljb249bG9jay5nZXRDaGlsZEJ5TmFtZSgndHlwZUljb24nKTtcclxuICAgIC8vICAgICAgICAgLy8gbGV0IGt1YW5nPWxvY2suZ2V0Q2hpbGRCeU5hbWUoJ2t1YW5nJyk7XHJcbiAgICAvLyAgICAgICAgIGlmKHR5cGU9PUFjdGl2aXR5VHlwZS5Cb3NzKXtcclxuICAgIC8vICAgICAgICAgICAgIC8vIGxldCBidG5IYXJkPWJ0bi5nZXRDaGlsZEJ5TmFtZSgnYnRuSGFyZCcpO1xyXG4gICAgLy8gICAgICAgICAgICAgY29udGVudC5nZXRDaGlsZEJ5TmFtZShcImJ0bkJvc3NcIikuZ2V0Q2hpbGRCeU5hbWUoJ3VubG9jaycpLmdldENoaWxkQnlOYW1lKFwiUmFpZF9CdG5fMVwiKS5hY3RpdmUgPSBpc1VubG9jaztcclxuICAgIC8vICAgICAgICAgfVxyXG4gICAgICAgICAgICBcclxuICAgIC8vICAgICAgICAgYnRuLmdldENvbXBvbmVudChjYy5CdXR0b24pLmludGVyYWN0YWJsZT1pc1VubG9jaztcclxuICAgIC8vICAgICAgICAgLy8gdW5sb2NrVGV4dC5hY3RpdmU9IWlzVW5sb2NrO1xyXG4gICAgLy8gICAgICAgICBudW1Sb290LmFjdGl2ZT1pc1VubG9jayYmKHR5cGU9PUFjdGl2aXR5VHlwZS5Cb3NzIHx8IHR5cGU9PUFjdGl2aXR5VHlwZS5FbmRsZXNzKTtcclxuICAgIC8vICAgICAgICAgLy8gYnRuUGxheS5hY3RpdmU9aXNVbmxvY2s7XHJcbiAgICAvLyAgICAgICAgIC8vIHR5cGVJY29uLmFjdGl2ZT1pc1VubG9jayYmdHlwZSE9QWN0aXZpdHlUeXBlLlRvd2VyO1xyXG4gICAgLy8gICAgICAgICAvLyBrdWFuZy5hY3RpdmU9aXNVbmxvY2smJnR5cGUhPUFjdGl2aXR5VHlwZS5Ub3dlcjtcclxuXHJcbiAgICAvLyAgICAgICAgIGlmKGlzVW5sb2NrKXtcclxuICAgIC8vICAgICAgICAgICAgIGxldCBudW1UZXh0PW51bVJvb3QuZ2V0Q2hpbGRCeU5hbWUoJ251bScpLmdldENvbXBvbmVudChjYy5MYWJlbCk7XHJcbiAgICAvLyAgICAgICAgICAgICBsZXQgbmVlZFRleHQ9bnVtUm9vdC5nZXRDaGlsZEJ5TmFtZSgnbmVlZCcpLmdldENvbXBvbmVudChjYy5MYWJlbCk7XHJcbiAgICAvLyAgICAgICAgICAgICBsZXQgbnVtPWFtLmdldFRpY2tldCh0eXBlKTtcclxuICAgIC8vICAgICAgICAgICAgIGxldCBuZWVkTnVtPTE7XHJcbiAgICAvLyAgICAgICAgICAgICBudW1UZXh0LnN0cmluZz1cIlwiK251bTtcclxuICAgIC8vICAgICAgICAgICAgIG5lZWRUZXh0LnN0cmluZz1cIi9cIituZWVkTnVtXHJcbiAgICAvLyAgICAgICAgICAgICBudW1UZXh0Lm5vZGUuY29sb3I9bnVtPj1uZWVkTnVtP2NjLkNvbG9yLldISVRFOmNjLkNvbG9yLlJFRDtcclxuICAgIC8vICAgICAgICAgICAgIGJ0bi5nZXRDaGlsZEJ5TmFtZSgnbG9jaycpLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgLy8gICAgICAgICAgICAgYnRuLmdldENoaWxkQnlOYW1lKCd1bmxvY2snKS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgLy8gICAgICAgICB9ZWxzZXtcclxuICAgIC8vICAgICAgICAgICAgIGJ0bi5nZXRDaGlsZEJ5TmFtZSgnbG9jaycpLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAvLyAgICAgICAgICAgICBidG4uZ2V0Q2hpbGRCeU5hbWUoJ3VubG9jaycpLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgLy8gICAgICAgICAgICAgLy/ojrflvpfop6PplIHmnaHku7ZcclxuICAgIC8vICAgICAgICAgICAgIGxldCB1bmxvY2tUeXBlPUZ1bmN0aW9uRGVmaW5pdGlvbk1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRVbmxvY2tDb25kaXRpb25UeXBlKGFtLmdldEZ1bmNUeXBlKHR5cGUpKTtcclxuICAgIC8vICAgICAgICAgICAgIGlmKHVubG9ja1R5cGU9PTEpe1xyXG4gICAgLy8gICAgICAgICAgICAgICAgIHVubG9ja1RleHQuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmc9bG0uZ2V0U3RyaW5nKExhbmd1YWdlSW5kZXguVW5sb2NrQWZ0ZXIpK2xtLmdldFN0cmluZyhMYW5ndWFnZUluZGV4LlBsYXllckx2KStGdW5jdGlvbkRlZmluaXRpb25NYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0VW5sb2NrQ29uZGljdGlvblBhcmFtZXRlcihhbS5nZXRGdW5jVHlwZSh0eXBlKSk7XHJcbiAgICAvLyAgICAgICAgICAgICB9ZWxzZXtcclxuICAgIC8vICAgICAgICAgICAgICAgICB1bmxvY2tUZXh0LmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nPWxtLmdldFN0cmluZyhMYW5ndWFnZUluZGV4LlVubG9ja0FmdGVyKStsbS5nZXRTdHJpbmcoTGFuZ3VhZ2VJbmRleC5MZXZlbCkrTGV2ZWxNYW5hZ2VyLmdldExldmVsTmFtZShGdW5jdGlvbkRlZmluaXRpb25NYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0VW5sb2NrQ29uZGljdGlvblBhcmFtZXRlcihhbS5nZXRGdW5jVHlwZSh0eXBlKSkpO1xyXG4gICAgLy8gICAgICAgICAgICAgfVxyXG4gICAgLy8gICAgICAgICB9ICAgICAgICAgICAgXHJcbiAgICAvLyAgICAgfVxyXG4gICAgLy8gfVxyXG5cclxuICAgIGNsaWNrQnRuQWN0aXZpdHkoYnRuOmNjLkV2ZW50LkV2ZW50VG91Y2gsaW5kZXhTdHI6c3RyaW5nKXtcclxuICAgICAgICAvLyBjb25zb2xlLmxvZyhcIl9fX19fX19fX19fX1/ov5vlia/mnKxcIilcclxuICAgICAgICBHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNvdW5kX21hbmFnZXIucGxheVNvdW5kKFNvdW5kSW5kZXguY2xpY2spO1xyXG4gICAgICAgIGxldCBpbmRleD1wYXJzZUludChpbmRleFN0cik7XHJcbiAgICAgICAgc3dpdGNoKGluZGV4KXtcclxuICAgICAgICAgICAgY2FzZSBBY3Rpdml0eVR5cGUuRW5kbGVzczp7Ly/ml6DlsL3mjJHmiJhcclxuICAgICAgICAgICAgICAgIGxldCBXdUppblRpYW9aaGFuVHlwZT1GdW5jdGlvbkRlZmluaXRpb25NYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0VW5sb2NrQ29uZGl0aW9uVHlwZShGdW5jVHlwZS5XdUppblRpYW9aaGFuKVxyXG4gICAgICAgICAgICAgICAgbGV0IFd1SmluVGlhb1poYW5QYXJhbWV0ZXI9RnVuY3Rpb25EZWZpbml0aW9uTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldFVubG9ja0NvbmRpY3Rpb25QYXJhbWV0ZXIoRnVuY1R5cGUuV3VKaW5UaWFvWmhhbilcclxuICAgICAgICAgICAgICAgIGlmKExldmVsTWFuYWdlci5nZXRJbnN0YW5jZSgpLmZpbmlzaF9sZXZlbDxXdUppblRpYW9aaGFuUGFyYW1ldGVyKXtcclxuICAgICAgICAgICAgICAgICAgICBpZihXdUppblRpYW9aaGFuVHlwZT09MSl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIEdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuc2hvd01lc3NhZ2UoTGFuZ3VhZ2VNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0U3RyQnlUZXh0SWQoMTAwMDUxKStcIjpcIitXdUppblRpYW9aaGFuUGFyYW1ldGVyKTtcclxuICAgICAgICAgICAgICAgICAgICB9ZWxzZSBpZihXdUppblRpYW9aaGFuVHlwZT09Mil7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCB0ZXh0U3RyPUxhbmd1YWdlTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldFN0ckJ5VGV4dElkKDEwMDA1Mik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBudW1zPU1pc3Npb25MZXZlbE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRMZXZlbE5hbWUoKFd1SmluVGlhb1poYW5QYXJhbWV0ZXIpKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgc3RyPXRleHRTdHIucmVwbGFjZSgnficsJycrbnVtcylcclxuICAgICAgICAgICAgICAgICAgICAgICAgR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zaG93TWVzc2FnZShzdHIpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKFwi6L+b5YWl5peg5bC95oyR5oiYXCIpXHJcbiAgICAgICAgICAgICAgICAgICAgVUlNYW5hZ2VyLmdldEluc3RhbmNlKCkuc2hvd1VpRGlhbG9nKFVJUGF0aC5WbmRsZXNzQ2hhbGxlbmdlcyxVSUxheWVyTGV2ZWwuT25lLHtvbkNvbXBsZXRlZDoodWlOb2RlKT0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdWlOb2RlLmdldENvbXBvbmVudChlbmRsZXNzY2hhbGxlbmdlcykuaW5pdCh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbkNsb3NlOigpPT57XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IG51bT1UaGVTdG9yYWdlTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldEludChTdG9yYWdlS2V5LlVubGltaXRlZENoYWxsZW5nZVRpbWVzLDApO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuYnRuRW5kbGVzcy5nZXRDaGlsZEJ5TmFtZShcImJ0blBsYXlcIikuZ2V0Q2hpbGRCeU5hbWUoXCJyZWRcIikuYWN0aXZlPW51bT4wO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB1aU5vZGUuZ2V0Q29tcG9uZW50KGVuZGxlc3NjaGFsbGVuZ2VzKS5pbml0VWkoMikvLzI65peg5bC95oyR5oiYICAgM++8mmJvc3PmjJHmiJhcclxuICAgICAgICAgICAgICAgICAgICB9LH0pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgLy8gaWYoUHJvcE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRQcm9wTnVtKFByb3BJZC5FbmRsZXNzQ2hhbGxlbmdlKSA+IDApe1xyXG4gICAgICAgICAgICAgICAgLy8gICAgIEdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuY3VyX2dhbWVfbW9kZT1HYW1lTW9kZS5FbmRsZXNzOyAgICAgICBcclxuICAgICAgICAgICAgICAgIC8vICAgICAvLyBVSU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zaG93TWFwVWkoe29uQ2xvc2U6KCk9PntcclxuICAgICAgICAgICAgICAgIC8vICAgICAvLyAgICAgdGhpcy5zZXRBY3Rpdml0eSgpO1xyXG4gICAgICAgICAgICAgICAgLy8gICAgIC8vIH19KTsgIFxyXG4gICAgICAgICAgICAgICAgLy8gICAgIFVJTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNob3dVaURpYWxvZyhVSVBhdGguVG9QbGF5LFVJTGF5ZXJMZXZlbC5PbmUse29uQ29tcGxldGVkOih1aU5vZGUpPT4ge1xyXG4gICAgICAgICAgICAgICAgLy8gICAgICAgICB1aU5vZGUuZ2V0Q29tcG9uZW50KFRvUGxheU1haW5VaSkuaW5pdCh7b25DbG9zZTooKT0+e1xyXG4gICAgICAgICAgICAgICAgLy8gICAgICAgICAgICAgdGhpcy5zZXRBY3Rpdml0eSgpO1xyXG4gICAgICAgICAgICAgICAgLy8gICAgICAgICB9fSk7XHJcbiAgICAgICAgICAgICAgICAvLyAgICAgfSx9KVxyXG4gICAgICAgICAgICAgICAgLy8gfWVsc2V7XHJcbiAgICAgICAgICAgICAgICAvLyAgICAgR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zaG93TWVzc2FnZShMYW5ndWFnZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRTdHJCeVRleHRJZCg4MDAwMDIpKTtcclxuICAgICAgICAgICAgICAgIC8vIH1cclxuICAgICAgICAgICAgfSBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBBY3Rpdml0eVR5cGUuQm9zczp7Ly9Cb3Nz5oyR5oiYXHJcbiAgICAgICAgICAgICAgICAvLyByZXR1cm5cclxuICAgICAgICAgICAgICAgIGxldCBHZVJlbkJvc3NUeXBlPUZ1bmN0aW9uRGVmaW5pdGlvbk1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRVbmxvY2tDb25kaXRpb25UeXBlKEZ1bmNUeXBlLkdlUmVuQm9zcylcclxuICAgICAgICAgICAgICAgIGxldCBHZVJlbkJvc3NQYXJhbWV0ZXI9RnVuY3Rpb25EZWZpbml0aW9uTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldFVubG9ja0NvbmRpY3Rpb25QYXJhbWV0ZXIoRnVuY1R5cGUuR2VSZW5Cb3NzKVxyXG4gICAgICAgICAgICAgICAgaWYoTGV2ZWxNYW5hZ2VyLmdldEluc3RhbmNlKCkuZmluaXNoX2xldmVsPEdlUmVuQm9zc1BhcmFtZXRlcil7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYoR2VSZW5Cb3NzVHlwZT09MSl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIEdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuc2hvd01lc3NhZ2UoTGFuZ3VhZ2VNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0U3RyQnlUZXh0SWQoMTAwMDUxKStcIjpcIitHZVJlbkJvc3NQYXJhbWV0ZXIpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1lbHNlIGlmKEdlUmVuQm9zc1R5cGU9PTIpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgdGV4dFN0cj1MYW5ndWFnZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRTdHJCeVRleHRJZCgxMDAwNTIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgbnVtcz1NaXNzaW9uTGV2ZWxNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0TGV2ZWxOYW1lKChHZVJlbkJvc3NQYXJhbWV0ZXIpKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgc3RyPXRleHRTdHIucmVwbGFjZSgnficsJycrbnVtcylcclxuICAgICAgICAgICAgICAgICAgICAgICAgR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zaG93TWVzc2FnZShzdHIpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKFwi6L+b5YWlYm9zc+aMkeaImFwiKVxyXG4gICAgICAgICAgICAgICAgICAgIFVJTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNob3dVaURpYWxvZyhVSVBhdGguVm5kbGVzc0NoYWxsZW5nZXMsVUlMYXllckxldmVsLk9uZSx7b25Db21wbGV0ZWQ6KHVpTm9kZSk9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHVpTm9kZS5nZXRDb21wb25lbnQoZW5kbGVzc2NoYWxsZW5nZXMpLmluaXQoe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb25DbG9zZTooKT0+e1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuYnRuQm9zcy5nZXRDaGlsZEJ5TmFtZShcImJ0blBsYXlcIikuZ2V0Q2hpbGRCeU5hbWUoXCJyZWRcIikuYWN0aXZlPVRoZVN0b3JhZ2VNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0SW50KFN0b3JhZ2VLZXkuQm9zc0NoYWxsZW5nZVRpbWVzLDApPjA7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHVpTm9kZS5nZXRDb21wb25lbnQoZW5kbGVzc2NoYWxsZW5nZXMpLmluaXRVaSgzKS8vMjrml6DlsL3mjJHmiJggICAz77yaYm9zc+aMkeaImFxyXG4gICAgICAgICAgICAgICAgICAgIH0sfSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAvLyBpZihQcm9wTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldFByb3BOdW0oUHJvcElkLkJvc3NUaWNrZXQpID4gMCl7XHJcbiAgICAgICAgICAgICAgICAvLyAgICAgR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5jdXJfZ2FtZV9tb2RlPUdhbWVNb2RlLkJvc3NfQ2hhbGxlbmdlO1xyXG4gICAgICAgICAgICAgICAgLy8gICAgIC8vIFVJTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNob3dNYXBVaSh7b25DbG9zZTooKT0+e1xyXG4gICAgICAgICAgICAgICAgLy8gICAgIC8vICAgICB0aGlzLnNldEFjdGl2aXR5KCk7XHJcbiAgICAgICAgICAgICAgICAvLyAgICAgLy8gfX0pO1xyXG4gICAgICAgICAgICAgICAgLy8gICAgIFVJTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNob3dVaURpYWxvZyhVSVBhdGguVG9QbGF5LFVJTGF5ZXJMZXZlbC5PbmUse29uQ29tcGxldGVkOih1aU5vZGUpPT4ge1xyXG4gICAgICAgICAgICAgICAgLy8gICAgICAgICB1aU5vZGUuZ2V0Q29tcG9uZW50KFRvUGxheU1haW5VaSkuaW5pdCh7b25DbG9zZTooKT0+e1xyXG4gICAgICAgICAgICAgICAgLy8gICAgICAgICAgICAgdGhpcy5zZXRBY3Rpdml0eSgpO1xyXG4gICAgICAgICAgICAgICAgLy8gICAgICAgICB9fSk7XHJcbiAgICAgICAgICAgICAgICAvLyAgICAgfSx9KVxyXG4gICAgICAgICAgICAgICAgLy8gfWVsc2V7XHJcbiAgICAgICAgICAgICAgICAvLyAgICAgR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zaG93TWVzc2FnZShMYW5ndWFnZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRTdHJCeVRleHRJZCg4MDAwMDIpKTtcclxuICAgICAgICAgICAgICAgIC8vIH1cclxuICAgICAgICAgICAgfSBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBBY3Rpdml0eVR5cGUuVG93ZXI6ey8v54is5aGULy/mmoLmnKrlvIDmlL5cclxuICAgICAgICAgICAgICAgIEdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuc2hvd01lc3NhZ2UoTGFuZ3VhZ2VNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0U3RyQnlUZXh0SWQoMTAwMTEzKSwzKTsvL+aaguacquW8gOaUvlxyXG4gICAgICAgICAgICAgICAgcmV0dXJuXHJcbiAgICAgICAgICAgICAgICAvLyBHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLmN1cl9nYW1lX21vZGU9R2FtZU1vZGUuVG93ZXI7XHJcbiAgICAgICAgICAgICAgICAvLyAvLyBVSU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zaG93VG93ZXJVaSgpO1xyXG4gICAgICAgICAgICAgICAgLy8gVUlNYW5hZ2VyLmdldEluc3RhbmNlKCkuc2hvd1VpRGlhbG9nKFVJUGF0aC5Ub3dlcixVSUxheWVyTGV2ZWwuT25lLHtvbkNvbXBsZXRlZDoodWlOb2RlKT0+IHt9LH0pO1xyXG4gICAgICAgICAgICB9IGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIEFjdGl2aXR5VHlwZS5NYXplOnsvL+iZmuepuuijgue8nVxyXG4gICAgICAgICAgICAgICAgbGV0IE1pR29uZ1poYW5UeXBlPUZ1bmN0aW9uRGVmaW5pdGlvbk1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRVbmxvY2tDb25kaXRpb25UeXBlKEZ1bmNUeXBlLk1pR29uZylcclxuICAgICAgICAgICAgICAgIGxldCBNaUdvbmdaaGFuUGFyYW1ldGVyPUZ1bmN0aW9uRGVmaW5pdGlvbk1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRVbmxvY2tDb25kaWN0aW9uUGFyYW1ldGVyKEZ1bmNUeXBlLk1pR29uZylcclxuICAgICAgICAgICAgICAgIGlmKExldmVsTWFuYWdlci5nZXRJbnN0YW5jZSgpLmZpbmlzaF9sZXZlbDxNaUdvbmdaaGFuUGFyYW1ldGVyKXtcclxuICAgICAgICAgICAgICAgICAgICBpZihNaUdvbmdaaGFuVHlwZT09MSl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIEdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuc2hvd01lc3NhZ2UoTGFuZ3VhZ2VNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0U3RyQnlUZXh0SWQoMTAwMDUxKStcIjpcIitNaUdvbmdaaGFuUGFyYW1ldGVyKTtcclxuICAgICAgICAgICAgICAgICAgICB9ZWxzZSBpZihNaUdvbmdaaGFuVHlwZT09Mil7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCB0ZXh0U3RyPUxhbmd1YWdlTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldFN0ckJ5VGV4dElkKDEwMDA1Mik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBudW1zPU1pc3Npb25MZXZlbE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRMZXZlbE5hbWUoKE1pR29uZ1poYW5QYXJhbWV0ZXIpKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgc3RyPXRleHRTdHIucmVwbGFjZSgnficsJycrbnVtcylcclxuICAgICAgICAgICAgICAgICAgICAgICAgR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zaG93TWVzc2FnZShzdHIpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKFwi6L+b5YWl6Jma56m66KOC57ydXCIpXHJcbiAgICAgICAgICAgICAgICAgICAgVUlNYW5hZ2VyLmdldEluc3RhbmNlKCkuc2hvd1VpRGlhbG9nKFVJUGF0aC5WbmRsZXNzQ2hhbGxlbmdlcyxVSUxheWVyTGV2ZWwuT25lLHtvbkNvbXBsZXRlZDoodWlOb2RlKT0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdWlOb2RlLmdldENvbXBvbmVudChlbmRsZXNzY2hhbGxlbmdlcykuaW5pdCh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbkNsb3NlOigpPT57XHJcbiAgICBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgdWlOb2RlLmdldENvbXBvbmVudChlbmRsZXNzY2hhbGxlbmdlcykuaW5pdFVpKDQpLy8yOuaXoOWwveaMkeaImCAgIDPvvJpib3Nz5oyR5oiYICA077ya6Jma56m66KOC57ydXHJcbiAgICAgICAgICAgICAgICAgICAgfSx9KTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIC8vIEdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuY3VyX2dhbWVfbW9kZT1HYW1lTW9kZS5NYXplO1xyXG4gICAgICAgICAgICAgICAgLy8gVUlNYW5hZ2VyLmdldEluc3RhbmNlKCkuc2hvd01hemVVaSgpO1xyXG4gICAgICAgICAgICB9IGJyZWFrO1xyXG4gICAgICAgIH1cclxuICAgICAgICAgICAgICAgICBcclxuICAgIH1cclxuXHJcbiAgICAvLyBvbkNsaWNrTW9kZUNob29zZShlLG51bTpudW1iZXIpe1xyXG4gICAgLy8gICAgIG51bSA9IE51bWJlcihudW0pO1xyXG4gICAgLy8gICAgIGxldCBjb250ZW50ID0gdGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKFwic2Nyb2xsVmlld1wiKS5nZXRDb21wb25lbnQoY2MuU2Nyb2xsVmlldykuY29udGVudDtcclxuICAgIC8vICAgICBpZihudW0gPT0gMSl7XHJcbiAgICAvLyAgICAgICAgIEJvc3NDaGFsbGVuZ2VNYW5hZ2VyLmdldEluc3RhbmNlKCkuY3VyX2NoYWxsZW5nZV9tb2RlPUNoYWxsZW5nZU1vZGUuTm9hbWFsO1xyXG4gICAgLy8gICAgICAgICBjb250ZW50LmdldENoaWxkQnlOYW1lKFwiYnRuQm9zc1wiKS5nZXRDaGlsZEJ5TmFtZSgndW5sb2NrJykuZ2V0Q2hpbGRCeU5hbWUoXCJSYWlkX0J0bl8wXCIpLmdldENvbXBvbmVudChjYy5TcHJpdGUpLnNwcml0ZUZyYW1lID0gdGhpcy5hY3Rpdml0eV91aS5nZXRTcHJpdGVGcmFtZShcIlJhaWRfQnRuXzBfMVwiKTtcclxuICAgIC8vICAgICAgICAgY29udGVudC5nZXRDaGlsZEJ5TmFtZShcImJ0bkJvc3NcIikuZ2V0Q2hpbGRCeU5hbWUoJ3VubG9jaycpLmdldENoaWxkQnlOYW1lKFwiUmFpZF9CdG5fMFwiKS5jaGlsZHJlblswXS55ID0gLTI1O1xyXG4gICAgLy8gICAgICAgICBjb250ZW50LmdldENoaWxkQnlOYW1lKFwiYnRuQm9zc1wiKS5nZXRDaGlsZEJ5TmFtZSgndW5sb2NrJykuZ2V0Q2hpbGRCeU5hbWUoXCJSYWlkX0J0bl8xXCIpLmdldENvbXBvbmVudChjYy5TcHJpdGUpLnNwcml0ZUZyYW1lID0gdGhpcy5hY3Rpdml0eV91aS5nZXRTcHJpdGVGcmFtZShcIlJhaWRfQnRuXzFcIik7XHJcbiAgICAvLyAgICAgICAgIGNvbnRlbnQuZ2V0Q2hpbGRCeU5hbWUoXCJidG5Cb3NzXCIpLmdldENoaWxkQnlOYW1lKCd1bmxvY2snKS5nZXRDaGlsZEJ5TmFtZShcIlJhaWRfQnRuXzFcIikuY2hpbGRyZW5bMF0ueSA9IC0xNTtcclxuICAgIC8vICAgICAgICAgY29udGVudC5nZXRDaGlsZEJ5TmFtZShcImJ0bkJvc3NcIikuZ2V0Q2hpbGRCeU5hbWUoXCJpY29uXCIpLmdldENvbXBvbmVudChjYy5TcHJpdGUpLnNwcml0ZUZyYW1lID0gdGhpcy5hY3Rpdml0eV91aS5nZXRTcHJpdGVGcmFtZShcIlJhaWRfQmFubmVyXzJcIik7XHJcbiAgICAvLyAgICAgfWVsc2V7XHJcbiAgICAvLyAgICAgICAgIEJvc3NDaGFsbGVuZ2VNYW5hZ2VyLmdldEluc3RhbmNlKCkuY3VyX2NoYWxsZW5nZV9tb2RlPUNoYWxsZW5nZU1vZGUuSGFyZDtcclxuICAgIC8vICAgICAgICAgY29udGVudC5nZXRDaGlsZEJ5TmFtZShcImJ0bkJvc3NcIikuZ2V0Q2hpbGRCeU5hbWUoJ3VubG9jaycpLmdldENoaWxkQnlOYW1lKFwiUmFpZF9CdG5fMFwiKS5nZXRDb21wb25lbnQoY2MuU3ByaXRlKS5zcHJpdGVGcmFtZSA9IHRoaXMuYWN0aXZpdHlfdWkuZ2V0U3ByaXRlRnJhbWUoXCJSYWlkX0J0bl8wXCIpO1xyXG4gICAgLy8gICAgICAgICBjb250ZW50LmdldENoaWxkQnlOYW1lKFwiYnRuQm9zc1wiKS5nZXRDaGlsZEJ5TmFtZSgndW5sb2NrJykuZ2V0Q2hpbGRCeU5hbWUoXCJSYWlkX0J0bl8wXCIpLmNoaWxkcmVuWzBdLnkgPSAtMTU7XHJcbiAgICAvLyAgICAgICAgIGNvbnRlbnQuZ2V0Q2hpbGRCeU5hbWUoXCJidG5Cb3NzXCIpLmdldENoaWxkQnlOYW1lKCd1bmxvY2snKS5nZXRDaGlsZEJ5TmFtZShcIlJhaWRfQnRuXzFcIikuZ2V0Q29tcG9uZW50KGNjLlNwcml0ZSkuc3ByaXRlRnJhbWUgPSB0aGlzLmFjdGl2aXR5X3VpLmdldFNwcml0ZUZyYW1lKFwiUmFpZF9CdG5fMV8xXCIpO1xyXG4gICAgLy8gICAgICAgICBjb250ZW50LmdldENoaWxkQnlOYW1lKFwiYnRuQm9zc1wiKS5nZXRDaGlsZEJ5TmFtZSgndW5sb2NrJykuZ2V0Q2hpbGRCeU5hbWUoXCJSYWlkX0J0bl8xXCIpLmNoaWxkcmVuWzBdLnkgPSAtMjU7XHJcbiAgICAvLyAgICAgICAgIGNvbnRlbnQuZ2V0Q2hpbGRCeU5hbWUoXCJidG5Cb3NzXCIpLmdldENoaWxkQnlOYW1lKFwiaWNvblwiKS5nZXRDb21wb25lbnQoY2MuU3ByaXRlKS5zcHJpdGVGcmFtZSA9IHRoaXMuYWN0aXZpdHlfdWkuZ2V0U3ByaXRlRnJhbWUoXCJSYWlkX0Jhbm5lcl8yXzFcIik7XHJcbiAgICAvLyAgICAgfVxyXG4gICAgLy8gfVxyXG5cclxuICAgIC8vIGNsaWNrQnRuSGFyZCgpe1xyXG4gICAgLy8gICAgIEdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuc291bmRfbWFuYWdlci5wbGF5U291bmQoU291bmRJbmRleC5jbGljayk7XHJcbiAgICAvLyAgICAgR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5jdXJfZ2FtZV9tb2RlPUdhbWVNb2RlLkJvc3NfQ2hhbGxlbmdlO1xyXG4gICAgLy8gICAgIEJvc3NDaGFsbGVuZ2VNYW5hZ2VyLmdldEluc3RhbmNlKCkuY3VyX2NoYWxsZW5nZV9tb2RlPUNoYWxsZW5nZU1vZGUuSGFyZDtcclxuXHJcbiAgICAvLyB9XHJcbn1cclxuIl19