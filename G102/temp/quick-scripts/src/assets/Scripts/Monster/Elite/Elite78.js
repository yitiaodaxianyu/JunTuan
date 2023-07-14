"use strict";
cc._RF.push(module, '76505mnVClF6qDQw4vGib5b', 'Elite78');
// Scripts/Monster/Elite/Elite78.ts

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
var WallManager_1 = require("../../Wall/WallManager");
var MonsterNewNormal_1 = require("../MonsterNewNormal");
var EliteAtt78_1 = require("./EliteAtt78");
var Animation_Name;
(function (Animation_Name) {
    Animation_Name["Idle"] = "Side_Walk";
    Animation_Name["attack1"] = "Side_Attack";
    Animation_Name["run"] = "Run";
    Animation_Name["hurt1"] = "Hurt";
    Animation_Name["skill1_1"] = "Side_Skill1_1";
    Animation_Name["skill1_2"] = "Side_Skill1_2";
    Animation_Name["skill1_3"] = "Side_Skill1_3";
    Animation_Name["dead"] = "Dead";
})(Animation_Name || (Animation_Name = {}));
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var Elite78 = /** @class */ (function (_super) {
    __extends(Elite78, _super);
    function Elite78() {
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
    Elite78.prototype.onLoad = function () {
        _super.prototype.onLoad.call(this);
        GameEffectsManager_1.GameEffectsManager.getInstance().addEffectPoolById(GameEffectsManager_1.GameEffectId.monster78_attack_bullect, 1);
        GameEffectsManager_1.GameEffectsManager.getInstance().addEffectPoolById(GameEffectsManager_1.GameEffectId.monster78_skill_bullect, 1);
        GameEffectsManager_1.GameEffectsManager.getInstance().addEffectPoolById(GameEffectsManager_1.GameEffectId.monster78_skill_bullect_hit, 4);
        this.addMonsterNormalDeath(this.onMonsterNormalDeath);
        this.addXuanYunListen(this.onXuanYunResult);
        this.addMonsterNormalInited(this.onMonsterIsInited);
    };
    Elite78.prototype.onMonsterIsInited = function () {
        this.skill_cd = this.skill_data.getSkillColdDown(1);
    };
    // startIdle(){
    //     this.att_jishu=0;
    //     super.setEnemyState(Enemy_State.move);
    //     super.playSpinAnimaton(Animation_Name.Idle,true);        
    // }    
    Elite78.prototype.startSkill = function () {
        var _this = this;
        this.skill_jishu = 0;
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
    };
    Elite78.prototype.startLaunch = function () {
        var _this = this;
        //cc.log('发射发射');
        var num = 0;
        for (var i = 0; i < this.skill_data.getSkillValue1(1); i++) {
            this.scheduleOnce(function () {
                if (!_this.isHaveDeBuff(HeroConfig_1.BuffId.Hero_XuanYun)) {
                    num++;
                    var startRandPosX = Math.random() * 64 - 32;
                    var startPos = cc.v2(_this.node.x + startRandPosX, _this.node.y + 128);
                    var offsetX = startRandPosX < 0 ? -(80 + Math.random() * 80) : (80 + Math.random() * 80);
                    var endPos = cc.v2(offsetX + startPos.x, startPos.y + Math.random() * 40 + 80);
                    var startEndPos = cc.v2(startPos.x + offsetX / 3, GameManager_1.default.getInstance().enemy_att_y);
                    var offsetPos = startEndPos.sub(endPos);
                    var dir = Math.atan2(offsetPos.y, offsetPos.x);
                    //GameManager.getInstance().sound_manager.playSound(SoundIndex.YX_BossAttackGuodu);
                    var node = GameEffectsManager_1.GameEffectsManager.getInstance().createGameEffectById(GameEffectsManager_1.GameEffectId.monster78_skill_bullect, startPos);
                    var bsAtt_1 = node.getComponent(EliteAtt78_1.default);
                    bsAtt_1.init(_super.prototype.getAttData.call(_this, HeroConfig_1.DamageType.Skill, true, _this.skill_data.getSkillValue2(1)), GameEffectsManager_1.GameEffectId.monster78_skill_bullect, 2000, dir, _this.node.y);
                    bsAtt_1.is_can_move = false;
                    cc.tween(node).to((0.75 - num * 0.05) * GameManager_1.default.getInstance().getGameRate(), { x: endPos.x, y: endPos.y }, { easing: 'quadOut' }).call(function () {
                        bsAtt_1.startFly();
                    }).start();
                }
            }, i * 0.2);
        }
        this.launch_num++;
    };
    Elite78.prototype.onMonsterNormalDeath = function () {
        this.unscheduleAllCallbacks();
        this.is_yindao = false;
    };
    Elite78.prototype.onXuanYunResult = function (isXuanYun) {
        if (isXuanYun) {
            this.startXuanYun();
        }
        else {
            this.att_jishu = 0;
            this.startIdle();
            _super.prototype.setEnemyState.call(this, EnemyConfig_1.Enemy_State.move);
            if (this.att_wall) {
                this.setMoveDir(Math.random() > 0.5 ? Math.PI : 0);
            }
        }
    };
    Elite78.prototype.startXuanYun = function () {
        this.skill_waiting = false;
        this.is_yindao = false;
        this.yindao_jishu = 0;
        this.att_jishu = 0;
    };
    Elite78.prototype.update = function (dt) {
        if ((GameManager_1.default.getInstance().cur_game_state != Constants_1.GameState.Game_Playing) || this.getIsDie()) {
            return;
        }
        _super.prototype.update.call(this, dt);
        this.checkSkill(dt);
        // if(!this.isHaveDeBuff(BuffId.Hero_XuanYun)){            
        //     if(this.getEnemyState()!=Enemy_State.skill){            
        //         this.checkAtt(dt);            
        //     }
        // }                
    };
    /**技能检测 */
    Elite78.prototype.checkSkill = function (dt) {
        var _this = this;
        this.skill_jishu += dt;
        if (!this.isHaveDeBuff(HeroConfig_1.BuffId.Hero_XuanYun)) {
            if (this.is_yindao == false && this.skill_jishu >= this.skill_cd) {
                var walls = WallManager_1.default.getInstance().getAllWall();
                var attWall_1 = null;
                walls.forEach(function (wall, wallType) {
                    //攻击城墙的条件1，必须在城墙之上,2达到攻击距离
                    if (_this.node.y >= wall.getWallMaxYY() && Math.abs(_this.node.y - wall.getWallMaxYY()) <= _this.base_data.AttackDistance) {
                        attWall_1 = wall;
                    }
                });
                if (attWall_1) {
                    this.skill_jishu = this.att_jiange;
                    this.startSkill();
                }
            }
            if (this.is_yindao == true && this.yindao_time > 0) {
                if (this.isHaveDeBuff(HeroConfig_1.BuffId.Hero_MeiMo_Active_MeiHuo)) {
                    this.onXuanYunResult(true);
                    return;
                }
                this.yindao_time -= dt;
                if (this.yindao_time <= 0) {
                    //结束引导
                    this.is_yindao = false;
                    this.yindao_time = 10;
                    this.startIdle();
                    _super.prototype.setEnemyState.call(this, EnemyConfig_1.Enemy_State.move);
                    if (this.att_wall) {
                        this.setMoveDir(Math.random() > 0.5 ? Math.PI : 0);
                    }
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
    Elite78 = __decorate([
        ccclass
    ], Elite78);
    return Elite78;
}(MonsterNewNormal_1.default));
exports.default = Elite78;

cc._RF.pop();