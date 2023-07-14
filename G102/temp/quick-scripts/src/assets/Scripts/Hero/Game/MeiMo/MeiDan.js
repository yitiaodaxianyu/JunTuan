"use strict";
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