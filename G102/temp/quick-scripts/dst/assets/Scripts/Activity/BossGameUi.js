
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Scripts/Activity/BossGameUi.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0c1xcQWN0aXZpdHlcXEJvc3NHYW1lVWkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsMkNBQWlEO0FBR2pELGlEQUF1RDtBQUd2RCxpREFBZ0Q7QUFHMUMsSUFBQSxLQUFzQixFQUFFLENBQUMsVUFBVSxFQUFsQyxPQUFPLGFBQUEsRUFBRSxRQUFRLGNBQWlCLENBQUM7QUFHMUM7SUFBd0MsOEJBQVk7SUFBcEQ7UUFBQSxxRUFzREM7UUFuREcsYUFBTyxHQUFxQixFQUFFLENBQUM7UUFDL0Isb0JBQWMsR0FBUyxJQUFJLENBQUM7UUFDNUIsU0FBRyxHQUFTLElBQUksQ0FBQztRQUNqQixVQUFJLEdBQVcsSUFBSSxDQUFDO1FBQ3BCLGdCQUFVLEdBQVUsSUFBSSxDQUFDO1FBQ3pCLGdCQUFVLEdBQVUsSUFBSSxDQUFDO1FBQ3pCLGdCQUFVLEdBQVEsQ0FBQyxDQUFDOztJQTZDeEIsQ0FBQztJQTVDYSwyQkFBTSxHQUFoQjtRQUNJLFNBQVM7UUFDVCxJQUFJLENBQUMsY0FBYyxHQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLGtCQUFrQixDQUFDLENBQUMsY0FBYyxDQUFDLGdCQUFnQixDQUFDLENBQUM7UUFDbEcsSUFBSSxDQUFDLEdBQUcsR0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDLGNBQWMsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUM1RSxJQUFJLENBQUMsSUFBSSxHQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLE1BQU0sQ0FBQyxDQUFDLFlBQVksQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDbkUsSUFBSSxDQUFDLFVBQVUsR0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxZQUFZLENBQUMsQ0FBQyxZQUFZLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQzlFLElBQUksQ0FBQyxVQUFVLEdBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsWUFBWSxDQUFDLENBQUMsWUFBWSxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUM5RSxvQ0FBb0IsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxTQUFTLEdBQUMsQ0FBQyxDQUFDO0lBQ25ELENBQUM7SUFDRCxnQ0FBVyxHQUFYO1FBQ0ksZUFBZTtRQUNmLFdBQVc7UUFDWCxJQUFJLEtBQUssR0FBQyxvQ0FBb0IsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxTQUFTLENBQUM7UUFDdkQsSUFBSSxJQUFJLEdBQUMsOEJBQWlCLENBQUMsV0FBVyxFQUFFLENBQUMsZ0JBQWdCLENBQUMsb0NBQW9CLENBQUMsV0FBVyxFQUFFLENBQUMsa0JBQWtCLEVBQUMsS0FBSyxDQUFDLENBQUM7UUFDdkgsSUFBSSxRQUFRLEdBQUMsS0FBSyxHQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsbUJBQW1CLENBQUM7UUFDcEQsSUFBSSxRQUFRLEdBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxtQkFBbUIsR0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLG1CQUFtQixDQUFDO1FBQ2hGLElBQUksUUFBUSxHQUFDLFFBQVEsR0FBQyxRQUFRLEdBQUMsS0FBSyxDQUFDO1FBQ3JDLElBQUksQ0FBQyxjQUFjLENBQUMsWUFBWSxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUMsQ0FBQyxTQUFTLEdBQUMsUUFBUSxDQUFBO1FBQzlELElBQUksQ0FBQyxHQUFHLENBQUMsWUFBWSxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUMsQ0FBQyxTQUFTLEdBQUMsUUFBUSxDQUFBO1FBQ25ELElBQUksQ0FBQyxVQUFVLENBQUMsTUFBTSxHQUFDLEtBQUssR0FBQyxHQUFHLEdBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxtQkFBbUIsQ0FBQztRQUNuRSxJQUFJLENBQUMsVUFBVSxDQUFDLE1BQU0sR0FBQyxFQUFFLEdBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxXQUFXLENBQUM7UUFFbkQsaUZBQWlGO1FBQ2pGLElBQUksQ0FBQyxJQUFJLENBQUMsV0FBVyxHQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxPQUFPLEdBQUMsQ0FBQyxDQUFDLENBQUM7UUFDM0QsSUFBRyxJQUFJLENBQUMsT0FBTyxDQUFDLFdBQVcsR0FBQyxDQUFDLEVBQUM7WUFDMUIsSUFBSSxhQUFhLEdBQUcsbUJBQVEsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxhQUFhLENBQUEsQ0FBQSxNQUFNO1lBQzlELElBQUksV0FBVyxHQUFHLGFBQWEsR0FBRyxJQUFJLEdBQUcsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLFdBQVcsR0FBQyxDQUFDLENBQUMsQ0FBQSxDQUFBLE1BQU07WUFDM0UsSUFBSSxLQUFLLEdBQUUsb0NBQW9CLENBQUMsV0FBVyxFQUFFLENBQUMsZUFBZSxDQUFDLFdBQVcsQ0FBQyxDQUFBO1lBQzFFLHdEQUF3RDtZQUN4RCxPQUFPLEtBQUssQ0FBQztZQUViLDBFQUEwRTtTQUM3RTthQUFJO1lBQ0QsT0FBTyxDQUFDLENBQUM7U0FDWjtRQUlELGdEQUFnRDtRQUNoRCxnREFBZ0Q7UUFDaEQsZ0JBQWdCO1FBQ2hCLDZGQUE2RjtRQUM3RixJQUFJO0lBQ1IsQ0FBQztJQWxERDtRQURDLFFBQVEsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxXQUFXLENBQUMsQ0FBQzsrQ0FDSTtJQUhkLFVBQVU7UUFEOUIsT0FBTztPQUNhLFVBQVUsQ0FzRDlCO0lBQUQsaUJBQUM7Q0F0REQsQUFzREMsQ0F0RHVDLEVBQUUsQ0FBQyxTQUFTLEdBc0RuRDtrQkF0RG9CLFVBQVUiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBCb3NzUmV3YXJkTWFuYWdlciB9IGZyb20gXCIuL0Jvc3NSZXdhcmRcIjtcclxuaW1wb3J0IEdhbWVNYW5hZ2VyIGZyb20gXCIuLi9HYW1lTWFuYWdlclwiO1xyXG5pbXBvcnQgeyBFbmRsZXNzUmV3YXJkTWFuYWdlciB9IGZyb20gXCIuL0VuZGxlc3NSZXdhcmRcIjtcclxuaW1wb3J0IHsgQm9zc0NoYWxsZW5nZU1hbmFnZXIgfSBmcm9tIFwiLi9Cb3NzQ2hhbGxlbmdlXCI7XHJcbmltcG9ydCB7IFN0b3JhZ2VLZXkgfSBmcm9tIFwiLi4vU3RvcmFnZS9TdG9yYWdlQ29uZmlnXCI7XHJcbmltcG9ydCB7IFRoZVN0b3JhZ2VNYW5hZ2VyIH0gZnJvbSBcIi4uL1N0b3JhZ2UvU3RvcmFnZU1hbmFnZXJcIjtcclxuaW1wb3J0IHsgVXNlckluZm8gfSBmcm9tIFwiLi4vVXNlckluZm8vVXNlckluZm9cIjtcclxuXHJcblxyXG5jb25zdCB7Y2NjbGFzcywgcHJvcGVydHl9ID0gY2MuX2RlY29yYXRvcjtcclxuXHJcbkBjY2NsYXNzXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEJvc3NHYW1lVWkgZXh0ZW5kcyBjYy5Db21wb25lbnQge1xyXG5cclxuICAgIEBwcm9wZXJ0eShbY2MuU3ByaXRlRnJhbWVdKVxyXG4gICAgc3BfaWNvbjogY2MuU3ByaXRlRnJhbWVbXSA9IFtdO1xyXG4gICAgQm9zc1J1c2hfQmFyXzE6Y2MuTm9kZT1udWxsO1xyXG4gICAgYmFyOmNjLk5vZGU9bnVsbDtcclxuICAgIGljb246Y2MuU3ByaXRlPW51bGw7XHJcbiAgICBsZXZlbExhYmVsOmNjLkxhYmVsPW51bGw7XHJcbiAgICBzY29yZUxhYmVsOmNjLkxhYmVsPW51bGw7XHJcbiAgICBwcmV2X3N0YWdlOm51bWJlcj0xO1xyXG4gICAgcHJvdGVjdGVkIG9uTG9hZCgpOiB2b2lkIHtcclxuICAgICAgICAvLyByZXR1cm5cclxuICAgICAgICB0aGlzLkJvc3NSdXNoX0Jhcl8xPXRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZSgnc2NvcmVQcm9ncmVzc0JhcicpLmdldENoaWxkQnlOYW1lKFwiQm9zc1J1c2hfQmFyXzFcIik7XHJcbiAgICAgICAgdGhpcy5iYXI9dGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKCdzY29yZVByb2dyZXNzQmFyJykuZ2V0Q2hpbGRCeU5hbWUoXCJiYXJcIik7XHJcbiAgICAgICAgdGhpcy5pY29uPXRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZSgnaWNvbicpLmdldENvbXBvbmVudChjYy5TcHJpdGUpO1xyXG4gICAgICAgIHRoaXMubGV2ZWxMYWJlbD10aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoJ2xldmVsTGFiZWwnKS5nZXRDb21wb25lbnQoY2MuTGFiZWwpO1xyXG4gICAgICAgIHRoaXMuc2NvcmVMYWJlbD10aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoJ3Njb3JlTGFiZWwnKS5nZXRDb21wb25lbnQoY2MuTGFiZWwpO1xyXG4gICAgICAgIEJvc3NDaGFsbGVuZ2VNYW5hZ2VyLmdldEluc3RhbmNlKCkuY3VyX3Njb3JlPTA7XHJcbiAgICB9XHJcbiAgICByZWZyZXNoRGF0YSgpOm51bWJlcntcclxuICAgICAgICAvL+WFiOagueaNruW9k+WJjeWIhuaVsOaVsOaNruiOt+WPluaVsOaNrlxyXG4gICAgICAgIC8vIHJldHVybiAxXHJcbiAgICAgICAgbGV0IHNjb3JlPUJvc3NDaGFsbGVuZ2VNYW5hZ2VyLmdldEluc3RhbmNlKCkuY3VyX3Njb3JlO1xyXG4gICAgICAgIGxldCBkYXRhPUJvc3NSZXdhcmRNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0UmV3YXJkQnlTY29yZShCb3NzQ2hhbGxlbmdlTWFuYWdlci5nZXRJbnN0YW5jZSgpLmN1cl9jaGFsbGVuZ2VfbW9kZSxzY29yZSk7XHJcbiAgICAgICAgbGV0IHByb1Njb3JlPXNjb3JlLWRhdGEuY3VyRGF0YS5JbnRlZ3JhbFJlcXVpcmVtZW50O1xyXG4gICAgICAgIGxldCBtYXhTb2NyZT1kYXRhLm5leHREYXRhLkludGVncmFsUmVxdWlyZW1lbnQtZGF0YS5jdXJEYXRhLkludGVncmFsUmVxdWlyZW1lbnQ7XHJcbiAgICAgICAgbGV0IHByb2dyZXNzPXByb1Njb3JlL21heFNvY3JlKzAuMDAxO1xyXG4gICAgICAgIHRoaXMuQm9zc1J1c2hfQmFyXzEuZ2V0Q29tcG9uZW50KGNjLlNwcml0ZSkuZmlsbFJhbmdlPXByb2dyZXNzXHJcbiAgICAgICAgdGhpcy5iYXIuZ2V0Q29tcG9uZW50KGNjLlNwcml0ZSkuZmlsbFJhbmdlPXByb2dyZXNzXHJcbiAgICAgICAgdGhpcy5zY29yZUxhYmVsLnN0cmluZz1zY29yZStcIi9cIitkYXRhLm5leHREYXRhLkludGVncmFsUmVxdWlyZW1lbnQ7XHJcbiAgICAgICAgdGhpcy5sZXZlbExhYmVsLnN0cmluZz1cIlwiK2RhdGEuY3VyRGF0YS5SZXdhcmRMZXZlbDtcclxuICBcclxuICAgICAgICAvLyBUaGVTdG9yYWdlTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNldEl0ZW0oU3RvcmFnZUtleS5Cb3NzQ2hhbGxlbmdlRGFtYWdlLHNjb3JlKTtcclxuICAgICAgICB0aGlzLmljb24uc3ByaXRlRnJhbWU9dGhpcy5zcF9pY29uW2RhdGEuY3VyRGF0YS5Cb3hJY29uLTFdO1xyXG4gICAgICAgIGlmKGRhdGEuY3VyRGF0YS5SZXdhcmRMZXZlbD4wKXsgICAgICAgICAgIFxyXG4gICAgICAgICAgICBsZXQgUm90YXRpb25PcmRlciA9IFVzZXJJbmZvLmdldEluc3RhbmNlKCkuUm90YXRpb25PcmRlci8v6L2u5o2i6aG65bqPXHJcbiAgICAgICAgICAgIGxldCBDaGFsbGVuZ2VJRCA9IFJvdGF0aW9uT3JkZXIgKiAxMDAwICsgKGRhdGEuY3VyRGF0YS5SZXdhcmRMZXZlbCsxKS8v5oyR5oiYSURcclxuICAgICAgICAgICAgbGV0IGxldmVsPSBCb3NzQ2hhbGxlbmdlTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldE1vbnN0ZXJMZXZlbChDaGFsbGVuZ2VJRClcclxuICAgICAgICAgICAgLy8gY29uc29sZS5sb2coXCIrKysrKysrXCIsbGV2ZWwsZGF0YS5jdXJEYXRhLlJld2FyZExldmVsKVxyXG4gICAgICAgICAgICByZXR1cm4gbGV2ZWw7XHJcblxyXG4gICAgICAgICAgICAvLyByZXR1cm4gZmlnaHRpbmdJbmZvLm1vbnN0ZXJfZGF0YXNbZGF0YS5jdXJEYXRhLlJld2FyZExldmVsLTFdWzBdLmxldmVsO1xyXG4gICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICByZXR1cm4gMjtcclxuICAgICAgICB9XHJcblxyXG5cclxuXHJcbiAgICAgICAgLy8gaWYoZGF0YS5jdXJEYXRhLlJld2FyZExldmVsPnRoaXMucHJldl9zdGFnZSl7XHJcbiAgICAgICAgLy8gICAgIHRoaXMucHJldl9zdGFnZT1kYXRhLmN1ckRhdGEuUmV3YXJkTGV2ZWw7XHJcbiAgICAgICAgLy8gICAgIC8v6L+U5Zue5pyA5paw55qE57O75pWwXHJcbiAgICAgICAgLy8gICAgIHJldHVybiBHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLmxldmVsX2RhdGFzW3RoaXMucHJldl9zdGFnZS0xXS5hdHRyaWJ1dGVfbXVsdGlwbGVbMF07XHJcbiAgICAgICAgLy8gfVxyXG4gICAgfVxyXG59XHJcbiJdfQ==