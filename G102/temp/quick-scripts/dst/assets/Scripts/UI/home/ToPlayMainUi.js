
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Scripts/UI/home/ToPlayMainUi.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'fca21hI+2REmJyugmQolB/4', 'ToPlayMainUi');
// Scripts/UI/home/ToPlayMainUi.ts

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
var WXManagerEX_1 = require("../../../startscene/WXManagerEX");
var BossChallenge_1 = require("../../Activity/BossChallenge");
var EndlessLevels_1 = require("../../Activity/EndlessLevels");
var ApkManager_1 = require("../../Ads/ApkManager");
var Constants_1 = require("../../Constants");
var endlesschallenges_1 = require("../../copy/endlesschallenges/endlesschallenges");
var GameManager_1 = require("../../GameManager");
var MapManager_1 = require("../../GuaJi/MapManager");
var HeroManager_1 = require("../../Hero/Data/HeroManager");
var HeroConfig_1 = require("../../Hero/Game/HeroConfig");
var HeroItem_1 = require("../../Hero/Ui/HeroItem");
var LevelManager_1 = require("../../Level/LevelManager");
var MissionLevel_1 = require("../../Level/MissionLevel");
var TutorialLevel_1 = require("../../Level/TutorialLevel");
var MazeManager_1 = require("../../Maze/MazeManager");
var MonsterConfigure_1 = require("../../Monster/Data/MonsterConfigure");
var MonsterData_1 = require("../../Monster/MonsterData");
var FollowConstants_1 = require("../../multiLanguage/FollowConstants");
var FollowManager_1 = require("../../multiLanguage/FollowManager");
var LanguageManager_1 = require("../../multiLanguage/LanguageManager");
var TextLanguage_1 = require("../../multiLanguage/TextLanguage");
var PropConfig_1 = require("../../Prop/PropConfig");
var PropManager_1 = require("../../Prop/PropManager");
var AudioConstants_1 = require("../../Sound/AudioConstants");
var StorageConfig_1 = require("../../Storage/StorageConfig");
var StorageManager_1 = require("../../Storage/StorageManager");
var TaskEnum_1 = require("../../Task/TaskEnum");
var TaskManager_1 = require("../../Task/TaskManager");
var TowerLevel_1 = require("../../Tower/TowerLevel");
var TowerManager_1 = require("../../Tower/TowerManager");
var Times_1 = require("../../Turntable/Times");
var TutorailsManager_1 = require("../../Tutorials/TutorailsManager");
var UserInfo_1 = require("../../UserInfo/UserInfo");
var UIComponent_1 = require("../UIComponent");
var UIConfig_1 = require("../UIConfig");
var UIManager_1 = require("../UIManager");
var MainUi_1 = require("./MainUi");
var MonsterDetails_1 = require("./MonsterDetails");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var ToPlayMainUi = /** @class */ (function (_super) {
    __extends(ToPlayMainUi, _super);
    function ToPlayMainUi() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.hero_item = null; //英雄头像的预制体
        _this.Monster = null; //怪物详情
        _this.Chariot = null; //战车详情
        _this.pos = null; //怪物的位置
        _this.heroShadow = null; //怪物阴影的位置
        _this.leveltxt = null;
        _this.guaiwuarr = []; //怪物的数组
        _this.MonsterDetailsarr = []; //怪物详情列表   按boss   精英   普通 排序
        _this.komwei = null; //空位   英雄上阵的位置是否能解锁
        _this.content = null; //父节点
        _this.sp = []; //空位   英雄上阵的位置是否能解锁
        _this.hero_team_rect = [];
        _this.ScrollViewrect = null;
        _this.ScrollVie = null; //英雄滑动块
        _this.ScrollViews = null; //英雄滑动块
        _this.hero_team_pos = [];
        _this.Mouse = null; //鼠标上的英雄
        _this.Mouseitem = null; //鼠标上的英雄item
        _this.clickheroposition = -1; //点击的位置是第几个    默认没有被点击到的位置
        _this.putdownheroposition = -1; //放下的位置是第几个
        _this.Common_Btn_0 = null; //开始按钮
        _this.jdt = null; //战车血量进度条
        _this.greybuttonjudgment = 0;
        _this.bj = []; //背景
        _this.wall = []; //战车
        _this.mybj = null; //背景
        _this.mywall = null; //战车
        _this.bg_Endless = null; //无尽挑战背景
        _this.Prepare_Btn_Monster = null; //怪物详情按钮
        _this.Common_Btn_Back = null; //返回按钮
        _this.Mazeid = 0; //冰河关卡id
        _this.bg_Maze = null; //冰河背景
        _this.bg_wall = null; //冰河战车
        return _this;
    }
    ToPlayMainUi.prototype.start = function () {
        for (var index = 0; index < this.komwei.children.length; index++) {
            this.komwei.children[index].on(cc.Node.EventType.TOUCH_START, this.onHeroTouchStart, this);
            this.komwei.children[index].on(cc.Node.EventType.TOUCH_MOVE, this.onHeroTouchMove, this);
            this.komwei.children[index].on(cc.Node.EventType.TOUCH_END, this.onHeroTouchEnd, this);
            this.komwei.children[index].on(cc.Node.EventType.TOUCH_CANCEL, this.onHeroTouchCancel, this);
            var size = this.komwei.children[index].getContentSize();
            var pos = this.komwei.children[index].getPosition();
            this.hero_team_rect.push(cc.rect(pos.x - size.width / 2, pos.y - size.height / 2, size.width, size.height));
            this.hero_team_pos.push(pos);
        }
        var poss = this.ScrollVie.getPosition();
        var sizes = this.ScrollVie.getContentSize();
        this.ScrollViewrect = cc.rect(poss.x - sizes.width / 2, poss.y - sizes.height / 2, sizes.width, sizes.height);
        // HeroManager.getInstance().addHero(3)
    };
    ToPlayMainUi.prototype.onHeroTouchStart = function (e) {
        var touchTeam = e.getCurrentTarget();
        var pos = this.komwei.convertToNodeSpaceAR(e.getLocation());
        var weizhi = Number(touchTeam.name); //点到第几个位置
        this.clickheroposition = weizhi;
        var teamList = HeroManager_1.HeroManager.getInstance().getTeamList(GameManager_1.default.getInstance().cur_game_mode);
        //如果这个位置有英雄，就将这个位置的英雄隐藏   开启鼠标的英雄  将鼠标的英雄皮肤换成这个位置的英雄
        // @ts-ignore
        if (teamList[weizhi] != HeroConfig_1.Hero_Type.NULL && teamList[weizhi] != -1) {
            this.komwei.children[this.clickheroposition].getChildByName("hero").active = false; //英雄隐藏
            this.komwei.children[this.clickheroposition].getChildByName("Prepare_Void").active = true; //黑影开启
            this.komwei.children[this.clickheroposition].getChildByName("winText").active = true; //文字开启
            this.komwei.children[this.clickheroposition].getChildByName("heroShadow").active = false; //阴影
            this.Mouse.setPosition(pos);
            this.Mouse.getChildByName("hero").getComponent(sp.Skeleton).skeletonData = this.sp[teamList[weizhi] - 1];
            this.Mouse.getChildByName("hero").getComponent(sp.Skeleton).animation = "Idle";
            this.Mouse.active = true;
        }
    };
    ToPlayMainUi.prototype.onHeroTouchMove = function (e) {
        if (this.clickheroposition != -1) {
            var touchTeam = e.getCurrentTarget();
            var pos = this.komwei.convertToNodeSpaceAR(e.getLocation());
            this.Mouse.setPosition(pos);
        }
    };
    ToPlayMainUi.prototype.Selfposition = function (number) {
        var teamList = HeroManager_1.HeroManager.getInstance().getTeamList(GameManager_1.default.getInstance().cur_game_mode);
        if (this.Mouse.active == true) {
            this.Mouse.active = false;
        }
        if (this.Mouseitem.active == true) {
            this.Mouseitem.active = false;
        }
        // @ts-ignore
        if (teamList[number] != HeroConfig_1.Hero_Type.NULL && teamList[number] != -1) {
            this.komwei.children[number].getChildByName("hero").active = true; //英雄开启
            this.komwei.children[number].getChildByName("Prepare_Void").active = false; //黑影隐藏
            this.komwei.children[number].getChildByName("winText").active = false; //文字隐藏
            this.komwei.children[number].getChildByName("heroShadow").active = true; //阴影
            this.komwei.children[number].getChildByName("hero").getComponent(sp.Skeleton).skeletonData = this.sp[teamList[number] - 1];
            this.komwei.children[number].getChildByName("hero").getComponent(sp.Skeleton).animation = "Idle";
        }
        else {
            this.komwei.children[number].getChildByName("hero").active = false; //英雄隐藏
            this.komwei.children[number].getChildByName("Prepare_Void").active = true; //黑影开启
            this.komwei.children[number].getChildByName("winText").active = true; //文字开启
            this.komwei.children[number].getChildByName("heroShadow").active = false; //阴影
        }
    };
    ToPlayMainUi.prototype.onHeroTouchEnd = function (e) {
        if (this.clickheroposition != -1) {
            this.Selfposition(this.clickheroposition);
        }
    };
    ToPlayMainUi.prototype.onHeroTouchCancel = function (e) {
        var touchTeam = e.getCurrentTarget();
        var ScrollViewpos = this.ScrollVie.parent.convertToNodeSpaceAR(e.getLocation());
        var pos = this.komwei.convertToNodeSpaceAR(e.getLocation());
        var teamList = HeroManager_1.HeroManager.getInstance().getTeamList(GameManager_1.default.getInstance().cur_game_mode);
        for (var i = 0; i < this.hero_team_rect.length; i++) {
            if (this.hero_team_rect[i].contains(pos) == true) {
                this.putdownheroposition = i;
                this.Mouse.active = false;
                var teamListputdown = teamList[this.putdownheroposition];
                var teamListclickhero = teamList[this.clickheroposition];
                teamList[this.putdownheroposition] = teamListclickhero;
                teamList[this.clickheroposition] = teamListputdown;
                HeroManager_1.HeroManager.getInstance().saveTeamList(GameManager_1.default.getInstance().cur_game_mode, teamList);
                this.Selfposition(this.putdownheroposition);
                this.Selfposition(this.clickheroposition);
                return;
            }
        }
        if (this.ScrollViewrect.contains(ScrollViewpos) == true) {
            this.Mouse.active = false;
            teamList[this.clickheroposition] = -1;
            HeroManager_1.HeroManager.getInstance().saveTeamList(GameManager_1.default.getInstance().cur_game_mode, teamList);
            //刷新英雄itme状态
            this.Refreshheroitmestatus();
        }
        else {
            this.Selfposition(this.clickheroposition);
        }
    };
    ToPlayMainUi.prototype.init = function (uiAc) {
        var _this = this;
        _super.prototype.init.call(this, uiAc);
        //取本模式  本关卡  的怪物数量与类型   boss   精英   普通
        for (var index = 0; index < this.komwei.children.length; index++) {
            if (GameManager_1.default.getInstance().cur_game_mode != Constants_1.GameMode.Boss_Challenge && (index == 0 || index == 1 || index == 3 || index == 4)) {
                this.komwei.children[index].active = false;
            }
            else {
                this.komwei.children[index].active = true;
            }
        }
        var level = MapManager_1.default.Currentlevel; //LevelManager.getInstance().start_level;
        var fightingInfo = null;
        this.Common_Btn_Back.active = true;
        switch (GameManager_1.default.getInstance().cur_game_mode) {
            case Constants_1.GameMode.Main:
                {
                    fightingInfo = MissionLevel_1.MissionLevelManager.getInstance().getFightingInfo(level);
                }
                break;
            case Constants_1.GameMode.Endless:
                {
                    var wavenumber = StorageManager_1.TheStorageManager.getInstance().getNumber(StorageConfig_1.StorageKey.UnlimitedChallengeDamage, 0); //波数
                    var Round = EndlessLevels_1.EndlessLevelsManager.getInstance().getRound(wavenumber); //回合数
                    fightingInfo = EndlessLevels_1.EndlessLevelsManager.getInstance().getFightingInfo(Round);
                }
                break;
            case Constants_1.GameMode.Boss_Challenge:
                {
                    fightingInfo = BossChallenge_1.BossChallengeManager.getInstance().getFightingInfo(BossChallenge_1.BossChallengeManager.getInstance().cur_challenge_mode);
                }
                break;
            case Constants_1.GameMode.Maze:
                {
                    fightingInfo = MazeManager_1.MazeManager.getInstance().getFightingInfo(this.Mazeid);
                }
                break;
            case Constants_1.GameMode.Tower:
                {
                    fightingInfo = TowerLevel_1.TowerLevelManager.getInstance().getFightingInfo(TowerManager_1.default.getTowerLevel());
                }
                break;
        }
        this.Prepare_Btn_Monster.active = true;
        var list = fightingInfo.getOnlyMonsterDataList();
        this.leveltxt.getComponent(cc.Label).string = "" + fightingInfo.title_name;
        if (GameManager_1.default.getInstance().cur_game_mode == Constants_1.GameMode.Main) {
            var chapter = (MissionLevel_1.MissionLevelManager.getInstance().getChapter(level)) - 1;
            this.mybj.getComponent(cc.Sprite).spriteFrame = this.bj[chapter];
            this.mywall.getComponent(cc.Sprite).spriteFrame = this.wall[chapter];
        }
        if (GameManager_1.default.getInstance().cur_game_mode == Constants_1.GameMode.Endless) {
            this.mybj.getComponent(cc.Sprite).spriteFrame = this.bg_Endless;
            this.mywall.getComponent(cc.Sprite).spriteFrame = this.wall[4];
            this.Prepare_Btn_Monster.active = false;
            list = [];
        }
        if (GameManager_1.default.getInstance().cur_game_mode == Constants_1.GameMode.Boss_Challenge) {
            var RotationOrders = UserInfo_1.UserInfo.getInstance().RotationOrder; //轮换顺序
            var Stage = 1; //阶段
            var ChallengeID = RotationOrders * 1000 + Stage; //挑战ID
            var RotationOrder = BossChallenge_1.BossChallengeManager.getInstance().getChapterScene(ChallengeID); //(UserInfo.getInstance().RotationOrder)-1//轮换顺序
            this.mybj.getComponent(cc.Sprite).spriteFrame = this.bj[RotationOrder];
            this.mywall.getComponent(cc.Sprite).spriteFrame = this.wall[RotationOrder];
        }
        if (GameManager_1.default.getInstance().cur_game_mode == Constants_1.GameMode.Maze) {
            this.mybj.getComponent(cc.Sprite).spriteFrame = this.bg_Maze;
            this.mywall.getComponent(cc.Sprite).spriteFrame = this.bg_wall;
            this.Common_Btn_Back.active = false;
        }
        //取出boss
        var bossarr = [];
        var jyarr = [];
        var put = [];
        for (var bossindex = 0; bossindex < list.length; bossindex++) {
            if (MonsterConfigure_1.MonsterConfigureManager.getInstance().getStrengthType(list[bossindex].id) == 3) {
                bossarr.push(list[bossindex]);
            }
            if (MonsterConfigure_1.MonsterConfigureManager.getInstance().getStrengthType(list[bossindex].id) == 2) {
                jyarr.push(list[bossindex]);
            }
            if (MonsterConfigure_1.MonsterConfigureManager.getInstance().getStrengthType(list[bossindex].id) == 1) {
                put.push(list[bossindex]);
            }
        }
        //插入
        this.MonsterDetailsarr.length = 0;
        this.MonsterDetailsarr.splice.apply(this.MonsterDetailsarr, [this.MonsterDetailsarr.length, 0].concat(bossarr));
        this.MonsterDetailsarr.splice.apply(this.MonsterDetailsarr, [this.MonsterDetailsarr.length, 0].concat(jyarr));
        this.MonsterDetailsarr.splice.apply(this.MonsterDetailsarr, [this.MonsterDetailsarr.length, 0].concat(put));
        var _loop_1 = function (index) {
            var type = 0;
            var id = 0;
            // console.log("*****",bossarr.length,jyarr.length,put.length)
            if (index < bossarr.length) {
                id = bossarr[index].id;
                type = MonsterConfigure_1.MonsterConfigureManager.getInstance().getMonsterClass(id);
            }
            else if (index < (bossarr.length + jyarr.length)) {
                id = jyarr[(index - (bossarr.length))].id;
                type = MonsterConfigure_1.MonsterConfigureManager.getInstance().getMonsterClass(id);
            }
            else if (index < (bossarr.length + jyarr.length + put.length)) {
                id = put[(index - bossarr.length - jyarr.length)].id;
                type = MonsterConfigure_1.MonsterConfigureManager.getInstance().getMonsterClass(id);
            }
            this_1.heroShadow.children[index].active = false;
            if (type > 0) {
                var path = "monster/ui/Monster_" + type;
                var node_1 = null;
                WXManagerEX_1.default.getInstance().resourcesBundle.load(path, cc.Prefab, function (error, assets) {
                    if (error) {
                        cc.log(error);
                        return;
                    }
                    node_1 = cc.instantiate(assets);
                    node_1.setPosition(0, 0, 0);
                    node_1.scale = MonsterConfigure_1.MonsterConfigureManager.getInstance().getScale(id);
                    // console.log("id:",id)
                    var StrengthType = MonsterConfigure_1.MonsterConfigureManager.getInstance().getStrengthType(id);
                    node_1.parent = _this.pos.children[index];
                    _this.heroShadow.children[index].active = true;
                    // console.log("_______",node,this.pos.children[index])
                    // if()
                    // console.log("________",)
                    // if(index<bossarr.length){
                    // let name=String(node.getComponent(sp.Skeleton).defaultSkin)
                    // console.log("+++++++++++",type,StrengthType)
                    // if(name.substring(0,5)==MonsterFaceName.Front){
                    if (StrengthType == 3) {
                        _this.heroShadow.children[index].setScale(1.3, 1.3);
                        node_1.scale = MonsterConfigure_1.MonsterConfigureManager.getInstance().getScale(id) * 0.5;
                        // node.getComponent(sp.Skeleton).setSkin(MonsterFaceName.Front + MonsterConfigureManager.getInstance().getSkin(id));
                        node_1.getComponent(sp.Skeleton).setAnimation(0, MonsterData_1.MonsterActionName.Idle, true); //node.getComponent(sp.Skeleton).setAnimation(0,MonsterFaceName.Front + "_" + MonsterActionName.Idle,true);
                    }
                    if (StrengthType == 2) {
                        _this.heroShadow.children[index].setScale(0.7, 0.7);
                        node_1.scale = MonsterConfigure_1.MonsterConfigureManager.getInstance().getScale(id) * 0.6;
                        node_1.getComponent(sp.Skeleton).setSkin(MonsterData_1.MonsterFaceName.SideR + MonsterConfigure_1.MonsterConfigureManager.getInstance().getSkin(id));
                        node_1.getComponent(sp.Skeleton).setAnimation(0, MonsterData_1.MonsterFaceName.SideR + "_" + MonsterData_1.MonsterActionName.Idle, true);
                    }
                    if (StrengthType == 1) {
                        _this.heroShadow.children[index].setScale(0.4, 0.4);
                        node_1.scale = MonsterConfigure_1.MonsterConfigureManager.getInstance().getScale(id) * 0.8;
                        node_1.getComponent(sp.Skeleton).setSkin(MonsterData_1.MonsterFaceName.SideR + MonsterConfigure_1.MonsterConfigureManager.getInstance().getSkin(id));
                        node_1.getComponent(sp.Skeleton).setAnimation(0, MonsterData_1.MonsterFaceName.SideR + "_" + MonsterData_1.MonsterActionName.Idle, true);
                    }
                    // let scale=node.scaleX
                    // let rom=MyTool.random(0,1)
                    // if(rom==0){
                    //     scale=scale*-1
                    // }
                    // node.scaleX=scale
                    // }
                    // }
                });
            }
        };
        var this_1 = this;
        //怪物刷新
        for (var index = 0; index < this.pos.children.length; index++) {
            _loop_1(index);
        }
        //刷新英雄itme状态
        this.Refreshheroitmestatus();
        // HeroManager.getInstance().saveTeamList(GameManager.getInstance().cur_game_mode,teamList);//将更改之后的阵型保持到本地
        var canvas = cc.find("Canvas");
        this.node.getComponent(cc.Widget).target = canvas;
        this.Monster.active = false;
        this.Chariot.active = false;
    };
    //刷新英雄itme状态
    ToPlayMainUi.prototype.Refreshheroitmestatus = function () {
        //已解锁的英雄
        var HeroList = HeroManager_1.HeroManager.getInstance().getHeroList(); //数量   英雄id类型 英雄等级 英雄品质  英雄星星阶段
        var heroBasicdataarr = []; //最高战力数组
        var HeroListarr = HeroList; //已解锁的英雄
        //生成英雄itme
        for (var heroindex = this.guaiwuarr.length; heroindex < HeroList.length; heroindex++) {
            var hero = cc.instantiate(this.hero_item);
            hero.name = "" + heroindex;
            hero.setScale(0.75, 0.75);
            hero.parent = this.content;
            this.guaiwuarr.push(hero);
            // hero.on(cc.Node.EventType.TOUCH_START, this.onHeroItemTouchStart, this);
            // hero.on(cc.Node.EventType.TOUCH_MOVE, this.onHeroItemTouchMove, this);
            hero.on(cc.Node.EventType.TOUCH_END, this.onHeroItemTouchEnd, this);
            // hero.on(cc.Node.EventType.TOUCH_CANCEL, this.onHeroItemTouchCancel, this);
        }
        //刷新英雄itme
        for (var heroBasicdataindex = 0; heroBasicdataindex < HeroList.length; heroBasicdataindex++) {
            var heroBasicdata = HeroManager_1.HeroManager.getInstance().getHeroData(HeroList[heroBasicdataindex].hero_type); //英雄的基础数据   传入英雄id类型  防御力  生命值  命中值 
            heroBasicdataarr.push(heroBasicdata.total_attack);
        }
        //排列英雄战力
        var cun;
        var herocun;
        for (var index = 0; index < heroBasicdataarr.length; index++) {
            for (var paixvindex = 0; paixvindex < heroBasicdataarr.length - 1; paixvindex++) {
                if (heroBasicdataarr[paixvindex + 1] > heroBasicdataarr[paixvindex]) {
                    cun = heroBasicdataarr[paixvindex];
                    heroBasicdataarr[paixvindex] = heroBasicdataarr[paixvindex + 1];
                    heroBasicdataarr[paixvindex + 1] = cun;
                    herocun = HeroListarr[paixvindex];
                    HeroListarr[paixvindex] = HeroListarr[paixvindex + 1];
                    HeroListarr[paixvindex + 1] = herocun;
                }
            }
        }
        var teamList = HeroManager_1.HeroManager.getInstance().getTeamList(GameManager_1.default.getInstance().cur_game_mode);
        // console.log("++++++",teamList)
        this.greybuttonjudgment = 0; //灰色按钮判断 如果没有一个英雄上阵  不可开启游戏
        var Gotobattlenumber = 0; //上阵了几个英雄
        for (var i = 0; i < teamList.length; i++) {
            var heroType = teamList[i];
            if (heroType > 0) {
                Gotobattlenumber++;
                this.greybuttonjudgment = 1;
                // console.log("++++++",heroType)
                this.komwei.children[i].getChildByName("Prepare_Void").active = false;
                this.komwei.children[i].getChildByName("winText").active = false;
                this.komwei.children[i].getChildByName("heroShadow").active = true; //阴影
                this.komwei.children[i].getChildByName("hero").active = true;
                this.komwei.children[i].getChildByName("hero").getComponent(sp.Skeleton).skeletonData = this.sp[(heroType - 1)];
                this.komwei.children[i].getChildByName("hero").getComponent(sp.Skeleton).animation = "Idle";
                // this.loadHero(heroType,i)
            }
            else {
                this.komwei.children[i].getChildByName("winText").active = true;
                this.komwei.children[i].getChildByName("heroShadow").active = false; //阴影
                this.komwei.children[i].getChildByName("Prepare_Void").active = true;
                this.komwei.children[i].getChildByName("hero").active = false;
            }
        }
        // console.log("_______",Gotobattlenumber)
        for (var index = 0; index < Gotobattlenumber; index++) {
            if (Gotobattlenumber > TaskManager_1.default.getInstance().getTaskNowProgress(TaskEnum_1.TaskItem.上阵X名英雄)) {
                TaskManager_1.default.getInstance().emitTask(TaskEnum_1.TaskItem.上阵X名英雄);
            }
        }
        if (this.greybuttonjudgment == 0) {
            this.Common_Btn_0.getChildByName("Label").getComponent(TextLanguage_1.default).setMaterial(0, cc.Material.getBuiltinMaterial("2d-gray-sprite"));
            this.Common_Btn_0.getComponent(cc.Sprite).setMaterial(0, cc.Material.getBuiltinMaterial("2d-gray-sprite"));
        }
        else {
            this.Common_Btn_0.getChildByName("Label").getComponent(TextLanguage_1.default).setMaterial(0, cc.Material.getBuiltinMaterial("2d-sprite"));
            this.Common_Btn_0.getComponent(cc.Sprite).setMaterial(0, cc.Material.getBuiltinMaterial("2d-sprite"));
        }
        //刷新英雄itme状态
        //血量
        var jdtnumber = 0;
        for (var shuaxingindex = 0; shuaxingindex < HeroListarr.length; shuaxingindex++) {
            this.guaiwuarr[shuaxingindex].getComponent(HeroItem_1.default).RefreshHeroesItem(HeroListarr[shuaxingindex].hero_type);
            for (var teamListindex = 0; teamListindex < teamList.length; teamListindex++) {
                if (teamList[teamListindex] == HeroListarr[shuaxingindex].hero_type) {
                    this.guaiwuarr[shuaxingindex].getChildByName("shangzheng").active = true;
                }
            }
        }
        for (var xuelindex = 0; xuelindex < teamList.length; xuelindex++) {
            if (teamList[xuelindex] > 0) {
                jdtnumber += HeroManager_1.HeroManager.getInstance().getHeroData(teamList[xuelindex]).total_hp; //英雄的基础数据   传入英雄id类型  防御力  生命值  命中值  
            }
        }
        // cc.log(Math.round(1.111));//1
        jdtnumber = Math.round(jdtnumber / 5);
        // console.log("_______",jdtnumber)
        //刷新血量
        this.jdt.getComponent(cc.Label).string = "" + jdtnumber + "/" + "" + jdtnumber;
    };
    // onHeroItemTouchStart(e:cc.Event.EventTouch) {
    //     let touchTeam=e.getCurrentTarget();
    //     console.log("点击：",touchTeam.name)
    //     this.ScrollViews.getComponent(cc.ScrollView).enabled=false
    //     //如果这个英雄没有上阵   就可以拖出这个英雄
    //     if(touchTeam.getChildByName("shangzheng").active==false){
    //         let pos=this.komwei.convertToNodeSpaceAR(e.getLocation());
    //         this.Mouseitem.getComponent(HeroItem).heroType=touchTeam.getComponent(HeroItem).heroType
    //         this.Mouseitem.getComponent(HeroItem).RefreshHeroesItem(touchTeam.getComponent(HeroItem).heroType)
    //         this.Mouseitem.setPosition(pos)
    //         this.Mouseitem.active=true
    //     }else{
    //         GameManager.getInstance().showMessage(LanguageManager.getInstance().getStrByTextId(100091))
    //     }
    // }
    // onHeroItemTouchMove(e:cc.Event.EventTouch) {
    //     let touchTeam=e.getCurrentTarget();
    //     console.log("移动：",touchTeam.name)
    //     //拖动这个英雄
    //     if(touchTeam.getChildByName("shangzheng").active==false&&this.Mouseitem.active==true){
    //         let pos=this.komwei.convertToNodeSpaceAR(e.getLocation());
    //         this.Mouseitem.setPosition(pos)
    //     }else{
    //         GameManager.getInstance().showMessage(LanguageManager.getInstance().getStrByTextId(100091))
    //     }
    // }
    ToPlayMainUi.prototype.onHeroItemTouchEnd = function (e) {
        var touchTeam = e.getCurrentTarget();
        // console.log("在里面放开",touchTeam.name)
        this.ScrollViews.getComponent(cc.ScrollView).enabled = true;
        if (touchTeam.getChildByName("shangzheng").active == false) {
            //上阵该英雄
            var teamList = HeroManager_1.HeroManager.getInstance().getTeamList(GameManager_1.default.getInstance().cur_game_mode);
            if (GameManager_1.default.getInstance().cur_game_mode == Constants_1.GameMode.Boss_Challenge) {
                for (var index = 0; index < teamList.length; index++) {
                    // @ts-ignore
                    if (teamList[index] == -1 || teamList[index] == HeroConfig_1.Hero_Type.NULL) {
                        teamList[index] = touchTeam.getComponent(HeroItem_1.default).hero_type;
                        HeroManager_1.HeroManager.getInstance().saveTeamList(GameManager_1.default.getInstance().cur_game_mode, teamList);
                        this.Refreshheroitmestatus();
                        return;
                    }
                }
            }
            else {
                if (teamList[2] == -1 || teamList[2] == HeroConfig_1.Hero_Type.NULL) {
                    teamList[2] = touchTeam.getComponent(HeroItem_1.default).hero_type;
                    HeroManager_1.HeroManager.getInstance().saveTeamList(GameManager_1.default.getInstance().cur_game_mode, teamList);
                    this.Refreshheroitmestatus();
                    return;
                }
            }
            // for (let index = 0; index < teamList.length; index++) {
            //     // @ts-ignore
            //     if(index!=2){
            //         return;
            //     }
            //     if(teamList[index]==-1||teamList[index]==Hero_Type.NULL){
            //         teamList[index]=touchTeam.getComponent(HeroItem).hero_type
            //         HeroManager.getInstance().saveTeamList(GameManager.getInstance().cur_game_mode,teamList)
            //         this.Refreshheroitmestatus()
            //         return
            //     }
            // }
            GameManager_1.default.getInstance().showMessage(LanguageManager_1.default.getInstance().getStrByTextId(130013));
        }
        else {
            GameManager_1.default.getInstance().showMessage(LanguageManager_1.default.getInstance().getStrByTextId(100091));
        }
    };
    // onHeroItemTouchCancel(e:cc.Event.EventTouch) {
    //     let touchTeam=e.getCurrentTarget();
    //     this.ScrollViews.getComponent(cc.ScrollView).enabled=true
    //     console.log("在外面放开",touchTeam.name)
    //     let teamList=HeroManager.getInstance().getTeamList(GameManager.getInstance().cur_game_mode);
    //     let pos=this.komwei.convertToNodeSpaceAR(e.getLocation());
    //     if(touchTeam.getChildByName("shangzheng").active==false&&this.Mouseitem.active==true){
    //         //如果在上阵空位中且这个位置没有英雄 就上阵英雄   如果这个位置有英雄   就下阵这个位置的英雄   在上阵英雄
    //         this.Mouseitem.active=false
    //         for(let i=0; i<this.hero_team_rect.length; i++)
    //         {
    //             if(this.hero_team_rect[i].contains(pos)==true)
    //             {   
    //                 console.log("是否在空位里面：",this.hero_team_rect[i],pos)
    //                 // if(teamList[i]==Hero_Type.NULL||teamList[i]==-1){
    //                     teamList[i]=this.Mouseitem.getComponent(HeroItem).heroType
    //                 // }else{
    //                     // teamList[i]=-1
    //                 // }
    //                 HeroManager.getInstance().saveTeamList(GameManager.getInstance().cur_game_mode,teamList)
    //                 console.log("现在的英雄列表：",teamList)
    //                 this.Selfposition(i)
    //                 this.Refreshheroitmestatus()
    //                 return;
    //             }
    //         }
    //         this.Refreshheroitmestatus()
    //     }
    // }
    // setLevelData()
    // {
    //     LevelManager.getInstance().start_level=this.cur_selected_level;
    //     let gm=GameManager.getInstance();
    //     gm.level_datas=new Array();
    //     gm.level_datas=MissionLevelManager.getInstance().getLevelDatas(this.cur_selected_level);
    // }
    // loadHero(heroType:Hero_Type,posIndex:number)
    // {        
    //     Hero.max_load_num++;
    //     let posX=posIndex*128-192;
    //     cc.resources.load('heros/hero'+heroType,cc.Prefab,(error: Error, assets:cc.Prefab)=>{
    //         if(error)
    //         {
    //             console.log(error);
    //             return;
    //         }
    //         let node=cc.instantiate(assets);
    //         node.parent=this.komwei;
    //         node.x=posX;
    //         // let hp=cc.find('Canvas/Ui_Root/wall_root');
    //         // node.y=hp.y+80;
    //         BuffStateManager.getInstance().createBuffRoot(cc.v2(posX,node.y+150),heroType);
    //     }); 
    // }
    ToPlayMainUi.prototype.clickBtnStart = function () {
        // @ts-ignore
        if (this.greybuttonjudgment == 0) {
            GameManager_1.default.getInstance().showMessage(LanguageManager_1.default.getInstance().getStrByTextId(130006));
            return;
        }
        this.des();
        var GM = GameManager_1.default.getInstance();
        FollowManager_1.default.getInstance().followEvent(FollowConstants_1.Follow_Type.点击开始挑战用户数);
        GM.sound_manager.playSound(AudioConstants_1.SoundIndex.click);
        var fightingInfo = null;
        switch (GameManager_1.default.getInstance().cur_game_mode) {
            case Constants_1.GameMode.Main:
                {
                    // LevelManager.getInstance().start_level=LevelManager.getInstance().finish_level+1;
                    // fightingInfo=MissionLevelManager.getInstance().getFightingInfo(LevelManager.getInstance().start_level);
                    if (!TutorailsManager_1.default.getInstance().is_finish_game) {
                        fightingInfo = TutorialLevel_1.TutorialLevelManager.getInstance().getFightingInfo(MapManager_1.default.Currentlevel);
                    }
                    else {
                        fightingInfo = MissionLevel_1.MissionLevelManager.getInstance().getFightingInfo(MapManager_1.default.Currentlevel);
                    }
                    LevelManager_1.LevelManager.getInstance().start_level = MapManager_1.default.Currentlevel;
                }
                break;
            case Constants_1.GameMode.Endless:
                {
                    PropManager_1.PropManager.getInstance().changePropNum(PropConfig_1.PropId.EndlessChallenge, -1);
                    fightingInfo = EndlessLevels_1.EndlessLevelsManager.getInstance().getFightingInfo(1);
                }
                break;
            case Constants_1.GameMode.Boss_Challenge:
                {
                    PropManager_1.PropManager.getInstance().changePropNum(PropConfig_1.PropId.BossTicket, -1);
                    fightingInfo = BossChallenge_1.BossChallengeManager.getInstance().getFightingInfo(BossChallenge_1.BossChallengeManager.getInstance().cur_challenge_mode);
                }
                break;
            case Constants_1.GameMode.Maze:
                {
                    Times_1.default.voidsensid = this.Mazeid;
                    fightingInfo = MazeManager_1.MazeManager.getInstance().getFightingInfo(this.Mazeid);
                    if (GM.cur_game_scene == Constants_1.GameScene.game) {
                        _super.prototype.onRefresh.call(this);
                        _super.prototype.onClose.call(this);
                        GM.startNextLevel();
                        return;
                    }
                }
                break;
            case Constants_1.GameMode.Tower:
                {
                    // fightingInfo=TowerLevelManager.getInstance().getFightingInfo(TowerManager.getTowerLevel());
                }
                break;
        }
        GameManager_1.default.getInstance().fighting_info = fightingInfo;
        // this.showEnergy();
        GM.refreshUserExpShow();
        //this.setLevelData();
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
            GM.cur_load_progress = progressFalse;
            // this.loading_light.x = this.loading_bar.progress*this.loading_bar.totalLength-this.loading_bar.totalLength/2;
        }, function () {
            cc.director.loadScene(Constants_1.GameScene.game);
        });
    };
    ToPlayMainUi.prototype.des = function () {
        for (var index = 0; index < this.pos.children.length; index++) {
            if (this.pos.children[index].children.length > 0) {
                this.pos.children[index].children[0].destroy();
            }
        }
    };
    ToPlayMainUi.prototype.clickBtnMonster = function () {
        this.Monster.getComponent(MonsterDetails_1.default).MonsterDetailsarr = this.MonsterDetailsarr;
        this.Monster.active = true;
    };
    ToPlayMainUi.prototype.clickBtnChariot = function () {
        this.Chariot.active = true;
    };
    // setLevelData()
    // {
    //     LevelManager.getInstance().start_level=LevelManager.getInstance().finish_level + 1;
    //     let gm=GameManager.getInstance();
    //     gm.fighting_info=MissionLevelManager.getInstance().getFightingInfo(LevelManager.getInstance().start_level);
    // }
    ToPlayMainUi.prototype.clickBtnClose = function () {
        cc.find('Canvas/main_ui').getComponent(MainUi_1.default).refreshMainTaskUi();
        GameManager_1.default.getInstance().sound_manager.playSound(AudioConstants_1.SoundIndex.click);
        this.des();
        this.destroySelf();
        if (GameManager_1.default.getInstance().cur_game_mode == Constants_1.GameMode.Endless) {
            UIManager_1.UIManager.getInstance().showUiDialog(UIConfig_1.UIPath.VndlessChallenges, UIConfig_1.UILayerLevel.One, { onCompleted: function (uiNode) {
                    uiNode.getComponent(endlesschallenges_1.default).init({
                        onClose: function () {
                        }
                    });
                    uiNode.getComponent(endlesschallenges_1.default).initUi(2); //2:无尽挑战   3：boss挑战
                }, });
        }
        else if (GameManager_1.default.getInstance().cur_game_mode == Constants_1.GameMode.Boss_Challenge) {
            UIManager_1.UIManager.getInstance().showUiDialog(UIConfig_1.UIPath.VndlessChallenges, UIConfig_1.UILayerLevel.One, { onCompleted: function (uiNode) {
                    uiNode.getComponent(endlesschallenges_1.default).init({
                        onClose: function () {
                        }
                    });
                    uiNode.getComponent(endlesschallenges_1.default).initUi(3); //2:无尽挑战   3：boss挑战
                }, });
        }
    };
    ToPlayMainUi.prototype.destroySelf = function () {
        _super.prototype.onClose.call(this);
        ApkManager_1.default.getInstance().closeBanner();
        // EventManager.postRedEvent(RedEventString.RED_CHECK,RedEventType.Btn_Main_SignIn);
    };
    __decorate([
        property(cc.Prefab)
    ], ToPlayMainUi.prototype, "hero_item", void 0);
    __decorate([
        property(cc.Node)
    ], ToPlayMainUi.prototype, "Monster", void 0);
    __decorate([
        property(cc.Node)
    ], ToPlayMainUi.prototype, "Chariot", void 0);
    __decorate([
        property(cc.Node)
    ], ToPlayMainUi.prototype, "pos", void 0);
    __decorate([
        property(cc.Node)
    ], ToPlayMainUi.prototype, "heroShadow", void 0);
    __decorate([
        property(cc.Node)
    ], ToPlayMainUi.prototype, "leveltxt", void 0);
    __decorate([
        property(cc.Node)
    ], ToPlayMainUi.prototype, "komwei", void 0);
    __decorate([
        property(cc.Node)
    ], ToPlayMainUi.prototype, "content", void 0);
    __decorate([
        property(sp.SkeletonData)
    ], ToPlayMainUi.prototype, "sp", void 0);
    __decorate([
        property(cc.Node)
    ], ToPlayMainUi.prototype, "ScrollVie", void 0);
    __decorate([
        property(cc.Node)
    ], ToPlayMainUi.prototype, "ScrollViews", void 0);
    __decorate([
        property(cc.Node)
    ], ToPlayMainUi.prototype, "Mouse", void 0);
    __decorate([
        property(cc.Node)
    ], ToPlayMainUi.prototype, "Mouseitem", void 0);
    __decorate([
        property(cc.Node)
    ], ToPlayMainUi.prototype, "Common_Btn_0", void 0);
    __decorate([
        property(cc.Node)
    ], ToPlayMainUi.prototype, "jdt", void 0);
    __decorate([
        property(cc.SpriteFrame)
    ], ToPlayMainUi.prototype, "bj", void 0);
    __decorate([
        property(cc.SpriteFrame)
    ], ToPlayMainUi.prototype, "wall", void 0);
    __decorate([
        property(cc.Node)
    ], ToPlayMainUi.prototype, "mybj", void 0);
    __decorate([
        property(cc.Node)
    ], ToPlayMainUi.prototype, "mywall", void 0);
    __decorate([
        property(cc.SpriteFrame)
    ], ToPlayMainUi.prototype, "bg_Endless", void 0);
    __decorate([
        property(cc.Node)
    ], ToPlayMainUi.prototype, "Prepare_Btn_Monster", void 0);
    __decorate([
        property(cc.Node)
    ], ToPlayMainUi.prototype, "Common_Btn_Back", void 0);
    __decorate([
        property(cc.SpriteFrame)
    ], ToPlayMainUi.prototype, "bg_Maze", void 0);
    __decorate([
        property(cc.SpriteFrame)
    ], ToPlayMainUi.prototype, "bg_wall", void 0);
    ToPlayMainUi = __decorate([
        ccclass
    ], ToPlayMainUi);
    return ToPlayMainUi;
}(UIComponent_1.default));
exports.default = ToPlayMainUi;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0c1xcVUlcXGhvbWVcXFRvUGxheU1haW5VaS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSwrREFBMEQ7QUFDMUQsOERBQW9FO0FBQ3BFLDhEQUFvRTtBQUNwRSxtREFBOEM7QUFDOUMsNkNBQW9FO0FBQ3BFLG9GQUErRTtBQUcvRSxpREFBNEM7QUFDNUMscURBQWdEO0FBQ2hELDJEQUEwRDtBQUUxRCx5REFBdUQ7QUFDdkQsbURBQThDO0FBQzlDLHlEQUF3RDtBQUN4RCx5REFBK0Q7QUFDL0QsMkRBQWlFO0FBQ2pFLHNEQUFxRDtBQUNyRCx3RUFBOEU7QUFDOUUseURBQStFO0FBQy9FLHVFQUFrRTtBQUNsRSxtRUFBOEQ7QUFFOUQsdUVBQWtFO0FBQ2xFLGlFQUE0RDtBQUU1RCxvREFBK0M7QUFDL0Msc0RBQXFEO0FBQ3JELDZEQUF3RDtBQUN4RCw2REFBeUQ7QUFDekQsK0RBQWlFO0FBQ2pFLGdEQUErQztBQUMvQyxzREFBaUQ7QUFFakQscURBQTJEO0FBQzNELHlEQUFvRDtBQUNwRCwrQ0FBMEM7QUFDMUMscUVBQWdFO0FBQ2hFLG9EQUFtRDtBQUNuRCw4Q0FBeUM7QUFDekMsd0NBQW1EO0FBRW5ELDBDQUF5QztBQUN6QyxtQ0FBOEI7QUFDOUIsbURBQThDO0FBRXhDLElBQUEsS0FBc0IsRUFBRSxDQUFDLFVBQVUsRUFBbEMsT0FBTyxhQUFBLEVBQUUsUUFBUSxjQUFpQixDQUFDO0FBRzFDO0lBQTBDLGdDQUFXO0lBQXJEO1FBQUEscUVBeXNCQztRQXZzQkcsZUFBUyxHQUFhLElBQUksQ0FBQyxDQUFBLFVBQVU7UUFHckMsYUFBTyxHQUFXLElBQUksQ0FBQyxDQUFBLE1BQU07UUFFN0IsYUFBTyxHQUFXLElBQUksQ0FBQyxDQUFBLE1BQU07UUFFN0IsU0FBRyxHQUFXLElBQUksQ0FBQyxDQUFBLE9BQU87UUFFMUIsZ0JBQVUsR0FBVyxJQUFJLENBQUMs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QUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsQ0FBQyxjQUFjLENBQUMsTUFBTSxDQUFDLENBQUMsTUFBTSxHQUFDLElBQUksQ0FBQSxDQUFBLE1BQU07WUFDckUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLENBQUMsY0FBYyxDQUFDLGNBQWMsQ0FBQyxDQUFDLE1BQU0sR0FBQyxLQUFLLENBQUEsQ0FBQSxNQUFNO1lBQzlFLElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxDQUFDLGNBQWMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxNQUFNLEdBQUMsS0FBSyxDQUFBLENBQUEsTUFBTTtZQUN6RSxJQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsQ0FBQyxjQUFjLENBQUMsWUFBWSxDQUFDLENBQUMsTUFBTSxHQUFDLElBQUksQ0FBQSxDQUFBLElBQUk7WUFDekUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLENBQUMsY0FBYyxDQUFDLE1BQU0sQ0FBQyxDQUFDLFlBQVksQ0FBQyxFQUFFLENBQUMsUUFBUSxDQUFDLENBQUMsWUFBWSxHQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxHQUFDLENBQUMsQ0FBQyxDQUFBO1lBQ3RILElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxDQUFDLGNBQWMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxZQUFZLENBQUMsRUFBRSxDQUFDLFFBQVEsQ0FBQyxDQUFDLFNBQVMsR0FBQyxNQUFNLENBQUE7U0FDakc7YUFBSTtZQUNELElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxDQUFDLGNBQWMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxNQUFNLEdBQUMsS0FBSyxDQUFBLENBQUEsTUFBTTtZQUN0RSxJQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsQ0FBQyxjQUFjLENBQUMsY0FBYyxDQUFD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Q0E7SUFFekI7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLFdBQVcsQ0FBQzs4Q0FDRTtJQUczQjtRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDOzhDQUNFO0lBRXBCO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUM7Z0RBQ0k7SUFFdEI7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLFdBQVcsQ0FBQztvREFDUTtJQUdqQztRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDOzZEQUNpQjtJQUluQztRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDO3lEQUNhO0lBSS9CO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxXQUFXLENBQUM7aURBQ0s7SUFFOUI7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLFdBQVcsQ0FBQztpREFDSztJQXhFYixZQUFZO1FBRGhDLE9BQU87T0FDYSxZQUFZLENBeXNCaEM7SUFBRCxtQkFBQztDQXpzQkQsQUF5c0JDLENBenNCeUMscUJBQVcsR0F5c0JwRDtrQkF6c0JvQixZQUFZIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFdYTWFuYWdlckVYIGZyb20gXCIuLi8uLi8uLi9zdGFydHNjZW5lL1dYTWFuYWdlckVYXCI7XHJcbmltcG9ydCB7IEJvc3NDaGFsbGVuZ2VNYW5hZ2VyIH0gZnJvbSBcIi4uLy4uL0FjdGl2aXR5L0Jvc3NDaGFsbGVuZ2VcIjtcclxuaW1wb3J0IHsgRW5kbGVzc0xldmVsc01hbmFnZXIgfSBmcm9tIFwiLi4vLi4vQWN0aXZpdHkvRW5kbGVzc0xldmVsc1wiO1xyXG5pbXBvcnQgQXBrTWFuYWdlciBmcm9tIFwiLi4vLi4vQWRzL0Fwa01hbmFnZXJcIjtcclxuaW1wb3J0IHsgRmlnaHRpbmdJbmZvLCBHYW1lTW9kZSwgR2FtZVNjZW5lIH0gZnJvbSBcIi4uLy4uL0NvbnN0YW50c1wiO1xyXG5pbXBvcnQgZW5kbGVzc2NoYWxsZW5nZXMgZnJvbSBcIi4uLy4uL2NvcHkvZW5kbGVzc2NoYWxsZW5nZXMvZW5kbGVzc2NoYWxsZW5nZXNcIjtcclxuaW1wb3J0IEJ1ZmZTdGF0ZU1hbmFnZXIgZnJvbSBcIi4uLy4uL0dhbWUvQnVmZlN0YXRlTWFuYWdlclwiO1xyXG5pbXBvcnQgR2FtZURhdGEgZnJvbSBcIi4uLy4uL0dhbWVEYXRhXCI7XHJcbmltcG9ydCBHYW1lTWFuYWdlciBmcm9tIFwiLi4vLi4vR2FtZU1hbmFnZXJcIjtcclxuaW1wb3J0IE1hcE1hbmFnZXIgZnJvbSBcIi4uLy4uL0d1YUppL01hcE1hbmFnZXJcIjtcclxuaW1wb3J0IHsgSGVyb01hbmFnZXIgfSBmcm9tIFwiLi4vLi4vSGVyby9EYXRhL0hlcm9NYW5hZ2VyXCI7XHJcbmltcG9ydCBIZXJvIGZyb20gXCIuLi8uLi9IZXJvL0dhbWUvSGVyb1wiO1xyXG5pbXBvcnQgeyBIZXJvX1R5cGUgfSBmcm9tIFwiLi4vLi4vSGVyby9HYW1lL0hlcm9Db25maWdcIjtcclxuaW1wb3J0IEhlcm9JdGVtIGZyb20gXCIuLi8uLi9IZXJvL1VpL0hlcm9JdGVtXCI7XHJcbmltcG9ydCB7IExldmVsTWFuYWdlciB9IGZyb20gXCIuLi8uLi9MZXZlbC9MZXZlbE1hbmFnZXJcIjtcclxuaW1wb3J0IHsgTWlzc2lvbkxldmVsTWFuYWdlciB9IGZyb20gXCIuLi8uLi9MZXZlbC9NaXNzaW9uTGV2ZWxcIjtcclxuaW1wb3J0IHsgVHV0b3JpYWxMZXZlbE1hbmFnZXIgfSBmcm9tIFwiLi4vLi4vTGV2ZWwvVHV0b3JpYWxMZXZlbFwiO1xyXG5pbXBvcnQgeyBNYXplTWFuYWdlciB9IGZyb20gXCIuLi8uLi9NYXplL01hemVNYW5hZ2VyXCI7XHJcbmltcG9ydCB7IE1vbnN0ZXJDb25maWd1cmVNYW5hZ2VyIH0gZnJvbSBcIi4uLy4uL01vbnN0ZXIvRGF0YS9Nb25zdGVyQ29uZmlndXJlXCI7XHJcbmltcG9ydCB7IE1vbnN0ZXJGYWNlTmFtZSwgTW9uc3RlckFjdGlvbk5hbWUgfSBmcm9tIFwiLi4vLi4vTW9uc3Rlci9Nb25zdGVyRGF0YVwiO1xyXG5pbXBvcnQgeyBGb2xsb3dfVHlwZSB9IGZyb20gXCIuLi8uLi9tdWx0aUxhbmd1YWdlL0ZvbGxvd0NvbnN0YW50c1wiO1xyXG5pbXBvcnQgRm9sbG93TWFuYWdlciBmcm9tIFwiLi4vLi4vbXVsdGlMYW5ndWFnZS9Gb2xsb3dNYW5hZ2VyXCI7XHJcbmltcG9ydCB7IExhbmd1YWdlSW5kZXggfSBmcm9tIFwiLi4vLi4vbXVsdGlMYW5ndWFnZS9MYW5ndWFnZUNvbnN0YW50c1wiO1xyXG5pbXBvcnQgTGFuZ3VhZ2VNYW5hZ2VyIGZyb20gXCIuLi8uLi9tdWx0aUxhbmd1YWdlL0xhbmd1YWdlTWFuYWdlclwiO1xyXG5pbXBvcnQgVGV4dExhbmd1YWdlIGZyb20gXCIuLi8uLi9tdWx0aUxhbmd1YWdlL1RleHRMYW5ndWFnZVwiO1xyXG5pbXBvcnQgeyBQZXRNYW5hZ2VyIH0gZnJvbSBcIi4uLy4uL1BldC9QZXRNYW5hZ2VyXCI7XHJcbmltcG9ydCB7IFByb3BJZCB9IGZyb20gXCIuLi8uLi9Qcm9wL1Byb3BDb25maWdcIjtcclxuaW1wb3J0IHsgUHJvcE1hbmFnZXIgfSBmcm9tIFwiLi4vLi4vUHJvcC9Qcm9wTWFuYWdlclwiO1xyXG5pbXBvcnQgeyBTb3VuZEluZGV4IH0gZnJvbSBcIi4uLy4uL1NvdW5kL0F1ZGlvQ29uc3RhbnRzXCI7XHJcbmltcG9ydCB7IFN0b3JhZ2VLZXkgfSBmcm9tIFwiLi4vLi4vU3RvcmFnZS9TdG9yYWdlQ29uZmlnXCI7XHJcbmltcG9ydCB7IFRoZVN0b3JhZ2VNYW5hZ2VyIH0gZnJvbSBcIi4uLy4uL1N0b3JhZ2UvU3RvcmFnZU1hbmFnZXJcIjtcclxuaW1wb3J0IHsgVGFza0l0ZW0gfSBmcm9tIFwiLi4vLi4vVGFzay9UYXNrRW51bVwiO1xyXG5pbXBvcnQgVGFza01hbmFnZXIgZnJvbSBcIi4uLy4uL1Rhc2svVGFza01hbmFnZXJcIjtcclxuaW1wb3J0IE15VG9vbCBmcm9tIFwiLi4vLi4vVG9vbHMvTXlUb29sXCI7XHJcbmltcG9ydCB7IFRvd2VyTGV2ZWxNYW5hZ2VyIH0gZnJvbSBcIi4uLy4uL1Rvd2VyL1Rvd2VyTGV2ZWxcIjtcclxuaW1wb3J0IFRvd2VyTWFuYWdlciBmcm9tIFwiLi4vLi4vVG93ZXIvVG93ZXJNYW5hZ2VyXCI7XHJcbmltcG9ydCBUaW1lcyBmcm9tIFwiLi4vLi4vVHVybnRhYmxlL1RpbWVzXCI7XHJcbmltcG9ydCBUdXRvcmFpbHNNYW5hZ2VyIGZyb20gXCIuLi8uLi9UdXRvcmlhbHMvVHV0b3JhaWxzTWFuYWdlclwiO1xyXG5pbXBvcnQgeyBVc2VySW5mbyB9IGZyb20gXCIuLi8uLi9Vc2VySW5mby9Vc2VySW5mb1wiO1xyXG5pbXBvcnQgVUlDb21wb25lbnQgZnJvbSBcIi4uL1VJQ29tcG9uZW50XCI7XHJcbmltcG9ydCB7IFVJUGF0aCwgVUlMYXllckxldmVsIH0gZnJvbSBcIi4uL1VJQ29uZmlnXCI7XHJcbmltcG9ydCB7IFVpQWN0aW9uIH0gZnJvbSBcIi4uL1VpSW50ZXJmYWNlXCI7XHJcbmltcG9ydCB7IFVJTWFuYWdlciB9IGZyb20gXCIuLi9VSU1hbmFnZXJcIjtcclxuaW1wb3J0IE1haW5VaSBmcm9tIFwiLi9NYWluVWlcIjtcclxuaW1wb3J0IE1vbnN0ZXJEZXRhaWxzIGZyb20gXCIuL01vbnN0ZXJEZXRhaWxzXCI7XHJcblxyXG5jb25zdCB7Y2NjbGFzcywgcHJvcGVydHl9ID0gY2MuX2RlY29yYXRvcjtcclxuXHJcbkBjY2NsYXNzXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFRvUGxheU1haW5VaSBleHRlbmRzIFVJQ29tcG9uZW50IHtcclxuICAgIEBwcm9wZXJ0eShjYy5QcmVmYWIpXHJcbiAgICBoZXJvX2l0ZW06Y2MuUHJlZmFiID0gbnVsbDsvL+iLsembhOWktOWDj+eahOmihOWItuS9k1xyXG5cclxuICAgIEBwcm9wZXJ0eShjYy5Ob2RlKVxyXG4gICAgTW9uc3RlcjpjYy5Ob2RlID0gbnVsbDsvL+aAqueJqeivpuaDhVxyXG4gICAgQHByb3BlcnR5KGNjLk5vZGUpXHJcbiAgICBDaGFyaW90OmNjLk5vZGUgPSBudWxsOy8v5oiY6L2m6K+m5oOFXHJcbiAgICBAcHJvcGVydHkoY2MuTm9kZSlcclxuICAgIHBvczpjYy5Ob2RlID0gbnVsbDsvL+aAqueJqeeahOS9jee9rlxyXG4gICAgQHByb3BlcnR5KGNjLk5vZGUpXHJcbiAgICBoZXJvU2hhZG93OmNjLk5vZGUgPSBudWxsOy8v5oCq54mp6Zi05b2x55qE5L2N572uXHJcbiAgICBAcHJvcGVydHkoY2MuTm9kZSlcclxuICAgIGxldmVsdHh0OmNjLk5vZGUgPSBudWxsO1xyXG5cclxuICAgIGd1YWl3dWFycj1bXS8v5oCq54mp55qE5pWw57uEXHJcbiAgICBNb25zdGVyRGV0YWlsc2Fycj1bXS8v5oCq54mp6K+m5oOF5YiX6KGoICAg5oyJYm9zcyAgIOeyvuiLsSAgIOaZrumAmiDmjpLluo9cclxuXHJcblxyXG4gICAgQHByb3BlcnR5KGNjLk5vZGUpXHJcbiAgICBrb213ZWk6Y2MuTm9kZSA9IG51bGw7Ly/nqbrkvY0gICDoi7Hpm4TkuIrpmLXnmoTkvY3nva7mmK/lkKbog73op6PplIFcclxuXHJcbiAgICBAcHJvcGVydHkoY2MuTm9kZSlcclxuICAgIGNvbnRlbnQ6Y2MuTm9kZSA9IG51bGw7Ly/niLboioLngrlcclxuXHJcbiAgICBAcHJvcGVydHkoc3AuU2tlbGV0b25EYXRhKVxyXG4gICAgc3A6c3AuU2tlbGV0b25EYXRhW10gPSBbXTsvL+epuuS9jSAgIOiLsembhOS4iumYteeahOS9jee9ruaYr+WQpuiDveino+mUgVxyXG5cclxuICAgIGhlcm9fdGVhbV9yZWN0OiBjYy5SZWN0W10gPSBbXTtcclxuICAgIFNjcm9sbFZpZXdyZWN0OiBjYy5SZWN0ID0gbnVsbDtcclxuICAgIEBwcm9wZXJ0eShjYy5Ob2RlKVxyXG4gICAgU2Nyb2xsVmllOmNjLk5vZGUgPSBudWxsOy8v6Iux6ZuE5ruR5Yqo5Z2XXHJcbiAgICBAcHJvcGVydHkoY2MuTm9kZSlcclxuICAgIFNjcm9sbFZpZXdzOmNjLk5vZGUgPSBudWxsOy8v6Iux6ZuE5ruR5Yqo5Z2XXHJcbiAgICBoZXJvX3RlYW1fcG9zOiBjYy5WZWMyW10gPSBbXTtcclxuXHJcbiAgICBAcHJvcGVydHkoY2MuTm9kZSlcclxuICAgIE1vdXNlOmNjLk5vZGUgPSBudWxsOy8v6byg5qCH5LiK55qE6Iux6ZuEXHJcbiAgICBAcHJvcGVydHkoY2MuTm9kZSlcclxuICAgIE1vdXNlaXRlbTpjYy5Ob2RlID0gbnVsbDsvL+m8oOagh+S4iueahOiLsembhGl0ZW1cclxuICAgIGNsaWNraGVyb3Bvc2l0aW9uOm51bWJlcj0tMS8v54K55Ye755qE5L2N572u5piv56ys5Yeg5LiqICAgIOm7mOiupOayoeacieiiq+eCueWHu+WIsOeahOS9jee9rlxyXG4gICAgcHV0ZG93bmhlcm9wb3NpdGlvbjpudW1iZXI9LTEvL+aUvuS4i+eahOS9jee9ruaYr+esrOWHoOS4qlxyXG4gICAgQHByb3BlcnR5KGNjLk5vZGUpXHJcbiAgICBDb21tb25fQnRuXzA6Y2MuTm9kZSA9IG51bGw7Ly/lvIDlp4vmjInpkq5cclxuICAgIEBwcm9wZXJ0eShjYy5Ob2RlKVxyXG4gICAgamR0OmNjLk5vZGUgPSBudWxsOy8v5oiY6L2m6KGA6YeP6L+b5bqm5p2hXHJcbiAgICBncmV5YnV0dG9uanVkZ21lbnQ6IG51bWJlcj0wO1xyXG5cclxuXHJcbiAgICBAcHJvcGVydHkoY2MuU3ByaXRlRnJhbWUpXHJcbiAgICBiajpjYy5TcHJpdGVGcmFtZVtdID0gW107Ly/og4zmma9cclxuICAgIEBwcm9wZXJ0eShjYy5TcHJpdGVGcmFtZSlcclxuICAgIHdhbGw6Y2MuU3ByaXRlRnJhbWVbXSA9IFtdOy8v5oiY6L2mXHJcblxyXG4gICAgQHByb3BlcnR5KGNjLk5vZGUpXHJcbiAgICBteWJqOmNjLk5vZGUgPSBudWxsOy8v6IOM5pmvXHJcbiAgICBAcHJvcGVydHkoY2MuTm9kZSlcclxuICAgIG15d2FsbDpjYy5Ob2RlID0gbnVsbDsvL+aImOi9plxyXG4gICAgQHByb3BlcnR5KGNjLlNwcml0ZUZyYW1lKVxyXG4gICAgYmdfRW5kbGVzczpjYy5TcHJpdGVGcmFtZSA9IG51bGw7Ly/ml6DlsL3mjJHmiJjog4zmma9cclxuXHJcbiAgICBAcHJvcGVydHkoY2MuTm9kZSlcclxuICAgIFByZXBhcmVfQnRuX01vbnN0ZXI6Y2MuTm9kZSA9IG51bGw7Ly/mgKrnianor6bmg4XmjInpkq5cclxuICAgIFxyXG5cclxuICAgIEBwcm9wZXJ0eShjYy5Ob2RlKVxyXG4gICAgQ29tbW9uX0J0bl9CYWNrOmNjLk5vZGUgPSBudWxsOy8v6L+U5Zue5oyJ6ZKuXHJcbiAgICBNYXplaWQ6bnVtYmVyID0gMDsvL+WGsOays+WFs+WNoWlkXHJcblxyXG4gICAgQHByb3BlcnR5KGNjLlNwcml0ZUZyYW1lKVxyXG4gICAgYmdfTWF6ZTpjYy5TcHJpdGVGcmFtZSA9IG51bGw7Ly/lhrDmsrPog4zmma9cclxuICAgIEBwcm9wZXJ0eShjYy5TcHJpdGVGcmFtZSlcclxuICAgIGJnX3dhbGw6Y2MuU3ByaXRlRnJhbWUgPSBudWxsOy8v5Yaw5rKz5oiY6L2mXHJcbiAgICBzdGFydCgpe1xyXG4gICAgICAgIGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCB0aGlzLmtvbXdlaS5jaGlsZHJlbi5sZW5ndGg7IGluZGV4KyspIHtcclxuICAgICAgICAgICBcclxuICAgICAgICAgICAgdGhpcy5rb213ZWkuY2hpbGRyZW5baW5kZXhdLm9uKGNjLk5vZGUuRXZlbnRUeXBlLlRPVUNIX1NUQVJULCB0aGlzLm9uSGVyb1RvdWNoU3RhcnQsIHRoaXMpO1xyXG4gICAgICAgICAgICB0aGlzLmtvbXdlaS5jaGlsZHJlbltpbmRleF0ub24oY2MuTm9kZS5FdmVudFR5cGUuVE9VQ0hfTU9WRSwgdGhpcy5vbkhlcm9Ub3VjaE1vdmUsIHRoaXMpO1xyXG4gICAgICAgICAgICB0aGlzLmtvbXdlaS5jaGlsZHJlbltpbmRleF0ub24oY2MuTm9kZS5FdmVudFR5cGUuVE9VQ0hfRU5ELCB0aGlzLm9uSGVyb1RvdWNoRW5kLCB0aGlzKTtcclxuICAgICAgICAgICAgdGhpcy5rb213ZWkuY2hpbGRyZW5baW5kZXhdLm9uKGNjLk5vZGUuRXZlbnRUeXBlLlRPVUNIX0NBTkNFTCwgdGhpcy5vbkhlcm9Ub3VjaENhbmNlbCwgdGhpcyk7XHJcbiAgICAgICAgICAgIGxldCBzaXplID0gdGhpcy5rb213ZWkuY2hpbGRyZW5baW5kZXhdLmdldENvbnRlbnRTaXplKCk7XHJcbiAgICAgICAgICAgIGxldCBwb3MgPSB0aGlzLmtvbXdlaS5jaGlsZHJlbltpbmRleF0uZ2V0UG9zaXRpb24oKTtcclxuICAgICAgICAgICAgdGhpcy5oZXJvX3RlYW1fcmVjdC5wdXNoKGNjLnJlY3QocG9zLngtc2l6ZS53aWR0aC8yLHBvcy55LXNpemUuaGVpZ2h0LzIsc2l6ZS53aWR0aCxzaXplLmhlaWdodCkpO1xyXG4gICAgICAgICAgICB0aGlzLmhlcm9fdGVhbV9wb3MucHVzaChwb3MpO1xyXG4gICAgICAgICAgICBcclxuICAgICAgICB9XHJcbiAgICAgICAgbGV0IHBvc3MgPSB0aGlzLlNjcm9sbFZpZS5nZXRQb3NpdGlvbigpO1xyXG4gICAgICAgIGxldCBzaXplcyA9IHRoaXMuU2Nyb2xsVmllLmdldENvbnRlbnRTaXplKCk7XHJcbiAgICAgICAgdGhpcy5TY3JvbGxWaWV3cmVjdD1jYy5yZWN0KHBvc3MueC1zaXplcy53aWR0aC8yLHBvc3MueS1zaXplcy5oZWlnaHQvMixzaXplcy53aWR0aCxzaXplcy5oZWlnaHQpXHJcbiAgICAgICAgLy8gSGVyb01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5hZGRIZXJvKDMpXHJcbiAgICB9XHJcbiAgICBvbkhlcm9Ub3VjaFN0YXJ0KGU6Y2MuRXZlbnQuRXZlbnRUb3VjaCkge1xyXG4gICAgICAgIGxldCB0b3VjaFRlYW09ZS5nZXRDdXJyZW50VGFyZ2V0KCk7XHJcbiAgICAgICAgbGV0IHBvcz10aGlzLmtvbXdlaS5jb252ZXJ0VG9Ob2RlU3BhY2VBUihlLmdldExvY2F0aW9uKCkpO1xyXG4gICAgICAgIGxldCB3ZWl6aGk9TnVtYmVyKHRvdWNoVGVhbS5uYW1lKS8v54K55Yiw56ys5Yeg5Liq5L2N572uXHJcbiAgICAgICAgdGhpcy5jbGlja2hlcm9wb3NpdGlvbj13ZWl6aGlcclxuICAgICAgICBsZXQgdGVhbUxpc3Q9SGVyb01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRUZWFtTGlzdChHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLmN1cl9nYW1lX21vZGUpO1xyXG4gICAgICAgIC8v5aaC5p6c6L+Z5Liq5L2N572u5pyJ6Iux6ZuE77yM5bCx5bCG6L+Z5Liq5L2N572u55qE6Iux6ZuE6ZqQ6JePICAg5byA5ZCv6byg5qCH55qE6Iux6ZuEICDlsIbpvKDmoIfnmoToi7Hpm4Tnmq7ogqTmjaLmiJDov5nkuKrkvY3nva7nmoToi7Hpm4RcclxuICAgICAgICAvLyBAdHMtaWdub3JlXHJcbiAgICAgICAgaWYgKHRlYW1MaXN0W3dlaXpoaV0hPUhlcm9fVHlwZS5OVUxMJiZ0ZWFtTGlzdFt3ZWl6aGldIT0tMSkge1xyXG4gICAgICAgICAgICB0aGlzLmtvbXdlaS5jaGlsZHJlblt0aGlzLmNsaWNraGVyb3Bvc2l0aW9uXS5nZXRDaGlsZEJ5TmFtZShcImhlcm9cIikuYWN0aXZlPWZhbHNlLy/oi7Hpm4TpmpDol49cclxuICAgICAgICAgICAgdGhpcy5rb213ZWkuY2hpbGRyZW5bdGhpcy5jbGlja2hlcm9wb3NpdGlvbl0uZ2V0Q2hpbGRCeU5hbWUoXCJQcmVwYXJlX1ZvaWRcIikuYWN0aXZlPXRydWUvL+m7keW9seW8gOWQr1xyXG4gICAgICAgICAgICB0aGlzLmtvbXdlaS5jaGlsZHJlblt0aGlzLmNsaWNraGVyb3Bvc2l0aW9uXS5nZXRDaGlsZEJ5TmFtZShcIndpblRleHRcIikuYWN0aXZlPXRydWUvL+aWh+Wtl+W8gOWQr1xyXG4gICAgICAgICAgICB0aGlzLmtvbXdlaS5jaGlsZHJlblt0aGlzLmNsaWNraGVyb3Bvc2l0aW9uXS5nZXRDaGlsZEJ5TmFtZShcImhlcm9TaGFkb3dcIikuYWN0aXZlPWZhbHNlLy/pmLTlvbFcclxuICAgICAgICAgICAgdGhpcy5Nb3VzZS5zZXRQb3NpdGlvbihwb3MpXHJcbiAgICAgICAgICAgIHRoaXMuTW91c2UuZ2V0Q2hpbGRCeU5hbWUoXCJoZXJvXCIpLmdldENvbXBvbmVudChzcC5Ta2VsZXRvbikuc2tlbGV0b25EYXRhPXRoaXMuc3BbdGVhbUxpc3Rbd2VpemhpXS0xXVxyXG4gICAgICAgICAgICB0aGlzLk1vdXNlLmdldENoaWxkQnlOYW1lKFwiaGVyb1wiKS5nZXRDb21wb25lbnQoc3AuU2tlbGV0b24pLmFuaW1hdGlvbj1cIklkbGVcIlxyXG4gICAgICAgICAgICB0aGlzLk1vdXNlLmFjdGl2ZT10cnVlXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIG9uSGVyb1RvdWNoTW92ZShlOmNjLkV2ZW50LkV2ZW50VG91Y2gpIHtcclxuICAgICAgICBpZih0aGlzLmNsaWNraGVyb3Bvc2l0aW9uIT0tMSl7XHJcbiAgICAgICAgICAgIGxldCB0b3VjaFRlYW09ZS5nZXRDdXJyZW50VGFyZ2V0KCk7XHJcbiAgICAgICAgICAgIGxldCBwb3M9dGhpcy5rb213ZWkuY29udmVydFRvTm9kZVNwYWNlQVIoZS5nZXRMb2NhdGlvbigpKTtcclxuICAgICAgICAgICAgdGhpcy5Nb3VzZS5zZXRQb3NpdGlvbihwb3MpXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgU2VsZnBvc2l0aW9uKG51bWJlcil7XHJcbiAgICAgICAgbGV0IHRlYW1MaXN0PUhlcm9NYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0VGVhbUxpc3QoR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5jdXJfZ2FtZV9tb2RlKTtcclxuICAgICAgICBpZih0aGlzLk1vdXNlLmFjdGl2ZT09dHJ1ZSl7XHJcbiAgICAgICAgICAgIHRoaXMuTW91c2UuYWN0aXZlPWZhbHNlXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmKHRoaXMuTW91c2VpdGVtLmFjdGl2ZT09dHJ1ZSl7XHJcbiAgICAgICAgICAgIHRoaXMuTW91c2VpdGVtLmFjdGl2ZT1mYWxzZVxyXG4gICAgICAgIH1cclxuICAgICAgICAvLyBAdHMtaWdub3JlXHJcbiAgICAgICAgaWYodGVhbUxpc3RbbnVtYmVyXSE9SGVyb19UeXBlLk5VTEwmJnRlYW1MaXN0W251bWJlcl0hPS0xKXtcclxuICAgICAgICAgICAgdGhpcy5rb213ZWkuY2hpbGRyZW5bbnVtYmVyXS5nZXRDaGlsZEJ5TmFtZShcImhlcm9cIikuYWN0aXZlPXRydWUvL+iLsembhOW8gOWQr1xyXG4gICAgICAgICAgICB0aGlzLmtvbXdlaS5jaGlsZHJlbltudW1iZXJdLmdldENoaWxkQnlOYW1lKFwiUHJlcGFyZV9Wb2lkXCIpLmFjdGl2ZT1mYWxzZS8v6buR5b2x6ZqQ6JePXHJcbiAgICAgICAgICAgIHRoaXMua29td2VpLmNoaWxkcmVuW251bWJlcl0uZ2V0Q2hpbGRCeU5hbWUoXCJ3aW5UZXh0XCIpLmFjdGl2ZT1mYWxzZS8v5paH5a2X6ZqQ6JePXHJcbiAgICAgICAgICAgIHRoaXMua29td2VpLmNoaWxkcmVuW251bWJlcl0uZ2V0Q2hpbGRCeU5hbWUoXCJoZXJvU2hhZG93XCIpLmFjdGl2ZT10cnVlLy/pmLTlvbFcclxuICAgICAgICAgICAgdGhpcy5rb213ZWkuY2hpbGRyZW5bbnVtYmVyXS5nZXRDaGlsZEJ5TmFtZShcImhlcm9cIikuZ2V0Q29tcG9uZW50KHNwLlNrZWxldG9uKS5za2VsZXRvbkRhdGE9dGhpcy5zcFt0ZWFtTGlzdFtudW1iZXJdLTFdXHJcbiAgICAgICAgICAgIHRoaXMua29td2VpLmNoaWxkcmVuW251bWJlcl0uZ2V0Q2hpbGRCeU5hbWUoXCJoZXJvXCIpLmdldENvbXBvbmVudChzcC5Ta2VsZXRvbikuYW5pbWF0aW9uPVwiSWRsZVwiXHJcbiAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgIHRoaXMua29td2VpLmNoaWxkcmVuW251bWJlcl0uZ2V0Q2hpbGRCeU5hbWUoXCJoZXJvXCIpLmFjdGl2ZT1mYWxzZS8v6Iux6ZuE6ZqQ6JePXHJcbiAgICAgICAgICAgIHRoaXMua29td2VpLmNoaWxkcmVuW251bWJlcl0uZ2V0Q2hpbGRCeU5hbWUoXCJQcmVwYXJlX1ZvaWRcIikuYWN0aXZlPXRydWUvL+m7keW9seW8gOWQr1xyXG4gICAgICAgICAgICB0aGlzLmtvbXdlaS5jaGlsZHJlbltudW1iZXJdLmdldENoaWxkQnlOYW1lKFwid2luVGV4dFwiKS5hY3RpdmU9dHJ1ZS8v5paH5a2X5byA5ZCvXHJcbiAgICAgICAgICAgIHRoaXMua29td2VpLmNoaWxkcmVuW251bWJlcl0uZ2V0Q2hpbGRCeU5hbWUoXCJoZXJvU2hhZG93XCIpLmFjdGl2ZT1mYWxzZS8v6Zi05b2xXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgb25IZXJvVG91Y2hFbmQoZTpjYy5FdmVudC5FdmVudFRvdWNoKSB7XHJcbiAgICAgICAgaWYodGhpcy5jbGlja2hlcm9wb3NpdGlvbiE9LTEpe1xyXG4gICAgICAgICAgICB0aGlzLlNlbGZwb3NpdGlvbih0aGlzLmNsaWNraGVyb3Bvc2l0aW9uKVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIG9uSGVyb1RvdWNoQ2FuY2VsKGU6Y2MuRXZlbnQuRXZlbnRUb3VjaCkge1xyXG4gICAgICAgIGxldCB0b3VjaFRlYW09ZS5nZXRDdXJyZW50VGFyZ2V0KCk7XHJcbiAgICAgICAgbGV0IFNjcm9sbFZpZXdwb3M9dGhpcy5TY3JvbGxWaWUucGFyZW50LmNvbnZlcnRUb05vZGVTcGFjZUFSKGUuZ2V0TG9jYXRpb24oKSk7XHJcbiAgICAgICAgbGV0IHBvcz10aGlzLmtvbXdlaS5jb252ZXJ0VG9Ob2RlU3BhY2VBUihlLmdldExvY2F0aW9uKCkpO1xyXG4gICAgICAgIGxldCB0ZWFtTGlzdD1IZXJvTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldFRlYW1MaXN0KEdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuY3VyX2dhbWVfbW9kZSk7XHJcbiAgICAgICAgZm9yKGxldCBpPTA7IGk8dGhpcy5oZXJvX3RlYW1fcmVjdC5sZW5ndGg7IGkrKylcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGlmKHRoaXMuaGVyb190ZWFtX3JlY3RbaV0uY29udGFpbnMocG9zKT09dHJ1ZSlcclxuICAgICAgICAgICAgeyAgICBcclxuICAgICAgICAgICAgICAgIHRoaXMucHV0ZG93bmhlcm9wb3NpdGlvbj1pXHJcbiAgICAgICAgICAgICAgICB0aGlzLk1vdXNlLmFjdGl2ZT1mYWxzZVxyXG4gICAgICAgICAgICAgICAgbGV0IHRlYW1MaXN0cHV0ZG93bj10ZWFtTGlzdFt0aGlzLnB1dGRvd25oZXJvcG9zaXRpb25dXHJcbiAgICAgICAgICAgICAgICBsZXQgdGVhbUxpc3RjbGlja2hlcm89dGVhbUxpc3RbdGhpcy5jbGlja2hlcm9wb3NpdGlvbl1cclxuICAgICAgICAgICAgICAgIHRlYW1MaXN0W3RoaXMucHV0ZG93bmhlcm9wb3NpdGlvbl09dGVhbUxpc3RjbGlja2hlcm9cclxuICAgICAgICAgICAgICAgIHRlYW1MaXN0W3RoaXMuY2xpY2toZXJvcG9zaXRpb25dPXRlYW1MaXN0cHV0ZG93blxyXG4gICAgICAgICAgICAgICAgSGVyb01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zYXZlVGVhbUxpc3QoR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5jdXJfZ2FtZV9tb2RlLHRlYW1MaXN0KVxyXG4gICAgICAgICAgICAgICAgdGhpcy5TZWxmcG9zaXRpb24odGhpcy5wdXRkb3duaGVyb3Bvc2l0aW9uKVxyXG4gICAgICAgICAgICAgICAgdGhpcy5TZWxmcG9zaXRpb24odGhpcy5jbGlja2hlcm9wb3NpdGlvbilcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBpZih0aGlzLlNjcm9sbFZpZXdyZWN0LmNvbnRhaW5zKFNjcm9sbFZpZXdwb3MpPT10cnVlKXtcclxuICAgICAgICAgICAgdGhpcy5Nb3VzZS5hY3RpdmU9ZmFsc2VcclxuICAgICAgICAgICAgdGVhbUxpc3RbdGhpcy5jbGlja2hlcm9wb3NpdGlvbl09LTFcclxuICAgICAgICAgICAgSGVyb01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zYXZlVGVhbUxpc3QoR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5jdXJfZ2FtZV9tb2RlLHRlYW1MaXN0KVxyXG4gICAgICAgICAgICAvL+WIt+aWsOiLsembhGl0bWXnirbmgIFcclxuICAgICAgICAgICAgdGhpcy5SZWZyZXNoaGVyb2l0bWVzdGF0dXMoKVxyXG4gICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICB0aGlzLlNlbGZwb3NpdGlvbih0aGlzLmNsaWNraGVyb3Bvc2l0aW9uKVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIGluaXQodWlBYzogVWlBY3Rpb24pIHtcclxuICAgICAgICBzdXBlci5pbml0KHVpQWMpO1xyXG4gICAgICAgIC8v5Y+W5pys5qih5byPICDmnKzlhbPljaEgIOeahOaAqueJqeaVsOmHj+S4juexu+WeiyAgIGJvc3MgICDnsr7oi7EgICDmma7pgJpcclxuICAgICAgICBmb3IgKGxldCBpbmRleCA9IDA7IGluZGV4IDwgdGhpcy5rb213ZWkuY2hpbGRyZW4ubGVuZ3RoOyBpbmRleCsrKSB7XHJcbiAgICAgICAgICAgIGlmKEdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuY3VyX2dhbWVfbW9kZSE9R2FtZU1vZGUuQm9zc19DaGFsbGVuZ2UmJihpbmRleD09MHx8aW5kZXg9PTF8fGluZGV4PT0zfHxpbmRleD09NCkpe1xyXG4gICAgICAgICAgICAgICAgdGhpcy5rb213ZWkuY2hpbGRyZW5baW5kZXhdLmFjdGl2ZT1mYWxzZTtcclxuICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmtvbXdlaS5jaGlsZHJlbltpbmRleF0uYWN0aXZlPXRydWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgbGV0IGxldmVsPU1hcE1hbmFnZXIuQ3VycmVudGxldmVsLy9MZXZlbE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zdGFydF9sZXZlbDtcclxuICAgICAgICBsZXQgZmlnaHRpbmdJbmZvOkZpZ2h0aW5nSW5mbz1udWxsO1xyXG4gICAgICAgIHRoaXMuQ29tbW9uX0J0bl9CYWNrLmFjdGl2ZT10cnVlXHJcbiAgICAgICAgc3dpdGNoKEdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuY3VyX2dhbWVfbW9kZSl7XHJcbiAgICAgICAgICAgIGNhc2UgR2FtZU1vZGUuTWFpbjp7XHJcbiAgICAgICAgICAgICAgICBmaWdodGluZ0luZm89TWlzc2lvbkxldmVsTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldEZpZ2h0aW5nSW5mbyhsZXZlbCk7XHJcblxyXG4gICAgICAgICAgICB9YnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgR2FtZU1vZGUuRW5kbGVzczp7XHJcbiAgICAgICAgICAgICAgICBsZXQgd2F2ZW51bWJlcj1UaGVTdG9yYWdlTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldE51bWJlcihTdG9yYWdlS2V5LlVubGltaXRlZENoYWxsZW5nZURhbWFnZSwwKTsvL+azouaVsFxyXG4gICAgICAgICAgICAgICAgbGV0IFJvdW5kID1FbmRsZXNzTGV2ZWxzTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldFJvdW5kKHdhdmVudW1iZXIpLy/lm57lkIjmlbBcclxuICAgICAgICAgICAgICAgIGZpZ2h0aW5nSW5mbz1FbmRsZXNzTGV2ZWxzTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldEZpZ2h0aW5nSW5mbyhSb3VuZCk7XHJcbiAgICAgICAgICAgIH1icmVhaztcclxuICAgICAgICAgICAgY2FzZSBHYW1lTW9kZS5Cb3NzX0NoYWxsZW5nZTp7XHJcbiAgICAgICAgICAgICAgICBmaWdodGluZ0luZm89Qm9zc0NoYWxsZW5nZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRGaWdodGluZ0luZm8oQm9zc0NoYWxsZW5nZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5jdXJfY2hhbGxlbmdlX21vZGUpO1xyXG4gICAgICAgICAgICB9YnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgR2FtZU1vZGUuTWF6ZTp7XHJcbiAgICAgICAgICAgICAgICBmaWdodGluZ0luZm89TWF6ZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRGaWdodGluZ0luZm8odGhpcy5NYXplaWQpO1xyXG4gICAgICAgICAgICB9YnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgR2FtZU1vZGUuVG93ZXI6e1xyXG4gICAgICAgICAgICAgICAgZmlnaHRpbmdJbmZvPVRvd2VyTGV2ZWxNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0RmlnaHRpbmdJbmZvKFRvd2VyTWFuYWdlci5nZXRUb3dlckxldmVsKCkpO1xyXG4gICAgICAgICAgICB9YnJlYWs7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuUHJlcGFyZV9CdG5fTW9uc3Rlci5hY3RpdmU9dHJ1ZVxyXG4gICAgICAgIGxldCBsaXN0PWZpZ2h0aW5nSW5mby5nZXRPbmx5TW9uc3RlckRhdGFMaXN0KCk7XHJcbiAgICAgICAgdGhpcy5sZXZlbHR4dC5nZXRDb21wb25lbnQoY2MuTGFiZWwpLnN0cmluZz1cIlwiK2ZpZ2h0aW5nSW5mby50aXRsZV9uYW1lXHJcbiAgICAgICAgaWYoR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5jdXJfZ2FtZV9tb2RlPT1HYW1lTW9kZS5NYWluKXtcclxuICAgICAgICAgICAgbGV0IGNoYXB0ZXI9KE1pc3Npb25MZXZlbE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRDaGFwdGVyKGxldmVsKSktMVxyXG4gICAgICAgICAgICB0aGlzLm15YmouZ2V0Q29tcG9uZW50KGNjLlNwcml0ZSkuc3ByaXRlRnJhbWU9dGhpcy5ialtjaGFwdGVyXVxyXG4gICAgICAgICAgICB0aGlzLm15d2FsbC5nZXRDb21wb25lbnQoY2MuU3ByaXRlKS5zcHJpdGVGcmFtZT10aGlzLndhbGxbY2hhcHRlcl1cclxuICAgICAgICB9XHJcbiAgICAgICAgaWYoR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5jdXJfZ2FtZV9tb2RlPT1HYW1lTW9kZS5FbmRsZXNzKXtcclxuICAgICAgICAgICAgdGhpcy5teWJqLmdldENvbXBvbmVudChjYy5TcHJpdGUpLnNwcml0ZUZyYW1lPXRoaXMuYmdfRW5kbGVzc1xyXG4gICAgICAgICAgICB0aGlzLm15d2FsbC5nZXRDb21wb25lbnQoY2MuU3ByaXRlKS5zcHJpdGVGcmFtZT10aGlzLndhbGxbNF1cclxuICAgICAgICAgICAgdGhpcy5QcmVwYXJlX0J0bl9Nb25zdGVyLmFjdGl2ZT1mYWxzZVxyXG4gICAgICAgICAgICBsaXN0PVtdXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmKEdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuY3VyX2dhbWVfbW9kZT09R2FtZU1vZGUuQm9zc19DaGFsbGVuZ2Upe1xyXG5cclxuICAgICAgICAgICAgbGV0IFJvdGF0aW9uT3JkZXJzID0gVXNlckluZm8uZ2V0SW5zdGFuY2UoKS5Sb3RhdGlvbk9yZGVyLy/ova7mjaLpobrluo9cclxuICAgICAgICAgICAgbGV0IFN0YWdlID0gMS8v6Zi25q61XHJcbiAgICAgICAgICAgIGxldCBDaGFsbGVuZ2VJRCA9IFJvdGF0aW9uT3JkZXJzICogMTAwMCArIFN0YWdlLy/mjJHmiJhJRFxyXG4gICAgICAgICAgICBsZXQgUm90YXRpb25PcmRlciA9IEJvc3NDaGFsbGVuZ2VNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0Q2hhcHRlclNjZW5lKENoYWxsZW5nZUlEKS8vKFVzZXJJbmZvLmdldEluc3RhbmNlKCkuUm90YXRpb25PcmRlciktMS8v6L2u5o2i6aG65bqPXHJcbiAgICAgICAgICAgIHRoaXMubXliai5nZXRDb21wb25lbnQoY2MuU3ByaXRlKS5zcHJpdGVGcmFtZT10aGlzLmJqW1JvdGF0aW9uT3JkZXJdXHJcbiAgICAgICAgICAgIHRoaXMubXl3YWxsLmdldENvbXBvbmVudChjYy5TcHJpdGUpLnNwcml0ZUZyYW1lPXRoaXMud2FsbFtSb3RhdGlvbk9yZGVyXSAgICBcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYoR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5jdXJfZ2FtZV9tb2RlPT1HYW1lTW9kZS5NYXplKXtcclxuICAgICAgICAgICAgdGhpcy5teWJqLmdldENvbXBvbmVudChjYy5TcHJpdGUpLnNwcml0ZUZyYW1lPXRoaXMuYmdfTWF6ZVxyXG4gICAgICAgICAgICB0aGlzLm15d2FsbC5nZXRDb21wb25lbnQoY2MuU3ByaXRlKS5zcHJpdGVGcmFtZT10aGlzLmJnX3dhbGxcclxuICAgICAgICAgICAgdGhpcy5Db21tb25fQnRuX0JhY2suYWN0aXZlPWZhbHNlXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvL+WPluWHumJvc3NcclxuICAgICAgICBsZXQgYm9zc2Fycj1bXVxyXG4gICAgICAgIGxldCBqeWFycj1bXVxyXG4gICAgICAgIGxldCBwdXQ9W11cclxuICAgICAgICBmb3IgKGxldCBib3NzaW5kZXggPSAwOyBib3NzaW5kZXggPCBsaXN0Lmxlbmd0aDsgYm9zc2luZGV4KyspIHtcclxuICAgICAgICAgICAgaWYoTW9uc3RlckNvbmZpZ3VyZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRTdHJlbmd0aFR5cGUobGlzdFtib3NzaW5kZXhdLmlkKT09Myl7XHJcbiAgICAgICAgICAgICAgICBib3NzYXJyLnB1c2gobGlzdFtib3NzaW5kZXhdKVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmKE1vbnN0ZXJDb25maWd1cmVNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0U3RyZW5ndGhUeXBlKGxpc3RbYm9zc2luZGV4XS5pZCk9PTIpe1xyXG4gICAgICAgICAgICAgICAganlhcnIucHVzaChsaXN0W2Jvc3NpbmRleF0pXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYoTW9uc3RlckNvbmZpZ3VyZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRTdHJlbmd0aFR5cGUobGlzdFtib3NzaW5kZXhdLmlkKT09MSl7XHJcbiAgICAgICAgICAgICAgICBwdXQucHVzaChsaXN0W2Jvc3NpbmRleF0pXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgLy/mj5LlhaVcclxuICAgICAgICB0aGlzLk1vbnN0ZXJEZXRhaWxzYXJyLmxlbmd0aD0wXHJcbiAgICAgICAgdGhpcy5Nb25zdGVyRGV0YWlsc2Fyci5zcGxpY2UuYXBwbHkodGhpcy5Nb25zdGVyRGV0YWlsc2FycixbdGhpcy5Nb25zdGVyRGV0YWlsc2Fyci5sZW5ndGgsMF0uY29uY2F0KGJvc3NhcnIpKTtcclxuICAgICAgICB0aGlzLk1vbnN0ZXJEZXRhaWxzYXJyLnNwbGljZS5hcHBseSh0aGlzLk1vbnN0ZXJEZXRhaWxzYXJyLFt0aGlzLk1vbnN0ZXJEZXRhaWxzYXJyLmxlbmd0aCwwXS5jb25jYXQoanlhcnIpKTtcclxuICAgICAgICB0aGlzLk1vbnN0ZXJEZXRhaWxzYXJyLnNwbGljZS5hcHBseSh0aGlzLk1vbnN0ZXJEZXRhaWxzYXJyLFt0aGlzLk1vbnN0ZXJEZXRhaWxzYXJyLmxlbmd0aCwwXS5jb25jYXQocHV0KSk7XHJcbiAgICAgICAgLy/mgKrnianliLfmlrBcclxuICAgICAgICBmb3IgKGxldCBpbmRleCA9IDA7IGluZGV4IDwgdGhpcy5wb3MuY2hpbGRyZW4ubGVuZ3RoOyBpbmRleCsrKSB7XHJcbiAgICAgICAgICAgIGxldCB0eXBlPTBcclxuICAgICAgICAgICAgbGV0IGlkPTBcclxuICAgICAgICAgICAgLy8gY29uc29sZS5sb2coXCIqKioqKlwiLGJvc3NhcnIubGVuZ3RoLGp5YXJyLmxlbmd0aCxwdXQubGVuZ3RoKVxyXG4gICAgICAgICAgICBpZihpbmRleDxib3NzYXJyLmxlbmd0aCl7XHJcbiAgICAgICAgICAgICAgICBpZD1ib3NzYXJyW2luZGV4XS5pZFxyXG4gICAgICAgICAgICAgICAgdHlwZT1Nb25zdGVyQ29uZmlndXJlTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldE1vbnN0ZXJDbGFzcyhpZCk7XHJcblxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2UgaWYoaW5kZXg8KGJvc3NhcnIubGVuZ3RoK2p5YXJyLmxlbmd0aCkpe1xyXG5cclxuICAgICAgICAgICAgICAgIGlkPWp5YXJyWyhpbmRleC0oYm9zc2Fyci5sZW5ndGgpKV0uaWRcclxuICAgICAgICAgICAgICAgIHR5cGU9TW9uc3RlckNvbmZpZ3VyZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRNb25zdGVyQ2xhc3MoaWQpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2UgaWYoaW5kZXg8KGJvc3NhcnIubGVuZ3RoK2p5YXJyLmxlbmd0aCtwdXQubGVuZ3RoKSl7XHJcbiAgICAgICAgICAgICAgICBpZD1wdXRbKGluZGV4LWJvc3NhcnIubGVuZ3RoLWp5YXJyLmxlbmd0aCldLmlkXHJcbiAgICAgICAgICAgICAgICB0eXBlPU1vbnN0ZXJDb25maWd1cmVNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0TW9uc3RlckNsYXNzKGlkKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLmhlcm9TaGFkb3cuY2hpbGRyZW5baW5kZXhdLmFjdGl2ZT1mYWxzZVxyXG4gICAgICAgICAgICBpZih0eXBlPjApe1xyXG4gICAgICAgICAgICAgICAgbGV0IHBhdGggPSBcIm1vbnN0ZXIvdWkvTW9uc3Rlcl9cIiArIHR5cGU7XHJcbiAgICAgICAgICAgICAgICBsZXQgbm9kZTpjYy5Ob2RlID0gbnVsbDtcclxuXHJcbiAgICAgICAgICAgICAgICBXWE1hbmFnZXJFWC5nZXRJbnN0YW5jZSgpLnJlc291cmNlc0J1bmRsZS5sb2FkKHBhdGgsY2MuUHJlZmFiLChlcnJvcjogRXJyb3IsIGFzc2V0czpjYy5QcmVmYWIpPT57ICBcclxuICAgICAgICAgICAgICAgICAgICBpZihlcnJvcil7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNjLmxvZyhlcnJvcik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgbm9kZSA9IGNjLmluc3RhbnRpYXRlKGFzc2V0cyk7XHJcbiAgICAgICAgICAgICAgICAgICAgbm9kZS5zZXRQb3NpdGlvbigwLDAsMClcclxuICAgICAgICAgICAgICAgICAgICBub2RlLnNjYWxlID0gTW9uc3RlckNvbmZpZ3VyZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRTY2FsZShpZCk7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gY29uc29sZS5sb2coXCJpZDpcIixpZClcclxuICAgICAgICAgICAgICAgICAgICBsZXQgU3RyZW5ndGhUeXBlPSBNb25zdGVyQ29uZmlndXJlTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldFN0cmVuZ3RoVHlwZShpZClcclxuICAgICAgICAgICAgICAgICAgICBub2RlLnBhcmVudD10aGlzLnBvcy5jaGlsZHJlbltpbmRleF1cclxuXHJcblxyXG5cclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmhlcm9TaGFkb3cuY2hpbGRyZW5baW5kZXhdLmFjdGl2ZT10cnVlXHJcbiAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gY29uc29sZS5sb2coXCJfX19fX19fXCIsbm9kZSx0aGlzLnBvcy5jaGlsZHJlbltpbmRleF0pXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gaWYoKVxyXG4gICAgICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKFwiX19fX19fX19cIiwpXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gaWYoaW5kZXg8Ym9zc2Fyci5sZW5ndGgpe1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIGxldCBuYW1lPVN0cmluZyhub2RlLmdldENvbXBvbmVudChzcC5Ta2VsZXRvbikuZGVmYXVsdFNraW4pXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gY29uc29sZS5sb2coXCIrKysrKysrKysrK1wiLHR5cGUsU3RyZW5ndGhUeXBlKVxyXG4gICAgICAgICAgICAgICAgICAgIC8vIGlmKG5hbWUuc3Vic3RyaW5nKDAsNSk9PU1vbnN0ZXJGYWNlTmFtZS5Gcm9udCl7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYoU3RyZW5ndGhUeXBlPT0zKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5oZXJvU2hhZG93LmNoaWxkcmVuW2luZGV4XS5zZXRTY2FsZSgxLjMsMS4zKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBub2RlLnNjYWxlPU1vbnN0ZXJDb25maWd1cmVNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0U2NhbGUoaWQpKjAuNTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gbm9kZS5nZXRDb21wb25lbnQoc3AuU2tlbGV0b24pLnNldFNraW4oTW9uc3RlckZhY2VOYW1lLkZyb250ICsgTW9uc3RlckNvbmZpZ3VyZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRTa2luKGlkKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG5vZGUuZ2V0Q29tcG9uZW50KHNwLlNrZWxldG9uKS5zZXRBbmltYXRpb24oMCxNb25zdGVyQWN0aW9uTmFtZS5JZGxlLHRydWUpOy8vbm9kZS5nZXRDb21wb25lbnQoc3AuU2tlbGV0b24pLnNldEFuaW1hdGlvbigwLE1vbnN0ZXJGYWNlTmFtZS5Gcm9udCArIFwiX1wiICsgTW9uc3RlckFjdGlvbk5hbWUuSWRsZSx0cnVlKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYoU3RyZW5ndGhUeXBlPT0yKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5oZXJvU2hhZG93LmNoaWxkcmVuW2luZGV4XS5zZXRTY2FsZSgwLjcsMC43KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBub2RlLnNjYWxlPU1vbnN0ZXJDb25maWd1cmVNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0U2NhbGUoaWQpKjAuNjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbm9kZS5nZXRDb21wb25lbnQoc3AuU2tlbGV0b24pLnNldFNraW4oTW9uc3RlckZhY2VOYW1lLlNpZGVSICsgTW9uc3RlckNvbmZpZ3VyZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRTa2luKGlkKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG5vZGUuZ2V0Q29tcG9uZW50KHNwLlNrZWxldG9uKS5zZXRBbmltYXRpb24oMCxNb25zdGVyRmFjZU5hbWUuU2lkZVIrXCJfXCIrTW9uc3RlckFjdGlvbk5hbWUuSWRsZSx0cnVlKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYoU3RyZW5ndGhUeXBlPT0xKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5oZXJvU2hhZG93LmNoaWxkcmVuW2luZGV4XS5zZXRTY2FsZSgwLjQsMC40IClcclxuICAgICAgICAgICAgICAgICAgICAgICAgbm9kZS5zY2FsZT1Nb25zdGVyQ29uZmlndXJlTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldFNjYWxlKGlkKSowLjg7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG5vZGUuZ2V0Q29tcG9uZW50KHNwLlNrZWxldG9uKS5zZXRTa2luKE1vbnN0ZXJGYWNlTmFtZS5TaWRlUiArIE1vbnN0ZXJDb25maWd1cmVNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0U2tpbihpZCkpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBub2RlLmdldENvbXBvbmVudChzcC5Ta2VsZXRvbikuc2V0QW5pbWF0aW9uKDAsTW9uc3RlckZhY2VOYW1lLlNpZGVSK1wiX1wiK01vbnN0ZXJBY3Rpb25OYW1lLklkbGUsdHJ1ZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAvLyBsZXQgc2NhbGU9bm9kZS5zY2FsZVhcclxuICAgICAgICAgICAgICAgICAgICAvLyBsZXQgcm9tPU15VG9vbC5yYW5kb20oMCwxKVxyXG4gICAgICAgICAgICAgICAgICAgIC8vIGlmKHJvbT09MCl7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgIHNjYWxlPXNjYWxlKi0xXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gfVxyXG4gICAgICAgICAgICAgICAgICAgIC8vIG5vZGUuc2NhbGVYPXNjYWxlXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAvLyB9XHJcbiAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICB9XHJcbiAgICAgICAgLy/liLfmlrDoi7Hpm4RpdG1l54q25oCBXHJcbiAgICAgICAgdGhpcy5SZWZyZXNoaGVyb2l0bWVzdGF0dXMoKVxyXG4gICAgICAgIC8vIEhlcm9NYW5hZ2VyLmdldEluc3RhbmNlKCkuc2F2ZVRlYW1MaXN0KEdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuY3VyX2dhbWVfbW9kZSx0ZWFtTGlzdCk7Ly/lsIbmm7TmlLnkuYvlkI7nmoTpmLXlnovkv53mjIHliLDmnKzlnLBcclxuICAgICAgICBsZXQgY2FudmFzID0gY2MuZmluZChcIkNhbnZhc1wiKVxyXG4gICAgICAgIHRoaXMubm9kZS5nZXRDb21wb25lbnQoY2MuV2lkZ2V0KS50YXJnZXQ9Y2FudmFzXHJcbiAgICAgICAgdGhpcy5Nb25zdGVyLmFjdGl2ZT1mYWxzZVxyXG4gICAgICAgIHRoaXMuQ2hhcmlvdC5hY3RpdmU9ZmFsc2VcclxuICAgIH1cclxuICAgIC8v5Yi35paw6Iux6ZuEaXRtZeeKtuaAgVxyXG4gICAgUmVmcmVzaGhlcm9pdG1lc3RhdHVzKCl7XHJcbiAgICAgICAgLy/lt7Lop6PplIHnmoToi7Hpm4RcclxuICAgICAgICBsZXQgSGVyb0xpc3Q9SGVyb01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRIZXJvTGlzdCgpLy/mlbDph48gICDoi7Hpm4RpZOexu+WeiyDoi7Hpm4TnrYnnuqcg6Iux6ZuE5ZOB6LSoICDoi7Hpm4TmmJ/mmJ/pmLbmrrVcclxuICAgICAgICBsZXQgaGVyb0Jhc2ljZGF0YWFycj1bXS8v5pyA6auY5oiY5Yqb5pWw57uEXHJcbiAgICAgICAgbGV0IEhlcm9MaXN0YXJyPUhlcm9MaXN0Ly/lt7Lop6PplIHnmoToi7Hpm4RcclxuICAgICAgICAvL+eUn+aIkOiLsembhGl0bWVcclxuICAgICAgICBmb3IgKGxldCBoZXJvaW5kZXggPSB0aGlzLmd1YWl3dWFyci5sZW5ndGg7IGhlcm9pbmRleCA8IEhlcm9MaXN0Lmxlbmd0aDsgaGVyb2luZGV4KyspIHtcclxuICAgICAgICAgICAgbGV0IGhlcm8gPSBjYy5pbnN0YW50aWF0ZSh0aGlzLmhlcm9faXRlbSk7XHJcbiAgICAgICAgICAgIGhlcm8ubmFtZT1cIlwiK2hlcm9pbmRleFxyXG4gICAgICAgICAgICBoZXJvLnNldFNjYWxlKDAuNzUsMC43NSlcclxuICAgICAgICAgICAgaGVyby5wYXJlbnQ9dGhpcy5jb250ZW50XHJcbiAgICAgICAgICAgIHRoaXMuZ3VhaXd1YXJyLnB1c2goaGVybylcclxuICAgICAgICAgICAgLy8gaGVyby5vbihjYy5Ob2RlLkV2ZW50VHlwZS5UT1VDSF9TVEFSVCwgdGhpcy5vbkhlcm9JdGVtVG91Y2hTdGFydCwgdGhpcyk7XHJcbiAgICAgICAgICAgIC8vIGhlcm8ub24oY2MuTm9kZS5FdmVudFR5cGUuVE9VQ0hfTU9WRSwgdGhpcy5vbkhlcm9JdGVtVG91Y2hNb3ZlLCB0aGlzKTtcclxuICAgICAgICAgICAgaGVyby5vbihjYy5Ob2RlLkV2ZW50VHlwZS5UT1VDSF9FTkQsIHRoaXMub25IZXJvSXRlbVRvdWNoRW5kLCB0aGlzKTtcclxuICAgICAgICAgICAgLy8gaGVyby5vbihjYy5Ob2RlLkV2ZW50VHlwZS5UT1VDSF9DQU5DRUwsIHRoaXMub25IZXJvSXRlbVRvdWNoQ2FuY2VsLCB0aGlzKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy/liLfmlrDoi7Hpm4RpdG1lXHJcbiAgICAgICAgZm9yIChsZXQgaGVyb0Jhc2ljZGF0YWluZGV4ID0gMDsgaGVyb0Jhc2ljZGF0YWluZGV4IDwgSGVyb0xpc3QubGVuZ3RoOyBoZXJvQmFzaWNkYXRhaW5kZXgrKykge1xyXG4gICAgICAgICAgICBsZXQgaGVyb0Jhc2ljZGF0YT1IZXJvTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldEhlcm9EYXRhKEhlcm9MaXN0W2hlcm9CYXNpY2RhdGFpbmRleF0uaGVyb190eXBlKS8v6Iux6ZuE55qE5Z+656GA5pWw5o2uICAg5Lyg5YWl6Iux6ZuEaWTnsbvlnosgIOmYsuW+oeWKmyAg55Sf5ZG95YC8ICDlkb3kuK3lgLwgXHJcbiAgICAgICAgICAgIGhlcm9CYXNpY2RhdGFhcnIucHVzaChoZXJvQmFzaWNkYXRhLnRvdGFsX2F0dGFjaylcclxuICAgICAgICB9XHJcbiAgICAgICAgLy/mjpLliJfoi7Hpm4TmiJjliptcclxuICAgICAgICBsZXQgY3VuXHJcbiAgICAgICAgbGV0IGhlcm9jdW5cclxuICAgICAgICBmb3IgKGxldCBpbmRleCA9IDA7IGluZGV4IDwgaGVyb0Jhc2ljZGF0YWFyci5sZW5ndGg7IGluZGV4KyspIHtcclxuICAgICAgICAgICAgZm9yIChsZXQgcGFpeHZpbmRleCA9IDA7IHBhaXh2aW5kZXggPCBoZXJvQmFzaWNkYXRhYXJyLmxlbmd0aC0xOyBwYWl4dmluZGV4KyspIHtcclxuICAgICAgICAgICAgICAgIGlmKGhlcm9CYXNpY2RhdGFhcnJbcGFpeHZpbmRleCsxXT5oZXJvQmFzaWNkYXRhYXJyW3BhaXh2aW5kZXhdKXtcclxuICAgICAgICAgICAgICAgICAgICBjdW49aGVyb0Jhc2ljZGF0YWFycltwYWl4dmluZGV4XVxyXG4gICAgICAgICAgICAgICAgICAgIGhlcm9CYXNpY2RhdGFhcnJbcGFpeHZpbmRleF09aGVyb0Jhc2ljZGF0YWFycltwYWl4dmluZGV4KzFdXHJcbiAgICAgICAgICAgICAgICAgICAgaGVyb0Jhc2ljZGF0YWFycltwYWl4dmluZGV4KzFdPWN1blxyXG5cclxuICAgICAgICAgICAgICAgICAgICBoZXJvY3VuPUhlcm9MaXN0YXJyW3BhaXh2aW5kZXhdXHJcbiAgICAgICAgICAgICAgICAgICAgSGVyb0xpc3RhcnJbcGFpeHZpbmRleF09SGVyb0xpc3RhcnJbcGFpeHZpbmRleCsxXVxyXG4gICAgICAgICAgICAgICAgICAgIEhlcm9MaXN0YXJyW3BhaXh2aW5kZXgrMV09aGVyb2N1blxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGxldCB0ZWFtTGlzdD1IZXJvTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldFRlYW1MaXN0KEdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuY3VyX2dhbWVfbW9kZSk7XHJcblxyXG4gICAgICAgIC8vIGNvbnNvbGUubG9nKFwiKysrKysrXCIsdGVhbUxpc3QpXHJcbiAgICAgICAgdGhpcy5ncmV5YnV0dG9uanVkZ21lbnQ9MC8v54Gw6Imy5oyJ6ZKu5Yik5patIOWmguaenOayoeacieS4gOS4quiLsembhOS4iumYtSAg5LiN5Y+v5byA5ZCv5ri45oiPXHJcblxyXG4gICAgICAgIGxldCAgR290b2JhdHRsZW51bWJlcj0wLy/kuIrpmLXkuoblh6DkuKroi7Hpm4RcclxuICAgICAgICBmb3IobGV0IGk9MDsgaTx0ZWFtTGlzdC5sZW5ndGg7IGkrKykgXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBsZXQgaGVyb1R5cGU9dGVhbUxpc3RbaV07XHJcbiAgICAgICAgICAgIGlmKGhlcm9UeXBlPjApXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIEdvdG9iYXR0bGVudW1iZXIrK1xyXG5cclxuICAgICAgICAgICAgICAgIHRoaXMuZ3JleWJ1dHRvbmp1ZGdtZW50PTFcclxuICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKFwiKysrKysrXCIsaGVyb1R5cGUpXHJcbiAgICAgICAgICAgICAgICB0aGlzLmtvbXdlaS5jaGlsZHJlbltpXS5nZXRDaGlsZEJ5TmFtZShcIlByZXBhcmVfVm9pZFwiKS5hY3RpdmU9ZmFsc2VcclxuICAgICAgICAgICAgICAgIHRoaXMua29td2VpLmNoaWxkcmVuW2ldLmdldENoaWxkQnlOYW1lKFwid2luVGV4dFwiKS5hY3RpdmU9ZmFsc2VcclxuICAgICAgICAgICAgICAgIHRoaXMua29td2VpLmNoaWxkcmVuW2ldLmdldENoaWxkQnlOYW1lKFwiaGVyb1NoYWRvd1wiKS5hY3RpdmU9dHJ1ZS8v6Zi05b2xXHJcbiAgICAgICAgICAgICAgICB0aGlzLmtvbXdlaS5jaGlsZHJlbltpXS5nZXRDaGlsZEJ5TmFtZShcImhlcm9cIikuYWN0aXZlPXRydWVcclxuICAgICAgICAgICAgICAgIHRoaXMua29td2VpLmNoaWxkcmVuW2ldLmdldENoaWxkQnlOYW1lKFwiaGVyb1wiKS5nZXRDb21wb25lbnQoc3AuU2tlbGV0b24pLnNrZWxldG9uRGF0YT10aGlzLnNwWyhoZXJvVHlwZS0xKV1cclxuICAgICAgICAgICAgICAgIHRoaXMua29td2VpLmNoaWxkcmVuW2ldLmdldENoaWxkQnlOYW1lKFwiaGVyb1wiKS5nZXRDb21wb25lbnQoc3AuU2tlbGV0b24pLmFuaW1hdGlvbj1cIklkbGVcIlxyXG4gICAgICAgICAgICAgICAgLy8gdGhpcy5sb2FkSGVybyhoZXJvVHlwZSxpKVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2V7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmtvbXdlaS5jaGlsZHJlbltpXS5nZXRDaGlsZEJ5TmFtZShcIndpblRleHRcIikuYWN0aXZlPXRydWVcclxuICAgICAgICAgICAgICAgIHRoaXMua29td2VpLmNoaWxkcmVuW2ldLmdldENoaWxkQnlOYW1lKFwiaGVyb1NoYWRvd1wiKS5hY3RpdmU9ZmFsc2UvL+mYtOW9sVxyXG4gICAgICAgICAgICAgICAgdGhpcy5rb213ZWkuY2hpbGRyZW5baV0uZ2V0Q2hpbGRCeU5hbWUoXCJQcmVwYXJlX1ZvaWRcIikuYWN0aXZlPXRydWVcclxuICAgICAgICAgICAgICAgIHRoaXMua29td2VpLmNoaWxkcmVuW2ldLmdldENoaWxkQnlOYW1lKFwiaGVyb1wiKS5hY3RpdmU9ZmFsc2VcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICAvLyBjb25zb2xlLmxvZyhcIl9fX19fX19cIixHb3RvYmF0dGxlbnVtYmVyKVxyXG4gICAgICAgIGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCBHb3RvYmF0dGxlbnVtYmVyOyBpbmRleCsrKSB7XHJcbiAgICAgICAgICAgIGlmKEdvdG9iYXR0bGVudW1iZXIgPiBUYXNrTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldFRhc2tOb3dQcm9ncmVzcyhUYXNrSXRlbS7kuIrpmLVY5ZCN6Iux6ZuEKSl7XHJcbiAgICAgICAgICAgICAgICBUYXNrTWFuYWdlci5nZXRJbnN0YW5jZSgpLmVtaXRUYXNrKFRhc2tJdGVtLuS4iumYtVjlkI3oi7Hpm4QpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZih0aGlzLmdyZXlidXR0b25qdWRnbWVudD09MCl7XHJcbiAgICAgICAgICAgIHRoaXMuQ29tbW9uX0J0bl8wLmdldENoaWxkQnlOYW1lKFwiTGFiZWxcIikuZ2V0Q29tcG9uZW50KFRleHRMYW5ndWFnZSkuc2V0TWF0ZXJpYWwoMCwgY2MuTWF0ZXJpYWwuZ2V0QnVpbHRpbk1hdGVyaWFsKFwiMmQtZ3JheS1zcHJpdGVcIikpO1xyXG4gICAgICAgICAgICB0aGlzLkNvbW1vbl9CdG5fMC5nZXRDb21wb25lbnQoY2MuU3ByaXRlKS5zZXRNYXRlcmlhbCgwLCBjYy5NYXRlcmlhbC5nZXRCdWlsdGluTWF0ZXJpYWwoXCIyZC1ncmF5LXNwcml0ZVwiKSk7XHJcbiAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgIHRoaXMuQ29tbW9uX0J0bl8wLmdldENoaWxkQnlOYW1lKFwiTGFiZWxcIikuZ2V0Q29tcG9uZW50KFRleHRMYW5ndWFnZSkuc2V0TWF0ZXJpYWwoMCwgY2MuTWF0ZXJpYWwuZ2V0QnVpbHRpbk1hdGVyaWFsKFwiMmQtc3ByaXRlXCIpKTtcclxuICAgICAgICAgICAgdGhpcy5Db21tb25fQnRuXzAuZ2V0Q29tcG9uZW50KGNjLlNwcml0ZSkuc2V0TWF0ZXJpYWwoMCwgY2MuTWF0ZXJpYWwuZ2V0QnVpbHRpbk1hdGVyaWFsKFwiMmQtc3ByaXRlXCIpKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8v5Yi35paw6Iux6ZuEaXRtZeeKtuaAgVxyXG4gICAgICAgIC8v6KGA6YePXHJcbiAgICAgICAgbGV0IGpkdG51bWJlcj0wXHJcbiAgICAgICAgZm9yIChsZXQgc2h1YXhpbmdpbmRleCA9IDA7IHNodWF4aW5naW5kZXggPCBIZXJvTGlzdGFyci5sZW5ndGg7IHNodWF4aW5naW5kZXgrKykge1xyXG4gICAgICAgICAgICB0aGlzLmd1YWl3dWFycltzaHVheGluZ2luZGV4XS5nZXRDb21wb25lbnQoSGVyb0l0ZW0pLlJlZnJlc2hIZXJvZXNJdGVtKEhlcm9MaXN0YXJyW3NodWF4aW5naW5kZXhdLmhlcm9fdHlwZSlcclxuICAgICAgICAgICAgZm9yIChsZXQgdGVhbUxpc3RpbmRleCA9IDA7IHRlYW1MaXN0aW5kZXggPCB0ZWFtTGlzdC5sZW5ndGg7IHRlYW1MaXN0aW5kZXgrKykge1xyXG4gICAgICAgICAgICAgICAgaWYodGVhbUxpc3RbdGVhbUxpc3RpbmRleF09PUhlcm9MaXN0YXJyW3NodWF4aW5naW5kZXhdLmhlcm9fdHlwZSl7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5ndWFpd3VhcnJbc2h1YXhpbmdpbmRleF0uZ2V0Q2hpbGRCeU5hbWUoXCJzaGFuZ3poZW5nXCIpLmFjdGl2ZT10cnVlXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGZvciAobGV0IHh1ZWxpbmRleCA9IDA7IHh1ZWxpbmRleCA8IHRlYW1MaXN0Lmxlbmd0aDsgeHVlbGluZGV4KyspIHtcclxuICAgICAgICAgICAgaWYodGVhbUxpc3RbeHVlbGluZGV4XT4wKXtcclxuICAgICAgICAgICAgICAgIGpkdG51bWJlcis9SGVyb01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRIZXJvRGF0YSh0ZWFtTGlzdFt4dWVsaW5kZXhdKS50b3RhbF9ocC8v6Iux6ZuE55qE5Z+656GA5pWw5o2uICAg5Lyg5YWl6Iux6ZuEaWTnsbvlnosgIOmYsuW+oeWKmyAg55Sf5ZG95YC8ICDlkb3kuK3lgLwgIFxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vIGNjLmxvZyhNYXRoLnJvdW5kKDEuMTExKSk7Ly8xXHJcbiAgICAgICAgamR0bnVtYmVyPU1hdGgucm91bmQoamR0bnVtYmVyLzUpXHJcbiAgICAgICAgLy8gY29uc29sZS5sb2coXCJfX19fX19fXCIsamR0bnVtYmVyKVxyXG4gICAgICAgIC8v5Yi35paw6KGA6YePXHJcbiAgICAgICAgdGhpcy5qZHQuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmc9XCJcIitqZHRudW1iZXIrXCIvXCIrXCJcIitqZHRudW1iZXJcclxuICAgIH1cclxuICAgIC8vIG9uSGVyb0l0ZW1Ub3VjaFN0YXJ0KGU6Y2MuRXZlbnQuRXZlbnRUb3VjaCkge1xyXG4gICAgLy8gICAgIGxldCB0b3VjaFRlYW09ZS5nZXRDdXJyZW50VGFyZ2V0KCk7XHJcbiAgICAvLyAgICAgY29uc29sZS5sb2coXCLngrnlh7vvvJpcIix0b3VjaFRlYW0ubmFtZSlcclxuICAgIC8vICAgICB0aGlzLlNjcm9sbFZpZXdzLmdldENvbXBvbmVudChjYy5TY3JvbGxWaWV3KS5lbmFibGVkPWZhbHNlXHJcbiAgICAvLyAgICAgLy/lpoLmnpzov5nkuKroi7Hpm4TmsqHmnInkuIrpmLUgICDlsLHlj6/ku6Xmi5blh7rov5nkuKroi7Hpm4RcclxuICAgIC8vICAgICBpZih0b3VjaFRlYW0uZ2V0Q2hpbGRCeU5hbWUoXCJzaGFuZ3poZW5nXCIpLmFjdGl2ZT09ZmFsc2Upe1xyXG4gICAgLy8gICAgICAgICBsZXQgcG9zPXRoaXMua29td2VpLmNvbnZlcnRUb05vZGVTcGFjZUFSKGUuZ2V0TG9jYXRpb24oKSk7XHJcbiAgICAvLyAgICAgICAgIHRoaXMuTW91c2VpdGVtLmdldENvbXBvbmVudChIZXJvSXRlbSkuaGVyb1R5cGU9dG91Y2hUZWFtLmdldENvbXBvbmVudChIZXJvSXRlbSkuaGVyb1R5cGVcclxuICAgIC8vICAgICAgICAgdGhpcy5Nb3VzZWl0ZW0uZ2V0Q29tcG9uZW50KEhlcm9JdGVtKS5SZWZyZXNoSGVyb2VzSXRlbSh0b3VjaFRlYW0uZ2V0Q29tcG9uZW50KEhlcm9JdGVtKS5oZXJvVHlwZSlcclxuICAgIC8vICAgICAgICAgdGhpcy5Nb3VzZWl0ZW0uc2V0UG9zaXRpb24ocG9zKVxyXG4gICAgLy8gICAgICAgICB0aGlzLk1vdXNlaXRlbS5hY3RpdmU9dHJ1ZVxyXG4gICAgLy8gICAgIH1lbHNle1xyXG4gICAgLy8gICAgICAgICBHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNob3dNZXNzYWdlKExhbmd1YWdlTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldFN0ckJ5VGV4dElkKDEwMDA5MSkpXHJcbiAgICAvLyAgICAgfVxyXG4gICAgLy8gfVxyXG4gICAgLy8gb25IZXJvSXRlbVRvdWNoTW92ZShlOmNjLkV2ZW50LkV2ZW50VG91Y2gpIHtcclxuICAgIC8vICAgICBsZXQgdG91Y2hUZWFtPWUuZ2V0Q3VycmVudFRhcmdldCgpO1xyXG4gICAgLy8gICAgIGNvbnNvbGUubG9nKFwi56e75Yqo77yaXCIsdG91Y2hUZWFtLm5hbWUpXHJcbiAgICAvLyAgICAgLy/mi5bliqjov5nkuKroi7Hpm4RcclxuICAgIC8vICAgICBpZih0b3VjaFRlYW0uZ2V0Q2hpbGRCeU5hbWUoXCJzaGFuZ3poZW5nXCIpLmFjdGl2ZT09ZmFsc2UmJnRoaXMuTW91c2VpdGVtLmFjdGl2ZT09dHJ1ZSl7XHJcbiAgICAvLyAgICAgICAgIGxldCBwb3M9dGhpcy5rb213ZWkuY29udmVydFRvTm9kZVNwYWNlQVIoZS5nZXRMb2NhdGlvbigpKTtcclxuICAgIC8vICAgICAgICAgdGhpcy5Nb3VzZWl0ZW0uc2V0UG9zaXRpb24ocG9zKVxyXG4gICAgLy8gICAgIH1lbHNle1xyXG4gICAgLy8gICAgICAgICBHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNob3dNZXNzYWdlKExhbmd1YWdlTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldFN0ckJ5VGV4dElkKDEwMDA5MSkpXHJcbiAgICAvLyAgICAgfVxyXG4gICAgLy8gfVxyXG4gICAgb25IZXJvSXRlbVRvdWNoRW5kKGU6Y2MuRXZlbnQuRXZlbnRUb3VjaCkge1xyXG4gICAgICAgIGxldCB0b3VjaFRlYW09ZS5nZXRDdXJyZW50VGFyZ2V0KCk7XHJcbiAgICAgICAgLy8gY29uc29sZS5sb2coXCLlnKjph4zpnaLmlL7lvIBcIix0b3VjaFRlYW0ubmFtZSlcclxuICAgICAgICB0aGlzLlNjcm9sbFZpZXdzLmdldENvbXBvbmVudChjYy5TY3JvbGxWaWV3KS5lbmFibGVkPXRydWVcclxuICAgICAgICBpZih0b3VjaFRlYW0uZ2V0Q2hpbGRCeU5hbWUoXCJzaGFuZ3poZW5nXCIpLmFjdGl2ZT09ZmFsc2Upe1xyXG4gICAgICAgICAgICAvL+S4iumYteivpeiLsembhFxyXG4gICAgICAgICAgICBsZXQgdGVhbUxpc3Q9SGVyb01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRUZWFtTGlzdChHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLmN1cl9nYW1lX21vZGUpO1xyXG4gICAgICAgICAgICBpZihHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLmN1cl9nYW1lX21vZGU9PUdhbWVNb2RlLkJvc3NfQ2hhbGxlbmdlKXtcclxuICAgICAgICAgICAgICAgIGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCB0ZWFtTGlzdC5sZW5ndGg7IGluZGV4KyspIHtcclxuICAgICAgICAgICAgICAgICAgICAvLyBAdHMtaWdub3JlXHJcbiAgICAgICAgICAgICAgICAgICAgaWYodGVhbUxpc3RbaW5kZXhdPT0tMXx8dGVhbUxpc3RbaW5kZXhdPT1IZXJvX1R5cGUuTlVMTCl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRlYW1MaXN0W2luZGV4XT10b3VjaFRlYW0uZ2V0Q29tcG9uZW50KEhlcm9JdGVtKS5oZXJvX3R5cGVcclxuICAgICAgICAgICAgICAgICAgICAgICAgSGVyb01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zYXZlVGVhbUxpc3QoR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5jdXJfZ2FtZV9tb2RlLHRlYW1MaXN0KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLlJlZnJlc2hoZXJvaXRtZXN0YXR1cygpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVyblxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICBpZih0ZWFtTGlzdFsyXT09LTF8fHRlYW1MaXN0WzJdPT1IZXJvX1R5cGUuTlVMTCl7XHJcbiAgICAgICAgICAgICAgICAgICAgdGVhbUxpc3RbMl09dG91Y2hUZWFtLmdldENvbXBvbmVudChIZXJvSXRlbSkuaGVyb190eXBlXHJcbiAgICAgICAgICAgICAgICAgICAgSGVyb01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zYXZlVGVhbUxpc3QoR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5jdXJfZ2FtZV9tb2RlLHRlYW1MaXN0KVxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuUmVmcmVzaGhlcm9pdG1lc3RhdHVzKClcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm5cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgLy8gZm9yIChsZXQgaW5kZXggPSAwOyBpbmRleCA8IHRlYW1MaXN0Lmxlbmd0aDsgaW5kZXgrKykge1xyXG4gICAgICAgICAgICAvLyAgICAgLy8gQHRzLWlnbm9yZVxyXG4gICAgICAgICAgICAvLyAgICAgaWYoaW5kZXghPTIpe1xyXG4gICAgICAgICAgICAvLyAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgLy8gICAgIH1cclxuICAgICAgICAgICAgLy8gICAgIGlmKHRlYW1MaXN0W2luZGV4XT09LTF8fHRlYW1MaXN0W2luZGV4XT09SGVyb19UeXBlLk5VTEwpe1xyXG4gICAgICAgICAgICAvLyAgICAgICAgIHRlYW1MaXN0W2luZGV4XT10b3VjaFRlYW0uZ2V0Q29tcG9uZW50KEhlcm9JdGVtKS5oZXJvX3R5cGVcclxuICAgICAgICAgICAgLy8gICAgICAgICBIZXJvTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNhdmVUZWFtTGlzdChHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLmN1cl9nYW1lX21vZGUsdGVhbUxpc3QpXHJcbiAgICAgICAgICAgIC8vICAgICAgICAgdGhpcy5SZWZyZXNoaGVyb2l0bWVzdGF0dXMoKVxyXG4gICAgICAgICAgICAvLyAgICAgICAgIHJldHVyblxyXG4gICAgICAgICAgICAvLyAgICAgfVxyXG4gICAgICAgICAgICAvLyB9XHJcbiAgICAgICAgICAgIEdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuc2hvd01lc3NhZ2UoTGFuZ3VhZ2VNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0U3RyQnlUZXh0SWQoMTMwMDEzKSlcclxuICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zaG93TWVzc2FnZShMYW5ndWFnZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRTdHJCeVRleHRJZCgxMDAwOTEpKVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIC8vIG9uSGVyb0l0ZW1Ub3VjaENhbmNlbChlOmNjLkV2ZW50LkV2ZW50VG91Y2gpIHtcclxuICAgIC8vICAgICBsZXQgdG91Y2hUZWFtPWUuZ2V0Q3VycmVudFRhcmdldCgpO1xyXG4gICAgLy8gICAgIHRoaXMuU2Nyb2xsVmlld3MuZ2V0Q29tcG9uZW50KGNjLlNjcm9sbFZpZXcpLmVuYWJsZWQ9dHJ1ZVxyXG4gICAgLy8gICAgIGNvbnNvbGUubG9nKFwi5Zyo5aSW6Z2i5pS+5byAXCIsdG91Y2hUZWFtLm5hbWUpXHJcbiAgICAvLyAgICAgbGV0IHRlYW1MaXN0PUhlcm9NYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0VGVhbUxpc3QoR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5jdXJfZ2FtZV9tb2RlKTtcclxuICAgIC8vICAgICBsZXQgcG9zPXRoaXMua29td2VpLmNvbnZlcnRUb05vZGVTcGFjZUFSKGUuZ2V0TG9jYXRpb24oKSk7XHJcblxyXG5cclxuXHJcbiAgICAvLyAgICAgaWYodG91Y2hUZWFtLmdldENoaWxkQnlOYW1lKFwic2hhbmd6aGVuZ1wiKS5hY3RpdmU9PWZhbHNlJiZ0aGlzLk1vdXNlaXRlbS5hY3RpdmU9PXRydWUpe1xyXG4gICAgLy8gICAgICAgICAvL+WmguaenOWcqOS4iumYteepuuS9jeS4reS4lOi/meS4quS9jee9ruayoeacieiLsembhCDlsLHkuIrpmLXoi7Hpm4QgICDlpoLmnpzov5nkuKrkvY3nva7mnInoi7Hpm4QgICDlsLHkuIvpmLXov5nkuKrkvY3nva7nmoToi7Hpm4QgICDlnKjkuIrpmLXoi7Hpm4RcclxuICAgIC8vICAgICAgICAgdGhpcy5Nb3VzZWl0ZW0uYWN0aXZlPWZhbHNlXHJcblxyXG5cclxuICAgIC8vICAgICAgICAgZm9yKGxldCBpPTA7IGk8dGhpcy5oZXJvX3RlYW1fcmVjdC5sZW5ndGg7IGkrKylcclxuICAgIC8vICAgICAgICAge1xyXG4gXHJcbiAgICAvLyAgICAgICAgICAgICBpZih0aGlzLmhlcm9fdGVhbV9yZWN0W2ldLmNvbnRhaW5zKHBvcyk9PXRydWUpXHJcbiAgICAvLyAgICAgICAgICAgICB7ICAgXHJcbiAgICAvLyAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCLmmK/lkKblnKjnqbrkvY3ph4zpnaLvvJpcIix0aGlzLmhlcm9fdGVhbV9yZWN0W2ldLHBvcylcclxuICAgIC8vICAgICAgICAgICAgICAgICAvLyBpZih0ZWFtTGlzdFtpXT09SGVyb19UeXBlLk5VTEx8fHRlYW1MaXN0W2ldPT0tMSl7XHJcbiAgICAvLyAgICAgICAgICAgICAgICAgICAgIHRlYW1MaXN0W2ldPXRoaXMuTW91c2VpdGVtLmdldENvbXBvbmVudChIZXJvSXRlbSkuaGVyb1R5cGVcclxuICAgIC8vICAgICAgICAgICAgICAgICAvLyB9ZWxzZXtcclxuICAgIC8vICAgICAgICAgICAgICAgICAgICAgLy8gdGVhbUxpc3RbaV09LTFcclxuICAgIC8vICAgICAgICAgICAgICAgICAvLyB9XHJcblxyXG4gICAgLy8gICAgICAgICAgICAgICAgIEhlcm9NYW5hZ2VyLmdldEluc3RhbmNlKCkuc2F2ZVRlYW1MaXN0KEdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuY3VyX2dhbWVfbW9kZSx0ZWFtTGlzdClcclxuICAgIC8vICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIueOsOWcqOeahOiLsembhOWIl+ihqO+8mlwiLHRlYW1MaXN0KVxyXG4gICAgLy8gICAgICAgICAgICAgICAgIHRoaXMuU2VsZnBvc2l0aW9uKGkpXHJcblxyXG4gICAgLy8gICAgICAgICAgICAgICAgIHRoaXMuUmVmcmVzaGhlcm9pdG1lc3RhdHVzKClcclxuICAgIC8vICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAvLyAgICAgICAgICAgICB9XHJcbiAgICAvLyAgICAgICAgIH1cclxuICAgIC8vICAgICAgICAgdGhpcy5SZWZyZXNoaGVyb2l0bWVzdGF0dXMoKVxyXG4gICAgLy8gICAgIH1cclxuICAgICAgICAgICAgXHJcbiAgICAvLyB9XHJcbiAgICAvLyBzZXRMZXZlbERhdGEoKVxyXG4gICAgLy8ge1xyXG4gICAgLy8gICAgIExldmVsTWFuYWdlci5nZXRJbnN0YW5jZSgpLnN0YXJ0X2xldmVsPXRoaXMuY3VyX3NlbGVjdGVkX2xldmVsO1xyXG4gICAgLy8gICAgIGxldCBnbT1HYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpO1xyXG4gICAgLy8gICAgIGdtLmxldmVsX2RhdGFzPW5ldyBBcnJheSgpO1xyXG4gICAgLy8gICAgIGdtLmxldmVsX2RhdGFzPU1pc3Npb25MZXZlbE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRMZXZlbERhdGFzKHRoaXMuY3VyX3NlbGVjdGVkX2xldmVsKTtcclxuICAgIC8vIH1cclxuICAgIC8vIGxvYWRIZXJvKGhlcm9UeXBlOkhlcm9fVHlwZSxwb3NJbmRleDpudW1iZXIpXHJcbiAgICAvLyB7ICAgICAgICBcclxuICAgIC8vICAgICBIZXJvLm1heF9sb2FkX251bSsrO1xyXG4gICAgLy8gICAgIGxldCBwb3NYPXBvc0luZGV4KjEyOC0xOTI7XHJcbiAgICAvLyAgICAgY2MucmVzb3VyY2VzLmxvYWQoJ2hlcm9zL2hlcm8nK2hlcm9UeXBlLGNjLlByZWZhYiwoZXJyb3I6IEVycm9yLCBhc3NldHM6Y2MuUHJlZmFiKT0+e1xyXG4gICAgLy8gICAgICAgICBpZihlcnJvcilcclxuICAgIC8vICAgICAgICAge1xyXG4gICAgLy8gICAgICAgICAgICAgY29uc29sZS5sb2coZXJyb3IpO1xyXG4gICAgLy8gICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgLy8gICAgICAgICB9XHJcbiAgICAvLyAgICAgICAgIGxldCBub2RlPWNjLmluc3RhbnRpYXRlKGFzc2V0cyk7XHJcbiAgICAvLyAgICAgICAgIG5vZGUucGFyZW50PXRoaXMua29td2VpO1xyXG4gICAgLy8gICAgICAgICBub2RlLng9cG9zWDtcclxuICAgIC8vICAgICAgICAgLy8gbGV0IGhwPWNjLmZpbmQoJ0NhbnZhcy9VaV9Sb290L3dhbGxfcm9vdCcpO1xyXG4gICAgLy8gICAgICAgICAvLyBub2RlLnk9aHAueSs4MDtcclxuICAgIC8vICAgICAgICAgQnVmZlN0YXRlTWFuYWdlci5nZXRJbnN0YW5jZSgpLmNyZWF0ZUJ1ZmZSb290KGNjLnYyKHBvc1gsbm9kZS55KzE1MCksaGVyb1R5cGUpO1xyXG4gICAgLy8gICAgIH0pOyBcclxuICAgIC8vIH1cclxuICAgIGNsaWNrQnRuU3RhcnQoKS8v5byA5aeL5ri45oiPXHJcbiAgICB7XHJcbiAgICAgICAgLy8gQHRzLWlnbm9yZVxyXG4gICAgICAgIGlmKHRoaXMuZ3JleWJ1dHRvbmp1ZGdtZW50PT0wKXtcclxuICAgICAgICAgICAgR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zaG93TWVzc2FnZShMYW5ndWFnZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRTdHJCeVRleHRJZCgxMzAwMDYpKVxyXG4gICAgICAgICAgICByZXR1cm5cclxuICAgICAgICB9XHJcbiAgICAgICAgXHJcbiAgICAgICAgdGhpcy5kZXMoKVxyXG4gICAgICAgIGxldCBHTT1HYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpO1xyXG4gICAgICAgIEZvbGxvd01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5mb2xsb3dFdmVudChGb2xsb3dfVHlwZS7ngrnlh7vlvIDlp4vmjJHmiJjnlKjmiLfmlbApO1xyXG4gICAgICAgIEdNLnNvdW5kX21hbmFnZXIucGxheVNvdW5kKFNvdW5kSW5kZXguY2xpY2spO1xyXG4gICAgICAgIGxldCBmaWdodGluZ0luZm89bnVsbDtcclxuICAgICAgICBzd2l0Y2goR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5jdXJfZ2FtZV9tb2RlKXtcclxuICAgICAgICAgICAgY2FzZSBHYW1lTW9kZS5NYWluOntcclxuICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgLy8gTGV2ZWxNYW5hZ2VyLmdldEluc3RhbmNlKCkuc3RhcnRfbGV2ZWw9TGV2ZWxNYW5hZ2VyLmdldEluc3RhbmNlKCkuZmluaXNoX2xldmVsKzE7XHJcbiAgICAgICAgICAgICAgICAvLyBmaWdodGluZ0luZm89TWlzc2lvbkxldmVsTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldEZpZ2h0aW5nSW5mbyhMZXZlbE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zdGFydF9sZXZlbCk7XHJcbiAgICAgICAgICAgICAgICBpZighVHV0b3JhaWxzTWFuYWdlci5nZXRJbnN0YW5jZSgpLmlzX2ZpbmlzaF9nYW1lKXtcclxuICAgICAgICAgICAgICAgICAgICBmaWdodGluZ0luZm89VHV0b3JpYWxMZXZlbE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRGaWdodGluZ0luZm8oTWFwTWFuYWdlci5DdXJyZW50bGV2ZWwpO1xyXG4gICAgICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICAgICAgZmlnaHRpbmdJbmZvPU1pc3Npb25MZXZlbE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRGaWdodGluZ0luZm8oTWFwTWFuYWdlci5DdXJyZW50bGV2ZWwpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICBMZXZlbE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zdGFydF9sZXZlbD1NYXBNYW5hZ2VyLkN1cnJlbnRsZXZlbDtcclxuICAgICAgICAgICAgfWJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIEdhbWVNb2RlLkVuZGxlc3M6e1xyXG4gICAgICAgICAgICAgICAgUHJvcE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5jaGFuZ2VQcm9wTnVtKFByb3BJZC5FbmRsZXNzQ2hhbGxlbmdlLC0xKTtcclxuICAgICAgICAgICAgICAgIGZpZ2h0aW5nSW5mbz1FbmRsZXNzTGV2ZWxzTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldEZpZ2h0aW5nSW5mbygxKTtcclxuICAgICAgICAgICAgfWJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIEdhbWVNb2RlLkJvc3NfQ2hhbGxlbmdlOntcclxuICAgICAgICAgICAgICAgIFByb3BNYW5hZ2VyLmdldEluc3RhbmNlKCkuY2hhbmdlUHJvcE51bShQcm9wSWQuQm9zc1RpY2tldCwtMSk7XHJcbiAgICAgICAgICAgICAgICBmaWdodGluZ0luZm89Qm9zc0NoYWxsZW5nZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRGaWdodGluZ0luZm8oQm9zc0NoYWxsZW5nZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5jdXJfY2hhbGxlbmdlX21vZGUpO1xyXG4gICAgICAgICAgICB9YnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgR2FtZU1vZGUuTWF6ZTp7XHJcbiAgICAgICAgICAgICAgICBUaW1lcy52b2lkc2Vuc2lkPXRoaXMuTWF6ZWlkXHJcbiAgICAgICAgICAgICAgICBmaWdodGluZ0luZm89TWF6ZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRGaWdodGluZ0luZm8odGhpcy5NYXplaWQpO1xyXG4gICAgICAgICAgICAgICAgaWYoR00uY3VyX2dhbWVfc2NlbmU9PUdhbWVTY2VuZS5nYW1lKXtcclxuICAgICAgICAgICAgICAgICAgICBzdXBlci5vblJlZnJlc2goKTtcclxuICAgICAgICAgICAgICAgICAgICBzdXBlci5vbkNsb3NlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgR00uc3RhcnROZXh0TGV2ZWwoKTtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1icmVhaztcclxuICAgICAgICAgICAgY2FzZSBHYW1lTW9kZS5Ub3dlcjp7XHJcbiAgICAgICAgICAgICAgICAvLyBmaWdodGluZ0luZm89VG93ZXJMZXZlbE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRGaWdodGluZ0luZm8oVG93ZXJNYW5hZ2VyLmdldFRvd2VyTGV2ZWwoKSk7XHJcbiAgICAgICAgICAgIH1icmVhaztcclxuICAgICAgICB9XHJcbiAgICAgICAgR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5maWdodGluZ19pbmZvPWZpZ2h0aW5nSW5mbztcclxuICAgICAgICAvLyB0aGlzLnNob3dFbmVyZ3koKTtcclxuICAgICAgICBHTS5yZWZyZXNoVXNlckV4cFNob3coKTtcclxuICAgICAgICAvL3RoaXMuc2V0TGV2ZWxEYXRhKCk7XHJcbiAgICAgICAgbGV0IGJnTG9hZGluZz1VSU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRMb2FkaW5nTm9kZSgpO1xyXG4gICAgICAgIGJnTG9hZGluZy5hY3RpdmU9dHJ1ZTtcclxuICAgICAgICBsZXQgbG9hZGluZ0Jhcj1iZ0xvYWRpbmcuZ2V0Q2hpbGRCeU5hbWUoJ1Byb2dyZXNzQmFyJykuZ2V0Q29tcG9uZW50KGNjLlByb2dyZXNzQmFyKTtcclxuICAgICAgICBsZXQgbG9hZExhYmVsPWxvYWRpbmdCYXIubm9kZS5nZXRDaGlsZEJ5TmFtZSgnbG9hZExhYmVsJykuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKTtcclxuICAgICAgICBjYy5kaXJlY3Rvci5wcmVsb2FkU2NlbmUoR2FtZVNjZW5lLmdhbWUsKGNvbXBsZXRlZENvdW50OiBudW1iZXIsIHRvdGFsQ291bnQ6IG51bWJlciwgaXRlbTogYW55KT0+e1xyXG4gICAgICAgICAgICAvL+ecn+Wunui/m+W6plxyXG4gICAgICAgICAgICBsZXQgcHJvZ3Jlc3NUcnVlPWNvbXBsZXRlZENvdW50L3RvdGFsQ291bnQ7XHJcbiAgICAgICAgICAgIC8v5YGH55qE6L+b5bqmXHJcbiAgICAgICAgICAgIGxldCBwcm9ncmVzc0ZhbHNlPXByb2dyZXNzVHJ1ZS8yO1xyXG4gICAgICAgICAgICBsb2FkaW5nQmFyLnByb2dyZXNzID0gcHJvZ3Jlc3NGYWxzZTtcclxuICAgICAgICAgICAgbG9hZExhYmVsLnN0cmluZz0obG9hZGluZ0Jhci5wcm9ncmVzcyoxMDApLnRvRml4ZWQoMCkrJyUnO1xyXG4gICAgICAgICAgICBHTS5jdXJfbG9hZF9wcm9ncmVzcz1wcm9ncmVzc0ZhbHNlO1xyXG4gICAgICAgICAgICAvLyB0aGlzLmxvYWRpbmdfbGlnaHQueCA9IHRoaXMubG9hZGluZ19iYXIucHJvZ3Jlc3MqdGhpcy5sb2FkaW5nX2Jhci50b3RhbExlbmd0aC10aGlzLmxvYWRpbmdfYmFyLnRvdGFsTGVuZ3RoLzI7XHJcbiAgICAgICAgfSwoKT0+e1xyXG4gICAgICAgICAgICBjYy5kaXJlY3Rvci5sb2FkU2NlbmUoR2FtZVNjZW5lLmdhbWUpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIFxyXG4gICAgfVxyXG5cclxuICAgIGRlcygpIHsvL+a4hemZpOaJgOacieaAqueJqeeahOmihOWItuS9k1xyXG4gICAgICAgIGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCB0aGlzLnBvcy5jaGlsZHJlbi5sZW5ndGg7IGluZGV4KyspIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMucG9zLmNoaWxkcmVuW2luZGV4XS5jaGlsZHJlbi5sZW5ndGg+MCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5wb3MuY2hpbGRyZW5baW5kZXhdLmNoaWxkcmVuWzBdLmRlc3Ryb3koKVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgY2xpY2tCdG5Nb25zdGVyKCl7Ly/mgKrnianor6bmg4VcclxuICAgICAgICB0aGlzLk1vbnN0ZXIuZ2V0Q29tcG9uZW50KE1vbnN0ZXJEZXRhaWxzKS5Nb25zdGVyRGV0YWlsc2Fycj10aGlzLk1vbnN0ZXJEZXRhaWxzYXJyXHJcbiAgICAgICAgdGhpcy5Nb25zdGVyLmFjdGl2ZT10cnVlXHJcbiAgICB9XHJcbiAgICBjbGlja0J0bkNoYXJpb3QoKXsvL+aImOi9puivpuaDhVxyXG4gICAgICAgIHRoaXMuQ2hhcmlvdC5hY3RpdmU9dHJ1ZVxyXG4gICAgfVxyXG4gICAgLy8gc2V0TGV2ZWxEYXRhKClcclxuICAgIC8vIHtcclxuICAgIC8vICAgICBMZXZlbE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zdGFydF9sZXZlbD1MZXZlbE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5maW5pc2hfbGV2ZWwgKyAxO1xyXG4gICAgLy8gICAgIGxldCBnbT1HYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpO1xyXG4gICAgLy8gICAgIGdtLmZpZ2h0aW5nX2luZm89TWlzc2lvbkxldmVsTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldEZpZ2h0aW5nSW5mbyhMZXZlbE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zdGFydF9sZXZlbCk7XHJcbiAgICAvLyB9XHJcblxyXG4gICAgY2xpY2tCdG5DbG9zZSgpXHJcbiAgICB7XHJcbiAgICAgICAgY2MuZmluZCgnQ2FudmFzL21haW5fdWknKS5nZXRDb21wb25lbnQoTWFpblVpKS5yZWZyZXNoTWFpblRhc2tVaSgpO1xyXG4gICAgICAgIEdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuc291bmRfbWFuYWdlci5wbGF5U291bmQoU291bmRJbmRleC5jbGljayk7XHJcbiAgICAgICAgdGhpcy5kZXMoKVxyXG4gICAgICAgIHRoaXMuZGVzdHJveVNlbGYoKTtcclxuICAgICAgICBpZihHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLmN1cl9nYW1lX21vZGU9PUdhbWVNb2RlLkVuZGxlc3Mpe1xyXG4gICAgICAgICAgICBVSU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zaG93VWlEaWFsb2coVUlQYXRoLlZuZGxlc3NDaGFsbGVuZ2VzLFVJTGF5ZXJMZXZlbC5PbmUse29uQ29tcGxldGVkOih1aU5vZGUpPT4ge1xyXG4gICAgICAgICAgICAgICAgdWlOb2RlLmdldENvbXBvbmVudChlbmRsZXNzY2hhbGxlbmdlcykuaW5pdCh7XHJcbiAgICAgICAgICAgICAgICAgICAgb25DbG9zZTooKT0+e1xyXG5cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgdWlOb2RlLmdldENvbXBvbmVudChlbmRsZXNzY2hhbGxlbmdlcykuaW5pdFVpKDIpLy8yOuaXoOWwveaMkeaImCAgIDPvvJpib3Nz5oyR5oiYXHJcbiAgICAgICAgICAgIH0sfSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYoR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5jdXJfZ2FtZV9tb2RlPT1HYW1lTW9kZS5Cb3NzX0NoYWxsZW5nZSl7XHJcbiAgICAgICAgICAgIFVJTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNob3dVaURpYWxvZyhVSVBhdGguVm5kbGVzc0NoYWxsZW5nZXMsVUlMYXllckxldmVsLk9uZSx7b25Db21wbGV0ZWQ6KHVpTm9kZSk9PiB7XHJcbiAgICAgICAgICAgICAgICB1aU5vZGUuZ2V0Q29tcG9uZW50KGVuZGxlc3NjaGFsbGVuZ2VzKS5pbml0KHtcclxuICAgICAgICAgICAgICAgICAgICBvbkNsb3NlOigpPT57XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICB1aU5vZGUuZ2V0Q29tcG9uZW50KGVuZGxlc3NjaGFsbGVuZ2VzKS5pbml0VWkoMykvLzI65peg5bC95oyR5oiYICAgM++8mmJvc3PmjJHmiJhcclxuICAgICAgICAgICAgfSx9KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgZGVzdHJveVNlbGYoKVxyXG4gICAge1xyXG4gICAgICAgIHN1cGVyLm9uQ2xvc2UoKTtcclxuICAgICAgICBBcGtNYW5hZ2VyLmdldEluc3RhbmNlKCkuY2xvc2VCYW5uZXIoKTtcclxuICAgICAgICAvLyBFdmVudE1hbmFnZXIucG9zdFJlZEV2ZW50KFJlZEV2ZW50U3RyaW5nLlJFRF9DSEVDSyxSZWRFdmVudFR5cGUuQnRuX01haW5fU2lnbkluKTtcclxuICAgIH1cclxuXHJcbn1cclxuIl19