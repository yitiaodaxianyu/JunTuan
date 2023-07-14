
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Scripts/Boss/Boss2/ArmorWarrior.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'fd58bXUbTNOtaSHSUDXuwXv', 'ArmorWarrior');
// Scripts/Boss/Boss2/ArmorWarrior.ts

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
var Constants_1 = require("../../Constants");
var EnemyConfig_1 = require("../../Enemy/EnemyConfig");
var GameEffectsManager_1 = require("../../Game/GameEffectsManager");
var GroundManager_1 = require("../../Game/GroundManager");
var GameManager_1 = require("../../GameManager");
var BuffData_1 = require("../../Hero/Game/BuffData");
var HeroConfig_1 = require("../../Hero/Game/HeroConfig");
var MonsterData_1 = require("../../Monster/MonsterData");
var MonsterManager_1 = require("../../Monster/MonsterManager");
var AudioConstants_1 = require("../../Sound/AudioConstants");
var MyTool_1 = require("../../Tools/MyTool");
var Boss_1 = require("../Boss");
var BossAtt2_1 = require("./BossAtt2");
var BossShield2_1 = require("./BossShield2");
var ShieldAttack2_1 = require("./ShieldAttack2");
var Animation_Name;
(function (Animation_Name) {
    Animation_Name["Idle"] = "Idle";
    Animation_Name["attack1"] = "Attack";
    Animation_Name["run"] = "Run";
    Animation_Name["hurt1"] = "Hurt";
    Animation_Name["skill1_1"] = "Skill1_1";
    Animation_Name["skill1_2"] = "Skill1_2";
    Animation_Name["skill1_3"] = "Skill1_3";
    Animation_Name["skill2_1"] = "Skill2_1";
    Animation_Name["skill2_2"] = "Skill2_2";
    Animation_Name["skill2_3"] = "Skill2_3";
    Animation_Name["dead"] = "Dead";
})(Animation_Name || (Animation_Name = {}));
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var ArmorWarrior = /** @class */ (function (_super) {
    __extends(ArmorWarrior, _super);
    function ArmorWarrior() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.prefab_shield = null;
        _this.prefab_ground = null;
        _this.boss_shield = null;
        _this.skill_use_num = 0;
        _this.skill_waiting = false;
        _this.skill_cd = 0;
        return _this;
    }
    ArmorWarrior.prototype.onLoad = function () {
        _super.prototype.onLoad.call(this);
        GameEffectsManager_1.GameEffectsManager.getInstance().addEffectPoolById(GameEffectsManager_1.GameEffectId.xuanyun, 2);
        GameEffectsManager_1.GameEffectsManager.getInstance().addEffectPoolById(GameEffectsManager_1.GameEffectId.boss2_normal_att, 1);
        GameEffectsManager_1.GameEffectsManager.getInstance().addEffectPoolById(GameEffectsManager_1.GameEffectId.boss2_normal_att_hit1, 1);
        GameEffectsManager_1.GameEffectsManager.getInstance().addEffectPoolById(GameEffectsManager_1.GameEffectId.boss2_normal_skill, 1);
        GameEffectsManager_1.GameEffectsManager.getInstance().addEffectPoolById(GameEffectsManager_1.GameEffectId.boss2_normal_skill_hit, 1);
        this.addDeathCallback(this.onDeath);
        this.addXuanYunListen(this.onXuanYunResult);
        this.addBossInitedListen(this.onBossInited);
        this.addChangeBossHpListen(this.onChangeHp);
    };
    ArmorWarrior.prototype.onBossInited = function () {
        this.startIdle();
        this.node.y = 222;
        this.skill_cd = this.skill_data.getSkillColdDown(1);
        this.skill_jishu = this.skill_cd - this.skill_data.getSkillInitColdDown(1);
    };
    ArmorWarrior.prototype.onChangeHp = function (num) {
        if (num < 0) {
            if (this.boss_shield) {
                this.boss_shield.changeShieldValue(num);
            }
        }
    };
    ArmorWarrior.prototype.startIdle = function () {
        _super.prototype.setEnemyState.call(this, EnemyConfig_1.Enemy_State.standby);
        _super.prototype.playSpinAnimaton.call(this, Animation_Name.Idle, true);
    };
    ArmorWarrior.prototype.startAttack = function () {
        var _this = this;
        this.att_jishu = 0;
        _super.prototype.setEnemyState.call(this, EnemyConfig_1.Enemy_State.att);
        var data = new MonsterData_1.KeyFrameData();
        data.name = 'Attack';
        data.callback = function () {
            _this.att_jishu = 0;
            GameManager_1.default.getInstance().sound_manager.playSound(AudioConstants_1.SoundIndex.YX_Boss2Attack);
            var node = GameEffectsManager_1.GameEffectsManager.getInstance().createGameEffectById(GameEffectsManager_1.GameEffectId.boss2_normal_att, _super.prototype.getAttPos.call(_this));
            node.getComponent(BossAtt2_1.default).init(_super.prototype.getAttData.call(_this, HeroConfig_1.DamageType.Normal, true), GameEffectsManager_1.GameEffectId.boss2_normal_att, 1200, Math.PI * 3 / 2, _this.node.y, 270);
        };
        _super.prototype.playSpinAnimaton.call(this, (Animation_Name.attack1), false, data, function () {
            if (_this.skill_waiting == true) {
                _super.prototype.setEnemyState.call(_this, EnemyConfig_1.Enemy_State.skill);
                _this.startSkill();
            }
            else {
                _this.startIdle();
            }
        });
    };
    ArmorWarrior.prototype.startSkill = function () {
        var _this = this;
        this.skill_jishu = 0;
        if (_super.prototype.getEnemyState.call(this) != EnemyConfig_1.Enemy_State.att) {
            if (!_super.prototype.isHaveDeBuff.call(this, HeroConfig_1.BuffId.Hero_XuanYun)) {
                this.skill_waiting = false;
                _super.prototype.setEnemyState.call(this, EnemyConfig_1.Enemy_State.skill);
                this.skill_jishu = 0;
                /**释放技能，无法被打断 */
                this.cur_toughness += 1;
                _super.prototype.playSpinAnimaton.call(this, (Animation_Name.skill1_1), false, null, function () {
                    _super.prototype.playSpinAnimaton.call(_this, (Animation_Name.skill1_2), true);
                    /**添加地表 */
                    var ground = cc.instantiate(_this.prefab_ground);
                    GroundManager_1.default.getInstance().node.addChild(ground);
                    ground.x = _this.node.x;
                    ground.y = _this.getCenterPos().y;
                    _this.skill_use_num++;
                    /**添加专用的护盾 */
                    var node = cc.instantiate(_this.prefab_shield);
                    _this.boss_shield = node.getComponent(BossShield2_1.default);
                    _this.boss_shield.init(_this.skill_use_num, HeroConfig_1.ShieldType.Skill, 8, _super.prototype.getMaxHp.call(_this) * _this.skill_data.getSkillValue1(1), ground, _this.onShieldDestory.bind(_this));
                    var buffData = new BuffData_1.BuffData();
                    buffData.buff_id = HeroConfig_1.BuffId.Boss2_MianYi_Attack;
                    buffData.remain_time = 8;
                    GameEffectsManager_1.GameEffectsManager.getInstance().node.addChild(node);
                    node.setPosition(cc.v2(-8, _this.node.y + 64 * _this.setup_scale));
                    _super.prototype.addBuff.call(_this, buffData);
                });
            }
            else {
                this.skill_waiting = true;
            }
        }
        else {
            this.skill_waiting = true;
        }
    };
    /**护盾销毁时回调，isAuto：是否自爆(时间结束) */
    ArmorWarrior.prototype.onShieldDestory = function (isAuto) {
        this.boss_shield = null;
        this.skill_jishu = 0;
        if (isAuto) {
            //如果不是自爆，反击
            this.startShieldAttack();
        }
        else {
            this.cur_toughness -= 1;
            var buffData = new BuffData_1.BuffData();
            buffData.buff_id = HeroConfig_1.BuffId.Hero_XuanYun;
            buffData.game_effect_id = GameEffectsManager_1.GameEffectId.xuanyun;
            buffData.remain_time = 3;
            buffData.buff_type = HeroConfig_1.BuffType.Vertigo;
            _super.prototype.addDeBuff.call(this, buffData, null);
            _super.prototype.subBuff.call(this, HeroConfig_1.BuffId.Boss2_MianYi_Attack);
            _super.prototype.changeHp.call(this, -this.getMaxHp() * 0.25);
            MyTool_1.default.randomSceneShake(-16, 16, 0.02, 10);
            //this.startIdle();
        }
    };
    ArmorWarrior.prototype.startShieldAttack = function () {
        var _this = this;
        var data = new MonsterData_1.KeyFrameData();
        data.callback = function () {
            _this.cur_toughness -= 1;
            _super.prototype.subBuff.call(_this, HeroConfig_1.BuffId.Boss2_MianYi_Attack);
            GameManager_1.default.getInstance().sound_manager.playSound(AudioConstants_1.SoundIndex.YX_BossAttackGuodu);
            var node = GameEffectsManager_1.GameEffectsManager.getInstance().createGameEffectById(GameEffectsManager_1.GameEffectId.boss2_normal_skill, _this.node.getPosition());
            node.getComponent(ShieldAttack2_1.default).setBossPos(_this.node.getPosition());
        };
        data.name = 'Skill';
        _super.prototype.playSpinAnimaton.call(this, (Animation_Name.skill1_3), false, data, function () {
            _this.startIdle();
        });
    };
    ArmorWarrior.prototype.onDeath = function () {
        var _this = this;
        this.unscheduleAllCallbacks();
        _super.prototype.playDeadAnimaton.call(this, Animation_Name.dead, function () {
            _this.removeAllDeBuff();
            _this.removeAllBuff();
            if (_this.shadow) {
                cc.tween(_this.shadow).to(0.75, { opacity: 0 }).start();
            }
            cc.tween(_this.node).to(0.75, { opacity: 0 }).call(function () {
                _this.removeAllDeBuff();
                _this.removeAllBuff();
                MonsterManager_1.default.getInstance().destroyMonster(_this.node, _this.monster_type);
            }).start();
        });
        //GameManager.getInstance().sound_manager.playSound(SoundIndex.rewardBox2);
        //删除
        if (this.boss_shield) {
            this.boss_shield.destoryShield();
        }
    };
    ArmorWarrior.prototype.onXuanYunResult = function (isXuanYun) {
        if (isXuanYun) {
            this.startXuanYun();
        }
        else {
            if (!_super.prototype.isHaveDeBuffType.call(this, HeroConfig_1.BuffType.Vertigo)) {
                if (!_super.prototype.getIsDie.call(this)) {
                    if (this.skill_waiting == true) {
                        _super.prototype.setEnemyState.call(this, EnemyConfig_1.Enemy_State.skill);
                        this.startSkill();
                    }
                    else {
                        this.startIdle();
                    }
                }
            }
        }
    };
    ArmorWarrior.prototype.startXuanYun = function () {
        var _this = this;
        this.skill_waiting = false;
        _super.prototype.playSpinAnimaton.call(this, Animation_Name.hurt1, false, null, function () {
            if (_super.prototype.isHaveDeBuffType.call(_this, HeroConfig_1.BuffType.Vertigo) && !_super.prototype.getIsDie.call(_this))
                _this.spine.paused = true;
        });
    };
    ArmorWarrior.prototype.update = function (dt) {
        if ((GameManager_1.default.getInstance().cur_game_state != Constants_1.GameState.Game_Playing) || this.getIsDie()) {
            return;
        }
        _super.prototype.update.call(this, dt);
        this.checkSkill(dt);
        if (this.getEnemyState() != EnemyConfig_1.Enemy_State.skill) {
            if (!this.isHaveDeBuff(HeroConfig_1.BuffId.Hero_XuanYun)) {
                this.checkAtt(dt);
            }
        }
    };
    /**技能检测 */
    ArmorWarrior.prototype.checkSkill = function (dt) {
        this.skill_jishu += dt;
        if (!this.isHaveDeBuff(HeroConfig_1.BuffId.Hero_XuanYun)) {
            if (this.skill_jishu >= this.skill_cd) {
                this.skill_jishu = this.skill_cd;
                this.startSkill();
            }
        }
    };
    /**攻击计算 */
    ArmorWarrior.prototype.checkAtt = function (dt) {
        this.att_jishu += dt;
        if (this.att_jishu >= this.att_jiange) {
            this.att_jishu = this.att_jiange;
            this.startAttack();
        }
        else {
            //this.moving(dt);
        }
    };
    __decorate([
        property(cc.Prefab)
    ], ArmorWarrior.prototype, "prefab_shield", void 0);
    __decorate([
        property(cc.Prefab)
    ], ArmorWarrior.prototype, "prefab_ground", void 0);
    ArmorWarrior = __decorate([
        ccclass
    ], ArmorWarrior);
    return ArmorWarrior;
}(Boss_1.default));
exports.default = ArmorWarrior;

