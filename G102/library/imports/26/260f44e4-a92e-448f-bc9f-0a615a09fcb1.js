"use strict";
cc._RF.push(module, '260f4TkqS5Ej7yfCmFaCfyx', 'ShouWangJianShi');
// Scripts/Hero/Game/ShouWang/ShouWangJianShi.ts

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
var ShouWangJianShi = /** @class */ (function (_super) {
    __extends(ShouWangJianShi, _super);
    function ShouWangJianShi() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.jianshi_type = HeroConfig_1.JianShi_Type.putong;
        /**穿透数量 */
        _this.penetration_num = 0;
        /**原来的增伤数值 */
        _this.old_skill_rate = 0;
        _this.hero_lvl = 0;
        return _this;
    }
    ShouWangJianShi.prototype.onLoad = function () {
        _super.prototype.onLoad.call(this);
        _super.prototype.addCollisionMonsterListen.call(this, this.onCollisionMonster);
        _super.prototype.addInitFinishedListen.call(this, this.onInitFinished);
    };
    ShouWangJianShi.prototype.onInitFinished = function () {
        this.penetration_num = 0;
        this.old_skill_rate = this.gongji_data.skill_damage_rate;
    };
    ////--------------------------------------碰撞开始----------------------------------------------------
    ShouWangJianShi.prototype.onCollisionMonster = function (monsterTs) {
        if (monsterTs) {
            switch (this.jianshi_type) {
                case HeroConfig_1.JianShi_Type.putong:
                    {
                        var data = monsterTs.beFlashInjured(this.gongji_data);
                        if (data.getDamageNum() > 0) {
                            //本次攻击有效
                            var node = GameEffectsManager_1.GameEffectsManager.getInstance().createGameEffectById(GameEffectsManager_1.GameEffectId.sheshou_jianshi_att_hit, this.getHeadPos());
                            //node.scale=monsterTs.getSheShouAttackScale();                            
                        }
                        this.is_att = true;
                        this.destroySelf();
                    }
                    break;
                case HeroConfig_1.JianShi_Type.jineng:
                    {
                        //被动技能1的箭矢，可以穿透，并且首个目标伤害增加
                        //游戏中自身等级个数决定穿透几个
                        if (this.penetration_num >= (3 + this.hero_lvl)) {
                            this.destroySelf();
                        }
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
                            //本次攻击有效
                            var node = GameEffectsManager_1.GameEffectsManager.getInstance().createGameEffectById(GameEffectsManager_1.GameEffectId.shou_wang_jianshi_skill1_hit, this.getHeadPos());
                            //node.scale=monsterTs.getSheShouAttackScale();
                        }
                    }
                    break;
            }
        }
    };
    __decorate([
        property({ type: cc.Enum(HeroConfig_1.JianShi_Type) })
    ], ShouWangJianShi.prototype, "jianshi_type", void 0);
    ShouWangJianShi = __decorate([
        ccclass
    ], ShouWangJianShi);
    return ShouWangJianShi;
}(Bullect_1.default));
exports.default = ShouWangJianShi;

cc._RF.pop();