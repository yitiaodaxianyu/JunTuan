
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Scripts/Boss/Rock.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0c1xcQm9zc1xcUm9jay50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxvREFBc0U7QUFDdEUsaUVBQThFO0FBQzlFLDhDQUF5QztBQUN6QywwQ0FBeUM7QUFDekMsNERBQXVEO0FBQ3ZELDBEQUFxRDtBQUNyRCxzREFBc0Q7QUFDdEQsZ0RBQTJDO0FBQzNDLDJEQUFzRDtBQUN0RCx1REFBa0Q7QUFDbEQsK0JBQTBCO0FBQzFCLDBDQUFxQztBQUNyQyxzREFBK0Y7QUFFL0Ysa0RBQWlEO0FBRWpELElBQUssY0FVSjtBQVZELFdBQUssY0FBYztJQUVmLCtCQUFhLENBQUE7SUFDYixxQ0FBbUIsQ0FBQTtJQUNuQiw2QkFBVyxDQUFBO0lBQ1gsaUNBQWUsQ0FBQTtJQUNmLG1DQUFpQixDQUFBO0lBQ2pCLG1DQUFpQixDQUFBO0lBQ2pCLG1DQUFpQixDQUFBO0lBQ2pCLCtCQUFZLENBQUE7QUFDaEIsQ0FBQyxFQVZJLGNBQWMsS0FBZCxjQUFjLFFBVWxCO0FBRUQsSUFBSyxXQU9KO0FBUEQsV0FBSyxXQUFXO0lBQ1osU0FBUztJQUNULCtDQUFPLENBQUE7SUFDUCxRQUFRO0lBQ1IsdURBQVMsQ0FBQTtJQUNULFNBQVM7SUFDVCwyQ0FBRyxDQUFBO0FBQ1AsQ0FBQyxFQVBJLFdBQVcsS0FBWCxXQUFXLFFBT2Y7QUFFRCxJQUFLLFNBT0o7QUFQRCxXQUFLLFNBQVM7SUFDVixTQUFTO0lBQ1QseUNBQU0sQ0FBQTtJQUNOLFNBQVM7SUFDVCx1Q0FBRyxDQUFBO0lBQ0gsU0FBUztJQUNULHVDQUFHLENBQUE7QUFDUCxDQUFDLEVBUEksU0FBUyxLQUFULFNBQVMsUUFPYjtBQUVLLElBQUEsS0FBc0IsRUFBRSxDQUFDLFVBQVUsRUFBbEMsT0FBTyxhQUFBLEVBQUUsUUFBUSxjQUFpQixDQUFDO0FBRzFDO0lBQWtDLHdCQUFJO0lBQXRDO1FBQUEscUVBdVRDO1FBclRHLGNB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Q0FBQyxHQUFDLElBQUksQ0FBQztRQUNqQixJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsR0FBQyxJQUFJLENBQUM7UUFDakIsSUFBRyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsR0FBQyxHQUFHLEVBQ2xCO1lBQ0ksSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLEdBQUMsR0FBRyxDQUFDO1NBQ25CO1FBQ0QsSUFBRyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsR0FBQyxDQUFDLEdBQUcsRUFDbkI7WUFDSSxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsR0FBQyxDQUFDLEdBQUcsQ0FBQztTQUNwQjtRQUNELFFBQVE7UUFDUixJQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxHQUFDLENBQUMsSUFBSSxDQUFDLE9BQU8sR0FBQyxHQUFHLENBQUMsRUFBQztZQUM5QixJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsR0FBQyxJQUFJLENBQUMsT0FBTyxHQUFDLEdBQUcsQ0FBQztZQUM3QixJQUFJLENBQUMsWUFBWSxHQUFDLFdBQVcsQ0FBQyxHQUFHLENBQUM7WUFDbEMsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDO1NBQ3RCO0lBQ0wsQ0FBQztJQXRUZ0IsSUFBSTtRQUR4QixPQUFPO09BQ2EsSUFBSSxDQXVUeEI7SUFBRCxXQUFDO0NBdlRELEFBdVRDLENBdlRpQyxjQUFJLEdBdVRyQztrQkF2VG9CLElBQUkiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBFbmVteV9EZUJ1ZmZfVHlwZSwgRW5lbXlfU3RhdGUgfSBmcm9tIFwiLi4vRW5lbXkvRW5lbXlDb25maWdcIjtcclxuaW1wb3J0IHsgR2FtZUVmZmVjdElkLCBHYW1lRWZmZWN0c01hbmFnZXIgfSBmcm9tIFwiLi4vR2FtZS9HYW1lRWZmZWN0c01hbmFnZXJcIjtcclxuaW1wb3J0IEdhbWVNYW5hZ2VyIGZyb20gXCIuLi9HYW1lTWFuYWdlclwiO1xyXG5pbXBvcnQgeyBHYW1lU3RhdGUgfSBmcm9tIFwiLi4vQ29uc3RhbnRzXCI7XHJcbmltcG9ydCBNb25zdGVyTWFuYWdlciBmcm9tIFwiLi4vTW9uc3Rlci9Nb25zdGVyTWFuYWdlclwiO1xyXG5pbXBvcnQgeyBTb3VuZEluZGV4IH0gZnJvbSBcIi4uL1NvdW5kL0F1ZGlvQ29uc3RhbnRzXCI7XHJcbmltcG9ydCB7IEtleUZyYW1lRGF0YSB9IGZyb20gXCIuLi9Nb25zdGVyL01vbnN0ZXJEYXRhXCI7XHJcbmltcG9ydCBGaXhlZFBvcyBmcm9tIFwiLi4vVUkvaG9tZS9GaXhlZFBvc1wiO1xyXG5pbXBvcnQgRmlnaHRpbmdNYW5hZ2VyIGZyb20gXCIuLi9HYW1lL0ZpZ2h0aW5nTWFuYWdlclwiO1xyXG5pbXBvcnQgR3JvdW5kTWFuYWdlciBmcm9tIFwiLi4vR2FtZS9Hcm91bmRNYW5hZ2VyXCI7XHJcbmltcG9ydCBCb3NzIGZyb20gXCIuL0Jvc3NcIjtcclxuaW1wb3J0IEhlcm8gZnJvbSBcIi4uL0hlcm8vR2FtZS9IZXJvXCI7XHJcbmltcG9ydCB7IERhbWFnZVR5cGUsIEhlcm9fVHlwZSwgSGVyb19EZUJ1ZmYsIEJ1ZmZUeXBlLCBCdWZmSWQgfSBmcm9tIFwiLi4vSGVyby9HYW1lL0hlcm9Db25maWdcIjtcclxuaW1wb3J0IEJ1ZmZUaW1lciBmcm9tIFwiLi4vSGVyby9HYW1lL0J1ZmZUaW1lclwiO1xyXG5pbXBvcnQgeyBCdWZmRGF0YSB9IGZyb20gXCIuLi9IZXJvL0dhbWUvQnVmZkRhdGFcIjtcclxuXHJcbmVudW0gQW5pbWF0aW9uX05hbWVcclxue1xyXG4gICAgSWRsZSA9IFwiaWRsZVwiLCAgICAgICAvLy0tIOato+mdouW+heaculxyXG4gICAgYXR0YWNrMSA9IFwiYXR0YWNrMVwiLCAgICAgICAgICAvLy0tIOaUu+WHuzFcclxuICAgIHJ1biA9IFwicnVuXCIsICAgICAgICAgICAgICAgIC8vLS0g6LeR6LevXHJcbiAgICBodXJ0MSA9IFwiaHVydDFcIiwgICAgICAgICAgLy8tLSDlj5flh7sxXHJcbiAgICBza2lsbDEgPSBcInNraWxsMVwiLCAgICAgICAgICAvLy0tIOaKgOiDveWKqOS9nDFcclxuICAgIHNraWxsMiA9IFwic2tpbGwyXCIsICAgICAgICAgIC8vLS0g5oqA6IO95Yqo5L2cMlxyXG4gICAgc2tpbGwzID0gXCJza2lsbDNcIiwgICAgICAgICAgLy8tLSDmioDog73liqjkvZwzXHJcbiAgICBkZWFkPSBcImRlYWRcIiwgICAvL+atu+S6oVxyXG59XHJcblxyXG5lbnVtIFNwcmludFN0YXRle1xyXG4gICAgLyoq5Yay5Yi65byA5aeLKi9cclxuICAgIHN0YXJ0PTAsXHJcbiAgICAvKirlhrLliLrkuK0qL1xyXG4gICAgc3ByaW50aW5nLFxyXG4gICAgLyoq5Yay5Yi657uT5p2fKi9cclxuICAgIGVuZCxcclxufVxyXG5cclxuZW51bSBSYW5nZVR5cGV7XHJcbiAgICAvKirok53oibLljLrln58qL1xyXG4gICAgYmx1ZT0wLFxyXG4gICAgLyoq57qi6Imy5Yy65Z+fKi9cclxuICAgIHJlZCxcclxuICAgIC8qKuaJgOacieWMuuWfnyovXHJcbiAgICBhbGwsXHJcbn1cclxuXHJcbmNvbnN0IHtjY2NsYXNzLCBwcm9wZXJ0eX0gPSBjYy5fZGVjb3JhdG9yO1xyXG5cclxuQGNjY2xhc3NcclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUm9jayBleHRlbmRzIEJvc3Mge1xyXG5cclxuICAgIHByZXZfcG9zOmNjLlZlYzI9bnVsbDtcclxuICAgIHJlZF9yYW5nZTpjYy5SZWN0PW51bGw7XHJcbiAgICBibHVlX3JhbmdlOmNjLlJlY3Q9bnVsbDtcclxuICAgIG1vdmVfcmFuZ2U6Y2MuUmVjdD1udWxsO1xyXG4gICAgYWNjZWxlcmF0aW9uOm51bWJlcj0yMDtcclxuICAgIGN1cl9zcHJpbnRfc3BlZWQ6bnVtYmVyPTEwO1xyXG4gICAgc3ByaW50X3N0YXRlOlNwcmludFN0YXRlPVNwcmludFN0YXRlLnN0YXJ0O1xyXG4gICAgYXR0X2ppc2h1Om51bWJlcj0wO1xyXG4gICAgc2tpbGxfamlzaHU6bnVtYmVyPTA7XHJcbiAgICBza2lsbF9tb3ZlX2VmZmVjdDpjYy5Ob2RlPW51bGw7XHJcblxyXG4gICAgb25Mb2FkKCk6IHZvaWQge1xyXG4gICAgICAgIHN1cGVyLm9uTG9hZCgpO1xyXG4gICAgICAgIEdhbWVFZmZlY3RzTWFuYWdlci5nZXRJbnN0YW5jZSgpLmFkZEVmZmVjdFBvb2xCeUlkKEdhbWVFZmZlY3RJZC5ib3NzMl9hdHRfZW5kLDIpO1xyXG4gICAgICAgIEdhbWVFZmZlY3RzTWFuYWdlci5nZXRJbnN0YW5jZSgpLmFkZEVmZmVjdFBvb2xCeUlkKEdhbWVFZmZlY3RJZC5ib3NzMl9za2lsbF9lbmQsMik7XHJcbiAgICAgICAgR2FtZUVmZmVjdHNNYW5hZ2VyLmdldEluc3RhbmNlKCkuYWRkRWZmZWN0UG9vbEJ5SWQoR2FtZUVmZmVjdElkLmJvc3MyX3NraWxsX21vdmUsMik7XHJcbiAgICAgICAgR2FtZUVmZmVjdHNNYW5hZ2VyLmdldEluc3RhbmNlKCkuYWRkRWZmZWN0UG9vbEJ5SWQoR2FtZUVmZmVjdElkLnh1YW55dW4sMik7XHJcbiAgICAgICAgdGhpcy5hZGREZWF0aENhbGxiYWNrKHRoaXMub25EZWF0aCk7XHJcbiAgICAgICAgdGhpcy5hZGRYdWFuWXVuTGlzdGVuKHRoaXMub25YdWFuWXVuUmVzdWx0KTtcclxuICAgICAgICB0aGlzLmFkZEJvc3NJbml0ZWRMaXN0ZW4odGhpcy5vbkJvc3NJbml0ZWQpO1xyXG4gICAgICAgIHRoaXMuaW5pdE1vdmluZ1JhbmdlKCk7XHJcbiAgICAgICAgdGhpcy5jdXJfc3ByaW50X3NwZWVkPXRoaXMuY3VyX21vdmVfc3BlZWQ7XHJcbiAgICB9XHJcblxyXG4gICAgaW5pdE1vdmluZ1JhbmdlKCl7XHJcbiAgICAgICAgbGV0IHdpZHRoPTUxMjtcclxuICAgICAgICBsZXQgY1Bvcz1HYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldEZpZ2h0Q2VudGVyKCk7XHJcbiAgICAgICAgLy/kuK3lv4PngrnnmoTkuIrljYrljLrmmK/nuqLoibLljLrln59cclxuICAgICAgICBsZXQgcmVkSGVpZ2h0PTMyMDtcclxuICAgICAgICB0aGlzLnJlZF9yYW5nZT1jYy5yZWN0KGNQb3MueC13aWR0aC8yLGNQb3MueSx3aWR0aCxyZWRIZWlnaHQpOyAgIFxyXG4gICAgICAgIC8v5Lit5b+D54K555qE5LiL5Y2K5Yy65piv6JOd6Imy5Yy65Z+fXHJcbiAgICAgICAgbGV0IGJsdWVkSGVpZ2h0PTE2MDtcclxuICAgICAgICB0aGlzLmJsdWVfcmFuZ2U9Y2MucmVjdChjUG9zLngtd2lkdGgvMixjUG9zLnktYmx1ZWRIZWlnaHQsd2lkdGgsYmx1ZWRIZWlnaHQpO1xyXG4gICAgICAgIHRoaXMubW92ZV9yYW5nZT1jYy5yZWN0KHRoaXMuYmx1ZV9yYW5nZS54LHRoaXMuYmx1ZV9yYW5nZS55LHdpZHRoLGJsdWVkSGVpZ2h0K3JlZEhlaWdodCk7ICAgICAgICBcclxuICAgIH1cclxuXHJcbiAgICBvbkJvc3NJbml0ZWQoKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5zdGFydElkbGUoKTtcclxuICAgIH1cclxuXHJcbiAgICBzZXRUYXJnZXRQb3MocG9zOmNjLlZlYzIsZW5kQ2FsbGJhY2s6RnVuY3Rpb24pe1xyXG4gICAgICAgIHRoaXMubW92ZV90YXJnZXRfcG9zPXBvcztcclxuICAgICAgICB0aGlzLm1vdmVfZW5kX2NhbGxiYWNrPWVuZENhbGxiYWNrO1xyXG4gICAgfVxyXG5cclxuICAgIHN0YXJ0SWRsZSgpeyAgICAgICAgXHJcbiAgICAgICAgc3VwZXIuc2V0RW5lbXlTdGF0ZShFbmVteV9TdGF0ZS5zdGFuZGJ5KTtcclxuICAgICAgICBzdXBlci5wbGF5U3BpbkFuaW1hdG9uKEFuaW1hdGlvbl9OYW1lLklkbGUsdHJ1ZSk7XHJcbiAgICAgICAgdGhpcy5zY2hlZHVsZU9uY2UodGhpcy5zdGFydE1vdmUsMSlcclxuICAgIH1cclxuXHJcbiAgICBvblh1YW5ZdW5SZXN1bHQoaXNYdWFuWXVuOmJvb2xlYW4pe1xyXG4gICAgICAgIGlmKGlzWHVhbll1bil7XHJcbiAgICAgICAgICAgIHRoaXMuc3RhcnRYdWFuWXVuKCk7XHJcbiAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgIC8v5qC55o2u5LiK5Liq54q25oCB5Yik5pat6ZyA6KaB5YGa5LuA5LmIXHJcbiAgICAgICAgICAgIGlmKCFzdXBlci5nZXRJc0RpZSgpKVxyXG4gICAgICAgICAgICAgICAgdGhpcy5zdGFydElkbGUoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgc3RhcnRYdWFuWXVuKCl7XHJcbiAgICAgICAgc3VwZXIucGxheVNwaW5BbmltYXRvbihBbmltYXRpb25fTmFtZS5odXJ0MSxmYWxzZSxudWxsLCgpPT57XHJcbiAgICAgICAgICAgIGlmKHN1cGVyLmlzSGF2ZURlQnVmZlR5cGUoQnVmZlR5cGUuVmVydGlnbykmJiFzdXBlci5nZXRJc0RpZSgpKVxyXG4gICAgICAgICAgICAgICAgdGhpcy5zcGluZS5wYXVzZWQ9dHJ1ZTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBzdGFydE1vdmUoZHQ6bnVtYmVyLHBvcz86Y2MuVmVjMil7XHJcbiAgICAgICAgc3VwZXIuc2V0RW5lbXlTdGF0ZShFbmVteV9TdGF0ZS5tb3ZlKTtcclxuICAgICAgICBzdXBlci5wbGF5U3BpbkFuaW1hdG9uKEFuaW1hdGlvbl9OYW1lLnJ1bix0cnVlKTtcclxuICAgICAgICBwb3M9cG9zP3Bvczp0aGlzLmdldFJhbmRvbVBvcyhSYW5nZVR5cGUuYWxsKTtcclxuICAgICAgICB0aGlzLnByZXZfcG9zPXRoaXMubm9kZS5nZXRQb3NpdGlvbigpO1xyXG4gICAgICAgIHRoaXMuc2V0VGFyZ2V0UG9zKHBvcywoKT0+eyAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIGlmKHRoaXMubm9kZS54PC0xMjgpe1xyXG4gICAgICAgICAgICAgICAgdGhpcy5ub2RlLnNjYWxlWD10aGlzLnNldHVwX3NjYWxlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmKHRoaXMubm9kZS54PjEyOCl7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm5vZGUuc2NhbGVYPS10aGlzLnNldHVwX3NjYWxlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGxldCBjdXJQb3M9dGhpcy5ub2RlLmdldFBvc2l0aW9uKCk7XHJcbiAgICAgICAgICAgIGxldCBkaXN0YW5jZT1jdXJQb3Muc3ViKHRoaXMucHJldl9wb3MpLm1hZygpO1xyXG4gICAgICAgICAgICBpZihkaXN0YW5jZT49MjAwKXtcclxuICAgICAgICAgICAgICAgIHRoaXMuc3RhcnRJZGxlKCk7XHJcbiAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zdGFydE1vdmUoMCx0aGlzLmdldFJhbmRvbVBvcyhSYW5nZVR5cGUuYWxsKSk7XHJcbiAgICAgICAgICAgIH0gICAgICAgICAgICBcclxuICAgICAgICB9KVxyXG4gICAgICAgIGlmKHRoaXMuc2tpbGxfbW92ZV9lZmZlY3Qpe1xyXG4gICAgICAgICAgICBHYW1lRWZmZWN0c01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5kZXN0cm95R2FtZUVmZmVjdEJ5SWQoR2FtZUVmZmVjdElkLmJvc3MyX3NraWxsX21vdmUsdGhpcy5za2lsbF9tb3ZlX2VmZmVjdCk7XHJcbiAgICAgICAgICAgIHRoaXMuc2tpbGxfbW92ZV9lZmZlY3Q9bnVsbDtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgc3RhcnRBdHRhY2soKXtcclxuICAgICAgICBpZih0aGlzLmdldEVuZW15U3RhdGUoKT09RW5lbXlfU3RhdGUuc2tpbGwpe1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmKHRoaXMubW92ZV9yYW5nZS5jb250YWlucyh0aGlzLm5vZGUuZ2V0UG9zaXRpb24oKSkpe1xyXG4gICAgICAgICAgICAvL+acieWJjeaRh+WKqOS9nFxyXG4gICAgICAgICAgICB0aGlzLmF0dF9qaXNodT0wO1xyXG4gICAgICAgICAgICB0aGlzLnVuc2NoZWR1bGUodGhpcy5zdGFydE1vdmUpO1xyXG4gICAgICAgICAgICBzdXBlci5zZXRFbmVteVN0YXRlKEVuZW15X1N0YXRlLmF0dCk7XHJcbiAgICAgICAgICAgIGxldCBkYXRhPW5ldyBLZXlGcmFtZURhdGEoKTtcclxuICAgICAgICAgICAgZGF0YS5uYW1lPVwiYXR0YWNrMV9TdGFydFwiO1xyXG4gICAgICAgICAgICBkYXRhLmNhbGxiYWNrPSgpPT57XHJcbiAgICAgICAgICAgICAgICB0aGlzLnN0YXJ0TGF1bmNoKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgc3VwZXIucGxheVNwaW5BbmltYXRvbihBbmltYXRpb25fTmFtZS5hdHRhY2sxLGZhbHNlLGRhdGEsKCk9PntcclxuICAgICAgICAgICAgICAgIHRoaXMuc3RhcnRJZGxlKCk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1lbHNlXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLnN0YXJ0TW92ZSgwLHRoaXMuZ2V0UmFuZG9tUG9zKFJhbmdlVHlwZS5hbGwpKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgc3RhcnRTa2lsbCgpe1xyXG4gICAgICAgIGlmKHRoaXMucmVkX3JhbmdlLmNvbnRhaW5zKHRoaXMubm9kZS5nZXRQb3NpdGlvbigpKSl7XHJcbiAgICAgICAgICAgIHRoaXMuc2tpbGxfamlzaHU9MDtcclxuICAgICAgICAgICAgdGhpcy5jdXJfdG91Z2huZXNzPTE7XHJcbiAgICAgICAgICAgIHRoaXMudW5zY2hlZHVsZSh0aGlzLnN0YXJ0TW92ZSk7XHJcbiAgICAgICAgICAgIHRoaXMuc2tpbGxfamlzaHU9MDtcclxuICAgICAgICAgICAgc3VwZXIuc2V0RW5lbXlTdGF0ZShFbmVteV9TdGF0ZS5za2lsbCk7XHJcbiAgICAgICAgICAgIHRoaXMuY3VyX3NwcmludF9zcGVlZD10aGlzLmN1cl9tb3ZlX3NwZWVkO1xyXG4gICAgICAgICAgICB0aGlzLnNwcmludF9zdGF0ZT1TcHJpbnRTdGF0ZS5zdGFydDtcclxuICAgICAgICAgICAgLy/ok4TlipvlhYjmlL7mioDog70xXHJcbiAgICAgICAgICAgIHN1cGVyLnBsYXlTcGluQW5pbWF0b24oQW5pbWF0aW9uX05hbWUuc2tpbGwxLGZhbHNlLG51bGwsKCk9PntcclxuICAgICAgICAgICAgICAgIC8v5YaN5pS+5oqA6IO9MlxyXG4gICAgICAgICAgICAgICAgc3VwZXIucGxheVNwaW5BbmltYXRvbihBbmltYXRpb25fTmFtZS5za2lsbDIsdHJ1ZSxudWxsLG51bGwpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5yZWxlYXNlU2tpbGwoKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgIHRoaXMuc3RhcnRNb3ZlKDAsdGhpcy5nZXRSYW5kb21Qb3MoUmFuZ2VUeXBlLnJlZCkpO1xyXG4gICAgICAgIH0gICAgICAgIFxyXG4gICAgfVxyXG5cclxuICAgIHJlbGVhc2VTa2lsbCgpe1xyXG4gICAgICAgIC8v5byA5aeL56e75YqoXHJcbiAgICAgICAgdGhpcy5zcHJpbnRfc3RhdGU9U3ByaW50U3RhdGUuc3ByaW50aW5nO1xyXG4gICAgICAgIC8v5re75Yqg54m55pWIXHJcbiAgICAgICAgdGhpcy5za2lsbF9tb3ZlX2VmZmVjdD1Hcm91bmRNYW5hZ2VyLmdldEluc3RhbmNlKCkuY3JlYXRlR2FtZUVmZmVjdEJ5SWQoR2FtZUVmZmVjdElkLmJvc3MyX3NraWxsX21vdmUsdGhpcy5ub2RlLmdldFBvc2l0aW9uKCkuYWRkKGNjLnYyKDEwLDE1MCkpKTtcclxuICAgICAgICB0aGlzLnNraWxsX21vdmVfZWZmZWN0LmdldENvbXBvbmVudChGaXhlZFBvcykuaW5pdCh0aGlzLm5vZGUsY2MudjIoMTAsMTUwKSk7XHJcbiAgICAgICAgXHJcbiAgICB9XHJcblxyXG4gICAgZ2V0UmFuZG9tUG9zKHR5cGU6UmFuZ2VUeXBlKTpjYy5WZWMye1xyXG4gICAgICAgIGxldCBwb3M9Y2MudjIoMCwwKTtcclxuICAgICAgICBsZXQgcmVjdD10aGlzLm1vdmVfcmFuZ2U7XHJcbiAgICAgICAgc3dpdGNoKHR5cGUpe1xyXG4gICAgICAgICAgICBjYXNlIFJhbmdlVHlwZS5ibHVlOntcclxuICAgICAgICAgICAgICAgIHJlY3Q9dGhpcy5ibHVlX3JhbmdlO1xyXG4gICAgICAgICAgICB9YnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgUmFuZ2VUeXBlLnJlZDp7XHJcbiAgICAgICAgICAgICAgICByZWN0PXRoaXMucmVkX3JhbmdlO1xyXG4gICAgICAgICAgICB9YnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgUmFuZ2VUeXBlLmFsbDp7XHJcbiAgICAgICAgICAgICAgICByZWN0PXRoaXMubW92ZV9yYW5nZTtcclxuICAgICAgICAgICAgfWJyZWFrO1xyXG4gICAgICAgIH1cclxuICAgICAgICBwb3MueD1yZWN0LngrTWF0aC5yYW5kb20oKSpyZWN0LndpZHRoO1xyXG4gICAgICAgIHBvcy55PXJlY3QueStNYXRoLnJhbmRvbSgpKnJlY3QuaGVpZ2h0O1xyXG4gICAgICAgIHJldHVybiBwb3M7XHJcbiAgICB9ICAgIFxyXG4gICAgXHJcbiAgICBzdGFydExhdW5jaCgpe1xyXG4gICAgICAgIEdhbWVFZmZlY3RzTWFuYWdlci5nZXRJbnN0YW5jZSgpLmNyZWF0ZUdhbWVFZmZlY3RCeUlkKEdhbWVFZmZlY3RJZC5ib3NzMl9hdHRfZW5kLGNjLnYyKE1hdGgucmFuZG9tKCkqNTEyLTI1NixHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLmVuZW15X2F0dF95KSk7XHJcbiAgICAgICAgLy/pgKDmiJDkvKTlrrNcclxuICAgICAgICBzdXBlci5pbmp1cmVXYWxsKHRoaXMuY3VyX2F0dCxEYW1hZ2VUeXBlLk5vcm1hbCk7XHJcbiAgICB9XHJcblxyXG4gICAgb25EZWF0aCgpIHtcclxuICAgICAgICBpZih0aGlzLnNraWxsX21vdmVfZWZmZWN0KXtcclxuICAgICAgICAgICAgR2FtZUVmZmVjdHNNYW5hZ2VyLmdldEluc3RhbmNlKCkuZGVzdHJveUdhbWVFZmZlY3RCeUlkKEdhbWVFZmZlY3RJZC5ib3NzMl9za2lsbF9tb3ZlLHRoaXMuc2tpbGxfbW92ZV9lZmZlY3QpO1xyXG4gICAgICAgICAgICB0aGlzLnNraWxsX21vdmVfZWZmZWN0PW51bGw7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHN1cGVyLnBsYXlEZWFkQW5pbWF0b24oQW5pbWF0aW9uX05hbWUuZGVhZCwoKT0+e1xyXG4gICAgICAgICAgICBNb25zdGVyTWFuYWdlci5nZXRJbnN0YW5jZSgpLmRlc3Ryb3lNb25zdGVyKHRoaXMubm9kZSx0aGlzLm1vbnN0ZXJfdHlwZSk7XHJcbiAgICAgICAgfSlcclxuICAgICAgICB0aGlzLnVuc2NoZWR1bGVBbGxDYWxsYmFja3MoKTtcclxuICAgICAgICBHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNvdW5kX21hbmFnZXIucGxheVNvdW5kKFNvdW5kSW5kZXgucmV3YXJkQm94Mik7XHJcbiAgICB9XHJcblxyXG4gICAgb25TcHJpbnRFbmQoKXtcclxuICAgICAgICBpZih0aGlzLnNraWxsX21vdmVfZWZmZWN0KXtcclxuICAgICAgICAgICAgR2FtZUVmZmVjdHNNYW5hZ2VyLmdldEluc3RhbmNlKCkuZGVzdHJveUdhbWVFZmZlY3RCeUlkKEdhbWVFZmZlY3RJZC5ib3NzMl9za2lsbF9tb3ZlLHRoaXMuc2tpbGxfbW92ZV9lZmZlY3QpO1xyXG4gICAgICAgICAgICB0aGlzLnNraWxsX21vdmVfZWZmZWN0PW51bGw7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHN1cGVyLnBsYXlTcGluQW5pbWF0b24oQW5pbWF0aW9uX05hbWUuc2tpbGwzLHRydWUsbnVsbCwoKT0+e1xyXG4gICAgICAgICAgICB0aGlzLnN0YXJ0TW92ZSgwLHRoaXMuZ2V0UmFuZG9tUG9zKFJhbmdlVHlwZS5ibHVlKSk7XHJcbiAgICAgICAgICAgIHRoaXMuY3VyX3RvdWdobmVzcz0wO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIGNjLnR3ZWVuKHRoaXMubm9kZSkudGhlbihjYy5qdW1wQnkoMjAvNjAsMCw4MCw2NCwxKSkuc3RhcnQoKTtcclxuICAgICAgICAvL+mAoOaIkOS8pOWus+WSjOecqeaZlVxyXG4gICAgICAgIHN1cGVyLmluanVyZVdhbGwodGhpcy5jdXJfYXR0LERhbWFnZVR5cGUuU2tpbGwpO1xyXG4gICAgICAgIC8v54m55pWIIFxyXG4gICAgICAgIEZpZ2h0aW5nTWFuYWdlci5nZXRJbnN0YW5jZSgpLmNyZWF0ZUdhbWVFZmZlY3RCeUlkKEdhbWVFZmZlY3RJZC5ib3NzMl9za2lsbF9lbmQsdGhpcy5ub2RlLmdldFBvc2l0aW9uKCkuYWRkKGNjLnYyKDEwLDMyKSkpO1xyXG4gICAgICAgIGxldCBoZXJvUm9vdD1jYy5maW5kKCdDYW52YXMvSGVyb19Sb290Jyk7XHJcbiAgICAgICAgbGV0IGRhdGE9bmV3IEJ1ZmZEYXRhKCk7XHJcbiAgICAgICAgZGF0YS5idWZmX3R5cGU9QnVmZlR5cGUuVmVydGlnbztcclxuICAgICAgICBkYXRhLmJ1ZmZfaWQ9QnVmZklkLk1vbnN0ZXJfWHVhbll1bjtcclxuICAgICAgICBkYXRhLnJlbWFpbl90aW1lPTI7XHJcbiAgICAgICAgZm9yKGxldCBpPTA7IGk8aGVyb1Jvb3QuY2hpbGRyZW5Db3VudDsgaSsrKXtcclxuICAgICAgICAgICAgbGV0IGhlcm89aGVyb1Jvb3QuY2hpbGRyZW5baV0uZ2V0Q29tcG9uZW50KEhlcm8pO1xyXG4gICAgICAgICAgICBpZihoZXJvKVxyXG4gICAgICAgICAgICBoZXJvLmFkZERlQnVmZihkYXRhKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgdXBkYXRlKGR0KVxyXG4gICAge1xyXG4gICAgICAgIGlmKChHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLmN1cl9nYW1lX3N0YXRlIT1HYW1lU3RhdGUuR2FtZV9QbGF5aW5nKXx8dGhpcy5nZXRJc0RpZSgpKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICBzdXBlci51cGRhdGUoZHQpO1xyXG5cclxuICAgICAgICB0aGlzLmF0dF9qaXNodSs9ZHQ7XHJcbiAgICAgICAgdGhpcy5za2lsbF9qaXNodSs9ZHQ7XHJcbiAgICAgICAgaWYodGhpcy5hdHRfamlzaHU+PXRoaXMuYXR0X2ppYW5nZSYmdGhpcy5tb3ZlX3JhbmdlLmNvbnRhaW5zKHRoaXMubm9kZS5nZXRQb3NpdGlvbigpKSl7XHJcbiAgICAgICAgICAgIHRoaXMuc3RhcnRBdHRhY2soKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYodGhpcy5za2lsbF9qaXNodT49MTAmJnRoaXMucmVkX3JhbmdlLmNvbnRhaW5zKHRoaXMubm9kZS5nZXRQb3NpdGlvbigpKSl7XHJcbiAgICAgICAgICAgIHRoaXMuc3RhcnRTa2lsbCgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZih0aGlzLmdldEVuZW15U3RhdGUoKT09RW5lbXlfU3RhdGUubW92ZSl7XHJcbiAgICAgICAgICAgIHRoaXMuY2hlY2tNb3ZlKGR0KTtcclxuICAgICAgICB9ZWxzZSBpZih0aGlzLmdldEVuZW15U3RhdGUoKT09RW5lbXlfU3RhdGUuc2tpbGwgKXtcclxuICAgICAgICAgICAgc3dpdGNoKHRoaXMuc3ByaW50X3N0YXRlKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBjYXNlIFNwcmludFN0YXRlLnNwcmludGluZzp7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zcHJpbnRpbmcoZHQpO1xyXG4gICAgICAgICAgICAgICAgfWJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSBTcHJpbnRTdGF0ZS5lbmQ6e1xyXG5cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGNoZWNrTW92ZShkdClcclxuICAgIHsgICAgICAgIFxyXG4gICAgICAgIGlmKCFzdXBlci5pc0hhdmVEZUJ1ZmZUeXBlKEJ1ZmZUeXBlLlZlcnRpZ28pKXtcclxuICAgICAgICAgICAgbGV0IHNwZWVkPXRoaXMuY3VyX21vdmVfc3BlZWQqZHQ7XHJcbiAgICAgICAgICAgIGlmKHRoaXMubW92ZV90YXJnZXRfcG9zKXtcclxuICAgICAgICAgICAgICAgIGxldCBvZmZzZXRQb3M9dGhpcy5tb3ZlX3RhcmdldF9wb3Muc3ViKHRoaXMubm9kZS5nZXRQb3NpdGlvbigpKTtcclxuICAgICAgICAgICAgICAgIHRoaXMubm9kZS5zY2FsZVg9b2Zmc2V0UG9zLng+MD90aGlzLnNldHVwX3NjYWxlOi10aGlzLnNldHVwX3NjYWxlO1xyXG4gICAgICAgICAgICAgICAgaWYob2Zmc2V0UG9zLm1hZygpPHNwZWVkKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmKHRoaXMubW92ZV9lbmRfY2FsbGJhY2spe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm1vdmVfZW5kX2NhbGxiYWNrKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubW92ZV9lbmRfY2FsbGJhY2s9bnVsbDtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9ZWxzZVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBwaTI9TWF0aC5QSSoyO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMubW92ZV9kaXJlY3Rpb249KE1hdGguYXRhbjIob2Zmc2V0UG9zLnksb2Zmc2V0UG9zLngpK3BpMiklcGkyO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMubW92aW5nKGR0KTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBtb3ZpbmcoZHQpe1xyXG4gICAgICAgIGxldCBkaXNYPXRoaXMubm9kZS54O1xyXG4gICAgICAgIGxldCBkaXNZPXRoaXMubm9kZS55O1xyXG4gICAgICAgIGxldCBzcGVlZD10aGlzLmN1cl9tb3ZlX3NwZWVkKmR0O1xyXG4gICAgICAgIGRpc1grPXNwZWVkKk1hdGguY29zKHRoaXMubW92ZV9kaXJlY3Rpb24pO1xyXG4gICAgICAgIGRpc1krPXNwZWVkKk1hdGguc2luKHRoaXMubW92ZV9kaXJlY3Rpb24pO1xyXG4gICAgICAgIHRoaXMubm9kZS54PWRpc1g7XHJcbiAgICAgICAgdGhpcy5ub2RlLnk9ZGlzWTtcclxuICAgICAgICBpZih0aGlzLm5vZGUueD4zMjApXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLm5vZGUueD0zMjA7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmKHRoaXMubm9kZS54PC0zMjApXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLm5vZGUueD0tMzIwO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvL+S4jeiDveepv+i/h+WfjuWimVxyXG4gICAgICAgIGlmKHRoaXMubm9kZS55PHRoaXMud2FsbF95eSl7XHJcbiAgICAgICAgICAgIHRoaXMubm9kZS55PXRoaXMud2FsbF95eTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgc3ByaW50aW5nKGR0Om51bWJlcil7XHJcbiAgICAgICAgbGV0IGRpc1g9dGhpcy5ub2RlLng7XHJcbiAgICAgICAgbGV0IGRpc1k9dGhpcy5ub2RlLnk7XHJcbiAgICAgICAgdGhpcy5jdXJfc3ByaW50X3NwZWVkKz10aGlzLmFjY2VsZXJhdGlvbjtcclxuICAgICAgICBsZXQgc3BlZWQ9dGhpcy5jdXJfc3ByaW50X3NwZWVkKmR0O1xyXG4gICAgICAgIHRoaXMubW92ZV9kaXJlY3Rpb249TWF0aC5QSSozLzI7XHJcbiAgICAgICAgZGlzWSs9c3BlZWQqTWF0aC5zaW4odGhpcy5tb3ZlX2RpcmVjdGlvbik7XHJcbiAgICAgICAgdGhpcy5ub2RlLng9ZGlzWDtcclxuICAgICAgICB0aGlzLm5vZGUueT1kaXNZO1xyXG4gICAgICAgIGlmKHRoaXMubm9kZS54PjMyMClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMubm9kZS54PTMyMDtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYodGhpcy5ub2RlLng8LTMyMClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMubm9kZS54PS0zMjA7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8v5LiN6IO956m/6L+H5Z+O5aKZXHJcbiAgICAgICAgaWYodGhpcy5ub2RlLnk8KHRoaXMud2FsbF95eS0xMDApKXtcclxuICAgICAgICAgICAgdGhpcy5ub2RlLnk9dGhpcy53YWxsX3l5LTEwMDtcclxuICAgICAgICAgICAgdGhpcy5zcHJpbnRfc3RhdGU9U3ByaW50U3RhdGUuZW5kO1xyXG4gICAgICAgICAgICB0aGlzLm9uU3ByaW50RW5kKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfSAgICBcclxufVxyXG4iXX0=