"use strict";
cc._RF.push(module, '97c48NXFCdCoIV8qQO2rjxZ', 'Boss6');
// Scripts/Boss/Boss6/Boss6.ts

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
var HeroManager_1 = require("../../Hero/Data/HeroManager");
var HeroConfig_1 = require("../../Hero/Game/HeroConfig");
var MonsterBullet_1 = require("../../Monster/MonsterBullet");
var MonsterData_1 = require("../../Monster/MonsterData");
var MonsterManager_1 = require("../../Monster/MonsterManager");
var AudioConstants_1 = require("../../Sound/AudioConstants");
var Boss_1 = require("../Boss");
var BossSkill6_1 = require("./BossSkill6");
var Animation_Name;
(function (Animation_Name) {
    Animation_Name["Idle"] = "Idle";
    Animation_Name["attack1"] = "Attack1";
    Animation_Name["run"] = "Run";
    Animation_Name["hurt1"] = "Hurt";
    Animation_Name["skill1_1"] = "Skill1_1";
    Animation_Name["skill1_2"] = "Skill1_2";
    Animation_Name["skill1_3"] = "Skill1_3";
    Animation_Name["skill2_1"] = "Skill2_1";
    Animation_Name["skill2_2"] = "Skill2_2";
    Animation_Name["skill2_3"] = "Skill2_3";
    Animation_Name["dead"] = "Dead";
})(Animation_Name || (Animation_Name = {}));
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var Boss6 = /** @class */ (function (_super) {
    __extends(Boss6, _super);
    function Boss6() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        //skill_time:number=10;
        _this.skill_waiting = false;
        /**引导相关 */
        /**引导计数 */
        _this.yindao_jishu = 0;
        /**引导剩余时长 */
        _this.yindao_time = 10;
        /**是否处于引导中 */
        _this.is_yindao = false;
        _this.launch_num = 0;
        _this.cur_state = 1; //1：高防御  2：低防御
        _this.skill_jishu_2 = 0;
        return _this;
    }
    Boss6.prototype.onLoad = function () {
        _super.prototype.onLoad.call(this);
        GameEffectsManager_1.GameEffectsManager.getInstance().addEffectPoolById(GameEffectsManager_1.GameEffectId.boss6_attack, 1);
        GameEffectsManager_1.GameEffectsManager.getInstance().addEffectPoolById(GameEffectsManager_1.GameEffectId.boss6_attack_hit, 1);
        GameEffectsManager_1.GameEffectsManager.getInstance().addEffectPoolById(GameEffectsManager_1.GameEffectId.boss6_skill2, 4);
        GameEffectsManager_1.GameEffectsManager.getInstance().addEffectPoolById(GameEffectsManager_1.GameEffectId.boss6_skill2_hit, 4);
        this.addDeathCallback(this.onDeath);
        this.addXuanYunListen(this.onXuanYunResult);
        this.addBossInitedListen(this.onBossInited);
    };
    Boss6.prototype.onBossInited = function () {
        this.startIdle();
        this.node.y = 128;
        this.skill_cd = this.skill_data.getSkillColdDown(2);
        this.cur_state = 1;
        this.monster_data.Defense += this.base_attribute_data.Defense * this.skill_data.getSkillValue1(1);
    };
    Boss6.prototype.startIdle = function () {
        _super.prototype.setEnemyState.call(this, EnemyConfig_1.Enemy_State.standby);
        _super.prototype.playSpinAnimaton.call(this, Animation_Name.Idle, true);
    };
    Boss6.prototype.startAttack = function () {
        var _this = this;
        this.att_jishu = 0;
        _super.prototype.setEnemyState.call(this, EnemyConfig_1.Enemy_State.att);
        var data = new MonsterData_1.KeyFrameData();
        data.name = 'Attack';
        data.callback = function () {
            _this.att_jishu = 0;
            GameManager_1.default.getInstance().sound_manager.playSound(AudioConstants_1.SoundIndex.YX_boss6Attack);
            var node = GameEffectsManager_1.GameEffectsManager.getInstance().createGameEffectById(GameEffectsManager_1.GameEffectId.boss6_attack, _super.prototype.getAttPos.call(_this));
            node.getComponent(MonsterBullet_1.default).init(_super.prototype.getAttData.call(_this, HeroConfig_1.DamageType.Normal, true), GameEffectsManager_1.GameEffectId.boss6_attack, GameEffectsManager_1.GameEffectId.boss6_attack_hit, 1500, Math.PI * 3 / 2);
        };
        _super.prototype.playSpinAnimaton.call(this, (Animation_Name.attack1), false, data, function () {
            if (_this.skill_waiting == true) {
                _super.prototype.setEnemyState.call(_this, EnemyConfig_1.Enemy_State.skill);
                _this.startSkill();
            }
            else {
                _this.startIdle();
            }
        });
    };
    Boss6.prototype.startSkill = function () {
        var _this = this;
        this.skill_jishu = 0;
        if (_super.prototype.getEnemyState.call(this) != EnemyConfig_1.Enemy_State.att) {
            if (!_super.prototype.isHaveDeBuff.call(this, HeroConfig_1.BuffId.Hero_XuanYun)) {
                this.skill_waiting = false;
                _super.prototype.setEnemyState.call(this, EnemyConfig_1.Enemy_State.skill);
                _super.prototype.playSpinAnimaton.call(this, (Animation_Name.skill2_1), false, null, function () {
                    var data = new MonsterData_1.KeyFrameData();
                    data.name = 'Skill2';
                    data.callback = _this.startLaunch.bind(_this);
                    _super.prototype.playSpinAnimaton.call(_this, (Animation_Name.skill2_2), true, data);
                    _this.is_yindao = true;
                    _this.skill_jishu = 0;
                    _this.yindao_time = 10;
                });
            }
            else {
                this.skill_waiting = true;
            }
        }
        else {
            this.skill_waiting = true;
        }
    };
    Boss6.prototype.startLaunch = function () {
        var _this = this;
        //cc.log('发射发射');
        if (GameManager_1.default.getInstance().cur_game_state != Constants_1.GameState.Game_Playing) {
            return;
        }
        this.skill_jishu = 0;
        var num = 0;
        for (var i = 0; i < 2; i++) {
            this.scheduleOnce(function () {
                if (!_this.isHaveDeBuff(HeroConfig_1.BuffId.Hero_XuanYun)) {
                    GameManager_1.default.getInstance().sound_manager.playSound(AudioConstants_1.SoundIndex.YX_boss6Attack);
                    num++;
                    var startPos = cc.v2(Math.random() * 128 - 64, _this.node.y + 256);
                    var offsetX = startPos.x < 0 ? -(80 + Math.random() * 80) : (80 + Math.random() * 80);
                    var endPos = cc.v2(offsetX + startPos.x, startPos.y + Math.random() * 40 + 80);
                    //随机英雄
                    var attDir = Math.PI * 3 / 2;
                    var heroId = HeroManager_1.HeroManager.getInstance().getRandHeroId(GameManager_1.default.getInstance().cur_game_mode);
                    if (heroId != HeroConfig_1.Hero_Type.NULL) {
                        var heroPos = GameManager_1.default.getInstance().all_hero.get(heroId).node.getPosition();
                        var offsetPos = heroPos.sub(endPos);
                        var pi2 = Math.PI * 2;
                        attDir = (Math.atan2(offsetPos.y, offsetPos.x) + pi2) % pi2;
                    }
                    var node = GameEffectsManager_1.GameEffectsManager.getInstance().createGameEffectById(GameEffectsManager_1.GameEffectId.boss6_skill2, startPos);
                    var bsAtt_1 = node.getComponent(BossSkill6_1.default);
                    bsAtt_1.init(_super.prototype.getAttData.call(_this, HeroConfig_1.DamageType.Skill, true, _this.skill_data.getSkillValue1(2)), GameEffectsManager_1.GameEffectId.boss6_skill2, 1500, attDir, _this.node.y);
                    bsAtt_1.is_can_move = false;
                    bsAtt_1.setHeroType(heroId, _this.skill_data.getSkillValue2(2));
                    //bsAtt.setHeroType(heroId,0.1);
                    cc.tween(node).to((0.25 - num * 0.05) * GameManager_1.default.getInstance().getGameRate(), { x: endPos.x, y: endPos.y }, { easing: 'quadOut' }).call(function () {
                        bsAtt_1.startFly();
                    }).start();
                }
            }, 0.25 * i);
        }
        this.launch_num++;
    };
    Boss6.prototype.endYinDao = function () {
        var _this = this;
        this.skill_jishu = 0;
        this.is_yindao = false;
        this.yindao_time = 10;
        _super.prototype.playSpinAnimaton.call(this, (Animation_Name.skill2_3), false, null, function () {
            _this.att_jishu = 0;
            _this.startIdle();
        });
    };
    Boss6.prototype.onDeath = function () {
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
    };
    Boss6.prototype.onXuanYunResult = function (isXuanYun) {
        if (isXuanYun) {
            this.startXuanYun();
        }
        else {
            //this.unXuanYun();
        }
    };
    Boss6.prototype.startXuanYun = function () {
        var _this = this;
        if (this.is_yindao && this.cur_state == 1) {
            this.skill_waiting = false;
            this.is_yindao = false;
            this.yindao_jishu = 0;
            this.cur_toughness += 1;
            this.cur_state = 2;
            this.skill_jishu_2 = 0;
            _super.prototype.playSpinAnimaton.call(this, Animation_Name.skill1_1, false, null, function () {
                _super.prototype.playSpinAnimaton.call(_this, Animation_Name.skill1_2, true, null, null);
                //减防御
                _this.monster_data.Defense -= _this.base_attribute_data.Defense * _this.skill_data.getSkillValue3(2);
                cc.log(_this.monster_data.Defense);
            });
        }
        else {
        }
    };
    Boss6.prototype.unXuanYun = function () {
        var _this = this;
        this.skill_jishu_2 = 0;
        if (!_super.prototype.getIsDie.call(this)) {
            _super.prototype.playSpinAnimaton.call(this, Animation_Name.skill1_3, false, null, function () {
                _this.cur_toughness -= 1;
                _this.cur_state = 1;
                //加防御
                _this.monster_data.Defense += _this.base_attribute_data.Defense * _this.skill_data.getSkillValue3(2);
                cc.log(_this.monster_data.Defense);
                if (!_super.prototype.getIsDie.call(_this)) {
                    _this.startIdle();
                }
            });
        }
    };
    Boss6.prototype.update = function (dt) {
        if ((GameManager_1.default.getInstance().cur_game_state != Constants_1.GameState.Game_Playing) || this.getIsDie()) {
            return;
        }
        _super.prototype.update.call(this, dt);
        this.checkSkill(dt);
        if (!this.isHaveDeBuffType(HeroConfig_1.BuffType.Vertigo)) {
            if (this.getEnemyState() != EnemyConfig_1.Enemy_State.skill) {
                this.checkAtt(dt);
            }
        }
    };
    // /**技能检测 */
    Boss6.prototype.checkSkill = function (dt) {
        this.skill_jishu += dt;
        if (!this.isHaveDeBuffType(HeroConfig_1.BuffType.Vertigo)) {
            if (this.is_yindao == false && this.skill_jishu >= this.skill_cd) {
                this.skill_jishu = 0;
                this.startSkill();
            }
            if (this.is_yindao == true && this.yindao_time > 0) {
                this.yindao_time -= dt;
                if (this.yindao_time <= 0) {
                    //结束引导
                    this.endYinDao();
                    return;
                }
                // this.yindao_jishu+=dt;
                // if(this.yindao_jishu>=1){
                //     this.yindao_jishu=0;
                //     this.startLaunch();
                // }
            }
        }
        if (this.cur_state == 2) {
            this.skill_jishu_2 += dt;
            if (this.skill_jishu_2 >= 5) {
                this.unXuanYun();
            }
        }
    };
    /**攻击计算 */
    Boss6.prototype.checkAtt = function (dt) {
        this.att_jishu += dt;
        if (this.att_jishu >= this.att_jiange) {
            this.att_jishu = this.att_jiange;
            this.startAttack();
        }
        else {
            //this.moving(dt);
        }
    };
    Boss6 = __decorate([
        ccclass
    ], Boss6);
    return Boss6;
}(Boss_1.default));
exports.default = Boss6;

cc._RF.pop();