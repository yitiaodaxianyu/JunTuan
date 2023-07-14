
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Scripts/Hero/Game/MeiMo/MeiDan.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '86d4dgUNK1MZ6HM3gRdyElJ', 'MeiDan');
// Scripts/Hero/Game/MeiMo/MeiDan.ts

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
var GameEffectsManager_1 = require("../../../Game/GameEffectsManager");
var Monster_1 = require("../../../Monster/Monster");
var MonsterManager_1 = require("../../../Monster/MonsterManager");
var Bullect_1 = require("../Bullect");
var HeroConfig_1 = require("../HeroConfig");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var MeiDan = /** @class */ (function (_super) {
    __extends(MeiDan, _super);
    function MeiDan() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.is_ex_damage = false;
        _this.hero = null;
        return _this;
    }
    MeiDan.prototype.onLoad = function () {
        _super.prototype.onLoad.call(this);
        _super.prototype.addCollisionMonsterListen.call(this, this.onCollisionMonster);
    };
    MeiDan.prototype.setIsExDamage = function (hero, isEx) {
        this.is_ex_damage = isEx;
        this.hero = hero;
    };
    MeiDan.prototype.onCollisionMonster = function (monsterTs) {
        //普通弹
        if (monsterTs) {
            if (monsterTs.isHaveDeBuff(HeroConfig_1.BuffId.Hero_MeiMo_Active_ZhengShang)) {
                this.gongji_data.hero_data.all_increase_damage += this.gongji_data.hero_data.getSkillValue4(HeroConfig_1.SkillType.Active);
            }
            this.gongji_data.is_can_crit = true;
            var data = monsterTs.beFlashInjured(this.gongji_data);
            this.gongji_data.is_can_crit = false;
            var isDie = data.is_die;
            if (data.getDamageNum() > 0) {
                GameEffectsManager_1.GameEffectsManager.getInstance().createGameEffectById(GameEffectsManager_1.GameEffectId.mei_mo_attack_hit, this.getHeadPos());
                //额外伤害
                if (isDie == false && this.is_ex_damage) {
                    //额外的技能伤害
                    var exGjData = cc.instantiate(this.gongji_data);
                    exGjData.damage_type = HeroConfig_1.DamageType.Skill;
                    exGjData.is_bullet = false;
                    exGjData.skill_damage_rate = this.gongji_data.hero_data.getSkillValue4(HeroConfig_1.SkillType.Passive_1);
                    var exData = monsterTs.beFlashInjured(this.gongji_data);
                    isDie = exData.is_die;
                }
                if (isDie == false) {
                    //被动二
                    if (this.hero.hero_data.getIsUnlock(HeroConfig_1.SkillType.Passive_2)) {
                        var rate = this.hero.hero_data.getSkillValue1(HeroConfig_1.SkillType.Passive_2);
                        if (Math.random() < rate) {
                            var damageRate = this.hero.hero_data.getSkillValue2(HeroConfig_1.SkillType.Passive_2);
                            var curHpRate = monsterTs.getCurHp() / monsterTs.getMaxHp();
                            if (curHpRate < 0.3) {
                                curHpRate = 0.3;
                            }
                            var remainRate = Math.floor((1 - curHpRate) * 100 / 10);
                            damageRate += remainRate;
                            var exData = monsterTs.beFlashInjured(this.hero.getGongJiData(HeroConfig_1.DamageType.Skill, false, HeroConfig_1.SkillType.Passive_2, damageRate));
                            isDie = exData.is_die;
                        }
                    }
                }
                if (isDie) {
                    //引爆
                    if (this.hero) {
                        this.hero.startBomb(monsterTs);
                    }
                }
                //专武判断
                if (monsterTs.isHaveDeBuff(HeroConfig_1.BuffId.Hero_MeiMo_Active_MeiHuo)) {
                    //范围伤害
                    var ex1 = this.gongji_data.hero_data.ExclusiveWeaponSkillValue_1;
                    if (ex1 && ex1 > 0) {
                        /**范围伤害，不包括这个怪 */
                        var monsters = MonsterManager_1.default.getInstance().getMonstersForCenterPos(-1, monsterTs.getCenterPos(), ex1);
                        if (monsters) {
                            for (var i = 0; i < monsters.length; i++) {
                                var monsterTTs = monsters[i].getComponent(Monster_1.default);
                                if (monsterTTs.uuid != monsterTs.uuid) {
                                    //伤害比值是多少，暂用本次伤害，是否享受魅惑增伤,                                
                                    // let bzGjData=cc.instantiate(this.gongji_data);
                                    // if(monsterTTs.isHaveDeBuff(BuffId.Hero_MeiMo_Active_ZhengShang)){
                                    //     bzGjData.hero_data.all_increase_damage+=zengshang;
                                    // }
                                    var data_1 = monsterTTs.beFlashInjured(this.gongji_data);
                                    if (data_1.getDamageNum() > 0) {
                                        GameEffectsManager_1.GameEffectsManager.getInstance().createGameEffectById(GameEffectsManager_1.GameEffectId.mei_mo_attack_hit, monsterTTs.getCenterPos());
                                    }
                                }
                            }
                        }
                    }
                }
            }
            this.destroySelf();
        }
    };
    MeiDan = __decorate([
        ccclass
    ], MeiDan);
    return MeiDan;
}(Bullect_1.default));
exports.default = MeiDan;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0c1xcSGVyb1xcR2FtZVxcTWVpTW9cXE1laURhbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSx1RUFBb0Y7QUFDcEYsb0RBQStDO0FBQy9DLGtFQUE2RDtBQUM3RCxzQ0FBaUM7QUFDakMsNENBQXdFO0FBR2xFLElBQUEsS0FBc0IsRUFBRSxDQUFDLFVBQVUsRUFBbEMsT0FBTyxhQUFBLEVBQUUsUUFBUSxjQUFpQixDQUFDO0FBRzFDO0lBQW9DLDBCQUFPO0lBQTNDO1FBQUEscUVBMkZDO1FBekZHLGtCQUFZLEdBQVMsS0FBSyxDQUFDO1FBQzNCLFVBQUksR0FBTyxJQUFJLENBQUM7O0lBd0ZwQixDQUFDO0lBdEZHLHVCQUFNLEdBQU47UUFDSSxpQkFBTSxNQUFNLFdBQUUsQ0FBQztRQUNmLGlCQUFNLHlCQUF5QixZQUFDLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDO0lBQzdELENBQUM7SUFFRCw4QkFBYSxHQUFiLFVBQWMsSUFBVSxFQUFDLElBQVk7UUFDakMsSUFBSSxDQUFDLFlBQVksR0FBQyxJQUFJLENBQUM7UUFDdkIsSUFBSSxDQUFDLElBQUksR0FBQyxJQUFJLENBQUM7SUFDbkIsQ0FBQztJQUVELG1DQUFrQixHQUFsQixVQUFtQixTQUFpQjtRQUNoQyxLQUFLO1FBQ0wsSUFBRyxTQUFTLEVBQUM7WUFDVCxJQUFHLFNBQVMsQ0FBQyxZQUFZLENBQUMsbUJBQU0sQ0FBQyw0QkFBNEIsQ0FBQyxFQUFDO2dCQUMzRCxJQUFJLENBQUMsV0FBVyxDQUFDLFNBQVMsQ0FBQyxtQkFBbUIsSUFBRSxJQUFJLENBQUMsV0FBVyxDQUFDLFNBQVMsQ0FBQyxjQUFjLENBQUMsc0JBQVMsQ0FBQyxNQUFNLENBQUMsQ0FBQzthQUMvRztZQUNELElBQUksQ0FBQyxXQUFXLENBQUMsV0FBVyxHQUFDLElBQUksQ0FBQztZQUNsQyxJQUFJLElBQUksR0FBQyxTQUFT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RWZmZWN0c01hbmFnZXIsIEdhbWVFZmZlY3RJZCB9IGZyb20gXCIuLi8uLi8uLi9HYW1lL0dhbWVFZmZlY3RzTWFuYWdlclwiO1xyXG5pbXBvcnQgTW9uc3RlciBmcm9tIFwiLi4vLi4vLi4vTW9uc3Rlci9Nb25zdGVyXCI7XHJcbmltcG9ydCBNb25zdGVyTWFuYWdlciBmcm9tIFwiLi4vLi4vLi4vTW9uc3Rlci9Nb25zdGVyTWFuYWdlclwiO1xyXG5pbXBvcnQgQnVsbGVjdCBmcm9tIFwiLi4vQnVsbGVjdFwiO1xyXG5pbXBvcnQgeyBCdWZmSWQsIEJ1ZmZUeXBlLCBEYW1hZ2VUeXBlLCBTa2lsbFR5cGUgfSBmcm9tIFwiLi4vSGVyb0NvbmZpZ1wiO1xyXG5pbXBvcnQgTWVpTW8gZnJvbSBcIi4vTWVpTW9cIjtcclxuXHJcbmNvbnN0IHtjY2NsYXNzLCBwcm9wZXJ0eX0gPSBjYy5fZGVjb3JhdG9yO1xyXG5cclxuQGNjY2xhc3NcclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTWVpRGFuIGV4dGVuZHMgQnVsbGVjdCB7XHJcblxyXG4gICAgaXNfZXhfZGFtYWdlOmJvb2xlYW49ZmFsc2U7XHJcbiAgICBoZXJvOk1laU1vPW51bGw7XHJcblxyXG4gICAgb25Mb2FkKCk6IHZvaWQge1xyXG4gICAgICAgIHN1cGVyLm9uTG9hZCgpO1xyXG4gICAgICAgIHN1cGVyLmFkZENvbGxpc2lvbk1vbnN0ZXJMaXN0ZW4odGhpcy5vbkNvbGxpc2lvbk1vbnN0ZXIpO1xyXG4gICAgfVxyXG5cclxuICAgIHNldElzRXhEYW1hZ2UoaGVybzpNZWlNbyxpc0V4OmJvb2xlYW4pe1xyXG4gICAgICAgIHRoaXMuaXNfZXhfZGFtYWdlPWlzRXg7XHJcbiAgICAgICAgdGhpcy5oZXJvPWhlcm87XHJcbiAgICB9XHJcblxyXG4gICAgb25Db2xsaXNpb25Nb25zdGVyKG1vbnN0ZXJUczpNb25zdGVyKSB7XHJcbiAgICAgICAgLy/mma7pgJrlvLlcclxuICAgICAgICBpZihtb25zdGVyVHMpe1xyXG4gICAgICAgICAgICBpZihtb25zdGVyVHMuaXNIYXZlRGVCdWZmKEJ1ZmZJZC5IZXJvX01laU1vX0FjdGl2ZV9aaGVuZ1NoYW5nKSl7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmdvbmdqaV9kYXRhLmhlcm9fZGF0YS5hbGxfaW5jcmVhc2VfZGFtYWdlKz10aGlzLmdvbmdqaV9kYXRhLmhlcm9fZGF0YS5nZXRTa2lsbFZhbHVlNChTa2lsbFR5cGUuQWN0aXZlKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLmdvbmdqaV9kYXRhLmlzX2Nhbl9jcml0PXRydWU7XHJcbiAgICAgICAgICAgIGxldCBkYXRhPW1vbnN0ZXJUcy5iZUZsYXNoSW5qdXJlZCh0aGlzLmdvbmdqaV9kYXRhKTtcclxuICAgICAgICAgICAgdGhpcy5nb25namlfZGF0YS5pc19jYW5fY3JpdD1mYWxzZTtcclxuICAgICAgICAgICAgbGV0IGlzRGllPWRhdGEuaXNfZGllO1xyXG4gICAgICAgICAgICBpZihkYXRhLmdldERhbWFnZU51bSgpPjApe1xyXG4gICAgICAgICAgICAgICAgR2FtZUVmZmVjdHNNYW5hZ2VyLmdldEluc3RhbmNlKCkuY3JlYXRlR2FtZUVmZmVjdEJ5SWQoR2FtZUVmZmVjdElkLm1laV9tb19hdHRhY2tfaGl0LHRoaXMuZ2V0SGVhZFBvcygpKTtcclxuICAgICAgICAgICAgICAgIC8v6aKd5aSW5Lyk5a6zXHJcbiAgICAgICAgICAgICAgICBpZihpc0RpZT09ZmFsc2UgJiYgdGhpcy5pc19leF9kYW1hZ2Upe1xyXG4gICAgICAgICAgICAgICAgICAgIC8v6aKd5aSW55qE5oqA6IO95Lyk5a6zXHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IGV4R2pEYXRhPWNjLmluc3RhbnRpYXRlKHRoaXMuZ29uZ2ppX2RhdGEpO1xyXG4gICAgICAgICAgICAgICAgICAgIGV4R2pEYXRhLmRhbWFnZV90eXBlPURhbWFnZVR5cGUuU2tpbGw7XHJcbiAgICAgICAgICAgICAgICAgICAgZXhHakRhdGEuaXNfYnVsbGV0PWZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgIGV4R2pEYXRhLnNraWxsX2RhbWFnZV9yYXRlPXRoaXMuZ29uZ2ppX2RhdGEuaGVyb19kYXRhLmdldFNraWxsVmFsdWU0KFNraWxsVHlwZS5QYXNzaXZlXzEpO1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBleERhdGE9bW9uc3RlclRzLmJlRmxhc2hJbmp1cmVkKHRoaXMuZ29uZ2ppX2RhdGEpO1xyXG4gICAgICAgICAgICAgICAgICAgIGlzRGllPWV4RGF0YS5pc19kaWU7XHJcbiAgICAgICAgICAgICAgICB9ICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgaWYoaXNEaWU9PWZhbHNlKXtcclxuICAgICAgICAgICAgICAgICAgICAvL+iiq+WKqOS6jFxyXG4gICAgICAgICAgICAgICAgICAgIGlmKHRoaXMuaGVyby5oZXJvX2RhdGEuZ2V0SXNVbmxvY2soU2tpbGxUeXBlLlBhc3NpdmVfMikpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgcmF0ZT10aGlzLmhlcm8uaGVyb19kYXRhLmdldFNraWxsVmFsdWUxKFNraWxsVHlwZS5QYXNzaXZlXzIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZihNYXRoLnJhbmRvbSgpPHJhdGUpeyAgICAgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGRhbWFnZVJhdGU9dGhpcy5oZXJvLmhlcm9fZGF0YS5nZXRTa2lsbFZhbHVlMihTa2lsbFR5cGUuUGFzc2l2ZV8yKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBjdXJIcFJhdGU9bW9uc3RlclRzLmdldEN1ckhwKCkvbW9uc3RlclRzLmdldE1heEhwKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZihjdXJIcFJhdGU8MC4zKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjdXJIcFJhdGU9MC4zO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHJlbWFpblJhdGU9TWF0aC5mbG9vcigoMS1jdXJIcFJhdGUpKjEwMC8xMCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkYW1hZ2VSYXRlKz1yZW1haW5SYXRlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGV4RGF0YT1tb25zdGVyVHMuYmVGbGFzaEluanVyZWQodGhpcy5oZXJvLmdldEdvbmdKaURhdGEoRGFtYWdlVHlwZS5Ta2lsbCxmYWxzZSxTa2lsbFR5cGUuUGFzc2l2ZV8yLGRhbWFnZVJhdGUpKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlzRGllPWV4RGF0YS5pc19kaWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpZihpc0RpZSl7XHJcbiAgICAgICAgICAgICAgICAgICAgLy/lvJXniIZcclxuICAgICAgICAgICAgICAgICAgIGlmKHRoaXMuaGVybyl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuaGVyby5zdGFydEJvbWIobW9uc3RlclRzKTtcclxuICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIC8v5LiT5q2m5Yik5patXHJcbiAgICAgICAgICAgICAgICBpZihtb25zdGVyVHMuaXNIYXZlRGVCdWZmKEJ1ZmZJZC5IZXJvX01laU1vX0FjdGl2ZV9NZWlIdW8pKXtcclxuICAgICAgICAgICAgICAgICAgICAvL+iMg+WbtOS8pOWus1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBleDE9dGhpcy5nb25namlfZGF0YS5oZXJvX2RhdGEuRXhjbHVzaXZlV2VhcG9uU2tpbGxWYWx1ZV8xO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmKGV4MSYmZXgxPjApe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvKirojIPlm7TkvKTlrrPvvIzkuI3ljIXmi6zov5nkuKrmgKogKi9cclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IG1vbnN0ZXJzPU1vbnN0ZXJNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0TW9uc3RlcnNGb3JDZW50ZXJQb3MoLTEsbW9uc3RlclRzLmdldENlbnRlclBvcygpLGV4MSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmKG1vbnN0ZXJzKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvcihsZXQgaT0wOyBpPG1vbnN0ZXJzLmxlbmd0aDsgaSsrKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgbW9uc3RlclRUcz1tb25zdGVyc1tpXS5nZXRDb21wb25lbnQoTW9uc3Rlcik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYobW9uc3RlclRUcy51dWlkIT1tb25zdGVyVHMudXVpZCl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8v5Lyk5a6z5q+U5YC85piv5aSa5bCR77yM5pqC55So5pys5qyh5Lyk5a6z77yM5piv5ZCm5Lqr5Y+X6a2F5oOR5aKe5LykLCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIGxldCBiekdqRGF0YT1jYy5pbnN0YW50aWF0ZSh0aGlzLmdvbmdqaV9kYXRhKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gaWYobW9uc3RlclRUcy5pc0hhdmVEZUJ1ZmYoQnVmZklkLkhlcm9fTWVpTW9fQWN0aXZlX1poZW5nU2hhbmcpKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgIGJ6R2pEYXRhLmhlcm9fZGF0YS5hbGxfaW5jcmVhc2VfZGFtYWdlKz16ZW5nc2hhbmc7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGRhdGE9bW9uc3RlclRUcy5iZUZsYXNoSW5qdXJlZCh0aGlzLmdvbmdqaV9kYXRhKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYoZGF0YS5nZXREYW1hZ2VOdW0oKT4wKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIEdhbWVFZmZlY3RzTWFuYWdlci5nZXRJbnN0YW5jZSgpLmNyZWF0ZUdhbWVFZmZlY3RCeUlkKEdhbWVFZmZlY3RJZC5tZWlfbW9fYXR0YWNrX2hpdCxtb25zdGVyVFRzLmdldENlbnRlclBvcygpKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLmRlc3Ryb3lTZWxmKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxufVxyXG4iXX0=