
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
            var startEndPos = cc.v2(GameManager_1.default.getInstance().charPosX, GameManager_1.default.getInstance().enemy_att_y);
            var offsetPos = startEndPos.sub(node.getPosition());
            var dir = Math.atan2(offsetPos.y, offsetPos.x);
            node.getComponent(BossAtt2_1.default).init(_super.prototype.getAttData.call(_this, HeroConfig_1.DamageType.Normal, true), GameEffectsManager_1.GameEffectId.boss2_normal_att, 300, dir, _this.node.y, 270);
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
        if (this.getEnemyState() != EnemyConfig_1.Enemy_State.skill && this.isEffCom() && this.getEnemyState() != EnemyConfig_1.Enemy_State.att) {
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0c1xcQm9zc1xcQm9zczJcXEFybW9yV2Fycmlvci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFDQSw2Q0FBNEM7QUFDNUMsdURBQXNEO0FBQ3RELG9FQUFpRjtBQUNqRiwwREFBcUQ7QUFDckQsaURBQTRDO0FBQzVDLHFEQUFvRDtBQUNwRCx5REFBc0Y7QUFDdEYseURBQXVFO0FBQ3ZFLCtEQUEwRDtBQUMxRCw2REFBd0Q7QUFDeEQsNkNBQXdDO0FBQ3hDLGdDQUEyQjtBQUMzQix1Q0FBa0M7QUFDbEMsNkNBQXdDO0FBQ3hDLGlEQUE0QztBQUU1QyxJQUFLLGNBWUo7QUFaRCxXQUFLLGNBQWM7SUFDZiwrQkFBYSxDQUFBO0lBQ2Isb0NBQWtCLENBQUE7SUFDbEIsNkJBQVcsQ0FBQTtJQUNYLGdDQUFjLENBQUE7SUFDZCx1Q0FBcUIsQ0FBQTtJQUNyQix1Q0FBcUIsQ0FBQTtJQUNyQix1Q0FBcUIsQ0FBQTtJQUNyQix1Q0FBcUIsQ0FBQTtJQUNyQix1Q0FBcUIsQ0FBQTtJQUNyQix1Q0FBcUIsQ0FBQTtJQUNyQiwrQkFBYSxDQUFBO0FBQ2pCLENBQUMsRUFaSSxjQUFjLEtBQWQsY0FBYyxRQVlsQjtBQUVLLElBQUEsS0FBd0IsRUFBRSxDQUFDLFVBQVUsRUFBbkMsT0FBTyxhQUFBLEVBQUUsUUFBUSxjQUFrQixDQUFDO0FBRzVDO0lBQTBDLGdDQUFJO0lBQTlDO1FBQUEscUVBbVBDO1FBaFBHLG1CQUFhLEdBQWMsSUFBSSxDQUFDO1FBR2hDLG1CQUFhLEdBQWMsSUFBSSxDQUFDO1FBRWhDLGlCQUFXLEdBQWdCLElBQUksQ0FBQztRQUVoQyxtQkFBYSxHQUFXLENBQUMsQ0FBQztRQUUxQixtQkFBYSxHQUFZLEtBQUssQ0FBQztRQUMvQixjQUFRLEdBQVcsQ0FBQyxDQUFDO1FBRWIsYUFBTyxHQUFZLEtBQUssQ0FBQzs7SUFvT3JDLENBQUM7SUFuT0csNkJBQU0s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QUFFLEVBQUU7WUFDMUQsSUFBSSxJQUFJLENBQUMsV0FBVyxJQUFJLElBQUksQ0FBQyxRQUFRLEVBQUU7Z0JBQ25DLElBQUksQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQztnQkFDakMsSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDO2FBQ3JCO1NBQ0o7SUFDTCxDQUFDO0lBRUQsVUFBVTtJQUNWLCtCQUFRLEdBQVIsVUFBUyxFQUFVO1FBQ2YsSUFBSSxDQUFDLFNBQVMsSUFBSSxFQUFFLENBQUM7UUFDckIsSUFBSSxJQUFJLENBQUMsU0FBUyxJQUFJLElBQUksQ0FBQyxVQUFVLEVBQUU7WUFDbkMsSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDO1lBQ2pDLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQztTQUN0QjthQUFNO1lBQ0gsa0JBQWtCO1NBQ3JCO0lBQ0wsQ0FBQztJQS9PRDtRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDO3VEQUNZO0lBR2hDO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUM7dURBQ1k7SUFOZixZQUFZO1FBRGhDLE9BQU87T0FDYSxZQUFZLENBbVBoQztJQUFELG1CQUFDO0NBblBELEFBbVBDLENBblB5QyxjQUFJLEdBbVA3QztrQkFuUG9CLFlBQVkiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJcclxuaW1wb3J0IHsgR2FtZVN0YXRlIH0gZnJvbSBcIi4uLy4uL0NvbnN0YW50c1wiO1xyXG5pbXBvcnQgeyBFbmVteV9TdGF0ZSB9IGZyb20gXCIuLi8uLi9FbmVteS9FbmVteUNvbmZpZ1wiO1xyXG5pbXBvcnQgeyBHYW1lRWZmZWN0SWQsIEdhbWVFZmZlY3RzTWFuYWdlciB9IGZyb20gXCIuLi8uLi9HYW1lL0dhbWVFZmZlY3RzTWFuYWdlclwiO1xyXG5pbXBvcnQgR3JvdW5kTWFuYWdlciBmcm9tIFwiLi4vLi4vR2FtZS9Hcm91bmRNYW5hZ2VyXCI7XHJcbmltcG9ydCBHYW1lTWFuYWdlciBmcm9tIFwiLi4vLi4vR2FtZU1hbmFnZXJcIjtcclxuaW1wb3J0IHsgQnVmZkRhdGEgfSBmcm9tIFwiLi4vLi4vSGVyby9HYW1lL0J1ZmZEYXRhXCI7XHJcbmltcG9ydCB7IEJ1ZmZJZCwgQnVmZlR5cGUsIERhbWFnZVR5cGUsIFNoaWVsZFR5cGUgfSBmcm9tIFwiLi4vLi4vSGVyby9HYW1lL0hlcm9Db25maWdcIjtcclxuaW1wb3J0IHsgS2V5RnJhbWVEYXRhLCBTdHJlbmd0aFR5cGUgfSBmcm9tIFwiLi4vLi4vTW9uc3Rlci9Nb25zdGVyRGF0YVwiO1xyXG5pbXBvcnQgTW9uc3Rlck1hbmFnZXIgZnJvbSBcIi4uLy4uL01vbnN0ZXIvTW9uc3Rlck1hbmFnZXJcIjtcclxuaW1wb3J0IHsgU291bmRJbmRleCB9IGZyb20gXCIuLi8uLi9Tb3VuZC9BdWRpb0NvbnN0YW50c1wiO1xyXG5pbXBvcnQgTXlUb29sIGZyb20gXCIuLi8uLi9Ub29scy9NeVRvb2xcIjtcclxuaW1wb3J0IEJvc3MgZnJvbSBcIi4uL0Jvc3NcIjtcclxuaW1wb3J0IEJvc3NBdHQyIGZyb20gXCIuL0Jvc3NBdHQyXCI7XHJcbmltcG9ydCBCb3NzU2hpZWxkMiBmcm9tIFwiLi9Cb3NzU2hpZWxkMlwiO1xyXG5pbXBvcnQgU2hpZWxkQXR0YWNrMiBmcm9tIFwiLi9TaGllbGRBdHRhY2syXCI7XHJcblxyXG5lbnVtIEFuaW1hdGlvbl9OYW1lIHtcclxuICAgIElkbGUgPSBcIklkbGVcIiwgICAgICAgLy8tLSDmraPpnaLlvoXmnLpcclxuICAgIGF0dGFjazEgPSBcIkF0dGFja1wiLCAgICAgICAgICAvLy0tIOaUu+WHuzFcclxuICAgIHJ1biA9IFwiUnVuXCIsICAgICAgICAgICAgICAgIC8vLS0g6LeR6LevXHJcbiAgICBodXJ0MSA9IFwiSHVydFwiLCAgICAgICAgICAvLy0tIOWPl+WHuzFcclxuICAgIHNraWxsMV8xID0gXCJTa2lsbDFfMVwiLCAgICAgICAgICAvLy0tIOaKgOiDvTHliqjkvZwxXHJcbiAgICBza2lsbDFfMiA9IFwiU2tpbGwxXzJcIiwgICAgICAgICAgLy8tLSDmioDog70x5Yqo5L2cMlxyXG4gICAgc2tpbGwxXzMgPSBcIlNraWxsMV8zXCIsICAgICAgICAgIC8vLS0g5oqA6IO9MeWKqOS9nDJcclxuICAgIHNraWxsMl8xID0gXCJTa2lsbDJfMVwiLCAgICAgICAgICAvLy0tIOaKgOiDvTLliqjkvZwxXHJcbiAgICBza2lsbDJfMiA9IFwiU2tpbGwyXzJcIiwgICAgICAgICAgLy8tLSDmioDog70y5Yqo5L2cMlxyXG4gICAgc2tpbGwyXzMgPSBcIlNraWxsMl8zXCIsICAgICAgICAgIC8vLS0g5oqA6IO9MuWKqOS9nDJcclxuICAgIGRlYWQgPSBcIkRlYWRcIiwgICAvL+atu+S6oVxyXG59XHJcblxyXG5jb25zdCB7IGNjY2xhc3MsIHByb3BlcnR5IH0gPSBjYy5fZGVjb3JhdG9yO1xyXG5cclxuQGNjY2xhc3NcclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQXJtb3JXYXJyaW9yIGV4dGVuZHMgQm9zcyB7XHJcblxyXG4gICAgQHByb3BlcnR5KGNjLlByZWZhYilcclxuICAgIHByZWZhYl9zaGllbGQ6IGNjLlByZWZhYiA9IG51bGw7XHJcblxyXG4gICAgQHByb3BlcnR5KGNjLlByZWZhYilcclxuICAgIHByZWZhYl9ncm91bmQ6IGNjLlByZWZhYiA9IG51bGw7XHJcblxyXG4gICAgYm9zc19zaGllbGQ6IEJvc3NTaGllbGQyID0gbnVsbDtcclxuXHJcbiAgICBza2lsbF91c2VfbnVtOiBudW1iZXIgPSAwO1xyXG5cclxuICAgIHNraWxsX3dhaXRpbmc6IGJvb2xlYW4gPSBmYWxzZTtcclxuICAgIHNraWxsX2NkOiBudW1iZXIgPSAwO1xyXG5cclxuICAgIHByaXZhdGUgZWZmY29tcDogYm9vbGVhbiA9IGZhbHNlO1xyXG4gICAgb25Mb2FkKCk6IHZvaWQge1xyXG4gICAgICAgIHN1cGVyLm9uTG9hZCgpO1xyXG4gICAgICAgIHRoaXMuZWZmY29tcCA9IGZhbHNlO1xyXG4gICAgICAgIEdhbWVFZmZlY3RzTWFuYWdlci5nZXRJbnN0YW5jZSgpLmFkZEVmZmVjdFBvb2xCeUlkKEdhbWVFZmZlY3RJZC54dWFueXVuLCAyKTtcclxuICAgICAgICBHYW1lRWZmZWN0c01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5hZGRFZmZlY3RQb29sQnlJZChHYW1lRWZmZWN0SWQuYm9zczJfbm9ybWFsX2F0dCwgMSk7XHJcbiAgICAgICAgR2FtZUVmZmVjdHNNYW5hZ2VyLmdldEluc3RhbmNlKCkuYWRkRWZmZWN0UG9vbEJ5SWQoR2FtZUVmZmVjdElkLmJvc3MyX25vcm1hbF9hdHRfaGl0MSwgMSk7XHJcbiAgICAgICAgR2FtZUVmZmVjdHNNYW5hZ2VyLmdldEluc3RhbmNlKCkuYWRkRWZmZWN0UG9vbEJ5SWQoR2FtZUVmZmVjdElkLmJvc3MyX25vcm1hbF9za2lsbCwgMSk7XHJcbiAgICAgICAgR2FtZUVmZmVjdHNNYW5hZ2VyLmdldEluc3RhbmNlKCkuYWRkRWZmZWN0UG9vbEJ5SWQoR2FtZUVmZmVjdElkLmJvc3MyX25vcm1hbF9za2lsbF9oaXQsIDEpO1xyXG4gICAgICAgIHRoaXMuYWRkRGVhdGhDYWxsYmFjayh0aGlzLm9uRGVhdGgpO1xyXG4gICAgICAgIHRoaXMuYWRkWHVhbll1bkxpc3Rlbih0aGlzLm9uWHVhbll1blJlc3VsdCk7XHJcbiAgICAgICAgdGhpcy5hZGRCb3NzSW5pdGVkTGlzdGVuKHRoaXMub25Cb3NzSW5pdGVkKTtcclxuICAgICAgICB0aGlzLmFkZENoYW5nZUJvc3NIcExpc3Rlbih0aGlzLm9uQ2hhbmdlSHApO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgaXNFZmZDb20oKTogYm9vbGVhbiB7XHJcbiAgICAgICAgaWYgKHRoaXMuZWZmY29tcCA9PSB0cnVlKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmVmZmNvbXA7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChHYW1lRWZmZWN0c01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5tYXBfbm9kZV9wb29scy5oYXMoR2FtZUVmZmVjdElkLnh1YW55dW4pICYmXHJcbiAgICAgICAgICAgIEdhbWVFZmZlY3RzTWFuYWdlci5nZXRJbnN0YW5jZSgpLm1hcF9ub2RlX3Bvb2xzLmhhcyhHYW1lRWZmZWN0SWQuYm9zczJfbm9ybWFsX2F0dCkgJiZcclxuICAgICAgICAgICAgR2FtZUVmZmVjdHNNYW5hZ2VyLmdldEluc3RhbmNlKCkubWFwX25vZGVfcG9vbHMuaGFzKEdhbWVFZmZlY3RJZC5ib3NzMl9ub3JtYWxfYXR0X2hpdDEpICYmXHJcbiAgICAgICAgICAgIEdhbWVFZmZlY3RzTWFuYWdlci5nZXRJbnN0YW5jZSgpLm1hcF9ub2RlX3Bvb2xzLmhhcyhHYW1lRWZmZWN0SWQuYm9zczJfbm9ybWFsX3NraWxsKSAmJlxyXG4gICAgICAgICAgICBHYW1lRWZmZWN0c01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5tYXBfbm9kZV9wb29scy5oYXMoR2FtZUVmZmVjdElkLmJvc3MyX25vcm1hbF9za2lsbF9oaXQpKSB7XHJcbiAgICAgICAgICAgIHRoaXMuZWZmY29tcCA9IHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0aGlzLmVmZmNvbXA7XHJcbiAgICB9XHJcbiAgICBvbkJvc3NJbml0ZWQoKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5zdGFydElkbGUoKTtcclxuICAgICAgICB0aGlzLm5vZGUueSA9IDIyMjtcclxuICAgICAgICB0aGlzLnNraWxsX2NkID0gdGhpcy5za2lsbF9kYXRhLmdldFNraWxsQ29sZERvd24oMSk7XHJcbiAgICAgICAgdGhpcy5za2lsbF9qaXNodSA9IHRoaXMuc2tpbGxfY2QgLSB0aGlzLnNraWxsX2RhdGEuZ2V0U2tpbGxJbml0Q29sZERvd24oMSlcclxuICAgIH1cclxuXHJcbiAgICBvbkNoYW5nZUhwKG51bTogbnVtYmVyKSB7XHJcbiAgICAgICAgaWYgKG51bSA8IDApIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMuYm9zc19zaGllbGQpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuYm9zc19zaGllbGQuY2hhbmdlU2hpZWxkVmFsdWUobnVtKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBzdGFydElkbGUoKSB7XHJcbiAgICAgICAgc3VwZXIuc2V0RW5lbXlTdGF0ZShFbmVteV9TdGF0ZS5zdGFuZGJ5KTtcclxuICAgICAgICBzdXBlci5wbGF5U3BpbkFuaW1hdG9uKEFuaW1hdGlvbl9OYW1lLklkbGUsIHRydWUpO1xyXG5cclxuICAgIH1cclxuXHJcbiAgICBzdGFydEF0dGFjaygpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLmF0dF9qaXNodSA9IDA7XHJcbiAgICAgICAgc3VwZXIuc2V0RW5lbXlTdGF0ZShFbmVteV9TdGF0ZS5hdHQpO1xyXG4gICAgICAgIGxldCBkYXRhID0gbmV3IEtleUZyYW1lRGF0YSgpO1xyXG4gICAgICAgIGRhdGEubmFtZSA9ICdBdHRhY2snO1xyXG4gICAgICAgIGRhdGEuY2FsbGJhY2sgPSAoKSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuYXR0X2ppc2h1ID0gMDtcclxuICAgICAgICAgICAgR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zb3VuZF9tYW5hZ2VyLnBsYXlTb3VuZChTb3VuZEluZGV4LllYX0Jvc3MyQXR0YWNrKTtcclxuICAgICAgICAgICAgbGV0IG5vZGUgPSBHYW1lRWZmZWN0c01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5jcmVhdGVHYW1lRWZmZWN0QnlJZChHYW1lRWZmZWN0SWQuYm9zczJfbm9ybWFsX2F0dCwgc3VwZXIuZ2V0QXR0UG9zKCkpO1xyXG5cclxuICAgICAgICAgICAgbGV0IHN0YXJ0RW5kUG9zPWNjLnYyKEdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuY2hhclBvc1gsR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5lbmVteV9hdHRfeSk7XHJcbiAgICAgICAgICAgIGxldCBvZmZzZXRQb3M9c3RhcnRFbmRQb3Muc3ViKG5vZGUuZ2V0UG9zaXRpb24oKSk7XHJcbiAgICAgICAgICAgIGxldCBkaXI9TWF0aC5hdGFuMihvZmZzZXRQb3MueSxvZmZzZXRQb3MueCk7XHJcbiAgICAgICAgICAgIG5vZGUuZ2V0Q29tcG9uZW50KEJvc3NBdHQyKS5pbml0KHN1cGVyLmdldEF0dERhdGEoRGFtYWdlVHlwZS5Ob3JtYWwsIHRydWUpLCBHYW1lRWZmZWN0SWQuYm9zczJfbm9ybWFsX2F0dCwgMzAwLCBkaXIsIHRoaXMubm9kZS55LCAyNzApO1xyXG4gICAgICAgIH1cclxuICAgICAgICBzdXBlci5wbGF5U3BpbkFuaW1hdG9uKChBbmltYXRpb25fTmFtZS5hdHRhY2sxKSwgZmFsc2UsIGRhdGEsICgpID0+IHtcclxuICAgICAgICAgICAgaWYgKHRoaXMuc2tpbGxfd2FpdGluZyA9PSB0cnVlKSB7XHJcbiAgICAgICAgICAgICAgICBzdXBlci5zZXRFbmVteVN0YXRlKEVuZW15X1N0YXRlLnNraWxsKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuc3RhcnRTa2lsbCgpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zdGFydElkbGUoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pXHJcbiAgICB9XHJcblxyXG4gICAgc3RhcnRTa2lsbCgpIHtcclxuICAgICAgICB0aGlzLnNraWxsX2ppc2h1ID0gMDtcclxuICAgICAgICBpZiAoc3VwZXIuZ2V0RW5lbXlTdGF0ZSgpICE9IEVuZW15X1N0YXRlLmF0dCkge1xyXG4gICAgICAgICAgICBpZiAoIXN1cGVyLmlzSGF2ZURlQnVmZihCdWZmSWQuSGVyb19YdWFuWXVuKSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5za2lsbF93YWl0aW5nID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICBzdXBlci5zZXRFbmVteVN0YXRlKEVuZW15X1N0YXRlLnNraWxsKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2tpbGxfamlzaHUgPSAwO1xyXG4gICAgICAgICAgICAgICAgLyoq6YeK5pS+5oqA6IO977yM5peg5rOV6KKr5omT5patICovXHJcbiAgICAgICAgICAgICAgICB0aGlzLmN1cl90b3VnaG5lc3MgKz0gMTtcclxuICAgICAgICAgICAgICAgIHN1cGVyLnBsYXlTcGluQW5pbWF0b24oKEFuaW1hdGlvbl9OYW1lLnNraWxsMV8xKSwgZmFsc2UsIG51bGwsICgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBzdXBlci5wbGF5U3BpbkFuaW1hdG9uKChBbmltYXRpb25fTmFtZS5za2lsbDFfMiksIHRydWUpO1xyXG4gICAgICAgICAgICAgICAgICAgIC8qKua3u+WKoOWcsOihqCAqL1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBncm91bmQgPSBjYy5pbnN0YW50aWF0ZSh0aGlzLnByZWZhYl9ncm91bmQpO1xyXG4gICAgICAgICAgICAgICAgICAgIEdyb3VuZE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5ub2RlLmFkZENoaWxkKGdyb3VuZCk7XHJcbiAgICAgICAgICAgICAgICAgICAgZ3JvdW5kLnggPSB0aGlzLm5vZGUueDtcclxuICAgICAgICAgICAgICAgICAgICBncm91bmQueSA9IHRoaXMuZ2V0Q2VudGVyUG9zKCkueTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnNraWxsX3VzZV9udW0rKztcclxuICAgICAgICAgICAgICAgICAgICAvKirmt7vliqDkuJPnlKjnmoTmiqTnm74gKi9cclxuICAgICAgICAgICAgICAgICAgICBsZXQgbm9kZSA9IGNjLmluc3RhbnRpYXRlKHRoaXMucHJlZmFiX3NoaWVsZCk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5ib3NzX3NoaWVsZCA9IG5vZGUuZ2V0Q29tcG9uZW50KEJvc3NTaGllbGQyKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmJvc3Nfc2hpZWxkLmluaXQodGhpcy5za2lsbF91c2VfbnVtLCBTaGllbGRUeXBlLlNraWxsLCA4LCBzdXBlci5nZXRNYXhIcCgpICogdGhpcy5za2lsbF9kYXRhLmdldFNraWxsVmFsdWUxKDEpLCBncm91bmQsIHRoaXMub25TaGllbGREZXN0b3J5LmJpbmQodGhpcykpO1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBidWZmRGF0YSA9IG5ldyBCdWZmRGF0YSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIGJ1ZmZEYXRhLmJ1ZmZfaWQgPSBCdWZmSWQuQm9zczJfTWlhbllpX0F0dGFjaztcclxuICAgICAgICAgICAgICAgICAgICBidWZmRGF0YS5yZW1haW5fdGltZSA9IDg7XHJcbiAgICAgICAgICAgICAgICAgICAgR2FtZUVmZmVjdHNNYW5hZ2VyLmdldEluc3RhbmNlKCkubm9kZS5hZGRDaGlsZChub2RlKTtcclxuICAgICAgICAgICAgICAgICAgICBub2RlLnNldFBvc2l0aW9uKGNjLnYyKC04LCB0aGlzLm5vZGUueSArIDY0ICogdGhpcy5zZXR1cF9zY2FsZSkpO1xyXG4gICAgICAgICAgICAgICAgICAgIHN1cGVyLmFkZEJ1ZmYoYnVmZkRhdGEpO1xyXG5cclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNraWxsX3dhaXRpbmcgPSB0cnVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5za2lsbF93YWl0aW5nID0gdHJ1ZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgfVxyXG4gICAgLyoq5oqk55u+6ZSA5q+B5pe25Zue6LCD77yMaXNBdXRv77ya5piv5ZCm6Ieq54iGKOaXtumXtOe7k+adnykgKi9cclxuICAgIG9uU2hpZWxkRGVzdG9yeShpc0F1dG86IGJvb2xlYW4pIHtcclxuICAgICAgICB0aGlzLmJvc3Nfc2hpZWxkID0gbnVsbDtcclxuICAgICAgICB0aGlzLnNraWxsX2ppc2h1ID0gMDtcclxuICAgICAgICBpZiAoaXNBdXRvKSB7XHJcbiAgICAgICAgICAgIC8v5aaC5p6c5LiN5piv6Ieq54iG77yM5Y+N5Ye7XHJcbiAgICAgICAgICAgIHRoaXMuc3RhcnRTaGllbGRBdHRhY2soKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLmN1cl90b3VnaG5lc3MgLT0gMTtcclxuICAgICAgICAgICAgbGV0IGJ1ZmZEYXRhID0gbmV3IEJ1ZmZEYXRhKCk7XHJcbiAgICAgICAgICAgIGJ1ZmZEYXRhLmJ1ZmZfaWQgPSBCdWZmSWQuSGVyb19YdWFuWXVuO1xyXG4gICAgICAgICAgICBidWZmRGF0YS5nYW1lX2VmZmVjdF9pZCA9IEdhbWVFZmZlY3RJZC54dWFueXVuO1xyXG4gICAgICAgICAgICBidWZmRGF0YS5yZW1haW5fdGltZSA9IDM7XHJcbiAgICAgICAgICAgIGJ1ZmZEYXRhLmJ1ZmZfdHlwZSA9IEJ1ZmZUeXBlLlZlcnRpZ287XHJcbiAgICAgICAgICAgIHN1cGVyLmFkZERlQnVmZihidWZmRGF0YSwgbnVsbCk7XHJcbiAgICAgICAgICAgIHN1cGVyLnN1YkJ1ZmYoQnVmZklkLkJvc3MyX01pYW5ZaV9BdHRhY2spO1xyXG4gICAgICAgICAgICBzdXBlci5jaGFuZ2VIcCgtdGhpcy5nZXRNYXhIcCgpICogMC4yNSk7XHJcbiAgICAgICAgICAgIE15VG9vbC5yYW5kb21TY2VuZVNoYWtlKC0xNiwgMTYsIDAuMDIsIDEwKTtcclxuICAgICAgICAgICAgLy90aGlzLnN0YXJ0SWRsZSgpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBzdGFydFNoaWVsZEF0dGFjaygpIHtcclxuICAgICAgICBsZXQgZGF0YSA9IG5ldyBLZXlGcmFtZURhdGEoKTtcclxuICAgICAgICBkYXRhLmNhbGxiYWNrID0gKCkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLmN1cl90b3VnaG5lc3MgLT0gMTtcclxuICAgICAgICAgICAgc3VwZXIuc3ViQnVmZihCdWZmSWQuQm9zczJfTWlhbllpX0F0dGFjayk7XHJcbiAgICAgICAgICAgIEdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuc291bmRfbWFuYWdlci5wbGF5U291bmQoU291bmRJbmRleC5ZWF9Cb3NzQXR0YWNrR3VvZHUpO1xyXG4gICAgICAgICAgICBsZXQgbm9kZSA9IEdhbWVFZmZlY3RzTWFuYWdlci5nZXRJbnN0YW5jZSgpLmNyZWF0ZUdhbWVFZmZlY3RCeUlkKEdhbWVFZmZlY3RJZC5ib3NzMl9ub3JtYWxfc2tpbGwsIHRoaXMubm9kZS5nZXRQb3NpdGlvbigpKTtcclxuICAgICAgICAgICAgbm9kZS5nZXRDb21wb25lbnQoU2hpZWxkQXR0YWNrMikuc2V0Qm9zc1Bvcyh0aGlzLm5vZGUuZ2V0UG9zaXRpb24oKSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGRhdGEubmFtZSA9ICdTa2lsbCc7XHJcbiAgICAgICAgc3VwZXIucGxheVNwaW5BbmltYXRvbigoQW5pbWF0aW9uX05hbWUuc2tpbGwxXzMpLCBmYWxzZSwgZGF0YSwgKCkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLnN0YXJ0SWRsZSgpO1xyXG4gICAgICAgIH0pXHJcbiAgICB9XHJcblxyXG4gICAgb25EZWF0aCgpIHtcclxuICAgICAgICB0aGlzLnVuc2NoZWR1bGVBbGxDYWxsYmFja3MoKTtcclxuICAgICAgICBzdXBlci5wbGF5RGVhZEFuaW1hdG9uKEFuaW1hdGlvbl9OYW1lLmRlYWQsICgpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5yZW1vdmVBbGxEZUJ1ZmYoKTtcclxuICAgICAgICAgICAgdGhpcy5yZW1vdmVBbGxCdWZmKCk7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLnNoYWRvdykge1xyXG4gICAgICAgICAgICAgICAgY2MudHdlZW4odGhpcy5zaGFkb3cpLnRvKDAuNzUsIHsgb3BhY2l0eTogMCB9KS5zdGFydCgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGNjLnR3ZWVuKHRoaXMubm9kZSkudG8oMC43NSwgeyBvcGFjaXR5OiAwIH0pLmNhbGwoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5yZW1vdmVBbGxEZUJ1ZmYoKTtcclxuICAgICAgICAgICAgICAgIHRoaXMucmVtb3ZlQWxsQnVmZigpO1xyXG4gICAgICAgICAgICAgICAgTW9uc3Rlck1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5kZXN0cm95TW9uc3Rlcih0aGlzLm5vZGUsIHRoaXMubW9uc3Rlcl90eXBlKTtcclxuICAgICAgICAgICAgfSkuc3RhcnQoKTtcclxuICAgICAgICB9KVxyXG4gICAgICAgIC8vR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zb3VuZF9tYW5hZ2VyLnBsYXlTb3VuZChTb3VuZEluZGV4LnJld2FyZEJveDIpO1xyXG4gICAgICAgIC8v5Yig6ZmkXHJcbiAgICAgICAgaWYgKHRoaXMuYm9zc19zaGllbGQpIHtcclxuICAgICAgICAgICAgdGhpcy5ib3NzX3NoaWVsZC5kZXN0b3J5U2hpZWxkKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIG9uWHVhbll1blJlc3VsdChpc1h1YW5ZdW46IGJvb2xlYW4pIHtcclxuICAgICAgICBpZiAoaXNYdWFuWXVuKSB7XHJcbiAgICAgICAgICAgIHRoaXMuc3RhcnRYdWFuWXVuKCk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgaWYgKCFzdXBlci5pc0hhdmVEZUJ1ZmZUeXBlKEJ1ZmZUeXBlLlZlcnRpZ28pKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoIXN1cGVyLmdldElzRGllKCkpIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5za2lsbF93YWl0aW5nID09IHRydWUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgc3VwZXIuc2V0RW5lbXlTdGF0ZShFbmVteV9TdGF0ZS5za2lsbCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc3RhcnRTa2lsbCgpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc3RhcnRJZGxlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHN0YXJ0WHVhbll1bigpIHtcclxuICAgICAgICB0aGlzLnNraWxsX3dhaXRpbmcgPSBmYWxzZTtcclxuICAgICAgICBzdXBlci5wbGF5U3BpbkFuaW1hdG9uKEFuaW1hdGlvbl9OYW1lLmh1cnQxLCBmYWxzZSwgbnVsbCwgKCkgPT4ge1xyXG4gICAgICAgICAgICBpZiAoc3VwZXIuaXNIYXZlRGVCdWZmVHlwZShCdWZmVHlwZS5WZXJ0aWdvKSAmJiAhc3VwZXIuZ2V0SXNEaWUoKSlcclxuICAgICAgICAgICAgICAgIHRoaXMuc3BpbmUucGF1c2VkID0gdHJ1ZTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICB1cGRhdGUoZHQpIHtcclxuICAgICAgICBpZiAoKEdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuY3VyX2dhbWVfc3RhdGUgIT0gR2FtZVN0YXRlLkdhbWVfUGxheWluZykgfHwgdGhpcy5nZXRJc0RpZSgpKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgc3VwZXIudXBkYXRlKGR0KTtcclxuICAgICAgICB0aGlzLmNoZWNrU2tpbGwoZHQpO1xyXG4gICAgICAgIGlmICh0aGlzLmdldEVuZW15U3RhdGUoKSAhPSBFbmVteV9TdGF0ZS5za2lsbCYmdGhpcy5pc0VmZkNvbSgpJiZ0aGlzLmdldEVuZW15U3RhdGUoKSAhPSBFbmVteV9TdGF0ZS5hdHQpIHtcclxuICAgICAgICAgICAgaWYgKCF0aGlzLmlzSGF2ZURlQnVmZihCdWZmSWQuSGVyb19YdWFuWXVuKSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jaGVja0F0dChkdCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoq5oqA6IO95qOA5rWLICovXHJcbiAgICBjaGVja1NraWxsKGR0OiBudW1iZXIpIHtcclxuICAgICAgICB0aGlzLnNraWxsX2ppc2h1ICs9IGR0O1xyXG4gICAgICAgIGlmICghdGhpcy5pc0hhdmVEZUJ1ZmYoQnVmZklkLkhlcm9fWHVhbll1bikmJnRoaXMuaXNFZmZDb20oKSkge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5za2lsbF9qaXNodSA+PSB0aGlzLnNraWxsX2NkKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNraWxsX2ppc2h1ID0gdGhpcy5za2lsbF9jZDtcclxuICAgICAgICAgICAgICAgIHRoaXMuc3RhcnRTa2lsbCgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKuaUu+WHu+iuoeeulyAqL1xyXG4gICAgY2hlY2tBdHQoZHQ6IG51bWJlcikge1xyXG4gICAgICAgIHRoaXMuYXR0X2ppc2h1ICs9IGR0O1xyXG4gICAgICAgIGlmICh0aGlzLmF0dF9qaXNodSA+PSB0aGlzLmF0dF9qaWFuZ2UpIHtcclxuICAgICAgICAgICAgdGhpcy5hdHRfamlzaHUgPSB0aGlzLmF0dF9qaWFuZ2U7XHJcbiAgICAgICAgICAgIHRoaXMuc3RhcnRBdHRhY2soKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAvL3RoaXMubW92aW5nKGR0KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuIl19