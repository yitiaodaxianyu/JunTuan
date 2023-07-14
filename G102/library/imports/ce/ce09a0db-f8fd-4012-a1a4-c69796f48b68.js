"use strict";
cc._RF.push(module, 'ce09aDb+P1AEqGkxpeW9Ito', 'BossGameUi');
// Scripts/Activity/BossGameUi.ts

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
var BossReward_1 = require("./BossReward");
var BossChallenge_1 = require("./BossChallenge");
var UserInfo_1 = require("../UserInfo/UserInfo");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var BossGameUi = /** @class */ (function (_super) {
    __extends(BossGameUi, _super);
    function BossGameUi() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.sp_icon = [];
        _this.BossRush_Bar_1 = null;
        _this.bar = null;
        _this.icon = null;
        _this.levelLabel = null;
        _this.scoreLabel = null;
        _this.prev_stage = 1;
        return _this;
    }
    BossGameUi.prototype.onLoad = function () {
        // return
        this.BossRush_Bar_1 = this.node.getChildByName('scoreProgressBar').getChildByName("BossRush_Bar_1");
        this.bar = this.node.getChildByName('scoreProgressBar').getChildByName("bar");
        this.icon = this.node.getChildByName('icon').getComponent(cc.Sprite);
        this.levelLabel = this.node.getChildByName('levelLabel').getComponent(cc.Label);
        this.scoreLabel = this.node.getChildByName('scoreLabel').getComponent(cc.Label);
        BossChallenge_1.BossChallengeManager.getInstance().cur_score = 0;
    };
    BossGameUi.prototype.refreshData = function () {
        //先根据当前分数数据获取数据
        // return 1
        var score = BossChallenge_1.BossChallengeManager.getInstance().cur_score;
        var data = BossReward_1.BossRewardManager.getInstance().getRewardByScore(BossChallenge_1.BossChallengeManager.getInstance().cur_challenge_mode, score);
        var proScore = score - data.curData.IntegralRequirement;
        var maxSocre = data.nextData.IntegralRequirement - data.curData.IntegralRequirement;
        var progress = proScore / maxSocre + 0.001;
        this.BossRush_Bar_1.getComponent(cc.Sprite).fillRange = progress;
        this.bar.getComponent(cc.Sprite).fillRange = progress;
        this.scoreLabel.string = score + "/" + data.nextData.IntegralRequirement;
        this.levelLabel.string = "" + data.curData.RewardLevel;
        // TheStorageManager.getInstance().setItem(StorageKey.BossChallengeDamage,score);
        this.icon.spriteFrame = this.sp_icon[data.curData.BoxIcon - 1];
        if (data.curData.RewardLevel > 0) {
            var RotationOrder = UserInfo_1.UserInfo.getInstance().RotationOrder; //轮换顺序
            var ChallengeID = RotationOrder * 1000 + (data.curData.RewardLevel + 1); //挑战ID
            var level = BossChallenge_1.BossChallengeManager.getInstance().getMonsterLevel(ChallengeID);
            // console.log("+++++++",level,data.curData.RewardLevel)
            return level;
            // return fightingInfo.monster_datas[data.curData.RewardLevel-1][0].level;
        }
        else {
            return 2;
        }
        // if(data.curData.RewardLevel>this.prev_stage){
        //     this.prev_stage=data.curData.RewardLevel;
        //     //返回最新的系数
        //     return GameManager.getInstance().level_datas[this.prev_stage-1].attribute_multiple[0];
        // }
    };
    __decorate([
        property([cc.SpriteFrame])
    ], BossGameUi.prototype, "sp_icon", void 0);
    BossGameUi = __decorate([
        ccclass
    ], BossGameUi);
    return BossGameUi;
}(cc.Component));
exports.default = BossGameUi;

cc._RF.pop();