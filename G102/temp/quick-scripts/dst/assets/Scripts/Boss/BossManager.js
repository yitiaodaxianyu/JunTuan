
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Scripts/Boss/BossManager.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'a256cgb4KlFcLqkZ/L1pKhb', 'BossManager');
// Scripts/Boss/BossManager.ts

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
var GameEffectsManager_1 = require("../Game/GameEffectsManager");
var GameManager_1 = require("../GameManager");
var MonsterManager_1 = require("../Monster/MonsterManager");
var AudioConstants_1 = require("../Sound/AudioConstants");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var BossManager = /** @class */ (function (_super) {
    __extends(BossManager, _super);
    function BossManager() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    BossManager_1 = BossManager;
    BossManager.getInstance = function () {
        if (this._instance == null) {
            var node = new cc.Node();
            cc.director.getScene().getChildByName("Canvas").addChild(node);
            this._instance = node.addComponent(BossManager_1);
        }
        return this._instance;
    };
    BossManager.prototype.onLoad = function () {
        if (!BossManager_1._instance) {
            BossManager_1._instance = this;
        }
        //可以根据关卡数先预加载boss相关的数据
        //WXManagerEX.getInstance().resourcesBundle.load('boss/bosscoming');
        //WXManagerEX.getInstance().resourcesBundle.load('boss/boss1');
    };
    BossManager.prototype.onDestroy = function () {
        BossManager_1._instance = null;
    };
    BossManager.prototype.addBoss = function (monsterId, level, hpRate) {
        var _this = this;
        //加载对应的boss
        //显示开场动画
        this.showBossComing(monsterId, function () {
            //播放完成
            cc.log("播放完成，生成boss");
            _this.showBoss(monsterId, level, hpRate);
        });
    };
    BossManager.prototype.showBossComing = function (monsterId, endCallback) {
        var node = GameEffectsManager_1.GameEffectsManager.getInstance().createGameEffectForParent(GameEffectsManager_1.GameEffectId.boss_coming, cc.v2(0, 0), cc.find("Canvas/Ui_Root"));
        var bossSkin = this.getBossSkin(monsterId);
        var spNode = node.getChildByName('bosscoming');
        var sps = spNode.getComponent(sp.Skeleton);
        sps.setAnimation(0, "bosscoming", false);
        sps.setSkin(bossSkin);
        sps.setCompleteListener(function () {
            endCallback();
            GameEffectsManager_1.GameEffectsManager.getInstance().destroyGameEffectById(GameEffectsManager_1.GameEffectId.boss_coming, node);
        });
        GameManager_1.default.getInstance().sound_manager.playSound(AudioConstants_1.SoundIndex.YX_EnemyComing);
    };
    BossManager.prototype.showBoss = function (monsterId, level, hpRate) {
        //console.log("___________Boss")
        MonsterManager_1.default.getInstance().createMonsterById(monsterId, GameManager_1.default.getInstance().getFightCenter(), level, hpRate, true);
    };
    BossManager.prototype.getBossSkin = function (monsterId) {
        var bossType = 6;
        switch (monsterId) {
            case 30381:
                {
                    bossType = 6;
                }
                break;
            case 30391:
                {
                    bossType = 7;
                }
                break;
            case 30801:
                {
                    bossType = 8;
                }
                break;
            case 30811:
                {
                    bossType = 9;
                }
                break;
            case 30821:
                {
                    bossType = 10;
                }
                break;
            case 30831:
                {
                    bossType = 11;
                }
                break;
            case 30841:
                {
                    bossType = 12;
                }
                break;
            case 30851:
                {
                    bossType = 13;
                }
                break;
            case 30861:
                {
                    bossType = 14;
                }
                break;
            case 30871:
                {
                    bossType = 15;
                }
                break;
            default:
                {
                    bossType = 6;
                }
                break;
        }
        return "Boss" + bossType;
    };
    var BossManager_1;
    BossManager._instance = null;
    BossManager = BossManager_1 = __decorate([
        ccclass
    ], BossManager);
    return BossManager;
}(cc.Component));
exports.default = BossManager;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0c1xcQm9zc1xcQm9zc01hbmFnZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBRUEsaUVBQThFO0FBQzlFLDhDQUF5QztBQUV6Qyw0REFBdUQ7QUFDdkQsMERBQXFEO0FBRS9DLElBQUEsS0FBc0IsRUFBRSxDQUFDLFVBQVUsRUFBbEMsT0FBTyxhQUFBLEVBQUUsUUFBUSxjQUFpQixDQUFDO0FBRzFDO0lBQXlDLCtCQUFZO0lBQXJEOztJQWtHQSxDQUFDO29CQWxHb0IsV0FBVztJQUtkLHVCQUFXLEdBQXpCO1FBRUksSUFBRyxJQUFJLENBQUMsU0FBUyxJQUFFLElBQUksRUFDdkI7WUFDSSxJQUFJLElBQUksR0FBQyxJQUFJLEVBQUUsQ0FBQyxJQUFJLEVBQUUsQ0FBQztZQUN2QixFQUFFLENBQUMsUUFBUSxDQUFDLFFBQVEsRUFBRSxDQUFDLGNBQWMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDL0QsSUFBSSxDQUFDLFNBQVMsR0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLGFBQVcsQ0FBQyxDQUFDO1NBQ2pEO1FBQ0QsT0FBTyxJQUFJLENBQUMsU0FBUyxDQUFDO0lBQzFCLENBQUM7SUFFRCw0QkFBTSxHQUFOO1FBQ0ksSUFBRyxDQUFDLGFBQVcsQ0FBQyxTQUFTLEVBQ3pCO1lBQ0ksYUFBVyxDQUFDLFNBQVMsR0FBQyxJQUFJLENBQUM7U0FDOUI7UUFDRCxzQkFBc0I7UUFDdEIsb0VBQW9FO1FBQ3BFLCtEQUErRDtJQUNuRSxDQUFDO0lBRUQsK0JBQVMsR0FBVDtRQUNJLGFBQVcsQ0FBQyxTQUFTLEdBQUMsSUFBSSxDQUFDO0lBQy9CLENBQUM7SUFFRCw2QkFBTyxHQUFQLFVBQVEsU0FBZ0IsRUFBQyxLQUFZLEVBQUMsTUFBYTtRQUFuRCxpQkFRQztRQVBHLFdBQVc7UUFDWCxRQUFRO1FBQ1IsSUFBSSxDQUFDLGNB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QUEsTUFBTTtZQUNQO2dCQUFRO29CQUNKLFFBQVEsR0FBQyxDQUFDLENBQUM7aUJBQ2Q7Z0JBQUEsTUFBTTtTQUNWO1FBQ0QsT0FBTyxNQUFNLEdBQUMsUUFBUSxDQUFDO0lBQzNCLENBQUM7O0lBL0ZjLHFCQUFTLEdBQWdCLElBQUksQ0FBQztJQUY1QixXQUFXO1FBRC9CLE9BQU87T0FDYSxXQUFXLENBa0cvQjtJQUFELGtCQUFDO0NBbEdELEFBa0dDLENBbEd3QyxFQUFFLENBQUMsU0FBUyxHQWtHcEQ7a0JBbEdvQixXQUFXIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiXHJcbmltcG9ydCB7IEppYVN1IH0gZnJvbSBcIi4uL0NvbnN0YW50c1wiO1xyXG5pbXBvcnQgeyBHYW1lRWZmZWN0SWQsIEdhbWVFZmZlY3RzTWFuYWdlciB9IGZyb20gXCIuLi9HYW1lL0dhbWVFZmZlY3RzTWFuYWdlclwiO1xyXG5pbXBvcnQgR2FtZU1hbmFnZXIgZnJvbSBcIi4uL0dhbWVNYW5hZ2VyXCI7XHJcbmltcG9ydCB7IE1vbnN0ZXJDb25maWd1cmVNYW5hZ2VyIH0gZnJvbSBcIi4uL01vbnN0ZXIvRGF0YS9Nb25zdGVyQ29uZmlndXJlXCI7XHJcbmltcG9ydCBNb25zdGVyTWFuYWdlciBmcm9tIFwiLi4vTW9uc3Rlci9Nb25zdGVyTWFuYWdlclwiO1xyXG5pbXBvcnQgeyBTb3VuZEluZGV4IH0gZnJvbSBcIi4uL1NvdW5kL0F1ZGlvQ29uc3RhbnRzXCI7XHJcblxyXG5jb25zdCB7Y2NjbGFzcywgcHJvcGVydHl9ID0gY2MuX2RlY29yYXRvcjtcclxuXHJcbkBjY2NsYXNzXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEJvc3NNYW5hZ2VyIGV4dGVuZHMgY2MuQ29tcG9uZW50IHtcclxuXHJcbiAgICBwcml2YXRlIHN0YXRpYyBfaW5zdGFuY2U6IEJvc3NNYW5hZ2VyID0gbnVsbDtcclxuXHJcblxyXG4gICAgcHVibGljIHN0YXRpYyBnZXRJbnN0YW5jZSgpOkJvc3NNYW5hZ2VyXHJcbiAgICB7XHJcbiAgICAgICAgaWYodGhpcy5faW5zdGFuY2U9PW51bGwpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBsZXQgbm9kZT1uZXcgY2MuTm9kZSgpO1xyXG4gICAgICAgICAgICBjYy5kaXJlY3Rvci5nZXRTY2VuZSgpLmdldENoaWxkQnlOYW1lKFwiQ2FudmFzXCIpLmFkZENoaWxkKG5vZGUpO1xyXG4gICAgICAgICAgICB0aGlzLl9pbnN0YW5jZT1ub2RlLmFkZENvbXBvbmVudChCb3NzTWFuYWdlcik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0aGlzLl9pbnN0YW5jZTtcclxuICAgIH1cclxuXHJcbiAgICBvbkxvYWQoKSB7XHJcbiAgICAgICAgaWYoIUJvc3NNYW5hZ2VyLl9pbnN0YW5jZSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIEJvc3NNYW5hZ2VyLl9pbnN0YW5jZT10aGlzO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvL+WPr+S7peagueaNruWFs+WNoeaVsOWFiOmihOWKoOi9vWJvc3Pnm7jlhbPnmoTmlbDmja5cclxuICAgICAgICAvL1dYTWFuYWdlckVYLmdldEluc3RhbmNlKCkucmVzb3VyY2VzQnVuZGxlLmxvYWQoJ2Jvc3MvYm9zc2NvbWluZycpO1xyXG4gICAgICAgIC8vV1hNYW5hZ2VyRVguZ2V0SW5zdGFuY2UoKS5yZXNvdXJjZXNCdW5kbGUubG9hZCgnYm9zcy9ib3NzMScpO1xyXG4gICAgfVxyXG5cclxuICAgIG9uRGVzdHJveSgpIHtcclxuICAgICAgICBCb3NzTWFuYWdlci5faW5zdGFuY2U9bnVsbDtcclxuICAgIH1cclxuXHJcbiAgICBhZGRCb3NzKG1vbnN0ZXJJZDpudW1iZXIsbGV2ZWw6bnVtYmVyLGhwUmF0ZTpudW1iZXIpe1xyXG4gICAgICAgIC8v5Yqg6L295a+55bqU55qEYm9zc1xyXG4gICAgICAgIC8v5pi+56S65byA5Zy65Yqo55S7XHJcbiAgICAgICAgdGhpcy5zaG93Qm9zc0NvbWluZyhtb25zdGVySWQsKCk9PntcclxuICAgICAgICAgICAgLy/mkq3mlL7lrozmiJBcclxuICAgICAgICAgICAgY2MubG9nKFwi5pKt5pS+5a6M5oiQ77yM55Sf5oiQYm9zc1wiKTtcclxuICAgICAgICAgICAgdGhpcy5zaG93Qm9zcyhtb25zdGVySWQsbGV2ZWwsaHBSYXRlKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuICAgIFxyXG4gICAgcHJpdmF0ZSBzaG93Qm9zc0NvbWluZyhtb25zdGVySWQ6bnVtYmVyLGVuZENhbGxiYWNrOkZ1bmN0aW9uKXtcclxuICAgICAgICBsZXQgbm9kZT1HYW1lRWZmZWN0c01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5jcmVhdGVHYW1lRWZmZWN0Rm9yUGFyZW50KEdhbWVFZmZlY3RJZC5ib3NzX2NvbWluZyxjYy52MigwLDApLGNjLmZpbmQoXCJDYW52YXMvVWlfUm9vdFwiKSk7XHJcbiAgICAgICAgbGV0IGJvc3NTa2luPXRoaXMuZ2V0Qm9zc1NraW4obW9uc3RlcklkKTtcclxuICAgICAgICBsZXQgc3BOb2RlPW5vZGUuZ2V0Q2hpbGRCeU5hbWUoJ2Jvc3Njb21pbmcnKTtcclxuICAgICAgICBsZXQgc3BzPXNwTm9kZS5nZXRDb21wb25lbnQoc3AuU2tlbGV0b24pO1xyXG4gICAgICAgIHNwcy5zZXRBbmltYXRpb24oMCxcImJvc3Njb21pbmdcIixmYWxzZSk7XHJcbiAgICAgICAgc3BzLnNldFNraW4oYm9zc1NraW4pO1xyXG4gICAgICAgIHNwcy5zZXRDb21wbGV0ZUxpc3RlbmVyKCgpPT57XHJcbiAgICAgICAgICAgIGVuZENhbGxiYWNrKCk7XHJcbiAgICAgICAgICAgIEdhbWVFZmZlY3RzTWFuYWdlci5nZXRJbnN0YW5jZSgpLmRlc3Ryb3lHYW1lRWZmZWN0QnlJZChHYW1lRWZmZWN0SWQuYm9zc19jb21pbmcsbm9kZSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zb3VuZF9tYW5hZ2VyLnBsYXlTb3VuZChTb3VuZEluZGV4LllYX0VuZW15Q29taW5nKTtcclxuICAgIH1cclxuXHJcbiAgICBzaG93Qm9zcyhtb25zdGVySWQ6bnVtYmVyLGxldmVsOm51bWJlcixocFJhdGU6bnVtYmVyKXtcclxuICAgICAgICAvL2NvbnNvbGUubG9nKFwiX19fX19fX19fX19Cb3NzXCIpXHJcbiAgICAgICAgTW9uc3Rlck1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5jcmVhdGVNb25zdGVyQnlJZChtb25zdGVySWQsR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRGaWdodENlbnRlcigpLGxldmVsLGhwUmF0ZSx0cnVlKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGdldEJvc3NTa2luKG1vbnN0ZXJJZDpudW1iZXIpOnN0cmluZ3tcclxuICAgICAgICBsZXQgYm9zc1R5cGU9NjtcclxuICAgICAgICBzd2l0Y2gobW9uc3RlcklkKXtcclxuICAgICAgICAgICAgY2FzZSAzMDM4MTp7XHJcbiAgICAgICAgICAgICAgICBib3NzVHlwZT02O1xyXG4gICAgICAgICAgICB9YnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgMzAzOTE6e1xyXG4gICAgICAgICAgICAgICAgYm9zc1R5cGU9NztcclxuICAgICAgICAgICAgfWJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIDMwODAxOntcclxuICAgICAgICAgICAgICAgIGJvc3NUeXBlPTg7XHJcbiAgICAgICAgICAgIH1icmVhaztcclxuICAgICAgICAgICAgY2FzZSAzMDgxMTp7XHJcbiAgICAgICAgICAgICAgICBib3NzVHlwZT05O1xyXG4gICAgICAgICAgICB9YnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgMzA4MjE6e1xyXG4gICAgICAgICAgICAgICAgYm9zc1R5cGU9MTA7XHJcbiAgICAgICAgICAgIH1icmVhaztcclxuICAgICAgICAgICAgY2FzZSAzMDgzMTp7XHJcbiAgICAgICAgICAgICAgICBib3NzVHlwZT0xMTtcclxuICAgICAgICAgICAgfWJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIDMwODQxOntcclxuICAgICAgICAgICAgICAgIGJvc3NUeXBlPTEyO1xyXG4gICAgICAgICAgICB9YnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgMzA4NTE6e1xyXG4gICAgICAgICAgICAgICAgYm9zc1R5cGU9MTM7XHJcbiAgICAgICAgICAgIH1icmVhaztcclxuICAgICAgICAgICAgY2FzZSAzMDg2MTp7XHJcbiAgICAgICAgICAgICAgICBib3NzVHlwZT0xNDtcclxuICAgICAgICAgICAgfWJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIDMwODcxOntcclxuICAgICAgICAgICAgICAgIGJvc3NUeXBlPTE1O1xyXG4gICAgICAgICAgICB9YnJlYWs7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6e1xyXG4gICAgICAgICAgICAgICAgYm9zc1R5cGU9NjtcclxuICAgICAgICAgICAgfWJyZWFrO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gXCJCb3NzXCIrYm9zc1R5cGU7XHJcbiAgICB9XHJcbn1cclxuIl19