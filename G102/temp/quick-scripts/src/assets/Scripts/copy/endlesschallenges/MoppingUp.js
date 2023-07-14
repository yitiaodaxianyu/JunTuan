"use strict";
cc._RF.push(module, 'bf30fk/+rBGAbap3dl90CQo', 'MoppingUp');
// Scripts/copy/endlesschallenges/MoppingUp.ts

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
var BossChallenge_1 = require("../../Activity/BossChallenge");
var BossReward_1 = require("../../Activity/BossReward");
var EndlessLevels_1 = require("../../Activity/EndlessLevels");
var EndlessReward_1 = require("../../Activity/EndlessReward");
var GameManager_1 = require("../../GameManager");
var TextLanguage_1 = require("../../multiLanguage/TextLanguage");
var PropManager_1 = require("../../Prop/PropManager");
var AudioConstants_1 = require("../../Sound/AudioConstants");
var StorageConfig_1 = require("../../Storage/StorageConfig");
var StorageManager_1 = require("../../Storage/StorageManager");
var EventManager_1 = require("../../Tools/EventManager");
var UIComponent_1 = require("../../UI/UIComponent");
var endlesschallenges_1 = require("./endlesschallenges");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var MoppingUp = /** @class */ (function (_super) {
    __extends(MoppingUp, _super);
    function MoppingUp() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.item = [];
        _this.bttxt = null;
        _this.text = null;
        _this.num = null;
        _this.RewardItem = 0;
        _this.RewardNum = 0;
        _this.RewardItem1 = 0;
        _this.RewardNum1 = 0;
        _this.type = 0; //2:无尽挑战   3：boss挑战
        _this.othernode = null; //刷新父节点的排行榜
        return _this;
        // LIFE-CYCLE CALLBACKS:
        // onLoad () {}
        // start () {
        // }
        // update (dt) {}
    }
    MoppingUp.prototype.initUi = function (type, othernode) {
        this.type = type;
        this.othernode = othernode;
        // GameManager.getInstance().music_manager.playMusic(MusicIndex.BGM_TJP);
        // FollowManager.getInstance().followEvent(Follow_Type.铁匠铺打开次数);
        if (type == 2) {
            var damage = EndlessLevels_1.EndlessLevelsManager.getInstance().getMaxWave(); //TheStorageManager.getInstance().getNumber(StorageKey.UnlimitedChallengeDamage,0);
            if (damage > EndlessReward_1.EndlessRewardManager.getMaxRewardLevel()) {
                damage = EndlessReward_1.EndlessRewardManager.getMaxRewardLevel();
            }
            var RewardItem = EndlessReward_1.EndlessRewardManager.getInstance().getRewardItem(damage);
            var RewardNum = EndlessReward_1.EndlessRewardManager.getInstance().getRewardNum(damage);
            this.RewardItem = RewardItem;
            this.RewardNum = RewardNum;
            var items = PropManager_1.PropManager.getInstance().createPropItem(RewardItem, RewardNum);
            this.item[0].x = 0;
            items.parent = this.item[0];
            this.text.getComponent(TextLanguage_1.default).setTextId(800016); //上次波数
            this.bttxt.getComponent(TextLanguage_1.default).setTextId(800015); //上次波数
            var mynum = damage;
            this.num.getComponent(cc.Label).string = "" + mynum;
        }
        else if (type == 3) {
            var damage = StorageManager_1.TheStorageManager.getInstance().getNumber(StorageConfig_1.StorageKey.BossChallengeDamage, -1); //BossChallengeManager.getInstance().getMaxDamageNumber()//S
            var RewardLevel = BossReward_1.BossRewardManager.getInstance().getRewardLevel(damage);
            var RewardItem = BossReward_1.BossRewardManager.getInstance().getRewardItem(RewardLevel);
            var RewardNum = BossReward_1.BossRewardManager.getInstance().getRewardNum(RewardLevel);
            this.RewardItem = RewardItem;
            this.RewardNum = RewardNum;
            var items = PropManager_1.PropManager.getInstance().createPropItem(RewardItem, RewardNum);
            this.item[0].x = -80;
            items.parent = this.item[0];
            var RewardItem1 = BossReward_1.BossRewardManager.getInstance().getRewardItem_2(RewardLevel);
            var RewardNum1 = BossReward_1.BossRewardManager.getInstance().getRewardNum_2(RewardLevel);
            this.RewardItem1 = RewardItem1;
            this.RewardNum1 = RewardNum1;
            var items1 = PropManager_1.PropManager.getInstance().createPropItem(RewardItem1, RewardNum1);
            this.item[1].x = 80;
            items1.parent = this.item[1];
            this.text.getComponent(TextLanguage_1.default).setTextId(820015); //上次伤害
            this.bttxt.getComponent(TextLanguage_1.default).setTextId(820014); //上次伤害
            var mynum = damage;
            this.num.getComponent(cc.Label).string = "" + mynum;
        }
    };
    MoppingUp.prototype.clickBtnYes = function () {
        var num;
        var totalnum;
        if (this.type == 2) {
            totalnum = StorageManager_1.TheStorageManager.getInstance().getNumber(StorageConfig_1.StorageKey.TotalUnlimitedChallengeTimes, 0);
            num = StorageManager_1.TheStorageManager.getInstance().getNumber(StorageConfig_1.StorageKey.UnlimitedChallengeTimes, 3);
            num--;
            totalnum++;
            StorageManager_1.TheStorageManager.getInstance().setItem(StorageConfig_1.StorageKey.TotalUnlimitedChallengeTimes, totalnum);
            StorageManager_1.TheStorageManager.getInstance().setItem(StorageConfig_1.StorageKey.UnlimitedChallengeTimes, num);
            PropManager_1.PropManager.getInstance().changePropNum(this.RewardItem, this.RewardNum);
            var items = PropManager_1.PropManager.getInstance().createPropItem(this.RewardItem, this.RewardNum);
            GameManager_1.default.getInstance().showGetTip(items);
        }
        else if (this.type == 3) {
            var damage = StorageManager_1.TheStorageManager.getInstance().getNumber(StorageConfig_1.StorageKey.BossChallengeDamage, -1);
            var zon = damage + BossChallenge_1.BossChallengeManager.getInstance().getMaxDamageNumber();
            BossChallenge_1.BossChallengeManager.getInstance().setDamageNumber(zon); //游戏胜利之后保存
            totalnum = StorageManager_1.TheStorageManager.getInstance().getNumber(StorageConfig_1.StorageKey.TotalBossChallengeTimes, 0);
            num = StorageManager_1.TheStorageManager.getInstance().getNumber(StorageConfig_1.StorageKey.BossChallengeTimes, 3);
            num--;
            totalnum++;
            StorageManager_1.TheStorageManager.getInstance().setItem(StorageConfig_1.StorageKey.TotalBossChallengeTimes, totalnum);
            StorageManager_1.TheStorageManager.getInstance().setItem(StorageConfig_1.StorageKey.BossChallengeTimes, num);
            this.othernode.getComponent(endlesschallenges_1.default).initUi(3);
            PropManager_1.PropManager.getInstance().changePropNum(this.RewardItem, this.RewardNum);
            PropManager_1.PropManager.getInstance().changePropNum(this.RewardItem1, this.RewardNum1);
            var items = PropManager_1.PropManager.getInstance().createPropItem(this.RewardItem, this.RewardNum);
            var items1 = PropManager_1.PropManager.getInstance().createPropItem(this.RewardItem1, this.RewardNum1);
            GameManager_1.default.getInstance().showMultipleGetTip([items, items1]);
        }
        this.clickBtnClose();
        EventManager_1.EventManager.postRedEvent(EventManager_1.RedEventString.RED_CHECK, EventManager_1.RedEventType.Btn_Activity);
    };
    MoppingUp.prototype.shanchu = function () {
        for (var index = 0; index < this.item.length; index++) {
            if (this.item[index].childrenCount > 0) {
                this.item[index].children[0].destroy();
            }
        }
    };
    MoppingUp.prototype.clickBtnClose = function () {
        this.shanchu();
        GameManager_1.default.getInstance().sound_manager.playSound(AudioConstants_1.SoundIndex.click);
        this.onClose();
    };
    __decorate([
        property(cc.Node)
    ], MoppingUp.prototype, "item", void 0);
    __decorate([
        property(cc.Node)
    ], MoppingUp.prototype, "bttxt", void 0);
    __decorate([
        property(cc.Node)
    ], MoppingUp.prototype, "text", void 0);
    __decorate([
        property(cc.Node)
    ], MoppingUp.prototype, "num", void 0);
    MoppingUp = __decorate([
        ccclass
    ], MoppingUp);
    return MoppingUp;
}(UIComponent_1.default));
exports.default = MoppingUp;

cc._RF.pop();