"use strict";
cc._RF.push(module, '57dceyW/9VIiLUm7S4uFYZ5', 'FuTou');
// Scripts/Hero/Game/KuangZhanShi/FuTou.ts

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
var Bullect_1 = require("../Bullect");
var HeroConfig_1 = require("../HeroConfig");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var FuTou = /** @class */ (function (_super) {
    __extends(FuTou, _super);
    function FuTou() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        /**原来的增伤数值 */
        _this.kuangre_num = 0;
        _this.is_penetrate = false;
        _this.futou_type = 0;
        _this.real_damage_num = 0;
        _this.penetration_num = 0;
        _this.old_skill_rate = 0;
        return _this;
    }
    FuTou.prototype.onLoad = function () {
        _super.prototype.onLoad.call(this);
        _super.prototype.addCollisionMonsterListen.call(this, this.onCollisionMonster);
        _super.prototype.addInitFinishedListen.call(this, this.onInitFinished);
    };
    FuTou.prototype.onInitFinished = function () {
        this.node.angle = 0;
        this.node.stopAllActions();
        cc.tween(this.node).by(1, { angle: -1440 }).repeatForever().start();
        this.penetration_num = 0;
        this.old_skill_rate = this.gongji_data.skill_damage_rate;
    };
    FuTou.prototype.initFuTou = function (kuangreNum, isP, futouType) {
        this.kuangre_num = kuangreNum;
        this.is_penetrate = isP;
        this.futou_type = futouType;
        this.real_damage_num = this.gongji_data.hero_data.total_attack * this.gongji_data.hero_data.getSkillValue1(HeroConfig_1.SkillType.Passive_1) * this.kuangre_num;
    };
    ////--------------------------------------碰撞开始----------------------------------------------------
    FuTou.prototype.onCollisionMonster = function (monsterTs) {
        if (monsterTs) {
            switch (this.futou_type) {
                case 0:
                    {
                        var data = monsterTs.beFlashInjured(this.gongji_data);
                        if (data.getDamageNum() > 0) {
                            //额外真伤
                            if (data.is_die == false && this.kuangre_num > 0) {
                                monsterTs.beRealDamage(this.gongji_data, this.real_damage_num);
                            }
                            //本次攻击有效
                            GameEffectsManager_1.GameEffectsManager.getInstance().createGameEffectById(GameEffectsManager_1.GameEffectId.kuangzhanshi_attack_hit, this.getHeadPos());
                        }
                        this.is_att = true;
                        this.destroySelf();
                    }
                    break;
                case 1:
                    {
                        this.is_att = false;
                        //被动技能1的箭矢，可以穿透，并且首个目标伤害增加
                        if (this.penetration_num == 0) {
                            this.gongji_data.skill_damage_rate = 1;
                        }
                        else {
                            this.gongji_data.skill_damage_rate = this.old_skill_rate;
                        }
                        this.is_att = false;
                        this.penetration_num++;
                        var data = monsterTs.beFlashInjured(this.gongji_data);
                        if (data.getDamageNum() > 0) {
                            //额外真伤
                            if (data.is_die == false && this.kuangre_num > 0 && this.penetration_num == 0) {
                                monsterTs.beRealDamage(this.gongji_data, this.real_damage_num);
                            }
                            //本次攻击有效
                            GameEffectsManager_1.GameEffectsManager.getInstance().createGameEffectById(GameEffectsManager_1.GameEffectId.kuangzhanshi_attack_chuantou, this.getHeadPos());
                        }
                    }
                    break;
            }
        }
    };
    FuTou = __decorate([
        ccclass
    ], FuTou);
    return FuTou;
}(Bullect_1.default));
exports.default = FuTou;

cc._RF.pop();