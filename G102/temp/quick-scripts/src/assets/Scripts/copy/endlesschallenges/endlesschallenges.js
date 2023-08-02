"use strict";
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