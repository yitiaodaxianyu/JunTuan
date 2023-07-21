"use strict";
cc._RF.push(module, '9a7b7ZL8YxC9rz/F2J5yb2r', 'Elite1');
// Scripts/Monster/Elite/Elite1.ts

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
var MyTool_1 = require("../../Tools/MyTool");
var WallManager_1 = require("../../Wall/WallManager");
var MonsterNewNormal_1 = require("../MonsterNewNormal");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var Elite1 = /** @class */ (function (_super) {
    __extends(Elite1, _super);
    function Elite1() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.chongci_juli = 0;
        _this.is_chongci = false;
        _this.is_xuli = false;
        _this.chong_ci_speed = 1000;
        _this.jiasu = 200;
        _this.cur_jiasu = 0;
        _this.is_release_skill = false;
        return _this;
    }
    Elite1.prototype.onLoad = function () {
        _super.prototype.onLoad.call(this);
        GameEffectsManager_1.GameEffectsManager.getInstance().addEffectPoolById(GameEffectsManager_1.GameEffectId.monster37_shitouren, 1);
        _super.prototype.addMonsterNormalInited.call(this, this.onMonsterNormalInited);
        this.addXuanYunListen(this.onXuanYunResult);
    };
    Elite1.prototype.onMonsterNormalInited = function () {
        this.chongci_juli = this.skill_data.getCastingRange(1);
        this.is_chongci = false;
        this.cur_jiasu = 0;
        this.is_release_skill = false;
    };
    Elite1.prototype.onXuanYunResult = function (isXuanYun) {
        if (isXuanYun) {
            this.startXuanYun();
        }
        else {
            if (!_super.prototype.getIsDie.call(this)) {
                this.startIdle();
                this.setEnemyState(EnemyConfig_1.Enemy_State.move);
            }
        }
    };
    Elite1.prototype.startXuanYun = function () {
        this.unschedule(this.startChongCi);
        this.is_xuli = false;
    };
    Elite1.prototype.startSkill = function () {
        this.setEnemyState(EnemyConfig_1.Enemy_State.skill);
        //蓄力
        _super.prototype.playSpinAnimaton.call(this, "Side_Skill1_1", true, null, null);
        this.is_xuli = true;
        this.scheduleOnce(this.startChongCi, 3);
        this.is_release_skill = true;
    };
    Elite1.prototype.startChongCi = function () {
        if (this.is_xuli == true) {
            this.is_xuli = false;
            this.is_chongci = true;
            this.cur_toughness += 1;
            //冲刺
            _super.prototype.playSpinAnimaton.call(this, "Side_Skill1_2", true, null, null);
        }
    };
    Elite1.prototype.endChongCi = function (wall) {
        var _this = this;
        this.cur_toughness -= 1;
        this.is_chongci = false;
        _super.prototype.playSpinAnimaton.call(this, "Side_Skill1_3", false, null, function () {
            _this.startIdle();
            _this.setEnemyState(EnemyConfig_1.Enemy_State.move);
        });
        var data = wall.beInjured(this.getAttData(HeroConfig_1.DamageType.Skill, false, this.skill_data.getSkillValue1(1)));
        if (data.getDamageNum() > 0) {
            GameEffectsManager_1.GameEffectsManager.getInstance().createGameEffectById(GameEffectsManager_1.GameEffectId.monster37_shitouren, cc.v2(this.node.x, wall.getWallMaxYY()));
        }
        cc.tween(this.node).by(0.2, { y: this.base_data.AttackDistance }).start();
        MyTool_1.default.randomSceneShakeSmall();
    };
    Elite1.prototype.update = function (dt) {
        if ((GameManager_1.default.getInstance().cur_game_state != Constants_1.GameState.Game_Playing) || this.getIsDie()) {
            return;
        }
        _super.prototype.update.call(this, dt);
        //this.checkSkill(dt);
    };
    Elite1.prototype.checkSkill = function (dt) {
        var _this = this;
        if (this.getEnemyState() != EnemyConfig_1.Enemy_State.skill) {
            if (this.is_release_skill == true) {
                return;
            }
            var walls = WallManager_1.default.getInstance().getAllWall();
            var attWall_1 = null;
            walls.forEach(function (wall, wallType) {
                //攻击城墙的条件1，必须在城墙之上,2达到攻击距离
                var distance = Math.abs(_this.node.y - wall.getWallMaxYY());
                if (_this.node.y >= wall.getWallMaxYY() && distance <= _this.chongci_juli && distance > _this.base_data.AttackDistance) {
                    attWall_1 = wall;
                }
            });
            if (attWall_1) {
                this.startSkill();
            }
        }
        else {
            if (this.is_chongci) {
                this.cur_jiasu += dt * this.jiasu;
                this.node.y -= dt * (this.chong_ci_speed + this.cur_jiasu);
                var walls = WallManager_1.default.getInstance().getAllWall();
                var attWall_2 = null;
                walls.forEach(function (wall, wallType) {
                    //攻击城墙的条件1，必须在城墙之上,2达到攻击距离
                    if (_this.node.y >= wall.getWallMaxYY() && Math.abs(_this.node.y - wall.getWallMaxYY()) <= _this.base_data.AttackDistance / 2) {
                        attWall_2 = wall;
                    }
                });
                if (attWall_2) {
                    this.endChongCi(attWall_2);
                }
                else {
                    var mainWall = WallManager_1.default.getInstance().getMainWall();
                    if (this.node.y <= mainWall.getWallMaxYY()) {
                        this.endChongCi(mainWall);
                    }
                }
            }
        }
    };
    Elite1 = __decorate([
        ccclass
    ], Elite1);
    return Elite1;
}(MonsterNewNormal_1.default));
exports.default = Elite1;

cc._RF.pop();