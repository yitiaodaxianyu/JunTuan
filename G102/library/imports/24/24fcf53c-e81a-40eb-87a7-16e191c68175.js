"use strict";
cc._RF.push(module, '24fcfU86BpA64enFuGRxoF1', 'EndlessgGameUi');
// Scripts/Activity/EndlessgGameUi.ts

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
var EndlessLevels_1 = require("./EndlessLevels");
var EndlessReward_1 = require("./EndlessReward");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var EndlessgGameUi = /** @class */ (function (_super) {
    __extends(EndlessgGameUi, _super);
    function EndlessgGameUi() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.sp_icon = [];
        _this.scoreProgressBar = null;
        _this.icon = null;
        _this.levelLabel = null;
        _this.scoreLabel = null;
        return _this;
    }
    EndlessgGameUi.prototype.onLoad = function () {
        this.scoreProgressBar = this.node.getChildByName('scoreProgressBar').getComponent(cc.ProgressBar);
        this.icon = this.node.getChildByName('icon').getComponent(cc.Sprite);
        this.levelLabel = this.node.getChildByName('levelLabel').getComponent(cc.Label);
        this.scoreLabel = this.node.getChildByName('scoreLabel').getComponent(cc.Label);
        EndlessLevels_1.EndlessLevelsManager.getInstance().endless_score = 0;
    };
    EndlessgGameUi.prototype.refreshData = function () {
        //先根据当前分数数据获取数据
        var score = EndlessLevels_1.EndlessLevelsManager.getInstance().endless_score;
        var endlessData = EndlessReward_1.EndlessRewardManager.getInstance().getRewardByScore(score);
        var proScore = score - endlessData.curData.IntegralRequirement;
        var maxSocre = endlessData.nextData.IntegralRequirement - endlessData.curData.IntegralRequirement;
        this.scoreProgressBar.progress = proScore / maxSocre + 0.001;
        this.scoreLabel.string = score + "/" + endlessData.nextData.IntegralRequirement;
        this.levelLabel.string = "" + endlessData.curData.RewardLevel;
        this.icon.spriteFrame = this.sp_icon[endlessData.curData.BoxIcon - 1];
    };
    __decorate([
        property([cc.SpriteFrame])
    ], EndlessgGameUi.prototype, "sp_icon", void 0);
    EndlessgGameUi = __decorate([
        ccclass
    ], EndlessgGameUi);
    return EndlessgGameUi;
}(cc.Component));
exports.default = EndlessgGameUi;

cc._RF.pop();