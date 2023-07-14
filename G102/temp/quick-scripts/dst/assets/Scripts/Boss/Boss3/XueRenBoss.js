
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
            node.getComponent(BossAtt3_1.default).init(_super.prototype.getAttData.call(_this, HeroConfig_1.DamageType.Normal, true, 0), GameEffectsManager_1.GameEffectId.boss3_normal_attack, 1200, Math.PI * 3 / 2, _this.node.y, 270);
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
        if (this.getEnemyState() != EnemyConfig_1.Enemy_State.skill) {
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0c1xcQm9zc1xcQm9zczNcXFh1ZVJlbkJvc3MudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsNkNBQTRDO0FBQzVDLHVEQUFzRDtBQUN0RCxvRUFBaUY7QUFDakYsaURBQTRDO0FBQzVDLHFEQUFvRDtBQUNwRCx5REFBMEU7QUFDMUUseURBQXVFO0FBQ3ZFLCtEQUEwRDtBQUMxRCw2REFBd0Q7QUFDeEQsNkNBQXdDO0FBRXhDLHNEQUFpRDtBQUNqRCxnQ0FBMkI7QUFDM0IsdUNBQWtDO0FBQ2xDLG1DQUE4QjtBQUU5QixJQUFLLGNBV0o7QUFYRCxXQUFLLGNBQWM7SUFFZiwrQkFBYSxDQUFBO0lBQ2IscUNBQW1CLENBQUE7SUFDbkIsNkJBQVcsQ0FBQTtJQUNYLGdDQUFjLENBQUE7SUFDZCxtQ0FBaUIsQ0FBQTtJQUNqQix1Q0FBcUIsQ0FBQTtJQUNyQix1Q0FBcUIsQ0FBQTtJQUNyQix1Q0FBcUIsQ0FBQTtJQUNyQiwrQkFBWSxDQUFBO0FBQ2hCLENBQUMsRUFYSSxjQUFjLEtBQWQsY0FBYyxRQVdsQjtBQUVLLElBQUEsS0FBc0IsRUFBRSxDQUFDLFVBQVUsRUFBbEMsT0FBTyxhQUFBLEVBQUUsUUFBUSxjQUFpQixDQUFDO0FBRzFDO0lBQXdDLDhCQUFJO0lBQTVDO1FBQUEscUVBd1VDO1FBdFVHLGFBQU8sR0FBUSxJQUFJLENBQUM7UUFDcEIsdUJBQWlCLEdBQVMsS0FBSyxDQUFDOztJQXFVcEMsQ0FBQztJQW5VRywyQkFBTSxHQUFOO1FBQ0ksaUJBQU0sTUFBTSxXQUFFLENBQUM7UUFDZix1Q0FBa0IsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxpQkFBaUIsQ0FBQyxpQ0FBWSxDQUFDLE9BQU8sRUFBQyxDQUFDLENBQUMsQ0FBQztRQUMzRSx1Q0FBa0IsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxpQkFBaUIsQ0FBQyxpQ0FBWSxDQUFDLG1CQUFtQixFQUFDLENBQUMs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Q0FBQyxHQUFDLENBQUMsQ0FBQztvQkFDMUIsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDLEdBQUMsQ0FBQyxDQUFDLENBQUM7aUJBQ3hCO2FBQ0o7WUFDRCxRQUFRO1lBQ1IsNEJBQTRCO1lBQzVCLElBQUk7U0FDUDtJQUNMLENBQUM7SUFFRCxVQUFVO0lBQ1YsNkJBQVEsR0FBUixVQUFTLEVBQVM7UUFDZCxJQUFJLENBQUMsU0FBUyxJQUFFLEVBQUUsQ0FBQztRQUNuQixJQUFHLElBQUksQ0FBQyxTQUFTLElBQUUsSUFBSSxDQUFDLFVBQVUsRUFBQztZQUMvQixJQUFJLENBQUMsU0FBUyxHQUFDLElBQUksQ0FBQyxVQUFVLENBQUM7WUFDL0IsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDO1NBQ3RCO2FBQUk7WUFDRCxrQkFBa0I7U0FDckI7SUFDTCxDQUFDO0lBdFVnQixVQUFVO1FBRDlCLE9BQU87T0FDYSxVQUFVLENBd1U5QjtJQUFELGlCQUFDO0NBeFVELEFBd1VDLENBeFV1QyxjQUFJLEdBd1UzQztrQkF4VW9CLFVBQVUiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBHYW1lU3RhdGUgfSBmcm9tIFwiLi4vLi4vQ29uc3RhbnRzXCI7XHJcbmltcG9ydCB7IEVuZW15X1N0YXRlIH0gZnJvbSBcIi4uLy4uL0VuZW15L0VuZW15Q29uZmlnXCI7XHJcbmltcG9ydCB7IEdhbWVFZmZlY3RzTWFuYWdlciwgR2FtZUVmZmVjdElkIH0gZnJvbSBcIi4uLy4uL0dhbWUvR2FtZUVmZmVjdHNNYW5hZ2VyXCI7XHJcbmltcG9ydCBHYW1lTWFuYWdlciBmcm9tIFwiLi4vLi4vR2FtZU1hbmFnZXJcIjtcclxuaW1wb3J0IHsgQnVmZkRhdGEgfSBmcm9tIFwiLi4vLi4vSGVyby9HYW1lL0J1ZmZEYXRhXCI7XHJcbmltcG9ydCB7IERhbWFnZVR5cGUsIEJ1ZmZJZCwgQnVmZlR5cGUgfSBmcm9tIFwiLi4vLi4vSGVyby9HYW1lL0hlcm9Db25maWdcIjtcclxuaW1wb3J0IHsgS2V5RnJhbWVEYXRhLCBTdHJlbmd0aFR5cGUgfSBmcm9tIFwiLi4vLi4vTW9uc3Rlci9Nb25zdGVyRGF0YVwiO1xyXG5pbXBvcnQgTW9uc3Rlck1hbmFnZXIgZnJvbSBcIi4uLy4uL01vbnN0ZXIvTW9uc3Rlck1hbmFnZXJcIjtcclxuaW1wb3J0IHsgU291bmRJbmRleCB9IGZyb20gXCIuLi8uLi9Tb3VuZC9BdWRpb0NvbnN0YW50c1wiO1xyXG5pbXBvcnQgTXlUb29sIGZyb20gXCIuLi8uLi9Ub29scy9NeVRvb2xcIjtcclxuaW1wb3J0IHsgV2FsbFR5cGUgfSBmcm9tIFwiLi4vLi4vV2FsbC9XYWxsQ29uZmlnXCI7XHJcbmltcG9ydCBXYWxsTWFuYWdlciBmcm9tIFwiLi4vLi4vV2FsbC9XYWxsTWFuYWdlclwiO1xyXG5pbXBvcnQgQm9zcyBmcm9tIFwiLi4vQm9zc1wiO1xyXG5pbXBvcnQgQm9zc0F0dDMgZnJvbSBcIi4vQm9zc0F0dDNcIjtcclxuaW1wb3J0IFh1ZVlpbiBmcm9tIFwiLi9YdWVZaW5cIjtcclxuXHJcbmVudW0gQW5pbWF0aW9uX05hbWVcclxue1xyXG4gICAgSWRsZSA9IFwiSWRsZVwiLCAgICAgICAvLy0tIOato+mdouW+heaculxyXG4gICAgYXR0YWNrMSA9IFwiQXR0YWNrMVwiLCAgICAgICAgICAvLy0tIOaUu+WHuzFcclxuICAgIHJ1biA9IFwiUnVuXCIsICAgICAgICAgICAgICAgIC8vLS0g6LeR6LevXHJcbiAgICBodXJ0MSA9IFwiSHVydFwiLCAgICAgICAgICAvLy0tIOWPl+WHuzFcclxuICAgIHNraWxsMSA9IFwiU2tpbGwxXCIsICAgICAgICAgIC8vLS0g5oqA6IO9MVxyXG4gICAgc2tpbGwyXzEgPSBcIlNraWxsMl8xXCIsICAgICAgICAgIC8vLS0g5oqA6IO9Mi0x5byA5aeL6JOE5YqbXHJcbiAgICBza2lsbDJfMiA9IFwiU2tpbGwyXzJcIiwgICAgICAgICAgLy8tLSDmioDog70yLTLok4TliptcclxuICAgIHNraWxsMl8zID0gXCJTa2lsbDJfM1wiLCAgICAgICAgICAvLy0tIOaKgOiDvTItM+iThOWKm+e7k+adn1xyXG4gICAgZGVhZD0gXCJEZWFkXCIsICAgLy/mrbvkuqFcclxufVxyXG5cclxuY29uc3Qge2NjY2xhc3MsIHByb3BlcnR5fSA9IGNjLl9kZWNvcmF0b3I7XHJcblxyXG5AY2NjbGFzc1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBYdWVSZW5Cb3NzIGV4dGVuZHMgQm9zcyB7XHJcbiAgICBcclxuICAgIHh1ZV95aW46WHVlWWluPW51bGw7XHJcbiAgICBpc19hY3RpdmVfc2tpbGxfMjpib29sZWFuPWZhbHNlO1xyXG5cclxuICAgIG9uTG9hZCgpOiB2b2lkIHtcclxuICAgICAgICBzdXBlci5vbkxvYWQoKTtcclxuICAgICAgICBHYW1lRWZmZWN0c01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5hZGRFZmZlY3RQb29sQnlJZChHYW1lRWZmZWN0SWQueHVhbnl1biwyKTtcclxuICAgICAgICBHYW1lRWZmZWN0c01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5hZGRFZmZlY3RQb29sQnlJZChHYW1lRWZmZWN0SWQuYm9zczNfbm9ybWFsX2F0dGFjaywxKTtcclxuICAgICAgICBHYW1lRWZmZWN0c01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5hZGRFZmZlY3RQb29sQnlJZChHYW1lRWZmZWN0SWQuYm9zczNfbm9ybWFsX2F0dGFja19oaXQsMSk7XHJcbiAgICAgICAgR2FtZUVmZmVjdHNNYW5hZ2VyLmdldEluc3RhbmNlKCkuYWRkRWZmZWN0UG9vbEJ5SWQoR2FtZUVmZmVjdElkLmJvc3MzX3NraWxsXzEsMSk7XHJcbiAgICAgICAgR2FtZUVmZmVjdHNNYW5hZ2VyLmdldEluc3RhbmNlKCkuYWRkRWZmZWN0UG9vbEJ5SWQoR2FtZUVmZmVjdElkLmJvc3MzX3NraWxsXzFfaGl0LDEpO1xyXG4gICAgICAgIEdhbWVFZmZlY3RzTWFuYWdlci5nZXRJbnN0YW5jZSgpLmFkZEVmZmVjdFBvb2xCeUlkKEdhbWVFZmZlY3RJZC5ib3NzM19za2lsbF8yLDEpO1xyXG4gICAgICAgIEdhbWVFZmZlY3RzTWFuYWdlci5nZXRJbnN0YW5jZSgpLmFkZEVmZmVjdFBvb2xCeUlkKEdhbWVFZmZlY3RJZC5ib3NzM19za2lsbF8yX2hpdCwxKTtcclxuICAgICAgICBHYW1lRWZmZWN0c01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5hZGRFZmZlY3RQb29sQnlJZChHYW1lRWZmZWN0SWQuYm9zczNfc2tpbGxfMl94dWV5aW4sMSk7XHJcbiAgICAgICAgdGhpcy5hZGREZWF0aENhbGxiYWNrKHRoaXMub25EZWF0aCk7XHJcbiAgICAgICAgdGhpcy5hZGRYdWFuWXVuTGlzdGVuKHRoaXMub25YdWFuWXVuUmVzdWx0KTtcclxuICAgICAgICB0aGlzLmFkZEJvc3NJbml0ZWRMaXN0ZW4odGhpcy5vbkJvc3NJbml0ZWQpO1xyXG4gICAgICAgIHRoaXMuYWRkQ2hhbmdlQm9zc0hwTGlzdGVuKHRoaXMub25DaGFuZ2VIcCk7XHJcbiAgICB9XHJcblxyXG4gICAgb25Cb3NzSW5pdGVkKCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuc3RhcnRJZGxlKCk7XHJcbiAgICAgICAgdGhpcy5ub2RlLnk9MTI4O1xyXG4gICAgfVxyXG5cclxuICAgIG9uQ2hhbmdlSHAobnVtOm51bWJlcil7XHJcbiAgICAgICAgaWYodGhpcy5jdXJfaHA8PXRoaXMubWF4X2hwLzIpe1xyXG4gICAgICAgICAgICBpZih0aGlzLmlzX2FjdGl2ZV9za2lsbF8yPT1mYWxzZSl7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmlzX2FjdGl2ZV9za2lsbF8yPXRydWU7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnN0YXJ0U2tpbGwoMik7XHJcbiAgICAgICAgICAgIH0gICAgICAgICAgICBcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgc3RhcnRJZGxlKCl7ICAgICAgICBcclxuICAgICAgICBzdXBlci5zZXRFbmVteVN0YXRlKEVuZW15X1N0YXRlLnN0YW5kYnkpO1xyXG4gICAgICAgIHN1cGVyLnBsYXlTcGluQW5pbWF0b24oQW5pbWF0aW9uX05hbWUuSWRsZSx0cnVlKTtcclxuICAgICAgICBcclxuICAgIH1cclxuXHJcbiAgICBzdGFydEF0dGFjaygpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLmF0dF9qaXNodT0wO1xyXG4gICAgICAgIHN1cGVyLnNldEVuZW15U3RhdGUoRW5lbXlfU3RhdGUuYXR0KTtcclxuICAgICAgICBsZXQgZGF0YT1uZXcgS2V5RnJhbWVEYXRhKCk7XHJcbiAgICAgICAgZGF0YS5uYW1lPSdBdHRhY2snO1xyXG4gICAgICAgIGRhdGEuY2FsbGJhY2s9KCk9PnsgIFxyXG4gICAgICAgICAgICB0aGlzLmF0dF9qaXNodT0wO1xyXG4gICAgICAgICAgICBHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNvdW5kX21hbmFnZXIucGxheVNvdW5kKFNvdW5kSW5kZXguWVhfQm9zczNBdHRhY2spO1xyXG4gICAgICAgICAgICBsZXQgbm9kZT1HYW1lRWZmZWN0c01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5jcmVhdGVHYW1lRWZmZWN0QnlJZChHYW1lRWZmZWN0SWQuYm9zczNfbm9ybWFsX2F0dGFjayxzdXBlci5nZXRBdHRQb3MoKSk7XHJcbiAgICAgICAgICAgIG5vZGUuZ2V0Q29tcG9uZW50KEJvc3NBdHQzKS5pbml0KHN1cGVyLmdldEF0dERhdGEoRGFtYWdlVHlwZS5Ob3JtYWwsdHJ1ZSwwKSxHYW1lRWZmZWN0SWQuYm9zczNfbm9ybWFsX2F0dGFjaywxMjAwLE1hdGguUEkqMy8yLHRoaXMubm9kZS55LDI3MCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHN1cGVyLnBsYXlTcGluQW5pbWF0b24oKEFuaW1hdGlvbl9OYW1lLmF0dGFjazEpLGZhbHNlLGRhdGEsKCk9PntcclxuICAgICAgICAgICAgaWYodGhpcy5za2lsbF9xdWV1ZS5sZW5ndGg+MCl7XHJcbiAgICAgICAgICAgICAgICBzdXBlci5zZXRFbmVteVN0YXRlKEVuZW15X1N0YXRlLnN0YW5kYnkpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zdGFydFNraWxsKHRoaXMuc2tpbGxfcXVldWUuc2hpZnQoKSk7XHJcbiAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zdGFydElkbGUoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pXHJcbiAgICB9XHJcbiAgICBzdGFydFNraWxsKHNraWxsSW5kZXg6bnVtYmVyKXtcclxuICAgICAgICBzd2l0Y2goc2tpbGxJbmRleCl7XHJcbiAgICAgICAgICAgIGNhc2UgMTp7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnN0YXJ0U2tpbGwxKCk7XHJcbiAgICAgICAgICAgIH1icmVhaztcclxuICAgICAgICAgICAgY2FzZSAyOntcclxuICAgICAgICAgICAgICAgIGlmKHRoaXMuaXNfYWN0aXZlX3NraWxsXzIpe1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc3RhcnRTa2lsbDIoKTtcclxuICAgICAgICAgICAgICAgIH0gICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIH1icmVhaztcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBcclxuICAgIC8v6JOE5Yqb56C46Zuq55CDXHJcbiAgICBzdGFydFNraWxsMSgpe1xyXG4gICAgICAgIHRoaXMuc2tpbGxfY29sZF9kb3duWzBdPXRoaXMuc2tpbGxfZGF0YS5nZXRTa2lsbENvbGREb3duKDEpO1xyXG4gICAgICAgIGlmKHN1cGVyLmdldEVuZW15U3RhdGUoKSE9RW5lbXlfU3RhdGUuYXR0JiZzdXBlci5nZXRFbmVteVN0YXRlKCkhPUVuZW15X1N0YXRlLnNraWxsKXtcclxuICAgICAgICAgICAgaWYoIXN1cGVyLmlzSGF2ZURlQnVmZihCdWZmSWQuSGVyb19YdWFuWXVuKSl7XHJcbiAgICAgICAgICAgICAgICBzdXBlci5zZXRFbmVteVN0YXRlKEVuZW15X1N0YXRlLnNraWxsKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2tpbGxfY29sZF9kb3duWzBdPXRoaXMuc2tpbGxfZGF0YS5nZXRTa2lsbENvbGREb3duKDEpO1xyXG4gICAgICAgICAgICAgICAgbGV0IGRhdGE9bmV3IEtleUZyYW1lRGF0YSgpO1xyXG4gICAgICAgICAgICAgICAgZGF0YS5uYW1lPSdTa2lsbCc7XHJcbiAgICAgICAgICAgICAgICBkYXRhLmNhbGxiYWNrPSgpPT57ICBcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmF0dF9qaXNodT0wOyAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IG5vZGU9R2FtZUVmZmVjdHNNYW5hZ2VyLmdldEluc3RhbmNlKCkuY3JlYXRlR2FtZUVmZmVjdEJ5SWQoR2FtZUVmZmVjdElkLmJvc3MzX3NraWxsXzEsc3VwZXIuZ2V0QXR0UG9zKCkpO1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCB0c3M9bm9kZS5nZXRDb21wb25lbnQoQm9zc0F0dDMpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRzcy5pbml0KHN1cGVyLmdldEF0dERhdGEoRGFtYWdlVHlwZS5Ta2lsbCx0cnVlLHRoaXMuc2tpbGxfZGF0YS5nZXRTa2lsbFZhbHVlMSgxKSksR2FtZUVmZmVjdElkLmJvc3MzX3NraWxsXzEsMTIwMCxNYXRoLlBJKjMvMix0aGlzLm5vZGUueSwyNzApO1xyXG4gICAgICAgICAgICAgICAgICAgIHRzcy5zZXRCdWZmRGF0YSh0aGlzLnNraWxsX2RhdGEuZ2V0U2tpbGxWYWx1ZTMoMSksdGhpcy5za2lsbF9kYXRhLmdldFNraWxsVmFsdWUyKDEpKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHN1cGVyLnBsYXlTcGluQW5pbWF0b24oKEFuaW1hdGlvbl9OYW1lLnNraWxsMSksZmFsc2UsZGF0YSwoKT0+e1xyXG4gICAgICAgICAgICAgICAgICAgIGlmKHRoaXMuc2tpbGxfcXVldWUubGVuZ3RoPjApe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzdXBlci5zZXRFbmVteVN0YXRlKEVuZW15X1N0YXRlLnN0YW5kYnkpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnN0YXJ0U2tpbGwodGhpcy5za2lsbF9xdWV1ZS5zaGlmdCgpKTtcclxuICAgICAgICAgICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zdGFydElkbGUoKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgIGlmKHRoaXMuc2tpbGxfcXVldWUuaW5kZXhPZigxKTwwKXtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnNraWxsX3F1ZXVlLnB1c2goMSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgaWYodGhpcy5za2lsbF9xdWV1ZS5pbmRleE9mKDEpPDApe1xyXG4gICAgICAgICAgICAgICAgdGhpcy5za2lsbF9xdWV1ZS5wdXNoKDEpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgLy/pmLLlvqFcclxuICAgIHN0YXJ0U2tpbGwyKCl7XHJcbiAgICAgICAgdGhpcy5za2lsbF9jb2xkX2Rvd25bMV09dGhpcy5za2lsbF9kYXRhLmdldFNraWxsQ29sZERvd24oMik7XHJcbiAgICAgICAgaWYoc3VwZXIuZ2V0RW5lbXlTdGF0ZSgpIT1FbmVteV9TdGF0ZS5hdHQmJnN1cGVyLmdldEVuZW15U3RhdGUoKSE9RW5lbXlfU3RhdGUuc2tpbGwpe1xyXG4gICAgICAgICAgICBpZighc3VwZXIuaXNIYXZlRGVCdWZmKEJ1ZmZJZC5IZXJvX1h1YW5ZdW4pKXtcclxuICAgICAgICAgICAgICAgIEdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuc291bmRfbWFuYWdlci5wbGF5U291bmQoU291bmRJbmRleC5ZWF9Cb3NzM1NraWxsMXh1bGkpO1xyXG4gICAgICAgICAgICAgICAgc3VwZXIuc2V0RW5lbXlTdGF0ZShFbmVteV9TdGF0ZS5za2lsbCk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNraWxsX2NvbGRfZG93blsxXT10aGlzLnNraWxsX2RhdGEuZ2V0U2tpbGxDb2xkRG93bigyKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuY3VyX3RvdWdobmVzcys9MTtcclxuICAgICAgICAgICAgICAgIHN1cGVyLnBsYXlTcGluQW5pbWF0b24oKEFuaW1hdGlvbl9OYW1lLnNraWxsMl8xKSxmYWxzZSxudWxsLCgpPT57XHJcbiAgICAgICAgICAgICAgICAgICAgc3VwZXIucGxheVNwaW5BbmltYXRvbigoQW5pbWF0aW9uX05hbWUuc2tpbGwyXzIpLHRydWUsbnVsbCxudWxsKTtcclxuICAgICAgICAgICAgICAgICAgICAvL+W+queOrzXnp5IgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgIC8v5re75YqgYnVmZlxyXG4gICAgICAgICAgICAgICAgICAgIGxldCBidWZmRGF0YT1uZXcgQnVmZkRhdGEoKTtcclxuICAgICAgICAgICAgICAgICAgICBidWZmRGF0YS5idWZmX2lkPUJ1ZmZJZC5Cb3NzM19NaWFuWWlfS29uZ1poaTtcclxuICAgICAgICAgICAgICAgICAgICBidWZmRGF0YS5yZW1haW5fdGltZT01O1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBidWZmPXN1cGVyLmFkZEJ1ZmYoYnVmZkRhdGEpO1xyXG4gICAgICAgICAgICAgICAgICAgIGJ1ZmYuYWRkRGVzdHJveUxpc3Rlbih0aGlzLm9uU2tpbGxCdWZmRGVzdG9yeS5iaW5kKHRoaXMpKTtcclxuICAgICAgICAgICAgICAgICAgICAvL+a3u+WKoOmbquWNsFxyXG4gICAgICAgICAgICAgICAgICAgIGJ1ZmYuYWRkRmxvb3JMaXN0ZW4odGhpcy5vbkFkZEZsb29yLmJpbmQodGhpcykpO1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBocFJvb3Q9Y2MuZmluZCgnQ2FudmFzL1VpX1Jvb3QvdG9wX3VpL0Jvc3NIcFJvb3QnKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnh1ZV95aW49R2FtZUVmZmVjdHNNYW5hZ2VyLmdldEluc3RhbmNlKCkuY3JlYXRlR2FtZUVmZmVjdEZvclBhcmVudChHYW1lRWZmZWN0SWQuYm9zczNfc2tpbGxfMl94dWV5aW4sY2MudjIoMCwwKSxocFJvb3QpLmdldENvbXBvbmVudChYdWVZaW4pO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMueHVlX3lpbi5zZXRGbG9vcigwKTtcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgaWYodGhpcy5za2lsbF9xdWV1ZS5pbmRleE9mKDIpPDApe1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2tpbGxfcXVldWUucHVzaCgyKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICBpZih0aGlzLnNraWxsX3F1ZXVlLmluZGV4T2YoMik8MCl7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNraWxsX3F1ZXVlLnB1c2goMik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICAvKipcclxuICAgICAqIFxyXG4gICAgICogQHBhcmFtIGZsb29yIOW9k+WJjeeahOWxguaVsFxyXG4gICAgICovXHJcbiAgICBvbkFkZEZsb29yKGZsb29yOm51bWJlcil7XHJcbiAgICAgICAgbGV0IG51bT1mbG9vci0xO1xyXG4gICAgICAgIGlmKHRoaXMueHVlX3lpbil7XHJcbiAgICAgICAgICAgIHRoaXMueHVlX3lpbi5zZXRGbG9vcihudW0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICBcclxuICAgIH1cclxuXHJcbiAgICAvKipCdWZm6ZSA5q+B5pe25Zue6LCD77yMbnVt77yaYnVmZuWPoOWKoOeahOWxguaVsCAqL1xyXG4gICAgb25Ta2lsbEJ1ZmZEZXN0b3J5KGJ1ZmZEYXRhOkJ1ZmZEYXRhKXsgICAgICAgIFxyXG4gICAgICAgIHRoaXMuc2tpbGxfY29sZF9kb3duWzFdPXRoaXMuc2tpbGxfZGF0YS5nZXRTa2lsbENvbGREb3duKDIpO1xyXG4gICAgICAgIGxldCBudW09YnVmZkRhdGEuY3VyX2Zsb29yLTE7XHJcbiAgICAgICAgaWYobnVtPjApe1xyXG4gICAgICAgICAgICAvL+WPjeWHu1xyXG4gICAgICAgICAgICBzdXBlci5zZXRFbmVteVN0YXRlKEVuZW15X1N0YXRlLnNraWxsKTtcclxuICAgICAgICAgICAgbGV0IGRhdGE9bmV3IEtleUZyYW1lRGF0YSgpO1xyXG4gICAgICAgICAgICBkYXRhLm5hbWU9J1NraWxsMic7XHJcbiAgICAgICAgICAgIGRhdGEuY2FsbGJhY2s9KCk9PnsgIFxyXG4gICAgICAgICAgICAgICAgdGhpcy5hdHRfamlzaHU9MDtcclxuICAgICAgICAgICAgICAgIHRoaXMuc3RhcnRTa2lsbDJMYW51Y2gobnVtKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBzdXBlci5wbGF5U3BpbkFuaW1hdG9uKChBbmltYXRpb25fTmFtZS5za2lsbDJfMyksZmFsc2UsZGF0YSwoKT0+e1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jdXJfdG91Z2huZXNzLT0xO1xyXG4gICAgICAgICAgICAgICAgR2FtZUVmZmVjdHNNYW5hZ2VyLmdldEluc3RhbmNlKCkuZGVzdHJveUdhbWVFZmZlY3RCeUlkKEdhbWVFZmZlY3RJZC5ib3NzM19za2lsbF8yX3h1ZXlpbix0aGlzLnh1ZV95aW4ubm9kZSk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnh1ZV95aW49bnVsbDtcclxuICAgICAgICAgICAgICAgIGlmKHRoaXMuc2tpbGxfcXVldWUubGVuZ3RoPjApe1xyXG4gICAgICAgICAgICAgICAgICAgIHN1cGVyLnNldEVuZW15U3RhdGUoRW5lbXlfU3RhdGUuc3RhbmRieSk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zdGFydFNraWxsKHRoaXMuc2tpbGxfcXVldWUuc2hpZnQoKSk7XHJcbiAgICAgICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnN0YXJ0SWRsZSgpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICB0aGlzLmN1cl90b3VnaG5lc3MtPTE7XHJcbiAgICAgICAgICAgIEdhbWVFZmZlY3RzTWFuYWdlci5nZXRJbnN0YW5jZSgpLmRlc3Ryb3lHYW1lRWZmZWN0QnlJZChHYW1lRWZmZWN0SWQuYm9zczNfc2tpbGxfMl94dWV5aW4sdGhpcy54dWVfeWluLm5vZGUpO1xyXG4gICAgICAgICAgICB0aGlzLnh1ZV95aW49bnVsbDtcclxuICAgICAgICAgICAgaWYodGhpcy5za2lsbF9xdWV1ZS5sZW5ndGg+MCl7XHJcbiAgICAgICAgICAgICAgICBzdXBlci5zZXRFbmVteVN0YXRlKEVuZW15X1N0YXRlLnN0YW5kYnkpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zdGFydFNraWxsKHRoaXMuc2tpbGxfcXVldWUuc2hpZnQoKSk7XHJcbiAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zdGFydElkbGUoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBzdGFydFNraWxsMkxhbnVjaChudW06bnVtYmVyKXsgICAgICAgIFxyXG4gICAgICAgIE15VG9vbC5yYW5kb21TY2VuZVNoYWtlQmlnKCk7ICAgICAgICBcclxuICAgICAgICAvL+WIm+W7uuWPkeWwhOeahOWGsOafsVxyXG4gICAgICAgIGxldCBoaXROdW09MDtcclxuICAgICAgICBmb3IobGV0IGk9MDsgaTw1OyBpKyspe1xyXG4gICAgICAgICAgICBsZXQgY3JlYXRlQmluZ1podT0oKT0+eyAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIC8v5rGC54K5XHJcbiAgICAgICAgICAgICAgICBsZXQgcG9zWD1pKjE0NC0yODg7XHJcbiAgICAgICAgICAgICAgICBsZXQgcG9zWT1HYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLmVuZW15X2F0dF95LU1hdGgucmFuZG9tKCkqMjAwLTEwMDtcclxuICAgICAgICAgICAgICAgIGxldCBzdGFydFBvcz1jYy52Mihwb3NYLDE2ODArcG9zWSk7XHJcbiAgICAgICAgICAgICAgICBsZXQgZW5kUG9zPWNjLnYyKHBvc1gscG9zWSk7XHJcbiAgICAgICAgICAgICAgICAvL2xldCBvZmZzZXRQb3M9ZW5kUG9zLnN1YihzdGFydFBvcyk7XHJcbiAgICAgICAgICAgICAgICAvL2xldCBhbmdsZT1NeVRvb2wucmFkaWFuVG9BbmdsZShNYXRoLmF0YW4yKG9mZnNldFBvcy55LG9mZnNldFBvcy54KSkrOTA7XHJcbiAgICAgICAgICAgICAgICBsZXQgYmluZ3podT1HYW1lRWZmZWN0c01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5jcmVhdGVHYW1lRWZmZWN0QnlJZChHYW1lRWZmZWN0SWQuYm9zczNfc2tpbGxfMixzdGFydFBvcyk7ICBcclxuICAgICAgICAgICAgICAgIGNjLnR3ZWVuKGJpbmd6aHUpLnRvKE1hdGgucmFuZG9tKCkqMC4yKzAuMix7eDplbmRQb3MueCx5OmVuZFBvcy55fSkuY2FsbCgobm9kZTpjYy5Ob2RlKT0+e1xyXG4gICAgICAgICAgICAgICAgICAgIEdhbWVFZmZlY3RzTWFuYWdlci5nZXRJbnN0YW5jZSgpLmRlc3Ryb3lHYW1lRWZmZWN0QnlJZChHYW1lRWZmZWN0SWQuYm9zczNfc2tpbGxfMixub2RlKTtcclxuICAgICAgICAgICAgICAgICAgICBHYW1lRWZmZWN0c01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5jcmVhdGVHYW1lRWZmZWN0QnlJZChHYW1lRWZmZWN0SWQuYm9zczNfc2tpbGxfMl9oaXQsbm9kZS5nZXRQb3NpdGlvbigpKTsgXHJcbiAgICAgICAgICAgICAgICAgICAgaGl0TnVtKys7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYoaGl0TnVtPT0zKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy/nnKnmmZUr5Lyk5a6zXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIEdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuYWxsX2hlcm8uZm9yRWFjaCgodixrKT0+e1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGJ1ZmZEYXRhPW5ldyBCdWZmRGF0YSgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnVmZkRhdGEuYnVmZl9pZD1CdWZmSWQuTW9uc3Rlcl9YdWFuWXVuO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnVmZkRhdGEuZ2FtZV9lZmZlY3RfaWQ9R2FtZUVmZmVjdElkLnh1YW55dW47XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBidWZmRGF0YS5yZW1haW5fdGltZT0yK251bSp0aGlzLnNraWxsX2RhdGEuZ2V0U2tpbGxWYWx1ZTMoMSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBidWZmRGF0YS5idWZmX3R5cGU9QnVmZlR5cGUuVmVydGlnbztcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHYuYWRkRGVCdWZmKGJ1ZmZEYXRhKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGF0dERhdGE9dGhpcy5nZXRBdHREYXRhKERhbWFnZVR5cGUuU2tpbGwsZmFsc2UsdGhpcy5za2lsbF9kYXRhLmdldFNraWxsVmFsdWUxKDEpKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBhdHREYXRhLnplbmdzaGFuZ19yYXRlPXRoaXMuc2tpbGxfZGF0YS5nZXRTa2lsbFZhbHVlMigxKSpudW07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFdhbGxNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0TWFpbldhbGwoKS5iZUluanVyZWQoYXR0RGF0YSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSkuc3RhcnQoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLnNjaGVkdWxlT25jZShjcmVhdGVCaW5nWmh1LE1hdGgucmFuZG9tKCkqMC4yKzAuMSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIG9uRGVhdGgoKSB7XHJcbiAgICAgICAgdGhpcy51bnNjaGVkdWxlQWxsQ2FsbGJhY2tzKCk7XHJcbiAgICAgICAgc3VwZXIucGxheURlYWRBbmltYXRvbihBbmltYXRpb25fTmFtZS5kZWFkLCgpPT57XHJcbiAgICAgICAgICAgIHRoaXMucmVtb3ZlQWxsRGVCdWZmKCk7XHJcbiAgICAgICAgICAgIHRoaXMucmVtb3ZlQWxsQnVmZigpO1xyXG4gICAgICAgICAgICBpZih0aGlzLnNoYWRvdyl7XHJcbiAgICAgICAgICAgICAgICBjYy50d2Vlbih0aGlzLnNoYWRvdykudG8oMC43NSx7b3BhY2l0eTowfSkuc3RhcnQoKTtcclxuICAgICAgICAgICAgfSAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBjYy50d2Vlbih0aGlzLm5vZGUpLnRvKDAuNzUse29wYWNpdHk6MH0pLmNhbGwoKCk9PntcclxuICAgICAgICAgICAgICAgIHRoaXMucmVtb3ZlQWxsRGVCdWZmKCk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnJlbW92ZUFsbEJ1ZmYoKTtcclxuICAgICAgICAgICAgICAgIE1vbnN0ZXJNYW5hZ2VyLmdldEluc3RhbmNlKCkuZGVzdHJveU1vbnN0ZXIodGhpcy5ub2RlLHRoaXMubW9uc3Rlcl90eXBlKTtcclxuICAgICAgICAgICAgfSkuc3RhcnQoKTtcclxuICAgICAgICB9KVxyXG4gICAgICAgIC8vR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zb3VuZF9tYW5hZ2VyLnBsYXlTb3VuZChTb3VuZEluZGV4LnJld2FyZEJveDIpO1xyXG4gICAgICAgIGlmKHRoaXMueHVlX3lpbil7XHJcbiAgICAgICAgICAgIEdhbWVFZmZlY3RzTWFuYWdlci5nZXRJbnN0YW5jZSgpLmRlc3Ryb3lHYW1lRWZmZWN0QnlJZChHYW1lRWZmZWN0SWQuYm9zczNfc2tpbGxfMl94dWV5aW4sdGhpcy54dWVfeWluLm5vZGUpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBcclxuICAgICAgICAvL+WIoOmZpFxyXG4gICAgICAgIC8vIGlmKHRoaXMuYm9zc19zaGllbGQpe1xyXG4gICAgICAgIC8vICAgICB0aGlzLmJvc3Nfc2hpZWxkLmRlc3RvcnlTaGllbGQoKTtcclxuICAgICAgICAvLyB9ICAgICAgICBcclxuICAgIH1cclxuXHJcbiAgICBvblh1YW5ZdW5SZXN1bHQoaXNYdWFuWXVuOmJvb2xlYW4pe1xyXG4gICAgICAgIGlmKGlzWHVhbll1bil7XHJcbiAgICAgICAgICAgIHRoaXMuc3RhcnRYdWFuWXVuKCk7XHJcbiAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgIGlmKCFzdXBlci5pc0hhdmVEZUJ1ZmZUeXBlKEJ1ZmZUeXBlLlZlcnRpZ28pKXtcclxuICAgICAgICAgICAgICAgIGlmKCFzdXBlci5nZXRJc0RpZSgpKXtcclxuICAgICAgICAgICAgICAgICAgICBpZih0aGlzLnNraWxsX3F1ZXVlLmxlbmd0aD4wKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgc3VwZXIuc2V0RW5lbXlTdGF0ZShFbmVteV9TdGF0ZS5zdGFuZGJ5KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zdGFydFNraWxsKHRoaXMuc2tpbGxfcXVldWUuc2hpZnQoKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc3RhcnRJZGxlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHN0YXJ0WHVhbll1bigpe1xyXG4gICAgICAgIHN1cGVyLnBsYXlTcGluQW5pbWF0b24oQW5pbWF0aW9uX05hbWUuaHVydDEsZmFsc2UsbnVsbCwoKT0+e1xyXG4gICAgICAgICAgICBpZihzdXBlci5pc0hhdmVEZUJ1ZmZUeXBlKEJ1ZmZUeXBlLlZlcnRpZ28pJiYhc3VwZXIuZ2V0SXNEaWUoKSlcclxuICAgICAgICAgICAgICAgIHRoaXMuc3BpbmUucGF1c2VkPXRydWU7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIHVwZGF0ZShkdClcclxuICAgIHtcclxuICAgICAgICBpZigoR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5jdXJfZ2FtZV9zdGF0ZSE9R2FtZVN0YXRlLkdhbWVfUGxheWluZyl8fHRoaXMuZ2V0SXNEaWUoKSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgc3VwZXIudXBkYXRlKGR0KTtcclxuICAgICAgICB0aGlzLmNoZWNrU2tpbGwoZHQpO1xyXG4gICAgICAgIGlmKHRoaXMuZ2V0RW5lbXlTdGF0ZSgpIT1FbmVteV9TdGF0ZS5za2lsbCl7XHJcbiAgICAgICAgICAgIGlmKCF0aGlzLmlzSGF2ZURlQnVmZihCdWZmSWQuSGVyb19YdWFuWXVuKSl7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNoZWNrQXR0KGR0KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKirmioDog73mo4DmtYsgKi9cclxuICAgIGNoZWNrU2tpbGwoZHQ6bnVtYmVyKXtcclxuICAgICAgICBmb3IobGV0IGk9MDsgaTx0aGlzLnNraWxsX2NvbGRfZG93bi5sZW5ndGg7IGkrKyl7XHJcbiAgICAgICAgICAgIGlmKGk9PTEpe1xyXG4gICAgICAgICAgICAgICAgLy/nrKzkuozkuKrmioDog71cclxuICAgICAgICAgICAgICAgIGlmKHRoaXMuaXNfYWN0aXZlX3NraWxsXzI9PWZhbHNlKXtcclxuICAgICAgICAgICAgICAgICAgICBjb250aW51ZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZih0aGlzLnNraWxsX2NvbGRfZG93bltpXT4wKXtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2tpbGxfY29sZF9kb3duW2ldLT1kdDtcclxuICAgICAgICAgICAgICAgIGlmKHRoaXMuc2tpbGxfY29sZF9kb3duW2ldPDApe1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2tpbGxfY29sZF9kb3duW2ldPTA7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zdGFydFNraWxsKGkrMSk7XHJcbiAgICAgICAgICAgICAgICB9ICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIC8vIGVsc2V7XHJcbiAgICAgICAgICAgIC8vICAgICB0aGlzLnN0YXJ0U2tpbGwoaSsxKTtcclxuICAgICAgICAgICAgLy8gfVxyXG4gICAgICAgIH0gICAgICAgICAgICAgICAgXHJcbiAgICB9XHJcblxyXG4gICAgLyoq5pS75Ye76K6h566XICovXHJcbiAgICBjaGVja0F0dChkdDpudW1iZXIpeyAgICAgICAgXHJcbiAgICAgICAgdGhpcy5hdHRfamlzaHUrPWR0O1xyXG4gICAgICAgIGlmKHRoaXMuYXR0X2ppc2h1Pj10aGlzLmF0dF9qaWFuZ2Upe1xyXG4gICAgICAgICAgICB0aGlzLmF0dF9qaXNodT10aGlzLmF0dF9qaWFuZ2U7XHJcbiAgICAgICAgICAgIHRoaXMuc3RhcnRBdHRhY2soKTtcclxuICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgLy90aGlzLm1vdmluZyhkdCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgXHJcbn1cclxuIl19