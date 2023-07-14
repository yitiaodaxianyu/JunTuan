
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Scripts/Boss/Boss7/Boss7.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0c1xcQm9zc1xcQm9zczdcXEJvc3M3LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLDZDQUE0QztBQUM1Qyx1REFBc0Q7QUFDdEQsb0VBQWlGO0FBQ2pGLGlEQUE0QztBQUM1QyxxREFBb0Q7QUFDcEQseURBQTBFO0FBQzFFLGlEQUE0QztBQUM1Qyw2REFBd0Q7QUFDeEQseURBQXVFO0FBQ3ZFLCtEQUEwRDtBQUMxRCw2REFBd0Q7QUFDeEQsc0RBQWlEO0FBQ2pELGdDQUEyQjtBQUMzQiwyQ0FBc0M7QUFDdEMsSUFBSyxjQVVKO0FBVkQsV0FBSyxjQUFjO0lBRWYsK0JBQWEsQ0FBQTtJQUNiLG9DQUFrQixDQUFBO0lBQ2xCLDZCQUFXLENBQUE7SUFDWCxnQ0FBYyxDQUFBO0lBQ2QsbUNBQWlCLENBQUE7SUFDakIsbUNBQWlCLENBQUE7SUFDakIsbUNBQWlCLENBQUE7SUFDakIsK0JBQVksQ0FBQTtBQUNoQixDQUFDLEVBVkksY0FBYyxLQUFkLGNBQWMsUUFVbEI7QUFFSyxJQUFBLEtBQXNCLEVBQUUsQ0FBQyxVQUFVLEVBQWxDLE9BQU8sYUFBQSxFQUFFLFFBQVEsY0FBaUIsQ0FBQztBQUcxQztJQUFtQyx5QkFBSTtJQUF2QztRQUFBLHFFQW9XQztRQWpXRyxnQkFBVSxHQUFXLElBQUksQ0FBQztRQUUxQixpQkFBVyxHQUFTLElBQUksQ0FBQztRQUV6Qix1QkFBaUIsR0FBUyxLQUFLLENBQUM7UUFDaEMsdUJBQWlCLEdBQVEsQ0FBQyxDQUFDO1FBQzNCLG9EQUFvRDtRQUNwRCxpQkFBVyxHQUFVLENBQUMsS0FBSyxFQUFDLEtBQUssRUFBQyxLQUFLLEVBQUMsS0FBSyxDQUFDLENBQUM7UUFDL0MscUNBQXFDO1FBQ3JDLGtCQUFZLEdBQVUsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLENBQUMsQ0FBQzs7SUF3VnBDLENBQUM7SUF0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QixJQUFJLENBQUMsZUFBZSxDQUFDLENBQUMsQ0FBQyxJQUFFLEVBQUUsQ0FBQztnQkFDNUIsSUFBRyxJQUFJLENBQUMsZUFBZSxDQUFDLENBQUMsQ0FBQyxHQUFDLENBQUMsRUFBQztvQkFDekIsSUFBSSxDQUFDLGVBQWUsQ0FBQyxDQUFDLENBQUMsR0FBQyxDQUFDLENBQUM7b0JBQzFCLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQyxHQUFDLENBQUMsQ0FBQyxDQUFDO2lCQUN4QjthQUNKO1NBQ0o7SUFDTCxDQUFDO0lBRUQsVUFBVTtJQUNWLHdCQUFRLEdBQVIsVUFBUyxFQUFTO1FBQ2QsSUFBSSxDQUFDLFNBQVMsSUFBRSxFQUFFLENBQUM7UUFDbkIsSUFBRyxJQUFJLENBQUMsU0FBUyxJQUFFLElBQUksQ0FBQyxVQUFVLEVBQUM7WUFDL0IsSUFBSSxDQUFDLFNBQVMsR0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDO1lBQy9CLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQztTQUN0QjtJQUNMLENBQUM7SUEvVkQ7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBQzs2Q0FDTTtJQUhULEtBQUs7UUFEekIsT0FBTztPQUNhLEtBQUssQ0FvV3pCO0lBQUQsWUFBQztDQXBXRCxBQW9XQyxDQXBXa0MsY0FBSSxHQW9XdEM7a0JBcFdvQixLQUFLIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgR2FtZVN0YXRlIH0gZnJvbSBcIi4uLy4uL0NvbnN0YW50c1wiO1xyXG5pbXBvcnQgeyBFbmVteV9TdGF0ZSB9IGZyb20gXCIuLi8uLi9FbmVteS9FbmVteUNvbmZpZ1wiO1xyXG5pbXBvcnQgeyBHYW1lRWZmZWN0c01hbmFnZXIsIEdhbWVFZmZlY3RJZCB9IGZyb20gXCIuLi8uLi9HYW1lL0dhbWVFZmZlY3RzTWFuYWdlclwiO1xyXG5pbXBvcnQgR2FtZU1hbmFnZXIgZnJvbSBcIi4uLy4uL0dhbWVNYW5hZ2VyXCI7XHJcbmltcG9ydCB7IEJ1ZmZEYXRhIH0gZnJvbSBcIi4uLy4uL0hlcm8vR2FtZS9CdWZmRGF0YVwiO1xyXG5pbXBvcnQgeyBEYW1hZ2VUeXBlLCBCdWZmSWQsIEJ1ZmZUeXBlIH0gZnJvbSBcIi4uLy4uL0hlcm8vR2FtZS9IZXJvQ29uZmlnXCI7XHJcbmltcG9ydCBNb25zdGVyIGZyb20gXCIuLi8uLi9Nb25zdGVyL01vbnN0ZXJcIjtcclxuaW1wb3J0IE1vbnN0ZXJCdWxsZXQgZnJvbSBcIi4uLy4uL01vbnN0ZXIvTW9uc3RlckJ1bGxldFwiO1xyXG5pbXBvcnQgeyBLZXlGcmFtZURhdGEsIFN0cmVuZ3RoVHlwZSB9IGZyb20gXCIuLi8uLi9Nb25zdGVyL01vbnN0ZXJEYXRhXCI7XHJcbmltcG9ydCBNb25zdGVyTWFuYWdlciBmcm9tIFwiLi4vLi4vTW9uc3Rlci9Nb25zdGVyTWFuYWdlclwiO1xyXG5pbXBvcnQgeyBTb3VuZEluZGV4IH0gZnJvbSBcIi4uLy4uL1NvdW5kL0F1ZGlvQ29uc3RhbnRzXCI7XHJcbmltcG9ydCBXYWxsTWFuYWdlciBmcm9tIFwiLi4vLi4vV2FsbC9XYWxsTWFuYWdlclwiO1xyXG5pbXBvcnQgQm9zcyBmcm9tIFwiLi4vQm9zc1wiO1xyXG5pbXBvcnQgQm9zc1NraWxsNyBmcm9tIFwiLi9Cb3NzU2tpbGw3XCI7XHJcbmVudW0gQW5pbWF0aW9uX05hbWVcclxue1xyXG4gICAgSWRsZSA9IFwiSWRsZVwiLCAgICAgICAvLy0tIOato+mdouW+heaculxyXG4gICAgYXR0YWNrID0gXCJBdHRhY2sxXCIsICAgICAgICAgIC8vLS0g5pS75Ye7MVxyXG4gICAgcnVuID0gXCJSdW5cIiwgICAgICAgICAgICAgICAgLy8tLSDot5Hot69cclxuICAgIGh1cnQxID0gXCJIdXJ0XCIsICAgICAgICAgIC8vLS0g5Y+X5Ye7MVxyXG4gICAgc2tpbGwxID0gXCJTa2lsbDFcIiwgICAgICAgICAgLy8tLSDmioDog70xXHJcbiAgICBza2lsbDIgPSBcIlNraWxsMlwiLCAgICAgICAgICAvLy0tIOWPrOWUpFxyXG4gICAgc2tpbGwzID0gXCJTa2lsbDNcIiwgICAgICAgICAgLy8tLSDpvJPoiJ5cclxuICAgIGRlYWQ9IFwiRGVhZFwiLCAgIC8v5q275LqhXHJcbn1cclxuXHJcbmNvbnN0IHtjY2NsYXNzLCBwcm9wZXJ0eX0gPSBjYy5fZGVjb3JhdG9yO1xyXG5cclxuQGNjY2xhc3NcclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQm9zczcgZXh0ZW5kcyBCb3NzIHtcclxuICAgIFxyXG4gICAgQHByb3BlcnR5KGNjLlByZWZhYilcclxuICAgIGJvc3M3X2J1ZmY6Y2MuUHJlZmFiPW51bGw7XHJcblxyXG4gICAgaW5qdXJ5X25vZGU6Y2MuTm9kZT1udWxsO1xyXG5cclxuICAgIGlzX2FjdGl2ZV9za2lsbF8zOmJvb2xlYW49ZmFsc2U7XHJcbiAgICBhY3RpdmVfaW5qdXJ5X251bTpudW1iZXI9MDsgICBcclxuICAgIC8qKuW5veeBteW3qOeCruaJizIwNzIx77yMMuS4quW5veeBteiIteaJizIwNzMx77yMOOS4quW5veeBteawtOaJizEwNTIx77yMM+S4quW5veeBteeCruaJizEwNTMxICovXHJcbiAgICB6aGFvaHVhbl9pZDpudW1iZXJbXT1bMjA3MjEsMjA3MzEsMTA1MjEsMTA1MzFdO1xyXG4gICAgLyoq77yIM+S4quW5veeBteW3qOeCruaJi++8jDLkuKrlub3ngbXoiLXmiYvvvIw45Liq5bm954G15rC05omL77yMM+S4quW5veeBteeCruaJi++8iVwiICovXHJcbiAgICB6aGFvaHVhbl9udW06bnVtYmVyW109WzMsMiw4LDNdO1xyXG5cclxuICAgIG9uTG9hZCgpOiB2b2lkIHtcclxuICAgICAgICBzdXBlci5vbkxvYWQoKTtcclxuICAgICAgICBHYW1lRWZmZWN0c01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5hZGRFZmZlY3RQb29sQnlJZChHYW1lRWZmZWN0SWQuYm9zczdfYXR0YWNrX2J1bGxlY3QsMSk7XHJcbiAgICAgICAgR2FtZUVmZmVjdHNNYW5hZ2VyLmdldEluc3RhbmNlKCkuYWRkRWZmZWN0UG9vbEJ5SWQoR2FtZUVmZmVjdElkLmJvc3M3X2F0dGFja19idWxsZWN0X2hpdCwxKTtcclxuICAgICAgICBHYW1lRWZmZWN0c01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5hZGRFZmZlY3RQb29sQnlJZChHYW1lRWZmZWN0SWQuYm9zczdfc2tpbGxfYnVsbGVjdCw0KTtcclxuICAgICAgICBHYW1lRWZmZWN0c01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5hZGRFZmZlY3RQb29sQnlJZChHYW1lRWZmZWN0SWQuYm9zczdfc2tpbGxfYnVsbGVjdF9oaXQsNCk7XHJcbiAgICAgICAgR2FtZUVmZmVjdHNNYW5hZ2VyLmdldEluc3RhbmNlKCkuYWRkRWZmZWN0UG9vbEJ5SWQoR2FtZUVmZmVjdElkLm1vbnN0ZXJfemhhb2h1YW4sNCk7XHJcbiAgICAgICAgR2FtZUVmZmVjdHNNYW5hZ2VyLmdldEluc3RhbmNlKCkuYWRkRWZmZWN0UG9vbEJ5SWQoR2FtZUVmZmVjdElkLnh1YW55dW4sNCk7XHJcbiAgICAgICAgZm9yKGxldCBpPTA7IGk8dGhpcy56aGFvaHVhbl9pZC5sZW5ndGg7IGkrKyl7XHJcbiAgICAgICAgICAgIE1vbnN0ZXJNYW5hZ2VyLmdldEluc3RhbmNlKCkuYWRkTW9uc3RlclBvb2wodGhpcy56aGFvaHVhbl9pZFtpXSwyKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5hZGREZWF0aENhbGxiYWNrKHRoaXMub25EZWF0aCk7XHJcbiAgICAgICAgdGhpcy5hZGRYdWFuWXVuTGlzdGVuKHRoaXMub25YdWFuWXVuUmVzdWx0KTtcclxuICAgICAgICB0aGlzLmFkZEJvc3NJbml0ZWRMaXN0ZW4odGhpcy5vbkJvc3NJbml0ZWQpO1xyXG4gICAgICAgIHRoaXMuYWRkQ2hhbmdlQm9zc0hwTGlzdGVuKHRoaXMub25DaGFuZ2VIcCk7XHJcbiAgICAgICAgdGhpcy5hZGRJbmp1cnlDYWxsYmFjayh0aGlzLm9uQWN0aXZlSW5qdXJ5KTtcclxuICAgIH1cclxuXHJcbiAgICBvbkJvc3NJbml0ZWQoKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5zdGFydElkbGUoKTtcclxuICAgICAgICB0aGlzLm5vZGUueT0xMjg7XHJcbiAgICAgICAgdGhpcy5hY3RpdmVfaW5qdXJ5X251bT0wOyAgICAgICBcclxuICAgIH1cclxuXHJcbiAgICBvbkNoYW5nZUhwKG51bTpudW1iZXIpe1xyXG4gICAgICAgIGlmKHRoaXMuY3VyX2hwPD10aGlzLm1heF9ocC8zKXtcclxuICAgICAgICAgICAgaWYodGhpcy5pc19hY3RpdmVfc2tpbGxfMz09ZmFsc2Upe1xyXG4gICAgICAgICAgICAgICAgdGhpcy5pc19hY3RpdmVfc2tpbGxfMz10cnVlO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zdGFydFNraWxsKDMpO1xyXG4gICAgICAgICAgICB9ICAgICAgICAgICBcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgb25BY3RpdmVJbmp1cnkoKXtcclxuICAgICAgICB0aGlzLmFjdGl2ZV9pbmp1cnlfbnVtKys7XHJcbiAgICAgICAgdGhpcy5zaG93SW5qdXJ5TnVtKCk7XHJcbiAgICAgICAgaWYodGhpcy5hY3RpdmVfaW5qdXJ5X251bT49dGhpcy5za2lsbF9kYXRhLmdldFNraWxsVmFsdWUxKDEpKXtcclxuICAgICAgICAgICAgdGhpcy5hY3RpdmVfaW5qdXJ5X251bT0wO1xyXG4gICAgICAgICAgICB0aGlzLnN0YXJ0U2tpbGwxKCk7XHJcbiAgICAgICAgfSAgICAgICAgXHJcbiAgICB9XHJcblxyXG4gICAgc2hvd0luanVyeU51bSgpeyAgICAgICAgXHJcbiAgICAgICAgaWYodGhpcy5pbmp1cnlfbm9kZSl7XHJcbiAgICAgICAgICAgIHRoaXMuaW5qdXJ5X25vZGUuZ2V0Q2hpbGRCeU5hbWUoJ251bScpLmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nPXRoaXMuYWN0aXZlX2luanVyeV9udW0udG9TdHJpbmcoKTtcclxuICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgdGhpcy5pbmp1cnlfbm9kZT1jYy5pbnN0YW50aWF0ZSh0aGlzLmJvc3M3X2J1ZmYpO1xyXG4gICAgICAgICAgICBsZXQgaHBSb290PWNjLmZpbmQoJ0NhbnZhcy9VaV9Sb290L3RvcF91aS9Cb3NzSHBSb290Jyk7ICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIGhwUm9vdC5hZGRDaGlsZCh0aGlzLmluanVyeV9ub2RlKTtcclxuICAgICAgICAgICAgdGhpcy5pbmp1cnlfbm9kZS54PS0yMjA7ICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIHRoaXMuaW5qdXJ5X25vZGUuZ2V0Q2hpbGRCeU5hbWUoJ251bScpLmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nPXRoaXMuYWN0aXZlX2luanVyeV9udW0udG9TdHJpbmcoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgc3RhcnRJZGxlKCl7ICAgICAgICBcclxuICAgICAgICBzdXBlci5zZXRFbmVteVN0YXRlKEVuZW15X1N0YXRlLnN0YW5kYnkpO1xyXG4gICAgICAgIHN1cGVyLnBsYXlTcGluQW5pbWF0b24oQW5pbWF0aW9uX05hbWUuSWRsZSx0cnVlKTtcclxuICAgICAgICBcclxuICAgIH1cclxuXHJcbiAgICBzdGFydEF0dGFjaygpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLmF0dF9qaXNodT0wO1xyXG4gICAgICAgIHN1cGVyLnNldEVuZW15U3RhdGUoRW5lbXlfU3RhdGUuYXR0KTtcclxuICAgICAgICBsZXQgZGF0YT1uZXcgS2V5RnJhbWVEYXRhKCk7XHJcbiAgICAgICAgZGF0YS5uYW1lPSdBdHRhY2snO1xyXG4gICAgICAgIGRhdGEuY2FsbGJhY2s9KCk9PntcclxuICAgICAgICAgICAgdGhpcy5hdHRfamlzaHU9MDtcclxuICAgICAgICAgICAgR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zb3VuZF9tYW5hZ2VyLnBsYXlTb3VuZChTb3VuZEluZGV4LllYX2Jvc3M3QXR0YWNrKTtcclxuICAgICAgICAgICAgbGV0IGJ1bGxlY3Q9R2FtZUVmZmVjdHNNYW5hZ2VyLmdldEluc3RhbmNlKCkuY3JlYXRlR2FtZUVmZmVjdEJ5SWQoR2FtZUVmZmVjdElkLmJvc3M3X2F0dGFja19idWxsZWN0LHRoaXMuZ2V0QXR0UG9zKCkpO1xyXG4gICAgICAgICAgICBidWxsZWN0LmdldENvbXBvbmVudChNb25zdGVyQnVsbGV0KS5pbml0KHRoaXMuZ2V0QXR0RGF0YShEYW1hZ2VUeXBlLk5vcm1hbCx0cnVlKSxHYW1lRWZmZWN0SWQuYm9zczdfYXR0YWNrX2J1bGxlY3QsR2FtZUVmZmVjdElkLmJvc3M3X2F0dGFja19idWxsZWN0X2hpdCwxNjAwLE1hdGguUEkqMy8yKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgc3VwZXIucGxheVNwaW5BbmltYXRvbigoQW5pbWF0aW9uX05hbWUuYXR0YWNrKSxmYWxzZSxkYXRhLCgpPT57XHJcbiAgICAgICAgICAgIGlmKHRoaXMuc2tpbGxfcXVldWUubGVuZ3RoPjApe1xyXG4gICAgICAgICAgICAgICAgc3VwZXIuc2V0RW5lbXlTdGF0ZShFbmVteV9TdGF0ZS5zdGFuZGJ5KTtcclxuICAgICAgICAgICAgICAgIHRoaXMuc3RhcnRTa2lsbCh0aGlzLnNraWxsX3F1ZXVlLnNoaWZ0KCkpO1xyXG4gICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgIHRoaXMuc3RhcnRJZGxlKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KVxyXG4gICAgfVxyXG4gICAgc3RhcnRTa2lsbChza2lsbEluZGV4Om51bWJlcil7XHJcbiAgICAgICAgc3dpdGNoKHNraWxsSW5kZXgpe1xyXG4gICAgICAgICAgICBjYXNlIDE6e1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zdGFydFNraWxsMSgpO1xyXG4gICAgICAgICAgICB9YnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgMjp7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnN0YXJ0U2tpbGwyKCk7XHJcbiAgICAgICAgICAgIH1icmVhaztcclxuICAgICAgICAgICAgY2FzZSAzOntcclxuICAgICAgICAgICAgICAgIGlmKHRoaXMuaXNfYWN0aXZlX3NraWxsXzMpe1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc3RhcnRTa2lsbDMoKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfWJyZWFrO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIFxyXG4gICAgLy/mipXlvLlcclxuICAgIHN0YXJ0U2tpbGwxKCl7ICAgICAgICBcclxuICAgICAgICBsZXQgc2tpbGxObz0xO1xyXG4gICAgICAgIGxldCBza2lsbEluZGV4PXNraWxsTm8tMTtcclxuICAgICAgICB0aGlzLnNraWxsX2NvbGRfZG93bltza2lsbEluZGV4XT10aGlzLnNraWxsX2RhdGEuZ2V0U2tpbGxDb2xkRG93bihza2lsbE5vKTsgICAgICAgIFxyXG4gICAgICAgIGlmKHN1cGVyLmdldEVuZW15U3RhdGUoKSE9RW5lbXlfU3RhdGUuYXR0JiZzdXBlci5nZXRFbmVteVN0YXRlKCkhPUVuZW15X1N0YXRlLnNraWxsKXtcclxuICAgICAgICAgICAgaWYoIXN1cGVyLmlzSGF2ZURlQnVmZihCdWZmSWQuSGVyb19YdWFuWXVuKSl7XHJcbiAgICAgICAgICAgICAgICBzdXBlci5zZXRFbmVteVN0YXRlKEVuZW15X1N0YXRlLnNraWxsKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2tpbGxfY29sZF9kb3duW3NraWxsSW5kZXhdPXRoaXMuc2tpbGxfZGF0YS5nZXRTa2lsbENvbGREb3duKHNraWxsTm8pO1xyXG4gICAgICAgICAgICAgICAgbGV0IGRhdGE9bmV3IEtleUZyYW1lRGF0YSgpO1xyXG4gICAgICAgICAgICAgICAgZGF0YS5uYW1lPSdTa2lsbCc7XHJcbiAgICAgICAgICAgICAgICBkYXRhLmNhbGxiYWNrPSgpPT57XHJcbiAgICAgICAgICAgICAgICAgICAgR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zb3VuZF9tYW5hZ2VyLnBsYXlTb3VuZChTb3VuZEluZGV4LllYX2Jvc3M3U2tpbGwxKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmF0dF9qaXNodT0wO1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBkYW5OdW09dGhpcy5za2lsbF9kYXRhLmdldFNraWxsVmFsdWUyKDEpO1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCB3YWxsUG9zPVdhbGxNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0TWFpbldhbGwoKS5nZXRXYWxsUmVjdCgpLmNlbnRlcjtcclxuICAgICAgICAgICAgICAgICAgICBmb3IobGV0IGk9MDsgaTxkYW5OdW07IGkrKyl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2NoZWR1bGVPbmNlKCgpPT57XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgY3JlYXRlUG9zPWNjLnYyKE1hdGgucmFuZG9tKCkqNjAwLTMwMCxjYy53aW5TaXplLmhlaWdodCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgbm9kZT1HYW1lRWZmZWN0c01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5jcmVhdGVHYW1lRWZmZWN0QnlJZChHYW1lRWZmZWN0SWQuYm9zczdfc2tpbGxfYnVsbGVjdCxjcmVhdGVQb3MpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbm9kZS5nZXRDb21wb25lbnQoQm9zc1NraWxsNykuaW5pdCh0aGlzLmdldEF0dERhdGEoRGFtYWdlVHlwZS5Ta2lsbCxmYWxzZSx0aGlzLnNraWxsX2RhdGEuZ2V0U2tpbGxWYWx1ZTMoMSkpLE1hdGgucmFuZG9tKCkqMjAwLTEwMCt3YWxsUG9zLnksMTUwMCxNYXRoLnJhbmRvbSgpKjEwKzMwLGk9PTApO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9LGkqMC4xKTsgICAgICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBzdXBlci5wbGF5U3BpbkFuaW1hdG9uKChBbmltYXRpb25fTmFtZS5za2lsbDEpLGZhbHNlLGRhdGEsKCk9PntcclxuICAgICAgICAgICAgICAgICAgICBpZih0aGlzLnNraWxsX3F1ZXVlLmxlbmd0aD4wKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgc3VwZXIuc2V0RW5lbXlTdGF0ZShFbmVteV9TdGF0ZS5zdGFuZGJ5KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zdGFydFNraWxsKHRoaXMuc2tpbGxfcXVldWUuc2hpZnQoKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc3RhcnRJZGxlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICBpZih0aGlzLnNraWxsX3F1ZXVlLmluZGV4T2Yoc2tpbGxObyk8MCl7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5za2lsbF9xdWV1ZS5wdXNoKHNraWxsTm8pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgIGlmKHRoaXMuc2tpbGxfcXVldWUuaW5kZXhPZihza2lsbE5vKTwwKXtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2tpbGxfcXVldWUucHVzaChza2lsbE5vKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvL+WPrOWUpFxyXG4gICAgc3RhcnRTa2lsbDIoKXtcclxuICAgICAgICBsZXQgc2tpbGxObz0yO1xyXG4gICAgICAgIGxldCBza2lsbEluZGV4PXNraWxsTm8tMTtcclxuICAgICAgICB0aGlzLnNraWxsX2NvbGRfZG93bltza2lsbEluZGV4XT10aGlzLnNraWxsX2RhdGEuZ2V0U2tpbGxDb2xkRG93bihza2lsbE5vKTtcclxuICAgICAgICBpZihzdXBlci5nZXRFbmVteVN0YXRlKCkhPUVuZW15X1N0YXRlLmF0dCYmc3VwZXIuZ2V0RW5lbXlTdGF0ZSgpIT1FbmVteV9TdGF0ZS5za2lsbCl7XHJcbiAgICAgICAgICAgIGlmKCFzdXBlci5pc0hhdmVEZUJ1ZmYoQnVmZklkLkhlcm9fWHVhbll1bikpe1xyXG4gICAgICAgICAgICAgICAgR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zb3VuZF9tYW5hZ2VyLnBsYXlTb3VuZChTb3VuZEluZGV4LllYX0Jvc3M1QmVpZG9uZyk7XHJcbiAgICAgICAgICAgICAgICBzdXBlci5zZXRFbmVteVN0YXRlKEVuZW15X1N0YXRlLnNraWxsKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2tpbGxfY29sZF9kb3duW3NraWxsSW5kZXhdPXRoaXMuc2tpbGxfZGF0YS5nZXRTa2lsbENvbGREb3duKHNraWxsTm8pO1xyXG4gICAgICAgICAgICAgICAgbGV0IGRhdGE9bmV3IEtleUZyYW1lRGF0YSgpO1xyXG4gICAgICAgICAgICAgICAgZGF0YS5uYW1lPSdTa2lsbDInO1xyXG4gICAgICAgICAgICAgICAgZGF0YS5jYWxsYmFjaz0oKT0+eyAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5hdHRfamlzaHU9MDtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnN0YXJ0Wmhhb0h1YW4oKTtcclxuICAgICAgICAgICAgICAgICAgICAvL+WbnuihgDIwJVxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYmVIZWFsKHRoaXMuZ2V0TWF4SHAoKSowLjEpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgc3VwZXIucGxheVNwaW5BbmltYXRvbigoQW5pbWF0aW9uX05hbWUuc2tpbGwyKSxmYWxzZSxkYXRhLCgpPT57XHJcbiAgICAgICAgICAgICAgICAgICAgaWYodGhpcy5za2lsbF9xdWV1ZS5sZW5ndGg+MCl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHN1cGVyLnNldEVuZW15U3RhdGUoRW5lbXlfU3RhdGUuc3RhbmRieSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc3RhcnRTa2lsbCh0aGlzLnNraWxsX3F1ZXVlLnNoaWZ0KCkpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnN0YXJ0SWRsZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgaWYodGhpcy5za2lsbF9xdWV1ZS5pbmRleE9mKHNraWxsTm8pPDApe1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2tpbGxfcXVldWUucHVzaChza2lsbE5vKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICBpZih0aGlzLnNraWxsX3F1ZXVlLmluZGV4T2Yoc2tpbGxObyk8MCl7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNraWxsX3F1ZXVlLnB1c2goc2tpbGxObyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoq5byA5aeL5Y+s5ZSkICovXHJcbiAgICBzdGFydFpoYW9IdWFuKCl7ICAgICAgICBcclxuICAgICAgICBsZXQgbnVtPTA7ICAgICAgICAgICAgICBcclxuICAgICAgICAvL+WNiuW+hFxyXG4gICAgICAgIGxldCBycj0yNTY7ICAgICAgICBcclxuICAgICAgICBmb3IobGV0IGk9MDsgaTx0aGlzLnpoYW9odWFuX251bS5sZW5ndGg7IGkrKyl7XHJcbiAgICAgICAgICAgIG51bSs9dGhpcy56aGFvaHVhbl9udW1baV07XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGxldCBpbmRleEFycj1bXTtcclxuICAgICAgICBmb3IobGV0IG49MDsgbjxudW07IG4rKyl7XHJcbiAgICAgICAgICAgIGluZGV4QXJyLnB1c2gobik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGxldCBvbmNlUmFkaWFuPU1hdGguUEkvKG51bS0xKTsvL251beS4quaAqlxyXG4gICAgICAgIGZvcihsZXQgaT0wOyBpPHRoaXMuemhhb2h1YW5fbnVtLmxlbmd0aDsgaSsrKXtcclxuICAgICAgICAgICAgbGV0IG51bUE9dGhpcy56aGFvaHVhbl9udW1baV07XHJcbiAgICAgICAgICAgIGZvcihsZXQgbj0wOyBuPG51bUE7IG4rKyl7XHJcbiAgICAgICAgICAgICAgICBsZXQgaW5kZXg9TWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpKmluZGV4QXJyLmxlbmd0aCk7XHJcbiAgICAgICAgICAgICAgICBsZXQgbnVtPWluZGV4QXJyW2luZGV4XTtcclxuICAgICAgICAgICAgICAgIGluZGV4QXJyLnNwbGljZShpbmRleCwxKTtcclxuICAgICAgICAgICAgICAgIGxldCB4eD1NYXRoLmNvcyhvbmNlUmFkaWFuKm51bSkqcnIrdGhpcy5ub2RlLng7XHJcbiAgICAgICAgICAgICAgICBsZXQgeXk9TWF0aC5zaW4ob25jZVJhZGlhbipudW0pKnJyK3RoaXMubm9kZS55O1xyXG4gICAgICAgICAgICAgICAgbGV0IGlkPXRoaXMuemhhb2h1YW5faWRbaV07ICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgTW9uc3Rlck1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5jcmVhdGVTdW1tb25Nb25zdGVyKGlkLHRoaXMubW9uc3Rlcl9sZXZlbCxjYy52Mih4eCx5eSkpO1xyXG4gICAgICAgICAgICB9ICAgICAgICAgICAgXHJcbiAgICAgICAgfSAgICAgICAgXHJcbiAgICB9XHJcblxyXG4gICAgc3RhcnRTa2lsbDMoKXtcclxuICAgICAgICBsZXQgc2tpbGxObz0zO1xyXG4gICAgICAgIGxldCBza2lsbEluZGV4PXNraWxsTm8tMTtcclxuICAgICAgICB0aGlzLnNraWxsX2NvbGRfZG93bltza2lsbEluZGV4XT10aGlzLnNraWxsX2RhdGEuZ2V0U2tpbGxDb2xkRG93bihza2lsbE5vKTtcclxuICAgICAgICBpZihzdXBlci5nZXRFbmVteVN0YXRlKCkhPUVuZW15X1N0YXRlLmF0dCYmc3VwZXIuZ2V0RW5lbXlTdGF0ZSgpIT1FbmVteV9TdGF0ZS5za2lsbCl7XHJcbiAgICAgICAgICAgIGlmKCFzdXBlci5pc0hhdmVEZUJ1ZmYoQnVmZklkLkhlcm9fWHVhbll1bikpe1xyXG4gICAgICAgICAgICAgICAgR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zb3VuZF9tYW5hZ2VyLnBsYXlTb3VuZChTb3VuZEluZGV4LllYX0Jvc3M1QmVpZG9uZyk7XHJcbiAgICAgICAgICAgICAgICBzdXBlci5zZXRFbmVteVN0YXRlKEVuZW15X1N0YXRlLnNraWxsKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2tpbGxfY29sZF9kb3duW3NraWxsSW5kZXhdPXRoaXMuc2tpbGxfZGF0YS5nZXRTa2lsbENvbGREb3duKHNraWxsTm8pO1xyXG4gICAgICAgICAgICAgICAgbGV0IGRhdGE9bmV3IEtleUZyYW1lRGF0YSgpO1xyXG4gICAgICAgICAgICAgICAgZGF0YS5uYW1lPSdTa2lsbDMnO1xyXG4gICAgICAgICAgICAgICAgZGF0YS5jYWxsYmFjaz0oKT0+eyAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5hdHRfamlzaHU9MDtcclxuICAgICAgICAgICAgICAgICAgICAvL+m8k+iInmJ1ZmZcclxuICAgICAgICAgICAgICAgICAgICBsZXQgbW9uc3RlcnM9TW9uc3Rlck1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRNb25zdGVyc0Zvck1vbnN0ZXJQb3MoLTEsdGhpcy5ub2RlLmdldFBvc2l0aW9uKCksdGhpcy5za2lsbF9kYXRhLmdldFNraWxsVmFsdWUxKHNraWxsTm8pKTtcclxuICAgICAgICAgICAgICAgICAgICBpZihtb25zdGVycyl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvcihsZXQgaT0wOyBpPG1vbnN0ZXJzLmxlbmd0aDsgaSsrKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBtb25zdGVyVHM9bW9uc3RlcnNbaV0uZ2V0Q29tcG9uZW50KE1vbnN0ZXIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYobW9uc3RlclRzKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgYnVmZkRhdGE9bmV3IEJ1ZmZEYXRhKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYnVmZkRhdGEuYnVmZl92YWx1ZT1bdGhpcy5za2lsbF9kYXRhLmdldFNraWxsVmFsdWUyKHNraWxsTm8pXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBidWZmRGF0YS5idWZmX2lkPUJ1ZmZJZC5Cb3NzNV9Ta2lsbF8xX2d1d3U7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYnVmZkRhdGEuYnVmZl90eXBlPUJ1ZmZUeXBlLk1vdmVTcGVlZFVwO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJ1ZmZEYXRhLnJlbWFpbl90aW1lPTU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbW9uc3RlclRzLmFkZEJ1ZmYoYnVmZkRhdGEpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgc3VwZXIucGxheVNwaW5BbmltYXRvbigoQW5pbWF0aW9uX05hbWUuc2tpbGwzKSxmYWxzZSxkYXRhLCgpPT57XHJcbiAgICAgICAgICAgICAgICAgICAgaWYodGhpcy5za2lsbF9xdWV1ZS5sZW5ndGg+MCl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHN1cGVyLnNldEVuZW15U3RhdGUoRW5lbXlfU3RhdGUuc3RhbmRieSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc3RhcnRTa2lsbCh0aGlzLnNraWxsX3F1ZXVlLnNoaWZ0KCkpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnN0YXJ0SWRsZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgaWYodGhpcy5za2lsbF9xdWV1ZS5pbmRleE9mKHNraWxsTm8pPDApe1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2tpbGxfcXVldWUucHVzaChza2lsbE5vKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICBpZih0aGlzLnNraWxsX3F1ZXVlLmluZGV4T2Yoc2tpbGxObyk8MCl7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNraWxsX3F1ZXVlLnB1c2goc2tpbGxObyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9ICAgICAgICBcclxuICAgIH1cclxuICAgIFxyXG4gICAgb25EZWF0aCgpIHtcclxuICAgICAgICB0aGlzLnVuc2NoZWR1bGVBbGxDYWxsYmFja3MoKTtcclxuICAgICAgICBzdXBlci5wbGF5RGVhZEFuaW1hdG9uKEFuaW1hdGlvbl9OYW1lLmRlYWQsKCk9PntcclxuICAgICAgICAgICAgdGhpcy5yZW1vdmVBbGxEZUJ1ZmYoKTtcclxuICAgICAgICAgICAgdGhpcy5yZW1vdmVBbGxCdWZmKCk7XHJcbiAgICAgICAgICAgIGlmKHRoaXMuc2hhZG93KXtcclxuICAgICAgICAgICAgICAgIGNjLnR3ZWVuKHRoaXMuc2hhZG93KS50bygwLjc1LHtvcGFjaXR5OjB9KS5zdGFydCgpO1xyXG4gICAgICAgICAgICB9ICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIGNjLnR3ZWVuKHRoaXMubm9kZSkudG8oMC43NSx7b3BhY2l0eTowfSkuY2FsbCgoKT0+e1xyXG4gICAgICAgICAgICAgICAgdGhpcy5yZW1vdmVBbGxEZUJ1ZmYoKTtcclxuICAgICAgICAgICAgICAgIHRoaXMucmVtb3ZlQWxsQnVmZigpO1xyXG4gICAgICAgICAgICAgICAgTW9uc3Rlck1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5kZXN0cm95TW9uc3Rlcih0aGlzLm5vZGUsdGhpcy5tb25zdGVyX3R5cGUpO1xyXG4gICAgICAgICAgICB9KS5zdGFydCgpO1xyXG4gICAgICAgIH0pXHJcbiAgICAgICAgLy9HYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNvdW5kX21hbmFnZXIucGxheVNvdW5kKFNvdW5kSW5kZXgucmV3YXJkQm94Mik7XHJcbiAgICAgICAgLy/liKDpmaRcclxuICAgICAgICAvLyBpZih0aGlzLmJvc3Nfc2hpZWxkKXtcclxuICAgICAgICAvLyAgICAgdGhpcy5ib3NzX3NoaWVsZC5kZXN0b3J5U2hpZWxkKCk7XHJcbiAgICAgICAgLy8gfSAgICAgICAgXHJcbiAgICB9XHJcblxyXG4gICAgb25YdWFuWXVuUmVzdWx0KGlzWHVhbll1bjpib29sZWFuKXtcclxuICAgICAgICBpZihpc1h1YW5ZdW4pe1xyXG4gICAgICAgICAgICB0aGlzLnN0YXJ0WHVhbll1bigpO1xyXG4gICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICBpZighc3VwZXIuaXNIYXZlRGVCdWZmVHlwZShCdWZmVHlwZS5WZXJ0aWdvKSl7XHJcbiAgICAgICAgICAgICAgICBpZighc3VwZXIuZ2V0SXNEaWUoKSl7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYodGhpcy5za2lsbF9xdWV1ZS5sZW5ndGg+MCl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHN1cGVyLnNldEVuZW15U3RhdGUoRW5lbXlfU3RhdGUuc3RhbmRieSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc3RhcnRTa2lsbCh0aGlzLnNraWxsX3F1ZXVlLnNoaWZ0KCkpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnN0YXJ0SWRsZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBzdGFydFh1YW5ZdW4oKXtcclxuICAgICAgICBzdXBlci5wbGF5U3BpbkFuaW1hdG9uKEFuaW1hdGlvbl9OYW1lLmh1cnQxLGZhbHNlLG51bGwsKCk9PntcclxuICAgICAgICAgICAgaWYoc3VwZXIuaXNIYXZlRGVCdWZmVHlwZShCdWZmVHlwZS5WZXJ0aWdvKSYmIXN1cGVyLmdldElzRGllKCkpXHJcbiAgICAgICAgICAgICAgICB0aGlzLnNwaW5lLnBhdXNlZD10cnVlOyAgICAgICAgICAgICAgICBcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuICAgIFxyXG4gICAgdXBkYXRlKGR0KVxyXG4gICAge1xyXG4gICAgICAgIGlmKChHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLmN1cl9nYW1lX3N0YXRlIT1HYW1lU3RhdGUuR2FtZV9QbGF5aW5nKXx8dGhpcy5nZXRJc0RpZSgpKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICBzdXBlci51cGRhdGUoZHQpO1xyXG4gICAgICAgIHRoaXMuY2hlY2tTa2lsbChkdCk7XHJcbiAgICAgICAgaWYodGhpcy5nZXRFbmVteVN0YXRlKCkhPUVuZW15X1N0YXRlLnNraWxsKXtcclxuICAgICAgICAgICAgaWYoIXRoaXMuaXNIYXZlRGVCdWZmKEJ1ZmZJZC5IZXJvX1h1YW5ZdW4pKXtcclxuICAgICAgICAgICAgICAgIHRoaXMuY2hlY2tBdHQoZHQpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKuaKgOiDveajgOa1iyAqL1xyXG4gICAgY2hlY2tTa2lsbChkdDpudW1iZXIpe1xyXG4gICAgICAgIGZvcihsZXQgaT0wOyBpPDM7IGkrKyl7XHJcbiAgICAgICAgICAgIGlmKGk9PTIpe1xyXG4gICAgICAgICAgICAgICAgLy/nrKwz5Liq5oqA6IO9XHJcbiAgICAgICAgICAgICAgICBpZih0aGlzLmlzX2FjdGl2ZV9za2lsbF8zPT1mYWxzZSl7XHJcbiAgICAgICAgICAgICAgICAgICAgY29udGludWU7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYodGhpcy5za2lsbF9jb2xkX2Rvd25baV0+MCl7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNraWxsX2NvbGRfZG93bltpXS09ZHQ7XHJcbiAgICAgICAgICAgICAgICBpZih0aGlzLnNraWxsX2NvbGRfZG93bltpXTwwKXtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnNraWxsX2NvbGRfZG93bltpXT0wO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc3RhcnRTa2lsbChpKzEpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKuaUu+WHu+iuoeeulyAqL1xyXG4gICAgY2hlY2tBdHQoZHQ6bnVtYmVyKXsgICAgICAgIFxyXG4gICAgICAgIHRoaXMuYXR0X2ppc2h1Kz1kdDtcclxuICAgICAgICBpZih0aGlzLmF0dF9qaXNodT49dGhpcy5hdHRfamlhbmdlKXtcclxuICAgICAgICAgICAgdGhpcy5hdHRfamlzaHU9dGhpcy5hdHRfamlhbmdlO1xyXG4gICAgICAgICAgICB0aGlzLnN0YXJ0QXR0YWNrKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgXHJcbn1cclxuIl19