
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Scripts/Boss/Boss3/XueRenBoss.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0c1xcQm9zc1xcQm9zczNcXFh1ZVJlbkJvc3MudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsNkNBQTRDO0FBQzVDLHVEQUFzRDtBQUN0RCxvRUFBaUY7QUFDakYsaURBQTRDO0FBQzVDLHFEQUFvRDtBQUNwRCx5REFBMEU7QUFDMUUseURBQXVFO0FBQ3ZFLCtEQUEwRDtBQUMxRCw2REFBd0Q7QUFDeEQsNkNBQXdDO0FBRXhDLHNEQUFpRDtBQUNqRCxnQ0FBMkI7QUFDM0IsdUNBQWtDO0FBQ2xDLG1DQUE4QjtBQUU5QixJQUFLLGNBV0o7QUFYRCxXQUFLLGNBQWM7SUFFZiwrQkFBYSxDQUFBO0lBQ2IscUNBQW1CLENBQUE7SUFDbkIsNkJBQVcsQ0FBQTtJQUNYLGdDQUFjLENBQUE7SUFDZCxtQ0FBaUIsQ0FBQTtJQUNqQix1Q0FBcUIsQ0FBQTtJQUNyQix1Q0FBcUIsQ0FBQTtJQUNyQix1Q0FBcUIsQ0FBQTtJQUNyQiwrQkFBWSxDQUFBO0FBQ2hCLENBQUMsRUFYSSxjQUFjLEtBQWQsY0FBYyxRQVdsQjtBQUVLLElBQUEsS0FBc0IsRUFBRSxDQUFDLFVBQVUsRUFBbEMsT0FBTyxhQUFBLEVBQUUsUUFBUSxjQUFpQixDQUFDO0FBRzFDO0lBQXdDLDhCQUFJO0lBQTVDO1FBQUEscUVBMlVDO1FBelVHLGFBQU8sR0FBUSxJQUFJLENBQUM7UUFDcEIsdUJBQWlCLEdBQVMsS0FBSyxDQUFDOztJQXdVcEMsQ0FBQztJQXRVRywyQkFBTSxHQUFOO1FBQ0ksaUJBQU0sTUFBTSxXQUFFLENBQUM7UUFDZix1Q0FBa0IsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxpQkFBaUIsQ0FBQyxpQ0FBWSxDQUFDLE9BQU8sRUFBQyxDQUFDLENBQUMsQ0FBQztRQUMzRSx1Q0FBa0IsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxpQkFBaUIsQ0FBQyxpQ0FBWSxDQUFDLG1CQUFtQixFQUFDLENBQUMs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QUMsSUFBRSxDQUFDLEVBQUM7Z0JBQ0osT0FBTztnQkFDUCxJQUFHLElBQUksQ0FBQyxpQkFBaUIsSUFBRSxLQUFLLEVBQUM7b0JBQzdCLFNBQVM7aUJBQ1o7YUFDSjtZQUNELElBQUcsSUFBSSxDQUFDLGVBQWUsQ0FBQyxDQUFDLENBQUMsR0FBQyxDQUFDLEVBQUM7Z0JBQ3pCLElBQUksQ0FBQyxlQUFlLENBQUMsQ0FBQyxDQUFDLElBQUUsRUFBRSxDQUFDO2dCQUM1QixJQUFHLElBQUksQ0FBQyxlQUFlLENBQUMsQ0FBQyxDQUFDLEdBQUMsQ0FBQyxFQUFDO29CQUN6QixJQUFJLENBQUMsZUFBZSxDQUFDLENBQUMsQ0FBQyxHQUFDLENBQUMsQ0FBQztvQkFDMUIsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDLEdBQUMsQ0FBQyxDQUFDLENBQUM7aUJBQ3hCO2FBQ0o7WUFDRCxRQUFRO1lBQ1IsNEJBQTRCO1lBQzVCLElBQUk7U0FDUDtJQUNMLENBQUM7SUFFRCxVQUFVO0lBQ1YsNkJBQVEsR0FBUixVQUFTLEVBQVM7UUFDZCxJQUFJLENBQUMsU0FBUyxJQUFFLEVBQUUsQ0FBQztRQUNuQixJQUFHLElBQUksQ0FBQyxTQUFTLElBQUUsSUFBSSxDQUFDLFVBQVUsRUFBQztZQUMvQixJQUFJLENBQUMsU0FBUyxHQUFDLElBQUksQ0FBQyxVQUFVLENBQUM7WUFDL0IsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDO1NBQ3RCO2FBQUk7WUFDRCxrQkFBa0I7U0FDckI7SUFDTCxDQUFDO0lBelVnQixVQUFVO1FBRDlCLE9BQU87T0FDYSxVQUFVLENBMlU5QjtJQUFELGlCQUFDO0NBM1VELEFBMlVDLENBM1V1QyxjQUFJLEdBMlUzQztrQkEzVW9CLFVBQVUiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBHYW1lU3RhdGUgfSBmcm9tIFwiLi4vLi4vQ29uc3RhbnRzXCI7XHJcbmltcG9ydCB7IEVuZW15X1N0YXRlIH0gZnJvbSBcIi4uLy4uL0VuZW15L0VuZW15Q29uZmlnXCI7XHJcbmltcG9ydCB7IEdhbWVFZmZlY3RzTWFuYWdlciwgR2FtZUVmZmVjdElkIH0gZnJvbSBcIi4uLy4uL0dhbWUvR2FtZUVmZmVjdHNNYW5hZ2VyXCI7XHJcbmltcG9ydCBHYW1lTWFuYWdlciBmcm9tIFwiLi4vLi4vR2FtZU1hbmFnZXJcIjtcclxuaW1wb3J0IHsgQnVmZkRhdGEgfSBmcm9tIFwiLi4vLi4vSGVyby9HYW1lL0J1ZmZEYXRhXCI7XHJcbmltcG9ydCB7IERhbWFnZVR5cGUsIEJ1ZmZJZCwgQnVmZlR5cGUgfSBmcm9tIFwiLi4vLi4vSGVyby9HYW1lL0hlcm9Db25maWdcIjtcclxuaW1wb3J0IHsgS2V5RnJhbWVEYXRhLCBTdHJlbmd0aFR5cGUgfSBmcm9tIFwiLi4vLi4vTW9uc3Rlci9Nb25zdGVyRGF0YVwiO1xyXG5pbXBvcnQgTW9uc3Rlck1hbmFnZXIgZnJvbSBcIi4uLy4uL01vbnN0ZXIvTW9uc3Rlck1hbmFnZXJcIjtcclxuaW1wb3J0IHsgU291bmRJbmRleCB9IGZyb20gXCIuLi8uLi9Tb3VuZC9BdWRpb0NvbnN0YW50c1wiO1xyXG5pbXBvcnQgTXlUb29sIGZyb20gXCIuLi8uLi9Ub29scy9NeVRvb2xcIjtcclxuaW1wb3J0IHsgV2FsbFR5cGUgfSBmcm9tIFwiLi4vLi4vV2FsbC9XYWxsQ29uZmlnXCI7XHJcbmltcG9ydCBXYWxsTWFuYWdlciBmcm9tIFwiLi4vLi4vV2FsbC9XYWxsTWFuYWdlclwiO1xyXG5pbXBvcnQgQm9zcyBmcm9tIFwiLi4vQm9zc1wiO1xyXG5pbXBvcnQgQm9zc0F0dDMgZnJvbSBcIi4vQm9zc0F0dDNcIjtcclxuaW1wb3J0IFh1ZVlpbiBmcm9tIFwiLi9YdWVZaW5cIjtcclxuXHJcbmVudW0gQW5pbWF0aW9uX05hbWVcclxue1xyXG4gICAgSWRsZSA9IFwiSWRsZVwiLCAgICAgICAvLy0tIOato+mdouW+heaculxyXG4gICAgYXR0YWNrMSA9IFwiQXR0YWNrMVwiLCAgICAgICAgICAvLy0tIOaUu+WHuzFcclxuICAgIHJ1biA9IFwiUnVuXCIsICAgICAgICAgICAgICAgIC8vLS0g6LeR6LevXHJcbiAgICBodXJ0MSA9IFwiSHVydFwiLCAgICAgICAgICAvLy0tIOWPl+WHuzFcclxuICAgIHNraWxsMSA9IFwiU2tpbGwxXCIsICAgICAgICAgIC8vLS0g5oqA6IO9MVxyXG4gICAgc2tpbGwyXzEgPSBcIlNraWxsMl8xXCIsICAgICAgICAgIC8vLS0g5oqA6IO9Mi0x5byA5aeL6JOE5YqbXHJcbiAgICBza2lsbDJfMiA9IFwiU2tpbGwyXzJcIiwgICAgICAgICAgLy8tLSDmioDog70yLTLok4TliptcclxuICAgIHNraWxsMl8zID0gXCJTa2lsbDJfM1wiLCAgICAgICAgICAvLy0tIOaKgOiDvTItM+iThOWKm+e7k+adn1xyXG4gICAgZGVhZD0gXCJEZWFkXCIsICAgLy/mrbvkuqFcclxufVxyXG5cclxuY29uc3Qge2NjY2xhc3MsIHByb3BlcnR5fSA9IGNjLl9kZWNvcmF0b3I7XHJcblxyXG5AY2NjbGFzc1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBYdWVSZW5Cb3NzIGV4dGVuZHMgQm9zcyB7XHJcbiAgICBcclxuICAgIHh1ZV95aW46WHVlWWluPW51bGw7XHJcbiAgICBpc19hY3RpdmVfc2tpbGxfMjpib29sZWFuPWZhbHNlO1xyXG5cclxuICAgIG9uTG9hZCgpOiB2b2lkIHtcclxuICAgICAgICBzdXBlci5vbkxvYWQoKTtcclxuICAgICAgICBHYW1lRWZmZWN0c01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5hZGRFZmZlY3RQb29sQnlJZChHYW1lRWZmZWN0SWQueHVhbnl1biwyKTtcclxuICAgICAgICBHYW1lRWZmZWN0c01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5hZGRFZmZlY3RQb29sQnlJZChHYW1lRWZmZWN0SWQuYm9zczNfbm9ybWFsX2F0dGFjaywxKTtcclxuICAgICAgICBHYW1lRWZmZWN0c01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5hZGRFZmZlY3RQb29sQnlJZChHYW1lRWZmZWN0SWQuYm9zczNfbm9ybWFsX2F0dGFja19oaXQsMSk7XHJcbiAgICAgICAgR2FtZUVmZmVjdHNNYW5hZ2VyLmdldEluc3RhbmNlKCkuYWRkRWZmZWN0UG9vbEJ5SWQoR2FtZUVmZmVjdElkLmJvc3MzX3NraWxsXzEsMSk7XHJcbiAgICAgICAgR2FtZUVmZmVjdHNNYW5hZ2VyLmdldEluc3RhbmNlKCkuYWRkRWZmZWN0UG9vbEJ5SWQoR2FtZUVmZmVjdElkLmJvc3MzX3NraWxsXzFfaGl0LDEpO1xyXG4gICAgICAgIEdhbWVFZmZlY3RzTWFuYWdlci5nZXRJbnN0YW5jZSgpLmFkZEVmZmVjdFBvb2xCeUlkKEdhbWVFZmZlY3RJZC5ib3NzM19za2lsbF8yLDEpO1xyXG4gICAgICAgIEdhbWVFZmZlY3RzTWFuYWdlci5nZXRJbnN0YW5jZSgpLmFkZEVmZmVjdFBvb2xCeUlkKEdhbWVFZmZlY3RJZC5ib3NzM19za2lsbF8yX2hpdCwxKTtcclxuICAgICAgICBHYW1lRWZmZWN0c01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5hZGRFZmZlY3RQb29sQnlJZChHYW1lRWZmZWN0SWQuYm9zczNfc2tpbGxfMl94dWV5aW4sMSk7XHJcbiAgICAgICAgdGhpcy5hZGREZWF0aENhbGxiYWNrKHRoaXMub25EZWF0aCk7XHJcbiAgICAgICAgdGhpcy5hZGRYdWFuWXVuTGlzdGVuKHRoaXMub25YdWFuWXVuUmVzdWx0KTtcclxuICAgICAgICB0aGlzLmFkZEJvc3NJbml0ZWRMaXN0ZW4odGhpcy5vbkJvc3NJbml0ZWQpO1xyXG4gICAgICAgIHRoaXMuYWRkQ2hhbmdlQm9zc0hwTGlzdGVuKHRoaXMub25DaGFuZ2VIcCk7XHJcbiAgICB9XHJcblxyXG4gICAgb25Cb3NzSW5pdGVkKCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuc3RhcnRJZGxlKCk7XHJcbiAgICAgICAgdGhpcy5ub2RlLnk9MTI4O1xyXG4gICAgfVxyXG5cclxuICAgIG9uQ2hhbmdlSHAobnVtOm51bWJlcil7XHJcbiAgICAgICAgaWYodGhpcy5jdXJfaHA8PXRoaXMubWF4X2hwLzIpe1xyXG4gICAgICAgICAgICBpZih0aGlzLmlzX2FjdGl2ZV9za2lsbF8yPT1mYWxzZSl7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmlzX2FjdGl2ZV9za2lsbF8yPXRydWU7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnN0YXJ0U2tpbGwoMik7XHJcbiAgICAgICAgICAgIH0gICAgICAgICAgICBcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgc3RhcnRJZGxlKCl7ICAgICAgICBcclxuICAgICAgICBzdXBlci5zZXRFbmVteVN0YXRlKEVuZW15X1N0YXRlLnN0YW5kYnkpO1xyXG4gICAgICAgIHN1cGVyLnBsYXlTcGluQW5pbWF0b24oQW5pbWF0aW9uX05hbWUuSWRsZSx0cnVlKTtcclxuICAgICAgICBcclxuICAgIH1cclxuXHJcbiAgICBzdGFydEF0dGFjaygpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLmF0dF9qaXNodT0wO1xyXG4gICAgICAgIHN1cGVyLnNldEVuZW15U3RhdGUoRW5lbXlfU3RhdGUuYXR0KTtcclxuICAgICAgICBsZXQgZGF0YT1uZXcgS2V5RnJhbWVEYXRhKCk7XHJcbiAgICAgICAgZGF0YS5uYW1lPSdBdHRhY2snO1xyXG4gICAgICAgIGRhdGEuY2FsbGJhY2s9KCk9PnsgIFxyXG4gICAgICAgICAgICB0aGlzLmF0dF9qaXNodT0wO1xyXG4gICAgICAgICAgICBHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNvdW5kX21hbmFnZXIucGxheVNvdW5kKFNvdW5kSW5kZXguWVhfQm9zczNBdHRhY2spO1xyXG4gICAgICAgICAgICBsZXQgbm9kZT1HYW1lRWZmZWN0c01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5jcmVhdGVHYW1lRWZmZWN0QnlJZChHYW1lRWZmZWN0SWQuYm9zczNfbm9ybWFsX2F0dGFjayxzdXBlci5nZXRBdHRQb3MoKSk7XHJcbiAgICAgICAgICAgIGxldCBzdGFydEVuZFBvcz1jYy52MihHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLmNoYXJQb3NYLEdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuZW5lbXlfYXR0X3kpO1xyXG4gICAgICAgICAgICBsZXQgb2Zmc2V0UG9zPXN0YXJ0RW5kUG9zLnN1Yihub2RlLmdldFBvc2l0aW9uKCkpO1xyXG4gICAgICAgICAgICBsZXQgZGlyPU1hdGguYXRhbjIob2Zmc2V0UG9zLnksb2Zmc2V0UG9zLngpO1xyXG4gICAgICAgICAgICBub2RlLmdldENvbXBvbmVudChCb3NzQXR0MykuaW5pdChzdXBlci5nZXRBdHREYXRhKERhbWFnZVR5cGUuTm9ybWFsLHRydWUsMCksR2FtZUVmZmVjdElkLmJvc3MzX25vcm1hbF9hdHRhY2ssMTIwMCxkaXIsdGhpcy5ub2RlLnksMjcwKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgc3VwZXIucGxheVNwaW5BbmltYXRvbigoQW5pbWF0aW9uX05hbWUuYXR0YWNrMSksZmFsc2UsZGF0YSwoKT0+e1xyXG4gICAgICAgICAgICBpZih0aGlzLnNraWxsX3F1ZXVlLmxlbmd0aD4wKXtcclxuICAgICAgICAgICAgICAgIHN1cGVyLnNldEVuZW15U3RhdGUoRW5lbXlfU3RhdGUuc3RhbmRieSk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnN0YXJ0U2tpbGwodGhpcy5za2lsbF9xdWV1ZS5zaGlmdCgpKTtcclxuICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnN0YXJ0SWRsZSgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSlcclxuICAgIH1cclxuICAgIHN0YXJ0U2tpbGwoc2tpbGxJbmRleDpudW1iZXIpe1xyXG4gICAgICAgIHN3aXRjaChza2lsbEluZGV4KXtcclxuICAgICAgICAgICAgY2FzZSAxOntcclxuICAgICAgICAgICAgICAgIHRoaXMuc3RhcnRTa2lsbDEoKTtcclxuICAgICAgICAgICAgfWJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIDI6e1xyXG4gICAgICAgICAgICAgICAgaWYodGhpcy5pc19hY3RpdmVfc2tpbGxfMil7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zdGFydFNraWxsMigpO1xyXG4gICAgICAgICAgICAgICAgfSAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgfWJyZWFrO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIFxyXG4gICAgLy/ok4TlipvnoLjpm6rnkINcclxuICAgIHN0YXJ0U2tpbGwxKCl7XHJcbiAgICAgICAgdGhpcy5za2lsbF9jb2xkX2Rvd25bMF09dGhpcy5za2lsbF9kYXRhLmdldFNraWxsQ29sZERvd24oMSk7XHJcbiAgICAgICAgaWYoc3VwZXIuZ2V0RW5lbXlTdGF0ZSgpIT1FbmVteV9TdGF0ZS5hdHQmJnN1cGVyLmdldEVuZW15U3RhdGUoKSE9RW5lbXlfU3RhdGUuc2tpbGwpe1xyXG4gICAgICAgICAgICBpZighc3VwZXIuaXNIYXZlRGVCdWZmKEJ1ZmZJZC5IZXJvX1h1YW5ZdW4pKXtcclxuICAgICAgICAgICAgICAgIHN1cGVyLnNldEVuZW15U3RhdGUoRW5lbXlfU3RhdGUuc2tpbGwpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5za2lsbF9jb2xkX2Rvd25bMF09dGhpcy5za2lsbF9kYXRhLmdldFNraWxsQ29sZERvd24oMSk7XHJcbiAgICAgICAgICAgICAgICBsZXQgZGF0YT1uZXcgS2V5RnJhbWVEYXRhKCk7XHJcbiAgICAgICAgICAgICAgICBkYXRhLm5hbWU9J1NraWxsJztcclxuICAgICAgICAgICAgICAgIGRhdGEuY2FsbGJhY2s9KCk9PnsgIFxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYXR0X2ppc2h1PTA7ICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICBsZXQgbm9kZT1HYW1lRWZmZWN0c01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5jcmVhdGVHYW1lRWZmZWN0QnlJZChHYW1lRWZmZWN0SWQuYm9zczNfc2tpbGxfMSxzdXBlci5nZXRBdHRQb3MoKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IHRzcz1ub2RlLmdldENvbXBvbmVudChCb3NzQXR0Myk7XHJcbiAgICAgICAgICAgICAgICAgICAgdHNzLmluaXQoc3VwZXIuZ2V0QXR0RGF0YShEYW1hZ2VUeXBlLlNraWxsLHRydWUsdGhpcy5za2lsbF9kYXRhLmdldFNraWxsVmFsdWUxKDEpKSxHYW1lRWZmZWN0SWQuYm9zczNfc2tpbGxfMSwxMjAwLE1hdGguUEkqMy8yLHRoaXMubm9kZS55LDI3MCk7XHJcbiAgICAgICAgICAgICAgICAgICAgdHNzLnNldEJ1ZmZEYXRhKHRoaXMuc2tpbGxfZGF0YS5nZXRTa2lsbFZhbHVlMygxKSx0aGlzLnNraWxsX2RhdGEuZ2V0U2tpbGxWYWx1ZTIoMSkpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgc3VwZXIucGxheVNwaW5BbmltYXRvbigoQW5pbWF0aW9uX05hbWUuc2tpbGwxKSxmYWxzZSxkYXRhLCgpPT57XHJcbiAgICAgICAgICAgICAgICAgICAgaWYodGhpcy5za2lsbF9xdWV1ZS5sZW5ndGg+MCl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHN1cGVyLnNldEVuZW15U3RhdGUoRW5lbXlfU3RhdGUuc3RhbmRieSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc3RhcnRTa2lsbCh0aGlzLnNraWxsX3F1ZXVlLnNoaWZ0KCkpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnN0YXJ0SWRsZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgaWYodGhpcy5za2lsbF9xdWV1ZS5pbmRleE9mKDEpPDApe1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2tpbGxfcXVldWUucHVzaCgxKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICBpZih0aGlzLnNraWxsX3F1ZXVlLmluZGV4T2YoMSk8MCl7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNraWxsX3F1ZXVlLnB1c2goMSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICAvL+mYsuW+oVxyXG4gICAgc3RhcnRTa2lsbDIoKXtcclxuICAgICAgICB0aGlzLnNraWxsX2NvbGRfZG93blsxXT10aGlzLnNraWxsX2RhdGEuZ2V0U2tpbGxDb2xkRG93bigyKTtcclxuICAgICAgICBpZihzdXBlci5nZXRFbmVteVN0YXRlKCkhPUVuZW15X1N0YXRlLmF0dCYmc3VwZXIuZ2V0RW5lbXlTdGF0ZSgpIT1FbmVteV9TdGF0ZS5za2lsbCl7XHJcbiAgICAgICAgICAgIGlmKCFzdXBlci5pc0hhdmVEZUJ1ZmYoQnVmZklkLkhlcm9fWHVhbll1bikpe1xyXG4gICAgICAgICAgICAgICAgR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zb3VuZF9tYW5hZ2VyLnBsYXlTb3VuZChTb3VuZEluZGV4LllYX0Jvc3MzU2tpbGwxeHVsaSk7XHJcbiAgICAgICAgICAgICAgICBzdXBlci5zZXRFbmVteVN0YXRlKEVuZW15X1N0YXRlLnNraWxsKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2tpbGxfY29sZF9kb3duWzFdPXRoaXMuc2tpbGxfZGF0YS5nZXRTa2lsbENvbGREb3duKDIpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jdXJfdG91Z2huZXNzKz0xO1xyXG4gICAgICAgICAgICAgICAgc3VwZXIucGxheVNwaW5BbmltYXRvbigoQW5pbWF0aW9uX05hbWUuc2tpbGwyXzEpLGZhbHNlLG51bGwsKCk9PntcclxuICAgICAgICAgICAgICAgICAgICBzdXBlci5wbGF5U3BpbkFuaW1hdG9uKChBbmltYXRpb25fTmFtZS5za2lsbDJfMiksdHJ1ZSxudWxsLG51bGwpO1xyXG4gICAgICAgICAgICAgICAgICAgIC8v5b6q546vNeenkiAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgLy/mt7vliqBidWZmXHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IGJ1ZmZEYXRhPW5ldyBCdWZmRGF0YSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIGJ1ZmZEYXRhLmJ1ZmZfaWQ9QnVmZklkLkJvc3MzX01pYW5ZaV9Lb25nWmhpO1xyXG4gICAgICAgICAgICAgICAgICAgIGJ1ZmZEYXRhLnJlbWFpbl90aW1lPTU7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IGJ1ZmY9c3VwZXIuYWRkQnVmZihidWZmRGF0YSk7XHJcbiAgICAgICAgICAgICAgICAgICAgYnVmZi5hZGREZXN0cm95TGlzdGVuKHRoaXMub25Ta2lsbEJ1ZmZEZXN0b3J5LmJpbmQodGhpcykpO1xyXG4gICAgICAgICAgICAgICAgICAgIC8v5re75Yqg6Zuq5Y2wXHJcbiAgICAgICAgICAgICAgICAgICAgYnVmZi5hZGRGbG9vckxpc3Rlbih0aGlzLm9uQWRkRmxvb3IuYmluZCh0aGlzKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IGhwUm9vdD1jYy5maW5kKCdDYW52YXMvVWlfUm9vdC90b3BfdWkvQm9zc0hwUm9vdCcpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMueHVlX3lpbj1HYW1lRWZmZWN0c01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5jcmVhdGVHYW1lRWZmZWN0Rm9yUGFyZW50KEdhbWVFZmZlY3RJZC5ib3NzM19za2lsbF8yX3h1ZXlpbixjYy52MigwLDApLGhwUm9vdCkuZ2V0Q29tcG9uZW50KFh1ZVlpbik7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy54dWVfeWluLnNldEZsb29yKDApO1xyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICBpZih0aGlzLnNraWxsX3F1ZXVlLmluZGV4T2YoMik8MCl7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5za2lsbF9xdWV1ZS5wdXNoKDIpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgIGlmKHRoaXMuc2tpbGxfcXVldWUuaW5kZXhPZigyKTwwKXtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2tpbGxfcXVldWUucHVzaCgyKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIC8qKlxyXG4gICAgICogXHJcbiAgICAgKiBAcGFyYW0gZmxvb3Ig5b2T5YmN55qE5bGC5pWwXHJcbiAgICAgKi9cclxuICAgIG9uQWRkRmxvb3IoZmxvb3I6bnVtYmVyKXtcclxuICAgICAgICBsZXQgbnVtPWZsb29yLTE7XHJcbiAgICAgICAgaWYodGhpcy54dWVfeWluKXtcclxuICAgICAgICAgICAgdGhpcy54dWVfeWluLnNldEZsb29yKG51bSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIFxyXG4gICAgfVxyXG5cclxuICAgIC8qKkJ1ZmbplIDmr4Hml7blm57osIPvvIxudW3vvJpidWZm5Y+g5Yqg55qE5bGC5pWwICovXHJcbiAgICBvblNraWxsQnVmZkRlc3RvcnkoYnVmZkRhdGE6QnVmZkRhdGEpeyAgICAgICAgXHJcbiAgICAgICAgdGhpcy5za2lsbF9jb2xkX2Rvd25bMV09dGhpcy5za2lsbF9kYXRhLmdldFNraWxsQ29sZERvd24oMik7XHJcbiAgICAgICAgbGV0IG51bT1idWZmRGF0YS5jdXJfZmxvb3ItMTtcclxuICAgICAgICBpZihudW0+MCl7XHJcbiAgICAgICAgICAgIC8v5Y+N5Ye7XHJcbiAgICAgICAgICAgIHN1cGVyLnNldEVuZW15U3RhdGUoRW5lbXlfU3RhdGUuc2tpbGwpO1xyXG4gICAgICAgICAgICBsZXQgZGF0YT1uZXcgS2V5RnJhbWVEYXRhKCk7XHJcbiAgICAgICAgICAgIGRhdGEubmFtZT0nU2tpbGwyJztcclxuICAgICAgICAgICAgZGF0YS5jYWxsYmFjaz0oKT0+eyAgXHJcbiAgICAgICAgICAgICAgICB0aGlzLmF0dF9qaXNodT0wO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zdGFydFNraWxsMkxhbnVjaChudW0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHN1cGVyLnBsYXlTcGluQW5pbWF0b24oKEFuaW1hdGlvbl9OYW1lLnNraWxsMl8zKSxmYWxzZSxkYXRhLCgpPT57XHJcbiAgICAgICAgICAgICAgICB0aGlzLmN1cl90b3VnaG5lc3MtPTE7XHJcbiAgICAgICAgICAgICAgICBHYW1lRWZmZWN0c01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5kZXN0cm95R2FtZUVmZmVjdEJ5SWQoR2FtZUVmZmVjdElkLmJvc3MzX3NraWxsXzJfeHVleWluLHRoaXMueHVlX3lpbi5ub2RlKTtcclxuICAgICAgICAgICAgICAgIHRoaXMueHVlX3lpbj1udWxsO1xyXG4gICAgICAgICAgICAgICAgaWYodGhpcy5za2lsbF9xdWV1ZS5sZW5ndGg+MCl7XHJcbiAgICAgICAgICAgICAgICAgICAgc3VwZXIuc2V0RW5lbXlTdGF0ZShFbmVteV9TdGF0ZS5zdGFuZGJ5KTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnN0YXJ0U2tpbGwodGhpcy5za2lsbF9xdWV1ZS5zaGlmdCgpKTtcclxuICAgICAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc3RhcnRJZGxlKCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgIHRoaXMuY3VyX3RvdWdobmVzcy09MTtcclxuICAgICAgICAgICAgR2FtZUVmZmVjdHNNYW5hZ2VyLmdldEluc3RhbmNlKCkuZGVzdHJveUdhbWVFZmZlY3RCeUlkKEdhbWVFZmZlY3RJZC5ib3NzM19za2lsbF8yX3h1ZXlpbix0aGlzLnh1ZV95aW4ubm9kZSk7XHJcbiAgICAgICAgICAgIHRoaXMueHVlX3lpbj1udWxsO1xyXG4gICAgICAgICAgICBpZih0aGlzLnNraWxsX3F1ZXVlLmxlbmd0aD4wKXtcclxuICAgICAgICAgICAgICAgIHN1cGVyLnNldEVuZW15U3RhdGUoRW5lbXlfU3RhdGUuc3RhbmRieSk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnN0YXJ0U2tpbGwodGhpcy5za2lsbF9xdWV1ZS5zaGlmdCgpKTtcclxuICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnN0YXJ0SWRsZSgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHN0YXJ0U2tpbGwyTGFudWNoKG51bTpudW1iZXIpeyAgICAgICAgXHJcbiAgICAgICAgTXlUb29sLnJhbmRvbVNjZW5lU2hha2VCaWcoKTsgICAgICAgIFxyXG4gICAgICAgIC8v5Yib5bu65Y+R5bCE55qE5Yaw5p+xXHJcbiAgICAgICAgbGV0IGhpdE51bT0wO1xyXG4gICAgICAgIGZvcihsZXQgaT0wOyBpPDU7IGkrKyl7XHJcbiAgICAgICAgICAgIGxldCBjcmVhdGVCaW5nWmh1PSgpPT57ICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgLy/msYLngrlcclxuICAgICAgICAgICAgICAgIGxldCBwb3NYPWkqMTQ0LTI4ODtcclxuICAgICAgICAgICAgICAgIGxldCBwb3NZPUdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuZW5lbXlfYXR0X3ktTWF0aC5yYW5kb20oKSoyMDAtMTAwO1xyXG4gICAgICAgICAgICAgICAgbGV0IHN0YXJ0UG9zPWNjLnYyKHBvc1gsMTY4MCtwb3NZKTtcclxuICAgICAgICAgICAgICAgIGxldCBlbmRQb3M9Y2MudjIocG9zWCxwb3NZKTtcclxuICAgICAgICAgICAgICAgIC8vbGV0IG9mZnNldFBvcz1lbmRQb3Muc3ViKHN0YXJ0UG9zKTtcclxuICAgICAgICAgICAgICAgIC8vbGV0IGFuZ2xlPU15VG9vbC5yYWRpYW5Ub0FuZ2xlKE1hdGguYXRhbjIob2Zmc2V0UG9zLnksb2Zmc2V0UG9zLngpKSs5MDtcclxuICAgICAgICAgICAgICAgIGxldCBiaW5nemh1PUdhbWVFZmZlY3RzTWFuYWdlci5nZXRJbnN0YW5jZSgpLmNyZWF0ZUdhbWVFZmZlY3RCeUlkKEdhbWVFZmZlY3RJZC5ib3NzM19za2lsbF8yLHN0YXJ0UG9zKTsgIFxyXG4gICAgICAgICAgICAgICAgY2MudHdlZW4oYmluZ3podSkudG8oTWF0aC5yYW5kb20oKSowLjIrMC4yLHt4OmVuZFBvcy54LHk6ZW5kUG9zLnl9KS5jYWxsKChub2RlOmNjLk5vZGUpPT57XHJcbiAgICAgICAgICAgICAgICAgICAgR2FtZUVmZmVjdHNNYW5hZ2VyLmdldEluc3RhbmNlKCkuZGVzdHJveUdhbWVFZmZlY3RCeUlkKEdhbWVFZmZlY3RJZC5ib3NzM19za2lsbF8yLG5vZGUpO1xyXG4gICAgICAgICAgICAgICAgICAgIEdhbWVFZmZlY3RzTWFuYWdlci5nZXRJbnN0YW5jZSgpLmNyZWF0ZUdhbWVFZmZlY3RCeUlkKEdhbWVFZmZlY3RJZC5ib3NzM19za2lsbF8yX2hpdCxub2RlLmdldFBvc2l0aW9uKCkpOyBcclxuICAgICAgICAgICAgICAgICAgICBoaXROdW0rKztcclxuICAgICAgICAgICAgICAgICAgICBpZihoaXROdW09PTMpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvL+ecqeaZlSvkvKTlrrNcclxuICAgICAgICAgICAgICAgICAgICAgICAgR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5hbGxfaGVyby5mb3JFYWNoKCh2LGspPT57XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgYnVmZkRhdGE9bmV3IEJ1ZmZEYXRhKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBidWZmRGF0YS5idWZmX2lkPUJ1ZmZJZC5Nb25zdGVyX1h1YW5ZdW47XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBidWZmRGF0YS5nYW1lX2VmZmVjdF9pZD1HYW1lRWZmZWN0SWQueHVhbnl1bjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJ1ZmZEYXRhLnJlbWFpbl90aW1lPTIrbnVtKnRoaXMuc2tpbGxfZGF0YS5nZXRTa2lsbFZhbHVlMygxKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJ1ZmZEYXRhLmJ1ZmZfdHlwZT1CdWZmVHlwZS5WZXJ0aWdvO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdi5hZGREZUJ1ZmYoYnVmZkRhdGEpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgYXR0RGF0YT10aGlzLmdldEF0dERhdGEoRGFtYWdlVHlwZS5Ta2lsbCxmYWxzZSx0aGlzLnNraWxsX2RhdGEuZ2V0U2tpbGxWYWx1ZTEoMSkpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGF0dERhdGEuemVuZ3NoYW5nX3JhdGU9dGhpcy5za2lsbF9kYXRhLmdldFNraWxsVmFsdWUyKDEpKm51bTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgV2FsbE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRNYWluV2FsbCgpLmJlSW5qdXJlZChhdHREYXRhKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KS5zdGFydCgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMuc2NoZWR1bGVPbmNlKGNyZWF0ZUJpbmdaaHUsTWF0aC5yYW5kb20oKSowLjIrMC4xKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgb25EZWF0aCgpIHtcclxuICAgICAgICB0aGlzLnVuc2NoZWR1bGVBbGxDYWxsYmFja3MoKTtcclxuICAgICAgICBzdXBlci5wbGF5RGVhZEFuaW1hdG9uKEFuaW1hdGlvbl9OYW1lLmRlYWQsKCk9PntcclxuICAgICAgICAgICAgdGhpcy5yZW1vdmVBbGxEZUJ1ZmYoKTtcclxuICAgICAgICAgICAgdGhpcy5yZW1vdmVBbGxCdWZmKCk7XHJcbiAgICAgICAgICAgIGlmKHRoaXMuc2hhZG93KXtcclxuICAgICAgICAgICAgICAgIGNjLnR3ZWVuKHRoaXMuc2hhZG93KS50bygwLjc1LHtvcGFjaXR5OjB9KS5zdGFydCgpO1xyXG4gICAgICAgICAgICB9ICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIGNjLnR3ZWVuKHRoaXMubm9kZSkudG8oMC43NSx7b3BhY2l0eTowfSkuY2FsbCgoKT0+e1xyXG4gICAgICAgICAgICAgICAgdGhpcy5yZW1vdmVBbGxEZUJ1ZmYoKTtcclxuICAgICAgICAgICAgICAgIHRoaXMucmVtb3ZlQWxsQnVmZigpO1xyXG4gICAgICAgICAgICAgICAgTW9uc3Rlck1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5kZXN0cm95TW9uc3Rlcih0aGlzLm5vZGUsdGhpcy5tb25zdGVyX3R5cGUpO1xyXG4gICAgICAgICAgICB9KS5zdGFydCgpO1xyXG4gICAgICAgIH0pXHJcbiAgICAgICAgLy9HYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNvdW5kX21hbmFnZXIucGxheVNvdW5kKFNvdW5kSW5kZXgucmV3YXJkQm94Mik7XHJcbiAgICAgICAgaWYodGhpcy54dWVfeWluKXtcclxuICAgICAgICAgICAgR2FtZUVmZmVjdHNNYW5hZ2VyLmdldEluc3RhbmNlKCkuZGVzdHJveUdhbWVFZmZlY3RCeUlkKEdhbWVFZmZlY3RJZC5ib3NzM19za2lsbF8yX3h1ZXlpbix0aGlzLnh1ZV95aW4ubm9kZSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIFxyXG4gICAgICAgIC8v5Yig6ZmkXHJcbiAgICAgICAgLy8gaWYodGhpcy5ib3NzX3NoaWVsZCl7XHJcbiAgICAgICAgLy8gICAgIHRoaXMuYm9zc19zaGllbGQuZGVzdG9yeVNoaWVsZCgpO1xyXG4gICAgICAgIC8vIH0gICAgICAgIFxyXG4gICAgfVxyXG5cclxuICAgIG9uWHVhbll1blJlc3VsdChpc1h1YW5ZdW46Ym9vbGVhbil7XHJcbiAgICAgICAgaWYoaXNYdWFuWXVuKXtcclxuICAgICAgICAgICAgdGhpcy5zdGFydFh1YW5ZdW4oKTtcclxuICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgaWYoIXN1cGVyLmlzSGF2ZURlQnVmZlR5cGUoQnVmZlR5cGUuVmVydGlnbykpe1xyXG4gICAgICAgICAgICAgICAgaWYoIXN1cGVyLmdldElzRGllKCkpe1xyXG4gICAgICAgICAgICAgICAgICAgIGlmKHRoaXMuc2tpbGxfcXVldWUubGVuZ3RoPjApe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzdXBlci5zZXRFbmVteVN0YXRlKEVuZW15X1N0YXRlLnN0YW5kYnkpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnN0YXJ0U2tpbGwodGhpcy5za2lsbF9xdWV1ZS5zaGlmdCgpKTtcclxuICAgICAgICAgICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zdGFydElkbGUoKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgc3RhcnRYdWFuWXVuKCl7XHJcbiAgICAgICAgc3VwZXIucGxheVNwaW5BbmltYXRvbihBbmltYXRpb25fTmFtZS5odXJ0MSxmYWxzZSxudWxsLCgpPT57XHJcbiAgICAgICAgICAgIGlmKHN1cGVyLmlzSGF2ZURlQnVmZlR5cGUoQnVmZlR5cGUuVmVydGlnbykmJiFzdXBlci5nZXRJc0RpZSgpKVxyXG4gICAgICAgICAgICAgICAgdGhpcy5zcGluZS5wYXVzZWQ9dHJ1ZTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuICAgIFxyXG4gICAgdXBkYXRlKGR0KVxyXG4gICAge1xyXG4gICAgICAgIGlmKChHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLmN1cl9nYW1lX3N0YXRlIT1HYW1lU3RhdGUuR2FtZV9QbGF5aW5nKXx8dGhpcy5nZXRJc0RpZSgpKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICBzdXBlci51cGRhdGUoZHQpO1xyXG4gICAgICAgIHRoaXMuY2hlY2tTa2lsbChkdCk7XHJcbiAgICAgICAgaWYodGhpcy5nZXRFbmVteVN0YXRlKCkhPUVuZW15X1N0YXRlLnNraWxsJiZ0aGlzLmdldEVuZW15U3RhdGUoKSAhPSBFbmVteV9TdGF0ZS5hdHQpe1xyXG4gICAgICAgICAgICBpZighdGhpcy5pc0hhdmVEZUJ1ZmYoQnVmZklkLkhlcm9fWHVhbll1bikpe1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jaGVja0F0dChkdCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoq5oqA6IO95qOA5rWLICovXHJcbiAgICBjaGVja1NraWxsKGR0Om51bWJlcil7XHJcbiAgICAgICAgZm9yKGxldCBpPTA7IGk8dGhpcy5za2lsbF9jb2xkX2Rvd24ubGVuZ3RoOyBpKyspe1xyXG4gICAgICAgICAgICBpZihpPT0xKXtcclxuICAgICAgICAgICAgICAgIC8v56ys5LqM5Liq5oqA6IO9XHJcbiAgICAgICAgICAgICAgICBpZih0aGlzLmlzX2FjdGl2ZV9za2lsbF8yPT1mYWxzZSl7XHJcbiAgICAgICAgICAgICAgICAgICAgY29udGludWU7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYodGhpcy5za2lsbF9jb2xkX2Rvd25baV0+MCl7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNraWxsX2NvbGRfZG93bltpXS09ZHQ7XHJcbiAgICAgICAgICAgICAgICBpZih0aGlzLnNraWxsX2NvbGRfZG93bltpXTwwKXtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnNraWxsX2NvbGRfZG93bltpXT0wO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc3RhcnRTa2lsbChpKzEpO1xyXG4gICAgICAgICAgICAgICAgfSAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAvLyBlbHNle1xyXG4gICAgICAgICAgICAvLyAgICAgdGhpcy5zdGFydFNraWxsKGkrMSk7XHJcbiAgICAgICAgICAgIC8vIH1cclxuICAgICAgICB9ICAgICAgICAgICAgICAgIFxyXG4gICAgfVxyXG5cclxuICAgIC8qKuaUu+WHu+iuoeeulyAqL1xyXG4gICAgY2hlY2tBdHQoZHQ6bnVtYmVyKXsgICAgICAgIFxyXG4gICAgICAgIHRoaXMuYXR0X2ppc2h1Kz1kdDtcclxuICAgICAgICBpZih0aGlzLmF0dF9qaXNodT49dGhpcy5hdHRfamlhbmdlKXtcclxuICAgICAgICAgICAgdGhpcy5hdHRfamlzaHU9dGhpcy5hdHRfamlhbmdlO1xyXG4gICAgICAgICAgICB0aGlzLnN0YXJ0QXR0YWNrKCk7XHJcbiAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgIC8vdGhpcy5tb3ZpbmcoZHQpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIFxyXG59XHJcbiJdfQ==