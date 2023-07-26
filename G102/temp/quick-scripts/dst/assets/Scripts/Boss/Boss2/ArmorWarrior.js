
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
        _this.effcomp = false;
        return _this;
    }
    ArmorWarrior.prototype.onLoad = function () {
        _super.prototype.onLoad.call(this);
        this.effcomp = false;
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
    ArmorWarrior.prototype.isEffCom = function () {
        if (this.effcomp == true) {
            return this.effcomp;
        }
        if (GameEffectsManager_1.GameEffectsManager.getInstance().map_node_pools.has(GameEffectsManager_1.GameEffectId.xuanyun) &&
            GameEffectsManager_1.GameEffectsManager.getInstance().map_node_pools.has(GameEffectsManager_1.GameEffectId.boss2_normal_att) &&
            GameEffectsManager_1.GameEffectsManager.getInstance().map_node_pools.has(GameEffectsManager_1.GameEffectId.boss2_normal_att_hit1) &&
            GameEffectsManager_1.GameEffectsManager.getInstance().map_node_pools.has(GameEffectsManager_1.GameEffectId.boss2_normal_skill) &&
            GameEffectsManager_1.GameEffectsManager.getInstance().map_node_pools.has(GameEffectsManager_1.GameEffectId.boss2_normal_skill_hit)) {
            this.effcomp = true;
        }
        return this.effcomp;
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
        if (this.getEnemyState() != EnemyConfig_1.Enemy_State.skill && this.isEffCom()) {
            if (!this.isHaveDeBuff(HeroConfig_1.BuffId.Hero_XuanYun)) {
                this.checkAtt(dt);
            }
        }
    };
    /**技能检测 */
    ArmorWarrior.prototype.checkSkill = function (dt) {
        this.skill_jishu += dt;
        if (!this.isHaveDeBuff(HeroConfig_1.BuffId.Hero_XuanYun) && this.isEffCom()) {
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0c1xcQm9zc1xcQm9zczJcXEFybW9yV2Fycmlvci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFDQSw2Q0FBNEM7QUFDNUMsdURBQXNEO0FBQ3RELG9FQUFpRjtBQUNqRiwwREFBcUQ7QUFDckQsaURBQTRDO0FBQzVDLHFEQUFvRDtBQUNwRCx5REFBc0Y7QUFDdEYseURBQXVFO0FBQ3ZFLCtEQUEwRDtBQUMxRCw2REFBd0Q7QUFDeEQsNkNBQXdDO0FBQ3hDLGdDQUEyQjtBQUMzQix1Q0FBa0M7QUFDbEMsNkNBQXdDO0FBQ3hDLGlEQUE0QztBQUU1QyxJQUFLLGNBWUo7QUFaRCxXQUFLLGNBQWM7SUFDZiwrQkFBYSxDQUFBO0lBQ2Isb0NBQWtCLENBQUE7SUFDbEIsNkJBQVcsQ0FBQTtJQUNYLGdDQUFjLENBQUE7SUFDZCx1Q0FBcUIsQ0FBQTtJQUNyQix1Q0FBcUIsQ0FBQTtJQUNyQix1Q0FBcUIsQ0FBQTtJQUNyQix1Q0FBcUIsQ0FBQTtJQUNyQix1Q0FBcUIsQ0FBQTtJQUNyQix1Q0FBcUIsQ0FBQTtJQUNyQiwrQkFBYSxDQUFBO0FBQ2pCLENBQUMsRUFaSSxjQUFjLEtBQWQsY0FBYyxRQVlsQjtBQUVLLElBQUEsS0FBd0IsRUFBRSxDQUFDLFVBQVUsRUFBbkMsT0FBTyxhQUFBLEVBQUUsUUFBUSxjQUFrQixDQUFDO0FBRzVDO0lBQTBDLGdDQUFJO0lBQTlDO1FBQUEscUVBK09DO1FBNU9HLG1CQUFhLEdBQWMsSUFBSSxDQUFDO1FBR2hDLG1CQUFhLEdBQWMsSUFBSSxDQUFDO1FBRWhDLGlCQUFXLEdBQWdCLElBQUksQ0FBQztRQUVoQyxtQkFBYSxHQUFXLENBQUMsQ0FBQztRQUUxQixtQkFBYSxHQUFZLEtBQUssQ0FBQztRQUMvQixjQUFRLEdBQVcsQ0FBQyxDQUFDO1FBRWIsYUFBTyxHQUFZLEtBQUssQ0FBQzs7SUFnT3JDLENBQUM7SUEvTkcsNkJBQU0s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SSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDO1lBQ2pDLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQztTQUN0QjthQUFNO1lBQ0gsa0JBQWtCO1NBQ3JCO0lBQ0wsQ0FBQztJQTNPRDtRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDO3VEQUNZO0lBR2hDO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUM7dURBQ1k7SUFOZixZQUFZO1FBRGhDLE9BQU87T0FDYSxZQUFZLENBK09oQztJQUFELG1CQUFDO0NBL09ELEFBK09DLENBL095QyxjQUFJLEdBK083QztrQkEvT29CLFlBQVkiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJcclxuaW1wb3J0IHsgR2FtZVN0YXRlIH0gZnJvbSBcIi4uLy4uL0NvbnN0YW50c1wiO1xyXG5pbXBvcnQgeyBFbmVteV9TdGF0ZSB9IGZyb20gXCIuLi8uLi9FbmVteS9FbmVteUNvbmZpZ1wiO1xyXG5pbXBvcnQgeyBHYW1lRWZmZWN0SWQsIEdhbWVFZmZlY3RzTWFuYWdlciB9IGZyb20gXCIuLi8uLi9HYW1lL0dhbWVFZmZlY3RzTWFuYWdlclwiO1xyXG5pbXBvcnQgR3JvdW5kTWFuYWdlciBmcm9tIFwiLi4vLi4vR2FtZS9Hcm91bmRNYW5hZ2VyXCI7XHJcbmltcG9ydCBHYW1lTWFuYWdlciBmcm9tIFwiLi4vLi4vR2FtZU1hbmFnZXJcIjtcclxuaW1wb3J0IHsgQnVmZkRhdGEgfSBmcm9tIFwiLi4vLi4vSGVyby9HYW1lL0J1ZmZEYXRhXCI7XHJcbmltcG9ydCB7IEJ1ZmZJZCwgQnVmZlR5cGUsIERhbWFnZVR5cGUsIFNoaWVsZFR5cGUgfSBmcm9tIFwiLi4vLi4vSGVyby9HYW1lL0hlcm9Db25maWdcIjtcclxuaW1wb3J0IHsgS2V5RnJhbWVEYXRhLCBTdHJlbmd0aFR5cGUgfSBmcm9tIFwiLi4vLi4vTW9uc3Rlci9Nb25zdGVyRGF0YVwiO1xyXG5pbXBvcnQgTW9uc3Rlck1hbmFnZXIgZnJvbSBcIi4uLy4uL01vbnN0ZXIvTW9uc3Rlck1hbmFnZXJcIjtcclxuaW1wb3J0IHsgU291bmRJbmRleCB9IGZyb20gXCIuLi8uLi9Tb3VuZC9BdWRpb0NvbnN0YW50c1wiO1xyXG5pbXBvcnQgTXlUb29sIGZyb20gXCIuLi8uLi9Ub29scy9NeVRvb2xcIjtcclxuaW1wb3J0IEJvc3MgZnJvbSBcIi4uL0Jvc3NcIjtcclxuaW1wb3J0IEJvc3NBdHQyIGZyb20gXCIuL0Jvc3NBdHQyXCI7XHJcbmltcG9ydCBCb3NzU2hpZWxkMiBmcm9tIFwiLi9Cb3NzU2hpZWxkMlwiO1xyXG5pbXBvcnQgU2hpZWxkQXR0YWNrMiBmcm9tIFwiLi9TaGllbGRBdHRhY2syXCI7XHJcblxyXG5lbnVtIEFuaW1hdGlvbl9OYW1lIHtcclxuICAgIElkbGUgPSBcIklkbGVcIiwgICAgICAgLy8tLSDmraPpnaLlvoXmnLpcclxuICAgIGF0dGFjazEgPSBcIkF0dGFja1wiLCAgICAgICAgICAvLy0tIOaUu+WHuzFcclxuICAgIHJ1biA9IFwiUnVuXCIsICAgICAgICAgICAgICAgIC8vLS0g6LeR6LevXHJcbiAgICBodXJ0MSA9IFwiSHVydFwiLCAgICAgICAgICAvLy0tIOWPl+WHuzFcclxuICAgIHNraWxsMV8xID0gXCJTa2lsbDFfMVwiLCAgICAgICAgICAvLy0tIOaKgOiDvTHliqjkvZwxXHJcbiAgICBza2lsbDFfMiA9IFwiU2tpbGwxXzJcIiwgICAgICAgICAgLy8tLSDmioDog70x5Yqo5L2cMlxyXG4gICAgc2tpbGwxXzMgPSBcIlNraWxsMV8zXCIsICAgICAgICAgIC8vLS0g5oqA6IO9MeWKqOS9nDJcclxuICAgIHNraWxsMl8xID0gXCJTa2lsbDJfMVwiLCAgICAgICAgICAvLy0tIOaKgOiDvTLliqjkvZwxXHJcbiAgICBza2lsbDJfMiA9IFwiU2tpbGwyXzJcIiwgICAgICAgICAgLy8tLSDmioDog70y5Yqo5L2cMlxyXG4gICAgc2tpbGwyXzMgPSBcIlNraWxsMl8zXCIsICAgICAgICAgIC8vLS0g5oqA6IO9MuWKqOS9nDJcclxuICAgIGRlYWQgPSBcIkRlYWRcIiwgICAvL+atu+S6oVxyXG59XHJcblxyXG5jb25zdCB7IGNjY2xhc3MsIHByb3BlcnR5IH0gPSBjYy5fZGVjb3JhdG9yO1xyXG5cclxuQGNjY2xhc3NcclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQXJtb3JXYXJyaW9yIGV4dGVuZHMgQm9zcyB7XHJcblxyXG4gICAgQHByb3BlcnR5KGNjLlByZWZhYilcclxuICAgIHByZWZhYl9zaGllbGQ6IGNjLlByZWZhYiA9IG51bGw7XHJcblxyXG4gICAgQHByb3BlcnR5KGNjLlByZWZhYilcclxuICAgIHByZWZhYl9ncm91bmQ6IGNjLlByZWZhYiA9IG51bGw7XHJcblxyXG4gICAgYm9zc19zaGllbGQ6IEJvc3NTaGllbGQyID0gbnVsbDtcclxuXHJcbiAgICBza2lsbF91c2VfbnVtOiBudW1iZXIgPSAwO1xyXG5cclxuICAgIHNraWxsX3dhaXRpbmc6IGJvb2xlYW4gPSBmYWxzZTtcclxuICAgIHNraWxsX2NkOiBudW1iZXIgPSAwO1xyXG5cclxuICAgIHByaXZhdGUgZWZmY29tcDogYm9vbGVhbiA9IGZhbHNlO1xyXG4gICAgb25Mb2FkKCk6IHZvaWQge1xyXG4gICAgICAgIHN1cGVyLm9uTG9hZCgpO1xyXG4gICAgICAgIHRoaXMuZWZmY29tcCA9IGZhbHNlO1xyXG4gICAgICAgIEdhbWVFZmZlY3RzTWFuYWdlci5nZXRJbnN0YW5jZSgpLmFkZEVmZmVjdFBvb2xCeUlkKEdhbWVFZmZlY3RJZC54dWFueXVuLCAyKTtcclxuICAgICAgICBHYW1lRWZmZWN0c01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5hZGRFZmZlY3RQb29sQnlJZChHYW1lRWZmZWN0SWQuYm9zczJfbm9ybWFsX2F0dCwgMSk7XHJcbiAgICAgICAgR2FtZUVmZmVjdHNNYW5hZ2VyLmdldEluc3RhbmNlKCkuYWRkRWZmZWN0UG9vbEJ5SWQoR2FtZUVmZmVjdElkLmJvc3MyX25vcm1hbF9hdHRfaGl0MSwgMSk7XHJcbiAgICAgICAgR2FtZUVmZmVjdHNNYW5hZ2VyLmdldEluc3RhbmNlKCkuYWRkRWZmZWN0UG9vbEJ5SWQoR2FtZUVmZmVjdElkLmJvc3MyX25vcm1hbF9za2lsbCwgMSk7XHJcbiAgICAgICAgR2FtZUVmZmVjdHNNYW5hZ2VyLmdldEluc3RhbmNlKCkuYWRkRWZmZWN0UG9vbEJ5SWQoR2FtZUVmZmVjdElkLmJvc3MyX25vcm1hbF9za2lsbF9oaXQsIDEpO1xyXG4gICAgICAgIHRoaXMuYWRkRGVhdGhDYWxsYmFjayh0aGlzLm9uRGVhdGgpO1xyXG4gICAgICAgIHRoaXMuYWRkWHVhbll1bkxpc3Rlbih0aGlzLm9uWHVhbll1blJlc3VsdCk7XHJcbiAgICAgICAgdGhpcy5hZGRCb3NzSW5pdGVkTGlzdGVuKHRoaXMub25Cb3NzSW5pdGVkKTtcclxuICAgICAgICB0aGlzLmFkZENoYW5nZUJvc3NIcExpc3Rlbih0aGlzLm9uQ2hhbmdlSHApO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgaXNFZmZDb20oKTogYm9vbGVhbiB7XHJcbiAgICAgICAgaWYgKHRoaXMuZWZmY29tcCA9PSB0cnVlKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmVmZmNvbXA7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChHYW1lRWZmZWN0c01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5tYXBfbm9kZV9wb29scy5oYXMoR2FtZUVmZmVjdElkLnh1YW55dW4pICYmXHJcbiAgICAgICAgICAgIEdhbWVFZmZlY3RzTWFuYWdlci5nZXRJbnN0YW5jZSgpLm1hcF9ub2RlX3Bvb2xzLmhhcyhHYW1lRWZmZWN0SWQuYm9zczJfbm9ybWFsX2F0dCkgJiZcclxuICAgICAgICAgICAgR2FtZUVmZmVjdHNNYW5hZ2VyLmdldEluc3RhbmNlKCkubWFwX25vZGVfcG9vbHMuaGFzKEdhbWVFZmZlY3RJZC5ib3NzMl9ub3JtYWxfYXR0X2hpdDEpICYmXHJcbiAgICAgICAgICAgIEdhbWVFZmZlY3RzTWFuYWdlci5nZXRJbnN0YW5jZSgpLm1hcF9ub2RlX3Bvb2xzLmhhcyhHYW1lRWZmZWN0SWQuYm9zczJfbm9ybWFsX3NraWxsKSAmJlxyXG4gICAgICAgICAgICBHYW1lRWZmZWN0c01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5tYXBfbm9kZV9wb29scy5oYXMoR2FtZUVmZmVjdElkLmJvc3MyX25vcm1hbF9za2lsbF9oaXQpKSB7XHJcbiAgICAgICAgICAgIHRoaXMuZWZmY29tcCA9IHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0aGlzLmVmZmNvbXA7XHJcbiAgICB9XHJcbiAgICBvbkJvc3NJbml0ZWQoKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5zdGFydElkbGUoKTtcclxuICAgICAgICB0aGlzLm5vZGUueSA9IDIyMjtcclxuICAgICAgICB0aGlzLnNraWxsX2NkID0gdGhpcy5za2lsbF9kYXRhLmdldFNraWxsQ29sZERvd24oMSk7XHJcbiAgICAgICAgdGhpcy5za2lsbF9qaXNodSA9IHRoaXMuc2tpbGxfY2QgLSB0aGlzLnNraWxsX2RhdGEuZ2V0U2tpbGxJbml0Q29sZERvd24oMSlcclxuICAgIH1cclxuXHJcbiAgICBvbkNoYW5nZUhwKG51bTogbnVtYmVyKSB7XHJcbiAgICAgICAgaWYgKG51bSA8IDApIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMuYm9zc19zaGllbGQpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuYm9zc19zaGllbGQuY2hhbmdlU2hpZWxkVmFsdWUobnVtKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBzdGFydElkbGUoKSB7XHJcbiAgICAgICAgc3VwZXIuc2V0RW5lbXlTdGF0ZShFbmVteV9TdGF0ZS5zdGFuZGJ5KTtcclxuICAgICAgICBzdXBlci5wbGF5U3BpbkFuaW1hdG9uKEFuaW1hdGlvbl9OYW1lLklkbGUsIHRydWUpO1xyXG5cclxuICAgIH1cclxuXHJcbiAgICBzdGFydEF0dGFjaygpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLmF0dF9qaXNodSA9IDA7XHJcbiAgICAgICAgc3VwZXIuc2V0RW5lbXlTdGF0ZShFbmVteV9TdGF0ZS5hdHQpO1xyXG4gICAgICAgIGxldCBkYXRhID0gbmV3IEtleUZyYW1lRGF0YSgpO1xyXG4gICAgICAgIGRhdGEubmFtZSA9ICdBdHRhY2snO1xyXG4gICAgICAgIGRhdGEuY2FsbGJhY2sgPSAoKSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuYXR0X2ppc2h1ID0gMDtcclxuICAgICAgICAgICAgR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zb3VuZF9tYW5hZ2VyLnBsYXlTb3VuZChTb3VuZEluZGV4LllYX0Jvc3MyQXR0YWNrKTtcclxuICAgICAgICAgICAgbGV0IG5vZGUgPSBHYW1lRWZmZWN0c01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5jcmVhdGVHYW1lRWZmZWN0QnlJZChHYW1lRWZmZWN0SWQuYm9zczJfbm9ybWFsX2F0dCwgc3VwZXIuZ2V0QXR0UG9zKCkpO1xyXG4gICAgICAgICAgICBub2RlLmdldENvbXBvbmVudChCb3NzQXR0MikuaW5pdChzdXBlci5nZXRBdHREYXRhKERhbWFnZVR5cGUuTm9ybWFsLCB0cnVlKSwgR2FtZUVmZmVjdElkLmJvc3MyX25vcm1hbF9hdHQsIDEyMDAsIE1hdGguUEkgKiAzIC8gMiwgdGhpcy5ub2RlLnksIDI3MCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHN1cGVyLnBsYXlTcGluQW5pbWF0b24oKEFuaW1hdGlvbl9OYW1lLmF0dGFjazEpLCBmYWxzZSwgZGF0YSwgKCkgPT4ge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5za2lsbF93YWl0aW5nID09IHRydWUpIHtcclxuICAgICAgICAgICAgICAgIHN1cGVyLnNldEVuZW15U3RhdGUoRW5lbXlfU3RhdGUuc2tpbGwpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zdGFydFNraWxsKCk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnN0YXJ0SWRsZSgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSlcclxuICAgIH1cclxuXHJcbiAgICBzdGFydFNraWxsKCkge1xyXG4gICAgICAgIHRoaXMuc2tpbGxfamlzaHUgPSAwO1xyXG4gICAgICAgIGlmIChzdXBlci5nZXRFbmVteVN0YXRlKCkgIT0gRW5lbXlfU3RhdGUuYXR0KSB7XHJcbiAgICAgICAgICAgIGlmICghc3VwZXIuaXNIYXZlRGVCdWZmKEJ1ZmZJZC5IZXJvX1h1YW5ZdW4pKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNraWxsX3dhaXRpbmcgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIHN1cGVyLnNldEVuZW15U3RhdGUoRW5lbXlfU3RhdGUuc2tpbGwpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5za2lsbF9qaXNodSA9IDA7XHJcbiAgICAgICAgICAgICAgICAvKirph4rmlL7mioDog73vvIzml6Dms5XooqvmiZPmlq0gKi9cclxuICAgICAgICAgICAgICAgIHRoaXMuY3VyX3RvdWdobmVzcyArPSAxO1xyXG4gICAgICAgICAgICAgICAgc3VwZXIucGxheVNwaW5BbmltYXRvbigoQW5pbWF0aW9uX05hbWUuc2tpbGwxXzEpLCBmYWxzZSwgbnVsbCwgKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHN1cGVyLnBsYXlTcGluQW5pbWF0b24oKEFuaW1hdGlvbl9OYW1lLnNraWxsMV8yKSwgdHJ1ZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgLyoq5re75Yqg5Zyw6KGoICovXHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IGdyb3VuZCA9IGNjLmluc3RhbnRpYXRlKHRoaXMucHJlZmFiX2dyb3VuZCk7XHJcbiAgICAgICAgICAgICAgICAgICAgR3JvdW5kTWFuYWdlci5nZXRJbnN0YW5jZSgpLm5vZGUuYWRkQ2hpbGQoZ3JvdW5kKTtcclxuICAgICAgICAgICAgICAgICAgICBncm91bmQueCA9IHRoaXMubm9kZS54O1xyXG4gICAgICAgICAgICAgICAgICAgIGdyb3VuZC55ID0gdGhpcy5nZXRDZW50ZXJQb3MoKS55O1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2tpbGxfdXNlX251bSsrO1xyXG4gICAgICAgICAgICAgICAgICAgIC8qKua3u+WKoOS4k+eUqOeahOaKpOebviAqL1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBub2RlID0gY2MuaW5zdGFudGlhdGUodGhpcy5wcmVmYWJfc2hpZWxkKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmJvc3Nfc2hpZWxkID0gbm9kZS5nZXRDb21wb25lbnQoQm9zc1NoaWVsZDIpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYm9zc19zaGllbGQuaW5pdCh0aGlzLnNraWxsX3VzZV9udW0sIFNoaWVsZFR5cGUuU2tpbGwsIDgsIHN1cGVyLmdldE1heEhwKCkgKiB0aGlzLnNraWxsX2RhdGEuZ2V0U2tpbGxWYWx1ZTEoMSksIGdyb3VuZCwgdGhpcy5vblNoaWVsZERlc3RvcnkuYmluZCh0aGlzKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IGJ1ZmZEYXRhID0gbmV3IEJ1ZmZEYXRhKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgYnVmZkRhdGEuYnVmZl9pZCA9IEJ1ZmZJZC5Cb3NzMl9NaWFuWWlfQXR0YWNrO1xyXG4gICAgICAgICAgICAgICAgICAgIGJ1ZmZEYXRhLnJlbWFpbl90aW1lID0gODtcclxuICAgICAgICAgICAgICAgICAgICBHYW1lRWZmZWN0c01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5ub2RlLmFkZENoaWxkKG5vZGUpO1xyXG4gICAgICAgICAgICAgICAgICAgIG5vZGUuc2V0UG9zaXRpb24oY2MudjIoLTgsIHRoaXMubm9kZS55ICsgNjQgKiB0aGlzLnNldHVwX3NjYWxlKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgc3VwZXIuYWRkQnVmZihidWZmRGF0YSk7XHJcblxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2tpbGxfd2FpdGluZyA9IHRydWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLnNraWxsX3dhaXRpbmcgPSB0cnVlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICB9XHJcbiAgICAvKirmiqTnm77plIDmr4Hml7blm57osIPvvIxpc0F1dG/vvJrmmK/lkKboh6rniIYo5pe26Ze057uT5p2fKSAqL1xyXG4gICAgb25TaGllbGREZXN0b3J5KGlzQXV0bzogYm9vbGVhbikge1xyXG4gICAgICAgIHRoaXMuYm9zc19zaGllbGQgPSBudWxsO1xyXG4gICAgICAgIHRoaXMuc2tpbGxfamlzaHUgPSAwO1xyXG4gICAgICAgIGlmIChpc0F1dG8pIHtcclxuICAgICAgICAgICAgLy/lpoLmnpzkuI3mmK/oh6rniIbvvIzlj43lh7tcclxuICAgICAgICAgICAgdGhpcy5zdGFydFNoaWVsZEF0dGFjaygpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMuY3VyX3RvdWdobmVzcyAtPSAxO1xyXG4gICAgICAgICAgICBsZXQgYnVmZkRhdGEgPSBuZXcgQnVmZkRhdGEoKTtcclxuICAgICAgICAgICAgYnVmZkRhdGEuYnVmZl9pZCA9IEJ1ZmZJZC5IZXJvX1h1YW5ZdW47XHJcbiAgICAgICAgICAgIGJ1ZmZEYXRhLmdhbWVfZWZmZWN0X2lkID0gR2FtZUVmZmVjdElkLnh1YW55dW47XHJcbiAgICAgICAgICAgIGJ1ZmZEYXRhLnJlbWFpbl90aW1lID0gMztcclxuICAgICAgICAgICAgYnVmZkRhdGEuYnVmZl90eXBlID0gQnVmZlR5cGUuVmVydGlnbztcclxuICAgICAgICAgICAgc3VwZXIuYWRkRGVCdWZmKGJ1ZmZEYXRhLCBudWxsKTtcclxuICAgICAgICAgICAgc3VwZXIuc3ViQnVmZihCdWZmSWQuQm9zczJfTWlhbllpX0F0dGFjayk7XHJcbiAgICAgICAgICAgIHN1cGVyLmNoYW5nZUhwKC10aGlzLmdldE1heEhwKCkgKiAwLjI1KTtcclxuICAgICAgICAgICAgTXlUb29sLnJhbmRvbVNjZW5lU2hha2UoLTE2LCAxNiwgMC4wMiwgMTApO1xyXG4gICAgICAgICAgICAvL3RoaXMuc3RhcnRJZGxlKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHN0YXJ0U2hpZWxkQXR0YWNrKCkge1xyXG4gICAgICAgIGxldCBkYXRhID0gbmV3IEtleUZyYW1lRGF0YSgpO1xyXG4gICAgICAgIGRhdGEuY2FsbGJhY2sgPSAoKSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuY3VyX3RvdWdobmVzcyAtPSAxO1xyXG4gICAgICAgICAgICBzdXBlci5zdWJCdWZmKEJ1ZmZJZC5Cb3NzMl9NaWFuWWlfQXR0YWNrKTtcclxuICAgICAgICAgICAgR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zb3VuZF9tYW5hZ2VyLnBsYXlTb3VuZChTb3VuZEluZGV4LllYX0Jvc3NBdHRhY2tHdW9kdSk7XHJcbiAgICAgICAgICAgIGxldCBub2RlID0gR2FtZUVmZmVjdHNNYW5hZ2VyLmdldEluc3RhbmNlKCkuY3JlYXRlR2FtZUVmZmVjdEJ5SWQoR2FtZUVmZmVjdElkLmJvc3MyX25vcm1hbF9za2lsbCwgdGhpcy5ub2RlLmdldFBvc2l0aW9uKCkpO1xyXG4gICAgICAgICAgICBub2RlLmdldENvbXBvbmVudChTaGllbGRBdHRhY2syKS5zZXRCb3NzUG9zKHRoaXMubm9kZS5nZXRQb3NpdGlvbigpKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZGF0YS5uYW1lID0gJ1NraWxsJztcclxuICAgICAgICBzdXBlci5wbGF5U3BpbkFuaW1hdG9uKChBbmltYXRpb25fTmFtZS5za2lsbDFfMyksIGZhbHNlLCBkYXRhLCAoKSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuc3RhcnRJZGxlKCk7XHJcbiAgICAgICAgfSlcclxuICAgIH1cclxuXHJcbiAgICBvbkRlYXRoKCkge1xyXG4gICAgICAgIHRoaXMudW5zY2hlZHVsZUFsbENhbGxiYWNrcygpO1xyXG4gICAgICAgIHN1cGVyLnBsYXlEZWFkQW5pbWF0b24oQW5pbWF0aW9uX05hbWUuZGVhZCwgKCkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLnJlbW92ZUFsbERlQnVmZigpO1xyXG4gICAgICAgICAgICB0aGlzLnJlbW92ZUFsbEJ1ZmYoKTtcclxuICAgICAgICAgICAgaWYgKHRoaXMuc2hhZG93KSB7XHJcbiAgICAgICAgICAgICAgICBjYy50d2Vlbih0aGlzLnNoYWRvdykudG8oMC43NSwgeyBvcGFjaXR5OiAwIH0pLnN0YXJ0KCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgY2MudHdlZW4odGhpcy5ub2RlKS50bygwLjc1LCB7IG9wYWNpdHk6IDAgfSkuY2FsbCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnJlbW92ZUFsbERlQnVmZigpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5yZW1vdmVBbGxCdWZmKCk7XHJcbiAgICAgICAgICAgICAgICBNb25zdGVyTWFuYWdlci5nZXRJbnN0YW5jZSgpLmRlc3Ryb3lNb25zdGVyKHRoaXMubm9kZSwgdGhpcy5tb25zdGVyX3R5cGUpO1xyXG4gICAgICAgICAgICB9KS5zdGFydCgpO1xyXG4gICAgICAgIH0pXHJcbiAgICAgICAgLy9HYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNvdW5kX21hbmFnZXIucGxheVNvdW5kKFNvdW5kSW5kZXgucmV3YXJkQm94Mik7XHJcbiAgICAgICAgLy/liKDpmaRcclxuICAgICAgICBpZiAodGhpcy5ib3NzX3NoaWVsZCkge1xyXG4gICAgICAgICAgICB0aGlzLmJvc3Nfc2hpZWxkLmRlc3RvcnlTaGllbGQoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgb25YdWFuWXVuUmVzdWx0KGlzWHVhbll1bjogYm9vbGVhbikge1xyXG4gICAgICAgIGlmIChpc1h1YW5ZdW4pIHtcclxuICAgICAgICAgICAgdGhpcy5zdGFydFh1YW5ZdW4oKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBpZiAoIXN1cGVyLmlzSGF2ZURlQnVmZlR5cGUoQnVmZlR5cGUuVmVydGlnbykpIHtcclxuICAgICAgICAgICAgICAgIGlmICghc3VwZXIuZ2V0SXNEaWUoKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLnNraWxsX3dhaXRpbmcgPT0gdHJ1ZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzdXBlci5zZXRFbmVteVN0YXRlKEVuZW15X1N0YXRlLnNraWxsKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zdGFydFNraWxsKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zdGFydElkbGUoKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgc3RhcnRYdWFuWXVuKCkge1xyXG4gICAgICAgIHRoaXMuc2tpbGxfd2FpdGluZyA9IGZhbHNlO1xyXG4gICAgICAgIHN1cGVyLnBsYXlTcGluQW5pbWF0b24oQW5pbWF0aW9uX05hbWUuaHVydDEsIGZhbHNlLCBudWxsLCAoKSA9PiB7XHJcbiAgICAgICAgICAgIGlmIChzdXBlci5pc0hhdmVEZUJ1ZmZUeXBlKEJ1ZmZUeXBlLlZlcnRpZ28pICYmICFzdXBlci5nZXRJc0RpZSgpKVxyXG4gICAgICAgICAgICAgICAgdGhpcy5zcGluZS5wYXVzZWQgPSB0cnVlO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIHVwZGF0ZShkdCkge1xyXG4gICAgICAgIGlmICgoR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5jdXJfZ2FtZV9zdGF0ZSAhPSBHYW1lU3RhdGUuR2FtZV9QbGF5aW5nKSB8fCB0aGlzLmdldElzRGllKCkpIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICBzdXBlci51cGRhdGUoZHQpO1xyXG4gICAgICAgIHRoaXMuY2hlY2tTa2lsbChkdCk7XHJcbiAgICAgICAgaWYgKHRoaXMuZ2V0RW5lbXlTdGF0ZSgpICE9IEVuZW15X1N0YXRlLnNraWxsJiZ0aGlzLmlzRWZmQ29tKCkpIHtcclxuICAgICAgICAgICAgaWYgKCF0aGlzLmlzSGF2ZURlQnVmZihCdWZmSWQuSGVyb19YdWFuWXVuKSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jaGVja0F0dChkdCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoq5oqA6IO95qOA5rWLICovXHJcbiAgICBjaGVja1NraWxsKGR0OiBudW1iZXIpIHtcclxuICAgICAgICB0aGlzLnNraWxsX2ppc2h1ICs9IGR0O1xyXG4gICAgICAgIGlmICghdGhpcy5pc0hhdmVEZUJ1ZmYoQnVmZklkLkhlcm9fWHVhbll1bikmJnRoaXMuaXNFZmZDb20oKSkge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5za2lsbF9qaXNodSA+PSB0aGlzLnNraWxsX2NkKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNraWxsX2ppc2h1ID0gdGhpcy5za2lsbF9jZDtcclxuICAgICAgICAgICAgICAgIHRoaXMuc3RhcnRTa2lsbCgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKuaUu+WHu+iuoeeulyAqL1xyXG4gICAgY2hlY2tBdHQoZHQ6IG51bWJlcikge1xyXG4gICAgICAgIHRoaXMuYXR0X2ppc2h1ICs9IGR0O1xyXG4gICAgICAgIGlmICh0aGlzLmF0dF9qaXNodSA+PSB0aGlzLmF0dF9qaWFuZ2UpIHtcclxuICAgICAgICAgICAgdGhpcy5hdHRfamlzaHUgPSB0aGlzLmF0dF9qaWFuZ2U7XHJcbiAgICAgICAgICAgIHRoaXMuc3RhcnRBdHRhY2soKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAvL3RoaXMubW92aW5nKGR0KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuIl19