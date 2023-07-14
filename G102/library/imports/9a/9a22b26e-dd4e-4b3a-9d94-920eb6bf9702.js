"use strict";
cc._RF.push(module, '9a22bJu3U5LOp2Ukg62v5cC', 'Boss9');
// Scripts/Boss/Boss9/Boss9.ts

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
var GameManager_1 = require("../../GameManager");
var BuffData_1 = require("../../Hero/Game/BuffData");
var HeroConfig_1 = require("../../Hero/Game/HeroConfig");
var MonsterBullet_1 = require("../../Monster/MonsterBullet");
var MonsterData_1 = require("../../Monster/MonsterData");
var MonsterManager_1 = require("../../Monster/MonsterManager");
var AudioConstants_1 = require("../../Sound/AudioConstants");
var WallManager_1 = require("../../Wall/WallManager");
var Boss_1 = require("../Boss");
var Animation_Name;
(function (Animation_Name) {
    Animation_Name["Idle"] = "Idle";
    Animation_Name["attack"] = "Attack1";
    Animation_Name["run"] = "Run";
    Animation_Name["hurt1"] = "Hurt";
    Animation_Name["skill2"] = "Skill2";
    Animation_Name["skill2_1"] = "Skill2_1";
    Animation_Name["skill2_2"] = "Skill2_2";
    Animation_Name["skill2_3"] = "Skill2_3";
    Animation_Name["dead"] = "Dead";
})(Animation_Name || (Animation_Name = {}));
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var Boss9 = /** @class */ (function (_super) {
    __extends(Boss9, _super);
    function Boss9() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.mao_yan = [];
        _this.is_active_skill_3 = false;
        _this.skill_num = 0;
        _this.att_num = 0;
        /**是否处于引导中 */
        _this.is_yindao = true;
        /**喷火节点 */
        _this.fire_node = null;
        /**喷火次数 */
        _this.pen_huo_num = 0;
        /**引导的计数 */
        _this.yindao_jishu = 0;
        /**缩放速度 */
        _this.scale_speed = 16;
        /**一倍的缩放值的距离间隔 */
        _this.once_distance = 0;
        /**总的引导时间 */
        _this.yindao_time = 1;
        _this.kuangbao_value = [];
        _this.skill_pos = cc.v2();
        /**是否过载 */
        _this.is_guozai = false;
        _this.bao_lie_jishu = 0;
        /**无敌护盾 */
        _this.wudi_hudu = null;
        return _this;
    }
    Boss9.prototype.onLoad = function () {
        _super.prototype.onLoad.call(this);
        GameEffectsManager_1.GameEffectsManager.getInstance().addEffectPoolById(GameEffectsManager_1.GameEffectId.boss9_attack_bullect, 1);
        GameEffectsManager_1.GameEffectsManager.getInstance().addEffectPoolById(GameEffectsManager_1.GameEffectId.boss9_attack_bullect_hit, 1);
        GameEffectsManager_1.GameEffectsManager.getInstance().addEffectPoolById(GameEffectsManager_1.GameEffectId.boss9_skill2_penhuo, 1);
        GameEffectsManager_1.GameEffectsManager.getInstance().addEffectPoolById(GameEffectsManager_1.GameEffectId.boss9_skill3_hudun, 1);
        GameEffectsManager_1.GameEffectsManager.getInstance().addEffectPoolById(GameEffectsManager_1.GameEffectId.boss9_skill3_baolie, 4);
        this.addDeathCallback(this.onDeath);
        this.addXuanYunListen(this.onXuanYunResult);
        this.addBossInitedListen(this.onBossInited);
        this.addChangeBossHpListen(this.onChangeHp);
        this.setMaoYan(false);
    };
    Boss9.prototype.onBossInited = function () {
        this.startIdle();
        this.node.y = 128;
        this.skill_num = 0;
        this.skill_pos = this.node.getChildByName('skill').getPosition();
        var distance = this.getSkillPos().y - WallManager_1.default.getInstance().getMainWall().getWallMaxYY();
        this.once_distance = distance / 4;
        this.is_active_skill_3 = false;
    };
    Boss9.prototype.onChangeHp = function (num) {
        if (this.cur_hp <= this.max_hp * 0.1) {
            if (this.is_active_skill_3 == false) {
                this.is_active_skill_3 = true;
                this.startSkill(3);
            }
        }
    };
    Boss9.prototype.setMaoYan = function (isShow) {
        for (var i = 0; i < this.mao_yan.length; i++) {
            this.mao_yan[i].active = isShow;
        }
    };
    Boss9.prototype.startIdle = function () {
        _super.prototype.setEnemyState.call(this, EnemyConfig_1.Enemy_State.standby);
        _super.prototype.playSpinAnimaton.call(this, Animation_Name.Idle, true);
    };
    Boss9.prototype.startAttack = function () {
        var _this = this;
        this.att_jishu = 0;
        _super.prototype.setEnemyState.call(this, EnemyConfig_1.Enemy_State.att);
        var data = new MonsterData_1.KeyFrameData();
        data.name = 'Attack';
        data.callback = function () {
            _this.att_jishu = 0;
            GameManager_1.default.getInstance().sound_manager.playSound(AudioConstants_1.SoundIndex.YX_BOSS9Attack);
            var bullect = GameEffectsManager_1.GameEffectsManager.getInstance().createGameEffectById(GameEffectsManager_1.GameEffectId.boss9_attack_bullect, _this.getAttPos());
            bullect.getComponent(MonsterBullet_1.default).init(_this.getAttData(HeroConfig_1.DamageType.Normal, true), GameEffectsManager_1.GameEffectId.boss9_attack_bullect, GameEffectsManager_1.GameEffectId.boss9_attack_bullect_hit, 1500, Math.PI * 3 / 2);
            _this.att_num++;
            if (_this.att_num >= 3) {
                _this.att_num = 0;
                _this.skill_queue.push(2);
            }
        };
        _super.prototype.playSpinAnimaton.call(this, (Animation_Name.attack), false, data, function () {
            if (_this.skill_queue.length > 0) {
                _super.prototype.setEnemyState.call(_this, EnemyConfig_1.Enemy_State.standby);
                _this.startSkill(_this.skill_queue.shift());
            }
            else {
                _this.startIdle();
            }
        });
    };
    Boss9.prototype.getSkillPos = function () {
        var disPos = this.node.getPosition().add(cc.v2(this.skill_pos.x * this.node.scaleX, this.skill_pos.y * this.node.scaleY));
        return disPos;
    };
    Boss9.prototype.startSkill = function (skillIndex) {
        switch (skillIndex) {
            case 1:
                {
                    this.startSkill1();
                }
                break;
            case 2:
                {
                    this.startSkill2();
                }
                break;
            case 3:
                {
                    if (this.is_active_skill_3) {
                        this.startSkill3();
                    }
                }
                break;
        }
    };
    //过载
    Boss9.prototype.startSkill1 = function () {
        if (this.isHaveBuff(HeroConfig_1.BuffId.Boss9_Skill_1_guozai) == false) {
            var buffData = new BuffData_1.BuffData();
            buffData.buff_id = HeroConfig_1.BuffId.Boss9_Skill_1_guozai;
            buffData.remain_time = this.skill_data.getSkillValue4(1);
            buffData.buff_value = [this.skill_data.getSkillValue2(1), this.skill_data.getSkillValue3(1)];
            var buff = _super.prototype.addBuff.call(this, buffData);
            buff.addDestroyListen(this.onSkill1End.bind(this));
            //过载表现效果
            //全身通红
            this.is_guozai = true;
            //冒烟+随机爆裂效果
            this.setMaoYan(true);
            //抖动的效果
        }
    };
    Boss9.prototype.onSkill1End = function () {
        this.is_guozai = false;
        this.node.color = cc.Color.WHITE;
        this.setMaoYan(false);
    };
    //喷火
    Boss9.prototype.startSkill2 = function () {
        var _this = this;
        var skillNo = 2;
        var skillIndex = skillNo - 1;
        this.skill_cold_down[skillIndex] = this.skill_data.getSkillColdDown(skillNo);
        if (_super.prototype.getEnemyState.call(this) != EnemyConfig_1.Enemy_State.att && _super.prototype.getEnemyState.call(this) != EnemyConfig_1.Enemy_State.skill) {
            if (!_super.prototype.isHaveDeBuff.call(this, HeroConfig_1.BuffId.Hero_XuanYun)) {
                GameManager_1.default.getInstance().sound_manager.playSound(AudioConstants_1.SoundIndex.YX_Boss4Skill);
                _super.prototype.setEnemyState.call(this, EnemyConfig_1.Enemy_State.skill);
                this.skill_cold_down[skillIndex] = this.skill_data.getSkillColdDown(skillNo);
                _super.prototype.playSpinAnimaton.call(this, (Animation_Name.skill2_1), false, null, function () {
                    _super.prototype.playSpinAnimaton.call(_this, (Animation_Name.skill2_2), true, null, null);
                    _this.is_yindao = true;
                    _this.yindao_time = 3;
                    var pos = _this.getSkillPos();
                    _this.fire_node = GameEffectsManager_1.GameEffectsManager.getInstance().createGameEffectById(GameEffectsManager_1.GameEffectId.boss9_skill2_penhuo, pos);
                    _this.fire_node.scale = 0;
                    _this.fire_node.angle = 180;
                    _this.pen_huo_num = 0;
                });
            }
            else {
                if (this.skill_queue.indexOf(skillNo) < 0) {
                    this.skill_queue.push(skillNo);
                }
            }
        }
        else {
            if (this.skill_queue.indexOf(skillNo) < 0) {
                this.skill_queue.push(skillNo);
            }
        }
    };
    Boss9.prototype.startSkill3 = function () {
        //护盾+加血+无敌
        var skillNo = 3;
        var skillIndex = skillNo - 1;
        this.skill_cold_down[skillIndex] = this.skill_data.getSkillColdDown(skillNo);
        //打断        
        this.startIdle();
        this.setEnemyState(EnemyConfig_1.Enemy_State.skill);
        var buffData = new BuffData_1.BuffData();
        buffData.buff_id = HeroConfig_1.BuffId.Boss9_Skill_3_widu;
        buffData.remain_time = this.skill_data.getSkillValue2(3);
        buffData.recovery_jiange_time = 0.2;
        var hp = this.skill_data.getSkillValue1(3) * this.getMaxHp() / (buffData.remain_time / buffData.recovery_jiange_time);
        buffData.buff_value = [hp];
        var buff = _super.prototype.addBuff.call(this, buffData);
        buff.addDestroyListen(this.onSkill3End.bind(this));
        this.wudi_hudu = GameEffectsManager_1.GameEffectsManager.getInstance().createGameEffectById(GameEffectsManager_1.GameEffectId.boss9_skill3_hudun, this.node.getPosition());
    };
    Boss9.prototype.onSkill3End = function () {
        GameEffectsManager_1.GameEffectsManager.getInstance().destroyGameEffectById(GameEffectsManager_1.GameEffectId.boss9_skill3_hudun, this.wudi_hudu);
        if (this.skill_queue.length > 0) {
            _super.prototype.setEnemyState.call(this, EnemyConfig_1.Enemy_State.standby);
            this.startSkill(this.skill_queue.shift());
        }
        else {
            this.startIdle();
        }
    };
    Boss9.prototype.addSkillNum = function () {
        this.skill_num++;
        if (this.skill_num >= this.skill_data.getSkillValue1(1)) {
            //过载
            this.startSkill1();
        }
    };
    Boss9.prototype.fireDamage = function (wall) {
        if (GameManager_1.default.getInstance().cur_game_state == Constants_1.GameState.Game_Playing) {
            this.addSkillNum();
            //播放动画
            //let pos=cc.v2(super.getAttPos().x,wall.getWallMaxYY()-32);         
            var attData = _super.prototype.getAttData.call(this, HeroConfig_1.DamageType.Skill, false, this.skill_data.getSkillValue1(2));
            attData.is_big = false;
            attData.zengshang_rate += this.pen_huo_num * this.skill_data.getSkillValue2(2);
            var data = wall.beInjured(attData); //
            if (data.getDamageNum() > 0) {
                this.pen_huo_num++;
            }
        }
    };
    /**销毁喷火特效 */
    Boss9.prototype.destroyFire = function (isIdle) {
        var _this = this;
        this.is_yindao = false;
        if (this.fire_node) {
            cc.tween(this.fire_node).to(0.2, { scale: 0 }).call(function () {
                GameEffectsManager_1.GameEffectsManager.getInstance().destroyGameEffectById(GameEffectsManager_1.GameEffectId.boss9_skill2_penhuo, _this.fire_node);
            }).start();
        }
        if (isIdle) {
            _super.prototype.playSpinAnimaton.call(this, (Animation_Name.skill2_3), false, null, function () {
                _this.startIdle();
            });
        }
    };
    Boss9.prototype.onDeath = function () {
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
        this.destroyFire(false);
        //删除
        // if(this.boss_shield){
        //     this.boss_shield.destoryShield();
        // }        
    };
    Boss9.prototype.onXuanYunResult = function (isXuanYun) {
        if (isXuanYun) {
            this.startXuanYun();
        }
        else {
            if (!_super.prototype.isHaveDeBuffType.call(this, HeroConfig_1.BuffType.Vertigo)) {
                if (!_super.prototype.getIsDie.call(this)) {
                    if (this.skill_queue.length > 0) {
                        _super.prototype.setEnemyState.call(this, EnemyConfig_1.Enemy_State.standby);
                        this.startSkill(this.skill_queue.shift());
                    }
                    else {
                        this.startIdle();
                    }
                }
            }
        }
    };
    Boss9.prototype.startXuanYun = function () {
        var _this = this;
        this.destroyFire(false);
        _super.prototype.playSpinAnimaton.call(this, Animation_Name.hurt1, false, null, function () {
            if (_super.prototype.isHaveDeBuffType.call(_this, HeroConfig_1.BuffType.Vertigo) && !_super.prototype.getIsDie.call(_this))
                _this.spine.paused = true;
        });
    };
    Boss9.prototype.update = function (dt) {
        if ((GameManager_1.default.getInstance().cur_game_state != Constants_1.GameState.Game_Playing) || this.getIsDie()) {
            return;
        }
        _super.prototype.update.call(this, dt);
        //this.checkSkill(dt);
        this.checkYinDao(dt);
        if (this.getEnemyState() != EnemyConfig_1.Enemy_State.skill) {
            if (!this.isHaveDeBuff(HeroConfig_1.BuffId.Hero_XuanYun)) {
                this.checkAtt(dt);
            }
        }
        if (this.is_guozai) {
            this.node.color = cc.Color.RED;
            this.bao_lie_jishu += dt;
            if (this.bao_lie_jishu >= 0.2) {
                this.bao_lie_jishu = 0;
                var center = this.getJuJiPos();
                var banjing = Math.random() * 200;
                var hudu = Math.random() * (Math.PI * 2);
                var xx = center.x + Math.cos(hudu) * banjing;
                var yy = center.y + Math.sin(hudu) * banjing;
                GameEffectsManager_1.GameEffectsManager.getInstance().createGameEffectById(GameEffectsManager_1.GameEffectId.boss9_skill3_baolie, cc.v2(xx, yy));
            }
        }
    };
    Boss9.prototype.checkYinDao = function (dt) {
        var _this = this;
        if (this.is_yindao) {
            if (this.fire_node) {
                var walls = WallManager_1.default.getInstance().getAllWall();
                var attWall_1 = null;
                walls.forEach(function (wall, wallType) {
                    //攻击城墙的条件1，必须在城墙之上,2达到攻击距离
                    if (_this.node.y >= wall.getWallMaxYY()) {
                        attWall_1 = wall;
                    }
                });
                if (attWall_1) {
                    var distance = _super.prototype.getAttPos.call(this).y - attWall_1.getWallMaxYY();
                    var maxScale = distance / this.once_distance + 1;
                    //根据距离算出缩放值，最小1倍，最大6倍
                    if (this.fire_node.scale >= maxScale) {
                        this.fire_node.scale = maxScale;
                        this.yindao_jishu += dt;
                        if (this.yindao_jishu >= 0.2) {
                            this.yindao_jishu = 0;
                            this.fireDamage(attWall_1);
                        }
                    }
                    else {
                        this.fire_node.scale += this.scale_speed * dt;
                    }
                }
            }
            this.yindao_time -= dt;
            if (this.yindao_time <= 0) {
                this.yindao_time = 0;
                this.destroyFire(true);
            }
        }
    };
    /**技能检测 */
    Boss9.prototype.checkSkill = function (dt) {
        for (var i = 0; i < 2; i++) {
            if (this.skill_cold_down[i] > 0) {
                this.skill_cold_down[i] -= dt;
                if (this.skill_cold_down[i] < 0) {
                    this.skill_cold_down[i] = 0;
                    this.startSkill(i + 1);
                }
            }
        }
    };
    /**攻击计算 */
    Boss9.prototype.checkAtt = function (dt) {
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
        property([cc.Node])
    ], Boss9.prototype, "mao_yan", void 0);
    Boss9 = __decorate([
        ccclass
    ], Boss9);
    return Boss9;
}(Boss_1.default));
exports.default = Boss9;

cc._RF.pop();