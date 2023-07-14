"use strict";
cc._RF.push(module, '5a135pn3oxJOJUVlLqUR/Oa', 'RankingList');
// Scripts/RankingList/RankingList.ts

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
var HttpManager_1 = require(".././NetWork/HttpManager");
var BossChallenge_1 = require("../Activity/BossChallenge");
var EndlessLevels_1 = require("../Activity/EndlessLevels");
var rankingrewarddisplay_1 = require("../copy/endlesschallenges/rankingrewarddisplay");
var GameManager_1 = require("../GameManager");
var HeroManager_1 = require("../Hero/Data/HeroManager");
var TextLanguage_1 = require("../multiLanguage/TextLanguage");
var PropManager_1 = require("../Prop/PropManager");
var AudioConstants_1 = require("../Sound/AudioConstants");
var UIComponent_1 = require("../UI/UIComponent");
var UIConfig_1 = require("../UI/UIConfig");
var UIManager_1 = require("../UI/UIManager");
var UserData_1 = require("../UserData");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var RankingList = /** @class */ (function (_super) {
    __extends(RankingList, _super);
    function RankingList() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.Rankingitme = null; //排行节点
        _this.RankingSelf = null; //玩家自己的排行节点
        _this.content = null; //父节点
        _this.ScrollView = null; //列表
        _this.ToggleContainer = null; //选项    战力      无尽挑战    boss挑战
        _this.Ranking_Bg_0 = null; //背景
        _this.Ranking = []; //排行节点
        _this.max = 100;
        _this.bgsprite = []; //前三的背景
        _this.namecolor = [new cc.Color(94, 62, 41), new cc.Color(50, 75, 105), new cc.Color(108, 68, 54)]; //前三的名字颜色
        _this.tag = 1; //选择显示的排行榜   默认是1   点击之后变
        _this.text = [100126, 100128, 100129]; //战力:~波数:~伤害:~
        _this.btnViewAwards = null; //查看奖励按钮
        _this.winText = null; //标题
        _this.myselfranking = -1; //玩家默认排名
        return _this;
        // @property(cc.Label)
        // label: cc.Label = null;
        // @property
        // text: string = 'hello';
        // LIFE-CYCLE CALLBACKS:
        // onLoad () {}
        // start () {
        // }
        // update (dt) {}
    }
    RankingList.prototype.initUi = function (type) {
        var _this = this;
        for (var itmeindex = this.Ranking.length; itmeindex < this.max; itmeindex++) {
            var rankingitme = cc.instantiate(this.Rankingitme);
            rankingitme.parent = this.content;
            this.Ranking.push(rankingitme);
        }
        var selfranking = -1;
        var SerialNo = this.RankingSelf.getChildByName("SerialNo");
        var name = this.RankingSelf.getChildByName("name");
        var btnAvatar = this.RankingSelf.getChildByName("headPortrait").getChildByName("btnAvatar");
        if (selfranking == -1) {
            SerialNo.active = false;
            this.RankingSelf.getChildByName("Notlisted").active = true;
        }
        else {
            SerialNo.getComponent(cc.Label).string = "" + (selfranking); //序号
            SerialNo.active = true;
            this.RankingSelf.getChildByName("Notlisted").active = false;
        }
        var myname = UserData_1.default.getInstance().getUserName(); //玩家名字
        var sphea = UserData_1.default.getInstance().getUserAvatar(); //玩家头像
        name.getComponent(cc.Label).string = "" + myname; //玩家名字
        btnAvatar.getComponent(cc.Sprite).spriteFrame = PropManager_1.PropManager.getInstance().getSpheadPortraitType(sphea); //头像id
        if (type == 2) {
            this.tag = 2;
            this.ToggleContainer.active = false;
            this.btnViewAwards.active = false;
            this.ScrollView.y = 60;
            this.RankingSelf.y = -330;
            this.Ranking_Bg_0.y = 60;
            this.winText.getComponent(TextLanguage_1.default).setTextId(800003);
        }
        else if (type == 3) {
            this.tag = 3;
            this.ToggleContainer.active = false;
            this.btnViewAwards.active = true; //true
            this.ScrollView.y = 90;
            this.RankingSelf.y = -298;
            this.Ranking_Bg_0.y = 90;
            this.winText.getComponent(TextLanguage_1.default).setTextId(800013);
        }
        else if (type == 1) {
            this.tag = 1;
            this.ToggleContainer.children[0].getComponent(cc.Toggle).isChecked = true;
            this.ToggleContainer.active = true;
            this.btnViewAwards.active = false;
            this.ScrollView.y = 0;
            this.RankingSelf.y = -380;
            this.Ranking_Bg_0.y = 0;
            this.winText.getComponent(TextLanguage_1.default).setTextId(200006);
        }
        HttpManager_1.HttpManager.post(HttpManager_1.AccessName.leaderboardByUser, this.getLeaderboardByUserJsonString(this.tag), true).then(function (data) {
            _this.Refresh(data);
        });
        // this.Refresh()
    };
    RankingList.prototype.Refresh = function (data) {
        this.ScrollView.getComponent(cc.ScrollView).scrollToTop(1);
        var selfranking = -1;
        this.max = data.length;
        //后台拉取排名前100名的玩家
        for (var index = 0; index < this.Ranking.length; index++) {
            if (index < this.max) {
                var CombatPower_1 = this.Ranking[index].getChildByName("CombatPower");
                var SerialNo_1 = this.Ranking[index].getChildByName("SerialNo");
                var name_1 = this.Ranking[index].getChildByName("name");
                var btnAvatar_1 = this.Ranking[index].getChildByName("headPortrait").getChildByName("btnAvatar");
                CombatPower_1.getComponent(TextLanguage_1.default).setTextId(this.text[this.tag - 1]); //是哪个排行榜
                CombatPower_1.getComponent(TextLanguage_1.default).setReplaceValue('~', (data[index].value) + ''); //排行榜战力数据
                SerialNo_1.getComponent(cc.Label).string = "" + (index + 1); //序号
                name_1.getComponent(cc.Label).string = data[index].name; //玩家名字
                btnAvatar_1.getComponent(cc.Sprite).spriteFrame = PropManager_1.PropManager.getInstance().getSpheadPortraitType(data[index].avatarId); //头像id
                if (index < 3) {
                    SerialNo_1.active = false;
                    this.Ranking[index].getComponent(cc.Sprite).spriteFrame = this.bgsprite[index]; //前三名的背景不一样
                    name_1.color = this.namecolor[index];
                }
                else {
                    SerialNo_1.active = true;
                }
                if (data[index].uid == UserData_1.default.getInstance().getUserID()) { //如果在后台拉取的排名中有id跟玩家的id一样，那么玩家的排名在前100名中  将显示玩家排名   否则显示未上榜
                    selfranking = (index + 1);
                }
                this.Ranking[index].active = true;
            }
            else {
                this.Ranking[index].active = false;
            }
        }
        var combatPower = 0; //HeroManager.getInstance().getAllHeroZhanli()// 1
        if (this.tag == 1) {
            combatPower = HeroManager_1.HeroManager.getInstance().getAllHeroZhanli(); //获取战力
        }
        if (this.tag == 2) {
            combatPower = EndlessLevels_1.EndlessLevelsManager.getInstance().getMaxWave(); //HeroManager.getInstance().getAllHeroZhanli()//获取波数
        }
        if (this.tag == 3) {
            combatPower = BossChallenge_1.BossChallengeManager.getInstance().getMaxDamageNumber(); //获取伤害
        }
        var CombatPower = this.RankingSelf.getChildByName("CombatPower");
        var SerialNo = this.RankingSelf.getChildByName("SerialNo");
        var name = this.RankingSelf.getChildByName("name");
        var btnAvatar = this.RankingSelf.getChildByName("headPortrait").getChildByName("btnAvatar");
        CombatPower.getComponent(TextLanguage_1.default).setTextId(this.text[this.tag - 1]); //是哪个排行榜
        CombatPower.getComponent(TextLanguage_1.default).setReplaceValue('~', (combatPower) + ''); //排行榜战力数据
        this.myselfranking = selfranking;
        if (selfranking == -1) {
            SerialNo.active = false;
            this.RankingSelf.getChildByName("Notlisted").active = true;
        }
        else {
            SerialNo.getComponent(cc.Label).string = "" + (selfranking); //序号
            SerialNo.active = true;
            this.RankingSelf.getChildByName("Notlisted").active = false;
        }
        var myname = UserData_1.default.getInstance().getUserName(); //玩家名字
        var sphea = UserData_1.default.getInstance().getUserAvatar(); //玩家头像
        name.getComponent(cc.Label).string = "" + myname; //玩家名字
        btnAvatar.getComponent(cc.Sprite).spriteFrame = PropManager_1.PropManager.getInstance().getSpheadPortraitType(sphea); //头像id
    };
    RankingList.prototype.clickBtnToggle = function (even, i) {
        var _this = this;
        // console.log("+++++++",even,i)
        this.tag = i;
        HttpManager_1.HttpManager.post(HttpManager_1.AccessName.leaderboardByUser, this.getLeaderboardByUserJsonString(this.tag), true).then(function (data) {
            _this.Refresh(data);
        });
    };
    RankingList.prototype.clickBtnClose = function () {
        for (var index = 0; index < this.Ranking.length; index++) {
            this.Ranking[index].active = false;
        }
        GameManager_1.default.getInstance().sound_manager.playSound(AudioConstants_1.SoundIndex.click);
        this.onClose();
    };
    RankingList.prototype.getLeaderboardByUserJsonString = function (type) {
        var uid = UserData_1.default.getInstance().getUserID();
        return JSON.stringify({
            limit: 100,
            type: type,
        });
    };
    RankingList.prototype.clickBtnRewardDisplay = function () {
        var _this = this;
        UIManager_1.UIManager.getInstance().showUiDialog(UIConfig_1.UIPath.RankingRewardDisplay, UIConfig_1.UILayerLevel.Three, { onCompleted: function (uiNode) {
                uiNode.getComponent(rankingrewarddisplay_1.default).init({
                    onClose: function () {
                    }
                });
                uiNode.getComponent(rankingrewarddisplay_1.default).initUi(_this.myselfranking); //排名  默认-1   
            }, });
    };
    __decorate([
        property(cc.Node)
    ], RankingList.prototype, "Rankingitme", void 0);
    __decorate([
        property(cc.Node)
    ], RankingList.prototype, "RankingSelf", void 0);
    __decorate([
        property(cc.Node)
    ], RankingList.prototype, "content", void 0);
    __decorate([
        property(cc.Node)
    ], RankingList.prototype, "ScrollView", void 0);
    __decorate([
        property(cc.Node)
    ], RankingList.prototype, "ToggleContainer", void 0);
    __decorate([
        property(cc.Node)
    ], RankingList.prototype, "Ranking_Bg_0", void 0);
    __decorate([
        property(cc.SpriteFrame)
    ], RankingList.prototype, "bgsprite", void 0);
    __decorate([
        property(cc.Node)
    ], RankingList.prototype, "btnViewAwards", void 0);
    __decorate([
        property(cc.Node)
    ], RankingList.prototype, "winText", void 0);
    RankingList = __decorate([
        ccclass
    ], RankingList);
    return RankingList;
}(UIComponent_1.default));
exports.default = RankingList;

cc._RF.pop();