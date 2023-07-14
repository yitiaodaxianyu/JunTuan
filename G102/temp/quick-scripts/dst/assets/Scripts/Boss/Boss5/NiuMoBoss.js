
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Scripts/Boss/Boss5/NiuMoBoss.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0c1xcQm9zc1xcQm9zczVcXE5pdU1vQm9zcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSw2Q0FBNEM7QUFDNUMsdURBQXNEO0FBQ3RELG9FQUFpRjtBQUNqRiwwREFBcUQ7QUFDckQsaURBQTRDO0FBQzVDLHFEQUFvRDtBQUNwRCx5REFBMEU7QUFDMUUsaURBQTRDO0FBQzVDLHlEQUF1RTtBQUN2RSwrREFBMEQ7QUFDMUQsNkRBQXdEO0FBSXhELHNEQUFpRDtBQUNqRCxnQ0FBMkI7QUFDM0IsSUFBSyxjQVdKO0FBWEQsV0FBSyxjQUFjO0lBRWYsK0JBQWEsQ0FBQTtJQUNiLG1DQUFpQixDQUFBO0lBQ2pCLDZCQUFXLENBQUE7SUFDWCxnQ0FBYyxDQUFBO0lBQ2QsbUNBQWlCLENBQUE7SUFDakIsdUNBQXFCLENBQUE7SUFDckIsdUNBQXFCLENBQUE7SUFDckIsdUNBQXFCLENBQUE7SUFDckIsK0JBQVksQ0FBQTtBQUNoQixDQUFDLEVBWEksY0FBYyxLQUFkLGNBQWMsUUFXbEI7QUFFSyxJQUFBLEtBQXNCLEVBQUUsQ0FBQyxVQUFVLEVBQWxDLE9BQU8sYUFBQSxFQUFFLFFBQVEsY0FBaUIsQ0FBQztBQUcxQztJQUF1Qyw2QkFBSTtJQUEzQztRQUFBLHFFQTBVQztRQXhVRyx1QkFBaUIsR0FBUyxLQUFLLENBQUM7UUFDaEMsZ0JBQVUsR0FBUSxDQUFDLENBQUM7UUFDcEIsYUFBYTtRQUNiLGVBQVMsR0FBUyxJQUFJLENBQUM7UUFDdkIsaUJBQVcsR0FBUSxDQUFDLENBQUM7UUFDckIsV0FBVztRQUNYLGtCQUFZLEdBQVEsQ0FBQyxDQUFDO1FBQ3RCLG9CQUFjLEdBQVUsRUFBRSxDQUFDO1FBQzNCLHdEQUF3RDtRQUN4RCxpQkFBVyxHQUFVLENBQUMsS0FBSyxFQUFDLEtBQUssRUFBQyxLQUFLLEVBQUMsS0FBSyxFQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ3JE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LENBQUMsQ0FBQztvQkFDMUIsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDLEdBQUMsQ0FBQyxDQUFDLENBQUM7aUJBQ3hCO2FBQ0o7U0FDSjtJQUNMLENBQUM7SUFFRCxVQUFVO0lBQ1YsNEJBQVEsR0FBUixVQUFTLEVBQVM7UUFDZCxJQUFJLENBQUMsU0FBUyxJQUFFLEVBQUUsQ0FBQztRQUNuQixJQUFHLElBQUksQ0FBQyxTQUFTLElBQUUsSUFBSSxDQUFDLFVBQVUsRUFBQztZQUMvQixJQUFJLENBQUMsU0FBUyxHQUFDLElBQUksQ0FBQyxVQUFVLENBQUM7WUFDL0IsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDO1NBQ3RCO2FBQUk7WUFDRCxrQkFBa0I7U0FDckI7SUFDTCxDQUFDO0lBeFVnQixTQUFTO1FBRDdCLE9BQU87T0FDYSxTQUFTLENBMFU3QjtJQUFELGdCQUFDO0NBMVVELEFBMFVDLENBMVVzQyxjQUFJLEdBMFUxQztrQkExVW9CLFNBQVMiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBHYW1lU3RhdGUgfSBmcm9tIFwiLi4vLi4vQ29uc3RhbnRzXCI7XHJcbmltcG9ydCB7IEVuZW15X1N0YXRlIH0gZnJvbSBcIi4uLy4uL0VuZW15L0VuZW15Q29uZmlnXCI7XHJcbmltcG9ydCB7IEdhbWVFZmZlY3RzTWFuYWdlciwgR2FtZUVmZmVjdElkIH0gZnJvbSBcIi4uLy4uL0dhbWUvR2FtZUVmZmVjdHNNYW5hZ2VyXCI7XHJcbmltcG9ydCBHcm91bmRNYW5hZ2VyIGZyb20gXCIuLi8uLi9HYW1lL0dyb3VuZE1hbmFnZXJcIjtcclxuaW1wb3J0IEdhbWVNYW5hZ2VyIGZyb20gXCIuLi8uLi9HYW1lTWFuYWdlclwiO1xyXG5pbXBvcnQgeyBCdWZmRGF0YSB9IGZyb20gXCIuLi8uLi9IZXJvL0dhbWUvQnVmZkRhdGFcIjtcclxuaW1wb3J0IHsgRGFtYWdlVHlwZSwgQnVmZklkLCBCdWZmVHlwZSB9IGZyb20gXCIuLi8uLi9IZXJvL0dhbWUvSGVyb0NvbmZpZ1wiO1xyXG5pbXBvcnQgTW9uc3RlciBmcm9tIFwiLi4vLi4vTW9uc3Rlci9Nb25zdGVyXCI7XHJcbmltcG9ydCB7IEtleUZyYW1lRGF0YSwgU3RyZW5ndGhUeXBlIH0gZnJvbSBcIi4uLy4uL01vbnN0ZXIvTW9uc3RlckRhdGFcIjtcclxuaW1wb3J0IE1vbnN0ZXJNYW5hZ2VyIGZyb20gXCIuLi8uLi9Nb25zdGVyL01vbnN0ZXJNYW5hZ2VyXCI7XHJcbmltcG9ydCB7IFNvdW5kSW5kZXggfSBmcm9tIFwiLi4vLi4vU291bmQvQXVkaW9Db25zdGFudHNcIjtcclxuaW1wb3J0IE15VG9vbCBmcm9tIFwiLi4vLi4vVG9vbHMvTXlUb29sXCI7XHJcbmltcG9ydCBXYWxsIGZyb20gXCIuLi8uLi9XYWxsL1dhbGxcIjtcclxuaW1wb3J0IHsgV2FsbFR5cGUgfSBmcm9tIFwiLi4vLi4vV2FsbC9XYWxsQ29uZmlnXCI7XHJcbmltcG9ydCBXYWxsTWFuYWdlciBmcm9tIFwiLi4vLi4vV2FsbC9XYWxsTWFuYWdlclwiO1xyXG5pbXBvcnQgQm9zcyBmcm9tIFwiLi4vQm9zc1wiO1xyXG5lbnVtIEFuaW1hdGlvbl9OYW1lXHJcbntcclxuICAgIElkbGUgPSBcIklkbGVcIiwgICAgICAgLy8tLSDmraPpnaLlvoXmnLpcclxuICAgIGF0dGFjayA9IFwiQXR0YWNrXCIsICAgICAgICAgIC8vLS0g5pS75Ye7MVxyXG4gICAgcnVuID0gXCJSdW5cIiwgICAgICAgICAgICAgICAgLy8tLSDot5Hot69cclxuICAgIGh1cnQxID0gXCJIdXJ0XCIsICAgICAgICAgIC8vLS0g5Y+X5Ye7MVxyXG4gICAgc2tpbGwxID0gXCJTa2lsbDFcIiwgICAgICAgICAgLy8tLSDmioDog70xXHJcbiAgICBza2lsbDJfMSA9IFwiU2tpbGwyXzFcIiwgICAgICAgICAgLy8tLSDmioDog70yLTHlvIDlp4vok4TliptcclxuICAgIHNraWxsMl8yID0gXCJTa2lsbDJfMlwiLCAgICAgICAgICAvLy0tIOaKgOiDvTItMuiThOWKm1xyXG4gICAgc2tpbGwyXzMgPSBcIlNraWxsMl8zXCIsICAgICAgICAgIC8vLS0g5oqA6IO9Mi0z6JOE5Yqb57uT5p2fXHJcbiAgICBkZWFkPSBcIkRlYWRcIiwgICAvL+atu+S6oVxyXG59XHJcblxyXG5jb25zdCB7Y2NjbGFzcywgcHJvcGVydHl9ID0gY2MuX2RlY29yYXRvcjtcclxuXHJcbkBjY2NsYXNzXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIE5pdU1vQm9zcyBleHRlbmRzIEJvc3Mge1xyXG4gICAgXHJcbiAgICBpc19hY3RpdmVfc2tpbGxfMjpib29sZWFuPWZhbHNlO1xyXG4gICAgYXR0YWNrX251bTpudW1iZXI9MDtcclxuICAgIC8qKuaYr+WQpuWkhOS6juW8leWvvOS4rSAqL1xyXG4gICAgaXNfeWluZGFvOmJvb2xlYW49dHJ1ZTtcclxuICAgIHlpbmRhb190aW1lOm51bWJlcj0wO1xyXG4gICAgLyoq5byV5a+855qE6K6h5pWwICovXHJcbiAgICB5aW5kYW9famlzaHU6bnVtYmVyPTA7XHJcbiAgICBrdWFuZ2Jhb192YWx1ZTpudW1iZXJbXT1bXTtcclxuICAgIC8qKueJm+WktOWLh+WjqzEwNDgxLOeJm+WktOaImOWjqzEwNDYxLOeJm+WktOmjnuWIgOaJizEwNDcxLOeJm+WktOiQqOa7oTIwNjkxLOeJm+WktOWwhuWGmzIwNjgxICovXHJcbiAgICB6aGFvaHVhbl9pZDpudW1iZXJbXT1bMTA0ODEsMTA0NjEsMTA0NzEsMjA2OTEsMjA2ODFdO1xyXG4gICAgLyoq77yIM+S4queJm+WktOWLh+Wjq++8jDjkuKrniZvlpLTmiJjlo6ssM+S4queJm+WktOmjnuWIgOaJiywx5Liq54mb5aS06JCo5ruh77yMMeS4queJm+WktOWwhuWGm++8iVwiICovXHJcbiAgICB6aGFvaHVhbl9udW06bnVtYmVyW109WzMsOCwzLDEsMV07XHJcbiAgICAvKirlvZPliY3nmoTlj6zllKTntKLlvJUgKi9cclxuICAgIGN1cl96aGFvaHVhbl9pbmRleDpudW1iZXI9MDtcclxuICAgIGN1cl96aGFvaHVhbl9udW06bnVtYmVyPTA7XHJcblxyXG4gICAgb25Mb2FkKCk6IHZvaWQge1xyXG4gICAgICAgIHN1cGVyLm9uTG9hZCgpO1xyXG4gICAgICAgIEdhbWVFZmZlY3RzTWFuYWdlci5nZXRJbnN0YW5jZSgpLmFkZEVmZmVjdFBvb2xCeUlkKEdhbWVFZmZlY3RJZC5ib3NzNV9ub3JtYWxfYXR0YWNrX2hpdCwxKTtcclxuICAgICAgICBHYW1lRWZmZWN0c01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5hZGRFZmZlY3RQb29sQnlJZChHYW1lRWZmZWN0SWQuYm9zczVfc2tpbGxfYmFvemhhLDEpO1xyXG4gICAgICAgIEdhbWVFZmZlY3RzTWFuYWdlci5nZXRJbnN0YW5jZSgpLmFkZEVmZmVjdFBvb2xCeUlkKEdhbWVFZmZlY3RJZC5ib3NzNV9za2lsbF9yZWxlYXNlLDEpO1xyXG4gICAgICAgIEdhbWVFZmZlY3RzTWFuYWdlci5nZXRJbnN0YW5jZSgpLmFkZEVmZmVjdFBvb2xCeUlkKEdhbWVFZmZlY3RJZC5tb25zdGVyX3poYW9odWFuLDQpO1xyXG4gICAgICAgIGZvcihsZXQgaT0wOyBpPHRoaXMuemhhb2h1YW5faWQubGVuZ3RoOyBpKyspe1xyXG4gICAgICAgICAgICBNb25zdGVyTWFuYWdlci5nZXRJbnN0YW5jZSgpLmFkZE1vbnN0ZXJQb29sKHRoaXMuemhhb2h1YW5faWRbaV0sMik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuYWRkRGVhdGhDYWxsYmFjayh0aGlzLm9uRGVhdGgpO1xyXG4gICAgICAgIHRoaXMuYWRkWHVhbll1bkxpc3Rlbih0aGlzLm9uWHVhbll1blJlc3VsdCk7XHJcbiAgICAgICAgdGhpcy5hZGRCb3NzSW5pdGVkTGlzdGVuKHRoaXMub25Cb3NzSW5pdGVkKTtcclxuICAgICAgICB0aGlzLmFkZENoYW5nZUJvc3NIcExpc3Rlbih0aGlzLm9uQ2hhbmdlSHApO1xyXG4gICAgfVxyXG5cclxuICAgIG9uQm9zc0luaXRlZCgpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLnN0YXJ0SWRsZSgpO1xyXG4gICAgICAgIHRoaXMubm9kZS55PTEyODtcclxuICAgICAgICB0aGlzLmF0dGFja19udW09MDtcclxuICAgICAgICBsZXQgZGlzdGFuY2U9dGhpcy5nZXRBdHRQb3MoKS55LVdhbGxNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0TWFpbldhbGwoKS5nZXRXYWxsTWF4WVkoKSAgICAgICAgXHJcbiAgICB9XHJcblxyXG4gICAgb25DaGFuZ2VIcChudW06bnVtYmVyKXtcclxuICAgICAgICBpZih0aGlzLmN1cl9ocDw9dGhpcy5tYXhfaHAvMil7XHJcbiAgICAgICAgICAgIGlmKHRoaXMuaXNfYWN0aXZlX3NraWxsXzI9PWZhbHNlKXtcclxuICAgICAgICAgICAgICAgIHRoaXMuaXNfYWN0aXZlX3NraWxsXzI9dHJ1ZTtcclxuICAgICAgICAgICAgICAgIHRoaXMuc3RhcnRTa2lsbCgyKTtcclxuICAgICAgICAgICAgfSAgICAgICAgICAgXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHN0YXJ0SWRsZSgpeyAgICAgICAgXHJcbiAgICAgICAgc3VwZXIuc2V0RW5lbXlTdGF0ZShFbmVteV9TdGF0ZS5zdGFuZGJ5KTtcclxuICAgICAgICBzdXBlci5wbGF5U3BpbkFuaW1hdG9uKEFuaW1hdGlvbl9OYW1lLklkbGUsdHJ1ZSk7XHJcbiAgICAgICAgXHJcbiAgICB9XHJcblxyXG4gICAgc3RhcnRBdHRhY2soKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5hdHRfamlzaHU9MDtcclxuICAgICAgICBzdXBlci5zZXRFbmVteVN0YXRlKEVuZW15X1N0YXRlLmF0dCk7XHJcbiAgICAgICAgbGV0IGRhdGE9bmV3IEtleUZyYW1lRGF0YSgpO1xyXG4gICAgICAgIGRhdGEubmFtZT0nQXR0YWNrJztcclxuICAgICAgICBkYXRhLmNhbGxiYWNrPSgpPT57XHJcbiAgICAgICAgICAgIHRoaXMuYXR0YWNrX251bSsrO1xyXG4gICAgICAgICAgICB0aGlzLmF0dF9qaXNodT0wO1xyXG4gICAgICAgICAgICBHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNvdW5kX21hbmFnZXIucGxheVNvdW5kKFNvdW5kSW5kZXguWVhfQm9zczVBdHRhY2spO1xyXG4gICAgICAgICAgICBsZXQgd2FsbHM9V2FsbE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRBbGxXYWxsKCk7XHJcbiAgICAgICAgICAgIGxldCBhdHRXYWxsPW51bGw7XHJcbiAgICAgICAgICAgIHdhbGxzLmZvckVhY2goKHdhbGw6V2FsbCx3YWxsVHlwZTpXYWxsVHlwZSk9PntcclxuICAgICAgICAgICAgICAgIC8v5pS75Ye75Z+O5aKZ55qE5p2h5Lu2Me+8jOW/hemhu+WcqOWfjuWimeS5i+S4iiwy6L6+5Yiw5pS75Ye76Led56a7XHJcbiAgICAgICAgICAgICAgICBpZih0aGlzLm5vZGUueT49d2FsbC5nZXRXYWxsTWF4WVkoKSl7ICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgIGF0dFdhbGw9d2FsbDtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgaWYoYXR0V2FsbCl7XHJcbiAgICAgICAgICAgICAgICBsZXQgaW5qdXJlZERhdGE9YXR0V2FsbC5iZUluanVyZWQoc3VwZXIuZ2V0QXR0RGF0YShEYW1hZ2VUeXBlLk5vcm1hbCxmYWxzZSkpO1xyXG4gICAgICAgICAgICAgICAgaWYoaW5qdXJlZERhdGEuZ2V0RGFtYWdlTnVtKCk+MCl7ICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICBHYW1lRWZmZWN0c01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5jcmVhdGVHYW1lRWZmZWN0QnlJZChHYW1lRWZmZWN0SWQuYm9zczVfbm9ybWFsX2F0dGFja19oaXQsY2MudjIoTWF0aC5yYW5kb20oKSo2NDAtMzIwLGF0dFdhbGwuZ2V0V2FsbE1heFlZKCkpKTtcclxuICAgICAgICAgICAgICAgIH0gXHJcbiAgICAgICAgICAgIH0gICAgICAgICAgICBcclxuICAgICAgICAgICAgaWYodGhpcy5hdHRhY2tfbnVtPj10aGlzLnNraWxsX2RhdGEuZ2V0U2tpbGxWYWx1ZTQoMSkpe1xyXG4gICAgICAgICAgICAgICAgLy/liqDlhaXmioDog70xXHJcbiAgICAgICAgICAgICAgICB0aGlzLmF0dGFja19udW09MDtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2tpbGxfcXVldWUucHVzaCgxKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAvL25vZGUuZ2V0Q29tcG9uZW50KEJvc3NBdHQzKS5pbml0KHN1cGVyLmdldEF0dERhdGEoRGFtYWdlVHlwZS5Ob3JtYWwsdHJ1ZSwwKSxHYW1lRWZmZWN0SWQuYm9zczNfbm9ybWFsX2F0dGFjaywxMjAwLE1hdGguUEkqMy8yLHRoaXMubm9kZS55LDI3MCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHN1cGVyLnBsYXlTcGluQW5pbWF0b24oKEFuaW1hdGlvbl9OYW1lLmF0dGFjayksZmFsc2UsZGF0YSwoKT0+e1xyXG4gICAgICAgICAgICBpZih0aGlzLnNraWxsX3F1ZXVlLmxlbmd0aD4wKXtcclxuICAgICAgICAgICAgICAgIHN1cGVyLnNldEVuZW15U3RhdGUoRW5lbXlfU3RhdGUuc3RhbmRieSk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnN0YXJ0U2tpbGwodGhpcy5za2lsbF9xdWV1ZS5zaGlmdCgpKTtcclxuICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnN0YXJ0SWRsZSgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSlcclxuICAgIH1cclxuICAgIHN0YXJ0U2tpbGwoc2tpbGxJbmRleDpudW1iZXIpe1xyXG4gICAgICAgIHN3aXRjaChza2lsbEluZGV4KXtcclxuICAgICAgICAgICAgY2FzZSAxOntcclxuICAgICAgICAgICAgICAgIHRoaXMuc3RhcnRTa2lsbDEoKTtcclxuICAgICAgICAgICAgfWJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIDI6e1xyXG4gICAgICAgICAgICAgICAgaWYodGhpcy5pc19hY3RpdmVfc2tpbGxfMil7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zdGFydFNraWxsMigpO1xyXG4gICAgICAgICAgICAgICAgfSAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgfWJyZWFrO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIFxyXG4gICAgLy/lhrLlh7vms6JcclxuICAgIHN0YXJ0U2tpbGwxKCl7XHJcbiAgICAgICAgbGV0IHNraWxsTm89MTtcclxuICAgICAgICBsZXQgc2tpbGxJbmRleD1za2lsbE5vLTE7XHJcbiAgICAgICAgdGhpcy5za2lsbF9jb2xkX2Rvd25bc2tpbGxJbmRleF09dGhpcy5za2lsbF9kYXRhLmdldFNraWxsQ29sZERvd24oc2tpbGxObyk7ICAgICAgICBcclxuICAgICAgICBpZihzdXBlci5nZXRFbmVteVN0YXRlKCkhPUVuZW15X1N0YXRlLmF0dCYmc3VwZXIuZ2V0RW5lbXlTdGF0ZSgpIT1FbmVteV9TdGF0ZS5za2lsbCl7XHJcbiAgICAgICAgICAgIGlmKCFzdXBlci5pc0hhdmVEZUJ1ZmYoQnVmZklkLkhlcm9fWHVhbll1bikpe1xyXG4gICAgICAgICAgICAgICAgc3VwZXIuc2V0RW5lbXlTdGF0ZShFbmVteV9TdGF0ZS5za2lsbCk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNraWxsX2NvbGRfZG93bltza2lsbEluZGV4XT10aGlzLnNraWxsX2RhdGEuZ2V0U2tpbGxDb2xkRG93bihza2lsbE5vKTtcclxuICAgICAgICAgICAgICAgIGxldCBkYXRhPW5ldyBLZXlGcmFtZURhdGEoKTtcclxuICAgICAgICAgICAgICAgIGRhdGEubmFtZT0nU2tpbGwnO1xyXG4gICAgICAgICAgICAgICAgZGF0YS5jYWxsYmFjaz0oKT0+e1xyXG4gICAgICAgICAgICAgICAgICAgIEdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuc291bmRfbWFuYWdlci5wbGF5U291bmQoU291bmRJbmRleC5ZWF9Cb3NzNVNraWxsKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmF0dF9qaXNodT0wO1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBwb3M9c3VwZXIuZ2V0QXR0UG9zKClcclxuICAgICAgICAgICAgICAgICAgICBsZXQgYmFvemhhPUdyb3VuZE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5jcmVhdGVHYW1lRWZmZWN0QnlJZChHYW1lRWZmZWN0SWQuYm9zczVfc2tpbGxfYmFvemhhLHBvcyk7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IGZpcmU9R3JvdW5kTWFuYWdlci5nZXRJbnN0YW5jZSgpLmNyZWF0ZUdhbWVFZmZlY3RCeUlkKEdhbWVFZmZlY3RJZC5ib3NzNV9za2lsbF9yZWxlYXNlLHBvcyk7XHJcbiAgICAgICAgICAgICAgICAgICAgV2FsbE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRNYWluV2FsbCgpLmJlSW5qdXJlZChzdXBlci5nZXRBdHREYXRhKERhbWFnZVR5cGUuU2tpbGwsZmFsc2UsdGhpcy5za2lsbF9kYXRhLmdldFNraWxsVmFsdWUxKDEpKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgLy/pvJPoiJ5idWZmXHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IG1vbnN0ZXJzPU1vbnN0ZXJNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0TW9uc3RlcnNGb3JNb25zdGVyUG9zKC0xLHRoaXMubm9kZS5nZXRQb3NpdGlvbigpLHRoaXMuc2tpbGxfZGF0YS5nZXRTa2lsbFZhbHVlMigxKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYobW9uc3RlcnMpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBmb3IobGV0IGk9MDsgaTxtb25zdGVycy5sZW5ndGg7IGkrKyl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgbW9uc3RlclRzPW1vbnN0ZXJzW2ldLmdldENvbXBvbmVudChNb25zdGVyKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmKG1vbnN0ZXJUcyl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGJ1ZmZEYXRhPW5ldyBCdWZmRGF0YSgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJ1ZmZEYXRhLmJ1ZmZfdmFsdWU9W3RoaXMuc2tpbGxfZGF0YS5nZXRTa2lsbFZhbHVlMygxKV07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYnVmZkRhdGEuYnVmZl9pZD1CdWZmSWQuQm9zczVfU2tpbGxfMV9ndXd1O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJ1ZmZEYXRhLmJ1ZmZfdHlwZT1CdWZmVHlwZS5Nb3ZlU3BlZWRVcDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBidWZmRGF0YS5yZW1haW5fdGltZT0zO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1vbnN0ZXJUcy5hZGRCdWZmKGJ1ZmZEYXRhKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHN1cGVyLnBsYXlTcGluQW5pbWF0b24oKEFuaW1hdGlvbl9OYW1lLnNraWxsMSksZmFsc2UsZGF0YSwoKT0+e1xyXG4gICAgICAgICAgICAgICAgICAgIGlmKHRoaXMuc2tpbGxfcXVldWUubGVuZ3RoPjApe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzdXBlci5zZXRFbmVteVN0YXRlKEVuZW15X1N0YXRlLnN0YW5kYnkpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnN0YXJ0U2tpbGwodGhpcy5za2lsbF9xdWV1ZS5zaGlmdCgpKTtcclxuICAgICAgICAgICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zdGFydElkbGUoKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgIGlmKHRoaXMuc2tpbGxfcXVldWUuaW5kZXhPZihza2lsbE5vKTwwKXtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnNraWxsX3F1ZXVlLnB1c2goc2tpbGxObyk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgaWYodGhpcy5za2lsbF9xdWV1ZS5pbmRleE9mKHNraWxsTm8pPDApe1xyXG4gICAgICAgICAgICAgICAgdGhpcy5za2lsbF9xdWV1ZS5wdXNoKHNraWxsTm8pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8v5Y+s5ZSkXHJcbiAgICBzdGFydFNraWxsMigpe1xyXG4gICAgICAgIGxldCBza2lsbE5vPTI7XHJcbiAgICAgICAgbGV0IHNraWxsSW5kZXg9c2tpbGxOby0xO1xyXG4gICAgICAgIHRoaXMuc2tpbGxfY29sZF9kb3duW3NraWxsSW5kZXhdPXRoaXMuc2tpbGxfZGF0YS5nZXRTa2lsbENvbGREb3duKHNraWxsTm8pO1xyXG4gICAgICAgIGlmKHN1cGVyLmdldEVuZW15U3RhdGUoKSE9RW5lbXlfU3RhdGUuYXR0KXtcclxuICAgICAgICAgICAgaWYoIXN1cGVyLmlzSGF2ZURlQnVmZihCdWZmSWQuSGVyb19YdWFuWXVuKSl7XHJcbiAgICAgICAgICAgICAgICBHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNvdW5kX21hbmFnZXIucGxheVNvdW5kKFNvdW5kSW5kZXguWVhfQm9zczVCZWlkb25nKTtcclxuICAgICAgICAgICAgICAgIHN1cGVyLnNldEVuZW15U3RhdGUoRW5lbXlfU3RhdGUuc2tpbGwpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5za2lsbF9jb2xkX2Rvd25bc2tpbGxJbmRleF09dGhpcy5za2lsbF9kYXRhLmdldFNraWxsQ29sZERvd24oc2tpbGxObyk7XHJcbiAgICAgICAgICAgICAgICBzdXBlci5wbGF5U3BpbkFuaW1hdG9uKChBbmltYXRpb25fTmFtZS5za2lsbDJfMSksZmFsc2UsbnVsbCwoKT0+e1xyXG4gICAgICAgICAgICAgICAgICAgIHN1cGVyLnBsYXlTcGluQW5pbWF0b24oKEFuaW1hdGlvbl9OYW1lLnNraWxsMl8yKSx0cnVlLG51bGwsbnVsbCk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5pc195aW5kYW89dHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnlpbmRhb190aW1lPTAuNSo2O1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY3VyX3poYW9odWFuX2luZGV4PTA7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jdXJfemhhb2h1YW5fbnVtPTA7XHJcbiAgICAgICAgICAgICAgICAgICAgLy/lvJXlr7zlj6zllKRcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgaWYodGhpcy5za2lsbF9xdWV1ZS5pbmRleE9mKHNraWxsTm8pPDApe1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2tpbGxfcXVldWUucHVzaChza2lsbE5vKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICBpZih0aGlzLnNraWxsX3F1ZXVlLmluZGV4T2Yoc2tpbGxObyk8MCl7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNraWxsX3F1ZXVlLnB1c2goc2tpbGxObyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoq5byA5aeL5Y+s5ZSkICovXHJcbiAgICBzdGFydFpoYW9IdWFuKCl7XHJcbiAgICAgICAgaWYodGhpcy5jdXJfemhhb2h1YW5fbnVtPjE2KXtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICBsZXQgaWQ9dGhpcy56aGFvaHVhbl9pZFt0aGlzLmN1cl96aGFvaHVhbl9pbmRleF07XHJcbiAgICAgICAgbGV0IG51bT10aGlzLnpoYW9odWFuX251bVt0aGlzLmN1cl96aGFvaHVhbl9pbmRleF07XHJcbiAgICAgICAgLy/ljYrlvoRcclxuICAgICAgICBsZXQgcnI9MjU2O1xyXG4gICAgICAgIGxldCBvbmNlUmFkaWFuPU1hdGguUEkqMi8xNTsvLzE25Liq5oCqXHJcbiAgICAgICAgZm9yKGxldCBpPTA7IGk8bnVtOyBpKyspe1xyXG4gICAgICAgICAgICBsZXQgeHg9TWF0aC5jb3Mob25jZVJhZGlhbioodGhpcy5jdXJfemhhb2h1YW5fbnVtKSkqcnIrdGhpcy5ub2RlLng7XHJcbiAgICAgICAgICAgIGxldCB5eT1NYXRoLnNpbihvbmNlUmFkaWFuKih0aGlzLmN1cl96aGFvaHVhbl9udW0pKSpycit0aGlzLmdldENlbnRlclBvcygpLnk7XHJcbiAgICAgICAgICAgIE1vbnN0ZXJNYW5hZ2VyLmdldEluc3RhbmNlKCkuY3JlYXRlU3VtbW9uTW9uc3RlcihpZCx0aGlzLm1vbnN0ZXJfbGV2ZWwsY2MudjIoeHgseXkpKTtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIHRoaXMuY3VyX3poYW9odWFuX251bSsrO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLmN1cl96aGFvaHVhbl9pbmRleCsrO1xyXG4gICAgICAgIGlmKHRoaXMuY3VyX3poYW9odWFuX2luZGV4Pj10aGlzLnpoYW9odWFuX2lkLmxlbmd0aCl7XHJcbiAgICAgICAgICAgIHRoaXMuY3VyX3poYW9odWFuX2luZGV4PTA7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGVuZFlpbkRhbyhpc0lkbGUpe1xyXG4gICAgICAgIHRoaXMuaXNfeWluZGFvPWZhbHNlO1xyXG4gICAgICAgIGlmKGlzSWRsZSl7XHJcbiAgICAgICAgICAgIHN1cGVyLnBsYXlTcGluQW5pbWF0b24oKEFuaW1hdGlvbl9OYW1lLnNraWxsMl8zKSxmYWxzZSxudWxsLCgpPT57XHJcbiAgICAgICAgICAgICAgICB0aGlzLnN0YXJ0SWRsZSgpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgb25EZWF0aCgpIHtcclxuICAgICAgICB0aGlzLnVuc2NoZWR1bGVBbGxDYWxsYmFja3MoKTtcclxuICAgICAgICBzdXBlci5wbGF5RGVhZEFuaW1hdG9uKEFuaW1hdGlvbl9OYW1lLmRlYWQsKCk9PntcclxuICAgICAgICAgICAgdGhpcy5yZW1vdmVBbGxEZUJ1ZmYoKTtcclxuICAgICAgICAgICAgdGhpcy5yZW1vdmVBbGxCdWZmKCk7XHJcbiAgICAgICAgICAgIGlmKHRoaXMuc2hhZG93KXtcclxuICAgICAgICAgICAgICAgIGNjLnR3ZWVuKHRoaXMuc2hhZG93KS50bygwLjc1LHtvcGFjaXR5OjB9KS5zdGFydCgpO1xyXG4gICAgICAgICAgICB9ICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIGNjLnR3ZWVuKHRoaXMubm9kZSkudG8oMC43NSx7b3BhY2l0eTowfSkuY2FsbCgoKT0+e1xyXG4gICAgICAgICAgICAgICAgdGhpcy5yZW1vdmVBbGxEZUJ1ZmYoKTtcclxuICAgICAgICAgICAgICAgIHRoaXMucmVtb3ZlQWxsQnVmZigpO1xyXG4gICAgICAgICAgICAgICAgTW9uc3Rlck1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5kZXN0cm95TW9uc3Rlcih0aGlzLm5vZGUsdGhpcy5tb25zdGVyX3R5cGUpO1xyXG4gICAgICAgICAgICB9KS5zdGFydCgpO1xyXG4gICAgICAgIH0pXHJcbiAgICAgICAgLy9HYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNvdW5kX21hbmFnZXIucGxheVNvdW5kKFNvdW5kSW5kZXgucmV3YXJkQm94Mik7XHJcbiAgICAgICAgLy/liKDpmaRcclxuICAgICAgICAvLyBpZih0aGlzLmJvc3Nfc2hpZWxkKXtcclxuICAgICAgICAvLyAgICAgdGhpcy5ib3NzX3NoaWVsZC5kZXN0b3J5U2hpZWxkKCk7XHJcbiAgICAgICAgLy8gfSAgICAgICAgXHJcbiAgICB9XHJcblxyXG4gICAgb25YdWFuWXVuUmVzdWx0KGlzWHVhbll1bjpib29sZWFuKXtcclxuICAgICAgICBpZihpc1h1YW5ZdW4pe1xyXG4gICAgICAgICAgICB0aGlzLnN0YXJ0WHVhbll1bigpO1xyXG4gICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICBpZighc3VwZXIuaXNIYXZlRGVCdWZmVHlwZShCdWZmVHlwZS5WZXJ0aWdvKSl7XHJcbiAgICAgICAgICAgICAgICBpZighc3VwZXIuZ2V0SXNEaWUoKSl7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYodGhpcy5za2lsbF9xdWV1ZS5sZW5ndGg+MCl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHN1cGVyLnNldEVuZW15U3RhdGUoRW5lbXlfU3RhdGUuc3RhbmRieSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc3RhcnRTa2lsbCh0aGlzLnNraWxsX3F1ZXVlLnNoaWZ0KCkpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnN0YXJ0SWRsZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBzdGFydFh1YW5ZdW4oKXtcclxuICAgICAgICB0aGlzLmVuZFlpbkRhbyhmYWxzZSk7XHJcbiAgICAgICAgc3VwZXIucGxheVNwaW5BbmltYXRvbihBbmltYXRpb25fTmFtZS5odXJ0MSxmYWxzZSxudWxsLCgpPT57XHJcbiAgICAgICAgICAgIGlmKHN1cGVyLmlzSGF2ZURlQnVmZlR5cGUoQnVmZlR5cGUuVmVydGlnbykmJiFzdXBlci5nZXRJc0RpZSgpKVxyXG4gICAgICAgICAgICAgICAgdGhpcy5zcGluZS5wYXVzZWQ9dHJ1ZTsgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIHVwZGF0ZShkdClcclxuICAgIHtcclxuICAgICAgICBpZigoR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5jdXJfZ2FtZV9zdGF0ZSE9R2FtZVN0YXRlLkdhbWVfUGxheWluZyl8fHRoaXMuZ2V0SXNEaWUoKSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgc3VwZXIudXBkYXRlKGR0KTtcclxuICAgICAgICB0aGlzLmNoZWNrU2tpbGwoZHQpO1xyXG4gICAgICAgIHRoaXMuY2hlY2tZaW5EYW8oZHQpO1xyXG4gICAgICAgIGlmKHRoaXMuZ2V0RW5lbXlTdGF0ZSgpIT1FbmVteV9TdGF0ZS5za2lsbCl7XHJcbiAgICAgICAgICAgIGlmKCF0aGlzLmlzSGF2ZURlQnVmZihCdWZmSWQuSGVyb19YdWFuWXVuKSl7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNoZWNrQXR0KGR0KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBjaGVja1lpbkRhbyhkdDpudW1iZXIpe1xyXG4gICAgICAgIGlmKHRoaXMuaXNfeWluZGFvKXtcclxuICAgICAgICAgICAgdGhpcy55aW5kYW9fdGltZS09ZHQ7XHJcbiAgICAgICAgICAgIGlmKHRoaXMueWluZGFvX3RpbWU8PTApe1xyXG4gICAgICAgICAgICAgICAgdGhpcy55aW5kYW9fdGltZT0wO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5lbmRZaW5EYW8odHJ1ZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy55aW5kYW9famlzaHUrPWR0O1xyXG4gICAgICAgICAgICBpZih0aGlzLnlpbmRhb19qaXNodT49MC41KXtcclxuICAgICAgICAgICAgICAgIHRoaXMueWluZGFvX2ppc2h1PTA7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnN0YXJ0Wmhhb0h1YW4oKTtcclxuICAgICAgICAgICAgfSBcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoq5oqA6IO95qOA5rWLICovXHJcbiAgICBjaGVja1NraWxsKGR0Om51bWJlcil7XHJcbiAgICAgICAgZm9yKGxldCBpPTA7IGk8MjsgaSsrKXtcclxuICAgICAgICAgICAgaWYoaT09MSl7XHJcbiAgICAgICAgICAgICAgICAvL+esrOS6jOS4quaKgOiDvVxyXG4gICAgICAgICAgICAgICAgaWYodGhpcy5pc19hY3RpdmVfc2tpbGxfMj09ZmFsc2Upe1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmKHRoaXMuc2tpbGxfY29sZF9kb3duW2ldPjApe1xyXG4gICAgICAgICAgICAgICAgdGhpcy5za2lsbF9jb2xkX2Rvd25baV0tPWR0O1xyXG4gICAgICAgICAgICAgICAgaWYodGhpcy5za2lsbF9jb2xkX2Rvd25baV08MCl7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5za2lsbF9jb2xkX2Rvd25baV09MDtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnN0YXJ0U2tpbGwoaSsxKTtcclxuICAgICAgICAgICAgICAgIH0gICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIH0gIFxyXG4gICAgICAgIH0gICAgICAgICAgICAgICAgXHJcbiAgICB9XHJcblxyXG4gICAgLyoq5pS75Ye76K6h566XICovXHJcbiAgICBjaGVja0F0dChkdDpudW1iZXIpeyAgICAgICAgXHJcbiAgICAgICAgdGhpcy5hdHRfamlzaHUrPWR0O1xyXG4gICAgICAgIGlmKHRoaXMuYXR0X2ppc2h1Pj10aGlzLmF0dF9qaWFuZ2Upe1xyXG4gICAgICAgICAgICB0aGlzLmF0dF9qaXNodT10aGlzLmF0dF9qaWFuZ2U7XHJcbiAgICAgICAgICAgIHRoaXMuc3RhcnRBdHRhY2soKTtcclxuICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgLy90aGlzLm1vdmluZyhkdCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgXHJcbn1cclxuIl19