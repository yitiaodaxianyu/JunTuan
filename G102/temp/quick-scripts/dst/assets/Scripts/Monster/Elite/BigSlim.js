
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Scripts/Monster/Elite/BigSlim.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '41606bxtHVI36DbhB85j2Vo', 'BigSlim');
// Scripts/Monster/Elite/BigSlim.ts

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
var GameEffectsManager_1 = require("../../Game/GameEffectsManager");
var MonsterManager_1 = require("../MonsterManager");
var MonsterNewNormal_1 = require("../MonsterNewNormal");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var BigSlim = /** @class */ (function (_super) {
    __extends(BigSlim, _super);
    function BigSlim() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    BigSlim.prototype.onLoad = function () {
        _super.prototype.onLoad.call(this);
        _super.prototype.addDeathCallback.call(this, this.onDeath);
        GameEffectsManager_1.GameEffectsManager.getInstance().addEffectPoolById(GameEffectsManager_1.GameEffectId.monster70_silaimu_qq, 6);
        MonsterManager_1.default.getInstance().addMonsterPool(10491, 6);
        GameEffectsManager_1.GameEffectsManager.getInstance().addEffectPoolById(GameEffectsManager_1.GameEffectId.monster_zhaohuan, 4);
    };
    BigSlim.prototype.onDeath = function () {
        var _this = this;
        //先播放动画
        var anima = this.spine.setAnimation(0, "Side_Dead", false);
        this.spine.setTrackEventListener(anima, function (entry, event) {
            if (event.data.name == "Dead") {
                _this.deathFinish();
            }
        });
        this.spine.setTrackCompleteListener(anima, function (entry, event) {
            anima.listener = null;
            _this.removeAllDeBuff();
            _this.shadow.opacity = 0;
            _this.node.opacity = 0;
            var die = GameEffectsManager_1.GameEffectsManager.getInstance().createGameEffectById(GameEffectsManager_1.GameEffectId.monster_die, _super.prototype.getCenterPos.call(_this));
            die.scale = 0.8;
            MonsterManager_1.default.getInstance().destroyMonster(_this.node, _this.monster_type, false);
        });
    };
    BigSlim.prototype.deathFinish = function () {
        var _this = this;
        this.removeAllDeBuff();
        //生成小史莱姆        
        //半径
        var pos = this.getCenterPos();
        var rr = 200;
        var onceRadian = Math.PI / 5; //6个怪
        var _loop_1 = function (i) {
            var xx = Math.cos(onceRadian * i) * rr + pos.x;
            var yy = Math.sin(onceRadian * i) * rr + pos.y;
            //小泡泡
            var paopao = GameEffectsManager_1.GameEffectsManager.getInstance().createGameEffectById(GameEffectsManager_1.GameEffectId.monster70_silaimu_qq, pos);
            var endPos = cc.v2(xx, yy);
            cc.tween(paopao).then(cc.jumpTo(0.5, endPos, yy - pos.y + 50, 1)).call(function () {
                MonsterManager_1.default.getInstance().createSummonMonster(10491, _this.monster_level, endPos);
                GameEffectsManager_1.GameEffectsManager.getInstance().destroyGameEffectById(GameEffectsManager_1.GameEffectId.monster70_silaimu_qq, paopao);
            }).start();
        };
        for (var i = 0; i < 6; i++) {
            _loop_1(i);
        }
    };
    BigSlim = __decorate([
        ccclass
    ], BigSlim);
    return BigSlim;
}(MonsterNewNormal_1.default));
exports.default = BigSlim;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0c1xcTW9uc3RlclxcRWxpdGVcXEJpZ1NsaW0udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsb0VBQWlGO0FBRWpGLG9EQUErQztBQUMvQyx3REFBbUQ7QUFHN0MsSUFBQSxLQUFzQixFQUFFLENBQUMsVUFBVSxFQUFsQyxPQUFPLGFBQUEsRUFBRSxRQUFRLGNBQWlCLENBQUM7QUFHMUM7SUFBcUMsMkJBQWdCO0lBQXJEOztJQXFEQSxDQUFDO0lBakRHLHdCQUFNLEdBQU47UUFDSSxpQkFBTSxNQUFNLFdBQUUsQ0FBQztRQUNmLGlCQUFNLGdCQUFnQixZQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUNyQyx1Q0FBa0IsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxpQkFBaUIsQ0FBQyxpQ0FBWSxDQUFDLG9CQUFvQixFQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ3hGLHdCQUFjLENBQUMsV0FBVyxFQUFFLENBQUMsY0FBYyxDQUFDLEtBQUssRUFBQyxDQUFDLENBQUMsQ0FBQztRQUNyRCx1Q0FBa0IsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxpQkFBaUIsQ0FBQyxpQ0FBWSxDQUFDLGdCQUFnQixFQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ3hGLENBQUM7SUFFRCx5QkFBTyxHQUFQO1FBQUEsaUJBa0JDO1FBaEJHLE9BQU87UUFDUCxJQUFJLEtBQUssR0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLFlBQVksQ0FBQyxDQUFDLEVBQUMsV0FBVyxFQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ3ZELElBQUksQ0FBQyxLQUFLLENBQUMscUJBQXFCLENBQUMsS0FBSyxFQUFDLFVBQUMsS0FBMEIsRUFBRSxLQUFLO1lBQ3JFLElBQUcsS0FBSyxDQUFDLElBQUksQ0FBQyxJQUFJLElBQUUsTUFBTSxFQUFDO2dCQUN2QixLQUFJLENBQUMsV0FBVyxFQUFFLENBQUM7YUFDdEI7UUFDTCxDQUFDLENBQUMsQ0FBQTtRQUNGLElBQUksQ0FBQyxLQUFLLENBQUMsd0JBQXdCLENBQUMsS0FBSyxFQUFDLFVBQUMsS0FBMEIsRUFBRSxLQUFLO1lBQ3hFLEtBQUssQ0FBQyxRQUFRLEdBQUMsSUFBSSxDQUFDO1lBQ3BCLEtBQUksQ0FBQyxlQUFlLEVBQUUsQ0FBQztZQUN2QixLQUFJLENBQUMsTUFBTSxDQUFDLE9BQU8sR0FBQyxDQUFDLENBQUM7WUFDdEIsS0FBSSxDQUFDLElBQUksQ0FBQyxPQUFPLEdBQUMsQ0FBQyxDQUFDO1lBQ3BCLElBQUksR0FBRyxHQUFDLHVDQUFrQixDQUFDLFdBQVcsRUFBRSxDQUFDLG9CQUFvQixDQUFDLGlDQUFZLENBQUMsV0FBVyxFQUFDLGlCQUFNLFlBQVksWUFBRSxDQUFDLENBQUM7WUFDN0csR0FBRyxDQUFDLEtBQUssR0FBQyxHQUFHLENBQUM7WUFDZCx3QkFBYyxDQUFDLFdBQVcsRUFBRSxDQUFDLGNBQWMsQ0FBQyxLQUFJLENBQUMsSUFBSSxFQUFDLEtBQUksQ0FBQyxZQUFZLEVBQUMsS0FBSyxDQUFDLENBQUM7UUFDbkYsQ0FBQyxDQUFDLENBQUE7SUFDTixDQUFDO0lBRUQsNkJBQVcsR0FBWDtRQUFBLGlCQWtCQztRQWpCRyxJQUFJLENBQUMsZUFBZSxFQUFFLENBQUM7UUFDdkIsZ0JBQWdCO1FBQ2hCLElBQUk7UUFDSixJQUFJLEdBQUcsR0FBQyxJQUFJLENBQUMsWUFBWSxFQUFFLENBQUM7UUFDNUIsSUFBSSxFQUFFLEdBQUMsR0FBRyxDQUFDO1FBQ1gsSUFBSSxVQUFVLEdBQUMsSUFBSSxDQUFDLEVBQUUsR0FBQyxDQUFDLENBQUMsQ0FBQSxLQUFLO2dDQUN0QixDQUFDO1lBQ0wsSUFBSSxFQUFFLEdBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxVQUFVLEdBQUMsQ0FBQyxDQUFDLEdBQUMsRUFBRSxHQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7WUFDdkMsSUFBSSxFQUFFLEdBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxVQUFVLEdBQUMsQ0FBQyxDQUFDLEdBQUMsRUFBRSxHQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7WUFDdkMsS0FBSztZQUNMLElBQUksTUFBTSxHQUFDLHVDQUFrQixDQUFDLFdBQVcsRUFBRSxDQUFDLG9CQUFvQixDQUFDLGlDQUFZLENBQUMsb0JBQW9CLEVBQUMsR0FBRyxDQUFDLENBQUE7WUFDdkcsSUFBSSxNQUFNLEdBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUMsRUFBRSxDQUFDLENBQUE7WUFDdkIsRUFBRSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBQyxHQUFHLEVBQUMsTUFBTSxFQUFDLEVBQUUsR0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFDLEVBQUUsRUFBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQztnQkFDNUQsd0JBQWMsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxtQkFBbUIsQ0FBQyxLQUFLLEVBQUMsS0FBSSxDQUFDLGFBQWEsRUFBQyxNQUFNLENBQUMsQ0FBQztnQkFDbEYsdUNBQWtCLENBQUMsV0FBVyxFQUFFLENBQUMscUJBQXFCLENBQUMsaUNBQVksQ0FBQyxvQkFBb0IsRUFBQyxNQUFNLENBQUMsQ0FBQztZQUNyRyxDQUFDLENBQUMsQ0FBQyxLQUFLLEVBQUUsQ0FBQzs7UUFUZixLQUFJLElBQUksQ0FBQyxHQUFDLENBQUMsRUFBRSxDQUFDLEdBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRTtvQkFBYixDQUFDO1NBVVI7SUFDTCxDQUFDO0lBbERnQixPQUFPO1FBRDNCLE9BQU87T0FDYSxPQUFPLENBcUQzQjtJQUFELGNBQUM7Q0FyREQsQUFxREMsQ0FyRG9DLDBCQUFnQixHQXFEcEQ7a0JBckRvQixPQUFPIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgR2FtZUVmZmVjdHNNYW5hZ2VyLCBHYW1lRWZmZWN0SWQgfSBmcm9tIFwiLi4vLi4vR2FtZS9HYW1lRWZmZWN0c01hbmFnZXJcIjtcclxuaW1wb3J0IHsgS2V5RnJhbWVEYXRhLCBTdHJlbmd0aFR5cGUgfSBmcm9tIFwiLi4vTW9uc3RlckRhdGFcIjtcclxuaW1wb3J0IE1vbnN0ZXJNYW5hZ2VyIGZyb20gXCIuLi9Nb25zdGVyTWFuYWdlclwiO1xyXG5pbXBvcnQgTW9uc3Rlck5ld05vcm1hbCBmcm9tIFwiLi4vTW9uc3Rlck5ld05vcm1hbFwiO1xyXG5cclxuXHJcbmNvbnN0IHtjY2NsYXNzLCBwcm9wZXJ0eX0gPSBjYy5fZGVjb3JhdG9yO1xyXG5cclxuQGNjY2xhc3NcclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQmlnU2xpbSBleHRlbmRzIE1vbnN0ZXJOZXdOb3JtYWwge1xyXG5cclxuXHJcblxyXG4gICAgb25Mb2FkICgpIHtcclxuICAgICAgICBzdXBlci5vbkxvYWQoKTtcclxuICAgICAgICBzdXBlci5hZGREZWF0aENhbGxiYWNrKHRoaXMub25EZWF0aCk7XHJcbiAgICAgICAgR2FtZUVmZmVjdHNNYW5hZ2VyLmdldEluc3RhbmNlKCkuYWRkRWZmZWN0UG9vbEJ5SWQoR2FtZUVmZmVjdElkLm1vbnN0ZXI3MF9zaWxhaW11X3FxLDYpO1xyXG4gICAgICAgIE1vbnN0ZXJNYW5hZ2VyLmdldEluc3RhbmNlKCkuYWRkTW9uc3RlclBvb2woMTA0OTEsNik7XHJcbiAgICAgICAgR2FtZUVmZmVjdHNNYW5hZ2VyLmdldEluc3RhbmNlKCkuYWRkRWZmZWN0UG9vbEJ5SWQoR2FtZUVmZmVjdElkLm1vbnN0ZXJfemhhb2h1YW4sNCk7XHJcbiAgICB9XHJcblxyXG4gICAgb25EZWF0aCgpe1xyXG5cclxuICAgICAgICAvL+WFiOaSreaUvuWKqOeUu1xyXG4gICAgICAgIGxldCBhbmltYT10aGlzLnNwaW5lLnNldEFuaW1hdGlvbigwLFwiU2lkZV9EZWFkXCIsZmFsc2UpO1xyXG4gICAgICAgIHRoaXMuc3BpbmUuc2V0VHJhY2tFdmVudExpc3RlbmVyKGFuaW1hLChlbnRyeTogc3Auc3BpbmUuVHJhY2tFbnRyeSwgZXZlbnQpID0+e1xyXG4gICAgICAgICAgICBpZihldmVudC5kYXRhLm5hbWU9PVwiRGVhZFwiKXtcclxuICAgICAgICAgICAgICAgIHRoaXMuZGVhdGhGaW5pc2goKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pXHJcbiAgICAgICAgdGhpcy5zcGluZS5zZXRUcmFja0NvbXBsZXRlTGlzdGVuZXIoYW5pbWEsKGVudHJ5OiBzcC5zcGluZS5UcmFja0VudHJ5LCBldmVudCkgPT57XHJcbiAgICAgICAgICAgIGFuaW1hLmxpc3RlbmVyPW51bGw7XHJcbiAgICAgICAgICAgIHRoaXMucmVtb3ZlQWxsRGVCdWZmKCk7XHJcbiAgICAgICAgICAgIHRoaXMuc2hhZG93Lm9wYWNpdHk9MDtcclxuICAgICAgICAgICAgdGhpcy5ub2RlLm9wYWNpdHk9MDtcclxuICAgICAgICAgICAgbGV0IGRpZT1HYW1lRWZmZWN0c01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5jcmVhdGVHYW1lRWZmZWN0QnlJZChHYW1lRWZmZWN0SWQubW9uc3Rlcl9kaWUsc3VwZXIuZ2V0Q2VudGVyUG9zKCkpO1xyXG4gICAgICAgICAgICBkaWUuc2NhbGU9MC44O1xyXG4gICAgICAgICAgICBNb25zdGVyTWFuYWdlci5nZXRJbnN0YW5jZSgpLmRlc3Ryb3lNb25zdGVyKHRoaXMubm9kZSx0aGlzLm1vbnN0ZXJfdHlwZSxmYWxzZSk7XHJcbiAgICAgICAgfSkgICAgICAgIFxyXG4gICAgfVxyXG5cclxuICAgIGRlYXRoRmluaXNoKCl7XHJcbiAgICAgICAgdGhpcy5yZW1vdmVBbGxEZUJ1ZmYoKTtcclxuICAgICAgICAvL+eUn+aIkOWwj+WPsuiOseWnhiAgICAgICAgXHJcbiAgICAgICAgLy/ljYrlvoRcclxuICAgICAgICBsZXQgcG9zPXRoaXMuZ2V0Q2VudGVyUG9zKCk7XHJcbiAgICAgICAgbGV0IHJyPTIwMDtcclxuICAgICAgICBsZXQgb25jZVJhZGlhbj1NYXRoLlBJLzU7Ly825Liq5oCqXHJcbiAgICAgICAgZm9yKGxldCBpPTA7IGk8NjsgaSsrKXtcclxuICAgICAgICAgICAgbGV0IHh4PU1hdGguY29zKG9uY2VSYWRpYW4qaSkqcnIrcG9zLng7XHJcbiAgICAgICAgICAgIGxldCB5eT1NYXRoLnNpbihvbmNlUmFkaWFuKmkpKnJyK3Bvcy55O1xyXG4gICAgICAgICAgICAvL+Wwj+azoeazoVxyXG4gICAgICAgICAgICBsZXQgcGFvcGFvPUdhbWVFZmZlY3RzTWFuYWdlci5nZXRJbnN0YW5jZSgpLmNyZWF0ZUdhbWVFZmZlY3RCeUlkKEdhbWVFZmZlY3RJZC5tb25zdGVyNzBfc2lsYWltdV9xcSxwb3MpXHJcbiAgICAgICAgICAgIGxldCBlbmRQb3M9Y2MudjIoeHgseXkpXHJcbiAgICAgICAgICAgIGNjLnR3ZWVuKHBhb3BhbykudGhlbihjYy5qdW1wVG8oMC41LGVuZFBvcyx5eS1wb3MueSs1MCwxKSkuY2FsbCgoKT0+e1xyXG4gICAgICAgICAgICAgICAgTW9uc3Rlck1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5jcmVhdGVTdW1tb25Nb25zdGVyKDEwNDkxLHRoaXMubW9uc3Rlcl9sZXZlbCxlbmRQb3MpOyBcclxuICAgICAgICAgICAgICAgIEdhbWVFZmZlY3RzTWFuYWdlci5nZXRJbnN0YW5jZSgpLmRlc3Ryb3lHYW1lRWZmZWN0QnlJZChHYW1lRWZmZWN0SWQubW9uc3RlcjcwX3NpbGFpbXVfcXEscGFvcGFvKTtcclxuICAgICAgICAgICAgfSkuc3RhcnQoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLy8gdXBkYXRlIChkdCkge31cclxufVxyXG4iXX0=