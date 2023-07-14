
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Scripts/Boss/Boss8/Boss8.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '3835awXS39Baoe6Dg21v00/', 'Boss8');
// Scripts/Boss/Boss8/Boss8.ts

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
var MonsterBullet_1 = require("../../Monster/MonsterBullet");
var MonsterData_1 = require("../../Monster/MonsterData");
var MonsterManager_1 = require("../../Monster/MonsterManager");
var AudioConstants_1 = require("../../Sound/AudioConstants");
var Boss_1 = require("../Boss");
var BossSkill8_1 = require("./BossSkill8");
var Animation_Name;
(function (Animation_Name) {
    Animation_Name["Idle"] = "Idle";
    Animation_Name["attack"] = "Attack1";
    Animation_Name["run"] = "Run";
    Animation_Name["hurt1"] = "Hurt";
    Animation_Name["skill1_1"] = "Skill1_1";
    Animation_Name["skill1_2"] = "Skill1_2";
    Animation_Name["skill1_3"] = "Skill1_3";
    Animation_Name["skill1_4"] = "Skill1_4";
    Animation_Name["skill1_5"] = "Skill1_5";
    Animation_Name["skill1_6"] = "Skill1_6";
    Animation_Name["skill2"] = "Skill2";
    Animation_Name["skill3"] = "Skill3";
    Animation_Name["dead"] = "Dead";
})(Animation_Name || (Animation_Name = {}));
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var Boss8 = /** @class */ (function (_super) {
    __extends(Boss8, _super);
    function Boss8() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.att_num = 0;
        _this.is_active_skill_3 = false;
        _this.kuangbao_value = [];
        _this.is_kuang_bao = false;
        /**当前的召唤索引 */
        _this.cur_zhaohuan_index = 0;
        _this.skill_pos = cc.v2();
        /**钻地动作，尾部相对头部的坐标 */
        _this.wei_zuandi_pos = cc.v2(0, 0);
        /**出地动作，尾部相对头部的坐标 */
        _this.wei_chudi_pos = cc.v2(0, 0);
        _this.wei_node = null;
        return _this;
    }
    Boss8.prototype.onLoad = function () {
        _super.prototype.onLoad.call(this);
        GameEffectsManager_1.GameEffectsManager.getInstance().addEffectPoolById(GameEffectsManager_1.GameEffectId.boss8_attack_bullect, 1);
        GameEffectsManager_1.GameEffectsManager.getInstance().addEffectPoolById(GameEffectsManager_1.GameEffectId.boss8_attack_bullect_hit, 1);
        GameEffectsManager_1.GameEffectsManager.getInstance().addEffectPoolById(GameEffectsManager_1.GameEffectId.boss8_skill_bullect, 4);
        GameEffectsManager_1.GameEffectsManager.getInstance().addEffectPoolById(GameEffectsManager_1.GameEffectId.boss8_skill_bullect_hit, 4);
        GameEffectsManager_1.GameEffectsManager.getInstance().addEffectPoolById(GameEffectsManager_1.GameEffectId.xuanyun, 2);
        this.addDeathCallback(this.onDeath);
        this.addXuanYunListen(this.onXuanYunResult);
        this.addBossInitedListen(this.onBossInited);
        this.addChangeBossHpListen(this.onChangeHp);
    };
    Boss8.prototype.onBossInited = function () {
        this.startIdle();
        this.node.y = 128;
        this.kuangbao_value[0] = this.skill_data.getSkillValue1(3);
        this.skill_pos = this.node.getChildByName('skill').getPosition();
        this.wei_node = new cc.Node("wei");
        var weiSp = this.wei_node.addComponent(sp.Skeleton);
        weiSp.skeletonData = (this.spine.skeletonData);
        GroundManager_1.default.getInstance().node.addChild(this.wei_node);
        this.wei_node.setPosition(this.node.getPosition());
        this.wei_node.active = false;
        this.shadow.active = false;
    };
    Boss8.prototype.onChangeHp = function (num) {
        if (this.cur_hp <= this.max_hp * 0.3) {
            if (this.is_active_skill_3 == false && this.skill_cold_down[2] <= 0) {
                this.is_active_skill_3 = true;
                this.startSkill(3);
            }
        }
        else {
            if (this.is_active_skill_3 == true) {
                this.is_active_skill_3 = false;
                this.setKuangBao(false);
            }
        }
    };
    Boss8.prototype.startIdle = function () {
        _super.prototype.setEnemyState.call(this, EnemyConfig_1.Enemy_State.standby);
        _super.prototype.playSpinAnimaton.call(this, Animation_Name.Idle, true);
    };
    Boss8.prototype.startAttack = function () {
        var _this = this;
        this.att_jishu = 0;
        _super.prototype.setEnemyState.call(this, EnemyConfig_1.Enemy_State.att);
        var data = new MonsterData_1.KeyFrameData();
        data.name = 'Attack';
        data.callback = function () {
            _this.att_jishu = 0;
            GameManager_1.default.getInstance().sound_manager.playSound(AudioConstants_1.SoundIndex.YX_BOSS8Attack);
            var bullect = GameEffectsManager_1.GameEffectsManager.getInstance().createGameEffectById(GameEffectsManager_1.GameEffectId.boss8_attack_bullect, _this.getAttPos());
            bullect.getComponent(MonsterBullet_1.default).init(_this.getAttData(HeroConfig_1.DamageType.Normal, true), GameEffectsManager_1.GameEffectId.boss8_attack_bullect, GameEffectsManager_1.GameEffectId.boss8_attack_bullect_hit, 1600, Math.PI * 3 / 2);
            _this.att_num++;
            if (_this.att_num >= 5) {
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
    Boss8.prototype.startSkill = function (skillIndex) {
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
    //钻地
    Boss8.prototype.startSkill1 = function () {
        var _this = this;
        var skillNo = 1;
        var skillIndex = skillNo - 1;
        this.skill_cold_down[skillIndex] = this.skill_data.getSkillColdDown(skillNo);
        if (_super.prototype.getEnemyState.call(this) != EnemyConfig_1.Enemy_State.att && _super.prototype.getEnemyState.call(this) != EnemyConfig_1.Enemy_State.skill) {
            if (!_super.prototype.isHaveDeBuff.call(this, HeroConfig_1.BuffId.Hero_XuanYun)) {
                _super.prototype.setEnemyState.call(this, EnemyConfig_1.Enemy_State.skill);
                this.skill_cold_down[skillIndex] = this.skill_data.getSkillColdDown(skillNo);
                _super.prototype.playSpinAnimaton.call(this, (Animation_Name.skill1_1), false, null, function () {
                    _super.prototype.playSpinAnimaton.call(_this, (Animation_Name.skill1_2), true, null, null);
                    _this.unschedule(_this.startZuanDi);
                    _this.scheduleOnce(_this.startZuanDi, 2);
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
    Boss8.prototype.startZuanDi = function () {
        var _this = this;
        if (!_super.prototype.isHaveDeBuff.call(this, HeroConfig_1.BuffId.Hero_XuanYun) && this.getIsDie() == false) {
            //钻地的过程是免控的
            this.cur_toughness += 1;
            //显示尾部，同时播放钻地动作
            this.wei_node.active = true;
            var weiSp = this.wei_node.getComponent(sp.Skeleton);
            var weiAnima_1 = weiSp.setAnimation(0, Animation_Name.skill1_4, false);
            weiSp.setTrackCompleteListener(weiAnima_1, function (entry, event) {
                weiAnima_1.listener = null;
                _this.wei_node.active = false;
            });
            // let data=new KeyFrameData();
            //     data.name='Skill';
            //     data.callback=()=>{
            //     }
            _super.prototype.playSpinAnimaton.call(this, (Animation_Name.skill1_3), false, null, function () {
                //开始回血
                //super.setEnemyState(Enemy_State.born);
                _this.node.getComponent(cc.Collider).enabled = false;
                var buffData = new BuffData_1.BuffData();
                buffData.remain_time = _this.skill_data.getSkillValue2(1);
                buffData.buff_value = [_this.skill_data.getSkillValue1(1) * _this.getMaxHp()];
                buffData.buff_id = HeroConfig_1.BuffId.Boss8_Skill_1_jiaxue;
                buffData.recovery_jiange_time = 1;
                var timer = _this.addBuff(buffData);
                timer.addDestroyListen(_this.onSkill1End.bind(_this));
            });
        }
    };
    Boss8.prototype.onSkill1End = function (buffData) {
        var _this = this;
        //钻出地面
        //钻地的过程是免控的       
        //显示尾部，同时播放钻地动作
        this.wei_node.active = true;
        var weiSp = this.wei_node.getComponent(sp.Skeleton);
        var weiAnima = weiSp.setAnimation(0, Animation_Name.skill1_6, false);
        weiSp.setTrackCompleteListener(weiAnima, function (entry, event) {
            weiAnima.listener = null;
            _this.wei_node.active = false;
        });
        _super.prototype.playSpinAnimaton.call(this, (Animation_Name.skill1_5), false, null, function () {
            _this.node.getComponent(cc.Collider).enabled = true;
            _this.cur_toughness -= 1;
            if (_this.skill_queue.length > 0) {
                _super.prototype.setEnemyState.call(_this, EnemyConfig_1.Enemy_State.standby);
                _this.startSkill(_this.skill_queue.shift());
            }
            else {
                _this.startIdle();
            }
        });
    };
    Boss8.prototype.getSkillPos = function () {
        var disPos = this.node.getPosition().add(cc.v2(this.skill_pos.x * this.node.scaleX, this.skill_pos.y * this.node.scaleY));
        return disPos;
    };
    //甩鼻涕
    Boss8.prototype.startSkill2 = function () {
        var _this = this;
        this.getAttPos();
        var skillNo = 2;
        var skillIndex = skillNo - 1;
        this.skill_cold_down[skillIndex] = this.skill_data.getSkillColdDown(skillNo);
        if (_super.prototype.getEnemyState.call(this) != EnemyConfig_1.Enemy_State.att) {
            if (!_super.prototype.isHaveDeBuff.call(this, HeroConfig_1.BuffId.Hero_XuanYun)) {
                GameManager_1.default.getInstance().sound_manager.playSound(AudioConstants_1.SoundIndex.YX_Boss8Attack2);
                _super.prototype.setEnemyState.call(this, EnemyConfig_1.Enemy_State.skill);
                this.skill_cold_down[skillIndex] = this.skill_data.getSkillColdDown(skillNo);
                var data = new MonsterData_1.KeyFrameData();
                data.name = 'Skill2';
                data.callback = function () {
                    _this.att_jishu = 0;
                    var node = GameEffectsManager_1.GameEffectsManager.getInstance().createGameEffectById(GameEffectsManager_1.GameEffectId.boss8_skill_bullect, _this.getSkillPos());
                    node.getComponent(BossSkill8_1.default).init(_this.getAttData(HeroConfig_1.DamageType.Skill, true, _this.skill_data.getSkillValue1(2)), GameEffectsManager_1.GameEffectId.boss8_skill_bullect, GameEffectsManager_1.GameEffectId.boss8_skill_bullect_hit, 1500, Math.PI * 3 / 2);
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
    /**狂暴 */
    Boss8.prototype.startSkill3 = function () {
        var _this = this;
        if (this.is_active_skill_3 == false) {
            return;
        }
        var skillNo = 3;
        var skillIndex = skillNo - 1;
        this.skill_cold_down[skillIndex] = this.skill_data.getSkillColdDown(skillNo);
        if (_super.prototype.getEnemyState.call(this) != EnemyConfig_1.Enemy_State.att && _super.prototype.getEnemyState.call(this) != EnemyConfig_1.Enemy_State.skill) {
            if (!_super.prototype.isHaveDeBuff.call(this, HeroConfig_1.BuffId.Hero_XuanYun)) {
                GameManager_1.default.getInstance().sound_manager.playSound(AudioConstants_1.SoundIndex.YX_Boss5Beidong);
                this.cur_toughness += 1;
                _super.prototype.setEnemyState.call(this, EnemyConfig_1.Enemy_State.skill);
                this.skill_cold_down[skillIndex] = this.skill_data.getSkillColdDown(skillNo);
                var data = new MonsterData_1.KeyFrameData();
                data.name = 'Skill3';
                data.callback = function () {
                    _this.att_jishu = 0;
                    _this.cur_toughness -= 1;
                    _this.att_jishu = 0;
                    _this.setKuangBao(true);
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
    Boss8.prototype.setKuangBao = function (isKB) {
        //this.setHands(isKB)
        if (this.is_kuang_bao != isKB) {
            this.is_kuang_bao = isKB;
            this.is_active_skill_3 = isKB;
            if (isKB) {
                this.changeAttackSpeed(this.kuangbao_value[0]);
            }
            else {
                this.changeAttackSpeed(-this.kuangbao_value[0]);
            }
        }
    };
    Boss8.prototype.onDeath = function () {
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
    Boss8.prototype.onXuanYunResult = function (isXuanYun) {
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
    Boss8.prototype.startXuanYun = function () {
        var _this = this;
        this.unschedule(this.startZuanDi);
        _super.prototype.playSpinAnimaton.call(this, Animation_Name.hurt1, false, null, function () {
            if (_super.prototype.isHaveDeBuffType.call(_this, HeroConfig_1.BuffType.Vertigo) && !_super.prototype.getIsDie.call(_this))
                _this.spine.paused = true;
        });
    };
    Boss8.prototype.update = function (dt) {
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
    Boss8.prototype.checkSkill = function (dt) {
        for (var i = 0; i < 3; i++) {
            if (this.skill_cold_down[i] > 0) {
                this.skill_cold_down[i] -= dt;
                if (i == 2) {
                    //第3个技能,激活类技能不在此释放
                    continue;
                }
                if (this.skill_cold_down[i] < 0) {
                    this.skill_cold_down[i] = 0;
                    this.startSkill(i + 1);
                }
            }
        }
    };
    /**攻击计算 */
    Boss8.prototype.checkAtt = function (dt) {
        this.att_jishu += dt;
        if (this.att_jishu >= this.att_jiange) {
            this.att_jishu = this.att_jiange;
            this.startAttack();
        }
    };
    __decorate([
        property(cc.Node)
    ], Boss8.prototype, "wei_node", void 0);
    Boss8 = __decorate([
        ccclass
    ], Boss8);
    return Boss8;
}(Boss_1.default));
exports.default = Boss8;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0c1xcQm9zc1xcQm9zczhcXEJvc3M4LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLDZDQUE0QztBQUM1Qyx1REFBc0Q7QUFDdEQsb0VBQWlGO0FBQ2pGLDBEQUFxRDtBQUNyRCxpREFBNEM7QUFDNUMscURBQW9EO0FBQ3BELHlEQUEwRTtBQUMxRSw2REFBd0Q7QUFDeEQseURBQXlEO0FBQ3pELCtEQUEwRDtBQUMxRCw2REFBd0Q7QUFDeEQsZ0NBQTJCO0FBQzNCLDJDQUFzQztBQUV0QyxJQUFLLGNBZUo7QUFmRCxXQUFLLGNBQWM7SUFFZiwrQkFBYSxDQUFBO0lBQ2Isb0NBQWtCLENBQUE7SUFDbEIsNkJBQVcsQ0FBQTtJQUNYLGdDQUFjLENBQUE7SUFDZCx1Q0FBcUIsQ0FBQTtJQUNyQix1Q0FBcUIsQ0FBQTtJQUNyQix1Q0FBcUIsQ0FBQTtJQUNyQix1Q0FBcUIsQ0FBQTtJQUNyQix1Q0FBcUIsQ0FBQTtJQUNyQix1Q0FBcUIsQ0FBQTtJQUNyQixtQ0FBaUIsQ0FBQTtJQUNqQixtQ0FBaUIsQ0FBQTtJQUNqQiwrQkFBWSxDQUFBO0FBQ2hCLENBQUMsRUFmSSxjQUFjLEtBQWQsY0FBYyxRQWVsQjtBQUVLLElBQUEsS0FBc0IsRUFBRSxDQUFDLFVBQVUsRUFBbEMsT0FBTyxhQUFBLEVBQUUsUUFBUSxjQUFpQixDQUFDO0FBRzFDO0lBQW1DLHlCQUFJO0lBQXZDO1FBQUEscUVBb1hDO1FBbFhHLGFBQU8sR0FBUSxDQUFDLENBQUM7UUFDakIsdUJBQWlCLEdBQVMsS0FBSyxDQUFDO1FBQ2hDLG9CQUFjLEdBQVUsRUFBRSxDQUFDO1FBQzNCLGtCQUFZLEdBQVMsS0FBSyxDQUFDO1FBQzNCLGFBQWE7UUFDYix3QkFBa0IsR0FBUSxDQUFDLENBQUM7UUFDNUIsZUFBUyxHQUFTLEVBQUUsQ0FBQyxFQUFFLEVBQUUsQ0FBQztRQUMxQixvQkFBb0I7UUFDcEIsb0JB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Q2xCLElBQUcsSUFBSSxDQUFDLGVBQWUsQ0FBQyxDQUFDLENBQUMsR0FBQyxDQUFDLEVBQUM7Z0JBQ3pCLElBQUksQ0FBQyxlQUFlLENBQUMsQ0FBQyxDQUFDLElBQUUsRUFBRSxDQUFDO2dCQUM1QixJQUFHLENBQUMsSUFBRSxDQUFDLEVBQUM7b0JBQ0osa0JBQWtCO29CQUNsQixTQUFTO2lCQUNaO2dCQUNELElBQUcsSUFBSSxDQUFDLGVBQWUsQ0FBQyxDQUFDLENBQUMsR0FBQyxDQUFDLEVBQUM7b0JBQ3pCLElBQUksQ0FBQyxlQUFlLENBQUMsQ0FBQyxDQUFDLEdBQUMsQ0FBQyxDQUFDO29CQUMxQixJQUFJLENBQUMsVUFBVSxDQUFDLENBQUMsR0FBQyxDQUFDLENBQUMsQ0FBQztpQkFDeEI7YUFDSjtTQUNKO0lBQ0wsQ0FBQztJQUVELFVBQVU7SUFDVix3QkFBUSxHQUFSLFVBQVMsRUFBUztRQUNkLElBQUksQ0FBQyxTQUFTLElBQUUsRUFBRSxDQUFDO1FBQ25CLElBQUcsSUFBSSxDQUFDLFNBQVMsSUFBRSxJQUFJLENBQUMsVUFBVSxFQUFDO1lBQy9CLElBQUksQ0FBQyxTQUFTLEdBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQztZQUMvQixJQUFJLENBQUMsV0FBVyxFQUFFLENBQUM7U0FDdEI7SUFDTCxDQUFDO0lBcFdEO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUM7MkNBQ0k7SUFkTCxLQUFLO1FBRHpCLE9BQU87T0FDYSxLQUFLLENBb1h6QjtJQUFELFlBQUM7Q0FwWEQsQUFvWEMsQ0FwWGtDLGNBQUksR0FvWHRDO2tCQXBYb0IsS0FBSyIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEdhbWVTdGF0ZSB9IGZyb20gXCIuLi8uLi9Db25zdGFudHNcIjtcclxuaW1wb3J0IHsgRW5lbXlfU3RhdGUgfSBmcm9tIFwiLi4vLi4vRW5lbXkvRW5lbXlDb25maWdcIjtcclxuaW1wb3J0IHsgR2FtZUVmZmVjdHNNYW5hZ2VyLCBHYW1lRWZmZWN0SWQgfSBmcm9tIFwiLi4vLi4vR2FtZS9HYW1lRWZmZWN0c01hbmFnZXJcIjtcclxuaW1wb3J0IEdyb3VuZE1hbmFnZXIgZnJvbSBcIi4uLy4uL0dhbWUvR3JvdW5kTWFuYWdlclwiO1xyXG5pbXBvcnQgR2FtZU1hbmFnZXIgZnJvbSBcIi4uLy4uL0dhbWVNYW5hZ2VyXCI7XHJcbmltcG9ydCB7IEJ1ZmZEYXRhIH0gZnJvbSBcIi4uLy4uL0hlcm8vR2FtZS9CdWZmRGF0YVwiO1xyXG5pbXBvcnQgeyBEYW1hZ2VUeXBlLCBCdWZmSWQsIEJ1ZmZUeXBlIH0gZnJvbSBcIi4uLy4uL0hlcm8vR2FtZS9IZXJvQ29uZmlnXCI7XHJcbmltcG9ydCBNb25zdGVyQnVsbGV0IGZyb20gXCIuLi8uLi9Nb25zdGVyL01vbnN0ZXJCdWxsZXRcIjtcclxuaW1wb3J0IHsgS2V5RnJhbWVEYXRhIH0gZnJvbSBcIi4uLy4uL01vbnN0ZXIvTW9uc3RlckRhdGFcIjtcclxuaW1wb3J0IE1vbnN0ZXJNYW5hZ2VyIGZyb20gXCIuLi8uLi9Nb25zdGVyL01vbnN0ZXJNYW5hZ2VyXCI7XHJcbmltcG9ydCB7IFNvdW5kSW5kZXggfSBmcm9tIFwiLi4vLi4vU291bmQvQXVkaW9Db25zdGFudHNcIjtcclxuaW1wb3J0IEJvc3MgZnJvbSBcIi4uL0Jvc3NcIjtcclxuaW1wb3J0IEJvc3NTa2lsbDggZnJvbSBcIi4vQm9zc1NraWxsOFwiO1xyXG5cclxuZW51bSBBbmltYXRpb25fTmFtZVxyXG57XHJcbiAgICBJZGxlID0gXCJJZGxlXCIsICAgICAgIC8vLS0g5q2j6Z2i5b6F5py6XHJcbiAgICBhdHRhY2sgPSBcIkF0dGFjazFcIiwgICAgICAgICAgLy8tLSDmlLvlh7sxXHJcbiAgICBydW4gPSBcIlJ1blwiLCAgICAgICAgICAgICAgICAvLy0tIOi3kei3r1xyXG4gICAgaHVydDEgPSBcIkh1cnRcIiwgICAgICAgICAgLy8tLSDlj5flh7sxXHJcbiAgICBza2lsbDFfMSA9IFwiU2tpbGwxXzFcIiwgICAgICAgICAgLy8tLSDmioDog70xLTFcclxuICAgIHNraWxsMV8yID0gXCJTa2lsbDFfMlwiLCAgICAgICAgICAvLy0tIOaKgOiDvTEtMlxyXG4gICAgc2tpbGwxXzMgPSBcIlNraWxsMV8zXCIsICAgICAgICAgIC8vLS0g5oqA6IO9MS0zXHJcbiAgICBza2lsbDFfNCA9IFwiU2tpbGwxXzRcIiwgICAgICAgICAgLy8tLSDmioDog70xLTRcclxuICAgIHNraWxsMV81ID0gXCJTa2lsbDFfNVwiLCAgICAgICAgICAvLy0tIOaKgOiDvTEtNVxyXG4gICAgc2tpbGwxXzYgPSBcIlNraWxsMV82XCIsICAgICAgICAgIC8vLS0g5oqA6IO9MS02XHJcbiAgICBza2lsbDIgPSBcIlNraWxsMlwiLCAgICAgICAgICAvLy0tIOaKgOiDvTJcclxuICAgIHNraWxsMyA9IFwiU2tpbGwzXCIsICAgICAgICAgIC8vLS0g5oqA6IO9MlxyXG4gICAgZGVhZD0gXCJEZWFkXCIsICAgLy/mrbvkuqFcclxufVxyXG5cclxuY29uc3Qge2NjY2xhc3MsIHByb3BlcnR5fSA9IGNjLl9kZWNvcmF0b3I7XHJcblxyXG5AY2NjbGFzc1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBCb3NzOCBleHRlbmRzIEJvc3Mge1xyXG4gICAgXHJcbiAgICBhdHRfbnVtOm51bWJlcj0wO1xyXG4gICAgaXNfYWN0aXZlX3NraWxsXzM6Ym9vbGVhbj1mYWxzZTtcclxuICAgIGt1YW5nYmFvX3ZhbHVlOm51bWJlcltdPVtdO1xyXG4gICAgaXNfa3VhbmdfYmFvOmJvb2xlYW49ZmFsc2U7XHJcbiAgICAvKirlvZPliY3nmoTlj6zllKTntKLlvJUgKi9cclxuICAgIGN1cl96aGFvaHVhbl9pbmRleDpudW1iZXI9MDtcclxuICAgIHNraWxsX3BvczpjYy5WZWMyPWNjLnYyKCk7XHJcbiAgICAvKirpkrvlnLDliqjkvZzvvIzlsL7pg6jnm7jlr7nlpLTpg6jnmoTlnZDmoIcgKi9cclxuICAgIHdlaV96dWFuZGlfcG9zOmNjLlZlYzI9Y2MudjIoMCwwKTtcclxuICAgIC8qKuWHuuWcsOWKqOS9nO+8jOWwvumDqOebuOWvueWktOmDqOeahOWdkOaghyAqL1xyXG4gICAgd2VpX2NodWRpX3BvczpjYy5WZWMyPWNjLnYyKDAsMCk7XHJcbiAgICBAcHJvcGVydHkoY2MuTm9kZSlcclxuICAgIHdlaV9ub2RlOmNjLk5vZGU9bnVsbDsgICAgXHJcblxyXG4gICAgb25Mb2FkKCk6IHZvaWQge1xyXG4gICAgICAgIHN1cGVyLm9uTG9hZCgpO1xyXG4gICAgICAgIEdhbWVFZmZlY3RzTWFuYWdlci5nZXRJbnN0YW5jZSgpLmFkZEVmZmVjdFBvb2xCeUlkKEdhbWVFZmZlY3RJZC5ib3NzOF9hdHRhY2tfYnVsbGVjdCwxKTtcclxuICAgICAgICBHYW1lRWZmZWN0c01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5hZGRFZmZlY3RQb29sQnlJZChHYW1lRWZmZWN0SWQuYm9zczhfYXR0YWNrX2J1bGxlY3RfaGl0LDEpO1xyXG4gICAgICAgIEdhbWVFZmZlY3RzTWFuYWdlci5nZXRJbnN0YW5jZSgpLmFkZEVmZmVjdFBvb2xCeUlkKEdhbWVFZmZlY3RJZC5ib3NzOF9za2lsbF9idWxsZWN0LDQpO1xyXG4gICAgICAgIEdhbWVFZmZlY3RzTWFuYWdlci5nZXRJbnN0YW5jZSgpLmFkZEVmZmVjdFBvb2xCeUlkKEdhbWVFZmZlY3RJZC5ib3NzOF9za2lsbF9idWxsZWN0X2hpdCw0KTtcclxuICAgICAgICBHYW1lRWZmZWN0c01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5hZGRFZmZlY3RQb29sQnlJZChHYW1lRWZmZWN0SWQueHVhbnl1biwyKTtcclxuICAgICAgICBcclxuICAgICAgICB0aGlzLmFkZERlYXRoQ2FsbGJhY2sodGhpcy5vbkRlYXRoKTtcclxuICAgICAgICB0aGlzLmFkZFh1YW5ZdW5MaXN0ZW4odGhpcy5vblh1YW5ZdW5SZXN1bHQpO1xyXG4gICAgICAgIHRoaXMuYWRkQm9zc0luaXRlZExpc3Rlbih0aGlzLm9uQm9zc0luaXRlZCk7XHJcbiAgICAgICAgdGhpcy5hZGRDaGFuZ2VCb3NzSHBMaXN0ZW4odGhpcy5vbkNoYW5nZUhwKTtcclxuICAgICAgICBcclxuICAgIH1cclxuXHJcbiAgICBvbkJvc3NJbml0ZWQoKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5zdGFydElkbGUoKTtcclxuICAgICAgICB0aGlzLm5vZGUueT0xMjg7IFxyXG4gICAgICAgIHRoaXMua3VhbmdiYW9fdmFsdWVbMF09dGhpcy5za2lsbF9kYXRhLmdldFNraWxsVmFsdWUxKDMpO1xyXG4gICAgICAgIHRoaXMuc2tpbGxfcG9zPXRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZSgnc2tpbGwnKS5nZXRQb3NpdGlvbigpO1xyXG4gICAgICAgIHRoaXMud2VpX25vZGU9bmV3IGNjLk5vZGUoXCJ3ZWlcIik7XHJcbiAgICAgICAgbGV0IHdlaVNwPXRoaXMud2VpX25vZGUuYWRkQ29tcG9uZW50KHNwLlNrZWxldG9uKTsgICAgICAgIFxyXG4gICAgICAgIHdlaVNwLnNrZWxldG9uRGF0YT0odGhpcy5zcGluZS5za2VsZXRvbkRhdGEpO1xyXG4gICAgICAgIEdyb3VuZE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5ub2RlLmFkZENoaWxkKHRoaXMud2VpX25vZGUpO1xyXG4gICAgICAgIHRoaXMud2VpX25vZGUuc2V0UG9zaXRpb24odGhpcy5ub2RlLmdldFBvc2l0aW9uKCkpO1xyXG4gICAgICAgIHRoaXMud2VpX25vZGUuYWN0aXZlPWZhbHNlO1xyXG4gICAgICAgIHRoaXMuc2hhZG93LmFjdGl2ZT1mYWxzZTtcclxuICAgIH1cclxuXHJcbiAgICBvbkNoYW5nZUhwKG51bTpudW1iZXIpe1xyXG4gICAgICAgIGlmKHRoaXMuY3VyX2hwPD10aGlzLm1heF9ocCowLjMpe1xyXG4gICAgICAgICAgICBpZih0aGlzLmlzX2FjdGl2ZV9za2lsbF8zPT1mYWxzZSYmdGhpcy5za2lsbF9jb2xkX2Rvd25bMl08PTApe1xyXG4gICAgICAgICAgICAgICAgdGhpcy5pc19hY3RpdmVfc2tpbGxfMz10cnVlO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zdGFydFNraWxsKDMpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgIGlmKHRoaXMuaXNfYWN0aXZlX3NraWxsXzM9PXRydWUpe1xyXG4gICAgICAgICAgICAgICAgdGhpcy5pc19hY3RpdmVfc2tpbGxfMz1mYWxzZTtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2V0S3VhbmdCYW8oZmFsc2UpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHN0YXJ0SWRsZSgpeyAgICAgICAgXHJcbiAgICAgICAgc3VwZXIuc2V0RW5lbXlTdGF0ZShFbmVteV9TdGF0ZS5zdGFuZGJ5KTtcclxuICAgICAgICBzdXBlci5wbGF5U3BpbkFuaW1hdG9uKEFuaW1hdGlvbl9OYW1lLklkbGUsdHJ1ZSk7XHJcbiAgICAgICAgXHJcbiAgICB9XHJcblxyXG4gICAgc3RhcnRBdHRhY2soKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5hdHRfamlzaHU9MDsgICAgICAgIFxyXG4gICAgICAgIHN1cGVyLnNldEVuZW15U3RhdGUoRW5lbXlfU3RhdGUuYXR0KTtcclxuICAgICAgICBsZXQgZGF0YT1uZXcgS2V5RnJhbWVEYXRhKCk7XHJcbiAgICAgICAgZGF0YS5uYW1lPSdBdHRhY2snO1xyXG4gICAgICAgIGRhdGEuY2FsbGJhY2s9KCk9PntcclxuICAgICAgICAgICAgdGhpcy5hdHRfamlzaHU9MDtcclxuICAgICAgICAgICAgR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zb3VuZF9tYW5hZ2VyLnBsYXlTb3VuZChTb3VuZEluZGV4LllYX0JPU1M4QXR0YWNrKTtcclxuICAgICAgICAgICAgbGV0IGJ1bGxlY3Q9R2FtZUVmZmVjdHNNYW5hZ2VyLmdldEluc3RhbmNlKCkuY3JlYXRlR2FtZUVmZmVjdEJ5SWQoR2FtZUVmZmVjdElkLmJvc3M4X2F0dGFja19idWxsZWN0LHRoaXMuZ2V0QXR0UG9zKCkpO1xyXG4gICAgICAgICAgICBidWxsZWN0LmdldENvbXBvbmVudChNb25zdGVyQnVsbGV0KS5pbml0KHRoaXMuZ2V0QXR0RGF0YShEYW1hZ2VUeXBlLk5vcm1hbCx0cnVlKSxHYW1lRWZmZWN0SWQuYm9zczhfYXR0YWNrX2J1bGxlY3QsR2FtZUVmZmVjdElkLmJvc3M4X2F0dGFja19idWxsZWN0X2hpdCwxNjAwLE1hdGguUEkqMy8yKTtcclxuICAgICAgICAgICAgdGhpcy5hdHRfbnVtKys7XHJcbiAgICAgICAgICAgIGlmKHRoaXMuYXR0X251bT49NSl7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmF0dF9udW09MDtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2tpbGxfcXVldWUucHVzaCgyKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBzdXBlci5wbGF5U3BpbkFuaW1hdG9uKChBbmltYXRpb25fTmFtZS5hdHRhY2spLGZhbHNlLGRhdGEsKCk9PntcclxuICAgICAgICAgICAgaWYodGhpcy5za2lsbF9xdWV1ZS5sZW5ndGg+MCl7XHJcbiAgICAgICAgICAgICAgICBzdXBlci5zZXRFbmVteVN0YXRlKEVuZW15X1N0YXRlLnN0YW5kYnkpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zdGFydFNraWxsKHRoaXMuc2tpbGxfcXVldWUuc2hpZnQoKSk7XHJcbiAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zdGFydElkbGUoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pXHJcbiAgICB9XHJcbiAgICBzdGFydFNraWxsKHNraWxsSW5kZXg6bnVtYmVyKXtcclxuICAgICAgICBzd2l0Y2goc2tpbGxJbmRleCl7XHJcbiAgICAgICAgICAgIGNhc2UgMTp7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnN0YXJ0U2tpbGwxKCk7XHJcbiAgICAgICAgICAgIH1icmVhaztcclxuICAgICAgICAgICAgY2FzZSAyOntcclxuICAgICAgICAgICAgICAgIHRoaXMuc3RhcnRTa2lsbDIoKTtcclxuICAgICAgICAgICAgfWJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIDM6e1xyXG4gICAgICAgICAgICAgICAgaWYodGhpcy5pc19hY3RpdmVfc2tpbGxfMyl7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zdGFydFNraWxsMygpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9YnJlYWs7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgXHJcbiAgICAvL+mSu+WcsFxyXG4gICAgc3RhcnRTa2lsbDEoKXtcclxuICAgICAgICBsZXQgc2tpbGxObz0xO1xyXG4gICAgICAgIGxldCBza2lsbEluZGV4PXNraWxsTm8tMTtcclxuICAgICAgICB0aGlzLnNraWxsX2NvbGRfZG93bltza2lsbEluZGV4XT10aGlzLnNraWxsX2RhdGEuZ2V0U2tpbGxDb2xkRG93bihza2lsbE5vKTtcclxuICAgICAgICBpZihzdXBlci5nZXRFbmVteVN0YXRlKCkhPUVuZW15X1N0YXRlLmF0dCYmc3VwZXIuZ2V0RW5lbXlTdGF0ZSgpIT1FbmVteV9TdGF0ZS5za2lsbCl7XHJcbiAgICAgICAgICAgIGlmKCFzdXBlci5pc0hhdmVEZUJ1ZmYoQnVmZklkLkhlcm9fWHVhbll1bikpe1xyXG4gICAgICAgICAgICAgICAgc3VwZXIuc2V0RW5lbXlTdGF0ZShFbmVteV9TdGF0ZS5za2lsbCk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNraWxsX2NvbGRfZG93bltza2lsbEluZGV4XT10aGlzLnNraWxsX2RhdGEuZ2V0U2tpbGxDb2xkRG93bihza2lsbE5vKTsgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICBzdXBlci5wbGF5U3BpbkFuaW1hdG9uKChBbmltYXRpb25fTmFtZS5za2lsbDFfMSksZmFsc2UsbnVsbCwoKT0+e1xyXG4gICAgICAgICAgICAgICAgICAgIHN1cGVyLnBsYXlTcGluQW5pbWF0b24oKEFuaW1hdGlvbl9OYW1lLnNraWxsMV8yKSx0cnVlLG51bGwsbnVsbCk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy51bnNjaGVkdWxlKHRoaXMuc3RhcnRadWFuRGkpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2NoZWR1bGVPbmNlKHRoaXMuc3RhcnRadWFuRGksMik7XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgIGlmKHRoaXMuc2tpbGxfcXVldWUuaW5kZXhPZihza2lsbE5vKTwwKXtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnNraWxsX3F1ZXVlLnB1c2goc2tpbGxObyk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgaWYodGhpcy5za2lsbF9xdWV1ZS5pbmRleE9mKHNraWxsTm8pPDApe1xyXG4gICAgICAgICAgICAgICAgdGhpcy5za2lsbF9xdWV1ZS5wdXNoKHNraWxsTm8pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgXHJcbiAgICBzdGFydFp1YW5EaSgpe1xyXG4gICAgICAgIGlmKCFzdXBlci5pc0hhdmVEZUJ1ZmYoQnVmZklkLkhlcm9fWHVhbll1bikmJnRoaXMuZ2V0SXNEaWUoKT09ZmFsc2Upe1xyXG4gICAgICAgICAgICAvL+mSu+WcsOeahOi/h+eoi+aYr+WFjeaOp+eahFxyXG4gICAgICAgICAgICB0aGlzLmN1cl90b3VnaG5lc3MrPTE7XHJcbiAgICAgICAgICAgIC8v5pi+56S65bC+6YOo77yM5ZCM5pe25pKt5pS+6ZK75Zyw5Yqo5L2cXHJcbiAgICAgICAgICAgIHRoaXMud2VpX25vZGUuYWN0aXZlPXRydWU7XHJcbiAgICAgICAgICAgIGxldCB3ZWlTcD10aGlzLndlaV9ub2RlLmdldENvbXBvbmVudChzcC5Ta2VsZXRvbik7XHJcbiAgICAgICAgICAgIGxldCB3ZWlBbmltYT13ZWlTcC5zZXRBbmltYXRpb24oMCxBbmltYXRpb25fTmFtZS5za2lsbDFfNCxmYWxzZSk7XHJcbiAgICAgICAgICAgIHdlaVNwLnNldFRyYWNrQ29tcGxldGVMaXN0ZW5lcih3ZWlBbmltYSwoZW50cnk6IHNwLnNwaW5lLlRyYWNrRW50cnksIGV2ZW50KSA9PntcclxuICAgICAgICAgICAgICAgIHdlaUFuaW1hLmxpc3RlbmVyPW51bGw7XHJcbiAgICAgICAgICAgICAgICB0aGlzLndlaV9ub2RlLmFjdGl2ZT1mYWxzZTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIC8vIGxldCBkYXRhPW5ldyBLZXlGcmFtZURhdGEoKTtcclxuICAgICAgICAgICAgLy8gICAgIGRhdGEubmFtZT0nU2tpbGwnO1xyXG4gICAgICAgICAgICAvLyAgICAgZGF0YS5jYWxsYmFjaz0oKT0+e1xyXG4gICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAvLyAgICAgfVxyXG4gICAgICAgICAgICBzdXBlci5wbGF5U3BpbkFuaW1hdG9uKChBbmltYXRpb25fTmFtZS5za2lsbDFfMyksZmFsc2UsbnVsbCwoKT0+e1xyXG4gICAgICAgICAgICAgICAgLy/lvIDlp4vlm57ooYBcclxuICAgICAgICAgICAgICAgIC8vc3VwZXIuc2V0RW5lbXlTdGF0ZShFbmVteV9TdGF0ZS5ib3JuKTtcclxuICAgICAgICAgICAgICAgIHRoaXMubm9kZS5nZXRDb21wb25lbnQoY2MuQ29sbGlkZXIpLmVuYWJsZWQ9ZmFsc2U7XHJcbiAgICAgICAgICAgICAgICBsZXQgYnVmZkRhdGE9bmV3IEJ1ZmZEYXRhKCk7XHJcbiAgICAgICAgICAgICAgICBidWZmRGF0YS5yZW1haW5fdGltZT10aGlzLnNraWxsX2RhdGEuZ2V0U2tpbGxWYWx1ZTIoMSk7XHJcbiAgICAgICAgICAgICAgICBidWZmRGF0YS5idWZmX3ZhbHVlPVt0aGlzLnNraWxsX2RhdGEuZ2V0U2tpbGxWYWx1ZTEoMSkqdGhpcy5nZXRNYXhIcCgpXTtcclxuICAgICAgICAgICAgICAgIGJ1ZmZEYXRhLmJ1ZmZfaWQ9QnVmZklkLkJvc3M4X1NraWxsXzFfamlheHVlO1xyXG4gICAgICAgICAgICAgICAgYnVmZkRhdGEucmVjb3ZlcnlfamlhbmdlX3RpbWU9MTtcclxuICAgICAgICAgICAgICAgIGxldCB0aW1lcj10aGlzLmFkZEJ1ZmYoYnVmZkRhdGEpO1xyXG4gICAgICAgICAgICAgICAgdGltZXIuYWRkRGVzdHJveUxpc3Rlbih0aGlzLm9uU2tpbGwxRW5kLmJpbmQodGhpcykpO1xyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgIH1cclxuICAgIH0gICAgXHJcblxyXG4gICAgb25Ta2lsbDFFbmQoYnVmZkRhdGE6QnVmZkRhdGEpe1xyXG4gICAgICAgIC8v6ZK75Ye65Zyw6Z2iXHJcbiAgICAgICAgLy/pkrvlnLDnmoTov4fnqIvmmK/lhY3mjqfnmoQgICAgICAgXHJcbiAgICAgICAgLy/mmL7npLrlsL7pg6jvvIzlkIzml7bmkq3mlL7pkrvlnLDliqjkvZxcclxuICAgICAgICB0aGlzLndlaV9ub2RlLmFjdGl2ZT10cnVlO1xyXG4gICAgICAgIGxldCB3ZWlTcD10aGlzLndlaV9ub2RlLmdldENvbXBvbmVudChzcC5Ta2VsZXRvbik7XHJcbiAgICAgICAgbGV0IHdlaUFuaW1hPXdlaVNwLnNldEFuaW1hdGlvbigwLEFuaW1hdGlvbl9OYW1lLnNraWxsMV82LGZhbHNlKTtcclxuICAgICAgICB3ZWlTcC5zZXRUcmFja0NvbXBsZXRlTGlzdGVuZXIod2VpQW5pbWEsKGVudHJ5OiBzcC5zcGluZS5UcmFja0VudHJ5LCBldmVudCkgPT57XHJcbiAgICAgICAgICAgIHdlaUFuaW1hLmxpc3RlbmVyPW51bGw7XHJcbiAgICAgICAgICAgIHRoaXMud2VpX25vZGUuYWN0aXZlPWZhbHNlO1xyXG4gICAgICAgIH0pOyAgICAgICBcclxuICAgICAgICBzdXBlci5wbGF5U3BpbkFuaW1hdG9uKChBbmltYXRpb25fTmFtZS5za2lsbDFfNSksZmFsc2UsbnVsbCwoKT0+e1xyXG4gICAgICAgICAgICB0aGlzLm5vZGUuZ2V0Q29tcG9uZW50KGNjLkNvbGxpZGVyKS5lbmFibGVkPXRydWU7XHJcbiAgICAgICAgICAgIHRoaXMuY3VyX3RvdWdobmVzcy09MTtcclxuICAgICAgICAgICAgaWYodGhpcy5za2lsbF9xdWV1ZS5sZW5ndGg+MCl7XHJcbiAgICAgICAgICAgICAgICBzdXBlci5zZXRFbmVteVN0YXRlKEVuZW15X1N0YXRlLnN0YW5kYnkpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zdGFydFNraWxsKHRoaXMuc2tpbGxfcXVldWUuc2hpZnQoKSk7XHJcbiAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zdGFydElkbGUoKTtcclxuICAgICAgICAgICAgfSAgICAgICAgICAgIFxyXG4gICAgICAgIH0pXHJcbiAgICB9XHJcblxyXG4gICAgZ2V0U2tpbGxQb3MoKTpjYy5WZWMye1xyXG4gICAgICAgIGxldCBkaXNQb3M9dGhpcy5ub2RlLmdldFBvc2l0aW9uKCkuYWRkKGNjLnYyKHRoaXMuc2tpbGxfcG9zLngqdGhpcy5ub2RlLnNjYWxlWCx0aGlzLnNraWxsX3Bvcy55KnRoaXMubm9kZS5zY2FsZVkpKTtcclxuICAgICAgICByZXR1cm4gZGlzUG9zO1xyXG4gICAgfVxyXG5cclxuICAgIC8v55Sp6by75raVXHJcbiAgICBzdGFydFNraWxsMigpe3RoaXMuZ2V0QXR0UG9zKClcclxuICAgICAgICBsZXQgc2tpbGxObz0yO1xyXG4gICAgICAgIGxldCBza2lsbEluZGV4PXNraWxsTm8tMTtcclxuICAgICAgICB0aGlzLnNraWxsX2NvbGRfZG93bltza2lsbEluZGV4XT10aGlzLnNraWxsX2RhdGEuZ2V0U2tpbGxDb2xkRG93bihza2lsbE5vKTtcclxuICAgICAgICBpZihzdXBlci5nZXRFbmVteVN0YXRlKCkhPUVuZW15X1N0YXRlLmF0dCl7XHJcbiAgICAgICAgICAgIGlmKCFzdXBlci5pc0hhdmVEZUJ1ZmYoQnVmZklkLkhlcm9fWHVhbll1bikpe1xyXG4gICAgICAgICAgICAgICAgR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zb3VuZF9tYW5hZ2VyLnBsYXlTb3VuZChTb3VuZEluZGV4LllYX0Jvc3M4QXR0YWNrMik7XHJcbiAgICAgICAgICAgICAgICBzdXBlci5zZXRFbmVteVN0YXRlKEVuZW15X1N0YXRlLnNraWxsKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2tpbGxfY29sZF9kb3duW3NraWxsSW5kZXhdPXRoaXMuc2tpbGxfZGF0YS5nZXRTa2lsbENvbGREb3duKHNraWxsTm8pO1xyXG4gICAgICAgICAgICAgICAgbGV0IGRhdGE9bmV3IEtleUZyYW1lRGF0YSgpO1xyXG4gICAgICAgICAgICAgICAgZGF0YS5uYW1lPSdTa2lsbDInO1xyXG4gICAgICAgICAgICAgICAgZGF0YS5jYWxsYmFjaz0oKT0+e1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYXR0X2ppc2h1PTA7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IG5vZGU9R2FtZUVmZmVjdHNNYW5hZ2VyLmdldEluc3RhbmNlKCkuY3JlYXRlR2FtZUVmZmVjdEJ5SWQoR2FtZUVmZmVjdElkLmJvc3M4X3NraWxsX2J1bGxlY3QsdGhpcy5nZXRTa2lsbFBvcygpKTtcclxuICAgICAgICAgICAgICAgICAgICBub2RlLmdldENvbXBvbmVudChCb3NzU2tpbGw4KS5pbml0KHRoaXMuZ2V0QXR0RGF0YShEYW1hZ2VUeXBlLlNraWxsLHRydWUsdGhpcy5za2lsbF9kYXRhLmdldFNraWxsVmFsdWUxKDIpKSxHYW1lRWZmZWN0SWQuYm9zczhfc2tpbGxfYnVsbGVjdCxHYW1lRWZmZWN0SWQuYm9zczhfc2tpbGxfYnVsbGVjdF9oaXQsMTUwMCxNYXRoLlBJKjMvMik7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBzdXBlci5wbGF5U3BpbkFuaW1hdG9uKChBbmltYXRpb25fTmFtZS5za2lsbDIpLGZhbHNlLGRhdGEsKCk9PntcclxuICAgICAgICAgICAgICAgICAgICBpZih0aGlzLnNraWxsX3F1ZXVlLmxlbmd0aD4wKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgc3VwZXIuc2V0RW5lbXlTdGF0ZShFbmVteV9TdGF0ZS5zdGFuZGJ5KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zdGFydFNraWxsKHRoaXMuc2tpbGxfcXVldWUuc2hpZnQoKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc3RhcnRJZGxlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICBpZih0aGlzLnNraWxsX3F1ZXVlLmluZGV4T2Yoc2tpbGxObyk8MCl7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5za2lsbF9xdWV1ZS5wdXNoKHNraWxsTm8pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgIGlmKHRoaXMuc2tpbGxfcXVldWUuaW5kZXhPZihza2lsbE5vKTwwKXtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2tpbGxfcXVldWUucHVzaChza2lsbE5vKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBcclxuICAgIC8qKueLguaatCAqL1xyXG4gICAgc3RhcnRTa2lsbDMoKXtcclxuICAgICAgICBpZih0aGlzLmlzX2FjdGl2ZV9za2lsbF8zPT1mYWxzZSl7XHJcbiAgICAgICAgICAgIHJldHVyblxyXG4gICAgICAgIH1cclxuICAgICAgICBsZXQgc2tpbGxObz0zO1xyXG4gICAgICAgIGxldCBza2lsbEluZGV4PXNraWxsTm8tMTtcclxuICAgICAgICB0aGlzLnNraWxsX2NvbGRfZG93bltza2lsbEluZGV4XT10aGlzLnNraWxsX2RhdGEuZ2V0U2tpbGxDb2xkRG93bihza2lsbE5vKTtcclxuICAgICAgICBpZihzdXBlci5nZXRFbmVteVN0YXRlKCkhPUVuZW15X1N0YXRlLmF0dCYmc3VwZXIuZ2V0RW5lbXlTdGF0ZSgpIT1FbmVteV9TdGF0ZS5za2lsbCl7XHJcbiAgICAgICAgICAgIGlmKCFzdXBlci5pc0hhdmVEZUJ1ZmYoQnVmZklkLkhlcm9fWHVhbll1bikpe1xyXG4gICAgICAgICAgICAgICAgR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zb3VuZF9tYW5hZ2VyLnBsYXlTb3VuZChTb3VuZEluZGV4LllYX0Jvc3M1QmVpZG9uZyk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmN1cl90b3VnaG5lc3MrPTE7XHJcbiAgICAgICAgICAgICAgICBzdXBlci5zZXRFbmVteVN0YXRlKEVuZW15X1N0YXRlLnNraWxsKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2tpbGxfY29sZF9kb3duW3NraWxsSW5kZXhdPXRoaXMuc2tpbGxfZGF0YS5nZXRTa2lsbENvbGREb3duKHNraWxsTm8pO1xyXG4gICAgICAgICAgICAgICAgbGV0IGRhdGE9bmV3IEtleUZyYW1lRGF0YSgpO1xyXG4gICAgICAgICAgICAgICAgZGF0YS5uYW1lPSdTa2lsbDMnO1xyXG4gICAgICAgICAgICAgICAgZGF0YS5jYWxsYmFjaz0oKT0+eyAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5hdHRfamlzaHU9MDtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmN1cl90b3VnaG5lc3MtPTE7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5hdHRfamlzaHU9MDtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnNldEt1YW5nQmFvKHRydWUpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgc3VwZXIucGxheVNwaW5BbmltYXRvbigoQW5pbWF0aW9uX05hbWUuc2tpbGwzKSxmYWxzZSxkYXRhLCgpPT57XHJcbiAgICAgICAgICAgICAgICAgICAgaWYodGhpcy5za2lsbF9xdWV1ZS5sZW5ndGg+MCl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHN1cGVyLnNldEVuZW15U3RhdGUoRW5lbXlfU3RhdGUuc3RhbmRieSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc3RhcnRTa2lsbCh0aGlzLnNraWxsX3F1ZXVlLnNoaWZ0KCkpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnN0YXJ0SWRsZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgaWYodGhpcy5za2lsbF9xdWV1ZS5pbmRleE9mKHNraWxsTm8pPDApe1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2tpbGxfcXVldWUucHVzaChza2lsbE5vKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICBpZih0aGlzLnNraWxsX3F1ZXVlLmluZGV4T2Yoc2tpbGxObyk8MCl7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNraWxsX3F1ZXVlLnB1c2goc2tpbGxObyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBcclxuICAgIHNldEt1YW5nQmFvKGlzS0I6Ym9vbGVhbil7XHJcbiAgICAgICAgLy90aGlzLnNldEhhbmRzKGlzS0IpXHJcbiAgICAgICAgaWYodGhpcy5pc19rdWFuZ19iYW8hPWlzS0Ipe1xyXG4gICAgICAgICAgICB0aGlzLmlzX2t1YW5nX2Jhbz1pc0tCO1xyXG4gICAgICAgICAgICB0aGlzLmlzX2FjdGl2ZV9za2lsbF8zPWlzS0I7XHJcbiAgICAgICAgICAgIGlmKGlzS0Ipe1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jaGFuZ2VBdHRhY2tTcGVlZCh0aGlzLmt1YW5nYmFvX3ZhbHVlWzBdKTtcclxuICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNoYW5nZUF0dGFja1NwZWVkKC10aGlzLmt1YW5nYmFvX3ZhbHVlWzBdKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBvbkRlYXRoKCkge1xyXG4gICAgICAgIHRoaXMudW5zY2hlZHVsZUFsbENhbGxiYWNrcygpO1xyXG4gICAgICAgIHN1cGVyLnBsYXlEZWFkQW5pbWF0b24oQW5pbWF0aW9uX05hbWUuZGVhZCwoKT0+e1xyXG4gICAgICAgICAgICB0aGlzLnJlbW92ZUFsbERlQnVmZigpO1xyXG4gICAgICAgICAgICB0aGlzLnJlbW92ZUFsbEJ1ZmYoKTtcclxuICAgICAgICAgICAgaWYodGhpcy5zaGFkb3cpe1xyXG4gICAgICAgICAgICAgICAgY2MudHdlZW4odGhpcy5zaGFkb3cpLnRvKDAuNzUse29wYWNpdHk6MH0pLnN0YXJ0KCk7XHJcbiAgICAgICAgICAgIH0gICAgICAgICAgICBcclxuICAgICAgICAgICAgY2MudHdlZW4odGhpcy5ub2RlKS50bygwLjc1LHtvcGFjaXR5OjB9KS5jYWxsKCgpPT57XHJcbiAgICAgICAgICAgICAgICB0aGlzLnJlbW92ZUFsbERlQnVmZigpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5yZW1vdmVBbGxCdWZmKCk7XHJcbiAgICAgICAgICAgICAgICBNb25zdGVyTWFuYWdlci5nZXRJbnN0YW5jZSgpLmRlc3Ryb3lNb25zdGVyKHRoaXMubm9kZSx0aGlzLm1vbnN0ZXJfdHlwZSk7XHJcbiAgICAgICAgICAgIH0pLnN0YXJ0KCk7XHJcbiAgICAgICAgfSlcclxuICAgICAgICAvL0dhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuc291bmRfbWFuYWdlci5wbGF5U291bmQoU291bmRJbmRleC5yZXdhcmRCb3gyKTtcclxuICAgICAgICAvL+WIoOmZpFxyXG4gICAgICAgIC8vIGlmKHRoaXMuYm9zc19zaGllbGQpe1xyXG4gICAgICAgIC8vICAgICB0aGlzLmJvc3Nfc2hpZWxkLmRlc3RvcnlTaGllbGQoKTtcclxuICAgICAgICAvLyB9ICAgICAgICBcclxuICAgIH1cclxuXHJcbiAgICBvblh1YW5ZdW5SZXN1bHQoaXNYdWFuWXVuOmJvb2xlYW4pe1xyXG4gICAgICAgIGlmKGlzWHVhbll1bil7XHJcbiAgICAgICAgICAgIHRoaXMuc3RhcnRYdWFuWXVuKCk7XHJcbiAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgIGlmKCFzdXBlci5pc0hhdmVEZUJ1ZmZUeXBlKEJ1ZmZUeXBlLlZlcnRpZ28pKXtcclxuICAgICAgICAgICAgICAgIGlmKCFzdXBlci5nZXRJc0RpZSgpKXtcclxuICAgICAgICAgICAgICAgICAgICBpZih0aGlzLnNraWxsX3F1ZXVlLmxlbmd0aD4wKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgc3VwZXIuc2V0RW5lbXlTdGF0ZShFbmVteV9TdGF0ZS5zdGFuZGJ5KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zdGFydFNraWxsKHRoaXMuc2tpbGxfcXVldWUuc2hpZnQoKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc3RhcnRJZGxlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHN0YXJ0WHVhbll1bigpe1xyXG4gICAgICAgIHRoaXMudW5zY2hlZHVsZSh0aGlzLnN0YXJ0WnVhbkRpKTtcclxuICAgICAgICBzdXBlci5wbGF5U3BpbkFuaW1hdG9uKEFuaW1hdGlvbl9OYW1lLmh1cnQxLGZhbHNlLG51bGwsKCk9PntcclxuICAgICAgICAgICAgaWYoc3VwZXIuaXNIYXZlRGVCdWZmVHlwZShCdWZmVHlwZS5WZXJ0aWdvKSYmIXN1cGVyLmdldElzRGllKCkpXHJcbiAgICAgICAgICAgICAgICB0aGlzLnNwaW5lLnBhdXNlZD10cnVlOyAgICAgICAgICAgICAgICBcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuICAgIFxyXG4gICAgdXBkYXRlKGR0KVxyXG4gICAge1xyXG4gICAgICAgIGlmKChHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLmN1cl9nYW1lX3N0YXRlIT1HYW1lU3RhdGUuR2FtZV9QbGF5aW5nKXx8dGhpcy5nZXRJc0RpZSgpKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICBzdXBlci51cGRhdGUoZHQpO1xyXG4gICAgICAgIHRoaXMuY2hlY2tTa2lsbChkdCk7XHJcbiAgICAgICAgaWYodGhpcy5nZXRFbmVteVN0YXRlKCkhPUVuZW15X1N0YXRlLnNraWxsKXtcclxuICAgICAgICAgICAgaWYoIXRoaXMuaXNIYXZlRGVCdWZmKEJ1ZmZJZC5IZXJvX1h1YW5ZdW4pKXtcclxuICAgICAgICAgICAgICAgIHRoaXMuY2hlY2tBdHQoZHQpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKuaKgOiDveajgOa1iyAqL1xyXG4gICAgY2hlY2tTa2lsbChkdDpudW1iZXIpe1xyXG4gICAgICAgIGZvcihsZXQgaT0wOyBpPDM7IGkrKyl7ICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIGlmKHRoaXMuc2tpbGxfY29sZF9kb3duW2ldPjApe1xyXG4gICAgICAgICAgICAgICAgdGhpcy5za2lsbF9jb2xkX2Rvd25baV0tPWR0O1xyXG4gICAgICAgICAgICAgICAgaWYoaT09Mil7XHJcbiAgICAgICAgICAgICAgICAgICAgLy/nrKwz5Liq5oqA6IO9LOa/gOa0u+exu+aKgOiDveS4jeWcqOatpOmHiuaUvlxyXG4gICAgICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgaWYodGhpcy5za2lsbF9jb2xkX2Rvd25baV08MCl7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5za2lsbF9jb2xkX2Rvd25baV09MDtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnN0YXJ0U2tpbGwoaSsxKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKirmlLvlh7vorqHnrpcgKi9cclxuICAgIGNoZWNrQXR0KGR0Om51bWJlcil7ICAgICAgICBcclxuICAgICAgICB0aGlzLmF0dF9qaXNodSs9ZHQ7XHJcbiAgICAgICAgaWYodGhpcy5hdHRfamlzaHU+PXRoaXMuYXR0X2ppYW5nZSl7XHJcbiAgICAgICAgICAgIHRoaXMuYXR0X2ppc2h1PXRoaXMuYXR0X2ppYW5nZTtcclxuICAgICAgICAgICAgdGhpcy5zdGFydEF0dGFjaygpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIFxyXG59XHJcbiJdfQ==