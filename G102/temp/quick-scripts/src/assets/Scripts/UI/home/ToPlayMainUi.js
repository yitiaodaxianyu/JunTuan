"use strict";
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