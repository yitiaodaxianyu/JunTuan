
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
        if (!this.isHaveDeBuff(HeroConfig_1.BuffId.Hero_XuanYun) && (this.getEnemyState() == EnemyConfig_1.Enemy_State.move || this.getEnemyState() == EnemyConfig_1.Enemy_State.ship)) {
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0c1xcTW9uc3RlclxcTW9uc3Rlck5ld05vcm1hbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSwwQ0FBeUM7QUFDekMsb0RBQXNFO0FBQ3RFLGlFQUE4RTtBQUc5RSw4Q0FBeUM7QUFDekMsc0RBQXVFO0FBR3ZFLG1EQUE4QztBQUM5QyxxQ0FBZ0M7QUFDaEMsaURBQTRDO0FBQzVDLDZDQUEwSTtBQUMxSSxtREFBOEM7QUFHeEMsSUFBQSxLQUFzQixFQUFFLENBQUMsVUFBVSxFQUFsQyxPQUFPLGFBQUEsRUFBRSxRQUFRLGNBQWlCLENBQUM7QUFDMUMsVUFBVTtBQUVWO0lBQThDLG9DQUFPO0lBQXJEO1FBQUEscUVBcVVDO1FBblVHLDhCQUF3QixHQUFVLElBQUksQ0FBQztRQUN2QywyQkFBcUIsR0FBVSxJQUFJLENBQUM7UUFDcEMsNEJBQXNCLEdBQVUsSUFBSSxDQUFDO1FBQ3JDLDBCQUFvQixHQUFVLElBQUksQ0FBQztRQUNuQyw4QkFBd0IsR0FBVSxJQUFJLENBQUM7UUFFdkMscUJBQWUsR0FBUSxDQUFDLENBQUM7UUFFekIseUJBQW1CLEdBQVEsQ0FBQyxDQUFDOztJQTJUakMsQ0FBQztJQXpUYSxpQ0FBTSxHQUFoQjtRQUNJLGlCQUFNLE1BQU0sV0FBRSxDQUFDO1FBQ2YsSUFBSSxDQUFDLGdCQUFnQixDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUNwQyxJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsQ0FBQztRQUN6QyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxDQUFDO0lBQ2hELENBQUM7SUFFTywwQ0FBZSxHQUF2QjtRQUNJLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQztRQUNuQixJQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsVUFBVSxJQUFFLHdCQUFVLENBQUMsR0FBRyxF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aUJBQU8sR0FxVXBEO2tCQXJVb0IsZ0JBQWdCIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgR2FtZVN0YXRlIH0gZnJvbSBcIi4uL0NvbnN0YW50c1wiO1xyXG5pbXBvcnQgeyBFbmVteV9EZUJ1ZmZfVHlwZSwgRW5lbXlfU3RhdGUgfSBmcm9tIFwiLi4vRW5lbXkvRW5lbXlDb25maWdcIjtcclxuaW1wb3J0IHsgR2FtZUVmZmVjdElkLCBHYW1lRWZmZWN0c01hbmFnZXIgfSBmcm9tIFwiLi4vR2FtZS9HYW1lRWZmZWN0c01hbmFnZXJcIjtcclxuaW1wb3J0IE1vdmUgZnJvbSBcIi4uL0dhbWUvTW92ZVwiO1xyXG5pbXBvcnQgU2tpbGxNYW5hZ2VyIGZyb20gXCIuLi9HYW1lL1NraWxsTWFuYWdlclwiO1xyXG5pbXBvcnQgR2FtZU1hbmFnZXIgZnJvbSBcIi4uL0dhbWVNYW5hZ2VyXCI7XHJcbmltcG9ydCB7IEJ1ZmZJZCwgQnVmZlR5cGUsIERhbWFnZVR5cGUgfSBmcm9tIFwiLi4vSGVyby9HYW1lL0hlcm9Db25maWdcIjtcclxuaW1wb3J0IFdhbGwgZnJvbSBcIi4uL1dhbGwvV2FsbFwiO1xyXG5pbXBvcnQgeyBXYWxsVHlwZSB9IGZyb20gXCIuLi9XYWxsL1dhbGxDb25maWdcIjtcclxuaW1wb3J0IFdhbGxNYW5hZ2VyIGZyb20gXCIuLi9XYWxsL1dhbGxNYW5hZ2VyXCI7XHJcbmltcG9ydCBNb25zdGVyIGZyb20gXCIuL01vbnN0ZXJcIjtcclxuaW1wb3J0IE1vbnN0ZXJCdWxsZXQgZnJvbSBcIi4vTW9uc3RlckJ1bGxldFwiO1xyXG5pbXBvcnQgeyBGZWVkQmFja1R5cGUsIEdvbmdKaU1vZGUsIEtleUZyYW1lRGF0YSwgTW9uc3RlckFjdGlvbk5hbWUsIE1vbnN0ZXJGYWNlTmFtZSwgTW9uc3RlclNraW5UeXBlLCBTdHJlbmd0aFR5cGUgfSBmcm9tIFwiLi9Nb25zdGVyRGF0YVwiO1xyXG5pbXBvcnQgTW9uc3Rlck1hbmFnZXIgZnJvbSBcIi4vTW9uc3Rlck1hbmFnZXJcIjtcclxuXHJcblxyXG5jb25zdCB7Y2NjbGFzcywgcHJvcGVydHl9ID0gY2MuX2RlY29yYXRvcjtcclxuLyoq5pmu6YCa5oCq54mpICovXHJcbkBjY2NsYXNzXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIE1vbnN0ZXJOZXdOb3JtYWwgZXh0ZW5kcyBNb25zdGVyIHtcclxuXHJcbiAgICBtb25zdGVyX3h1YW55dW5fY2FsbGJhY2s6RnVuY3Rpb249bnVsbDtcclxuICAgIG1vbnN0ZXJfaW5pdF9jYWxsYmFjazpGdW5jdGlvbj1udWxsO1xyXG4gICAgbW9uc3Rlcl9kZWF0aF9jYWxsYmFjazpGdW5jdGlvbj1udWxsO1xyXG4gICAgbW9uc3Rlcl9hdHRfY2FsbGJhY2s6RnVuY3Rpb249bnVsbDtcclxuICAgIG1vbnN0ZXJfYXR0X2hpdF9jYWxsYmFjazpGdW5jdGlvbj1udWxsO1xyXG4gICAgQHByb3BlcnR5KClcclxuICAgIG1vbnN0ZXJfZmFyX2F0dDpudW1iZXI9MDtcclxuICAgIEBwcm9wZXJ0eSgpXHJcbiAgICBtb25zdGVyX2Zhcl9hdHRfaGl0Om51bWJlcj0wO1xyXG5cclxuICAgIHByb3RlY3RlZCBvbkxvYWQoKTogdm9pZCB7XHJcbiAgICAgICAgc3VwZXIub25Mb2FkKCk7XHJcbiAgICAgICAgdGhpcy5hZGREZWF0aENhbGxiYWNrKHRoaXMub25EZWF0aCk7XHJcbiAgICAgICAgdGhpcy5hZGRJbml0TGlzdGVuKHRoaXMub25Nb25zdGVySW5pdGVkKTtcclxuICAgICAgICB0aGlzLmFkZFh1YW5ZdW5MaXN0ZW4odGhpcy5vblh1YW5ZdW5SZXN1bHQpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgb25Nb25zdGVySW5pdGVkKCl7XHJcbiAgICAgICAgdGhpcy5pbml0T3V0d2FyZCgpO1xyXG4gICAgICAgIGlmKHRoaXMuYmFzZV9kYXRhLkF0dGFja01vZGU9PUdvbmdKaU1vZGUuRmFyKXtcclxuICAgICAgICAgICAgaWYodGhpcy5tb25zdGVyX2Zhcl9hdHQ+MCl7XHJcbiAgICAgICAgICAgICAgICBHYW1lRWZmZWN0c01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5hZGRFZmZlY3RQb29sQnlJZCh0aGlzLm1vbnN0ZXJfZmFyX2F0dCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYodGhpcy5tb25zdGVyX2Zhcl9hdHRfaGl0PjApe1xyXG4gICAgICAgICAgICAgICAgR2FtZUVmZmVjdHNNYW5hZ2VyLmdldEluc3RhbmNlKCkuYWRkRWZmZWN0UG9vbEJ5SWQodGhpcy5tb25zdGVyX2Zhcl9hdHRfaGl0KTtcclxuICAgICAgICAgICAgfSAgICAgICAgICAgIFxyXG4gICAgICAgIH0gICAgICAgIFxyXG4gICAgICAgIHRoaXMuc2NoZWR1bGVPbmNlKHRoaXMuaWRsZVRvTW92ZSwxKTtcclxuICAgICAgICBpZih0aGlzLm1vbnN0ZXJfaW5pdF9jYWxsYmFjayl7XHJcbiAgICAgICAgICAgIHRoaXMubW9uc3Rlcl9pbml0X2NhbGxiYWNrKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMubm9kZS5zY2FsZVg9TWF0aC5yYW5kb20oKT4wLjU/dGhpcy5zZXR1cF9zY2FsZTotdGhpcy5zZXR1cF9zY2FsZTtcclxuICAgIH1cclxuXHJcbiAgICBpZGxlVG9Nb3ZlKCl7XHJcbiAgICAgICAgdGhpcy5zZXRFbmVteVN0YXRlKEVuZW15X1N0YXRlLm1vdmUpO1xyXG4gICAgfVxyXG5cclxuICAgIGFkZE1vbnN0ZXJOb3JtYWxEZWF0aChjYWxsYmFjazpGdW5jdGlvbil7XHJcbiAgICAgICAgdGhpcy5tb25zdGVyX2RlYXRoX2NhbGxiYWNrPWNhbGxiYWNrO1xyXG4gICAgfVxyXG5cclxuICAgIGFkZE1vbnN0ZXJOb3JtYWxJbml0ZWQoY2FsbGJhY2s6RnVuY3Rpb24pe1xyXG4gICAgICAgIHRoaXMubW9uc3Rlcl9pbml0X2NhbGxiYWNrPWNhbGxiYWNrO1xyXG4gICAgfVxyXG5cclxuICAgIGFkZE1vbnN0ZXJOb3JtYWxBdHRhY2soY2FsbGJhY2s6RnVuY3Rpb24pe1xyXG4gICAgICAgIHRoaXMubW9uc3Rlcl9hdHRfY2FsbGJhY2s9Y2FsbGJhY2s7XHJcbiAgICB9XHJcblxyXG4gICAgYWRkTW9uc3Rlck5vcm1hbEF0dGFja0hpdChjYWxsYmFjazpGdW5jdGlvbil7XHJcbiAgICAgICAgdGhpcy5tb25zdGVyX2F0dF9oaXRfY2FsbGJhY2s9Y2FsbGJhY2s7XHJcbiAgICB9XHJcblxyXG4gICAgYWRkTW9uc3Rlck5vcm1hbFh1YW5ZdW4oY2FsbGJhY2s6RnVuY3Rpb24pe1xyXG4gICAgICAgIHRoaXMubW9uc3Rlcl94dWFueXVuX2NhbGxiYWNrPWNhbGxiYWNrO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKuWIneWni+WMluWkluingiovXHJcbiAgICBwcml2YXRlIGluaXRPdXR3YXJkKCl7XHJcbiAgICAgICAgdGhpcy5zZXRTa2luKHRoaXMuZ2V0U2tpbk5hbWUoKSk7XHJcbiAgICAgICAgc3VwZXIucGxheVNwaW5BbmltYXRvbih0aGlzLmdldEFuaW1hTmFtZShNb25zdGVyQWN0aW9uTmFtZS5XYWxrKSx0cnVlKTtcclxuICAgIH1cclxuXHJcbiAgICBzZXRUYXJnZXRQb3MocG9zOmNjLlZlYzIsZW5kQ2FsbGJhY2s6RnVuY3Rpb24pe1xyXG4gICAgICAgIHRoaXMubW92ZV90YXJnZXRfcG9zPXBvcztcclxuICAgICAgICB0aGlzLm1vdmVfZW5kX2NhbGxiYWNrPWVuZENhbGxiYWNrO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICBzZXRTa2luKHNraW5OYW1lOiBzdHJpbmcpe1xyXG4gICAgICAgIHRoaXMuc3BpbmUuc2V0U2tpbihza2luTmFtZSk7XHJcbiAgICB9XHJcblxyXG4gICAgc2V0RmFjZVR5cGUodHlwZTpNb25zdGVyRmFjZU5hbWUpe1xyXG4gICAgICAgIHRoaXMuZmFjZV90eXBlPXR5cGU7XHJcbiAgICAgICAgLy8gaWYodGhpcy5mYWNlX3R5cGU9PU1vbnN0ZXJGYWNlTmFtZS5TaWRlTCl7XHJcbiAgICAgICAgLy8gICAgIHRoaXMubm9kZS5zY2FsZVg9LXRoaXMuc2V0dXBfc2NhbGU7XHJcbiAgICAgICAgLy8gfWVsc2Uge1xyXG4gICAgICAgIC8vICAgICB0aGlzLm5vZGUuc2NhbGVYPXRoaXMuc2V0dXBfc2NhbGU7XHJcbiAgICAgICAgLy8gfVxyXG4gICAgfVxyXG5cclxuICAgIGdldFNraW5OYW1lKCk6c3RyaW5ne1xyXG4gICAgICAgIHJldHVybiBNb25zdGVyRmFjZU5hbWUuU2lkZVIrdGhpcy5za2luX3R5cGU7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0QW5pbWFOYW1lKGFjdGlvbk5hbWU6TW9uc3RlckFjdGlvbk5hbWUpOnN0cmluZ3tcclxuICAgICAgICByZXR1cm4gTW9uc3RlckZhY2VOYW1lLlNpZGVSK1wiX1wiK2FjdGlvbk5hbWU7XHJcbiAgICB9XHJcblxyXG4gICAgLyoq6K6+572u5omT5Ye755uu5qCHICovXHJcbiAgICBzZXRBdHRUYXJnZXQodGFyZ2V0OmNjLk5vZGUpe1xyXG4gICAgICAgIHRoaXMuYXR0X3RhcmdldD10YXJnZXQ7XHJcbiAgICAgICAgaWYodGFyZ2V0KXtcclxuICAgICAgICAgICAgdGhpcy5hdHRfamlzaHU9dGhpcy5hdHRfamlhbmdlO1xyXG4gICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICB0aGlzLnNldE1vdmVEaXIoTWF0aC5QSSozLzIpO1xyXG4gICAgICAgIH0gICAgICAgIFxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogXHJcbiAgICAgKiBAcGFyYW0gdGFyZ2V0IOaUu+WHu+eahOebruagh1xyXG4gICAgICovXHJcbiAgICBzdGFydEF0dGFjayh0YXJnZXQ/OmNjLk5vZGUpe1xyXG4gICAgICAgIGlmKHRoaXMubW9uc3Rlcl9hdHRfY2FsbGJhY2spe1xyXG4gICAgICAgICAgICAvL+aYr+WQpuaIquiOt+acrOasoeaUu+WHu1xyXG4gICAgICAgICAgICBpZih0aGlzLm1vbnN0ZXJfYXR0X2NhbGxiYWNrKCkpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBzdXBlci5zZXRFbmVteVN0YXRlKEVuZW15X1N0YXRlLmF0dCk7XHJcbiAgICAgICAgdGhpcy5hdHRfamlzaHU9MDsgXHJcbiAgICAgICAgaWYodGFyZ2V0KXtcclxuICAgICAgICAgICAgbGV0IG9mZnNldFBvcz10YXJnZXQuZ2V0UG9zaXRpb24oKS5zdWIodGhpcy5ub2RlLmdldFBvc2l0aW9uKCkpO1xyXG4gICAgICAgICAgICB0aGlzLnNldE1vdmVEaXIoTWF0aC5hdGFuMihvZmZzZXRQb3MueSxvZmZzZXRQb3MueCkpO1xyXG4gICAgICAgICAgICB0aGlzLmNoZWNrRmFjZShNb25zdGVyQWN0aW9uTmFtZS5BdHRhY2spO1xyXG4gICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICB0aGlzLnNldE1vdmVEaXIoTWF0aC5QSSozLzIpO1xyXG4gICAgICAgICAgICB0aGlzLmNoZWNrRmFjZShNb25zdGVyQWN0aW9uTmFtZS5BdHRhY2spO1xyXG4gICAgICAgIH1cclxuICAgICAgICBsZXQgZGF0YT1uZXcgS2V5RnJhbWVEYXRhKCk7XHJcbiAgICAgICAgZGF0YS5uYW1lPSdPbkRhbWFnaW5nJztcclxuICAgICAgICBkYXRhLmNhbGxiYWNrPSgpPT57XHJcbiAgICAgICAgICAgIHRoaXMuYXR0X2ppc2h1PTA7XHJcbiAgICAgICAgICAgIGlmKHRoaXMuZ2V0SXNEaWUoKSl7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgc3dpdGNoKHRoaXMuYmFzZV9kYXRhLkF0dGFja01vZGUpe1xyXG4gICAgICAgICAgICAgICAgY2FzZSBHb25nSmlNb2RlLk1lbGVlOntcclxuICAgICAgICAgICAgICAgICAgICBpZih0YXJnZXQpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvL+a1i+ivlVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0YXJnZXQucmVtb3ZlRnJvbVBhcmVudCgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNldEF0dFRhcmdldChudWxsKTtcclxuICAgICAgICAgICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy/pgKDmiJDkvKTlrrNcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGluanVyZURhdGE9c3VwZXIuaW5qdXJlV2FsbChzdXBlci5nZXRBdHREYXRhKERhbWFnZVR5cGUuTm9ybWFsLGZhbHNlKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmKGluanVyZURhdGEuaXNfZGllPT1mYWxzZSYmaW5qdXJlRGF0YS5nZXREYW1hZ2VOdW0oKT4wKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYodGhpcy5tb25zdGVyX2F0dF9oaXRfY2FsbGJhY2spe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubW9uc3Rlcl9hdHRfaGl0X2NhbGxiYWNrKGluanVyZURhdGEpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IHBvcz10YXJnZXQ/dGFyZ2V0LmdldFBvc2l0aW9uKCk6Y2MudjIodGhpcy5ub2RlLngsdGhpcy5hdHRfd2FsbC5nZXRXYWxsTWF4WVkoKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IGF0dE5vZGU9R2FtZUVmZmVjdHNNYW5hZ2VyLmdldEluc3RhbmNlKCkuY3JlYXRlR2FtZUVmZmVjdEJ5SWQoR2FtZUVmZmVjdElkLm1vbnN0ZXJfbm9ybWFsX2F0dCxwb3MpO1xyXG4gICAgICAgICAgICAgICAgICAgIGF0dE5vZGUuc2NhbGU9c3VwZXIuZ2V0V2FsbEF0dGFja1NjYWxlKCk7XHJcbiAgICAgICAgICAgICAgICB9YnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlIEdvbmdKaU1vZGUuRmFyOntcclxuICAgICAgICAgICAgICAgICAgICBsZXQgYXR0Tm9kZT1HYW1lRWZmZWN0c01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5jcmVhdGVHYW1lRWZmZWN0QnlJZCh0aGlzLm1vbnN0ZXJfZmFyX2F0dCxzdXBlci5nZXRBdHRQb3MoKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IGJ1bGxldD1hdHROb2RlLmdldENvbXBvbmVudChNb25zdGVyQnVsbGV0KTtcclxuICAgICAgICAgICAgICAgICAgICBidWxsZXQuaW5pdCh0aGlzLmdldEF0dERhdGEoRGFtYWdlVHlwZS5Ob3JtYWwsdHJ1ZSksdGhpcy5tb25zdGVyX2Zhcl9hdHQsdGhpcy5tb25zdGVyX2Zhcl9hdHRfaGl0LDEyMDAsTWF0aC5QSSozLzIpO1xyXG4gICAgICAgICAgICAgICAgfWJyZWFrO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHN1cGVyLnBsYXlTcGluQW5pbWF0b24odGhpcy5nZXRBbmltYU5hbWUoTW9uc3RlckFjdGlvbk5hbWUuQXR0YWNrKSxmYWxzZSxkYXRhLCgpPT57XHJcbiAgICAgICAgICAgIHRoaXMuc3RhcnRJZGxlKCk7XHJcbiAgICAgICAgICAgIHN1cGVyLnNldEVuZW15U3RhdGUoRW5lbXlfU3RhdGUubW92ZSk7XHJcbiAgICAgICAgICAgIGlmKHRoaXMuYXR0X3dhbGwpe1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zZXRNb3ZlRGlyKE1hdGgucmFuZG9tKCk+MC41P01hdGguUEk6MCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KVxyXG4gICAgfSAgICBcclxuXHJcbiAgICBzdGFydElkbGUoKXtcclxuICAgICAgICBzdXBlci5wbGF5U3BpbkFuaW1hdG9uKHRoaXMuZ2V0QW5pbWFOYW1lKE1vbnN0ZXJBY3Rpb25OYW1lLldhbGspLHRydWUpO1xyXG4gICAgfVxyXG5cclxuICAgIG9uWHVhbll1blJlc3VsdChpc1h1YW5ZdW46Ym9vbGVhbil7XHJcbiAgICAgICAgaWYoaXNYdWFuWXVuKXtcclxuICAgICAgICAgICAgdGhpcy5zdGFydFh1YW5ZdW4oKTsgICAgICAgICAgICBcclxuICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgdGhpcy5hdHRfamlzaHU9MDtcclxuICAgICAgICAgICAgdGhpcy5zZXRFbmVteVN0YXRlKEVuZW15X1N0YXRlLm1vdmUpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZih0aGlzLm1vbnN0ZXJfeHVhbnl1bl9jYWxsYmFjayl7XHJcbiAgICAgICAgICAgIHRoaXMubW9uc3Rlcl94dWFueXVuX2NhbGxiYWNrKGlzWHVhbll1bik7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHN0YXJ0WHVhbll1bigpe1xyXG4gICAgICAgIHRoaXMuc3BpbmUucGF1c2VkPXRydWU7ICAgICAgICAgICAgXHJcbiAgICB9XHJcblxyXG5cclxuICAgIG9uRGVhdGgoKXtcclxuICAgICAgICB0aGlzLnJlbW92ZUFsbERlQnVmZigpO1xyXG4gICAgICAgIHRoaXMuc2hhZG93Lm9wYWNpdHk9MDtcclxuICAgICAgICB0aGlzLm5vZGUub3BhY2l0eT0wO1xyXG4gICAgICAgIGxldCBkaWU9R2FtZUVmZmVjdHNNYW5hZ2VyLmdldEluc3RhbmNlKCkuY3JlYXRlR2FtZUVmZmVjdEJ5SWQoR2FtZUVmZmVjdElkLm1vbnN0ZXJfZGllLHN1cGVyLmdldENlbnRlclBvcygpKTtcclxuICAgICAgICBkaWUuc2NhbGU9dGhpcy5iYXNlX2RhdGEuU3RyZW5ndGhUeXBlPT1TdHJlbmd0aFR5cGUuTm9ybWFsPzAuNDowLjg7XHJcbiAgICAgICAgY2MudHdlZW4odGhpcy5ub2RlKS5kZWxheSgwLjUpLmNhbGwoKCk9PntcclxuICAgICAgICAgICAgdGhpcy5yZW1vdmVBbGxEZUJ1ZmYoKTtcclxuICAgICAgICAgICAgTW9uc3Rlck1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5kZXN0cm95TW9uc3Rlcih0aGlzLm5vZGUsdGhpcy5tb25zdGVyX3R5cGUpO1xyXG4gICAgICAgIH0pLnN0YXJ0KCk7XHJcbiAgICAgICAgaWYodGhpcy5tb25zdGVyX2RlYXRoX2NhbGxiYWNrKXtcclxuICAgICAgICAgICAgdGhpcy5tb25zdGVyX2RlYXRoX2NhbGxiYWNrKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgXHJcbiAgICB1cGRhdGUoZHQpXHJcbiAgICB7XHJcbiAgICAgICAgaWYoKEdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuY3VyX2dhbWVfc3RhdGUhPUdhbWVTdGF0ZS5HYW1lX1BsYXlpbmcpfHx0aGlzLmdldElzRGllKCkpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHN1cGVyLnVwZGF0ZShkdCk7XHJcbiAgICAgICAgaWYoIXRoaXMuaXNIYXZlRGVCdWZmVHlwZShCdWZmVHlwZS5WZXJ0aWdvKSl7XHJcbiAgICAgICAgICAgIGlmKHRoaXMuZ2V0RW5lbXlTdGF0ZSgpIT1FbmVteV9TdGF0ZS5za2lsbCl7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNoZWNrQXR0KGR0KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICBpZih0aGlzLmlzSGF2ZURlQnVmZihCdWZmSWQuSGVyb19NZWlNb19BY3RpdmVfTWVpSHVvKSl7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm1vdmluZyhkdCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBtb3ZpbmcoZHQpXHJcbiAgICB7XHJcbiAgICAgICAgaWYoIXRoaXMuaXNIYXZlRGVCdWZmKEJ1ZmZJZC5IZXJvX1h1YW5ZdW4pJiYodGhpcy5nZXRFbmVteVN0YXRlKCk9PUVuZW15X1N0YXRlLm1vdmV8fHRoaXMuZ2V0RW5lbXlTdGF0ZSgpPT1FbmVteV9TdGF0ZS5zaGlwKSl7XHJcbiAgICAgICAgICAgIGxldCBzcGVlZD10aGlzLmN1cl9tb3ZlX3NwZWVkKmR0O1xyXG4gICAgICAgICAgICBpZih0aGlzLm1vdmVfdGFyZ2V0X3Bvcyl7XHJcbiAgICAgICAgICAgICAgICBsZXQgb2Zmc2V0UG9zPXRoaXMubW92ZV90YXJnZXRfcG9zLnN1Yih0aGlzLm5vZGUuZ2V0UG9zaXRpb24oKSk7XHJcbiAgICAgICAgICAgICAgICBpZihvZmZzZXRQb3MubWFnKCk8c3BlZWQpXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYodGhpcy5tb3ZlX2VuZF9jYWxsYmFjayl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubW92ZV9lbmRfY2FsbGJhY2soKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5tb3ZlX2VuZF9jYWxsYmFjaz1udWxsO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1lbHNlXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IHBpMj1NYXRoLlBJKjI7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXRNb3ZlRGlyKChNYXRoLmF0YW4yKG9mZnNldFBvcy55LG9mZnNldFBvcy54KStwaTIpJXBpMik7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zdGFydE1vdmUoZHQpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgIHRoaXMuc3RhcnRNb3ZlKGR0KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBzdGFydE1vdmUoZHQpe1xyXG4gICAgICAgIGxldCBkaXNYPXRoaXMubm9kZS54O1xyXG4gICAgICAgIGxldCBkaXNZPXRoaXMubm9kZS55O1xyXG4gICAgICAgIGxldCBzcGVlZD10aGlzLmN1cl9tb3ZlX3NwZWVkKmR0O1xyXG4gICAgICAgIGRpc1grPXNwZWVkKk1hdGguY29zKHRoaXMubW92ZV9kaXJlY3Rpb24pO1xyXG4gICAgICAgIGRpc1krPXNwZWVkKk1hdGguc2luKHRoaXMubW92ZV9kaXJlY3Rpb24pO1xyXG4gICAgICAgIGxldCBsZWZ0UmlnaHQ9dGhpcy5zZXRYKGRpc1gpO1xyXG4gICAgICAgIGlmKGxlZnRSaWdodCE9MCl7XHJcbiAgICAgICAgICAgIHRoaXMubW92ZV9kaXJlY3Rpb24rPU1hdGguUEk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuc2V0WShkaXNZKTtcclxuICAgICAgICB0aGlzLmNoZWNrRmFjZShNb25zdGVyQWN0aW9uTmFtZS5XYWxrKTtcclxuICAgIH1cclxuICAgIC8qKuajgOa1i+acneWQkSAqL1xyXG4gICAgY2hlY2tGYWNlKGFjdGlvbk5hbWU6TW9uc3RlckFjdGlvbk5hbWUpe1xyXG4gICAgICAgIGxldCBwaTI9TWF0aC5QSSoyO1xyXG4gICAgICAgIHRoaXMuc2V0TW92ZURpcigodGhpcy5tb3ZlX2RpcmVjdGlvbitwaTIpJXBpMik7XHJcbiAgICAgICAgbGV0IG5ld0ZhY2U9TW9uc3RlckZhY2VOYW1lLlNpZGVMO1xyXG4gICAgICAgIC8vNjB+MTIwwrDvvIzog4zpnaJcclxuICAgICAgICBpZih0aGlzLm1vdmVfZGlyZWN0aW9uIT1NYXRoLlBJKjMvMil7XHJcbiAgICAgICAgICAgIGlmKHRoaXMubW92ZV9kaXJlY3Rpb24+PU1hdGguUEkvMiYmdGhpcy5tb3ZlX2RpcmVjdGlvbjw9TWF0aC5QSSozLzIpe1xyXG4gICAgICAgICAgICAgICAgdGhpcy5ub2RlLnNjYWxlWD0tdGhpcy5zZXR1cF9zY2FsZTtcclxuICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm5vZGUuc2NhbGVYPXRoaXMuc2V0dXBfc2NhbGU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9ICAgICAgICBcclxuICAgICAgICBpZih0aGlzLmZhY2VfdHlwZSE9bmV3RmFjZSl7XHJcbiAgICAgICAgICAgIHRoaXMuc2V0RmFjZVR5cGUobmV3RmFjZSk7XHJcbiAgICAgICAgICAgIHRoaXMuc2V0U2tpbih0aGlzLmdldFNraW5OYW1lKCkpO1xyXG4gICAgICAgICAgICBzdXBlci5wbGF5U3BpbkFuaW1hdG9uKHRoaXMuZ2V0QW5pbWFOYW1lKGFjdGlvbk5hbWUpLHRydWUpO1xyXG4gICAgICAgIH1lbHNleyAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBpZih0aGlzLnNwaW5lLmFuaW1hdGlvbiE9dGhpcy5nZXRBbmltYU5hbWUoTW9uc3RlckFjdGlvbk5hbWUuV2FsaykpXHJcbiAgICAgICAgICAgIHN1cGVyLnBsYXlTcGluQW5pbWF0b24odGhpcy5nZXRBbmltYU5hbWUoYWN0aW9uTmFtZSksdHJ1ZSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIFxyXG4gICAgfVxyXG5cclxuICAgIC8qKuaUu+WHu+iuoeeulyAqL1xyXG4gICAgY2hlY2tBdHQoZHQ6bnVtYmVyKXsgICAgICAgIFxyXG4gICAgICAgIHRoaXMuYXR0X2ppc2h1Kz1kdDtcclxuICAgICAgICBpZih0aGlzLmF0dF9qaXNodT49dGhpcy5hdHRfamlhbmdlKXtcclxuICAgICAgICAgICAgdGhpcy5hdHRfamlzaHU9dGhpcy5hdHRfamlhbmdlO1xyXG4gICAgICAgICAgICAvL+WIpOaWreaYr+WQpuWcqOaUu+WHu+iMg+WbtOS5i+WGhVxyXG4gICAgICAgICAgICBpZih0aGlzLmF0dF90YXJnZXQpe1xyXG4gICAgICAgICAgICAgICAgdGhpcy5hdHRUYXJnZXQoZHQpO1xyXG4gICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgIHRoaXMuYXR0V2FsbChkdCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgdGhpcy5tb3ZpbmcoZHQpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIC8qKuaUu+WHu+WFt+S9k+ebruagh+WIpOaWrSAqL1xyXG4gICAgYXR0VGFyZ2V0KGR0Om51bWJlcil7XHJcbiAgICAgICAgbGV0IGRpcz10aGlzLm5vZGUuZ2V0UG9zaXRpb24oKS5zdWIodGhpcy5hdHRfdGFyZ2V0LmdldFBvc2l0aW9uKCkpLm1hZygpO1xyXG4gICAgICAgIGlmKGRpczw9dGhpcy5iYXNlX2RhdGEuQXR0YWNrRGlzdGFuY2UpeyAgICAgICAgICAgIFxyXG4gICAgICAgICAgICB0aGlzLnN0YXJ0QXR0YWNrKHRoaXMuYXR0X3RhcmdldCk7XHJcbiAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgIHRoaXMubW92ZV90YXJnZXRfcG9zPXRoaXMuYXR0X3RhcmdldC5nZXRQb3NpdGlvbigpO1xyXG4gICAgICAgICAgICB0aGlzLm1vdmluZyhkdCk7XHJcbiAgICAgICAgfVxyXG4gICAgfSAgICBcclxuICAgIC8qKuaUu+WHu+WfjuWimeWIpOaWrSAqL1xyXG4gICAgYXR0V2FsbChkdDpudW1iZXIpe1xyXG4gICAgICAgIGxldCB3YWxscz1XYWxsTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldEFsbFdhbGwoKTtcclxuICAgICAgICBsZXQgYXR0V2FsbD1udWxsO1xyXG4gICAgICAgIHdhbGxzLmZvckVhY2goKHdhbGw6V2FsbCx3YWxsVHlwZTpXYWxsVHlwZSk9PntcclxuICAgICAgICAgICAgLy/mlLvlh7vln47lopnnmoTmnaHku7Yx77yM5b+F6aG75Zyo5Z+O5aKZ5LmL5LiKLDLovr7liLDmlLvlh7vot53nprtcclxuICAgICAgICAgICAgaWYodGhpcy5ub2RlLnk+PXdhbGwuZ2V0V2FsbE1heFlZKCkmJk1hdGguYWJzKHRoaXMubm9kZS55LXdhbGwuZ2V0V2FsbE1heFlZKCkpPD10aGlzLmJhc2VfZGF0YS5BdHRhY2tEaXN0YW5jZSl7ICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgYXR0V2FsbD13YWxsO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSlcclxuICAgICAgICBpZihhdHRXYWxsIT1udWxsKXtcclxuICAgICAgICAgICAgdGhpcy5hdHRfd2FsbD1hdHRXYWxsO1xyXG4gICAgICAgICAgICB0aGlzLnN0YXJ0QXR0YWNrKCk7XHJcbiAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgIHRoaXMuc2V0TW92ZURpcihNYXRoLlBJKjMvMik7XHJcbiAgICAgICAgICAgIHRoaXMubW92ZV90YXJnZXRfcG9zPW51bGw7ICAgICAgIFxyXG4gICAgICAgICAgICB0aGlzLm1vdmluZyhkdCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcbiJdfQ==