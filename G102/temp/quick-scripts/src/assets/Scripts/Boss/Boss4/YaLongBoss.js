"use strict";
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