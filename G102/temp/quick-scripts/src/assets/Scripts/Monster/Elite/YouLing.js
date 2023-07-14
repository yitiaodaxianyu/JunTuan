"use strict";
cc._RF.push(module, 'da3c7Oi8y1EdIwWleRkY6nc', 'YouLing');
// Scripts/Monster/Elite/YouLing.ts

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
var MonsterData_1 = require("../MonsterData");
var MonsterNewNormal_1 = require("../MonsterNewNormal");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var YouLing = /** @class */ (function (_super) {
    __extends(YouLing, _super);
    function YouLing() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.is_release_skill = false;
        _this.is_yindao = false;
        _this.att_node = null;
        _this.yindao_num = 0;
        _this.add_damage_rate = 0;
        _this.cur_att_wall = null;
        _this.light_speed = 2000;
        _this.light_jishu = 0.2;
        return _this;
    }
    YouLing.prototype.onLoad = function () {
        _super.prototype.onLoad.call(this);
        _super.prototype.addMonsterNormalInited.call(this, this.onMonsterNormalInited);
        _super.prototype.addMonsterNormalAttack.call(this, this.onMonsterNormalAttack);
        _super.prototype.addMonsterNormalXuanYun.call(this, this.onMonsterNormalXuanYun);
        _super.prototype.addMonsterNormalDeath.call(this, this.onMonsterNormalDeath);
        GameEffectsManager_1.GameEffectsManager.getInstance().addEffectPoolById(GameEffectsManager_1.GameEffectId.monster19_youling_skill);
        GameEffectsManager_1.GameEffectsManager.getInstance().addEffectPoolById(GameEffectsManager_1.GameEffectId.monster19_youling_skill_hit);
    };
    YouLing.prototype.onMonsterNormalInited = function () {
        //设置为没放技能
        this.is_release_skill = false;
        this.is_yindao = false;
    };
    YouLing.prototype.onMonsterNormalXuanYun = function (isXuanYun) {
        if (isXuanYun) {
            this.is_yindao = false;
            //this.unschedule(this.yindao)
            if (this.att_node) {
                GameEffectsManager_1.GameEffectsManager.getInstance().destroyGameEffectById(GameEffectsManager_1.GameEffectId.monster19_youling_skill, this.att_node);
                this.att_node = null;
            }
        }
    };
    YouLing.prototype.onMonsterNormalDeath = function () {
        this.is_yindao = false;
        //this.unschedule(this.yindao)
        if (this.att_node) {
            GameEffectsManager_1.GameEffectsManager.getInstance().destroyGameEffectById(GameEffectsManager_1.GameEffectId.monster19_youling_skill, this.att_node);
            this.att_node = null;
        }
    };
    /**怪物开始攻击，返回是否截获本次攻击 */
    YouLing.prototype.onMonsterNormalAttack = function () {
        if (this.is_release_skill == false) {
            this.is_release_skill = true;
            //改放技能
            this.is_yindao = true;
            this.startSkill();
            return true;
        }
        else {
            if (this.is_yindao) {
                return true;
            }
            return false;
        }
    };
    YouLing.prototype.startSkill = function () {
        var _this = this;
        var walls = WallManager_1.default.getInstance().getAllWall();
        var attWall = null;
        walls.forEach(function (wall, wallType) {
            //攻击城墙的条件1，必须在城墙之上,2达到攻击距离
            if (_this.node.y >= wall.getWallMaxYY() && Math.abs(_this.node.y - wall.getWallMaxYY()) <= _this.base_data.AttackDistance) {
                attWall = wall;
            }
        });
        this.cur_att_wall = attWall;
        _super.prototype.setEnemyState.call(this, EnemyConfig_1.Enemy_State.skill);
        _super.prototype.playSpinAnimaton.call(this, ('Side_Skill_Start'), false, null, function () {
            _super.prototype.playSpinAnimaton.call(_this, ("Side_Skill_Loop"), true);
            if (_super.prototype.getIsDie.call(_this) == false) {
                //this.schedule(this.yindao,0.2);
                //播放动画
                var pos = _super.prototype.getAttPos.call(_this);
                _this.att_node = GameEffectsManager_1.GameEffectsManager.getInstance().createGameEffectById(GameEffectsManager_1.GameEffectId.monster19_youling_skill, pos);
                _this.att_node.height = 0;
                // let disYY=0;
                // if(this.cur_att_wall){
                //     disYY=this.cur_att_wall.getWallMaxYY()+16;
                // }else{
                //     disYY=GameManager.getInstance().enemy_att_y+16;
                // }
                //let distance=pos.y-disYY;
                //cc.tween(this.att_node).to(0.2,{height:distance}).start();
                _this.att_node.angle = 180;
            }
        });
    };
    YouLing.prototype.destroyYinDao = function () {
        this.is_yindao = false;
        //还原释放技能
        this.is_release_skill = false;
        this.yindao_num = 0;
        this.startIdle();
        this.setEnemyState(EnemyConfig_1.Enemy_State.move);
        if (this.att_node) {
            GameEffectsManager_1.GameEffectsManager.getInstance().destroyGameEffectById(GameEffectsManager_1.GameEffectId.monster19_youling_skill, this.att_node);
            this.att_node = null;
        }
    };
    YouLing.prototype.lightDamage = function (wall) {
        if (GameManager_1.default.getInstance().cur_game_state == Constants_1.GameState.Game_Playing) {
            //播放动画
            var pos = cc.v2(_super.prototype.getAttPos.call(this).x, wall.getWallMaxYY() - 32);
            GameEffectsManager_1.GameEffectsManager.getInstance().createGameEffectById(GameEffectsManager_1.GameEffectId.monster19_youling_skill_hit, pos);
            wall.beRealDamage(HeroConfig_1.DamageType.Skill, MonsterData_1.StrengthType.Elite, wall.getMaxHp() * (0.001 + this.add_damage_rate));
            this.yindao_num++;
            if (this.yindao_num % 2 == 0) {
                this.add_damage_rate += 0.001;
                if (this.add_damage_rate > 0.004) {
                    this.add_damage_rate = 0.004;
                }
            }
        }
    };
    YouLing.prototype.update = function (dt) {
        var _this = this;
        _super.prototype.update.call(this, dt);
        if (this.is_yindao && GameManager_1.default.getInstance().cur_game_state == Constants_1.GameState.Game_Playing) {
            if (this.att_node) {
                if (this.isHaveDeBuff(HeroConfig_1.BuffId.Hero_MeiMo_Active_MeiHuo)) {
                    this.onMonsterNormalXuanYun(true);
                    return;
                }
                this.att_node.setPosition(_super.prototype.getAttPos.call(this));
                var walls = WallManager_1.default.getInstance().getAllWall();
                var attWall_1 = null;
                walls.forEach(function (wall, wallType) {
                    //攻击城墙的条件1，必须在城墙之上,2达到攻击距离
                    if (_this.node.y >= wall.getWallMaxYY()) {
                        attWall_1 = wall;
                    }
                });
                if (Math.abs(this.node.y - attWall_1.getWallMaxYY()) >= (this.base_data.AttackDistance + 200)) {
                    this.destroyYinDao();
                    return;
                }
                if (attWall_1) {
                    var distance = _super.prototype.getAttPos.call(this).y - attWall_1.getWallMaxYY() + 16;
                    if (this.att_node.height >= distance) {
                        this.att_node.height = distance;
                        this.light_jishu += dt;
                        if (this.light_jishu >= 0.2) {
                            this.light_jishu = 0;
                            this.lightDamage(attWall_1);
                        }
                    }
                    else {
                        this.att_node.height += this.light_speed * dt;
                    }
                }
            }
        }
    };
    YouLing = __decorate([
        ccclass
    ], YouLing);
    return YouLing;
}(MonsterNewNormal_1.default));
exports.default = YouLing;

cc._RF.pop();