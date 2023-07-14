"use strict";
cc._RF.push(module, '8ffdet1NHZIX5Co/I71jvYH', 'ShieldAttack2');
// Scripts/Boss/Boss2/ShieldAttack2.ts

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
var MonsterData_1 = require("../../Monster/MonsterData");
var AudioConstants_1 = require("../../Sound/AudioConstants");
var MyTool_1 = require("../../Tools/MyTool");
var WallManager_1 = require("../../Wall/WallManager");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var ShieldAttack2 = /** @class */ (function (_super) {
    __extends(ShieldAttack2, _super);
    function ShieldAttack2() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.boss_pos = cc.v2(0, 0);
        return _this;
    }
    ShieldAttack2.prototype.setBossPos = function (pos) {
        this.boss_pos = pos;
    };
    /**帧动画回调 */
    ShieldAttack2.prototype.onShieldAttack = function () {
        var _this = this;
        var walls = WallManager_1.default.getInstance().getAllWall();
        walls.forEach(function (wall, wallType) {
            //攻击城墙的条件1，必须在城墙之上,2达到攻击距离
            if (wall.getWallMaxYY() < _this.boss_pos.y) {
                wall.beRealDamage(HeroConfig_1.DamageType.Skill, MonsterData_1.StrengthType.Boss, wall.getMaxHp() * 0.25);
            }
        });
        GameEffectsManager_1.GameEffectsManager.getInstance().createGameEffectById(GameEffectsManager_1.GameEffectId.boss2_normal_skill_hit, cc.v2(this.node.x, GameManager_1.default.getInstance().enemy_att_y));
        GameManager_1.default.getInstance().sound_manager.playSound(AudioConstants_1.SoundIndex.YX_Boss2Skill);
        //击晕所有英雄
        GameManager_1.default.getInstance().all_hero.forEach(function (v, k) {
            var buffData = new BuffData_1.BuffData();
            buffData.buff_id = HeroConfig_1.BuffId.Monster_XuanYun;
            buffData.game_effect_id = GameEffectsManager_1.GameEffectId.xuanyun;
            buffData.remain_time = 1;
            buffData.buff_type = HeroConfig_1.BuffType.Vertigo;
            v.addDeBuff(buffData);
        });
        MyTool_1.default.randomSceneShakeBig();
    };
    ShieldAttack2 = __decorate([
        ccclass
    ], ShieldAttack2);
    return ShieldAttack2;
}(cc.Component));
exports.default = ShieldAttack2;

cc._RF.pop();