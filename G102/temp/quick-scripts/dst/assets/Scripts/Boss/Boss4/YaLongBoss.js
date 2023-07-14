
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Scripts/Boss/Boss4/YaLongBoss.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '001d2nktwJMcoRm9Ks2d3RK', 'YaLongBoss');
// Scripts/Boss/Boss4/YaLongBoss.ts

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
var HeroConfig_1 = require("../../Hero/Game/HeroConfig");
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
    Animation_Name["skill2"] = "Skill2";
    Animation_Name["skill1_1"] = "Skill1_1";
    Animation_Name["skill1_2"] = "Skill1_2";
    Animation_Name["skill1_3"] = "Skill1_3";
    Animation_Name["dead"] = "Dead";
})(Animation_Name || (Animation_Name = {}));
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var YaLongBoss = /** @class */ (function (_super) {
    __extends(YaLongBoss, _super);
    function YaLongBoss() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.hands = [];
        _this.is_active_skill_2 = false;
        _this.attack_num = 0;
        /**是否处于引导中 */
        _this.is_yindao = true;
        /**喷火节点 */
        _this.fire_node = null;
        /**引导的计数 */
        _this.yindao_jishu = 0;
        /**缩放速度 */
        _this.scale_speed = 16;
        /**一倍的缩放值的距离间隔 */
        _this.once_distance = 0;
        /**总的引导时间 */
        _this.yindao_time = 1;
        _this.kuangbao_value = [];
        _this.is_kuang_bao = false;
        return _this;
    }
    YaLongBoss.prototype.onLoad = function () {
        _super.prototype.onLoad.call(this);
        GameEffectsManager_1.GameEffectsManager.getInstance().addEffectPoolById(GameEffectsManager_1.GameEffectId.boss4_normal_attack_hit, 1);
        GameEffectsManager_1.GameEffectsManager.getInstance().addEffectPoolById(GameEffectsManager_1.GameEffectId.boss4_normal_skill_penhuo, 1);
        this.addDeathCallback(this.onDeath);
        this.addXuanYunListen(this.onXuanYunResult);
        this.addBossInitedListen(this.onBossInited);
        this.addChangeBossHpListen(this.onChangeHp);
        this.setHands(false);
    };
    YaLongBoss.prototype.onBossInited = function () {
        this.startIdle();
        this.node.y = 128;
        this.attack_num = 0;
        var distance = this.getAttPos().y - WallManager_1.default.getInstance().getMainWall().getWallMaxYY();
        this.once_distance = distance / 5.3;
        this.kuangbao_value = [this.skill_data.getSkillValue1(2), this.skill_data.getSkillValue2(2), -this.skill_data.getSkillValue3(2)];
    };
    YaLongBoss.prototype.onChangeHp = function (num) {
        if (this.cur_hp <= this.max_hp / 2) {
            if (this.is_active_skill_2 == false && this.skill_cold_down[1] <= 0) {
                this.is_active_skill_2 = true;
                this.startSkill(2);
            }
        }
        else {
            if (this.is_active_skill_2 == true) {
                this.is_active_skill_2 = false;
                this.setKuangBao(false);
            }
        }
    };
    YaLongBoss.prototype.setHands = function (isShow) {
        for (var i = 0; i < this.hands.length; i++) {
            this.hands[i].active = isShow;
        }
    };
    YaLongBoss.prototype.startIdle = function () {
        _super.prototype.setEnemyState.call(this, EnemyConfig_1.Enemy_State.standby);
        _super.prototype.playSpinAnimaton.call(this, Animation_Name.Idle, true);
    };
    YaLongBoss.prototype.startAttack = function () {
        var _this = this;
        this.att_jishu = 0;
        _super.prototype.setEnemyState.call(this, EnemyConfig_1.Enemy_State.att);
        var data = new MonsterData_1.KeyFrameData();
        data.name = 'Attack';
        data.callback = function () {
            _this.attack_num++;
            _this.att_jishu = 0;
            GameManager_1.default.getInstance().sound_manager.playSound(AudioConstants_1.SoundIndex.YX_Boss4Attack);
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
                    GameEffectsManager_1.GameEffectsManager.getInstance().createGameEffectById(GameEffectsManager_1.GameEffectId.boss4_normal_attack_hit, cc.v2(Math.random() * 640 - 320, attWall.getWallMaxYY()));
                }
            }
            if (_this.attack_num >= _this.skill_data.getSkillValue3(1)) { //
                //喷火
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
    YaLongBoss.prototype.startSkill = function (skillIndex) {
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
    //狂暴
    YaLongBoss.prototype.startSkill2 = function () {
        var _this = this;
        if (this.is_active_skill_2 == false) {
            return;
        }
        this.skill_cold_down[1] = this.skill_data.getSkillColdDown(2);
        if (_super.prototype.getEnemyState.call(this) != EnemyConfig_1.Enemy_State.att && _super.prototype.getEnemyState.call(this) != EnemyConfig_1.Enemy_State.skill) {
            if (!_super.prototype.isHaveDeBuff.call(this, HeroConfig_1.BuffId.Hero_XuanYun)) {
                //霸体，防止被打断而无法进入狂暴状态
                this.cur_toughness += 1;
                _super.prototype.setEnemyState.call(this, EnemyConfig_1.Enemy_State.skill);
                this.skill_cold_down[1] = this.skill_data.getSkillColdDown(2);
                var data = new MonsterData_1.KeyFrameData();
                data.name = 'Skill2';
                data.callback = function () {
                    _this.cur_toughness -= 1;
                    _this.att_jishu = 0;
                    _this.setKuangBao(true);
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
                if (this.skill_queue.indexOf(2) < 0) {
                    this.skill_queue.push(2);
                }
            }
        }
        else {
            if (this.skill_queue.indexOf(2) < 0) {
                this.skill_queue.push(2);
            }
        }
    };
    YaLongBoss.prototype.setKuangBao = function (isKB) {
        if (this.is_kuang_bao != isKB) {
            this.is_kuang_bao = isKB;
            this.setHands(isKB);
            this.is_active_skill_2 = isKB;
            if (isKB) {
                this.monster_data.Attack += this.base_attribute_data.Attack * this.kuangbao_value[0];
                this.changeAttackSpeed(this.kuangbao_value[1]);
                this.monster_data.Defense += this.base_attribute_data.Defense * this.kuangbao_value[2];
            }
            else {
                this.monster_data.Attack -= this.base_attribute_data.Attack * this.kuangbao_value[0];
                this.changeAttackSpeed(-this.kuangbao_value[1]);
                this.monster_data.Defense -= this.base_attribute_data.Defense * this.kuangbao_value[2];
            }
        }
    };
    //喷火
    YaLongBoss.prototype.startSkill1 = function () {
        var _this = this;
        this.skill_cold_down[0] = this.skill_data.getSkillColdDown(1);
        if (_super.prototype.getEnemyState.call(this) != EnemyConfig_1.Enemy_State.att) {
            if (!_super.prototype.isHaveDeBuff.call(this, HeroConfig_1.BuffId.Hero_XuanYun)) {
                GameManager_1.default.getInstance().sound_manager.playSound(AudioConstants_1.SoundIndex.YX_Boss4Skill);
                _super.prototype.setEnemyState.call(this, EnemyConfig_1.Enemy_State.skill);
                this.skill_cold_down[0] = this.skill_data.getSkillColdDown(1);
                _super.prototype.playSpinAnimaton.call(this, (Animation_Name.skill1_1), false, null, function () {
                    _super.prototype.playSpinAnimaton.call(_this, (Animation_Name.skill1_2), true, null, null);
                    _this.is_yindao = true;
                    _this.yindao_time = _this.skill_data.getSkillValue2(1);
                    var pos = _super.prototype.getAttPos.call(_this);
                    _this.fire_node = GameEffectsManager_1.GameEffectsManager.getInstance().createGameEffectById(GameEffectsManager_1.GameEffectId.boss4_normal_skill_penhuo, pos);
                    _this.fire_node.scale = 0;
                    _this.fire_node.angle = 180;
                });
            }
            else {
                if (this.skill_queue.indexOf(1) < 0) {
                    this.skill_queue.push(1);
                }
            }
        }
        else {
            if (this.skill_queue.indexOf(1) < 0) {
                this.skill_queue.push(1);
            }
        }
    };
    YaLongBoss.prototype.fireDamage = function (wall) {
        if (GameManager_1.default.getInstance().cur_game_state == Constants_1.GameState.Game_Playing) {
            //播放动画
            //let pos=cc.v2(super.getAttPos().x,wall.getWallMaxYY()-32);  
            var attData = _super.prototype.getAttData.call(this, HeroConfig_1.DamageType.Skill, false, this.skill_data.getSkillValue1(1));
            attData.is_big = false;
            var data = wall.beInjured(attData); //
            // if(data.getDamageNum()>0){
            //     MyTool.randomSceneShakeSmall();
            // }
        }
    };
    /**销毁喷火特效 */
    YaLongBoss.prototype.destroyFire = function (isIdle) {
        var _this = this;
        this.is_yindao = false;
        if (this.fire_node) {
            cc.tween(this.fire_node).to(0.2, { scale: 0 }).call(function () {
                GameEffectsManager_1.GameEffectsManager.getInstance().destroyGameEffectById(GameEffectsManager_1.GameEffectId.boss4_normal_skill_penhuo, _this.fire_node);
            }).start();
        }
        if (isIdle) {
            _super.prototype.playSpinAnimaton.call(this, (Animation_Name.skill1_3), false, null, function () {
                if (_this.skill_queue.length > 0) {
                    _super.prototype.setEnemyState.call(_this, EnemyConfig_1.Enemy_State.standby);
                    _this.startSkill(_this.skill_queue.shift());
                }
                else {
                    _this.startIdle();
                }
            });
        }
    };
    YaLongBoss.prototype.onDeath = function () {
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
    YaLongBoss.prototype.onXuanYunResult = function (isXuanYun) {
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
    YaLongBoss.prototype.startXuanYun = function () {
        var _this = this;
        this.destroyFire(false);
        _super.prototype.playSpinAnimaton.call(this, Animation_Name.hurt1, false, null, function () {
            if (_super.prototype.isHaveDeBuffType.call(_this, HeroConfig_1.BuffType.Vertigo) && !_super.prototype.getIsDie.call(_this))
                _this.spine.paused = true;
        });
    };
    YaLongBoss.prototype.update = function (dt) {
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
    YaLongBoss.prototype.checkYinDao = function (dt) {
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
    YaLongBoss.prototype.checkSkill = function (dt) {
        for (var i = 0; i < 2; i++) {
            if (this.skill_cold_down[i] > 0) {
                this.skill_cold_down[i] -= dt;
                // if(i==1){
                //     //激活类技能不在此释放，只计算冷却
                //     continue;
                // }
                // if(this.skill_cold_down[i]<0){
                //     this.skill_cold_down[i]=0;
                //     this.startSkill(i+1);
                // }                
            }
        }
    };
    /**攻击计算 */
    YaLongBoss.prototype.checkAtt = function (dt) {
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
    ], YaLongBoss.prototype, "hands", void 0);
    YaLongBoss = __decorate([
        ccclass
    ], YaLongBoss);
    return YaLongBoss;
}(Boss_1.default));
exports.default = YaLongBoss;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0c1xcQm9zc1xcQm9zczRcXFlhTG9uZ0Jvc3MudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsNkNBQTRDO0FBQzVDLHVEQUFzRDtBQUN0RCxvRUFBaUY7QUFDakYsaURBQTRDO0FBRTVDLHlEQUEwRTtBQUMxRSx5REFBdUU7QUFDdkUsK0RBQTBEO0FBQzFELDZEQUF3RDtBQUl4RCxzREFBaUQ7QUFDakQsZ0NBQTJCO0FBQzNCLElBQUssY0FXSjtBQVhELFdBQUssY0FBYztJQUVmLCtCQUFhLENBQUE7SUFDYixtQ0FBaUIsQ0FBQTtJQUNqQiw2QkFBVyxDQUFBO0lBQ1gsZ0NBQWMsQ0FBQTtJQUNkLG1DQUFpQixDQUFBO0lBQ2pCLHVDQUFxQixDQUFBO0lBQ3JCLHVDQUFxQixDQUFBO0lBQ3JCLHVDQUFxQixDQUFBO0lBQ3JCLCtCQUFZLENBQUE7QUFDaEIsQ0FBQyxFQVhJLGNBQWMsS0FBZCxjQUFjLFFBV2xCO0FBRUssSUFBQSxLQUFzQixFQUFFLENBQUMsVUFBVSxFQUFsQyxPQUFPLGFBQUEsRUFBRSxRQUFRLGNBQWlCLENBQUM7QUFHMUM7SUFBd0MsOEJBQUk7SUFBNUM7UUFBQSxxRUE0V0M7UUF6V0csV0FBSyxHQUFXLEVBQUUsQ0FBQztRQUNuQix1QkFBaUIsR0FBUyxLQUFLLENBQUM7UUFDaEMsZ0JBQVUsR0FBUSxDQUFDLENBQUM7UUFDcEIsYUFBYTtRQUNiLGVBQVMsR0FBUyxJQUFJLENBQUM7UUFDdkIsVUFBVTtRQUNWLGVBQVMsR0FBUyxJQUFJLENBQUM7UUFDdkIsV0FBVztRQUNYLGtCQUFZLEdBQVEsQ0FBQyxDQUFDO1FBQ3RCLFVBQVU7UUFDVixpQkFBVyxHQUFRLEVBQUUsQ0FBQztRQUN0QixpQkFBaUI7UUFDakIsbUJBQWEsR0FBUSxDQUFDLENBQUM7UUFDdkIsWUFBWTtRQUNaLGlCQUFXLEdBQVEsQ0FBQyxDQUFDO1FBQ3JCLG9CQUFj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QUFVO1FBRDlCLE9BQU87T0FDYSxVQUFVLENBNFc5QjtJQUFELGlCQUFDO0NBNVdELEFBNFdDLENBNVd1QyxjQUFJLEdBNFczQztrQkE1V29CLFVBQVUiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBHYW1lU3RhdGUgfSBmcm9tIFwiLi4vLi4vQ29uc3RhbnRzXCI7XHJcbmltcG9ydCB7IEVuZW15X1N0YXRlIH0gZnJvbSBcIi4uLy4uL0VuZW15L0VuZW15Q29uZmlnXCI7XHJcbmltcG9ydCB7IEdhbWVFZmZlY3RzTWFuYWdlciwgR2FtZUVmZmVjdElkIH0gZnJvbSBcIi4uLy4uL0dhbWUvR2FtZUVmZmVjdHNNYW5hZ2VyXCI7XHJcbmltcG9ydCBHYW1lTWFuYWdlciBmcm9tIFwiLi4vLi4vR2FtZU1hbmFnZXJcIjtcclxuaW1wb3J0IHsgQnVmZkRhdGEgfSBmcm9tIFwiLi4vLi4vSGVyby9HYW1lL0J1ZmZEYXRhXCI7XHJcbmltcG9ydCB7IERhbWFnZVR5cGUsIEJ1ZmZJZCwgQnVmZlR5cGUgfSBmcm9tIFwiLi4vLi4vSGVyby9HYW1lL0hlcm9Db25maWdcIjtcclxuaW1wb3J0IHsgS2V5RnJhbWVEYXRhLCBTdHJlbmd0aFR5cGUgfSBmcm9tIFwiLi4vLi4vTW9uc3Rlci9Nb25zdGVyRGF0YVwiO1xyXG5pbXBvcnQgTW9uc3Rlck1hbmFnZXIgZnJvbSBcIi4uLy4uL01vbnN0ZXIvTW9uc3Rlck1hbmFnZXJcIjtcclxuaW1wb3J0IHsgU291bmRJbmRleCB9IGZyb20gXCIuLi8uLi9Tb3VuZC9BdWRpb0NvbnN0YW50c1wiO1xyXG5pbXBvcnQgTXlUb29sIGZyb20gXCIuLi8uLi9Ub29scy9NeVRvb2xcIjtcclxuaW1wb3J0IFdhbGwgZnJvbSBcIi4uLy4uL1dhbGwvV2FsbFwiO1xyXG5pbXBvcnQgeyBXYWxsVHlwZSB9IGZyb20gXCIuLi8uLi9XYWxsL1dhbGxDb25maWdcIjtcclxuaW1wb3J0IFdhbGxNYW5hZ2VyIGZyb20gXCIuLi8uLi9XYWxsL1dhbGxNYW5hZ2VyXCI7XHJcbmltcG9ydCBCb3NzIGZyb20gXCIuLi9Cb3NzXCI7XHJcbmVudW0gQW5pbWF0aW9uX05hbWVcclxue1xyXG4gICAgSWRsZSA9IFwiSWRsZVwiLCAgICAgICAvLy0tIOato+mdouW+heaculxyXG4gICAgYXR0YWNrID0gXCJBdHRhY2tcIiwgICAgICAgICAgLy8tLSDmlLvlh7sxXHJcbiAgICBydW4gPSBcIlJ1blwiLCAgICAgICAgICAgICAgICAvLy0tIOi3kei3r1xyXG4gICAgaHVydDEgPSBcIkh1cnRcIiwgICAgICAgICAgLy8tLSDlj5flh7sxXHJcbiAgICBza2lsbDIgPSBcIlNraWxsMlwiLCAgICAgICAgICAvLy0tIOaKgOiDvTJcclxuICAgIHNraWxsMV8xID0gXCJTa2lsbDFfMVwiLCAgICAgICAgICAvLy0tIOaKgOiDvTEtMeW8gOWni+iThOWKm1xyXG4gICAgc2tpbGwxXzIgPSBcIlNraWxsMV8yXCIsICAgICAgICAgIC8vLS0g5oqA6IO9MS0y6JOE5YqbXHJcbiAgICBza2lsbDFfMyA9IFwiU2tpbGwxXzNcIiwgICAgICAgICAgLy8tLSDmioDog70xLTPok4Tlipvnu5PmnZ9cclxuICAgIGRlYWQ9IFwiRGVhZFwiLCAgIC8v5q275LqhXHJcbn1cclxuXHJcbmNvbnN0IHtjY2NsYXNzLCBwcm9wZXJ0eX0gPSBjYy5fZGVjb3JhdG9yO1xyXG5cclxuQGNjY2xhc3NcclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgWWFMb25nQm9zcyBleHRlbmRzIEJvc3Mge1xyXG4gICAgXHJcbiAgICBAcHJvcGVydHkoW2NjLk5vZGVdKVxyXG4gICAgaGFuZHM6Y2MuTm9kZVtdPVtdO1xyXG4gICAgaXNfYWN0aXZlX3NraWxsXzI6Ym9vbGVhbj1mYWxzZTtcclxuICAgIGF0dGFja19udW06bnVtYmVyPTA7XHJcbiAgICAvKirmmK/lkKblpITkuo7lvJXlr7zkuK0gKi9cclxuICAgIGlzX3lpbmRhbzpib29sZWFuPXRydWU7XHJcbiAgICAvKirllrfngavoioLngrkgKi9cclxuICAgIGZpcmVfbm9kZTpjYy5Ob2RlPW51bGw7XHJcbiAgICAvKirlvJXlr7znmoTorqHmlbAgKi9cclxuICAgIHlpbmRhb19qaXNodTpudW1iZXI9MDtcclxuICAgIC8qKue8qeaUvumAn+W6piAqL1xyXG4gICAgc2NhbGVfc3BlZWQ6bnVtYmVyPTE2O1xyXG4gICAgLyoq5LiA5YCN55qE57yp5pS+5YC855qE6Led56a76Ze06ZqUICovXHJcbiAgICBvbmNlX2Rpc3RhbmNlOm51bWJlcj0wO1xyXG4gICAgLyoq5oC755qE5byV5a+85pe26Ze0ICovXHJcbiAgICB5aW5kYW9fdGltZTpudW1iZXI9MTtcclxuICAgIGt1YW5nYmFvX3ZhbHVlOm51bWJlcltdPVtdO1xyXG4gICAgaXNfa3VhbmdfYmFvOmJvb2xlYW49ZmFsc2U7XHJcblxyXG4gICAgb25Mb2FkKCk6IHZvaWQge1xyXG4gICAgICAgIHN1cGVyLm9uTG9hZCgpO1xyXG4gICAgICAgIEdhbWVFZmZlY3RzTWFuYWdlci5nZXRJbnN0YW5jZSgpLmFkZEVmZmVjdFBvb2xCeUlkKEdhbWVFZmZlY3RJZC5ib3NzNF9ub3JtYWxfYXR0YWNrX2hpdCwxKTtcclxuICAgICAgICBHYW1lRWZmZWN0c01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5hZGRFZmZlY3RQb29sQnlJZChHYW1lRWZmZWN0SWQuYm9zczRfbm9ybWFsX3NraWxsX3Blbmh1bywxKTsgICAgICAgIFxyXG4gICAgICAgIHRoaXMuYWRkRGVhdGhDYWxsYmFjayh0aGlzLm9uRGVhdGgpO1xyXG4gICAgICAgIHRoaXMuYWRkWHVhbll1bkxpc3Rlbih0aGlzLm9uWHVhbll1blJlc3VsdCk7XHJcbiAgICAgICAgdGhpcy5hZGRCb3NzSW5pdGVkTGlzdGVuKHRoaXMub25Cb3NzSW5pdGVkKTtcclxuICAgICAgICB0aGlzLmFkZENoYW5nZUJvc3NIcExpc3Rlbih0aGlzLm9uQ2hhbmdlSHApO1xyXG4gICAgICAgIHRoaXMuc2V0SGFuZHMoZmFsc2UpO1xyXG4gICAgfVxyXG5cclxuICAgIG9uQm9zc0luaXRlZCgpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLnN0YXJ0SWRsZSgpO1xyXG4gICAgICAgIHRoaXMubm9kZS55PTEyODtcclxuICAgICAgICB0aGlzLmF0dGFja19udW09MDtcclxuICAgICAgICBsZXQgZGlzdGFuY2U9dGhpcy5nZXRBdHRQb3MoKS55LVdhbGxNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0TWFpbldhbGwoKS5nZXRXYWxsTWF4WVkoKVxyXG4gICAgICAgIHRoaXMub25jZV9kaXN0YW5jZT1kaXN0YW5jZS81LjM7XHJcbiAgICAgICAgdGhpcy5rdWFuZ2Jhb192YWx1ZT1bdGhpcy5za2lsbF9kYXRhLmdldFNraWxsVmFsdWUxKDIpLHRoaXMuc2tpbGxfZGF0YS5nZXRTa2lsbFZhbHVlMigyKSwtdGhpcy5za2lsbF9kYXRhLmdldFNraWxsVmFsdWUzKDIpXVxyXG4gICAgfVxyXG5cclxuICAgIG9uQ2hhbmdlSHAobnVtOm51bWJlcil7XHJcbiAgICAgICAgaWYodGhpcy5jdXJfaHA8PXRoaXMubWF4X2hwLzIpe1xyXG4gICAgICAgICAgICBpZih0aGlzLmlzX2FjdGl2ZV9za2lsbF8yPT1mYWxzZSYmdGhpcy5za2lsbF9jb2xkX2Rvd25bMV08PTApe1xyXG4gICAgICAgICAgICAgICAgdGhpcy5pc19hY3RpdmVfc2tpbGxfMj10cnVlO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zdGFydFNraWxsKDIpO1xyXG4gICAgICAgICAgICB9ICAgICAgICAgICBcclxuICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgaWYodGhpcy5pc19hY3RpdmVfc2tpbGxfMj09dHJ1ZSl7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmlzX2FjdGl2ZV9za2lsbF8yPWZhbHNlO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zZXRLdWFuZ0JhbyhmYWxzZSk7XHJcbiAgICAgICAgICAgIH0gICAgICAgICAgICBcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgc2V0SGFuZHMoaXNTaG93OmJvb2xlYW4pe1xyXG4gICAgICAgIGZvcihsZXQgaT0wOyBpPHRoaXMuaGFuZHMubGVuZ3RoOyBpKyspe1xyXG4gICAgICAgICAgICB0aGlzLmhhbmRzW2ldLmFjdGl2ZT1pc1Nob3c7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHN0YXJ0SWRsZSgpeyAgICAgICAgXHJcbiAgICAgICAgc3VwZXIuc2V0RW5lbXlTdGF0ZShFbmVteV9TdGF0ZS5zdGFuZGJ5KTtcclxuICAgICAgICBzdXBlci5wbGF5U3BpbkFuaW1hdG9uKEFuaW1hdGlvbl9OYW1lLklkbGUsdHJ1ZSk7XHJcbiAgICAgICAgXHJcbiAgICB9XHJcblxyXG4gICAgc3RhcnRBdHRhY2soKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5hdHRfamlzaHU9MDtcclxuICAgICAgICBzdXBlci5zZXRFbmVteVN0YXRlKEVuZW15X1N0YXRlLmF0dCk7XHJcbiAgICAgICAgbGV0IGRhdGE9bmV3IEtleUZyYW1lRGF0YSgpO1xyXG4gICAgICAgIGRhdGEubmFtZT0nQXR0YWNrJztcclxuICAgICAgICBkYXRhLmNhbGxiYWNrPSgpPT57XHJcbiAgICAgICAgICAgIHRoaXMuYXR0YWNrX251bSsrO1xyXG4gICAgICAgICAgICB0aGlzLmF0dF9qaXNodT0wO1xyXG4gICAgICAgICAgICBHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNvdW5kX21hbmFnZXIucGxheVNvdW5kKFNvdW5kSW5kZXguWVhfQm9zczRBdHRhY2spO1xyXG4gICAgICAgICAgICBsZXQgd2FsbHM9V2FsbE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRBbGxXYWxsKCk7XHJcbiAgICAgICAgICAgIGxldCBhdHRXYWxsPW51bGw7XHJcbiAgICAgICAgICAgIHdhbGxzLmZvckVhY2goKHdhbGw6V2FsbCx3YWxsVHlwZTpXYWxsVHlwZSk9PntcclxuICAgICAgICAgICAgICAgIC8v5pS75Ye75Z+O5aKZ55qE5p2h5Lu2Me+8jOW/hemhu+WcqOWfjuWimeS5i+S4iiwy6L6+5Yiw5pS75Ye76Led56a7XHJcbiAgICAgICAgICAgICAgICBpZih0aGlzLm5vZGUueT49d2FsbC5nZXRXYWxsTWF4WVkoKSl7ICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgIGF0dFdhbGw9d2FsbDtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgaWYoYXR0V2FsbCl7XHJcbiAgICAgICAgICAgICAgICBsZXQgaW5qdXJlZERhdGE9YXR0V2FsbC5iZUluanVyZWQoc3VwZXIuZ2V0QXR0RGF0YShEYW1hZ2VUeXBlLk5vcm1hbCxmYWxzZSkpO1xyXG4gICAgICAgICAgICAgICAgaWYoaW5qdXJlZERhdGEuZ2V0RGFtYWdlTnVtKCk+MCl7ICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICBHYW1lRWZmZWN0c01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5jcmVhdGVHYW1lRWZmZWN0QnlJZChHYW1lRWZmZWN0SWQuYm9zczRfbm9ybWFsX2F0dGFja19oaXQsY2MudjIoTWF0aC5yYW5kb20oKSo2NDAtMzIwLGF0dFdhbGwuZ2V0V2FsbE1heFlZKCkpKTtcclxuICAgICAgICAgICAgICAgIH0gXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIGlmKHRoaXMuYXR0YWNrX251bT49dGhpcy5za2lsbF9kYXRhLmdldFNraWxsVmFsdWUzKDEpKXsvL1xyXG4gICAgICAgICAgICAgICAgLy/llrfngatcclxuICAgICAgICAgICAgICAgIHRoaXMuYXR0YWNrX251bT0wO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5za2lsbF9xdWV1ZS5wdXNoKDEpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIC8vbm9kZS5nZXRDb21wb25lbnQoQm9zc0F0dDMpLmluaXQoc3VwZXIuZ2V0QXR0RGF0YShEYW1hZ2VUeXBlLk5vcm1hbCx0cnVlLDApLEdhbWVFZmZlY3RJZC5ib3NzM19ub3JtYWxfYXR0YWNrLDEyMDAsTWF0aC5QSSozLzIsdGhpcy5ub2RlLnksMjcwKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgc3VwZXIucGxheVNwaW5BbmltYXRvbigoQW5pbWF0aW9uX05hbWUuYXR0YWNrKSxmYWxzZSxkYXRhLCgpPT57XHJcbiAgICAgICAgICAgIGlmKHRoaXMuc2tpbGxfcXVldWUubGVuZ3RoPjApe1xyXG4gICAgICAgICAgICAgICAgc3VwZXIuc2V0RW5lbXlTdGF0ZShFbmVteV9TdGF0ZS5zdGFuZGJ5KTtcclxuICAgICAgICAgICAgICAgIHRoaXMuc3RhcnRTa2lsbCh0aGlzLnNraWxsX3F1ZXVlLnNoaWZ0KCkpO1xyXG4gICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgIHRoaXMuc3RhcnRJZGxlKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KVxyXG4gICAgfVxyXG4gICAgc3RhcnRTa2lsbChza2lsbEluZGV4Om51bWJlcil7XHJcbiAgICAgICAgc3dpdGNoKHNraWxsSW5kZXgpe1xyXG4gICAgICAgICAgICBjYXNlIDE6e1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zdGFydFNraWxsMSgpO1xyXG4gICAgICAgICAgICB9YnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgMjp7XHJcbiAgICAgICAgICAgICAgICBpZih0aGlzLmlzX2FjdGl2ZV9za2lsbF8yKXtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnN0YXJ0U2tpbGwyKCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1icmVhaztcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBcclxuICAgIC8v54uC5pq0XHJcbiAgICBzdGFydFNraWxsMigpe1xyXG4gICAgICAgIGlmKHRoaXMuaXNfYWN0aXZlX3NraWxsXzI9PWZhbHNlKXtcclxuICAgICAgICAgICAgcmV0dXJuXHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuc2tpbGxfY29sZF9kb3duWzFdPXRoaXMuc2tpbGxfZGF0YS5nZXRTa2lsbENvbGREb3duKDIpOyAgICAgICAgXHJcbiAgICAgICAgaWYoc3VwZXIuZ2V0RW5lbXlTdGF0ZSgpIT1FbmVteV9TdGF0ZS5hdHQmJnN1cGVyLmdldEVuZW15U3RhdGUoKSE9RW5lbXlfU3RhdGUuc2tpbGwpe1xyXG4gICAgICAgICAgICBpZighc3VwZXIuaXNIYXZlRGVCdWZmKEJ1ZmZJZC5IZXJvX1h1YW5ZdW4pKXtcclxuICAgICAgICAgICAgICAgIC8v6Zy45L2T77yM6Ziy5q2i6KKr5omT5pat6ICM5peg5rOV6L+b5YWl54uC5pq054q25oCBXHJcbiAgICAgICAgICAgICAgICB0aGlzLmN1cl90b3VnaG5lc3MrPTE7XHJcbiAgICAgICAgICAgICAgICBzdXBlci5zZXRFbmVteVN0YXRlKEVuZW15X1N0YXRlLnNraWxsKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2tpbGxfY29sZF9kb3duWzFdPXRoaXMuc2tpbGxfZGF0YS5nZXRTa2lsbENvbGREb3duKDIpO1xyXG4gICAgICAgICAgICAgICAgbGV0IGRhdGE9bmV3IEtleUZyYW1lRGF0YSgpO1xyXG4gICAgICAgICAgICAgICAgZGF0YS5uYW1lPSdTa2lsbDInO1xyXG4gICAgICAgICAgICAgICAgZGF0YS5jYWxsYmFjaz0oKT0+e1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY3VyX3RvdWdobmVzcy09MTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmF0dF9qaXNodT0wO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0S3VhbmdCYW8odHJ1ZSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBzdXBlci5wbGF5U3BpbkFuaW1hdG9uKChBbmltYXRpb25fTmFtZS5za2lsbDIpLGZhbHNlLGRhdGEsKCk9PntcclxuICAgICAgICAgICAgICAgICAgICBpZih0aGlzLnNraWxsX3F1ZXVlLmxlbmd0aD4wKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgc3VwZXIuc2V0RW5lbXlTdGF0ZShFbmVteV9TdGF0ZS5zdGFuZGJ5KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zdGFydFNraWxsKHRoaXMuc2tpbGxfcXVldWUuc2hpZnQoKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc3RhcnRJZGxlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICBpZih0aGlzLnNraWxsX3F1ZXVlLmluZGV4T2YoMik8MCl7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5za2lsbF9xdWV1ZS5wdXNoKDIpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgIGlmKHRoaXMuc2tpbGxfcXVldWUuaW5kZXhPZigyKTwwKXtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2tpbGxfcXVldWUucHVzaCgyKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBzZXRLdWFuZ0Jhbyhpc0tCOmJvb2xlYW4pe1xyXG4gICAgICAgIGlmKHRoaXMuaXNfa3VhbmdfYmFvIT1pc0tCKXtcclxuICAgICAgICAgICAgdGhpcy5pc19rdWFuZ19iYW89aXNLQjtcclxuICAgICAgICAgICAgdGhpcy5zZXRIYW5kcyhpc0tCKVxyXG4gICAgICAgICAgICB0aGlzLmlzX2FjdGl2ZV9za2lsbF8yPWlzS0I7XHJcbiAgICAgICAgICAgIGlmKGlzS0IpeyAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIHRoaXMubW9uc3Rlcl9kYXRhLkF0dGFjays9dGhpcy5iYXNlX2F0dHJpYnV0ZV9kYXRhLkF0dGFjayp0aGlzLmt1YW5nYmFvX3ZhbHVlWzBdO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jaGFuZ2VBdHRhY2tTcGVlZCh0aGlzLmt1YW5nYmFvX3ZhbHVlWzFdKTtcclxuICAgICAgICAgICAgICAgIHRoaXMubW9uc3Rlcl9kYXRhLkRlZmVuc2UrPXRoaXMuYmFzZV9hdHRyaWJ1dGVfZGF0YS5EZWZlbnNlKnRoaXMua3VhbmdiYW9fdmFsdWVbMl07XHJcbiAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgdGhpcy5tb25zdGVyX2RhdGEuQXR0YWNrLT10aGlzLmJhc2VfYXR0cmlidXRlX2RhdGEuQXR0YWNrKnRoaXMua3VhbmdiYW9fdmFsdWVbMF07XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNoYW5nZUF0dGFja1NwZWVkKC10aGlzLmt1YW5nYmFvX3ZhbHVlWzFdKTtcclxuICAgICAgICAgICAgICAgIHRoaXMubW9uc3Rlcl9kYXRhLkRlZmVuc2UtPXRoaXMuYmFzZV9hdHRyaWJ1dGVfZGF0YS5EZWZlbnNlKnRoaXMua3VhbmdiYW9fdmFsdWVbMl07XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9ICAgICAgICBcclxuICAgIH1cclxuXHJcbiAgICAvL+WWt+eBq1xyXG4gICAgc3RhcnRTa2lsbDEoKXtcclxuICAgICAgICB0aGlzLnNraWxsX2NvbGRfZG93blswXT10aGlzLnNraWxsX2RhdGEuZ2V0U2tpbGxDb2xkRG93bigxKTtcclxuICAgICAgICBpZihzdXBlci5nZXRFbmVteVN0YXRlKCkhPUVuZW15X1N0YXRlLmF0dCl7XHJcbiAgICAgICAgICAgIGlmKCFzdXBlci5pc0hhdmVEZUJ1ZmYoQnVmZklkLkhlcm9fWHVhbll1bikpe1xyXG4gICAgICAgICAgICAgICAgR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zb3VuZF9tYW5hZ2VyLnBsYXlTb3VuZChTb3VuZEluZGV4LllYX0Jvc3M0U2tpbGwpO1xyXG4gICAgICAgICAgICAgICAgc3VwZXIuc2V0RW5lbXlTdGF0ZShFbmVteV9TdGF0ZS5za2lsbCk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNraWxsX2NvbGRfZG93blswXT10aGlzLnNraWxsX2RhdGEuZ2V0U2tpbGxDb2xkRG93bigxKTtcclxuICAgICAgICAgICAgICAgIHN1cGVyLnBsYXlTcGluQW5pbWF0b24oKEFuaW1hdGlvbl9OYW1lLnNraWxsMV8xKSxmYWxzZSxudWxsLCgpPT57XHJcbiAgICAgICAgICAgICAgICAgICAgc3VwZXIucGxheVNwaW5BbmltYXRvbigoQW5pbWF0aW9uX05hbWUuc2tpbGwxXzIpLHRydWUsbnVsbCxudWxsKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmlzX3lpbmRhbz10cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMueWluZGFvX3RpbWU9dGhpcy5za2lsbF9kYXRhLmdldFNraWxsVmFsdWUyKDEpO1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBwb3M9c3VwZXIuZ2V0QXR0UG9zKClcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmZpcmVfbm9kZT1HYW1lRWZmZWN0c01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5jcmVhdGVHYW1lRWZmZWN0QnlJZChHYW1lRWZmZWN0SWQuYm9zczRfbm9ybWFsX3NraWxsX3Blbmh1byxwb3MpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZmlyZV9ub2RlLnNjYWxlPTA7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5maXJlX25vZGUuYW5nbGU9MTgwO1xyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICBpZih0aGlzLnNraWxsX3F1ZXVlLmluZGV4T2YoMSk8MCl7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5za2lsbF9xdWV1ZS5wdXNoKDEpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgIGlmKHRoaXMuc2tpbGxfcXVldWUuaW5kZXhPZigxKTwwKXtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2tpbGxfcXVldWUucHVzaCgxKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBmaXJlRGFtYWdlKHdhbGw6V2FsbCl7XHJcbiAgICAgICAgaWYoR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5jdXJfZ2FtZV9zdGF0ZT09R2FtZVN0YXRlLkdhbWVfUGxheWluZyl7XHJcbiAgICAgICAgICAgIC8v5pKt5pS+5Yqo55S7XHJcbiAgICAgICAgICAgIC8vbGV0IHBvcz1jYy52MihzdXBlci5nZXRBdHRQb3MoKS54LHdhbGwuZ2V0V2FsbE1heFlZKCktMzIpOyAgXHJcbiAgICAgICAgICAgIGxldCBhdHREYXRhPXN1cGVyLmdldEF0dERhdGEoRGFtYWdlVHlwZS5Ta2lsbCxmYWxzZSx0aGlzLnNraWxsX2RhdGEuZ2V0U2tpbGxWYWx1ZTEoMSkpO1xyXG4gICAgICAgICAgICBhdHREYXRhLmlzX2JpZz1mYWxzZTtcclxuICAgICAgICAgICAgbGV0IGRhdGE9d2FsbC5iZUluanVyZWQoYXR0RGF0YSk7Ly9cclxuICAgICAgICAgICAgLy8gaWYoZGF0YS5nZXREYW1hZ2VOdW0oKT4wKXtcclxuICAgICAgICAgICAgLy8gICAgIE15VG9vbC5yYW5kb21TY2VuZVNoYWtlU21hbGwoKTtcclxuICAgICAgICAgICAgLy8gfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIC8qKumUgOavgeWWt+eBq+eJueaViCAqL1xyXG4gICAgZGVzdHJveUZpcmUoaXNJZGxlOmJvb2xlYW4pIHtcclxuICAgICAgICB0aGlzLmlzX3lpbmRhbz1mYWxzZTtcclxuICAgICAgICBpZih0aGlzLmZpcmVfbm9kZSl7XHJcbiAgICAgICAgICAgIGNjLnR3ZWVuKHRoaXMuZmlyZV9ub2RlKS50bygwLjIse3NjYWxlOjB9KS5jYWxsKCgpPT57XHJcbiAgICAgICAgICAgICAgICBHYW1lRWZmZWN0c01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5kZXN0cm95R2FtZUVmZmVjdEJ5SWQoR2FtZUVmZmVjdElkLmJvc3M0X25vcm1hbF9za2lsbF9wZW5odW8sdGhpcy5maXJlX25vZGUpO1xyXG4gICAgICAgICAgICB9KS5zdGFydCgpO1xyXG4gICAgICAgIH0gICAgICAgIFxyXG4gICAgICAgIGlmKGlzSWRsZSl7ICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIHN1cGVyLnBsYXlTcGluQW5pbWF0b24oKEFuaW1hdGlvbl9OYW1lLnNraWxsMV8zKSxmYWxzZSxudWxsLCgpPT57XHJcbiAgICAgICAgICAgICAgICBpZih0aGlzLnNraWxsX3F1ZXVlLmxlbmd0aD4wKXtcclxuICAgICAgICAgICAgICAgICAgICBzdXBlci5zZXRFbmVteVN0YXRlKEVuZW15X1N0YXRlLnN0YW5kYnkpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc3RhcnRTa2lsbCh0aGlzLnNraWxsX3F1ZXVlLnNoaWZ0KCkpO1xyXG4gICAgICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zdGFydElkbGUoKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIG9uRGVhdGgoKSB7XHJcbiAgICAgICAgdGhpcy51bnNjaGVkdWxlQWxsQ2FsbGJhY2tzKCk7XHJcbiAgICAgICAgc3VwZXIucGxheURlYWRBbmltYXRvbihBbmltYXRpb25fTmFtZS5kZWFkLCgpPT57XHJcbiAgICAgICAgICAgIHRoaXMucmVtb3ZlQWxsRGVCdWZmKCk7XHJcbiAgICAgICAgICAgIHRoaXMucmVtb3ZlQWxsQnVmZigpO1xyXG4gICAgICAgICAgICBpZih0aGlzLnNoYWRvdyl7XHJcbiAgICAgICAgICAgICAgICBjYy50d2Vlbih0aGlzLnNoYWRvdykudG8oMC43NSx7b3BhY2l0eTowfSkuc3RhcnQoKTtcclxuICAgICAgICAgICAgfSAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBjYy50d2Vlbih0aGlzLm5vZGUpLnRvKDAuNzUse29wYWNpdHk6MH0pLmNhbGwoKCk9PntcclxuICAgICAgICAgICAgICAgIHRoaXMucmVtb3ZlQWxsRGVCdWZmKCk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnJlbW92ZUFsbEJ1ZmYoKTtcclxuICAgICAgICAgICAgICAgIE1vbnN0ZXJNYW5hZ2VyLmdldEluc3RhbmNlKCkuZGVzdHJveU1vbnN0ZXIodGhpcy5ub2RlLHRoaXMubW9uc3Rlcl90eXBlKTtcclxuICAgICAgICAgICAgfSkuc3RhcnQoKTtcclxuICAgICAgICB9KVxyXG4gICAgICAgIC8vR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zb3VuZF9tYW5hZ2VyLnBsYXlTb3VuZChTb3VuZEluZGV4LnJld2FyZEJveDIpO1xyXG4gICAgICAgIHRoaXMuZGVzdHJveUZpcmUoZmFsc2UpO1xyXG4gICAgICAgIC8v5Yig6ZmkXHJcbiAgICAgICAgLy8gaWYodGhpcy5ib3NzX3NoaWVsZCl7XHJcbiAgICAgICAgLy8gICAgIHRoaXMuYm9zc19zaGllbGQuZGVzdG9yeVNoaWVsZCgpO1xyXG4gICAgICAgIC8vIH0gICAgICAgIFxyXG4gICAgfVxyXG5cclxuICAgIG9uWHVhbll1blJlc3VsdChpc1h1YW5ZdW46Ym9vbGVhbil7XHJcbiAgICAgICAgaWYoaXNYdWFuWXVuKXtcclxuICAgICAgICAgICAgdGhpcy5zdGFydFh1YW5ZdW4oKTtcclxuICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgaWYoIXN1cGVyLmlzSGF2ZURlQnVmZlR5cGUoQnVmZlR5cGUuVmVydGlnbykpe1xyXG4gICAgICAgICAgICAgICAgaWYoIXN1cGVyLmdldElzRGllKCkpe1xyXG4gICAgICAgICAgICAgICAgICAgIGlmKHRoaXMuc2tpbGxfcXVldWUubGVuZ3RoPjApe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzdXBlci5zZXRFbmVteVN0YXRlKEVuZW15X1N0YXRlLnN0YW5kYnkpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnN0YXJ0U2tpbGwodGhpcy5za2lsbF9xdWV1ZS5zaGlmdCgpKTtcclxuICAgICAgICAgICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zdGFydElkbGUoKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgc3RhcnRYdWFuWXVuKCl7XHJcbiAgICAgICAgdGhpcy5kZXN0cm95RmlyZShmYWxzZSk7XHJcbiAgICAgICAgc3VwZXIucGxheVNwaW5BbmltYXRvbihBbmltYXRpb25fTmFtZS5odXJ0MSxmYWxzZSxudWxsLCgpPT57XHJcbiAgICAgICAgICAgIGlmKHN1cGVyLmlzSGF2ZURlQnVmZlR5cGUoQnVmZlR5cGUuVmVydGlnbykmJiFzdXBlci5nZXRJc0RpZSgpKVxyXG4gICAgICAgICAgICAgICAgdGhpcy5zcGluZS5wYXVzZWQ9dHJ1ZTsgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIHVwZGF0ZShkdClcclxuICAgIHtcclxuICAgICAgICBpZigoR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5jdXJfZ2FtZV9zdGF0ZSE9R2FtZVN0YXRlLkdhbWVfUGxheWluZyl8fHRoaXMuZ2V0SXNEaWUoKSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgc3VwZXIudXBkYXRlKGR0KTtcclxuICAgICAgICB0aGlzLmNoZWNrU2tpbGwoZHQpO1xyXG4gICAgICAgIHRoaXMuY2hlY2tZaW5EYW8oZHQpO1xyXG4gICAgICAgIGlmKHRoaXMuZ2V0RW5lbXlTdGF0ZSgpIT1FbmVteV9TdGF0ZS5za2lsbCl7XHJcbiAgICAgICAgICAgIGlmKCF0aGlzLmlzSGF2ZURlQnVmZihCdWZmSWQuSGVyb19YdWFuWXVuKSl7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNoZWNrQXR0KGR0KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBjaGVja1lpbkRhbyhkdDpudW1iZXIpe1xyXG4gICAgICAgIGlmKHRoaXMuaXNfeWluZGFvKXsgICAgICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgaWYodGhpcy5maXJlX25vZGUpe1xyXG4gICAgICAgICAgICAgICAgbGV0IHdhbGxzPVdhbGxNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0QWxsV2FsbCgpO1xyXG4gICAgICAgICAgICAgICAgbGV0IGF0dFdhbGw9bnVsbDtcclxuICAgICAgICAgICAgICAgIHdhbGxzLmZvckVhY2goKHdhbGw6V2FsbCx3YWxsVHlwZTpXYWxsVHlwZSk9PntcclxuICAgICAgICAgICAgICAgICAgICAvL+aUu+WHu+WfjuWimeeahOadoeS7tjHvvIzlv4XpobvlnKjln47lopnkuYvkuIosMui+vuWIsOaUu+WHu+i3neemu1xyXG4gICAgICAgICAgICAgICAgICAgIGlmKHRoaXMubm9kZS55Pj13YWxsLmdldFdhbGxNYXhZWSgpKXsgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGF0dFdhbGw9d2FsbDtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgaWYoYXR0V2FsbCl7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IGRpc3RhbmNlPXN1cGVyLmdldEF0dFBvcygpLnktYXR0V2FsbC5nZXRXYWxsTWF4WVkoKTtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgbWF4U2NhbGU9ZGlzdGFuY2UvdGhpcy5vbmNlX2Rpc3RhbmNlKzE7XHJcbiAgICAgICAgICAgICAgICAgICAgLy/moLnmja7ot53nprvnrpflh7rnvKnmlL7lgLzvvIzmnIDlsI8x5YCN77yM5pyA5aSnNuWAjVxyXG4gICAgICAgICAgICAgICAgICAgIGlmKHRoaXMuZmlyZV9ub2RlLnNjYWxlPj1tYXhTY2FsZSl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZmlyZV9ub2RlLnNjYWxlPW1heFNjYWxlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnlpbmRhb19qaXNodSs9ZHQ7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmKHRoaXMueWluZGFvX2ppc2h1Pj0wLjIpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy55aW5kYW9famlzaHU9MDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZmlyZURhbWFnZShhdHRXYWxsKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmZpcmVfbm9kZS5zY2FsZSs9dGhpcy5zY2FsZV9zcGVlZCpkdDtcclxuICAgICAgICAgICAgICAgICAgICB9ICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMueWluZGFvX3RpbWUtPWR0O1xyXG4gICAgICAgICAgICBpZih0aGlzLnlpbmRhb190aW1lPD0wKXtcclxuICAgICAgICAgICAgICAgIHRoaXMueWluZGFvX3RpbWU9MDtcclxuICAgICAgICAgICAgICAgIHRoaXMuZGVzdHJveUZpcmUodHJ1ZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoq5oqA6IO95qOA5rWLICovXHJcbiAgICBjaGVja1NraWxsKGR0Om51bWJlcil7XHJcbiAgICAgICAgZm9yKGxldCBpPTA7IGk8MjsgaSsrKXsgICAgICAgICAgICBcclxuICAgICAgICAgICAgaWYodGhpcy5za2lsbF9jb2xkX2Rvd25baV0+MCl7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNraWxsX2NvbGRfZG93bltpXS09ZHQ7XHJcbiAgICAgICAgICAgICAgICAvLyBpZihpPT0xKXtcclxuICAgICAgICAgICAgICAgIC8vICAgICAvL+a/gOa0u+exu+aKgOiDveS4jeWcqOatpOmHiuaUvu+8jOWPquiuoeeul+WGt+WNtFxyXG4gICAgICAgICAgICAgICAgLy8gICAgIGNvbnRpbnVlO1xyXG4gICAgICAgICAgICAgICAgLy8gfVxyXG4gICAgICAgICAgICAgICAgLy8gaWYodGhpcy5za2lsbF9jb2xkX2Rvd25baV08MCl7XHJcbiAgICAgICAgICAgICAgICAvLyAgICAgdGhpcy5za2lsbF9jb2xkX2Rvd25baV09MDtcclxuICAgICAgICAgICAgICAgIC8vICAgICB0aGlzLnN0YXJ0U2tpbGwoaSsxKTtcclxuICAgICAgICAgICAgICAgIC8vIH0gICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIH0gICAgICAgICAgICBcclxuICAgICAgICB9ICAgICAgICAgICAgICAgIFxyXG4gICAgfVxyXG5cclxuICAgIC8qKuaUu+WHu+iuoeeulyAqL1xyXG4gICAgY2hlY2tBdHQoZHQ6bnVtYmVyKXsgICAgICAgIFxyXG4gICAgICAgIHRoaXMuYXR0X2ppc2h1Kz1kdDtcclxuICAgICAgICBpZih0aGlzLmF0dF9qaXNodT49dGhpcy5hdHRfamlhbmdlKXtcclxuICAgICAgICAgICAgdGhpcy5hdHRfamlzaHU9dGhpcy5hdHRfamlhbmdlO1xyXG4gICAgICAgICAgICB0aGlzLnN0YXJ0QXR0YWNrKCk7XHJcbiAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgIC8vdGhpcy5tb3ZpbmcoZHQpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIFxyXG59XHJcbiJdfQ==