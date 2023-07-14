"use strict";
cc._RF.push(module, '30f88xUCEhELq2aiO9rNnsD', 'NiuMoBoss');
// Scripts/Boss/Boss5/NiuMoBoss.ts

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
var Monster_1 = require("../../Monster/Monster");
var MonsterData_1 = require("../../Monster/MonsterData");
var MonsterManager_1 = require("../../Monster/MonsterManager");
var AudioConstants_1 = require("../../Sound/AudioConstants");
var WallManager_1 = require("../../Wall/WallManager");
var Boss_1 = require("../Boss");
var Animation_Name;
(function (Animation_Name) {
    Animation_Name["Idle"] = "Idle";
    Animation_Name["attack"] = "Attack";
    Animation_Name["run"] = "Run";
    Animation_Name["hurt1"] = "Hurt";
    Animation_Name["skill1"] = "Skill1";
    Animation_Name["skill2_1"] = "Skill2_1";
    Animation_Name["skill2_2"] = "Skill2_2";
    Animation_Name["skill2_3"] = "Skill2_3";
    Animation_Name["dead"] = "Dead";
})(Animation_Name || (Animation_Name = {}));
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var NiuMoBoss = /** @class */ (function (_super) {
    __extends(NiuMoBoss, _super);
    function NiuMoBoss() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.is_active_skill_2 = false;
        _this.attack_num = 0;
        /**是否处于引导中 */
        _this.is_yindao = true;
        _this.yindao_time = 0;
        /**引导的计数 */
        _this.yindao_jishu = 0;
        _this.kuangbao_value = [];
        /**牛头勇士10481,牛头战士10461,牛头飞刀手10471,牛头萨满20691,牛头将军20681 */
        _this.zhaohuan_id = [10481, 10461, 10471, 20691, 20681];
        /**（3个牛头勇士，8个牛头战士,3个牛头飞刀手,1个牛头萨满，1个牛头将军）" */
        _this.zhaohuan_num = [3, 8, 3, 1, 1];
        /**当前的召唤索引 */
        _this.cur_zhaohuan_index = 0;
        _this.cur_zhaohuan_num = 0;
        return _this;
    }
    NiuMoBoss.prototype.onLoad = function () {
        _super.prototype.onLoad.call(this);
        GameEffectsManager_1.GameEffectsManager.getInstance().addEffectPoolById(GameEffectsManager_1.GameEffectId.boss5_normal_attack_hit, 1);
        GameEffectsManager_1.GameEffectsManager.getInstance().addEffectPoolById(GameEffectsManager_1.GameEffectId.boss5_skill_baozha, 1);
        GameEffectsManager_1.GameEffectsManager.getInstance().addEffectPoolById(GameEffectsManager_1.GameEffectId.boss5_skill_release, 1);
        GameEffectsManager_1.GameEffectsManager.getInstance().addEffectPoolById(GameEffectsManager_1.GameEffectId.monster_zhaohuan, 4);
        for (var i = 0; i < this.zhaohuan_id.length; i++) {
            MonsterManager_1.default.getInstance().addMonsterPool(this.zhaohuan_id[i], 2);
        }
        this.addDeathCallback(this.onDeath);
        this.addXuanYunListen(this.onXuanYunResult);
        this.addBossInitedListen(this.onBossInited);
        this.addChangeBossHpListen(this.onChangeHp);
    };
    NiuMoBoss.prototype.onBossInited = function () {
        this.startIdle();
        this.node.y = 128;
        this.attack_num = 0;
        var distance = this.getAttPos().y - WallManager_1.default.getInstance().getMainWall().getWallMaxYY();
    };
    NiuMoBoss.prototype.onChangeHp = function (num) {
        if (this.cur_hp <= this.max_hp / 2) {
            if (this.is_active_skill_2 == false) {
                this.is_active_skill_2 = true;
                this.startSkill(2);
            }
        }
    };
    NiuMoBoss.prototype.startIdle = function () {
        _super.prototype.setEnemyState.call(this, EnemyConfig_1.Enemy_State.standby);
        _super.prototype.playSpinAnimaton.call(this, Animation_Name.Idle, true);
    };
    NiuMoBoss.prototype.startAttack = function () {
        var _this = this;
        this.att_jishu = 0;
        _super.prototype.setEnemyState.call(this, EnemyConfig_1.Enemy_State.att);
        var data = new MonsterData_1.KeyFrameData();
        data.name = 'Attack';
        data.callback = function () {
            _this.attack_num++;
            _this.att_jishu = 0;
            GameManager_1.default.getInstance().sound_manager.playSound(AudioConstants_1.SoundIndex.YX_Boss5Attack);
            var walls = WallManager_1.default.getInstance().getAllWall();
            var attWall = null;
            walls.forEach(function (wall, wallType) {
                //攻击城墙的条件1，必须在城墙之上,2达到攻击距离
                if (_this.node.y >= wall.getWallMaxYY()) {
                    attWall = wall;
                }
            });
            if (attWall) {
                var injuredData = attWall.beInjured(_super.prototype.getAttData.call(_this, HeroConfig_1.DamageType.Normal, false));
                if (injuredData.getDamageNum() > 0) {
                    GameEffectsManager_1.GameEffectsManager.getInstance().createGameEffectById(GameEffectsManager_1.GameEffectId.boss5_normal_attack_hit, cc.v2(Math.random() * 640 - 320, attWall.getWallMaxYY()));
                }
            }
            if (_this.attack_num >= _this.skill_data.getSkillValue4(1)) {
                //加入技能1
                _this.attack_num = 0;
                _this.skill_queue.push(1);
            }
            //node.getComponent(BossAtt3).init(super.getAttData(DamageType.Normal,true,0),GameEffectId.boss3_normal_attack,1200,Math.PI*3/2,this.node.y,270);
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
    NiuMoBoss.prototype.startSkill = function (skillIndex) {
        switch (skillIndex) {
            case 1:
                {
                    this.startSkill1();
                }
                break;
            case 2:
                {
                    if (this.is_active_skill_2) {
                        this.startSkill2();
                    }
                }
                break;
        }
    };
    //冲击波
    NiuMoBoss.prototype.startSkill1 = function () {
        var _this = this;
        var skillNo = 1;
        var skillIndex = skillNo - 1;
        this.skill_cold_down[skillIndex] = this.skill_data.getSkillColdDown(skillNo);
        if (_super.prototype.getEnemyState.call(this) != EnemyConfig_1.Enemy_State.att && _super.prototype.getEnemyState.call(this) != EnemyConfig_1.Enemy_State.skill) {
            if (!_super.prototype.isHaveDeBuff.call(this, HeroConfig_1.BuffId.Hero_XuanYun)) {
                _super.prototype.setEnemyState.call(this, EnemyConfig_1.Enemy_State.skill);
                this.skill_cold_down[skillIndex] = this.skill_data.getSkillColdDown(skillNo);
                var data = new MonsterData_1.KeyFrameData();
                data.name = 'Skill';
                data.callback = function () {
                    GameManager_1.default.getInstance().sound_manager.playSound(AudioConstants_1.SoundIndex.YX_Boss5Skill);
                    _this.att_jishu = 0;
                    var pos = _super.prototype.getAttPos.call(_this);
                    var baozha = GroundManager_1.default.getInstance().createGameEffectById(GameEffectsManager_1.GameEffectId.boss5_skill_baozha, pos);
                    var fire = GroundManager_1.default.getInstance().createGameEffectById(GameEffectsManager_1.GameEffectId.boss5_skill_release, pos);
                    WallManager_1.default.getInstance().getMainWall().beInjured(_super.prototype.getAttData.call(_this, HeroConfig_1.DamageType.Skill, false, _this.skill_data.getSkillValue1(1)));
                    //鼓舞buff
                    var monsters = MonsterManager_1.default.getInstance().getMonstersForMonsterPos(-1, _this.node.getPosition(), _this.skill_data.getSkillValue2(1));
                    if (monsters) {
                        for (var i = 0; i < monsters.length; i++) {
                            var monsterTs = monsters[i].getComponent(Monster_1.default);
                            if (monsterTs) {
                                var buffData = new BuffData_1.BuffData();
                                buffData.buff_value = [_this.skill_data.getSkillValue3(1)];
                                buffData.buff_id = HeroConfig_1.BuffId.Boss5_Skill_1_guwu;
                                buffData.buff_type = HeroConfig_1.BuffType.MoveSpeedUp;
                                buffData.remain_time = 3;
                                monsterTs.addBuff(buffData);
                            }
                        }
                    }
                };
                _super.prototype.playSpinAnimaton.call(this, (Animation_Name.skill1), false, data, function () {
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
    //召唤
    NiuMoBoss.prototype.startSkill2 = function () {
        var _this = this;
        var skillNo = 2;
        var skillIndex = skillNo - 1;
        this.skill_cold_down[skillIndex] = this.skill_data.getSkillColdDown(skillNo);
        if (_super.prototype.getEnemyState.call(this) != EnemyConfig_1.Enemy_State.att) {
            if (!_super.prototype.isHaveDeBuff.call(this, HeroConfig_1.BuffId.Hero_XuanYun)) {
                GameManager_1.default.getInstance().sound_manager.playSound(AudioConstants_1.SoundIndex.YX_Boss5Beidong);
                _super.prototype.setEnemyState.call(this, EnemyConfig_1.Enemy_State.skill);
                this.skill_cold_down[skillIndex] = this.skill_data.getSkillColdDown(skillNo);
                _super.prototype.playSpinAnimaton.call(this, (Animation_Name.skill2_1), false, null, function () {
                    _super.prototype.playSpinAnimaton.call(_this, (Animation_Name.skill2_2), true, null, null);
                    _this.is_yindao = true;
                    _this.yindao_time = 0.5 * 6;
                    _this.cur_zhaohuan_index = 0;
                    _this.cur_zhaohuan_num = 0;
                    //引导召唤
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
    NiuMoBoss.prototype.startZhaoHuan = function () {
        if (this.cur_zhaohuan_num > 16) {
            return;
        }
        var id = this.zhaohuan_id[this.cur_zhaohuan_index];
        var num = this.zhaohuan_num[this.cur_zhaohuan_index];
        //半径
        var rr = 256;
        var onceRadian = Math.PI * 2 / 15; //16个怪
        for (var i = 0; i < num; i++) {
            var xx = Math.cos(onceRadian * (this.cur_zhaohuan_num)) * rr + this.node.x;
            var yy = Math.sin(onceRadian * (this.cur_zhaohuan_num)) * rr + this.getCenterPos().y;
            MonsterManager_1.default.getInstance().createSummonMonster(id, this.monster_level, cc.v2(xx, yy));
            this.cur_zhaohuan_num++;
        }
        this.cur_zhaohuan_index++;
        if (this.cur_zhaohuan_index >= this.zhaohuan_id.length) {
            this.cur_zhaohuan_index = 0;
        }
    };
    NiuMoBoss.prototype.endYinDao = function (isIdle) {
        var _this = this;
        this.is_yindao = false;
        if (isIdle) {
            _super.prototype.playSpinAnimaton.call(this, (Animation_Name.skill2_3), false, null, function () {
                _this.startIdle();
            });
        }
    };
    NiuMoBoss.prototype.onDeath = function () {
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
    NiuMoBoss.prototype.onXuanYunResult = function (isXuanYun) {
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
    NiuMoBoss.prototype.startXuanYun = function () {
        var _this = this;
        this.endYinDao(false);
        _super.prototype.playSpinAnimaton.call(this, Animation_Name.hurt1, false, null, function () {
            if (_super.prototype.isHaveDeBuffType.call(_this, HeroConfig_1.BuffType.Vertigo) && !_super.prototype.getIsDie.call(_this))
                _this.spine.paused = true;
        });
    };
    NiuMoBoss.prototype.update = function (dt) {
        if ((GameManager_1.default.getInstance().cur_game_state != Constants_1.GameState.Game_Playing) || this.getIsDie()) {
            return;
        }
        _super.prototype.update.call(this, dt);
        this.checkSkill(dt);
        this.checkYinDao(dt);
        if (this.getEnemyState() != EnemyConfig_1.Enemy_State.skill) {
            if (!this.isHaveDeBuff(HeroConfig_1.BuffId.Hero_XuanYun)) {
                this.checkAtt(dt);
            }
        }
    };
    NiuMoBoss.prototype.checkYinDao = function (dt) {
        if (this.is_yindao) {
            this.yindao_time -= dt;
            if (this.yindao_time <= 0) {
                this.yindao_time = 0;
                this.endYinDao(true);
            }
            this.yindao_jishu += dt;
            if (this.yindao_jishu >= 0.5) {
                this.yindao_jishu = 0;
                this.startZhaoHuan();
            }
        }
    };
    /**技能检测 */
    NiuMoBoss.prototype.checkSkill = function (dt) {
        for (var i = 0; i < 2; i++) {
            if (i == 1) {
                //第二个技能
                if (this.is_active_skill_2 == false) {
                    continue;
                }
            }
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
    NiuMoBoss.prototype.checkAtt = function (dt) {
        this.att_jishu += dt;
        if (this.att_jishu >= this.att_jiange) {
            this.att_jishu = this.att_jiange;
            this.startAttack();
        }
        else {
            //this.moving(dt);
        }
    };
    NiuMoBoss = __decorate([
        ccclass
    ], NiuMoBoss);
    return NiuMoBoss;
}(Boss_1.default));
exports.default = NiuMoBoss;

cc._RF.pop();