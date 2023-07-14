"use strict";
cc._RF.push(module, 'a1902irTyJAkbJEJCEjGqGV', 'BossSkill8');
// Scripts/Boss/Boss8/BossSkill8.ts

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
var GameManager_1 = require("../../GameManager");
var BuffData_1 = require("../../Hero/Game/BuffData");
var HeroConfig_1 = require("../../Hero/Game/HeroConfig");
var MonsterBullet_1 = require("../../Monster/MonsterBullet");
var AudioConstants_1 = require("../../Sound/AudioConstants");
var WallConfig_1 = require("../../Wall/WallConfig");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var BossSkill8 = /** @class */ (function (_super) {
    __extends(BossSkill8, _super);
    function BossSkill8() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    BossSkill8.prototype.onLoad = function () {
        this.addCollisionWallListen(this.onCollisionWall);
    };
    ////--------------------------------------碰撞开始----------------------------------------------------
    BossSkill8.prototype.onCollisionWall = function (wall) {
        this.destroySelf();
        if (wall) {
            GameEffectsManager_1.GameEffectsManager.getInstance().createGameEffectById(GameEffectsManager_1.GameEffectId.boss8_skill_bullect_hit, this.node.getPosition());
            GameManager_1.default.getInstance().sound_manager.playSound(AudioConstants_1.SoundIndex.YX_Boss1Attack);
            //伤害黏液
            var damageBuffData_1 = new BuffData_1.BuffData();
            damageBuffData_1.buff_id = HeroConfig_1.BuffId.Boss8_Skill_2_shanghai;
            damageBuffData_1.remain_time = this.monster_att_data.monster_ts.skill_data.getSkillValue3(2);
            damageBuffData_1.buff_type = HeroConfig_1.BuffType.Normal;
            damageBuffData_1.damage_jiange_time = 1;
            damageBuffData_1.buff_value = [this.monster_att_data.monster_ts.skill_data.getSkillValue1(2)];
            wall.addDeBuff(damageBuffData_1, this.monster_att_data);
            if (wall.getWallType() == WallConfig_1.WallType.Main) {
                var attValue_1 = this.monster_att_data.monster_ts.skill_data.getSkillValue2(2);
                GameManager_1.default.getInstance().all_hero.forEach(function (v, k) {
                    //击晕所有英雄
                    var yunBuffData = new BuffData_1.BuffData();
                    yunBuffData.buff_id = HeroConfig_1.BuffId.Monster_XuanYun;
                    yunBuffData.game_effect_id = GameEffectsManager_1.GameEffectId.xuanyun;
                    yunBuffData.remain_time = 1;
                    yunBuffData.buff_type = HeroConfig_1.BuffType.Vertigo;
                    v.addDeBuff(yunBuffData);
                    //攻击力减少
                    var attBuffData = new BuffData_1.BuffData();
                    attBuffData.buff_id = HeroConfig_1.BuffId.Boss8_Skill_2_attack;
                    attBuffData.buff_value = [attValue_1];
                    attBuffData.remain_time = damageBuffData_1.remain_time;
                    attBuffData.buff_type = HeroConfig_1.BuffType.Normal;
                    v.addDeBuff(attBuffData);
                });
            }
            return true;
        }
    };
    BossSkill8 = __decorate([
        ccclass
    ], BossSkill8);
    return BossSkill8;
}(MonsterBullet_1.default));
exports.default = BossSkill8;

cc._RF.pop();