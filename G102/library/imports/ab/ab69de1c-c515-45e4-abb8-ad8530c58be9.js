"use strict";
cc._RF.push(module, 'ab69d4cxRVF5Ku4rYUwxYvp', 'ShaDan');
// Scripts/Hero/Game/ANuBiSi/ShaDan.ts

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
var ShaDan = /** @class */ (function (_super) {
    __extends(ShaDan, _super);
    function ShaDan() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.hero_lvl = 0;
        return _this;
    }
    ShaDan.prototype.onLoad = function () {
        _super.prototype.onLoad.call(this);
        _super.prototype.addCollisionMonsterListen.call(this, this.onCollisionMonster);
    };
    ShaDan.prototype.onCollisionMonster = function (monsterTs) {
        //普通弹
        if (monsterTs) {
            var data = monsterTs.beFlashInjured(this.gongji_data);
            if (data.getDamageNum() > 0) {
                GameEffectsManager_1.GameEffectsManager.getInstance().createGameEffectById(GameEffectsManager_1.GameEffectId.a_nu_bi_si_attack_hit, this.node.getPosition());
                var rate = Math.random();
                if (rate < this.gongji_data.hero_data.getSkillValue1(HeroConfig_1.SkillType.Passive_1)) //
                 {
                    GameManager_1.default.getInstance().sound_manager.playSound(AudioConstants_1.SoundIndex.YX_ANBSAttack);
                    //判断锥形范围的敌人
                    var fanweiData = cc.instantiate(this.gongji_data);
                    fanweiData.damage_type = HeroConfig_1.DamageType.Skill;
                    fanweiData.is_bullet = false;
                    fanweiData.skill_damage_rate = this.gongji_data.hero_data.getSkillValue2(HeroConfig_1.SkillType.Passive_1);
                    var shanxing = GameEffectsManager_1.GameEffectsManager.getInstance().createGameEffectById(GameEffectsManager_1.GameEffectId.a_nu_bi_si_beidong_skill_1, this.node.getPosition());
                    shanxing.angle = this.node.angle;
                    //减速
                    var distance = 260;
                    var min = this.move_direction - Math.PI / 4; //45°+90
                    var max = min + Math.PI / 2; //135°
                    //cc.log(MyTool.radianToAngle(this.move_direction),MyTool.radianToAngle(min),MyTool.radianToAngle(max))
                    // FightingManager.getInstance().node.getComponent(cc.Graphics).arc(this.getAPos(-50).x,this.getAPos(-50).y,distance,min,max);
                    // FightingManager.getInstance().node.getComponent(cc.Graphics).stroke();
                    var allMonsters = MonsterManager_1.default.getInstance().getMonstersForRadian(-1, this.node.getPosition(), distance, min, max);
                    if (allMonsters) {
                        for (var i = 0; i < allMonsters.length; i++) {
                            var monsterTTs = allMonsters[i].getComponent(Monster_1.default);
                            var zuiData = monsterTTs.beFlashInjured(fanweiData);
                            ;
                            if (zuiData.getDamageNum() > 0) {
                                var buffData = new BuffData_1.BuffData();
                                buffData.buff_id = HeroConfig_1.BuffId.Hero_ANuBiSi_Skill1_JianSu;
                                buffData.buff_type = HeroConfig_1.BuffType.Slowdown;
                                buffData.buff_value = [0.3 + 0.1 * this.hero_lvl];
                                buffData.remain_time = 3;
                                monsterTTs.addDeBuff(buffData, fanweiData);
                            }
                        }
                    }
                }
            }
            this.destroySelf();
        }
    };
    ShaDan = __decorate([
        ccclass
    ], ShaDan);
    return ShaDan;
}(Bullect_1.default));
exports.default = ShaDan;

cc._RF.pop();