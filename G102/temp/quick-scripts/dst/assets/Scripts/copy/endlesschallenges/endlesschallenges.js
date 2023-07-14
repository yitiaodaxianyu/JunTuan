
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Scripts/copy/endlesschallenges/endlesschallenges.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '687a9ikqIlOgIAtNmtKYksa', 'endlesschallenges');
// Scripts/copy/endlesschallenges/endlesschallenges.ts

"use strict";
// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html
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
var HttpManager_1 = require("../.././NetWork/HttpManager");
var BossChallenge_1 = require("../../Activity/BossChallenge");
var EndlessLevels_1 = require("../../Activity/EndlessLevels");
var Constants_1 = require("../../Constants");
var GameManager_1 = require("../../GameManager");
var MonsterConfigure_1 = require("../../Monster/Data/MonsterConfigure");
var MonsterSkill_1 = require("../../Monster/Data/MonsterSkill");
var MonsterData_1 = require("../../Monster/MonsterData");
var FollowConstants_1 = require("../../multiLanguage/FollowConstants");
var FollowManager_1 = require("../../multiLanguage/FollowManager");
var LanguageManager_1 = require("../../multiLanguage/LanguageManager");
var TextLanguage_1 = require("../../multiLanguage/TextLanguage");
var PropManager_1 = require("../../Prop/PropManager");
var RankingList_1 = require("../../RankingList/RankingList");
var AudioConstants_1 = require("../../Sound/AudioConstants");
var StorageConfig_1 = require("../../Storage/StorageConfig");
var StorageManager_1 = require("../../Storage/StorageManager");
var ToPlayMainUi_1 = require("../../UI/home/ToPlayMainUi");
var UIComponent_1 = require("../../UI/UIComponent");
var UIConfig_1 = require("../../UI/UIConfig");
var UIManager_1 = require("../../UI/UIManager");
var UserData_1 = require("../../UserData");
var UserInfo_1 = require("../../UserInfo/UserInfo");
var MoppingVoid_1 = require("../voidcrack/MoppingVoid");
var VoidScene_1 = require("../voidcrack/VoidScene");
var BossWeeklyReward_1 = require("./BossWeeklyReward");
var MoppingUp_1 = require("./MoppingUp");
var playinstructions_1 = require("./playinstructions");
var purchasesnumbe_1 = require("./purchasesnumbe");
var rewarddisplay_1 = require("./rewarddisplay");
var RogueGiftInformation_1 = require("./RogueGiftInformation");
var Shop_1 = require("./Shop");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var endlesschallenges = /** @class */ (function (_super) {
    __extends(endlesschallenges, _super);
    function endlesschallenges() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.boss = null; //boss专属的技能与名字  boss挑战
        _this.BossRush_Btn_Rank = null; //排行榜按钮
        _this.BossRush_Btn_Bonus = null; //奖励按钮
        _this.Maze_Btn_Shop = null; //商店按钮
        _this.BossRush_Btn_Record = null; //战斗记录按钮  boss挑战
        _this.xvkon = null; //虚空裂缝的东西
        _this.BossRush_Tips = null; //提示按钮
        _this.heroShadow = null; //怪物阴影
        _this.pos = null; //怪物位置
        _this.bt = null; //标题
        _this.Common_Btn_Back = null; //返回按钮  
        _this.btnno = null; //扫荡按钮  
        _this.btnyes = null; //开始挑战按钮  
        _this.RankingSelf = null; //自己的头像  排名 
        _this.one = null; //如果排名第一就显示这个文字
        _this.Promotion = null; //如果不是第一就显示这个文字   达到多少波-伤害可晋升至多少名
        _this.Waves = null; //无尽挑战   本次挑战将从多少波开始
        _this.num = null; //挑战次数
        _this.jineng = null; //boss的技能图标
        _this.bossname = null; //boss的名字
        _this.type = 0; //2:无尽挑战   3：boss挑战
        _this.copy_ui = null; //Boss技能图标    buff图标
        _this.text = [100126, 100128, 100129]; //战力:~波数:~伤害:~
        _this.bjspr = []; //boss挑战背景
        _this.bjsprwujin = null; //无尽挑战背景
        _this.bjsprxvkon = null; //虚空裂缝背景
        _this.bbg = null; //地图背景
        _this.bossspriteid = 0; //boss技能id
        _this.SkillDescription = null; //技能描述
        _this.bt1 = null; //最高排名    本周排名    第几章
        _this.BossRush_Time_Bg = null; //每周刷新框
        _this.time = null; //每周刷新文字
        _this.content = null; //虚空裂缝奖励的父节点   
        _this.PageView = null; //章节滑动节点
        return _this;
        // start () {
        // }
        // update (dt) {}
    }
    // @property(cc.Label)
    // label: cc.Label = null;
    // @property
    // text: string = 'hello';
    // LIFE-CYCLE CALLBACKS:
    // onLoad () {}
    endlesschallenges.prototype.initUi = function (type) {
        // GameManager.getInstance().music_manager.playMusic(MusicIndex.BGM_TJP);
        // FollowManager.getInstance().followEvent(Follow_Type.铁匠铺打开次数);
        this.type = type;
        this.des();
        this.Refresh(); //刷新
    };
    endlesschallenges.prototype.numberRefresh = function () {
        var num;
        var totalnum;
        var damage;
        if (this.type == 2) {
            totalnum = StorageManager_1.TheStorageManager.getInstance().getNumber(StorageConfig_1.StorageKey.TotalUnlimitedChallengeTimes, 0);
            num = StorageManager_1.TheStorageManager.getInstance().getNumber(StorageConfig_1.StorageKey.UnlimitedChallengeTimes, 3);
            damage = EndlessLevels_1.EndlessLevelsManager.getInstance().getMaxWave(); //TheStorageManager.getInstance().getNumber(StorageKey.UnlimitedChallengeDamage,0);
        }
        else if (this.type == 3) {
            totalnum = StorageManager_1.TheStorageManager.getInstance().getNumber(StorageConfig_1.StorageKey.TotalBossChallengeTimes, 0);
            num = StorageManager_1.TheStorageManager.getInstance().getNumber(StorageConfig_1.StorageKey.BossChallengeTimes, 3);
            damage = StorageManager_1.TheStorageManager.getInstance().getNumber(StorageConfig_1.StorageKey.BossChallengeDamage, -1);
        }
        else if (this.type == 4) {
            num = StorageManager_1.TheStorageManager.getInstance().getNumber(StorageConfig_1.StorageKey.VoidCrackChallengeTimes, 3);
        }
        if (this.type != 4) {
            if (totalnum >= 1 && num > 0 && damage > -1) {
                this.btnno.active = true;
            }
            else {
                this.btnno.active = false;
            }
        }
        else {
            var index = this.PageView.getComponent(cc.PageView).getCurrentPageIndex();
            var damage_1 = StorageManager_1.TheStorageManager.getInstance().getNumber(StorageConfig_1.StorageKey.VoidCrackChallengeDamage, 0);
            var num_1 = StorageManager_1.TheStorageManager.getInstance().getNumber(StorageConfig_1.StorageKey.VoidCrackChallengeTimes, 3);
            if ((damage_1 + 1) >= index) {
                if (index == (damage_1 + 1)) {
                    this.btnno.active = false;
                    this.btnyes.active = true;
                }
                else {
                    if (num_1 > 0) {
                        this.btnno.active = true;
                    }
                    else {
                        this.btnno.active = false;
                    }
                    this.btnyes.active = true;
                }
            }
            else {
                this.btnno.active = false;
                this.btnyes.active = false;
            }
        }
        var red = this.btnyes.getChildByName('red');
        var txt = LanguageManager_1.default.getInstance().getStrByTextId(820009);
        console.log("++++++++++", txt);
        txt = txt.replace('~', "" + num);
        if (num == 0) {
            // this.num.color=new cc.Color(255,71,70)
            txt = txt.replace('@', "#FF4746");
            red.active = false;
        }
        else {
            // this.num.color=new cc.Color(255,255,255)
            txt = txt.replace('@', "#FFFFFF");
            red.active = true;
        }
        this.num.getComponent(cc.RichText).string = "" + txt;
        // this.num.getComponent(cc.Label).string=""+num
    };
    endlesschallenges.prototype.Refresh = function () {
        var _this = this;
        var EliteMonster = [];
        this.SkillDescription.active = false;
        this.SkillDescription.getChildByName("Common_TextBG").active = false;
        this.numberRefresh();
        this.BossRush_Btn_Record.active = false;
        this.xvkon.active = false;
        this.Waves.active = true;
        this.Promotion.active = true;
        this.one.active = true;
        this.RankingSelf.active = true;
        this.BossRush_Btn_Rank.active = true;
        this.BossRush_Btn_Bonus.active = true;
        this.Maze_Btn_Shop.active = false;
        if (this.type == 2) {
            FollowManager_1.default.getInstance().followEvent(FollowConstants_1.Follow_Type.无尽挑战页面展示次数);
            this.bbg.getComponent(cc.Sprite).spriteFrame = this.bjsprwujin;
            this.boss.active = false;
            var wavenumber = EndlessLevels_1.EndlessLevelsManager.getInstance().getMaxWave() - 31; //波数
            if (wavenumber < 1) {
                wavenumber = 0;
            }
            this.bbg.y = 0;
            var Round = EndlessLevels_1.EndlessLevelsManager.getInstance().getRound(wavenumber); //回合数
            wavenumber = EndlessLevels_1.EndlessLevelsManager.getInstance().getWave(Round);
            StorageManager_1.TheStorageManager.getInstance().setItem(StorageConfig_1.StorageKey.UnlimitedChallengeDamage, wavenumber);
            EliteMonster = EndlessLevels_1.EndlessLevelsManager.getInstance().getEliteMonster(Round).concat(EndlessLevels_1.EndlessLevelsManager.getInstance().getNormalMonster(Round)); //怪物id
            this.Waves.active = true; //本次挑战从多少波开始
            var txt = LanguageManager_1.default.getInstance().getStrByTextId(800005);
            txt = txt.replace('~', "" + (wavenumber + 1));
            this.Waves.getComponent(cc.RichText).string = txt;
            this.bt.getComponent(TextLanguage_1.default).setTextId(800001);
            this.bt1.getComponent(TextLanguage_1.default).setTextId(800003);
            this.BossRush_Time_Bg.active = false;
            this.BossRush_Btn_Bonus.active = true;
            this.time.active = false;
            this.btnyes.active = true;
        }
        else if (this.type == 3) {
            this.btnyes.active = true;
            FollowManager_1.default.getInstance().followEvent(FollowConstants_1.Follow_Type.BOSS挑战页面展示次数);
            this.boss.active = true;
            // this.BossRush_Btn_Record.active = true
            var RotationOrder = UserInfo_1.UserInfo.getInstance().RotationOrder; //轮换顺序
            var Stage = 1; //阶段
            this.Waves.active = false;
            var ChallengeID = RotationOrder * 1000 + Stage; //挑战ID
            this.bbg.getComponent(cc.Sprite).spriteFrame = this.bjspr[BossChallenge_1.BossChallengeManager.getInstance().getChapterScene(ChallengeID)]; //换背景
            EliteMonster = EliteMonster.concat(BossChallenge_1.BossChallengeManager.getInstance().getMonsterId(ChallengeID)); //怪物id
            this.bbg.y = 0;
            var SkillNum = MonsterConfigure_1.MonsterConfigureManager.getInstance().getSkillNum(EliteMonster[0]);
            for (var index = 0; index < this.jineng.children.length; index++) {
                if (index < SkillNum) {
                    this.jineng.children[index].active = true;
                    var spriteid = (EliteMonster[0] * 1000) + ((index + 1) * 100) + 1;
                    this.bossspriteid = EliteMonster[0];
                    this.jineng.children[index].getComponent(cc.Sprite).spriteFrame = this.copy_ui.getSpriteFrame("MonsterSkill_" + spriteid);
                }
                else {
                    this.jineng.children[index].active = false;
                }
            }
            this.bt.getComponent(TextLanguage_1.default).setTextId(820001);
            this.bt1.getComponent(TextLanguage_1.default).setTextId(820005);
            this.BossRush_Time_Bg.active = true;
            this.time.active = true;
            this.BossRush_Btn_Bonus.active = true;
            var Rank_1 = UserInfo_1.UserInfo.getInstance().damageNumberLast; //是否上排行榜名次  得到后台数据
            // console.log("====",Rank)
            // let uid = UserData.getInstance().getUserID();
            // console.log("====----",uid)
            var RewardGrade_1 = -1; //排名  默认-1  
            if (Rank_1 > -1) {
                // Rank=-1//修改后台数据为0
                var uid = UserData_1.default.getInstance().getUserID();
                // console.log("====----",uid)
                var json = {
                    uid: uid,
                    damageNumberLast: -1,
                };
                UserInfo_1.UserInfo.getInstance().damageNumberLast = -1;
                HttpManager_1.HttpManager.post(HttpManager_1.AccessName.updateUserInfoDNL, JSON.stringify(json)).then(function (data) {
                    if (Rank_1 == 0) {
                        RewardGrade_1 = 7;
                    }
                    else if (Rank_1 == 1) {
                        RewardGrade_1 = 1;
                    }
                    else if (Rank_1 == 2) {
                        RewardGrade_1 = 2;
                    }
                    else if (Rank_1 == 3) {
                        RewardGrade_1 = 3;
                    }
                    else if (Rank_1 <= 10 && Rank_1 >= 4) {
                        RewardGrade_1 = 4;
                    }
                    else if (Rank_1 <= 50 && Rank_1 >= 11) {
                        RewardGrade_1 = 5;
                    }
                    else if (Rank_1 <= 100 && Rank_1 >= 51) {
                        RewardGrade_1 = 6;
                    }
                    var rewardData = BossWeeklyReward_1.BossWeeklyRewardManager.getInstance().getFirstRewardArr(RewardGrade_1);
                    var itemarr = [];
                    for (var index = 0; index < rewardData.length; index++) {
                        var items = PropManager_1.PropManager.getInstance().createPropItem(rewardData[index].reward_id, rewardData[index].reward_num);
                        itemarr.push(items);
                    }
                    GameManager_1.default.getInstance().showMultipleGetTip(itemarr);
                    // if(data.uid){
                    // }
                }).catch(function (error) {
                    cc.error(error);
                });
                // HttpManager.post(AccessName.updateUserInfoDNL,this.setRankJsonString());
            }
        }
        else if (this.type == 4) {
            this.boss.active = false;
            this.xvkon.active = true;
            this.Waves.active = false;
            this.Promotion.active = false;
            this.one.active = false;
            this.RankingSelf.active = false;
            this.BossRush_Btn_Rank.active = false;
            this.BossRush_Btn_Bonus.active = false;
            this.Maze_Btn_Shop.active = true;
            this.BossRush_Time_Bg.active = false;
            this.time.active = false;
            this.bbg.y = 280;
            this.bbg.getComponent(cc.Sprite).spriteFrame = this.bjsprxvkon;
            this.bt.getComponent(TextLanguage_1.default).setTextId(830001);
            this.bt1.getComponent(TextLanguage_1.default).setTextId(820005);
            for (var contentindex = 0; contentindex < this.content.children.length; contentindex++) {
                var mycontentindex = contentindex;
                if (mycontentindex == 0) {
                    mycontentindex = 8;
                }
                if (mycontentindex == 9) {
                    mycontentindex = 1;
                }
                var id = RogueGiftInformation_1.RogueGiftInformationManager.getInstance().getPropID_1((mycontentindex));
                var item = PropManager_1.PropManager.getInstance().createPropItem(id, 0);
                item.parent = this.content.children[contentindex].children[0];
                var id1 = RogueGiftInformation_1.RogueGiftInformationManager.getInstance().getPropID_2((mycontentindex));
                var item1 = PropManager_1.PropManager.getInstance().createPropItem(id1, 0);
                item1.parent = this.content.children[contentindex].children[1];
                var id2 = RogueGiftInformation_1.RogueGiftInformationManager.getInstance().getPropID_3((mycontentindex));
                var item2 = PropManager_1.PropManager.getInstance().createPropItem(id2, 0);
                item2.parent = this.content.children[contentindex].children[2];
            }
            for (var index_1 = 0; index_1 < this.pos.children.length; index_1++) {
                this.heroShadow.children[index_1].active = false;
                this.pos.children[index_1].active = false;
            }
            var index = this.PageView.getComponent(cc.PageView).getCurrentPageIndex();
            if (index == 1) {
                this.bt1.getComponent(TextLanguage_1.default).setTextId(100053);
                this.bt1.getComponent(TextLanguage_1.default).setReplaceValue('~', (index) + '');
                var damage = StorageManager_1.TheStorageManager.getInstance().getNumber(StorageConfig_1.StorageKey.VoidCrackChallengeDamage, 0);
                var num = StorageManager_1.TheStorageManager.getInstance().getNumber(StorageConfig_1.StorageKey.VoidCrackChallengeTimes, 3);
                if ((damage + 1) >= index) {
                    if (index == (damage + 1)) {
                        this.btnno.active = false;
                        this.btnyes.active = true;
                    }
                    else {
                        if (num > 0) {
                            this.btnno.active = true;
                        }
                        else {
                            this.btnno.active = false;
                        }
                        this.btnyes.active = true;
                    }
                }
                else {
                    this.btnno.active = false;
                    this.btnyes.active = false;
                }
            }
            else {
                this.content.x = -825;
                this.PageView.getComponent(cc.PageView).scrollToPage(1, 0.01);
            }
            return;
        }
        var _loop_1 = function (index) {
            this_1.heroShadow.children[index].active = false;
            this_1.pos.children[index].active = false;
            if (index < EliteMonster.length) {
                var elitetype = MonsterConfigure_1.MonsterConfigureManager.getInstance().getMonsterClass(EliteMonster[index]);
                var path = "monster/ui/Monster_" + elitetype;
                var node_1 = null;
                cc.resources.load(path, cc.Prefab, function (error, assets) {
                    if (error) {
                        cc.log(error);
                        return;
                    }
                    node_1 = cc.instantiate(assets);
                    node_1.setPosition(0, 0, 0);
                    var id = EliteMonster[index];
                    node_1.scale = MonsterConfigure_1.MonsterConfigureManager.getInstance().getScale(id);
                    var StrengthType = MonsterConfigure_1.MonsterConfigureManager.getInstance().getStrengthType(id);
                    node_1.parent = _this.pos.children[index];
                    _this.heroShadow.children[index].active = true;
                    if (StrengthType == 3) {
                        _this.heroShadow.children[index].setScale(1.3, 1.3);
                        node_1.scale = MonsterConfigure_1.MonsterConfigureManager.getInstance().getScale(id) * 1;
                        node_1.getComponent(sp.Skeleton).setAnimation(0, MonsterData_1.MonsterActionName.Idle, true);
                    }
                    if (StrengthType == 2) {
                        _this.heroShadow.children[index].setScale(0.7, 0.7);
                        node_1.scale = MonsterConfigure_1.MonsterConfigureManager.getInstance().getScale(id) * 1;
                        node_1.getComponent(sp.Skeleton).setSkin(MonsterData_1.MonsterFaceName.SideR + MonsterConfigure_1.MonsterConfigureManager.getInstance().getSkin(id));
                        node_1.getComponent(sp.Skeleton).setAnimation(0, MonsterData_1.MonsterFaceName.SideR + "_" + MonsterData_1.MonsterActionName.Idle, true);
                    }
                    if (StrengthType == 1) {
                        _this.heroShadow.children[index].setScale(0.4, 0.4);
                        node_1.scale = MonsterConfigure_1.MonsterConfigureManager.getInstance().getScale(id) * 1;
                        node_1.getComponent(sp.Skeleton).setSkin(MonsterData_1.MonsterFaceName.SideR + MonsterConfigure_1.MonsterConfigureManager.getInstance().getSkin(id));
                        node_1.getComponent(sp.Skeleton).setAnimation(0, MonsterData_1.MonsterFaceName.SideR + "_" + MonsterData_1.MonsterActionName.Idle, true);
                    }
                });
                this_1.pos.children[index].active = true;
            }
        };
        var this_1 = this;
        //生成怪物
        for (var index = 0; index < this.pos.children.length; index++) {
            _loop_1(index);
        }
        //玩家排名
        var selfranking = -1;
        var combatPower = 0;
        if (this.type == 2) {
            combatPower = EndlessLevels_1.EndlessLevelsManager.getInstance().getMaxWave(); //HeroManager.getInstance().getAllHeroZhanli()//获取波数
        }
        if (this.type == 3) {
            combatPower = BossChallenge_1.BossChallengeManager.getInstance().getMaxDamageNumber(); //获取伤害
        }
        var CombatPower = this.RankingSelf.getChildByName("CombatPower");
        var SerialNo = this.RankingSelf.getChildByName("SerialNo");
        var name = this.RankingSelf.getChildByName("name");
        var btnAvatar = this.RankingSelf.getChildByName("headPortrait").getChildByName("btnAvatar");
        CombatPower.getComponent(TextLanguage_1.default).setTextId(this.text[this.type - 1]); //是哪个排行榜
        CombatPower.getComponent(TextLanguage_1.default).setReplaceValue('~', (combatPower) + ''); //排行榜战力数据
        this.Promotion.active = false;
        this.one.active = false;
        SerialNo.active = false;
        this.RankingSelf.getChildByName("Notlisted").active = false;
        this.RankingSelf.getComponent(cc.Sprite).spriteFrame = this.copy_ui.getSpriteFrame("BossRush_Rank_4");
        HttpManager_1.HttpManager.post(HttpManager_1.AccessName.leaderboardByUser, this.getLeaderboardByUserJsonString(this.type), true).then(function (data) {
            var max = data.length;
            for (var index = 0; index < max; index++) {
                if (data[index].uid == UserData_1.default.getInstance().getUserID()) { //如果在后台拉取的排名中有id跟玩家的id一样，那么玩家的排名在前100名中  将显示玩家排名   否则显示未上榜
                    selfranking = (index + 1);
                }
            }
            if (selfranking == 1) {
                _this.one.active = true;
            }
            else {
                var txt = LanguageManager_1.default.getInstance().getStrByTextId(800004);
                if (_this.type == 2) {
                    txt = LanguageManager_1.default.getInstance().getStrByTextId(800004); //达到多少波，可晋升至多少名   
                }
                else if (_this.type == 3) {
                    txt = LanguageManager_1.default.getInstance().getStrByTextId(820007); //达到多少伤害，可晋升至多少名
                }
                if (data.length > 0) {
                    if (selfranking == -1) {
                        txt = txt.replace('~x', "" + data[max - 1].value);
                        txt = txt.replace('~y', "" + max);
                    }
                    else {
                        txt = txt.replace('~x', "" + data[selfranking - 2].value);
                        txt = txt.replace('~y', "" + (selfranking - 1));
                    }
                    _this.Promotion.getComponent(cc.RichText).string = txt; //达到多少波，可晋升至多少名   
                    _this.Promotion.active = true;
                }
            }
            if (selfranking <= 3 && selfranking >= 1) {
                SerialNo.active = false;
                _this.RankingSelf.getComponent(cc.Sprite).spriteFrame = _this.copy_ui.getSpriteFrame("BossRush_Rank_" + selfranking); //前三名的背景不一样
            }
            else {
                if (selfranking >= 1) {
                    SerialNo.active = true;
                }
                _this.RankingSelf.getComponent(cc.Sprite).spriteFrame = _this.copy_ui.getSpriteFrame("BossRush_Rank_4");
            }
            if (selfranking == -1) {
                _this.RankingSelf.getChildByName("Notlisted").active = true;
            }
            else {
                SerialNo.getComponent(cc.Label).string = "" + (selfranking); //序号
                _this.RankingSelf.getChildByName("Notlisted").active = false;
            }
        });
        var myname = UserData_1.default.getInstance().getUserName(); //玩家名字
        var sphea = UserData_1.default.getInstance().getUserAvatar(); //玩家头像
        name.getComponent(cc.Label).string = "" + myname; //玩家名字
        btnAvatar.getComponent(cc.Sprite).spriteFrame = PropManager_1.PropManager.getInstance().getSpheadPortraitType(sphea); //头像id
    };
    endlesschallenges.prototype.des = function () {
        if (this.type == 4) { //清除虚空裂缝的章节奖励
            for (var contentindex = 0; contentindex < this.content.children.length; contentindex++) {
                for (var index = 0; index < 3; index++) {
                    if (this.content.children[contentindex].children[index].childrenCount > 0) {
                        this.content.children[contentindex].children[index].destroyAllChildren();
                    }
                }
            }
        }
        else {
            for (var index = 0; index < this.pos.children.length; index++) {
                if (this.pos.children[index].children.length > 0) {
                    this.pos.children[index].destroyAllChildren();
                }
            }
        }
    };
    endlesschallenges.prototype.clickBtnMaze_Change = function (even, i) {
        var index = this.PageView.getComponent(cc.PageView).getCurrentPageIndex();
        if (i == 0) {
            index--;
        }
        if (i == 1) {
            index++;
        }
        this.PageView.getComponent(cc.PageView).scrollToPage(index, 0.3);
    };
    // 注意参数的顺序和类型是固定的
    endlesschallenges.prototype.PageViewcallback = function () {
        var index = this.PageView.getComponent(cc.PageView).getCurrentPageIndex();
        if (index == 0) {
            this.content.x = -4675;
            this.PageView.getComponent(cc.PageView).scrollToPage(8, 0.01);
        }
        if (index == 9) {
            this.content.x = -825;
            this.PageView.getComponent(cc.PageView).scrollToPage(1, 0.01);
        }
        index = this.PageView.getComponent(cc.PageView).getCurrentPageIndex();
        this.bt1.getComponent(TextLanguage_1.default).setTextId(100053);
        this.bt1.getComponent(TextLanguage_1.default).setReplaceValue('~', (index) + '');
        var damage = StorageManager_1.TheStorageManager.getInstance().getNumber(StorageConfig_1.StorageKey.VoidCrackChallengeDamage, 0);
        var num = StorageManager_1.TheStorageManager.getInstance().getNumber(StorageConfig_1.StorageKey.VoidCrackChallengeTimes, 3);
        if ((damage + 1) >= index) {
            if (index == (damage + 1)) {
                this.btnno.active = false;
                this.btnyes.active = true;
            }
            else {
                if (num > 0) {
                    this.btnno.active = true;
                }
                else {
                    this.btnno.active = false;
                }
                this.btnyes.active = true;
            }
        }
        else {
            this.btnno.active = false;
            this.btnyes.active = false;
        }
    };
    endlesschallenges.prototype.clickBtnClose = function () {
        this.des();
        GameManager_1.default.getInstance().sound_manager.playSound(AudioConstants_1.SoundIndex.click);
        this.onClose();
    };
    endlesschallenges.prototype.clickBtnPlayinstructions = function () {
        var _this = this;
        UIManager_1.UIManager.getInstance().showUiDialog(UIConfig_1.UIPath.PlayinsTructions, UIConfig_1.UILayerLevel.Two, { onCompleted: function (uiNode) {
                uiNode.getComponent(playinstructions_1.default).init({
                    onClose: function () {
                    }
                });
                uiNode.getComponent(playinstructions_1.default).initUi(_this.type); //2:无尽挑战   3：boss挑战
            }, });
    };
    endlesschallenges.prototype.clickBtnRewardDisplay = function () {
        var _this = this;
        UIManager_1.UIManager.getInstance().showUiDialog(UIConfig_1.UIPath.RewardDisplay, UIConfig_1.UILayerLevel.Two, { onCompleted: function (uiNode) {
                uiNode.getComponent(rewarddisplay_1.default).init({
                    onClose: function () {
                    }
                });
                uiNode.getComponent(rewarddisplay_1.default).initUi(_this.type); //2:无尽挑战   3：boss挑战
            }, });
    };
    endlesschallenges.prototype.clickBtnRankingList = function () {
        var _this = this;
        if (this.type == 2) {
            FollowManager_1.default.getInstance().followEvent(FollowConstants_1.Follow_Type.无尽挑战_排行榜点击次数);
        }
        if (this.type == 3) {
            FollowManager_1.default.getInstance().followEvent(FollowConstants_1.Follow_Type.BOSS挑战_排行榜点击次数);
        }
        UIManager_1.UIManager.getInstance().showUiDialog(UIConfig_1.UIPath.RankingList, UIConfig_1.UILayerLevel.Two, { onCompleted: function (uiNode) {
                uiNode.getComponent(RankingList_1.default).initUi(_this.type);
            }, }); //排行榜
    };
    endlesschallenges.prototype.clickBtnSkillDescription = function (e, i) {
        this.SkillDescription.x = 0;
        if (e.currentTarget.x < 0) {
            this.SkillDescription.x = (e.currentTarget.x + 173);
        }
        if (e.currentTarget.x > 0) {
            this.SkillDescription.x = (e.currentTarget.x - 173);
        }
        this.SkillDescription.active = true;
        var spriteid = (this.bossspriteid * 1000) + (i * 100) + 1;
        this.SkillDescription.getChildByName("bt").getComponent(TextLanguage_1.default).setTextId(MonsterSkill_1.MonsterSkillManager.getInstance().getSkillIntro(spriteid));
        this.scheduleOnce(function () {
            this.SkillDescription.getChildByName("Common_TextBG").height = (this.SkillDescription.getChildByName("bt").height + 50);
            this.SkillDescription.getChildByName("Common_TextBG").active = true;
        }, 0.0001);
    };
    endlesschallenges.prototype.clickBtnStartChallenge = function () {
        var _this = this;
        var num;
        var buynum;
        var totalnum;
        if (this.type == 2) {
            // totalnum=TheStorageManager.getInstance().getNumber(StorageKey.TotalUnlimitedChallengeTimes,0);
            num = StorageManager_1.TheStorageManager.getInstance().getNumber(StorageConfig_1.StorageKey.UnlimitedChallengeTimes, 3);
            buynum = StorageManager_1.TheStorageManager.getInstance().getNumber(StorageConfig_1.StorageKey.BuyUnlimitedChallengeTimes, 3);
        }
        else if (this.type == 3) {
            // totalnum=TheStorageManager.getInstance().getNumber(StorageKey.TotalBossChallengeTimes,0);
            num = StorageManager_1.TheStorageManager.getInstance().getNumber(StorageConfig_1.StorageKey.BossChallengeTimes, 3);
            buynum = StorageManager_1.TheStorageManager.getInstance().getNumber(StorageConfig_1.StorageKey.BuyBossChallengeTimes, 3);
        }
        else if (this.type == 4) {
            // totalnum=TheStorageManager.getInstance().getNumber(StorageKey.TotalVoidCrackChallengeTimes,0);
            num = StorageManager_1.TheStorageManager.getInstance().getNumber(StorageConfig_1.StorageKey.VoidCrackChallengeTimes, 3);
            buynum = StorageManager_1.TheStorageManager.getInstance().getNumber(StorageConfig_1.StorageKey.BuyVoidCrackChallengeTimes, 3);
        }
        if (num > 0) {
            //开始游戏
            this.clickBtnClose();
            if (this.type == 2) {
                GameManager_1.default.getInstance().cur_game_mode = Constants_1.GameMode.Endless;
                UIManager_1.UIManager.getInstance().showUiDialog(UIConfig_1.UIPath.ToPlay, UIConfig_1.UILayerLevel.One, { onCompleted: function (uiNode) {
                        uiNode.getComponent(ToPlayMainUi_1.default).init({ onClose: function () {
                            } });
                    }, });
            }
            else if (this.type == 3) {
                GameManager_1.default.getInstance().cur_game_mode = Constants_1.GameMode.Boss_Challenge;
                UIManager_1.UIManager.getInstance().showUiDialog(UIConfig_1.UIPath.ToPlay, UIConfig_1.UILayerLevel.One, { onCompleted: function (uiNode) {
                        uiNode.getComponent(ToPlayMainUi_1.default).init({ onClose: function () {
                            } });
                    }, });
            }
            else if (this.type == 4) {
                // GameManager.getInstance().cur_game_mode=GameMode.Maze;       
                num--;
                StorageManager_1.TheStorageManager.getInstance().setItem(StorageConfig_1.StorageKey.VoidCrackChallengeTimes, num);
                UIManager_1.UIManager.getInstance().showUiDialog(UIConfig_1.UIPath.VoidScene, UIConfig_1.UILayerLevel.One, { onCompleted: function (uiNode) {
                        uiNode.getComponent(VoidScene_1.default).init({ onClose: function () {
                            } });
                        var index = _this.PageView.getComponent(cc.PageView).getCurrentPageIndex();
                        uiNode.getComponent(VoidScene_1.default).initUi(index, 1, 2);
                    }, });
                // UIManager.getInstance().showUiDialog(UIPath.ToPlay,UILayerLevel.One,{onCompleted:(uiNode)=> {
                //     uiNode.getComponent(ToPlayMainUi).init({onClose:()=>{
                //     }});
                // },})
            }
        }
        else {
            if (buynum > 0) {
                this.clickBtnPurchasesNumbe();
            }
            else {
                //提示明日再来
                GameManager_1.default.getInstance().showMessage(LanguageManager_1.default.getInstance().getStrByTextId(100120), 3);
            }
        }
    };
    endlesschallenges.prototype.clickBtnPurchasesNumbe = function () {
        var _this = this;
        UIManager_1.UIManager.getInstance().showUiDialog(UIConfig_1.UIPath.PurchasesNumbe, UIConfig_1.UILayerLevel.Two, { onCompleted: function (uiNode) {
                uiNode.getComponent(purchasesnumbe_1.default).init({
                    onClose: function () {
                        _this.numberRefresh();
                    }
                });
                uiNode.getComponent(purchasesnumbe_1.default).initUi(_this.type);
            }, });
    };
    endlesschallenges.prototype.clickBtnMoppingUp = function () {
        var _this = this;
        if (this.type == 4) {
            UIManager_1.UIManager.getInstance().showUiDialog(UIConfig_1.UIPath.MoppingVoid, UIConfig_1.UILayerLevel.Two, { onCompleted: function (uiNode) {
                    uiNode.getComponent(MoppingVoid_1.default).init({
                        onClose: function () {
                            _this.numberRefresh();
                        }
                    });
                    var index = _this.PageView.getComponent(cc.PageView).getCurrentPageIndex();
                    uiNode.getComponent(MoppingVoid_1.default).initUi(index);
                }, });
        }
        else {
            UIManager_1.UIManager.getInstance().showUiDialog(UIConfig_1.UIPath.MoppingUp, UIConfig_1.UILayerLevel.Two, { onCompleted: function (uiNode) {
                    uiNode.getComponent(MoppingUp_1.default).init({
                        onClose: function () {
                            _this.numberRefresh();
                        }
                    });
                    uiNode.getComponent(MoppingUp_1.default).initUi(_this.type, _this.node);
                }, });
        }
    };
    endlesschallenges.prototype.clickBtnShop = function () {
        UIManager_1.UIManager.getInstance().showUiDialog(UIConfig_1.UIPath.Shop, UIConfig_1.UILayerLevel.Two, { onCompleted: function (uiNode) {
                uiNode.getComponent(Shop_1.default).init({
                    onClose: function () {
                    }
                });
                uiNode.getComponent(Shop_1.default).initUi();
            }, });
    };
    endlesschallenges.prototype.clickBtnCloseSkillDescription = function () {
        this.SkillDescription.getChildByName("Common_TextBG").active = false;
        this.SkillDescription.active = false;
    };
    endlesschallenges.prototype.getLeaderboardByUserJsonString = function (type) {
        var uid = UserData_1.default.getInstance().getUserID();
        return JSON.stringify({
            limit: 100,
            type: type,
        });
    };
    endlesschallenges.prototype.setRankJsonString = function () {
        var uid = UserData_1.default.getInstance().getUserID();
        console.log("======", uid);
        return JSON.stringify({
            uid: uid,
            damageNumberLast: -1,
        });
    };
    __decorate([
        property(cc.Node)
    ], endlesschallenges.prototype, "boss", void 0);
    __decorate([
        property(cc.Node)
    ], endlesschallenges.prototype, "BossRush_Btn_Rank", void 0);
    __decorate([
        property(cc.Node)
    ], endlesschallenges.prototype, "BossRush_Btn_Bonus", void 0);
    __decorate([
        property(cc.Node)
    ], endlesschallenges.prototype, "Maze_Btn_Shop", void 0);
    __decorate([
        property(cc.Node)
    ], endlesschallenges.prototype, "BossRush_Btn_Record", void 0);
    __decorate([
        property(cc.Node)
    ], endlesschallenges.prototype, "xvkon", void 0);
    __decorate([
        property(cc.Node)
    ], endlesschallenges.prototype, "BossRush_Tips", void 0);
    __decorate([
        property(cc.Node)
    ], endlesschallenges.prototype, "heroShadow", void 0);
    __decorate([
        property(cc.Node)
    ], endlesschallenges.prototype, "pos", void 0);
    __decorate([
        property(cc.Node)
    ], endlesschallenges.prototype, "bt", void 0);
    __decorate([
        property(cc.Node)
    ], endlesschallenges.prototype, "Common_Btn_Back", void 0);
    __decorate([
        property(cc.Node)
    ], endlesschallenges.prototype, "btnno", void 0);
    __decorate([
        property(cc.Node)
    ], endlesschallenges.prototype, "btnyes", void 0);
    __decorate([
        property(cc.Node)
    ], endlesschallenges.prototype, "RankingSelf", void 0);
    __decorate([
        property(cc.Node)
    ], endlesschallenges.prototype, "one", void 0);
    __decorate([
        property(cc.Node)
    ], endlesschallenges.prototype, "Promotion", void 0);
    __decorate([
        property(cc.Node)
    ], endlesschallenges.prototype, "Waves", void 0);
    __decorate([
        property(cc.Node)
    ], endlesschallenges.prototype, "num", void 0);
    __decorate([
        property(cc.Node)
    ], endlesschallenges.prototype, "jineng", void 0);
    __decorate([
        property(cc.Node)
    ], endlesschallenges.prototype, "bossname", void 0);
    __decorate([
        property(cc.SpriteAtlas)
    ], endlesschallenges.prototype, "copy_ui", void 0);
    __decorate([
        property(cc.SpriteFrame)
    ], endlesschallenges.prototype, "bjspr", void 0);
    __decorate([
        property(cc.SpriteFrame)
    ], endlesschallenges.prototype, "bjsprwujin", void 0);
    __decorate([
        property(cc.SpriteFrame)
    ], endlesschallenges.prototype, "bjsprxvkon", void 0);
    __decorate([
        property(cc.Node)
    ], endlesschallenges.prototype, "bbg", void 0);
    __decorate([
        property(cc.Node)
    ], endlesschallenges.prototype, "SkillDescription", void 0);
    __decorate([
        property(cc.Node)
    ], endlesschallenges.prototype, "bt1", void 0);
    __decorate([
        property(cc.Node)
    ], endlesschallenges.prototype, "BossRush_Time_Bg", void 0);
    __decorate([
        property(cc.Node)
    ], endlesschallenges.prototype, "time", void 0);
    __decorate([
        property(cc.Node)
    ], endlesschallenges.prototype, "content", void 0);
    __decorate([
        property(cc.Node)
    ], endlesschallenges.prototype, "PageView", void 0);
    endlesschallenges = __decorate([
        ccclass
    ], endlesschallenges);
    return endlesschallenges;
}(UIComponent_1.default));
exports.default = endlesschallenges;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0c1xcY29weVxcZW5kbGVzc2NoYWxsZW5nZXNcXGVuZGxlc3NjaGFsbGVuZ2VzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxvQkFBb0I7QUFDcEIsd0VBQXdFO0FBQ3hFLG1CQUFtQjtBQUNuQixrRkFBa0Y7QUFDbEYsOEJBQThCO0FBQzlCLGtGQUFrRjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBRWxGLDJEQUFzRTtBQUN0RSw4REFBb0U7QUFDcEUsOERBQW9FO0FBQ3BFLDZDQUEyQztBQUMzQyxpREFBNEM7QUFFNUMsd0VBQThFO0FBQzlFLGdFQUFzRTtBQUN0RSx5REFBK0U7QUFDL0UsdUVBQWtFO0FBQ2xFLG1FQUE4RDtBQUM5RCx1RUFBa0U7QUFDbEUsaUVBQTREO0FBQzVELHNEQUFxRDtBQUNyRCw2REFBd0Q7QUFDeEQsNkRBQXdEO0FBQ3hELDZEQUF5RDtBQUN6RCwrREFBaUU7QUFDakUsMkRBQXNEO0FBQ3RELG9EQUErQztBQUMvQyw4Q0FBeUQ7QUFDekQsZ0RBQStDO0FBQy9DLDJDQUFzQztBQUN0QyxvREFBbUQ7QUFDbkQsd0RBQW1EO0FBQ25ELG9EQUErQztBQUMvQyx1REFBNkQ7QUFDN0QseUNBQW9DO0FBQ3BDLHVEQUFrRDtBQUNsRCxtREFBOEM7QUFDOUMsaURBQTRDO0FBQzVDLCtEQUFxRTtBQUNyRSwrQkFBMEI7QUFFcEIsSUFBQSxLQUF3QixFQUFFLENBQUMsVUFBVSxFQUFuQyxPQUFPLGFBQUEsRUFBRSxRQUFRLGNBQWtCLENBQUM7QUFHNUM7SUFBK0MscUNBQVc7SUFBMUQ7UUFBQSxxRUFzckJDO1FBbnJCRyxVQUFJLEdBQVksSUFBSSxDQUFBLENBQUEsc0JBQXNCO1FBRTFDLHVCQUFpQixHQUFZLElBQUksQ0FBQSxDQUFBLE9BQU87UUFFeEMsd0JBQWtCLEdBQVksSUFBSSxDQUFBLENBQUEsTUFBTTtRQUV4QyxtQkFBYSxHQUFZLElBQUksQ0FBQSxDQUFBLE1BQU07UUFHbkMseUJBQW1CLEdBQVksSUFBSSxDQUFBLENBQUEsZ0JBQWdCO1FBR25ELFdBQUssR0FBWSxJQUFJLENBQUEsQ0FBQSxTQUFTO1FBRzlCLG1CQUFhLEdBQVksSUFBSSxDQUFBLENBQUEsTUFBTTtRQUduQyxnQkFBVSxHQUFZLElBQUksQ0FBQSxDQUFBLE1BQU07UUFFaEMsU0FBRyxHQUFZLElBQUksQ0FBQSxDQUFBLE1BQU07UUFHekIsUUFBRSxHQUFZLElBQUksQ0FBQSxDQUFBLElBQUk7UUFHdEIscUJBQWUsR0FBWSxJQUFJLENBQUEsQ0FBQSxRQUFRO1FBR3ZDLFdBQUssR0FBWSxJQUFJLENBQUEsQ0FBQSxRQUFRO1FBRTdCLFlBQU0sR0FBWSxJQUFJLENBQUEsQ0FBQSxVQUFVO1FBR2hDLGlCQUFXLEdBQVksSUFBSSxDQUFBLENBQUEsWUFBWTtRQUV2QyxTQUFHLEdBQVksSUFBSSxDQUFBLENBQUEsZUFBZTtRQUVsQyxlQUFTLEdBQVksSUFBSSxDQUFBLENBQUEsaUNBQWlDO1FBRTFELFdBQUssR0FBWSxJQUFJLENBQUEsQ0FBQSxvQkFBb0I7UUFFekMsU0FBRyxHQUFZLElBQUksQ0FBQSxDQUFBLE1BQU07UUFHekIsWUFBTSxHQUFZLElBQUksQ0FBQSxDQUFBLFdBQVc7UUFHakMsY0FBUSxHQUFZLElBQUksQ0FBQSxDQUFBLFNBQVM7UUFDakMsVUFBSSxHQUFXLENBQUMsQ0FBQSxDQUFBLG1CQUFtQjtRQUduQyxhQUFPLEdBQW1CLElBQUksQ0FBQSxDQUFBLG9CQUFvQjtRQUNsRCxVQUFJLEdBQWEsQ0FBQyxNQUFNLEVBQUUsTUFBTSxFQUFFLE1BQU0sQ0FBQyxDQUFBLENBQUEsY0FBYztRQUd2RCxXQUFLLEdBQXFCLEVBQUUsQ0FBQSxDQUFBLFVBQVU7UUFHdEMsZ0JBQVUsR0FBbUIsSUFBSSxDQUFBLENBQUEsUUFBUTtRQUd6QyxnQkFBVSxHQUFtQixJQUFJLENBQUEsQ0FBQSxRQUFRO1FBRXpDLFNBQUcsR0FBWSxJQUFJLENBQUEsQ0FBQSxNQUFNO1FBRXpCLGtCQUFZLEdBQVEsQ0FBQyxDQUFBLENBQUEsVUFBVTtRQUUvQixzQkFBZ0IsR0FBWSxJQUFJLENBQUEsQ0FBQSxNQUFNO1FBRXRDLFNBQUcsR0FBWSxJQUFJLENBQUEsQ0FBQSxxQkFBcUI7UUFHeEMsc0JBQWdCLEdBQVksSUFBSSxDQUFBLENBQUEsT0FBTztRQUV2QyxVQUFJLEdBQVksSUFBSSxDQUFBLENBQUEsUUFBUTtRQUU1QixhQUFPLEdBQVksSUFBSSxDQUFBLENBQUEsZUFBZTtRQUV0QyxjQUFRLEdBQVksSUFBSSxDQUFBLENBQUEsUUFBUTs7UUErbEJoQyxhQUFhO1FBRWIsSUFBSTtRQUVKLGlCQUFpQjtJQUNyQixDQUFDO0lBbG1CRyxzQkFBc0I7SUFDdEIsMEJBQTBCO0lBRTFCLFlBQVk7SUFDWiwwQkFBMEI7SUFFMUIsd0JBQXdCO0lBRXhCLGVBQWU7SUFDZixrQ0FBTSxHQUFOLFVBQU8sSUFBSTtRQUNQLHlFQUF5RTtRQUN6RSxnRUFBZ0U7UUFDaEUsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUE7UUFDaEIsSUFBSSxDQUFDLEdBQUcsRUFBRSxDQUFBO1FBQ1YsSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFBLENBQUEsSUFBSTtJQUN0QixDQUFDO0lBQ0QseUNBQWEsR0FBYjtRQUNJLElBQUksR0FBRyxDQUFBO1FBQ1AsSUFBSSxRQUFRLENBQUE7UUFDWixJQUFJLE1BQU0sQ0FBQTtRQUNWLElBQUksSUFBSSxDQUFDLElBQUksSUFBSSxDQUFDLEVBQUU7WUFDaEIsUUFBUSxHQUFDLGtDQUFpQixDQUFDLFdBQVcsRUFBRSxDQUFDLFNBQVMsQ0FBQywwQkFBVSxDQUFDLDRCQUE0QixFQUFDLENBQUMsQ0FBQyxDQUFDO1lBQzlGLEdBQUcsR0FBRyxrQ0FBaUIsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxTQUFTLENBQUMsMEJBQVUsQ0FBQyx1QkFBdUIsRUFBQyxDQUFDLENBQUMsQ0FBQztZQUN0RixNQUFNLEdBQUMsb0NBQW9CLENBQUMsV0FBVyxFQUFFLENBQUMsVUFBVSxFQUFFLENBQUEsQ0FBQSxtRkFBbUY7U0FDNUk7YUFBTSxJQUFJLElBQUksQ0FBQyxJQUFJLElBQUksQ0FBQyxFQUFFO1lBQ3ZCLFFBQVEsR0FBQyxrQ0FBaUIsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxTQUFTLENBQUMsMEJBQVUsQ0FBQyx1QkFBdUIsRUFBQyxDQUFDLENBQUMsQ0FBQztZQUN6RixHQUFHLEdBQUcsa0NBQWlCLENBQUMsV0FBVyxFQUFFLENBQUMsU0FBUyxDQUFDLDBCQUFVLENBQUMsa0JBQWtCLEVBQUMsQ0FBQyxDQUFDLENBQUM7WUFDakYsTUFBTSxHQUFDLGtDQUFpQixDQUFDLFdBQVcsRUFBRSxDQUFDLFNBQVMsQ0FBQywwQkFBVSxDQUFDLG1CQUFtQixFQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7U0FDdkY7YUFDSSxJQUFJLElBQUksQ0FBQyxJQUFJLElBQUksQ0FBQyxFQUFFO1lBQ3JCLEdBQUcsR0FBRyxrQ0FBaUIsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxTQUFTLENBQUMsMEJBQVUsQ0FBQyx1QkFBdUIsRUFBQyxDQUFDLENBQUMsQ0FBQztTQUN6RjtRQUNELElBQUcsSUFBSSxDQUFDLElBQUksSUFBRyxDQUFDLEVBQUM7WUFDYixJQUFHLFFBQVEsSUFBRSxDQUFDLElBQUUsR0FBRyxHQUFDLENBQUMsSUFBRSxNQUFNLEdBQUMsQ0FBQyxDQUFDLEVBQUM7Z0JBQzdCLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxHQUFDLElBQUksQ0FBQTthQUN6QjtpQkFBSTtnQkFDRCxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sR0FBQyxLQUFLLENBQUE7YUFDMUI7U0FDSjthQUFJO1lBQ0QsSUFBSSxLQUFLLEdBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxZQUFZLENBQUMsRUFBRSxDQUFDLFFBQVEsQ0FBQyxDQUFDLG1CQUFtQixFQUFFLENBQUE7WUFDdkUsSUFBSSxRQUFNLEdBQUMsa0NBQWlCLENBQUMsV0FBVyxFQUFFLENBQUMsU0FBUyxDQUFDLDBCQUFVLENBQUMsd0JBQXdCLEVBQUMsQ0FBQyxDQUFDLENBQUM7WUFDNUYsSUFBSSxLQUFHLEdBQUcsa0NBQWlCLENBQUMsV0FBVyxFQUFFLENBQUMsU0FBUyxDQUFDLDBCQUFVLENBQUMsdUJBQXVCLEVBQUMsQ0FBQyxDQUFDLENBQUM7WUFDMUYsSUFBRyxDQUFDLFFBQU0sR0FBQyxDQUFDLENBQUMsSUFBRSxLQUFLLEVBQUM7Z0JBQ2pCLElBQUcsS0FBSyxJQUFFLENBQUMsUUFBTSxHQUFDLENBQUMsQ0FBQyxFQUFDO29CQUNqQixJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sR0FBQyxLQUFLLENBQUE7b0JBQ3ZCLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxHQUFDLElBQUksQ0FBQTtpQkFDMUI7cUJBQUk7b0JBQ0QsSUFBRyxLQUFHLEdBQUMsQ0FBQyxFQUFDO3dCQUNMLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxHQUFDLElBQUksQ0FBQTtxQkFDekI7eUJBQUk7d0JBQ0QsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLEdBQUMsS0FBSyxDQUFBO3FCQUMxQjtvQkFDRCxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sR0FBQyxJQUFJLENBQUE7aUJBQzFCO2FBQ0o7aUJBQUk7Z0JBQ0QsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLEdBQUMsS0FBSyxDQUFBO2dCQUN2QixJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sR0FBQyxLQUFLLENBQUE7YUFDM0I7U0FDSjtRQUNELElBQUksR0FBRyxHQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsY0FBYyxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQzFDLElBQUksR0FBRyxHQUFDLHlCQUFlLENBQUMsV0FBVyxFQUFFLENBQUMsY0FBYyxDQUFDLE1BQU0sQ0FBQyxDQUFBO1FBQzVELE9BQU8sQ0FBQyxHQUFHLENBQUMsWUFBWSxFQUFDLEdBQUcsQ0FBQyxDQUFBO1FBQzdCLEdBQUcsR0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLEdBQUcsRUFBQyxFQUFFLEdBQUMsR0FBRyxDQUFDLENBQUE7UUFFM0IsSUFBRyxHQUFHLElBQUUsQ0FBQyxFQUFDO1lBQ04seUNBQXlDO1lBQ3pDLEdBQUcsR0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLEdBQUcsRUFBQyxTQUFTLENBQUMsQ0FBQTtZQUM5QixHQUFHLENBQUMsTUFBTSxHQUFDLEtBQUssQ0FBQztTQUNwQjthQUFJO1lBQ0QsMkNBQTJDO1lBQzNDLEdBQUcsR0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLEdBQUcsRUFBQyxTQUFTLENBQUMsQ0FBQTtZQUM5QixHQUFHLENBQUMsTUFBTSxHQUFDLElBQUksQ0FBQztTQUNuQjtRQUVELElBQUksQ0FBQyxHQUFHLENBQUMsWUFBWSxDQUFDLEVBQUUsQ0FBQyxRQUFRLENBQUMsQ0FBQyxNQUFNLEdBQUMsRUFBRSxHQUFDLEdBQUcsQ0FBQTtRQUNoRCxnREFBZ0Q7SUFDcEQsQ0FBQztJQUNELG1DQUFPLEdBQVA7UUFBQSxpQkFnU0M7UUEvUkcsSUFBSSxZQUFZLEdBQUcsRUFBRSxDQUFBO1FBQ3JCLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxNQUFNLEdBQUMsS0FBSyxDQUFBO1FBQ2xDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxjQUFjLENBQUMsZUFBZSxDQUFDLENBQUMsTUFBTSxHQUFDLEtBQUssQ0FBQTtRQUNsRSxJQUFJLENBQUMsYUFBYSxFQUFFLENBQUE7UUFDcEIsSUFBSSxDQUFDLG1CQUFtQixDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUE7UUFDdkMsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLEdBQUMsS0FBSyxDQUFBO1FBQ3ZCLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxHQUFDLElBQUksQ0FBQTtRQUN0QixJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sR0FBQyxJQUFJLENBQUE7UUFDMUIsSUFBSSxDQUFDLEdBQUcsQ0FBQyxNQUFNLEdBQUMsSUFBSSxDQUFBO1FBQ3BCLElBQUksQ0FBQyxXQUFXLENBQUMsTUFBTSxHQUFDLElBQUksQ0FBQTtRQUM1QixJQUFJLENBQUMsaUJBQWlCLENBQUMsTUFBTSxHQUFDLElBQUksQ0FBQTtRQUNsQyxJQUFJLENBQUMsa0JBQWtCLENBQUMsTUFBTSxHQUFDLElBQUksQ0FBQTtRQUNuQyxJQUFJLENBQUMsYUFBYSxDQUFDLE1BQU0sR0FBQyxLQUFLLENBQUE7UUFDL0IsSUFBSSxJQUFJLENBQUMsSUFBSSxJQUFJLENBQUMsRUFBRTtZQUNoQix1QkFBYSxDQUFDLFdBQVcsRUFBRSxDQUFDLFdBQVcsQ0FBQyw2QkFBVyxDQUFDLFVBQVUsQ0FBQyxDQUFDO1lBQ2hFLElBQUksQ0FBQyxHQUFHLENBQUMsWUFBWSxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUMsQ0FBQyxXQUFXLEdBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQTtZQUM1RCxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUE7WUFDeEIsSUFBSSxVQUFVLEdBQUMsb0NBQW9CLENBQUMsV0FBVyxFQUFFLENBQUMsVUFBVSxFQUFFLEdBQUMsRUFBRSxDQUFDLENBQUEsSUFBSTtZQUN0RSxJQUFHLFVBQVUsR0FBQyxDQUFDLEVBQUM7Z0JBQ1osVUFBVSxHQUFDLENBQUMsQ0FBQTthQUNmO1lBQ0QsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUMsQ0FBQyxDQUFBO1lBQ1osSUFBSSxLQUFLLEdBQUUsb0NBQW9CLENBQUMsV0FBVyxFQUFFLENBQUMsUUFBUSxDQUFDLFVBQVUsQ0FBQyxDQUFBLENBQUEsS0FBSztZQUN2RSxVQUFVLEdBQUMsb0NBQW9CLENBQUMsV0FBVyxFQUFFLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFBO1lBQzVELGtDQUFpQixDQUFDLFdBQVcsRUFBRSxDQUFDLE9BQU8sQ0FBQywwQkFBVSxDQUFDLHdCQUF3QixFQUFDLFVBQVUsQ0FBQyxDQUFDO1lBQ3hGLFlBQVksR0FBRyxvQ0FBb0IsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxlQUFlLENBQUMsS0FBSyxDQUFDLENBQUMsTUFBTSxDQUFDLG9DQUFvQixDQUFDLFdBQVcsRUFBRSxDQUFDLGdCQUFnQixDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUEsQ0FBQSxNQUFNO1lBQ2pKLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxHQUFDLElBQUksQ0FBQSxDQUFBLFlBQVk7WUFDbEMsSUFBSSxHQUFHLEdBQUMseUJBQWUsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxjQUFjLENBQUMsTUFBTSxDQUFDLENBQUE7WUFDNUQsR0FBRyxHQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsR0FBRyxFQUFDLEVBQUUsR0FBQyxDQUFDLFVBQVUsR0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFBO1lBQ3RDLElBQUksQ0FBQyxLQUFLLENBQUMsWUFBWSxDQUFDLEVBQUUsQ0FBQyxRQUFRLENBQUMsQ0FBQyxNQUFNLEdBQUMsR0FBRyxDQUFBO1lBQy9DLElBQUksQ0FBQyxFQUFFLENBQUMsWUFBWSxDQUFDLHNCQUFZLENBQUMsQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLENBQUE7WUFDcEQsSUFBSSxDQUFDLEdBQUcsQ0FBQyxZQUFZLENBQUMsc0JBQVksQ0FBQyxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsQ0FBQTtZQUNyRCxJQUFJLENBQUMsZ0JBQWdCLENBQUMsTUFBTSxHQUFDLEtBQUssQ0FBQTtZQUNsQyxJQUFJLENBQUMsa0JBQWtCLENBQUMsTUFBTSxHQUFDLElBQUksQ0FBQTtZQUNuQyxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sR0FBQyxLQUFLLENBQUE7WUFDdEIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLEdBQUMsSUFBSSxDQUFBO1NBQzFCO2FBQU0sSUFBSSxJQUFJLENBQUMsSUFBSSxJQUFJLENBQUMsRUFBRTtZQUN2QixJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sR0FBQyxJQUFJLENBQUE7WUFDdkIsdUJBQWEsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxXQUFXLENBQUMsNkJBQVcsQ0FBQyxZQUFZLENBQUMsQ0FBQztZQUNsRSxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUE7WUFDdkIseUNBQXlDO1lBQ3pDLElBQUksYUFBYSxHQUFHLG1CQUFRLENBQUMsV0FBVyxFQUFFLENBQUMsYUFBYSxDQUFBLENBQUEsTUFBTTtZQUM5RCxJQUFJLEtBQUssR0FBRyxDQUFDLENBQUEsQ0FBQSxJQUFJO1lBQ2pCLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxHQUFDLEtBQUssQ0FBQTtZQUN2QixJQUFJLFdBQVcsR0FBRyxhQUFhLEdBQUcsSUFBSSxHQUFHLEtBQUssQ0FBQSxDQUFBLE1BQU07WUFDcEQsSUFBSSxDQUFDLEdBQUcsQ0FBQyxZQUFZLENBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBQyxDQUFDLFdBQVcsR0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLG9DQUFvQixDQUFDLFdBQVcsRUFBRSxDQUFDLGVBQWUsQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFBLENBQUEsS0FBSztZQUM3SCxZQUFZLEdBQUcsWUFBWSxDQUFDLE1BQU0sQ0FBQyxvQ0FBb0IsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxZQUFZLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQSxDQUFBLE1BQU07WUFDdEcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUMsQ0FBQyxDQUFBO1lBQ1osSUFBSSxRQUFRLEdBQUMsMENBQXVCLENBQUMsV0FBVyxFQUFFLENBQUMsV0FBVyxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFBO1lBQy9FLEtBQUssSUFBSSxLQUFLLEdBQUcsQ0FBQyxFQUFFLEtBQUssR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxNQUFNLEVBQUUsS0FBSyxFQUFFLEVBQUU7Z0JBQzlELElBQUcsS0FBSyxHQUFDLFFBQVEsRUFBQztvQkFDZCxJQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQyxNQUFNLEdBQUMsSUFBSSxDQUFBO29CQUN2QyxJQUFJLFFBQVEsR0FBQyxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUMsR0FBQyxJQUFJLENBQUMsR0FBQyxDQUFDLENBQUMsS0FBSyxHQUFDLENBQUMsQ0FBQyxHQUFDLEdBQUcsQ0FBQyxHQUFDLENBQUMsQ0FBQTtvQkFDckQsSUFBSSxDQUFDLFlBQVksR0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDLENBQUE7b0JBQ2pDLElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDLFlBQVksQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDLENBQUMsV0FBVyxHQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsY0FBYyxDQUFDLGVBQWUsR0FBQyxRQUFRLENBQUMsQ0FBQTtpQkFDeEg7cUJBQUk7b0JBQ0QsSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUMsTUFBTSxHQUFDLEtBQUssQ0FBQTtpQkFDM0M7YUFDSjtZQUNELElBQUksQ0FBQyxFQUFFLENBQUMsWUFBWSxDQUFDLHNCQUFZLENBQUMsQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLENBQUE7WUFDcEQsSUFBSSxDQUFDLEdBQUcsQ0FBQyxZQUFZLENBQUMsc0JBQVksQ0FBQyxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsQ0FBQTtZQUNyRCxJQUFJLENBQUMsZ0JBQWdCLENBQUMsTUFBTSxHQUFDLElBQUksQ0FBQTtZQUNqQyxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sR0FBQyxJQUFJLENBQUE7WUFFckIsSUFBSSxDQUFDLGtCQUFrQixDQUFDLE1BQU0sR0FBQyxJQUFJLENBQUE7WUFFbkMsSUFBSSxNQUFJLEdBQUMsbUJBQVEsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxnQkFBZ0IsQ0FBQSxDQUFBLGtCQUFrQjtZQUNsRSwyQkFBMkI7WUFDM0IsZ0RBQWdEO1lBQ2hELDhCQUE4QjtZQUM5QixJQUFJLGFBQVcsR0FBQyxDQUFDLENBQUMsQ0FBQSxDQUFBLFlBQVk7WUFDOUIsSUFBRyxNQUFJLEdBQUMsQ0FBQyxDQUFDLEVBQUM7Z0JBQ1Asb0JBQW9CO2dCQUNwQixJQUFJLEdBQUcsR0FBRyxrQkFBUSxDQUFDLFdBQVcsRUFBRSxDQUFDLFNBQVMsRUFBRSxDQUFDO2dCQUM3Qyw4QkFBOEI7Z0JBQzlCLElBQUksSUFBSSxHQUFDO29CQUNMLEdBQUcsRUFBQyxHQUFHO29CQUNQLGdCQUFnQixFQUFFLENBQUMsQ0FBQztpQkFDdkIsQ0FBQTtnQkFDRCxtQkFBUSxDQUFDLFdBQVcsRUFBRSxDQUFDLGdCQUFnQixHQUFDLENBQUMsQ0FBQyxDQUFBO2dCQUMxQyx5QkFBVyxDQUFDLElBQUksQ0FBQyx3QkFBVSxDQUFDLGlCQUFpQixFQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBQyxJQUFRO29CQUM5RSxJQUFHLE1BQUksSUFBRSxDQUFDLEVBQUM7d0JBQ1AsYUFBVyxHQUFDLENBQUMsQ0FBQTtxQkFDaEI7eUJBQUssSUFBRyxNQUFJLElBQUUsQ0FBQyxFQUFDO3dCQUNiLGFBQVcsR0FBQyxDQUFDLENBQUE7cUJBQ2hCO3lCQUFLLElBQUcsTUFBSSxJQUFFLENBQUMsRUFBQzt3QkFDYixhQUFXLEdBQUMsQ0FBQyxDQUFBO3FCQUNoQjt5QkFBSyxJQUFHLE1BQUksSUFBRSxDQUFDLEVBQUM7d0JBQ2IsYUFBVyxHQUFDLENBQUMsQ0FBQTtxQkFDaEI7eUJBQUssSUFBRyxNQUFJLElBQUUsRUFBRSxJQUFFLE1BQUksSUFBRSxDQUFDLEVBQUM7d0JBQ3ZCLGFBQVcsR0FBQyxDQUFDLENBQUE7cUJBQ2hCO3lCQUFLLElBQUcsTUFBSSxJQUFFLEVBQUUsSUFBRSxNQUFJLElBQUUsRUFBRSxFQUFDO3dCQUN4QixhQUFXLEdBQUMsQ0FBQyxDQUFBO3FCQUNoQjt5QkFBSyxJQUFHLE1BQUksSUFBRSxHQUFHLElBQUUsTUFBSSxJQUFFLEVBQUUsRUFBQzt3QkFDekIsYUFBVyxHQUFDLENBQUMsQ0FBQTtxQkFDaEI7b0JBQ0QsSUFBSSxVQUFVLEdBQUUsMENBQXVCLENBQUMsV0FBVyxFQUFFLENBQUMsaUJBQWlCLENBQUMsYUFBVyxDQUFDLENBQUE7b0JBQ3BGLElBQUksT0FBTyxHQUFDLEVBQUUsQ0FBQTtvQkFDZCxLQUFLLElBQUksS0FBSyxHQUFHLENBQUMsRUFBRSxLQUFLLEdBQUcsVUFBVSxDQUFDLE1BQU0sRUFBRSxLQUFLLEVBQUUsRUFBRTt3QkFDcEQsSUFBSSxLQUFLLEdBQUMseUJBQVcsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxjQUFjLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyxDQUFDLFNBQVMsRUFBQyxVQUFVLENBQUMsS0FBSyxDQUFDLENBQUMsVUFBVSxDQUFDLENBQUM7d0JBQzdHLE9BQU8sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUE7cUJBQ3RCO29CQUNELHFCQUFXLENBQUMsV0FBVyxFQUFFLENBQUMsa0JBQWtCLENBQUMsT0FBTyxDQUFDLENBQUM7b0JBQ3RELGdCQUFnQjtvQkFDaEIsSUFBSTtnQkFDUixDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsVUFBQyxLQUFLO29CQUNYLEVBQUUsQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUM7Z0JBQ3BCLENBQUMsQ0FBQyxDQUFDO2dCQUNILDJFQUEyRTthQUM5RTtTQUNKO2FBQUssSUFBSSxJQUFJLENBQUMsSUFBSSxJQUFJLENBQUMsRUFBRTtZQUN0QixJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUE7WUFDeEIsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLEdBQUMsSUFBSSxDQUFBO1lBQ3RCLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxHQUFDLEtBQUssQ0FBQTtZQUN2QixJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sR0FBQyxLQUFLLENBQUE7WUFDM0IsSUFBSSxDQUFDLEdBQUcsQ0FBQyxNQUFNLEdBQUMsS0FBSyxDQUFBO1lBQ3JCLElBQUksQ0FBQyxXQUFXLENBQUMsTUFBTSxHQUFDLEtBQUssQ0FBQTtZQUM3QixJQUFJLENBQUMsaUJBQWlCLENBQUMsTUFBTSxHQUFDLEtBQUssQ0FBQTtZQUNuQyxJQUFJLENBQUMsa0JBQWtCLENBQUMsTUFBTSxHQUFDLEtBQUssQ0FBQTtZQUNwQyxJQUFJLENBQUMsYUFBYSxDQUFDLE1BQU0sR0FBQyxJQUFJLENBQUE7WUFDOUIsSUFBSSxDQUFDLGdCQUFnQixDQUFDLE1BQU0sR0FBQyxLQUFLLENBQUE7WUFDbEMsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLEdBQUMsS0FBSyxDQUFBO1lBQ3RCLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFDLEdBQUcsQ0FBQTtZQUNkLElBQUksQ0FBQyxHQUFHLENBQUMsWUFBWSxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUMsQ0FBQyxXQUFXLEdBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQTtZQUM1RCxJQUFJLENBQUMsRUFBRSxDQUFDLFlBQVksQ0FBQyxzQkFBWSxDQUFDLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxDQUFBO1lBQ3BELElBQUksQ0FBQyxHQUFHLENBQUMsWUFBWSxDQUFDLHNCQUFZLENBQUMsQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLENBQUE7WUFDckQsS0FBSyxJQUFJLFlBQVksR0FBRyxDQUFDLEVBQUUsWUFBWSxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLE1BQU0sRUFBRSxZQUFZLEVBQUUsRUFBRTtnQkFDcEYsSUFBSSxjQUFjLEdBQUMsWUFBWSxDQUFBO2dCQUMvQixJQUFHLGNBQWMsSUFBRSxDQUFDLEVBQUM7b0JBQ2pCLGNBQWMsR0FBQyxDQUFDLENBQUE7aUJBQ25CO2dCQUNELElBQUcsY0FBYyxJQUFFLENBQUMsRUFBQztvQkFDakIsY0FBYyxHQUFDLENBQUMsQ0FBQTtpQkFDbkI7Z0JBQ0QsSUFBSSxFQUFFLEdBQUMsa0RBQTJCLENBQUMsV0FBVyxFQUFFLENBQUMsV0FBVyxDQUFDLENBQUMsY0FBYyxDQUFDLENBQUMsQ0FBQTtnQkFDOUUsSUFBSSxJQUFJLEdBQUMseUJBQVcsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxjQUFjLENBQUMsRUFBRSxFQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUN4RCxJQUFJLENBQUMsTUFBTSxHQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLFlBQVksQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQTtnQkFFM0QsSUFBSSxHQUFHLEdBQUMsa0RBQTJCLENBQUMsV0FBVyxFQUFFLENBQUMsV0FBVyxDQUFDLENBQUMsY0FBYyxDQUFDLENBQUMsQ0FBQTtnQkFDL0UsSUFBSSxLQUFLLEdBQUMseUJBQVcsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxjQUFjLENBQUMsR0FBRyxFQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUMxRCxLQUFLLENBQUMsTUFBTSxHQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLFlBQVksQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQTtnQkFFNUQsSUFBSSxHQUFHLEdBQUMsa0RBQTJCLENBQUMsV0FBVyxFQUFFLENBQUMsV0FBVyxDQUFDLENBQUMsY0FBYyxDQUFDLENBQUMsQ0FBQTtnQkFDL0UsSUFBSSxLQUFLLEdBQUMseUJBQVcsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxjQUFjLENBQUMsR0FBRyxFQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUMxRCxLQUFLLENBQUMsTUFBTSxHQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLFlBQVksQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQTthQUMvRDtZQUNELEtBQUssSUFBSSxPQUFLLEdBQUcsQ0FBQyxFQUFFLE9BQUssR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxNQUFNLEVBQUUsT0FBSyxFQUFFLEVBQUU7Z0JBQzNELElBQUksQ0FBQyxVQUFVLENBQUMsUUFBUSxDQUFDLE9BQUssQ0FBQyxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUE7Z0JBQzlDLElBQUksQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLE9BQUssQ0FBQyxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUE7YUFDMUM7WUFDRCxJQUFJLEtBQUssR0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLFlBQVksQ0FBQyxFQUFFLENBQUMsUUFBUSxDQUFDLENBQUMsbUJBQW1CLEVBQUUsQ0FBQTtZQUN2RSxJQUFHLEtBQUssSUFBRSxDQUFDLEVBQUM7Z0JBQ1IsSUFBSSxDQUFDLEdBQUcsQ0FBQyxZQUFZLENBQUMsc0JBQVksQ0FBQyxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsQ0FBQTtnQkFDckQsSUFBSSxDQUFDLEdBQUcsQ0FBQyxZQUFZLENBQUMsc0JBQVksQ0FBQyxDQUFDLGVBQWUsQ0FBQyxHQUFHLEVBQUMsQ0FBQyxLQUFLLENBQUMsR0FBRSxFQUFFLENBQUMsQ0FBQztnQkFDckUsSUFBSSxNQUFNLEdBQUMsa0NBQWlCLENBQUMsV0FBVyxFQUFFLENBQUMsU0FBUyxDQUFDLDBCQUFVLENBQUMsd0JBQXdCLEVBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQzVGLElBQUksR0FBRyxHQUFHLGtDQUFpQixDQUFDLFdBQVcsRUFBRSxDQUFDLFNBQVMsQ0FBQywwQkFBVSxDQUFDLHVCQUF1QixFQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUMxRixJQUFHLENBQUMsTUFBTSxHQUFDLENBQUMsQ0FBQyxJQUFFLEtBQUssRUFBQztvQkFDakIsSUFBRyxLQUFLLElBQUUsQ0FBQyxNQUFNLEdBQUMsQ0FBQyxDQUFDLEVBQUM7d0JBQ2pCLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxHQUFDLEtBQUssQ0FBQTt3QkFDdkIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLEdBQUMsSUFBSSxDQUFBO3FCQUMxQjt5QkFBSTt3QkFDRCxJQUFHLEdBQUcsR0FBQyxDQUFDLEVBQUM7NEJBQ0wsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLEdBQUMsSUFBSSxDQUFBO3lCQUN6Qjs2QkFBSTs0QkFDRCxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sR0FBQyxLQUFLLENBQUE7eUJBQzFCO3dCQUNELElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxHQUFDLElBQUksQ0FBQTtxQkFDMUI7aUJBQ0o7cUJBQUk7b0JBQ0QsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLEdBQUMsS0FBSyxDQUFBO29CQUN2QixJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sR0FBQyxLQUFLLENBQUE7aUJBQzNCO2FBQ0o7aUJBQUk7Z0JBQ0QsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLEdBQUMsQ0FBQyxHQUFHLENBQUE7Z0JBQ25CLElBQUksQ0FBQyxRQUFRLENBQUMsWUFBWSxDQUFDLEVBQUUsQ0FBQyxRQUFRLENBQUMsQ0FBQyxZQUFZLENBQUMsQ0FBQyxFQUFDLElBQUksQ0FBQyxDQUFBO2FBQy9EO1lBQ0QsT0FBTTtTQUNUO2dDQUVRLEtBQUs7WUFDVixPQUFLLFVBQVUsQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQTtZQUM5QyxPQUFLLEdBQUcsQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQTtZQUN2QyxJQUFJLEtBQUssR0FBRyxZQUFZLENBQUMsTUFBTSxFQUFFO2dCQUM3QixJQUFJLFNBQVMsR0FBRywwQ0FBdUIsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxlQUFlLENBQUMsWUFBWSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7Z0JBQzNGLElBQUksSUFBSSxHQUFHLHFCQUFxQixHQUFHLFNBQVMsQ0FBQztnQkFDN0MsSUFBSSxNQUFJLEdBQVksSUFBSSxDQUFDO2dCQUN6QixFQUFFLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsRUFBRSxDQUFDLE1BQU0sRUFBRSxVQUFDLEtBQVksRUFBRSxNQUFpQjtvQkFDL0QsSUFBSSxLQUFLLEVBQUU7d0JBQ1AsRUFBRSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQzt3QkFDZCxPQUFPO3FCQUNWO29CQUNELE1BQUksR0FBRyxFQUFFLENBQUMsV0FBVyxDQUFDLE1BQU0sQ0FBQyxDQUFDO29CQUM5QixNQUFJLENBQUMsV0FBVyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUE7b0JBQ3pCLElBQUksRUFBRSxHQUFHLFlBQVksQ0FBQyxLQUFLLENBQUMsQ0FBQTtvQkFDNUIsTUFBSSxDQUFDLEtBQUssR0FBRywwQ0FBdUIsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxRQUFRLENBQUMsRUFBRSxDQUFDLENBQUM7b0JBQ2hFLElBQUksWUFBWSxHQUFHLDBDQUF1QixDQUFDLFdBQVcsRUFBRSxDQUFDLGVBQWUsQ0FBQyxFQUFFLENBQUMsQ0FBQTtvQkFDNUUsTUFBSSxDQUFDLE1BQU0sR0FBRyxLQUFJLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQTtvQkFDdEMsS0FBSSxDQUFDLFVBQVUsQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQTtvQkFDN0MsSUFBSSxZQUFZLElBQUksQ0FBQyxFQUFFO3dCQUNuQixLQUFJLENBQUMsVUFBVSxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQyxRQUFRLENBQUMsR0FBRyxFQUFFLEdBQUcsQ0FBQyxDQUFBO3dCQUNsRCxNQUFJLENBQUMsS0FBSyxHQUFHLDBDQUF1QixDQUFDLFdBQVcsRUFBRSxDQUFDLFFBQVEsQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLENBQUM7d0JBQ3BFLE1BQUksQ0FBQyxZQUFZLENBQUMsRUFBRSxDQUFDLFFBQVEsQ0FBQyxDQUFDLFlBQVksQ0FBQyxDQUFDLEVBQUUsK0JBQWlCLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDO3FCQUNoRjtvQkFDRCxJQUFJLFlBQVksSUFBSSxDQUFDLEVBQUU7d0JBQ25CLEtBQUksQ0FBQyxVQUFVLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDLFFBQVEsQ0FBQyxHQUFHLEVBQUUsR0FBRyxDQUFDLENBQUE7d0JBQ2xELE1BQUksQ0FBQyxLQUFLLEdBQUcsMENBQXVCLENBQUMsV0FBVyxFQUFFLENBQUMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsQ0FBQzt3QkFDcEUsTUFBSSxDQUFDLFlBQVksQ0FBQyxFQUFFLENBQUMsUUFBUSxDQUFDLENBQUMsT0FBTyxDQUFDLDZCQUFlLENBQUMsS0FBSyxHQUFHLDBDQUF1QixDQUFDLFdBQVcsRUFBRSxDQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO3dCQUNsSCxNQUFJLENBQUMsWUFBWSxDQUFDLEVBQUUsQ0FBQyxRQUFRLENBQUMsQ0FBQyxZQUFZLENBQUMsQ0FBQyxFQUFFLDZCQUFlLENBQUMsS0FBSyxHQUFHLEdBQUcsR0FBRywrQkFBaUIsQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUM7cUJBQzlHO29CQUNELElBQUksWUFBWSxJQUFJLENBQUMsRUFBRTt3QkFDbkIsS0FBSSxDQUFDLFVBQVUsQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUMsUUFBUSxDQUFDLEdBQUcsRUFBRSxHQUFHLENBQUMsQ0FBQTt3QkFDbEQsTUFBSSxDQUFDLEtBQUssR0FBRywwQ0FBdUIsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxRQUFRLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxDQUFDO3dCQUNwRSxNQUFJLENBQUMsWUFBWSxDQUFDLEVBQUUsQ0FBQyxRQUFRLENBQUMsQ0FBQyxPQUFPLENBQUMsNkJBQWUsQ0FBQyxLQUFLLEdBQUcsMENBQXVCLENBQUMsV0FBVyxFQUFFLENBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7d0JBQ2xILE1BQUksQ0FBQyxZQUFZLENBQUMsRUFBRSxDQUFDLFFBQVEsQ0FBQyxDQUFDLFlBQVksQ0FBQyxDQUFDLEVBQUUsNkJBQWUsQ0FBQyxLQUFLLEdBQUcsR0FBRyxHQUFHLCtCQUFpQixDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQztxQkFDOUc7Z0JBQ0wsQ0FBQyxDQUFDLENBQUM7Z0JBQ0gsT0FBSyxHQUFHLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUE7YUFDekM7OztRQXZDTCxNQUFNO1FBQ04sS0FBSyxJQUFJLEtBQUssR0FBRyxDQUFDLEVBQUUsS0FBSyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLE1BQU0sRUFBRSxLQUFLLEVBQUU7b0JBQXBELEtBQUs7U0F1Q2I7UUFDRCxNQUFNO1FBQ04sSUFBSSxXQUFXLEdBQUcsQ0FBQyxDQUFDLENBQUE7UUFDcEIsSUFBSSxXQUFXLEdBQUcsQ0FBQyxDQUFBO1FBQ25CLElBQUksSUFBSSxDQUFDLElBQUksSUFBSSxDQUFDLEVBQUU7WUFDaEIsV0FBVyxHQUFHLG9DQUFvQixDQUFDLFdBQVcsRUFBRSxDQUFDLFVBQVUsRUFBRSxDQUFBLENBQUEsb0RBQW9EO1NBQ3BIO1FBQ0QsSUFBSSxJQUFJLENBQUMsSUFBSSxJQUFJLENBQUMsRUFBRTtZQUNoQixXQUFXLEdBQUcsb0NBQW9CLENBQUMsV0FBVyxFQUFFLENBQUMsa0JBQWtCLEVBQUUsQ0FBQSxDQUFBLE1BQU07U0FDOUU7UUFDRCxJQUFJLFdBQVcsR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLGNBQWMsQ0FBQyxhQUFhLENBQUMsQ0FBQTtRQUNoRSxJQUFJLFFBQVEsR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLGNBQWMsQ0FBQyxVQUFVLENBQUMsQ0FBQTtRQUMxRCxJQUFJLElBQUksR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLGNBQWMsQ0FBQyxNQUFNLENBQUMsQ0FBQTtRQUNsRCxJQUFJLFNBQVMsR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLGNBQWMsQ0FBQyxjQUFjLENBQUMsQ0FBQyxjQUFjLENBQUMsV0FBVyxDQUFDLENBQUE7UUFDM0YsV0FBVyxDQUFDLFlBQVksQ0FBQyxzQkFBWSxDQUFDLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFBLENBQUEsUUFBUTtRQUNsRixXQUFXLENBQUMsWUFBWSxDQUFDLHNCQUFZLENBQUMsQ0FBQyxlQUFlLENBQUMsR0FBRyxFQUFFLENBQUMsV0FBVyxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQSxTQUFTO1FBQ3pGLElBQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxHQUFDLEtBQUssQ0FBQTtRQUMzQixJQUFJLENBQUMsR0FBRyxDQUFDLE1BQU0sR0FBQyxLQUFLLENBQUE7UUFDckIsUUFBUSxDQUFDLE1BQU0sR0FBQyxLQUFLLENBQUE7UUFDckIsSUFBSSxDQUFDLFdBQVcsQ0FBQyxjQUFjLENBQUMsV0FBVyxDQUFDLENBQUMsTUFBTSxHQUFFLEtBQUssQ0FBQTtRQUMxRCxJQUFJLENBQUMsV0FBVyxDQUFDLFlBQVksQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDLENBQUMsV0FBVyxHQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsY0FBYyxDQUFDLGlCQUFpQixDQUFDLENBQUE7UUFDbkcseUJBQVcsQ0FBQyxJQUFJLENBQUMsd0JBQVUsQ0FBQyxpQkFBaUIsRUFBRSxJQUFJLENBQUMsOEJBQThCLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFDLElBQVM7WUFDaEgsSUFBSSxHQUFHLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQztZQUN0QixLQUFLLElBQUksS0FBSyxHQUFHLENBQUMsRUFBRSxLQUFLLEdBQUcsR0FBRyxFQUFFLEtBQUssRUFBRSxFQUFFO2dCQUN0QyxJQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxHQUFHLElBQUUsa0JBQVEsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxTQUFTLEVBQUUsRUFBQyxFQUFLLDBEQUEwRDtvQkFDbEgsV0FBVyxHQUFDLENBQUMsS0FBSyxHQUFDLENBQUMsQ0FBQyxDQUFBO2lCQUN4QjthQUNKO1lBQ0QsSUFBRyxXQUFXLElBQUUsQ0FBQyxFQUFDO2dCQUNkLEtBQUksQ0FBQyxHQUFHLENBQUMsTUFBTSxHQUFDLElBQUksQ0FBQTthQUN2QjtpQkFBSTtnQkFDRCxJQUFJLEdBQUcsR0FBQyx5QkFBZSxDQUFDLFdBQVcsRUFBRSxDQUFDLGNBQWMsQ0FBQyxNQUFNLENBQUMsQ0FBQTtnQkFDNUQsSUFBSSxLQUFJLENBQUMsSUFBSSxJQUFJLENBQUMsRUFBRTtvQkFDaEIsR0FBRyxHQUFDLHlCQUFlLENBQUMsV0FBVyxFQUFFLENBQUMsY0FBYyxDQUFDLE1BQU0sQ0FBQyxDQUFBLENBQUEsa0JBQWtCO2lCQUM3RTtxQkFBTSxJQUFJLEtBQUksQ0FBQyxJQUFJLElBQUksQ0FBQyxFQUFFO29CQUN2QixHQUFHLEdBQUMseUJBQWUsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxjQUFjLENBQUMsTUFBTSxDQUFDLENBQUEsQ0FBQSxnQkFBZ0I7aUJBQzNFO2dCQUNELElBQUcsSUFBSSxDQUFDLE1BQU0sR0FBQyxDQUFDLEVBQUM7b0JBQ2IsSUFBRyxXQUFXLElBQUUsQ0FBQyxDQUFDLEVBQUM7d0JBQ2YsR0FBRyxHQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsSUFBSSxFQUFDLEVBQUUsR0FBQyxJQUFJLENBQUMsR0FBRyxHQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFBO3dCQUMxQyxHQUFHLEdBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxJQUFJLEVBQUMsRUFBRSxHQUFDLEdBQUcsQ0FBQyxDQUFBO3FCQUMvQjt5QkFBSTt3QkFDRCxHQUFHLEdBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxJQUFJLEVBQUMsRUFBRSxHQUFDLElBQUksQ0FBQyxXQUFXLEdBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUE7d0JBQ2xELEdBQUcsR0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLElBQUksRUFBQyxFQUFFLEdBQUMsQ0FBQyxXQUFXLEdBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQTtxQkFDM0M7b0JBQ0QsS0FBSSxDQUFDLFNBQVMsQ0FBQyxZQUFZLENBQUMsRUFBRSxDQUFDLFFBQVEsQ0FBQyxDQUFDLE1BQU0sR0FBQyxHQUFHLENBQUMsQ0FBQSxrQkFBa0I7b0JBQ3RFLEtBQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxHQUFDLElBQUksQ0FBQTtpQkFDN0I7YUFDSjtZQUNELElBQUksV0FBVyxJQUFFLENBQUMsSUFBRSxXQUFXLElBQUUsQ0FBQyxFQUFFO2dCQUNoQyxRQUFRLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQTtnQkFDdkIsS0FBSSxDQUFDLFdBQVcsQ0FBQyxZQUFZLENBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBQyxDQUFDLFdBQVcsR0FBQyxLQUFJLENBQUMsT0FBTyxDQUFDLGNBQWMsQ0FBQyxnQkFBZ0IsR0FBQyxXQUFXLENBQUMsQ0FBQSxDQUFDLFdBQVc7YUFDN0g7aUJBQUk7Z0JBQ0QsSUFBRyxXQUFXLElBQUUsQ0FBQyxFQUFDO29CQUNkLFFBQVEsQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFBO2lCQUN6QjtnQkFDRCxLQUFJLENBQUMsV0FBVyxDQUFDLFlBQVksQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDLENBQUMsV0FBVyxHQUFDLEtBQUksQ0FBQyxPQUFPLENBQUMsY0FBYyxDQUFDLGlCQUFpQixDQUFDLENBQUE7YUFDdEc7WUFDRCxJQUFJLFdBQVcsSUFBSSxDQUFDLENBQUMsRUFBRTtnQkFDbkIsS0FBSSxDQUFDLFdBQVcsQ0FBQyxjQUFjLENBQUMsV0FBVyxDQUFDLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQTthQUM3RDtpQkFBTTtnQkFDSCxRQUFRLENBQUMsWUFBWSxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUMsQ0FBQyxNQUFNLEdBQUcsRUFBRSxHQUFHLENBQUMsV0FBVyxDQUFDLENBQUEsQ0FBQSxJQUFJO2dCQUMvRCxLQUFJLENBQUMsV0FBVyxDQUFDLGNBQWMsQ0FBQyxXQUFXLENBQUMsQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFBO2FBQzlEO1FBQ0wsQ0FBQyxDQUFDLENBQUM7UUFDSCxJQUFJLE1BQU0sR0FBRyxrQkFBUSxDQUFDLFdBQVcsRUFBRSxDQUFDLFdBQVcsRUFBRSxDQUFDLENBQUMsTUFBTTtRQUN6RCxJQUFJLEtBQUssR0FBRyxrQkFBUSxDQUFDLFdBQVcsRUFBRSxDQUFDLGFBQWEsRUFBRSxDQUFDLENBQUEsTUFBTTtRQUN6RCxJQUFJLENBQUMsWUFBWSxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUMsQ0FBQyxNQUFNLEdBQUcsRUFBRSxHQUFHLE1BQU0sQ0FBQSxDQUFBLE1BQU07UUFDdEQsU0FBUyxDQUFDLFlBQVksQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDLENBQUMsV0FBVyxHQUFHLHlCQUFXLENBQUMsV0FBVyxFQUFFLENBQUMscUJBQXFCLENBQUMsS0FBSyxDQUFDLENBQUEsQ0FBQSxNQUFNO0lBQ2hILENBQUM7SUFDRCwrQkFBRyxHQUFIO1FBQ0ksSUFBRyxJQUFJLENBQUMsSUFBSSxJQUFFLENBQUMsRUFBQyxFQUFDLGFBQWE7WUFDMUIsS0FBSyxJQUFJLFlBQVksR0FBRyxDQUFDLEVBQUUsWUFBWSxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLE1BQU0sRUFBRSxZQUFZLEVBQUUsRUFBRTtnQkFDcEYsS0FBSyxJQUFJLEtBQUssR0FBRyxDQUFDLEVBQUUsS0FBSyxHQUFHLENBQUMsRUFBRSxLQUFLLEVBQUUsRUFBRTtvQkFDcEMsSUFBRyxJQUFJLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxZQUFZLENBQUMsQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUMsYUFBYSxHQUFDLENBQUMsRUFBQzt3QkFDbkUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsWUFBWSxDQUFDLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDLGtCQUFrQixFQUFFLENBQUE7cUJBQzNFO2lCQUNKO2FBQ0o7U0FDSjthQUFJO1lBQ0QsS0FBSyxJQUFJLEtBQUssR0FBRyxDQUFDLEVBQUUsS0FBSyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLE1BQU0sRUFBRSxLQUFLLEVBQUUsRUFBRTtnQkFDM0QsSUFBSSxJQUFJLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQyxRQUFRLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBRTtvQkFDOUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUMsa0JBQWtCLEVBQUUsQ0FBQTtpQkFDaEQ7YUFDSjtTQUNKO0lBQ0wsQ0FBQztJQUNELCtDQUFtQixHQUFuQixVQUFvQixJQUFJLEVBQUMsQ0FBQztRQUN0QixJQUFJLEtBQUssR0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLFlBQVksQ0FBQyxFQUFFLENBQUMsUUFBUSxDQUFDLENBQUMsbUJBQW1CLEVBQUUsQ0FBQTtRQUN2RSxJQUFHLENBQUMsSUFBRSxDQUFDLEVBQUM7WUFDSixLQUFLLEVBQUUsQ0FBQTtTQUNWO1FBQ0QsSUFBRyxDQUFDLElBQUUsQ0FBQyxFQUFDO1lBQ0osS0FBSyxFQUFFLENBQUE7U0FDVjtRQUNELElBQUksQ0FBQyxRQUFRLENBQUMsWUFBWSxDQUFDLEVBQUUsQ0FBQyxRQUFRLENBQUMsQ0FBQyxZQUFZLENBQUMsS0FBSyxFQUFDLEdBQUcsQ0FBQyxDQUFBO0lBQ25FLENBQUM7SUFDRCxpQkFBaUI7SUFDakIsNENBQWdCLEdBQWhCO1FBQ0ksSUFBSSxLQUFLLEdBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxZQUFZLENBQUMsRUFBRSxDQUFDLFFBQVEsQ0FBQyxDQUFDLG1CQUFtQixFQUFFLENBQUE7UUFDdkUsSUFBRyxLQUFLLElBQUUsQ0FBQyxFQUFDO1lBQ1IsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLEdBQUMsQ0FBQyxJQUFJLENBQUE7WUFDcEIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxZQUFZLENBQUMsRUFBRSxDQUFDLFFBQVEsQ0FBQyxDQUFDLFlBQVksQ0FBQyxDQUFDLEVBQUMsSUFBSSxDQUFDLENBQUE7U0FDL0Q7UUFDRCxJQUFHLEtBQUssSUFBRSxDQUFDLEVBQUM7WUFDUixJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsR0FBQyxDQUFDLEdBQUcsQ0FBQTtZQUNuQixJQUFJLENBQUMsUUFBUSxDQUFDLFlBQVksQ0FBQyxFQUFFLENBQUMsUUFBUSxDQUFDLENBQUMsWUFBWSxDQUFDLENBQUMsRUFBQyxJQUFJLENBQUMsQ0FBQTtTQUMvRDtRQUNELEtBQUssR0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLFlBQVksQ0FBQyxFQUFFLENBQUMsUUFBUSxDQUFDLENBQUMsbUJBQW1CLEVBQUUsQ0FBQTtRQUNuRSxJQUFJLENBQUMsR0FBRyxDQUFDLFlBQVksQ0FBQyxzQkFBWSxDQUFDLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxDQUFBO1FBQ3JELElBQUksQ0FBQyxHQUFHLENBQUMsWUFBWSxDQUFDLHNCQUFZLENBQUMsQ0FBQyxlQUFlLENBQUMsR0FBRyxFQUFDLENBQUMsS0FBSyxDQUFDLEdBQUUsRUFBRSxDQUFDLENBQUM7UUFFckUsSUFBSSxNQUFNLEdBQUMsa0NBQWlCLENBQUMsV0FBVyxFQUFFLENBQUMsU0FBUyxDQUFDLDBCQUFVLENBQUMsd0JBQXdCLEVBQUMsQ0FBQyxDQUFDLENBQUM7UUFDNUYsSUFBSSxHQUFHLEdBQUcsa0NBQWlCLENBQUMsV0FBVyxFQUFFLENBQUMsU0FBUyxDQUFDLDBCQUFVLENBQUMsdUJBQXVCLEVBQUMsQ0FBQyxDQUFDLENBQUM7UUFDMUYsSUFBRyxDQUFDLE1BQU0sR0FBQyxDQUFDLENBQUMsSUFBRSxLQUFLLEVBQUM7WUFDakIsSUFBRyxLQUFLLElBQUUsQ0FBQyxNQUFNLEdBQUMsQ0FBQyxDQUFDLEVBQUM7Z0JBQ2pCLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxHQUFDLEtBQUssQ0FBQTtnQkFDdkIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLEdBQUMsSUFBSSxDQUFBO2FBQzFCO2lCQUFJO2dCQUNELElBQUcsR0FBRyxHQUFDLENBQUMsRUFBQztvQkFDTCxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sR0FBQyxJQUFJLENBQUE7aUJBQ3pCO3FCQUFJO29CQUNELElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxHQUFDLEtBQUssQ0FBQTtpQkFDMUI7Z0JBRUQsSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLEdBQUMsSUFBSSxDQUFBO2FBQzFCO1NBQ0o7YUFBSTtZQUNELElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxHQUFDLEtBQUssQ0FBQTtZQUN2QixJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sR0FBQyxLQUFLLENBQUE7U0FDM0I7SUFDTCxDQUFDO0lBQ0QseUNBQWEsR0FBYjtRQUVJLElBQUksQ0FBQyxHQUFHLEVBQUUsQ0FBQTtRQUNWLHFCQUFXLENBQUMsV0FBVyxFQUFFLENBQUMsYUFBYSxDQUFDLFNBQVMsQ0FBQywyQkFBVSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ3BFLElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQztJQUNuQixDQUFDO0lBRUQsb0RBQXdCLEdBQXhCO1FBQUEsaUJBUUM7UUFQRyxxQkFBUyxDQUFDLFdBQVcsRUFBRSxDQUFDLFlBQVksQ0FBQyxpQkFBTSxDQUFDLGdCQUFnQixFQUFDLHVCQUFZLENBQUMsR0FBRyxFQUFDLEVBQUMsV0FBVyxFQUFDLFVBQUMsTUFBTTtnQkFDOUYsTUFBTSxDQUFDLFlBQVksQ0FBQywwQkFBZ0IsQ0FBQyxDQUFDLElBQUksQ0FBQztvQkFDdkMsT0FBTyxFQUFDO29CQUNSLENBQUM7aUJBQ0osQ0FBQyxDQUFBO2dCQUNGLE1BQU0sQ0FBQyxZQUFZLENBQUMsMEJBQWdCLENBQUMsQ0FBQyxNQUFNLENBQUMsS0FBSSxDQUFDLElBQUksQ0FBQyxDQUFBLENBQUEsbUJBQW1CO1lBQzlFLENBQUMsR0FBRSxDQUFDLENBQUM7SUFDVCxDQUFDO0lBQ0QsaURBQXFCLEdBQXJCO1FBQUEsaUJBUUM7UUFQRyxxQkFBUyxDQUFDLFdBQVcsRUFBRSxDQUFDLFlBQVksQ0FBQyxpQkFBTSxDQUFDLGFBQWEsRUFBQyx1QkFBWSxDQUFDLEdBQUcsRUFBQyxFQUFDLFdBQVcsRUFBQyxVQUFDLE1BQU07Z0JBQzNGLE1BQU0sQ0FBQyxZQUFZLENBQUMsdUJBQWEsQ0FBQyxDQUFDLElBQUksQ0FBQztvQkFDcEMsT0FBTyxFQUFDO29CQUNSLENBQUM7aUJBQ0osQ0FBQyxDQUFBO2dCQUNGLE1BQU0sQ0FBQyxZQUFZLENBQUMsdUJBQWEsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxLQUFJLENBQUMsSUFBSSxDQUFDLENBQUEsQ0FBQSxtQkFBbUI7WUFDM0UsQ0FBQyxHQUFFLENBQUMsQ0FBQztJQUNULENBQUM7SUFDRCwrQ0FBbUIsR0FBbkI7UUFBQSxpQkFVQztRQVRHLElBQUcsSUFBSSxDQUFDLElBQUksSUFBRSxDQUFDLEVBQUM7WUFDWix1QkFBYSxDQUFDLFdBQVcsRUFBRSxDQUFDLFdBQVcsQ0FBQyw2QkFBVyxDQUFDLFlBQVksQ0FBQyxDQUFDO1NBQ3JFO1FBQ0QsSUFBRyxJQUFJLENBQUMsSUFBSSxJQUFFLENBQUMsRUFBQztZQUNaLHVCQUFhLENBQUMsV0FBVyxFQUFFLENBQUMsV0FBVyxDQUFDLDZCQUFXLENBQUMsY0FBYyxDQUFDLENBQUM7U0FDdkU7UUFDRCxxQkFBUyxDQUFDLFdBQVcsRUFBRSxDQUFDLFlBQVksQ0FBQyxpQkFBTSxDQUFDLFdBQVcsRUFBQyx1QkFBWSxDQUFDLEdBQUcsRUFBQyxFQUFDLFdBQVcsRUFBQyxVQUFDLE1BQU07Z0JBQ3pGLE1BQU0sQ0FBQyxZQUFZLENBQUMscUJBQVcsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxLQUFJLENBQUMsSUFBSSxDQUFDLENBQUE7WUFDdEQsQ0FBQyxHQUFFLENBQUMsQ0FBQyxDQUFBLEtBQUs7SUFDZCxDQUFDO0lBQ0Qsb0RBQXdCLEdBQXhCLFVBQXlCLENBQUMsRUFBQyxDQUFDO1FBQ3hCLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDLEdBQUMsQ0FBQyxDQUFBO1FBQ3pCLElBQUcsQ0FBQyxDQUFDLGFBQWEsQ0FBQyxDQUFDLEdBQUMsQ0FBQyxFQUFDO1lBQ25CLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDLEdBQUMsQ0FBQyxDQUFDLENBQUMsYUFBYSxDQUFDLENBQUMsR0FBQyxHQUFHLENBQUMsQ0FBQTtTQUNsRDtRQUNELElBQUcsQ0FBQyxDQUFDLGFBQWEsQ0FBQyxDQUFDLEdBQUMsQ0FBQyxFQUFDO1lBQ25CLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDLEdBQUMsQ0FBQyxDQUFDLENBQUMsYUFBYSxDQUFDLENBQUMsR0FBQyxHQUFHLENBQUMsQ0FBQTtTQUNsRDtRQUNELElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxNQUFNLEdBQUMsSUFBSSxDQUFBO1FBQ2pDLElBQUksUUFBUSxHQUFDLENBQUMsSUFBSSxDQUFDLFlBQVksR0FBQyxJQUFJLENBQUMsR0FBQyxDQUFDLENBQUMsR0FBQyxHQUFHLENBQUMsR0FBQyxDQUFDLENBQUE7UUFDL0MsSUFBSSxDQUFDLGdCQUFnQixDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxZQUFZLENBQUMsc0JBQVksQ0FBQyxDQUFDLFNBQVMsQ0FBQyxrQ0FBbUIsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxhQUFhLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQTtRQUMxSSxJQUFJLENBQUMsWUFBWSxDQUFDO1lBQ1YsSUFBSSxDQUFDLGdCQUFnQixDQUFDLGNBQWMsQ0FBQyxlQUFlLENBQUMsQ0FBQyxNQUFNLEdBQUMsQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxDQUFDLE1BQU0sR0FBQyxFQUFFLENBQUMsQ0FBQTtZQUNuSCxJQUFJLENBQUMsZ0JBQWdCLENBQUMsY0FBYyxDQUFDLGVBQWUsQ0FBQyxDQUFDLE1BQU0sR0FBQyxJQUFJLENBQUE7UUFDekUsQ0FBQyxFQUFDLE1BQU0sQ0FBQyxDQUFBO0lBQ2IsQ0FBQztJQUNELGtEQUFzQixHQUF0QjtRQUFBLGlCQTREQztRQTNERyxJQUFJLEdBQUcsQ0FBQTtRQUNQLElBQUksTUFBTSxDQUFBO1FBQ1YsSUFBSSxRQUFRLENBQUE7UUFDWixJQUFJLElBQUksQ0FBQyxJQUFJLElBQUksQ0FBQyxFQUFFO1lBQ2hCLGlHQUFpRztZQUNqRyxHQUFHLEdBQUcsa0NBQWlCLENBQUMsV0FBVyxFQUFFLENBQUMsU0FBUyxDQUFDLDBCQUFVLENBQUMsdUJBQXVCLEVBQUMsQ0FBQyxDQUFDLENBQUM7WUFDdEYsTUFBTSxHQUFHLGtDQUFpQixDQUFDLFdBQVcsRUFBRSxDQUFDLFNBQVMsQ0FBQywwQkFBVSxDQUFDLDBCQUEwQixFQUFDLENBQUMsQ0FBQyxDQUFDO1NBQy9GO2FBQU0sSUFBSSxJQUFJLENBQUMsSUFBSSxJQUFJLENBQUMsRUFBRTtZQUN2Qiw0RkFBNEY7WUFDNUYsR0FBRyxHQUFHLGtDQUFpQixDQUFDLFdBQVcsRUFBRSxDQUFDLFNBQVMsQ0FBQywwQkFBVSxDQUFDLGtCQUFrQixFQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ2pGLE1BQU0sR0FBRyxrQ0FBaUIsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxTQUFTLENBQUMsMEJBQVUsQ0FBQyxxQkFBcUIsRUFBQyxDQUFDLENBQUMsQ0FBQztTQUMxRjthQUFNLElBQUksSUFBSSxDQUFDLElBQUksSUFBSSxDQUFDLEVBQUU7WUFDdkIsaUdBQWlHO1lBQ2pHLEdBQUcsR0FBRyxrQ0FBaUIsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxTQUFTLENBQUMsMEJBQVUsQ0FBQyx1QkFBdUIsRUFBQyxDQUFDLENBQUMsQ0FBQztZQUN0RixNQUFNLEdBQUcsa0NBQWlCLENBQUMsV0FBVyxFQUFFLENBQUMsU0FBUyxDQUFDLDBCQUFVLENBQUMsMEJBQTBCLEVBQUMsQ0FBQyxDQUFDLENBQUM7U0FDL0Y7UUFDRCxJQUFHLEdBQUcsR0FBQyxDQUFDLEVBQUM7WUFDTCxNQUFNO1lBQ04sSUFBSSxDQUFDLGFBQWEsRUFBRSxDQUFBO1lBQ3BCLElBQUksSUFBSSxDQUFDLElBQUksSUFBSSxDQUFDLEVBQUU7Z0JBQ1oscUJBQVcsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxhQUFhLEdBQUMsb0JBQVEsQ0FBQyxPQUFPLENBQUM7Z0JBRXpELHFCQUFTLENBQUMsV0FBVyxFQUFFLENBQUMsWUFBWSxDQUFDLGlCQUFNLENBQUMsTUFBTSxFQUFDLHVCQUFZLENBQUMsR0FBRyxFQUFDLEVBQUMsV0FBVyxFQUFDLFVBQUMsTUFBTTt3QkFDcEYsTUFBTSxDQUFDLFlBQVksQ0FBQyxzQkFBWSxDQUFDLENBQUMsSUFBSSxDQUFDLEVBQUMsT0FBTyxFQUFDOzRCQUNoRCxDQUFDLEVBQUMsQ0FBQyxDQUFDO29CQUNSLENBQUMsR0FBRSxDQUFDLENBQUE7YUFDWDtpQkFBTSxJQUFJLElBQUksQ0FBQyxJQUFJLElBQUksQ0FBQyxFQUFFO2dCQUN2QixxQkFBVyxDQUFDLFdBQVcsRUFBRSxDQUFDLGFBQWEsR0FBQyxvQkFBUSxDQUFDLGNBQWMsQ0FBQztnQkFDaEUscUJBQVMsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxZQUFZLENBQUMsaUJBQU0sQ0FBQyxNQUFNLEVBQUMsdUJBQVksQ0FBQyxHQUFHLEVBQUMsRUFBQyxXQUFXLEVBQUMsVUFBQyxNQUFNO3dCQUNwRixNQUFNLENBQUMsWUFBWSxDQUFDLHNCQUFZLENBQUMsQ0FBQyxJQUFJLENBQUMsRUFBQyxPQUFPLEVBQUM7NEJBQ2hELENBQUMsRUFBQyxDQUFDLENBQUM7b0JBQ1IsQ0FBQyxHQUFFLENBQUMsQ0FBQTthQUNQO2lCQUFLLElBQUksSUFBSSxDQUFDLElBQUksSUFBSSxDQUFDLEVBQUU7Z0JBQ3RCLGdFQUFnRTtnQkFDaEUsR0FBRyxFQUFFLENBQUE7Z0JBQ0wsa0NBQWlCLENBQUMsV0FBVyxFQUFFLENBQUMsT0FBTyxDQUFDLDBCQUFVLENBQUMsdUJBQXVCLEVBQUMsR0FBRyxDQUFDLENBQUM7Z0JBQ2hGLHFCQUFTLENBQUMsV0FBVyxFQUFFLENBQUMsWUFBWSxDQUFDLGlCQUFNLENBQUMsU0FBUyxFQUFDLHVCQUFZLENBQUMsR0FBRyxFQUFDLEVBQUMsV0FBVyxFQUFDLFVBQUMsTUFBTTt3QkFDdkYsTUFBTSxDQUFDLFlBQVksQ0FBQyxtQkFBUyxDQUFDLENBQUMsSUFBSSxDQUMvQixFQUFDLE9BQU8sRUFBQzs0QkFFVCxDQUFDLEVBQUMsQ0FDTCxDQUFDO3dCQUNGLElBQUksS0FBSyxHQUFDLEtBQUksQ0FBQyxRQUFRLENBQUMsWUFBWSxDQUFDLEVBQUUsQ0FBQyxRQUFRLENBQUMsQ0FBQyxtQkFBbUIsRUFBRSxDQUFBO3dCQUN2RSxNQUFNLENBQUMsWUFBWSxDQUFDLG1CQUFTLENBQUMsQ0FBQyxNQUFNLENBQUMsS0FBSyxFQUFDLENBQUMsRUFBQyxDQUFDLENBQUMsQ0FBQTtvQkFFcEQsQ0FBQyxHQUFFLENBQUMsQ0FBQTtnQkFDSixnR0FBZ0c7Z0JBQ2hHLDREQUE0RDtnQkFDNUQsV0FBVztnQkFDWCxPQUFPO2FBQ1Y7U0FDSjthQUFJO1lBQ0QsSUFBRyxNQUFNLEdBQUMsQ0FBQyxFQUFDO2dCQUNSLElBQUksQ0FBQyxzQkFBc0IsRUFBRSxDQUFBO2FBQ2hDO2lCQUFJO2dCQUNELFFBQVE7Z0JBQ1IscUJBQVcsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxXQUFXLENBQUMseUJBQWUsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxjQUFjLENBQUMsTUFBTSxDQUFDLEVBQUMsQ0FBQyxDQUFDLENBQUM7YUFDakc7U0FDSjtJQUNMLENBQUM7SUFDRCxrREFBc0IsR0FBdEI7UUFBQSxpQkFTQztRQVJHLHFCQUFTLENBQUMsV0FBVyxFQUFFLENBQUMsWUFBWSxDQUFDLGlCQUFNLENBQUMsY0FBYyxFQUFDLHVCQUFZLENBQUMsR0FBRyxFQUFDLEVBQUMsV0FBVyxFQUFDLFVBQUMsTUFBTTtnQkFDNUYsTUFBTSxDQUFDLFlBQVksQ0FBQyx3QkFBYyxDQUFDLENBQUMsSUFBSSxDQUFDO29CQUNyQyxPQUFPLEVBQUM7d0JBQ0osS0FBSSxDQUFDLGFBQWEsRUFBRSxDQUFBO29CQUN4QixDQUFDO2lCQUNKLENBQUMsQ0FBQTtnQkFDRixNQUFNLENBQUMsWUFBWSxDQUFDLHdCQUFjLENBQUMsQ0FBQyxNQUFNLENBQUMsS0FBSSxDQUFDLElBQUksQ0FBQyxDQUFBO1lBQ3pELENBQUMsR0FBRSxDQUFDLENBQUM7SUFDVCxDQUFDO0lBRUQsNkNBQWlCLEdBQWpCO1FBQUEsaUJBc0JDO1FBckJHLElBQUcsSUFBSSxDQUFDLElBQUksSUFBRSxDQUFDLEVBQUM7WUFDWixxQkFBUyxDQUFDLFdBQVcsRUFBRSxDQUFDLFlBQVksQ0FBQyxpQkFBTSxDQUFDLFdBQVcsRUFBQyx1QkFBWSxDQUFDLEdBQUcsRUFBQyxFQUFDLFdBQVcsRUFBQyxVQUFDLE1BQU07b0JBQ3pGLE1BQU0sQ0FBQyxZQUFZLENBQUMscUJBQVcsQ0FBQyxDQUFDLElBQUksQ0FBQzt3QkFDbEMsT0FBTyxFQUFDOzRCQUNKLEtBQUksQ0FBQyxhQUFhLEVBQUUsQ0FBQTt3QkFDeEIsQ0FBQztxQkFDSixDQUFDLENBQUE7b0JBQ0YsSUFBSSxLQUFLLEdBQUMsS0FBSSxDQUFDLFFBQVEsQ0FBQyxZQUFZLENBQUMsRUFBRSxDQUFDLFFBQVEsQ0FBQyxDQUFDLG1CQUFtQixFQUFFLENBQUE7b0JBQ3ZFLE1BQU0sQ0FBQyxZQUFZLENBQUMscUJBQVcsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQTtnQkFDbEQsQ0FBQyxHQUFFLENBQUMsQ0FBQztTQUNSO2FBQUk7WUFDRCxxQkFBUyxDQUFDLFdBQVcsRUFBRSxDQUFDLFlBQVksQ0FBQyxpQkFBTSxDQUFDLFNBQVMsRUFBQyx1QkFBWSxDQUFDLEdBQUcsRUFBQyxFQUFDLFdBQVcsRUFBQyxVQUFDLE1BQU07b0JBQ3ZGLE1BQU0sQ0FBQyxZQUFZLENBQUMsbUJBQVMsQ0FBQyxDQUFDLElBQUksQ0FBQzt3QkFDaEMsT0FBTyxFQUFDOzRCQUNKLEtBQUksQ0FBQyxhQUFhLEVBQUUsQ0FBQTt3QkFDeEIsQ0FBQztxQkFDSixDQUFDLENBQUE7b0JBQ0YsTUFBTSxDQUFDLFlBQVksQ0FBQyxtQkFBUyxDQUFDLENBQUMsTUFBTSxDQUFDLEtBQUksQ0FBQyxJQUFJLEVBQUMsS0FBSSxDQUFDLElBQUksQ0FBQyxDQUFBO2dCQUM5RCxDQUFDLEdBQUUsQ0FBQyxDQUFDO1NBQ1I7SUFFTCxDQUFDO0lBQ0Qsd0NBQVksR0FBWjtRQUNJLHFCQUFTLENBQUMsV0FBVyxFQUFFLENBQUMsWUFBWSxDQUFDLGlCQUFNLENBQUMsSUFBSSxFQUFDLHVCQUFZLENBQUMsR0FBRyxFQUFDLEVBQUMsV0FBVyxFQUFDLFVBQUMsTUFBTTtnQkFDbEYsTUFBTSxDQUFDLFlBQVksQ0FBQyxjQUFJLENBQUMsQ0FBQyxJQUFJLENBQUM7b0JBQzNCLE9BQU8sRUFBQztvQkFFUixDQUFDO2lCQUNKLENBQUMsQ0FBQTtnQkFDRixNQUFNLENBQUMsWUFBWSxDQUFDLGNBQUksQ0FBQyxDQUFDLE1BQU0sRUFBRSxDQUFBO1lBQ3RDLENBQUMsR0FBRSxDQUFDLENBQUM7SUFDVCxDQUFDO0lBQ0QseURBQTZCLEdBQTdCO1FBQ0ksSUFBSSxDQUFDLGdCQUFnQixDQUFDLGNBQWMsQ0FBQyxlQUFlLENBQUMsQ0FBQyxNQUFNLEdBQUMsS0FBSyxDQUFBO1FBQ2xFLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxNQUFNLEdBQUMsS0FBSyxDQUFBO0lBQ3RDLENBQUM7SUFDTywwREFBOEIsR0FBdEMsVUFBdUMsSUFBWTtRQUMvQyxJQUFJLEdBQUcsR0FBRyxrQkFBUSxDQUFDLFdBQVcsRUFBRSxDQUFDLFNBQVMsRUFBRSxDQUFDO1FBQzdDLE9BQU8sSUFBSSxDQUFDLFNBQVMsQ0FBQztZQUNsQixLQUFLLEVBQUUsR0FBRztZQUNWLElBQUksRUFBRSxJQUFJO1NBQ2IsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQUNPLDZDQUFpQixHQUF6QjtRQUNJLElBQUksR0FBRyxHQUFHLGtCQUFRLENBQUMsV0FBVyxFQUFFLENBQUMsU0FBUyxFQUFFLENBQUM7UUFDN0MsT0FBTyxDQUFDLEdBQUcsQ0FBQyxRQUFRLEVBQUMsR0FBRyxDQUFDLENBQUE7UUFDekIsT0FBTyxJQUFJLENBQUMsU0FBUyxDQUFDO1lBQ2xCLEdBQUcsRUFBQyxHQUFHO1lBQ1AsZ0JBQWdCLEVBQUUsQ0FBQyxDQUFDO1NBQ3ZCLENBQUMsQ0FBQztJQUNQLENBQUM7SUE1cUJEO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUM7bURBQ0U7SUFFcEI7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQztnRUFDZTtJQUVqQztRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDO2lFQUNnQjtJQUVsQztRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDOzREQUNXO0lBRzdCO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUM7a0VBQ2lCO0lBR25DO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUM7b0RBQ0c7SUFHckI7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQzs0REFDVztJQUc3QjtRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDO3lEQUNRO0lBRTFCO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUM7a0RBQ0M7SUFHbkI7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQztpREFDQTtJQUdsQjtRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDOzhEQUNhO0lBRy9CO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUM7b0RBQ0c7SUFFckI7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQztxREFDSTtJQUd0QjtRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDOzBEQUNTO0lBRTNCO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUM7a0RBQ0M7SUFFbkI7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQzt3REFDTztJQUV6QjtRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDO29EQUNHO0lBRXJCO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUM7a0RBQ0M7SUFHbkI7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQztxREFDSTtJQUd0QjtRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDO3VEQUNNO0lBSXhCO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxXQUFXLENBQUM7c0RBQ0s7SUFJOUI7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLFdBQVcsQ0FBQztvREFDRztJQUc1QjtRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsV0FBVyxDQUFDO3lEQUNRO0lBR2pDO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxXQUFXLENBQUM7eURBQ1E7SUFFakM7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQztrREFDQztJQUluQjtRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDOytEQUNjO0lBRWhDO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUM7a0RBQ0M7SUFHbkI7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQzsrREFDYztJQUVoQztRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDO21EQUNFO0lBRXBCO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUM7c0RBQ0s7SUFFdkI7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQzt1REFDTTtJQWxGUCxpQkFBaUI7UUFEckMsT0FBTztPQUNhLGlCQUFpQixDQXNyQnJDO0lBQUQsd0JBQUM7Q0F0ckJELEFBc3JCQyxDQXRyQjhDLHFCQUFXLEdBc3JCekQ7a0JBdHJCb0IsaUJBQWlCIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiLy8gTGVhcm4gVHlwZVNjcmlwdDpcclxuLy8gIC0gaHR0cHM6Ly9kb2NzLmNvY29zLmNvbS9jcmVhdG9yL21hbnVhbC9lbi9zY3JpcHRpbmcvdHlwZXNjcmlwdC5odG1sXHJcbi8vIExlYXJuIEF0dHJpYnV0ZTpcclxuLy8gIC0gaHR0cHM6Ly9kb2NzLmNvY29zLmNvbS9jcmVhdG9yL21hbnVhbC9lbi9zY3JpcHRpbmcvcmVmZXJlbmNlL2F0dHJpYnV0ZXMuaHRtbFxyXG4vLyBMZWFybiBsaWZlLWN5Y2xlIGNhbGxiYWNrczpcclxuLy8gIC0gaHR0cHM6Ly9kb2NzLmNvY29zLmNvbS9jcmVhdG9yL21hbnVhbC9lbi9zY3JpcHRpbmcvbGlmZS1jeWNsZS1jYWxsYmFja3MuaHRtbFxyXG5cclxuaW1wb3J0IHsgSHR0cE1hbmFnZXIsIEFjY2Vzc05hbWUgfSBmcm9tIFwiLi4vLi4vLi9OZXRXb3JrL0h0dHBNYW5hZ2VyXCI7XHJcbmltcG9ydCB7IEJvc3NDaGFsbGVuZ2VNYW5hZ2VyIH0gZnJvbSBcIi4uLy4uL0FjdGl2aXR5L0Jvc3NDaGFsbGVuZ2VcIjtcclxuaW1wb3J0IHsgRW5kbGVzc0xldmVsc01hbmFnZXIgfSBmcm9tIFwiLi4vLi4vQWN0aXZpdHkvRW5kbGVzc0xldmVsc1wiO1xyXG5pbXBvcnQgeyBHYW1lTW9kZSB9IGZyb20gXCIuLi8uLi9Db25zdGFudHNcIjtcclxuaW1wb3J0IEdhbWVNYW5hZ2VyIGZyb20gXCIuLi8uLi9HYW1lTWFuYWdlclwiO1xyXG5pbXBvcnQgeyBIZXJvTWFuYWdlciB9IGZyb20gXCIuLi8uLi9IZXJvL0RhdGEvSGVyb01hbmFnZXJcIjtcclxuaW1wb3J0IHsgTW9uc3RlckNvbmZpZ3VyZU1hbmFnZXIgfSBmcm9tIFwiLi4vLi4vTW9uc3Rlci9EYXRhL01vbnN0ZXJDb25maWd1cmVcIjtcclxuaW1wb3J0IHsgTW9uc3RlclNraWxsTWFuYWdlciB9IGZyb20gXCIuLi8uLi9Nb25zdGVyL0RhdGEvTW9uc3RlclNraWxsXCI7XHJcbmltcG9ydCB7IE1vbnN0ZXJBY3Rpb25OYW1lLCBNb25zdGVyRmFjZU5hbWUgfSBmcm9tIFwiLi4vLi4vTW9uc3Rlci9Nb25zdGVyRGF0YVwiO1xyXG5pbXBvcnQgeyBGb2xsb3dfVHlwZSB9IGZyb20gXCIuLi8uLi9tdWx0aUxhbmd1YWdlL0ZvbGxvd0NvbnN0YW50c1wiO1xyXG5pbXBvcnQgRm9sbG93TWFuYWdlciBmcm9tIFwiLi4vLi4vbXVsdGlMYW5ndWFnZS9Gb2xsb3dNYW5hZ2VyXCI7XHJcbmltcG9ydCBMYW5ndWFnZU1hbmFnZXIgZnJvbSBcIi4uLy4uL211bHRpTGFuZ3VhZ2UvTGFuZ3VhZ2VNYW5hZ2VyXCI7XHJcbmltcG9ydCBUZXh0TGFuZ3VhZ2UgZnJvbSBcIi4uLy4uL211bHRpTGFuZ3VhZ2UvVGV4dExhbmd1YWdlXCI7XHJcbmltcG9ydCB7IFByb3BNYW5hZ2VyIH0gZnJvbSBcIi4uLy4uL1Byb3AvUHJvcE1hbmFnZXJcIjtcclxuaW1wb3J0IFJhbmtpbmdMaXN0IGZyb20gXCIuLi8uLi9SYW5raW5nTGlzdC9SYW5raW5nTGlzdFwiO1xyXG5pbXBvcnQgeyBTb3VuZEluZGV4IH0gZnJvbSBcIi4uLy4uL1NvdW5kL0F1ZGlvQ29uc3RhbnRzXCI7XHJcbmltcG9ydCB7IFN0b3JhZ2VLZXkgfSBmcm9tIFwiLi4vLi4vU3RvcmFnZS9TdG9yYWdlQ29uZmlnXCI7XHJcbmltcG9ydCB7IFRoZVN0b3JhZ2VNYW5hZ2VyIH0gZnJvbSBcIi4uLy4uL1N0b3JhZ2UvU3RvcmFnZU1hbmFnZXJcIjtcclxuaW1wb3J0IFRvUGxheU1haW5VaSBmcm9tIFwiLi4vLi4vVUkvaG9tZS9Ub1BsYXlNYWluVWlcIjtcclxuaW1wb3J0IFVJQ29tcG9uZW50IGZyb20gXCIuLi8uLi9VSS9VSUNvbXBvbmVudFwiO1xyXG5pbXBvcnQgeyBVSVBhdGgsIFVJTGF5ZXJMZXZlbCB9IGZyb20gXCIuLi8uLi9VSS9VSUNvbmZpZ1wiO1xyXG5pbXBvcnQgeyBVSU1hbmFnZXIgfSBmcm9tIFwiLi4vLi4vVUkvVUlNYW5hZ2VyXCI7XHJcbmltcG9ydCBVc2VyRGF0YSBmcm9tIFwiLi4vLi4vVXNlckRhdGFcIjtcclxuaW1wb3J0IHsgVXNlckluZm8gfSBmcm9tIFwiLi4vLi4vVXNlckluZm8vVXNlckluZm9cIjtcclxuaW1wb3J0IE1vcHBpbmdWb2lkIGZyb20gXCIuLi92b2lkY3JhY2svTW9wcGluZ1ZvaWRcIjtcclxuaW1wb3J0IFZvaWRTY2VuZSBmcm9tIFwiLi4vdm9pZGNyYWNrL1ZvaWRTY2VuZVwiO1xyXG5pbXBvcnQgeyBCb3NzV2Vla2x5UmV3YXJkTWFuYWdlciB9IGZyb20gXCIuL0Jvc3NXZWVrbHlSZXdhcmRcIjtcclxuaW1wb3J0IE1vcHBpbmdVcCBmcm9tIFwiLi9Nb3BwaW5nVXBcIjtcclxuaW1wb3J0IHBsYXlpbnN0cnVjdGlvbnMgZnJvbSBcIi4vcGxheWluc3RydWN0aW9uc1wiO1xyXG5pbXBvcnQgcHVyY2hhc2VzbnVtYmUgZnJvbSBcIi4vcHVyY2hhc2VzbnVtYmVcIjtcclxuaW1wb3J0IHJld2FyZGRpc3BsYXkgZnJvbSBcIi4vcmV3YXJkZGlzcGxheVwiO1xyXG5pbXBvcnQgeyBSb2d1ZUdpZnRJbmZvcm1hdGlvbk1hbmFnZXIgfSBmcm9tIFwiLi9Sb2d1ZUdpZnRJbmZvcm1hdGlvblwiO1xyXG5pbXBvcnQgU2hvcCBmcm9tIFwiLi9TaG9wXCI7XHJcblxyXG5jb25zdCB7IGNjY2xhc3MsIHByb3BlcnR5IH0gPSBjYy5fZGVjb3JhdG9yO1xyXG5cclxuQGNjY2xhc3NcclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgZW5kbGVzc2NoYWxsZW5nZXMgZXh0ZW5kcyBVSUNvbXBvbmVudCB7XHJcblxyXG4gICAgQHByb3BlcnR5KGNjLk5vZGUpXHJcbiAgICBib3NzOiBjYy5Ob2RlID0gbnVsbC8vYm9zc+S4k+WxnueahOaKgOiDveS4juWQjeWtlyAgYm9zc+aMkeaImFxyXG4gICAgQHByb3BlcnR5KGNjLk5vZGUpXHJcbiAgICBCb3NzUnVzaF9CdG5fUmFuazogY2MuTm9kZSA9IG51bGwvL+aOkuihjOamnOaMiemSrlxyXG4gICAgQHByb3BlcnR5KGNjLk5vZGUpXHJcbiAgICBCb3NzUnVzaF9CdG5fQm9udXM6IGNjLk5vZGUgPSBudWxsLy/lpZblirHmjInpkq5cclxuICAgIEBwcm9wZXJ0eShjYy5Ob2RlKVxyXG4gICAgTWF6ZV9CdG5fU2hvcDogY2MuTm9kZSA9IG51bGwvL+WVhuW6l+aMiemSrlxyXG4gICAgXHJcbiAgICBAcHJvcGVydHkoY2MuTm9kZSlcclxuICAgIEJvc3NSdXNoX0J0bl9SZWNvcmQ6IGNjLk5vZGUgPSBudWxsLy/miJjmlpforrDlvZXmjInpkq4gIGJvc3PmjJHmiJhcclxuXHJcbiAgICBAcHJvcGVydHkoY2MuTm9kZSlcclxuICAgIHh2a29uOiBjYy5Ob2RlID0gbnVsbC8v6Jma56m66KOC57yd55qE5Lic6KW/XHJcbiAgICBcclxuICAgIEBwcm9wZXJ0eShjYy5Ob2RlKVxyXG4gICAgQm9zc1J1c2hfVGlwczogY2MuTm9kZSA9IG51bGwvL+aPkOekuuaMiemSrlxyXG5cclxuICAgIEBwcm9wZXJ0eShjYy5Ob2RlKVxyXG4gICAgaGVyb1NoYWRvdzogY2MuTm9kZSA9IG51bGwvL+aAqueJqemYtOW9sVxyXG4gICAgQHByb3BlcnR5KGNjLk5vZGUpXHJcbiAgICBwb3M6IGNjLk5vZGUgPSBudWxsLy/mgKrniankvY3nva5cclxuXHJcbiAgICBAcHJvcGVydHkoY2MuTm9kZSlcclxuICAgIGJ0OiBjYy5Ob2RlID0gbnVsbC8v5qCH6aKYXHJcblxyXG4gICAgQHByb3BlcnR5KGNjLk5vZGUpXHJcbiAgICBDb21tb25fQnRuX0JhY2s6IGNjLk5vZGUgPSBudWxsLy/ov5Tlm57mjInpkq4gIFxyXG5cclxuICAgIEBwcm9wZXJ0eShjYy5Ob2RlKVxyXG4gICAgYnRubm86IGNjLk5vZGUgPSBudWxsLy/miavojaHmjInpkq4gIFxyXG4gICAgQHByb3BlcnR5KGNjLk5vZGUpXHJcbiAgICBidG55ZXM6IGNjLk5vZGUgPSBudWxsLy/lvIDlp4vmjJHmiJjmjInpkq4gIFxyXG5cclxuICAgIEBwcm9wZXJ0eShjYy5Ob2RlKVxyXG4gICAgUmFua2luZ1NlbGY6IGNjLk5vZGUgPSBudWxsLy/oh6rlt7HnmoTlpLTlg48gIOaOkuWQjSBcclxuICAgIEBwcm9wZXJ0eShjYy5Ob2RlKVxyXG4gICAgb25lOiBjYy5Ob2RlID0gbnVsbC8v5aaC5p6c5o6S5ZCN56ys5LiA5bCx5pi+56S66L+Z5Liq5paH5a2XXHJcbiAgICBAcHJvcGVydHkoY2MuTm9kZSlcclxuICAgIFByb21vdGlvbjogY2MuTm9kZSA9IG51bGwvL+WmguaenOS4jeaYr+esrOS4gOWwseaYvuekuui/meS4quaWh+WtlyAgIOi+vuWIsOWkmuWwkeazoi3kvKTlrrPlj6/mmYvljYfoh7PlpJrlsJHlkI1cclxuICAgIEBwcm9wZXJ0eShjYy5Ob2RlKVxyXG4gICAgV2F2ZXM6IGNjLk5vZGUgPSBudWxsLy/ml6DlsL3mjJHmiJggICDmnKzmrKHmjJHmiJjlsIbku47lpJrlsJHms6LlvIDlp4tcclxuICAgIEBwcm9wZXJ0eShjYy5Ob2RlKVxyXG4gICAgbnVtOiBjYy5Ob2RlID0gbnVsbC8v5oyR5oiY5qyh5pWwXHJcblxyXG4gICAgQHByb3BlcnR5KGNjLk5vZGUpXHJcbiAgICBqaW5lbmc6IGNjLk5vZGUgPSBudWxsLy9ib3Nz55qE5oqA6IO95Zu+5qCHXHJcblxyXG4gICAgQHByb3BlcnR5KGNjLk5vZGUpXHJcbiAgICBib3NzbmFtZTogY2MuTm9kZSA9IG51bGwvL2Jvc3PnmoTlkI3lrZdcclxuICAgIHR5cGU6IG51bWJlciA9IDAvLzI65peg5bC95oyR5oiYICAgM++8mmJvc3PmjJHmiJhcclxuXHJcbiAgICBAcHJvcGVydHkoY2MuU3ByaXRlQXRsYXMpXHJcbiAgICBjb3B5X3VpOiBjYy5TcHJpdGVBdGxhcyA9IG51bGwvL0Jvc3PmioDog73lm77moIcgICAgYnVmZuWbvuagh1xyXG4gICAgdGV4dDogbnVtYmVyW10gPSBbMTAwMTI2LCAxMDAxMjgsIDEwMDEyOV0vL+aImOWKmzp+5rOi5pWwOn7kvKTlrrM6flxyXG5cclxuICAgIEBwcm9wZXJ0eShjYy5TcHJpdGVGcmFtZSlcclxuICAgIGJqc3ByOiBjYy5TcHJpdGVGcmFtZVtdID0gW10vL2Jvc3PmjJHmiJjog4zmma9cclxuXHJcbiAgICBAcHJvcGVydHkoY2MuU3ByaXRlRnJhbWUpXHJcbiAgICBianNwcnd1amluOiBjYy5TcHJpdGVGcmFtZSA9IG51bGwvL+aXoOWwveaMkeaImOiDjOaZr1xyXG5cclxuICAgIEBwcm9wZXJ0eShjYy5TcHJpdGVGcmFtZSlcclxuICAgIGJqc3ByeHZrb246IGNjLlNwcml0ZUZyYW1lID0gbnVsbC8v6Jma56m66KOC57yd6IOM5pmvXHJcbiAgICBAcHJvcGVydHkoY2MuTm9kZSlcclxuICAgIGJiZzogY2MuTm9kZSA9IG51bGwvL+WcsOWbvuiDjOaZr1xyXG5cclxuICAgIGJvc3NzcHJpdGVpZDpudW1iZXI9MC8vYm9zc+aKgOiDvWlkXHJcbiAgICBAcHJvcGVydHkoY2MuTm9kZSlcclxuICAgIFNraWxsRGVzY3JpcHRpb246IGNjLk5vZGUgPSBudWxsLy/mioDog73mj4/ov7BcclxuICAgIEBwcm9wZXJ0eShjYy5Ob2RlKVxyXG4gICAgYnQxOiBjYy5Ob2RlID0gbnVsbC8v5pyA6auY5o6S5ZCNICAgIOacrOWRqOaOkuWQjSAgICDnrKzlh6Dnq6BcclxuXHJcbiAgICBAcHJvcGVydHkoY2MuTm9kZSlcclxuICAgIEJvc3NSdXNoX1RpbWVfQmc6IGNjLk5vZGUgPSBudWxsLy/mr4/lkajliLfmlrDmoYZcclxuICAgIEBwcm9wZXJ0eShjYy5Ob2RlKVxyXG4gICAgdGltZTogY2MuTm9kZSA9IG51bGwvL+avj+WRqOWIt+aWsOaWh+Wtl1xyXG4gICAgQHByb3BlcnR5KGNjLk5vZGUpXHJcbiAgICBjb250ZW50OiBjYy5Ob2RlID0gbnVsbC8v6Jma56m66KOC57yd5aWW5Yqx55qE54i26IqC54K5ICAgXHJcbiAgICBAcHJvcGVydHkoY2MuTm9kZSlcclxuICAgIFBhZ2VWaWV3OiBjYy5Ob2RlID0gbnVsbC8v56ug6IqC5ruR5Yqo6IqC54K5XHJcbiAgICBcclxuICAgIC8vIEBwcm9wZXJ0eShjYy5MYWJlbClcclxuICAgIC8vIGxhYmVsOiBjYy5MYWJlbCA9IG51bGw7XHJcblxyXG4gICAgLy8gQHByb3BlcnR5XHJcbiAgICAvLyB0ZXh0OiBzdHJpbmcgPSAnaGVsbG8nO1xyXG5cclxuICAgIC8vIExJRkUtQ1lDTEUgQ0FMTEJBQ0tTOlxyXG5cclxuICAgIC8vIG9uTG9hZCAoKSB7fVxyXG4gICAgaW5pdFVpKHR5cGUpIHsvLzI65peg5bC95oyR5oiYICAgM++8mmJvc3PmjJHmiJggICAgNDromZrnqbroo4LnvJ1cclxuICAgICAgICAvLyBHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLm11c2ljX21hbmFnZXIucGxheU11c2ljKE11c2ljSW5kZXguQkdNX1RKUCk7XHJcbiAgICAgICAgLy8gRm9sbG93TWFuYWdlci5nZXRJbnN0YW5jZSgpLmZvbGxvd0V2ZW50KEZvbGxvd19UeXBlLumTgeWMoOmTuuaJk+W8gOasoeaVsCk7XHJcbiAgICAgICAgdGhpcy50eXBlID0gdHlwZVxyXG4gICAgICAgIHRoaXMuZGVzKClcclxuICAgICAgICB0aGlzLlJlZnJlc2goKS8v5Yi35pawXHJcbiAgICB9XHJcbiAgICBudW1iZXJSZWZyZXNoKCl7XHJcbiAgICAgICAgbGV0IG51bVxyXG4gICAgICAgIGxldCB0b3RhbG51bVxyXG4gICAgICAgIGxldCBkYW1hZ2VcclxuICAgICAgICBpZiAodGhpcy50eXBlID09IDIpIHtcclxuICAgICAgICAgICAgdG90YWxudW09VGhlU3RvcmFnZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXROdW1iZXIoU3RvcmFnZUtleS5Ub3RhbFVubGltaXRlZENoYWxsZW5nZVRpbWVzLDApO1xyXG4gICAgICAgICAgICBudW0gPSBUaGVTdG9yYWdlTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldE51bWJlcihTdG9yYWdlS2V5LlVubGltaXRlZENoYWxsZW5nZVRpbWVzLDMpO1xyXG4gICAgICAgICAgICBkYW1hZ2U9RW5kbGVzc0xldmVsc01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRNYXhXYXZlKCkvL1RoZVN0b3JhZ2VNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0TnVtYmVyKFN0b3JhZ2VLZXkuVW5saW1pdGVkQ2hhbGxlbmdlRGFtYWdlLDApO1xyXG4gICAgICAgIH0gZWxzZSBpZiAodGhpcy50eXBlID09IDMpIHtcclxuICAgICAgICAgICAgdG90YWxudW09VGhlU3RvcmFnZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXROdW1iZXIoU3RvcmFnZUtleS5Ub3RhbEJvc3NDaGFsbGVuZ2VUaW1lcywwKTtcclxuICAgICAgICAgICAgbnVtID0gVGhlU3RvcmFnZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXROdW1iZXIoU3RvcmFnZUtleS5Cb3NzQ2hhbGxlbmdlVGltZXMsMyk7XHJcbiAgICAgICAgICAgIGRhbWFnZT1UaGVTdG9yYWdlTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldE51bWJlcihTdG9yYWdlS2V5LkJvc3NDaGFsbGVuZ2VEYW1hZ2UsLTEpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmICh0aGlzLnR5cGUgPT0gNCkge1xyXG4gICAgICAgICAgICBudW0gPSBUaGVTdG9yYWdlTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldE51bWJlcihTdG9yYWdlS2V5LlZvaWRDcmFja0NoYWxsZW5nZVRpbWVzLDMpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZih0aGlzLnR5cGUhPSA0KXtcclxuICAgICAgICAgICAgaWYodG90YWxudW0+PTEmJm51bT4wJiZkYW1hZ2U+LTEpe1xyXG4gICAgICAgICAgICAgICAgdGhpcy5idG5uby5hY3RpdmU9dHJ1ZVxyXG4gICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgIHRoaXMuYnRubm8uYWN0aXZlPWZhbHNlXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgbGV0IGluZGV4PXRoaXMuUGFnZVZpZXcuZ2V0Q29tcG9uZW50KGNjLlBhZ2VWaWV3KS5nZXRDdXJyZW50UGFnZUluZGV4KClcclxuICAgICAgICAgICAgbGV0IGRhbWFnZT1UaGVTdG9yYWdlTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldE51bWJlcihTdG9yYWdlS2V5LlZvaWRDcmFja0NoYWxsZW5nZURhbWFnZSwwKTtcclxuICAgICAgICAgICAgbGV0IG51bSA9IFRoZVN0b3JhZ2VNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0TnVtYmVyKFN0b3JhZ2VLZXkuVm9pZENyYWNrQ2hhbGxlbmdlVGltZXMsMyk7XHJcbiAgICAgICAgICAgIGlmKChkYW1hZ2UrMSk+PWluZGV4KXtcclxuICAgICAgICAgICAgICAgIGlmKGluZGV4PT0oZGFtYWdlKzEpKXtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmJ0bm5vLmFjdGl2ZT1mYWxzZVxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYnRueWVzLmFjdGl2ZT10cnVlXHJcbiAgICAgICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgICAgICBpZihudW0+MCl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuYnRubm8uYWN0aXZlPXRydWVcclxuICAgICAgICAgICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5idG5uby5hY3RpdmU9ZmFsc2VcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5idG55ZXMuYWN0aXZlPXRydWVcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmJ0bm5vLmFjdGl2ZT1mYWxzZVxyXG4gICAgICAgICAgICAgICAgdGhpcy5idG55ZXMuYWN0aXZlPWZhbHNlXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgbGV0IHJlZD10aGlzLmJ0bnllcy5nZXRDaGlsZEJ5TmFtZSgncmVkJyk7XHJcbiAgICAgICAgbGV0IHR4dD1MYW5ndWFnZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRTdHJCeVRleHRJZCg4MjAwMDkpXHJcbiAgICAgICAgY29uc29sZS5sb2coXCIrKysrKysrKysrXCIsdHh0KVxyXG4gICAgICAgIHR4dD10eHQucmVwbGFjZSgnficsXCJcIitudW0pXHJcbiAgICAgICAgXHJcbiAgICAgICAgaWYobnVtPT0wKXtcclxuICAgICAgICAgICAgLy8gdGhpcy5udW0uY29sb3I9bmV3IGNjLkNvbG9yKDI1NSw3MSw3MClcclxuICAgICAgICAgICAgdHh0PXR4dC5yZXBsYWNlKCdAJyxcIiNGRjQ3NDZcIilcclxuICAgICAgICAgICAgcmVkLmFjdGl2ZT1mYWxzZTtcclxuICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgLy8gdGhpcy5udW0uY29sb3I9bmV3IGNjLkNvbG9yKDI1NSwyNTUsMjU1KVxyXG4gICAgICAgICAgICB0eHQ9dHh0LnJlcGxhY2UoJ0AnLFwiI0ZGRkZGRlwiKVxyXG4gICAgICAgICAgICByZWQuYWN0aXZlPXRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIFxyXG4gICAgICAgIHRoaXMubnVtLmdldENvbXBvbmVudChjYy5SaWNoVGV4dCkuc3RyaW5nPVwiXCIrdHh0XHJcbiAgICAgICAgLy8gdGhpcy5udW0uZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmc9XCJcIitudW1cclxuICAgIH1cclxuICAgIFJlZnJlc2goKSB7XHJcbiAgICAgICAgbGV0IEVsaXRlTW9uc3RlciA9IFtdXHJcbiAgICAgICAgdGhpcy5Ta2lsbERlc2NyaXB0aW9uLmFjdGl2ZT1mYWxzZVxyXG4gICAgICAgIHRoaXMuU2tpbGxEZXNjcmlwdGlvbi5nZXRDaGlsZEJ5TmFtZShcIkNvbW1vbl9UZXh0QkdcIikuYWN0aXZlPWZhbHNlXHJcbiAgICAgICAgdGhpcy5udW1iZXJSZWZyZXNoKClcclxuICAgICAgICB0aGlzLkJvc3NSdXNoX0J0bl9SZWNvcmQuYWN0aXZlID0gZmFsc2VcclxuICAgICAgICB0aGlzLnh2a29uLmFjdGl2ZT1mYWxzZVxyXG4gICAgICAgIHRoaXMuV2F2ZXMuYWN0aXZlPXRydWVcclxuICAgICAgICB0aGlzLlByb21vdGlvbi5hY3RpdmU9dHJ1ZVxyXG4gICAgICAgIHRoaXMub25lLmFjdGl2ZT10cnVlXHJcbiAgICAgICAgdGhpcy5SYW5raW5nU2VsZi5hY3RpdmU9dHJ1ZVxyXG4gICAgICAgIHRoaXMuQm9zc1J1c2hfQnRuX1JhbmsuYWN0aXZlPXRydWVcclxuICAgICAgICB0aGlzLkJvc3NSdXNoX0J0bl9Cb251cy5hY3RpdmU9dHJ1ZVxyXG4gICAgICAgIHRoaXMuTWF6ZV9CdG5fU2hvcC5hY3RpdmU9ZmFsc2VcclxuICAgICAgICBpZiAodGhpcy50eXBlID09IDIpIHtcclxuICAgICAgICAgICAgRm9sbG93TWFuYWdlci5nZXRJbnN0YW5jZSgpLmZvbGxvd0V2ZW50KEZvbGxvd19UeXBlLuaXoOWwveaMkeaImOmhtemdouWxleekuuasoeaVsCk7XHJcbiAgICAgICAgICAgIHRoaXMuYmJnLmdldENvbXBvbmVudChjYy5TcHJpdGUpLnNwcml0ZUZyYW1lPXRoaXMuYmpzcHJ3dWppblxyXG4gICAgICAgICAgICB0aGlzLmJvc3MuYWN0aXZlID0gZmFsc2VcclxuICAgICAgICAgICAgbGV0IHdhdmVudW1iZXI9RW5kbGVzc0xldmVsc01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRNYXhXYXZlKCktMzE7Ly/ms6LmlbBcclxuICAgICAgICAgICAgaWYod2F2ZW51bWJlcjwxKXtcclxuICAgICAgICAgICAgICAgIHdhdmVudW1iZXI9MFxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMuYmJnLnk9MFxyXG4gICAgICAgICAgICBsZXQgUm91bmQgPUVuZGxlc3NMZXZlbHNNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0Um91bmQod2F2ZW51bWJlcikvL+WbnuWQiOaVsFxyXG4gICAgICAgICAgICB3YXZlbnVtYmVyPUVuZGxlc3NMZXZlbHNNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0V2F2ZShSb3VuZClcclxuICAgICAgICAgICAgVGhlU3RvcmFnZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zZXRJdGVtKFN0b3JhZ2VLZXkuVW5saW1pdGVkQ2hhbGxlbmdlRGFtYWdlLHdhdmVudW1iZXIpO1xyXG4gICAgICAgICAgICBFbGl0ZU1vbnN0ZXIgPSBFbmRsZXNzTGV2ZWxzTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldEVsaXRlTW9uc3RlcihSb3VuZCkuY29uY2F0KEVuZGxlc3NMZXZlbHNNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0Tm9ybWFsTW9uc3RlcihSb3VuZCkpLy/mgKrnialpZFxyXG4gICAgICAgICAgICB0aGlzLldhdmVzLmFjdGl2ZT10cnVlLy/mnKzmrKHmjJHmiJjku47lpJrlsJHms6LlvIDlp4tcclxuICAgICAgICAgICAgbGV0IHR4dD1MYW5ndWFnZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRTdHJCeVRleHRJZCg4MDAwMDUpXHJcbiAgICAgICAgICAgIHR4dD10eHQucmVwbGFjZSgnficsXCJcIisod2F2ZW51bWJlcisxKSlcclxuICAgICAgICAgICAgdGhpcy5XYXZlcy5nZXRDb21wb25lbnQoY2MuUmljaFRleHQpLnN0cmluZz10eHRcclxuICAgICAgICAgICAgdGhpcy5idC5nZXRDb21wb25lbnQoVGV4dExhbmd1YWdlKS5zZXRUZXh0SWQoODAwMDAxKVxyXG4gICAgICAgICAgICB0aGlzLmJ0MS5nZXRDb21wb25lbnQoVGV4dExhbmd1YWdlKS5zZXRUZXh0SWQoODAwMDAzKVxyXG4gICAgICAgICAgICB0aGlzLkJvc3NSdXNoX1RpbWVfQmcuYWN0aXZlPWZhbHNlXHJcbiAgICAgICAgICAgIHRoaXMuQm9zc1J1c2hfQnRuX0JvbnVzLmFjdGl2ZT10cnVlXHJcbiAgICAgICAgICAgIHRoaXMudGltZS5hY3RpdmU9ZmFsc2VcclxuICAgICAgICAgICAgdGhpcy5idG55ZXMuYWN0aXZlPXRydWVcclxuICAgICAgICB9IGVsc2UgaWYgKHRoaXMudHlwZSA9PSAzKSB7XHJcbiAgICAgICAgICAgIHRoaXMuYnRueWVzLmFjdGl2ZT10cnVlXHJcbiAgICAgICAgICAgIEZvbGxvd01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5mb2xsb3dFdmVudChGb2xsb3dfVHlwZS5CT1NT5oyR5oiY6aG16Z2i5bGV56S65qyh5pWwKTtcclxuICAgICAgICAgICAgdGhpcy5ib3NzLmFjdGl2ZSA9IHRydWVcclxuICAgICAgICAgICAgLy8gdGhpcy5Cb3NzUnVzaF9CdG5fUmVjb3JkLmFjdGl2ZSA9IHRydWVcclxuICAgICAgICAgICAgbGV0IFJvdGF0aW9uT3JkZXIgPSBVc2VySW5mby5nZXRJbnN0YW5jZSgpLlJvdGF0aW9uT3JkZXIvL+i9ruaNoumhuuW6j1xyXG4gICAgICAgICAgICBsZXQgU3RhZ2UgPSAxLy/pmLbmrrVcclxuICAgICAgICAgICAgdGhpcy5XYXZlcy5hY3RpdmU9ZmFsc2VcclxuICAgICAgICAgICAgbGV0IENoYWxsZW5nZUlEID0gUm90YXRpb25PcmRlciAqIDEwMDAgKyBTdGFnZS8v5oyR5oiYSURcclxuICAgICAgICAgICAgdGhpcy5iYmcuZ2V0Q29tcG9uZW50KGNjLlNwcml0ZSkuc3ByaXRlRnJhbWU9dGhpcy5ianNwcltCb3NzQ2hhbGxlbmdlTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldENoYXB0ZXJTY2VuZShDaGFsbGVuZ2VJRCldLy/mjaLog4zmma9cclxuICAgICAgICAgICAgRWxpdGVNb25zdGVyID0gRWxpdGVNb25zdGVyLmNvbmNhdChCb3NzQ2hhbGxlbmdlTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldE1vbnN0ZXJJZChDaGFsbGVuZ2VJRCkpLy/mgKrnialpZFxyXG4gICAgICAgICAgICB0aGlzLmJiZy55PTBcclxuICAgICAgICAgICAgbGV0IFNraWxsTnVtPU1vbnN0ZXJDb25maWd1cmVNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0U2tpbGxOdW0oRWxpdGVNb25zdGVyWzBdKVxyXG4gICAgICAgICAgICBmb3IgKGxldCBpbmRleCA9IDA7IGluZGV4IDwgdGhpcy5qaW5lbmcuY2hpbGRyZW4ubGVuZ3RoOyBpbmRleCsrKSB7XHJcbiAgICAgICAgICAgICAgICBpZihpbmRleDxTa2lsbE51bSl7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5qaW5lbmcuY2hpbGRyZW5baW5kZXhdLmFjdGl2ZT10cnVlXHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IHNwcml0ZWlkPShFbGl0ZU1vbnN0ZXJbMF0qMTAwMCkrKChpbmRleCsxKSoxMDApKzFcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmJvc3NzcHJpdGVpZD1FbGl0ZU1vbnN0ZXJbMF1cclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmppbmVuZy5jaGlsZHJlbltpbmRleF0uZ2V0Q29tcG9uZW50KGNjLlNwcml0ZSkuc3ByaXRlRnJhbWU9dGhpcy5jb3B5X3VpLmdldFNwcml0ZUZyYW1lKFwiTW9uc3RlclNraWxsX1wiK3Nwcml0ZWlkKVxyXG4gICAgICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5qaW5lbmcuY2hpbGRyZW5baW5kZXhdLmFjdGl2ZT1mYWxzZVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMuYnQuZ2V0Q29tcG9uZW50KFRleHRMYW5ndWFnZSkuc2V0VGV4dElkKDgyMDAwMSlcclxuICAgICAgICAgICAgdGhpcy5idDEuZ2V0Q29tcG9uZW50KFRleHRMYW5ndWFnZSkuc2V0VGV4dElkKDgyMDAwNSlcclxuICAgICAgICAgICAgdGhpcy5Cb3NzUnVzaF9UaW1lX0JnLmFjdGl2ZT10cnVlXHJcbiAgICAgICAgICAgIHRoaXMudGltZS5hY3RpdmU9dHJ1ZVxyXG5cclxuICAgICAgICAgICAgdGhpcy5Cb3NzUnVzaF9CdG5fQm9udXMuYWN0aXZlPXRydWVcclxuXHJcbiAgICAgICAgICAgIGxldCBSYW5rPVVzZXJJbmZvLmdldEluc3RhbmNlKCkuZGFtYWdlTnVtYmVyTGFzdC8v5piv5ZCm5LiK5o6S6KGM5qac5ZCN5qyhICDlvpfliLDlkI7lj7DmlbDmja5cclxuICAgICAgICAgICAgLy8gY29uc29sZS5sb2coXCI9PT09XCIsUmFuaylcclxuICAgICAgICAgICAgLy8gbGV0IHVpZCA9IFVzZXJEYXRhLmdldEluc3RhbmNlKCkuZ2V0VXNlcklEKCk7XHJcbiAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKFwiPT09PS0tLS1cIix1aWQpXHJcbiAgICAgICAgICAgIGxldCBSZXdhcmRHcmFkZT0tMS8v5o6S5ZCNICDpu5jorqQtMSAgXHJcbiAgICAgICAgICAgIGlmKFJhbms+LTEpe1xyXG4gICAgICAgICAgICAgICAgLy8gUmFuaz0tMS8v5L+u5pS55ZCO5Y+w5pWw5o2u5Li6MFxyXG4gICAgICAgICAgICAgICAgbGV0IHVpZCA9IFVzZXJEYXRhLmdldEluc3RhbmNlKCkuZ2V0VXNlcklEKCk7XHJcbiAgICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhcIj09PT0tLS0tXCIsdWlkKVxyXG4gICAgICAgICAgICAgICAgbGV0IGpzb249e1xyXG4gICAgICAgICAgICAgICAgICAgIHVpZDp1aWQsXHJcbiAgICAgICAgICAgICAgICAgICAgZGFtYWdlTnVtYmVyTGFzdDogLTEsXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBVc2VySW5mby5nZXRJbnN0YW5jZSgpLmRhbWFnZU51bWJlckxhc3Q9LTFcclxuICAgICAgICAgICAgICAgIEh0dHBNYW5hZ2VyLnBvc3QoQWNjZXNzTmFtZS51cGRhdGVVc2VySW5mb0ROTCxKU09OLnN0cmluZ2lmeShqc29uKSkudGhlbigoZGF0YTphbnkpPT57XHJcbiAgICAgICAgICAgICAgICAgICAgaWYoUmFuaz09MCl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFJld2FyZEdyYWRlPTdcclxuICAgICAgICAgICAgICAgICAgICB9ZWxzZSBpZihSYW5rPT0xKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgUmV3YXJkR3JhZGU9MVxyXG4gICAgICAgICAgICAgICAgICAgIH1lbHNlIGlmKFJhbms9PTIpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBSZXdhcmRHcmFkZT0yXHJcbiAgICAgICAgICAgICAgICAgICAgfWVsc2UgaWYoUmFuaz09Myl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFJld2FyZEdyYWRlPTNcclxuICAgICAgICAgICAgICAgICAgICB9ZWxzZSBpZihSYW5rPD0xMCYmUmFuaz49NCl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFJld2FyZEdyYWRlPTRcclxuICAgICAgICAgICAgICAgICAgICB9ZWxzZSBpZihSYW5rPD01MCYmUmFuaz49MTEpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBSZXdhcmRHcmFkZT01XHJcbiAgICAgICAgICAgICAgICAgICAgfWVsc2UgaWYoUmFuazw9MTAwJiZSYW5rPj01MSl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFJld2FyZEdyYWRlPTZcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IHJld2FyZERhdGE9IEJvc3NXZWVrbHlSZXdhcmRNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0Rmlyc3RSZXdhcmRBcnIoUmV3YXJkR3JhZGUpXHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IGl0ZW1hcnI9W11cclxuICAgICAgICAgICAgICAgICAgICBmb3IgKGxldCBpbmRleCA9IDA7IGluZGV4IDwgcmV3YXJkRGF0YS5sZW5ndGg7IGluZGV4KyspIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGl0ZW1zPVByb3BNYW5hZ2VyLmdldEluc3RhbmNlKCkuY3JlYXRlUHJvcEl0ZW0ocmV3YXJkRGF0YVtpbmRleF0ucmV3YXJkX2lkLHJld2FyZERhdGFbaW5kZXhdLnJld2FyZF9udW0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpdGVtYXJyLnB1c2goaXRlbXMpXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIEdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuc2hvd011bHRpcGxlR2V0VGlwKGl0ZW1hcnIpO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIGlmKGRhdGEudWlkKXtcclxuICAgICAgICAgICAgICAgICAgICAvLyB9XHJcbiAgICAgICAgICAgICAgICB9KS5jYXRjaCgoZXJyb3IpPT57XHJcbiAgICAgICAgICAgICAgICAgICAgY2MuZXJyb3IoZXJyb3IpO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAvLyBIdHRwTWFuYWdlci5wb3N0KEFjY2Vzc05hbWUudXBkYXRlVXNlckluZm9ETkwsdGhpcy5zZXRSYW5rSnNvblN0cmluZygpKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1lbHNlIGlmICh0aGlzLnR5cGUgPT0gNCkge1xyXG4gICAgICAgICAgICB0aGlzLmJvc3MuYWN0aXZlID0gZmFsc2VcclxuICAgICAgICAgICAgdGhpcy54dmtvbi5hY3RpdmU9dHJ1ZVxyXG4gICAgICAgICAgICB0aGlzLldhdmVzLmFjdGl2ZT1mYWxzZVxyXG4gICAgICAgICAgICB0aGlzLlByb21vdGlvbi5hY3RpdmU9ZmFsc2VcclxuICAgICAgICAgICAgdGhpcy5vbmUuYWN0aXZlPWZhbHNlXHJcbiAgICAgICAgICAgIHRoaXMuUmFua2luZ1NlbGYuYWN0aXZlPWZhbHNlXHJcbiAgICAgICAgICAgIHRoaXMuQm9zc1J1c2hfQnRuX1JhbmsuYWN0aXZlPWZhbHNlXHJcbiAgICAgICAgICAgIHRoaXMuQm9zc1J1c2hfQnRuX0JvbnVzLmFjdGl2ZT1mYWxzZVxyXG4gICAgICAgICAgICB0aGlzLk1hemVfQnRuX1Nob3AuYWN0aXZlPXRydWVcclxuICAgICAgICAgICAgdGhpcy5Cb3NzUnVzaF9UaW1lX0JnLmFjdGl2ZT1mYWxzZVxyXG4gICAgICAgICAgICB0aGlzLnRpbWUuYWN0aXZlPWZhbHNlXHJcbiAgICAgICAgICAgIHRoaXMuYmJnLnk9MjgwXHJcbiAgICAgICAgICAgIHRoaXMuYmJnLmdldENvbXBvbmVudChjYy5TcHJpdGUpLnNwcml0ZUZyYW1lPXRoaXMuYmpzcHJ4dmtvblxyXG4gICAgICAgICAgICB0aGlzLmJ0LmdldENvbXBvbmVudChUZXh0TGFuZ3VhZ2UpLnNldFRleHRJZCg4MzAwMDEpXHJcbiAgICAgICAgICAgIHRoaXMuYnQxLmdldENvbXBvbmVudChUZXh0TGFuZ3VhZ2UpLnNldFRleHRJZCg4MjAwMDUpXHJcbiAgICAgICAgICAgIGZvciAobGV0IGNvbnRlbnRpbmRleCA9IDA7IGNvbnRlbnRpbmRleCA8IHRoaXMuY29udGVudC5jaGlsZHJlbi5sZW5ndGg7IGNvbnRlbnRpbmRleCsrKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgbXljb250ZW50aW5kZXg9Y29udGVudGluZGV4XHJcbiAgICAgICAgICAgICAgICBpZihteWNvbnRlbnRpbmRleD09MCl7XHJcbiAgICAgICAgICAgICAgICAgICAgbXljb250ZW50aW5kZXg9OFxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgaWYobXljb250ZW50aW5kZXg9PTkpe1xyXG4gICAgICAgICAgICAgICAgICAgIG15Y29udGVudGluZGV4PTFcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGxldCBpZD1Sb2d1ZUdpZnRJbmZvcm1hdGlvbk1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRQcm9wSURfMSgobXljb250ZW50aW5kZXgpKVxyXG4gICAgICAgICAgICAgICAgbGV0IGl0ZW09UHJvcE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5jcmVhdGVQcm9wSXRlbShpZCwwKTtcclxuICAgICAgICAgICAgICAgIGl0ZW0ucGFyZW50PXRoaXMuY29udGVudC5jaGlsZHJlbltjb250ZW50aW5kZXhdLmNoaWxkcmVuWzBdXHJcblxyXG4gICAgICAgICAgICAgICAgbGV0IGlkMT1Sb2d1ZUdpZnRJbmZvcm1hdGlvbk1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRQcm9wSURfMigobXljb250ZW50aW5kZXgpKVxyXG4gICAgICAgICAgICAgICAgbGV0IGl0ZW0xPVByb3BNYW5hZ2VyLmdldEluc3RhbmNlKCkuY3JlYXRlUHJvcEl0ZW0oaWQxLDApO1xyXG4gICAgICAgICAgICAgICAgaXRlbTEucGFyZW50PXRoaXMuY29udGVudC5jaGlsZHJlbltjb250ZW50aW5kZXhdLmNoaWxkcmVuWzFdXHJcblxyXG4gICAgICAgICAgICAgICAgbGV0IGlkMj1Sb2d1ZUdpZnRJbmZvcm1hdGlvbk1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRQcm9wSURfMygobXljb250ZW50aW5kZXgpKVxyXG4gICAgICAgICAgICAgICAgbGV0IGl0ZW0yPVByb3BNYW5hZ2VyLmdldEluc3RhbmNlKCkuY3JlYXRlUHJvcEl0ZW0oaWQyLDApO1xyXG4gICAgICAgICAgICAgICAgaXRlbTIucGFyZW50PXRoaXMuY29udGVudC5jaGlsZHJlbltjb250ZW50aW5kZXhdLmNoaWxkcmVuWzJdXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZm9yIChsZXQgaW5kZXggPSAwOyBpbmRleCA8IHRoaXMucG9zLmNoaWxkcmVuLmxlbmd0aDsgaW5kZXgrKykge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5oZXJvU2hhZG93LmNoaWxkcmVuW2luZGV4XS5hY3RpdmUgPSBmYWxzZVxyXG4gICAgICAgICAgICAgICAgdGhpcy5wb3MuY2hpbGRyZW5baW5kZXhdLmFjdGl2ZSA9IGZhbHNlXHJcbiAgICAgICAgICAgIH0gICBcclxuICAgICAgICAgICAgbGV0IGluZGV4PXRoaXMuUGFnZVZpZXcuZ2V0Q29tcG9uZW50KGNjLlBhZ2VWaWV3KS5nZXRDdXJyZW50UGFnZUluZGV4KClcclxuICAgICAgICAgICAgaWYoaW5kZXg9PTEpe1xyXG4gICAgICAgICAgICAgICAgdGhpcy5idDEuZ2V0Q29tcG9uZW50KFRleHRMYW5ndWFnZSkuc2V0VGV4dElkKDEwMDA1MylcclxuICAgICAgICAgICAgICAgIHRoaXMuYnQxLmdldENvbXBvbmVudChUZXh0TGFuZ3VhZ2UpLnNldFJlcGxhY2VWYWx1ZSgnficsKGluZGV4KSsgJycpO1xyXG4gICAgICAgICAgICAgICAgbGV0IGRhbWFnZT1UaGVTdG9yYWdlTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldE51bWJlcihTdG9yYWdlS2V5LlZvaWRDcmFja0NoYWxsZW5nZURhbWFnZSwwKTtcclxuICAgICAgICAgICAgICAgIGxldCBudW0gPSBUaGVTdG9yYWdlTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldE51bWJlcihTdG9yYWdlS2V5LlZvaWRDcmFja0NoYWxsZW5nZVRpbWVzLDMpO1xyXG4gICAgICAgICAgICAgICAgaWYoKGRhbWFnZSsxKT49aW5kZXgpe1xyXG4gICAgICAgICAgICAgICAgICAgIGlmKGluZGV4PT0oZGFtYWdlKzEpKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5idG5uby5hY3RpdmU9ZmFsc2VcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5idG55ZXMuYWN0aXZlPXRydWVcclxuICAgICAgICAgICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYobnVtPjApe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5idG5uby5hY3RpdmU9dHJ1ZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuYnRubm8uYWN0aXZlPWZhbHNlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5idG55ZXMuYWN0aXZlPXRydWVcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmJ0bm5vLmFjdGl2ZT1mYWxzZVxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYnRueWVzLmFjdGl2ZT1mYWxzZVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgIHRoaXMuY29udGVudC54PS04MjVcclxuICAgICAgICAgICAgICAgIHRoaXMuUGFnZVZpZXcuZ2V0Q29tcG9uZW50KGNjLlBhZ2VWaWV3KS5zY3JvbGxUb1BhZ2UoMSwwLjAxKVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVyblxyXG4gICAgICAgIH1cclxuICAgICAgICAvL+eUn+aIkOaAqueJqVxyXG4gICAgICAgIGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCB0aGlzLnBvcy5jaGlsZHJlbi5sZW5ndGg7IGluZGV4KyspIHtcclxuICAgICAgICAgICAgdGhpcy5oZXJvU2hhZG93LmNoaWxkcmVuW2luZGV4XS5hY3RpdmUgPSBmYWxzZVxyXG4gICAgICAgICAgICB0aGlzLnBvcy5jaGlsZHJlbltpbmRleF0uYWN0aXZlID0gZmFsc2VcclxuICAgICAgICAgICAgaWYgKGluZGV4IDwgRWxpdGVNb25zdGVyLmxlbmd0aCkge1xyXG4gICAgICAgICAgICAgICAgbGV0IGVsaXRldHlwZSA9IE1vbnN0ZXJDb25maWd1cmVNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0TW9uc3RlckNsYXNzKEVsaXRlTW9uc3RlcltpbmRleF0pO1xyXG4gICAgICAgICAgICAgICAgbGV0IHBhdGggPSBcIm1vbnN0ZXIvdWkvTW9uc3Rlcl9cIiArIGVsaXRldHlwZTtcclxuICAgICAgICAgICAgICAgIGxldCBub2RlOiBjYy5Ob2RlID0gbnVsbDtcclxuICAgICAgICAgICAgICAgIGNjLnJlc291cmNlcy5sb2FkKHBhdGgsIGNjLlByZWZhYiwgKGVycm9yOiBFcnJvciwgYXNzZXRzOiBjYy5QcmVmYWIpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoZXJyb3IpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2MubG9nKGVycm9yKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBub2RlID0gY2MuaW5zdGFudGlhdGUoYXNzZXRzKTtcclxuICAgICAgICAgICAgICAgICAgICBub2RlLnNldFBvc2l0aW9uKDAsIDAsIDApXHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IGlkID0gRWxpdGVNb25zdGVyW2luZGV4XVxyXG4gICAgICAgICAgICAgICAgICAgIG5vZGUuc2NhbGUgPSBNb25zdGVyQ29uZmlndXJlTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldFNjYWxlKGlkKTtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgU3RyZW5ndGhUeXBlID0gTW9uc3RlckNvbmZpZ3VyZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRTdHJlbmd0aFR5cGUoaWQpXHJcbiAgICAgICAgICAgICAgICAgICAgbm9kZS5wYXJlbnQgPSB0aGlzLnBvcy5jaGlsZHJlbltpbmRleF1cclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmhlcm9TaGFkb3cuY2hpbGRyZW5baW5kZXhdLmFjdGl2ZSA9IHRydWVcclxuICAgICAgICAgICAgICAgICAgICBpZiAoU3RyZW5ndGhUeXBlID09IDMpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5oZXJvU2hhZG93LmNoaWxkcmVuW2luZGV4XS5zZXRTY2FsZSgxLjMsIDEuMylcclxuICAgICAgICAgICAgICAgICAgICAgICAgbm9kZS5zY2FsZSA9IE1vbnN0ZXJDb25maWd1cmVNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0U2NhbGUoaWQpICogMTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbm9kZS5nZXRDb21wb25lbnQoc3AuU2tlbGV0b24pLnNldEFuaW1hdGlvbigwLCBNb25zdGVyQWN0aW9uTmFtZS5JZGxlLCB0cnVlKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKFN0cmVuZ3RoVHlwZSA9PSAyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuaGVyb1NoYWRvdy5jaGlsZHJlbltpbmRleF0uc2V0U2NhbGUoMC43LCAwLjcpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG5vZGUuc2NhbGUgPSBNb25zdGVyQ29uZmlndXJlTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldFNjYWxlKGlkKSAqIDE7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG5vZGUuZ2V0Q29tcG9uZW50KHNwLlNrZWxldG9uKS5zZXRTa2luKE1vbnN0ZXJGYWNlTmFtZS5TaWRlUiArIE1vbnN0ZXJDb25maWd1cmVNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0U2tpbihpZCkpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBub2RlLmdldENvbXBvbmVudChzcC5Ta2VsZXRvbikuc2V0QW5pbWF0aW9uKDAsIE1vbnN0ZXJGYWNlTmFtZS5TaWRlUiArIFwiX1wiICsgTW9uc3RlckFjdGlvbk5hbWUuSWRsZSwgdHJ1ZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChTdHJlbmd0aFR5cGUgPT0gMSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmhlcm9TaGFkb3cuY2hpbGRyZW5baW5kZXhdLnNldFNjYWxlKDAuNCwgMC40KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBub2RlLnNjYWxlID0gTW9uc3RlckNvbmZpZ3VyZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRTY2FsZShpZCkgKiAxO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBub2RlLmdldENvbXBvbmVudChzcC5Ta2VsZXRvbikuc2V0U2tpbihNb25zdGVyRmFjZU5hbWUuU2lkZVIgKyBNb25zdGVyQ29uZmlndXJlTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldFNraW4oaWQpKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbm9kZS5nZXRDb21wb25lbnQoc3AuU2tlbGV0b24pLnNldEFuaW1hdGlvbigwLCBNb25zdGVyRmFjZU5hbWUuU2lkZVIgKyBcIl9cIiArIE1vbnN0ZXJBY3Rpb25OYW1lLklkbGUsIHRydWUpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5wb3MuY2hpbGRyZW5baW5kZXhdLmFjdGl2ZSA9IHRydWVcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICAvL+eOqeWutuaOkuWQjVxyXG4gICAgICAgIGxldCBzZWxmcmFua2luZyA9IC0xXHJcbiAgICAgICAgbGV0IGNvbWJhdFBvd2VyID0gMFxyXG4gICAgICAgIGlmICh0aGlzLnR5cGUgPT0gMikge1xyXG4gICAgICAgICAgICBjb21iYXRQb3dlciA9IEVuZGxlc3NMZXZlbHNNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0TWF4V2F2ZSgpLy9IZXJvTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldEFsbEhlcm9aaGFubGkoKS8v6I635Y+W5rOi5pWwXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh0aGlzLnR5cGUgPT0gMykge1xyXG4gICAgICAgICAgICBjb21iYXRQb3dlciA9IEJvc3NDaGFsbGVuZ2VNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0TWF4RGFtYWdlTnVtYmVyKCkvL+iOt+WPluS8pOWus1xyXG4gICAgICAgIH1cclxuICAgICAgICBsZXQgQ29tYmF0UG93ZXIgPSB0aGlzLlJhbmtpbmdTZWxmLmdldENoaWxkQnlOYW1lKFwiQ29tYmF0UG93ZXJcIilcclxuICAgICAgICBsZXQgU2VyaWFsTm8gPSB0aGlzLlJhbmtpbmdTZWxmLmdldENoaWxkQnlOYW1lKFwiU2VyaWFsTm9cIilcclxuICAgICAgICBsZXQgbmFtZSA9IHRoaXMuUmFua2luZ1NlbGYuZ2V0Q2hpbGRCeU5hbWUoXCJuYW1lXCIpXHJcbiAgICAgICAgbGV0IGJ0bkF2YXRhciA9IHRoaXMuUmFua2luZ1NlbGYuZ2V0Q2hpbGRCeU5hbWUoXCJoZWFkUG9ydHJhaXRcIikuZ2V0Q2hpbGRCeU5hbWUoXCJidG5BdmF0YXJcIilcclxuICAgICAgICBDb21iYXRQb3dlci5nZXRDb21wb25lbnQoVGV4dExhbmd1YWdlKS5zZXRUZXh0SWQodGhpcy50ZXh0W3RoaXMudHlwZSAtIDFdKS8v5piv5ZOq5Liq5o6S6KGM5qacXHJcbiAgICAgICAgQ29tYmF0UG93ZXIuZ2V0Q29tcG9uZW50KFRleHRMYW5ndWFnZSkuc2V0UmVwbGFjZVZhbHVlKCd+JywgKGNvbWJhdFBvd2VyKSArICcnKTsvL+aOkuihjOamnOaImOWKm+aVsOaNrlxyXG4gICAgICAgIHRoaXMuUHJvbW90aW9uLmFjdGl2ZT1mYWxzZVxyXG4gICAgICAgIHRoaXMub25lLmFjdGl2ZT1mYWxzZVxyXG4gICAgICAgIFNlcmlhbE5vLmFjdGl2ZT1mYWxzZVxyXG4gICAgICAgIHRoaXMuUmFua2luZ1NlbGYuZ2V0Q2hpbGRCeU5hbWUoXCJOb3RsaXN0ZWRcIikuYWN0aXZlID1mYWxzZVxyXG4gICAgICAgIHRoaXMuUmFua2luZ1NlbGYuZ2V0Q29tcG9uZW50KGNjLlNwcml0ZSkuc3ByaXRlRnJhbWU9dGhpcy5jb3B5X3VpLmdldFNwcml0ZUZyYW1lKFwiQm9zc1J1c2hfUmFua180XCIpXHJcbiAgICAgICAgSHR0cE1hbmFnZXIucG9zdChBY2Nlc3NOYW1lLmxlYWRlcmJvYXJkQnlVc2VyLCB0aGlzLmdldExlYWRlcmJvYXJkQnlVc2VySnNvblN0cmluZyh0aGlzLnR5cGUpLCB0cnVlKS50aGVuKChkYXRhOiBhbnkpID0+IHtcclxuICAgICAgICAgICAgbGV0IG1heCA9IGRhdGEubGVuZ3RoO1xyXG4gICAgICAgICAgICBmb3IgKGxldCBpbmRleCA9IDA7IGluZGV4IDwgbWF4OyBpbmRleCsrKSB7XHJcbiAgICAgICAgICAgICAgICBpZihkYXRhW2luZGV4XS51aWQ9PVVzZXJEYXRhLmdldEluc3RhbmNlKCkuZ2V0VXNlcklEKCkpeyAgICAvL+WmguaenOWcqOWQjuWPsOaLieWPlueahOaOkuWQjeS4reaciWlk6Lef546p5a6255qEaWTkuIDmoLfvvIzpgqPkuYjnjqnlrrbnmoTmjpLlkI3lnKjliY0xMDDlkI3kuK0gIOWwhuaYvuekuueOqeWutuaOkuWQjSAgIOWQpuWImeaYvuekuuacquS4iuamnFxyXG4gICAgICAgICAgICAgICAgICAgIHNlbGZyYW5raW5nPShpbmRleCsxKVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmKHNlbGZyYW5raW5nPT0xKXtcclxuICAgICAgICAgICAgICAgIHRoaXMub25lLmFjdGl2ZT10cnVlXHJcbiAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgbGV0IHR4dD1MYW5ndWFnZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRTdHJCeVRleHRJZCg4MDAwMDQpXHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy50eXBlID09IDIpIHtcclxuICAgICAgICAgICAgICAgICAgICB0eHQ9TGFuZ3VhZ2VNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0U3RyQnlUZXh0SWQoODAwMDA0KS8v6L6+5Yiw5aSa5bCR5rOi77yM5Y+v5pmL5Y2H6Iez5aSa5bCR5ZCNICAgXHJcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHRoaXMudHlwZSA9PSAzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdHh0PUxhbmd1YWdlTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldFN0ckJ5VGV4dElkKDgyMDAwNykvL+i+vuWIsOWkmuWwkeS8pOWus++8jOWPr+aZi+WNh+iHs+WkmuWwkeWQjVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgaWYoZGF0YS5sZW5ndGg+MCl7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYoc2VsZnJhbmtpbmc9PS0xKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdHh0PXR4dC5yZXBsYWNlKCd+eCcsXCJcIitkYXRhW21heC0xXS52YWx1ZSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgdHh0PXR4dC5yZXBsYWNlKCd+eScsXCJcIittYXgpXHJcbiAgICAgICAgICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHR4dD10eHQucmVwbGFjZSgnfngnLFwiXCIrZGF0YVtzZWxmcmFua2luZy0yXS52YWx1ZSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgdHh0PXR4dC5yZXBsYWNlKCd+eScsXCJcIisoc2VsZnJhbmtpbmctMSkpXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuUHJvbW90aW9uLmdldENvbXBvbmVudChjYy5SaWNoVGV4dCkuc3RyaW5nPXR4dDsvL+i+vuWIsOWkmuWwkeazou+8jOWPr+aZi+WNh+iHs+WkmuWwkeWQjSAgIFxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuUHJvbW90aW9uLmFjdGl2ZT10cnVlXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKHNlbGZyYW5raW5nPD0zJiZzZWxmcmFua2luZz49MSkge1xyXG4gICAgICAgICAgICAgICAgU2VyaWFsTm8uYWN0aXZlID0gZmFsc2VcclxuICAgICAgICAgICAgICAgIHRoaXMuUmFua2luZ1NlbGYuZ2V0Q29tcG9uZW50KGNjLlNwcml0ZSkuc3ByaXRlRnJhbWU9dGhpcy5jb3B5X3VpLmdldFNwcml0ZUZyYW1lKFwiQm9zc1J1c2hfUmFua19cIitzZWxmcmFua2luZykgLy/liY3kuInlkI3nmoTog4zmma/kuI3kuIDmoLdcclxuICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICBpZihzZWxmcmFua2luZz49MSl7XHJcbiAgICAgICAgICAgICAgICAgICAgU2VyaWFsTm8uYWN0aXZlID0gdHJ1ZVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgdGhpcy5SYW5raW5nU2VsZi5nZXRDb21wb25lbnQoY2MuU3ByaXRlKS5zcHJpdGVGcmFtZT10aGlzLmNvcHlfdWkuZ2V0U3ByaXRlRnJhbWUoXCJCb3NzUnVzaF9SYW5rXzRcIilcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAoc2VsZnJhbmtpbmcgPT0gLTEpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuUmFua2luZ1NlbGYuZ2V0Q2hpbGRCeU5hbWUoXCJOb3RsaXN0ZWRcIikuYWN0aXZlID0gdHJ1ZVxyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgU2VyaWFsTm8uZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmcgPSBcIlwiICsgKHNlbGZyYW5raW5nKS8v5bqP5Y+3XHJcbiAgICAgICAgICAgICAgICB0aGlzLlJhbmtpbmdTZWxmLmdldENoaWxkQnlOYW1lKFwiTm90bGlzdGVkXCIpLmFjdGl2ZSA9IGZhbHNlXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgICAgICBsZXQgbXluYW1lID0gVXNlckRhdGEuZ2V0SW5zdGFuY2UoKS5nZXRVc2VyTmFtZSgpOyAvL+eOqeWutuWQjeWtl1xyXG4gICAgICAgIGxldCBzcGhlYSA9IFVzZXJEYXRhLmdldEluc3RhbmNlKCkuZ2V0VXNlckF2YXRhcigpOy8v546p5a625aS05YOPXHJcbiAgICAgICAgbmFtZS5nZXRDb21wb25lbnQoY2MuTGFiZWwpLnN0cmluZyA9IFwiXCIgKyBteW5hbWUvL+eOqeWutuWQjeWtl1xyXG4gICAgICAgIGJ0bkF2YXRhci5nZXRDb21wb25lbnQoY2MuU3ByaXRlKS5zcHJpdGVGcmFtZSA9IFByb3BNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0U3BoZWFkUG9ydHJhaXRUeXBlKHNwaGVhKS8v5aS05YOPaWRcclxuICAgIH1cclxuICAgIGRlcygpIHsvL+a4hemZpOaJgOacieaAqueJqeeahOmihOWItuS9ky5cclxuICAgICAgICBpZih0aGlzLnR5cGU9PTQpey8v5riF6Zmk6Jma56m66KOC57yd55qE56ug6IqC5aWW5YqxXHJcbiAgICAgICAgICAgIGZvciAobGV0IGNvbnRlbnRpbmRleCA9IDA7IGNvbnRlbnRpbmRleCA8IHRoaXMuY29udGVudC5jaGlsZHJlbi5sZW5ndGg7IGNvbnRlbnRpbmRleCsrKSB7XHJcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBpbmRleCA9IDA7IGluZGV4IDwgMzsgaW5kZXgrKykge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmKHRoaXMuY29udGVudC5jaGlsZHJlbltjb250ZW50aW5kZXhdLmNoaWxkcmVuW2luZGV4XS5jaGlsZHJlbkNvdW50PjApe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmNvbnRlbnQuY2hpbGRyZW5bY29udGVudGluZGV4XS5jaGlsZHJlbltpbmRleF0uZGVzdHJveUFsbENoaWxkcmVuKClcclxuICAgICAgICAgICAgICAgICAgICB9IFxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgIGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCB0aGlzLnBvcy5jaGlsZHJlbi5sZW5ndGg7IGluZGV4KyspIHtcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLnBvcy5jaGlsZHJlbltpbmRleF0uY2hpbGRyZW4ubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMucG9zLmNoaWxkcmVuW2luZGV4XS5kZXN0cm95QWxsQ2hpbGRyZW4oKVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgY2xpY2tCdG5NYXplX0NoYW5nZShldmVuLGkpey8v5YiH5o2i56ug6IqC55qE5oyJ6ZKuICAwOuW3piAgIDHvvJrlj7NcclxuICAgICAgICBsZXQgaW5kZXg9dGhpcy5QYWdlVmlldy5nZXRDb21wb25lbnQoY2MuUGFnZVZpZXcpLmdldEN1cnJlbnRQYWdlSW5kZXgoKVxyXG4gICAgICAgIGlmKGk9PTApe1xyXG4gICAgICAgICAgICBpbmRleC0tXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmKGk9PTEpe1xyXG4gICAgICAgICAgICBpbmRleCsrXHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuUGFnZVZpZXcuZ2V0Q29tcG9uZW50KGNjLlBhZ2VWaWV3KS5zY3JvbGxUb1BhZ2UoaW5kZXgsMC4zKVxyXG4gICAgfVxyXG4gICAgLy8g5rOo5oSP5Y+C5pWw55qE6aG65bqP5ZKM57G75Z6L5piv5Zu65a6a55qEXHJcbiAgICBQYWdlVmlld2NhbGxiYWNrKCkge1xyXG4gICAgICAgIGxldCBpbmRleD10aGlzLlBhZ2VWaWV3LmdldENvbXBvbmVudChjYy5QYWdlVmlldykuZ2V0Q3VycmVudFBhZ2VJbmRleCgpXHJcbiAgICAgICAgaWYoaW5kZXg9PTApe1xyXG4gICAgICAgICAgICB0aGlzLmNvbnRlbnQueD0tNDY3NVxyXG4gICAgICAgICAgICB0aGlzLlBhZ2VWaWV3LmdldENvbXBvbmVudChjYy5QYWdlVmlldykuc2Nyb2xsVG9QYWdlKDgsMC4wMSlcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYoaW5kZXg9PTkpe1xyXG4gICAgICAgICAgICB0aGlzLmNvbnRlbnQueD0tODI1XHJcbiAgICAgICAgICAgIHRoaXMuUGFnZVZpZXcuZ2V0Q29tcG9uZW50KGNjLlBhZ2VWaWV3KS5zY3JvbGxUb1BhZ2UoMSwwLjAxKVxyXG4gICAgICAgIH1cclxuICAgICAgICBpbmRleD10aGlzLlBhZ2VWaWV3LmdldENvbXBvbmVudChjYy5QYWdlVmlldykuZ2V0Q3VycmVudFBhZ2VJbmRleCgpXHJcbiAgICAgICAgdGhpcy5idDEuZ2V0Q29tcG9uZW50KFRleHRMYW5ndWFnZSkuc2V0VGV4dElkKDEwMDA1MylcclxuICAgICAgICB0aGlzLmJ0MS5nZXRDb21wb25lbnQoVGV4dExhbmd1YWdlKS5zZXRSZXBsYWNlVmFsdWUoJ34nLChpbmRleCkrICcnKTtcclxuXHJcbiAgICAgICAgbGV0IGRhbWFnZT1UaGVTdG9yYWdlTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldE51bWJlcihTdG9yYWdlS2V5LlZvaWRDcmFja0NoYWxsZW5nZURhbWFnZSwwKTtcclxuICAgICAgICBsZXQgbnVtID0gVGhlU3RvcmFnZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXROdW1iZXIoU3RvcmFnZUtleS5Wb2lkQ3JhY2tDaGFsbGVuZ2VUaW1lcywzKTtcclxuICAgICAgICBpZigoZGFtYWdlKzEpPj1pbmRleCl7XHJcbiAgICAgICAgICAgIGlmKGluZGV4PT0oZGFtYWdlKzEpKXtcclxuICAgICAgICAgICAgICAgIHRoaXMuYnRubm8uYWN0aXZlPWZhbHNlXHJcbiAgICAgICAgICAgICAgICB0aGlzLmJ0bnllcy5hY3RpdmU9dHJ1ZVxyXG4gICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgIGlmKG51bT4wKXtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmJ0bm5vLmFjdGl2ZT10cnVlXHJcbiAgICAgICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmJ0bm5vLmFjdGl2ZT1mYWxzZVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICB0aGlzLmJ0bnllcy5hY3RpdmU9dHJ1ZVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgIHRoaXMuYnRubm8uYWN0aXZlPWZhbHNlXHJcbiAgICAgICAgICAgIHRoaXMuYnRueWVzLmFjdGl2ZT1mYWxzZVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIGNsaWNrQnRuQ2xvc2UoKS8v5YWz6ZetXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy5kZXMoKVxyXG4gICAgICAgIEdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuc291bmRfbWFuYWdlci5wbGF5U291bmQoU291bmRJbmRleC5jbGljayk7XHJcbiAgICAgICAgdGhpcy5vbkNsb3NlKCk7XHJcbiAgICB9XHJcblxyXG4gICAgY2xpY2tCdG5QbGF5aW5zdHJ1Y3Rpb25zKCl7Ly/njqnms5Xor7TmmI5cclxuICAgICAgICBVSU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zaG93VWlEaWFsb2coVUlQYXRoLlBsYXlpbnNUcnVjdGlvbnMsVUlMYXllckxldmVsLlR3byx7b25Db21wbGV0ZWQ6KHVpTm9kZSk9PiB7XHJcbiAgICAgICAgICAgIHVpTm9kZS5nZXRDb21wb25lbnQocGxheWluc3RydWN0aW9ucykuaW5pdCh7XHJcbiAgICAgICAgICAgICAgICBvbkNsb3NlOigpPT57XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIHVpTm9kZS5nZXRDb21wb25lbnQocGxheWluc3RydWN0aW9ucykuaW5pdFVpKHRoaXMudHlwZSkvLzI65peg5bC95oyR5oiYICAgM++8mmJvc3PmjJHmiJhcclxuICAgICAgICB9LH0pO1xyXG4gICAgfVxyXG4gICAgY2xpY2tCdG5SZXdhcmREaXNwbGF5KCl7Ly/lpZblirHlsZXnpLpcclxuICAgICAgICBVSU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zaG93VWlEaWFsb2coVUlQYXRoLlJld2FyZERpc3BsYXksVUlMYXllckxldmVsLlR3byx7b25Db21wbGV0ZWQ6KHVpTm9kZSk9PiB7XHJcbiAgICAgICAgICAgIHVpTm9kZS5nZXRDb21wb25lbnQocmV3YXJkZGlzcGxheSkuaW5pdCh7XHJcbiAgICAgICAgICAgICAgICBvbkNsb3NlOigpPT57XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIHVpTm9kZS5nZXRDb21wb25lbnQocmV3YXJkZGlzcGxheSkuaW5pdFVpKHRoaXMudHlwZSkvLzI65peg5bC95oyR5oiYICAgM++8mmJvc3PmjJHmiJhcclxuICAgICAgICB9LH0pO1xyXG4gICAgfVxyXG4gICAgY2xpY2tCdG5SYW5raW5nTGlzdCgpe1xyXG4gICAgICAgIGlmKHRoaXMudHlwZT09Mil7XHJcbiAgICAgICAgICAgIEZvbGxvd01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5mb2xsb3dFdmVudChGb2xsb3dfVHlwZS7ml6DlsL3mjJHmiJhf5o6S6KGM5qac54K55Ye75qyh5pWwKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYodGhpcy50eXBlPT0zKXtcclxuICAgICAgICAgICAgRm9sbG93TWFuYWdlci5nZXRJbnN0YW5jZSgpLmZvbGxvd0V2ZW50KEZvbGxvd19UeXBlLkJPU1PmjJHmiJhf5o6S6KGM5qac54K55Ye75qyh5pWwKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgVUlNYW5hZ2VyLmdldEluc3RhbmNlKCkuc2hvd1VpRGlhbG9nKFVJUGF0aC5SYW5raW5nTGlzdCxVSUxheWVyTGV2ZWwuVHdvLHtvbkNvbXBsZXRlZDoodWlOb2RlKT0+IHtcclxuICAgICAgICAgICAgdWlOb2RlLmdldENvbXBvbmVudChSYW5raW5nTGlzdCkuaW5pdFVpKHRoaXMudHlwZSlcclxuICAgICAgICB9LH0pOy8v5o6S6KGM5qacXHJcbiAgICB9XHJcbiAgICBjbGlja0J0blNraWxsRGVzY3JpcHRpb24oZSxpKXsvL2Jvc3PmioDog71cclxuICAgICAgICB0aGlzLlNraWxsRGVzY3JpcHRpb24ueD0wXHJcbiAgICAgICAgaWYoZS5jdXJyZW50VGFyZ2V0Lng8MCl7XHJcbiAgICAgICAgICAgIHRoaXMuU2tpbGxEZXNjcmlwdGlvbi54PShlLmN1cnJlbnRUYXJnZXQueCsxNzMpXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmKGUuY3VycmVudFRhcmdldC54PjApe1xyXG4gICAgICAgICAgICB0aGlzLlNraWxsRGVzY3JpcHRpb24ueD0oZS5jdXJyZW50VGFyZ2V0LngtMTczKVxyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLlNraWxsRGVzY3JpcHRpb24uYWN0aXZlPXRydWVcclxuICAgICAgICBsZXQgc3ByaXRlaWQ9KHRoaXMuYm9zc3Nwcml0ZWlkKjEwMDApKyhpKjEwMCkrMVxyXG4gICAgICAgIHRoaXMuU2tpbGxEZXNjcmlwdGlvbi5nZXRDaGlsZEJ5TmFtZShcImJ0XCIpLmdldENvbXBvbmVudChUZXh0TGFuZ3VhZ2UpLnNldFRleHRJZChNb25zdGVyU2tpbGxNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0U2tpbGxJbnRybyhzcHJpdGVpZCkpXHJcbiAgICAgICAgdGhpcy5zY2hlZHVsZU9uY2UoZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgICAgIHRoaXMuU2tpbGxEZXNjcmlwdGlvbi5nZXRDaGlsZEJ5TmFtZShcIkNvbW1vbl9UZXh0QkdcIikuaGVpZ2h0PSh0aGlzLlNraWxsRGVzY3JpcHRpb24uZ2V0Q2hpbGRCeU5hbWUoXCJidFwiKS5oZWlnaHQrNTApXHJcbiAgICAgICAgICAgICAgICB0aGlzLlNraWxsRGVzY3JpcHRpb24uZ2V0Q2hpbGRCeU5hbWUoXCJDb21tb25fVGV4dEJHXCIpLmFjdGl2ZT10cnVlXHJcbiAgICAgICAgfSwwLjAwMDEpXHJcbiAgICB9XHJcbiAgICBjbGlja0J0blN0YXJ0Q2hhbGxlbmdlKCl7Ly/lvIDlp4vmjJHmiJhcclxuICAgICAgICBsZXQgbnVtXHJcbiAgICAgICAgbGV0IGJ1eW51bVxyXG4gICAgICAgIGxldCB0b3RhbG51bVxyXG4gICAgICAgIGlmICh0aGlzLnR5cGUgPT0gMikge1xyXG4gICAgICAgICAgICAvLyB0b3RhbG51bT1UaGVTdG9yYWdlTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldE51bWJlcihTdG9yYWdlS2V5LlRvdGFsVW5saW1pdGVkQ2hhbGxlbmdlVGltZXMsMCk7XHJcbiAgICAgICAgICAgIG51bSA9IFRoZVN0b3JhZ2VNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0TnVtYmVyKFN0b3JhZ2VLZXkuVW5saW1pdGVkQ2hhbGxlbmdlVGltZXMsMyk7XHJcbiAgICAgICAgICAgIGJ1eW51bSA9IFRoZVN0b3JhZ2VNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0TnVtYmVyKFN0b3JhZ2VLZXkuQnV5VW5saW1pdGVkQ2hhbGxlbmdlVGltZXMsMyk7XHJcbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLnR5cGUgPT0gMykge1xyXG4gICAgICAgICAgICAvLyB0b3RhbG51bT1UaGVTdG9yYWdlTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldE51bWJlcihTdG9yYWdlS2V5LlRvdGFsQm9zc0NoYWxsZW5nZVRpbWVzLDApO1xyXG4gICAgICAgICAgICBudW0gPSBUaGVTdG9yYWdlTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldE51bWJlcihTdG9yYWdlS2V5LkJvc3NDaGFsbGVuZ2VUaW1lcywzKTtcclxuICAgICAgICAgICAgYnV5bnVtID0gVGhlU3RvcmFnZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXROdW1iZXIoU3RvcmFnZUtleS5CdXlCb3NzQ2hhbGxlbmdlVGltZXMsMyk7XHJcbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLnR5cGUgPT0gNCkge1xyXG4gICAgICAgICAgICAvLyB0b3RhbG51bT1UaGVTdG9yYWdlTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldE51bWJlcihTdG9yYWdlS2V5LlRvdGFsVm9pZENyYWNrQ2hhbGxlbmdlVGltZXMsMCk7XHJcbiAgICAgICAgICAgIG51bSA9IFRoZVN0b3JhZ2VNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0TnVtYmVyKFN0b3JhZ2VLZXkuVm9pZENyYWNrQ2hhbGxlbmdlVGltZXMsMyk7XHJcbiAgICAgICAgICAgIGJ1eW51bSA9IFRoZVN0b3JhZ2VNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0TnVtYmVyKFN0b3JhZ2VLZXkuQnV5Vm9pZENyYWNrQ2hhbGxlbmdlVGltZXMsMyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmKG51bT4wKXtcclxuICAgICAgICAgICAgLy/lvIDlp4vmuLjmiI9cclxuICAgICAgICAgICAgdGhpcy5jbGlja0J0bkNsb3NlKClcclxuICAgICAgICAgICAgaWYgKHRoaXMudHlwZSA9PSAyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5jdXJfZ2FtZV9tb2RlPUdhbWVNb2RlLkVuZGxlc3M7ICAgICAgIFxyXG5cclxuICAgICAgICAgICAgICAgICAgICBVSU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zaG93VWlEaWFsb2coVUlQYXRoLlRvUGxheSxVSUxheWVyTGV2ZWwuT25lLHtvbkNvbXBsZXRlZDoodWlOb2RlKT0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdWlOb2RlLmdldENvbXBvbmVudChUb1BsYXlNYWluVWkpLmluaXQoe29uQ2xvc2U6KCk9PntcclxuICAgICAgICAgICAgICAgICAgICAgICAgfX0pO1xyXG4gICAgICAgICAgICAgICAgICAgIH0sfSlcclxuICAgICAgICAgICAgfSBlbHNlIGlmICh0aGlzLnR5cGUgPT0gMykge1xyXG4gICAgICAgICAgICAgICAgR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5jdXJfZ2FtZV9tb2RlPUdhbWVNb2RlLkJvc3NfQ2hhbGxlbmdlOyAgICAgICBcclxuICAgICAgICAgICAgICAgIFVJTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNob3dVaURpYWxvZyhVSVBhdGguVG9QbGF5LFVJTGF5ZXJMZXZlbC5PbmUse29uQ29tcGxldGVkOih1aU5vZGUpPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHVpTm9kZS5nZXRDb21wb25lbnQoVG9QbGF5TWFpblVpKS5pbml0KHtvbkNsb3NlOigpPT57XHJcbiAgICAgICAgICAgICAgICAgICAgfX0pO1xyXG4gICAgICAgICAgICAgICAgfSx9KVxyXG4gICAgICAgICAgICB9ZWxzZSBpZiAodGhpcy50eXBlID09IDQpIHtcclxuICAgICAgICAgICAgICAgIC8vIEdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuY3VyX2dhbWVfbW9kZT1HYW1lTW9kZS5NYXplOyAgICAgICBcclxuICAgICAgICAgICAgICAgIG51bS0tXHJcbiAgICAgICAgICAgICAgICBUaGVTdG9yYWdlTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNldEl0ZW0oU3RvcmFnZUtleS5Wb2lkQ3JhY2tDaGFsbGVuZ2VUaW1lcyxudW0pO1xyXG4gICAgICAgICAgICAgICAgVUlNYW5hZ2VyLmdldEluc3RhbmNlKCkuc2hvd1VpRGlhbG9nKFVJUGF0aC5Wb2lkU2NlbmUsVUlMYXllckxldmVsLk9uZSx7b25Db21wbGV0ZWQ6KHVpTm9kZSk9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgdWlOb2RlLmdldENvbXBvbmVudChWb2lkU2NlbmUpLmluaXQoXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHtvbkNsb3NlOigpPT57XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9fVxyXG4gICAgICAgICAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IGluZGV4PXRoaXMuUGFnZVZpZXcuZ2V0Q29tcG9uZW50KGNjLlBhZ2VWaWV3KS5nZXRDdXJyZW50UGFnZUluZGV4KClcclxuICAgICAgICAgICAgICAgICAgICB1aU5vZGUuZ2V0Q29tcG9uZW50KFZvaWRTY2VuZSkuaW5pdFVpKGluZGV4LDEsMilcclxuICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIH0sfSlcclxuICAgICAgICAgICAgICAgIC8vIFVJTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNob3dVaURpYWxvZyhVSVBhdGguVG9QbGF5LFVJTGF5ZXJMZXZlbC5PbmUse29uQ29tcGxldGVkOih1aU5vZGUpPT4ge1xyXG4gICAgICAgICAgICAgICAgLy8gICAgIHVpTm9kZS5nZXRDb21wb25lbnQoVG9QbGF5TWFpblVpKS5pbml0KHtvbkNsb3NlOigpPT57XHJcbiAgICAgICAgICAgICAgICAvLyAgICAgfX0pO1xyXG4gICAgICAgICAgICAgICAgLy8gfSx9KVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgIGlmKGJ1eW51bT4wKXtcclxuICAgICAgICAgICAgICAgIHRoaXMuY2xpY2tCdG5QdXJjaGFzZXNOdW1iZSgpXHJcbiAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgLy/mj5DnpLrmmI7ml6Xlho3mnaVcclxuICAgICAgICAgICAgICAgIEdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuc2hvd01lc3NhZ2UoTGFuZ3VhZ2VNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0U3RyQnlUZXh0SWQoMTAwMTIwKSwzKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIGNsaWNrQnRuUHVyY2hhc2VzTnVtYmUoKXsvL+i0reS5sOaMkeaImOasoeaVsFxyXG4gICAgICAgIFVJTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNob3dVaURpYWxvZyhVSVBhdGguUHVyY2hhc2VzTnVtYmUsVUlMYXllckxldmVsLlR3byx7b25Db21wbGV0ZWQ6KHVpTm9kZSk9PiB7XHJcbiAgICAgICAgICAgIHVpTm9kZS5nZXRDb21wb25lbnQocHVyY2hhc2VzbnVtYmUpLmluaXQoe1xyXG4gICAgICAgICAgICAgICAgb25DbG9zZTooKT0+e1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMubnVtYmVyUmVmcmVzaCgpXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIHVpTm9kZS5nZXRDb21wb25lbnQocHVyY2hhc2VzbnVtYmUpLmluaXRVaSh0aGlzLnR5cGUpXHJcbiAgICAgICAgfSx9KTtcclxuICAgIH1cclxuXHJcbiAgICBjbGlja0J0bk1vcHBpbmdVcCgpey8v5omr6I2hXHJcbiAgICAgICAgaWYodGhpcy50eXBlPT00KXtcclxuICAgICAgICAgICAgVUlNYW5hZ2VyLmdldEluc3RhbmNlKCkuc2hvd1VpRGlhbG9nKFVJUGF0aC5Nb3BwaW5nVm9pZCxVSUxheWVyTGV2ZWwuVHdvLHtvbkNvbXBsZXRlZDoodWlOb2RlKT0+IHtcclxuICAgICAgICAgICAgICAgIHVpTm9kZS5nZXRDb21wb25lbnQoTW9wcGluZ1ZvaWQpLmluaXQoe1xyXG4gICAgICAgICAgICAgICAgICAgIG9uQ2xvc2U6KCk9PntcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5udW1iZXJSZWZyZXNoKClcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgbGV0IGluZGV4PXRoaXMuUGFnZVZpZXcuZ2V0Q29tcG9uZW50KGNjLlBhZ2VWaWV3KS5nZXRDdXJyZW50UGFnZUluZGV4KClcclxuICAgICAgICAgICAgICAgIHVpTm9kZS5nZXRDb21wb25lbnQoTW9wcGluZ1ZvaWQpLmluaXRVaShpbmRleClcclxuICAgICAgICAgICAgfSx9KTtcclxuICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgVUlNYW5hZ2VyLmdldEluc3RhbmNlKCkuc2hvd1VpRGlhbG9nKFVJUGF0aC5Nb3BwaW5nVXAsVUlMYXllckxldmVsLlR3byx7b25Db21wbGV0ZWQ6KHVpTm9kZSk9PiB7XHJcbiAgICAgICAgICAgICAgICB1aU5vZGUuZ2V0Q29tcG9uZW50KE1vcHBpbmdVcCkuaW5pdCh7XHJcbiAgICAgICAgICAgICAgICAgICAgb25DbG9zZTooKT0+e1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm51bWJlclJlZnJlc2goKVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICB1aU5vZGUuZ2V0Q29tcG9uZW50KE1vcHBpbmdVcCkuaW5pdFVpKHRoaXMudHlwZSx0aGlzLm5vZGUpXHJcbiAgICAgICAgICAgIH0sfSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgIH1cclxuICAgIGNsaWNrQnRuU2hvcCgpey8v6Jma56m66KOC57yd5ZWG5bqXXHJcbiAgICAgICAgVUlNYW5hZ2VyLmdldEluc3RhbmNlKCkuc2hvd1VpRGlhbG9nKFVJUGF0aC5TaG9wLFVJTGF5ZXJMZXZlbC5Ud28se29uQ29tcGxldGVkOih1aU5vZGUpPT4ge1xyXG4gICAgICAgICAgICB1aU5vZGUuZ2V0Q29tcG9uZW50KFNob3ApLmluaXQoe1xyXG4gICAgICAgICAgICAgICAgb25DbG9zZTooKT0+e1xyXG5cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgdWlOb2RlLmdldENvbXBvbmVudChTaG9wKS5pbml0VWkoKVxyXG4gICAgICAgIH0sfSk7XHJcbiAgICB9XHJcbiAgICBjbGlja0J0bkNsb3NlU2tpbGxEZXNjcmlwdGlvbigpe1xyXG4gICAgICAgIHRoaXMuU2tpbGxEZXNjcmlwdGlvbi5nZXRDaGlsZEJ5TmFtZShcIkNvbW1vbl9UZXh0QkdcIikuYWN0aXZlPWZhbHNlXHJcbiAgICAgICAgdGhpcy5Ta2lsbERlc2NyaXB0aW9uLmFjdGl2ZT1mYWxzZVxyXG4gICAgfVxyXG4gICAgcHJpdmF0ZSBnZXRMZWFkZXJib2FyZEJ5VXNlckpzb25TdHJpbmcodHlwZTogbnVtYmVyKTogc3RyaW5nIHtcclxuICAgICAgICBsZXQgdWlkID0gVXNlckRhdGEuZ2V0SW5zdGFuY2UoKS5nZXRVc2VySUQoKTtcclxuICAgICAgICByZXR1cm4gSlNPTi5zdHJpbmdpZnkoe1xyXG4gICAgICAgICAgICBsaW1pdDogMTAwLFxyXG4gICAgICAgICAgICB0eXBlOiB0eXBlLFxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG4gICAgcHJpdmF0ZSBzZXRSYW5rSnNvblN0cmluZygpOiBzdHJpbmcge1xyXG4gICAgICAgIGxldCB1aWQgPSBVc2VyRGF0YS5nZXRJbnN0YW5jZSgpLmdldFVzZXJJRCgpO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiPT09PT09XCIsdWlkKVxyXG4gICAgICAgIHJldHVybiBKU09OLnN0cmluZ2lmeSh7XHJcbiAgICAgICAgICAgIHVpZDp1aWQsXHJcbiAgICAgICAgICAgIGRhbWFnZU51bWJlckxhc3Q6IC0xLFxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIHN0YXJ0ICgpIHtcclxuXHJcbiAgICAvLyB9XHJcblxyXG4gICAgLy8gdXBkYXRlIChkdCkge31cclxufVxyXG4iXX0=