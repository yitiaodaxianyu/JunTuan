
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Scripts/Boss/Boss10/Boss10.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0c1xcQm9zc1xcQm9zczEwXFxCb3NzMTAudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBRUEsNkNBQTZEO0FBQzdELHVEQUFzRDtBQUN0RCxvRUFBaUY7QUFDakYsaURBQTRDO0FBQzVDLDJEQUEwRDtBQUMxRCxxREFBb0Q7QUFDcEQseURBQXFGO0FBQ3JGLGlEQUE0QztBQUM1Qyw2REFBd0Q7QUFDeEQseURBQXlEO0FBQ3pELCtEQUEwRDtBQUMxRCw2REFBd0Q7QUFDeEQscUVBQWdFO0FBQ2hFLGdDQUEyQjtBQUMzQiw2Q0FBd0M7QUFFeEMsSUFBSyxjQWFKO0FBYkQsV0FBSyxjQUFjO0lBRWYsK0JBQWEsQ0FBQTtJQUNiLG9DQUFrQixDQUFBO0lBQ2xCLDZCQUFXLENBQUE7SUFDWCxnQ0FBYyxDQUFBO0lBQ2QsdUNBQXFCLENBQUE7SUFDckIsdUNBQXFCLENBQUE7SUFDckIsdUNBQXFCLENBQUE7SUFDckIsbUNBQWlCLENBQUE7SUFDakIsbUNBQWlCLENBQUE7SUFDakIsbUNBQWlCLENBQUE7SUFDakIsK0JBQVksQ0FBQTtBQUNoQixDQUFDLEVBYkksY0FBYyxLQUFkLGNBQWMsUUFhbEI7QUFFSyxJQUFBLEtBQXNCLEVBQUUsQ0FBQyxVQUFVLEVBQWxDLE9BQU8sYUFBQSxFQUFFLFFBQVEsY0FBaUIsQ0FBQztBQUcxQztJQUFvQywwQkFBSTtJQUF4QztRQUFBLHFFQTZlQztRQTFlRyxVQUFVO1FBQ1YsVUFBVTtRQUNWLGtCQUFZLEdBQVEsQ0FBQyxDQUFDO1FBQ3RCLFlBQVk7UUFDWixpQkFBVyxHQUFRLEVBQUUsQ0FBQztRQUN0QixhQUFhO1FBQ2IsZUFBUyxHQUFTLEtBQUssQ0FBQztRQUN4QixnQkFBVSxHQUFRLENBQUMsQ0FBQztRQUNwQixvQkFBYyxHQUFVLEVBQUUsQ0FBQztRQUMzQixrQkFBWSxHQUFTLEtBQUssQ0FBQztRQUUzQix1QkFBaUIsR0FB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RCxhQUFDO0NBN2VELEFBNmVDLENBN2VtQyxjQUFJLEdBNmV2QztrQkE3ZW9CLE1BQU0iLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJcclxuXHJcbmltcG9ydCB7IEdhbWVNb2RlLCBHYW1lU3RhdGUsIEppYVN1IH0gZnJvbSBcIi4uLy4uL0NvbnN0YW50c1wiO1xyXG5pbXBvcnQgeyBFbmVteV9TdGF0ZSB9IGZyb20gXCIuLi8uLi9FbmVteS9FbmVteUNvbmZpZ1wiO1xyXG5pbXBvcnQgeyBHYW1lRWZmZWN0SWQsIEdhbWVFZmZlY3RzTWFuYWdlciB9IGZyb20gXCIuLi8uLi9HYW1lL0dhbWVFZmZlY3RzTWFuYWdlclwiO1xyXG5pbXBvcnQgR2FtZU1hbmFnZXIgZnJvbSBcIi4uLy4uL0dhbWVNYW5hZ2VyXCI7XHJcbmltcG9ydCB7IEhlcm9NYW5hZ2VyIH0gZnJvbSBcIi4uLy4uL0hlcm8vRGF0YS9IZXJvTWFuYWdlclwiO1xyXG5pbXBvcnQgeyBCdWZmRGF0YSB9IGZyb20gXCIuLi8uLi9IZXJvL0dhbWUvQnVmZkRhdGFcIjtcclxuaW1wb3J0IHsgQnVmZklkLCBCdWZmVHlwZSwgRGFtYWdlVHlwZSwgSGVyb19UeXBlIH0gZnJvbSBcIi4uLy4uL0hlcm8vR2FtZS9IZXJvQ29uZmlnXCI7XHJcbmltcG9ydCBNb25zdGVyIGZyb20gXCIuLi8uLi9Nb25zdGVyL01vbnN0ZXJcIjtcclxuaW1wb3J0IE1vbnN0ZXJCdWxsZXQgZnJvbSBcIi4uLy4uL01vbnN0ZXIvTW9uc3RlckJ1bGxldFwiO1xyXG5pbXBvcnQgeyBLZXlGcmFtZURhdGEgfSBmcm9tIFwiLi4vLi4vTW9uc3Rlci9Nb25zdGVyRGF0YVwiO1xyXG5pbXBvcnQgTW9uc3Rlck1hbmFnZXIgZnJvbSBcIi4uLy4uL01vbnN0ZXIvTW9uc3Rlck1hbmFnZXJcIjtcclxuaW1wb3J0IHsgU291bmRJbmRleCB9IGZyb20gXCIuLi8uLi9Tb3VuZC9BdWRpb0NvbnN0YW50c1wiO1xyXG5pbXBvcnQgVHV0b3JhaWxzTWFuYWdlciBmcm9tIFwiLi4vLi4vVHV0b3JpYWxzL1R1dG9yYWlsc01hbmFnZXJcIjtcclxuaW1wb3J0IEJvc3MgZnJvbSBcIi4uL0Jvc3NcIjtcclxuaW1wb3J0IEJvc3NTa2lsbDEwIGZyb20gXCIuL0Jvc3NTa2lsbDEwXCI7XHJcblxyXG5lbnVtIEFuaW1hdGlvbl9OYW1lXHJcbntcclxuICAgIElkbGUgPSBcIklkbGVcIiwgICAgICAgLy8tLSDmraPpnaLlvoXmnLpcclxuICAgIGF0dGFjazEgPSBcIkF0dGFja1wiLCAgICAgICAgICAvLy0tIOaUu+WHuzFcclxuICAgIHJ1biA9IFwiUnVuXCIsICAgICAgICAgICAgICAgIC8vLS0g6LeR6LevXHJcbiAgICBodXJ0MSA9IFwiSHVydFwiLCAgICAgICAgICAvLy0tIOWPl+WHuzEgICAgXHJcbiAgICBza2lsbDFfMSA9IFwiU2tpbGwyXzFcIiwgICAgICAgICAgLy8tLSDmioDog73liqjkvZwxLOWHhuWkh+W8gOWni+W8leWvvFxyXG4gICAgc2tpbGwxXzIgPSBcIlNraWxsMl8yXCIsICAgICAgICAgIC8vLS0g5oqA6IO95Yqo5L2cMuW+queOr++8jOW8leWvvOWPkeW8uVxyXG4gICAgc2tpbGwxXzMgPSBcIlNraWxsMl8zXCIsICAgICAgICAgIC8vLS0g5oqA6IO95Yqo5L2cM++8jOe7k+adn+W8leWvvFxyXG4gICAgc2tpbGwyID0gXCJTa2lsbDNcIixcclxuICAgIHNraWxsMyA9IFwiU2tpbGw0XCIsXHJcbiAgICBza2lsbDQgPSBcIlNraWxsNVwiLFxyXG4gICAgZGVhZD0gXCJEZWFkXCIsICAgLy/mrbvkuqFcclxufVxyXG5cclxuY29uc3Qge2NjY2xhc3MsIHByb3BlcnR5fSA9IGNjLl9kZWNvcmF0b3I7XHJcblxyXG5AY2NjbGFzc1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBCb3NzMTAgZXh0ZW5kcyBCb3NzIHtcclxuXHJcblxyXG4gICAgLyoq5byV5a+855u45YWzICovXHJcbiAgICAvKirlvJXlr7zorqHmlbAgKi9cclxuICAgIHlpbmRhb19qaXNodTpudW1iZXI9MDsgICAgXHJcbiAgICAvKirlvJXlr7zliankvZnml7bplb8gKi9cclxuICAgIHlpbmRhb190aW1lOm51bWJlcj0xMDtcclxuICAgIC8qKuaYr+WQpuWkhOS6juW8leWvvOS4rSAqL1xyXG4gICAgaXNfeWluZGFvOmJvb2xlYW49ZmFsc2U7XHJcbiAgICBsYXVuY2hfbnVtOm51bWJlcj0wO1xyXG4gICAga3VhbmdiYW9fdmFsdWU6bnVtYmVyW109W107XHJcbiAgICBpc19rdWFuZ19iYW86Ym9vbGVhbj1mYWxzZTtcclxuXHJcbiAgICBpc19hY3RpdmVfc2tpbGxfMzpib29sZWFuPWZhbHNlO1xyXG4gICAgaXNfYWN0aXZlX3NraWxsXzQ6Ym9vbGVhbj1mYWxzZTtcclxuXHJcbiAgICB6aGFvaHVhbl9pZDpudW1iZXJbXT1bMjA3ODEsMjA3NzIsMTA2MTEsMTA2MjEsMTA1MTJdO1xyXG4gICAgLyoq77yI5Y+s5ZSkM+S4queDiOeEsOeyvueBtTIwNzgx44CBMuS4queGlOWyqeW3qOS6ujIwNzcy77yMOOS4queBq+eEsOW3qOS6ujEwNjEx77yMM+S4queBq+eyvueBtTEwNjIx77yMM+S4quWyqea1huaAqjEwNTEy77yJXCIgKi9cclxuICAgIHpoYW9odWFuX251bTpudW1iZXJbXT1bMywyLDgsMywzXTtcclxuICAgIGF0dF9udW06bnVtYmVyPTA7XHJcblxyXG4gICAgb25Mb2FkKCk6IHZvaWQge1xyXG4gICAgICAgIHN1cGVyLm9uTG9hZCgpO1xyXG4gICAgICAgIEdhbWVFZmZlY3RzTWFuYWdlci5nZXRJbnN0YW5jZSgpLmFkZEVmZmVjdFBvb2xCeUlkKEdhbWVFZmZlY3RJZC5ib3NzMTBfYXR0YWNrLDEpO1xyXG4gICAgICAgIEdhbWVFZmZlY3RzTWFuYWdlci5nZXRJbnN0YW5jZSgpLmFkZEVmZmVjdFBvb2xCeUlkKEdhbWVFZmZlY3RJZC5ib3NzMTBfYXR0YWNrX2hpdCwxKTtcclxuICAgICAgICBHYW1lRWZmZWN0c01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5hZGRFZmZlY3RQb29sQnlJZChHYW1lRWZmZWN0SWQuYm9zczEwX3NraWxsMl8wLDQpO1xyXG4gICAgICAgIEdhbWVFZmZlY3RzTWFuYWdlci5nZXRJbnN0YW5jZSgpLmFkZEVmZmVjdFBvb2xCeUlkKEdhbWVFZmZlY3RJZC5ib3NzMTBfc2tpbGwyX2hpdCw0KTtcclxuICAgICAgICBHYW1lRWZmZWN0c01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5hZGRFZmZlY3RQb29sQnlJZChHYW1lRWZmZWN0SWQubW9uc3Rlcl96aGFvaHVhbiw0KTtcclxuICAgICAgICBmb3IobGV0IGk9MDsgaTx0aGlzLnpoYW9odWFuX2lkLmxlbmd0aDsgaSsrKXtcclxuICAgICAgICAgICAgTW9uc3Rlck1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5hZGRNb25zdGVyUG9vbCh0aGlzLnpoYW9odWFuX2lkW2ldLDIpO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLmFkZERlYXRoQ2FsbGJhY2sodGhpcy5vbkRlYXRoKTtcclxuICAgICAgICB0aGlzLmFkZFh1YW5ZdW5MaXN0ZW4odGhpcy5vblh1YW5ZdW5SZXN1bHQpO1xyXG4gICAgICAgIHRoaXMuYWRkQm9zc0luaXRlZExpc3Rlbih0aGlzLm9uQm9zc0luaXRlZCk7XHJcbiAgICAgICAgdGhpcy5hZGRDaGFuZ2VCb3NzSHBMaXN0ZW4odGhpcy5vbkNoYW5nZUhwKTtcclxuICAgIH1cclxuXHJcbiAgICBvbkJvc3NJbml0ZWQoKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5zdGFydElkbGUoKTtcclxuICAgICAgICB0aGlzLm5vZGUueT0xMjg7XHJcbiAgICAgICAgdGhpcy5rdWFuZ2Jhb192YWx1ZT1bdGhpcy5za2lsbF9kYXRhLmdldFNraWxsVmFsdWUxKDQpLHRoaXMuc2tpbGxfZGF0YS5nZXRTa2lsbFZhbHVlMig0KV1cclxuICAgIH1cclxuXHJcbiAgICBvbkNoYW5nZUhwKG51bTpudW1iZXIpe1xyXG4gICAgICAgIGlmKHRoaXMuY3VyX2hwPD10aGlzLm1heF9ocCowLjcpe1xyXG4gICAgICAgICAgICBpZih0aGlzLmlzX2FjdGl2ZV9za2lsbF8zPT1mYWxzZSl7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmlzX2FjdGl2ZV9za2lsbF8zPXRydWU7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnN0YXJ0U2tpbGwoMyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgaWYodGhpcy5jdXJfaHA8PXRoaXMubWF4X2hwKjAuMyl7XHJcbiAgICAgICAgICAgIGlmKHRoaXMuaXNfYWN0aXZlX3NraWxsXzQ9PWZhbHNlJiZ0aGlzLnNraWxsX2NvbGRfZG93blszXTw9MCl7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmlzX2FjdGl2ZV9za2lsbF80PXRydWU7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnN0YXJ0U2tpbGwoNCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgaWYodGhpcy5pc19hY3RpdmVfc2tpbGxfND09dHJ1ZSl7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmlzX2FjdGl2ZV9za2lsbF80PWZhbHNlO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zZXRLdWFuZ0JhbyhmYWxzZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgc2V0S3VhbmdCYW8oaXNLQjpib29sZWFuKXsgICAgICAgIFxyXG4gICAgICAgIGlmKHRoaXMuaXNfa3VhbmdfYmFvIT1pc0tCKXtcclxuICAgICAgICAgICAgdGhpcy5pc19rdWFuZ19iYW89aXNLQjtcclxuICAgICAgICAgICAgdGhpcy5pc19hY3RpdmVfc2tpbGxfND1pc0tCO1xyXG4gICAgICAgICAgICBpZihpc0tCKXsgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIHRoaXMubW9uc3Rlcl9kYXRhLkF0dGFjays9dGhpcy5iYXNlX2F0dHJpYnV0ZV9kYXRhLkF0dGFjayp0aGlzLmt1YW5nYmFvX3ZhbHVlWzBdO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jaGFuZ2VBdHRhY2tTcGVlZCh0aGlzLmt1YW5nYmFvX3ZhbHVlWzFdKTsgICAgICAgICAgICBcclxuICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm1vbnN0ZXJfZGF0YS5BdHRhY2stPXRoaXMuYmFzZV9hdHRyaWJ1dGVfZGF0YS5BdHRhY2sqdGhpcy5rdWFuZ2Jhb192YWx1ZVswXTtcclxuICAgICAgICAgICAgICAgIHRoaXMuY2hhbmdlQXR0YWNrU3BlZWQoLXRoaXMua3VhbmdiYW9fdmFsdWVbMV0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSAgICAgICAgXHJcbiAgICB9XHJcblxyXG4gICAgc3RhcnRJZGxlKCl7ICAgICAgICBcclxuICAgICAgICBzdXBlci5zZXRFbmVteVN0YXRlKEVuZW15X1N0YXRlLnN0YW5kYnkpO1xyXG4gICAgICAgIHN1cGVyLnBsYXlTcGluQW5pbWF0b24oQW5pbWF0aW9uX05hbWUuSWRsZSx0cnVlKTtcclxuICAgICAgICBcclxuICAgIH1cclxuXHJcbiAgICBzdGFydEF0dGFjaygpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLmF0dF9qaXNodT0wO1xyXG4gICAgICAgIHN1cGVyLnNldEVuZW15U3RhdGUoRW5lbXlfU3RhdGUuYXR0KTtcclxuICAgICAgICBsZXQgZGF0YT1uZXcgS2V5RnJhbWVEYXRhKCk7XHJcbiAgICAgICAgZGF0YS5uYW1lPSdBdHRhY2snO1xyXG4gICAgICAgIGRhdGEuY2FsbGJhY2s9KCk9PnsgIFxyXG4gICAgICAgICAgICB0aGlzLmF0dF9qaXNodT0wO1xyXG4gICAgICAgICAgICBHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNvdW5kX21hbmFnZXIucGxheVNvdW5kKFNvdW5kSW5kZXguWVhfQk9TUzEwQXR0YWNrKTtcclxuICAgICAgICAgICAgbGV0IG5vZGU9R2FtZUVmZmVjdHNNYW5hZ2VyLmdldEluc3RhbmNlKCkuY3JlYXRlR2FtZUVmZmVjdEJ5SWQoR2FtZUVmZmVjdElkLmJvc3MxMF9hdHRhY2ssc3VwZXIuZ2V0QXR0UG9zKCkpO1xyXG4gICAgICAgICAgICBub2RlLmdldENvbXBvbmVudChNb25zdGVyQnVsbGV0KS5pbml0KHN1cGVyLmdldEF0dERhdGEoRGFtYWdlVHlwZS5Ob3JtYWwsdHJ1ZSksR2FtZUVmZmVjdElkLmJvc3MxMF9hdHRhY2ssR2FtZUVmZmVjdElkLmJvc3MxMF9hdHRhY2tfaGl0LDE4MDAsTWF0aC5QSSozLzIpO1xyXG4gICAgICAgICAgICB0aGlzLmF0dF9udW0rKztcclxuICAgICAgICAgICAgaWYodGhpcy5hdHRfbnVtPj04KXtcclxuICAgICAgICAgICAgICAgIHRoaXMuYXR0X251bT0wO1xyXG4gICAgICAgICAgICAgICAgLy/lj6zllKRcclxuICAgICAgICAgICAgICAgIHRoaXMuc2tpbGxfcXVldWUucHVzaCgyKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBzdXBlci5wbGF5U3BpbkFuaW1hdG9uKChBbmltYXRpb25fTmFtZS5hdHRhY2sxKSxmYWxzZSxkYXRhLCgpPT57XHJcbiAgICAgICAgICAgIGlmKHRoaXMuc2tpbGxfcXVldWUubGVuZ3RoPjApe1xyXG4gICAgICAgICAgICAgICAgc3VwZXIuc2V0RW5lbXlTdGF0ZShFbmVteV9TdGF0ZS5zdGFuZGJ5KTtcclxuICAgICAgICAgICAgICAgIHRoaXMuc3RhcnRTa2lsbCh0aGlzLnNraWxsX3F1ZXVlLnNoaWZ0KCkpO1xyXG4gICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgIHRoaXMuc3RhcnRJZGxlKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KVxyXG4gICAgfVxyXG5cclxuICAgIHN0YXJ0U2tpbGwoc2tpbGxJbmRleDpudW1iZXIpe1xyXG4gICAgICAgIHN3aXRjaChza2lsbEluZGV4KXtcclxuICAgICAgICAgICAgY2FzZSAxOntcclxuICAgICAgICAgICAgICAgIHRoaXMuc3RhcnRTa2lsbDEoKTtcclxuICAgICAgICAgICAgfWJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIDI6e1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zdGFydFNraWxsMigpO1xyXG4gICAgICAgICAgICB9YnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgMzp7XHJcbiAgICAgICAgICAgICAgICBpZih0aGlzLmlzX2FjdGl2ZV9za2lsbF8zKXtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnN0YXJ0U2tpbGwzKCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1icmVhaztcclxuICAgICAgICAgICAgY2FzZSA0OntcclxuICAgICAgICAgICAgICAgIGlmKHRoaXMuaXNfYWN0aXZlX3NraWxsXzQpe1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc3RhcnRTa2lsbDQoKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfWJyZWFrO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBzdGFydFNraWxsMSgpe1xyXG4gICAgICAgIGxldCBza2lsbE5vPTE7XHJcbiAgICAgICAgbGV0IHNraWxsSW5kZXg9c2tpbGxOby0xO1xyXG4gICAgICAgIHRoaXMuc2tpbGxfY29sZF9kb3duW3NraWxsSW5kZXhdPXRoaXMuc2tpbGxfZGF0YS5nZXRTa2lsbENvbGREb3duKHNraWxsTm8pO1xyXG4gICAgICAgIGlmKHN1cGVyLmdldEVuZW15U3RhdGUoKSE9RW5lbXlfU3RhdGUuYXR0JiZzdXBlci5nZXRFbmVteVN0YXRlKCkhPUVuZW15X1N0YXRlLnNraWxsKXtcclxuICAgICAgICAgICAgaWYoIXN1cGVyLmlzSGF2ZURlQnVmZihCdWZmSWQuSGVyb19YdWFuWXVuKSl7XHJcbiAgICAgICAgICAgICAgICBpZihUdXRvcmFpbHNNYW5hZ2VyLmdldEluc3RhbmNlKCkuaXNfZmluaXNoX2dhbWU9PWZhbHNlICYmIFR1dG9yYWlsc01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5pc1Nob3dUdXRvcmlhbHMoMjAzKSl7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jdXJfdG91Z2huZXNzPTE7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNraWxsX2NvbGRfZG93bltza2lsbEluZGV4XT10aGlzLnNraWxsX2RhdGEuZ2V0U2tpbGxDb2xkRG93bihza2lsbE5vKTsgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICBzdXBlci5zZXRFbmVteVN0YXRlKEVuZW15X1N0YXRlLnNraWxsKTtcclxuICAgICAgICAgICAgICAgIHN1cGVyLnBsYXlTcGluQW5pbWF0b24oKEFuaW1hdGlvbl9OYW1lLnNraWxsMV8xKSxmYWxzZSxudWxsLCgpPT57ICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICBzdXBlci5wbGF5U3BpbkFuaW1hdG9uKChBbmltYXRpb25fTmFtZS5za2lsbDFfMiksdHJ1ZSxudWxsKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmlzX3lpbmRhbz10cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMueWluZGFvX3RpbWU9MTA7XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgIGlmKHRoaXMuc2tpbGxfcXVldWUuaW5kZXhPZihza2lsbE5vKTwwKXtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnNraWxsX3F1ZXVlLnB1c2goc2tpbGxObyk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0gICAgICAgICBcclxuICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgaWYodGhpcy5za2lsbF9xdWV1ZS5pbmRleE9mKHNraWxsTm8pPDApe1xyXG4gICAgICAgICAgICAgICAgdGhpcy5za2lsbF9xdWV1ZS5wdXNoKHNraWxsTm8pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSAgICAgICAgXHJcbiAgICB9XHJcblxyXG4gICAgc3RhcnRMYXVuY2goKXtcclxuICAgICAgICAvL2NjLmxvZygn5Y+R5bCE5Y+R5bCEJyk7XHJcbiAgICAgICAgaWYoR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5jdXJfZ2FtZV9zdGF0ZSE9R2FtZVN0YXRlLkdhbWVfUGxheWluZyl7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5za2lsbF9qaXNodT0wO1xyXG4gICAgICAgIGxldCBudW09MDtcclxuICAgICAgICBsZXQgbGVuPXRoaXMuc2tpbGxfZGF0YS5nZXRTa2lsbFZhbHVlMSgxKTtcclxuICAgICAgICBmb3IobGV0IGk9MDsgaTxsZW47IGkrKyl7XHJcbiAgICAgICAgICAgIHRoaXMuc2NoZWR1bGVPbmNlKCgpPT57XHJcbiAgICAgICAgICAgICAgICBpZighdGhpcy5pc0hhdmVEZUJ1ZmYoQnVmZklkLkhlcm9fWHVhbll1bikpe1xyXG4gICAgICAgICAgICAgICAgICAgIEdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuc291bmRfbWFuYWdlci5wbGF5U291bmQoU291bmRJbmRleC5ZWF9CT1NTMTBTa2lsbCk7XHJcbiAgICAgICAgICAgICAgICAgICAgbnVtKys7ICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgIGxldCBzdGFydFBvcz1jYy52MihNYXRoLnJhbmRvbSgpKjEyOC02NCx0aGlzLm5vZGUueSsyNTYpO1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBvZmZzZXRYPXN0YXJ0UG9zLng8MD8tKDgwK01hdGgucmFuZG9tKCkqODApOig4MCtNYXRoLnJhbmRvbSgpKjgwKVxyXG4gICAgICAgICAgICAgICAgICAgIGxldCBlbmRQb3M9Y2MudjIob2Zmc2V0WCtzdGFydFBvcy54LHN0YXJ0UG9zLnkrTWF0aC5yYW5kb20oKSo0MCs4MCk7XHJcbiAgICAgICAgICAgICAgICAgICAgLy/pmo/mnLroi7Hpm4RcclxuICAgICAgICAgICAgICAgICAgICBsZXQgYXR0RGlyPU1hdGguUEkqMy8yO1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBoZXJvSWQ9SGVyb01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRSYW5kSGVyb0lkKEdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuY3VyX2dhbWVfbW9kZSxIZXJvX1R5cGUuTlVMTCxHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLmN1cl90ZWFtX2xpc3QpO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmKGhlcm9JZCE9SGVyb19UeXBlLk5VTEwpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgaGVyb1Bvcz1HYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLmFsbF9oZXJvLmdldChoZXJvSWQpLm5vZGUuZ2V0UG9zaXRpb24oKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IG9mZnNldFBvcz1oZXJvUG9zLnN1YihlbmRQb3MpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBwaTI9TWF0aC5QSSoyO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBhdHREaXI9KE1hdGguYXRhbjIob2Zmc2V0UG9zLnksb2Zmc2V0UG9zLngpK3BpMiklcGkyOyAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGxldCBub2RlPUdhbWVFZmZlY3RzTWFuYWdlci5nZXRJbnN0YW5jZSgpLmNyZWF0ZUdhbWVFZmZlY3RCeUlkKEdhbWVFZmZlY3RJZC5ib3NzMTBfc2tpbGwyXzAsc3RhcnRQb3MpO1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBic0F0dD1ub2RlLmdldENvbXBvbmVudChCb3NzU2tpbGwxMCk7XHJcbiAgICAgICAgICAgICAgICAgICAgYnNBdHQuaW5pdChzdXBlci5nZXRBdHREYXRhKERhbWFnZVR5cGUuU2tpbGwsdHJ1ZSx0aGlzLnNraWxsX2RhdGEuZ2V0U2tpbGxWYWx1ZTIoMSkpLEdhbWVFZmZlY3RJZC5ib3NzMTBfc2tpbGwyXzAsMTUwMCxhdHREaXIsdGhpcy5ub2RlLnkpO1xyXG4gICAgICAgICAgICAgICAgICAgIGJzQXR0LmlzX2Nhbl9tb3ZlPWZhbHNlOyAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgLy9ic0F0dC5zZXRIZXJvVHlwZShoZXJvSWQsMC4xKTtcclxuICAgICAgICAgICAgICAgICAgICBjYy50d2Vlbihub2RlKS50bygoMC4yNS1udW0qMC4wNSkqR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRHYW1lUmF0ZSgpLHt4OmVuZFBvcy54LHk6ZW5kUG9zLnl9LHtlYXNpbmc6ICdxdWFkT3V0J30pLmNhbGwoKCk9PntcclxuICAgICAgICAgICAgICAgICAgICAgICAgYnNBdHQuc3RhcnRGbHkoKTtcclxuICAgICAgICAgICAgICAgICAgICB9KS5zdGFydCgpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9LDAuMjUqaSk7ICAgICAgICAgICAgXHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMubGF1bmNoX251bSsrO1xyXG4gICAgICAgIGlmKHRoaXMubGF1bmNoX251bT09Myl7XHJcbiAgICAgICAgICAgIC8v5b636bKB5LyK5pWZ56iLXHJcbiAgICAgICAgICAgIGlmKFR1dG9yYWlsc01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5pc19maW5pc2hfZ2FtZT09ZmFsc2UgJiYgVHV0b3JhaWxzTWFuYWdlci5nZXRJbnN0YW5jZSgpLmlzU2hvd1R1dG9yaWFscygyMDMpKXtcclxuICAgICAgICAgICAgICAgIFR1dG9yYWlsc01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zaG93VHV0b3JpYWxzKDIwMywoKT0+e1xyXG4gICAgICAgICAgICAgICAgICAgIEdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuc2V0R2FtZVJhdGUoMS9KaWFTdSk7ICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgfSwoKT0+e1xyXG4gICAgICAgICAgICAgICAgICAgIFR1dG9yYWlsc01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zYXZlVHV0b3JpYWxzKDIwMyk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jdXJfdG91Z2huZXNzPTA7XHJcbiAgICAgICAgICAgICAgICAgICAgR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zZXRHYW1lUmF0ZSgxKTtcclxuICAgICAgICAgICAgICAgIH0sZmFsc2UsbnVsbCx0aGlzLm5vZGUuZ2V0UG9zaXRpb24oKSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgZW5kWWluRGFvKCl7XHJcbiAgICAgICAgdGhpcy5pc195aW5kYW89ZmFsc2U7XHJcbiAgICAgICAgdGhpcy55aW5kYW9fdGltZT0xMDtcclxuICAgICAgICBzdXBlci5wbGF5U3BpbkFuaW1hdG9uKChBbmltYXRpb25fTmFtZS5za2lsbDFfMyksZmFsc2UsbnVsbCwoKT0+e1xyXG4gICAgICAgICAgICB0aGlzLmF0dF9qaXNodT0wO1xyXG4gICAgICAgICAgICBpZih0aGlzLnNraWxsX3F1ZXVlLmxlbmd0aD4wKXtcclxuICAgICAgICAgICAgICAgIHN1cGVyLnNldEVuZW15U3RhdGUoRW5lbXlfU3RhdGUuc3RhbmRieSk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnN0YXJ0U2tpbGwodGhpcy5za2lsbF9xdWV1ZS5zaGlmdCgpKTtcclxuICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnN0YXJ0SWRsZSgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG5cclxuICAgIC8v5Y+s5ZSkXHJcbiAgICBzdGFydFNraWxsMigpe1xyXG4gICAgICAgIGxldCBza2lsbE5vPTI7XHJcbiAgICAgICAgbGV0IHNraWxsSW5kZXg9c2tpbGxOby0xO1xyXG4gICAgICAgIHRoaXMuc2tpbGxfY29sZF9kb3duW3NraWxsSW5kZXhdPXRoaXMuc2tpbGxfZGF0YS5nZXRTa2lsbENvbGREb3duKHNraWxsTm8pO1xyXG4gICAgICAgIGlmKHN1cGVyLmdldEVuZW15U3RhdGUoKSE9RW5lbXlfU3RhdGUuYXR0JiZzdXBlci5nZXRFbmVteVN0YXRlKCkhPUVuZW15X1N0YXRlLnNraWxsKXtcclxuICAgICAgICAgICAgaWYoIXN1cGVyLmlzSGF2ZURlQnVmZihCdWZmSWQuSGVyb19YdWFuWXVuKSl7XHJcbiAgICAgICAgICAgICAgICBHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNvdW5kX21hbmFnZXIucGxheVNvdW5kKFNvdW5kSW5kZXguWVhfQm9zczVCZWlkb25nKTtcclxuICAgICAgICAgICAgICAgIHN1cGVyLnNldEVuZW15U3RhdGUoRW5lbXlfU3RhdGUuc2tpbGwpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5za2lsbF9jb2xkX2Rvd25bc2tpbGxJbmRleF09dGhpcy5za2lsbF9kYXRhLmdldFNraWxsQ29sZERvd24oc2tpbGxObyk7XHJcbiAgICAgICAgICAgICAgICBsZXQgZGF0YT1uZXcgS2V5RnJhbWVEYXRhKCk7XHJcbiAgICAgICAgICAgICAgICBkYXRhLm5hbWU9J1NraWxsMyc7XHJcbiAgICAgICAgICAgICAgICBkYXRhLmNhbGxiYWNrPSgpPT57XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5hdHRfamlzaHU9MDtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnN0YXJ0Wmhhb0h1YW4oKTtcclxuICAgICAgICAgICAgICAgICAgICAvL+WbnuihgDIwJVxyXG4gICAgICAgICAgICAgICAgICAgIC8vdGhpcy5iZUhlYWwodGhpcy5nZXRNYXhIcCgpKjAuMSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBzdXBlci5wbGF5U3BpbkFuaW1hdG9uKChBbmltYXRpb25fTmFtZS5za2lsbDIpLGZhbHNlLGRhdGEsKCk9PntcclxuICAgICAgICAgICAgICAgICAgICBpZih0aGlzLnNraWxsX3F1ZXVlLmxlbmd0aD4wKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgc3VwZXIuc2V0RW5lbXlTdGF0ZShFbmVteV9TdGF0ZS5zdGFuZGJ5KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zdGFydFNraWxsKHRoaXMuc2tpbGxfcXVldWUuc2hpZnQoKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc3RhcnRJZGxlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICBpZih0aGlzLnNraWxsX3F1ZXVlLmluZGV4T2Yoc2tpbGxObyk8MCl7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5za2lsbF9xdWV1ZS5wdXNoKHNraWxsTm8pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgIGlmKHRoaXMuc2tpbGxfcXVldWUuaW5kZXhPZihza2lsbE5vKTwwKXtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2tpbGxfcXVldWUucHVzaChza2lsbE5vKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKirlvIDlp4vlj6zllKQgKi9cclxuICAgIHN0YXJ0Wmhhb0h1YW4oKXsgICAgICAgIFxyXG4gICAgICAgIGxldCBudW09MDsgICAgICAgICAgICAgIFxyXG4gICAgICAgIC8v5Y2K5b6EXHJcbiAgICAgICAgbGV0IHJyPTI1NjsgICAgICAgIFxyXG4gICAgICAgIGZvcihsZXQgaT0wOyBpPHRoaXMuemhhb2h1YW5fbnVtLmxlbmd0aDsgaSsrKXtcclxuICAgICAgICAgICAgbnVtKz10aGlzLnpoYW9odWFuX251bVtpXTtcclxuICAgICAgICB9XHJcbiAgICAgICAgbGV0IGluZGV4QXJyPVtdO1xyXG4gICAgICAgIGZvcihsZXQgbj0wOyBuPG51bTsgbisrKXtcclxuICAgICAgICAgICAgaW5kZXhBcnIucHVzaChuKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgbGV0IG9uY2VSYWRpYW49TWF0aC5QSS8obnVtLTEpOy8vbnVt5Liq5oCqXHJcbiAgICAgICAgZm9yKGxldCBpPTA7IGk8dGhpcy56aGFvaHVhbl9udW0ubGVuZ3RoOyBpKyspe1xyXG4gICAgICAgICAgICBsZXQgbnVtQT10aGlzLnpoYW9odWFuX251bVtpXTtcclxuICAgICAgICAgICAgZm9yKGxldCBuPTA7IG48bnVtQTsgbisrKXtcclxuICAgICAgICAgICAgICAgIGxldCBpbmRleD1NYXRoLmZsb29yKE1hdGgucmFuZG9tKCkqaW5kZXhBcnIubGVuZ3RoKTtcclxuICAgICAgICAgICAgICAgIGxldCBudW09aW5kZXhBcnJbaW5kZXhdO1xyXG4gICAgICAgICAgICAgICAgaW5kZXhBcnIuc3BsaWNlKGluZGV4LDEpO1xyXG4gICAgICAgICAgICAgICAgbGV0IHh4PU1hdGguY29zKG9uY2VSYWRpYW4qbnVtKSpycit0aGlzLm5vZGUueDtcclxuICAgICAgICAgICAgICAgIGxldCB5eT1NYXRoLnNpbihvbmNlUmFkaWFuKm51bSkqcnIrdGhpcy5ub2RlLnk7XHJcbiAgICAgICAgICAgICAgICBsZXQgaWQ9dGhpcy56aGFvaHVhbl9pZFtpXTsgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICBNb25zdGVyTWFuYWdlci5nZXRJbnN0YW5jZSgpLmNyZWF0ZVN1bW1vbk1vbnN0ZXIoaWQsdGhpcy5tb25zdGVyX2xldmVsLGNjLnYyKHh4LHl5KSk7XHJcbiAgICAgICAgICAgIH0gICAgICAgICAgICBcclxuICAgICAgICB9ICAgICAgICBcclxuICAgIH1cclxuXHJcbiAgICBzdGFydFNraWxsMygpe1xyXG4gICAgICAgIGxldCBza2lsbE5vPTM7XHJcbiAgICAgICAgbGV0IHNraWxsSW5kZXg9c2tpbGxOby0xO1xyXG4gICAgICAgIHRoaXMuc2tpbGxfY29sZF9kb3duW3NraWxsSW5kZXhdPXRoaXMuc2tpbGxfZGF0YS5nZXRTa2lsbENvbGREb3duKHNraWxsTm8pO1xyXG4gICAgICAgIGlmKHN1cGVyLmdldEVuZW15U3RhdGUoKSE9RW5lbXlfU3RhdGUuYXR0JiZzdXBlci5nZXRFbmVteVN0YXRlKCkhPUVuZW15X1N0YXRlLnNraWxsKXtcclxuICAgICAgICAgICAgaWYoIXN1cGVyLmlzSGF2ZURlQnVmZihCdWZmSWQuSGVyb19YdWFuWXVuKSl7XHJcbiAgICAgICAgICAgICAgICAvL0dhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuc291bmRfbWFuYWdlci5wbGF5U291bmQoU291bmRJbmRleC5ZWF9Cb3NzNUJlaWRvbmcpO1xyXG4gICAgICAgICAgICAgICAgc3VwZXIuc2V0RW5lbXlTdGF0ZShFbmVteV9TdGF0ZS5za2lsbCk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNraWxsX2NvbGRfZG93bltza2lsbEluZGV4XT10aGlzLnNraWxsX2RhdGEuZ2V0U2tpbGxDb2xkRG93bihza2lsbE5vKTtcclxuICAgICAgICAgICAgICAgIGxldCBkYXRhPW5ldyBLZXlGcmFtZURhdGEoKTtcclxuICAgICAgICAgICAgICAgIGRhdGEubmFtZT0nU2tpbGw0JztcclxuICAgICAgICAgICAgICAgIGRhdGEuY2FsbGJhY2s9KCk9PnsgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYXR0X2ppc2h1PTA7XHJcbiAgICAgICAgICAgICAgICAgICAgLy/pvJPoiJ5idWZmXHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IG1vbnN0ZXJzPU1vbnN0ZXJNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0TW9uc3RlcnNGb3JNb25zdGVyUG9zKC0xLHRoaXMubm9kZS5nZXRQb3NpdGlvbigpLDMwMCk7ICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgaWYobW9uc3RlcnMpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBmb3IobGV0IGk9MDsgaTxtb25zdGVycy5sZW5ndGg7IGkrKyl7ICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IG1vbnN0ZXJUcz1tb25zdGVyc1tpXS5nZXRDb21wb25lbnQoTW9uc3Rlcik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZihtb25zdGVyVHMpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBidWZmRGF0YT1uZXcgQnVmZkRhdGEoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBidWZmRGF0YS5idWZmX3ZhbHVlPVt0aGlzLnNraWxsX2RhdGEuZ2V0U2tpbGxWYWx1ZTEoMSldO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJ1ZmZEYXRhLmJ1ZmZfaWQ9QnVmZklkLkJvc3MxMF9Ta2lsbF8zX2d1d3U7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYnVmZkRhdGEuYnVmZl90eXBlPUJ1ZmZUeXBlLk1vdmVTcGVlZFVwO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJ1ZmZEYXRhLnJlbWFpbl90aW1lPTM7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbW9uc3RlclRzLmFkZEJ1ZmYoYnVmZkRhdGEpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgc3VwZXIucGxheVNwaW5BbmltYXRvbigoQW5pbWF0aW9uX05hbWUuc2tpbGwzKSxmYWxzZSxkYXRhLCgpPT57XHJcbiAgICAgICAgICAgICAgICAgICAgaWYodGhpcy5za2lsbF9xdWV1ZS5sZW5ndGg+MCl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHN1cGVyLnNldEVuZW15U3RhdGUoRW5lbXlfU3RhdGUuc3RhbmRieSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc3RhcnRTa2lsbCh0aGlzLnNraWxsX3F1ZXVlLnNoaWZ0KCkpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnN0YXJ0SWRsZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgaWYodGhpcy5za2lsbF9xdWV1ZS5pbmRleE9mKHNraWxsTm8pPDApe1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2tpbGxfcXVldWUucHVzaChza2lsbE5vKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICBpZih0aGlzLnNraWxsX3F1ZXVlLmluZGV4T2Yoc2tpbGxObyk8MCl7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNraWxsX3F1ZXVlLnB1c2goc2tpbGxObyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgc3RhcnRTa2lsbDQoKXtcclxuICAgICAgICBpZih0aGlzLmlzX2FjdGl2ZV9za2lsbF80PT1mYWxzZSl7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgbGV0IHNraWxsTm89NDtcclxuICAgICAgICBsZXQgc2tpbGxJbmRleD1za2lsbE5vLTE7XHJcbiAgICAgICAgdGhpcy5za2lsbF9jb2xkX2Rvd25bc2tpbGxJbmRleF09dGhpcy5za2lsbF9kYXRhLmdldFNraWxsQ29sZERvd24oc2tpbGxObyk7XHJcbiAgICAgICAgaWYoc3VwZXIuZ2V0RW5lbXlTdGF0ZSgpIT1FbmVteV9TdGF0ZS5hdHQmJnN1cGVyLmdldEVuZW15U3RhdGUoKSE9RW5lbXlfU3RhdGUuc2tpbGwpe1xyXG4gICAgICAgICAgICBpZighc3VwZXIuaXNIYXZlRGVCdWZmKEJ1ZmZJZC5IZXJvX1h1YW5ZdW4pKXtcclxuICAgICAgICAgICAgICAgIC8vR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zb3VuZF9tYW5hZ2VyLnBsYXlTb3VuZChTb3VuZEluZGV4LllYX0Jvc3M1QmVpZG9uZyk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmN1cl90b3VnaG5lc3MrPTE7XHJcbiAgICAgICAgICAgICAgICBzdXBlci5zZXRFbmVteVN0YXRlKEVuZW15X1N0YXRlLnNraWxsKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2tpbGxfY29sZF9kb3duW3NraWxsSW5kZXhdPXRoaXMuc2tpbGxfZGF0YS5nZXRTa2lsbENvbGREb3duKHNraWxsTm8pO1xyXG4gICAgICAgICAgICAgICAgbGV0IGRhdGE9bmV3IEtleUZyYW1lRGF0YSgpO1xyXG4gICAgICAgICAgICAgICAgZGF0YS5uYW1lPSdTa2lsbDUnO1xyXG4gICAgICAgICAgICAgICAgZGF0YS5jYWxsYmFjaz0oKT0+eyAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5hdHRfamlzaHU9MDtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmN1cl90b3VnaG5lc3MtPTE7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5hdHRfamlzaHU9MDtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnNldEt1YW5nQmFvKHRydWUpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgc3VwZXIucGxheVNwaW5BbmltYXRvbigoQW5pbWF0aW9uX05hbWUuc2tpbGw0KSxmYWxzZSxkYXRhLCgpPT57XHJcbiAgICAgICAgICAgICAgICAgICAgaWYodGhpcy5za2lsbF9xdWV1ZS5sZW5ndGg+MCl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHN1cGVyLnNldEVuZW15U3RhdGUoRW5lbXlfU3RhdGUuc3RhbmRieSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc3RhcnRTa2lsbCh0aGlzLnNraWxsX3F1ZXVlLnNoaWZ0KCkpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnN0YXJ0SWRsZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgaWYodGhpcy5za2lsbF9xdWV1ZS5pbmRleE9mKHNraWxsTm8pPDApe1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2tpbGxfcXVldWUucHVzaChza2lsbE5vKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICBpZih0aGlzLnNraWxsX3F1ZXVlLmluZGV4T2Yoc2tpbGxObyk8MCl7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNraWxsX3F1ZXVlLnB1c2goc2tpbGxObyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgb25EZWF0aCgpIHtcclxuICAgICAgICB0aGlzLnVuc2NoZWR1bGVBbGxDYWxsYmFja3MoKTtcclxuICAgICAgICBzdXBlci5wbGF5RGVhZEFuaW1hdG9uKEFuaW1hdGlvbl9OYW1lLmRlYWQsKCk9PntcclxuICAgICAgICAgICAgdGhpcy5yZW1vdmVBbGxEZUJ1ZmYoKTtcclxuICAgICAgICAgICAgdGhpcy5yZW1vdmVBbGxCdWZmKCk7XHJcbiAgICAgICAgICAgIGlmKHRoaXMuc2hhZG93KXtcclxuICAgICAgICAgICAgICAgIGNjLnR3ZWVuKHRoaXMuc2hhZG93KS50bygwLjc1LHtvcGFjaXR5OjB9KS5zdGFydCgpO1xyXG4gICAgICAgICAgICB9ICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIGNjLnR3ZWVuKHRoaXMubm9kZSkudG8oMC43NSx7b3BhY2l0eTowfSkuY2FsbCgoKT0+e1xyXG4gICAgICAgICAgICAgICAgdGhpcy5yZW1vdmVBbGxEZUJ1ZmYoKTtcclxuICAgICAgICAgICAgICAgIHRoaXMucmVtb3ZlQWxsQnVmZigpO1xyXG4gICAgICAgICAgICAgICAgTW9uc3Rlck1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5kZXN0cm95TW9uc3Rlcih0aGlzLm5vZGUsdGhpcy5tb25zdGVyX3R5cGUpO1xyXG4gICAgICAgICAgICB9KS5zdGFydCgpO1xyXG4gICAgICAgIH0pXHJcbiAgICAgICAgLy9HYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNvdW5kX21hbmFnZXIucGxheVNvdW5kKFNvdW5kSW5kZXgucmV3YXJkQm94Mik7ICAgICAgICAgXHJcbiAgICB9XHJcblxyXG4gICAgb25YdWFuWXVuUmVzdWx0KGlzWHVhbll1bjpib29sZWFuKXtcclxuICAgICAgICBpZihpc1h1YW5ZdW4pe1xyXG4gICAgICAgICAgICB0aGlzLnN0YXJ0WHVhbll1bigpO1xyXG4gICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICBpZighc3VwZXIuaXNIYXZlRGVCdWZmVHlwZShCdWZmVHlwZS5WZXJ0aWdvKSl7XHJcbiAgICAgICAgICAgICAgICBpZighc3VwZXIuZ2V0SXNEaWUoKSl7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYodGhpcy5za2lsbF9xdWV1ZS5sZW5ndGg+MCl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHN1cGVyLnNldEVuZW15U3RhdGUoRW5lbXlfU3RhdGUuc3RhbmRieSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc3RhcnRTa2lsbCh0aGlzLnNraWxsX3F1ZXVlLnNoaWZ0KCkpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnN0YXJ0SWRsZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBzdGFydFh1YW5ZdW4oKXtcclxuICAgICAgICBpZih0aGlzLmlzX3lpbmRhbyl7XHJcbiAgICAgICAgICAgIHRoaXMuaXNfeWluZGFvPWZhbHNlO1xyXG4gICAgICAgICAgICB0aGlzLnlpbmRhb190aW1lPTEwO1xyXG4gICAgICAgIH1cclxuICAgICAgICBzdXBlci5wbGF5U3BpbkFuaW1hdG9uKEFuaW1hdGlvbl9OYW1lLmh1cnQxLGZhbHNlLG51bGwsKCk9PntcclxuICAgICAgICAgICAgaWYoc3VwZXIuaXNIYXZlRGVCdWZmVHlwZShCdWZmVHlwZS5WZXJ0aWdvKSYmIXN1cGVyLmdldElzRGllKCkpXHJcbiAgICAgICAgICAgICAgICB0aGlzLnNwaW5lLnBhdXNlZD10cnVlOyAgICAgICAgICAgICAgICBcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICB1cGRhdGUoZHQpXHJcbiAgICB7XHJcbiAgICAgICAgaWYoKEdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuY3VyX2dhbWVfc3RhdGUhPUdhbWVTdGF0ZS5HYW1lX1BsYXlpbmcpfHx0aGlzLmdldElzRGllKCkpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHN1cGVyLnVwZGF0ZShkdCk7XHJcbiAgICAgICAgdGhpcy5jaGVja1NraWxsKGR0KTtcclxuICAgICAgICBcclxuICAgICAgICBpZighdGhpcy5pc0hhdmVEZUJ1ZmZUeXBlKEJ1ZmZUeXBlLlZlcnRpZ28pKXtcclxuICAgICAgICAgICAgdGhpcy5jaGVja1lpbkRhbyhkdCk7XHJcbiAgICAgICAgICAgIGlmKHRoaXMuZ2V0RW5lbXlTdGF0ZSgpIT1FbmVteV9TdGF0ZS5za2lsbCl7ICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICB0aGlzLmNoZWNrQXR0KGR0KTsgICAgICAgICAgICBcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0gICAgICAgICAgICAgICAgXHJcbiAgICB9XHJcblxyXG4gICAgLyoq5oqA6IO95qOA5rWLICovXHJcbiAgICBjaGVja1NraWxsKGR0Om51bWJlcil7XHJcbiAgICAgICAgZm9yKGxldCBpPTA7IGk8NDsgaSsrKXtcclxuICAgICAgICAgICAgaWYoaT09MSl7XHJcbiAgICAgICAgICAgICAgICBjb250aW51ZVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmKGk9PTImJnRoaXMuaXNfYWN0aXZlX3NraWxsXzM9PWZhbHNlKXtcclxuICAgICAgICAgICAgICAgIGNvbnRpbnVlXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYodGhpcy5za2lsbF9jb2xkX2Rvd25baV0+MCl7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNraWxsX2NvbGRfZG93bltpXS09ZHQ7XHJcbiAgICAgICAgICAgICAgICBpZihpPT0zKXtcclxuICAgICAgICAgICAgICAgICAgICAvL+a/gOa0u+exu+aKgOiDveS4jeinpuWPke+8jOWPquWcqOatpOiuoeaXtlxyXG4gICAgICAgICAgICAgICAgICAgIGNvbnRpbnVlXHJcbiAgICAgICAgICAgICAgICB9IFxyXG4gICAgICAgICAgICAgICAgaWYodGhpcy5za2lsbF9jb2xkX2Rvd25baV08MCl7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5za2lsbF9jb2xkX2Rvd25baV09MDtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnN0YXJ0U2tpbGwoaSsxKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvLyAvKirlvJXlr7zmo4DmtYsgKi9cclxuICAgIGNoZWNrWWluRGFvKGR0Om51bWJlcil7XHJcbiAgICAgICAgaWYodGhpcy5pc195aW5kYW89PXRydWUmJnRoaXMueWluZGFvX3RpbWU+MCl7XHJcbiAgICAgICAgICAgIHRoaXMueWluZGFvX3RpbWUtPWR0O1xyXG4gICAgICAgICAgICBpZih0aGlzLnlpbmRhb190aW1lPD0wKXtcclxuICAgICAgICAgICAgICAgIC8v57uT5p2f5byV5a+8XHJcbiAgICAgICAgICAgICAgICB0aGlzLmVuZFlpbkRhbygpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMueWluZGFvX2ppc2h1Kz1kdDtcclxuICAgICAgICAgICAgaWYodGhpcy55aW5kYW9famlzaHU+PTEpe1xyXG4gICAgICAgICAgICAgICAgdGhpcy55aW5kYW9famlzaHU9MDtcclxuICAgICAgICAgICAgICAgIHRoaXMuc3RhcnRMYXVuY2goKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKirmlLvlh7vorqHnrpcgKi9cclxuICAgIGNoZWNrQXR0KGR0Om51bWJlcil7ICAgICAgICBcclxuICAgICAgICB0aGlzLmF0dF9qaXNodSs9ZHQ7XHJcbiAgICAgICAgaWYodGhpcy5hdHRfamlzaHU+PXRoaXMuYXR0X2ppYW5nZSl7XHJcbiAgICAgICAgICAgIHRoaXMuYXR0X2ppc2h1PXRoaXMuYXR0X2ppYW5nZTtcclxuICAgICAgICAgICAgdGhpcy5zdGFydEF0dGFjaygpO1xyXG4gICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAvL3RoaXMubW92aW5nKGR0KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuIl19