
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
                cc.resources.load(path, cc.Prefab, function (error, assets) {
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
            for (var index = 0; index < teamList.length; index++) {
                // @ts-ignore
                if (teamList[index] == -1 || teamList[index] == HeroConfig_1.Hero_Type.NULL) {
                    teamList[index] = touchTeam.getComponent(HeroItem_1.default).hero_type;
                    HeroManager_1.HeroManager.getInstance().saveTeamList(GameManager_1.default.getInstance().cur_game_mode, teamList);
                    this.Refreshheroitmestatus();
                    return;
                }
            }
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0c1xcVUlcXGhvbWVcXFRvUGxheU1haW5VaS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSw4REFBb0U7QUFDcEUsOERBQW9FO0FBQ3BFLG1EQUE4QztBQUM5Qyw2Q0FBb0U7QUFDcEUsb0ZBQStFO0FBRy9FLGlEQUE0QztBQUM1QyxxREFBZ0Q7QUFDaEQsMkRBQTBEO0FBRTFELHlEQUF1RDtBQUN2RCxtREFBOEM7QUFDOUMseURBQXdEO0FBQ3hELHlEQUErRDtBQUMvRCwyREFBaUU7QUFDakUsc0RBQXFEO0FBQ3JELHdFQUE4RTtBQUM5RSx5REFBK0U7QUFDL0UsdUVBQWtFO0FBQ2xFLG1FQUE4RDtBQUU5RCx1RUFBa0U7QUFDbEUsaUVBQTREO0FBRTVELG9EQUErQztBQUMvQyxzREFBcUQ7QUFDckQsNkRBQXdEO0FBQ3hELDZEQUF5RDtBQUN6RCwrREFBaUU7QUFDakUsZ0RBQStDO0FBQy9DLHNEQUFpRDtBQUVqRCxxREFBMkQ7QUFDM0QseURBQW9EO0FBQ3BELCtDQUEwQztBQUMxQyxxRUFBZ0U7QUFDaEUsb0RBQW1EO0FBQ25ELDhDQUF5QztBQUN6Qyx3Q0FBbUQ7QUFFbkQsMENBQXlDO0FBQ3pDLG1DQUE4QjtBQUM5QixtREFBOEM7QUFFeEMsSUFBQSxLQUFzQixFQUFFLENBQUMsVUFBVSxFQUFsQyxPQUFPLGFBQUEsRUFBRSxRQUFRLGNBQWlCLENBQUM7QUFHMUM7SUFBMEMsZ0NBQVc7SUFBckQ7UUFBQSxxRUEwcUJDO1FBeHFCRyxlQUFTLEdBQWEsSUFBSSxDQUFDLENBQUEsVUFBVTtRQUdyQyxhQUFPLEdBQVcsSUFBSSxDQUFDLENBQUEsTUFBTTtRQUU3QixhQUFPLEdBQVcsSUFBSSxDQUFDLENBQUEsTUFBTTtRQUU3QixTQUFHLEdBQVcsSUFBSSxDQUFDLENBQUEsT0FBTztRQUUxQixnQkFBVSxHQUFXLElBQUksQ0FBQyxDQUFBLFNBQVM7UUFF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LE1BQU0sQ0FBQyxDQUFDLGNBQWMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxNQUFNLEdBQUMsSUFBSSxDQUFBLENBQUEsTUFBTTtZQUNyRSxJQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsQ0FBQyxjQUFjLENBQUMsY0FBYyxDQUFDLENBQUMsTUFBTSxHQUFDLEtBQUssQ0FBQSxDQUFBLE1BQU07WUFDOUUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLENBQUMsY0FBYyxDQUFDLFNBQVMsQ0FBQyxDQUFDLE1BQU0sR0FBQyxLQUFLLENBQUEsQ0FBQSxNQUFNO1lBQ3pFLElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxDQUFDLGNBQWMsQ0FBQyxZQUFZLENBQUMsQ0FBQyxNQUFNLEdBQUMsSUFBSSxDQUFBLENBQUEsSUFBSTtZQUN6RSxJQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsQ0FBQyxjQUFjLENBQUMsTUFBTSxDQUFDLENBQUMsWUFBWSxDQUFDLEVBQUUsQ0FBQyxRQUFRLENBQUMsQ0FBQyxZQUFZLEdBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLEdBQUMsQ0FBQyxDQUFDLENBQUE7WUFDdEgsSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLENBQUMsY0FBYyxDQUFDLE1BQU0sQ0FBQyxDQUFDLFlBQVksQ0FBQyxFQUFFLENBQUMsUUFBUSxDQUFDLENBQUMsU0FBUyxHQUFDLE1BQU0sQ0FBQTtTQUNqRzthQUFJO1lBQ0QsSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLENBQUMsY0FBYyxDQUFDLE1BQU0sQ0FBQyxDQUFDLE1BQU0sR0FBQyxLQUFLLENBQUEsQ0FBQSxNQUFNO1lBQ3RFLElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxDQUFDLGNBQWMsQ0FBQyxjQUFjLENBQUMsQ0FBQyxNQUFNLEdB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LFFBQVEsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDO2dEQUNJO0lBRXRCO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxXQUFXLENBQUM7b0RBQ1E7SUFHakM7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQzs2REFDaUI7SUFJbkM7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQzt5REFDYTtJQUkvQjtRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsV0FBVyxDQUFDO2lEQUNLO0lBRTlCO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxXQUFXLENBQUM7aURBQ0s7SUF4RWIsWUFBWTtRQURoQyxPQUFPO09BQ2EsWUFBWSxDQTBxQmhDO0lBQUQsbUJBQUM7Q0ExcUJELEFBMHFCQyxDQTFxQnlDLHFCQUFXLEdBMHFCcEQ7a0JBMXFCb0IsWUFBWSIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEJvc3NDaGFsbGVuZ2VNYW5hZ2VyIH0gZnJvbSBcIi4uLy4uL0FjdGl2aXR5L0Jvc3NDaGFsbGVuZ2VcIjtcclxuaW1wb3J0IHsgRW5kbGVzc0xldmVsc01hbmFnZXIgfSBmcm9tIFwiLi4vLi4vQWN0aXZpdHkvRW5kbGVzc0xldmVsc1wiO1xyXG5pbXBvcnQgQXBrTWFuYWdlciBmcm9tIFwiLi4vLi4vQWRzL0Fwa01hbmFnZXJcIjtcclxuaW1wb3J0IHsgRmlnaHRpbmdJbmZvLCBHYW1lTW9kZSwgR2FtZVNjZW5lIH0gZnJvbSBcIi4uLy4uL0NvbnN0YW50c1wiO1xyXG5pbXBvcnQgZW5kbGVzc2NoYWxsZW5nZXMgZnJvbSBcIi4uLy4uL2NvcHkvZW5kbGVzc2NoYWxsZW5nZXMvZW5kbGVzc2NoYWxsZW5nZXNcIjtcclxuaW1wb3J0IEJ1ZmZTdGF0ZU1hbmFnZXIgZnJvbSBcIi4uLy4uL0dhbWUvQnVmZlN0YXRlTWFuYWdlclwiO1xyXG5pbXBvcnQgR2FtZURhdGEgZnJvbSBcIi4uLy4uL0dhbWVEYXRhXCI7XHJcbmltcG9ydCBHYW1lTWFuYWdlciBmcm9tIFwiLi4vLi4vR2FtZU1hbmFnZXJcIjtcclxuaW1wb3J0IE1hcE1hbmFnZXIgZnJvbSBcIi4uLy4uL0d1YUppL01hcE1hbmFnZXJcIjtcclxuaW1wb3J0IHsgSGVyb01hbmFnZXIgfSBmcm9tIFwiLi4vLi4vSGVyby9EYXRhL0hlcm9NYW5hZ2VyXCI7XHJcbmltcG9ydCBIZXJvIGZyb20gXCIuLi8uLi9IZXJvL0dhbWUvSGVyb1wiO1xyXG5pbXBvcnQgeyBIZXJvX1R5cGUgfSBmcm9tIFwiLi4vLi4vSGVyby9HYW1lL0hlcm9Db25maWdcIjtcclxuaW1wb3J0IEhlcm9JdGVtIGZyb20gXCIuLi8uLi9IZXJvL1VpL0hlcm9JdGVtXCI7XHJcbmltcG9ydCB7IExldmVsTWFuYWdlciB9IGZyb20gXCIuLi8uLi9MZXZlbC9MZXZlbE1hbmFnZXJcIjtcclxuaW1wb3J0IHsgTWlzc2lvbkxldmVsTWFuYWdlciB9IGZyb20gXCIuLi8uLi9MZXZlbC9NaXNzaW9uTGV2ZWxcIjtcclxuaW1wb3J0IHsgVHV0b3JpYWxMZXZlbE1hbmFnZXIgfSBmcm9tIFwiLi4vLi4vTGV2ZWwvVHV0b3JpYWxMZXZlbFwiO1xyXG5pbXBvcnQgeyBNYXplTWFuYWdlciB9IGZyb20gXCIuLi8uLi9NYXplL01hemVNYW5hZ2VyXCI7XHJcbmltcG9ydCB7IE1vbnN0ZXJDb25maWd1cmVNYW5hZ2VyIH0gZnJvbSBcIi4uLy4uL01vbnN0ZXIvRGF0YS9Nb25zdGVyQ29uZmlndXJlXCI7XHJcbmltcG9ydCB7IE1vbnN0ZXJGYWNlTmFtZSwgTW9uc3RlckFjdGlvbk5hbWUgfSBmcm9tIFwiLi4vLi4vTW9uc3Rlci9Nb25zdGVyRGF0YVwiO1xyXG5pbXBvcnQgeyBGb2xsb3dfVHlwZSB9IGZyb20gXCIuLi8uLi9tdWx0aUxhbmd1YWdlL0ZvbGxvd0NvbnN0YW50c1wiO1xyXG5pbXBvcnQgRm9sbG93TWFuYWdlciBmcm9tIFwiLi4vLi4vbXVsdGlMYW5ndWFnZS9Gb2xsb3dNYW5hZ2VyXCI7XHJcbmltcG9ydCB7IExhbmd1YWdlSW5kZXggfSBmcm9tIFwiLi4vLi4vbXVsdGlMYW5ndWFnZS9MYW5ndWFnZUNvbnN0YW50c1wiO1xyXG5pbXBvcnQgTGFuZ3VhZ2VNYW5hZ2VyIGZyb20gXCIuLi8uLi9tdWx0aUxhbmd1YWdlL0xhbmd1YWdlTWFuYWdlclwiO1xyXG5pbXBvcnQgVGV4dExhbmd1YWdlIGZyb20gXCIuLi8uLi9tdWx0aUxhbmd1YWdlL1RleHRMYW5ndWFnZVwiO1xyXG5pbXBvcnQgeyBQZXRNYW5hZ2VyIH0gZnJvbSBcIi4uLy4uL1BldC9QZXRNYW5hZ2VyXCI7XHJcbmltcG9ydCB7IFByb3BJZCB9IGZyb20gXCIuLi8uLi9Qcm9wL1Byb3BDb25maWdcIjtcclxuaW1wb3J0IHsgUHJvcE1hbmFnZXIgfSBmcm9tIFwiLi4vLi4vUHJvcC9Qcm9wTWFuYWdlclwiO1xyXG5pbXBvcnQgeyBTb3VuZEluZGV4IH0gZnJvbSBcIi4uLy4uL1NvdW5kL0F1ZGlvQ29uc3RhbnRzXCI7XHJcbmltcG9ydCB7IFN0b3JhZ2VLZXkgfSBmcm9tIFwiLi4vLi4vU3RvcmFnZS9TdG9yYWdlQ29uZmlnXCI7XHJcbmltcG9ydCB7IFRoZVN0b3JhZ2VNYW5hZ2VyIH0gZnJvbSBcIi4uLy4uL1N0b3JhZ2UvU3RvcmFnZU1hbmFnZXJcIjtcclxuaW1wb3J0IHsgVGFza0l0ZW0gfSBmcm9tIFwiLi4vLi4vVGFzay9UYXNrRW51bVwiO1xyXG5pbXBvcnQgVGFza01hbmFnZXIgZnJvbSBcIi4uLy4uL1Rhc2svVGFza01hbmFnZXJcIjtcclxuaW1wb3J0IE15VG9vbCBmcm9tIFwiLi4vLi4vVG9vbHMvTXlUb29sXCI7XHJcbmltcG9ydCB7IFRvd2VyTGV2ZWxNYW5hZ2VyIH0gZnJvbSBcIi4uLy4uL1Rvd2VyL1Rvd2VyTGV2ZWxcIjtcclxuaW1wb3J0IFRvd2VyTWFuYWdlciBmcm9tIFwiLi4vLi4vVG93ZXIvVG93ZXJNYW5hZ2VyXCI7XHJcbmltcG9ydCBUaW1lcyBmcm9tIFwiLi4vLi4vVHVybnRhYmxlL1RpbWVzXCI7XHJcbmltcG9ydCBUdXRvcmFpbHNNYW5hZ2VyIGZyb20gXCIuLi8uLi9UdXRvcmlhbHMvVHV0b3JhaWxzTWFuYWdlclwiO1xyXG5pbXBvcnQgeyBVc2VySW5mbyB9IGZyb20gXCIuLi8uLi9Vc2VySW5mby9Vc2VySW5mb1wiO1xyXG5pbXBvcnQgVUlDb21wb25lbnQgZnJvbSBcIi4uL1VJQ29tcG9uZW50XCI7XHJcbmltcG9ydCB7IFVJUGF0aCwgVUlMYXllckxldmVsIH0gZnJvbSBcIi4uL1VJQ29uZmlnXCI7XHJcbmltcG9ydCB7IFVpQWN0aW9uIH0gZnJvbSBcIi4uL1VpSW50ZXJmYWNlXCI7XHJcbmltcG9ydCB7IFVJTWFuYWdlciB9IGZyb20gXCIuLi9VSU1hbmFnZXJcIjtcclxuaW1wb3J0IE1haW5VaSBmcm9tIFwiLi9NYWluVWlcIjtcclxuaW1wb3J0IE1vbnN0ZXJEZXRhaWxzIGZyb20gXCIuL01vbnN0ZXJEZXRhaWxzXCI7XHJcblxyXG5jb25zdCB7Y2NjbGFzcywgcHJvcGVydHl9ID0gY2MuX2RlY29yYXRvcjtcclxuXHJcbkBjY2NsYXNzXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFRvUGxheU1haW5VaSBleHRlbmRzIFVJQ29tcG9uZW50IHtcclxuICAgIEBwcm9wZXJ0eShjYy5QcmVmYWIpXHJcbiAgICBoZXJvX2l0ZW06Y2MuUHJlZmFiID0gbnVsbDsvL+iLsembhOWktOWDj+eahOmihOWItuS9k1xyXG5cclxuICAgIEBwcm9wZXJ0eShjYy5Ob2RlKVxyXG4gICAgTW9uc3RlcjpjYy5Ob2RlID0gbnVsbDsvL+aAqueJqeivpuaDhVxyXG4gICAgQHByb3BlcnR5KGNjLk5vZGUpXHJcbiAgICBDaGFyaW90OmNjLk5vZGUgPSBudWxsOy8v5oiY6L2m6K+m5oOFXHJcbiAgICBAcHJvcGVydHkoY2MuTm9kZSlcclxuICAgIHBvczpjYy5Ob2RlID0gbnVsbDsvL+aAqueJqeeahOS9jee9rlxyXG4gICAgQHByb3BlcnR5KGNjLk5vZGUpXHJcbiAgICBoZXJvU2hhZG93OmNjLk5vZGUgPSBudWxsOy8v5oCq54mp6Zi05b2x55qE5L2N572uXHJcbiAgICBAcHJvcGVydHkoY2MuTm9kZSlcclxuICAgIGxldmVsdHh0OmNjLk5vZGUgPSBudWxsO1xyXG5cclxuICAgIGd1YWl3dWFycj1bXS8v5oCq54mp55qE5pWw57uEXHJcbiAgICBNb25zdGVyRGV0YWlsc2Fycj1bXS8v5oCq54mp6K+m5oOF5YiX6KGoICAg5oyJYm9zcyAgIOeyvuiLsSAgIOaZrumAmiDmjpLluo9cclxuXHJcblxyXG4gICAgQHByb3BlcnR5KGNjLk5vZGUpXHJcbiAgICBrb213ZWk6Y2MuTm9kZSA9IG51bGw7Ly/nqbrkvY0gICDoi7Hpm4TkuIrpmLXnmoTkvY3nva7mmK/lkKbog73op6PplIFcclxuXHJcbiAgICBAcHJvcGVydHkoY2MuTm9kZSlcclxuICAgIGNvbnRlbnQ6Y2MuTm9kZSA9IG51bGw7Ly/niLboioLngrlcclxuXHJcbiAgICBAcHJvcGVydHkoc3AuU2tlbGV0b25EYXRhKVxyXG4gICAgc3A6c3AuU2tlbGV0b25EYXRhW10gPSBbXTsvL+epuuS9jSAgIOiLsembhOS4iumYteeahOS9jee9ruaYr+WQpuiDveino+mUgVxyXG5cclxuICAgIGhlcm9fdGVhbV9yZWN0OiBjYy5SZWN0W10gPSBbXTtcclxuICAgIFNjcm9sbFZpZXdyZWN0OiBjYy5SZWN0ID0gbnVsbDtcclxuICAgIEBwcm9wZXJ0eShjYy5Ob2RlKVxyXG4gICAgU2Nyb2xsVmllOmNjLk5vZGUgPSBudWxsOy8v6Iux6ZuE5ruR5Yqo5Z2XXHJcbiAgICBAcHJvcGVydHkoY2MuTm9kZSlcclxuICAgIFNjcm9sbFZpZXdzOmNjLk5vZGUgPSBudWxsOy8v6Iux6ZuE5ruR5Yqo5Z2XXHJcbiAgICBoZXJvX3RlYW1fcG9zOiBjYy5WZWMyW10gPSBbXTtcclxuXHJcbiAgICBAcHJvcGVydHkoY2MuTm9kZSlcclxuICAgIE1vdXNlOmNjLk5vZGUgPSBudWxsOy8v6byg5qCH5LiK55qE6Iux6ZuEXHJcbiAgICBAcHJvcGVydHkoY2MuTm9kZSlcclxuICAgIE1vdXNlaXRlbTpjYy5Ob2RlID0gbnVsbDsvL+m8oOagh+S4iueahOiLsembhGl0ZW1cclxuICAgIGNsaWNraGVyb3Bvc2l0aW9uOm51bWJlcj0tMS8v54K55Ye755qE5L2N572u5piv56ys5Yeg5LiqICAgIOm7mOiupOayoeacieiiq+eCueWHu+WIsOeahOS9jee9rlxyXG4gICAgcHV0ZG93bmhlcm9wb3NpdGlvbjpudW1iZXI9LTEvL+aUvuS4i+eahOS9jee9ruaYr+esrOWHoOS4qlxyXG4gICAgQHByb3BlcnR5KGNjLk5vZGUpXHJcbiAgICBDb21tb25fQnRuXzA6Y2MuTm9kZSA9IG51bGw7Ly/lvIDlp4vmjInpkq5cclxuICAgIEBwcm9wZXJ0eShjYy5Ob2RlKVxyXG4gICAgamR0OmNjLk5vZGUgPSBudWxsOy8v5oiY6L2m6KGA6YeP6L+b5bqm5p2hXHJcbiAgICBncmV5YnV0dG9uanVkZ21lbnQ6IG51bWJlcj0wO1xyXG5cclxuXHJcbiAgICBAcHJvcGVydHkoY2MuU3ByaXRlRnJhbWUpXHJcbiAgICBiajpjYy5TcHJpdGVGcmFtZVtdID0gW107Ly/og4zmma9cclxuICAgIEBwcm9wZXJ0eShjYy5TcHJpdGVGcmFtZSlcclxuICAgIHdhbGw6Y2MuU3ByaXRlRnJhbWVbXSA9IFtdOy8v5oiY6L2mXHJcblxyXG4gICAgQHByb3BlcnR5KGNjLk5vZGUpXHJcbiAgICBteWJqOmNjLk5vZGUgPSBudWxsOy8v6IOM5pmvXHJcbiAgICBAcHJvcGVydHkoY2MuTm9kZSlcclxuICAgIG15d2FsbDpjYy5Ob2RlID0gbnVsbDsvL+aImOi9plxyXG4gICAgQHByb3BlcnR5KGNjLlNwcml0ZUZyYW1lKVxyXG4gICAgYmdfRW5kbGVzczpjYy5TcHJpdGVGcmFtZSA9IG51bGw7Ly/ml6DlsL3mjJHmiJjog4zmma9cclxuXHJcbiAgICBAcHJvcGVydHkoY2MuTm9kZSlcclxuICAgIFByZXBhcmVfQnRuX01vbnN0ZXI6Y2MuTm9kZSA9IG51bGw7Ly/mgKrnianor6bmg4XmjInpkq5cclxuICAgIFxyXG5cclxuICAgIEBwcm9wZXJ0eShjYy5Ob2RlKVxyXG4gICAgQ29tbW9uX0J0bl9CYWNrOmNjLk5vZGUgPSBudWxsOy8v6L+U5Zue5oyJ6ZKuXHJcbiAgICBNYXplaWQ6bnVtYmVyID0gMDsvL+WGsOays+WFs+WNoWlkXHJcblxyXG4gICAgQHByb3BlcnR5KGNjLlNwcml0ZUZyYW1lKVxyXG4gICAgYmdfTWF6ZTpjYy5TcHJpdGVGcmFtZSA9IG51bGw7Ly/lhrDmsrPog4zmma9cclxuICAgIEBwcm9wZXJ0eShjYy5TcHJpdGVGcmFtZSlcclxuICAgIGJnX3dhbGw6Y2MuU3ByaXRlRnJhbWUgPSBudWxsOy8v5Yaw5rKz5oiY6L2mXHJcbiAgICBzdGFydCgpe1xyXG4gICAgICAgIGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCB0aGlzLmtvbXdlaS5jaGlsZHJlbi5sZW5ndGg7IGluZGV4KyspIHtcclxuICAgICAgICAgICAgdGhpcy5rb213ZWkuY2hpbGRyZW5baW5kZXhdLm9uKGNjLk5vZGUuRXZlbnRUeXBlLlRPVUNIX1NUQVJULCB0aGlzLm9uSGVyb1RvdWNoU3RhcnQsIHRoaXMpO1xyXG4gICAgICAgICAgICB0aGlzLmtvbXdlaS5jaGlsZHJlbltpbmRleF0ub24oY2MuTm9kZS5FdmVudFR5cGUuVE9VQ0hfTU9WRSwgdGhpcy5vbkhlcm9Ub3VjaE1vdmUsIHRoaXMpO1xyXG4gICAgICAgICAgICB0aGlzLmtvbXdlaS5jaGlsZHJlbltpbmRleF0ub24oY2MuTm9kZS5FdmVudFR5cGUuVE9VQ0hfRU5ELCB0aGlzLm9uSGVyb1RvdWNoRW5kLCB0aGlzKTtcclxuICAgICAgICAgICAgdGhpcy5rb213ZWkuY2hpbGRyZW5baW5kZXhdLm9uKGNjLk5vZGUuRXZlbnRUeXBlLlRPVUNIX0NBTkNFTCwgdGhpcy5vbkhlcm9Ub3VjaENhbmNlbCwgdGhpcyk7XHJcbiAgICAgICAgICAgIGxldCBzaXplID0gdGhpcy5rb213ZWkuY2hpbGRyZW5baW5kZXhdLmdldENvbnRlbnRTaXplKCk7XHJcbiAgICAgICAgICAgIGxldCBwb3MgPSB0aGlzLmtvbXdlaS5jaGlsZHJlbltpbmRleF0uZ2V0UG9zaXRpb24oKTtcclxuICAgICAgICAgICAgdGhpcy5oZXJvX3RlYW1fcmVjdC5wdXNoKGNjLnJlY3QocG9zLngtc2l6ZS53aWR0aC8yLHBvcy55LXNpemUuaGVpZ2h0LzIsc2l6ZS53aWR0aCxzaXplLmhlaWdodCkpO1xyXG4gICAgICAgICAgICB0aGlzLmhlcm9fdGVhbV9wb3MucHVzaChwb3MpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBsZXQgcG9zcyA9IHRoaXMuU2Nyb2xsVmllLmdldFBvc2l0aW9uKCk7XHJcbiAgICAgICAgbGV0IHNpemVzID0gdGhpcy5TY3JvbGxWaWUuZ2V0Q29udGVudFNpemUoKTtcclxuICAgICAgICB0aGlzLlNjcm9sbFZpZXdyZWN0PWNjLnJlY3QocG9zcy54LXNpemVzLndpZHRoLzIscG9zcy55LXNpemVzLmhlaWdodC8yLHNpemVzLndpZHRoLHNpemVzLmhlaWdodClcclxuICAgICAgICAvLyBIZXJvTWFuYWdlci5nZXRJbnN0YW5jZSgpLmFkZEhlcm8oMylcclxuICAgIH1cclxuICAgIG9uSGVyb1RvdWNoU3RhcnQoZTpjYy5FdmVudC5FdmVudFRvdWNoKSB7XHJcbiAgICAgICAgbGV0IHRvdWNoVGVhbT1lLmdldEN1cnJlbnRUYXJnZXQoKTtcclxuICAgICAgICBsZXQgcG9zPXRoaXMua29td2VpLmNvbnZlcnRUb05vZGVTcGFjZUFSKGUuZ2V0TG9jYXRpb24oKSk7XHJcbiAgICAgICAgbGV0IHdlaXpoaT1OdW1iZXIodG91Y2hUZWFtLm5hbWUpLy/ngrnliLDnrKzlh6DkuKrkvY3nva5cclxuICAgICAgICB0aGlzLmNsaWNraGVyb3Bvc2l0aW9uPXdlaXpoaVxyXG4gICAgICAgIGxldCB0ZWFtTGlzdD1IZXJvTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldFRlYW1MaXN0KEdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuY3VyX2dhbWVfbW9kZSk7XHJcbiAgICAgICAgLy/lpoLmnpzov5nkuKrkvY3nva7mnInoi7Hpm4TvvIzlsLHlsIbov5nkuKrkvY3nva7nmoToi7Hpm4TpmpDol48gICDlvIDlkK/pvKDmoIfnmoToi7Hpm4QgIOWwhum8oOagh+eahOiLsembhOearuiCpOaNouaIkOi/meS4quS9jee9rueahOiLsembhFxyXG4gICAgICAgIC8vIEB0cy1pZ25vcmVcclxuICAgICAgICBpZiAodGVhbUxpc3Rbd2VpemhpXSE9SGVyb19UeXBlLk5VTEwmJnRlYW1MaXN0W3dlaXpoaV0hPS0xKSB7XHJcbiAgICAgICAgICAgIHRoaXMua29td2VpLmNoaWxkcmVuW3RoaXMuY2xpY2toZXJvcG9zaXRpb25dLmdldENoaWxkQnlOYW1lKFwiaGVyb1wiKS5hY3RpdmU9ZmFsc2UvL+iLsembhOmakOiXj1xyXG4gICAgICAgICAgICB0aGlzLmtvbXdlaS5jaGlsZHJlblt0aGlzLmNsaWNraGVyb3Bvc2l0aW9uXS5nZXRDaGlsZEJ5TmFtZShcIlByZXBhcmVfVm9pZFwiKS5hY3RpdmU9dHJ1ZS8v6buR5b2x5byA5ZCvXHJcbiAgICAgICAgICAgIHRoaXMua29td2VpLmNoaWxkcmVuW3RoaXMuY2xpY2toZXJvcG9zaXRpb25dLmdldENoaWxkQnlOYW1lKFwid2luVGV4dFwiKS5hY3RpdmU9dHJ1ZS8v5paH5a2X5byA5ZCvXHJcbiAgICAgICAgICAgIHRoaXMua29td2VpLmNoaWxkcmVuW3RoaXMuY2xpY2toZXJvcG9zaXRpb25dLmdldENoaWxkQnlOYW1lKFwiaGVyb1NoYWRvd1wiKS5hY3RpdmU9ZmFsc2UvL+mYtOW9sVxyXG4gICAgICAgICAgICB0aGlzLk1vdXNlLnNldFBvc2l0aW9uKHBvcylcclxuICAgICAgICAgICAgdGhpcy5Nb3VzZS5nZXRDaGlsZEJ5TmFtZShcImhlcm9cIikuZ2V0Q29tcG9uZW50KHNwLlNrZWxldG9uKS5za2VsZXRvbkRhdGE9dGhpcy5zcFt0ZWFtTGlzdFt3ZWl6aGldLTFdXHJcbiAgICAgICAgICAgIHRoaXMuTW91c2UuZ2V0Q2hpbGRCeU5hbWUoXCJoZXJvXCIpLmdldENvbXBvbmVudChzcC5Ta2VsZXRvbikuYW5pbWF0aW9uPVwiSWRsZVwiXHJcbiAgICAgICAgICAgIHRoaXMuTW91c2UuYWN0aXZlPXRydWVcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgb25IZXJvVG91Y2hNb3ZlKGU6Y2MuRXZlbnQuRXZlbnRUb3VjaCkge1xyXG4gICAgICAgIGlmKHRoaXMuY2xpY2toZXJvcG9zaXRpb24hPS0xKXtcclxuICAgICAgICAgICAgbGV0IHRvdWNoVGVhbT1lLmdldEN1cnJlbnRUYXJnZXQoKTtcclxuICAgICAgICAgICAgbGV0IHBvcz10aGlzLmtvbXdlaS5jb252ZXJ0VG9Ob2RlU3BhY2VBUihlLmdldExvY2F0aW9uKCkpO1xyXG4gICAgICAgICAgICB0aGlzLk1vdXNlLnNldFBvc2l0aW9uKHBvcylcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBTZWxmcG9zaXRpb24obnVtYmVyKXtcclxuICAgICAgICBsZXQgdGVhbUxpc3Q9SGVyb01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRUZWFtTGlzdChHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLmN1cl9nYW1lX21vZGUpO1xyXG4gICAgICAgIGlmKHRoaXMuTW91c2UuYWN0aXZlPT10cnVlKXtcclxuICAgICAgICAgICAgdGhpcy5Nb3VzZS5hY3RpdmU9ZmFsc2VcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYodGhpcy5Nb3VzZWl0ZW0uYWN0aXZlPT10cnVlKXtcclxuICAgICAgICAgICAgdGhpcy5Nb3VzZWl0ZW0uYWN0aXZlPWZhbHNlXHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vIEB0cy1pZ25vcmVcclxuICAgICAgICBpZih0ZWFtTGlzdFtudW1iZXJdIT1IZXJvX1R5cGUuTlVMTCYmdGVhbUxpc3RbbnVtYmVyXSE9LTEpe1xyXG4gICAgICAgICAgICB0aGlzLmtvbXdlaS5jaGlsZHJlbltudW1iZXJdLmdldENoaWxkQnlOYW1lKFwiaGVyb1wiKS5hY3RpdmU9dHJ1ZS8v6Iux6ZuE5byA5ZCvXHJcbiAgICAgICAgICAgIHRoaXMua29td2VpLmNoaWxkcmVuW251bWJlcl0uZ2V0Q2hpbGRCeU5hbWUoXCJQcmVwYXJlX1ZvaWRcIikuYWN0aXZlPWZhbHNlLy/pu5HlvbHpmpDol49cclxuICAgICAgICAgICAgdGhpcy5rb213ZWkuY2hpbGRyZW5bbnVtYmVyXS5nZXRDaGlsZEJ5TmFtZShcIndpblRleHRcIikuYWN0aXZlPWZhbHNlLy/mloflrZfpmpDol49cclxuICAgICAgICAgICAgdGhpcy5rb213ZWkuY2hpbGRyZW5bbnVtYmVyXS5nZXRDaGlsZEJ5TmFtZShcImhlcm9TaGFkb3dcIikuYWN0aXZlPXRydWUvL+mYtOW9sVxyXG4gICAgICAgICAgICB0aGlzLmtvbXdlaS5jaGlsZHJlbltudW1iZXJdLmdldENoaWxkQnlOYW1lKFwiaGVyb1wiKS5nZXRDb21wb25lbnQoc3AuU2tlbGV0b24pLnNrZWxldG9uRGF0YT10aGlzLnNwW3RlYW1MaXN0W251bWJlcl0tMV1cclxuICAgICAgICAgICAgdGhpcy5rb213ZWkuY2hpbGRyZW5bbnVtYmVyXS5nZXRDaGlsZEJ5TmFtZShcImhlcm9cIikuZ2V0Q29tcG9uZW50KHNwLlNrZWxldG9uKS5hbmltYXRpb249XCJJZGxlXCJcclxuICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgdGhpcy5rb213ZWkuY2hpbGRyZW5bbnVtYmVyXS5nZXRDaGlsZEJ5TmFtZShcImhlcm9cIikuYWN0aXZlPWZhbHNlLy/oi7Hpm4TpmpDol49cclxuICAgICAgICAgICAgdGhpcy5rb213ZWkuY2hpbGRyZW5bbnVtYmVyXS5nZXRDaGlsZEJ5TmFtZShcIlByZXBhcmVfVm9pZFwiKS5hY3RpdmU9dHJ1ZS8v6buR5b2x5byA5ZCvXHJcbiAgICAgICAgICAgIHRoaXMua29td2VpLmNoaWxkcmVuW251bWJlcl0uZ2V0Q2hpbGRCeU5hbWUoXCJ3aW5UZXh0XCIpLmFjdGl2ZT10cnVlLy/mloflrZflvIDlkK9cclxuICAgICAgICAgICAgdGhpcy5rb213ZWkuY2hpbGRyZW5bbnVtYmVyXS5nZXRDaGlsZEJ5TmFtZShcImhlcm9TaGFkb3dcIikuYWN0aXZlPWZhbHNlLy/pmLTlvbFcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBvbkhlcm9Ub3VjaEVuZChlOmNjLkV2ZW50LkV2ZW50VG91Y2gpIHtcclxuICAgICAgICBpZih0aGlzLmNsaWNraGVyb3Bvc2l0aW9uIT0tMSl7XHJcbiAgICAgICAgICAgIHRoaXMuU2VsZnBvc2l0aW9uKHRoaXMuY2xpY2toZXJvcG9zaXRpb24pXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgb25IZXJvVG91Y2hDYW5jZWwoZTpjYy5FdmVudC5FdmVudFRvdWNoKSB7XHJcbiAgICAgICAgbGV0IHRvdWNoVGVhbT1lLmdldEN1cnJlbnRUYXJnZXQoKTtcclxuICAgICAgICBsZXQgU2Nyb2xsVmlld3Bvcz10aGlzLlNjcm9sbFZpZS5wYXJlbnQuY29udmVydFRvTm9kZVNwYWNlQVIoZS5nZXRMb2NhdGlvbigpKTtcclxuICAgICAgICBsZXQgcG9zPXRoaXMua29td2VpLmNvbnZlcnRUb05vZGVTcGFjZUFSKGUuZ2V0TG9jYXRpb24oKSk7XHJcbiAgICAgICAgbGV0IHRlYW1MaXN0PUhlcm9NYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0VGVhbUxpc3QoR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5jdXJfZ2FtZV9tb2RlKTtcclxuICAgICAgICBmb3IobGV0IGk9MDsgaTx0aGlzLmhlcm9fdGVhbV9yZWN0Lmxlbmd0aDsgaSsrKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgaWYodGhpcy5oZXJvX3RlYW1fcmVjdFtpXS5jb250YWlucyhwb3MpPT10cnVlKVxyXG4gICAgICAgICAgICB7ICAgIFxyXG4gICAgICAgICAgICAgICAgdGhpcy5wdXRkb3duaGVyb3Bvc2l0aW9uPWlcclxuICAgICAgICAgICAgICAgIHRoaXMuTW91c2UuYWN0aXZlPWZhbHNlXHJcbiAgICAgICAgICAgICAgICBsZXQgdGVhbUxpc3RwdXRkb3duPXRlYW1MaXN0W3RoaXMucHV0ZG93bmhlcm9wb3NpdGlvbl1cclxuICAgICAgICAgICAgICAgIGxldCB0ZWFtTGlzdGNsaWNraGVybz10ZWFtTGlzdFt0aGlzLmNsaWNraGVyb3Bvc2l0aW9uXVxyXG4gICAgICAgICAgICAgICAgdGVhbUxpc3RbdGhpcy5wdXRkb3duaGVyb3Bvc2l0aW9uXT10ZWFtTGlzdGNsaWNraGVyb1xyXG4gICAgICAgICAgICAgICAgdGVhbUxpc3RbdGhpcy5jbGlja2hlcm9wb3NpdGlvbl09dGVhbUxpc3RwdXRkb3duXHJcbiAgICAgICAgICAgICAgICBIZXJvTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNhdmVUZWFtTGlzdChHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLmN1cl9nYW1lX21vZGUsdGVhbUxpc3QpXHJcbiAgICAgICAgICAgICAgICB0aGlzLlNlbGZwb3NpdGlvbih0aGlzLnB1dGRvd25oZXJvcG9zaXRpb24pXHJcbiAgICAgICAgICAgICAgICB0aGlzLlNlbGZwb3NpdGlvbih0aGlzLmNsaWNraGVyb3Bvc2l0aW9uKVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmKHRoaXMuU2Nyb2xsVmlld3JlY3QuY29udGFpbnMoU2Nyb2xsVmlld3Bvcyk9PXRydWUpe1xyXG4gICAgICAgICAgICB0aGlzLk1vdXNlLmFjdGl2ZT1mYWxzZVxyXG4gICAgICAgICAgICB0ZWFtTGlzdFt0aGlzLmNsaWNraGVyb3Bvc2l0aW9uXT0tMVxyXG4gICAgICAgICAgICBIZXJvTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNhdmVUZWFtTGlzdChHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLmN1cl9nYW1lX21vZGUsdGVhbUxpc3QpXHJcbiAgICAgICAgICAgIC8v5Yi35paw6Iux6ZuEaXRtZeeKtuaAgVxyXG4gICAgICAgICAgICB0aGlzLlJlZnJlc2hoZXJvaXRtZXN0YXR1cygpXHJcbiAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgIHRoaXMuU2VsZnBvc2l0aW9uKHRoaXMuY2xpY2toZXJvcG9zaXRpb24pXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgaW5pdCh1aUFjOiBVaUFjdGlvbikge1xyXG4gICAgICAgIHN1cGVyLmluaXQodWlBYyk7XHJcbiAgICAgICAgLy/lj5bmnKzmqKHlvI8gIOacrOWFs+WNoSAg55qE5oCq54mp5pWw6YeP5LiO57G75Z6LICAgYm9zcyAgIOeyvuiLsSAgIOaZrumAmlxyXG4gICAgICAgIGxldCBsZXZlbD1NYXBNYW5hZ2VyLkN1cnJlbnRsZXZlbC8vTGV2ZWxNYW5hZ2VyLmdldEluc3RhbmNlKCkuc3RhcnRfbGV2ZWw7XHJcbiAgICAgICAgbGV0IGZpZ2h0aW5nSW5mbzpGaWdodGluZ0luZm89bnVsbDtcclxuICAgICAgICB0aGlzLkNvbW1vbl9CdG5fQmFjay5hY3RpdmU9dHJ1ZVxyXG4gICAgICAgIHN3aXRjaChHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLmN1cl9nYW1lX21vZGUpe1xyXG4gICAgICAgICAgICBjYXNlIEdhbWVNb2RlLk1haW46e1xyXG4gICAgICAgICAgICAgICAgZmlnaHRpbmdJbmZvPU1pc3Npb25MZXZlbE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRGaWdodGluZ0luZm8obGV2ZWwpO1xyXG5cclxuICAgICAgICAgICAgfWJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIEdhbWVNb2RlLkVuZGxlc3M6e1xyXG4gICAgICAgICAgICAgICAgbGV0IHdhdmVudW1iZXI9VGhlU3RvcmFnZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXROdW1iZXIoU3RvcmFnZUtleS5VbmxpbWl0ZWRDaGFsbGVuZ2VEYW1hZ2UsMCk7Ly/ms6LmlbBcclxuICAgICAgICAgICAgICAgIGxldCBSb3VuZCA9RW5kbGVzc0xldmVsc01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRSb3VuZCh3YXZlbnVtYmVyKS8v5Zue5ZCI5pWwXHJcbiAgICAgICAgICAgICAgICBmaWdodGluZ0luZm89RW5kbGVzc0xldmVsc01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRGaWdodGluZ0luZm8oUm91bmQpO1xyXG4gICAgICAgICAgICB9YnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgR2FtZU1vZGUuQm9zc19DaGFsbGVuZ2U6e1xyXG4gICAgICAgICAgICAgICAgZmlnaHRpbmdJbmZvPUJvc3NDaGFsbGVuZ2VNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0RmlnaHRpbmdJbmZvKEJvc3NDaGFsbGVuZ2VNYW5hZ2VyLmdldEluc3RhbmNlKCkuY3VyX2NoYWxsZW5nZV9tb2RlKTtcclxuICAgICAgICAgICAgfWJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIEdhbWVNb2RlLk1hemU6e1xyXG4gICAgICAgICAgICAgICAgZmlnaHRpbmdJbmZvPU1hemVNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0RmlnaHRpbmdJbmZvKHRoaXMuTWF6ZWlkKTtcclxuICAgICAgICAgICAgfWJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIEdhbWVNb2RlLlRvd2VyOntcclxuICAgICAgICAgICAgICAgIGZpZ2h0aW5nSW5mbz1Ub3dlckxldmVsTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldEZpZ2h0aW5nSW5mbyhUb3dlck1hbmFnZXIuZ2V0VG93ZXJMZXZlbCgpKTtcclxuICAgICAgICAgICAgfWJyZWFrO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLlByZXBhcmVfQnRuX01vbnN0ZXIuYWN0aXZlPXRydWVcclxuICAgICAgICBsZXQgbGlzdD1maWdodGluZ0luZm8uZ2V0T25seU1vbnN0ZXJEYXRhTGlzdCgpO1xyXG4gICAgICAgIHRoaXMubGV2ZWx0eHQuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmc9XCJcIitmaWdodGluZ0luZm8udGl0bGVfbmFtZVxyXG4gICAgICAgIGlmKEdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuY3VyX2dhbWVfbW9kZT09R2FtZU1vZGUuTWFpbil7XHJcbiAgICAgICAgICAgIGxldCBjaGFwdGVyPShNaXNzaW9uTGV2ZWxNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0Q2hhcHRlcihsZXZlbCkpLTFcclxuICAgICAgICAgICAgdGhpcy5teWJqLmdldENvbXBvbmVudChjYy5TcHJpdGUpLnNwcml0ZUZyYW1lPXRoaXMuYmpbY2hhcHRlcl1cclxuICAgICAgICAgICAgdGhpcy5teXdhbGwuZ2V0Q29tcG9uZW50KGNjLlNwcml0ZSkuc3ByaXRlRnJhbWU9dGhpcy53YWxsW2NoYXB0ZXJdXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmKEdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuY3VyX2dhbWVfbW9kZT09R2FtZU1vZGUuRW5kbGVzcyl7XHJcbiAgICAgICAgICAgIHRoaXMubXliai5nZXRDb21wb25lbnQoY2MuU3ByaXRlKS5zcHJpdGVGcmFtZT10aGlzLmJnX0VuZGxlc3NcclxuICAgICAgICAgICAgdGhpcy5teXdhbGwuZ2V0Q29tcG9uZW50KGNjLlNwcml0ZSkuc3ByaXRlRnJhbWU9dGhpcy53YWxsWzRdXHJcbiAgICAgICAgICAgIHRoaXMuUHJlcGFyZV9CdG5fTW9uc3Rlci5hY3RpdmU9ZmFsc2VcclxuICAgICAgICAgICAgbGlzdD1bXVxyXG4gICAgICAgIH1cclxuICAgICAgICBpZihHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLmN1cl9nYW1lX21vZGU9PUdhbWVNb2RlLkJvc3NfQ2hhbGxlbmdlKXtcclxuXHJcbiAgICAgICAgICAgIGxldCBSb3RhdGlvbk9yZGVycyA9IFVzZXJJbmZvLmdldEluc3RhbmNlKCkuUm90YXRpb25PcmRlci8v6L2u5o2i6aG65bqPXHJcbiAgICAgICAgICAgIGxldCBTdGFnZSA9IDEvL+mYtuautVxyXG4gICAgICAgICAgICBsZXQgQ2hhbGxlbmdlSUQgPSBSb3RhdGlvbk9yZGVycyAqIDEwMDAgKyBTdGFnZS8v5oyR5oiYSURcclxuICAgICAgICAgICAgbGV0IFJvdGF0aW9uT3JkZXIgPSBCb3NzQ2hhbGxlbmdlTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldENoYXB0ZXJTY2VuZShDaGFsbGVuZ2VJRCkvLyhVc2VySW5mby5nZXRJbnN0YW5jZSgpLlJvdGF0aW9uT3JkZXIpLTEvL+i9ruaNoumhuuW6j1xyXG4gICAgICAgICAgICB0aGlzLm15YmouZ2V0Q29tcG9uZW50KGNjLlNwcml0ZSkuc3ByaXRlRnJhbWU9dGhpcy5ialtSb3RhdGlvbk9yZGVyXVxyXG4gICAgICAgICAgICB0aGlzLm15d2FsbC5nZXRDb21wb25lbnQoY2MuU3ByaXRlKS5zcHJpdGVGcmFtZT10aGlzLndhbGxbUm90YXRpb25PcmRlcl0gICAgXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmKEdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuY3VyX2dhbWVfbW9kZT09R2FtZU1vZGUuTWF6ZSl7XHJcbiAgICAgICAgICAgIHRoaXMubXliai5nZXRDb21wb25lbnQoY2MuU3ByaXRlKS5zcHJpdGVGcmFtZT10aGlzLmJnX01hemVcclxuICAgICAgICAgICAgdGhpcy5teXdhbGwuZ2V0Q29tcG9uZW50KGNjLlNwcml0ZSkuc3ByaXRlRnJhbWU9dGhpcy5iZ193YWxsXHJcbiAgICAgICAgICAgIHRoaXMuQ29tbW9uX0J0bl9CYWNrLmFjdGl2ZT1mYWxzZVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy/lj5blh7pib3NzXHJcbiAgICAgICAgbGV0IGJvc3NhcnI9W11cclxuICAgICAgICBsZXQganlhcnI9W11cclxuICAgICAgICBsZXQgcHV0PVtdXHJcbiAgICAgICAgZm9yIChsZXQgYm9zc2luZGV4ID0gMDsgYm9zc2luZGV4IDwgbGlzdC5sZW5ndGg7IGJvc3NpbmRleCsrKSB7XHJcbiAgICAgICAgICAgIGlmKE1vbnN0ZXJDb25maWd1cmVNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0U3RyZW5ndGhUeXBlKGxpc3RbYm9zc2luZGV4XS5pZCk9PTMpe1xyXG4gICAgICAgICAgICAgICAgYm9zc2Fyci5wdXNoKGxpc3RbYm9zc2luZGV4XSlcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZihNb25zdGVyQ29uZmlndXJlTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldFN0cmVuZ3RoVHlwZShsaXN0W2Jvc3NpbmRleF0uaWQpPT0yKXtcclxuICAgICAgICAgICAgICAgIGp5YXJyLnB1c2gobGlzdFtib3NzaW5kZXhdKVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmKE1vbnN0ZXJDb25maWd1cmVNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0U3RyZW5ndGhUeXBlKGxpc3RbYm9zc2luZGV4XS5pZCk9PTEpe1xyXG4gICAgICAgICAgICAgICAgcHV0LnB1c2gobGlzdFtib3NzaW5kZXhdKVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8v5o+S5YWlXHJcbiAgICAgICAgdGhpcy5Nb25zdGVyRGV0YWlsc2Fyci5sZW5ndGg9MFxyXG4gICAgICAgIHRoaXMuTW9uc3RlckRldGFpbHNhcnIuc3BsaWNlLmFwcGx5KHRoaXMuTW9uc3RlckRldGFpbHNhcnIsW3RoaXMuTW9uc3RlckRldGFpbHNhcnIubGVuZ3RoLDBdLmNvbmNhdChib3NzYXJyKSk7XHJcbiAgICAgICAgdGhpcy5Nb25zdGVyRGV0YWlsc2Fyci5zcGxpY2UuYXBwbHkodGhpcy5Nb25zdGVyRGV0YWlsc2FycixbdGhpcy5Nb25zdGVyRGV0YWlsc2Fyci5sZW5ndGgsMF0uY29uY2F0KGp5YXJyKSk7XHJcbiAgICAgICAgdGhpcy5Nb25zdGVyRGV0YWlsc2Fyci5zcGxpY2UuYXBwbHkodGhpcy5Nb25zdGVyRGV0YWlsc2FycixbdGhpcy5Nb25zdGVyRGV0YWlsc2Fyci5sZW5ndGgsMF0uY29uY2F0KHB1dCkpO1xyXG4gICAgICAgIC8v5oCq54mp5Yi35pawXHJcbiAgICAgICAgZm9yIChsZXQgaW5kZXggPSAwOyBpbmRleCA8IHRoaXMucG9zLmNoaWxkcmVuLmxlbmd0aDsgaW5kZXgrKykge1xyXG4gICAgICAgICAgICBsZXQgdHlwZT0wXHJcbiAgICAgICAgICAgIGxldCBpZD0wXHJcbiAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKFwiKioqKipcIixib3NzYXJyLmxlbmd0aCxqeWFyci5sZW5ndGgscHV0Lmxlbmd0aClcclxuICAgICAgICAgICAgaWYoaW5kZXg8Ym9zc2Fyci5sZW5ndGgpe1xyXG4gICAgICAgICAgICAgICAgaWQ9Ym9zc2FycltpbmRleF0uaWRcclxuICAgICAgICAgICAgICAgIHR5cGU9TW9uc3RlckNvbmZpZ3VyZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRNb25zdGVyQ2xhc3MoaWQpO1xyXG5cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIGlmKGluZGV4PChib3NzYXJyLmxlbmd0aCtqeWFyci5sZW5ndGgpKXtcclxuXHJcbiAgICAgICAgICAgICAgICBpZD1qeWFyclsoaW5kZXgtKGJvc3NhcnIubGVuZ3RoKSldLmlkXHJcbiAgICAgICAgICAgICAgICB0eXBlPU1vbnN0ZXJDb25maWd1cmVNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0TW9uc3RlckNsYXNzKGlkKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIGlmKGluZGV4PChib3NzYXJyLmxlbmd0aCtqeWFyci5sZW5ndGgrcHV0Lmxlbmd0aCkpe1xyXG4gICAgICAgICAgICAgICAgaWQ9cHV0WyhpbmRleC1ib3NzYXJyLmxlbmd0aC1qeWFyci5sZW5ndGgpXS5pZFxyXG4gICAgICAgICAgICAgICAgdHlwZT1Nb25zdGVyQ29uZmlndXJlTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldE1vbnN0ZXJDbGFzcyhpZCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy5oZXJvU2hhZG93LmNoaWxkcmVuW2luZGV4XS5hY3RpdmU9ZmFsc2VcclxuICAgICAgICAgICAgaWYodHlwZT4wKXtcclxuICAgICAgICAgICAgICAgIGxldCBwYXRoID0gXCJtb25zdGVyL3VpL01vbnN0ZXJfXCIgKyB0eXBlO1xyXG4gICAgICAgICAgICAgICAgbGV0IG5vZGU6Y2MuTm9kZSA9IG51bGw7XHJcblxyXG4gICAgICAgICAgICAgICAgY2MucmVzb3VyY2VzLmxvYWQocGF0aCxjYy5QcmVmYWIsKGVycm9yOiBFcnJvciwgYXNzZXRzOmNjLlByZWZhYik9PnsgIFxyXG4gICAgICAgICAgICAgICAgICAgIGlmKGVycm9yKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2MubG9nKGVycm9yKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBub2RlID0gY2MuaW5zdGFudGlhdGUoYXNzZXRzKTtcclxuICAgICAgICAgICAgICAgICAgICBub2RlLnNldFBvc2l0aW9uKDAsMCwwKVxyXG4gICAgICAgICAgICAgICAgICAgIG5vZGUuc2NhbGUgPSBNb25zdGVyQ29uZmlndXJlTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldFNjYWxlKGlkKTtcclxuICAgICAgICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhcImlkOlwiLGlkKVxyXG4gICAgICAgICAgICAgICAgICAgIGxldCBTdHJlbmd0aFR5cGU9IE1vbnN0ZXJDb25maWd1cmVNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0U3RyZW5ndGhUeXBlKGlkKVxyXG4gICAgICAgICAgICAgICAgICAgIG5vZGUucGFyZW50PXRoaXMucG9zLmNoaWxkcmVuW2luZGV4XVxyXG5cclxuXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaGVyb1NoYWRvdy5jaGlsZHJlbltpbmRleF0uYWN0aXZlPXRydWVcclxuICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhcIl9fX19fX19cIixub2RlLHRoaXMucG9zLmNoaWxkcmVuW2luZGV4XSlcclxuICAgICAgICAgICAgICAgICAgICAvLyBpZigpXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gY29uc29sZS5sb2coXCJfX19fX19fX1wiLClcclxuICAgICAgICAgICAgICAgICAgICAvLyBpZihpbmRleDxib3NzYXJyLmxlbmd0aCl7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gbGV0IG5hbWU9U3RyaW5nKG5vZGUuZ2V0Q29tcG9uZW50KHNwLlNrZWxldG9uKS5kZWZhdWx0U2tpbilcclxuICAgICAgICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhcIisrKysrKysrKysrXCIsdHlwZSxTdHJlbmd0aFR5cGUpXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gaWYobmFtZS5zdWJzdHJpbmcoMCw1KT09TW9uc3RlckZhY2VOYW1lLkZyb250KXtcclxuICAgICAgICAgICAgICAgICAgICBpZihTdHJlbmd0aFR5cGU9PTMpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmhlcm9TaGFkb3cuY2hpbGRyZW5baW5kZXhdLnNldFNjYWxlKDEuMywxLjMpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG5vZGUuc2NhbGU9TW9uc3RlckNvbmZpZ3VyZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRTY2FsZShpZCkqMC41O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBub2RlLmdldENvbXBvbmVudChzcC5Ta2VsZXRvbikuc2V0U2tpbihNb25zdGVyRmFjZU5hbWUuRnJvbnQgKyBNb25zdGVyQ29uZmlndXJlTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldFNraW4oaWQpKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbm9kZS5nZXRDb21wb25lbnQoc3AuU2tlbGV0b24pLnNldEFuaW1hdGlvbigwLE1vbnN0ZXJBY3Rpb25OYW1lLklkbGUsdHJ1ZSk7Ly9ub2RlLmdldENvbXBvbmVudChzcC5Ta2VsZXRvbikuc2V0QW5pbWF0aW9uKDAsTW9uc3RlckZhY2VOYW1lLkZyb250ICsgXCJfXCIgKyBNb25zdGVyQWN0aW9uTmFtZS5JZGxlLHRydWUpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBpZihTdHJlbmd0aFR5cGU9PTIpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmhlcm9TaGFkb3cuY2hpbGRyZW5baW5kZXhdLnNldFNjYWxlKDAuNywwLjcpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG5vZGUuc2NhbGU9TW9uc3RlckNvbmZpZ3VyZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRTY2FsZShpZCkqMC42O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBub2RlLmdldENvbXBvbmVudChzcC5Ta2VsZXRvbikuc2V0U2tpbihNb25zdGVyRmFjZU5hbWUuU2lkZVIgKyBNb25zdGVyQ29uZmlndXJlTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldFNraW4oaWQpKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbm9kZS5nZXRDb21wb25lbnQoc3AuU2tlbGV0b24pLnNldEFuaW1hdGlvbigwLE1vbnN0ZXJGYWNlTmFtZS5TaWRlUitcIl9cIitNb25zdGVyQWN0aW9uTmFtZS5JZGxlLHRydWUpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBpZihTdHJlbmd0aFR5cGU9PTEpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmhlcm9TaGFkb3cuY2hpbGRyZW5baW5kZXhdLnNldFNjYWxlKDAuNCwwLjQgKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBub2RlLnNjYWxlPU1vbnN0ZXJDb25maWd1cmVNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0U2NhbGUoaWQpKjAuODtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbm9kZS5nZXRDb21wb25lbnQoc3AuU2tlbGV0b24pLnNldFNraW4oTW9uc3RlckZhY2VOYW1lLlNpZGVSICsgTW9uc3RlckNvbmZpZ3VyZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRTa2luKGlkKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG5vZGUuZ2V0Q29tcG9uZW50KHNwLlNrZWxldG9uKS5zZXRBbmltYXRpb24oMCxNb25zdGVyRmFjZU5hbWUuU2lkZVIrXCJfXCIrTW9uc3RlckFjdGlvbk5hbWUuSWRsZSx0cnVlKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIC8vIGxldCBzY2FsZT1ub2RlLnNjYWxlWFxyXG4gICAgICAgICAgICAgICAgICAgIC8vIGxldCByb209TXlUb29sLnJhbmRvbSgwLDEpXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gaWYocm9tPT0wKXtcclxuICAgICAgICAgICAgICAgICAgICAvLyAgICAgc2NhbGU9c2NhbGUqLTFcclxuICAgICAgICAgICAgICAgICAgICAvLyB9XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gbm9kZS5zY2FsZVg9c2NhbGVcclxuICAgICAgICAgICAgICAgICAgICAvLyB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIC8vIH1cclxuICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgIH1cclxuICAgICAgICAvL+WIt+aWsOiLsembhGl0bWXnirbmgIFcclxuICAgICAgICB0aGlzLlJlZnJlc2hoZXJvaXRtZXN0YXR1cygpXHJcbiAgICAgICAgLy8gSGVyb01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zYXZlVGVhbUxpc3QoR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5jdXJfZ2FtZV9tb2RlLHRlYW1MaXN0KTsvL+WwhuabtOaUueS5i+WQjueahOmYteWei+S/neaMgeWIsOacrOWcsFxyXG4gICAgICAgIGxldCBjYW52YXMgPSBjYy5maW5kKFwiQ2FudmFzXCIpXHJcbiAgICAgICAgdGhpcy5ub2RlLmdldENvbXBvbmVudChjYy5XaWRnZXQpLnRhcmdldD1jYW52YXNcclxuICAgICAgICB0aGlzLk1vbnN0ZXIuYWN0aXZlPWZhbHNlXHJcbiAgICAgICAgdGhpcy5DaGFyaW90LmFjdGl2ZT1mYWxzZVxyXG4gICAgfVxyXG4gICAgLy/liLfmlrDoi7Hpm4RpdG1l54q25oCBXHJcbiAgICBSZWZyZXNoaGVyb2l0bWVzdGF0dXMoKXtcclxuICAgICAgICAvL+W3suino+mUgeeahOiLsembhFxyXG4gICAgICAgIGxldCBIZXJvTGlzdD1IZXJvTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldEhlcm9MaXN0KCkvL+aVsOmHjyAgIOiLsembhGlk57G75Z6LIOiLsembhOetiee6pyDoi7Hpm4Tlk4HotKggIOiLsembhOaYn+aYn+mYtuautVxyXG4gICAgICAgIGxldCBoZXJvQmFzaWNkYXRhYXJyPVtdLy/mnIDpq5jmiJjlipvmlbDnu4RcclxuICAgICAgICBsZXQgSGVyb0xpc3RhcnI9SGVyb0xpc3QvL+W3suino+mUgeeahOiLsembhFxyXG4gICAgICAgIC8v55Sf5oiQ6Iux6ZuEaXRtZVxyXG4gICAgICAgIGZvciAobGV0IGhlcm9pbmRleCA9IHRoaXMuZ3VhaXd1YXJyLmxlbmd0aDsgaGVyb2luZGV4IDwgSGVyb0xpc3QubGVuZ3RoOyBoZXJvaW5kZXgrKykge1xyXG4gICAgICAgICAgICBsZXQgaGVybyA9IGNjLmluc3RhbnRpYXRlKHRoaXMuaGVyb19pdGVtKTtcclxuICAgICAgICAgICAgaGVyby5uYW1lPVwiXCIraGVyb2luZGV4XHJcbiAgICAgICAgICAgIGhlcm8uc2V0U2NhbGUoMC43NSwwLjc1KVxyXG4gICAgICAgICAgICBoZXJvLnBhcmVudD10aGlzLmNvbnRlbnRcclxuICAgICAgICAgICAgdGhpcy5ndWFpd3VhcnIucHVzaChoZXJvKVxyXG4gICAgICAgICAgICAvLyBoZXJvLm9uKGNjLk5vZGUuRXZlbnRUeXBlLlRPVUNIX1NUQVJULCB0aGlzLm9uSGVyb0l0ZW1Ub3VjaFN0YXJ0LCB0aGlzKTtcclxuICAgICAgICAgICAgLy8gaGVyby5vbihjYy5Ob2RlLkV2ZW50VHlwZS5UT1VDSF9NT1ZFLCB0aGlzLm9uSGVyb0l0ZW1Ub3VjaE1vdmUsIHRoaXMpO1xyXG4gICAgICAgICAgICBoZXJvLm9uKGNjLk5vZGUuRXZlbnRUeXBlLlRPVUNIX0VORCwgdGhpcy5vbkhlcm9JdGVtVG91Y2hFbmQsIHRoaXMpO1xyXG4gICAgICAgICAgICAvLyBoZXJvLm9uKGNjLk5vZGUuRXZlbnRUeXBlLlRPVUNIX0NBTkNFTCwgdGhpcy5vbkhlcm9JdGVtVG91Y2hDYW5jZWwsIHRoaXMpO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvL+WIt+aWsOiLsembhGl0bWVcclxuICAgICAgICBmb3IgKGxldCBoZXJvQmFzaWNkYXRhaW5kZXggPSAwOyBoZXJvQmFzaWNkYXRhaW5kZXggPCBIZXJvTGlzdC5sZW5ndGg7IGhlcm9CYXNpY2RhdGFpbmRleCsrKSB7XHJcbiAgICAgICAgICAgIGxldCBoZXJvQmFzaWNkYXRhPUhlcm9NYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0SGVyb0RhdGEoSGVyb0xpc3RbaGVyb0Jhc2ljZGF0YWluZGV4XS5oZXJvX3R5cGUpLy/oi7Hpm4TnmoTln7rnoYDmlbDmja4gICDkvKDlhaXoi7Hpm4RpZOexu+WeiyAg6Ziy5b6h5YqbICDnlJ/lkb3lgLwgIOWRveS4reWAvCBcclxuICAgICAgICAgICAgaGVyb0Jhc2ljZGF0YWFyci5wdXNoKGhlcm9CYXNpY2RhdGEudG90YWxfYXR0YWNrKVxyXG4gICAgICAgIH1cclxuICAgICAgICAvL+aOkuWIl+iLsembhOaImOWKm1xyXG4gICAgICAgIGxldCBjdW5cclxuICAgICAgICBsZXQgaGVyb2N1blxyXG4gICAgICAgIGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCBoZXJvQmFzaWNkYXRhYXJyLmxlbmd0aDsgaW5kZXgrKykge1xyXG4gICAgICAgICAgICBmb3IgKGxldCBwYWl4dmluZGV4ID0gMDsgcGFpeHZpbmRleCA8IGhlcm9CYXNpY2RhdGFhcnIubGVuZ3RoLTE7IHBhaXh2aW5kZXgrKykge1xyXG4gICAgICAgICAgICAgICAgaWYoaGVyb0Jhc2ljZGF0YWFycltwYWl4dmluZGV4KzFdPmhlcm9CYXNpY2RhdGFhcnJbcGFpeHZpbmRleF0pe1xyXG4gICAgICAgICAgICAgICAgICAgIGN1bj1oZXJvQmFzaWNkYXRhYXJyW3BhaXh2aW5kZXhdXHJcbiAgICAgICAgICAgICAgICAgICAgaGVyb0Jhc2ljZGF0YWFycltwYWl4dmluZGV4XT1oZXJvQmFzaWNkYXRhYXJyW3BhaXh2aW5kZXgrMV1cclxuICAgICAgICAgICAgICAgICAgICBoZXJvQmFzaWNkYXRhYXJyW3BhaXh2aW5kZXgrMV09Y3VuXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGhlcm9jdW49SGVyb0xpc3RhcnJbcGFpeHZpbmRleF1cclxuICAgICAgICAgICAgICAgICAgICBIZXJvTGlzdGFycltwYWl4dmluZGV4XT1IZXJvTGlzdGFycltwYWl4dmluZGV4KzFdXHJcbiAgICAgICAgICAgICAgICAgICAgSGVyb0xpc3RhcnJbcGFpeHZpbmRleCsxXT1oZXJvY3VuXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgbGV0IHRlYW1MaXN0PUhlcm9NYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0VGVhbUxpc3QoR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5jdXJfZ2FtZV9tb2RlKTtcclxuXHJcbiAgICAgICAgLy8gY29uc29sZS5sb2coXCIrKysrKytcIix0ZWFtTGlzdClcclxuICAgICAgICB0aGlzLmdyZXlidXR0b25qdWRnbWVudD0wLy/ngbDoibLmjInpkq7liKTmlq0g5aaC5p6c5rKh5pyJ5LiA5Liq6Iux6ZuE5LiK6Zi1ICDkuI3lj6/lvIDlkK/muLjmiI9cclxuXHJcbiAgICAgICAgbGV0ICBHb3RvYmF0dGxlbnVtYmVyPTAvL+S4iumYteS6huWHoOS4quiLsembhFxyXG4gICAgICAgIGZvcihsZXQgaT0wOyBpPHRlYW1MaXN0Lmxlbmd0aDsgaSsrKSBcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGxldCBoZXJvVHlwZT10ZWFtTGlzdFtpXTtcclxuICAgICAgICAgICAgaWYoaGVyb1R5cGU+MClcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgR290b2JhdHRsZW51bWJlcisrXHJcblxyXG4gICAgICAgICAgICAgICAgdGhpcy5ncmV5YnV0dG9uanVkZ21lbnQ9MVxyXG4gICAgICAgICAgICAgICAgLy8gY29uc29sZS5sb2coXCIrKysrKytcIixoZXJvVHlwZSlcclxuICAgICAgICAgICAgICAgIHRoaXMua29td2VpLmNoaWxkcmVuW2ldLmdldENoaWxkQnlOYW1lKFwiUHJlcGFyZV9Wb2lkXCIpLmFjdGl2ZT1mYWxzZVxyXG4gICAgICAgICAgICAgICAgdGhpcy5rb213ZWkuY2hpbGRyZW5baV0uZ2V0Q2hpbGRCeU5hbWUoXCJ3aW5UZXh0XCIpLmFjdGl2ZT1mYWxzZVxyXG4gICAgICAgICAgICAgICAgdGhpcy5rb213ZWkuY2hpbGRyZW5baV0uZ2V0Q2hpbGRCeU5hbWUoXCJoZXJvU2hhZG93XCIpLmFjdGl2ZT10cnVlLy/pmLTlvbFcclxuICAgICAgICAgICAgICAgIHRoaXMua29td2VpLmNoaWxkcmVuW2ldLmdldENoaWxkQnlOYW1lKFwiaGVyb1wiKS5hY3RpdmU9dHJ1ZVxyXG4gICAgICAgICAgICAgICAgdGhpcy5rb213ZWkuY2hpbGRyZW5baV0uZ2V0Q2hpbGRCeU5hbWUoXCJoZXJvXCIpLmdldENvbXBvbmVudChzcC5Ta2VsZXRvbikuc2tlbGV0b25EYXRhPXRoaXMuc3BbKGhlcm9UeXBlLTEpXVxyXG4gICAgICAgICAgICAgICAgdGhpcy5rb213ZWkuY2hpbGRyZW5baV0uZ2V0Q2hpbGRCeU5hbWUoXCJoZXJvXCIpLmdldENvbXBvbmVudChzcC5Ta2VsZXRvbikuYW5pbWF0aW9uPVwiSWRsZVwiXHJcbiAgICAgICAgICAgICAgICAvLyB0aGlzLmxvYWRIZXJvKGhlcm9UeXBlLGkpXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZXtcclxuICAgICAgICAgICAgICAgIHRoaXMua29td2VpLmNoaWxkcmVuW2ldLmdldENoaWxkQnlOYW1lKFwid2luVGV4dFwiKS5hY3RpdmU9dHJ1ZVxyXG4gICAgICAgICAgICAgICAgdGhpcy5rb213ZWkuY2hpbGRyZW5baV0uZ2V0Q2hpbGRCeU5hbWUoXCJoZXJvU2hhZG93XCIpLmFjdGl2ZT1mYWxzZS8v6Zi05b2xXHJcbiAgICAgICAgICAgICAgICB0aGlzLmtvbXdlaS5jaGlsZHJlbltpXS5nZXRDaGlsZEJ5TmFtZShcIlByZXBhcmVfVm9pZFwiKS5hY3RpdmU9dHJ1ZVxyXG4gICAgICAgICAgICAgICAgdGhpcy5rb213ZWkuY2hpbGRyZW5baV0uZ2V0Q2hpbGRCeU5hbWUoXCJoZXJvXCIpLmFjdGl2ZT1mYWxzZVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vIGNvbnNvbGUubG9nKFwiX19fX19fX1wiLEdvdG9iYXR0bGVudW1iZXIpXHJcbiAgICAgICAgZm9yIChsZXQgaW5kZXggPSAwOyBpbmRleCA8IEdvdG9iYXR0bGVudW1iZXI7IGluZGV4KyspIHtcclxuICAgICAgICAgICAgaWYoR290b2JhdHRsZW51bWJlciA+IFRhc2tNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0VGFza05vd1Byb2dyZXNzKFRhc2tJdGVtLuS4iumYtVjlkI3oi7Hpm4QpKXtcclxuICAgICAgICAgICAgICAgIFRhc2tNYW5hZ2VyLmdldEluc3RhbmNlKCkuZW1pdFRhc2soVGFza0l0ZW0u5LiK6Zi1WOWQjeiLsembhCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmKHRoaXMuZ3JleWJ1dHRvbmp1ZGdtZW50PT0wKXtcclxuICAgICAgICAgICAgdGhpcy5Db21tb25fQnRuXzAuZ2V0Q2hpbGRCeU5hbWUoXCJMYWJlbFwiKS5nZXRDb21wb25lbnQoVGV4dExhbmd1YWdlKS5zZXRNYXRlcmlhbCgwLCBjYy5NYXRlcmlhbC5nZXRCdWlsdGluTWF0ZXJpYWwoXCIyZC1ncmF5LXNwcml0ZVwiKSk7XHJcbiAgICAgICAgICAgIHRoaXMuQ29tbW9uX0J0bl8wLmdldENvbXBvbmVudChjYy5TcHJpdGUpLnNldE1hdGVyaWFsKDAsIGNjLk1hdGVyaWFsLmdldEJ1aWx0aW5NYXRlcmlhbChcIjJkLWdyYXktc3ByaXRlXCIpKTtcclxuICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgdGhpcy5Db21tb25fQnRuXzAuZ2V0Q2hpbGRCeU5hbWUoXCJMYWJlbFwiKS5nZXRDb21wb25lbnQoVGV4dExhbmd1YWdlKS5zZXRNYXRlcmlhbCgwLCBjYy5NYXRlcmlhbC5nZXRCdWlsdGluTWF0ZXJpYWwoXCIyZC1zcHJpdGVcIikpO1xyXG4gICAgICAgICAgICB0aGlzLkNvbW1vbl9CdG5fMC5nZXRDb21wb25lbnQoY2MuU3ByaXRlKS5zZXRNYXRlcmlhbCgwLCBjYy5NYXRlcmlhbC5nZXRCdWlsdGluTWF0ZXJpYWwoXCIyZC1zcHJpdGVcIikpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy/liLfmlrDoi7Hpm4RpdG1l54q25oCBXHJcbiAgICAgICAgLy/ooYDph49cclxuICAgICAgICBsZXQgamR0bnVtYmVyPTBcclxuICAgICAgICBmb3IgKGxldCBzaHVheGluZ2luZGV4ID0gMDsgc2h1YXhpbmdpbmRleCA8IEhlcm9MaXN0YXJyLmxlbmd0aDsgc2h1YXhpbmdpbmRleCsrKSB7XHJcbiAgICAgICAgICAgIHRoaXMuZ3VhaXd1YXJyW3NodWF4aW5naW5kZXhdLmdldENvbXBvbmVudChIZXJvSXRlbSkuUmVmcmVzaEhlcm9lc0l0ZW0oSGVyb0xpc3RhcnJbc2h1YXhpbmdpbmRleF0uaGVyb190eXBlKVxyXG4gICAgICAgICAgICBmb3IgKGxldCB0ZWFtTGlzdGluZGV4ID0gMDsgdGVhbUxpc3RpbmRleCA8IHRlYW1MaXN0Lmxlbmd0aDsgdGVhbUxpc3RpbmRleCsrKSB7XHJcbiAgICAgICAgICAgICAgICBpZih0ZWFtTGlzdFt0ZWFtTGlzdGluZGV4XT09SGVyb0xpc3RhcnJbc2h1YXhpbmdpbmRleF0uaGVyb190eXBlKXtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmd1YWl3dWFycltzaHVheGluZ2luZGV4XS5nZXRDaGlsZEJ5TmFtZShcInNoYW5nemhlbmdcIikuYWN0aXZlPXRydWVcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZm9yIChsZXQgeHVlbGluZGV4ID0gMDsgeHVlbGluZGV4IDwgdGVhbUxpc3QubGVuZ3RoOyB4dWVsaW5kZXgrKykge1xyXG4gICAgICAgICAgICBpZih0ZWFtTGlzdFt4dWVsaW5kZXhdPjApe1xyXG4gICAgICAgICAgICAgICAgamR0bnVtYmVyKz1IZXJvTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldEhlcm9EYXRhKHRlYW1MaXN0W3h1ZWxpbmRleF0pLnRvdGFsX2hwLy/oi7Hpm4TnmoTln7rnoYDmlbDmja4gICDkvKDlhaXoi7Hpm4RpZOexu+WeiyAg6Ziy5b6h5YqbICDnlJ/lkb3lgLwgIOWRveS4reWAvCAgXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgLy8gY2MubG9nKE1hdGgucm91bmQoMS4xMTEpKTsvLzFcclxuICAgICAgICBqZHRudW1iZXI9TWF0aC5yb3VuZChqZHRudW1iZXIvNSlcclxuICAgICAgICAvLyBjb25zb2xlLmxvZyhcIl9fX19fX19cIixqZHRudW1iZXIpXHJcbiAgICAgICAgLy/liLfmlrDooYDph49cclxuICAgICAgICB0aGlzLmpkdC5nZXRDb21wb25lbnQoY2MuTGFiZWwpLnN0cmluZz1cIlwiK2pkdG51bWJlcitcIi9cIitcIlwiK2pkdG51bWJlclxyXG4gICAgfVxyXG4gICAgLy8gb25IZXJvSXRlbVRvdWNoU3RhcnQoZTpjYy5FdmVudC5FdmVudFRvdWNoKSB7XHJcbiAgICAvLyAgICAgbGV0IHRvdWNoVGVhbT1lLmdldEN1cnJlbnRUYXJnZXQoKTtcclxuICAgIC8vICAgICBjb25zb2xlLmxvZyhcIueCueWHu++8mlwiLHRvdWNoVGVhbS5uYW1lKVxyXG4gICAgLy8gICAgIHRoaXMuU2Nyb2xsVmlld3MuZ2V0Q29tcG9uZW50KGNjLlNjcm9sbFZpZXcpLmVuYWJsZWQ9ZmFsc2VcclxuICAgIC8vICAgICAvL+WmguaenOi/meS4quiLsembhOayoeacieS4iumYtSAgIOWwseWPr+S7peaLluWHuui/meS4quiLsembhFxyXG4gICAgLy8gICAgIGlmKHRvdWNoVGVhbS5nZXRDaGlsZEJ5TmFtZShcInNoYW5nemhlbmdcIikuYWN0aXZlPT1mYWxzZSl7XHJcbiAgICAvLyAgICAgICAgIGxldCBwb3M9dGhpcy5rb213ZWkuY29udmVydFRvTm9kZVNwYWNlQVIoZS5nZXRMb2NhdGlvbigpKTtcclxuICAgIC8vICAgICAgICAgdGhpcy5Nb3VzZWl0ZW0uZ2V0Q29tcG9uZW50KEhlcm9JdGVtKS5oZXJvVHlwZT10b3VjaFRlYW0uZ2V0Q29tcG9uZW50KEhlcm9JdGVtKS5oZXJvVHlwZVxyXG4gICAgLy8gICAgICAgICB0aGlzLk1vdXNlaXRlbS5nZXRDb21wb25lbnQoSGVyb0l0ZW0pLlJlZnJlc2hIZXJvZXNJdGVtKHRvdWNoVGVhbS5nZXRDb21wb25lbnQoSGVyb0l0ZW0pLmhlcm9UeXBlKVxyXG4gICAgLy8gICAgICAgICB0aGlzLk1vdXNlaXRlbS5zZXRQb3NpdGlvbihwb3MpXHJcbiAgICAvLyAgICAgICAgIHRoaXMuTW91c2VpdGVtLmFjdGl2ZT10cnVlXHJcbiAgICAvLyAgICAgfWVsc2V7XHJcbiAgICAvLyAgICAgICAgIEdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuc2hvd01lc3NhZ2UoTGFuZ3VhZ2VNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0U3RyQnlUZXh0SWQoMTAwMDkxKSlcclxuICAgIC8vICAgICB9XHJcbiAgICAvLyB9XHJcbiAgICAvLyBvbkhlcm9JdGVtVG91Y2hNb3ZlKGU6Y2MuRXZlbnQuRXZlbnRUb3VjaCkge1xyXG4gICAgLy8gICAgIGxldCB0b3VjaFRlYW09ZS5nZXRDdXJyZW50VGFyZ2V0KCk7XHJcbiAgICAvLyAgICAgY29uc29sZS5sb2coXCLnp7vliqjvvJpcIix0b3VjaFRlYW0ubmFtZSlcclxuICAgIC8vICAgICAvL+aLluWKqOi/meS4quiLsembhFxyXG4gICAgLy8gICAgIGlmKHRvdWNoVGVhbS5nZXRDaGlsZEJ5TmFtZShcInNoYW5nemhlbmdcIikuYWN0aXZlPT1mYWxzZSYmdGhpcy5Nb3VzZWl0ZW0uYWN0aXZlPT10cnVlKXtcclxuICAgIC8vICAgICAgICAgbGV0IHBvcz10aGlzLmtvbXdlaS5jb252ZXJ0VG9Ob2RlU3BhY2VBUihlLmdldExvY2F0aW9uKCkpO1xyXG4gICAgLy8gICAgICAgICB0aGlzLk1vdXNlaXRlbS5zZXRQb3NpdGlvbihwb3MpXHJcbiAgICAvLyAgICAgfWVsc2V7XHJcbiAgICAvLyAgICAgICAgIEdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuc2hvd01lc3NhZ2UoTGFuZ3VhZ2VNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0U3RyQnlUZXh0SWQoMTAwMDkxKSlcclxuICAgIC8vICAgICB9XHJcbiAgICAvLyB9XHJcbiAgICBvbkhlcm9JdGVtVG91Y2hFbmQoZTpjYy5FdmVudC5FdmVudFRvdWNoKSB7XHJcbiAgICAgICAgbGV0IHRvdWNoVGVhbT1lLmdldEN1cnJlbnRUYXJnZXQoKTtcclxuICAgICAgICAvLyBjb25zb2xlLmxvZyhcIuWcqOmHjOmdouaUvuW8gFwiLHRvdWNoVGVhbS5uYW1lKVxyXG4gICAgICAgIHRoaXMuU2Nyb2xsVmlld3MuZ2V0Q29tcG9uZW50KGNjLlNjcm9sbFZpZXcpLmVuYWJsZWQ9dHJ1ZVxyXG4gICAgICAgIGlmKHRvdWNoVGVhbS5nZXRDaGlsZEJ5TmFtZShcInNoYW5nemhlbmdcIikuYWN0aXZlPT1mYWxzZSl7XHJcbiAgICAgICAgICAgIC8v5LiK6Zi16K+l6Iux6ZuEXHJcbiAgICAgICAgICAgIGxldCB0ZWFtTGlzdD1IZXJvTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldFRlYW1MaXN0KEdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuY3VyX2dhbWVfbW9kZSk7XHJcbiAgICAgICAgICAgIGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCB0ZWFtTGlzdC5sZW5ndGg7IGluZGV4KyspIHtcclxuICAgICAgICAgICAgICAgIC8vIEB0cy1pZ25vcmVcclxuICAgICAgICAgICAgICAgIGlmKHRlYW1MaXN0W2luZGV4XT09LTF8fHRlYW1MaXN0W2luZGV4XT09SGVyb19UeXBlLk5VTEwpe1xyXG4gICAgICAgICAgICAgICAgICAgIHRlYW1MaXN0W2luZGV4XT10b3VjaFRlYW0uZ2V0Q29tcG9uZW50KEhlcm9JdGVtKS5oZXJvX3R5cGVcclxuICAgICAgICAgICAgICAgICAgICBIZXJvTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNhdmVUZWFtTGlzdChHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLmN1cl9nYW1lX21vZGUsdGVhbUxpc3QpXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5SZWZyZXNoaGVyb2l0bWVzdGF0dXMoKVxyXG4gICAgICAgICAgICAgICAgICAgIHJldHVyblxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIEdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuc2hvd01lc3NhZ2UoTGFuZ3VhZ2VNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0U3RyQnlUZXh0SWQoMTMwMDEzKSlcclxuICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zaG93TWVzc2FnZShMYW5ndWFnZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRTdHJCeVRleHRJZCgxMDAwOTEpKVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIC8vIG9uSGVyb0l0ZW1Ub3VjaENhbmNlbChlOmNjLkV2ZW50LkV2ZW50VG91Y2gpIHtcclxuICAgIC8vICAgICBsZXQgdG91Y2hUZWFtPWUuZ2V0Q3VycmVudFRhcmdldCgpO1xyXG4gICAgLy8gICAgIHRoaXMuU2Nyb2xsVmlld3MuZ2V0Q29tcG9uZW50KGNjLlNjcm9sbFZpZXcpLmVuYWJsZWQ9dHJ1ZVxyXG4gICAgLy8gICAgIGNvbnNvbGUubG9nKFwi5Zyo5aSW6Z2i5pS+5byAXCIsdG91Y2hUZWFtLm5hbWUpXHJcbiAgICAvLyAgICAgbGV0IHRlYW1MaXN0PUhlcm9NYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0VGVhbUxpc3QoR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5jdXJfZ2FtZV9tb2RlKTtcclxuICAgIC8vICAgICBsZXQgcG9zPXRoaXMua29td2VpLmNvbnZlcnRUb05vZGVTcGFjZUFSKGUuZ2V0TG9jYXRpb24oKSk7XHJcblxyXG5cclxuXHJcbiAgICAvLyAgICAgaWYodG91Y2hUZWFtLmdldENoaWxkQnlOYW1lKFwic2hhbmd6aGVuZ1wiKS5hY3RpdmU9PWZhbHNlJiZ0aGlzLk1vdXNlaXRlbS5hY3RpdmU9PXRydWUpe1xyXG4gICAgLy8gICAgICAgICAvL+WmguaenOWcqOS4iumYteepuuS9jeS4reS4lOi/meS4quS9jee9ruayoeacieiLsembhCDlsLHkuIrpmLXoi7Hpm4QgICDlpoLmnpzov5nkuKrkvY3nva7mnInoi7Hpm4QgICDlsLHkuIvpmLXov5nkuKrkvY3nva7nmoToi7Hpm4QgICDlnKjkuIrpmLXoi7Hpm4RcclxuICAgIC8vICAgICAgICAgdGhpcy5Nb3VzZWl0ZW0uYWN0aXZlPWZhbHNlXHJcblxyXG5cclxuICAgIC8vICAgICAgICAgZm9yKGxldCBpPTA7IGk8dGhpcy5oZXJvX3RlYW1fcmVjdC5sZW5ndGg7IGkrKylcclxuICAgIC8vICAgICAgICAge1xyXG4gXHJcbiAgICAvLyAgICAgICAgICAgICBpZih0aGlzLmhlcm9fdGVhbV9yZWN0W2ldLmNvbnRhaW5zKHBvcyk9PXRydWUpXHJcbiAgICAvLyAgICAgICAgICAgICB7ICAgXHJcbiAgICAvLyAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCLmmK/lkKblnKjnqbrkvY3ph4zpnaLvvJpcIix0aGlzLmhlcm9fdGVhbV9yZWN0W2ldLHBvcylcclxuICAgIC8vICAgICAgICAgICAgICAgICAvLyBpZih0ZWFtTGlzdFtpXT09SGVyb19UeXBlLk5VTEx8fHRlYW1MaXN0W2ldPT0tMSl7XHJcbiAgICAvLyAgICAgICAgICAgICAgICAgICAgIHRlYW1MaXN0W2ldPXRoaXMuTW91c2VpdGVtLmdldENvbXBvbmVudChIZXJvSXRlbSkuaGVyb1R5cGVcclxuICAgIC8vICAgICAgICAgICAgICAgICAvLyB9ZWxzZXtcclxuICAgIC8vICAgICAgICAgICAgICAgICAgICAgLy8gdGVhbUxpc3RbaV09LTFcclxuICAgIC8vICAgICAgICAgICAgICAgICAvLyB9XHJcblxyXG4gICAgLy8gICAgICAgICAgICAgICAgIEhlcm9NYW5hZ2VyLmdldEluc3RhbmNlKCkuc2F2ZVRlYW1MaXN0KEdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuY3VyX2dhbWVfbW9kZSx0ZWFtTGlzdClcclxuICAgIC8vICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIueOsOWcqOeahOiLsembhOWIl+ihqO+8mlwiLHRlYW1MaXN0KVxyXG4gICAgLy8gICAgICAgICAgICAgICAgIHRoaXMuU2VsZnBvc2l0aW9uKGkpXHJcblxyXG4gICAgLy8gICAgICAgICAgICAgICAgIHRoaXMuUmVmcmVzaGhlcm9pdG1lc3RhdHVzKClcclxuICAgIC8vICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAvLyAgICAgICAgICAgICB9XHJcbiAgICAvLyAgICAgICAgIH1cclxuICAgIC8vICAgICAgICAgdGhpcy5SZWZyZXNoaGVyb2l0bWVzdGF0dXMoKVxyXG4gICAgLy8gICAgIH1cclxuICAgICAgICAgICAgXHJcbiAgICAvLyB9XHJcbiAgICAvLyBzZXRMZXZlbERhdGEoKVxyXG4gICAgLy8ge1xyXG4gICAgLy8gICAgIExldmVsTWFuYWdlci5nZXRJbnN0YW5jZSgpLnN0YXJ0X2xldmVsPXRoaXMuY3VyX3NlbGVjdGVkX2xldmVsO1xyXG4gICAgLy8gICAgIGxldCBnbT1HYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpO1xyXG4gICAgLy8gICAgIGdtLmxldmVsX2RhdGFzPW5ldyBBcnJheSgpO1xyXG4gICAgLy8gICAgIGdtLmxldmVsX2RhdGFzPU1pc3Npb25MZXZlbE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRMZXZlbERhdGFzKHRoaXMuY3VyX3NlbGVjdGVkX2xldmVsKTtcclxuICAgIC8vIH1cclxuICAgIC8vIGxvYWRIZXJvKGhlcm9UeXBlOkhlcm9fVHlwZSxwb3NJbmRleDpudW1iZXIpXHJcbiAgICAvLyB7ICAgICAgICBcclxuICAgIC8vICAgICBIZXJvLm1heF9sb2FkX251bSsrO1xyXG4gICAgLy8gICAgIGxldCBwb3NYPXBvc0luZGV4KjEyOC0xOTI7XHJcbiAgICAvLyAgICAgY2MucmVzb3VyY2VzLmxvYWQoJ2hlcm9zL2hlcm8nK2hlcm9UeXBlLGNjLlByZWZhYiwoZXJyb3I6IEVycm9yLCBhc3NldHM6Y2MuUHJlZmFiKT0+e1xyXG4gICAgLy8gICAgICAgICBpZihlcnJvcilcclxuICAgIC8vICAgICAgICAge1xyXG4gICAgLy8gICAgICAgICAgICAgY29uc29sZS5sb2coZXJyb3IpO1xyXG4gICAgLy8gICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgLy8gICAgICAgICB9XHJcbiAgICAvLyAgICAgICAgIGxldCBub2RlPWNjLmluc3RhbnRpYXRlKGFzc2V0cyk7XHJcbiAgICAvLyAgICAgICAgIG5vZGUucGFyZW50PXRoaXMua29td2VpO1xyXG4gICAgLy8gICAgICAgICBub2RlLng9cG9zWDtcclxuICAgIC8vICAgICAgICAgLy8gbGV0IGhwPWNjLmZpbmQoJ0NhbnZhcy9VaV9Sb290L3dhbGxfcm9vdCcpO1xyXG4gICAgLy8gICAgICAgICAvLyBub2RlLnk9aHAueSs4MDtcclxuICAgIC8vICAgICAgICAgQnVmZlN0YXRlTWFuYWdlci5nZXRJbnN0YW5jZSgpLmNyZWF0ZUJ1ZmZSb290KGNjLnYyKHBvc1gsbm9kZS55KzE1MCksaGVyb1R5cGUpO1xyXG4gICAgLy8gICAgIH0pOyBcclxuICAgIC8vIH1cclxuICAgIGNsaWNrQnRuU3RhcnQoKS8v5byA5aeL5ri45oiPXHJcbiAgICB7XHJcbiAgICAgICAgLy8gQHRzLWlnbm9yZVxyXG4gICAgICAgIGlmKHRoaXMuZ3JleWJ1dHRvbmp1ZGdtZW50PT0wKXtcclxuICAgICAgICAgICAgR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zaG93TWVzc2FnZShMYW5ndWFnZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRTdHJCeVRleHRJZCgxMzAwMDYpKVxyXG4gICAgICAgICAgICByZXR1cm5cclxuICAgICAgICB9XHJcbiAgICAgICAgXHJcbiAgICAgICAgdGhpcy5kZXMoKVxyXG4gICAgICAgIGxldCBHTT1HYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpO1xyXG4gICAgICAgIEZvbGxvd01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5mb2xsb3dFdmVudChGb2xsb3dfVHlwZS7ngrnlh7vlvIDlp4vmjJHmiJjnlKjmiLfmlbApO1xyXG4gICAgICAgIEdNLnNvdW5kX21hbmFnZXIucGxheVNvdW5kKFNvdW5kSW5kZXguY2xpY2spO1xyXG4gICAgICAgIGxldCBmaWdodGluZ0luZm89bnVsbDtcclxuICAgICAgICBzd2l0Y2goR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5jdXJfZ2FtZV9tb2RlKXtcclxuICAgICAgICAgICAgY2FzZSBHYW1lTW9kZS5NYWluOntcclxuICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgLy8gTGV2ZWxNYW5hZ2VyLmdldEluc3RhbmNlKCkuc3RhcnRfbGV2ZWw9TGV2ZWxNYW5hZ2VyLmdldEluc3RhbmNlKCkuZmluaXNoX2xldmVsKzE7XHJcbiAgICAgICAgICAgICAgICAvLyBmaWdodGluZ0luZm89TWlzc2lvbkxldmVsTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldEZpZ2h0aW5nSW5mbyhMZXZlbE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zdGFydF9sZXZlbCk7XHJcbiAgICAgICAgICAgICAgICBpZighVHV0b3JhaWxzTWFuYWdlci5nZXRJbnN0YW5jZSgpLmlzX2ZpbmlzaF9nYW1lKXtcclxuICAgICAgICAgICAgICAgICAgICBmaWdodGluZ0luZm89VHV0b3JpYWxMZXZlbE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRGaWdodGluZ0luZm8oTWFwTWFuYWdlci5DdXJyZW50bGV2ZWwpO1xyXG4gICAgICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICAgICAgZmlnaHRpbmdJbmZvPU1pc3Npb25MZXZlbE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRGaWdodGluZ0luZm8oTWFwTWFuYWdlci5DdXJyZW50bGV2ZWwpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICBMZXZlbE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zdGFydF9sZXZlbD1NYXBNYW5hZ2VyLkN1cnJlbnRsZXZlbDtcclxuICAgICAgICAgICAgfWJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIEdhbWVNb2RlLkVuZGxlc3M6e1xyXG4gICAgICAgICAgICAgICAgUHJvcE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5jaGFuZ2VQcm9wTnVtKFByb3BJZC5FbmRsZXNzQ2hhbGxlbmdlLC0xKTtcclxuICAgICAgICAgICAgICAgIGZpZ2h0aW5nSW5mbz1FbmRsZXNzTGV2ZWxzTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldEZpZ2h0aW5nSW5mbygxKTtcclxuICAgICAgICAgICAgfWJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIEdhbWVNb2RlLkJvc3NfQ2hhbGxlbmdlOntcclxuICAgICAgICAgICAgICAgIFByb3BNYW5hZ2VyLmdldEluc3RhbmNlKCkuY2hhbmdlUHJvcE51bShQcm9wSWQuQm9zc1RpY2tldCwtMSk7XHJcbiAgICAgICAgICAgICAgICBmaWdodGluZ0luZm89Qm9zc0NoYWxsZW5nZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRGaWdodGluZ0luZm8oQm9zc0NoYWxsZW5nZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5jdXJfY2hhbGxlbmdlX21vZGUpO1xyXG4gICAgICAgICAgICB9YnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgR2FtZU1vZGUuTWF6ZTp7XHJcbiAgICAgICAgICAgICAgICBUaW1lcy52b2lkc2Vuc2lkPXRoaXMuTWF6ZWlkXHJcbiAgICAgICAgICAgICAgICBmaWdodGluZ0luZm89TWF6ZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRGaWdodGluZ0luZm8odGhpcy5NYXplaWQpO1xyXG4gICAgICAgICAgICAgICAgaWYoR00uY3VyX2dhbWVfc2NlbmU9PUdhbWVTY2VuZS5nYW1lKXtcclxuICAgICAgICAgICAgICAgICAgICBzdXBlci5vblJlZnJlc2goKTtcclxuICAgICAgICAgICAgICAgICAgICBzdXBlci5vbkNsb3NlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgR00uc3RhcnROZXh0TGV2ZWwoKTtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1icmVhaztcclxuICAgICAgICAgICAgY2FzZSBHYW1lTW9kZS5Ub3dlcjp7XHJcbiAgICAgICAgICAgICAgICAvLyBmaWdodGluZ0luZm89VG93ZXJMZXZlbE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRGaWdodGluZ0luZm8oVG93ZXJNYW5hZ2VyLmdldFRvd2VyTGV2ZWwoKSk7XHJcbiAgICAgICAgICAgIH1icmVhaztcclxuICAgICAgICB9XHJcbiAgICAgICAgR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5maWdodGluZ19pbmZvPWZpZ2h0aW5nSW5mbztcclxuICAgICAgICAvLyB0aGlzLnNob3dFbmVyZ3koKTtcclxuICAgICAgICBHTS5yZWZyZXNoVXNlckV4cFNob3coKTtcclxuICAgICAgICAvL3RoaXMuc2V0TGV2ZWxEYXRhKCk7XHJcbiAgICAgICAgbGV0IGJnTG9hZGluZz1VSU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRMb2FkaW5nTm9kZSgpO1xyXG4gICAgICAgIGJnTG9hZGluZy5hY3RpdmU9dHJ1ZTtcclxuICAgICAgICBsZXQgbG9hZGluZ0Jhcj1iZ0xvYWRpbmcuZ2V0Q2hpbGRCeU5hbWUoJ1Byb2dyZXNzQmFyJykuZ2V0Q29tcG9uZW50KGNjLlByb2dyZXNzQmFyKTtcclxuICAgICAgICBsZXQgbG9hZExhYmVsPWxvYWRpbmdCYXIubm9kZS5nZXRDaGlsZEJ5TmFtZSgnbG9hZExhYmVsJykuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKTtcclxuICAgICAgICBjYy5kaXJlY3Rvci5wcmVsb2FkU2NlbmUoR2FtZVNjZW5lLmdhbWUsKGNvbXBsZXRlZENvdW50OiBudW1iZXIsIHRvdGFsQ291bnQ6IG51bWJlciwgaXRlbTogYW55KT0+e1xyXG4gICAgICAgICAgICAvL+ecn+Wunui/m+W6plxyXG4gICAgICAgICAgICBsZXQgcHJvZ3Jlc3NUcnVlPWNvbXBsZXRlZENvdW50L3RvdGFsQ291bnQ7XHJcbiAgICAgICAgICAgIC8v5YGH55qE6L+b5bqmXHJcbiAgICAgICAgICAgIGxldCBwcm9ncmVzc0ZhbHNlPXByb2dyZXNzVHJ1ZS8yO1xyXG4gICAgICAgICAgICBsb2FkaW5nQmFyLnByb2dyZXNzID0gcHJvZ3Jlc3NGYWxzZTtcclxuICAgICAgICAgICAgbG9hZExhYmVsLnN0cmluZz0obG9hZGluZ0Jhci5wcm9ncmVzcyoxMDApLnRvRml4ZWQoMCkrJyUnO1xyXG4gICAgICAgICAgICBHTS5jdXJfbG9hZF9wcm9ncmVzcz1wcm9ncmVzc0ZhbHNlO1xyXG4gICAgICAgICAgICAvLyB0aGlzLmxvYWRpbmdfbGlnaHQueCA9IHRoaXMubG9hZGluZ19iYXIucHJvZ3Jlc3MqdGhpcy5sb2FkaW5nX2Jhci50b3RhbExlbmd0aC10aGlzLmxvYWRpbmdfYmFyLnRvdGFsTGVuZ3RoLzI7XHJcbiAgICAgICAgfSwoKT0+e1xyXG4gICAgICAgICAgICBjYy5kaXJlY3Rvci5sb2FkU2NlbmUoR2FtZVNjZW5lLmdhbWUpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIFxyXG4gICAgfVxyXG5cclxuICAgIGRlcygpIHsvL+a4hemZpOaJgOacieaAqueJqeeahOmihOWItuS9k1xyXG4gICAgICAgIGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCB0aGlzLnBvcy5jaGlsZHJlbi5sZW5ndGg7IGluZGV4KyspIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMucG9zLmNoaWxkcmVuW2luZGV4XS5jaGlsZHJlbi5sZW5ndGg+MCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5wb3MuY2hpbGRyZW5baW5kZXhdLmNoaWxkcmVuWzBdLmRlc3Ryb3koKVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgY2xpY2tCdG5Nb25zdGVyKCl7Ly/mgKrnianor6bmg4VcclxuICAgICAgICB0aGlzLk1vbnN0ZXIuZ2V0Q29tcG9uZW50KE1vbnN0ZXJEZXRhaWxzKS5Nb25zdGVyRGV0YWlsc2Fycj10aGlzLk1vbnN0ZXJEZXRhaWxzYXJyXHJcbiAgICAgICAgdGhpcy5Nb25zdGVyLmFjdGl2ZT10cnVlXHJcbiAgICB9XHJcbiAgICBjbGlja0J0bkNoYXJpb3QoKXsvL+aImOi9puivpuaDhVxyXG4gICAgICAgIHRoaXMuQ2hhcmlvdC5hY3RpdmU9dHJ1ZVxyXG4gICAgfVxyXG4gICAgLy8gc2V0TGV2ZWxEYXRhKClcclxuICAgIC8vIHtcclxuICAgIC8vICAgICBMZXZlbE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zdGFydF9sZXZlbD1MZXZlbE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5maW5pc2hfbGV2ZWwgKyAxO1xyXG4gICAgLy8gICAgIGxldCBnbT1HYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpO1xyXG4gICAgLy8gICAgIGdtLmZpZ2h0aW5nX2luZm89TWlzc2lvbkxldmVsTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldEZpZ2h0aW5nSW5mbyhMZXZlbE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zdGFydF9sZXZlbCk7XHJcbiAgICAvLyB9XHJcblxyXG4gICAgY2xpY2tCdG5DbG9zZSgpXHJcbiAgICB7XHJcbiAgICAgICAgY2MuZmluZCgnQ2FudmFzL21haW5fdWknKS5nZXRDb21wb25lbnQoTWFpblVpKS5yZWZyZXNoTWFpblRhc2tVaSgpO1xyXG4gICAgICAgIEdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuc291bmRfbWFuYWdlci5wbGF5U291bmQoU291bmRJbmRleC5jbGljayk7XHJcbiAgICAgICAgdGhpcy5kZXMoKVxyXG4gICAgICAgIHRoaXMuZGVzdHJveVNlbGYoKTtcclxuICAgICAgICBpZihHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLmN1cl9nYW1lX21vZGU9PUdhbWVNb2RlLkVuZGxlc3Mpe1xyXG4gICAgICAgICAgICBVSU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zaG93VWlEaWFsb2coVUlQYXRoLlZuZGxlc3NDaGFsbGVuZ2VzLFVJTGF5ZXJMZXZlbC5PbmUse29uQ29tcGxldGVkOih1aU5vZGUpPT4ge1xyXG4gICAgICAgICAgICAgICAgdWlOb2RlLmdldENvbXBvbmVudChlbmRsZXNzY2hhbGxlbmdlcykuaW5pdCh7XHJcbiAgICAgICAgICAgICAgICAgICAgb25DbG9zZTooKT0+e1xyXG5cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgdWlOb2RlLmdldENvbXBvbmVudChlbmRsZXNzY2hhbGxlbmdlcykuaW5pdFVpKDIpLy8yOuaXoOWwveaMkeaImCAgIDPvvJpib3Nz5oyR5oiYXHJcbiAgICAgICAgICAgIH0sfSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYoR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5jdXJfZ2FtZV9tb2RlPT1HYW1lTW9kZS5Cb3NzX0NoYWxsZW5nZSl7XHJcbiAgICAgICAgICAgIFVJTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNob3dVaURpYWxvZyhVSVBhdGguVm5kbGVzc0NoYWxsZW5nZXMsVUlMYXllckxldmVsLk9uZSx7b25Db21wbGV0ZWQ6KHVpTm9kZSk9PiB7XHJcbiAgICAgICAgICAgICAgICB1aU5vZGUuZ2V0Q29tcG9uZW50KGVuZGxlc3NjaGFsbGVuZ2VzKS5pbml0KHtcclxuICAgICAgICAgICAgICAgICAgICBvbkNsb3NlOigpPT57XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICB1aU5vZGUuZ2V0Q29tcG9uZW50KGVuZGxlc3NjaGFsbGVuZ2VzKS5pbml0VWkoMykvLzI65peg5bC95oyR5oiYICAgM++8mmJvc3PmjJHmiJhcclxuICAgICAgICAgICAgfSx9KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgZGVzdHJveVNlbGYoKVxyXG4gICAge1xyXG4gICAgICAgIHN1cGVyLm9uQ2xvc2UoKTtcclxuICAgICAgICBBcGtNYW5hZ2VyLmdldEluc3RhbmNlKCkuY2xvc2VCYW5uZXIoKTtcclxuICAgICAgICAvLyBFdmVudE1hbmFnZXIucG9zdFJlZEV2ZW50KFJlZEV2ZW50U3RyaW5nLlJFRF9DSEVDSyxSZWRFdmVudFR5cGUuQnRuX01haW5fU2lnbkluKTtcclxuICAgIH1cclxuXHJcbn1cclxuIl19