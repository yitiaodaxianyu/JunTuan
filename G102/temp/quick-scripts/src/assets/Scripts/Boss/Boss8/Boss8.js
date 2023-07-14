"use strict";
cc._RF.push(module, '3835awXS39Baoe6Dg21v00/', 'Boss8');
// Scripts/Boss/Boss8/Boss8.ts

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
var MonsterBullet_1 = require("../../Monster/MonsterBullet");
var MonsterData_1 = require("../../Monster/MonsterData");
var MonsterManager_1 = require("../../Monster/MonsterManager");
var AudioConstants_1 = require("../../Sound/AudioConstants");
var Boss_1 = require("../Boss");
var BossSkill8_1 = require("./BossSkill8");
var Animation_Name;
(function (Animation_Name) {
    Animation_Name["Idle"] = "Idle";
    Animation_Name["attack"] = "Attack1";
    Animation_Name["run"] = "Run";
    Animation_Name["hurt1"] = "Hurt";
    Animation_Name["skill1_1"] = "Skill1_1";
    Animation_Name["skill1_2"] = "Skill1_2";
    Animation_Name["skill1_3"] = "Skill1_3";
    Animation_Name["skill1_4"] = "Skill1_4";
    Animation_Name["skill1_5"] = "Skill1_5";
    Animation_Name["skill1_6"] = "Skill1_6";
    Animation_Name["skill2"] = "Skill2";
    Animation_Name["skill3"] = "Skill3";
    Animation_Name["dead"] = "Dead";
})(Animation_Name || (Animation_Name = {}));
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var Boss8 = /** @class */ (function (_super) {
    __extends(Boss8, _super);
    function Boss8() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.att_num = 0;
        _this.is_active_skill_3 = false;
        _this.kuangbao_value = [];
        _this.is_kuang_bao = false;
        /**当前的召唤索引 */
        _this.cur_zhaohuan_index = 0;
        _this.skill_pos = cc.v2();
        /**钻地动作，尾部相对头部的坐标 */
        _this.wei_zuandi_pos = cc.v2(0, 0);
        /**出地动作，尾部相对头部的坐标 */
        _this.wei_chudi_pos = cc.v2(0, 0);
        _this.wei_node = null;
        return _this;
    }
    Boss8.prototype.onLoad = function () {
        _super.prototype.onLoad.call(this);
        GameEffectsManager_1.GameEffectsManager.getInstance().addEffectPoolById(GameEffectsManager_1.GameEffectId.boss8_attack_bullect, 1);
        GameEffectsManager_1.GameEffectsManager.getInstance().addEffectPoolById(GameEffectsManager_1.GameEffectId.boss8_attack_bullect_hit, 1);
        GameEffectsManager_1.GameEffectsManager.getInstance().addEffectPoolById(GameEffectsManager_1.GameEffectId.boss8_skill_bullect, 4);
        GameEffectsManager_1.GameEffectsManager.getInstance().addEffectPoolById(GameEffectsManager_1.GameEffectId.boss8_skill_bullect_hit, 4);
        GameEffectsManager_1.GameEffectsManager.getInstance().addEffectPoolById(GameEffectsManager_1.GameEffectId.xuanyun, 2);
        this.addDeathCallback(this.onDeath);
        this.addXuanYunListen(this.onXuanYunResult);
        this.addBossInitedListen(this.onBossInited);
        this.addChangeBossHpListen(this.onChangeHp);
    };
    Boss8.prototype.onBossInited = function () {
        this.startIdle();
        this.node.y = 128;
        this.kuangbao_value[0] = this.skill_data.getSkillValue1(3);
        this.skill_pos = this.node.getChildByName('skill').getPosition();
        this.wei_node = new cc.Node("wei");
        var weiSp = this.wei_node.addComponent(sp.Skeleton);
        weiSp.skeletonData = (this.spine.skeletonData);
        GroundManager_1.default.getInstance().node.addChild(this.wei_node);
        this.wei_node.setPosition(this.node.getPosition());
        this.wei_node.active = false;
        this.shadow.active = false;
    };
    Boss8.prototype.onChangeHp = function (num) {
        if (this.cur_hp <= this.max_hp * 0.3) {
            if (this.is_active_skill_3 == false && this.skill_cold_down[2] <= 0) {
                this.is_active_skill_3 = true;
                this.startSkill(3);
            }
        }
        else {
            if (this.is_active_skill_3 == true) {
                this.is_active_skill_3 = false;
                this.setKuangBao(false);
            }
        }
    };
    Boss8.prototype.startIdle = function () {
        _super.prototype.setEnemyState.call(this, EnemyConfig_1.Enemy_State.standby);
        _super.prototype.playSpinAnimaton.call(this, Animation_Name.Idle, true);
    };
    Boss8.prototype.startAttack = function () {
        var _this = this;
        this.att_jishu = 0;
        _super.prototype.setEnemyState.call(this, EnemyConfig_1.Enemy_State.att);
        var data = new MonsterData_1.KeyFrameData();
        data.name = 'Attack';
        data.callback = function () {
            _this.att_jishu = 0;
            GameManager_1.default.getInstance().sound_manager.playSound(AudioConstants_1.SoundIndex.YX_BOSS8Attack);
            var bullect = GameEffectsManager_1.GameEffectsManager.getInstance().createGameEffectById(GameEffectsManager_1.GameEffectId.boss8_attack_bullect, _this.getAttPos());
            bullect.getComponent(MonsterBullet_1.default).init(_this.getAttData(HeroConfig_1.DamageType.Normal, true), GameEffectsManager_1.GameEffectId.boss8_attack_bullect, GameEffectsManager_1.GameEffectId.boss8_attack_bullect_hit, 1600, Math.PI * 3 / 2);
            _this.att_num++;
            if (_this.att_num >= 5) {
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
    Boss8.prototype.startSkill = function (skillIndex) {
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
    //钻地
    Boss8.prototype.startSkill1 = function () {
        var _this = this;
        var skillNo = 1;
        var skillIndex = skillNo - 1;
        this.skill_cold_down[skillIndex] = this.skill_data.getSkillColdDown(skillNo);
        if (_super.prototype.getEnemyState.call(this) != EnemyConfig_1.Enemy_State.att && _super.prototype.getEnemyState.call(this) != EnemyConfig_1.Enemy_State.skill) {
            if (!_super.prototype.isHaveDeBuff.call(this, HeroConfig_1.BuffId.Hero_XuanYun)) {
                _super.prototype.setEnemyState.call(this, EnemyConfig_1.Enemy_State.skill);
                this.skill_cold_down[skillIndex] = this.skill_data.getSkillColdDown(skillNo);
                _super.prototype.playSpinAnimaton.call(this, (Animation_Name.skill1_1), false, null, function () {
                    _super.prototype.playSpinAnimaton.call(_this, (Animation_Name.skill1_2), true, null, null);
                    _this.unschedule(_this.startZuanDi);
                    _this.scheduleOnce(_this.startZuanDi, 2);
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
    Boss8.prototype.startZuanDi = function () {
        var _this = this;
        if (!_super.prototype.isHaveDeBuff.call(this, HeroConfig_1.BuffId.Hero_XuanYun) && this.getIsDie() == false) {
            //钻地的过程是免控的
            this.cur_toughness += 1;
            //显示尾部，同时播放钻地动作
            this.wei_node.active = true;
            var weiSp = this.wei_node.getComponent(sp.Skeleton);
            var weiAnima_1 = weiSp.setAnimation(0, Animation_Name.skill1_4, false);
            weiSp.setTrackCompleteListener(weiAnima_1, function (entry, event) {
                weiAnima_1.listener = null;
                _this.wei_node.active = false;
            });
            // let data=new KeyFrameData();
            //     data.name='Skill';
            //     data.callback=()=>{
            //     }
            _super.prototype.playSpinAnimaton.call(this, (Animation_Name.skill1_3), false, null, function () {
                //开始回血
                //super.setEnemyState(Enemy_State.born);
                _this.node.getComponent(cc.Collider).enabled = false;
                var buffData = new BuffData_1.BuffData();
                buffData.remain_time = _this.skill_data.getSkillValue2(1);
                buffData.buff_value = [_this.skill_data.getSkillValue1(1) * _this.getMaxHp()];
                buffData.buff_id = HeroConfig_1.BuffId.Boss8_Skill_1_jiaxue;
                buffData.recovery_jiange_time = 1;
                var timer = _this.addBuff(buffData);
                timer.addDestroyListen(_this.onSkill1End.bind(_this));
            });
        }
    };
    Boss8.prototype.onSkill1End = function (buffData) {
        var _this = this;
        //钻出地面
        //钻地的过程是免控的       
        //显示尾部，同时播放钻地动作
        this.wei_node.active = true;
        var weiSp = this.wei_node.getComponent(sp.Skeleton);
        var weiAnima = weiSp.setAnimation(0, Animation_Name.skill1_6, false);
        weiSp.setTrackCompleteListener(weiAnima, function (entry, event) {
            weiAnima.listener = null;
            _this.wei_node.active = false;
        });
        _super.prototype.playSpinAnimaton.call(this, (Animation_Name.skill1_5), false, null, function () {
            _this.node.getComponent(cc.Collider).enabled = true;
            _this.cur_toughness -= 1;
            if (_this.skill_queue.length > 0) {
                _super.prototype.setEnemyState.call(_this, EnemyConfig_1.Enemy_State.standby);
                _this.startSkill(_this.skill_queue.shift());
            }
            else {
                _this.startIdle();
            }
        });
    };
    Boss8.prototype.getSkillPos = function () {
        var disPos = this.node.getPosition().add(cc.v2(this.skill_pos.x * this.node.scaleX, this.skill_pos.y * this.node.scaleY));
        return disPos;
    };
    //甩鼻涕
    Boss8.prototype.startSkill2 = function () {
        var _this = this;
        this.getAttPos();
        var skillNo = 2;
        var skillIndex = skillNo - 1;
        this.skill_cold_down[skillIndex] = this.skill_data.getSkillColdDown(skillNo);
        if (_super.prototype.getEnemyState.call(this) != EnemyConfig_1.Enemy_State.att) {
            if (!_super.prototype.isHaveDeBuff.call(this, HeroConfig_1.BuffId.Hero_XuanYun)) {
                GameManager_1.default.getInstance().sound_manager.playSound(AudioConstants_1.SoundIndex.YX_Boss8Attack2);
                _super.prototype.setEnemyState.call(this, EnemyConfig_1.Enemy_State.skill);
                this.skill_cold_down[skillIndex] = this.skill_data.getSkillColdDown(skillNo);
                var data = new MonsterData_1.KeyFrameData();
                data.name = 'Skill2';
                data.callback = function () {
                    _this.att_jishu = 0;
                    var node = GameEffectsManager_1.GameEffectsManager.getInstance().createGameEffectById(GameEffectsManager_1.GameEffectId.boss8_skill_bullect, _this.getSkillPos());
                    node.getComponent(BossSkill8_1.default).init(_this.getAttData(HeroConfig_1.DamageType.Skill, true, _this.skill_data.getSkillValue1(2)), GameEffectsManager_1.GameEffectId.boss8_skill_bullect, GameEffectsManager_1.GameEffectId.boss8_skill_bullect_hit, 1500, Math.PI * 3 / 2);
                };
                _super.prototype.playSpinAnimaton.call(this, (Animation_Name.skill2), false, data, function () {
                    if (_this.skill_queue.length > 0) {
                        _super.prototype.setEnemyState.call(_this, EnemyConfig_1.Enemy_State.standby);
                        _this.startSkill(_this.skill_queue.shift());
                    }
                    else {
                        _this.startIdle();
                    }
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
    /**狂暴 */
    Boss8.prototype.startSkill3 = function () {
        var _this = this;
        if (this.is_active_skill_3 == false) {
            return;
        }
        var skillNo = 3;
        var skillIndex = skillNo - 1;
        this.skill_cold_down[skillIndex] = this.skill_data.getSkillColdDown(skillNo);
        if (_super.prototype.getEnemyState.call(this) != EnemyConfig_1.Enemy_State.att && _super.prototype.getEnemyState.call(this) != EnemyConfig_1.Enemy_State.skill) {
            if (!_super.prototype.isHaveDeBuff.call(this, HeroConfig_1.BuffId.Hero_XuanYun)) {
                GameManager_1.default.getInstance().sound_manager.playSound(AudioConstants_1.SoundIndex.YX_Boss5Beidong);
                this.cur_toughness += 1;
                _super.prototype.setEnemyState.call(this, EnemyConfig_1.Enemy_State.skill);
                this.skill_cold_down[skillIndex] = this.skill_data.getSkillColdDown(skillNo);
                var data = new MonsterData_1.KeyFrameData();
                data.name = 'Skill3';
                data.callback = function () {
                    _this.att_jishu = 0;
                    _this.cur_toughness -= 1;
                    _this.att_jishu = 0;
                    _this.setKuangBao(true);
                };
                _super.prototype.playSpinAnimaton.call(this, (Animation_Name.skill3), false, data, function () {
                    if (_this.skill_queue.length > 0) {
                        _super.prototype.setEnemyState.call(_this, EnemyConfig_1.Enemy_State.standby);
                        _this.startSkill(_this.skill_queue.shift());
                    }
                    else {
                        _this.startIdle();
                    }
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
    Boss8.prototype.setKuangBao = function (isKB) {
        //this.setHands(isKB)
        if (this.is_kuang_bao != isKB) {
            this.is_kuang_bao = isKB;
            this.is_active_skill_3 = isKB;
            if (isKB) {
                this.changeAttackSpeed(this.kuangbao_value[0]);
            }
            else {
                this.changeAttackSpeed(-this.kuangbao_value[0]);
            }
        }
    };
    Boss8.prototype.onDeath = function () {
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
        // if(this.boss_shield){
        //     this.boss_shield.destoryShield();
        // }        
    };
    Boss8.prototype.onXuanYunResult = function (isXuanYun) {
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
    Boss8.prototype.startXuanYun = function () {
        var _this = this;
        this.unschedule(this.startZuanDi);
        _super.prototype.playSpinAnimaton.call(this, Animation_Name.hurt1, false, null, function () {
            if (_super.prototype.isHaveDeBuffType.call(_this, HeroConfig_1.BuffType.Vertigo) && !_super.prototype.getIsDie.call(_this))
                _this.spine.paused = true;
        });
    };
    Boss8.prototype.update = function (dt) {
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
    Boss8.prototype.checkSkill = function (dt) {
        for (var i = 0; i < 3; i++) {
            if (this.skill_cold_down[i] > 0) {
                this.skill_cold_down[i] -= dt;
                if (i == 2) {
                    //第3个技能,激活类技能不在此释放
                    continue;
                }
                if (this.skill_cold_down[i] < 0) {
                    this.skill_cold_down[i] = 0;
                    this.startSkill(i + 1);
                }
            }
        }
    };
    /**攻击计算 */
    Boss8.prototype.checkAtt = function (dt) {
        this.att_jishu += dt;
        if (this.att_jishu >= this.att_jiange) {
            this.att_jishu = this.att_jiange;
            this.startAttack();
        }
    };
    __decorate([
        property(cc.Node)
    ], Boss8.prototype, "wei_node", void 0);
    Boss8 = __decorate([
        ccclass
    ], Boss8);
    return Boss8;
}(Boss_1.default));
exports.default = Boss8;

cc._RF.pop();