cc._RF.pop();
                    }
                    if (nodeEnv) {
                        __define(__module.exports, __require, __module);
                    }
                    else {
                        __quick_compile_project__.registerModuleFunc(__filename, function () {
                            __define(__module.exports, __require, __module);
                        });
                    }
                })();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0c1xcQm9zc1xcQm9zczJcXEFybW9yV2Fycmlvci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFDQSw2Q0FBNEM7QUFDNUMsdURBQXNEO0FBQ3RELG9FQUFpRjtBQUNqRiwwREFBcUQ7QUFDckQsaURBQTRDO0FBQzVDLHFEQUFvRDtBQUNwRCx5REFBc0Y7QUFDdEYseURBQXVFO0FBQ3ZFLCtEQUEwRDtBQUMxRCw2REFBd0Q7QUFDeEQsNkNBQXdDO0FBQ3hDLGdDQUEyQjtBQUMzQix1Q0FBa0M7QUFDbEMsNkNBQXdDO0FBQ3hDLGlEQUE0QztBQUU1QyxJQUFLLGNBYUo7QUFiRCxXQUFLLGNBQWM7SUFFZiwrQkFBYSxDQUFBO0lBQ2Isb0NBQWtCLENBQUE7SUFDbEIsNkJBQVcsQ0FBQTtJQUNYLGdDQUFjLENBQUE7SUFDZCx1Q0FBcUIsQ0FBQTtJQUNyQix1Q0FBcUIsQ0FBQTtJQUNyQix1Q0FBcUIsQ0FBQTtJQUNyQix1Q0FBcUIsQ0FBQTtJQUNyQix1Q0FBcUIsQ0FBQTtJQUNyQix1Q0FBcUIsQ0FBQTtJQUNyQiwrQkFBWSxDQUFBO0FBQ2hCLENBQUMsRUFiSSxjQUFjLEtBQWQsY0FBYyxRQWFsQjtBQUVLLElBQUEsS0FBc0IsRUFBRSxDQUFDLFVBQVUsRUFBbEMsT0FBTyxhQUFBLEVBQUUsUUFBUSxjQUFpQixDQUFDO0FBRzFDO0lBQTBDLGdDQUFJO0lBQTlDO1FBQUEscUVBa09DO1FBL05HLG1CQUFhLEdBQVcsSUFBSSxDQUFDO1FBRzdCLG1CQUFhLEdBQVcsSUFBSSxDQUFDO1FBRTdCLGlCQUFXLEdBQWEsSUFBSSxDQUFDO1FBRTdCLG1CQUFhLEdBQVEsQ0FBQyxDQUFDO1FBRXZCLG1CQUFhLEdBQVMsS0FBSyxDQUFDO1FBQzVCLGNBQVEsR0FBUSxDQUFDLENBQUM7O0lBcU50QixDQUFDO0lBbk5HLDZCQUFNLEdBQU47UUFDSSxpQkFBTSxNQUFNLFdBQUUs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SUFBSSxDQUFDLFdBQVcsR0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDO2dCQUMvQixJQUFJLENBQUMsVUFBVSxFQUFFLENBQUM7YUFDckI7U0FDSjtJQUNMLENBQUM7SUFFRCxVQUFVO0lBQ1YsK0JBQVEsR0FBUixVQUFTLEVBQVM7UUFDZCxJQUFJLENBQUMsU0FBUyxJQUFFLEVBQUUsQ0FBQztRQUNuQixJQUFHLElBQUksQ0FBQyxTQUFTLElBQUUsSUFBSSxDQUFDLFVBQVUsRUFBQztZQUMvQixJQUFJLENBQUMsU0FBUyxHQUFDLElBQUksQ0FBQyxVQUFVLENBQUM7WUFDL0IsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDO1NBQ3RCO2FBQUk7WUFDRCxrQkFBa0I7U0FDckI7SUFDTCxDQUFDO0lBOU5EO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUM7dURBQ1M7SUFHN0I7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBQzt1REFDUztJQU5aLFlBQVk7UUFEaEMsT0FBTztPQUNhLFlBQVksQ0FrT2hDO0lBQUQsbUJBQUM7Q0FsT0QsQUFrT0MsQ0FsT3lDLGNBQUksR0FrTzdDO2tCQWxPb0IsWUFBWSIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbIlxyXG5pbXBvcnQgeyBHYW1lU3RhdGUgfSBmcm9tIFwiLi4vLi4vQ29uc3RhbnRzXCI7XHJcbmltcG9ydCB7IEVuZW15X1N0YXRlIH0gZnJvbSBcIi4uLy4uL0VuZW15L0VuZW15Q29uZmlnXCI7XHJcbmltcG9ydCB7IEdhbWVFZmZlY3RJZCwgR2FtZUVmZmVjdHNNYW5hZ2VyIH0gZnJvbSBcIi4uLy4uL0dhbWUvR2FtZUVmZmVjdHNNYW5hZ2VyXCI7XHJcbmltcG9ydCBHcm91bmRNYW5hZ2VyIGZyb20gXCIuLi8uLi9HYW1lL0dyb3VuZE1hbmFnZXJcIjtcclxuaW1wb3J0IEdhbWVNYW5hZ2VyIGZyb20gXCIuLi8uLi9HYW1lTWFuYWdlclwiO1xyXG5pbXBvcnQgeyBCdWZmRGF0YSB9IGZyb20gXCIuLi8uLi9IZXJvL0dhbWUvQnVmZkRhdGFcIjtcclxuaW1wb3J0IHsgQnVmZklkLCBCdWZmVHlwZSwgRGFtYWdlVHlwZSwgU2hpZWxkVHlwZSB9IGZyb20gXCIuLi8uLi9IZXJvL0dhbWUvSGVyb0NvbmZpZ1wiO1xyXG5pbXBvcnQgeyBLZXlGcmFtZURhdGEsIFN0cmVuZ3RoVHlwZSB9IGZyb20gXCIuLi8uLi9Nb25zdGVyL01vbnN0ZXJEYXRhXCI7XHJcbmltcG9ydCBNb25zdGVyTWFuYWdlciBmcm9tIFwiLi4vLi4vTW9uc3Rlci9Nb25zdGVyTWFuYWdlclwiO1xyXG5pbXBvcnQgeyBTb3VuZEluZGV4IH0gZnJvbSBcIi4uLy4uL1NvdW5kL0F1ZGlvQ29uc3RhbnRzXCI7XHJcbmltcG9ydCBNeVRvb2wgZnJvbSBcIi4uLy4uL1Rvb2xzL015VG9vbFwiO1xyXG5pbXBvcnQgQm9zcyBmcm9tIFwiLi4vQm9zc1wiO1xyXG5pbXBvcnQgQm9zc0F0dDIgZnJvbSBcIi4vQm9zc0F0dDJcIjtcclxuaW1wb3J0IEJvc3NTaGllbGQyIGZyb20gXCIuL0Jvc3NTaGllbGQyXCI7XHJcbmltcG9ydCBTaGllbGRBdHRhY2syIGZyb20gXCIuL1NoaWVsZEF0dGFjazJcIjtcclxuXHJcbmVudW0gQW5pbWF0aW9uX05hbWVcclxue1xyXG4gICAgSWRsZSA9IFwiSWRsZVwiLCAgICAgICAvLy0tIOato+mdouW+heaculxyXG4gICAgYXR0YWNrMSA9IFwiQXR0YWNrXCIsICAgICAgICAgIC8vLS0g5pS75Ye7MVxyXG4gICAgcnVuID0gXCJSdW5cIiwgICAgICAgICAgICAgICAgLy8tLSDot5Hot69cclxuICAgIGh1cnQxID0gXCJIdXJ0XCIsICAgICAgICAgIC8vLS0g5Y+X5Ye7MVxyXG4gICAgc2tpbGwxXzEgPSBcIlNraWxsMV8xXCIsICAgICAgICAgIC8vLS0g5oqA6IO9MeWKqOS9nDFcclxuICAgIHNraWxsMV8yID0gXCJTa2lsbDFfMlwiLCAgICAgICAgICAvLy0tIOaKgOiDvTHliqjkvZwyXHJcbiAgICBza2lsbDFfMyA9IFwiU2tpbGwxXzNcIiwgICAgICAgICAgLy8tLSDmioDog70x5Yqo5L2cMlxyXG4gICAgc2tpbGwyXzEgPSBcIlNraWxsMl8xXCIsICAgICAgICAgIC8vLS0g5oqA6IO9MuWKqOS9nDFcclxuICAgIHNraWxsMl8yID0gXCJTa2lsbDJfMlwiLCAgICAgICAgICAvLy0tIOaKgOiDvTLliqjkvZwyXHJcbiAgICBza2lsbDJfMyA9IFwiU2tpbGwyXzNcIiwgICAgICAgICAgLy8tLSDmioDog70y5Yqo5L2cMlxyXG4gICAgZGVhZD0gXCJEZWFkXCIsICAgLy/mrbvkuqFcclxufVxyXG5cclxuY29uc3Qge2NjY2xhc3MsIHByb3BlcnR5fSA9IGNjLl9kZWNvcmF0b3I7XHJcblxyXG5AY2NjbGFzc1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBBcm1vcldhcnJpb3IgZXh0ZW5kcyBCb3NzIHtcclxuXHJcbiAgICBAcHJvcGVydHkoY2MuUHJlZmFiKVxyXG4gICAgcHJlZmFiX3NoaWVsZDpjYy5QcmVmYWI9bnVsbDtcclxuXHJcbiAgICBAcHJvcGVydHkoY2MuUHJlZmFiKVxyXG4gICAgcHJlZmFiX2dyb3VuZDpjYy5QcmVmYWI9bnVsbDtcclxuXHJcbiAgICBib3NzX3NoaWVsZDpCb3NzU2hpZWxkMj1udWxsOyAgICBcclxuICAgIFxyXG4gICAgc2tpbGxfdXNlX251bTpudW1iZXI9MDtcclxuXHJcbiAgICBza2lsbF93YWl0aW5nOmJvb2xlYW49ZmFsc2U7XHJcbiAgICBza2lsbF9jZDpudW1iZXI9MDtcclxuXHJcbiAgICBvbkxvYWQoKTogdm9pZCB7XHJcbiAgICAgICAgc3VwZXIub25Mb2FkKCk7XHJcbiAgICAgICAgR2FtZUVmZmVjdHNNYW5hZ2VyLmdldEluc3RhbmNlKCkuYWRkRWZmZWN0UG9vbEJ5SWQoR2FtZUVmZmVjdElkLnh1YW55dW4sMik7XHJcbiAgICAgICAgR2FtZUVmZmVjdHNNYW5hZ2VyLmdldEluc3RhbmNlKCkuYWRkRWZmZWN0UG9vbEJ5SWQoR2FtZUVmZmVjdElkLmJvc3MyX25vcm1hbF9hdHQsMSk7XHJcbiAgICAgICAgR2FtZUVmZmVjdHNNYW5hZ2VyLmdldEluc3RhbmNlKCkuYWRkRWZmZWN0UG9vbEJ5SWQoR2FtZUVmZmVjdElkLmJvc3MyX25vcm1hbF9hdHRfaGl0MSwxKTtcclxuICAgICAgICBHYW1lRWZmZWN0c01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5hZGRFZmZlY3RQb29sQnlJZChHYW1lRWZmZWN0SWQuYm9zczJfbm9ybWFsX3NraWxsLDEpO1xyXG4gICAgICAgIEdhbWVFZmZlY3RzTWFuYWdlci5nZXRJbnN0YW5jZSgpLmFkZEVmZmVjdFBvb2xCeUlkKEdhbWVFZmZlY3RJZC5ib3NzMl9ub3JtYWxfc2tpbGxfaGl0LDEpO1xyXG4gICAgICAgIHRoaXMuYWRkRGVhdGhDYWxsYmFjayh0aGlzLm9uRGVhdGgpO1xyXG4gICAgICAgIHRoaXMuYWRkWHVhbll1bkxpc3Rlbih0aGlzLm9uWHVhbll1blJlc3VsdCk7XHJcbiAgICAgICAgdGhpcy5hZGRCb3NzSW5pdGVkTGlzdGVuKHRoaXMub25Cb3NzSW5pdGVkKTtcclxuICAgICAgICB0aGlzLmFkZENoYW5nZUJvc3NIcExpc3Rlbih0aGlzLm9uQ2hhbmdlSHApO1xyXG4gICAgfVxyXG5cclxuICAgIG9uQm9zc0luaXRlZCgpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLnN0YXJ0SWRsZSgpO1xyXG4gICAgICAgIHRoaXMubm9kZS55PTIyMjtcclxuICAgICAgICB0aGlzLnNraWxsX2NkPXRoaXMuc2tpbGxfZGF0YS5nZXRTa2lsbENvbGREb3duKDEpO1xyXG4gICAgICAgIHRoaXMuc2tpbGxfamlzaHU9dGhpcy5za2lsbF9jZC10aGlzLnNraWxsX2RhdGEuZ2V0U2tpbGxJbml0Q29sZERvd24oMSlcclxuICAgIH1cclxuXHJcbiAgICBvbkNoYW5nZUhwKG51bTpudW1iZXIpe1xyXG4gICAgICAgIGlmKG51bTwwKXtcclxuICAgICAgICAgICAgaWYodGhpcy5ib3NzX3NoaWVsZCl7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmJvc3Nfc2hpZWxkLmNoYW5nZVNoaWVsZFZhbHVlKG51bSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgc3RhcnRJZGxlKCl7ICAgICAgICBcclxuICAgICAgICBzdXBlci5zZXRFbmVteVN0YXRlKEVuZW15X1N0YXRlLnN0YW5kYnkpO1xyXG4gICAgICAgIHN1cGVyLnBsYXlTcGluQW5pbWF0b24oQW5pbWF0aW9uX05hbWUuSWRsZSx0cnVlKTtcclxuICAgICAgICBcclxuICAgIH1cclxuXHJcbiAgICBzdGFydEF0dGFjaygpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLmF0dF9qaXNodT0wO1xyXG4gICAgICAgIHN1cGVyLnNldEVuZW15U3RhdGUoRW5lbXlfU3RhdGUuYXR0KTtcclxuICAgICAgICBsZXQgZGF0YT1uZXcgS2V5RnJhbWVEYXRhKCk7XHJcbiAgICAgICAgZGF0YS5uYW1lPSdBdHRhY2snO1xyXG4gICAgICAgIGRhdGEuY2FsbGJhY2s9KCk9PnsgIFxyXG4gICAgICAgICAgICB0aGlzLmF0dF9qaXNodT0wO1xyXG4gICAgICAgICAgICBHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNvdW5kX21hbmFnZXIucGxheVNvdW5kKFNvdW5kSW5kZXguWVhfQm9zczJBdHRhY2spO1xyXG4gICAgICAgICAgICBsZXQgbm9kZT1HYW1lRWZmZWN0c01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5jcmVhdGVHYW1lRWZmZWN0QnlJZChHYW1lRWZmZWN0SWQuYm9zczJfbm9ybWFsX2F0dCxzdXBlci5nZXRBdHRQb3MoKSk7XHJcbiAgICAgICAgICAgIG5vZGUuZ2V0Q29tcG9uZW50KEJvc3NBdHQyKS5pbml0KHN1cGVyLmdldEF0dERhdGEoRGFtYWdlVHlwZS5Ob3JtYWwsdHJ1ZSksR2FtZUVmZmVjdElkLmJvc3MyX25vcm1hbF9hdHQsMTIwMCxNYXRoLlBJKjMvMix0aGlzLm5vZGUueSwyNzApO1xyXG4gICAgICAgIH1cclxuICAgICAgICBzdXBlci5wbGF5U3BpbkFuaW1hdG9uKChBbmltYXRpb25fTmFtZS5hdHRhY2sxKSxmYWxzZSxkYXRhLCgpPT57XHJcbiAgICAgICAgICAgIGlmKHRoaXMuc2tpbGxfd2FpdGluZz09dHJ1ZSl7ICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgc3VwZXIuc2V0RW5lbXlTdGF0ZShFbmVteV9TdGF0ZS5za2lsbCk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnN0YXJ0U2tpbGwoKTtcclxuICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnN0YXJ0SWRsZSgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSlcclxuICAgIH1cclxuICAgIFxyXG4gICAgc3RhcnRTa2lsbCgpe1xyXG4gICAgICAgIHRoaXMuc2tpbGxfamlzaHU9MDtcclxuICAgICAgICBpZihzdXBlci5nZXRFbmVteVN0YXRlKCkhPUVuZW15X1N0YXRlLmF0dCl7XHJcbiAgICAgICAgICAgIGlmKCFzdXBlci5pc0hhdmVEZUJ1ZmYoQnVmZklkLkhlcm9fWHVhbll1bikpe1xyXG4gICAgICAgICAgICAgICAgdGhpcy5za2lsbF93YWl0aW5nPWZhbHNlO1xyXG4gICAgICAgICAgICAgICAgc3VwZXIuc2V0RW5lbXlTdGF0ZShFbmVteV9TdGF0ZS5za2lsbCk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNraWxsX2ppc2h1PTA7XHJcbiAgICAgICAgICAgICAgICAvKirph4rmlL7mioDog73vvIzml6Dms5XooqvmiZPmlq0gKi9cclxuICAgICAgICAgICAgICAgIHRoaXMuY3VyX3RvdWdobmVzcys9MTtcclxuICAgICAgICAgICAgICAgIHN1cGVyLnBsYXlTcGluQW5pbWF0b24oKEFuaW1hdGlvbl9OYW1lLnNraWxsMV8xKSxmYWxzZSxudWxsLCgpPT57XHJcbiAgICAgICAgICAgICAgICAgICAgc3VwZXIucGxheVNwaW5BbmltYXRvbigoQW5pbWF0aW9uX05hbWUuc2tpbGwxXzIpLHRydWUpO1xyXG4gICAgICAgICAgICAgICAgICAgIC8qKua3u+WKoOWcsOihqCAqL1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBncm91bmQ9Y2MuaW5zdGFudGlhdGUodGhpcy5wcmVmYWJfZ3JvdW5kKTtcclxuICAgICAgICAgICAgICAgICAgICBHcm91bmRNYW5hZ2VyLmdldEluc3RhbmNlKCkubm9kZS5hZGRDaGlsZChncm91bmQpO1xyXG4gICAgICAgICAgICAgICAgICAgIGdyb3VuZC54PXRoaXMubm9kZS54O1xyXG4gICAgICAgICAgICAgICAgICAgIGdyb3VuZC55PXRoaXMuZ2V0Q2VudGVyUG9zKCkueTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnNraWxsX3VzZV9udW0rKztcclxuICAgICAgICAgICAgICAgICAgICAvKirmt7vliqDkuJPnlKjnmoTmiqTnm74gKi9cclxuICAgICAgICAgICAgICAgICAgICBsZXQgbm9kZT1jYy5pbnN0YW50aWF0ZSh0aGlzLnByZWZhYl9zaGllbGQpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYm9zc19zaGllbGQ9bm9kZS5nZXRDb21wb25lbnQoQm9zc1NoaWVsZDIpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYm9zc19zaGllbGQuaW5pdCh0aGlzLnNraWxsX3VzZV9udW0sU2hpZWxkVHlwZS5Ta2lsbCw4LHN1cGVyLmdldE1heEhwKCkqdGhpcy5za2lsbF9kYXRhLmdldFNraWxsVmFsdWUxKDEpLGdyb3VuZCx0aGlzLm9uU2hpZWxkRGVzdG9yeS5iaW5kKHRoaXMpKTtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgYnVmZkRhdGE9bmV3IEJ1ZmZEYXRhKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgYnVmZkRhdGEuYnVmZl9pZD1CdWZmSWQuQm9zczJfTWlhbllpX0F0dGFjaztcclxuICAgICAgICAgICAgICAgICAgICBidWZmRGF0YS5yZW1haW5fdGltZT04O1xyXG4gICAgICAgICAgICAgICAgICAgIEdhbWVFZmZlY3RzTWFuYWdlci5nZXRJbnN0YW5jZSgpLm5vZGUuYWRkQ2hpbGQobm9kZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgbm9kZS5zZXRQb3NpdGlvbihjYy52MigtOCx0aGlzLm5vZGUueSs2NCp0aGlzLnNldHVwX3NjYWxlKSk7ICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICBzdXBlci5hZGRCdWZmKGJ1ZmZEYXRhKTtcclxuICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgdGhpcy5za2lsbF93YWl0aW5nPXRydWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgdGhpcy5za2lsbF93YWl0aW5nPXRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIFxyXG4gICAgfVxyXG4gICAgLyoq5oqk55u+6ZSA5q+B5pe25Zue6LCD77yMaXNBdXRv77ya5piv5ZCm6Ieq54iGKOaXtumXtOe7k+adnykgKi9cclxuICAgIG9uU2hpZWxkRGVzdG9yeShpc0F1dG86Ym9vbGVhbil7XHJcbiAgICAgICAgdGhpcy5ib3NzX3NoaWVsZD1udWxsO1xyXG4gICAgICAgIHRoaXMuc2tpbGxfamlzaHU9MDtcclxuICAgICAgICBpZihpc0F1dG8pe1xyXG4gICAgICAgICAgICAvL+WmguaenOS4jeaYr+iHqueIhu+8jOWPjeWHu1xyXG4gICAgICAgICAgICB0aGlzLnN0YXJ0U2hpZWxkQXR0YWNrKCk7ICAgICAgICAgICAgXHJcbiAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgIHRoaXMuY3VyX3RvdWdobmVzcy09MTtcclxuICAgICAgICAgICAgbGV0IGJ1ZmZEYXRhPW5ldyBCdWZmRGF0YSgpO1xyXG4gICAgICAgICAgICBidWZmRGF0YS5idWZmX2lkPUJ1ZmZJZC5IZXJvX1h1YW5ZdW47XHJcbiAgICAgICAgICAgIGJ1ZmZEYXRhLmdhbWVfZWZmZWN0X2lkPUdhbWVFZmZlY3RJZC54dWFueXVuO1xyXG4gICAgICAgICAgICBidWZmRGF0YS5yZW1haW5fdGltZT0zO1xyXG4gICAgICAgICAgICBidWZmRGF0YS5idWZmX3R5cGU9QnVmZlR5cGUuVmVydGlnbztcclxuICAgICAgICAgICAgc3VwZXIuYWRkRGVCdWZmKGJ1ZmZEYXRhLG51bGwpO1xyXG4gICAgICAgICAgICBzdXBlci5zdWJCdWZmKEJ1ZmZJZC5Cb3NzMl9NaWFuWWlfQXR0YWNrKTtcclxuICAgICAgICAgICAgc3VwZXIuY2hhbmdlSHAoLXRoaXMuZ2V0TWF4SHAoKSowLjI1KTtcclxuICAgICAgICAgICAgTXlUb29sLnJhbmRvbVNjZW5lU2hha2UoLTE2LDE2LDAuMDIsMTApO1xyXG4gICAgICAgICAgICAvL3RoaXMuc3RhcnRJZGxlKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHN0YXJ0U2hpZWxkQXR0YWNrKCl7XHJcbiAgICAgICAgbGV0IGRhdGE9bmV3IEtleUZyYW1lRGF0YSgpO1xyXG4gICAgICAgIGRhdGEuY2FsbGJhY2s9KCk9PntcclxuICAgICAgICAgICAgdGhpcy5jdXJfdG91Z2huZXNzLT0xO1xyXG4gICAgICAgICAgICBzdXBlci5zdWJCdWZmKEJ1ZmZJZC5Cb3NzMl9NaWFuWWlfQXR0YWNrKTtcclxuICAgICAgICAgICAgR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zb3VuZF9tYW5hZ2VyLnBsYXlTb3VuZChTb3VuZEluZGV4LllYX0Jvc3NBdHRhY2tHdW9kdSk7XHJcbiAgICAgICAgICAgIGxldCBub2RlPUdhbWVFZmZlY3RzTWFuYWdlci5nZXRJbnN0YW5jZSgpLmNyZWF0ZUdhbWVFZmZlY3RCeUlkKEdhbWVFZmZlY3RJZC5ib3NzMl9ub3JtYWxfc2tpbGwsdGhpcy5ub2RlLmdldFBvc2l0aW9uKCkpO1xyXG4gICAgICAgICAgICBub2RlLmdldENvbXBvbmVudChTaGllbGRBdHRhY2syKS5zZXRCb3NzUG9zKHRoaXMubm9kZS5nZXRQb3NpdGlvbigpKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZGF0YS5uYW1lPSdTa2lsbCc7XHJcbiAgICAgICAgc3VwZXIucGxheVNwaW5BbmltYXRvbigoQW5pbWF0aW9uX05hbWUuc2tpbGwxXzMpLGZhbHNlLGRhdGEsKCk9PntcclxuICAgICAgICAgICB0aGlzLnN0YXJ0SWRsZSgpO1xyXG4gICAgICAgIH0pXHJcbiAgICB9XHJcblxyXG4gICAgb25EZWF0aCgpIHtcclxuICAgICAgICB0aGlzLnVuc2NoZWR1bGVBbGxDYWxsYmFja3MoKTtcclxuICAgICAgICBzdXBlci5wbGF5RGVhZEFuaW1hdG9uKEFuaW1hdGlvbl9OYW1lLmRlYWQsKCk9PntcclxuICAgICAgICAgICAgdGhpcy5yZW1vdmVBbGxEZUJ1ZmYoKTtcclxuICAgICAgICAgICAgdGhpcy5yZW1vdmVBbGxCdWZmKCk7XHJcbiAgICAgICAgICAgIGlmKHRoaXMuc2hhZG93KXtcclxuICAgICAgICAgICAgICAgIGNjLnR3ZWVuKHRoaXMuc2hhZG93KS50bygwLjc1LHtvcGFjaXR5OjB9KS5zdGFydCgpO1xyXG4gICAgICAgICAgICB9ICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIGNjLnR3ZWVuKHRoaXMubm9kZSkudG8oMC43NSx7b3BhY2l0eTowfSkuY2FsbCgoKT0+e1xyXG4gICAgICAgICAgICAgICAgdGhpcy5yZW1vdmVBbGxEZUJ1ZmYoKTtcclxuICAgICAgICAgICAgICAgIHRoaXMucmVtb3ZlQWxsQnVmZigpO1xyXG4gICAgICAgICAgICAgICAgTW9uc3Rlck1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5kZXN0cm95TW9uc3Rlcih0aGlzLm5vZGUsdGhpcy5tb25zdGVyX3R5cGUpO1xyXG4gICAgICAgICAgICB9KS5zdGFydCgpO1xyXG4gICAgICAgIH0pXHJcbiAgICAgICAgLy9HYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNvdW5kX21hbmFnZXIucGxheVNvdW5kKFNvdW5kSW5kZXgucmV3YXJkQm94Mik7XHJcbiAgICAgICAgLy/liKDpmaRcclxuICAgICAgICBpZih0aGlzLmJvc3Nfc2hpZWxkKXtcclxuICAgICAgICAgICAgdGhpcy5ib3NzX3NoaWVsZC5kZXN0b3J5U2hpZWxkKCk7XHJcbiAgICAgICAgfSAgICAgICAgXHJcbiAgICB9XHJcblxyXG4gICAgb25YdWFuWXVuUmVzdWx0KGlzWHVhbll1bjpib29sZWFuKXtcclxuICAgICAgICBpZihpc1h1YW5ZdW4pe1xyXG4gICAgICAgICAgICB0aGlzLnN0YXJ0WHVhbll1bigpO1xyXG4gICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICBpZighc3VwZXIuaXNIYXZlRGVCdWZmVHlwZShCdWZmVHlwZS5WZXJ0aWdvKSl7XHJcbiAgICAgICAgICAgICAgICBpZighc3VwZXIuZ2V0SXNEaWUoKSl7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYodGhpcy5za2lsbF93YWl0aW5nPT10cnVlKXsgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHN1cGVyLnNldEVuZW15U3RhdGUoRW5lbXlfU3RhdGUuc2tpbGwpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnN0YXJ0U2tpbGwoKTtcclxuICAgICAgICAgICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zdGFydElkbGUoKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgc3RhcnRYdWFuWXVuKCl7XHJcbiAgICAgICAgdGhpcy5za2lsbF93YWl0aW5nPWZhbHNlO1xyXG4gICAgICAgIHN1cGVyLnBsYXlTcGluQW5pbWF0b24oQW5pbWF0aW9uX05hbWUuaHVydDEsZmFsc2UsbnVsbCwoKT0+e1xyXG4gICAgICAgICAgICBpZihzdXBlci5pc0hhdmVEZUJ1ZmZUeXBlKEJ1ZmZUeXBlLlZlcnRpZ28pJiYhc3VwZXIuZ2V0SXNEaWUoKSlcclxuICAgICAgICAgICAgICAgIHRoaXMuc3BpbmUucGF1c2VkPXRydWU7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIHVwZGF0ZShkdClcclxuICAgIHtcclxuICAgICAgICBpZigoR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5jdXJfZ2FtZV9zdGF0ZSE9R2FtZVN0YXRlLkdhbWVfUGxheWluZyl8fHRoaXMuZ2V0SXNEaWUoKSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgc3VwZXIudXBkYXRlKGR0KTtcclxuICAgICAgICB0aGlzLmNoZWNrU2tpbGwoZHQpO1xyXG4gICAgICAgIGlmKHRoaXMuZ2V0RW5lbXlTdGF0ZSgpIT1FbmVteV9TdGF0ZS5za2lsbCl7XHJcbiAgICAgICAgICAgIGlmKCF0aGlzLmlzSGF2ZURlQnVmZihCdWZmSWQuSGVyb19YdWFuWXVuKSl7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNoZWNrQXR0KGR0KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKirmioDog73mo4DmtYsgKi9cclxuICAgIGNoZWNrU2tpbGwoZHQ6bnVtYmVyKXsgICAgICAgIFxyXG4gICAgICAgIHRoaXMuc2tpbGxfamlzaHUrPWR0O1xyXG4gICAgICAgIGlmKCF0aGlzLmlzSGF2ZURlQnVmZihCdWZmSWQuSGVyb19YdWFuWXVuKSl7XHJcbiAgICAgICAgICAgIGlmKHRoaXMuc2tpbGxfamlzaHU+PXRoaXMuc2tpbGxfY2Qpe1xyXG4gICAgICAgICAgICAgICAgdGhpcy5za2lsbF9qaXNodT10aGlzLnNraWxsX2NkO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zdGFydFNraWxsKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9ICAgICAgICAgICAgIFxyXG4gICAgfVxyXG5cclxuICAgIC8qKuaUu+WHu+iuoeeulyAqL1xyXG4gICAgY2hlY2tBdHQoZHQ6bnVtYmVyKXsgICAgICAgIFxyXG4gICAgICAgIHRoaXMuYXR0X2ppc2h1Kz1kdDtcclxuICAgICAgICBpZih0aGlzLmF0dF9qaXNodT49dGhpcy5hdHRfamlhbmdlKXtcclxuICAgICAgICAgICAgdGhpcy5hdHRfamlzaHU9dGhpcy5hdHRfamlhbmdlO1xyXG4gICAgICAgICAgICB0aGlzLnN0YXJ0QXR0YWNrKCk7XHJcbiAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgIC8vdGhpcy5tb3ZpbmcoZHQpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG4iXX0=