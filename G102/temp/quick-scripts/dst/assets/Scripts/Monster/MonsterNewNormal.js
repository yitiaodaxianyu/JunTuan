
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Scripts/Monster/MonsterNewNormal.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'd338a8fV3tPvoxFoneBUrlB', 'MonsterNewNormal');
// Scripts/Monster/MonsterNewNormal.ts

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
var Constants_1 = require("../Constants");
var EnemyConfig_1 = require("../Enemy/EnemyConfig");
var GameEffectsManager_1 = require("../Game/GameEffectsManager");
var GameManager_1 = require("../GameManager");
var HeroConfig_1 = require("../Hero/Game/HeroConfig");
var WallManager_1 = require("../Wall/WallManager");
var Monster_1 = require("./Monster");
var MonsterBullet_1 = require("./MonsterBullet");
var MonsterData_1 = require("./MonsterData");
var MonsterManager_1 = require("./MonsterManager");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
/**普通怪物 */
var MonsterNewNormal = /** @class */ (function (_super) {
    __extends(MonsterNewNormal, _super);
    function MonsterNewNormal() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.monster_xuanyun_callback = null;
        _this.monster_init_callback = null;
        _this.monster_death_callback = null;
        _this.monster_att_callback = null;
        _this.monster_att_hit_callback = null;
        _this.monster_far_att = 0;
        _this.monster_far_att_hit = 0;
        return _this;
    }
    MonsterNewNormal.prototype.onLoad = function () {
        _super.prototype.onLoad.call(this);
        this.addDeathCallback(this.onDeath);
        this.addInitListen(this.onMonsterInited);
        this.addXuanYunListen(this.onXuanYunResult);
    };
    MonsterNewNormal.prototype.onMonsterInited = function () {
        this.initOutward();
        if (this.base_data.AttackMode == MonsterData_1.GongJiMode.Far) {
            if (this.monster_far_att > 0) {
                GameEffectsManager_1.GameEffectsManager.getInstance().addEffectPoolById(this.monster_far_att);
            }
            if (this.monster_far_att_hit > 0) {
                GameEffectsManager_1.GameEffectsManager.getInstance().addEffectPoolById(this.monster_far_att_hit);
            }
        }
        this.scheduleOnce(this.idleToMove, 1);
        if (this.monster_init_callback) {
            this.monster_init_callback();
        }
        this.node.scaleX = Math.random() > 0.5 ? this.setup_scale : -this.setup_scale;
    };
    MonsterNewNormal.prototype.idleToMove = function () {
        this.setEnemyState(EnemyConfig_1.Enemy_State.move);
    };
    MonsterNewNormal.prototype.addMonsterNormalDeath = function (callback) {
        this.monster_death_callback = callback;
    };
    MonsterNewNormal.prototype.addMonsterNormalInited = function (callback) {
        this.monster_init_callback = callback;
    };
    MonsterNewNormal.prototype.addMonsterNormalAttack = function (callback) {
        this.monster_att_callback = callback;
    };
    MonsterNewNormal.prototype.addMonsterNormalAttackHit = function (callback) {
        this.monster_att_hit_callback = callback;
    };
    MonsterNewNormal.prototype.addMonsterNormalXuanYun = function (callback) {
        this.monster_xuanyun_callback = callback;
    };
    /**初始化外观*/
    MonsterNewNormal.prototype.initOutward = function () {
        this.setSkin(this.getSkinName());
        _super.prototype.playSpinAnimaton.call(this, this.getAnimaName(MonsterData_1.MonsterActionName.Walk), true);
    };
    MonsterNewNormal.prototype.setTargetPos = function (pos, endCallback) {
        this.move_target_pos = pos;
        this.move_end_callback = endCallback;
    };
    MonsterNewNormal.prototype.setSkin = function (skinName) {
        this.spine.setSkin(skinName);
    };
    MonsterNewNormal.prototype.setFaceType = function (type) {
        this.face_type = type;
        // if(this.face_type==MonsterFaceName.SideL){
        //     this.node.scaleX=-this.setup_scale;
        // }else {
        //     this.node.scaleX=this.setup_scale;
        // }
    };
    MonsterNewNormal.prototype.getSkinName = function () {
        return MonsterData_1.MonsterFaceName.SideR + this.skin_type;
    };
    MonsterNewNormal.prototype.getAnimaName = function (actionName) {
        return MonsterData_1.MonsterFaceName.SideR + "_" + actionName;
    };
    /**设置打击目标 */
    MonsterNewNormal.prototype.setAttTarget = function (target) {
        this.att_target = target;
        if (target) {
            this.att_jishu = this.att_jiange;
        }
        else {
            this.setMoveDir(Math.PI * 3 / 2);
        }
    };
    /**
     *
     * @param target 攻击的目标
     */
    MonsterNewNormal.prototype.startAttack = function (target) {
        var _this = this;
        if (this.monster_att_callback) {
            //是否截获本次攻击
            if (this.monster_att_callback()) {
                return;
            }
        }
        _super.prototype.setEnemyState.call(this, EnemyConfig_1.Enemy_State.att);
        this.att_jishu = 0;
        if (target) {
            var offsetPos = target.getPosition().sub(this.node.getPosition());
            this.setMoveDir(Math.atan2(offsetPos.y, offsetPos.x));
            this.checkFace(MonsterData_1.MonsterActionName.Attack);
        }
        else {
            this.setMoveDir(Math.PI * 3 / 2);
            this.checkFace(MonsterData_1.MonsterActionName.Attack);
        }
        var data = new MonsterData_1.KeyFrameData();
        data.name = 'OnDamaging';
        data.callback = function () {
            _this.att_jishu = 0;
            if (_this.getIsDie()) {
                return;
            }
            switch (_this.base_data.AttackMode) {
                case MonsterData_1.GongJiMode.Melee:
                    {
                        if (target) {
                            //测试
                            target.removeFromParent();
                            _this.setAttTarget(null);
                        }
                        else {
                            //造成伤害
                            var injureData = _super.prototype.injureWall.call(_this, _super.prototype.getAttData.call(_this, HeroConfig_1.DamageType.Normal, false));
                            if (injureData.is_die == false && injureData.getDamageNum() > 0) {
                                if (_this.monster_att_hit_callback) {
                                    _this.monster_att_hit_callback(injureData);
                                }
                            }
                        }
                        var pos = target ? target.getPosition() : cc.v2(_this.node.x, _this.att_wall.getWallMaxYY());
                        var attNode = GameEffectsManager_1.GameEffectsManager.getInstance().createGameEffectById(GameEffectsManager_1.GameEffectId.monster_normal_att, pos);
                        attNode.scale = _super.prototype.getWallAttackScale.call(_this);
                    }
                    break;
                case MonsterData_1.GongJiMode.Far:
                    {
                        var attNode = GameEffectsManager_1.GameEffectsManager.getInstance().createGameEffectById(_this.monster_far_att, _super.prototype.getAttPos.call(_this));
                        var bullet = attNode.getComponent(MonsterBullet_1.default);
                        bullet.init(_this.getAttData(HeroConfig_1.DamageType.Normal, true), _this.monster_far_att, _this.monster_far_att_hit, 1200, Math.PI * 3 / 2);
                    }
                    break;
            }
        };
        _super.prototype.playSpinAnimaton.call(this, this.getAnimaName(MonsterData_1.MonsterActionName.Attack), false, data, function () {
            _this.startIdle();
            _super.prototype.setEnemyState.call(_this, EnemyConfig_1.Enemy_State.move);
            if (_this.att_wall) {
                _this.setMoveDir(Math.random() > 0.5 ? Math.PI : 0);
            }
        });
    };
    MonsterNewNormal.prototype.startIdle = function () {
        _super.prototype.playSpinAnimaton.call(this, this.getAnimaName(MonsterData_1.MonsterActionName.Walk), true);
    };
    MonsterNewNormal.prototype.onXuanYunResult = function (isXuanYun) {
        if (isXuanYun) {
            this.startXuanYun();
        }
        else {
            this.att_jishu = 0;
            this.setEnemyState(EnemyConfig_1.Enemy_State.move);
        }
        if (this.monster_xuanyun_callback) {
            this.monster_xuanyun_callback(isXuanYun);
        }
    };
    MonsterNewNormal.prototype.startXuanYun = function () {
        this.spine.paused = true;
    };
    MonsterNewNormal.prototype.onDeath = function () {
        var _this = this;
        this.removeAllDeBuff();
        this.shadow.opacity = 0;
        this.node.opacity = 0;
        var die = GameEffectsManager_1.GameEffectsManager.getInstance().createGameEffectById(GameEffectsManager_1.GameEffectId.monster_die, _super.prototype.getCenterPos.call(this));
        die.scale = this.base_data.StrengthType == MonsterData_1.StrengthType.Normal ? 0.4 : 0.8;
        cc.tween(this.node).delay(0.5).call(function () {
            _this.removeAllDeBuff();
            MonsterManager_1.default.getInstance().destroyMonster(_this.node, _this.monster_type);
        }).start();
        if (this.monster_death_callback) {
            this.monster_death_callback();
        }
    };
    MonsterNewNormal.prototype.update = function (dt) {
        if ((GameManager_1.default.getInstance().cur_game_state != Constants_1.GameState.Game_Playing) || this.getIsDie()) {
            return;
        }
        _super.prototype.update.call(this, dt);
        if (!this.isHaveDeBuffType(HeroConfig_1.BuffType.Vertigo)) {
            if (this.getEnemyState() != EnemyConfig_1.Enemy_State.skill) {
                this.checkAtt(dt);
            }
        }
        else {
            if (this.isHaveDeBuff(HeroConfig_1.BuffId.Hero_MeiMo_Active_MeiHuo)) {
                this.moving(dt);
            }
        }
    };
    MonsterNewNormal.prototype.moving = function (dt) {
        if (!this.isHaveDeBuff(HeroConfig_1.BuffId.Hero_XuanYun) && (this.getEnemyState() == EnemyConfig_1.Enemy_State.move)) {
            var speed = this.cur_move_speed * dt;
            if (this.move_target_pos) {
                var offsetPos = this.move_target_pos.sub(this.node.getPosition());
                if (offsetPos.mag() < speed) {
                    if (this.move_end_callback) {
                        this.move_end_callback();
                        this.move_end_callback = null;
                    }
                }
                else {
                    var pi2 = Math.PI * 2;
                    this.setMoveDir((Math.atan2(offsetPos.y, offsetPos.x) + pi2) % pi2);
                    this.startMove(dt);
                }
            }
            else {
                this.startMove(dt);
            }
        }
    };
    MonsterNewNormal.prototype.startMove = function (dt) {
        var disX = this.node.x;
        var disY = this.node.y;
        var speed = this.cur_move_speed * dt;
        disX += speed * Math.cos(this.move_direction);
        disY += speed * Math.sin(this.move_direction);
        var leftRight = this.setX(disX);
        if (leftRight != 0) {
            this.move_direction += Math.PI;
        }
        this.setY(disY);
        this.checkFace(MonsterData_1.MonsterActionName.Walk);
    };
    /**检测朝向 */
    MonsterNewNormal.prototype.checkFace = function (actionName) {
        var pi2 = Math.PI * 2;
        this.setMoveDir((this.move_direction + pi2) % pi2);
        var newFace = MonsterData_1.MonsterFaceName.SideL;
        //60~120°，背面
        if (this.move_direction != Math.PI * 3 / 2) {
            if (this.move_direction >= Math.PI / 2 && this.move_direction <= Math.PI * 3 / 2) {
                this.node.scaleX = -this.setup_scale;
            }
            else {
                this.node.scaleX = this.setup_scale;
            }
        }
        if (this.face_type != newFace) {
            this.setFaceType(newFace);
            this.setSkin(this.getSkinName());
            _super.prototype.playSpinAnimaton.call(this, this.getAnimaName(actionName), true);
        }
        else {
            if (this.spine.animation != this.getAnimaName(MonsterData_1.MonsterActionName.Walk))
                _super.prototype.playSpinAnimaton.call(this, this.getAnimaName(actionName), true);
        }
    };
    /**攻击计算 */
    MonsterNewNormal.prototype.checkAtt = function (dt) {
        this.att_jishu += dt;
        if (this.att_jishu >= this.att_jiange) {
            this.att_jishu = this.att_jiange;
            //判断是否在攻击范围之内
            if (this.att_target) {
                this.attTarget(dt);
            }
            else {
                this.attWall(dt);
            }
        }
        else {
            this.moving(dt);
        }
    };
    /**攻击具体目标判断 */
    MonsterNewNormal.prototype.attTarget = function (dt) {
        var dis = this.node.getPosition().sub(this.att_target.getPosition()).mag();
        if (dis <= this.base_data.AttackDistance) {
            this.startAttack(this.att_target);
        }
        else {
            this.move_target_pos = this.att_target.getPosition();
            this.moving(dt);
        }
    };
    /**攻击城墙判断 */
    MonsterNewNormal.prototype.attWall = function (dt) {
        var _this = this;
        var walls = WallManager_1.default.getInstance().getAllWall();
        var attWall = null;
        walls.forEach(function (wall, wallType) {
            //攻击城墙的条件1，必须在城墙之上,2达到攻击距离
            if (_this.node.y >= wall.getWallMaxYY() && Math.abs(_this.node.y - wall.getWallMaxYY()) <= _this.base_data.AttackDistance) {
                attWall = wall;
            }
        });
        if (attWall != null) {
            this.att_wall = attWall;
            this.startAttack();
        }
        else {
            this.setMoveDir(Math.PI * 3 / 2);
            this.move_target_pos = null;
            this.moving(dt);
        }
    };
    __decorate([
        property()
    ], MonsterNewNormal.prototype, "monster_far_att", void 0);
    __decorate([
        property()
    ], MonsterNewNormal.prototype, "monster_far_att_hit", void 0);
    MonsterNewNormal = __decorate([
        ccclass
    ], MonsterNewNormal);
    return MonsterNewNormal;
}(Monster_1.default));
exports.default = MonsterNewNormal;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0c1xcTW9uc3RlclxcTW9uc3Rlck5ld05vcm1hbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSwwQ0FBeUM7QUFDekMsb0RBQXNFO0FBQ3RFLGlFQUE4RTtBQUc5RSw4Q0FBeUM7QUFDekMsc0RBQXVFO0FBR3ZFLG1EQUE4QztBQUM5QyxxQ0FBZ0M7QUFDaEMsaURBQTRDO0FBQzVDLDZDQUEwSTtBQUMxSSxtREFBOEM7QUFHeEMsSUFBQSxLQUFzQixFQUFFLENBQUMsVUFBVSxFQUFsQyxPQUFPLGFBQUEsRUFBRSxRQUFRLGNBQWlCLENBQUM7QUFDMUMsVUFBVTtBQUVWO0lBQThDLG9DQUFPO0lBQXJEO1FBQUEscUVBcVVDO1FBblVHLDhCQUF3QixHQUFVLElBQUksQ0FBQztRQUN2QywyQkFBcUIsR0FBVSxJQUFJLENBQUM7UUFDcEMsNEJBQXNCLEdBQVUsSUFBSSxDQUFDO1FBQ3JDLDBCQUFvQixHQUFVLElBQUksQ0FBQztRQUNuQyw4QkFBd0IsR0FBVSxJQUFJLENBQUM7UUFFdkMscUJBQWUsR0FBUSxDQUFDLENBQUM7UUFFekIseUJBQW1CLEdBQVEsQ0FBQyxDQUFDOztJQTJUakMsQ0FBQztJQXpUYSxpQ0FBTSxHQUFoQjtRQUNJLGlCQUFNLE1BQU0sV0FBRSxDQUFDO1FBQ2YsSUFBSSxDQUFDLGdCQUFnQixDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUNwQyxJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsQ0FBQztRQUN6QyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxDQUFDO0lBQ2hELENBQUM7SUFFTywwQ0FBZSxHQUF2QjtRQUNJLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQztRQUNuQixJQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsVUFBVSxJQUFFLHdCQUFVLENBQUMsR0FBRyxF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Um9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBHYW1lU3RhdGUgfSBmcm9tIFwiLi4vQ29uc3RhbnRzXCI7XHJcbmltcG9ydCB7IEVuZW15X0RlQnVmZl9UeXBlLCBFbmVteV9TdGF0ZSB9IGZyb20gXCIuLi9FbmVteS9FbmVteUNvbmZpZ1wiO1xyXG5pbXBvcnQgeyBHYW1lRWZmZWN0SWQsIEdhbWVFZmZlY3RzTWFuYWdlciB9IGZyb20gXCIuLi9HYW1lL0dhbWVFZmZlY3RzTWFuYWdlclwiO1xyXG5pbXBvcnQgTW92ZSBmcm9tIFwiLi4vR2FtZS9Nb3ZlXCI7XHJcbmltcG9ydCBTa2lsbE1hbmFnZXIgZnJvbSBcIi4uL0dhbWUvU2tpbGxNYW5hZ2VyXCI7XHJcbmltcG9ydCBHYW1lTWFuYWdlciBmcm9tIFwiLi4vR2FtZU1hbmFnZXJcIjtcclxuaW1wb3J0IHsgQnVmZklkLCBCdWZmVHlwZSwgRGFtYWdlVHlwZSB9IGZyb20gXCIuLi9IZXJvL0dhbWUvSGVyb0NvbmZpZ1wiO1xyXG5pbXBvcnQgV2FsbCBmcm9tIFwiLi4vV2FsbC9XYWxsXCI7XHJcbmltcG9ydCB7IFdhbGxUeXBlIH0gZnJvbSBcIi4uL1dhbGwvV2FsbENvbmZpZ1wiO1xyXG5pbXBvcnQgV2FsbE1hbmFnZXIgZnJvbSBcIi4uL1dhbGwvV2FsbE1hbmFnZXJcIjtcclxuaW1wb3J0IE1vbnN0ZXIgZnJvbSBcIi4vTW9uc3RlclwiO1xyXG5pbXBvcnQgTW9uc3RlckJ1bGxldCBmcm9tIFwiLi9Nb25zdGVyQnVsbGV0XCI7XHJcbmltcG9ydCB7IEZlZWRCYWNrVHlwZSwgR29uZ0ppTW9kZSwgS2V5RnJhbWVEYXRhLCBNb25zdGVyQWN0aW9uTmFtZSwgTW9uc3RlckZhY2VOYW1lLCBNb25zdGVyU2tpblR5cGUsIFN0cmVuZ3RoVHlwZSB9IGZyb20gXCIuL01vbnN0ZXJEYXRhXCI7XHJcbmltcG9ydCBNb25zdGVyTWFuYWdlciBmcm9tIFwiLi9Nb25zdGVyTWFuYWdlclwiO1xyXG5cclxuXHJcbmNvbnN0IHtjY2NsYXNzLCBwcm9wZXJ0eX0gPSBjYy5fZGVjb3JhdG9yO1xyXG4vKirmma7pgJrmgKrniakgKi9cclxuQGNjY2xhc3NcclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTW9uc3Rlck5ld05vcm1hbCBleHRlbmRzIE1vbnN0ZXIge1xyXG5cclxuICAgIG1vbnN0ZXJfeHVhbnl1bl9jYWxsYmFjazpGdW5jdGlvbj1udWxsO1xyXG4gICAgbW9uc3Rlcl9pbml0X2NhbGxiYWNrOkZ1bmN0aW9uPW51bGw7XHJcbiAgICBtb25zdGVyX2RlYXRoX2NhbGxiYWNrOkZ1bmN0aW9uPW51bGw7XHJcbiAgICBtb25zdGVyX2F0dF9jYWxsYmFjazpGdW5jdGlvbj1udWxsO1xyXG4gICAgbW9uc3Rlcl9hdHRfaGl0X2NhbGxiYWNrOkZ1bmN0aW9uPW51bGw7XHJcbiAgICBAcHJvcGVydHkoKVxyXG4gICAgbW9uc3Rlcl9mYXJfYXR0Om51bWJlcj0wO1xyXG4gICAgQHByb3BlcnR5KClcclxuICAgIG1vbnN0ZXJfZmFyX2F0dF9oaXQ6bnVtYmVyPTA7XHJcblxyXG4gICAgcHJvdGVjdGVkIG9uTG9hZCgpOiB2b2lkIHtcclxuICAgICAgICBzdXBlci5vbkxvYWQoKTtcclxuICAgICAgICB0aGlzLmFkZERlYXRoQ2FsbGJhY2sodGhpcy5vbkRlYXRoKTtcclxuICAgICAgICB0aGlzLmFkZEluaXRMaXN0ZW4odGhpcy5vbk1vbnN0ZXJJbml0ZWQpO1xyXG4gICAgICAgIHRoaXMuYWRkWHVhbll1bkxpc3Rlbih0aGlzLm9uWHVhbll1blJlc3VsdCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBvbk1vbnN0ZXJJbml0ZWQoKXtcclxuICAgICAgICB0aGlzLmluaXRPdXR3YXJkKCk7XHJcbiAgICAgICAgaWYodGhpcy5iYXNlX2RhdGEuQXR0YWNrTW9kZT09R29uZ0ppTW9kZS5GYXIpe1xyXG4gICAgICAgICAgICBpZih0aGlzLm1vbnN0ZXJfZmFyX2F0dD4wKXtcclxuICAgICAgICAgICAgICAgIEdhbWVFZmZlY3RzTWFuYWdlci5nZXRJbnN0YW5jZSgpLmFkZEVmZmVjdFBvb2xCeUlkKHRoaXMubW9uc3Rlcl9mYXJfYXR0KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZih0aGlzLm1vbnN0ZXJfZmFyX2F0dF9oaXQ+MCl7XHJcbiAgICAgICAgICAgICAgICBHYW1lRWZmZWN0c01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5hZGRFZmZlY3RQb29sQnlJZCh0aGlzLm1vbnN0ZXJfZmFyX2F0dF9oaXQpO1xyXG4gICAgICAgICAgICB9ICAgICAgICAgICAgXHJcbiAgICAgICAgfSAgICAgICAgXHJcbiAgICAgICAgdGhpcy5zY2hlZHVsZU9uY2UodGhpcy5pZGxlVG9Nb3ZlLDEpO1xyXG4gICAgICAgIGlmKHRoaXMubW9uc3Rlcl9pbml0X2NhbGxiYWNrKXtcclxuICAgICAgICAgICAgdGhpcy5tb25zdGVyX2luaXRfY2FsbGJhY2soKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5ub2RlLnNjYWxlWD1NYXRoLnJhbmRvbSgpPjAuNT90aGlzLnNldHVwX3NjYWxlOi10aGlzLnNldHVwX3NjYWxlO1xyXG4gICAgfVxyXG5cclxuICAgIGlkbGVUb01vdmUoKXtcclxuICAgICAgICB0aGlzLnNldEVuZW15U3RhdGUoRW5lbXlfU3RhdGUubW92ZSk7XHJcbiAgICB9XHJcblxyXG4gICAgYWRkTW9uc3Rlck5vcm1hbERlYXRoKGNhbGxiYWNrOkZ1bmN0aW9uKXtcclxuICAgICAgICB0aGlzLm1vbnN0ZXJfZGVhdGhfY2FsbGJhY2s9Y2FsbGJhY2s7XHJcbiAgICB9XHJcblxyXG4gICAgYWRkTW9uc3Rlck5vcm1hbEluaXRlZChjYWxsYmFjazpGdW5jdGlvbil7XHJcbiAgICAgICAgdGhpcy5tb25zdGVyX2luaXRfY2FsbGJhY2s9Y2FsbGJhY2s7XHJcbiAgICB9XHJcblxyXG4gICAgYWRkTW9uc3Rlck5vcm1hbEF0dGFjayhjYWxsYmFjazpGdW5jdGlvbil7XHJcbiAgICAgICAgdGhpcy5tb25zdGVyX2F0dF9jYWxsYmFjaz1jYWxsYmFjaztcclxuICAgIH1cclxuXHJcbiAgICBhZGRNb25zdGVyTm9ybWFsQXR0YWNrSGl0KGNhbGxiYWNrOkZ1bmN0aW9uKXtcclxuICAgICAgICB0aGlzLm1vbnN0ZXJfYXR0X2hpdF9jYWxsYmFjaz1jYWxsYmFjaztcclxuICAgIH1cclxuXHJcbiAgICBhZGRNb25zdGVyTm9ybWFsWHVhbll1bihjYWxsYmFjazpGdW5jdGlvbil7XHJcbiAgICAgICAgdGhpcy5tb25zdGVyX3h1YW55dW5fY2FsbGJhY2s9Y2FsbGJhY2s7XHJcbiAgICB9XHJcblxyXG4gICAgLyoq5Yid5aeL5YyW5aSW6KeCKi9cclxuICAgIHByaXZhdGUgaW5pdE91dHdhcmQoKXtcclxuICAgICAgICB0aGlzLnNldFNraW4odGhpcy5nZXRTa2luTmFtZSgpKTtcclxuICAgICAgICBzdXBlci5wbGF5U3BpbkFuaW1hdG9uKHRoaXMuZ2V0QW5pbWFOYW1lKE1vbnN0ZXJBY3Rpb25OYW1lLldhbGspLHRydWUpO1xyXG4gICAgfVxyXG5cclxuICAgIHNldFRhcmdldFBvcyhwb3M6Y2MuVmVjMixlbmRDYWxsYmFjazpGdW5jdGlvbil7XHJcbiAgICAgICAgdGhpcy5tb3ZlX3RhcmdldF9wb3M9cG9zO1xyXG4gICAgICAgIHRoaXMubW92ZV9lbmRfY2FsbGJhY2s9ZW5kQ2FsbGJhY2s7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIHNldFNraW4oc2tpbk5hbWU6IHN0cmluZyl7XHJcbiAgICAgICAgdGhpcy5zcGluZS5zZXRTa2luKHNraW5OYW1lKTtcclxuICAgIH1cclxuXHJcbiAgICBzZXRGYWNlVHlwZSh0eXBlOk1vbnN0ZXJGYWNlTmFtZSl7XHJcbiAgICAgICAgdGhpcy5mYWNlX3R5cGU9dHlwZTtcclxuICAgICAgICAvLyBpZih0aGlzLmZhY2VfdHlwZT09TW9uc3RlckZhY2VOYW1lLlNpZGVMKXtcclxuICAgICAgICAvLyAgICAgdGhpcy5ub2RlLnNjYWxlWD0tdGhpcy5zZXR1cF9zY2FsZTtcclxuICAgICAgICAvLyB9ZWxzZSB7XHJcbiAgICAgICAgLy8gICAgIHRoaXMubm9kZS5zY2FsZVg9dGhpcy5zZXR1cF9zY2FsZTtcclxuICAgICAgICAvLyB9XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0U2tpbk5hbWUoKTpzdHJpbmd7XHJcbiAgICAgICAgcmV0dXJuIE1vbnN0ZXJGYWNlTmFtZS5TaWRlUit0aGlzLnNraW5fdHlwZTtcclxuICAgIH1cclxuXHJcbiAgICBnZXRBbmltYU5hbWUoYWN0aW9uTmFtZTpNb25zdGVyQWN0aW9uTmFtZSk6c3RyaW5ne1xyXG4gICAgICAgIHJldHVybiBNb25zdGVyRmFjZU5hbWUuU2lkZVIrXCJfXCIrYWN0aW9uTmFtZTtcclxuICAgIH1cclxuXHJcbiAgICAvKirorr7nva7miZPlh7vnm67moIcgKi9cclxuICAgIHNldEF0dFRhcmdldCh0YXJnZXQ6Y2MuTm9kZSl7XHJcbiAgICAgICAgdGhpcy5hdHRfdGFyZ2V0PXRhcmdldDtcclxuICAgICAgICBpZih0YXJnZXQpe1xyXG4gICAgICAgICAgICB0aGlzLmF0dF9qaXNodT10aGlzLmF0dF9qaWFuZ2U7XHJcbiAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgIHRoaXMuc2V0TW92ZURpcihNYXRoLlBJKjMvMik7XHJcbiAgICAgICAgfSAgICAgICAgXHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBcclxuICAgICAqIEBwYXJhbSB0YXJnZXQg5pS75Ye755qE55uu5qCHXHJcbiAgICAgKi9cclxuICAgIHN0YXJ0QXR0YWNrKHRhcmdldD86Y2MuTm9kZSl7XHJcbiAgICAgICAgaWYodGhpcy5tb25zdGVyX2F0dF9jYWxsYmFjayl7XHJcbiAgICAgICAgICAgIC8v5piv5ZCm5oiq6I635pys5qyh5pS75Ye7XHJcbiAgICAgICAgICAgIGlmKHRoaXMubW9uc3Rlcl9hdHRfY2FsbGJhY2soKSlcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHN1cGVyLnNldEVuZW15U3RhdGUoRW5lbXlfU3RhdGUuYXR0KTtcclxuICAgICAgICB0aGlzLmF0dF9qaXNodT0wOyBcclxuICAgICAgICBpZih0YXJnZXQpe1xyXG4gICAgICAgICAgICBsZXQgb2Zmc2V0UG9zPXRhcmdldC5nZXRQb3NpdGlvbigpLnN1Yih0aGlzLm5vZGUuZ2V0UG9zaXRpb24oKSk7XHJcbiAgICAgICAgICAgIHRoaXMuc2V0TW92ZURpcihNYXRoLmF0YW4yKG9mZnNldFBvcy55LG9mZnNldFBvcy54KSk7XHJcbiAgICAgICAgICAgIHRoaXMuY2hlY2tGYWNlKE1vbnN0ZXJBY3Rpb25OYW1lLkF0dGFjayk7XHJcbiAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgIHRoaXMuc2V0TW92ZURpcihNYXRoLlBJKjMvMik7XHJcbiAgICAgICAgICAgIHRoaXMuY2hlY2tGYWNlKE1vbnN0ZXJBY3Rpb25OYW1lLkF0dGFjayk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGxldCBkYXRhPW5ldyBLZXlGcmFtZURhdGEoKTtcclxuICAgICAgICBkYXRhLm5hbWU9J09uRGFtYWdpbmcnO1xyXG4gICAgICAgIGRhdGEuY2FsbGJhY2s9KCk9PntcclxuICAgICAgICAgICAgdGhpcy5hdHRfamlzaHU9MDtcclxuICAgICAgICAgICAgaWYodGhpcy5nZXRJc0RpZSgpKXtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBzd2l0Y2godGhpcy5iYXNlX2RhdGEuQXR0YWNrTW9kZSl7XHJcbiAgICAgICAgICAgICAgICBjYXNlIEdvbmdKaU1vZGUuTWVsZWU6e1xyXG4gICAgICAgICAgICAgICAgICAgIGlmKHRhcmdldCl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8v5rWL6K+VXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRhcmdldC5yZW1vdmVGcm9tUGFyZW50KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0QXR0VGFyZ2V0KG51bGwpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvL+mAoOaIkOS8pOWus1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgaW5qdXJlRGF0YT1zdXBlci5pbmp1cmVXYWxsKHN1cGVyLmdldEF0dERhdGEoRGFtYWdlVHlwZS5Ob3JtYWwsZmFsc2UpKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYoaW5qdXJlRGF0YS5pc19kaWU9PWZhbHNlJiZpbmp1cmVEYXRhLmdldERhbWFnZU51bSgpPjApe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICBpZih0aGlzLm1vbnN0ZXJfYXR0X2hpdF9jYWxsYmFjayl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5tb25zdGVyX2F0dF9oaXRfY2FsbGJhY2soaW5qdXJlRGF0YSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBsZXQgcG9zPXRhcmdldD90YXJnZXQuZ2V0UG9zaXRpb24oKTpjYy52Mih0aGlzLm5vZGUueCx0aGlzLmF0dF93YWxsLmdldFdhbGxNYXhZWSgpKTtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgYXR0Tm9kZT1HYW1lRWZmZWN0c01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5jcmVhdGVHYW1lRWZmZWN0QnlJZChHYW1lRWZmZWN0SWQubW9uc3Rlcl9ub3JtYWxfYXR0LHBvcyk7XHJcbiAgICAgICAgICAgICAgICAgICAgYXR0Tm9kZS5zY2FsZT1zdXBlci5nZXRXYWxsQXR0YWNrU2NhbGUoKTtcclxuICAgICAgICAgICAgICAgIH1icmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgR29uZ0ppTW9kZS5GYXI6e1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBhdHROb2RlPUdhbWVFZmZlY3RzTWFuYWdlci5nZXRJbnN0YW5jZSgpLmNyZWF0ZUdhbWVFZmZlY3RCeUlkKHRoaXMubW9uc3Rlcl9mYXJfYXR0LHN1cGVyLmdldEF0dFBvcygpKTtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgYnVsbGV0PWF0dE5vZGUuZ2V0Q29tcG9uZW50KE1vbnN0ZXJCdWxsZXQpO1xyXG4gICAgICAgICAgICAgICAgICAgIGJ1bGxldC5pbml0KHRoaXMuZ2V0QXR0RGF0YShEYW1hZ2VUeXBlLk5vcm1hbCx0cnVlKSx0aGlzLm1vbnN0ZXJfZmFyX2F0dCx0aGlzLm1vbnN0ZXJfZmFyX2F0dF9oaXQsMTIwMCxNYXRoLlBJKjMvMik7XHJcbiAgICAgICAgICAgICAgICB9YnJlYWs7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgc3VwZXIucGxheVNwaW5BbmltYXRvbih0aGlzLmdldEFuaW1hTmFtZShNb25zdGVyQWN0aW9uTmFtZS5BdHRhY2spLGZhbHNlLGRhdGEsKCk9PntcclxuICAgICAgICAgICAgdGhpcy5zdGFydElkbGUoKTtcclxuICAgICAgICAgICAgc3VwZXIuc2V0RW5lbXlTdGF0ZShFbmVteV9TdGF0ZS5tb3ZlKTtcclxuICAgICAgICAgICAgaWYodGhpcy5hdHRfd2FsbCl7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNldE1vdmVEaXIoTWF0aC5yYW5kb20oKT4wLjU/TWF0aC5QSTowKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pXHJcbiAgICB9ICAgIFxyXG5cclxuICAgIHN0YXJ0SWRsZSgpe1xyXG4gICAgICAgIHN1cGVyLnBsYXlTcGluQW5pbWF0b24odGhpcy5nZXRBbmltYU5hbWUoTW9uc3RlckFjdGlvbk5hbWUuV2FsayksdHJ1ZSk7XHJcbiAgICB9XHJcblxyXG4gICAgb25YdWFuWXVuUmVzdWx0KGlzWHVhbll1bjpib29sZWFuKXtcclxuICAgICAgICBpZihpc1h1YW5ZdW4pe1xyXG4gICAgICAgICAgICB0aGlzLnN0YXJ0WHVhbll1bigpOyAgICAgICAgICAgIFxyXG4gICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICB0aGlzLmF0dF9qaXNodT0wO1xyXG4gICAgICAgICAgICB0aGlzLnNldEVuZW15U3RhdGUoRW5lbXlfU3RhdGUubW92ZSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmKHRoaXMubW9uc3Rlcl94dWFueXVuX2NhbGxiYWNrKXtcclxuICAgICAgICAgICAgdGhpcy5tb25zdGVyX3h1YW55dW5fY2FsbGJhY2soaXNYdWFuWXVuKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgc3RhcnRYdWFuWXVuKCl7XHJcbiAgICAgICAgdGhpcy5zcGluZS5wYXVzZWQ9dHJ1ZTsgICAgICAgICAgICBcclxuICAgIH1cclxuXHJcblxyXG4gICAgb25EZWF0aCgpe1xyXG4gICAgICAgIHRoaXMucmVtb3ZlQWxsRGVCdWZmKCk7XHJcbiAgICAgICAgdGhpcy5zaGFkb3cub3BhY2l0eT0wO1xyXG4gICAgICAgIHRoaXMubm9kZS5vcGFjaXR5PTA7XHJcbiAgICAgICAgbGV0IGRpZT1HYW1lRWZmZWN0c01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5jcmVhdGVHYW1lRWZmZWN0QnlJZChHYW1lRWZmZWN0SWQubW9uc3Rlcl9kaWUsc3VwZXIuZ2V0Q2VudGVyUG9zKCkpO1xyXG4gICAgICAgIGRpZS5zY2FsZT10aGlzLmJhc2VfZGF0YS5TdHJlbmd0aFR5cGU9PVN0cmVuZ3RoVHlwZS5Ob3JtYWw/MC40OjAuODtcclxuICAgICAgICBjYy50d2Vlbih0aGlzLm5vZGUpLmRlbGF5KDAuNSkuY2FsbCgoKT0+e1xyXG4gICAgICAgICAgICB0aGlzLnJlbW92ZUFsbERlQnVmZigpO1xyXG4gICAgICAgICAgICBNb25zdGVyTWFuYWdlci5nZXRJbnN0YW5jZSgpLmRlc3Ryb3lNb25zdGVyKHRoaXMubm9kZSx0aGlzLm1vbnN0ZXJfdHlwZSk7XHJcbiAgICAgICAgfSkuc3RhcnQoKTtcclxuICAgICAgICBpZih0aGlzLm1vbnN0ZXJfZGVhdGhfY2FsbGJhY2spe1xyXG4gICAgICAgICAgICB0aGlzLm1vbnN0ZXJfZGVhdGhfY2FsbGJhY2soKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBcclxuICAgIHVwZGF0ZShkdClcclxuICAgIHtcclxuICAgICAgICBpZigoR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5jdXJfZ2FtZV9zdGF0ZSE9R2FtZVN0YXRlLkdhbWVfUGxheWluZyl8fHRoaXMuZ2V0SXNEaWUoKSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgc3VwZXIudXBkYXRlKGR0KTtcclxuICAgICAgICBpZighdGhpcy5pc0hhdmVEZUJ1ZmZUeXBlKEJ1ZmZUeXBlLlZlcnRpZ28pKXtcclxuICAgICAgICAgICAgaWYodGhpcy5nZXRFbmVteVN0YXRlKCkhPUVuZW15X1N0YXRlLnNraWxsKXtcclxuICAgICAgICAgICAgICAgIHRoaXMuY2hlY2tBdHQoZHQpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgIGlmKHRoaXMuaXNIYXZlRGVCdWZmKEJ1ZmZJZC5IZXJvX01laU1vX0FjdGl2ZV9NZWlIdW8pKXtcclxuICAgICAgICAgICAgICAgIHRoaXMubW92aW5nKGR0KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIG1vdmluZyhkdClcclxuICAgIHtcclxuICAgICAgICBpZighdGhpcy5pc0hhdmVEZUJ1ZmYoQnVmZklkLkhlcm9fWHVhbll1bikmJih0aGlzLmdldEVuZW15U3RhdGUoKT09RW5lbXlfU3RhdGUubW92ZSkpe1xyXG4gICAgICAgICAgICBsZXQgc3BlZWQ9dGhpcy5jdXJfbW92ZV9zcGVlZCpkdDtcclxuICAgICAgICAgICAgaWYodGhpcy5tb3ZlX3RhcmdldF9wb3Mpe1xyXG4gICAgICAgICAgICAgICAgbGV0IG9mZnNldFBvcz10aGlzLm1vdmVfdGFyZ2V0X3Bvcy5zdWIodGhpcy5ub2RlLmdldFBvc2l0aW9uKCkpO1xyXG4gICAgICAgICAgICAgICAgaWYob2Zmc2V0UG9zLm1hZygpPHNwZWVkKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmKHRoaXMubW92ZV9lbmRfY2FsbGJhY2spe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm1vdmVfZW5kX2NhbGxiYWNrKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubW92ZV9lbmRfY2FsbGJhY2s9bnVsbDtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9ZWxzZVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBwaTI9TWF0aC5QSSoyO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0TW92ZURpcigoTWF0aC5hdGFuMihvZmZzZXRQb3MueSxvZmZzZXRQb3MueCkrcGkyKSVwaTIpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc3RhcnRNb3ZlKGR0KTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnN0YXJ0TW92ZShkdCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgc3RhcnRNb3ZlKGR0KXtcclxuICAgICAgICBsZXQgZGlzWD10aGlzLm5vZGUueDtcclxuICAgICAgICBsZXQgZGlzWT10aGlzLm5vZGUueTtcclxuICAgICAgICBsZXQgc3BlZWQ9dGhpcy5jdXJfbW92ZV9zcGVlZCpkdDtcclxuICAgICAgICBkaXNYKz1zcGVlZCpNYXRoLmNvcyh0aGlzLm1vdmVfZGlyZWN0aW9uKTtcclxuICAgICAgICBkaXNZKz1zcGVlZCpNYXRoLnNpbih0aGlzLm1vdmVfZGlyZWN0aW9uKTtcclxuICAgICAgICBsZXQgbGVmdFJpZ2h0PXRoaXMuc2V0WChkaXNYKTtcclxuICAgICAgICBpZihsZWZ0UmlnaHQhPTApe1xyXG4gICAgICAgICAgICB0aGlzLm1vdmVfZGlyZWN0aW9uKz1NYXRoLlBJO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLnNldFkoZGlzWSk7XHJcbiAgICAgICAgdGhpcy5jaGVja0ZhY2UoTW9uc3RlckFjdGlvbk5hbWUuV2Fsayk7XHJcbiAgICB9XHJcbiAgICAvKirmo4DmtYvmnJ3lkJEgKi9cclxuICAgIGNoZWNrRmFjZShhY3Rpb25OYW1lOk1vbnN0ZXJBY3Rpb25OYW1lKXtcclxuICAgICAgICBsZXQgcGkyPU1hdGguUEkqMjtcclxuICAgICAgICB0aGlzLnNldE1vdmVEaXIoKHRoaXMubW92ZV9kaXJlY3Rpb24rcGkyKSVwaTIpO1xyXG4gICAgICAgIGxldCBuZXdGYWNlPU1vbnN0ZXJGYWNlTmFtZS5TaWRlTDtcclxuICAgICAgICAvLzYwfjEyMMKw77yM6IOM6Z2iXHJcbiAgICAgICAgaWYodGhpcy5tb3ZlX2RpcmVjdGlvbiE9TWF0aC5QSSozLzIpe1xyXG4gICAgICAgICAgICBpZih0aGlzLm1vdmVfZGlyZWN0aW9uPj1NYXRoLlBJLzImJnRoaXMubW92ZV9kaXJlY3Rpb248PU1hdGguUEkqMy8yKXtcclxuICAgICAgICAgICAgICAgIHRoaXMubm9kZS5zY2FsZVg9LXRoaXMuc2V0dXBfc2NhbGU7XHJcbiAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgdGhpcy5ub2RlLnNjYWxlWD10aGlzLnNldHVwX3NjYWxlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSAgICAgICAgXHJcbiAgICAgICAgaWYodGhpcy5mYWNlX3R5cGUhPW5ld0ZhY2Upe1xyXG4gICAgICAgICAgICB0aGlzLnNldEZhY2VUeXBlKG5ld0ZhY2UpO1xyXG4gICAgICAgICAgICB0aGlzLnNldFNraW4odGhpcy5nZXRTa2luTmFtZSgpKTtcclxuICAgICAgICAgICAgc3VwZXIucGxheVNwaW5BbmltYXRvbih0aGlzLmdldEFuaW1hTmFtZShhY3Rpb25OYW1lKSx0cnVlKTtcclxuICAgICAgICB9ZWxzZXsgICAgICAgICAgICBcclxuICAgICAgICAgICAgaWYodGhpcy5zcGluZS5hbmltYXRpb24hPXRoaXMuZ2V0QW5pbWFOYW1lKE1vbnN0ZXJBY3Rpb25OYW1lLldhbGspKVxyXG4gICAgICAgICAgICBzdXBlci5wbGF5U3BpbkFuaW1hdG9uKHRoaXMuZ2V0QW5pbWFOYW1lKGFjdGlvbk5hbWUpLHRydWUpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBcclxuICAgIH1cclxuXHJcbiAgICAvKirmlLvlh7vorqHnrpcgKi9cclxuICAgIGNoZWNrQXR0KGR0Om51bWJlcil7ICAgICAgICBcclxuICAgICAgICB0aGlzLmF0dF9qaXNodSs9ZHQ7XHJcbiAgICAgICAgaWYodGhpcy5hdHRfamlzaHU+PXRoaXMuYXR0X2ppYW5nZSl7XHJcbiAgICAgICAgICAgIHRoaXMuYXR0X2ppc2h1PXRoaXMuYXR0X2ppYW5nZTtcclxuICAgICAgICAgICAgLy/liKTmlq3mmK/lkKblnKjmlLvlh7vojIPlm7TkuYvlhoVcclxuICAgICAgICAgICAgaWYodGhpcy5hdHRfdGFyZ2V0KXtcclxuICAgICAgICAgICAgICAgIHRoaXMuYXR0VGFyZ2V0KGR0KTtcclxuICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmF0dFdhbGwoZHQpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgIHRoaXMubW92aW5nKGR0KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICAvKirmlLvlh7vlhbfkvZPnm67moIfliKTmlq0gKi9cclxuICAgIGF0dFRhcmdldChkdDpudW1iZXIpe1xyXG4gICAgICAgIGxldCBkaXM9dGhpcy5ub2RlLmdldFBvc2l0aW9uKCkuc3ViKHRoaXMuYXR0X3RhcmdldC5nZXRQb3NpdGlvbigpKS5tYWcoKTtcclxuICAgICAgICBpZihkaXM8PXRoaXMuYmFzZV9kYXRhLkF0dGFja0Rpc3RhbmNlKXsgICAgICAgICAgICBcclxuICAgICAgICAgICAgdGhpcy5zdGFydEF0dGFjayh0aGlzLmF0dF90YXJnZXQpO1xyXG4gICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICB0aGlzLm1vdmVfdGFyZ2V0X3Bvcz10aGlzLmF0dF90YXJnZXQuZ2V0UG9zaXRpb24oKTtcclxuICAgICAgICAgICAgdGhpcy5tb3ZpbmcoZHQpO1xyXG4gICAgICAgIH1cclxuICAgIH0gICAgXHJcbiAgICAvKirmlLvlh7vln47lopnliKTmlq0gKi9cclxuICAgIGF0dFdhbGwoZHQ6bnVtYmVyKXtcclxuICAgICAgICBsZXQgd2FsbHM9V2FsbE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRBbGxXYWxsKCk7XHJcbiAgICAgICAgbGV0IGF0dFdhbGw9bnVsbDtcclxuICAgICAgICB3YWxscy5mb3JFYWNoKCh3YWxsOldhbGwsd2FsbFR5cGU6V2FsbFR5cGUpPT57XHJcbiAgICAgICAgICAgIC8v5pS75Ye75Z+O5aKZ55qE5p2h5Lu2Me+8jOW/hemhu+WcqOWfjuWimeS5i+S4iiwy6L6+5Yiw5pS75Ye76Led56a7XHJcbiAgICAgICAgICAgIGlmKHRoaXMubm9kZS55Pj13YWxsLmdldFdhbGxNYXhZWSgpJiZNYXRoLmFicyh0aGlzLm5vZGUueS13YWxsLmdldFdhbGxNYXhZWSgpKTw9dGhpcy5iYXNlX2RhdGEuQXR0YWNrRGlzdGFuY2UpeyAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIGF0dFdhbGw9d2FsbDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pXHJcbiAgICAgICAgaWYoYXR0V2FsbCE9bnVsbCl7XHJcbiAgICAgICAgICAgIHRoaXMuYXR0X3dhbGw9YXR0V2FsbDtcclxuICAgICAgICAgICAgdGhpcy5zdGFydEF0dGFjaygpO1xyXG4gICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICB0aGlzLnNldE1vdmVEaXIoTWF0aC5QSSozLzIpO1xyXG4gICAgICAgICAgICB0aGlzLm1vdmVfdGFyZ2V0X3Bvcz1udWxsOyAgICAgICBcclxuICAgICAgICAgICAgdGhpcy5tb3ZpbmcoZHQpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG4iXX0=