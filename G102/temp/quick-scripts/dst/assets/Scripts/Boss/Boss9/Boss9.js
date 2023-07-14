
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Scripts/Boss/Boss9/Boss9.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0c1xcQm9zc1xcQm9zczlcXEJvc3M5LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLDZDQUE0QztBQUM1Qyx1REFBc0Q7QUFDdEQsb0VBQWlGO0FBQ2pGLGlEQUE0QztBQUM1QyxxREFBb0Q7QUFDcEQseURBQTBFO0FBQzFFLDZEQUF3RDtBQUN4RCx5REFBdUU7QUFDdkUsK0RBQTBEO0FBQzFELDZEQUF3RDtBQUl4RCxzREFBaUQ7QUFDakQsZ0NBQTJCO0FBQzNCLElBQUssY0FXSjtBQVhELFdBQUssY0FBYztJQUVmLCtCQUFhLENBQUE7SUFDYixvQ0FBa0IsQ0FBQTtJQUNsQiw2QkFBVyxDQUFBO0lBQ1gsZ0NBQWMsQ0FBQTtJQUNkLG1DQUFpQixDQUFBO0lBQ2pCLHVDQUFxQixDQUFBO0lBQ3JCLHVDQUFxQixDQUFBO0lBQ3JCLHVDQUFxQixDQUFBO0lBQ3JCLCtCQUFZLENBQUE7QUFDaEIsQ0FBQyxFQVhJLGNBQWMsS0FBZCxjQUFjLFFBV2xCO0FBRUssSUFBQSxLQUFzQixFQUFFLENBQUMsVUFBVSxFQUFsQyxPQUFPLGFBQUEsRUFBRSxRQUFRLGNBQWlCLENBQUM7QUFHMUM7SUFBbUMseUJBQUk7SUFBdkM7UUFBQSxxRUEyWEM7UUF4WEcsYUFBTyxHQUFXLEVBQUUsQ0FBQztRQUNyQix1QkFBaUIsR0FBUyxLQUFLLENBQUM7UUFDaEMsZUFBUyxHQUFRLENBQUMsQ0FBQztRQUNuQixhQUFPLEdBQVEsQ0FBQyxDQUFDO1FBQ2pCLGFBQWE7UUFDYixlQUFTLEdBQVMsSUFBSSxDQUFDO1FBQ3ZCLFVBQVU7UUFDVixlQUFTLEdBQVMsSUFBSSxDQUFDO1FBQ3ZCLFVBQVU7UUFDVixpQkFBVyxHQUFRLENBQUMsQ0FBQztRQUNyQixXQUFXO1FBQ1gsa0JBQVksR0FBUSxDQUFDLENBQUM7UUFDdEIsVUFBVTtRQUNWLGlCQUFXLEdBQVEsRUFBRSxDQUFDO1FBQ3RC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UyxJQUFFLElBQUksQ0FBQyxVQUFVLEVBQUM7WUFDL0IsSUFBSSxDQUFDLFNBQVMsR0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDO1lBQy9CLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQztTQUN0QjthQUFJO1lBQ0Qsa0JBQWtCO1NBQ3JCO0lBQ0wsQ0FBQztJQXRYRDtRQURDLFFBQVEsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsQ0FBQzswQ0FDQztJQUhKLEtBQUs7UUFEekIsT0FBTztPQUNhLEtBQUssQ0EyWHpCO0lBQUQsWUFBQztDQTNYRCxBQTJYQyxDQTNYa0MsY0FBSSxHQTJYdEM7a0JBM1hvQixLQUFLIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgR2FtZVN0YXRlIH0gZnJvbSBcIi4uLy4uL0NvbnN0YW50c1wiO1xyXG5pbXBvcnQgeyBFbmVteV9TdGF0ZSB9IGZyb20gXCIuLi8uLi9FbmVteS9FbmVteUNvbmZpZ1wiO1xyXG5pbXBvcnQgeyBHYW1lRWZmZWN0c01hbmFnZXIsIEdhbWVFZmZlY3RJZCB9IGZyb20gXCIuLi8uLi9HYW1lL0dhbWVFZmZlY3RzTWFuYWdlclwiO1xyXG5pbXBvcnQgR2FtZU1hbmFnZXIgZnJvbSBcIi4uLy4uL0dhbWVNYW5hZ2VyXCI7XHJcbmltcG9ydCB7IEJ1ZmZEYXRhIH0gZnJvbSBcIi4uLy4uL0hlcm8vR2FtZS9CdWZmRGF0YVwiO1xyXG5pbXBvcnQgeyBEYW1hZ2VUeXBlLCBCdWZmSWQsIEJ1ZmZUeXBlIH0gZnJvbSBcIi4uLy4uL0hlcm8vR2FtZS9IZXJvQ29uZmlnXCI7XHJcbmltcG9ydCBNb25zdGVyQnVsbGV0IGZyb20gXCIuLi8uLi9Nb25zdGVyL01vbnN0ZXJCdWxsZXRcIjtcclxuaW1wb3J0IHsgS2V5RnJhbWVEYXRhLCBTdHJlbmd0aFR5cGUgfSBmcm9tIFwiLi4vLi4vTW9uc3Rlci9Nb25zdGVyRGF0YVwiO1xyXG5pbXBvcnQgTW9uc3Rlck1hbmFnZXIgZnJvbSBcIi4uLy4uL01vbnN0ZXIvTW9uc3Rlck1hbmFnZXJcIjtcclxuaW1wb3J0IHsgU291bmRJbmRleCB9IGZyb20gXCIuLi8uLi9Tb3VuZC9BdWRpb0NvbnN0YW50c1wiO1xyXG5pbXBvcnQgTXlUb29sIGZyb20gXCIuLi8uLi9Ub29scy9NeVRvb2xcIjtcclxuaW1wb3J0IFdhbGwgZnJvbSBcIi4uLy4uL1dhbGwvV2FsbFwiO1xyXG5pbXBvcnQgeyBXYWxsVHlwZSB9IGZyb20gXCIuLi8uLi9XYWxsL1dhbGxDb25maWdcIjtcclxuaW1wb3J0IFdhbGxNYW5hZ2VyIGZyb20gXCIuLi8uLi9XYWxsL1dhbGxNYW5hZ2VyXCI7XHJcbmltcG9ydCBCb3NzIGZyb20gXCIuLi9Cb3NzXCI7XHJcbmVudW0gQW5pbWF0aW9uX05hbWVcclxue1xyXG4gICAgSWRsZSA9IFwiSWRsZVwiLCAgICAgICAvLy0tIOato+mdouW+heaculxyXG4gICAgYXR0YWNrID0gXCJBdHRhY2sxXCIsICAgICAgICAgIC8vLS0g5pS75Ye7MVxyXG4gICAgcnVuID0gXCJSdW5cIiwgICAgICAgICAgICAgICAgLy8tLSDot5Hot69cclxuICAgIGh1cnQxID0gXCJIdXJ0XCIsICAgICAgICAgIC8vLS0g5Y+X5Ye7MVxyXG4gICAgc2tpbGwyID0gXCJTa2lsbDJcIiwgICAgICAgICAgLy8tLSDmioDog70yXHJcbiAgICBza2lsbDJfMSA9IFwiU2tpbGwyXzFcIiwgICAgICAgICAgLy8tLSDmioDog70yLTHlvIDlp4vok4TliptcclxuICAgIHNraWxsMl8yID0gXCJTa2lsbDJfMlwiLCAgICAgICAgICAvLy0tIOaKgOiDvTItMuiThOWKm1xyXG4gICAgc2tpbGwyXzMgPSBcIlNraWxsMl8zXCIsICAgICAgICAgIC8vLS0g5oqA6IO9Mi0z6JOE5Yqb57uT5p2fXHJcbiAgICBkZWFkPSBcIkRlYWRcIiwgICAvL+atu+S6oVxyXG59XHJcblxyXG5jb25zdCB7Y2NjbGFzcywgcHJvcGVydHl9ID0gY2MuX2RlY29yYXRvcjtcclxuXHJcbkBjY2NsYXNzXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEJvc3M5IGV4dGVuZHMgQm9zcyB7XHJcbiAgICBcclxuICAgIEBwcm9wZXJ0eShbY2MuTm9kZV0pXHJcbiAgICBtYW9feWFuOmNjLk5vZGVbXT1bXTtcclxuICAgIGlzX2FjdGl2ZV9za2lsbF8zOmJvb2xlYW49ZmFsc2U7XHJcbiAgICBza2lsbF9udW06bnVtYmVyPTA7XHJcbiAgICBhdHRfbnVtOm51bWJlcj0wO1xyXG4gICAgLyoq5piv5ZCm5aSE5LqO5byV5a+85LitICovXHJcbiAgICBpc195aW5kYW86Ym9vbGVhbj10cnVlO1xyXG4gICAgLyoq5Za354Gr6IqC54K5ICovXHJcbiAgICBmaXJlX25vZGU6Y2MuTm9kZT1udWxsO1xyXG4gICAgLyoq5Za354Gr5qyh5pWwICovXHJcbiAgICBwZW5faHVvX251bTpudW1iZXI9MDtcclxuICAgIC8qKuW8leWvvOeahOiuoeaVsCAqL1xyXG4gICAgeWluZGFvX2ppc2h1Om51bWJlcj0wO1xyXG4gICAgLyoq57yp5pS+6YCf5bqmICovXHJcbiAgICBzY2FsZV9zcGVlZDpudW1iZXI9MTY7XHJcbiAgICAvKirkuIDlgI3nmoTnvKnmlL7lgLznmoTot53nprvpl7TpmpQgKi9cclxuICAgIG9uY2VfZGlzdGFuY2U6bnVtYmVyPTA7XHJcbiAgICAvKirmgLvnmoTlvJXlr7zml7bpl7QgKi9cclxuICAgIHlpbmRhb190aW1lOm51bWJlcj0xO1xyXG4gICAga3VhbmdiYW9fdmFsdWU6bnVtYmVyW109W107XHJcbiAgICBza2lsbF9wb3M6Y2MuVmVjMj1jYy52MigpO1xyXG4gICAgLyoq5piv5ZCm6L+H6L29ICovXHJcbiAgICBpc19ndW96YWk6Ym9vbGVhbj1mYWxzZTtcclxuICAgIGJhb19saWVfamlzaHU6bnVtYmVyPTA7XHJcbiAgICAvKirml6DmlYzmiqTnm74gKi9cclxuICAgIHd1ZGlfaHVkdTpjYy5Ob2RlPW51bGw7XHJcblxyXG4gICAgb25Mb2FkKCk6IHZvaWQge1xyXG4gICAgICAgIHN1cGVyLm9uTG9hZCgpO1xyXG4gICAgICAgIEdhbWVFZmZlY3RzTWFuYWdlci5nZXRJbnN0YW5jZSgpLmFkZEVmZmVjdFBvb2xCeUlkKEdhbWVFZmZlY3RJZC5ib3NzOV9hdHRhY2tfYnVsbGVjdCwxKTtcclxuICAgICAgICBHYW1lRWZmZWN0c01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5hZGRFZmZlY3RQb29sQnlJZChHYW1lRWZmZWN0SWQuYm9zczlfYXR0YWNrX2J1bGxlY3RfaGl0LDEpOyAgICAgICAgXHJcbiAgICAgICAgR2FtZUVmZmVjdHNNYW5hZ2VyLmdldEluc3RhbmNlKCkuYWRkRWZmZWN0UG9vbEJ5SWQoR2FtZUVmZmVjdElkLmJvc3M5X3NraWxsMl9wZW5odW8sMSk7ICAgICAgICAgIFxyXG4gICAgICAgIEdhbWVFZmZlY3RzTWFuYWdlci5nZXRJbnN0YW5jZSgpLmFkZEVmZmVjdFBvb2xCeUlkKEdhbWVFZmZlY3RJZC5ib3NzOV9za2lsbDNfaHVkdW4sMSk7XHJcbiAgICAgICAgR2FtZUVmZmVjdHNNYW5hZ2VyLmdldEluc3RhbmNlKCkuYWRkRWZmZWN0UG9vbEJ5SWQoR2FtZUVmZmVjdElkLmJvc3M5X3NraWxsM19iYW9saWUsNCk7XHJcbiAgICAgICAgdGhpcy5hZGREZWF0aENhbGxiYWNrKHRoaXMub25EZWF0aCk7XHJcbiAgICAgICAgdGhpcy5hZGRYdWFuWXVuTGlzdGVuKHRoaXMub25YdWFuWXVuUmVzdWx0KTtcclxuICAgICAgICB0aGlzLmFkZEJvc3NJbml0ZWRMaXN0ZW4odGhpcy5vbkJvc3NJbml0ZWQpO1xyXG4gICAgICAgIHRoaXMuYWRkQ2hhbmdlQm9zc0hwTGlzdGVuKHRoaXMub25DaGFuZ2VIcCk7XHJcbiAgICAgICAgdGhpcy5zZXRNYW9ZYW4oZmFsc2UpO1xyXG4gICAgfVxyXG5cclxuICAgIG9uQm9zc0luaXRlZCgpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLnN0YXJ0SWRsZSgpO1xyXG4gICAgICAgIHRoaXMubm9kZS55PTEyODtcclxuICAgICAgICB0aGlzLnNraWxsX251bT0wO1xyXG4gICAgICAgIHRoaXMuc2tpbGxfcG9zPXRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZSgnc2tpbGwnKS5nZXRQb3NpdGlvbigpO1xyXG4gICAgICAgIGxldCBkaXN0YW5jZT10aGlzLmdldFNraWxsUG9zKCkueS1XYWxsTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldE1haW5XYWxsKCkuZ2V0V2FsbE1heFlZKCk7XHJcbiAgICAgICAgdGhpcy5vbmNlX2Rpc3RhbmNlPWRpc3RhbmNlLzQ7XHJcbiAgICAgICAgdGhpcy5pc19hY3RpdmVfc2tpbGxfMz1mYWxzZTtcclxuICAgIH1cclxuXHJcbiAgICBvbkNoYW5nZUhwKG51bTpudW1iZXIpe1xyXG4gICAgICAgIGlmKHRoaXMuY3VyX2hwPD10aGlzLm1heF9ocCowLjEpe1xyXG4gICAgICAgICAgICBpZih0aGlzLmlzX2FjdGl2ZV9za2lsbF8zPT1mYWxzZSl7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmlzX2FjdGl2ZV9za2lsbF8zPXRydWU7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnN0YXJ0U2tpbGwoMyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgc2V0TWFvWWFuKGlzU2hvdzpib29sZWFuKXtcclxuICAgICAgICBmb3IobGV0IGk9MDsgaTx0aGlzLm1hb195YW4ubGVuZ3RoOyBpKyspe1xyXG4gICAgICAgICAgICB0aGlzLm1hb195YW5baV0uYWN0aXZlPWlzU2hvdztcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgc3RhcnRJZGxlKCl7ICAgICAgICBcclxuICAgICAgICBzdXBlci5zZXRFbmVteVN0YXRlKEVuZW15X1N0YXRlLnN0YW5kYnkpO1xyXG4gICAgICAgIHN1cGVyLnBsYXlTcGluQW5pbWF0b24oQW5pbWF0aW9uX05hbWUuSWRsZSx0cnVlKTtcclxuICAgICAgICBcclxuICAgIH1cclxuXHJcbiAgICBzdGFydEF0dGFjaygpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLmF0dF9qaXNodT0wO1xyXG4gICAgICAgIHN1cGVyLnNldEVuZW15U3RhdGUoRW5lbXlfU3RhdGUuYXR0KTtcclxuICAgICAgICBsZXQgZGF0YT1uZXcgS2V5RnJhbWVEYXRhKCk7XHJcbiAgICAgICAgZGF0YS5uYW1lPSdBdHRhY2snO1xyXG4gICAgICAgIGRhdGEuY2FsbGJhY2s9KCk9PntcclxuICAgICAgICAgICAgdGhpcy5hdHRfamlzaHU9MDtcclxuICAgICAgICAgICAgR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zb3VuZF9tYW5hZ2VyLnBsYXlTb3VuZChTb3VuZEluZGV4LllYX0JPU1M5QXR0YWNrKTtcclxuICAgICAgICAgICAgbGV0IGJ1bGxlY3Q9R2FtZUVmZmVjdHNNYW5hZ2VyLmdldEluc3RhbmNlKCkuY3JlYXRlR2FtZUVmZmVjdEJ5SWQoR2FtZUVmZmVjdElkLmJvc3M5X2F0dGFja19idWxsZWN0LHRoaXMuZ2V0QXR0UG9zKCkpO1xyXG4gICAgICAgICAgICBidWxsZWN0LmdldENvbXBvbmVudChNb25zdGVyQnVsbGV0KS5pbml0KHRoaXMuZ2V0QXR0RGF0YShEYW1hZ2VUeXBlLk5vcm1hbCx0cnVlKSxHYW1lRWZmZWN0SWQuYm9zczlfYXR0YWNrX2J1bGxlY3QsR2FtZUVmZmVjdElkLmJvc3M5X2F0dGFja19idWxsZWN0X2hpdCwxNTAwLE1hdGguUEkqMy8yKTtcclxuICAgICAgICAgICAgdGhpcy5hdHRfbnVtKys7XHJcbiAgICAgICAgICAgIGlmKHRoaXMuYXR0X251bT49Myl7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmF0dF9udW09MDtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2tpbGxfcXVldWUucHVzaCgyKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBzdXBlci5wbGF5U3BpbkFuaW1hdG9uKChBbmltYXRpb25fTmFtZS5hdHRhY2spLGZhbHNlLGRhdGEsKCk9PntcclxuICAgICAgICAgICAgaWYodGhpcy5za2lsbF9xdWV1ZS5sZW5ndGg+MCl7XHJcbiAgICAgICAgICAgICAgICBzdXBlci5zZXRFbmVteVN0YXRlKEVuZW15X1N0YXRlLnN0YW5kYnkpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zdGFydFNraWxsKHRoaXMuc2tpbGxfcXVldWUuc2hpZnQoKSk7XHJcbiAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zdGFydElkbGUoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pXHJcbiAgICB9XHJcblxyXG4gICAgZ2V0U2tpbGxQb3MoKTpjYy5WZWMye1xyXG4gICAgICAgIGxldCBkaXNQb3M9dGhpcy5ub2RlLmdldFBvc2l0aW9uKCkuYWRkKGNjLnYyKHRoaXMuc2tpbGxfcG9zLngqdGhpcy5ub2RlLnNjYWxlWCx0aGlzLnNraWxsX3Bvcy55KnRoaXMubm9kZS5zY2FsZVkpKTtcclxuICAgICAgICByZXR1cm4gZGlzUG9zO1xyXG4gICAgfVxyXG5cclxuICAgIHN0YXJ0U2tpbGwoc2tpbGxJbmRleDpudW1iZXIpe1xyXG4gICAgICAgIHN3aXRjaChza2lsbEluZGV4KXtcclxuICAgICAgICAgICAgY2FzZSAxOntcclxuICAgICAgICAgICAgICAgIHRoaXMuc3RhcnRTa2lsbDEoKTtcclxuICAgICAgICAgICAgfWJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIDI6e1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zdGFydFNraWxsMigpO1xyXG4gICAgICAgICAgICB9YnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgMzp7XHJcbiAgICAgICAgICAgICAgICBpZih0aGlzLmlzX2FjdGl2ZV9za2lsbF8zKXtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnN0YXJ0U2tpbGwzKCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1icmVhaztcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICAvL+i/h+i9vVxyXG4gICAgc3RhcnRTa2lsbDEoKXtcclxuICAgICAgICBpZih0aGlzLmlzSGF2ZUJ1ZmYoQnVmZklkLkJvc3M5X1NraWxsXzFfZ3VvemFpKT09ZmFsc2Upe1xyXG4gICAgICAgICAgICBsZXQgYnVmZkRhdGE9bmV3IEJ1ZmZEYXRhKCk7XHJcbiAgICAgICAgICAgIGJ1ZmZEYXRhLmJ1ZmZfaWQ9QnVmZklkLkJvc3M5X1NraWxsXzFfZ3VvemFpO1xyXG4gICAgICAgICAgICBidWZmRGF0YS5yZW1haW5fdGltZT10aGlzLnNraWxsX2RhdGEuZ2V0U2tpbGxWYWx1ZTQoMSk7XHJcbiAgICAgICAgICAgIGJ1ZmZEYXRhLmJ1ZmZfdmFsdWU9W3RoaXMuc2tpbGxfZGF0YS5nZXRTa2lsbFZhbHVlMigxKSx0aGlzLnNraWxsX2RhdGEuZ2V0U2tpbGxWYWx1ZTMoMSldO1xyXG4gICAgICAgICAgICBsZXQgYnVmZj1zdXBlci5hZGRCdWZmKGJ1ZmZEYXRhKTtcclxuICAgICAgICAgICAgYnVmZi5hZGREZXN0cm95TGlzdGVuKHRoaXMub25Ta2lsbDFFbmQuYmluZCh0aGlzKSk7XHJcbiAgICAgICAgICAgIC8v6L+H6L296KGo546w5pWI5p6cXHJcbiAgICAgICAgICAgIC8v5YWo6Lqr6YCa57qiXHJcbiAgICAgICAgICAgIHRoaXMuaXNfZ3VvemFpPXRydWU7XHJcbiAgICAgICAgICAgIC8v5YaS54OfK+maj+acuueIhuijguaViOaenFxyXG4gICAgICAgICAgICB0aGlzLnNldE1hb1lhbih0cnVlKTtcclxuICAgICAgICAgICAgLy/mipbliqjnmoTmlYjmnpxcclxuICAgICAgICB9ICAgICAgICBcclxuICAgIH1cclxuXHJcbiAgICBvblNraWxsMUVuZCgpe1xyXG4gICAgICAgIHRoaXMuaXNfZ3VvemFpPWZhbHNlO1xyXG4gICAgICAgIHRoaXMubm9kZS5jb2xvcj1jYy5Db2xvci5XSElURTtcclxuICAgICAgICB0aGlzLnNldE1hb1lhbihmYWxzZSk7XHJcbiAgICB9XHJcblxyXG4gICAgLy/llrfngatcclxuICAgIHN0YXJ0U2tpbGwyKCl7XHJcbiAgICAgICAgbGV0IHNraWxsTm89MjtcclxuICAgICAgICBsZXQgc2tpbGxJbmRleD1za2lsbE5vLTE7XHJcbiAgICAgICAgdGhpcy5za2lsbF9jb2xkX2Rvd25bc2tpbGxJbmRleF09dGhpcy5za2lsbF9kYXRhLmdldFNraWxsQ29sZERvd24oc2tpbGxObyk7XHJcbiAgICAgICAgaWYoc3VwZXIuZ2V0RW5lbXlTdGF0ZSgpIT1FbmVteV9TdGF0ZS5hdHQmJnN1cGVyLmdldEVuZW15U3RhdGUoKSE9RW5lbXlfU3RhdGUuc2tpbGwpe1xyXG4gICAgICAgICAgICBpZighc3VwZXIuaXNIYXZlRGVCdWZmKEJ1ZmZJZC5IZXJvX1h1YW5ZdW4pKXtcclxuICAgICAgICAgICAgICAgIEdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuc291bmRfbWFuYWdlci5wbGF5U291bmQoU291bmRJbmRleC5ZWF9Cb3NzNFNraWxsKTtcclxuICAgICAgICAgICAgICAgIHN1cGVyLnNldEVuZW15U3RhdGUoRW5lbXlfU3RhdGUuc2tpbGwpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5za2lsbF9jb2xkX2Rvd25bc2tpbGxJbmRleF09dGhpcy5za2lsbF9kYXRhLmdldFNraWxsQ29sZERvd24oc2tpbGxObyk7XHJcbiAgICAgICAgICAgICAgICBzdXBlci5wbGF5U3BpbkFuaW1hdG9uKChBbmltYXRpb25fTmFtZS5za2lsbDJfMSksZmFsc2UsbnVsbCwoKT0+e1xyXG4gICAgICAgICAgICAgICAgICAgIHN1cGVyLnBsYXlTcGluQW5pbWF0b24oKEFuaW1hdGlvbl9OYW1lLnNraWxsMl8yKSx0cnVlLG51bGwsbnVsbCk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5pc195aW5kYW89dHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnlpbmRhb190aW1lPTM7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IHBvcz10aGlzLmdldFNraWxsUG9zKClcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmZpcmVfbm9kZT1HYW1lRWZmZWN0c01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5jcmVhdGVHYW1lRWZmZWN0QnlJZChHYW1lRWZmZWN0SWQuYm9zczlfc2tpbGwyX3Blbmh1byxwb3MpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZmlyZV9ub2RlLnNjYWxlPTA7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5maXJlX25vZGUuYW5nbGU9MTgwO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMucGVuX2h1b19udW09MDtcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgaWYodGhpcy5za2lsbF9xdWV1ZS5pbmRleE9mKHNraWxsTm8pPDApe1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2tpbGxfcXVldWUucHVzaChza2lsbE5vKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICBpZih0aGlzLnNraWxsX3F1ZXVlLmluZGV4T2Yoc2tpbGxObyk8MCl7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNraWxsX3F1ZXVlLnB1c2goc2tpbGxObyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgc3RhcnRTa2lsbDMoKXtcclxuICAgICAgICAvL+aKpOebvivliqDooYAr5peg5pWMXHJcbiAgICAgICAgbGV0IHNraWxsTm89MztcclxuICAgICAgICBsZXQgc2tpbGxJbmRleD1za2lsbE5vLTE7XHJcbiAgICAgICAgdGhpcy5za2lsbF9jb2xkX2Rvd25bc2tpbGxJbmRleF09dGhpcy5za2lsbF9kYXRhLmdldFNraWxsQ29sZERvd24oc2tpbGxObyk7XHJcbiAgICAgICAgLy/miZPmlq0gICAgICAgIFxyXG4gICAgICAgIHRoaXMuc3RhcnRJZGxlKCk7XHJcbiAgICAgICAgdGhpcy5zZXRFbmVteVN0YXRlKEVuZW15X1N0YXRlLnNraWxsKTtcclxuICAgICAgICBsZXQgYnVmZkRhdGE9bmV3IEJ1ZmZEYXRhKCk7XHJcbiAgICAgICAgYnVmZkRhdGEuYnVmZl9pZD1CdWZmSWQuQm9zczlfU2tpbGxfM193aWR1O1xyXG4gICAgICAgIGJ1ZmZEYXRhLnJlbWFpbl90aW1lPXRoaXMuc2tpbGxfZGF0YS5nZXRTa2lsbFZhbHVlMigzKTtcclxuICAgICAgICBidWZmRGF0YS5yZWNvdmVyeV9qaWFuZ2VfdGltZT0wLjI7XHJcbiAgICAgICAgbGV0IGhwPXRoaXMuc2tpbGxfZGF0YS5nZXRTa2lsbFZhbHVlMSgzKSp0aGlzLmdldE1heEhwKCkvKGJ1ZmZEYXRhLnJlbWFpbl90aW1lL2J1ZmZEYXRhLnJlY292ZXJ5X2ppYW5nZV90aW1lKTtcclxuICAgICAgICBidWZmRGF0YS5idWZmX3ZhbHVlPVtocF07XHJcbiAgICAgICAgbGV0IGJ1ZmY9c3VwZXIuYWRkQnVmZihidWZmRGF0YSk7XHJcbiAgICAgICAgYnVmZi5hZGREZXN0cm95TGlzdGVuKHRoaXMub25Ta2lsbDNFbmQuYmluZCh0aGlzKSk7XHJcbiAgICAgICAgdGhpcy53dWRpX2h1ZHU9R2FtZUVmZmVjdHNNYW5hZ2VyLmdldEluc3RhbmNlKCkuY3JlYXRlR2FtZUVmZmVjdEJ5SWQoR2FtZUVmZmVjdElkLmJvc3M5X3NraWxsM19odWR1bix0aGlzLm5vZGUuZ2V0UG9zaXRpb24oKSk7XHJcblxyXG4gICAgfVxyXG5cclxuICAgIG9uU2tpbGwzRW5kKCl7XHJcbiAgICAgICAgR2FtZUVmZmVjdHNNYW5hZ2VyLmdldEluc3RhbmNlKCkuZGVzdHJveUdhbWVFZmZlY3RCeUlkKEdhbWVFZmZlY3RJZC5ib3NzOV9za2lsbDNfaHVkdW4sdGhpcy53dWRpX2h1ZHUpO1xyXG4gICAgICAgIGlmKHRoaXMuc2tpbGxfcXVldWUubGVuZ3RoPjApe1xyXG4gICAgICAgICAgICBzdXBlci5zZXRFbmVteVN0YXRlKEVuZW15X1N0YXRlLnN0YW5kYnkpO1xyXG4gICAgICAgICAgICB0aGlzLnN0YXJ0U2tpbGwodGhpcy5za2lsbF9xdWV1ZS5zaGlmdCgpKTtcclxuICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgdGhpcy5zdGFydElkbGUoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgYWRkU2tpbGxOdW0oKXtcclxuICAgICAgICB0aGlzLnNraWxsX251bSsrO1xyXG4gICAgICAgIGlmKHRoaXMuc2tpbGxfbnVtPj10aGlzLnNraWxsX2RhdGEuZ2V0U2tpbGxWYWx1ZTEoMSkpe1xyXG4gICAgICAgICAgICAvL+i/h+i9vVxyXG4gICAgICAgICAgICB0aGlzLnN0YXJ0U2tpbGwxKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGZpcmVEYW1hZ2Uod2FsbDpXYWxsKXtcclxuICAgICAgICBpZihHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLmN1cl9nYW1lX3N0YXRlPT1HYW1lU3RhdGUuR2FtZV9QbGF5aW5nKXtcclxuICAgICAgICAgICAgdGhpcy5hZGRTa2lsbE51bSgpO1xyXG4gICAgICAgICAgICAvL+aSreaUvuWKqOeUu1xyXG4gICAgICAgICAgICAvL2xldCBwb3M9Y2MudjIoc3VwZXIuZ2V0QXR0UG9zKCkueCx3YWxsLmdldFdhbGxNYXhZWSgpLTMyKTsgICAgICAgICBcclxuICAgICAgICAgICAgbGV0IGF0dERhdGE9c3VwZXIuZ2V0QXR0RGF0YShEYW1hZ2VUeXBlLlNraWxsLGZhbHNlLHRoaXMuc2tpbGxfZGF0YS5nZXRTa2lsbFZhbHVlMSgyKSlcclxuICAgICAgICAgICAgYXR0RGF0YS5pc19iaWc9ZmFsc2U7XHJcbiAgICAgICAgICAgIGF0dERhdGEuemVuZ3NoYW5nX3JhdGUrPXRoaXMucGVuX2h1b19udW0qdGhpcy5za2lsbF9kYXRhLmdldFNraWxsVmFsdWUyKDIpO1xyXG4gICAgICAgICAgICBsZXQgZGF0YT13YWxsLmJlSW5qdXJlZChhdHREYXRhKTsvL1xyXG4gICAgICAgICAgICBpZihkYXRhLmdldERhbWFnZU51bSgpPjApe1xyXG4gICAgICAgICAgICAgICAgdGhpcy5wZW5faHVvX251bSsrO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgLyoq6ZSA5q+B5Za354Gr54m55pWIICovXHJcbiAgICBkZXN0cm95RmlyZShpc0lkbGU6Ym9vbGVhbikge1xyXG4gICAgICAgIHRoaXMuaXNfeWluZGFvPWZhbHNlO1xyXG4gICAgICAgIGlmKHRoaXMuZmlyZV9ub2RlKXtcclxuICAgICAgICAgICAgY2MudHdlZW4odGhpcy5maXJlX25vZGUpLnRvKDAuMix7c2NhbGU6MH0pLmNhbGwoKCk9PntcclxuICAgICAgICAgICAgICAgIEdhbWVFZmZlY3RzTWFuYWdlci5nZXRJbnN0YW5jZSgpLmRlc3Ryb3lHYW1lRWZmZWN0QnlJZChHYW1lRWZmZWN0SWQuYm9zczlfc2tpbGwyX3Blbmh1byx0aGlzLmZpcmVfbm9kZSk7XHJcbiAgICAgICAgICAgIH0pLnN0YXJ0KCk7XHJcbiAgICAgICAgfSAgICAgICAgXHJcbiAgICAgICAgaWYoaXNJZGxlKXtcclxuICAgICAgICAgICAgc3VwZXIucGxheVNwaW5BbmltYXRvbigoQW5pbWF0aW9uX05hbWUuc2tpbGwyXzMpLGZhbHNlLG51bGwsKCk9PntcclxuICAgICAgICAgICAgICAgIHRoaXMuc3RhcnRJZGxlKCk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBvbkRlYXRoKCkge1xyXG4gICAgICAgIHRoaXMudW5zY2hlZHVsZUFsbENhbGxiYWNrcygpO1xyXG4gICAgICAgIHN1cGVyLnBsYXlEZWFkQW5pbWF0b24oQW5pbWF0aW9uX05hbWUuZGVhZCwoKT0+e1xyXG4gICAgICAgICAgICB0aGlzLnJlbW92ZUFsbERlQnVmZigpO1xyXG4gICAgICAgICAgICB0aGlzLnJlbW92ZUFsbEJ1ZmYoKTtcclxuICAgICAgICAgICAgaWYodGhpcy5zaGFkb3cpe1xyXG4gICAgICAgICAgICAgICAgY2MudHdlZW4odGhpcy5zaGFkb3cpLnRvKDAuNzUse29wYWNpdHk6MH0pLnN0YXJ0KCk7XHJcbiAgICAgICAgICAgIH0gICAgICAgICAgICBcclxuICAgICAgICAgICAgY2MudHdlZW4odGhpcy5ub2RlKS50bygwLjc1LHtvcGFjaXR5OjB9KS5jYWxsKCgpPT57XHJcbiAgICAgICAgICAgICAgICB0aGlzLnJlbW92ZUFsbERlQnVmZigpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5yZW1vdmVBbGxCdWZmKCk7XHJcbiAgICAgICAgICAgICAgICBNb25zdGVyTWFuYWdlci5nZXRJbnN0YW5jZSgpLmRlc3Ryb3lNb25zdGVyKHRoaXMubm9kZSx0aGlzLm1vbnN0ZXJfdHlwZSk7XHJcbiAgICAgICAgICAgIH0pLnN0YXJ0KCk7XHJcbiAgICAgICAgfSlcclxuICAgICAgICAvL0dhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuc291bmRfbWFuYWdlci5wbGF5U291bmQoU291bmRJbmRleC5yZXdhcmRCb3gyKTtcclxuICAgICAgICB0aGlzLmRlc3Ryb3lGaXJlKGZhbHNlKTtcclxuICAgICAgICAvL+WIoOmZpFxyXG4gICAgICAgIC8vIGlmKHRoaXMuYm9zc19zaGllbGQpe1xyXG4gICAgICAgIC8vICAgICB0aGlzLmJvc3Nfc2hpZWxkLmRlc3RvcnlTaGllbGQoKTtcclxuICAgICAgICAvLyB9ICAgICAgICBcclxuICAgIH1cclxuXHJcbiAgICBvblh1YW5ZdW5SZXN1bHQoaXNYdWFuWXVuOmJvb2xlYW4pe1xyXG4gICAgICAgIGlmKGlzWHVhbll1bil7XHJcbiAgICAgICAgICAgIHRoaXMuc3RhcnRYdWFuWXVuKCk7XHJcbiAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgIGlmKCFzdXBlci5pc0hhdmVEZUJ1ZmZUeXBlKEJ1ZmZUeXBlLlZlcnRpZ28pKXtcclxuICAgICAgICAgICAgICAgIGlmKCFzdXBlci5nZXRJc0RpZSgpKXtcclxuICAgICAgICAgICAgICAgICAgICBpZih0aGlzLnNraWxsX3F1ZXVlLmxlbmd0aD4wKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgc3VwZXIuc2V0RW5lbXlTdGF0ZShFbmVteV9TdGF0ZS5zdGFuZGJ5KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zdGFydFNraWxsKHRoaXMuc2tpbGxfcXVldWUuc2hpZnQoKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc3RhcnRJZGxlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHN0YXJ0WHVhbll1bigpe1xyXG4gICAgICAgIHRoaXMuZGVzdHJveUZpcmUoZmFsc2UpO1xyXG4gICAgICAgIHN1cGVyLnBsYXlTcGluQW5pbWF0b24oQW5pbWF0aW9uX05hbWUuaHVydDEsZmFsc2UsbnVsbCwoKT0+e1xyXG4gICAgICAgICAgICBpZihzdXBlci5pc0hhdmVEZUJ1ZmZUeXBlKEJ1ZmZUeXBlLlZlcnRpZ28pJiYhc3VwZXIuZ2V0SXNEaWUoKSlcclxuICAgICAgICAgICAgICAgIHRoaXMuc3BpbmUucGF1c2VkPXRydWU7ICAgICAgICAgICAgICAgIFxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICB1cGRhdGUoZHQpXHJcbiAgICB7XHJcbiAgICAgICAgaWYoKEdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuY3VyX2dhbWVfc3RhdGUhPUdhbWVTdGF0ZS5HYW1lX1BsYXlpbmcpfHx0aGlzLmdldElzRGllKCkpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHN1cGVyLnVwZGF0ZShkdCk7XHJcbiAgICAgICAgLy90aGlzLmNoZWNrU2tpbGwoZHQpO1xyXG4gICAgICAgIHRoaXMuY2hlY2tZaW5EYW8oZHQpO1xyXG4gICAgICAgIGlmKHRoaXMuZ2V0RW5lbXlTdGF0ZSgpIT1FbmVteV9TdGF0ZS5za2lsbCl7XHJcbiAgICAgICAgICAgIGlmKCF0aGlzLmlzSGF2ZURlQnVmZihCdWZmSWQuSGVyb19YdWFuWXVuKSl7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNoZWNrQXR0KGR0KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBpZih0aGlzLmlzX2d1b3phaSl7XHJcbiAgICAgICAgICAgIHRoaXMubm9kZS5jb2xvcj1jYy5Db2xvci5SRUQ7XHJcbiAgICAgICAgICAgIHRoaXMuYmFvX2xpZV9qaXNodSs9ZHQ7XHJcbiAgICAgICAgICAgIGlmKHRoaXMuYmFvX2xpZV9qaXNodT49MC4yKXtcclxuICAgICAgICAgICAgICAgIHRoaXMuYmFvX2xpZV9qaXNodT0wO1xyXG4gICAgICAgICAgICAgICAgbGV0IGNlbnRlcj10aGlzLmdldEp1SmlQb3MoKTtcclxuICAgICAgICAgICAgICAgIGxldCBiYW5qaW5nPU1hdGgucmFuZG9tKCkqMjAwO1xyXG4gICAgICAgICAgICAgICAgbGV0IGh1ZHU9TWF0aC5yYW5kb20oKSooTWF0aC5QSSoyKTtcclxuICAgICAgICAgICAgICAgIGxldCB4eD1jZW50ZXIueCtNYXRoLmNvcyhodWR1KSpiYW5qaW5nO1xyXG4gICAgICAgICAgICAgICAgbGV0IHl5PWNlbnRlci55K01hdGguc2luKGh1ZHUpKmJhbmppbmc7XHJcbiAgICAgICAgICAgICAgICBHYW1lRWZmZWN0c01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5jcmVhdGVHYW1lRWZmZWN0QnlJZChHYW1lRWZmZWN0SWQuYm9zczlfc2tpbGwzX2Jhb2xpZSxjYy52Mih4eCx5eSkpXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgY2hlY2tZaW5EYW8oZHQ6bnVtYmVyKXtcclxuICAgICAgICBpZih0aGlzLmlzX3lpbmRhbyl7ICAgICAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIGlmKHRoaXMuZmlyZV9ub2RlKXtcclxuICAgICAgICAgICAgICAgIGxldCB3YWxscz1XYWxsTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldEFsbFdhbGwoKTtcclxuICAgICAgICAgICAgICAgIGxldCBhdHRXYWxsPW51bGw7XHJcbiAgICAgICAgICAgICAgICB3YWxscy5mb3JFYWNoKCh3YWxsOldhbGwsd2FsbFR5cGU6V2FsbFR5cGUpPT57XHJcbiAgICAgICAgICAgICAgICAgICAgLy/mlLvlh7vln47lopnnmoTmnaHku7Yx77yM5b+F6aG75Zyo5Z+O5aKZ5LmL5LiKLDLovr7liLDmlLvlh7vot53nprtcclxuICAgICAgICAgICAgICAgICAgICBpZih0aGlzLm5vZGUueT49d2FsbC5nZXRXYWxsTWF4WVkoKSl7ICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBhdHRXYWxsPXdhbGw7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIGlmKGF0dFdhbGwpe1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBkaXN0YW5jZT1zdXBlci5nZXRBdHRQb3MoKS55LWF0dFdhbGwuZ2V0V2FsbE1heFlZKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IG1heFNjYWxlPWRpc3RhbmNlL3RoaXMub25jZV9kaXN0YW5jZSsxO1xyXG4gICAgICAgICAgICAgICAgICAgIC8v5qC55o2u6Led56a7566X5Ye657yp5pS+5YC877yM5pyA5bCPMeWAje+8jOacgOWkpzblgI1cclxuICAgICAgICAgICAgICAgICAgICBpZih0aGlzLmZpcmVfbm9kZS5zY2FsZT49bWF4U2NhbGUpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmZpcmVfbm9kZS5zY2FsZT1tYXhTY2FsZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy55aW5kYW9famlzaHUrPWR0O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZih0aGlzLnlpbmRhb19qaXNodT49MC4yKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMueWluZGFvX2ppc2h1PTA7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmZpcmVEYW1hZ2UoYXR0V2FsbCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5maXJlX25vZGUuc2NhbGUrPXRoaXMuc2NhbGVfc3BlZWQqZHQ7XHJcbiAgICAgICAgICAgICAgICAgICAgfSAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLnlpbmRhb190aW1lLT1kdDtcclxuICAgICAgICAgICAgaWYodGhpcy55aW5kYW9fdGltZTw9MCl7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnlpbmRhb190aW1lPTA7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmRlc3Ryb3lGaXJlKHRydWUpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKuaKgOiDveajgOa1iyAqL1xyXG4gICAgY2hlY2tTa2lsbChkdDpudW1iZXIpe1xyXG4gICAgICAgIGZvcihsZXQgaT0wOyBpPDI7IGkrKyl7ICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIGlmKHRoaXMuc2tpbGxfY29sZF9kb3duW2ldPjApe1xyXG4gICAgICAgICAgICAgICAgdGhpcy5za2lsbF9jb2xkX2Rvd25baV0tPWR0O1xyXG4gICAgICAgICAgICAgICAgaWYodGhpcy5za2lsbF9jb2xkX2Rvd25baV08MCl7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5za2lsbF9jb2xkX2Rvd25baV09MDtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnN0YXJ0U2tpbGwoaSsxKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKirmlLvlh7vorqHnrpcgKi9cclxuICAgIGNoZWNrQXR0KGR0Om51bWJlcil7ICAgICAgICBcclxuICAgICAgICB0aGlzLmF0dF9qaXNodSs9ZHQ7XHJcbiAgICAgICAgaWYodGhpcy5hdHRfamlzaHU+PXRoaXMuYXR0X2ppYW5nZSl7XHJcbiAgICAgICAgICAgIHRoaXMuYXR0X2ppc2h1PXRoaXMuYXR0X2ppYW5nZTtcclxuICAgICAgICAgICAgdGhpcy5zdGFydEF0dGFjaygpO1xyXG4gICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAvL3RoaXMubW92aW5nKGR0KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBcclxufVxyXG4iXX0=