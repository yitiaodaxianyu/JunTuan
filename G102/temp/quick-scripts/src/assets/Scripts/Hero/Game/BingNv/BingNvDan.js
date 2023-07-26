"use strict";
cc._RF.push(module, '12fe2PdcShKpJmdEhK12xIc', 'BingNvDan');
// Scripts/Hero/Game/BingNv/BingNvDan.ts

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
var BingNvDan = /** @class */ (function (_super) {
    __extends(BingNvDan, _super);
    function BingNvDan() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.bullect_type = 0;
        _this.hero_lvl = 0;
        return _this;
    }
    BingNvDan.prototype.onLoad = function () {
        _super.prototype.onLoad.call(this);
        _super.prototype.addCollisionMonsterListen.call(this, this.onCollisionMonster);
    };
    BingNvDan.prototype.start = function () {
        this.tuowei_space = 1;
    };
    BingNvDan.prototype.onCollisionMonster = function (monsterTs) {
        switch (this.bullect_type) {
            case 0:
                {
                    //普通弹
                    if (monsterTs) {
                        var data = monsterTs.beFlashInjured(this.gongji_data);
                        if (data.getDamageNum() > 0) {
                            GameEffectsManager_1.GameEffectsManager.getInstance().createGameEffectById(GameEffectsManager_1.GameEffectId.bing_nv_attack_hit, this.getHeadPos());
                        }
                        this.destroySelf();
                    }
                }
                break;
            case 1:
                {
                    //被动技能弹
                    if (monsterTs) {
                        var data = monsterTs.beFlashInjured(this.gongji_data);
                        if (data.getDamageNum() > 0) {
                            GameEffectsManager_1.GameEffectsManager.getInstance().createGameEffectById(GameEffectsManager_1.GameEffectId.bing_nv_beidong_skill_create, this.getHeadPos());
                            var buffData = new BuffData_1.BuffData();
                            buffData.buff_id = HeroConfig_1.BuffId.Hero_BingNv_Skill1_JianSu;
                            buffData.buff_type = HeroConfig_1.BuffType.Slowdown;
                            buffData.buff_value = [0.5];
                            buffData.remain_time = 3;
                            monsterTs.addDeBuff(buffData, this.gongji_data);
                            GameManager_1.default.getInstance().sound_manager.playSound(AudioConstants_1.SoundIndex.YX_BNAttack);
                            /**范围伤害，不包括这个怪 */
                            var monsters = MonsterManager_1.default.getInstance().getMonstersForCenterPos(-1, monsterTs.getCenterPos(), 200 + this.hero_lvl * 20);
                            if (monsters) {
                                var jiansuValue = this.gongji_data.hero_data.getSkillValue3(HeroConfig_1.SkillType.Passive_1);
                                for (var i = 0; i < monsters.length; i++) {
                                    var monsterTTs = monsters[i].getComponent(Monster_1.default);
                                    if (monsterTTs.uuid != monsterTs.uuid) {
                                        var data_1 = monsterTTs.beFlashInjured(this.gongji_data);
                                        if (data_1.getDamageNum() > 0) {
                                            GameEffectsManager_1.GameEffectsManager.getInstance().createGameEffectById(GameEffectsManager_1.GameEffectId.bing_nv_beidong_skill_hit, monsterTTs.getCenterPos());
                                            if (!data_1.is_die) {
                                                var buffData_1 = new BuffData_1.BuffData();
                                                buffData_1.buff_id = HeroConfig_1.BuffId.Hero_BingNv_Skill1_JianSu;
                                                buffData_1.buff_type = HeroConfig_1.BuffType.Slowdown;
                                                buffData_1.buff_value = [jiansuValue];
                                                buffData_1.remain_time = 3 + this.hero_lvl * 0.5;
                                                monsterTTs.addDeBuff(buffData_1, this.gongji_data);
                                            }
                                        }
                                    }
                                }
                            }
                        }
                        this.destroySelf();
                    }
                }
                break;
        }
    };
    __decorate([
        property()
    ], BingNvDan.prototype, "bullect_type", void 0);
    BingNvDan = __decorate([
        ccclass
    ], BingNvDan);
    return BingNvDan;
}(Bullect_1.default));
exports.default = BingNvDan;

cc._RF.pop();