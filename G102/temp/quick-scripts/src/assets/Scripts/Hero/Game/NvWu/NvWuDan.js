"use strict";
cc._RF.push(module, 'e1ef2wmDrZLXoRR2guepS7r', 'NvWuDan');
// Scripts/Hero/Game/NvWu/NvWuDan.ts

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
var GameManager_1 = require("../../../GameManager");
var Monster_1 = require("../../../Monster/Monster");
var MonsterManager_1 = require("../../../Monster/MonsterManager");
var AudioConstants_1 = require("../../../Sound/AudioConstants");
var BuffData_1 = require("../BuffData");
var Bullect_1 = require("../Bullect");
var HeroConfig_1 = require("../HeroConfig");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var NvWuDan = /** @class */ (function (_super) {
    __extends(NvWuDan, _super);
    function NvWuDan() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    NvWuDan.prototype.onLoad = function () {
        _super.prototype.onLoad.call(this);
        _super.prototype.addCollisionMonsterListen.call(this, this.onCollisionMonster);
    };
    NvWuDan.prototype.start = function () {
        this.tuowei_space = 1;
    };
    NvWuDan.prototype.onCollisionMonster = function (monsterTs) {
        //被动技能弹
        if (monsterTs) {
            var data = monsterTs.beFlashInjured(this.gongji_data);
            if (data.getDamageNum() > 0) {
                GameEffectsManager_1.GameEffectsManager.getInstance().createGameEffectById(GameEffectsManager_1.GameEffectId.nvwu_attack_bullect_hit, this.getHeadPos());
                GameManager_1.default.getInstance().sound_manager.playSound(AudioConstants_1.SoundIndex.YX_BNAttack);
                /**范围伤害，不包括这个怪 */
                var monsters = MonsterManager_1.default.getInstance().getMonstersForCenterPos(-1, monsterTs.getCenterPos(), this.gongji_data.hero_data.getSkillValue1(HeroConfig_1.SkillType.Passive_1));
                //let monsters=MonsterManager.getInstance().getMonstersForCenterPos(-1,monsterTs.getCenterPos(),260);
                if (monsters) {
                    //伤害系数
                    var damageData = cc.instantiate(this.gongji_data);
                    damageData.damage_type = HeroConfig_1.DamageType.Skill;
                    damageData.skill_damage_rate = this.gongji_data.hero_data.getSkillValue2(HeroConfig_1.SkillType.Passive_1);
                    //毒数据
                    var duData = cc.instantiate(this.gongji_data);
                    duData.damage_type = HeroConfig_1.DamageType.Skill;
                    duData.continuous_damage_rate = this.gongji_data.hero_data.getSkillValue3(HeroConfig_1.SkillType.Passive_1);
                    for (var i = 0; i < monsters.length; i++) {
                        var monsterTTs = monsters[i].getComponent(Monster_1.default);
                        //立即造成参数2伤害
                        var data_1 = monsterTTs.beFlashInjured(damageData);
                        if (data_1.getDamageNum() > 0) {
                            GameEffectsManager_1.GameEffectsManager.getInstance().createGameEffectById(GameEffectsManager_1.GameEffectId.nvwu_attack_bullect_hit, monsterTTs.getCenterPos());
                            if (!data_1.is_die) {
                                var buffData = new BuffData_1.BuffData();
                                buffData.buff_id = HeroConfig_1.BuffId.Hero_NvWu_Skill1_Zhongdu;
                                buffData.buff_type = HeroConfig_1.BuffType.Normal;
                                buffData.remain_time = 5;
                                buffData.add_floor = 1;
                                buffData.max_floor = 6;
                                buffData.damage_jiange_time = 1;
                                monsterTTs.addDeBuff(buffData, duData);
                            }
                        }
                    }
                }
            }
            this.destroySelf();
        }
    };
    NvWuDan = __decorate([
        ccclass
    ], NvWuDan);
    return NvWuDan;
}(Bullect_1.default));
exports.default = NvWuDan;

cc._RF.pop();