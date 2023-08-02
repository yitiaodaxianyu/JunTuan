
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
var WXManagerEX_1 = require("../../../startscene/WXManagerEX");
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
                WXManagerEX_1.default.getInstance().resourcesBundle.load(path, cc.Prefab, function (error, assets) {
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0c1xcY29weVxcZW5kbGVzc2NoYWxsZW5nZXNcXGVuZGxlc3NjaGFsbGVuZ2VzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxvQkFBb0I7QUFDcEIsd0VBQXdFO0FBQ3hFLG1CQUFtQjtBQUNuQixrRkFBa0Y7QUFDbEYsOEJBQThCO0FBQzlCLGtGQUFrRjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBRWxGLCtEQUEwRDtBQUMxRCwyREFBc0U7QUFDdEUsOERBQW9FO0FBQ3BFLDhEQUFvRTtBQUNwRSw2Q0FBMkM7QUFDM0MsaURBQTRDO0FBRTVDLHdFQUE4RTtBQUM5RSxnRUFBc0U7QUFDdEUseURBQStFO0FBQy9FLHVFQUFrRTtBQUNsRSxtRUFBOEQ7QUFDOUQsdUVBQWtFO0FBQ2xFLGlFQUE0RDtBQUM1RCxzREFBcUQ7QUFDckQsNkRBQXdEO0FBQ3hELDZEQUF3RDtBQUN4RCw2REFBeUQ7QUFDekQsK0RBQWlFO0FBQ2pFLDJEQUFzRDtBQUN0RCxvREFBK0M7QUFDL0MsOENBQXlEO0FBQ3pELGdEQUErQztBQUMvQywyQ0FBc0M7QUFDdEMsb0RBQW1EO0FBQ25ELHdEQUFtRDtBQUNuRCxvREFBK0M7QUFDL0MsdURBQTZEO0FBQzdELHlDQUFvQztBQUNwQyx1REFBa0Q7QUFDbEQsbURBQThDO0FBQzlDLGlEQUE0QztBQUM1QywrREFBcUU7QUFDckUsK0JBQTBCO0FBRXBCLElBQUEsS0FBd0IsRUFBRSxDQUFDLFVBQVUsRUFBbkMsT0FBTyxhQUFBLEVBQUUsUUFBUSxjQUFrQixDQUFDO0FBRzVDO0lBQStDLHFDQUFXO0lBQTFEO1FBQUEscUVBc3JCQztRQW5yQkcsVUFBSSxHQUFZLElBQUksQ0FBQSxDQUFBLHNCQUFzQjtRQUUxQyx1QkFBaUIsR0FBWSxJQUFJLENBQUEsQ0FBQSxPQUFPO1FBRXhDLHdCQUFrQixHQUFZLElBQUksQ0FBQSxDQUFBLE1BQU07UUFFeEMsbUJBQWEsR0FBWSxJQUFJLENB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QUFRLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQztrREFDQztJQUduQjtRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDOytEQUNjO0lBRWhDO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUM7bURBQ0U7SUFFcEI7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQztzREFDSztJQUV2QjtRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDO3VEQUNNO0lBbEZQLGlCQUFpQjtRQURyQyxPQUFPO09BQ2EsaUJBQWlCLENBc3JCckM7SUFBRCx3QkFBQztDQXRyQkQsQUFzckJDLENBdHJCOEMscUJBQVcsR0FzckJ6RDtrQkF0ckJvQixpQkFBaUIiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyIvLyBMZWFybiBUeXBlU2NyaXB0OlxyXG4vLyAgLSBodHRwczovL2RvY3MuY29jb3MuY29tL2NyZWF0b3IvbWFudWFsL2VuL3NjcmlwdGluZy90eXBlc2NyaXB0Lmh0bWxcclxuLy8gTGVhcm4gQXR0cmlidXRlOlxyXG4vLyAgLSBodHRwczovL2RvY3MuY29jb3MuY29tL2NyZWF0b3IvbWFudWFsL2VuL3NjcmlwdGluZy9yZWZlcmVuY2UvYXR0cmlidXRlcy5odG1sXHJcbi8vIExlYXJuIGxpZmUtY3ljbGUgY2FsbGJhY2tzOlxyXG4vLyAgLSBodHRwczovL2RvY3MuY29jb3MuY29tL2NyZWF0b3IvbWFudWFsL2VuL3NjcmlwdGluZy9saWZlLWN5Y2xlLWNhbGxiYWNrcy5odG1sXHJcblxyXG5pbXBvcnQgV1hNYW5hZ2VyRVggZnJvbSBcIi4uLy4uLy4uL3N0YXJ0c2NlbmUvV1hNYW5hZ2VyRVhcIjtcclxuaW1wb3J0IHsgSHR0cE1hbmFnZXIsIEFjY2Vzc05hbWUgfSBmcm9tIFwiLi4vLi4vLi9OZXRXb3JrL0h0dHBNYW5hZ2VyXCI7XHJcbmltcG9ydCB7IEJvc3NDaGFsbGVuZ2VNYW5hZ2VyIH0gZnJvbSBcIi4uLy4uL0FjdGl2aXR5L0Jvc3NDaGFsbGVuZ2VcIjtcclxuaW1wb3J0IHsgRW5kbGVzc0xldmVsc01hbmFnZXIgfSBmcm9tIFwiLi4vLi4vQWN0aXZpdHkvRW5kbGVzc0xldmVsc1wiO1xyXG5pbXBvcnQgeyBHYW1lTW9kZSB9IGZyb20gXCIuLi8uLi9Db25zdGFudHNcIjtcclxuaW1wb3J0IEdhbWVNYW5hZ2VyIGZyb20gXCIuLi8uLi9HYW1lTWFuYWdlclwiO1xyXG5pbXBvcnQgeyBIZXJvTWFuYWdlciB9IGZyb20gXCIuLi8uLi9IZXJvL0RhdGEvSGVyb01hbmFnZXJcIjtcclxuaW1wb3J0IHsgTW9uc3RlckNvbmZpZ3VyZU1hbmFnZXIgfSBmcm9tIFwiLi4vLi4vTW9uc3Rlci9EYXRhL01vbnN0ZXJDb25maWd1cmVcIjtcclxuaW1wb3J0IHsgTW9uc3RlclNraWxsTWFuYWdlciB9IGZyb20gXCIuLi8uLi9Nb25zdGVyL0RhdGEvTW9uc3RlclNraWxsXCI7XHJcbmltcG9ydCB7IE1vbnN0ZXJBY3Rpb25OYW1lLCBNb25zdGVyRmFjZU5hbWUgfSBmcm9tIFwiLi4vLi4vTW9uc3Rlci9Nb25zdGVyRGF0YVwiO1xyXG5pbXBvcnQgeyBGb2xsb3dfVHlwZSB9IGZyb20gXCIuLi8uLi9tdWx0aUxhbmd1YWdlL0ZvbGxvd0NvbnN0YW50c1wiO1xyXG5pbXBvcnQgRm9sbG93TWFuYWdlciBmcm9tIFwiLi4vLi4vbXVsdGlMYW5ndWFnZS9Gb2xsb3dNYW5hZ2VyXCI7XHJcbmltcG9ydCBMYW5ndWFnZU1hbmFnZXIgZnJvbSBcIi4uLy4uL211bHRpTGFuZ3VhZ2UvTGFuZ3VhZ2VNYW5hZ2VyXCI7XHJcbmltcG9ydCBUZXh0TGFuZ3VhZ2UgZnJvbSBcIi4uLy4uL211bHRpTGFuZ3VhZ2UvVGV4dExhbmd1YWdlXCI7XHJcbmltcG9ydCB7IFByb3BNYW5hZ2VyIH0gZnJvbSBcIi4uLy4uL1Byb3AvUHJvcE1hbmFnZXJcIjtcclxuaW1wb3J0IFJhbmtpbmdMaXN0IGZyb20gXCIuLi8uLi9SYW5raW5nTGlzdC9SYW5raW5nTGlzdFwiO1xyXG5pbXBvcnQgeyBTb3VuZEluZGV4IH0gZnJvbSBcIi4uLy4uL1NvdW5kL0F1ZGlvQ29uc3RhbnRzXCI7XHJcbmltcG9ydCB7IFN0b3JhZ2VLZXkgfSBmcm9tIFwiLi4vLi4vU3RvcmFnZS9TdG9yYWdlQ29uZmlnXCI7XHJcbmltcG9ydCB7IFRoZVN0b3JhZ2VNYW5hZ2VyIH0gZnJvbSBcIi4uLy4uL1N0b3JhZ2UvU3RvcmFnZU1hbmFnZXJcIjtcclxuaW1wb3J0IFRvUGxheU1haW5VaSBmcm9tIFwiLi4vLi4vVUkvaG9tZS9Ub1BsYXlNYWluVWlcIjtcclxuaW1wb3J0IFVJQ29tcG9uZW50IGZyb20gXCIuLi8uLi9VSS9VSUNvbXBvbmVudFwiO1xyXG5pbXBvcnQgeyBVSVBhdGgsIFVJTGF5ZXJMZXZlbCB9IGZyb20gXCIuLi8uLi9VSS9VSUNvbmZpZ1wiO1xyXG5pbXBvcnQgeyBVSU1hbmFnZXIgfSBmcm9tIFwiLi4vLi4vVUkvVUlNYW5hZ2VyXCI7XHJcbmltcG9ydCBVc2VyRGF0YSBmcm9tIFwiLi4vLi4vVXNlckRhdGFcIjtcclxuaW1wb3J0IHsgVXNlckluZm8gfSBmcm9tIFwiLi4vLi4vVXNlckluZm8vVXNlckluZm9cIjtcclxuaW1wb3J0IE1vcHBpbmdWb2lkIGZyb20gXCIuLi92b2lkY3JhY2svTW9wcGluZ1ZvaWRcIjtcclxuaW1wb3J0IFZvaWRTY2VuZSBmcm9tIFwiLi4vdm9pZGNyYWNrL1ZvaWRTY2VuZVwiO1xyXG5pbXBvcnQgeyBCb3NzV2Vla2x5UmV3YXJkTWFuYWdlciB9IGZyb20gXCIuL0Jvc3NXZWVrbHlSZXdhcmRcIjtcclxuaW1wb3J0IE1vcHBpbmdVcCBmcm9tIFwiLi9Nb3BwaW5nVXBcIjtcclxuaW1wb3J0IHBsYXlpbnN0cnVjdGlvbnMgZnJvbSBcIi4vcGxheWluc3RydWN0aW9uc1wiO1xyXG5pbXBvcnQgcHVyY2hhc2VzbnVtYmUgZnJvbSBcIi4vcHVyY2hhc2VzbnVtYmVcIjtcclxuaW1wb3J0IHJld2FyZGRpc3BsYXkgZnJvbSBcIi4vcmV3YXJkZGlzcGxheVwiO1xyXG5pbXBvcnQgeyBSb2d1ZUdpZnRJbmZvcm1hdGlvbk1hbmFnZXIgfSBmcm9tIFwiLi9Sb2d1ZUdpZnRJbmZvcm1hdGlvblwiO1xyXG5pbXBvcnQgU2hvcCBmcm9tIFwiLi9TaG9wXCI7XHJcblxyXG5jb25zdCB7IGNjY2xhc3MsIHByb3BlcnR5IH0gPSBjYy5fZGVjb3JhdG9yO1xyXG5cclxuQGNjY2xhc3NcclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgZW5kbGVzc2NoYWxsZW5nZXMgZXh0ZW5kcyBVSUNvbXBvbmVudCB7XHJcblxyXG4gICAgQHByb3BlcnR5KGNjLk5vZGUpXHJcbiAgICBib3NzOiBjYy5Ob2RlID0gbnVsbC8vYm9zc+S4k+WxnueahOaKgOiDveS4juWQjeWtlyAgYm9zc+aMkeaImFxyXG4gICAgQHByb3BlcnR5KGNjLk5vZGUpXHJcbiAgICBCb3NzUnVzaF9CdG5fUmFuazogY2MuTm9kZSA9IG51bGwvL+aOkuihjOamnOaMiemSrlxyXG4gICAgQHByb3BlcnR5KGNjLk5vZGUpXHJcbiAgICBCb3NzUnVzaF9CdG5fQm9udXM6IGNjLk5vZGUgPSBudWxsLy/lpZblirHmjInpkq5cclxuICAgIEBwcm9wZXJ0eShjYy5Ob2RlKVxyXG4gICAgTWF6ZV9CdG5fU2hvcDogY2MuTm9kZSA9IG51bGwvL+WVhuW6l+aMiemSrlxyXG4gICAgXHJcbiAgICBAcHJvcGVydHkoY2MuTm9kZSlcclxuICAgIEJvc3NSdXNoX0J0bl9SZWNvcmQ6IGNjLk5vZGUgPSBudWxsLy/miJjmlpforrDlvZXmjInpkq4gIGJvc3PmjJHmiJhcclxuXHJcbiAgICBAcHJvcGVydHkoY2MuTm9kZSlcclxuICAgIHh2a29uOiBjYy5Ob2RlID0gbnVsbC8v6Jma56m66KOC57yd55qE5Lic6KW/XHJcbiAgICBcclxuICAgIEBwcm9wZXJ0eShjYy5Ob2RlKVxyXG4gICAgQm9zc1J1c2hfVGlwczogY2MuTm9kZSA9IG51bGwvL+aPkOekuuaMiemSrlxyXG5cclxuICAgIEBwcm9wZXJ0eShjYy5Ob2RlKVxyXG4gICAgaGVyb1NoYWRvdzogY2MuTm9kZSA9IG51bGwvL+aAqueJqemYtOW9sVxyXG4gICAgQHByb3BlcnR5KGNjLk5vZGUpXHJcbiAgICBwb3M6IGNjLk5vZGUgPSBudWxsLy/mgKrniankvY3nva5cclxuXHJcbiAgICBAcHJvcGVydHkoY2MuTm9kZSlcclxuICAgIGJ0OiBjYy5Ob2RlID0gbnVsbC8v5qCH6aKYXHJcblxyXG4gICAgQHByb3BlcnR5KGNjLk5vZGUpXHJcbiAgICBDb21tb25fQnRuX0JhY2s6IGNjLk5vZGUgPSBudWxsLy/ov5Tlm57mjInpkq4gIFxyXG5cclxuICAgIEBwcm9wZXJ0eShjYy5Ob2RlKVxyXG4gICAgYnRubm86IGNjLk5vZGUgPSBudWxsLy/miavojaHmjInpkq4gIFxyXG4gICAgQHByb3BlcnR5KGNjLk5vZGUpXHJcbiAgICBidG55ZXM6IGNjLk5vZGUgPSBudWxsLy/lvIDlp4vmjJHmiJjmjInpkq4gIFxyXG5cclxuICAgIEBwcm9wZXJ0eShjYy5Ob2RlKVxyXG4gICAgUmFua2luZ1NlbGY6IGNjLk5vZGUgPSBudWxsLy/oh6rlt7HnmoTlpLTlg48gIOaOkuWQjSBcclxuICAgIEBwcm9wZXJ0eShjYy5Ob2RlKVxyXG4gICAgb25lOiBjYy5Ob2RlID0gbnVsbC8v5aaC5p6c5o6S5ZCN56ys5LiA5bCx5pi+56S66L+Z5Liq5paH5a2XXHJcbiAgICBAcHJvcGVydHkoY2MuTm9kZSlcclxuICAgIFByb21vdGlvbjogY2MuTm9kZSA9IG51bGwvL+WmguaenOS4jeaYr+esrOS4gOWwseaYvuekuui/meS4quaWh+WtlyAgIOi+vuWIsOWkmuWwkeazoi3kvKTlrrPlj6/mmYvljYfoh7PlpJrlsJHlkI1cclxuICAgIEBwcm9wZXJ0eShjYy5Ob2RlKVxyXG4gICAgV2F2ZXM6IGNjLk5vZGUgPSBudWxsLy/ml6DlsL3mjJHmiJggICDmnKzmrKHmjJHmiJjlsIbku47lpJrlsJHms6LlvIDlp4tcclxuICAgIEBwcm9wZXJ0eShjYy5Ob2RlKVxyXG4gICAgbnVtOiBjYy5Ob2RlID0gbnVsbC8v5oyR5oiY5qyh5pWwXHJcblxyXG4gICAgQHByb3BlcnR5KGNjLk5vZGUpXHJcbiAgICBqaW5lbmc6IGNjLk5vZGUgPSBudWxsLy9ib3Nz55qE5oqA6IO95Zu+5qCHXHJcblxyXG4gICAgQHByb3BlcnR5KGNjLk5vZGUpXHJcbiAgICBib3NzbmFtZTogY2MuTm9kZSA9IG51bGwvL2Jvc3PnmoTlkI3lrZdcclxuICAgIHR5cGU6IG51bWJlciA9IDAvLzI65peg5bC95oyR5oiYICAgM++8mmJvc3PmjJHmiJhcclxuXHJcbiAgICBAcHJvcGVydHkoY2MuU3ByaXRlQXRsYXMpXHJcbiAgICBjb3B5X3VpOiBjYy5TcHJpdGVBdGxhcyA9IG51bGwvL0Jvc3PmioDog73lm77moIcgICAgYnVmZuWbvuagh1xyXG4gICAgdGV4dDogbnVtYmVyW10gPSBbMTAwMTI2LCAxMDAxMjgsIDEwMDEyOV0vL+aImOWKmzp+5rOi5pWwOn7kvKTlrrM6flxyXG5cclxuICAgIEBwcm9wZXJ0eShjYy5TcHJpdGVGcmFtZSlcclxuICAgIGJqc3ByOiBjYy5TcHJpdGVGcmFtZVtdID0gW10vL2Jvc3PmjJHmiJjog4zmma9cclxuXHJcbiAgICBAcHJvcGVydHkoY2MuU3ByaXRlRnJhbWUpXHJcbiAgICBianNwcnd1amluOiBjYy5TcHJpdGVGcmFtZSA9IG51bGwvL+aXoOWwveaMkeaImOiDjOaZr1xyXG5cclxuICAgIEBwcm9wZXJ0eShjYy5TcHJpdGVGcmFtZSlcclxuICAgIGJqc3ByeHZrb246IGNjLlNwcml0ZUZyYW1lID0gbnVsbC8v6Jma56m66KOC57yd6IOM5pmvXHJcbiAgICBAcHJvcGVydHkoY2MuTm9kZSlcclxuICAgIGJiZzogY2MuTm9kZSA9IG51bGwvL+WcsOWbvuiDjOaZr1xyXG5cclxuICAgIGJvc3NzcHJpdGVpZDpudW1iZXI9MC8vYm9zc+aKgOiDvWlkXHJcbiAgICBAcHJvcGVydHkoY2MuTm9kZSlcclxuICAgIFNraWxsRGVzY3JpcHRpb246IGNjLk5vZGUgPSBudWxsLy/mioDog73mj4/ov7BcclxuICAgIEBwcm9wZXJ0eShjYy5Ob2RlKVxyXG4gICAgYnQxOiBjYy5Ob2RlID0gbnVsbC8v5pyA6auY5o6S5ZCNICAgIOacrOWRqOaOkuWQjSAgICDnrKzlh6Dnq6BcclxuXHJcbiAgICBAcHJvcGVydHkoY2MuTm9kZSlcclxuICAgIEJvc3NSdXNoX1RpbWVfQmc6IGNjLk5vZGUgPSBudWxsLy/mr4/lkajliLfmlrDmoYZcclxuICAgIEBwcm9wZXJ0eShjYy5Ob2RlKVxyXG4gICAgdGltZTogY2MuTm9kZSA9IG51bGwvL+avj+WRqOWIt+aWsOaWh+Wtl1xyXG4gICAgQHByb3BlcnR5KGNjLk5vZGUpXHJcbiAgICBjb250ZW50OiBjYy5Ob2RlID0gbnVsbC8v6Jma56m66KOC57yd5aWW5Yqx55qE54i26IqC54K5ICAgXHJcbiAgICBAcHJvcGVydHkoY2MuTm9kZSlcclxuICAgIFBhZ2VWaWV3OiBjYy5Ob2RlID0gbnVsbC8v56ug6IqC5ruR5Yqo6IqC54K5XHJcbiAgICBcclxuICAgIC8vIEBwcm9wZXJ0eShjYy5MYWJlbClcclxuICAgIC8vIGxhYmVsOiBjYy5MYWJlbCA9IG51bGw7XHJcblxyXG4gICAgLy8gQHByb3BlcnR5XHJcbiAgICAvLyB0ZXh0OiBzdHJpbmcgPSAnaGVsbG8nO1xyXG5cclxuICAgIC8vIExJRkUtQ1lDTEUgQ0FMTEJBQ0tTOlxyXG5cclxuICAgIC8vIG9uTG9hZCAoKSB7fVxyXG4gICAgaW5pdFVpKHR5cGUpIHsvLzI65peg5bC95oyR5oiYICAgM++8mmJvc3PmjJHmiJggICAgNDromZrnqbroo4LnvJ1cclxuICAgICAgICAvLyBHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLm11c2ljX21hbmFnZXIucGxheU11c2ljKE11c2ljSW5kZXguQkdNX1RKUCk7XHJcbiAgICAgICAgLy8gRm9sbG93TWFuYWdlci5nZXRJbnN0YW5jZSgpLmZvbGxvd0V2ZW50KEZvbGxvd19UeXBlLumTgeWMoOmTuuaJk+W8gOasoeaVsCk7XHJcbiAgICAgICAgdGhpcy50eXBlID0gdHlwZVxyXG4gICAgICAgIHRoaXMuZGVzKClcclxuICAgICAgICB0aGlzLlJlZnJlc2goKS8v5Yi35pawXHJcbiAgICB9XHJcbiAgICBudW1iZXJSZWZyZXNoKCl7XHJcbiAgICAgICAgbGV0IG51bVxyXG4gICAgICAgIGxldCB0b3RhbG51bVxyXG4gICAgICAgIGxldCBkYW1hZ2VcclxuICAgICAgICBpZiAodGhpcy50eXBlID09IDIpIHtcclxuICAgICAgICAgICAgdG90YWxudW09VGhlU3RvcmFnZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXROdW1iZXIoU3RvcmFnZUtleS5Ub3RhbFVubGltaXRlZENoYWxsZW5nZVRpbWVzLDApO1xyXG4gICAgICAgICAgICBudW0gPSBUaGVTdG9yYWdlTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldE51bWJlcihTdG9yYWdlS2V5LlVubGltaXRlZENoYWxsZW5nZVRpbWVzLDMpO1xyXG4gICAgICAgICAgICBkYW1hZ2U9RW5kbGVzc0xldmVsc01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRNYXhXYXZlKCkvL1RoZVN0b3JhZ2VNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0TnVtYmVyKFN0b3JhZ2VLZXkuVW5saW1pdGVkQ2hhbGxlbmdlRGFtYWdlLDApO1xyXG4gICAgICAgIH0gZWxzZSBpZiAodGhpcy50eXBlID09IDMpIHtcclxuICAgICAgICAgICAgdG90YWxudW09VGhlU3RvcmFnZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXROdW1iZXIoU3RvcmFnZUtleS5Ub3RhbEJvc3NDaGFsbGVuZ2VUaW1lcywwKTtcclxuICAgICAgICAgICAgbnVtID0gVGhlU3RvcmFnZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXROdW1iZXIoU3RvcmFnZUtleS5Cb3NzQ2hhbGxlbmdlVGltZXMsMyk7XHJcbiAgICAgICAgICAgIGRhbWFnZT1UaGVTdG9yYWdlTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldE51bWJlcihTdG9yYWdlS2V5LkJvc3NDaGFsbGVuZ2VEYW1hZ2UsLTEpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmICh0aGlzLnR5cGUgPT0gNCkge1xyXG4gICAgICAgICAgICBudW0gPSBUaGVTdG9yYWdlTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldE51bWJlcihTdG9yYWdlS2V5LlZvaWRDcmFja0NoYWxsZW5nZVRpbWVzLDMpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZih0aGlzLnR5cGUhPSA0KXtcclxuICAgICAgICAgICAgaWYodG90YWxudW0+PTEmJm51bT4wJiZkYW1hZ2U+LTEpe1xyXG4gICAgICAgICAgICAgICAgdGhpcy5idG5uby5hY3RpdmU9dHJ1ZVxyXG4gICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgIHRoaXMuYnRubm8uYWN0aXZlPWZhbHNlXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgbGV0IGluZGV4PXRoaXMuUGFnZVZpZXcuZ2V0Q29tcG9uZW50KGNjLlBhZ2VWaWV3KS5nZXRDdXJyZW50UGFnZUluZGV4KClcclxuICAgICAgICAgICAgbGV0IGRhbWFnZT1UaGVTdG9yYWdlTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldE51bWJlcihTdG9yYWdlS2V5LlZvaWRDcmFja0NoYWxsZW5nZURhbWFnZSwwKTtcclxuICAgICAgICAgICAgbGV0IG51bSA9IFRoZVN0b3JhZ2VNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0TnVtYmVyKFN0b3JhZ2VLZXkuVm9pZENyYWNrQ2hhbGxlbmdlVGltZXMsMyk7XHJcbiAgICAgICAgICAgIGlmKChkYW1hZ2UrMSk+PWluZGV4KXtcclxuICAgICAgICAgICAgICAgIGlmKGluZGV4PT0oZGFtYWdlKzEpKXtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmJ0bm5vLmFjdGl2ZT1mYWxzZVxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYnRueWVzLmFjdGl2ZT10cnVlXHJcbiAgICAgICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgICAgICBpZihudW0+MCl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuYnRubm8uYWN0aXZlPXRydWVcclxuICAgICAgICAgICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5idG5uby5hY3RpdmU9ZmFsc2VcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5idG55ZXMuYWN0aXZlPXRydWVcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmJ0bm5vLmFjdGl2ZT1mYWxzZVxyXG4gICAgICAgICAgICAgICAgdGhpcy5idG55ZXMuYWN0aXZlPWZhbHNlXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgbGV0IHJlZD10aGlzLmJ0bnllcy5nZXRDaGlsZEJ5TmFtZSgncmVkJyk7XHJcbiAgICAgICAgbGV0IHR4dD1MYW5ndWFnZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRTdHJCeVRleHRJZCg4MjAwMDkpXHJcbiAgICAgICAgY29uc29sZS5sb2coXCIrKysrKysrKysrXCIsdHh0KVxyXG4gICAgICAgIHR4dD10eHQucmVwbGFjZSgnficsXCJcIitudW0pXHJcbiAgICAgICAgXHJcbiAgICAgICAgaWYobnVtPT0wKXtcclxuICAgICAgICAgICAgLy8gdGhpcy5udW0uY29sb3I9bmV3IGNjLkNvbG9yKDI1NSw3MSw3MClcclxuICAgICAgICAgICAgdHh0PXR4dC5yZXBsYWNlKCdAJyxcIiNGRjQ3NDZcIilcclxuICAgICAgICAgICAgcmVkLmFjdGl2ZT1mYWxzZTtcclxuICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgLy8gdGhpcy5udW0uY29sb3I9bmV3IGNjLkNvbG9yKDI1NSwyNTUsMjU1KVxyXG4gICAgICAgICAgICB0eHQ9dHh0LnJlcGxhY2UoJ0AnLFwiI0ZGRkZGRlwiKVxyXG4gICAgICAgICAgICByZWQuYWN0aXZlPXRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIFxyXG4gICAgICAgIHRoaXMubnVtLmdldENvbXBvbmVudChjYy5SaWNoVGV4dCkuc3RyaW5nPVwiXCIrdHh0XHJcbiAgICAgICAgLy8gdGhpcy5udW0uZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmc9XCJcIitudW1cclxuICAgIH1cclxuICAgIFJlZnJlc2goKSB7XHJcbiAgICAgICAgbGV0IEVsaXRlTW9uc3RlciA9IFtdXHJcbiAgICAgICAgdGhpcy5Ta2lsbERlc2NyaXB0aW9uLmFjdGl2ZT1mYWxzZVxyXG4gICAgICAgIHRoaXMuU2tpbGxEZXNjcmlwdGlvbi5nZXRDaGlsZEJ5TmFtZShcIkNvbW1vbl9UZXh0QkdcIikuYWN0aXZlPWZhbHNlXHJcbiAgICAgICAgdGhpcy5udW1iZXJSZWZyZXNoKClcclxuICAgICAgICB0aGlzLkJvc3NSdXNoX0J0bl9SZWNvcmQuYWN0aXZlID0gZmFsc2VcclxuICAgICAgICB0aGlzLnh2a29uLmFjdGl2ZT1mYWxzZVxyXG4gICAgICAgIHRoaXMuV2F2ZXMuYWN0aXZlPXRydWVcclxuICAgICAgICB0aGlzLlByb21vdGlvbi5hY3RpdmU9dHJ1ZVxyXG4gICAgICAgIHRoaXMub25lLmFjdGl2ZT10cnVlXHJcbiAgICAgICAgdGhpcy5SYW5raW5nU2VsZi5hY3RpdmU9dHJ1ZVxyXG4gICAgICAgIHRoaXMuQm9zc1J1c2hfQnRuX1JhbmsuYWN0aXZlPXRydWVcclxuICAgICAgICB0aGlzLkJvc3NSdXNoX0J0bl9Cb251cy5hY3RpdmU9dHJ1ZVxyXG4gICAgICAgIHRoaXMuTWF6ZV9CdG5fU2hvcC5hY3RpdmU9ZmFsc2VcclxuICAgICAgICBpZiAodGhpcy50eXBlID09IDIpIHtcclxuICAgICAgICAgICAgRm9sbG93TWFuYWdlci5nZXRJbnN0YW5jZSgpLmZvbGxvd0V2ZW50KEZvbGxvd19UeXBlLuaXoOWwveaMkeaImOmhtemdouWxleekuuasoeaVsCk7XHJcbiAgICAgICAgICAgIHRoaXMuYmJnLmdldENvbXBvbmVudChjYy5TcHJpdGUpLnNwcml0ZUZyYW1lPXRoaXMuYmpzcHJ3dWppblxyXG4gICAgICAgICAgICB0aGlzLmJvc3MuYWN0aXZlID0gZmFsc2VcclxuICAgICAgICAgICAgbGV0IHdhdmVudW1iZXI9RW5kbGVzc0xldmVsc01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRNYXhXYXZlKCktMzE7Ly/ms6LmlbBcclxuICAgICAgICAgICAgaWYod2F2ZW51bWJlcjwxKXtcclxuICAgICAgICAgICAgICAgIHdhdmVudW1iZXI9MFxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMuYmJnLnk9MFxyXG4gICAgICAgICAgICBsZXQgUm91bmQgPUVuZGxlc3NMZXZlbHNNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0Um91bmQod2F2ZW51bWJlcikvL+WbnuWQiOaVsFxyXG4gICAgICAgICAgICB3YXZlbnVtYmVyPUVuZGxlc3NMZXZlbHNNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0V2F2ZShSb3VuZClcclxuICAgICAgICAgICAgVGhlU3RvcmFnZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zZXRJdGVtKFN0b3JhZ2VLZXkuVW5saW1pdGVkQ2hhbGxlbmdlRGFtYWdlLHdhdmVudW1iZXIpO1xyXG4gICAgICAgICAgICBFbGl0ZU1vbnN0ZXIgPSBFbmRsZXNzTGV2ZWxzTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldEVsaXRlTW9uc3RlcihSb3VuZCkuY29uY2F0KEVuZGxlc3NMZXZlbHNNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0Tm9ybWFsTW9uc3RlcihSb3VuZCkpLy/mgKrnialpZFxyXG4gICAgICAgICAgICB0aGlzLldhdmVzLmFjdGl2ZT10cnVlLy/mnKzmrKHmjJHmiJjku47lpJrlsJHms6LlvIDlp4tcclxuICAgICAgICAgICAgbGV0IHR4dD1MYW5ndWFnZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRTdHJCeVRleHRJZCg4MDAwMDUpXHJcbiAgICAgICAgICAgIHR4dD10eHQucmVwbGFjZSgnficsXCJcIisod2F2ZW51bWJlcisxKSlcclxuICAgICAgICAgICAgdGhpcy5XYXZlcy5nZXRDb21wb25lbnQoY2MuUmljaFRleHQpLnN0cmluZz10eHRcclxuICAgICAgICAgICAgdGhpcy5idC5nZXRDb21wb25lbnQoVGV4dExhbmd1YWdlKS5zZXRUZXh0SWQoODAwMDAxKVxyXG4gICAgICAgICAgICB0aGlzLmJ0MS5nZXRDb21wb25lbnQoVGV4dExhbmd1YWdlKS5zZXRUZXh0SWQoODAwMDAzKVxyXG4gICAgICAgICAgICB0aGlzLkJvc3NSdXNoX1RpbWVfQmcuYWN0aXZlPWZhbHNlXHJcbiAgICAgICAgICAgIHRoaXMuQm9zc1J1c2hfQnRuX0JvbnVzLmFjdGl2ZT10cnVlXHJcbiAgICAgICAgICAgIHRoaXMudGltZS5hY3RpdmU9ZmFsc2VcclxuICAgICAgICAgICAgdGhpcy5idG55ZXMuYWN0aXZlPXRydWVcclxuICAgICAgICB9IGVsc2UgaWYgKHRoaXMudHlwZSA9PSAzKSB7XHJcbiAgICAgICAgICAgIHRoaXMuYnRueWVzLmFjdGl2ZT10cnVlXHJcbiAgICAgICAgICAgIEZvbGxvd01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5mb2xsb3dFdmVudChGb2xsb3dfVHlwZS5CT1NT5oyR5oiY6aG16Z2i5bGV56S65qyh5pWwKTtcclxuICAgICAgICAgICAgdGhpcy5ib3NzLmFjdGl2ZSA9IHRydWVcclxuICAgICAgICAgICAgLy8gdGhpcy5Cb3NzUnVzaF9CdG5fUmVjb3JkLmFjdGl2ZSA9IHRydWVcclxuICAgICAgICAgICAgbGV0IFJvdGF0aW9uT3JkZXIgPSBVc2VySW5mby5nZXRJbnN0YW5jZSgpLlJvdGF0aW9uT3JkZXIvL+i9ruaNoumhuuW6j1xyXG4gICAgICAgICAgICBsZXQgU3RhZ2UgPSAxLy/pmLbmrrVcclxuICAgICAgICAgICAgdGhpcy5XYXZlcy5hY3RpdmU9ZmFsc2VcclxuICAgICAgICAgICAgbGV0IENoYWxsZW5nZUlEID0gUm90YXRpb25PcmRlciAqIDEwMDAgKyBTdGFnZS8v5oyR5oiYSURcclxuICAgICAgICAgICAgdGhpcy5iYmcuZ2V0Q29tcG9uZW50KGNjLlNwcml0ZSkuc3ByaXRlRnJhbWU9dGhpcy5ianNwcltCb3NzQ2hhbGxlbmdlTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldENoYXB0ZXJTY2VuZShDaGFsbGVuZ2VJRCldLy/mjaLog4zmma9cclxuICAgICAgICAgICAgRWxpdGVNb25zdGVyID0gRWxpdGVNb25zdGVyLmNvbmNhdChCb3NzQ2hhbGxlbmdlTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldE1vbnN0ZXJJZChDaGFsbGVuZ2VJRCkpLy/mgKrnialpZFxyXG4gICAgICAgICAgICB0aGlzLmJiZy55PTBcclxuICAgICAgICAgICAgbGV0IFNraWxsTnVtPU1vbnN0ZXJDb25maWd1cmVNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0U2tpbGxOdW0oRWxpdGVNb25zdGVyWzBdKVxyXG4gICAgICAgICAgICBmb3IgKGxldCBpbmRleCA9IDA7IGluZGV4IDwgdGhpcy5qaW5lbmcuY2hpbGRyZW4ubGVuZ3RoOyBpbmRleCsrKSB7XHJcbiAgICAgICAgICAgICAgICBpZihpbmRleDxTa2lsbE51bSl7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5qaW5lbmcuY2hpbGRyZW5baW5kZXhdLmFjdGl2ZT10cnVlXHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IHNwcml0ZWlkPShFbGl0ZU1vbnN0ZXJbMF0qMTAwMCkrKChpbmRleCsxKSoxMDApKzFcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmJvc3NzcHJpdGVpZD1FbGl0ZU1vbnN0ZXJbMF1cclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmppbmVuZy5jaGlsZHJlbltpbmRleF0uZ2V0Q29tcG9uZW50KGNjLlNwcml0ZSkuc3ByaXRlRnJhbWU9dGhpcy5jb3B5X3VpLmdldFNwcml0ZUZyYW1lKFwiTW9uc3RlclNraWxsX1wiK3Nwcml0ZWlkKVxyXG4gICAgICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5qaW5lbmcuY2hpbGRyZW5baW5kZXhdLmFjdGl2ZT1mYWxzZVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMuYnQuZ2V0Q29tcG9uZW50KFRleHRMYW5ndWFnZSkuc2V0VGV4dElkKDgyMDAwMSlcclxuICAgICAgICAgICAgdGhpcy5idDEuZ2V0Q29tcG9uZW50KFRleHRMYW5ndWFnZSkuc2V0VGV4dElkKDgyMDAwNSlcclxuICAgICAgICAgICAgdGhpcy5Cb3NzUnVzaF9UaW1lX0JnLmFjdGl2ZT10cnVlXHJcbiAgICAgICAgICAgIHRoaXMudGltZS5hY3RpdmU9dHJ1ZVxyXG5cclxuICAgICAgICAgICAgdGhpcy5Cb3NzUnVzaF9CdG5fQm9udXMuYWN0aXZlPXRydWVcclxuXHJcbiAgICAgICAgICAgIGxldCBSYW5rPVVzZXJJbmZvLmdldEluc3RhbmNlKCkuZGFtYWdlTnVtYmVyTGFzdC8v5piv5ZCm5LiK5o6S6KGM5qac5ZCN5qyhICDlvpfliLDlkI7lj7DmlbDmja5cclxuICAgICAgICAgICAgLy8gY29uc29sZS5sb2coXCI9PT09XCIsUmFuaylcclxuICAgICAgICAgICAgLy8gbGV0IHVpZCA9IFVzZXJEYXRhLmdldEluc3RhbmNlKCkuZ2V0VXNlcklEKCk7XHJcbiAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKFwiPT09PS0tLS1cIix1aWQpXHJcbiAgICAgICAgICAgIGxldCBSZXdhcmRHcmFkZT0tMS8v5o6S5ZCNICDpu5jorqQtMSAgXHJcbiAgICAgICAgICAgIGlmKFJhbms+LTEpe1xyXG4gICAgICAgICAgICAgICAgLy8gUmFuaz0tMS8v5L+u5pS55ZCO5Y+w5pWw5o2u5Li6MFxyXG4gICAgICAgICAgICAgICAgbGV0IHVpZCA9IFVzZXJEYXRhLmdldEluc3RhbmNlKCkuZ2V0VXNlcklEKCk7XHJcbiAgICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhcIj09PT0tLS0tXCIsdWlkKVxyXG4gICAgICAgICAgICAgICAgbGV0IGpzb249e1xyXG4gICAgICAgICAgICAgICAgICAgIHVpZDp1aWQsXHJcbiAgICAgICAgICAgICAgICAgICAgZGFtYWdlTnVtYmVyTGFzdDogLTEsXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBVc2VySW5mby5nZXRJbnN0YW5jZSgpLmRhbWFnZU51bWJlckxhc3Q9LTFcclxuICAgICAgICAgICAgICAgIEh0dHBNYW5hZ2VyLnBvc3QoQWNjZXNzTmFtZS51cGRhdGVVc2VySW5mb0ROTCxKU09OLnN0cmluZ2lmeShqc29uKSkudGhlbigoZGF0YTphbnkpPT57XHJcbiAgICAgICAgICAgICAgICAgICAgaWYoUmFuaz09MCl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFJld2FyZEdyYWRlPTdcclxuICAgICAgICAgICAgICAgICAgICB9ZWxzZSBpZihSYW5rPT0xKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgUmV3YXJkR3JhZGU9MVxyXG4gICAgICAgICAgICAgICAgICAgIH1lbHNlIGlmKFJhbms9PTIpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBSZXdhcmRHcmFkZT0yXHJcbiAgICAgICAgICAgICAgICAgICAgfWVsc2UgaWYoUmFuaz09Myl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFJld2FyZEdyYWRlPTNcclxuICAgICAgICAgICAgICAgICAgICB9ZWxzZSBpZihSYW5rPD0xMCYmUmFuaz49NCl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFJld2FyZEdyYWRlPTRcclxuICAgICAgICAgICAgICAgICAgICB9ZWxzZSBpZihSYW5rPD01MCYmUmFuaz49MTEpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBSZXdhcmRHcmFkZT01XHJcbiAgICAgICAgICAgICAgICAgICAgfWVsc2UgaWYoUmFuazw9MTAwJiZSYW5rPj01MSl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFJld2FyZEdyYWRlPTZcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IHJld2FyZERhdGE9IEJvc3NXZWVrbHlSZXdhcmRNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0Rmlyc3RSZXdhcmRBcnIoUmV3YXJkR3JhZGUpXHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IGl0ZW1hcnI9W11cclxuICAgICAgICAgICAgICAgICAgICBmb3IgKGxldCBpbmRleCA9IDA7IGluZGV4IDwgcmV3YXJkRGF0YS5sZW5ndGg7IGluZGV4KyspIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGl0ZW1zPVByb3BNYW5hZ2VyLmdldEluc3RhbmNlKCkuY3JlYXRlUHJvcEl0ZW0ocmV3YXJkRGF0YVtpbmRleF0ucmV3YXJkX2lkLHJld2FyZERhdGFbaW5kZXhdLnJld2FyZF9udW0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpdGVtYXJyLnB1c2goaXRlbXMpXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIEdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuc2hvd011bHRpcGxlR2V0VGlwKGl0ZW1hcnIpO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIGlmKGRhdGEudWlkKXtcclxuICAgICAgICAgICAgICAgICAgICAvLyB9XHJcbiAgICAgICAgICAgICAgICB9KS5jYXRjaCgoZXJyb3IpPT57XHJcbiAgICAgICAgICAgICAgICAgICAgY2MuZXJyb3IoZXJyb3IpO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAvLyBIdHRwTWFuYWdlci5wb3N0KEFjY2Vzc05hbWUudXBkYXRlVXNlckluZm9ETkwsdGhpcy5zZXRSYW5rSnNvblN0cmluZygpKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1lbHNlIGlmICh0aGlzLnR5cGUgPT0gNCkge1xyXG4gICAgICAgICAgICB0aGlzLmJvc3MuYWN0aXZlID0gZmFsc2VcclxuICAgICAgICAgICAgdGhpcy54dmtvbi5hY3RpdmU9dHJ1ZVxyXG4gICAgICAgICAgICB0aGlzLldhdmVzLmFjdGl2ZT1mYWxzZVxyXG4gICAgICAgICAgICB0aGlzLlByb21vdGlvbi5hY3RpdmU9ZmFsc2VcclxuICAgICAgICAgICAgdGhpcy5vbmUuYWN0aXZlPWZhbHNlXHJcbiAgICAgICAgICAgIHRoaXMuUmFua2luZ1NlbGYuYWN0aXZlPWZhbHNlXHJcbiAgICAgICAgICAgIHRoaXMuQm9zc1J1c2hfQnRuX1JhbmsuYWN0aXZlPWZhbHNlXHJcbiAgICAgICAgICAgIHRoaXMuQm9zc1J1c2hfQnRuX0JvbnVzLmFjdGl2ZT1mYWxzZVxyXG4gICAgICAgICAgICB0aGlzLk1hemVfQnRuX1Nob3AuYWN0aXZlPXRydWVcclxuICAgICAgICAgICAgdGhpcy5Cb3NzUnVzaF9UaW1lX0JnLmFjdGl2ZT1mYWxzZVxyXG4gICAgICAgICAgICB0aGlzLnRpbWUuYWN0aXZlPWZhbHNlXHJcbiAgICAgICAgICAgIHRoaXMuYmJnLnk9MjgwXHJcbiAgICAgICAgICAgIHRoaXMuYmJnLmdldENvbXBvbmVudChjYy5TcHJpdGUpLnNwcml0ZUZyYW1lPXRoaXMuYmpzcHJ4dmtvblxyXG4gICAgICAgICAgICB0aGlzLmJ0LmdldENvbXBvbmVudChUZXh0TGFuZ3VhZ2UpLnNldFRleHRJZCg4MzAwMDEpXHJcbiAgICAgICAgICAgIHRoaXMuYnQxLmdldENvbXBvbmVudChUZXh0TGFuZ3VhZ2UpLnNldFRleHRJZCg4MjAwMDUpXHJcbiAgICAgICAgICAgIGZvciAobGV0IGNvbnRlbnRpbmRleCA9IDA7IGNvbnRlbnRpbmRleCA8IHRoaXMuY29udGVudC5jaGlsZHJlbi5sZW5ndGg7IGNvbnRlbnRpbmRleCsrKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgbXljb250ZW50aW5kZXg9Y29udGVudGluZGV4XHJcbiAgICAgICAgICAgICAgICBpZihteWNvbnRlbnRpbmRleD09MCl7XHJcbiAgICAgICAgICAgICAgICAgICAgbXljb250ZW50aW5kZXg9OFxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgaWYobXljb250ZW50aW5kZXg9PTkpe1xyXG4gICAgICAgICAgICAgICAgICAgIG15Y29udGVudGluZGV4PTFcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGxldCBpZD1Sb2d1ZUdpZnRJbmZvcm1hdGlvbk1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRQcm9wSURfMSgobXljb250ZW50aW5kZXgpKVxyXG4gICAgICAgICAgICAgICAgbGV0IGl0ZW09UHJvcE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5jcmVhdGVQcm9wSXRlbShpZCwwKTtcclxuICAgICAgICAgICAgICAgIGl0ZW0ucGFyZW50PXRoaXMuY29udGVudC5jaGlsZHJlbltjb250ZW50aW5kZXhdLmNoaWxkcmVuWzBdXHJcblxyXG4gICAgICAgICAgICAgICAgbGV0IGlkMT1Sb2d1ZUdpZnRJbmZvcm1hdGlvbk1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRQcm9wSURfMigobXljb250ZW50aW5kZXgpKVxyXG4gICAgICAgICAgICAgICAgbGV0IGl0ZW0xPVByb3BNYW5hZ2VyLmdldEluc3RhbmNlKCkuY3JlYXRlUHJvcEl0ZW0oaWQxLDApO1xyXG4gICAgICAgICAgICAgICAgaXRlbTEucGFyZW50PXRoaXMuY29udGVudC5jaGlsZHJlbltjb250ZW50aW5kZXhdLmNoaWxkcmVuWzFdXHJcblxyXG4gICAgICAgICAgICAgICAgbGV0IGlkMj1Sb2d1ZUdpZnRJbmZvcm1hdGlvbk1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRQcm9wSURfMygobXljb250ZW50aW5kZXgpKVxyXG4gICAgICAgICAgICAgICAgbGV0IGl0ZW0yPVByb3BNYW5hZ2VyLmdldEluc3RhbmNlKCkuY3JlYXRlUHJvcEl0ZW0oaWQyLDApO1xyXG4gICAgICAgICAgICAgICAgaXRlbTIucGFyZW50PXRoaXMuY29udGVudC5jaGlsZHJlbltjb250ZW50aW5kZXhdLmNoaWxkcmVuWzJdXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZm9yIChsZXQgaW5kZXggPSAwOyBpbmRleCA8IHRoaXMucG9zLmNoaWxkcmVuLmxlbmd0aDsgaW5kZXgrKykge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5oZXJvU2hhZG93LmNoaWxkcmVuW2luZGV4XS5hY3RpdmUgPSBmYWxzZVxyXG4gICAgICAgICAgICAgICAgdGhpcy5wb3MuY2hpbGRyZW5baW5kZXhdLmFjdGl2ZSA9IGZhbHNlXHJcbiAgICAgICAgICAgIH0gICBcclxuICAgICAgICAgICAgbGV0IGluZGV4PXRoaXMuUGFnZVZpZXcuZ2V0Q29tcG9uZW50KGNjLlBhZ2VWaWV3KS5nZXRDdXJyZW50UGFnZUluZGV4KClcclxuICAgICAgICAgICAgaWYoaW5kZXg9PTEpe1xyXG4gICAgICAgICAgICAgICAgdGhpcy5idDEuZ2V0Q29tcG9uZW50KFRleHRMYW5ndWFnZSkuc2V0VGV4dElkKDEwMDA1MylcclxuICAgICAgICAgICAgICAgIHRoaXMuYnQxLmdldENvbXBvbmVudChUZXh0TGFuZ3VhZ2UpLnNldFJlcGxhY2VWYWx1ZSgnficsKGluZGV4KSsgJycpO1xyXG4gICAgICAgICAgICAgICAgbGV0IGRhbWFnZT1UaGVTdG9yYWdlTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldE51bWJlcihTdG9yYWdlS2V5LlZvaWRDcmFja0NoYWxsZW5nZURhbWFnZSwwKTtcclxuICAgICAgICAgICAgICAgIGxldCBudW0gPSBUaGVTdG9yYWdlTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldE51bWJlcihTdG9yYWdlS2V5LlZvaWRDcmFja0NoYWxsZW5nZVRpbWVzLDMpO1xyXG4gICAgICAgICAgICAgICAgaWYoKGRhbWFnZSsxKT49aW5kZXgpe1xyXG4gICAgICAgICAgICAgICAgICAgIGlmKGluZGV4PT0oZGFtYWdlKzEpKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5idG5uby5hY3RpdmU9ZmFsc2VcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5idG55ZXMuYWN0aXZlPXRydWVcclxuICAgICAgICAgICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYobnVtPjApe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5idG5uby5hY3RpdmU9dHJ1ZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuYnRubm8uYWN0aXZlPWZhbHNlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5idG55ZXMuYWN0aXZlPXRydWVcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmJ0bm5vLmFjdGl2ZT1mYWxzZVxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYnRueWVzLmFjdGl2ZT1mYWxzZVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgIHRoaXMuY29udGVudC54PS04MjVcclxuICAgICAgICAgICAgICAgIHRoaXMuUGFnZVZpZXcuZ2V0Q29tcG9uZW50KGNjLlBhZ2VWaWV3KS5zY3JvbGxUb1BhZ2UoMSwwLjAxKVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVyblxyXG4gICAgICAgIH1cclxuICAgICAgICAvL+eUn+aIkOaAqueJqVxyXG4gICAgICAgIGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCB0aGlzLnBvcy5jaGlsZHJlbi5sZW5ndGg7IGluZGV4KyspIHtcclxuICAgICAgICAgICAgdGhpcy5oZXJvU2hhZG93LmNoaWxkcmVuW2luZGV4XS5hY3RpdmUgPSBmYWxzZVxyXG4gICAgICAgICAgICB0aGlzLnBvcy5jaGlsZHJlbltpbmRleF0uYWN0aXZlID0gZmFsc2VcclxuICAgICAgICAgICAgaWYgKGluZGV4IDwgRWxpdGVNb25zdGVyLmxlbmd0aCkge1xyXG4gICAgICAgICAgICAgICAgbGV0IGVsaXRldHlwZSA9IE1vbnN0ZXJDb25maWd1cmVNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0TW9uc3RlckNsYXNzKEVsaXRlTW9uc3RlcltpbmRleF0pO1xyXG4gICAgICAgICAgICAgICAgbGV0IHBhdGggPSBcIm1vbnN0ZXIvdWkvTW9uc3Rlcl9cIiArIGVsaXRldHlwZTtcclxuICAgICAgICAgICAgICAgIGxldCBub2RlOiBjYy5Ob2RlID0gbnVsbDtcclxuICAgICAgICAgICAgICAgIFdYTWFuYWdlckVYLmdldEluc3RhbmNlKCkucmVzb3VyY2VzQnVuZGxlLmxvYWQocGF0aCwgY2MuUHJlZmFiLCAoZXJyb3I6IEVycm9yLCBhc3NldHM6IGNjLlByZWZhYikgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChlcnJvcikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjYy5sb2coZXJyb3IpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIG5vZGUgPSBjYy5pbnN0YW50aWF0ZShhc3NldHMpO1xyXG4gICAgICAgICAgICAgICAgICAgIG5vZGUuc2V0UG9zaXRpb24oMCwgMCwgMClcclxuICAgICAgICAgICAgICAgICAgICBsZXQgaWQgPSBFbGl0ZU1vbnN0ZXJbaW5kZXhdXHJcbiAgICAgICAgICAgICAgICAgICAgbm9kZS5zY2FsZSA9IE1vbnN0ZXJDb25maWd1cmVNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0U2NhbGUoaWQpO1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBTdHJlbmd0aFR5cGUgPSBNb25zdGVyQ29uZmlndXJlTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldFN0cmVuZ3RoVHlwZShpZClcclxuICAgICAgICAgICAgICAgICAgICBub2RlLnBhcmVudCA9IHRoaXMucG9zLmNoaWxkcmVuW2luZGV4XVxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaGVyb1NoYWRvdy5jaGlsZHJlbltpbmRleF0uYWN0aXZlID0gdHJ1ZVxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChTdHJlbmd0aFR5cGUgPT0gMykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmhlcm9TaGFkb3cuY2hpbGRyZW5baW5kZXhdLnNldFNjYWxlKDEuMywgMS4zKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBub2RlLnNjYWxlID0gTW9uc3RlckNvbmZpZ3VyZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRTY2FsZShpZCkgKiAxO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBub2RlLmdldENvbXBvbmVudChzcC5Ta2VsZXRvbikuc2V0QW5pbWF0aW9uKDAsIE1vbnN0ZXJBY3Rpb25OYW1lLklkbGUsIHRydWUpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAoU3RyZW5ndGhUeXBlID09IDIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5oZXJvU2hhZG93LmNoaWxkcmVuW2luZGV4XS5zZXRTY2FsZSgwLjcsIDAuNylcclxuICAgICAgICAgICAgICAgICAgICAgICAgbm9kZS5zY2FsZSA9IE1vbnN0ZXJDb25maWd1cmVNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0U2NhbGUoaWQpICogMTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbm9kZS5nZXRDb21wb25lbnQoc3AuU2tlbGV0b24pLnNldFNraW4oTW9uc3RlckZhY2VOYW1lLlNpZGVSICsgTW9uc3RlckNvbmZpZ3VyZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRTa2luKGlkKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG5vZGUuZ2V0Q29tcG9uZW50KHNwLlNrZWxldG9uKS5zZXRBbmltYXRpb24oMCwgTW9uc3RlckZhY2VOYW1lLlNpZGVSICsgXCJfXCIgKyBNb25zdGVyQWN0aW9uTmFtZS5JZGxlLCB0cnVlKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKFN0cmVuZ3RoVHlwZSA9PSAxKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuaGVyb1NoYWRvdy5jaGlsZHJlbltpbmRleF0uc2V0U2NhbGUoMC40LCAwLjQpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG5vZGUuc2NhbGUgPSBNb25zdGVyQ29uZmlndXJlTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldFNjYWxlKGlkKSAqIDE7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG5vZGUuZ2V0Q29tcG9uZW50KHNwLlNrZWxldG9uKS5zZXRTa2luKE1vbnN0ZXJGYWNlTmFtZS5TaWRlUiArIE1vbnN0ZXJDb25maWd1cmVNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0U2tpbihpZCkpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBub2RlLmdldENvbXBvbmVudChzcC5Ta2VsZXRvbikuc2V0QW5pbWF0aW9uKDAsIE1vbnN0ZXJGYWNlTmFtZS5TaWRlUiArIFwiX1wiICsgTW9uc3RlckFjdGlvbk5hbWUuSWRsZSwgdHJ1ZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnBvcy5jaGlsZHJlbltpbmRleF0uYWN0aXZlID0gdHJ1ZVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8v546p5a625o6S5ZCNXHJcbiAgICAgICAgbGV0IHNlbGZyYW5raW5nID0gLTFcclxuICAgICAgICBsZXQgY29tYmF0UG93ZXIgPSAwXHJcbiAgICAgICAgaWYgKHRoaXMudHlwZSA9PSAyKSB7XHJcbiAgICAgICAgICAgIGNvbWJhdFBvd2VyID0gRW5kbGVzc0xldmVsc01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRNYXhXYXZlKCkvL0hlcm9NYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0QWxsSGVyb1poYW5saSgpLy/ojrflj5bms6LmlbBcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHRoaXMudHlwZSA9PSAzKSB7XHJcbiAgICAgICAgICAgIGNvbWJhdFBvd2VyID0gQm9zc0NoYWxsZW5nZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRNYXhEYW1hZ2VOdW1iZXIoKS8v6I635Y+W5Lyk5a6zXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGxldCBDb21iYXRQb3dlciA9IHRoaXMuUmFua2luZ1NlbGYuZ2V0Q2hpbGRCeU5hbWUoXCJDb21iYXRQb3dlclwiKVxyXG4gICAgICAgIGxldCBTZXJpYWxObyA9IHRoaXMuUmFua2luZ1NlbGYuZ2V0Q2hpbGRCeU5hbWUoXCJTZXJpYWxOb1wiKVxyXG4gICAgICAgIGxldCBuYW1lID0gdGhpcy5SYW5raW5nU2VsZi5nZXRDaGlsZEJ5TmFtZShcIm5hbWVcIilcclxuICAgICAgICBsZXQgYnRuQXZhdGFyID0gdGhpcy5SYW5raW5nU2VsZi5nZXRDaGlsZEJ5TmFtZShcImhlYWRQb3J0cmFpdFwiKS5nZXRDaGlsZEJ5TmFtZShcImJ0bkF2YXRhclwiKVxyXG4gICAgICAgIENvbWJhdFBvd2VyLmdldENvbXBvbmVudChUZXh0TGFuZ3VhZ2UpLnNldFRleHRJZCh0aGlzLnRleHRbdGhpcy50eXBlIC0gMV0pLy/mmK/lk6rkuKrmjpLooYzmppxcclxuICAgICAgICBDb21iYXRQb3dlci5nZXRDb21wb25lbnQoVGV4dExhbmd1YWdlKS5zZXRSZXBsYWNlVmFsdWUoJ34nLCAoY29tYmF0UG93ZXIpICsgJycpOy8v5o6S6KGM5qac5oiY5Yqb5pWw5o2uXHJcbiAgICAgICAgdGhpcy5Qcm9tb3Rpb24uYWN0aXZlPWZhbHNlXHJcbiAgICAgICAgdGhpcy5vbmUuYWN0aXZlPWZhbHNlXHJcbiAgICAgICAgU2VyaWFsTm8uYWN0aXZlPWZhbHNlXHJcbiAgICAgICAgdGhpcy5SYW5raW5nU2VsZi5nZXRDaGlsZEJ5TmFtZShcIk5vdGxpc3RlZFwiKS5hY3RpdmUgPWZhbHNlXHJcbiAgICAgICAgdGhpcy5SYW5raW5nU2VsZi5nZXRDb21wb25lbnQoY2MuU3ByaXRlKS5zcHJpdGVGcmFtZT10aGlzLmNvcHlfdWkuZ2V0U3ByaXRlRnJhbWUoXCJCb3NzUnVzaF9SYW5rXzRcIilcclxuICAgICAgICBIdHRwTWFuYWdlci5wb3N0KEFjY2Vzc05hbWUubGVhZGVyYm9hcmRCeVVzZXIsIHRoaXMuZ2V0TGVhZGVyYm9hcmRCeVVzZXJKc29uU3RyaW5nKHRoaXMudHlwZSksIHRydWUpLnRoZW4oKGRhdGE6IGFueSkgPT4ge1xyXG4gICAgICAgICAgICBsZXQgbWF4ID0gZGF0YS5sZW5ndGg7XHJcbiAgICAgICAgICAgIGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCBtYXg7IGluZGV4KyspIHtcclxuICAgICAgICAgICAgICAgIGlmKGRhdGFbaW5kZXhdLnVpZD09VXNlckRhdGEuZ2V0SW5zdGFuY2UoKS5nZXRVc2VySUQoKSl7ICAgIC8v5aaC5p6c5Zyo5ZCO5Y+w5ouJ5Y+W55qE5o6S5ZCN5Lit5pyJaWTot5/njqnlrrbnmoRpZOS4gOagt++8jOmCo+S5iOeOqeWutueahOaOkuWQjeWcqOWJjTEwMOWQjeS4rSAg5bCG5pi+56S6546p5a625o6S5ZCNICAg5ZCm5YiZ5pi+56S65pyq5LiK5qacXHJcbiAgICAgICAgICAgICAgICAgICAgc2VsZnJhbmtpbmc9KGluZGV4KzEpXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYoc2VsZnJhbmtpbmc9PTEpe1xyXG4gICAgICAgICAgICAgICAgdGhpcy5vbmUuYWN0aXZlPXRydWVcclxuICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICBsZXQgdHh0PUxhbmd1YWdlTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldFN0ckJ5VGV4dElkKDgwMDAwNClcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLnR5cGUgPT0gMikge1xyXG4gICAgICAgICAgICAgICAgICAgIHR4dD1MYW5ndWFnZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRTdHJCeVRleHRJZCg4MDAwMDQpLy/ovr7liLDlpJrlsJHms6LvvIzlj6/mmYvljYfoh7PlpJrlsJHlkI0gICBcclxuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAodGhpcy50eXBlID09IDMpIHtcclxuICAgICAgICAgICAgICAgICAgICB0eHQ9TGFuZ3VhZ2VNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0U3RyQnlUZXh0SWQoODIwMDA3KS8v6L6+5Yiw5aSa5bCR5Lyk5a6z77yM5Y+v5pmL5Y2H6Iez5aSa5bCR5ZCNXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpZihkYXRhLmxlbmd0aD4wKXtcclxuICAgICAgICAgICAgICAgICAgICBpZihzZWxmcmFua2luZz09LTEpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0eHQ9dHh0LnJlcGxhY2UoJ354JyxcIlwiK2RhdGFbbWF4LTFdLnZhbHVlKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0eHQ9dHh0LnJlcGxhY2UoJ355JyxcIlwiK21heClcclxuICAgICAgICAgICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdHh0PXR4dC5yZXBsYWNlKCd+eCcsXCJcIitkYXRhW3NlbGZyYW5raW5nLTJdLnZhbHVlKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0eHQ9dHh0LnJlcGxhY2UoJ355JyxcIlwiKyhzZWxmcmFua2luZy0xKSlcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5Qcm9tb3Rpb24uZ2V0Q29tcG9uZW50KGNjLlJpY2hUZXh0KS5zdHJpbmc9dHh0Oy8v6L6+5Yiw5aSa5bCR5rOi77yM5Y+v5pmL5Y2H6Iez5aSa5bCR5ZCNICAgXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5Qcm9tb3Rpb24uYWN0aXZlPXRydWVcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAoc2VsZnJhbmtpbmc8PTMmJnNlbGZyYW5raW5nPj0xKSB7XHJcbiAgICAgICAgICAgICAgICBTZXJpYWxOby5hY3RpdmUgPSBmYWxzZVxyXG4gICAgICAgICAgICAgICAgdGhpcy5SYW5raW5nU2VsZi5nZXRDb21wb25lbnQoY2MuU3ByaXRlKS5zcHJpdGVGcmFtZT10aGlzLmNvcHlfdWkuZ2V0U3ByaXRlRnJhbWUoXCJCb3NzUnVzaF9SYW5rX1wiK3NlbGZyYW5raW5nKSAvL+WJjeS4ieWQjeeahOiDjOaZr+S4jeS4gOagt1xyXG4gICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgIGlmKHNlbGZyYW5raW5nPj0xKXtcclxuICAgICAgICAgICAgICAgICAgICBTZXJpYWxOby5hY3RpdmUgPSB0cnVlXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB0aGlzLlJhbmtpbmdTZWxmLmdldENvbXBvbmVudChjYy5TcHJpdGUpLnNwcml0ZUZyYW1lPXRoaXMuY29weV91aS5nZXRTcHJpdGVGcmFtZShcIkJvc3NSdXNoX1JhbmtfNFwiKVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmIChzZWxmcmFua2luZyA9PSAtMSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5SYW5raW5nU2VsZi5nZXRDaGlsZEJ5TmFtZShcIk5vdGxpc3RlZFwiKS5hY3RpdmUgPSB0cnVlXHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBTZXJpYWxOby5nZXRDb21wb25lbnQoY2MuTGFiZWwpLnN0cmluZyA9IFwiXCIgKyAoc2VsZnJhbmtpbmcpLy/luo/lj7dcclxuICAgICAgICAgICAgICAgIHRoaXMuUmFua2luZ1NlbGYuZ2V0Q2hpbGRCeU5hbWUoXCJOb3RsaXN0ZWRcIikuYWN0aXZlID0gZmFsc2VcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIGxldCBteW5hbWUgPSBVc2VyRGF0YS5nZXRJbnN0YW5jZSgpLmdldFVzZXJOYW1lKCk7IC8v546p5a625ZCN5a2XXHJcbiAgICAgICAgbGV0IHNwaGVhID0gVXNlckRhdGEuZ2V0SW5zdGFuY2UoKS5nZXRVc2VyQXZhdGFyKCk7Ly/njqnlrrblpLTlg49cclxuICAgICAgICBuYW1lLmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nID0gXCJcIiArIG15bmFtZS8v546p5a625ZCN5a2XXHJcbiAgICAgICAgYnRuQXZhdGFyLmdldENvbXBvbmVudChjYy5TcHJpdGUpLnNwcml0ZUZyYW1lID0gUHJvcE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRTcGhlYWRQb3J0cmFpdFR5cGUoc3BoZWEpLy/lpLTlg49pZFxyXG4gICAgfVxyXG4gICAgZGVzKCkgey8v5riF6Zmk5omA5pyJ5oCq54mp55qE6aKE5Yi25L2TLlxyXG4gICAgICAgIGlmKHRoaXMudHlwZT09NCl7Ly/muIXpmaTomZrnqbroo4LnvJ3nmoTnq6DoioLlpZblirFcclxuICAgICAgICAgICAgZm9yIChsZXQgY29udGVudGluZGV4ID0gMDsgY29udGVudGluZGV4IDwgdGhpcy5jb250ZW50LmNoaWxkcmVuLmxlbmd0aDsgY29udGVudGluZGV4KyspIHtcclxuICAgICAgICAgICAgICAgIGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCAzOyBpbmRleCsrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYodGhpcy5jb250ZW50LmNoaWxkcmVuW2NvbnRlbnRpbmRleF0uY2hpbGRyZW5baW5kZXhdLmNoaWxkcmVuQ291bnQ+MCl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuY29udGVudC5jaGlsZHJlbltjb250ZW50aW5kZXhdLmNoaWxkcmVuW2luZGV4XS5kZXN0cm95QWxsQ2hpbGRyZW4oKVxyXG4gICAgICAgICAgICAgICAgICAgIH0gXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgZm9yIChsZXQgaW5kZXggPSAwOyBpbmRleCA8IHRoaXMucG9zLmNoaWxkcmVuLmxlbmd0aDsgaW5kZXgrKykge1xyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMucG9zLmNoaWxkcmVuW2luZGV4XS5jaGlsZHJlbi5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5wb3MuY2hpbGRyZW5baW5kZXhdLmRlc3Ryb3lBbGxDaGlsZHJlbigpXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBjbGlja0J0bk1hemVfQ2hhbmdlKGV2ZW4saSl7Ly/liIfmjaLnq6DoioLnmoTmjInpkq4gIDA65bemICAgMe+8muWPs1xyXG4gICAgICAgIGxldCBpbmRleD10aGlzLlBhZ2VWaWV3LmdldENvbXBvbmVudChjYy5QYWdlVmlldykuZ2V0Q3VycmVudFBhZ2VJbmRleCgpXHJcbiAgICAgICAgaWYoaT09MCl7XHJcbiAgICAgICAgICAgIGluZGV4LS1cclxuICAgICAgICB9XHJcbiAgICAgICAgaWYoaT09MSl7XHJcbiAgICAgICAgICAgIGluZGV4KytcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5QYWdlVmlldy5nZXRDb21wb25lbnQoY2MuUGFnZVZpZXcpLnNjcm9sbFRvUGFnZShpbmRleCwwLjMpXHJcbiAgICB9XHJcbiAgICAvLyDms6jmhI/lj4LmlbDnmoTpobrluo/lkoznsbvlnovmmK/lm7rlrprnmoRcclxuICAgIFBhZ2VWaWV3Y2FsbGJhY2soKSB7XHJcbiAgICAgICAgbGV0IGluZGV4PXRoaXMuUGFnZVZpZXcuZ2V0Q29tcG9uZW50KGNjLlBhZ2VWaWV3KS5nZXRDdXJyZW50UGFnZUluZGV4KClcclxuICAgICAgICBpZihpbmRleD09MCl7XHJcbiAgICAgICAgICAgIHRoaXMuY29udGVudC54PS00Njc1XHJcbiAgICAgICAgICAgIHRoaXMuUGFnZVZpZXcuZ2V0Q29tcG9uZW50KGNjLlBhZ2VWaWV3KS5zY3JvbGxUb1BhZ2UoOCwwLjAxKVxyXG4gICAgICAgIH1cclxuICAgICAgICBpZihpbmRleD09OSl7XHJcbiAgICAgICAgICAgIHRoaXMuY29udGVudC54PS04MjVcclxuICAgICAgICAgICAgdGhpcy5QYWdlVmlldy5nZXRDb21wb25lbnQoY2MuUGFnZVZpZXcpLnNjcm9sbFRvUGFnZSgxLDAuMDEpXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGluZGV4PXRoaXMuUGFnZVZpZXcuZ2V0Q29tcG9uZW50KGNjLlBhZ2VWaWV3KS5nZXRDdXJyZW50UGFnZUluZGV4KClcclxuICAgICAgICB0aGlzLmJ0MS5nZXRDb21wb25lbnQoVGV4dExhbmd1YWdlKS5zZXRUZXh0SWQoMTAwMDUzKVxyXG4gICAgICAgIHRoaXMuYnQxLmdldENvbXBvbmVudChUZXh0TGFuZ3VhZ2UpLnNldFJlcGxhY2VWYWx1ZSgnficsKGluZGV4KSsgJycpO1xyXG5cclxuICAgICAgICBsZXQgZGFtYWdlPVRoZVN0b3JhZ2VNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0TnVtYmVyKFN0b3JhZ2VLZXkuVm9pZENyYWNrQ2hhbGxlbmdlRGFtYWdlLDApO1xyXG4gICAgICAgIGxldCBudW0gPSBUaGVTdG9yYWdlTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldE51bWJlcihTdG9yYWdlS2V5LlZvaWRDcmFja0NoYWxsZW5nZVRpbWVzLDMpO1xyXG4gICAgICAgIGlmKChkYW1hZ2UrMSk+PWluZGV4KXtcclxuICAgICAgICAgICAgaWYoaW5kZXg9PShkYW1hZ2UrMSkpe1xyXG4gICAgICAgICAgICAgICAgdGhpcy5idG5uby5hY3RpdmU9ZmFsc2VcclxuICAgICAgICAgICAgICAgIHRoaXMuYnRueWVzLmFjdGl2ZT10cnVlXHJcbiAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgaWYobnVtPjApe1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYnRubm8uYWN0aXZlPXRydWVcclxuICAgICAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYnRubm8uYWN0aXZlPWZhbHNlXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIHRoaXMuYnRueWVzLmFjdGl2ZT10cnVlXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgdGhpcy5idG5uby5hY3RpdmU9ZmFsc2VcclxuICAgICAgICAgICAgdGhpcy5idG55ZXMuYWN0aXZlPWZhbHNlXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgY2xpY2tCdG5DbG9zZSgpLy/lhbPpl61cclxuICAgIHtcclxuICAgICAgICB0aGlzLmRlcygpXHJcbiAgICAgICAgR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zb3VuZF9tYW5hZ2VyLnBsYXlTb3VuZChTb3VuZEluZGV4LmNsaWNrKTtcclxuICAgICAgICB0aGlzLm9uQ2xvc2UoKTtcclxuICAgIH1cclxuXHJcbiAgICBjbGlja0J0blBsYXlpbnN0cnVjdGlvbnMoKXsvL+eOqeazleivtOaYjlxyXG4gICAgICAgIFVJTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNob3dVaURpYWxvZyhVSVBhdGguUGxheWluc1RydWN0aW9ucyxVSUxheWVyTGV2ZWwuVHdvLHtvbkNvbXBsZXRlZDoodWlOb2RlKT0+IHtcclxuICAgICAgICAgICAgdWlOb2RlLmdldENvbXBvbmVudChwbGF5aW5zdHJ1Y3Rpb25zKS5pbml0KHtcclxuICAgICAgICAgICAgICAgIG9uQ2xvc2U6KCk9PntcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgdWlOb2RlLmdldENvbXBvbmVudChwbGF5aW5zdHJ1Y3Rpb25zKS5pbml0VWkodGhpcy50eXBlKS8vMjrml6DlsL3mjJHmiJggICAz77yaYm9zc+aMkeaImFxyXG4gICAgICAgIH0sfSk7XHJcbiAgICB9XHJcbiAgICBjbGlja0J0blJld2FyZERpc3BsYXkoKXsvL+WlluWKseWxleekulxyXG4gICAgICAgIFVJTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNob3dVaURpYWxvZyhVSVBhdGguUmV3YXJkRGlzcGxheSxVSUxheWVyTGV2ZWwuVHdvLHtvbkNvbXBsZXRlZDoodWlOb2RlKT0+IHtcclxuICAgICAgICAgICAgdWlOb2RlLmdldENvbXBvbmVudChyZXdhcmRkaXNwbGF5KS5pbml0KHtcclxuICAgICAgICAgICAgICAgIG9uQ2xvc2U6KCk9PntcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgdWlOb2RlLmdldENvbXBvbmVudChyZXdhcmRkaXNwbGF5KS5pbml0VWkodGhpcy50eXBlKS8vMjrml6DlsL3mjJHmiJggICAz77yaYm9zc+aMkeaImFxyXG4gICAgICAgIH0sfSk7XHJcbiAgICB9XHJcbiAgICBjbGlja0J0blJhbmtpbmdMaXN0KCl7XHJcbiAgICAgICAgaWYodGhpcy50eXBlPT0yKXtcclxuICAgICAgICAgICAgRm9sbG93TWFuYWdlci5nZXRJbnN0YW5jZSgpLmZvbGxvd0V2ZW50KEZvbGxvd19UeXBlLuaXoOWwveaMkeaImF/mjpLooYzmppzngrnlh7vmrKHmlbApO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZih0aGlzLnR5cGU9PTMpe1xyXG4gICAgICAgICAgICBGb2xsb3dNYW5hZ2VyLmdldEluc3RhbmNlKCkuZm9sbG93RXZlbnQoRm9sbG93X1R5cGUuQk9TU+aMkeaImF/mjpLooYzmppzngrnlh7vmrKHmlbApO1xyXG4gICAgICAgIH1cclxuICAgICAgICBVSU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zaG93VWlEaWFsb2coVUlQYXRoLlJhbmtpbmdMaXN0LFVJTGF5ZXJMZXZlbC5Ud28se29uQ29tcGxldGVkOih1aU5vZGUpPT4ge1xyXG4gICAgICAgICAgICB1aU5vZGUuZ2V0Q29tcG9uZW50KFJhbmtpbmdMaXN0KS5pbml0VWkodGhpcy50eXBlKVxyXG4gICAgICAgIH0sfSk7Ly/mjpLooYzmppxcclxuICAgIH1cclxuICAgIGNsaWNrQnRuU2tpbGxEZXNjcmlwdGlvbihlLGkpey8vYm9zc+aKgOiDvVxyXG4gICAgICAgIHRoaXMuU2tpbGxEZXNjcmlwdGlvbi54PTBcclxuICAgICAgICBpZihlLmN1cnJlbnRUYXJnZXQueDwwKXtcclxuICAgICAgICAgICAgdGhpcy5Ta2lsbERlc2NyaXB0aW9uLng9KGUuY3VycmVudFRhcmdldC54KzE3MylcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYoZS5jdXJyZW50VGFyZ2V0Lng+MCl7XHJcbiAgICAgICAgICAgIHRoaXMuU2tpbGxEZXNjcmlwdGlvbi54PShlLmN1cnJlbnRUYXJnZXQueC0xNzMpXHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuU2tpbGxEZXNjcmlwdGlvbi5hY3RpdmU9dHJ1ZVxyXG4gICAgICAgIGxldCBzcHJpdGVpZD0odGhpcy5ib3Nzc3ByaXRlaWQqMTAwMCkrKGkqMTAwKSsxXHJcbiAgICAgICAgdGhpcy5Ta2lsbERlc2NyaXB0aW9uLmdldENoaWxkQnlOYW1lKFwiYnRcIikuZ2V0Q29tcG9uZW50KFRleHRMYW5ndWFnZSkuc2V0VGV4dElkKE1vbnN0ZXJTa2lsbE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRTa2lsbEludHJvKHNwcml0ZWlkKSlcclxuICAgICAgICB0aGlzLnNjaGVkdWxlT25jZShmdW5jdGlvbigpe1xyXG4gICAgICAgICAgICAgICAgdGhpcy5Ta2lsbERlc2NyaXB0aW9uLmdldENoaWxkQnlOYW1lKFwiQ29tbW9uX1RleHRCR1wiKS5oZWlnaHQ9KHRoaXMuU2tpbGxEZXNjcmlwdGlvbi5nZXRDaGlsZEJ5TmFtZShcImJ0XCIpLmhlaWdodCs1MClcclxuICAgICAgICAgICAgICAgIHRoaXMuU2tpbGxEZXNjcmlwdGlvbi5nZXRDaGlsZEJ5TmFtZShcIkNvbW1vbl9UZXh0QkdcIikuYWN0aXZlPXRydWVcclxuICAgICAgICB9LDAuMDAwMSlcclxuICAgIH1cclxuICAgIGNsaWNrQnRuU3RhcnRDaGFsbGVuZ2UoKXsvL+W8gOWni+aMkeaImFxyXG4gICAgICAgIGxldCBudW1cclxuICAgICAgICBsZXQgYnV5bnVtXHJcbiAgICAgICAgbGV0IHRvdGFsbnVtXHJcbiAgICAgICAgaWYgKHRoaXMudHlwZSA9PSAyKSB7XHJcbiAgICAgICAgICAgIC8vIHRvdGFsbnVtPVRoZVN0b3JhZ2VNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0TnVtYmVyKFN0b3JhZ2VLZXkuVG90YWxVbmxpbWl0ZWRDaGFsbGVuZ2VUaW1lcywwKTtcclxuICAgICAgICAgICAgbnVtID0gVGhlU3RvcmFnZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXROdW1iZXIoU3RvcmFnZUtleS5VbmxpbWl0ZWRDaGFsbGVuZ2VUaW1lcywzKTtcclxuICAgICAgICAgICAgYnV5bnVtID0gVGhlU3RvcmFnZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXROdW1iZXIoU3RvcmFnZUtleS5CdXlVbmxpbWl0ZWRDaGFsbGVuZ2VUaW1lcywzKTtcclxuICAgICAgICB9IGVsc2UgaWYgKHRoaXMudHlwZSA9PSAzKSB7XHJcbiAgICAgICAgICAgIC8vIHRvdGFsbnVtPVRoZVN0b3JhZ2VNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0TnVtYmVyKFN0b3JhZ2VLZXkuVG90YWxCb3NzQ2hhbGxlbmdlVGltZXMsMCk7XHJcbiAgICAgICAgICAgIG51bSA9IFRoZVN0b3JhZ2VNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0TnVtYmVyKFN0b3JhZ2VLZXkuQm9zc0NoYWxsZW5nZVRpbWVzLDMpO1xyXG4gICAgICAgICAgICBidXludW0gPSBUaGVTdG9yYWdlTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldE51bWJlcihTdG9yYWdlS2V5LkJ1eUJvc3NDaGFsbGVuZ2VUaW1lcywzKTtcclxuICAgICAgICB9IGVsc2UgaWYgKHRoaXMudHlwZSA9PSA0KSB7XHJcbiAgICAgICAgICAgIC8vIHRvdGFsbnVtPVRoZVN0b3JhZ2VNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0TnVtYmVyKFN0b3JhZ2VLZXkuVG90YWxWb2lkQ3JhY2tDaGFsbGVuZ2VUaW1lcywwKTtcclxuICAgICAgICAgICAgbnVtID0gVGhlU3RvcmFnZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXROdW1iZXIoU3RvcmFnZUtleS5Wb2lkQ3JhY2tDaGFsbGVuZ2VUaW1lcywzKTtcclxuICAgICAgICAgICAgYnV5bnVtID0gVGhlU3RvcmFnZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXROdW1iZXIoU3RvcmFnZUtleS5CdXlWb2lkQ3JhY2tDaGFsbGVuZ2VUaW1lcywzKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYobnVtPjApe1xyXG4gICAgICAgICAgICAvL+W8gOWni+a4uOaIj1xyXG4gICAgICAgICAgICB0aGlzLmNsaWNrQnRuQ2xvc2UoKVxyXG4gICAgICAgICAgICBpZiAodGhpcy50eXBlID09IDIpIHtcclxuICAgICAgICAgICAgICAgICAgICBHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLmN1cl9nYW1lX21vZGU9R2FtZU1vZGUuRW5kbGVzczsgICAgICAgXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIFVJTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNob3dVaURpYWxvZyhVSVBhdGguVG9QbGF5LFVJTGF5ZXJMZXZlbC5PbmUse29uQ29tcGxldGVkOih1aU5vZGUpPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB1aU5vZGUuZ2V0Q29tcG9uZW50KFRvUGxheU1haW5VaSkuaW5pdCh7b25DbG9zZTooKT0+e1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9fSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSx9KVxyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKHRoaXMudHlwZSA9PSAzKSB7XHJcbiAgICAgICAgICAgICAgICBHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLmN1cl9nYW1lX21vZGU9R2FtZU1vZGUuQm9zc19DaGFsbGVuZ2U7ICAgICAgIFxyXG4gICAgICAgICAgICAgICAgVUlNYW5hZ2VyLmdldEluc3RhbmNlKCkuc2hvd1VpRGlhbG9nKFVJUGF0aC5Ub1BsYXksVUlMYXllckxldmVsLk9uZSx7b25Db21wbGV0ZWQ6KHVpTm9kZSk9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgdWlOb2RlLmdldENvbXBvbmVudChUb1BsYXlNYWluVWkpLmluaXQoe29uQ2xvc2U6KCk9PntcclxuICAgICAgICAgICAgICAgICAgICB9fSk7XHJcbiAgICAgICAgICAgICAgICB9LH0pXHJcbiAgICAgICAgICAgIH1lbHNlIGlmICh0aGlzLnR5cGUgPT0gNCkge1xyXG4gICAgICAgICAgICAgICAgLy8gR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5jdXJfZ2FtZV9tb2RlPUdhbWVNb2RlLk1hemU7ICAgICAgIFxyXG4gICAgICAgICAgICAgICAgbnVtLS1cclxuICAgICAgICAgICAgICAgIFRoZVN0b3JhZ2VNYW5hZ2VyLmdldEluc3RhbmNlKCkuc2V0SXRlbShTdG9yYWdlS2V5LlZvaWRDcmFja0NoYWxsZW5nZVRpbWVzLG51bSk7XHJcbiAgICAgICAgICAgICAgICBVSU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zaG93VWlEaWFsb2coVUlQYXRoLlZvaWRTY2VuZSxVSUxheWVyTGV2ZWwuT25lLHtvbkNvbXBsZXRlZDoodWlOb2RlKT0+IHtcclxuICAgICAgICAgICAgICAgICAgICB1aU5vZGUuZ2V0Q29tcG9uZW50KFZvaWRTY2VuZSkuaW5pdChcclxuICAgICAgICAgICAgICAgICAgICAgICAge29uQ2xvc2U6KCk9PntcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH19XHJcbiAgICAgICAgICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgaW5kZXg9dGhpcy5QYWdlVmlldy5nZXRDb21wb25lbnQoY2MuUGFnZVZpZXcpLmdldEN1cnJlbnRQYWdlSW5kZXgoKVxyXG4gICAgICAgICAgICAgICAgICAgIHVpTm9kZS5nZXRDb21wb25lbnQoVm9pZFNjZW5lKS5pbml0VWkoaW5kZXgsMSwyKVxyXG4gICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgfSx9KVxyXG4gICAgICAgICAgICAgICAgLy8gVUlNYW5hZ2VyLmdldEluc3RhbmNlKCkuc2hvd1VpRGlhbG9nKFVJUGF0aC5Ub1BsYXksVUlMYXllckxldmVsLk9uZSx7b25Db21wbGV0ZWQ6KHVpTm9kZSk9PiB7XHJcbiAgICAgICAgICAgICAgICAvLyAgICAgdWlOb2RlLmdldENvbXBvbmVudChUb1BsYXlNYWluVWkpLmluaXQoe29uQ2xvc2U6KCk9PntcclxuICAgICAgICAgICAgICAgIC8vICAgICB9fSk7XHJcbiAgICAgICAgICAgICAgICAvLyB9LH0pXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgaWYoYnV5bnVtPjApe1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jbGlja0J0blB1cmNoYXNlc051bWJlKClcclxuICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICAvL+aPkOekuuaYjuaXpeWGjeadpVxyXG4gICAgICAgICAgICAgICAgR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zaG93TWVzc2FnZShMYW5ndWFnZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRTdHJCeVRleHRJZCgxMDAxMjApLDMpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgY2xpY2tCdG5QdXJjaGFzZXNOdW1iZSgpey8v6LSt5Lmw5oyR5oiY5qyh5pWwXHJcbiAgICAgICAgVUlNYW5hZ2VyLmdldEluc3RhbmNlKCkuc2hvd1VpRGlhbG9nKFVJUGF0aC5QdXJjaGFzZXNOdW1iZSxVSUxheWVyTGV2ZWwuVHdvLHtvbkNvbXBsZXRlZDoodWlOb2RlKT0+IHtcclxuICAgICAgICAgICAgdWlOb2RlLmdldENvbXBvbmVudChwdXJjaGFzZXNudW1iZSkuaW5pdCh7XHJcbiAgICAgICAgICAgICAgICBvbkNsb3NlOigpPT57XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5udW1iZXJSZWZyZXNoKClcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgdWlOb2RlLmdldENvbXBvbmVudChwdXJjaGFzZXNudW1iZSkuaW5pdFVpKHRoaXMudHlwZSlcclxuICAgICAgICB9LH0pO1xyXG4gICAgfVxyXG5cclxuICAgIGNsaWNrQnRuTW9wcGluZ1VwKCl7Ly/miavojaFcclxuICAgICAgICBpZih0aGlzLnR5cGU9PTQpe1xyXG4gICAgICAgICAgICBVSU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zaG93VWlEaWFsb2coVUlQYXRoLk1vcHBpbmdWb2lkLFVJTGF5ZXJMZXZlbC5Ud28se29uQ29tcGxldGVkOih1aU5vZGUpPT4ge1xyXG4gICAgICAgICAgICAgICAgdWlOb2RlLmdldENvbXBvbmVudChNb3BwaW5nVm9pZCkuaW5pdCh7XHJcbiAgICAgICAgICAgICAgICAgICAgb25DbG9zZTooKT0+e1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm51bWJlclJlZnJlc2goKVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICBsZXQgaW5kZXg9dGhpcy5QYWdlVmlldy5nZXRDb21wb25lbnQoY2MuUGFnZVZpZXcpLmdldEN1cnJlbnRQYWdlSW5kZXgoKVxyXG4gICAgICAgICAgICAgICAgdWlOb2RlLmdldENvbXBvbmVudChNb3BwaW5nVm9pZCkuaW5pdFVpKGluZGV4KVxyXG4gICAgICAgICAgICB9LH0pO1xyXG4gICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICBVSU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zaG93VWlEaWFsb2coVUlQYXRoLk1vcHBpbmdVcCxVSUxheWVyTGV2ZWwuVHdvLHtvbkNvbXBsZXRlZDoodWlOb2RlKT0+IHtcclxuICAgICAgICAgICAgICAgIHVpTm9kZS5nZXRDb21wb25lbnQoTW9wcGluZ1VwKS5pbml0KHtcclxuICAgICAgICAgICAgICAgICAgICBvbkNsb3NlOigpPT57XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubnVtYmVyUmVmcmVzaCgpXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIHVpTm9kZS5nZXRDb21wb25lbnQoTW9wcGluZ1VwKS5pbml0VWkodGhpcy50eXBlLHRoaXMubm9kZSlcclxuICAgICAgICAgICAgfSx9KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgfVxyXG4gICAgY2xpY2tCdG5TaG9wKCl7Ly/omZrnqbroo4LnvJ3llYblupdcclxuICAgICAgICBVSU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zaG93VWlEaWFsb2coVUlQYXRoLlNob3AsVUlMYXllckxldmVsLlR3byx7b25Db21wbGV0ZWQ6KHVpTm9kZSk9PiB7XHJcbiAgICAgICAgICAgIHVpTm9kZS5nZXRDb21wb25lbnQoU2hvcCkuaW5pdCh7XHJcbiAgICAgICAgICAgICAgICBvbkNsb3NlOigpPT57XHJcblxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICB1aU5vZGUuZ2V0Q29tcG9uZW50KFNob3ApLmluaXRVaSgpXHJcbiAgICAgICAgfSx9KTtcclxuICAgIH1cclxuICAgIGNsaWNrQnRuQ2xvc2VTa2lsbERlc2NyaXB0aW9uKCl7XHJcbiAgICAgICAgdGhpcy5Ta2lsbERlc2NyaXB0aW9uLmdldENoaWxkQnlOYW1lKFwiQ29tbW9uX1RleHRCR1wiKS5hY3RpdmU9ZmFsc2VcclxuICAgICAgICB0aGlzLlNraWxsRGVzY3JpcHRpb24uYWN0aXZlPWZhbHNlXHJcbiAgICB9XHJcbiAgICBwcml2YXRlIGdldExlYWRlcmJvYXJkQnlVc2VySnNvblN0cmluZyh0eXBlOiBudW1iZXIpOiBzdHJpbmcge1xyXG4gICAgICAgIGxldCB1aWQgPSBVc2VyRGF0YS5nZXRJbnN0YW5jZSgpLmdldFVzZXJJRCgpO1xyXG4gICAgICAgIHJldHVybiBKU09OLnN0cmluZ2lmeSh7XHJcbiAgICAgICAgICAgIGxpbWl0OiAxMDAsXHJcbiAgICAgICAgICAgIHR5cGU6IHR5cGUsXHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbiAgICBwcml2YXRlIHNldFJhbmtKc29uU3RyaW5nKCk6IHN0cmluZyB7XHJcbiAgICAgICAgbGV0IHVpZCA9IFVzZXJEYXRhLmdldEluc3RhbmNlKCkuZ2V0VXNlcklEKCk7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCI9PT09PT1cIix1aWQpXHJcbiAgICAgICAgcmV0dXJuIEpTT04uc3RyaW5naWZ5KHtcclxuICAgICAgICAgICAgdWlkOnVpZCxcclxuICAgICAgICAgICAgZGFtYWdlTnVtYmVyTGFzdDogLTEsXHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gc3RhcnQgKCkge1xyXG5cclxuICAgIC8vIH1cclxuXHJcbiAgICAvLyB1cGRhdGUgKGR0KSB7fVxyXG59XHJcbiJdfQ==