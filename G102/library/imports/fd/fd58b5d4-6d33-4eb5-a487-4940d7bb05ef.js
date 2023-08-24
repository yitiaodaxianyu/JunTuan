"use strict";
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