"use strict";
cc._RF.push(module, '44ed5HShSpDIqmHbb+rBL/N', 'Rock');
// Scripts/Boss/Rock.ts

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
var EnemyConfig_1 = require("../Enemy/EnemyConfig");
var GameEffectsManager_1 = require("../Game/GameEffectsManager");
var GameManager_1 = require("../GameManager");
var Constants_1 = require("../Constants");
var MonsterManager_1 = require("../Monster/MonsterManager");
var AudioConstants_1 = require("../Sound/AudioConstants");
var MonsterData_1 = require("../Monster/MonsterData");
var FixedPos_1 = require("../UI/home/FixedPos");
var FightingManager_1 = require("../Game/FightingManager");
var GroundManager_1 = require("../Game/GroundManager");
var Boss_1 = require("./Boss");
var Hero_1 = require("../Hero/Game/Hero");
var HeroConfig_1 = require("../Hero/Game/HeroConfig");
var BuffData_1 = require("../Hero/Game/BuffData");
var Animation_Name;
(function (Animation_Name) {
    Animation_Name["Idle"] = "idle";
    Animation_Name["attack1"] = "attack1";
    Animation_Name["run"] = "run";
    Animation_Name["hurt1"] = "hurt1";
    Animation_Name["skill1"] = "skill1";
    Animation_Name["skill2"] = "skill2";
    Animation_Name["skill3"] = "skill3";
    Animation_Name["dead"] = "dead";
})(Animation_Name || (Animation_Name = {}));
var SprintState;
(function (SprintState) {
    /**冲刺开始*/
    SprintState[SprintState["start"] = 0] = "start";
    /**冲刺中*/
    SprintState[SprintState["sprinting"] = 1] = "sprinting";
    /**冲刺结束*/
    SprintState[SprintState["end"] = 2] = "end";
})(SprintState || (SprintState = {}));
var RangeType;
(function (RangeType) {
    /**蓝色区域*/
    RangeType[RangeType["blue"] = 0] = "blue";
    /**红色区域*/
    RangeType[RangeType["red"] = 1] = "red";
    /**所有区域*/
    RangeType[RangeType["all"] = 2] = "all";
})(RangeType || (RangeType = {}));
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var Rock = /** @class */ (function (_super) {
    __extends(Rock, _super);
    function Rock() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.prev_pos = null;
        _this.red_range = null;
        _this.blue_range = null;
        _this.move_range = null;
        _this.acceleration = 20;
        _this.cur_sprint_speed = 10;
        _this.sprint_state = SprintState.start;
        _this.att_jishu = 0;
        _this.skill_jishu = 0;
        _this.skill_move_effect = null;
        return _this;
    }
    Rock.prototype.onLoad = function () {
        _super.prototype.onLoad.call(this);
        GameEffectsManager_1.GameEffectsManager.getInstance().addEffectPoolById(GameEffectsManager_1.GameEffectId.boss2_att_end, 2);
        GameEffectsManager_1.GameEffectsManager.getInstance().addEffectPoolById(GameEffectsManager_1.GameEffectId.boss2_skill_end, 2);
        GameEffectsManager_1.GameEffectsManager.getInstance().addEffectPoolById(GameEffectsManager_1.GameEffectId.boss2_skill_move, 2);
        GameEffectsManager_1.GameEffectsManager.getInstance().addEffectPoolById(GameEffectsManager_1.GameEffectId.xuanyun, 2);
        this.addDeathCallback(this.onDeath);
        this.addXuanYunListen(this.onXuanYunResult);
        this.addBossInitedListen(this.onBossInited);
        this.initMovingRange();
        this.cur_sprint_speed = this.cur_move_speed;
    };
    Rock.prototype.initMovingRange = function () {
        var width = 512;
        var cPos = GameManager_1.default.getInstance().getFightCenter();
        //中心点的上半区是红色区域
        var redHeight = 320;
        this.red_range = cc.rect(cPos.x - width / 2, cPos.y, width, redHeight);
        //中心点的下半区是蓝色区域
        var bluedHeight = 160;
        this.blue_range = cc.rect(cPos.x - width / 2, cPos.y - bluedHeight, width, bluedHeight);
        this.move_range = cc.rect(this.blue_range.x, this.blue_range.y, width, bluedHeight + redHeight);
    };
    Rock.prototype.onBossInited = function () {
        this.startIdle();
    };
    Rock.prototype.setTargetPos = function (pos, endCallback) {
        this.move_target_pos = pos;
        this.move_end_callback = endCallback;
    };
    Rock.prototype.startIdle = function () {
        _super.prototype.setEnemyState.call(this, EnemyConfig_1.Enemy_State.standby);
        _super.prototype.playSpinAnimaton.call(this, Animation_Name.Idle, true);
        this.scheduleOnce(this.startMove, 1);
    };
    Rock.prototype.onXuanYunResult = function (isXuanYun) {
        if (isXuanYun) {
            this.startXuanYun();
        }
        else {
            //根据上个状态判断需要做什么
            if (!_super.prototype.getIsDie.call(this))
                this.startIdle();
        }
    };
    Rock.prototype.startXuanYun = function () {
        var _this = this;
        _super.prototype.playSpinAnimaton.call(this, Animation_Name.hurt1, false, null, function () {
            if (_super.prototype.isHaveDeBuffType.call(_this, HeroConfig_1.BuffType.Vertigo) && !_super.prototype.getIsDie.call(_this))
                _this.spine.paused = true;
        });
    };
    Rock.prototype.startMove = function (dt, pos) {
        var _this = this;
        _super.prototype.setEnemyState.call(this, EnemyConfig_1.Enemy_State.move);
        _super.prototype.playSpinAnimaton.call(this, Animation_Name.run, true);
        pos = pos ? pos : this.getRandomPos(RangeType.all);
        this.prev_pos = this.node.getPosition();
        this.setTargetPos(pos, function () {
            if (_this.node.x < -128) {
                _this.node.scaleX = _this.setup_scale;
            }
            if (_this.node.x > 128) {
                _this.node.scaleX = -_this.setup_scale;
            }
            var curPos = _this.node.getPosition();
            var distance = curPos.sub(_this.prev_pos).mag();
            if (distance >= 200) {
                _this.startIdle();
            }
            else {
                _this.startMove(0, _this.getRandomPos(RangeType.all));
            }
        });
        if (this.skill_move_effect) {
            GameEffectsManager_1.GameEffectsManager.getInstance().destroyGameEffectById(GameEffectsManager_1.GameEffectId.boss2_skill_move, this.skill_move_effect);
            this.skill_move_effect = null;
        }
    };
    Rock.prototype.startAttack = function () {
        var _this = this;
        if (this.getEnemyState() == EnemyConfig_1.Enemy_State.skill) {
            return;
        }
        if (this.move_range.contains(this.node.getPosition())) {
            //有前摇动作
            this.att_jishu = 0;
            this.unschedule(this.startMove);
            _super.prototype.setEnemyState.call(this, EnemyConfig_1.Enemy_State.att);
            var data = new MonsterData_1.KeyFrameData();
            data.name = "attack1_Start";
            data.callback = function () {
                _this.startLaunch();
            };
            _super.prototype.playSpinAnimaton.call(this, Animation_Name.attack1, false, data, function () {
                _this.startIdle();
            });
        }
        else {
            this.startMove(0, this.getRandomPos(RangeType.all));
        }
    };
    Rock.prototype.startSkill = function () {
        var _this = this;
        if (this.red_range.contains(this.node.getPosition())) {
            this.skill_jishu = 0;
            this.cur_toughness = 1;
            this.unschedule(this.startMove);
            this.skill_jishu = 0;
            _super.prototype.setEnemyState.call(this, EnemyConfig_1.Enemy_State.skill);
            this.cur_sprint_speed = this.cur_move_speed;
            this.sprint_state = SprintState.start;
            //蓄力先放技能1
            _super.prototype.playSpinAnimaton.call(this, Animation_Name.skill1, false, null, function () {
                //再放技能2
                _super.prototype.playSpinAnimaton.call(_this, Animation_Name.skill2, true, null, null);
                _this.releaseSkill();
            });
        }
        else {
            this.startMove(0, this.getRandomPos(RangeType.red));
        }
    };
    Rock.prototype.releaseSkill = function () {
        //开始移动
        this.sprint_state = SprintState.sprinting;
        //添加特效
        this.skill_move_effect = GroundManager_1.default.getInstance().createGameEffectById(GameEffectsManager_1.GameEffectId.boss2_skill_move, this.node.getPosition().add(cc.v2(10, 150)));
        this.skill_move_effect.getComponent(FixedPos_1.default).init(this.node, cc.v2(10, 150));
    };
    Rock.prototype.getRandomPos = function (type) {
        var pos = cc.v2(0, 0);
        var rect = this.move_range;
        switch (type) {
            case RangeType.blue:
                {
                    rect = this.blue_range;
                }
                break;
            case RangeType.red:
                {
                    rect = this.red_range;
                }
                break;
            case RangeType.all:
                {
                    rect = this.move_range;
                }
                break;
        }
        pos.x = rect.x + Math.random() * rect.width;
        pos.y = rect.y + Math.random() * rect.height;
        return pos;
    };
    Rock.prototype.startLaunch = function () {
        GameEffectsManager_1.GameEffectsManager.getInstance().createGameEffectById(GameEffectsManager_1.GameEffectId.boss2_att_end, cc.v2(Math.random() * 512 - 256, GameManager_1.default.getInstance().enemy_att_y));
        //造成伤害
        _super.prototype.injureWall.call(this, this.cur_att, HeroConfig_1.DamageType.Normal);
    };
    Rock.prototype.onDeath = function () {
        var _this = this;
        if (this.skill_move_effect) {
            GameEffectsManager_1.GameEffectsManager.getInstance().destroyGameEffectById(GameEffectsManager_1.GameEffectId.boss2_skill_move, this.skill_move_effect);
            this.skill_move_effect = null;
        }
        _super.prototype.playDeadAnimaton.call(this, Animation_Name.dead, function () {
            MonsterManager_1.default.getInstance().destroyMonster(_this.node, _this.monster_type);
        });
        this.unscheduleAllCallbacks();
        GameManager_1.default.getInstance().sound_manager.playSound(AudioConstants_1.SoundIndex.rewardBox2);
    };
    Rock.prototype.onSprintEnd = function () {
        var _this = this;
        if (this.skill_move_effect) {
            GameEffectsManager_1.GameEffectsManager.getInstance().destroyGameEffectById(GameEffectsManager_1.GameEffectId.boss2_skill_move, this.skill_move_effect);
            this.skill_move_effect = null;
        }
        _super.prototype.playSpinAnimaton.call(this, Animation_Name.skill3, true, null, function () {
            _this.startMove(0, _this.getRandomPos(RangeType.blue));
            _this.cur_toughness = 0;
        });
        cc.tween(this.node).then(cc.jumpBy(20 / 60, 0, 80, 64, 1)).start();
        //造成伤害和眩晕
        _super.prototype.injureWall.call(this, this.cur_att, HeroConfig_1.DamageType.Skill);
        //特效 
        FightingManager_1.default.getInstance().createGameEffectById(GameEffectsManager_1.GameEffectId.boss2_skill_end, this.node.getPosition().add(cc.v2(10, 32)));
        var heroRoot = cc.find('Canvas/Hero_Root');
        var data = new BuffData_1.BuffData();
        data.buff_type = HeroConfig_1.BuffType.Vertigo;
        data.buff_id = HeroConfig_1.BuffId.Monster_XuanYun;
        data.remain_time = 2;
        for (var i = 0; i < heroRoot.childrenCount; i++) {
            var hero = heroRoot.children[i].getComponent(Hero_1.default);
            if (hero)
                hero.addDeBuff(data);
        }
    };
    Rock.prototype.update = function (dt) {
        if ((GameManager_1.default.getInstance().cur_game_state != Constants_1.GameState.Game_Playing) || this.getIsDie()) {
            return;
        }
        _super.prototype.update.call(this, dt);
        this.att_jishu += dt;
        this.skill_jishu += dt;
        if (this.att_jishu >= this.att_jiange && this.move_range.contains(this.node.getPosition())) {
            this.startAttack();
        }
        if (this.skill_jishu >= 10 && this.red_range.contains(this.node.getPosition())) {
            this.startSkill();
        }
        if (this.getEnemyState() == EnemyConfig_1.Enemy_State.move) {
            this.checkMove(dt);
        }
        else if (this.getEnemyState() == EnemyConfig_1.Enemy_State.skill) {
            switch (this.sprint_state) {
                case SprintState.sprinting:
                    {
                        this.sprinting(dt);
                    }
                    break;
                case SprintState.end: {
                }
            }
        }
    };
    Rock.prototype.checkMove = function (dt) {
        if (!_super.prototype.isHaveDeBuffType.call(this, HeroConfig_1.BuffType.Vertigo)) {
            var speed = this.cur_move_speed * dt;
            if (this.move_target_pos) {
                var offsetPos = this.move_target_pos.sub(this.node.getPosition());
                this.node.scaleX = offsetPos.x > 0 ? this.setup_scale : -this.setup_scale;
                if (offsetPos.mag() < speed) {
                    if (this.move_end_callback) {
                        this.move_end_callback();
                        this.move_end_callback = null;
                    }
                }
                else {
                    var pi2 = Math.PI * 2;
                    this.move_direction = (Math.atan2(offsetPos.y, offsetPos.x) + pi2) % pi2;
                    this.moving(dt);
                }
            }
        }
    };
    Rock.prototype.moving = function (dt) {
        var disX = this.node.x;
        var disY = this.node.y;
        var speed = this.cur_move_speed * dt;
        disX += speed * Math.cos(this.move_direction);
        disY += speed * Math.sin(this.move_direction);
        this.node.x = disX;
        this.node.y = disY;
        if (this.node.x > 320) {
            this.node.x = 320;
        }
        if (this.node.x < -320) {
            this.node.x = -320;
        }
        //不能穿过城墙
        if (this.node.y < this.wall_yy) {
            this.node.y = this.wall_yy;
        }
    };
    Rock.prototype.sprinting = function (dt) {
        var disX = this.node.x;
        var disY = this.node.y;
        this.cur_sprint_speed += this.acceleration;
        var speed = this.cur_sprint_speed * dt;
        this.move_direction = Math.PI * 3 / 2;
        disY += speed * Math.sin(this.move_direction);
        this.node.x = disX;
        this.node.y = disY;
        if (this.node.x > 320) {
            this.node.x = 320;
        }
        if (this.node.x < -320) {
            this.node.x = -320;
        }
        //不能穿过城墙
        if (this.node.y < (this.wall_yy - 100)) {
            this.node.y = this.wall_yy - 100;
            this.sprint_state = SprintState.end;
            this.onSprintEnd();
        }
    };
    Rock = __decorate([
        ccclass
    ], Rock);
    return Rock;
}(Boss_1.default));
exports.default = Rock;

cc._RF.pop();