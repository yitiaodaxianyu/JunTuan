"use strict";
cc._RF.push(module, 'ed9f7RQ6rBLnYSzRyb0j7PG', 'BigTree');
// Scripts/Boss/Boss1/BigTree.ts

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
var Boss_1 = require("../Boss");
var BossAtt1_1 = require("./BossAtt1");
var Animation_Name;
(function (Animation_Name) {
    Animation_Name["Idle"] = "Idle";
    Animation_Name["attack1"] = "Attack1";
    Animation_Name["run"] = "Run";
    Animation_Name["hurt1"] = "Hurt";
    Animation_Name["skill1_1"] = "Skill1_1";
    Animation_Name["skill1_2"] = "Skill1_2";
    Animation_Name["skill1_3"] = "Skill1_3";
    Animation_Name["dead"] = "Dead";
})(Animation_Name || (Animation_Name = {}));
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var BigTree = /** @class */ (function (_super) {
    __extends(BigTree, _super);
    function BigTree() {
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
        return _this;
    }
    BigTree.prototype.onLoad = function () {
        _super.prototype.onLoad.call(this);
        GameEffectsManager_1.GameEffectsManager.getInstance().addEffectPoolById(GameEffectsManager_1.GameEffectId.boss1_normal_att, 1);
        GameEffectsManager_1.GameEffectsManager.getInstance().addEffectPoolById(GameEffectsManager_1.GameEffectId.boss1_normal_att_hit, 1);
        GameEffectsManager_1.GameEffectsManager.getInstance().addEffectPoolById(GameEffectsManager_1.GameEffectId.boss1_normal_skill, 4);
        GameEffectsManager_1.GameEffectsManager.getInstance().addEffectPoolById(GameEffectsManager_1.GameEffectId.boss1_normal_skill_hit, 4);
        this.addDeathCallback(this.onDeath);
        this.addXuanYunListen(this.onXuanYunResult);
        this.addBossInitedListen(this.onBossInited);
    };
    BigTree.prototype.onBossInited = function () {
        this.startIdle();
        this.node.y = 128;
        // if(TutorailsManager.getInstance().is_finish_game==false && TutorailsManager.getInstance().isShowTutorials(241)){
        //     this.skill_jishu=10;
        // }
        this.skill_cd = this.skill_data.getSkillColdDown(1);
    };
    BigTree.prototype.startIdle = function () {
        _super.prototype.setEnemyState.call(this, EnemyConfig_1.Enemy_State.standby);
        _super.prototype.playSpinAnimaton.call(this, Animation_Name.Idle, true);
    };
    BigTree.prototype.startAttack = function () {
        var _this = this;
        this.att_jishu = 0;
        _super.prototype.setEnemyState.call(this, EnemyConfig_1.Enemy_State.att);
        var data = new MonsterData_1.KeyFrameData();
        data.name = 'Attack';
        data.callback = function () {
            _this.att_jishu = 0;
            var node = GameEffectsManager_1.GameEffectsManager.getInstance().createGameEffectById(GameEffectsManager_1.GameEffectId.boss1_normal_att, _super.prototype.getAttPos.call(_this));
            node.getComponent(BossAtt1_1.default).init(_super.prototype.getAttData.call(_this, HeroConfig_1.DamageType.Normal, true), GameEffectsManager_1.GameEffectId.boss1_normal_att, 1200, Math.PI * 3 / 2, _this.node.y);
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
    BigTree.prototype.startSkill = function () {
        var _this = this;
        // if(TutorailsManager.getInstance().is_finish_game==false && TutorailsManager.getInstance().isShowTutorials(241)){
        //     this.cur_toughness=1;
        // }
        this.skill_jishu = 0;
        if (_super.prototype.getEnemyState.call(this) != EnemyConfig_1.Enemy_State.att) {
            if (!_super.prototype.isHaveDeBuff.call(this, HeroConfig_1.BuffId.Hero_XuanYun)) {
                this.skill_waiting = false;
                _super.prototype.setEnemyState.call(this, EnemyConfig_1.Enemy_State.skill);
                _super.prototype.playSpinAnimaton.call(this, (Animation_Name.skill1_1), false, null, function () {
                    _super.prototype.playSpinAnimaton.call(_this, (Animation_Name.skill1_2), true);
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
    BigTree.prototype.startLaunch = function () {
        var _this = this;
        //cc.log('发射发射');
        var num = 0;
        for (var i = 0; i < this.skill_data.getSkillValue1(1); i++) {
            this.scheduleOnce(function () {
                if (!_this.isHaveDeBuff(HeroConfig_1.BuffId.Hero_XuanYun)) {
                    num++;
                    var startPos = cc.v2(Math.random() * 128 - 64, _this.node.y + 256);
                    var offsetX = startPos.x < 0 ? -(80 + Math.random() * 80) : (80 + Math.random() * 80);
                    var endPos = cc.v2(offsetX + startPos.x, startPos.y + Math.random() * 40 + 80);
                    var startEndPos = cc.v2(startPos.x + offsetX / 3, GameManager_1.default.getInstance().enemy_att_y);
                    var offsetPos = startEndPos.sub(endPos);
                    var dir = Math.atan2(offsetPos.y, offsetPos.x);
                    //GameManager.getInstance().sound_manager.playSound(SoundIndex.YX_BossAttackGuodu);
                    var node = GameEffectsManager_1.GameEffectsManager.getInstance().createGameEffectById(GameEffectsManager_1.GameEffectId.boss1_normal_skill, startPos);
                    var bsAtt_1 = node.getComponent(BossAtt1_1.default);
                    var data = _super.prototype.getAttData.call(_this, HeroConfig_1.DamageType.Skill, true, _this.skill_data.getSkillValue2(1));
                    data.is_big = false;
                    bsAtt_1.init(data, GameEffectsManager_1.GameEffectId.boss1_normal_skill, 2000, dir, _this.node.y);
                    bsAtt_1.is_can_move = false;
                    cc.tween(node).to((0.75 - num * 0.05) * GameManager_1.default.getInstance().getGameRate(), { x: endPos.x, y: endPos.y }, { easing: 'quadOut' }).call(function () {
                        bsAtt_1.startFly();
                    }).start();
                }
            }, i * 0.2);
        }
        this.launch_num++;
        // if(this.launch_num==3){
        //     //德鲁伊教程
        //     if(TutorailsManager.getInstance().is_finish_game==false && TutorailsManager.getInstance().isShowTutorials(241)){
        //         TutorailsManager.getInstance().showTutorials(241,()=>{
        //             GameManager.getInstance().setGameRate(1/JiaSu);                            
        //         },()=>{
        //             TutorailsManager.getInstance().saveTutorials(241);
        //             this.cur_toughness=0;
        //             GameManager.getInstance().setGameRate(1);
        //         },false,null,this.node.getPosition());
        //     }
        // }
    };
    BigTree.prototype.onDeath = function () {
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
    BigTree.prototype.onXuanYunResult = function (isXuanYun) {
        if (isXuanYun) {
            this.startXuanYun();
        }
        else {
            if (!_super.prototype.isHaveDeBuffType.call(this, HeroConfig_1.BuffType.Vertigo)) {
                if (!_super.prototype.getIsDie.call(this)) {
                    if (this.skill_waiting == true) {
                        _super.prototype.setEnemyState.call(this, EnemyConfig_1.Enemy_State.skill);
                        this.startSkill();
                    }
                    else {
                        this.startIdle();
                    }
                }
            }
        }
    };
    BigTree.prototype.startXuanYun = function () {
        var _this = this;
        this.skill_waiting = false;
        this.is_yindao = false;
        this.yindao_jishu = 0;
        _super.prototype.playSpinAnimaton.call(this, Animation_Name.hurt1, false, null, function () {
            if (_super.prototype.isHaveDeBuffType.call(_this, HeroConfig_1.BuffType.Vertigo) && !_super.prototype.getIsDie.call(_this))
                _this.spine.paused = true;
        });
    };
    BigTree.prototype.endYinDao = function () {
        var _this = this;
        //结束引导
        this.is_yindao = false;
        this.yindao_time = 10;
        _super.prototype.playSpinAnimaton.call(this, Animation_Name.skill1_3, false, null, function () {
            _this.startIdle();
        });
    };
    BigTree.prototype.update = function (dt) {
        if ((GameManager_1.default.getInstance().cur_game_state != Constants_1.GameState.Game_Playing) || this.getIsDie()) {
            return;
        }
        _super.prototype.update.call(this, dt);
        this.checkSkill(dt);
        if (!this.isHaveDeBuff(HeroConfig_1.BuffId.Hero_XuanYun)) {
            if (this.getEnemyState() != EnemyConfig_1.Enemy_State.skill) {
                this.checkAtt(dt);
            }
        }
    };
    /**技能检测 */
    BigTree.prototype.checkSkill = function (dt) {
        this.skill_jishu += dt;
        if (!this.isHaveDeBuff(HeroConfig_1.BuffId.Hero_XuanYun)) {
            if (this.is_yindao == false && this.skill_jishu >= this.skill_cd) {
                this.skill_jishu = this.att_jiange;
                this.startSkill();
            }
            if (this.is_yindao == true && this.yindao_time > 0) {
                this.yindao_time -= dt;
                if (this.yindao_time <= 0) {
                    this.endYinDao();
                    return;
                }
                this.yindao_jishu += dt;
                if (this.yindao_jishu >= 1) {
                    this.yindao_jishu = 0;
                    this.startLaunch();
                }
            }
        }
    };
    /**攻击计算 */
    BigTree.prototype.checkAtt = function (dt) {
        this.att_jishu += dt;
        if (this.att_jishu >= this.att_jiange) {
            this.att_jishu = this.att_jiange;
            this.startAttack();
        }
        else {
            //this.moving(dt);
        }
    };
    BigTree = __decorate([
        ccclass
    ], BigTree);
    return BigTree;
}(Boss_1.default));
exports.default = BigTree;

cc._RF.pop();