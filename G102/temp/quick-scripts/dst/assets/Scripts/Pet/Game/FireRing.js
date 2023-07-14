
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Scripts/Pet/Game/FireRing.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '0c991/CGo5KlJpn6YK4GcQw', 'FireRing');
// Scripts/Pet/Game/FireRing.ts

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
var GongJi_1 = require("../../Hero/Game/GongJi");
var Monster_1 = require("../../Monster/Monster");
var MonsterManager_1 = require("../../Monster/MonsterManager");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var FireRing = /** @class */ (function (_super) {
    __extends(FireRing, _super);
    function FireRing() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        /**持续时间 */
        _this.remain_time = 0;
        /**伤害间隔 */
        _this.damage_jiange = 0;
        /**伤害计数 */
        _this.damage_jishu = 0;
        /**半径 */
        _this.radius = 0;
        _this.game_effect_id = 0;
        _this.is_destroy = false;
        return _this;
    }
    FireRing.prototype.init = function (gameEffectId, gjData, remainTime, radius, damageJiange) {
        this.initData(gjData);
        this.game_effect_id = gameEffectId;
        this.remain_time = remainTime;
        this.radius = radius;
        this.damage_jiange = damageJiange;
        this.is_destroy = false;
        this.damage_jishu = 0;
        this.checkDamage();
        //标准半径是100.
        this.node.scale = radius / 100;
    };
    FireRing.prototype.destroySelf = function () {
        if (this.is_destroy) {
            return;
        }
        this.is_destroy = true;
        GameEffectsManager_1.GameEffectsManager.getInstance().destroyGameEffectById(this.game_effect_id, this.node);
    };
    FireRing.prototype.checkDamage = function () {
        var monsters = MonsterManager_1.default.getInstance().getMonstersForCenterPos(-1, this.node.getPosition(), this.radius);
        if (monsters) {
            for (var i = 0; i < monsters.length; i++) {
                var monsterTs = monsters[i].getComponent(Monster_1.default);
                monsterTs.beFlashInjured(this.gongji_data);
            }
        }
    };
    FireRing.prototype.update = function (dt) {
        if (this.remain_time > 0) {
            this.remain_time -= dt;
            this.damage_jishu += dt;
            if (this.damage_jishu >= this.damage_jiange) {
                this.damage_jishu = 0;
                this.checkDamage();
            }
        }
        else {
            this.destroySelf();
        }
    };
    FireRing = __decorate([
        ccclass
    ], FireRing);
    return FireRing;
}(GongJi_1.default));
exports.default = FireRing;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0c1xcUGV0XFxHYW1lXFxGaXJlUmluZy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxvRUFBaUY7QUFFakYsaURBQTRDO0FBQzVDLGlEQUE0QztBQUM1QywrREFBMEQ7QUFHcEQsSUFBQSxLQUFzQixFQUFFLENBQUMsVUFBVSxFQUFsQyxPQUFPLGFBQUEsRUFBRSxRQUFRLGNBQWlCLENBQUM7QUFHMUM7SUFBc0MsNEJBQU07SUFBNUM7UUFBQSxxRUF3REM7UUF0REcsVUFBVTtRQUNWLGlCQUFXLEdBQVEsQ0FBQyxDQUFDO1FBQ3JCLFVBQVU7UUFDVixtQkFBYSxHQUFRLENBQUMsQ0FBQztRQUN2QixVQUFVO1FBQ1Ysa0JBQVksR0FBUSxDQUFDLENBQUM7UUFDdEIsUUFBUTtRQUNSLFlBQU0sR0FBUSxDQUFDLENBQUM7UUFDaEIsb0JBQWMsR0FBUSxDQUFDLENBQUM7UUFDeEIsZ0JBQVUsR0FBUyxLQUFLLENBQUM7O0lBNkM3QixDQUFDO0lBM0NHLHVCQUFJLEdBQUosVUFBSyxZQUF5QixFQUFDLE1BQWlCLEVBQUMsVUFBaUIsRUFBQyxNQUFhLEVBQUMsWUFBbUI7UUFDaEcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUN0QixJQUFJLENBQUMsY0FBYyxHQUFDLFlBQVksQ0FBQztRQUNqQyxJQUFJLENBQUMsV0FBVyxHQUFDLFVBQVUsQ0FBQztRQUM1QixJQUFJLENBQUMsTUFBTSxHQUFDLE1BQU0sQ0FBQztRQUNuQixJQUFJLENBQUMsYUFBYSxHQUFDLFlBQVksQ0FBQztRQUNoQyxJQUFJLENBQUMsVUFBVSxHQUFDLEtBQUssQ0FBQztRQUN0QixJQUFJLENBQUMsWUFBWSxHQUFDLENBQUMsQ0FBQztRQUNwQixJQUFJLENBQUMsV0FBVyxFQUFFLENBQUM7UUFDbkIsV0FBVztRQUNYLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxHQUFDLE1BQU0sR0FBQyxHQUFHLENBQUM7SUFDL0IsQ0FBQztJQUVELDhCQUFXLEdBQVg7UUFDSSxJQUFHLElBQUksQ0FBQyxVQUFVLEVBQUM7WUFDZixPQUFPO1NBQ1Y7UUFDRCxJQUFJLENBQUMsVUFBVSxHQUFDLElBQUksQ0FBQztRQUNyQix1Q0FBa0IsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxxQkFBcUIsQ0FBQyxJQUFJLENBQUMsY0FBYyxFQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUMxRixDQUFDO0lBRUQsOEJBQVcsR0FBWDtRQUNJLElBQUksUUFBUSxHQUFDLHdCQUFjLENBQUMsV0FBVyxFQUFFLENBQUMsdUJBQXVCLENBQUMsQ0FBQyxDQUFDLEVBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxXQUFXLEVBQUUsRUFBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDMUcsSUFBRyxRQUFRLEVBQUM7WUFDUixLQUFJLElBQUksQ0FBQyxHQUFDLENBQUMsRUFBRSxDQUFDLEdBQUMsUUFBUSxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBQztnQkFDaEMsSUFBSSxTQUFTLEdBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLFlBQVksQ0FBQyxpQkFBTyxDQUFDLENBQUM7Z0JBQ2hELFNBQVMsQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDO2FBQzlDO1NBQ0o7SUFDTCxDQUFDO0lBRUQseUJBQU0sR0FBTixVQUFRLEVBQVM7UUFDYixJQUFHLElBQUksQ0FBQyxXQUFXLEdBQUMsQ0FBQyxFQUFDO1lBQ2xCLElBQUksQ0FBQyxXQUFXLElBQUUsRUFBRSxDQUFDO1lBQ3JCLElBQUksQ0FBQyxZQUFZLElBQUUsRUFBRSxDQUFDO1lBQ3RCLElBQUcsSUFBSSxDQUFDLFlBQVksSUFBRSxJQUFJLENBQUMsYUFBYSxFQUFDO2dCQUNyQyxJQUFJLENBQUMsWUFBWSxHQUFDLENBQUMsQ0FBQztnQkFDcEIsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDO2FBQ3RCO1NBQ0o7YUFBSTtZQUNELElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQztTQUN0QjtJQUNMLENBQUM7SUF2RGdCLFFBQVE7UUFENUIsT0FBTztPQUNhLFFBQVEsQ0F3RDVCO0lBQUQsZUFBQztDQXhERCxBQXdEQyxDQXhEcUMsZ0JBQU0sR0F3RDNDO2tCQXhEb0IsUUFBUSIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEdhbWVFZmZlY3RJZCwgR2FtZUVmZmVjdHNNYW5hZ2VyIH0gZnJvbSBcIi4uLy4uL0dhbWUvR2FtZUVmZmVjdHNNYW5hZ2VyXCI7XHJcbmltcG9ydCB7IEdvbmdKaURhdGEgfSBmcm9tIFwiLi4vLi4vSGVyby9EYXRhL0hlcm9EYXRhXCI7XHJcbmltcG9ydCBHb25nSmkgZnJvbSBcIi4uLy4uL0hlcm8vR2FtZS9Hb25nSmlcIjtcclxuaW1wb3J0IE1vbnN0ZXIgZnJvbSBcIi4uLy4uL01vbnN0ZXIvTW9uc3RlclwiO1xyXG5pbXBvcnQgTW9uc3Rlck1hbmFnZXIgZnJvbSBcIi4uLy4uL01vbnN0ZXIvTW9uc3Rlck1hbmFnZXJcIjtcclxuXHJcblxyXG5jb25zdCB7Y2NjbGFzcywgcHJvcGVydHl9ID0gY2MuX2RlY29yYXRvcjtcclxuXHJcbkBjY2NsYXNzXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEZpcmVSaW5nIGV4dGVuZHMgR29uZ0ppIHtcclxuXHJcbiAgICAvKirmjIHnu63ml7bpl7QgKi9cclxuICAgIHJlbWFpbl90aW1lOm51bWJlcj0wO1xyXG4gICAgLyoq5Lyk5a6z6Ze06ZqUICovXHJcbiAgICBkYW1hZ2VfamlhbmdlOm51bWJlcj0wO1xyXG4gICAgLyoq5Lyk5a6z6K6h5pWwICovXHJcbiAgICBkYW1hZ2VfamlzaHU6bnVtYmVyPTA7XHJcbiAgICAvKirljYrlvoQgKi9cclxuICAgIHJhZGl1czpudW1iZXI9MDtcclxuICAgIGdhbWVfZWZmZWN0X2lkOm51bWJlcj0wO1xyXG4gICAgaXNfZGVzdHJveTpib29sZWFuPWZhbHNlO1xyXG4gICAgXHJcbiAgICBpbml0KGdhbWVFZmZlY3RJZDpHYW1lRWZmZWN0SWQsZ2pEYXRhOkdvbmdKaURhdGEscmVtYWluVGltZTpudW1iZXIscmFkaXVzOm51bWJlcixkYW1hZ2VKaWFuZ2U6bnVtYmVyKXtcclxuICAgICAgICB0aGlzLmluaXREYXRhKGdqRGF0YSk7XHJcbiAgICAgICAgdGhpcy5nYW1lX2VmZmVjdF9pZD1nYW1lRWZmZWN0SWQ7XHJcbiAgICAgICAgdGhpcy5yZW1haW5fdGltZT1yZW1haW5UaW1lO1xyXG4gICAgICAgIHRoaXMucmFkaXVzPXJhZGl1cztcclxuICAgICAgICB0aGlzLmRhbWFnZV9qaWFuZ2U9ZGFtYWdlSmlhbmdlO1xyXG4gICAgICAgIHRoaXMuaXNfZGVzdHJveT1mYWxzZTtcclxuICAgICAgICB0aGlzLmRhbWFnZV9qaXNodT0wO1xyXG4gICAgICAgIHRoaXMuY2hlY2tEYW1hZ2UoKTtcclxuICAgICAgICAvL+agh+WHhuWNiuW+hOaYrzEwMC5cclxuICAgICAgICB0aGlzLm5vZGUuc2NhbGU9cmFkaXVzLzEwMDtcclxuICAgIH1cclxuXHJcbiAgICBkZXN0cm95U2VsZigpe1xyXG4gICAgICAgIGlmKHRoaXMuaXNfZGVzdHJveSl7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5pc19kZXN0cm95PXRydWU7XHJcbiAgICAgICAgR2FtZUVmZmVjdHNNYW5hZ2VyLmdldEluc3RhbmNlKCkuZGVzdHJveUdhbWVFZmZlY3RCeUlkKHRoaXMuZ2FtZV9lZmZlY3RfaWQsdGhpcy5ub2RlKTtcclxuICAgIH1cclxuXHJcbiAgICBjaGVja0RhbWFnZSgpe1xyXG4gICAgICAgIGxldCBtb25zdGVycz1Nb25zdGVyTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldE1vbnN0ZXJzRm9yQ2VudGVyUG9zKC0xLHRoaXMubm9kZS5nZXRQb3NpdGlvbigpLHRoaXMucmFkaXVzKTtcclxuICAgICAgICBpZihtb25zdGVycyl7ICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIGZvcihsZXQgaT0wOyBpPG1vbnN0ZXJzLmxlbmd0aDsgaSsrKXtcclxuICAgICAgICAgICAgICAgIGxldCBtb25zdGVyVHM9bW9uc3RlcnNbaV0uZ2V0Q29tcG9uZW50KE1vbnN0ZXIpO1xyXG4gICAgICAgICAgICAgICAgbW9uc3RlclRzLmJlRmxhc2hJbmp1cmVkKHRoaXMuZ29uZ2ppX2RhdGEpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHVwZGF0ZSAoZHQ6bnVtYmVyKSB7XHJcbiAgICAgICAgaWYodGhpcy5yZW1haW5fdGltZT4wKXtcclxuICAgICAgICAgICAgdGhpcy5yZW1haW5fdGltZS09ZHQ7XHJcbiAgICAgICAgICAgIHRoaXMuZGFtYWdlX2ppc2h1Kz1kdDtcclxuICAgICAgICAgICAgaWYodGhpcy5kYW1hZ2VfamlzaHU+PXRoaXMuZGFtYWdlX2ppYW5nZSl7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmRhbWFnZV9qaXNodT0wO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jaGVja0RhbWFnZSgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgIHRoaXMuZGVzdHJveVNlbGYoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuIl19