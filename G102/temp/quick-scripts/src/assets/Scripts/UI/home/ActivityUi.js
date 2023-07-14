"use strict";
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