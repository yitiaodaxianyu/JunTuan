
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
        //cc.resources.load('boss/bosscoming');
        //cc.resources.load('boss/boss1');
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0c1xcQm9zc1xcQm9zc01hbmFnZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBRUEsaUVBQThFO0FBQzlFLDhDQUF5QztBQUV6Qyw0REFBdUQ7QUFDdkQsMERBQXFEO0FBRS9DLElBQUEsS0FBc0IsRUFBRSxDQUFDLFVBQVUsRUFBbEMsT0FBTyxhQUFBLEVBQUUsUUFBUSxjQUFpQixDQUFDO0FBRzFDO0lBQXlDLCtCQUFZO0lBQXJEOztJQWtHQSxDQUFDO29CQWxHb0IsV0FBVztJQUtkLHVCQUFXLEdBQXpCO1FBRUksSUFBRyxJQUFJLENBQUMsU0FBUyxJQUFFLElBQUksRUFDdkI7WUFDSSxJQUFJLElBQUksR0FBQyxJQUFJLEVBQUUsQ0FBQyxJQUFJLEVBQUUsQ0FBQztZQUN2QixFQUFFLENBQUMsUUFBUSxDQUFDLFFBQVEsRUFBRSxDQUFDLGNBQWMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDL0QsSUFBSSxDQUFDLFNBQVMsR0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLGFBQVcsQ0FBQyxDQUFDO1NBQ2pEO1FBQ0QsT0FBTyxJQUFJLENBQUMsU0FBUyxDQUFDO0lBQzFCLENBQUM7SUFFRCw0QkFBTSxHQUFOO1FBQ0ksSUFBRyxDQUFDLGFBQVcsQ0FBQyxTQUFTLEVBQ3pCO1lBQ0ksYUFBVyxDQUFDLFNBQVMsR0FBQyxJQUFJLENBQUM7U0FDOUI7UUFDRCxzQkFBc0I7UUFDdEIsdUNBQXVDO1FBQ3ZDLGtDQUFrQztJQUN0QyxDQUFDO0lBRUQsK0JBQVMsR0FBVDtRQUNJLGFBQVcsQ0FBQyxTQUFTLEdBQUMsSUFBSSxDQUFDO0lBQy9CLENBQUM7SUFFRCw2QkFBTyxHQUFQLFVBQVEsU0FBZ0IsRUFBQyxLQUFZLEVBQUMsTUFBYTtRQUFuRCxpQkFRQztRQVBHLFdBQVc7UUFDWCxRQUFRO1FBQ1IsSUFBSSxDQUFDLGNB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QUEsTUFBTTtZQUNQO2dCQUFRO29CQUNKLFFBQVEsR0FBQyxDQUFDLENBQUM7aUJBQ2Q7Z0JBQUEsTUFBTTtTQUNWO1FBQ0QsT0FBTyxNQUFNLEdBQUMsUUFBUSxDQUFDO0lBQzNCLENBQUM7O0lBL0ZjLHFCQUFTLEdBQWdCLElBQUksQ0FBQztJQUY1QixXQUFXO1FBRC9CLE9BQU87T0FDYSxXQUFXLENBa0cvQjtJQUFELGtCQUFDO0NBbEdELEFBa0dDLENBbEd3QyxFQUFFLENBQUMsU0FBUyxHQWtHcEQ7a0JBbEdvQixXQUFXIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiXHJcbmltcG9ydCB7IEppYVN1IH0gZnJvbSBcIi4uL0NvbnN0YW50c1wiO1xyXG5pbXBvcnQgeyBHYW1lRWZmZWN0SWQsIEdhbWVFZmZlY3RzTWFuYWdlciB9IGZyb20gXCIuLi9HYW1lL0dhbWVFZmZlY3RzTWFuYWdlclwiO1xyXG5pbXBvcnQgR2FtZU1hbmFnZXIgZnJvbSBcIi4uL0dhbWVNYW5hZ2VyXCI7XHJcbmltcG9ydCB7IE1vbnN0ZXJDb25maWd1cmVNYW5hZ2VyIH0gZnJvbSBcIi4uL01vbnN0ZXIvRGF0YS9Nb25zdGVyQ29uZmlndXJlXCI7XHJcbmltcG9ydCBNb25zdGVyTWFuYWdlciBmcm9tIFwiLi4vTW9uc3Rlci9Nb25zdGVyTWFuYWdlclwiO1xyXG5pbXBvcnQgeyBTb3VuZEluZGV4IH0gZnJvbSBcIi4uL1NvdW5kL0F1ZGlvQ29uc3RhbnRzXCI7XHJcblxyXG5jb25zdCB7Y2NjbGFzcywgcHJvcGVydHl9ID0gY2MuX2RlY29yYXRvcjtcclxuXHJcbkBjY2NsYXNzXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEJvc3NNYW5hZ2VyIGV4dGVuZHMgY2MuQ29tcG9uZW50IHtcclxuXHJcbiAgICBwcml2YXRlIHN0YXRpYyBfaW5zdGFuY2U6IEJvc3NNYW5hZ2VyID0gbnVsbDtcclxuXHJcblxyXG4gICAgcHVibGljIHN0YXRpYyBnZXRJbnN0YW5jZSgpOkJvc3NNYW5hZ2VyXHJcbiAgICB7XHJcbiAgICAgICAgaWYodGhpcy5faW5zdGFuY2U9PW51bGwpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBsZXQgbm9kZT1uZXcgY2MuTm9kZSgpO1xyXG4gICAgICAgICAgICBjYy5kaXJlY3Rvci5nZXRTY2VuZSgpLmdldENoaWxkQnlOYW1lKFwiQ2FudmFzXCIpLmFkZENoaWxkKG5vZGUpO1xyXG4gICAgICAgICAgICB0aGlzLl9pbnN0YW5jZT1ub2RlLmFkZENvbXBvbmVudChCb3NzTWFuYWdlcik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0aGlzLl9pbnN0YW5jZTtcclxuICAgIH1cclxuXHJcbiAgICBvbkxvYWQoKSB7XHJcbiAgICAgICAgaWYoIUJvc3NNYW5hZ2VyLl9pbnN0YW5jZSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIEJvc3NNYW5hZ2VyLl9pbnN0YW5jZT10aGlzO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvL+WPr+S7peagueaNruWFs+WNoeaVsOWFiOmihOWKoOi9vWJvc3Pnm7jlhbPnmoTmlbDmja5cclxuICAgICAgICAvL2NjLnJlc291cmNlcy5sb2FkKCdib3NzL2Jvc3Njb21pbmcnKTtcclxuICAgICAgICAvL2NjLnJlc291cmNlcy5sb2FkKCdib3NzL2Jvc3MxJyk7XHJcbiAgICB9XHJcblxyXG4gICAgb25EZXN0cm95KCkge1xyXG4gICAgICAgIEJvc3NNYW5hZ2VyLl9pbnN0YW5jZT1udWxsO1xyXG4gICAgfVxyXG5cclxuICAgIGFkZEJvc3MobW9uc3RlcklkOm51bWJlcixsZXZlbDpudW1iZXIsaHBSYXRlOm51bWJlcil7XHJcbiAgICAgICAgLy/liqDovb3lr7nlupTnmoRib3NzXHJcbiAgICAgICAgLy/mmL7npLrlvIDlnLrliqjnlLtcclxuICAgICAgICB0aGlzLnNob3dCb3NzQ29taW5nKG1vbnN0ZXJJZCwoKT0+e1xyXG4gICAgICAgICAgICAvL+aSreaUvuWujOaIkFxyXG4gICAgICAgICAgICBjYy5sb2coXCLmkq3mlL7lrozmiJDvvIznlJ/miJBib3NzXCIpO1xyXG4gICAgICAgICAgICB0aGlzLnNob3dCb3NzKG1vbnN0ZXJJZCxsZXZlbCxocFJhdGUpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICBwcml2YXRlIHNob3dCb3NzQ29taW5nKG1vbnN0ZXJJZDpudW1iZXIsZW5kQ2FsbGJhY2s6RnVuY3Rpb24pe1xyXG4gICAgICAgIGxldCBub2RlPUdhbWVFZmZlY3RzTWFuYWdlci5nZXRJbnN0YW5jZSgpLmNyZWF0ZUdhbWVFZmZlY3RGb3JQYXJlbnQoR2FtZUVmZmVjdElkLmJvc3NfY29taW5nLGNjLnYyKDAsMCksY2MuZmluZChcIkNhbnZhcy9VaV9Sb290XCIpKTtcclxuICAgICAgICBsZXQgYm9zc1NraW49dGhpcy5nZXRCb3NzU2tpbihtb25zdGVySWQpO1xyXG4gICAgICAgIGxldCBzcE5vZGU9bm9kZS5nZXRDaGlsZEJ5TmFtZSgnYm9zc2NvbWluZycpO1xyXG4gICAgICAgIGxldCBzcHM9c3BOb2RlLmdldENvbXBvbmVudChzcC5Ta2VsZXRvbik7XHJcbiAgICAgICAgc3BzLnNldEFuaW1hdGlvbigwLFwiYm9zc2NvbWluZ1wiLGZhbHNlKTtcclxuICAgICAgICBzcHMuc2V0U2tpbihib3NzU2tpbik7XHJcbiAgICAgICAgc3BzLnNldENvbXBsZXRlTGlzdGVuZXIoKCk9PntcclxuICAgICAgICAgICAgZW5kQ2FsbGJhY2soKTtcclxuICAgICAgICAgICAgR2FtZUVmZmVjdHNNYW5hZ2VyLmdldEluc3RhbmNlKCkuZGVzdHJveUdhbWVFZmZlY3RCeUlkKEdhbWVFZmZlY3RJZC5ib3NzX2NvbWluZyxub2RlKTtcclxuICAgICAgICB9KTtcclxuICAgICAgICBHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNvdW5kX21hbmFnZXIucGxheVNvdW5kKFNvdW5kSW5kZXguWVhfRW5lbXlDb21pbmcpO1xyXG4gICAgfVxyXG5cclxuICAgIHNob3dCb3NzKG1vbnN0ZXJJZDpudW1iZXIsbGV2ZWw6bnVtYmVyLGhwUmF0ZTpudW1iZXIpe1xyXG4gICAgICAgIC8vY29uc29sZS5sb2coXCJfX19fX19fX19fX0Jvc3NcIilcclxuICAgICAgICBNb25zdGVyTWFuYWdlci5nZXRJbnN0YW5jZSgpLmNyZWF0ZU1vbnN0ZXJCeUlkKG1vbnN0ZXJJZCxHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldEZpZ2h0Q2VudGVyKCksbGV2ZWwsaHBSYXRlLHRydWUpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgZ2V0Qm9zc1NraW4obW9uc3RlcklkOm51bWJlcik6c3RyaW5ne1xyXG4gICAgICAgIGxldCBib3NzVHlwZT02O1xyXG4gICAgICAgIHN3aXRjaChtb25zdGVySWQpe1xyXG4gICAgICAgICAgICBjYXNlIDMwMzgxOntcclxuICAgICAgICAgICAgICAgIGJvc3NUeXBlPTY7XHJcbiAgICAgICAgICAgIH1icmVhaztcclxuICAgICAgICAgICAgY2FzZSAzMDM5MTp7XHJcbiAgICAgICAgICAgICAgICBib3NzVHlwZT03O1xyXG4gICAgICAgICAgICB9YnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgMzA4MDE6e1xyXG4gICAgICAgICAgICAgICAgYm9zc1R5cGU9ODtcclxuICAgICAgICAgICAgfWJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIDMwODExOntcclxuICAgICAgICAgICAgICAgIGJvc3NUeXBlPTk7XHJcbiAgICAgICAgICAgIH1icmVhaztcclxuICAgICAgICAgICAgY2FzZSAzMDgyMTp7XHJcbiAgICAgICAgICAgICAgICBib3NzVHlwZT0xMDtcclxuICAgICAgICAgICAgfWJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIDMwODMxOntcclxuICAgICAgICAgICAgICAgIGJvc3NUeXBlPTExO1xyXG4gICAgICAgICAgICB9YnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgMzA4NDE6e1xyXG4gICAgICAgICAgICAgICAgYm9zc1R5cGU9MTI7XHJcbiAgICAgICAgICAgIH1icmVhaztcclxuICAgICAgICAgICAgY2FzZSAzMDg1MTp7XHJcbiAgICAgICAgICAgICAgICBib3NzVHlwZT0xMztcclxuICAgICAgICAgICAgfWJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIDMwODYxOntcclxuICAgICAgICAgICAgICAgIGJvc3NUeXBlPTE0O1xyXG4gICAgICAgICAgICB9YnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgMzA4NzE6e1xyXG4gICAgICAgICAgICAgICAgYm9zc1R5cGU9MTU7XHJcbiAgICAgICAgICAgIH1icmVhaztcclxuICAgICAgICAgICAgZGVmYXVsdDp7XHJcbiAgICAgICAgICAgICAgICBib3NzVHlwZT02O1xyXG4gICAgICAgICAgICB9YnJlYWs7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBcIkJvc3NcIitib3NzVHlwZTtcclxuICAgIH1cclxufVxyXG4iXX0=