"use strict";
cc._RF.push(module, 'c1ff7vC+fRDjK+VyM1n42S+', 'ChangMao');
// Scripts/Hero/Game/ChangMaoShou/ChangMao.ts

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
var BuffData_1 = require("../BuffData");
var Bullect_1 = require("../Bullect");
var HeroConfig_1 = require("../HeroConfig");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var ChangMao = /** @class */ (function (_super) {
    __extends(ChangMao, _super);
    function ChangMao() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ChangMao.prototype.onLoad = function () {
        _super.prototype.onLoad.call(this);
        _super.prototype.addCollisionMonsterListen.call(this, this.onCollisionMonster);
    };
    ////--------------------------------------碰撞开始----------------------------------------------------
    ChangMao.prototype.onCollisionMonster = function (monsterTs) {
        if (monsterTs) {
            var data = monsterTs.beFlashInjured(this.gongji_data);
            if (data.getDamageNum() > 0) {
                if (data.is_die == false) {
                    var buffData = new BuffData_1.BuffData();
                    buffData.buff_id = HeroConfig_1.BuffId.Hero_ChangMaoShow_Skill;
                    buffData.remain_time = 60;
                    buffData.buff_type = HeroConfig_1.BuffType.Normal;
                    buffData.buff_value = [5];
                    buffData.game_effect_id = GameEffectsManager_1.GameEffectId.chang_mao_shou_skill_zhuazi;
                    buffData.add_floor = 1;
                    monsterTs.addDeBuff(buffData, this.gongji_data);
                    //判断有几层buff
                    var buffFloor = monsterTs.getDeBuff(HeroConfig_1.BuffId.Hero_ChangMaoShow_Skill);
                    var floorNum = 0;
                    if (buffFloor) {
                        floorNum = buffFloor.getFloorNum();
                        if (floorNum > 10) {
                            floorNum = 10;
                        }
                        /**额外真伤 */
                        var realData = cc.instantiate(this.gongji_data);
                        realData.damage_type = HeroConfig_1.DamageType.Skill;
                        var totalAttack = realData.hero_data.total_attack;
                        var realDamage = realData.hero_data.getSkillValue1(HeroConfig_1.SkillType.Passive_1) * totalAttack; //0.2*100==20
                        var exRealDamage = realData.hero_data.getSkillValue2(HeroConfig_1.SkillType.Passive_1) * floorNum * totalAttack; //0.05,5=0.25*100=25
                        var finalDamage = realDamage + exRealDamage; //20+25=45
                        if (finalDamage > 0) {
                            monsterTs.beRealDamage(realData, finalDamage);
                        }
                    }
                }
            }
            _super.prototype.destroySelf.call(this);
        }
    };
    ChangMao = __decorate([
        ccclass
    ], ChangMao);
    return ChangMao;
}(Bullect_1.default));
exports.default = ChangMao;

cc._RF.pop();