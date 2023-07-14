"use strict";
cc._RF.push(module, '71c83bAsytP2I+g15u5Xnr4', 'Elite73');
// Scripts/Monster/Elite/Elite73.ts

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
var MonsterData_1 = require("../MonsterData");
var MonsterNewNormal_1 = require("../MonsterNewNormal");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var Elite73 = /** @class */ (function (_super) {
    __extends(Elite73, _super);
    function Elite73() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.is_skill_state = false;
        _this.gou = null;
        _this.is_gou_ok = false;
        /**铁链之间的间隔距离 */
        _this.lian_jiange = 65;
        _this.lian_height = 74;
        _this.lian_jiaoji = -9;
        _this.lian_root = null;
        /**勾的终点,勾的锚点 */
        _this.dis_yy = -1000;
        _this.gou_speed = 4000;
        return _this;
    }
    Elite73.prototype.onLoad = function () {
        _super.prototype.onLoad.call(this);
        _super.prototype.addMonsterNormalInited.call(this, this.onMonsterNormalInited);
        _super.prototype.addMonsterNormalXuanYun.call(this, this.onMonsterNormalXuanYun);
        _super.prototype.addMonsterNormalDeath.call(this, this.onMonsterNormalDeath);
        GameEffectsManager_1.GameEffectsManager.getInstance().addEffectPoolById(GameEffectsManager_1.GameEffectId.monster73_skill_lian, 8);
        GameEffectsManager_1.GameEffectsManager.getInstance().addEffectPoolById(GameEffectsManager_1.GameEffectId.monster73_skill_lian_root);
        GameEffectsManager_1.GameEffectsManager.getInstance().addEffectPoolById(GameEffectsManager_1.GameEffectId.monster73_skill_mao);
    };
    Elite73.prototype.onMonsterNormalInited = function () {
        this.dis_yy = -1000;
    };
    Elite73.prototype.onMonsterNormalXuanYun = function (isXuanYun) {
    };
    Elite73.prototype.onMonsterNormalDeath = function () {
        this.is_skill_state = false;
        this.destroyLian();
    };
    Elite73.prototype.startSkill = function () {
        var _this = this;
        //冷却完毕，可以判断是否可以出钩
        var walls = WallManager_1.default.getInstance().getAllWall();
        var attWall = null;
        var offsetYY = 0;
        walls.forEach(function (wall, wallType) {
            //出钩满足大于80小于500.
            offsetYY = Math.abs(_this.node.y - wall.getWallMaxYY());
            if (_this.node.y >= wall.getWallMaxYY() && offsetYY > 80 && offsetYY < 500) {
                var newYY = wall.getWallMaxYY() + 80;
                if (newYY > _this.dis_yy) {
                    attWall = wall;
                    _this.dis_yy = newYY;
                }
            }
        });
        if (attWall) {
            this.setEnemyState(EnemyConfig_1.Enemy_State.skill);
            this.skill_cold_down[0] = this.skill_data.getSkillColdDown(1);
            var pos_1 = this.getAttPos();
            var data = new MonsterData_1.KeyFrameData();
            data.name = "Skill";
            data.callback = function () {
                _this.is_skill_state = true;
                _this.skill_cold_down[0] = _this.skill_data.getSkillColdDown(1);
                //链锁Root
                _this.lian_root = GameEffectsManager_1.GameEffectsManager.getInstance().createGameEffectById(GameEffectsManager_1.GameEffectId.monster73_skill_lian_root, pos_1);
                //出钩
                _this.gou = GameEffectsManager_1.GameEffectsManager.getInstance().createGameEffectById(GameEffectsManager_1.GameEffectId.monster73_skill_mao, pos_1);
                if (_this.node.scaleX > 0) {
                    _this.gou.angle = 200;
                }
                else {
                    _this.gou.angle = 130;
                }
                //计算铁链数量
                var lianNum = Math.ceil(offsetYY / _this.lian_jiange) + 4;
                for (var i = 0; i < lianNum; i++) {
                    GameEffectsManager_1.GameEffectsManager.getInstance().createGameEffectForParent(GameEffectsManager_1.GameEffectId.monster73_skill_lian, cc.v2(0, i * 65), _this.lian_root);
                }
                _this.lian_root.height = 0;
                _this.lian_root.angle = 180;
            };
            _super.prototype.playSpinAnimaton.call(this, "Side_Skill_1", false, data, function () {
                _super.prototype.playSpinAnimaton.call(_this, "Side_Skill_2", true);
            });
        }
    };
    Elite73.prototype.endSkill = function () {
        var _this = this;
        this.is_skill_state = false;
        this.destroyLian();
        _super.prototype.playSpinAnimaton.call(this, "Side_Skill_3", false, null, function () {
            if (_this.getIsDie() == false) {
                _this.startIdle();
                _this.setEnemyState(EnemyConfig_1.Enemy_State.move);
            }
        });
    };
    Elite73.prototype.destroyLian = function () {
        if (this.gou) {
            GameEffectsManager_1.GameEffectsManager.getInstance().destroyGameEffectById(GameEffectsManager_1.GameEffectId.monster73_skill_mao, this.gou);
            this.gou = null;
        }
        if (this.lian_root) {
            for (var i = this.lian_root.childrenCount - 1; i >= 0; i--) {
                GameEffectsManager_1.GameEffectsManager.getInstance().destroyGameEffectById(GameEffectsManager_1.GameEffectId.monster73_skill_lian, this.lian_root.children[i]);
            }
            GameEffectsManager_1.GameEffectsManager.getInstance().destroyGameEffectById(GameEffectsManager_1.GameEffectId.monster73_skill_lian_root, this.lian_root);
            this.lian_root = null;
        }
    };
    Elite73.prototype.onGouColliderWall = function () {
        this.is_gou_ok = true;
    };
    Elite73.prototype.update = function (dt) {
        var _this = this;
        _super.prototype.update.call(this, dt);
        this.checkSkill(dt);
        if (this.is_skill_state && GameManager_1.default.getInstance().cur_game_state == Constants_1.GameState.Game_Playing) {
            if (this.gou) {
                if (this.isHaveDeBuff(HeroConfig_1.BuffId.Hero_MeiMo_Active_MeiHuo)) {
                    this.onMonsterNormalXuanYun(true);
                    return;
                }
                var pos = _super.prototype.getAttPos.call(this);
                if (this.gou.y <= this.dis_yy) {
                    this.gou.y = this.dis_yy;
                    //跟随勾走
                    var offsetPos = this.gou.getPosition().sub(this.getAttPos());
                    var dir = Math.atan2(offsetPos.y, offsetPos.x);
                    this.node.y = this.node.y + Math.sin(dir) * dt * this.gou_speed / 3;
                    this.node.x = this.node.x + Math.cos(dir) * dt * this.gou_speed / 3;
                    pos = _super.prototype.getAttPos.call(this);
                    var walls = WallManager_1.default.getInstance().getAllWall();
                    var attWall_1 = null;
                    walls.forEach(function (wall, wallType) {
                        //攻击城墙的条件1，必须在城墙之上,2达到攻击距离
                        if (_this.node.y >= wall.getWallMaxYY()) {
                            attWall_1 = wall;
                        }
                    });
                    //this.gou.setPosition(pos);                    
                    offsetPos = this.gou.getPosition().sub(pos);
                    this.lian_root.height = offsetPos.mag();
                    dir = Math.atan2(offsetPos.y, offsetPos.x);
                    this.lian_root.angle = MyTool_1.default.radianToAngle(dir) - 90;
                    this.lian_root.setPosition(pos);
                    if (pos.y <= (attWall_1.getWallMaxYY() + 80)) {
                        this.endSkill();
                        return;
                    }
                }
                else {
                    //钩要先走
                    this.gou.y -= dt * this.gou_speed;
                    //铁链
                    var offsetPos = this.gou.getPosition().sub(pos);
                    this.lian_root.height = offsetPos.mag();
                    var dir = Math.atan2(offsetPos.y, offsetPos.x);
                    this.lian_root.angle = MyTool_1.default.radianToAngle(dir) - 90;
                    this.lian_root.setPosition(pos);
                    var walls = WallManager_1.default.getInstance().getAllWall();
                    walls.forEach(function (wall, wallType) {
                        //攻击城墙的条件1，必须在城墙之上,2达到攻击距离
                        if (_this.gou.y >= wall.getWallMaxYY()) {
                            var newYY = wall.getWallMaxYY() + 80;
                            if (newYY > _this.dis_yy) {
                                _this.dis_yy = newYY;
                            }
                        }
                    });
                }
                if ((pos.y <= this.dis_yy)) {
                    this.endSkill();
                    return;
                }
            }
        }
    };
    Elite73.prototype.checkSkill = function (dt) {
        for (var i = 0; i < 1; i++) {
            if (this.skill_cold_down[i] > 0) {
                this.skill_cold_down[i] -= dt;
                if (this.skill_cold_down[i] < 0) {
                    this.skill_cold_down[i] = 0;
                    this.startSkill();
                }
            }
            else {
                this.startSkill();
            }
        }
    };
    Elite73 = __decorate([
        ccclass
    ], Elite73);
    return Elite73;
}(MonsterNewNormal_1.default));
exports.default = Elite73;

cc._RF.pop();