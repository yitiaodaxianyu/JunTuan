"use strict";
cc._RF.push(module, '0a9d2iG1cFGk4YrW/uU5A8t', 'Boss10');
// Scripts/Boss/Boss10/Boss10.ts

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
var HeroManager_1 = require("../../Hero/Data/HeroManager");
var BuffData_1 = require("../../Hero/Game/BuffData");
var HeroConfig_1 = require("../../Hero/Game/HeroConfig");
var Monster_1 = require("../../Monster/Monster");
var MonsterBullet_1 = require("../../Monster/MonsterBullet");
var MonsterData_1 = require("../../Monster/MonsterData");
var MonsterManager_1 = require("../../Monster/MonsterManager");
var AudioConstants_1 = require("../../Sound/AudioConstants");
var TutorailsManager_1 = require("../../Tutorials/TutorailsManager");
var Boss_1 = require("../Boss");
var BossSkill10_1 = require("./BossSkill10");
var Animation_Name;
(function (Animation_Name) {
    Animation_Name["Idle"] = "Idle";
    Animation_Name["attack1"] = "Attack";
    Animation_Name["run"] = "Run";
    Animation_Name["hurt1"] = "Hurt";
    Animation_Name["skill1_1"] = "Skill2_1";
    Animation_Name["skill1_2"] = "Skill2_2";
    Animation_Name["skill1_3"] = "Skill2_3";
    Animation_Name["skill2"] = "Skill3";
    Animation_Name["skill3"] = "Skill4";
    Animation_Name["skill4"] = "Skill5";
    Animation_Name["dead"] = "Dead";
})(Animation_Name || (Animation_Name = {}));
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var Boss10 = /** @class */ (function (_super) {
    __extends(Boss10, _super);
    function Boss10() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        /**引导相关 */
        /**引导计数 */
        _this.yindao_jishu = 0;
        /**引导剩余时长 */
        _this.yindao_time = 10;
        /**是否处于引导中 */
        _this.is_yindao = false;
        _this.launch_num = 0;
        _this.kuangbao_value = [];
        _this.is_kuang_bao = false;
        _this.is_active_skill_3 = false;
        _this.is_active_skill_4 = false;
        _this.zhaohuan_id = [20781, 20772, 10611, 10621, 10512];
        /**（召唤3个烈焰精灵20781、2个熔岩巨人20772，8个火焰巨人10611，3个火精灵10621，3个岩浆怪10512）" */
        _this.zhaohuan_num = [3, 2, 8, 3, 3];
        _this.att_num = 0;
        return _this;
    }
    Boss10.prototype.onLoad = function () {
        _super.prototype.onLoad.call(this);
        GameEffectsManager_1.GameEffectsManager.getInstance().addEffectPoolById(GameEffectsManager_1.GameEffectId.boss10_attack, 1);
        GameEffectsManager_1.GameEffectsManager.getInstance().addEffectPoolById(GameEffectsManager_1.GameEffectId.boss10_attack_hit, 1);
        GameEffectsManager_1.GameEffectsManager.getInstance().addEffectPoolById(GameEffectsManager_1.GameEffectId.boss10_skill2_0, 4);
        GameEffectsManager_1.GameEffectsManager.getInstance().addEffectPoolById(GameEffectsManager_1.GameEffectId.boss10_skill2_hit, 4);
        GameEffectsManager_1.GameEffectsManager.getInstance().addEffectPoolById(GameEffectsManager_1.GameEffectId.monster_zhaohuan, 4);
        for (var i = 0; i < this.zhaohuan_id.length; i++) {
            MonsterManager_1.default.getInstance().addMonsterPool(this.zhaohuan_id[i], 2);
        }
        this.addDeathCallback(this.onDeath);
        this.addXuanYunListen(this.onXuanYunResult);
        this.addBossInitedListen(this.onBossInited);
        this.addChangeBossHpListen(this.onChangeHp);
    };
    Boss10.prototype.onBossInited = function () {
        this.startIdle();
        this.node.y = 128;
        this.kuangbao_value = [this.skill_data.getSkillValue1(4), this.skill_data.getSkillValue2(4)];
    };
    Boss10.prototype.onChangeHp = function (num) {
        if (this.cur_hp <= this.max_hp * 0.7) {
            if (this.is_active_skill_3 == false) {
                this.is_active_skill_3 = true;
                this.startSkill(3);
            }
        }
        if (this.cur_hp <= this.max_hp * 0.3) {
            if (this.is_active_skill_4 == false && this.skill_cold_down[3] <= 0) {
                this.is_active_skill_4 = true;
                this.startSkill(4);
            }
        }
        else {
            if (this.is_active_skill_4 == true) {
                this.is_active_skill_4 = false;
                this.setKuangBao(false);
            }
        }
    };
    Boss10.prototype.setKuangBao = function (isKB) {
        if (this.is_kuang_bao != isKB) {
            this.is_kuang_bao = isKB;
            this.is_active_skill_4 = isKB;
            if (isKB) {
                this.monster_data.Attack += this.base_attribute_data.Attack * this.kuangbao_value[0];
                this.changeAttackSpeed(this.kuangbao_value[1]);
            }
            else {
                this.monster_data.Attack -= this.base_attribute_data.Attack * this.kuangbao_value[0];
                this.changeAttackSpeed(-this.kuangbao_value[1]);
            }
        }
    };
    Boss10.prototype.startIdle = function () {
        _super.prototype.setEnemyState.call(this, EnemyConfig_1.Enemy_State.standby);
        _super.prototype.playSpinAnimaton.call(this, Animation_Name.Idle, true);
    };
    Boss10.prototype.startAttack = function () {
        var _this = this;
        this.att_jishu = 0;
        _super.prototype.setEnemyState.call(this, EnemyConfig_1.Enemy_State.att);
        var data = new MonsterData_1.KeyFrameData();
        data.name = 'Attack';
        data.callback = function () {
            _this.att_jishu = 0;
            GameManager_1.default.getInstance().sound_manager.playSound(AudioConstants_1.SoundIndex.YX_BOSS10Attack);
            var node = GameEffectsManager_1.GameEffectsManager.getInstance().createGameEffectById(GameEffectsManager_1.GameEffectId.boss10_attack, _super.prototype.getAttPos.call(_this));
            node.getComponent(MonsterBullet_1.default).init(_super.prototype.getAttData.call(_this, HeroConfig_1.DamageType.Normal, true), GameEffectsManager_1.GameEffectId.boss10_attack, GameEffectsManager_1.GameEffectId.boss10_attack_hit, 1800, Math.PI * 3 / 2);
            _this.att_num++;
            if (_this.att_num >= 8) {
                _this.att_num = 0;
                //召唤
                _this.skill_queue.push(2);
            }
        };
        _super.prototype.playSpinAnimaton.call(this, (Animation_Name.attack1), false, data, function () {
            if (_this.skill_queue.length > 0) {
                _super.prototype.setEnemyState.call(_this, EnemyConfig_1.Enemy_State.standby);
                _this.startSkill(_this.skill_queue.shift());
            }
            else {
                _this.startIdle();
            }
        });
    };
    Boss10.prototype.startSkill = function (skillIndex) {
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
            case 4:
                {
                    if (this.is_active_skill_4) {
                        this.startSkill4();
                    }
                }
                break;
        }
    };
    Boss10.prototype.startSkill1 = function () {
        var _this = this;
        var skillNo = 1;
        var skillIndex = skillNo - 1;
        this.skill_cold_down[skillIndex] = this.skill_data.getSkillColdDown(skillNo);
        if (_super.prototype.getEnemyState.call(this) != EnemyConfig_1.Enemy_State.att && _super.prototype.getEnemyState.call(this) != EnemyConfig_1.Enemy_State.skill) {
            if (!_super.prototype.isHaveDeBuff.call(this, HeroConfig_1.BuffId.Hero_XuanYun)) {
                if (TutorailsManager_1.default.getInstance().is_finish_game == false && TutorailsManager_1.default.getInstance().isShowTutorials(203)) {
                    this.cur_toughness = 1;
                }
                this.skill_cold_down[skillIndex] = this.skill_data.getSkillColdDown(skillNo);
                _super.prototype.setEnemyState.call(this, EnemyConfig_1.Enemy_State.skill);
                _super.prototype.playSpinAnimaton.call(this, (Animation_Name.skill1_1), false, null, function () {
                    _super.prototype.playSpinAnimaton.call(_this, (Animation_Name.skill1_2), true, null);
                    _this.is_yindao = true;
                    _this.yindao_time = 10;
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
    Boss10.prototype.startLaunch = function () {
        var _this = this;
        //cc.log('发射发射');
        if (GameManager_1.default.getInstance().cur_game_state != Constants_1.GameState.Game_Playing) {
            return;
        }
        this.skill_jishu = 0;
        var num = 0;
        var len = this.skill_data.getSkillValue1(1);
        for (var i = 0; i < len; i++) {
            this.scheduleOnce(function () {
                if (!_this.isHaveDeBuff(HeroConfig_1.BuffId.Hero_XuanYun)) {
                    GameManager_1.default.getInstance().sound_manager.playSound(AudioConstants_1.SoundIndex.YX_BOSS10Skill);
                    num++;
                    var startPos = cc.v2(Math.random() * 128 - 64, _this.node.y + 256);
                    var offsetX = startPos.x < 0 ? -(80 + Math.random() * 80) : (80 + Math.random() * 80);
                    var endPos = cc.v2(offsetX + startPos.x, startPos.y + Math.random() * 40 + 80);
                    //随机英雄
                    var attDir = Math.PI * 3 / 2;
                    var heroId = HeroManager_1.HeroManager.getInstance().getRandHeroId(GameManager_1.default.getInstance().cur_game_mode, HeroConfig_1.Hero_Type.NULL, GameManager_1.default.getInstance().cur_team_list);
                    if (heroId != HeroConfig_1.Hero_Type.NULL) {
                        var heroPos = GameManager_1.default.getInstance().all_hero.get(heroId).node.getPosition();
                        var offsetPos = heroPos.sub(endPos);
                        var pi2 = Math.PI * 2;
                        attDir = (Math.atan2(offsetPos.y, offsetPos.x) + pi2) % pi2;
                    }
                    var node = GameEffectsManager_1.GameEffectsManager.getInstance().createGameEffectById(GameEffectsManager_1.GameEffectId.boss10_skill2_0, startPos);
                    var bsAtt_1 = node.getComponent(BossSkill10_1.default);
                    bsAtt_1.init(_super.prototype.getAttData.call(_this, HeroConfig_1.DamageType.Skill, true, _this.skill_data.getSkillValue2(1)), GameEffectsManager_1.GameEffectId.boss10_skill2_0, 1500, attDir, _this.node.y);
                    bsAtt_1.is_can_move = false;
                    //bsAtt.setHeroType(heroId,0.1);
                    cc.tween(node).to((0.25 - num * 0.05) * GameManager_1.default.getInstance().getGameRate(), { x: endPos.x, y: endPos.y }, { easing: 'quadOut' }).call(function () {
                        bsAtt_1.startFly();
                    }).start();
                }
            }, 0.25 * i);
        }
        this.launch_num++;
        if (this.launch_num == 3) {
            //德鲁伊教程
            if (TutorailsManager_1.default.getInstance().is_finish_game == false && TutorailsManager_1.default.getInstance().isShowTutorials(203)) {
                TutorailsManager_1.default.getInstance().showTutorials(203, function () {
                    GameManager_1.default.getInstance().setGameRate(1 / Constants_1.JiaSu);
                }, function () {
                    TutorailsManager_1.default.getInstance().saveTutorials(203);
                    _this.cur_toughness = 0;
                    GameManager_1.default.getInstance().setGameRate(1);
                }, false, null, this.node.getPosition());
            }
        }
    };
    Boss10.prototype.endYinDao = function () {
        var _this = this;
        this.is_yindao = false;
        this.yindao_time = 10;
        _super.prototype.playSpinAnimaton.call(this, (Animation_Name.skill1_3), false, null, function () {
            _this.att_jishu = 0;
            if (_this.skill_queue.length > 0) {
                _super.prototype.setEnemyState.call(_this, EnemyConfig_1.Enemy_State.standby);
                _this.startSkill(_this.skill_queue.shift());
            }
            else {
                _this.startIdle();
            }
        });
    };
    //召唤
    Boss10.prototype.startSkill2 = function () {
        var _this = this;
        var skillNo = 2;
        var skillIndex = skillNo - 1;
        this.skill_cold_down[skillIndex] = this.skill_data.getSkillColdDown(skillNo);
        if (_super.prototype.getEnemyState.call(this) != EnemyConfig_1.Enemy_State.att && _super.prototype.getEnemyState.call(this) != EnemyConfig_1.Enemy_State.skill) {
            if (!_super.prototype.isHaveDeBuff.call(this, HeroConfig_1.BuffId.Hero_XuanYun)) {
                GameManager_1.default.getInstance().sound_manager.playSound(AudioConstants_1.SoundIndex.YX_Boss5Beidong);
                _super.prototype.setEnemyState.call(this, EnemyConfig_1.Enemy_State.skill);
                this.skill_cold_down[skillIndex] = this.skill_data.getSkillColdDown(skillNo);
                var data = new MonsterData_1.KeyFrameData();
                data.name = 'Skill3';
                data.callback = function () {
                    _this.att_jishu = 0;
                    _this.startZhaoHuan();
                    //回血20%
                    //this.beHeal(this.getMaxHp()*0.1);
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
    /**开始召唤 */
    Boss10.prototype.startZhaoHuan = function () {
        var num = 0;
        //半径
        var rr = 256;
        for (var i = 0; i < this.zhaohuan_num.length; i++) {
            num += this.zhaohuan_num[i];
        }
        var indexArr = [];
        for (var n = 0; n < num; n++) {
            indexArr.push(n);
        }
        var onceRadian = Math.PI / (num - 1); //num个怪
        for (var i = 0; i < this.zhaohuan_num.length; i++) {
            var numA = this.zhaohuan_num[i];
            for (var n = 0; n < numA; n++) {
                var index = Math.floor(Math.random() * indexArr.length);
                var num_1 = indexArr[index];
                indexArr.splice(index, 1);
                var xx = Math.cos(onceRadian * num_1) * rr + this.node.x;
                var yy = Math.sin(onceRadian * num_1) * rr + this.node.y;
                var id = this.zhaohuan_id[i];
                MonsterManager_1.default.getInstance().createSummonMonster(id, this.monster_level, cc.v2(xx, yy));
            }
        }
    };
    Boss10.prototype.startSkill3 = function () {
        var _this = this;
        var skillNo = 3;
        var skillIndex = skillNo - 1;
        this.skill_cold_down[skillIndex] = this.skill_data.getSkillColdDown(skillNo);
        if (_super.prototype.getEnemyState.call(this) != EnemyConfig_1.Enemy_State.att && _super.prototype.getEnemyState.call(this) != EnemyConfig_1.Enemy_State.skill) {
            if (!_super.prototype.isHaveDeBuff.call(this, HeroConfig_1.BuffId.Hero_XuanYun)) {
                //GameManager.getInstance().sound_manager.playSound(SoundIndex.YX_Boss5Beidong);
                _super.prototype.setEnemyState.call(this, EnemyConfig_1.Enemy_State.skill);
                this.skill_cold_down[skillIndex] = this.skill_data.getSkillColdDown(skillNo);
                var data = new MonsterData_1.KeyFrameData();
                data.name = 'Skill4';
                data.callback = function () {
                    _this.att_jishu = 0;
                    //鼓舞buff
                    var monsters = MonsterManager_1.default.getInstance().getMonstersForMonsterPos(-1, _this.node.getPosition(), 300);
                    if (monsters) {
                        for (var i = 0; i < monsters.length; i++) {
                            var monsterTs = monsters[i].getComponent(Monster_1.default);
                            if (monsterTs) {
                                var buffData = new BuffData_1.BuffData();
                                buffData.buff_value = [_this.skill_data.getSkillValue1(1)];
                                buffData.buff_id = HeroConfig_1.BuffId.Boss10_Skill_3_guwu;
                                buffData.buff_type = HeroConfig_1.BuffType.MoveSpeedUp;
                                buffData.remain_time = 3;
                                monsterTs.addBuff(buffData);
                            }
                        }
                    }
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
    Boss10.prototype.startSkill4 = function () {
        var _this = this;
        if (this.is_active_skill_4 == false) {
            return;
        }
        var skillNo = 4;
        var skillIndex = skillNo - 1;
        this.skill_cold_down[skillIndex] = this.skill_data.getSkillColdDown(skillNo);
        if (_super.prototype.getEnemyState.call(this) != EnemyConfig_1.Enemy_State.att && _super.prototype.getEnemyState.call(this) != EnemyConfig_1.Enemy_State.skill) {
            if (!_super.prototype.isHaveDeBuff.call(this, HeroConfig_1.BuffId.Hero_XuanYun)) {
                //GameManager.getInstance().sound_manager.playSound(SoundIndex.YX_Boss5Beidong);
                this.cur_toughness += 1;
                _super.prototype.setEnemyState.call(this, EnemyConfig_1.Enemy_State.skill);
                this.skill_cold_down[skillIndex] = this.skill_data.getSkillColdDown(skillNo);
                var data = new MonsterData_1.KeyFrameData();
                data.name = 'Skill5';
                data.callback = function () {
                    _this.att_jishu = 0;
                    _this.cur_toughness -= 1;
                    _this.att_jishu = 0;
                    _this.setKuangBao(true);
                };
                _super.prototype.playSpinAnimaton.call(this, (Animation_Name.skill4), false, data, function () {
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
    Boss10.prototype.onDeath = function () {
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
    };
    Boss10.prototype.onXuanYunResult = function (isXuanYun) {
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
    Boss10.prototype.startXuanYun = function () {
        var _this = this;
        if (this.is_yindao) {
            this.is_yindao = false;
            this.yindao_time = 10;
        }
        _super.prototype.playSpinAnimaton.call(this, Animation_Name.hurt1, false, null, function () {
            if (_super.prototype.isHaveDeBuffType.call(_this, HeroConfig_1.BuffType.Vertigo) && !_super.prototype.getIsDie.call(_this))
                _this.spine.paused = true;
        });
    };
    Boss10.prototype.update = function (dt) {
        if ((GameManager_1.default.getInstance().cur_game_state != Constants_1.GameState.Game_Playing) || this.getIsDie()) {
            return;
        }
        _super.prototype.update.call(this, dt);
        this.checkSkill(dt);
        if (!this.isHaveDeBuffType(HeroConfig_1.BuffType.Vertigo)) {
            this.checkYinDao(dt);
            if (this.getEnemyState() != EnemyConfig_1.Enemy_State.skill) {
                this.checkAtt(dt);
            }
        }
    };
    /**技能检测 */
    Boss10.prototype.checkSkill = function (dt) {
        for (var i = 0; i < 4; i++) {
            if (i == 1) {
                continue;
            }
            if (i == 2 && this.is_active_skill_3 == false) {
                continue;
            }
            if (this.skill_cold_down[i] > 0) {
                this.skill_cold_down[i] -= dt;
                if (i == 3) {
                    //激活类技能不触发，只在此计时
                    continue;
                }
                if (this.skill_cold_down[i] < 0) {
                    this.skill_cold_down[i] = 0;
                    this.startSkill(i + 1);
                }
            }
        }
    };
    // /**引导检测 */
    Boss10.prototype.checkYinDao = function (dt) {
        if (this.is_yindao == true && this.yindao_time > 0) {
            this.yindao_time -= dt;
            if (this.yindao_time <= 0) {
                //结束引导
                this.endYinDao();
                return;
            }
            this.yindao_jishu += dt;
            if (this.yindao_jishu >= 1) {
                this.yindao_jishu = 0;
                this.startLaunch();
            }
        }
    };
    /**攻击计算 */
    Boss10.prototype.checkAtt = function (dt) {
        this.att_jishu += dt;
        if (this.att_jishu >= this.att_jiange) {
            this.att_jishu = this.att_jiange;
            this.startAttack();
        }
        else {
            //this.moving(dt);
        }
    };
    Boss10 = __decorate([
        ccclass
    ], Boss10);
    return Boss10;
}(Boss_1.default));
exports.default = Boss10;

cc._RF.pop();