
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
            if (teamList[2] == -1 || teamList[2] == HeroConfig_1.Hero_Type.NULL) {
                teamList[2] = touchTeam.getComponent(HeroItem_1.default).hero_type;
                HeroManager_1.HeroManager.getInstance().saveTeamList(GameManager_1.default.getInstance().cur_game_mode, teamList);
                this.Refreshheroitmestatus();
                return;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0c1xcVUlcXGhvbWVcXFRvUGxheU1haW5VaS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSwrREFBMEQ7QUFDMUQsOERBQW9FO0FBQ3BFLDhEQUFvRTtBQUNwRSxtREFBOEM7QUFDOUMsNkNBQW9FO0FBQ3BFLG9GQUErRTtBQUcvRSxpREFBNEM7QUFDNUMscURBQWdEO0FBQ2hELDJEQUEwRDtBQUUxRCx5REFBdUQ7QUFDdkQsbURBQThDO0FBQzlDLHlEQUF3RDtBQUN4RCx5REFBK0Q7QUFDL0QsMkRBQWlFO0FBQ2pFLHNEQUFxRDtBQUNyRCx3RUFBOEU7QUFDOUUseURBQStFO0FBQy9FLHVFQUFrRTtBQUNsRSxtRUFBOEQ7QUFFOUQsdUVBQWtFO0FBQ2xFLGlFQUE0RDtBQUU1RCxvREFBK0M7QUFDL0Msc0RBQXFEO0FBQ3JELDZEQUF3RDtBQUN4RCw2REFBeUQ7QUFDekQsK0RBQWlFO0FBQ2pFLGdEQUErQztBQUMvQyxzREFBaUQ7QUFFakQscURBQTJEO0FBQzNELHlEQUFvRDtBQUNwRCwrQ0FBMEM7QUFDMUMscUVBQWdFO0FBQ2hFLG9EQUFtRDtBQUNuRCw4Q0FBeUM7QUFDekMsd0NBQW1EO0FBRW5ELDBDQUF5QztBQUN6QyxtQ0FBOEI7QUFDOUIsbURBQThDO0FBRXhDLElBQUEsS0FBc0IsRUFBRSxDQUFDLFVBQVUsRUFBbEMsT0FBTyxhQUFBLEVBQUUsUUFBUSxjQUFpQixDQUFDO0FBRzFDO0lBQTBDLGdDQUFXO0lBQXJEO1FBQUEscUVBb3JCQztRQWxyQkcsZUFBUyxHQUFhLElBQUksQ0FBQyxDQUFBLFVBQVU7UUFHckMsYUFBTyxHQUFXLElBQUksQ0FBQyxDQUFBLE1BQU07UUFFN0IsYUFBTyxHQUFXLElBQUksQ0FBQyxDQUFBLE1BQU07UUFFN0IsU0FBRyxHQUFXLElBQUksQ0FBQyxDQUFBLE9BQU87UUFFMUIsZ0JBQVUsR0FBVyxJQUFJLENBQUMs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QUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsQ0FBQyxjQUFjLENBQUMsTUFBTSxDQUFDLENBQUMsTUFBTSxHQUFDLElBQUksQ0FBQSxDQUFBLE1BQU07WUFDckUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLENBQUMsY0FBYyxDQUFDLGNBQWMsQ0FBQyxDQUFDLE1BQU0sR0FBQyxLQUFLLENBQUEsQ0FBQSxNQUFNO1lBQzlFLElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxDQUFDLGNBQWMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxNQUFNLEdBQUMsS0FBSyxDQUFBLENBQUEsTUFBTTtZQUN6RSxJQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsQ0FBQyxjQUFjLENBQUMsWUFBWSxDQUFDLENBQUMsTUFBTSxHQUFDLElBQUksQ0FBQSxDQUFBLElBQUk7WUFDekUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLENBQUMsY0FBYyxDQUFDLE1BQU0sQ0FBQyxDQUFDLFlBQVksQ0FBQyxFQUFFLENBQUMsUUFBUSxDQUFDLENBQUMsWUFBWSxHQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxHQUFDLENBQUMsQ0FBQyxDQUFBO1lBQ3RILElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxDQUFDLGNBQWMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxZQUFZLENBQUMsRUFBRSxDQUFDLFFBQVEsQ0FBQyxDQUFDLFNBQVMsR0FBQyxNQUFNLENBQUE7U0FDakc7YUFBSTtZQUNELElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxDQUFDLGNBQWMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxNQUFNLEdBQUMsS0FBSyxDQUFBLENBQUEsTUFBTTtZQUN0RSxJQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsQ0FBQyxjQUFjLENBQUMsY0FBYyxDQUFD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QUFDLFdBQVcsQ0FBQzs4Q0FDRTtJQUczQjtRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDOzhDQUNFO0lBRXBCO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUM7Z0RBQ0k7SUFFdEI7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLFdBQVcsQ0FBQztvREFDUTtJQUdqQztRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDOzZEQUNpQjtJQUluQztRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDO3lEQUNhO0lBSS9CO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxXQUFXLENBQUM7aURBQ0s7SUFFOUI7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLFdBQVcsQ0FBQztpREFDSztJQXhFYixZQUFZO1FBRGhDLE9BQU87T0FDYSxZQUFZLENBb3JCaEM7SUFBRCxtQkFBQztDQXByQkQsQUFvckJDLENBcHJCeUMscUJBQVcsR0FvckJwRDtrQkFwckJvQixZQUFZIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFdYTWFuYWdlckVYIGZyb20gXCIuLi8uLi8uLi9zdGFydHNjZW5lL1dYTWFuYWdlckVYXCI7XHJcbmltcG9ydCB7IEJvc3NDaGFsbGVuZ2VNYW5hZ2VyIH0gZnJvbSBcIi4uLy4uL0FjdGl2aXR5L0Jvc3NDaGFsbGVuZ2VcIjtcclxuaW1wb3J0IHsgRW5kbGVzc0xldmVsc01hbmFnZXIgfSBmcm9tIFwiLi4vLi4vQWN0aXZpdHkvRW5kbGVzc0xldmVsc1wiO1xyXG5pbXBvcnQgQXBrTWFuYWdlciBmcm9tIFwiLi4vLi4vQWRzL0Fwa01hbmFnZXJcIjtcclxuaW1wb3J0IHsgRmlnaHRpbmdJbmZvLCBHYW1lTW9kZSwgR2FtZVNjZW5lIH0gZnJvbSBcIi4uLy4uL0NvbnN0YW50c1wiO1xyXG5pbXBvcnQgZW5kbGVzc2NoYWxsZW5nZXMgZnJvbSBcIi4uLy4uL2NvcHkvZW5kbGVzc2NoYWxsZW5nZXMvZW5kbGVzc2NoYWxsZW5nZXNcIjtcclxuaW1wb3J0IEJ1ZmZTdGF0ZU1hbmFnZXIgZnJvbSBcIi4uLy4uL0dhbWUvQnVmZlN0YXRlTWFuYWdlclwiO1xyXG5pbXBvcnQgR2FtZURhdGEgZnJvbSBcIi4uLy4uL0dhbWVEYXRhXCI7XHJcbmltcG9ydCBHYW1lTWFuYWdlciBmcm9tIFwiLi4vLi4vR2FtZU1hbmFnZXJcIjtcclxuaW1wb3J0IE1hcE1hbmFnZXIgZnJvbSBcIi4uLy4uL0d1YUppL01hcE1hbmFnZXJcIjtcclxuaW1wb3J0IHsgSGVyb01hbmFnZXIgfSBmcm9tIFwiLi4vLi4vSGVyby9EYXRhL0hlcm9NYW5hZ2VyXCI7XHJcbmltcG9ydCBIZXJvIGZyb20gXCIuLi8uLi9IZXJvL0dhbWUvSGVyb1wiO1xyXG5pbXBvcnQgeyBIZXJvX1R5cGUgfSBmcm9tIFwiLi4vLi4vSGVyby9HYW1lL0hlcm9Db25maWdcIjtcclxuaW1wb3J0IEhlcm9JdGVtIGZyb20gXCIuLi8uLi9IZXJvL1VpL0hlcm9JdGVtXCI7XHJcbmltcG9ydCB7IExldmVsTWFuYWdlciB9IGZyb20gXCIuLi8uLi9MZXZlbC9MZXZlbE1hbmFnZXJcIjtcclxuaW1wb3J0IHsgTWlzc2lvbkxldmVsTWFuYWdlciB9IGZyb20gXCIuLi8uLi9MZXZlbC9NaXNzaW9uTGV2ZWxcIjtcclxuaW1wb3J0IHsgVHV0b3JpYWxMZXZlbE1hbmFnZXIgfSBmcm9tIFwiLi4vLi4vTGV2ZWwvVHV0b3JpYWxMZXZlbFwiO1xyXG5pbXBvcnQgeyBNYXplTWFuYWdlciB9IGZyb20gXCIuLi8uLi9NYXplL01hemVNYW5hZ2VyXCI7XHJcbmltcG9ydCB7IE1vbnN0ZXJDb25maWd1cmVNYW5hZ2VyIH0gZnJvbSBcIi4uLy4uL01vbnN0ZXIvRGF0YS9Nb25zdGVyQ29uZmlndXJlXCI7XHJcbmltcG9ydCB7IE1vbnN0ZXJGYWNlTmFtZSwgTW9uc3RlckFjdGlvbk5hbWUgfSBmcm9tIFwiLi4vLi4vTW9uc3Rlci9Nb25zdGVyRGF0YVwiO1xyXG5pbXBvcnQgeyBGb2xsb3dfVHlwZSB9IGZyb20gXCIuLi8uLi9tdWx0aUxhbmd1YWdlL0ZvbGxvd0NvbnN0YW50c1wiO1xyXG5pbXBvcnQgRm9sbG93TWFuYWdlciBmcm9tIFwiLi4vLi4vbXVsdGlMYW5ndWFnZS9Gb2xsb3dNYW5hZ2VyXCI7XHJcbmltcG9ydCB7IExhbmd1YWdlSW5kZXggfSBmcm9tIFwiLi4vLi4vbXVsdGlMYW5ndWFnZS9MYW5ndWFnZUNvbnN0YW50c1wiO1xyXG5pbXBvcnQgTGFuZ3VhZ2VNYW5hZ2VyIGZyb20gXCIuLi8uLi9tdWx0aUxhbmd1YWdlL0xhbmd1YWdlTWFuYWdlclwiO1xyXG5pbXBvcnQgVGV4dExhbmd1YWdlIGZyb20gXCIuLi8uLi9tdWx0aUxhbmd1YWdlL1RleHRMYW5ndWFnZVwiO1xyXG5pbXBvcnQgeyBQZXRNYW5hZ2VyIH0gZnJvbSBcIi4uLy4uL1BldC9QZXRNYW5hZ2VyXCI7XHJcbmltcG9ydCB7IFByb3BJZCB9IGZyb20gXCIuLi8uLi9Qcm9wL1Byb3BDb25maWdcIjtcclxuaW1wb3J0IHsgUHJvcE1hbmFnZXIgfSBmcm9tIFwiLi4vLi4vUHJvcC9Qcm9wTWFuYWdlclwiO1xyXG5pbXBvcnQgeyBTb3VuZEluZGV4IH0gZnJvbSBcIi4uLy4uL1NvdW5kL0F1ZGlvQ29uc3RhbnRzXCI7XHJcbmltcG9ydCB7IFN0b3JhZ2VLZXkgfSBmcm9tIFwiLi4vLi4vU3RvcmFnZS9TdG9yYWdlQ29uZmlnXCI7XHJcbmltcG9ydCB7IFRoZVN0b3JhZ2VNYW5hZ2VyIH0gZnJvbSBcIi4uLy4uL1N0b3JhZ2UvU3RvcmFnZU1hbmFnZXJcIjtcclxuaW1wb3J0IHsgVGFza0l0ZW0gfSBmcm9tIFwiLi4vLi4vVGFzay9UYXNrRW51bVwiO1xyXG5pbXBvcnQgVGFza01hbmFnZXIgZnJvbSBcIi4uLy4uL1Rhc2svVGFza01hbmFnZXJcIjtcclxuaW1wb3J0IE15VG9vbCBmcm9tIFwiLi4vLi4vVG9vbHMvTXlUb29sXCI7XHJcbmltcG9ydCB7IFRvd2VyTGV2ZWxNYW5hZ2VyIH0gZnJvbSBcIi4uLy4uL1Rvd2VyL1Rvd2VyTGV2ZWxcIjtcclxuaW1wb3J0IFRvd2VyTWFuYWdlciBmcm9tIFwiLi4vLi4vVG93ZXIvVG93ZXJNYW5hZ2VyXCI7XHJcbmltcG9ydCBUaW1lcyBmcm9tIFwiLi4vLi4vVHVybnRhYmxlL1RpbWVzXCI7XHJcbmltcG9ydCBUdXRvcmFpbHNNYW5hZ2VyIGZyb20gXCIuLi8uLi9UdXRvcmlhbHMvVHV0b3JhaWxzTWFuYWdlclwiO1xyXG5pbXBvcnQgeyBVc2VySW5mbyB9IGZyb20gXCIuLi8uLi9Vc2VySW5mby9Vc2VySW5mb1wiO1xyXG5pbXBvcnQgVUlDb21wb25lbnQgZnJvbSBcIi4uL1VJQ29tcG9uZW50XCI7XHJcbmltcG9ydCB7IFVJUGF0aCwgVUlMYXllckxldmVsIH0gZnJvbSBcIi4uL1VJQ29uZmlnXCI7XHJcbmltcG9ydCB7IFVpQWN0aW9uIH0gZnJvbSBcIi4uL1VpSW50ZXJmYWNlXCI7XHJcbmltcG9ydCB7IFVJTWFuYWdlciB9IGZyb20gXCIuLi9VSU1hbmFnZXJcIjtcclxuaW1wb3J0IE1haW5VaSBmcm9tIFwiLi9NYWluVWlcIjtcclxuaW1wb3J0IE1vbnN0ZXJEZXRhaWxzIGZyb20gXCIuL01vbnN0ZXJEZXRhaWxzXCI7XHJcblxyXG5jb25zdCB7Y2NjbGFzcywgcHJvcGVydHl9ID0gY2MuX2RlY29yYXRvcjtcclxuXHJcbkBjY2NsYXNzXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFRvUGxheU1haW5VaSBleHRlbmRzIFVJQ29tcG9uZW50IHtcclxuICAgIEBwcm9wZXJ0eShjYy5QcmVmYWIpXHJcbiAgICBoZXJvX2l0ZW06Y2MuUHJlZmFiID0gbnVsbDsvL+iLsembhOWktOWDj+eahOmihOWItuS9k1xyXG5cclxuICAgIEBwcm9wZXJ0eShjYy5Ob2RlKVxyXG4gICAgTW9uc3RlcjpjYy5Ob2RlID0gbnVsbDsvL+aAqueJqeivpuaDhVxyXG4gICAgQHByb3BlcnR5KGNjLk5vZGUpXHJcbiAgICBDaGFyaW90OmNjLk5vZGUgPSBudWxsOy8v5oiY6L2m6K+m5oOFXHJcbiAgICBAcHJvcGVydHkoY2MuTm9kZSlcclxuICAgIHBvczpjYy5Ob2RlID0gbnVsbDsvL+aAqueJqeeahOS9jee9rlxyXG4gICAgQHByb3BlcnR5KGNjLk5vZGUpXHJcbiAgICBoZXJvU2hhZG93OmNjLk5vZGUgPSBudWxsOy8v5oCq54mp6Zi05b2x55qE5L2N572uXHJcbiAgICBAcHJvcGVydHkoY2MuTm9kZSlcclxuICAgIGxldmVsdHh0OmNjLk5vZGUgPSBudWxsO1xyXG5cclxuICAgIGd1YWl3dWFycj1bXS8v5oCq54mp55qE5pWw57uEXHJcbiAgICBNb25zdGVyRGV0YWlsc2Fycj1bXS8v5oCq54mp6K+m5oOF5YiX6KGoICAg5oyJYm9zcyAgIOeyvuiLsSAgIOaZrumAmiDmjpLluo9cclxuXHJcblxyXG4gICAgQHByb3BlcnR5KGNjLk5vZGUpXHJcbiAgICBrb213ZWk6Y2MuTm9kZSA9IG51bGw7Ly/nqbrkvY0gICDoi7Hpm4TkuIrpmLXnmoTkvY3nva7mmK/lkKbog73op6PplIFcclxuXHJcbiAgICBAcHJvcGVydHkoY2MuTm9kZSlcclxuICAgIGNvbnRlbnQ6Y2MuTm9kZSA9IG51bGw7Ly/niLboioLngrlcclxuXHJcbiAgICBAcHJvcGVydHkoc3AuU2tlbGV0b25EYXRhKVxyXG4gICAgc3A6c3AuU2tlbGV0b25EYXRhW10gPSBbXTsvL+epuuS9jSAgIOiLsembhOS4iumYteeahOS9jee9ruaYr+WQpuiDveino+mUgVxyXG5cclxuICAgIGhlcm9fdGVhbV9yZWN0OiBjYy5SZWN0W10gPSBbXTtcclxuICAgIFNjcm9sbFZpZXdyZWN0OiBjYy5SZWN0ID0gbnVsbDtcclxuICAgIEBwcm9wZXJ0eShjYy5Ob2RlKVxyXG4gICAgU2Nyb2xsVmllOmNjLk5vZGUgPSBudWxsOy8v6Iux6ZuE5ruR5Yqo5Z2XXHJcbiAgICBAcHJvcGVydHkoY2MuTm9kZSlcclxuICAgIFNjcm9sbFZpZXdzOmNjLk5vZGUgPSBudWxsOy8v6Iux6ZuE5ruR5Yqo5Z2XXHJcbiAgICBoZXJvX3RlYW1fcG9zOiBjYy5WZWMyW10gPSBbXTtcclxuXHJcbiAgICBAcHJvcGVydHkoY2MuTm9kZSlcclxuICAgIE1vdXNlOmNjLk5vZGUgPSBudWxsOy8v6byg5qCH5LiK55qE6Iux6ZuEXHJcbiAgICBAcHJvcGVydHkoY2MuTm9kZSlcclxuICAgIE1vdXNlaXRlbTpjYy5Ob2RlID0gbnVsbDsvL+m8oOagh+S4iueahOiLsembhGl0ZW1cclxuICAgIGNsaWNraGVyb3Bvc2l0aW9uOm51bWJlcj0tMS8v54K55Ye755qE5L2N572u5piv56ys5Yeg5LiqICAgIOm7mOiupOayoeacieiiq+eCueWHu+WIsOeahOS9jee9rlxyXG4gICAgcHV0ZG93bmhlcm9wb3NpdGlvbjpudW1iZXI9LTEvL+aUvuS4i+eahOS9jee9ruaYr+esrOWHoOS4qlxyXG4gICAgQHByb3BlcnR5KGNjLk5vZGUpXHJcbiAgICBDb21tb25fQnRuXzA6Y2MuTm9kZSA9IG51bGw7Ly/lvIDlp4vmjInpkq5cclxuICAgIEBwcm9wZXJ0eShjYy5Ob2RlKVxyXG4gICAgamR0OmNjLk5vZGUgPSBudWxsOy8v5oiY6L2m6KGA6YeP6L+b5bqm5p2hXHJcbiAgICBncmV5YnV0dG9uanVkZ21lbnQ6IG51bWJlcj0wO1xyXG5cclxuXHJcbiAgICBAcHJvcGVydHkoY2MuU3ByaXRlRnJhbWUpXHJcbiAgICBiajpjYy5TcHJpdGVGcmFtZVtdID0gW107Ly/og4zmma9cclxuICAgIEBwcm9wZXJ0eShjYy5TcHJpdGVGcmFtZSlcclxuICAgIHdhbGw6Y2MuU3ByaXRlRnJhbWVbXSA9IFtdOy8v5oiY6L2mXHJcblxyXG4gICAgQHByb3BlcnR5KGNjLk5vZGUpXHJcbiAgICBteWJqOmNjLk5vZGUgPSBudWxsOy8v6IOM5pmvXHJcbiAgICBAcHJvcGVydHkoY2MuTm9kZSlcclxuICAgIG15d2FsbDpjYy5Ob2RlID0gbnVsbDsvL+aImOi9plxyXG4gICAgQHByb3BlcnR5KGNjLlNwcml0ZUZyYW1lKVxyXG4gICAgYmdfRW5kbGVzczpjYy5TcHJpdGVGcmFtZSA9IG51bGw7Ly/ml6DlsL3mjJHmiJjog4zmma9cclxuXHJcbiAgICBAcHJvcGVydHkoY2MuTm9kZSlcclxuICAgIFByZXBhcmVfQnRuX01vbnN0ZXI6Y2MuTm9kZSA9IG51bGw7Ly/mgKrnianor6bmg4XmjInpkq5cclxuICAgIFxyXG5cclxuICAgIEBwcm9wZXJ0eShjYy5Ob2RlKVxyXG4gICAgQ29tbW9uX0J0bl9CYWNrOmNjLk5vZGUgPSBudWxsOy8v6L+U5Zue5oyJ6ZKuXHJcbiAgICBNYXplaWQ6bnVtYmVyID0gMDsvL+WGsOays+WFs+WNoWlkXHJcblxyXG4gICAgQHByb3BlcnR5KGNjLlNwcml0ZUZyYW1lKVxyXG4gICAgYmdfTWF6ZTpjYy5TcHJpdGVGcmFtZSA9IG51bGw7Ly/lhrDmsrPog4zmma9cclxuICAgIEBwcm9wZXJ0eShjYy5TcHJpdGVGcmFtZSlcclxuICAgIGJnX3dhbGw6Y2MuU3ByaXRlRnJhbWUgPSBudWxsOy8v5Yaw5rKz5oiY6L2mXHJcbiAgICBzdGFydCgpe1xyXG4gICAgICAgIGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCB0aGlzLmtvbXdlaS5jaGlsZHJlbi5sZW5ndGg7IGluZGV4KyspIHtcclxuICAgICAgICAgICAgdGhpcy5rb213ZWkuY2hpbGRyZW5baW5kZXhdLm9uKGNjLk5vZGUuRXZlbnRUeXBlLlRPVUNIX1NUQVJULCB0aGlzLm9uSGVyb1RvdWNoU3RhcnQsIHRoaXMpO1xyXG4gICAgICAgICAgICB0aGlzLmtvbXdlaS5jaGlsZHJlbltpbmRleF0ub24oY2MuTm9kZS5FdmVudFR5cGUuVE9VQ0hfTU9WRSwgdGhpcy5vbkhlcm9Ub3VjaE1vdmUsIHRoaXMpO1xyXG4gICAgICAgICAgICB0aGlzLmtvbXdlaS5jaGlsZHJlbltpbmRleF0ub24oY2MuTm9kZS5FdmVudFR5cGUuVE9VQ0hfRU5ELCB0aGlzLm9uSGVyb1RvdWNoRW5kLCB0aGlzKTtcclxuICAgICAgICAgICAgdGhpcy5rb213ZWkuY2hpbGRyZW5baW5kZXhdLm9uKGNjLk5vZGUuRXZlbnRUeXBlLlRPVUNIX0NBTkNFTCwgdGhpcy5vbkhlcm9Ub3VjaENhbmNlbCwgdGhpcyk7XHJcbiAgICAgICAgICAgIGxldCBzaXplID0gdGhpcy5rb213ZWkuY2hpbGRyZW5baW5kZXhdLmdldENvbnRlbnRTaXplKCk7XHJcbiAgICAgICAgICAgIGxldCBwb3MgPSB0aGlzLmtvbXdlaS5jaGlsZHJlbltpbmRleF0uZ2V0UG9zaXRpb24oKTtcclxuICAgICAgICAgICAgdGhpcy5oZXJvX3RlYW1fcmVjdC5wdXNoKGNjLnJlY3QocG9zLngtc2l6ZS53aWR0aC8yLHBvcy55LXNpemUuaGVpZ2h0LzIsc2l6ZS53aWR0aCxzaXplLmhlaWdodCkpO1xyXG4gICAgICAgICAgICB0aGlzLmhlcm9fdGVhbV9wb3MucHVzaChwb3MpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBsZXQgcG9zcyA9IHRoaXMuU2Nyb2xsVmllLmdldFBvc2l0aW9uKCk7XHJcbiAgICAgICAgbGV0IHNpemVzID0gdGhpcy5TY3JvbGxWaWUuZ2V0Q29udGVudFNpemUoKTtcclxuICAgICAgICB0aGlzLlNjcm9sbFZpZXdyZWN0PWNjLnJlY3QocG9zcy54LXNpemVzLndpZHRoLzIscG9zcy55LXNpemVzLmhlaWdodC8yLHNpemVzLndpZHRoLHNpemVzLmhlaWdodClcclxuICAgICAgICAvLyBIZXJvTWFuYWdlci5nZXRJbnN0YW5jZSgpLmFkZEhlcm8oMylcclxuICAgIH1cclxuICAgIG9uSGVyb1RvdWNoU3RhcnQoZTpjYy5FdmVudC5FdmVudFRvdWNoKSB7XHJcbiAgICAgICAgbGV0IHRvdWNoVGVhbT1lLmdldEN1cnJlbnRUYXJnZXQoKTtcclxuICAgICAgICBsZXQgcG9zPXRoaXMua29td2VpLmNvbnZlcnRUb05vZGVTcGFjZUFSKGUuZ2V0TG9jYXRpb24oKSk7XHJcbiAgICAgICAgbGV0IHdlaXpoaT1OdW1iZXIodG91Y2hUZWFtLm5hbWUpLy/ngrnliLDnrKzlh6DkuKrkvY3nva5cclxuICAgICAgICB0aGlzLmNsaWNraGVyb3Bvc2l0aW9uPXdlaXpoaVxyXG4gICAgICAgIGxldCB0ZWFtTGlzdD1IZXJvTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldFRlYW1MaXN0KEdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuY3VyX2dhbWVfbW9kZSk7XHJcbiAgICAgICAgLy/lpoLmnpzov5nkuKrkvY3nva7mnInoi7Hpm4TvvIzlsLHlsIbov5nkuKrkvY3nva7nmoToi7Hpm4TpmpDol48gICDlvIDlkK/pvKDmoIfnmoToi7Hpm4QgIOWwhum8oOagh+eahOiLsembhOearuiCpOaNouaIkOi/meS4quS9jee9rueahOiLsembhFxyXG4gICAgICAgIC8vIEB0cy1pZ25vcmVcclxuICAgICAgICBpZiAodGVhbUxpc3Rbd2VpemhpXSE9SGVyb19UeXBlLk5VTEwmJnRlYW1MaXN0W3dlaXpoaV0hPS0xKSB7XHJcbiAgICAgICAgICAgIHRoaXMua29td2VpLmNoaWxkcmVuW3RoaXMuY2xpY2toZXJvcG9zaXRpb25dLmdldENoaWxkQnlOYW1lKFwiaGVyb1wiKS5hY3RpdmU9ZmFsc2UvL+iLsembhOmakOiXj1xyXG4gICAgICAgICAgICB0aGlzLmtvbXdlaS5jaGlsZHJlblt0aGlzLmNsaWNraGVyb3Bvc2l0aW9uXS5nZXRDaGlsZEJ5TmFtZShcIlByZXBhcmVfVm9pZFwiKS5hY3RpdmU9dHJ1ZS8v6buR5b2x5byA5ZCvXHJcbiAgICAgICAgICAgIHRoaXMua29td2VpLmNoaWxkcmVuW3RoaXMuY2xpY2toZXJvcG9zaXRpb25dLmdldENoaWxkQnlOYW1lKFwid2luVGV4dFwiKS5hY3RpdmU9dHJ1ZS8v5paH5a2X5byA5ZCvXHJcbiAgICAgICAgICAgIHRoaXMua29td2VpLmNoaWxkcmVuW3RoaXMuY2xpY2toZXJvcG9zaXRpb25dLmdldENoaWxkQnlOYW1lKFwiaGVyb1NoYWRvd1wiKS5hY3RpdmU9ZmFsc2UvL+mYtOW9sVxyXG4gICAgICAgICAgICB0aGlzLk1vdXNlLnNldFBvc2l0aW9uKHBvcylcclxuICAgICAgICAgICAgdGhpcy5Nb3VzZS5nZXRDaGlsZEJ5TmFtZShcImhlcm9cIikuZ2V0Q29tcG9uZW50KHNwLlNrZWxldG9uKS5za2VsZXRvbkRhdGE9dGhpcy5zcFt0ZWFtTGlzdFt3ZWl6aGldLTFdXHJcbiAgICAgICAgICAgIHRoaXMuTW91c2UuZ2V0Q2hpbGRCeU5hbWUoXCJoZXJvXCIpLmdldENvbXBvbmVudChzcC5Ta2VsZXRvbikuYW5pbWF0aW9uPVwiSWRsZVwiXHJcbiAgICAgICAgICAgIHRoaXMuTW91c2UuYWN0aXZlPXRydWVcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgb25IZXJvVG91Y2hNb3ZlKGU6Y2MuRXZlbnQuRXZlbnRUb3VjaCkge1xyXG4gICAgICAgIGlmKHRoaXMuY2xpY2toZXJvcG9zaXRpb24hPS0xKXtcclxuICAgICAgICAgICAgbGV0IHRvdWNoVGVhbT1lLmdldEN1cnJlbnRUYXJnZXQoKTtcclxuICAgICAgICAgICAgbGV0IHBvcz10aGlzLmtvbXdlaS5jb252ZXJ0VG9Ob2RlU3BhY2VBUihlLmdldExvY2F0aW9uKCkpO1xyXG4gICAgICAgICAgICB0aGlzLk1vdXNlLnNldFBvc2l0aW9uKHBvcylcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBTZWxmcG9zaXRpb24obnVtYmVyKXtcclxuICAgICAgICBsZXQgdGVhbUxpc3Q9SGVyb01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRUZWFtTGlzdChHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLmN1cl9nYW1lX21vZGUpO1xyXG4gICAgICAgIGlmKHRoaXMuTW91c2UuYWN0aXZlPT10cnVlKXtcclxuICAgICAgICAgICAgdGhpcy5Nb3VzZS5hY3RpdmU9ZmFsc2VcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYodGhpcy5Nb3VzZWl0ZW0uYWN0aXZlPT10cnVlKXtcclxuICAgICAgICAgICAgdGhpcy5Nb3VzZWl0ZW0uYWN0aXZlPWZhbHNlXHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vIEB0cy1pZ25vcmVcclxuICAgICAgICBpZih0ZWFtTGlzdFtudW1iZXJdIT1IZXJvX1R5cGUuTlVMTCYmdGVhbUxpc3RbbnVtYmVyXSE9LTEpe1xyXG4gICAgICAgICAgICB0aGlzLmtvbXdlaS5jaGlsZHJlbltudW1iZXJdLmdldENoaWxkQnlOYW1lKFwiaGVyb1wiKS5hY3RpdmU9dHJ1ZS8v6Iux6ZuE5byA5ZCvXHJcbiAgICAgICAgICAgIHRoaXMua29td2VpLmNoaWxkcmVuW251bWJlcl0uZ2V0Q2hpbGRCeU5hbWUoXCJQcmVwYXJlX1ZvaWRcIikuYWN0aXZlPWZhbHNlLy/pu5HlvbHpmpDol49cclxuICAgICAgICAgICAgdGhpcy5rb213ZWkuY2hpbGRyZW5bbnVtYmVyXS5nZXRDaGlsZEJ5TmFtZShcIndpblRleHRcIikuYWN0aXZlPWZhbHNlLy/mloflrZfpmpDol49cclxuICAgICAgICAgICAgdGhpcy5rb213ZWkuY2hpbGRyZW5bbnVtYmVyXS5nZXRDaGlsZEJ5TmFtZShcImhlcm9TaGFkb3dcIikuYWN0aXZlPXRydWUvL+mYtOW9sVxyXG4gICAgICAgICAgICB0aGlzLmtvbXdlaS5jaGlsZHJlbltudW1iZXJdLmdldENoaWxkQnlOYW1lKFwiaGVyb1wiKS5nZXRDb21wb25lbnQoc3AuU2tlbGV0b24pLnNrZWxldG9uRGF0YT10aGlzLnNwW3RlYW1MaXN0W251bWJlcl0tMV1cclxuICAgICAgICAgICAgdGhpcy5rb213ZWkuY2hpbGRyZW5bbnVtYmVyXS5nZXRDaGlsZEJ5TmFtZShcImhlcm9cIikuZ2V0Q29tcG9uZW50KHNwLlNrZWxldG9uKS5hbmltYXRpb249XCJJZGxlXCJcclxuICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgdGhpcy5rb213ZWkuY2hpbGRyZW5bbnVtYmVyXS5nZXRDaGlsZEJ5TmFtZShcImhlcm9cIikuYWN0aXZlPWZhbHNlLy/oi7Hpm4TpmpDol49cclxuICAgICAgICAgICAgdGhpcy5rb213ZWkuY2hpbGRyZW5bbnVtYmVyXS5nZXRDaGlsZEJ5TmFtZShcIlByZXBhcmVfVm9pZFwiKS5hY3RpdmU9dHJ1ZS8v6buR5b2x5byA5ZCvXHJcbiAgICAgICAgICAgIHRoaXMua29td2VpLmNoaWxkcmVuW251bWJlcl0uZ2V0Q2hpbGRCeU5hbWUoXCJ3aW5UZXh0XCIpLmFjdGl2ZT10cnVlLy/mloflrZflvIDlkK9cclxuICAgICAgICAgICAgdGhpcy5rb213ZWkuY2hpbGRyZW5bbnVtYmVyXS5nZXRDaGlsZEJ5TmFtZShcImhlcm9TaGFkb3dcIikuYWN0aXZlPWZhbHNlLy/pmLTlvbFcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBvbkhlcm9Ub3VjaEVuZChlOmNjLkV2ZW50LkV2ZW50VG91Y2gpIHtcclxuICAgICAgICBpZih0aGlzLmNsaWNraGVyb3Bvc2l0aW9uIT0tMSl7XHJcbiAgICAgICAgICAgIHRoaXMuU2VsZnBvc2l0aW9uKHRoaXMuY2xpY2toZXJvcG9zaXRpb24pXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgb25IZXJvVG91Y2hDYW5jZWwoZTpjYy5FdmVudC5FdmVudFRvdWNoKSB7XHJcbiAgICAgICAgbGV0IHRvdWNoVGVhbT1lLmdldEN1cnJlbnRUYXJnZXQoKTtcclxuICAgICAgICBsZXQgU2Nyb2xsVmlld3Bvcz10aGlzLlNjcm9sbFZpZS5wYXJlbnQuY29udmVydFRvTm9kZVNwYWNlQVIoZS5nZXRMb2NhdGlvbigpKTtcclxuICAgICAgICBsZXQgcG9zPXRoaXMua29td2VpLmNvbnZlcnRUb05vZGVTcGFjZUFSKGUuZ2V0TG9jYXRpb24oKSk7XHJcbiAgICAgICAgbGV0IHRlYW1MaXN0PUhlcm9NYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0VGVhbUxpc3QoR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5jdXJfZ2FtZV9tb2RlKTtcclxuICAgICAgICBmb3IobGV0IGk9MDsgaTx0aGlzLmhlcm9fdGVhbV9yZWN0Lmxlbmd0aDsgaSsrKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgaWYodGhpcy5oZXJvX3RlYW1fcmVjdFtpXS5jb250YWlucyhwb3MpPT10cnVlKVxyXG4gICAgICAgICAgICB7ICAgIFxyXG4gICAgICAgICAgICAgICAgdGhpcy5wdXRkb3duaGVyb3Bvc2l0aW9uPWlcclxuICAgICAgICAgICAgICAgIHRoaXMuTW91c2UuYWN0aXZlPWZhbHNlXHJcbiAgICAgICAgICAgICAgICBsZXQgdGVhbUxpc3RwdXRkb3duPXRlYW1MaXN0W3RoaXMucHV0ZG93bmhlcm9wb3NpdGlvbl1cclxuICAgICAgICAgICAgICAgIGxldCB0ZWFtTGlzdGNsaWNraGVybz10ZWFtTGlzdFt0aGlzLmNsaWNraGVyb3Bvc2l0aW9uXVxyXG4gICAgICAgICAgICAgICAgdGVhbUxpc3RbdGhpcy5wdXRkb3duaGVyb3Bvc2l0aW9uXT10ZWFtTGlzdGNsaWNraGVyb1xyXG4gICAgICAgICAgICAgICAgdGVhbUxpc3RbdGhpcy5jbGlja2hlcm9wb3NpdGlvbl09dGVhbUxpc3RwdXRkb3duXHJcbiAgICAgICAgICAgICAgICBIZXJvTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNhdmVUZWFtTGlzdChHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLmN1cl9nYW1lX21vZGUsdGVhbUxpc3QpXHJcbiAgICAgICAgICAgICAgICB0aGlzLlNlbGZwb3NpdGlvbih0aGlzLnB1dGRvd25oZXJvcG9zaXRpb24pXHJcbiAgICAgICAgICAgICAgICB0aGlzLlNlbGZwb3NpdGlvbih0aGlzLmNsaWNraGVyb3Bvc2l0aW9uKVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmKHRoaXMuU2Nyb2xsVmlld3JlY3QuY29udGFpbnMoU2Nyb2xsVmlld3Bvcyk9PXRydWUpe1xyXG4gICAgICAgICAgICB0aGlzLk1vdXNlLmFjdGl2ZT1mYWxzZVxyXG4gICAgICAgICAgICB0ZWFtTGlzdFt0aGlzLmNsaWNraGVyb3Bvc2l0aW9uXT0tMVxyXG4gICAgICAgICAgICBIZXJvTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNhdmVUZWFtTGlzdChHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLmN1cl9nYW1lX21vZGUsdGVhbUxpc3QpXHJcbiAgICAgICAgICAgIC8v5Yi35paw6Iux6ZuEaXRtZeeKtuaAgVxyXG4gICAgICAgICAgICB0aGlzLlJlZnJlc2hoZXJvaXRtZXN0YXR1cygpXHJcbiAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgIHRoaXMuU2VsZnBvc2l0aW9uKHRoaXMuY2xpY2toZXJvcG9zaXRpb24pXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgaW5pdCh1aUFjOiBVaUFjdGlvbikge1xyXG4gICAgICAgIHN1cGVyLmluaXQodWlBYyk7XHJcbiAgICAgICAgLy/lj5bmnKzmqKHlvI8gIOacrOWFs+WNoSAg55qE5oCq54mp5pWw6YeP5LiO57G75Z6LICAgYm9zcyAgIOeyvuiLsSAgIOaZrumAmlxyXG4gICAgICAgIGxldCBsZXZlbD1NYXBNYW5hZ2VyLkN1cnJlbnRsZXZlbC8vTGV2ZWxNYW5hZ2VyLmdldEluc3RhbmNlKCkuc3RhcnRfbGV2ZWw7XHJcbiAgICAgICAgbGV0IGZpZ2h0aW5nSW5mbzpGaWdodGluZ0luZm89bnVsbDtcclxuICAgICAgICB0aGlzLkNvbW1vbl9CdG5fQmFjay5hY3RpdmU9dHJ1ZVxyXG4gICAgICAgIHN3aXRjaChHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLmN1cl9nYW1lX21vZGUpe1xyXG4gICAgICAgICAgICBjYXNlIEdhbWVNb2RlLk1haW46e1xyXG4gICAgICAgICAgICAgICAgZmlnaHRpbmdJbmZvPU1pc3Npb25MZXZlbE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRGaWdodGluZ0luZm8obGV2ZWwpO1xyXG5cclxuICAgICAgICAgICAgfWJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIEdhbWVNb2RlLkVuZGxlc3M6e1xyXG4gICAgICAgICAgICAgICAgbGV0IHdhdmVudW1iZXI9VGhlU3RvcmFnZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXROdW1iZXIoU3RvcmFnZUtleS5VbmxpbWl0ZWRDaGFsbGVuZ2VEYW1hZ2UsMCk7Ly/ms6LmlbBcclxuICAgICAgICAgICAgICAgIGxldCBSb3VuZCA9RW5kbGVzc0xldmVsc01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRSb3VuZCh3YXZlbnVtYmVyKS8v5Zue5ZCI5pWwXHJcbiAgICAgICAgICAgICAgICBmaWdodGluZ0luZm89RW5kbGVzc0xldmVsc01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRGaWdodGluZ0luZm8oUm91bmQpO1xyXG4gICAgICAgICAgICB9YnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgR2FtZU1vZGUuQm9zc19DaGFsbGVuZ2U6e1xyXG4gICAgICAgICAgICAgICAgZmlnaHRpbmdJbmZvPUJvc3NDaGFsbGVuZ2VNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0RmlnaHRpbmdJbmZvKEJvc3NDaGFsbGVuZ2VNYW5hZ2VyLmdldEluc3RhbmNlKCkuY3VyX2NoYWxsZW5nZV9tb2RlKTtcclxuICAgICAgICAgICAgfWJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIEdhbWVNb2RlLk1hemU6e1xyXG4gICAgICAgICAgICAgICAgZmlnaHRpbmdJbmZvPU1hemVNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0RmlnaHRpbmdJbmZvKHRoaXMuTWF6ZWlkKTtcclxuICAgICAgICAgICAgfWJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIEdhbWVNb2RlLlRvd2VyOntcclxuICAgICAgICAgICAgICAgIGZpZ2h0aW5nSW5mbz1Ub3dlckxldmVsTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldEZpZ2h0aW5nSW5mbyhUb3dlck1hbmFnZXIuZ2V0VG93ZXJMZXZlbCgpKTtcclxuICAgICAgICAgICAgfWJyZWFrO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLlByZXBhcmVfQnRuX01vbnN0ZXIuYWN0aXZlPXRydWVcclxuICAgICAgICBsZXQgbGlzdD1maWdodGluZ0luZm8uZ2V0T25seU1vbnN0ZXJEYXRhTGlzdCgpO1xyXG4gICAgICAgIHRoaXMubGV2ZWx0eHQuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmc9XCJcIitmaWdodGluZ0luZm8udGl0bGVfbmFtZVxyXG4gICAgICAgIGlmKEdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuY3VyX2dhbWVfbW9kZT09R2FtZU1vZGUuTWFpbil7XHJcbiAgICAgICAgICAgIGxldCBjaGFwdGVyPShNaXNzaW9uTGV2ZWxNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0Q2hhcHRlcihsZXZlbCkpLTFcclxuICAgICAgICAgICAgdGhpcy5teWJqLmdldENvbXBvbmVudChjYy5TcHJpdGUpLnNwcml0ZUZyYW1lPXRoaXMuYmpbY2hhcHRlcl1cclxuICAgICAgICAgICAgdGhpcy5teXdhbGwuZ2V0Q29tcG9uZW50KGNjLlNwcml0ZSkuc3ByaXRlRnJhbWU9dGhpcy53YWxsW2NoYXB0ZXJdXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmKEdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuY3VyX2dhbWVfbW9kZT09R2FtZU1vZGUuRW5kbGVzcyl7XHJcbiAgICAgICAgICAgIHRoaXMubXliai5nZXRDb21wb25lbnQoY2MuU3ByaXRlKS5zcHJpdGVGcmFtZT10aGlzLmJnX0VuZGxlc3NcclxuICAgICAgICAgICAgdGhpcy5teXdhbGwuZ2V0Q29tcG9uZW50KGNjLlNwcml0ZSkuc3ByaXRlRnJhbWU9dGhpcy53YWxsWzRdXHJcbiAgICAgICAgICAgIHRoaXMuUHJlcGFyZV9CdG5fTW9uc3Rlci5hY3RpdmU9ZmFsc2VcclxuICAgICAgICAgICAgbGlzdD1bXVxyXG4gICAgICAgIH1cclxuICAgICAgICBpZihHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLmN1cl9nYW1lX21vZGU9PUdhbWVNb2RlLkJvc3NfQ2hhbGxlbmdlKXtcclxuXHJcbiAgICAgICAgICAgIGxldCBSb3RhdGlvbk9yZGVycyA9IFVzZXJJbmZvLmdldEluc3RhbmNlKCkuUm90YXRpb25PcmRlci8v6L2u5o2i6aG65bqPXHJcbiAgICAgICAgICAgIGxldCBTdGFnZSA9IDEvL+mYtuautVxyXG4gICAgICAgICAgICBsZXQgQ2hhbGxlbmdlSUQgPSBSb3RhdGlvbk9yZGVycyAqIDEwMDAgKyBTdGFnZS8v5oyR5oiYSURcclxuICAgICAgICAgICAgbGV0IFJvdGF0aW9uT3JkZXIgPSBCb3NzQ2hhbGxlbmdlTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldENoYXB0ZXJTY2VuZShDaGFsbGVuZ2VJRCkvLyhVc2VySW5mby5nZXRJbnN0YW5jZSgpLlJvdGF0aW9uT3JkZXIpLTEvL+i9ruaNoumhuuW6j1xyXG4gICAgICAgICAgICB0aGlzLm15YmouZ2V0Q29tcG9uZW50KGNjLlNwcml0ZSkuc3ByaXRlRnJhbWU9dGhpcy5ialtSb3RhdGlvbk9yZGVyXVxyXG4gICAgICAgICAgICB0aGlzLm15d2FsbC5nZXRDb21wb25lbnQoY2MuU3ByaXRlKS5zcHJpdGVGcmFtZT10aGlzLndhbGxbUm90YXRpb25PcmRlcl0gICAgXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmKEdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuY3VyX2dhbWVfbW9kZT09R2FtZU1vZGUuTWF6ZSl7XHJcbiAgICAgICAgICAgIHRoaXMubXliai5nZXRDb21wb25lbnQoY2MuU3ByaXRlKS5zcHJpdGVGcmFtZT10aGlzLmJnX01hemVcclxuICAgICAgICAgICAgdGhpcy5teXdhbGwuZ2V0Q29tcG9uZW50KGNjLlNwcml0ZSkuc3ByaXRlRnJhbWU9dGhpcy5iZ193YWxsXHJcbiAgICAgICAgICAgIHRoaXMuQ29tbW9uX0J0bl9CYWNrLmFjdGl2ZT1mYWxzZVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy/lj5blh7pib3NzXHJcbiAgICAgICAgbGV0IGJvc3NhcnI9W11cclxuICAgICAgICBsZXQganlhcnI9W11cclxuICAgICAgICBsZXQgcHV0PVtdXHJcbiAgICAgICAgZm9yIChsZXQgYm9zc2luZGV4ID0gMDsgYm9zc2luZGV4IDwgbGlzdC5sZW5ndGg7IGJvc3NpbmRleCsrKSB7XHJcbiAgICAgICAgICAgIGlmKE1vbnN0ZXJDb25maWd1cmVNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0U3RyZW5ndGhUeXBlKGxpc3RbYm9zc2luZGV4XS5pZCk9PTMpe1xyXG4gICAgICAgICAgICAgICAgYm9zc2Fyci5wdXNoKGxpc3RbYm9zc2luZGV4XSlcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZihNb25zdGVyQ29uZmlndXJlTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldFN0cmVuZ3RoVHlwZShsaXN0W2Jvc3NpbmRleF0uaWQpPT0yKXtcclxuICAgICAgICAgICAgICAgIGp5YXJyLnB1c2gobGlzdFtib3NzaW5kZXhdKVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmKE1vbnN0ZXJDb25maWd1cmVNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0U3RyZW5ndGhUeXBlKGxpc3RbYm9zc2luZGV4XS5pZCk9PTEpe1xyXG4gICAgICAgICAgICAgICAgcHV0LnB1c2gobGlzdFtib3NzaW5kZXhdKVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8v5o+S5YWlXHJcbiAgICAgICAgdGhpcy5Nb25zdGVyRGV0YWlsc2Fyci5sZW5ndGg9MFxyXG4gICAgICAgIHRoaXMuTW9uc3RlckRldGFpbHNhcnIuc3BsaWNlLmFwcGx5KHRoaXMuTW9uc3RlckRldGFpbHNhcnIsW3RoaXMuTW9uc3RlckRldGFpbHNhcnIubGVuZ3RoLDBdLmNvbmNhdChib3NzYXJyKSk7XHJcbiAgICAgICAgdGhpcy5Nb25zdGVyRGV0YWlsc2Fyci5zcGxpY2UuYXBwbHkodGhpcy5Nb25zdGVyRGV0YWlsc2FycixbdGhpcy5Nb25zdGVyRGV0YWlsc2Fyci5sZW5ndGgsMF0uY29uY2F0KGp5YXJyKSk7XHJcbiAgICAgICAgdGhpcy5Nb25zdGVyRGV0YWlsc2Fyci5zcGxpY2UuYXBwbHkodGhpcy5Nb25zdGVyRGV0YWlsc2FycixbdGhpcy5Nb25zdGVyRGV0YWlsc2Fyci5sZW5ndGgsMF0uY29uY2F0KHB1dCkpO1xyXG4gICAgICAgIC8v5oCq54mp5Yi35pawXHJcbiAgICAgICAgZm9yIChsZXQgaW5kZXggPSAwOyBpbmRleCA8IHRoaXMucG9zLmNoaWxkcmVuLmxlbmd0aDsgaW5kZXgrKykge1xyXG4gICAgICAgICAgICBsZXQgdHlwZT0wXHJcbiAgICAgICAgICAgIGxldCBpZD0wXHJcbiAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKFwiKioqKipcIixib3NzYXJyLmxlbmd0aCxqeWFyci5sZW5ndGgscHV0Lmxlbmd0aClcclxuICAgICAgICAgICAgaWYoaW5kZXg8Ym9zc2Fyci5sZW5ndGgpe1xyXG4gICAgICAgICAgICAgICAgaWQ9Ym9zc2FycltpbmRleF0uaWRcclxuICAgICAgICAgICAgICAgIHR5cGU9TW9uc3RlckNvbmZpZ3VyZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRNb25zdGVyQ2xhc3MoaWQpO1xyXG5cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIGlmKGluZGV4PChib3NzYXJyLmxlbmd0aCtqeWFyci5sZW5ndGgpKXtcclxuXHJcbiAgICAgICAgICAgICAgICBpZD1qeWFyclsoaW5kZXgtKGJvc3NhcnIubGVuZ3RoKSldLmlkXHJcbiAgICAgICAgICAgICAgICB0eXBlPU1vbnN0ZXJDb25maWd1cmVNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0TW9uc3RlckNsYXNzKGlkKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIGlmKGluZGV4PChib3NzYXJyLmxlbmd0aCtqeWFyci5sZW5ndGgrcHV0Lmxlbmd0aCkpe1xyXG4gICAgICAgICAgICAgICAgaWQ9cHV0WyhpbmRleC1ib3NzYXJyLmxlbmd0aC1qeWFyci5sZW5ndGgpXS5pZFxyXG4gICAgICAgICAgICAgICAgdHlwZT1Nb25zdGVyQ29uZmlndXJlTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldE1vbnN0ZXJDbGFzcyhpZCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy5oZXJvU2hhZG93LmNoaWxkcmVuW2luZGV4XS5hY3RpdmU9ZmFsc2VcclxuICAgICAgICAgICAgaWYodHlwZT4wKXtcclxuICAgICAgICAgICAgICAgIGxldCBwYXRoID0gXCJtb25zdGVyL3VpL01vbnN0ZXJfXCIgKyB0eXBlO1xyXG4gICAgICAgICAgICAgICAgbGV0IG5vZGU6Y2MuTm9kZSA9IG51bGw7XHJcblxyXG4gICAgICAgICAgICAgICAgV1hNYW5hZ2VyRVguZ2V0SW5zdGFuY2UoKS5yZXNvdXJjZXNCdW5kbGUubG9hZChwYXRoLGNjLlByZWZhYiwoZXJyb3I6IEVycm9yLCBhc3NldHM6Y2MuUHJlZmFiKT0+eyAgXHJcbiAgICAgICAgICAgICAgICAgICAgaWYoZXJyb3Ipe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjYy5sb2coZXJyb3IpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIG5vZGUgPSBjYy5pbnN0YW50aWF0ZShhc3NldHMpO1xyXG4gICAgICAgICAgICAgICAgICAgIG5vZGUuc2V0UG9zaXRpb24oMCwwLDApXHJcbiAgICAgICAgICAgICAgICAgICAgbm9kZS5zY2FsZSA9IE1vbnN0ZXJDb25maWd1cmVNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0U2NhbGUoaWQpO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKFwiaWQ6XCIsaWQpXHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IFN0cmVuZ3RoVHlwZT0gTW9uc3RlckNvbmZpZ3VyZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRTdHJlbmd0aFR5cGUoaWQpXHJcbiAgICAgICAgICAgICAgICAgICAgbm9kZS5wYXJlbnQ9dGhpcy5wb3MuY2hpbGRyZW5baW5kZXhdXHJcblxyXG5cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5oZXJvU2hhZG93LmNoaWxkcmVuW2luZGV4XS5hY3RpdmU9dHJ1ZVxyXG4gICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKFwiX19fX19fX1wiLG5vZGUsdGhpcy5wb3MuY2hpbGRyZW5baW5kZXhdKVxyXG4gICAgICAgICAgICAgICAgICAgIC8vIGlmKClcclxuICAgICAgICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhcIl9fX19fX19fXCIsKVxyXG4gICAgICAgICAgICAgICAgICAgIC8vIGlmKGluZGV4PGJvc3NhcnIubGVuZ3RoKXtcclxuICAgICAgICAgICAgICAgICAgICAvLyBsZXQgbmFtZT1TdHJpbmcobm9kZS5nZXRDb21wb25lbnQoc3AuU2tlbGV0b24pLmRlZmF1bHRTa2luKVxyXG4gICAgICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKFwiKysrKysrKysrKytcIix0eXBlLFN0cmVuZ3RoVHlwZSlcclxuICAgICAgICAgICAgICAgICAgICAvLyBpZihuYW1lLnN1YnN0cmluZygwLDUpPT1Nb25zdGVyRmFjZU5hbWUuRnJvbnQpe1xyXG4gICAgICAgICAgICAgICAgICAgIGlmKFN0cmVuZ3RoVHlwZT09Myl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuaGVyb1NoYWRvdy5jaGlsZHJlbltpbmRleF0uc2V0U2NhbGUoMS4zLDEuMylcclxuICAgICAgICAgICAgICAgICAgICAgICAgbm9kZS5zY2FsZT1Nb25zdGVyQ29uZmlndXJlTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldFNjYWxlKGlkKSowLjU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIG5vZGUuZ2V0Q29tcG9uZW50KHNwLlNrZWxldG9uKS5zZXRTa2luKE1vbnN0ZXJGYWNlTmFtZS5Gcm9udCArIE1vbnN0ZXJDb25maWd1cmVNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0U2tpbihpZCkpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBub2RlLmdldENvbXBvbmVudChzcC5Ta2VsZXRvbikuc2V0QW5pbWF0aW9uKDAsTW9uc3RlckFjdGlvbk5hbWUuSWRsZSx0cnVlKTsvL25vZGUuZ2V0Q29tcG9uZW50KHNwLlNrZWxldG9uKS5zZXRBbmltYXRpb24oMCxNb25zdGVyRmFjZU5hbWUuRnJvbnQgKyBcIl9cIiArIE1vbnN0ZXJBY3Rpb25OYW1lLklkbGUsdHJ1ZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmKFN0cmVuZ3RoVHlwZT09Mil7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuaGVyb1NoYWRvdy5jaGlsZHJlbltpbmRleF0uc2V0U2NhbGUoMC43LDAuNylcclxuICAgICAgICAgICAgICAgICAgICAgICAgbm9kZS5zY2FsZT1Nb25zdGVyQ29uZmlndXJlTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldFNjYWxlKGlkKSowLjY7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG5vZGUuZ2V0Q29tcG9uZW50KHNwLlNrZWxldG9uKS5zZXRTa2luKE1vbnN0ZXJGYWNlTmFtZS5TaWRlUiArIE1vbnN0ZXJDb25maWd1cmVNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0U2tpbihpZCkpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBub2RlLmdldENvbXBvbmVudChzcC5Ta2VsZXRvbikuc2V0QW5pbWF0aW9uKDAsTW9uc3RlckZhY2VOYW1lLlNpZGVSK1wiX1wiK01vbnN0ZXJBY3Rpb25OYW1lLklkbGUsdHJ1ZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmKFN0cmVuZ3RoVHlwZT09MSl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuaGVyb1NoYWRvdy5jaGlsZHJlbltpbmRleF0uc2V0U2NhbGUoMC40LDAuNCApXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG5vZGUuc2NhbGU9TW9uc3RlckNvbmZpZ3VyZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRTY2FsZShpZCkqMC44O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBub2RlLmdldENvbXBvbmVudChzcC5Ta2VsZXRvbikuc2V0U2tpbihNb25zdGVyRmFjZU5hbWUuU2lkZVIgKyBNb25zdGVyQ29uZmlndXJlTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldFNraW4oaWQpKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbm9kZS5nZXRDb21wb25lbnQoc3AuU2tlbGV0b24pLnNldEFuaW1hdGlvbigwLE1vbnN0ZXJGYWNlTmFtZS5TaWRlUitcIl9cIitNb25zdGVyQWN0aW9uTmFtZS5JZGxlLHRydWUpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gbGV0IHNjYWxlPW5vZGUuc2NhbGVYXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gbGV0IHJvbT1NeVRvb2wucmFuZG9tKDAsMSlcclxuICAgICAgICAgICAgICAgICAgICAvLyBpZihyb209PTApe1xyXG4gICAgICAgICAgICAgICAgICAgIC8vICAgICBzY2FsZT1zY2FsZSotMVxyXG4gICAgICAgICAgICAgICAgICAgIC8vIH1cclxuICAgICAgICAgICAgICAgICAgICAvLyBub2RlLnNjYWxlWD1zY2FsZVxyXG4gICAgICAgICAgICAgICAgICAgIC8vIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gfVxyXG4gICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8v5Yi35paw6Iux6ZuEaXRtZeeKtuaAgVxyXG4gICAgICAgIHRoaXMuUmVmcmVzaGhlcm9pdG1lc3RhdHVzKClcclxuICAgICAgICAvLyBIZXJvTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNhdmVUZWFtTGlzdChHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLmN1cl9nYW1lX21vZGUsdGVhbUxpc3QpOy8v5bCG5pu05pS55LmL5ZCO55qE6Zi15Z6L5L+d5oyB5Yiw5pys5ZywXHJcbiAgICAgICAgbGV0IGNhbnZhcyA9IGNjLmZpbmQoXCJDYW52YXNcIilcclxuICAgICAgICB0aGlzLm5vZGUuZ2V0Q29tcG9uZW50KGNjLldpZGdldCkudGFyZ2V0PWNhbnZhc1xyXG4gICAgICAgIHRoaXMuTW9uc3Rlci5hY3RpdmU9ZmFsc2VcclxuICAgICAgICB0aGlzLkNoYXJpb3QuYWN0aXZlPWZhbHNlXHJcbiAgICB9XHJcbiAgICAvL+WIt+aWsOiLsembhGl0bWXnirbmgIFcclxuICAgIFJlZnJlc2hoZXJvaXRtZXN0YXR1cygpe1xyXG4gICAgICAgIC8v5bey6Kej6ZSB55qE6Iux6ZuEXHJcbiAgICAgICAgbGV0IEhlcm9MaXN0PUhlcm9NYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0SGVyb0xpc3QoKS8v5pWw6YePICAg6Iux6ZuEaWTnsbvlnosg6Iux6ZuE562J57qnIOiLsembhOWTgei0qCAg6Iux6ZuE5pif5pif6Zi25q61XHJcbiAgICAgICAgbGV0IGhlcm9CYXNpY2RhdGFhcnI9W10vL+acgOmrmOaImOWKm+aVsOe7hFxyXG4gICAgICAgIGxldCBIZXJvTGlzdGFycj1IZXJvTGlzdC8v5bey6Kej6ZSB55qE6Iux6ZuEXHJcbiAgICAgICAgLy/nlJ/miJDoi7Hpm4RpdG1lXHJcbiAgICAgICAgZm9yIChsZXQgaGVyb2luZGV4ID0gdGhpcy5ndWFpd3VhcnIubGVuZ3RoOyBoZXJvaW5kZXggPCBIZXJvTGlzdC5sZW5ndGg7IGhlcm9pbmRleCsrKSB7XHJcbiAgICAgICAgICAgIGxldCBoZXJvID0gY2MuaW5zdGFudGlhdGUodGhpcy5oZXJvX2l0ZW0pO1xyXG4gICAgICAgICAgICBoZXJvLm5hbWU9XCJcIitoZXJvaW5kZXhcclxuICAgICAgICAgICAgaGVyby5zZXRTY2FsZSgwLjc1LDAuNzUpXHJcbiAgICAgICAgICAgIGhlcm8ucGFyZW50PXRoaXMuY29udGVudFxyXG4gICAgICAgICAgICB0aGlzLmd1YWl3dWFyci5wdXNoKGhlcm8pXHJcbiAgICAgICAgICAgIC8vIGhlcm8ub24oY2MuTm9kZS5FdmVudFR5cGUuVE9VQ0hfU1RBUlQsIHRoaXMub25IZXJvSXRlbVRvdWNoU3RhcnQsIHRoaXMpO1xyXG4gICAgICAgICAgICAvLyBoZXJvLm9uKGNjLk5vZGUuRXZlbnRUeXBlLlRPVUNIX01PVkUsIHRoaXMub25IZXJvSXRlbVRvdWNoTW92ZSwgdGhpcyk7XHJcbiAgICAgICAgICAgIGhlcm8ub24oY2MuTm9kZS5FdmVudFR5cGUuVE9VQ0hfRU5ELCB0aGlzLm9uSGVyb0l0ZW1Ub3VjaEVuZCwgdGhpcyk7XHJcbiAgICAgICAgICAgIC8vIGhlcm8ub24oY2MuTm9kZS5FdmVudFR5cGUuVE9VQ0hfQ0FOQ0VMLCB0aGlzLm9uSGVyb0l0ZW1Ub3VjaENhbmNlbCwgdGhpcyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8v5Yi35paw6Iux6ZuEaXRtZVxyXG4gICAgICAgIGZvciAobGV0IGhlcm9CYXNpY2RhdGFpbmRleCA9IDA7IGhlcm9CYXNpY2RhdGFpbmRleCA8IEhlcm9MaXN0Lmxlbmd0aDsgaGVyb0Jhc2ljZGF0YWluZGV4KyspIHtcclxuICAgICAgICAgICAgbGV0IGhlcm9CYXNpY2RhdGE9SGVyb01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRIZXJvRGF0YShIZXJvTGlzdFtoZXJvQmFzaWNkYXRhaW5kZXhdLmhlcm9fdHlwZSkvL+iLsembhOeahOWfuuehgOaVsOaNriAgIOS8oOWFpeiLsembhGlk57G75Z6LICDpmLLlvqHlipsgIOeUn+WRveWAvCAg5ZG95Lit5YC8IFxyXG4gICAgICAgICAgICBoZXJvQmFzaWNkYXRhYXJyLnB1c2goaGVyb0Jhc2ljZGF0YS50b3RhbF9hdHRhY2spXHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8v5o6S5YiX6Iux6ZuE5oiY5YqbXHJcbiAgICAgICAgbGV0IGN1blxyXG4gICAgICAgIGxldCBoZXJvY3VuXHJcbiAgICAgICAgZm9yIChsZXQgaW5kZXggPSAwOyBpbmRleCA8IGhlcm9CYXNpY2RhdGFhcnIubGVuZ3RoOyBpbmRleCsrKSB7XHJcbiAgICAgICAgICAgIGZvciAobGV0IHBhaXh2aW5kZXggPSAwOyBwYWl4dmluZGV4IDwgaGVyb0Jhc2ljZGF0YWFyci5sZW5ndGgtMTsgcGFpeHZpbmRleCsrKSB7XHJcbiAgICAgICAgICAgICAgICBpZihoZXJvQmFzaWNkYXRhYXJyW3BhaXh2aW5kZXgrMV0+aGVyb0Jhc2ljZGF0YWFycltwYWl4dmluZGV4XSl7XHJcbiAgICAgICAgICAgICAgICAgICAgY3VuPWhlcm9CYXNpY2RhdGFhcnJbcGFpeHZpbmRleF1cclxuICAgICAgICAgICAgICAgICAgICBoZXJvQmFzaWNkYXRhYXJyW3BhaXh2aW5kZXhdPWhlcm9CYXNpY2RhdGFhcnJbcGFpeHZpbmRleCsxXVxyXG4gICAgICAgICAgICAgICAgICAgIGhlcm9CYXNpY2RhdGFhcnJbcGFpeHZpbmRleCsxXT1jdW5cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaGVyb2N1bj1IZXJvTGlzdGFycltwYWl4dmluZGV4XVxyXG4gICAgICAgICAgICAgICAgICAgIEhlcm9MaXN0YXJyW3BhaXh2aW5kZXhdPUhlcm9MaXN0YXJyW3BhaXh2aW5kZXgrMV1cclxuICAgICAgICAgICAgICAgICAgICBIZXJvTGlzdGFycltwYWl4dmluZGV4KzFdPWhlcm9jdW5cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBsZXQgdGVhbUxpc3Q9SGVyb01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRUZWFtTGlzdChHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLmN1cl9nYW1lX21vZGUpO1xyXG5cclxuICAgICAgICAvLyBjb25zb2xlLmxvZyhcIisrKysrK1wiLHRlYW1MaXN0KVxyXG4gICAgICAgIHRoaXMuZ3JleWJ1dHRvbmp1ZGdtZW50PTAvL+eBsOiJsuaMiemSruWIpOaWrSDlpoLmnpzmsqHmnInkuIDkuKroi7Hpm4TkuIrpmLUgIOS4jeWPr+W8gOWQr+a4uOaIj1xyXG5cclxuICAgICAgICBsZXQgIEdvdG9iYXR0bGVudW1iZXI9MC8v5LiK6Zi15LqG5Yeg5Liq6Iux6ZuEXHJcbiAgICAgICAgZm9yKGxldCBpPTA7IGk8dGVhbUxpc3QubGVuZ3RoOyBpKyspIFxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgbGV0IGhlcm9UeXBlPXRlYW1MaXN0W2ldO1xyXG4gICAgICAgICAgICBpZihoZXJvVHlwZT4wKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBHb3RvYmF0dGxlbnVtYmVyKytcclxuXHJcbiAgICAgICAgICAgICAgICB0aGlzLmdyZXlidXR0b25qdWRnbWVudD0xXHJcbiAgICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhcIisrKysrK1wiLGhlcm9UeXBlKVxyXG4gICAgICAgICAgICAgICAgdGhpcy5rb213ZWkuY2hpbGRyZW5baV0uZ2V0Q2hpbGRCeU5hbWUoXCJQcmVwYXJlX1ZvaWRcIikuYWN0aXZlPWZhbHNlXHJcbiAgICAgICAgICAgICAgICB0aGlzLmtvbXdlaS5jaGlsZHJlbltpXS5nZXRDaGlsZEJ5TmFtZShcIndpblRleHRcIikuYWN0aXZlPWZhbHNlXHJcbiAgICAgICAgICAgICAgICB0aGlzLmtvbXdlaS5jaGlsZHJlbltpXS5nZXRDaGlsZEJ5TmFtZShcImhlcm9TaGFkb3dcIikuYWN0aXZlPXRydWUvL+mYtOW9sVxyXG4gICAgICAgICAgICAgICAgdGhpcy5rb213ZWkuY2hpbGRyZW5baV0uZ2V0Q2hpbGRCeU5hbWUoXCJoZXJvXCIpLmFjdGl2ZT10cnVlXHJcbiAgICAgICAgICAgICAgICB0aGlzLmtvbXdlaS5jaGlsZHJlbltpXS5nZXRDaGlsZEJ5TmFtZShcImhlcm9cIikuZ2V0Q29tcG9uZW50KHNwLlNrZWxldG9uKS5za2VsZXRvbkRhdGE9dGhpcy5zcFsoaGVyb1R5cGUtMSldXHJcbiAgICAgICAgICAgICAgICB0aGlzLmtvbXdlaS5jaGlsZHJlbltpXS5nZXRDaGlsZEJ5TmFtZShcImhlcm9cIikuZ2V0Q29tcG9uZW50KHNwLlNrZWxldG9uKS5hbmltYXRpb249XCJJZGxlXCJcclxuICAgICAgICAgICAgICAgIC8vIHRoaXMubG9hZEhlcm8oaGVyb1R5cGUsaSlcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNle1xyXG4gICAgICAgICAgICAgICAgdGhpcy5rb213ZWkuY2hpbGRyZW5baV0uZ2V0Q2hpbGRCeU5hbWUoXCJ3aW5UZXh0XCIpLmFjdGl2ZT10cnVlXHJcbiAgICAgICAgICAgICAgICB0aGlzLmtvbXdlaS5jaGlsZHJlbltpXS5nZXRDaGlsZEJ5TmFtZShcImhlcm9TaGFkb3dcIikuYWN0aXZlPWZhbHNlLy/pmLTlvbFcclxuICAgICAgICAgICAgICAgIHRoaXMua29td2VpLmNoaWxkcmVuW2ldLmdldENoaWxkQnlOYW1lKFwiUHJlcGFyZV9Wb2lkXCIpLmFjdGl2ZT10cnVlXHJcbiAgICAgICAgICAgICAgICB0aGlzLmtvbXdlaS5jaGlsZHJlbltpXS5nZXRDaGlsZEJ5TmFtZShcImhlcm9cIikuYWN0aXZlPWZhbHNlXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgLy8gY29uc29sZS5sb2coXCJfX19fX19fXCIsR290b2JhdHRsZW51bWJlcilcclxuICAgICAgICBmb3IgKGxldCBpbmRleCA9IDA7IGluZGV4IDwgR290b2JhdHRsZW51bWJlcjsgaW5kZXgrKykge1xyXG4gICAgICAgICAgICBpZihHb3RvYmF0dGxlbnVtYmVyID4gVGFza01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRUYXNrTm93UHJvZ3Jlc3MoVGFza0l0ZW0u5LiK6Zi1WOWQjeiLsembhCkpe1xyXG4gICAgICAgICAgICAgICAgVGFza01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5lbWl0VGFzayhUYXNrSXRlbS7kuIrpmLVY5ZCN6Iux6ZuEKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYodGhpcy5ncmV5YnV0dG9uanVkZ21lbnQ9PTApe1xyXG4gICAgICAgICAgICB0aGlzLkNvbW1vbl9CdG5fMC5nZXRDaGlsZEJ5TmFtZShcIkxhYmVsXCIpLmdldENvbXBvbmVudChUZXh0TGFuZ3VhZ2UpLnNldE1hdGVyaWFsKDAsIGNjLk1hdGVyaWFsLmdldEJ1aWx0aW5NYXRlcmlhbChcIjJkLWdyYXktc3ByaXRlXCIpKTtcclxuICAgICAgICAgICAgdGhpcy5Db21tb25fQnRuXzAuZ2V0Q29tcG9uZW50KGNjLlNwcml0ZSkuc2V0TWF0ZXJpYWwoMCwgY2MuTWF0ZXJpYWwuZ2V0QnVpbHRpbk1hdGVyaWFsKFwiMmQtZ3JheS1zcHJpdGVcIikpO1xyXG4gICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICB0aGlzLkNvbW1vbl9CdG5fMC5nZXRDaGlsZEJ5TmFtZShcIkxhYmVsXCIpLmdldENvbXBvbmVudChUZXh0TGFuZ3VhZ2UpLnNldE1hdGVyaWFsKDAsIGNjLk1hdGVyaWFsLmdldEJ1aWx0aW5NYXRlcmlhbChcIjJkLXNwcml0ZVwiKSk7XHJcbiAgICAgICAgICAgIHRoaXMuQ29tbW9uX0J0bl8wLmdldENvbXBvbmVudChjYy5TcHJpdGUpLnNldE1hdGVyaWFsKDAsIGNjLk1hdGVyaWFsLmdldEJ1aWx0aW5NYXRlcmlhbChcIjJkLXNwcml0ZVwiKSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvL+WIt+aWsOiLsembhGl0bWXnirbmgIFcclxuICAgICAgICAvL+ihgOmHj1xyXG4gICAgICAgIGxldCBqZHRudW1iZXI9MFxyXG4gICAgICAgIGZvciAobGV0IHNodWF4aW5naW5kZXggPSAwOyBzaHVheGluZ2luZGV4IDwgSGVyb0xpc3RhcnIubGVuZ3RoOyBzaHVheGluZ2luZGV4KyspIHtcclxuICAgICAgICAgICAgdGhpcy5ndWFpd3VhcnJbc2h1YXhpbmdpbmRleF0uZ2V0Q29tcG9uZW50KEhlcm9JdGVtKS5SZWZyZXNoSGVyb2VzSXRlbShIZXJvTGlzdGFycltzaHVheGluZ2luZGV4XS5oZXJvX3R5cGUpXHJcbiAgICAgICAgICAgIGZvciAobGV0IHRlYW1MaXN0aW5kZXggPSAwOyB0ZWFtTGlzdGluZGV4IDwgdGVhbUxpc3QubGVuZ3RoOyB0ZWFtTGlzdGluZGV4KyspIHtcclxuICAgICAgICAgICAgICAgIGlmKHRlYW1MaXN0W3RlYW1MaXN0aW5kZXhdPT1IZXJvTGlzdGFycltzaHVheGluZ2luZGV4XS5oZXJvX3R5cGUpe1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZ3VhaXd1YXJyW3NodWF4aW5naW5kZXhdLmdldENoaWxkQnlOYW1lKFwic2hhbmd6aGVuZ1wiKS5hY3RpdmU9dHJ1ZVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBmb3IgKGxldCB4dWVsaW5kZXggPSAwOyB4dWVsaW5kZXggPCB0ZWFtTGlzdC5sZW5ndGg7IHh1ZWxpbmRleCsrKSB7XHJcbiAgICAgICAgICAgIGlmKHRlYW1MaXN0W3h1ZWxpbmRleF0+MCl7XHJcbiAgICAgICAgICAgICAgICBqZHRudW1iZXIrPUhlcm9NYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0SGVyb0RhdGEodGVhbUxpc3RbeHVlbGluZGV4XSkudG90YWxfaHAvL+iLsembhOeahOWfuuehgOaVsOaNriAgIOS8oOWFpeiLsembhGlk57G75Z6LICDpmLLlvqHlipsgIOeUn+WRveWAvCAg5ZG95Lit5YC8ICBcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICAvLyBjYy5sb2coTWF0aC5yb3VuZCgxLjExMSkpOy8vMVxyXG4gICAgICAgIGpkdG51bWJlcj1NYXRoLnJvdW5kKGpkdG51bWJlci81KVxyXG4gICAgICAgIC8vIGNvbnNvbGUubG9nKFwiX19fX19fX1wiLGpkdG51bWJlcilcclxuICAgICAgICAvL+WIt+aWsOihgOmHj1xyXG4gICAgICAgIHRoaXMuamR0LmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nPVwiXCIramR0bnVtYmVyK1wiL1wiK1wiXCIramR0bnVtYmVyXHJcbiAgICB9XHJcbiAgICAvLyBvbkhlcm9JdGVtVG91Y2hTdGFydChlOmNjLkV2ZW50LkV2ZW50VG91Y2gpIHtcclxuICAgIC8vICAgICBsZXQgdG91Y2hUZWFtPWUuZ2V0Q3VycmVudFRhcmdldCgpO1xyXG4gICAgLy8gICAgIGNvbnNvbGUubG9nKFwi54K55Ye777yaXCIsdG91Y2hUZWFtLm5hbWUpXHJcbiAgICAvLyAgICAgdGhpcy5TY3JvbGxWaWV3cy5nZXRDb21wb25lbnQoY2MuU2Nyb2xsVmlldykuZW5hYmxlZD1mYWxzZVxyXG4gICAgLy8gICAgIC8v5aaC5p6c6L+Z5Liq6Iux6ZuE5rKh5pyJ5LiK6Zi1ICAg5bCx5Y+v5Lul5ouW5Ye66L+Z5Liq6Iux6ZuEXHJcbiAgICAvLyAgICAgaWYodG91Y2hUZWFtLmdldENoaWxkQnlOYW1lKFwic2hhbmd6aGVuZ1wiKS5hY3RpdmU9PWZhbHNlKXtcclxuICAgIC8vICAgICAgICAgbGV0IHBvcz10aGlzLmtvbXdlaS5jb252ZXJ0VG9Ob2RlU3BhY2VBUihlLmdldExvY2F0aW9uKCkpO1xyXG4gICAgLy8gICAgICAgICB0aGlzLk1vdXNlaXRlbS5nZXRDb21wb25lbnQoSGVyb0l0ZW0pLmhlcm9UeXBlPXRvdWNoVGVhbS5nZXRDb21wb25lbnQoSGVyb0l0ZW0pLmhlcm9UeXBlXHJcbiAgICAvLyAgICAgICAgIHRoaXMuTW91c2VpdGVtLmdldENvbXBvbmVudChIZXJvSXRlbSkuUmVmcmVzaEhlcm9lc0l0ZW0odG91Y2hUZWFtLmdldENvbXBvbmVudChIZXJvSXRlbSkuaGVyb1R5cGUpXHJcbiAgICAvLyAgICAgICAgIHRoaXMuTW91c2VpdGVtLnNldFBvc2l0aW9uKHBvcylcclxuICAgIC8vICAgICAgICAgdGhpcy5Nb3VzZWl0ZW0uYWN0aXZlPXRydWVcclxuICAgIC8vICAgICB9ZWxzZXtcclxuICAgIC8vICAgICAgICAgR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zaG93TWVzc2FnZShMYW5ndWFnZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRTdHJCeVRleHRJZCgxMDAwOTEpKVxyXG4gICAgLy8gICAgIH1cclxuICAgIC8vIH1cclxuICAgIC8vIG9uSGVyb0l0ZW1Ub3VjaE1vdmUoZTpjYy5FdmVudC5FdmVudFRvdWNoKSB7XHJcbiAgICAvLyAgICAgbGV0IHRvdWNoVGVhbT1lLmdldEN1cnJlbnRUYXJnZXQoKTtcclxuICAgIC8vICAgICBjb25zb2xlLmxvZyhcIuenu+WKqO+8mlwiLHRvdWNoVGVhbS5uYW1lKVxyXG4gICAgLy8gICAgIC8v5ouW5Yqo6L+Z5Liq6Iux6ZuEXHJcbiAgICAvLyAgICAgaWYodG91Y2hUZWFtLmdldENoaWxkQnlOYW1lKFwic2hhbmd6aGVuZ1wiKS5hY3RpdmU9PWZhbHNlJiZ0aGlzLk1vdXNlaXRlbS5hY3RpdmU9PXRydWUpe1xyXG4gICAgLy8gICAgICAgICBsZXQgcG9zPXRoaXMua29td2VpLmNvbnZlcnRUb05vZGVTcGFjZUFSKGUuZ2V0TG9jYXRpb24oKSk7XHJcbiAgICAvLyAgICAgICAgIHRoaXMuTW91c2VpdGVtLnNldFBvc2l0aW9uKHBvcylcclxuICAgIC8vICAgICB9ZWxzZXtcclxuICAgIC8vICAgICAgICAgR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zaG93TWVzc2FnZShMYW5ndWFnZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRTdHJCeVRleHRJZCgxMDAwOTEpKVxyXG4gICAgLy8gICAgIH1cclxuICAgIC8vIH1cclxuICAgIG9uSGVyb0l0ZW1Ub3VjaEVuZChlOmNjLkV2ZW50LkV2ZW50VG91Y2gpIHtcclxuICAgICAgICBsZXQgdG91Y2hUZWFtPWUuZ2V0Q3VycmVudFRhcmdldCgpO1xyXG4gICAgICAgIC8vIGNvbnNvbGUubG9nKFwi5Zyo6YeM6Z2i5pS+5byAXCIsdG91Y2hUZWFtLm5hbWUpXHJcbiAgICAgICAgdGhpcy5TY3JvbGxWaWV3cy5nZXRDb21wb25lbnQoY2MuU2Nyb2xsVmlldykuZW5hYmxlZD10cnVlXHJcbiAgICAgICAgaWYodG91Y2hUZWFtLmdldENoaWxkQnlOYW1lKFwic2hhbmd6aGVuZ1wiKS5hY3RpdmU9PWZhbHNlKXtcclxuICAgICAgICAgICAgLy/kuIrpmLXor6Xoi7Hpm4RcclxuICAgICAgICAgICAgbGV0IHRlYW1MaXN0PUhlcm9NYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0VGVhbUxpc3QoR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5jdXJfZ2FtZV9tb2RlKTtcclxuICAgICAgICAgIFxyXG4gICAgICAgICAgICBpZih0ZWFtTGlzdFsyXT09LTF8fHRlYW1MaXN0WzJdPT1IZXJvX1R5cGUuTlVMTCl7XHJcbiAgICAgICAgICAgICAgICB0ZWFtTGlzdFsyXT10b3VjaFRlYW0uZ2V0Q29tcG9uZW50KEhlcm9JdGVtKS5oZXJvX3R5cGVcclxuICAgICAgICAgICAgICAgIEhlcm9NYW5hZ2VyLmdldEluc3RhbmNlKCkuc2F2ZVRlYW1MaXN0KEdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuY3VyX2dhbWVfbW9kZSx0ZWFtTGlzdClcclxuICAgICAgICAgICAgICAgIHRoaXMuUmVmcmVzaGhlcm9pdG1lc3RhdHVzKClcclxuICAgICAgICAgICAgICAgIHJldHVyblxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIC8vIGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCB0ZWFtTGlzdC5sZW5ndGg7IGluZGV4KyspIHtcclxuICAgICAgICAgICAgLy8gICAgIC8vIEB0cy1pZ25vcmVcclxuICAgICAgICAgICAgLy8gICAgIGlmKGluZGV4IT0yKXtcclxuICAgICAgICAgICAgLy8gICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIC8vICAgICB9XHJcbiAgICAgICAgICAgIC8vICAgICBpZih0ZWFtTGlzdFtpbmRleF09PS0xfHx0ZWFtTGlzdFtpbmRleF09PUhlcm9fVHlwZS5OVUxMKXtcclxuICAgICAgICAgICAgLy8gICAgICAgICB0ZWFtTGlzdFtpbmRleF09dG91Y2hUZWFtLmdldENvbXBvbmVudChIZXJvSXRlbSkuaGVyb190eXBlXHJcbiAgICAgICAgICAgIC8vICAgICAgICAgSGVyb01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zYXZlVGVhbUxpc3QoR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5jdXJfZ2FtZV9tb2RlLHRlYW1MaXN0KVxyXG4gICAgICAgICAgICAvLyAgICAgICAgIHRoaXMuUmVmcmVzaGhlcm9pdG1lc3RhdHVzKClcclxuICAgICAgICAgICAgLy8gICAgICAgICByZXR1cm5cclxuICAgICAgICAgICAgLy8gICAgIH1cclxuICAgICAgICAgICAgLy8gfVxyXG4gICAgICAgICAgICBHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNob3dNZXNzYWdlKExhbmd1YWdlTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldFN0ckJ5VGV4dElkKDEzMDAxMykpXHJcbiAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgIEdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuc2hvd01lc3NhZ2UoTGFuZ3VhZ2VNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0U3RyQnlUZXh0SWQoMTAwMDkxKSlcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICAvLyBvbkhlcm9JdGVtVG91Y2hDYW5jZWwoZTpjYy5FdmVudC5FdmVudFRvdWNoKSB7XHJcbiAgICAvLyAgICAgbGV0IHRvdWNoVGVhbT1lLmdldEN1cnJlbnRUYXJnZXQoKTtcclxuICAgIC8vICAgICB0aGlzLlNjcm9sbFZpZXdzLmdldENvbXBvbmVudChjYy5TY3JvbGxWaWV3KS5lbmFibGVkPXRydWVcclxuICAgIC8vICAgICBjb25zb2xlLmxvZyhcIuWcqOWklumdouaUvuW8gFwiLHRvdWNoVGVhbS5uYW1lKVxyXG4gICAgLy8gICAgIGxldCB0ZWFtTGlzdD1IZXJvTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldFRlYW1MaXN0KEdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuY3VyX2dhbWVfbW9kZSk7XHJcbiAgICAvLyAgICAgbGV0IHBvcz10aGlzLmtvbXdlaS5jb252ZXJ0VG9Ob2RlU3BhY2VBUihlLmdldExvY2F0aW9uKCkpO1xyXG5cclxuXHJcblxyXG4gICAgLy8gICAgIGlmKHRvdWNoVGVhbS5nZXRDaGlsZEJ5TmFtZShcInNoYW5nemhlbmdcIikuYWN0aXZlPT1mYWxzZSYmdGhpcy5Nb3VzZWl0ZW0uYWN0aXZlPT10cnVlKXtcclxuICAgIC8vICAgICAgICAgLy/lpoLmnpzlnKjkuIrpmLXnqbrkvY3kuK3kuJTov5nkuKrkvY3nva7msqHmnInoi7Hpm4Qg5bCx5LiK6Zi16Iux6ZuEICAg5aaC5p6c6L+Z5Liq5L2N572u5pyJ6Iux6ZuEICAg5bCx5LiL6Zi16L+Z5Liq5L2N572u55qE6Iux6ZuEICAg5Zyo5LiK6Zi16Iux6ZuEXHJcbiAgICAvLyAgICAgICAgIHRoaXMuTW91c2VpdGVtLmFjdGl2ZT1mYWxzZVxyXG5cclxuXHJcbiAgICAvLyAgICAgICAgIGZvcihsZXQgaT0wOyBpPHRoaXMuaGVyb190ZWFtX3JlY3QubGVuZ3RoOyBpKyspXHJcbiAgICAvLyAgICAgICAgIHtcclxuIFxyXG4gICAgLy8gICAgICAgICAgICAgaWYodGhpcy5oZXJvX3RlYW1fcmVjdFtpXS5jb250YWlucyhwb3MpPT10cnVlKVxyXG4gICAgLy8gICAgICAgICAgICAgeyAgIFxyXG4gICAgLy8gICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwi5piv5ZCm5Zyo56m65L2N6YeM6Z2i77yaXCIsdGhpcy5oZXJvX3RlYW1fcmVjdFtpXSxwb3MpXHJcbiAgICAvLyAgICAgICAgICAgICAgICAgLy8gaWYodGVhbUxpc3RbaV09PUhlcm9fVHlwZS5OVUxMfHx0ZWFtTGlzdFtpXT09LTEpe1xyXG4gICAgLy8gICAgICAgICAgICAgICAgICAgICB0ZWFtTGlzdFtpXT10aGlzLk1vdXNlaXRlbS5nZXRDb21wb25lbnQoSGVyb0l0ZW0pLmhlcm9UeXBlXHJcbiAgICAvLyAgICAgICAgICAgICAgICAgLy8gfWVsc2V7XHJcbiAgICAvLyAgICAgICAgICAgICAgICAgICAgIC8vIHRlYW1MaXN0W2ldPS0xXHJcbiAgICAvLyAgICAgICAgICAgICAgICAgLy8gfVxyXG5cclxuICAgIC8vICAgICAgICAgICAgICAgICBIZXJvTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNhdmVUZWFtTGlzdChHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLmN1cl9nYW1lX21vZGUsdGVhbUxpc3QpXHJcbiAgICAvLyAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCLnjrDlnKjnmoToi7Hpm4TliJfooajvvJpcIix0ZWFtTGlzdClcclxuICAgIC8vICAgICAgICAgICAgICAgICB0aGlzLlNlbGZwb3NpdGlvbihpKVxyXG5cclxuICAgIC8vICAgICAgICAgICAgICAgICB0aGlzLlJlZnJlc2hoZXJvaXRtZXN0YXR1cygpXHJcbiAgICAvLyAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgLy8gICAgICAgICAgICAgfVxyXG4gICAgLy8gICAgICAgICB9XHJcbiAgICAvLyAgICAgICAgIHRoaXMuUmVmcmVzaGhlcm9pdG1lc3RhdHVzKClcclxuICAgIC8vICAgICB9XHJcbiAgICAgICAgICAgIFxyXG4gICAgLy8gfVxyXG4gICAgLy8gc2V0TGV2ZWxEYXRhKClcclxuICAgIC8vIHtcclxuICAgIC8vICAgICBMZXZlbE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zdGFydF9sZXZlbD10aGlzLmN1cl9zZWxlY3RlZF9sZXZlbDtcclxuICAgIC8vICAgICBsZXQgZ209R2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKTtcclxuICAgIC8vICAgICBnbS5sZXZlbF9kYXRhcz1uZXcgQXJyYXkoKTtcclxuICAgIC8vICAgICBnbS5sZXZlbF9kYXRhcz1NaXNzaW9uTGV2ZWxNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0TGV2ZWxEYXRhcyh0aGlzLmN1cl9zZWxlY3RlZF9sZXZlbCk7XHJcbiAgICAvLyB9XHJcbiAgICAvLyBsb2FkSGVybyhoZXJvVHlwZTpIZXJvX1R5cGUscG9zSW5kZXg6bnVtYmVyKVxyXG4gICAgLy8geyAgICAgICAgXHJcbiAgICAvLyAgICAgSGVyby5tYXhfbG9hZF9udW0rKztcclxuICAgIC8vICAgICBsZXQgcG9zWD1wb3NJbmRleCoxMjgtMTkyO1xyXG4gICAgLy8gICAgIGNjLnJlc291cmNlcy5sb2FkKCdoZXJvcy9oZXJvJytoZXJvVHlwZSxjYy5QcmVmYWIsKGVycm9yOiBFcnJvciwgYXNzZXRzOmNjLlByZWZhYik9PntcclxuICAgIC8vICAgICAgICAgaWYoZXJyb3IpXHJcbiAgICAvLyAgICAgICAgIHtcclxuICAgIC8vICAgICAgICAgICAgIGNvbnNvbGUubG9nKGVycm9yKTtcclxuICAgIC8vICAgICAgICAgICAgIHJldHVybjtcclxuICAgIC8vICAgICAgICAgfVxyXG4gICAgLy8gICAgICAgICBsZXQgbm9kZT1jYy5pbnN0YW50aWF0ZShhc3NldHMpO1xyXG4gICAgLy8gICAgICAgICBub2RlLnBhcmVudD10aGlzLmtvbXdlaTtcclxuICAgIC8vICAgICAgICAgbm9kZS54PXBvc1g7XHJcbiAgICAvLyAgICAgICAgIC8vIGxldCBocD1jYy5maW5kKCdDYW52YXMvVWlfUm9vdC93YWxsX3Jvb3QnKTtcclxuICAgIC8vICAgICAgICAgLy8gbm9kZS55PWhwLnkrODA7XHJcbiAgICAvLyAgICAgICAgIEJ1ZmZTdGF0ZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5jcmVhdGVCdWZmUm9vdChjYy52Mihwb3NYLG5vZGUueSsxNTApLGhlcm9UeXBlKTtcclxuICAgIC8vICAgICB9KTsgXHJcbiAgICAvLyB9XHJcbiAgICBjbGlja0J0blN0YXJ0KCkvL+W8gOWni+a4uOaIj1xyXG4gICAge1xyXG4gICAgICAgIC8vIEB0cy1pZ25vcmVcclxuICAgICAgICBpZih0aGlzLmdyZXlidXR0b25qdWRnbWVudD09MCl7XHJcbiAgICAgICAgICAgIEdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuc2hvd01lc3NhZ2UoTGFuZ3VhZ2VNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0U3RyQnlUZXh0SWQoMTMwMDA2KSlcclxuICAgICAgICAgICAgcmV0dXJuXHJcbiAgICAgICAgfVxyXG4gICAgICAgIFxyXG4gICAgICAgIHRoaXMuZGVzKClcclxuICAgICAgICBsZXQgR009R2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKTtcclxuICAgICAgICBGb2xsb3dNYW5hZ2VyLmdldEluc3RhbmNlKCkuZm9sbG93RXZlbnQoRm9sbG93X1R5cGUu54K55Ye75byA5aeL5oyR5oiY55So5oi35pWwKTtcclxuICAgICAgICBHTS5zb3VuZF9tYW5hZ2VyLnBsYXlTb3VuZChTb3VuZEluZGV4LmNsaWNrKTtcclxuICAgICAgICBsZXQgZmlnaHRpbmdJbmZvPW51bGw7XHJcbiAgICAgICAgc3dpdGNoKEdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuY3VyX2dhbWVfbW9kZSl7XHJcbiAgICAgICAgICAgIGNhc2UgR2FtZU1vZGUuTWFpbjp7XHJcbiAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIC8vIExldmVsTWFuYWdlci5nZXRJbnN0YW5jZSgpLnN0YXJ0X2xldmVsPUxldmVsTWFuYWdlci5nZXRJbnN0YW5jZSgpLmZpbmlzaF9sZXZlbCsxO1xyXG4gICAgICAgICAgICAgICAgLy8gZmlnaHRpbmdJbmZvPU1pc3Npb25MZXZlbE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRGaWdodGluZ0luZm8oTGV2ZWxNYW5hZ2VyLmdldEluc3RhbmNlKCkuc3RhcnRfbGV2ZWwpO1xyXG4gICAgICAgICAgICAgICAgaWYoIVR1dG9yYWlsc01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5pc19maW5pc2hfZ2FtZSl7XHJcbiAgICAgICAgICAgICAgICAgICAgZmlnaHRpbmdJbmZvPVR1dG9yaWFsTGV2ZWxNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0RmlnaHRpbmdJbmZvKE1hcE1hbmFnZXIuQ3VycmVudGxldmVsKTtcclxuICAgICAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgICAgIGZpZ2h0aW5nSW5mbz1NaXNzaW9uTGV2ZWxNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0RmlnaHRpbmdJbmZvKE1hcE1hbmFnZXIuQ3VycmVudGxldmVsKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgTGV2ZWxNYW5hZ2VyLmdldEluc3RhbmNlKCkuc3RhcnRfbGV2ZWw9TWFwTWFuYWdlci5DdXJyZW50bGV2ZWw7XHJcbiAgICAgICAgICAgIH1icmVhaztcclxuICAgICAgICAgICAgY2FzZSBHYW1lTW9kZS5FbmRsZXNzOntcclxuICAgICAgICAgICAgICAgIFByb3BNYW5hZ2VyLmdldEluc3RhbmNlKCkuY2hhbmdlUHJvcE51bShQcm9wSWQuRW5kbGVzc0NoYWxsZW5nZSwtMSk7XHJcbiAgICAgICAgICAgICAgICBmaWdodGluZ0luZm89RW5kbGVzc0xldmVsc01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRGaWdodGluZ0luZm8oMSk7XHJcbiAgICAgICAgICAgIH1icmVhaztcclxuICAgICAgICAgICAgY2FzZSBHYW1lTW9kZS5Cb3NzX0NoYWxsZW5nZTp7XHJcbiAgICAgICAgICAgICAgICBQcm9wTWFuYWdlci5nZXRJbnN0YW5jZSgpLmNoYW5nZVByb3BOdW0oUHJvcElkLkJvc3NUaWNrZXQsLTEpO1xyXG4gICAgICAgICAgICAgICAgZmlnaHRpbmdJbmZvPUJvc3NDaGFsbGVuZ2VNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0RmlnaHRpbmdJbmZvKEJvc3NDaGFsbGVuZ2VNYW5hZ2VyLmdldEluc3RhbmNlKCkuY3VyX2NoYWxsZW5nZV9tb2RlKTtcclxuICAgICAgICAgICAgfWJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIEdhbWVNb2RlLk1hemU6e1xyXG4gICAgICAgICAgICAgICAgVGltZXMudm9pZHNlbnNpZD10aGlzLk1hemVpZFxyXG4gICAgICAgICAgICAgICAgZmlnaHRpbmdJbmZvPU1hemVNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0RmlnaHRpbmdJbmZvKHRoaXMuTWF6ZWlkKTtcclxuICAgICAgICAgICAgICAgIGlmKEdNLmN1cl9nYW1lX3NjZW5lPT1HYW1lU2NlbmUuZ2FtZSl7XHJcbiAgICAgICAgICAgICAgICAgICAgc3VwZXIub25SZWZyZXNoKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgc3VwZXIub25DbG9zZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIEdNLnN0YXJ0TmV4dExldmVsKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9YnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgR2FtZU1vZGUuVG93ZXI6e1xyXG4gICAgICAgICAgICAgICAgLy8gZmlnaHRpbmdJbmZvPVRvd2VyTGV2ZWxNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0RmlnaHRpbmdJbmZvKFRvd2VyTWFuYWdlci5nZXRUb3dlckxldmVsKCkpO1xyXG4gICAgICAgICAgICB9YnJlYWs7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIEdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuZmlnaHRpbmdfaW5mbz1maWdodGluZ0luZm87XHJcbiAgICAgICAgLy8gdGhpcy5zaG93RW5lcmd5KCk7XHJcbiAgICAgICAgR00ucmVmcmVzaFVzZXJFeHBTaG93KCk7XHJcbiAgICAgICAgLy90aGlzLnNldExldmVsRGF0YSgpO1xyXG4gICAgICAgIGxldCBiZ0xvYWRpbmc9VUlNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0TG9hZGluZ05vZGUoKTtcclxuICAgICAgICBiZ0xvYWRpbmcuYWN0aXZlPXRydWU7XHJcbiAgICAgICAgbGV0IGxvYWRpbmdCYXI9YmdMb2FkaW5nLmdldENoaWxkQnlOYW1lKCdQcm9ncmVzc0JhcicpLmdldENvbXBvbmVudChjYy5Qcm9ncmVzc0Jhcik7XHJcbiAgICAgICAgbGV0IGxvYWRMYWJlbD1sb2FkaW5nQmFyLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoJ2xvYWRMYWJlbCcpLmdldENvbXBvbmVudChjYy5MYWJlbCk7XHJcbiAgICAgICAgY2MuZGlyZWN0b3IucHJlbG9hZFNjZW5lKEdhbWVTY2VuZS5nYW1lLChjb21wbGV0ZWRDb3VudDogbnVtYmVyLCB0b3RhbENvdW50OiBudW1iZXIsIGl0ZW06IGFueSk9PntcclxuICAgICAgICAgICAgLy/nnJ/lrp7ov5vluqZcclxuICAgICAgICAgICAgbGV0IHByb2dyZXNzVHJ1ZT1jb21wbGV0ZWRDb3VudC90b3RhbENvdW50O1xyXG4gICAgICAgICAgICAvL+WBh+eahOi/m+W6plxyXG4gICAgICAgICAgICBsZXQgcHJvZ3Jlc3NGYWxzZT1wcm9ncmVzc1RydWUvMjtcclxuICAgICAgICAgICAgbG9hZGluZ0Jhci5wcm9ncmVzcyA9IHByb2dyZXNzRmFsc2U7XHJcbiAgICAgICAgICAgIGxvYWRMYWJlbC5zdHJpbmc9KGxvYWRpbmdCYXIucHJvZ3Jlc3MqMTAwKS50b0ZpeGVkKDApKyclJztcclxuICAgICAgICAgICAgR00uY3VyX2xvYWRfcHJvZ3Jlc3M9cHJvZ3Jlc3NGYWxzZTtcclxuICAgICAgICAgICAgLy8gdGhpcy5sb2FkaW5nX2xpZ2h0LnggPSB0aGlzLmxvYWRpbmdfYmFyLnByb2dyZXNzKnRoaXMubG9hZGluZ19iYXIudG90YWxMZW5ndGgtdGhpcy5sb2FkaW5nX2Jhci50b3RhbExlbmd0aC8yO1xyXG4gICAgICAgIH0sKCk9PntcclxuICAgICAgICAgICAgY2MuZGlyZWN0b3IubG9hZFNjZW5lKEdhbWVTY2VuZS5nYW1lKTtcclxuICAgICAgICB9KTtcclxuICAgICAgICBcclxuICAgIH1cclxuXHJcbiAgICBkZXMoKSB7Ly/muIXpmaTmiYDmnInmgKrniannmoTpooTliLbkvZNcclxuICAgICAgICBmb3IgKGxldCBpbmRleCA9IDA7IGluZGV4IDwgdGhpcy5wb3MuY2hpbGRyZW4ubGVuZ3RoOyBpbmRleCsrKSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLnBvcy5jaGlsZHJlbltpbmRleF0uY2hpbGRyZW4ubGVuZ3RoPjApIHtcclxuICAgICAgICAgICAgICAgIHRoaXMucG9zLmNoaWxkcmVuW2luZGV4XS5jaGlsZHJlblswXS5kZXN0cm95KClcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIGNsaWNrQnRuTW9uc3Rlcigpey8v5oCq54mp6K+m5oOFXHJcbiAgICAgICAgdGhpcy5Nb25zdGVyLmdldENvbXBvbmVudChNb25zdGVyRGV0YWlscykuTW9uc3RlckRldGFpbHNhcnI9dGhpcy5Nb25zdGVyRGV0YWlsc2FyclxyXG4gICAgICAgIHRoaXMuTW9uc3Rlci5hY3RpdmU9dHJ1ZVxyXG4gICAgfVxyXG4gICAgY2xpY2tCdG5DaGFyaW90KCl7Ly/miJjovabor6bmg4VcclxuICAgICAgICB0aGlzLkNoYXJpb3QuYWN0aXZlPXRydWVcclxuICAgIH1cclxuICAgIC8vIHNldExldmVsRGF0YSgpXHJcbiAgICAvLyB7XHJcbiAgICAvLyAgICAgTGV2ZWxNYW5hZ2VyLmdldEluc3RhbmNlKCkuc3RhcnRfbGV2ZWw9TGV2ZWxNYW5hZ2VyLmdldEluc3RhbmNlKCkuZmluaXNoX2xldmVsICsgMTtcclxuICAgIC8vICAgICBsZXQgZ209R2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKTtcclxuICAgIC8vICAgICBnbS5maWdodGluZ19pbmZvPU1pc3Npb25MZXZlbE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRGaWdodGluZ0luZm8oTGV2ZWxNYW5hZ2VyLmdldEluc3RhbmNlKCkuc3RhcnRfbGV2ZWwpO1xyXG4gICAgLy8gfVxyXG5cclxuICAgIGNsaWNrQnRuQ2xvc2UoKVxyXG4gICAge1xyXG4gICAgICAgIGNjLmZpbmQoJ0NhbnZhcy9tYWluX3VpJykuZ2V0Q29tcG9uZW50KE1haW5VaSkucmVmcmVzaE1haW5UYXNrVWkoKTtcclxuICAgICAgICBHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNvdW5kX21hbmFnZXIucGxheVNvdW5kKFNvdW5kSW5kZXguY2xpY2spO1xyXG4gICAgICAgIHRoaXMuZGVzKClcclxuICAgICAgICB0aGlzLmRlc3Ryb3lTZWxmKCk7XHJcbiAgICAgICAgaWYoR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5jdXJfZ2FtZV9tb2RlPT1HYW1lTW9kZS5FbmRsZXNzKXtcclxuICAgICAgICAgICAgVUlNYW5hZ2VyLmdldEluc3RhbmNlKCkuc2hvd1VpRGlhbG9nKFVJUGF0aC5WbmRsZXNzQ2hhbGxlbmdlcyxVSUxheWVyTGV2ZWwuT25lLHtvbkNvbXBsZXRlZDoodWlOb2RlKT0+IHtcclxuICAgICAgICAgICAgICAgIHVpTm9kZS5nZXRDb21wb25lbnQoZW5kbGVzc2NoYWxsZW5nZXMpLmluaXQoe1xyXG4gICAgICAgICAgICAgICAgICAgIG9uQ2xvc2U6KCk9PntcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIHVpTm9kZS5nZXRDb21wb25lbnQoZW5kbGVzc2NoYWxsZW5nZXMpLmluaXRVaSgyKS8vMjrml6DlsL3mjJHmiJggICAz77yaYm9zc+aMkeaImFxyXG4gICAgICAgICAgICB9LH0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmKEdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuY3VyX2dhbWVfbW9kZT09R2FtZU1vZGUuQm9zc19DaGFsbGVuZ2Upe1xyXG4gICAgICAgICAgICBVSU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zaG93VWlEaWFsb2coVUlQYXRoLlZuZGxlc3NDaGFsbGVuZ2VzLFVJTGF5ZXJMZXZlbC5PbmUse29uQ29tcGxldGVkOih1aU5vZGUpPT4ge1xyXG4gICAgICAgICAgICAgICAgdWlOb2RlLmdldENvbXBvbmVudChlbmRsZXNzY2hhbGxlbmdlcykuaW5pdCh7XHJcbiAgICAgICAgICAgICAgICAgICAgb25DbG9zZTooKT0+e1xyXG5cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgdWlOb2RlLmdldENvbXBvbmVudChlbmRsZXNzY2hhbGxlbmdlcykuaW5pdFVpKDMpLy8yOuaXoOWwveaMkeaImCAgIDPvvJpib3Nz5oyR5oiYXHJcbiAgICAgICAgICAgIH0sfSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGRlc3Ryb3lTZWxmKClcclxuICAgIHtcclxuICAgICAgICBzdXBlci5vbkNsb3NlKCk7XHJcbiAgICAgICAgQXBrTWFuYWdlci5nZXRJbnN0YW5jZSgpLmNsb3NlQmFubmVyKCk7XHJcbiAgICAgICAgLy8gRXZlbnRNYW5hZ2VyLnBvc3RSZWRFdmVudChSZWRFdmVudFN0cmluZy5SRURfQ0hFQ0ssUmVkRXZlbnRUeXBlLkJ0bl9NYWluX1NpZ25Jbik7XHJcbiAgICB9XHJcblxyXG59XHJcbiJdfQ==