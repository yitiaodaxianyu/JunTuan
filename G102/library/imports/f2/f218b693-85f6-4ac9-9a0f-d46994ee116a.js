"use strict";
cc._RF.push(module, 'f218baThfZKyZoP1GmU7hFq', 'JianShi');
// Scripts/Hero/Game/SheShou/JianShi.ts

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
var MonsterData_1 = require("../../../Monster/MonsterData");
var MonsterManager_1 = require("../../../Monster/MonsterManager");
var Bullect_1 = require("../Bullect");
var HeroConfig_1 = require("../HeroConfig");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var JianShi = /** @class */ (function (_super) {
    __extends(JianShi, _super);
    function JianShi() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.jianshi_type = HeroConfig_1.JianShi_Type.putong;
        return _this;
    }
    JianShi.prototype.onLoad = function () {
        _super.prototype.onLoad.call(this);
        _super.prototype.addCollisionMonsterListen.call(this, this.onCollisionMonster);
    };
    ////--------------------------------------碰撞开始----------------------------------------------------
    JianShi.prototype.onCollisionMonster = function (monsterTs) {
        if (monsterTs) {
            switch (this.jianshi_type) {
                case HeroConfig_1.JianShi_Type.putong:
                    {
                        var data = monsterTs.beFlashInjured(this.gongji_data);
                        if (data.getDamageNum() > 0) {
                            //本次攻击有效                        
                            if (data.feedback_type == MonsterData_1.FeedBackType.BaoJi) {
                                if (this.gongji_data.hero_data.getIsUnlock(HeroConfig_1.SkillType.Passive_2)) {
                                    //判断锥形范围的敌人
                                    var fanweiData = cc.instantiate(this.gongji_data);
                                    fanweiData.damage_type = HeroConfig_1.DamageType.Skill;
                                    fanweiData.is_bullet = false;
                                    fanweiData.skill_damage_rate = this.gongji_data.hero_data.getSkillValue1(HeroConfig_1.SkillType.Passive_2);
                                    var shanxing = GameEffectsManager_1.GameEffectsManager.getInstance().createGameEffectById(GameEffectsManager_1.GameEffectId.sheshou_attack_ctrl_hit, this.node.getPosition());
                                    shanxing.angle = this.node.angle;
                                    //减速
                                    var distance = 220;
                                    var min = this.move_direction - Math.PI / 4; //45°+90
                                    var max = min + Math.PI / 2; //135°
                                    //cc.log(MyTool.radianToAngle(this.move_direction),MyTool.radianToAngle(min),MyTool.radianToAngle(max))
                                    var allMonsters = MonsterManager_1.default.getInstance().getMonstersForRadian(-1, this.node.getPosition(), distance, min, max);
                                    if (allMonsters) {
                                        for (var i = 0; i < allMonsters.length; i++) {
                                            var monsterTTs = allMonsters[i].getComponent(Monster_1.default);
                                            monsterTTs.beFlashInjured(fanweiData);
                                            ;
                                        }
                                    }
                                }
                                else {
                                    GameEffectsManager_1.GameEffectsManager.getInstance().createGameEffectById(GameEffectsManager_1.GameEffectId.sheshou_jianshi_att_hit, this.node.getPosition());
                                }
                            }
                            else {
                                GameEffectsManager_1.GameEffectsManager.getInstance().createGameEffectById(GameEffectsManager_1.GameEffectId.sheshou_jianshi_att_hit, this.node.getPosition());
                            }
                        }
                        this.is_att = true;
                        this.destroySelf();
                    }
                    break;
                case HeroConfig_1.JianShi_Type.jineng:
                    {
                        var data = monsterTs.beFlashInjured(this.gongji_data);
                        if (data.getDamageNum() > 0) {
                            //本次攻击有效
                            var node = GameEffectsManager_1.GameEffectsManager.getInstance().createGameEffectById(GameEffectsManager_1.GameEffectId.sheshou_jianshi_att_hit, this.getHeadPos());
                            //node.scale=monsterTs.getSheShouAttackScale();
                            this.is_att = true;
                            this.destroySelf();
                        }
                        else {
                            if (data.feedback_type != MonsterData_1.FeedBackType.Die)
                                this.destroySelf();
                        }
                    }
                    break;
                case HeroConfig_1.JianShi_Type.super:
                    {
                        var data = monsterTs.beFlashInjured(this.gongji_data);
                        if (data.getDamageNum() > 0) {
                        }
                    }
                    break;
            }
        }
    };
    __decorate([
        property({ type: cc.Enum(HeroConfig_1.JianShi_Type) })
    ], JianShi.prototype, "jianshi_type", void 0);
    JianShi = __decorate([
        ccclass
    ], JianShi);
    return JianShi;
}(Bullect_1.default));
exports.default = JianShi;

cc._RF.pop();