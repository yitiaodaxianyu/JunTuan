"use strict";
cc._RF.push(module, '4686dpcrThN85/CkhGFlLGm', 'Boss7');
// Scripts/Boss/Boss7/Boss7.ts

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
var Monster_1 = require("../../Monster/Monster");
var MonsterBullet_1 = require("../../Monster/MonsterBullet");
var MonsterData_1 = require("../../Monster/MonsterData");
var MonsterManager_1 = require("../../Monster/MonsterManager");
var AudioConstants_1 = require("../../Sound/AudioConstants");
var WallManager_1 = require("../../Wall/WallManager");
var Boss_1 = require("../Boss");
var BossSkill7_1 = require("./BossSkill7");
var Animation_Name;
(function (Animation_Name) {
    Animation_Name["Idle"] = "Idle";
    Animation_Name["attack"] = "Attack1";
    Animation_Name["run"] = "Run";
    Animation_Name["hurt1"] = "Hurt";
    Animation_Name["skill1"] = "Skill1";
    Animation_Name["skill2"] = "Skill2";
    Animation_Name["skill3"] = "Skill3";
    Animation_Name["dead"] = "Dead";
})(Animation_Name || (Animation_Name = {}));
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var Boss7 = /** @class */ (function (_super) {
    __extends(Boss7, _super);
    function Boss7() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.boss7_buff = null;
        _this.injury_node = null;
        _this.is_active_skill_3 = false;
        _this.active_injury_num = 0;
        /**幽灵巨炮手20721，2个幽灵舵手20731，8个幽灵水手10521，3个幽灵炮手10531 */
        _this.zhaohuan_id = [20721, 20731, 10521, 10531];
        /**（3个幽灵巨炮手，2个幽灵舵手，8个幽灵水手，3个幽灵炮手）" */
        _this.zhaohuan_num = [3, 2, 8, 3];
        return _this;
    }
    Boss7.prototype.onLoad = function () {
        _super.prototype.onLoad.call(this);
        GameEffectsManager_1.GameEffectsManager.getInstance().addEffectPoolById(GameEffectsManager_1.GameEffectId.boss7_attack_bullect, 1);
        GameEffectsManager_1.GameEffectsManager.getInstance().addEffectPoolById(GameEffectsManager_1.GameEffectId.boss7_attack_bullect_hit, 1);
        GameEffectsManager_1.GameEffectsManager.getInstance().addEffectPoolById(GameEffectsManager_1.GameEffectId.boss7_skill_bullect, 4);
        GameEffectsManager_1.GameEffectsManager.getInstance().addEffectPoolById(GameEffectsManager_1.GameEffectId.boss7_skill_bullect_hit, 4);
        GameEffectsManager_1.GameEffectsManager.getInstance().addEffectPoolById(GameEffectsManager_1.GameEffectId.monster_zhaohuan, 4);
        GameEffectsManager_1.GameEffectsManager.getInstance().addEffectPoolById(GameEffectsManager_1.GameEffectId.xuanyun, 4);
        for (var i = 0; i < this.zhaohuan_id.length; i++) {
            MonsterManager_1.default.getInstance().addMonsterPool(this.zhaohuan_id[i], 2);
        }
        this.addDeathCallback(this.onDeath);
        this.addXuanYunListen(this.onXuanYunResult);
        this.addBossInitedListen(this.onBossInited);
        this.addChangeBossHpListen(this.onChangeHp);
        this.addInjuryCallback(this.onActiveInjury);
    };
    Boss7.prototype.onBossInited = function () {
        this.startIdle();
        this.node.y = 128;
        this.active_injury_num = 0;
    };
    Boss7.prototype.onChangeHp = function (num) {
        if (this.cur_hp <= this.max_hp / 3) {
            if (this.is_active_skill_3 == false) {
                this.is_active_skill_3 = true;
                this.startSkill(3);
            }
        }
    };
    Boss7.prototype.onActiveInjury = function () {
        this.active_injury_num++;
        this.showInjuryNum();
        if (this.active_injury_num >= this.skill_data.getSkillValue1(1)) {
            this.active_injury_num = 0;
            this.startSkill1();
        }
    };
    Boss7.prototype.showInjuryNum = function () {
        if (this.injury_node) {
            this.injury_node.getChildByName('num').getComponent(cc.Label).string = this.active_injury_num.toString();
        }
        else {
            this.injury_node = cc.instantiate(this.boss7_buff);
            var hpRoot = cc.find('Canvas/Ui_Root/top_ui/BossHpRoot');
            hpRoot.addChild(this.injury_node);
            this.injury_node.x = -220;
            this.injury_node.getChildByName('num').getComponent(cc.Label).string = this.active_injury_num.toString();
        }
    };
    Boss7.prototype.startIdle = function () {
        _super.prototype.setEnemyState.call(this, EnemyConfig_1.Enemy_State.standby);
        _super.prototype.playSpinAnimaton.call(this, Animation_Name.Idle, true);
    };
    Boss7.prototype.startAttack = function () {
        var _this = this;
        this.att_jishu = 0;
        _super.prototype.setEnemyState.call(this, EnemyConfig_1.Enemy_State.att);
        var data = new MonsterData_1.KeyFrameData();
        data.name = 'Attack';
        data.callback = function () {
            _this.att_jishu = 0;
            GameManager_1.default.getInstance().sound_manager.playSound(AudioConstants_1.SoundIndex.YX_boss7Attack);
            var bullect = GameEffectsManager_1.GameEffectsManager.getInstance().createGameEffectById(GameEffectsManager_1.GameEffectId.boss7_attack_bullect, _this.getAttPos());
            bullect.getComponent(MonsterBullet_1.default).init(_this.getAttData(HeroConfig_1.DamageType.Normal, true), GameEffectsManager_1.GameEffectId.boss7_attack_bullect, GameEffectsManager_1.GameEffectId.boss7_attack_bullect_hit, 1600, Math.PI * 3 / 2);
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
    Boss7.prototype.startSkill = function (skillIndex) {
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
    //投弹
    Boss7.prototype.startSkill1 = function () {
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
                    GameManager_1.default.getInstance().sound_manager.playSound(AudioConstants_1.SoundIndex.YX_boss7Skill1);
                    _this.att_jishu = 0;
                    var danNum = _this.skill_data.getSkillValue2(1);
                    var wallPos = WallManager_1.default.getInstance().getMainWall().getWallRect().center;
                    var _loop_1 = function (i) {
                        _this.scheduleOnce(function () {
                            var createPos = cc.v2(Math.random() * 600 - 300, cc.winSize.height);
                            var node = GameEffectsManager_1.GameEffectsManager.getInstance().createGameEffectById(GameEffectsManager_1.GameEffectId.boss7_skill_bullect, createPos);
                            node.getComponent(BossSkill7_1.default).init(_this.getAttData(HeroConfig_1.DamageType.Skill, false, _this.skill_data.getSkillValue3(1)), Math.random() * 200 - 100 + wallPos.y, 1500, Math.random() * 10 + 30, i == 0);
                        }, i * 0.1);
                    };
                    for (var i = 0; i < danNum; i++) {
                        _loop_1(i);
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
    Boss7.prototype.startSkill2 = function () {
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
                data.name = 'Skill2';
                data.callback = function () {
                    _this.att_jishu = 0;
                    _this.startZhaoHuan();
                    //回血20%
                    _this.beHeal(_this.getMaxHp() * 0.1);
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
    Boss7.prototype.startZhaoHuan = function () {
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
    Boss7.prototype.startSkill3 = function () {
        var _this = this;
        var skillNo = 3;
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
                    //鼓舞buff
                    var monsters = MonsterManager_1.default.getInstance().getMonstersForMonsterPos(-1, _this.node.getPosition(), _this.skill_data.getSkillValue1(skillNo));
                    if (monsters) {
                        for (var i = 0; i < monsters.length; i++) {
                            var monsterTs = monsters[i].getComponent(Monster_1.default);
                            if (monsterTs) {
                                var buffData = new BuffData_1.BuffData();
                                buffData.buff_value = [_this.skill_data.getSkillValue2(skillNo)];
                                buffData.buff_id = HeroConfig_1.BuffId.Boss5_Skill_1_guwu;
                                buffData.buff_type = HeroConfig_1.BuffType.MoveSpeedUp;
                                buffData.remain_time = 5;
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
    Boss7.prototype.onDeath = function () {
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
    Boss7.prototype.onXuanYunResult = function (isXuanYun) {
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
    Boss7.prototype.startXuanYun = function () {
        var _this = this;
        _super.prototype.playSpinAnimaton.call(this, Animation_Name.hurt1, false, null, function () {
            if (_super.prototype.isHaveDeBuffType.call(_this, HeroConfig_1.BuffType.Vertigo) && !_super.prototype.getIsDie.call(_this))
                _this.spine.paused = true;
        });
    };
    Boss7.prototype.update = function (dt) {
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
    Boss7.prototype.checkSkill = function (dt) {
        for (var i = 0; i < 3; i++) {
            if (i == 2) {
                //第3个技能
                if (this.is_active_skill_3 == false) {
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
    Boss7.prototype.checkAtt = function (dt) {
        this.att_jishu += dt;
        if (this.att_jishu >= this.att_jiange) {
            this.att_jishu = this.att_jiange;
            this.startAttack();
        }
    };
    __decorate([
        property(cc.Prefab)
    ], Boss7.prototype, "boss7_buff", void 0);
    Boss7 = __decorate([
        ccclass
    ], Boss7);
    return Boss7;
}(Boss_1.default));
exports.default = Boss7;

cc._RF.pop();