"use strict";
cc._RF.push(module, '56273Y9tzRIeLG2bw9l2Y6x', 'XueRenBoss');
// Scripts/Boss/Boss3/XueRenBoss.ts

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
var MonsterData_1 = require("../../Monster/MonsterData");
var MonsterManager_1 = require("../../Monster/MonsterManager");
var AudioConstants_1 = require("../../Sound/AudioConstants");
var MyTool_1 = require("../../Tools/MyTool");
var WallManager_1 = require("../../Wall/WallManager");
var Boss_1 = require("../Boss");
var BossAtt3_1 = require("./BossAtt3");
var XueYin_1 = require("./XueYin");
var Animation_Name;
(function (Animation_Name) {
    Animation_Name["Idle"] = "Idle";
    Animation_Name["attack1"] = "Attack1";
    Animation_Name["run"] = "Run";
    Animation_Name["hurt1"] = "Hurt";
    Animation_Name["skill1"] = "Skill1";
    Animation_Name["skill2_1"] = "Skill2_1";
    Animation_Name["skill2_2"] = "Skill2_2";
    Animation_Name["skill2_3"] = "Skill2_3";
    Animation_Name["dead"] = "Dead";
})(Animation_Name || (Animation_Name = {}));
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var XueRenBoss = /** @class */ (function (_super) {
    __extends(XueRenBoss, _super);
    function XueRenBoss() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.xue_yin = null;
        _this.is_active_skill_2 = false;
        return _this;
    }
    XueRenBoss.prototype.onLoad = function () {
        _super.prototype.onLoad.call(this);
        GameEffectsManager_1.GameEffectsManager.getInstance().addEffectPoolById(GameEffectsManager_1.GameEffectId.xuanyun, 2);
        GameEffectsManager_1.GameEffectsManager.getInstance().addEffectPoolById(GameEffectsManager_1.GameEffectId.boss3_normal_attack, 1);
        GameEffectsManager_1.GameEffectsManager.getInstance().addEffectPoolById(GameEffectsManager_1.GameEffectId.boss3_normal_attack_hit, 1);
        GameEffectsManager_1.GameEffectsManager.getInstance().addEffectPoolById(GameEffectsManager_1.GameEffectId.boss3_skill_1, 1);
        GameEffectsManager_1.GameEffectsManager.getInstance().addEffectPoolById(GameEffectsManager_1.GameEffectId.boss3_skill_1_hit, 1);
        GameEffectsManager_1.GameEffectsManager.getInstance().addEffectPoolById(GameEffectsManager_1.GameEffectId.boss3_skill_2, 1);
        GameEffectsManager_1.GameEffectsManager.getInstance().addEffectPoolById(GameEffectsManager_1.GameEffectId.boss3_skill_2_hit, 1);
        GameEffectsManager_1.GameEffectsManager.getInstance().addEffectPoolById(GameEffectsManager_1.GameEffectId.boss3_skill_2_xueyin, 1);
        this.addDeathCallback(this.onDeath);
        this.addXuanYunListen(this.onXuanYunResult);
        this.addBossInitedListen(this.onBossInited);
        this.addChangeBossHpListen(this.onChangeHp);
    };
    XueRenBoss.prototype.onBossInited = function () {
        this.startIdle();
        this.node.y = 128;
    };
    XueRenBoss.prototype.onChangeHp = function (num) {
        if (this.cur_hp <= this.max_hp / 2) {
            if (this.is_active_skill_2 == false) {
                this.is_active_skill_2 = true;
                this.startSkill(2);
            }
        }
    };
    XueRenBoss.prototype.startIdle = function () {
        _super.prototype.setEnemyState.call(this, EnemyConfig_1.Enemy_State.standby);
        _super.prototype.playSpinAnimaton.call(this, Animation_Name.Idle, true);
    };
    XueRenBoss.prototype.startAttack = function () {
        var _this = this;
        this.att_jishu = 0;
        _super.prototype.setEnemyState.call(this, EnemyConfig_1.Enemy_State.att);
        var data = new MonsterData_1.KeyFrameData();
        data.name = 'Attack';
        data.callback = function () {
            _this.att_jishu = 0;
            GameManager_1.default.getInstance().sound_manager.playSound(AudioConstants_1.SoundIndex.YX_Boss3Attack);
            var node = GameEffectsManager_1.GameEffectsManager.getInstance().createGameEffectById(GameEffectsManager_1.GameEffectId.boss3_normal_attack, _super.prototype.getAttPos.call(_this));
            var startEndPos = cc.v2(GameManager_1.default.getInstance().charPosX, GameManager_1.default.getInstance().enemy_att_y);
            var offsetPos = startEndPos.sub(node.getPosition());
            var dir = Math.atan2(offsetPos.y, offsetPos.x);
            node.getComponent(BossAtt3_1.default).init(_super.prototype.getAttData.call(_this, HeroConfig_1.DamageType.Normal, true, 0), GameEffectsManager_1.GameEffectId.boss3_normal_attack, 1200, dir, _this.node.y, 270);
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
    XueRenBoss.prototype.startSkill = function (skillIndex) {
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
    //蓄力砸雪球
    XueRenBoss.prototype.startSkill1 = function () {
        var _this = this;
        this.skill_cold_down[0] = this.skill_data.getSkillColdDown(1);
        if (_super.prototype.getEnemyState.call(this) != EnemyConfig_1.Enemy_State.att && _super.prototype.getEnemyState.call(this) != EnemyConfig_1.Enemy_State.skill) {
            if (!_super.prototype.isHaveDeBuff.call(this, HeroConfig_1.BuffId.Hero_XuanYun)) {
                _super.prototype.setEnemyState.call(this, EnemyConfig_1.Enemy_State.skill);
                this.skill_cold_down[0] = this.skill_data.getSkillColdDown(1);
                var data = new MonsterData_1.KeyFrameData();
                data.name = 'Skill';
                data.callback = function () {
                    _this.att_jishu = 0;
                    var node = GameEffectsManager_1.GameEffectsManager.getInstance().createGameEffectById(GameEffectsManager_1.GameEffectId.boss3_skill_1, _super.prototype.getAttPos.call(_this));
                    var tss = node.getComponent(BossAtt3_1.default);
                    tss.init(_super.prototype.getAttData.call(_this, HeroConfig_1.DamageType.Skill, true, _this.skill_data.getSkillValue1(1)), GameEffectsManager_1.GameEffectId.boss3_skill_1, 1200, Math.PI * 3 / 2, _this.node.y, 270);
                    tss.setBuffData(_this.skill_data.getSkillValue3(1), _this.skill_data.getSkillValue2(1));
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
    //防御
    XueRenBoss.prototype.startSkill2 = function () {
        var _this = this;
        this.skill_cold_down[1] = this.skill_data.getSkillColdDown(2);
        if (_super.prototype.getEnemyState.call(this) != EnemyConfig_1.Enemy_State.att && _super.prototype.getEnemyState.call(this) != EnemyConfig_1.Enemy_State.skill) {
            if (!_super.prototype.isHaveDeBuff.call(this, HeroConfig_1.BuffId.Hero_XuanYun)) {
                GameManager_1.default.getInstance().sound_manager.playSound(AudioConstants_1.SoundIndex.YX_Boss3Skill1xuli);
                _super.prototype.setEnemyState.call(this, EnemyConfig_1.Enemy_State.skill);
                this.skill_cold_down[1] = this.skill_data.getSkillColdDown(2);
                this.cur_toughness += 1;
                _super.prototype.playSpinAnimaton.call(this, (Animation_Name.skill2_1), false, null, function () {
                    _super.prototype.playSpinAnimaton.call(_this, (Animation_Name.skill2_2), true, null, null);
                    //循环5秒                    
                    //添加buff
                    var buffData = new BuffData_1.BuffData();
                    buffData.buff_id = HeroConfig_1.BuffId.Boss3_MianYi_KongZhi;
                    buffData.remain_time = 5;
                    var buff = _super.prototype.addBuff.call(_this, buffData);
                    buff.addDestroyListen(_this.onSkillBuffDestory.bind(_this));
                    //添加雪印
                    buff.addFloorListen(_this.onAddFloor.bind(_this));
                    var hpRoot = cc.find('Canvas/Ui_Root/top_ui/BossHpRoot');
                    _this.xue_yin = GameEffectsManager_1.GameEffectsManager.getInstance().createGameEffectForParent(GameEffectsManager_1.GameEffectId.boss3_skill_2_xueyin, cc.v2(0, 0), hpRoot).getComponent(XueYin_1.default);
                    _this.xue_yin.setFloor(0);
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
    /**
     *
     * @param floor 当前的层数
     */
    XueRenBoss.prototype.onAddFloor = function (floor) {
        var num = floor - 1;
        if (this.xue_yin) {
            this.xue_yin.setFloor(num);
        }
    };
    /**Buff销毁时回调，num：buff叠加的层数 */
    XueRenBoss.prototype.onSkillBuffDestory = function (buffData) {
        var _this = this;
        this.skill_cold_down[1] = this.skill_data.getSkillColdDown(2);
        var num = buffData.cur_floor - 1;
        if (num > 0) {
            //反击
            _super.prototype.setEnemyState.call(this, EnemyConfig_1.Enemy_State.skill);
            var data = new MonsterData_1.KeyFrameData();
            data.name = 'Skill2';
            data.callback = function () {
                _this.att_jishu = 0;
                _this.startSkill2Lanuch(num);
            };
            _super.prototype.playSpinAnimaton.call(this, (Animation_Name.skill2_3), false, data, function () {
                _this.cur_toughness -= 1;
                GameEffectsManager_1.GameEffectsManager.getInstance().destroyGameEffectById(GameEffectsManager_1.GameEffectId.boss3_skill_2_xueyin, _this.xue_yin.node);
                _this.xue_yin = null;
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
            this.cur_toughness -= 1;
            GameEffectsManager_1.GameEffectsManager.getInstance().destroyGameEffectById(GameEffectsManager_1.GameEffectId.boss3_skill_2_xueyin, this.xue_yin.node);
            this.xue_yin = null;
            if (this.skill_queue.length > 0) {
                _super.prototype.setEnemyState.call(this, EnemyConfig_1.Enemy_State.standby);
                this.startSkill(this.skill_queue.shift());
            }
            else {
                this.startIdle();
            }
        }
    };
    XueRenBoss.prototype.startSkill2Lanuch = function (num) {
        var _this = this;
        MyTool_1.default.randomSceneShakeBig();
        //创建发射的冰柱
        var hitNum = 0;
        var _loop_1 = function (i) {
            var createBingZhu = function () {
                //求点
                var posX = i * 144 - 288;
                var posY = GameManager_1.default.getInstance().enemy_att_y - Math.random() * 200 - 100;
                var startPos = cc.v2(posX, 1680 + posY);
                var endPos = cc.v2(posX, posY);
                //let offsetPos=endPos.sub(startPos);
                //let angle=MyTool.radianToAngle(Math.atan2(offsetPos.y,offsetPos.x))+90;
                var bingzhu = GameEffectsManager_1.GameEffectsManager.getInstance().createGameEffectById(GameEffectsManager_1.GameEffectId.boss3_skill_2, startPos);
                cc.tween(bingzhu).to(Math.random() * 0.2 + 0.2, { x: endPos.x, y: endPos.y }).call(function (node) {
                    GameEffectsManager_1.GameEffectsManager.getInstance().destroyGameEffectById(GameEffectsManager_1.GameEffectId.boss3_skill_2, node);
                    GameEffectsManager_1.GameEffectsManager.getInstance().createGameEffectById(GameEffectsManager_1.GameEffectId.boss3_skill_2_hit, node.getPosition());
                    hitNum++;
                    if (hitNum == 3) {
                        //眩晕+伤害
                        GameManager_1.default.getInstance().all_hero.forEach(function (v, k) {
                            var buffData = new BuffData_1.BuffData();
                            buffData.buff_id = HeroConfig_1.BuffId.Monster_XuanYun;
                            buffData.game_effect_id = GameEffectsManager_1.GameEffectId.xuanyun;
                            buffData.remain_time = 2 + num * _this.skill_data.getSkillValue3(1);
                            buffData.buff_type = HeroConfig_1.BuffType.Vertigo;
                            v.addDeBuff(buffData);
                        });
                        var attData = _this.getAttData(HeroConfig_1.DamageType.Skill, false, _this.skill_data.getSkillValue1(1));
                        attData.zengshang_rate = _this.skill_data.getSkillValue2(1) * num;
                        WallManager_1.default.getInstance().getMainWall().beInjured(attData);
                    }
                }).start();
            };
            this_1.scheduleOnce(createBingZhu, Math.random() * 0.2 + 0.1);
        };
        var this_1 = this;
        for (var i = 0; i < 5; i++) {
            _loop_1(i);
        }
    };
    XueRenBoss.prototype.onDeath = function () {
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
        if (this.xue_yin) {
            GameEffectsManager_1.GameEffectsManager.getInstance().destroyGameEffectById(GameEffectsManager_1.GameEffectId.boss3_skill_2_xueyin, this.xue_yin.node);
        }
        //删除
        // if(this.boss_shield){
        //     this.boss_shield.destoryShield();
        // }        
    };
    XueRenBoss.prototype.onXuanYunResult = function (isXuanYun) {
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
    XueRenBoss.prototype.startXuanYun = function () {
        var _this = this;
        _super.prototype.playSpinAnimaton.call(this, Animation_Name.hurt1, false, null, function () {
            if (_super.prototype.isHaveDeBuffType.call(_this, HeroConfig_1.BuffType.Vertigo) && !_super.prototype.getIsDie.call(_this))
                _this.spine.paused = true;
        });
    };
    XueRenBoss.prototype.update = function (dt) {
        if ((GameManager_1.default.getInstance().cur_game_state != Constants_1.GameState.Game_Playing) || this.getIsDie()) {
            return;
        }
        _super.prototype.update.call(this, dt);
        this.checkSkill(dt);
        if (this.getEnemyState() != EnemyConfig_1.Enemy_State.skill && this.getEnemyState() != EnemyConfig_1.Enemy_State.att) {
            if (!this.isHaveDeBuff(HeroConfig_1.BuffId.Hero_XuanYun)) {
                this.checkAtt(dt);
            }
        }
    };
    /**技能检测 */
    XueRenBoss.prototype.checkSkill = function (dt) {
        for (var i = 0; i < this.skill_cold_down.length; i++) {
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
            // else{
            //     this.startSkill(i+1);
            // }
        }
    };
    /**攻击计算 */
    XueRenBoss.prototype.checkAtt = function (dt) {
        this.att_jishu += dt;
        if (this.att_jishu >= this.att_jiange) {
            this.att_jishu = this.att_jiange;
            this.startAttack();
        }
        else {
            //this.moving(dt);
        }
    };
    XueRenBoss = __decorate([
        ccclass
    ], XueRenBoss);
    return XueRenBoss;
}(Boss_1.default));
exports.default = XueRenBoss;

cc._RF.pop();