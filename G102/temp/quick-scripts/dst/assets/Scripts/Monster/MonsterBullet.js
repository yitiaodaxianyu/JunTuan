
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Scripts/Monster/MonsterBullet.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'd5f74pedANPgZfCbRgBd3/a', 'MonsterBullet');
// Scripts/Monster/MonsterBullet.ts

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
var GameEffectsManager_1 = require("../Game/GameEffectsManager");
var GameManager_1 = require("../GameManager");
var Wall_1 = require("../Wall/Wall");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var MonsterBullet = /** @class */ (function (_super) {
    __extends(MonsterBullet, _super);
    function MonsterBullet() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.game_effect_id = 0;
        _this.game_effect_id_hit = 0;
        _this.move_speed = 700;
        _this.move_direction = Math.PI / 2;
        _this.offset_xx_angle = 90;
        _this.is_att = true;
        _this.monster_att_data = null;
        _this.collision_target_callback = null;
        /**碰撞器 */
        _this.collider = null;
        /**加速度 */
        _this.acceleration = 0;
        /***************拖尾***************** */
        _this.prefab_tuowei = null;
        /**拖尾节点 */
        _this.tuowei_node = null;
        /**拖尾身位 */
        _this.tuowei_space = 0.25;
        _this.tuowei_time = 0.5;
        /**拖尾归1（原点位置）的身位数 */
        _this.tuowei_guiyi = 0;
        return _this;
    }
    MonsterBullet.prototype.init = function (monsterAttData, gameEffectId, hitGameEffectId, speed, dir, angle) {
        if (angle === void 0) { angle = 90; }
        this.monster_att_data = monsterAttData;
        this.game_effect_id = gameEffectId;
        this.game_effect_id_hit = hitGameEffectId;
        this.move_speed = speed;
        this.offset_xx_angle = angle;
        this.is_att = false;
        this.setDirection(dir);
        this.collider = this.getComponent(cc.Collider);
        if (this.prefab_tuowei) {
            this.tuowei_node = cc.instantiate(this.prefab_tuowei);
            this.tuowei_node.parent = this.node.parent;
            this.node.zIndex = 1;
            this.tuowei_time = this.tuowei_node.getComponent(cc.MotionStreak).fadeTime;
            this.tuowei_guiyi = 1 / this.tuowei_time;
        }
    };
    /**获取下一帧位置 */
    MonsterBullet.prototype.getNextPos = function (dt) {
        var gr = GameManager_1.default.getInstance().getGameRate();
        if (gr < 1) {
            gr = 1;
        }
        var distance = this.tuowei_space * this.tuowei_guiyi * this.move_speed * dt / gr;
        var xx = this.node.x + Math.cos(this.move_direction) * distance;
        var yy = this.node.y + Math.sin(this.move_direction) * distance;
        return cc.v2(xx, yy);
    };
    MonsterBullet.prototype.getHeadPos = function () {
        var distance = this.move_speed * cc.director.getDeltaTime();
        var xx = this.node.x + Math.cos(this.move_direction) * distance;
        var yy = this.node.y + Math.sin(this.move_direction) * distance;
        return cc.v2(xx, yy);
    };
    MonsterBullet.prototype.getAPos = function (offsetDistance) {
        var distance = this.move_speed * cc.director.getDeltaTime() - offsetDistance;
        var xx = this.node.x + Math.cos(this.move_direction) * distance;
        var yy = this.node.y + Math.sin(this.move_direction) * distance;
        return cc.v2(xx, yy);
    };
    MonsterBullet.prototype.update = function (dt) {
        if (GameManager_1.default.getInstance().cur_game_state != Constants_1.GameState.Game_Playing)
            return;
        var xx = this.move_speed * dt * Math.cos(this.move_direction);
        var yy = this.move_speed * dt * Math.sin(this.move_direction);
        this.node.x += xx;
        this.node.y += yy;
        if (this.node.y > cc.winSize.height) {
            this.destroySelf();
        }
        if (Math.abs(this.node.x) > cc.winSize.width) {
            this.destroySelf();
        }
        if (this.tuowei_node) {
            this.tuowei_node.setPosition(this.getNextPos(dt));
        }
    };
    MonsterBullet.prototype.destroySelf = function () {
        GameEffectsManager_1.GameEffectsManager.getInstance().destroyGameEffectById(this.game_effect_id, this.node);
    };
    MonsterBullet.prototype.setDirection = function (dir) {
        this.move_direction = dir;
        this.node.angle = 180 * dir / Math.PI - this.offset_xx_angle;
    };
    /**添加城墙碰撞的监听,指玩家召唤的城墙 */
    MonsterBullet.prototype.addCollisionWallListen = function (callback) {
        this.collision_target_callback = callback;
    };
    ////--------------------------------------碰撞开始----------------------------------------------------
    MonsterBullet.prototype.onCollisionEnter = function (other, self) {
        var _this = this;
        var gm = GameManager_1.default.getInstance();
        if (gm.cur_game_state == Constants_1.GameState.Game_Lose || this.is_att == true)
            return;
        var group = other.node.group;
        switch (group) {
            case 'wall':
                {
                    var wall = other.node.getComponent(Wall_1.default);
                    if (this.collision_target_callback) {
                        //有回调就处理回调
                        if (this.collision_target_callback(wall)) {
                            return;
                        }
                    }
                    var aData = wall.beInjured(this.monster_att_data);
                    if (aData.getDamageNum() > 0) {
                        if (this.game_effect_id_hit > 0) {
                            var hit = GameEffectsManager_1.GameEffectsManager.getInstance().createGameEffectById(this.game_effect_id_hit, this.node.getPosition());
                            var animation_1 = hit.getComponent(cc.Animation);
                            animation_1.play();
                            animation_1.on(cc.Animation.EventType.FINISHED, function () {
                                animation_1.off(cc.Animation.EventType.FINISHED);
                                GameEffectsManager_1.GameEffectsManager.getInstance().destroyGameEffectById(_this.game_effect_id_hit, _this.node);
                            });
                        }
                    }
                    this.destroySelf();
                }
                break;
        }
    };
    __decorate([
        property({ type: cc.Prefab })
    ], MonsterBullet.prototype, "prefab_tuowei", void 0);
    MonsterBullet = __decorate([
        ccclass
    ], MonsterBullet);
    return MonsterBullet;
}(cc.Component));
exports.default = MonsterBullet;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0c1xcTW9uc3RlclxcTW9uc3RlckJ1bGxldC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSwwQ0FBeUM7QUFDekMsaUVBQThFO0FBQzlFLDhDQUF5QztBQUN6QyxxQ0FBZ0M7QUFNMUIsSUFBQSxLQUFzQixFQUFFLENBQUMsVUFBVSxFQUFsQyxPQUFPLGFBQUEsRUFBRSxRQUFRLGNBQWlCLENBQUM7QUFHMUM7SUFBMkMsaUNBQVk7SUFBdkQ7UUFBQSxxRUF5SUM7UUF2SUcsb0JBQWMsR0FBUSxDQUFDLENBQUM7UUFDeEIsd0JBQWtCLEdBQVEsQ0FBQyxDQUFDO1FBQzVCLGdCQUFVLEdBQVEsR0FBRyxDQUFDO1FBQ3RCLG9CQUFjLEdBQVEsSUFBSSxDQUFDLEVBQUUsR0FBQyxDQUFDLENBQUM7UUFDaEMscUJBQWUsR0FBUSxFQUFFLENBQUM7UUFDMUIsWUFBTSxHQUFTLElBQUksQ0FBQztRQUNwQixzQkFBZ0IsR0FBZ0IsSUFBSSxDQUFDO1FBRXJDLCtCQUF5QixHQUFVLElBQUksQ0FBQztRQUN4QyxTQUFTO1FBQ1QsY0FBUSxHQUFhLElBQUksQ0FBQztRQUMxQixTQUFTO1FBQ1Qsa0JBQVksR0FBUSxDQUFDLENBQUM7UUFDdEIsc0NBQXNDO1FBRXRDLG1CQUFhLEdBQVcsSUFBSSxDQUFDO1FBQzdCLFVBQVU7UUFDVixpQkFBVyxHQUFTLElBQUksQ0FBQztRQUN6QixVQUFVO1FBQ1Ysa0JBQVksR0FBUSxJQUFJLENBQUM7UUFDekIsaUJBQVcsR0FBUSxHQUFHLENBQUM7UUFDdkIsb0JBQW9CO1FBQ3BCLGtCQUFZLEdBQVEsQ0FBQyxDQUFDOztJQWlIMUIsQ0FBQztJQS9HRyw0QkFBSSxHQUFKLFVBQUssY0FBNkIsRUFBQyxZQUF5QixFQUFDLGVBQXNCLEVBQUMsS0FBWSxFQUFDLEdBQVUsRUFBQyxLQUFlO1FBQWYsc0JBQUEsRUFBQSxVQUFlO1FBRXZILElB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Um9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBHYW1lU3RhdGUgfSBmcm9tIFwiLi4vQ29uc3RhbnRzXCI7XHJcbmltcG9ydCB7IEdhbWVFZmZlY3RJZCwgR2FtZUVmZmVjdHNNYW5hZ2VyIH0gZnJvbSBcIi4uL0dhbWUvR2FtZUVmZmVjdHNNYW5hZ2VyXCI7XHJcbmltcG9ydCBHYW1lTWFuYWdlciBmcm9tIFwiLi4vR2FtZU1hbmFnZXJcIjtcclxuaW1wb3J0IFdhbGwgZnJvbSBcIi4uL1dhbGwvV2FsbFwiO1xyXG5pbXBvcnQgeyBNb25zdGVyQXR0RGF0YSB9IGZyb20gXCIuL01vbnN0ZXJEYXRhXCI7XHJcblxyXG5cclxuXHJcblxyXG5jb25zdCB7Y2NjbGFzcywgcHJvcGVydHl9ID0gY2MuX2RlY29yYXRvcjtcclxuXHJcbkBjY2NsYXNzXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIE1vbnN0ZXJCdWxsZXQgZXh0ZW5kcyBjYy5Db21wb25lbnQge1xyXG5cclxuICAgIGdhbWVfZWZmZWN0X2lkOm51bWJlcj0wO1xyXG4gICAgZ2FtZV9lZmZlY3RfaWRfaGl0Om51bWJlcj0wO1xyXG4gICAgbW92ZV9zcGVlZDpudW1iZXI9NzAwO1xyXG4gICAgbW92ZV9kaXJlY3Rpb246bnVtYmVyPU1hdGguUEkvMjtcclxuICAgIG9mZnNldF94eF9hbmdsZTpudW1iZXI9OTA7XHJcbiAgICBpc19hdHQ6Ym9vbGVhbj10cnVlO1xyXG4gICAgbW9uc3Rlcl9hdHRfZGF0YTpNb25zdGVyQXR0RGF0YT1udWxsO1xyXG5cclxuICAgIGNvbGxpc2lvbl90YXJnZXRfY2FsbGJhY2s6RnVuY3Rpb249bnVsbDsgICAgXHJcbiAgICAvKirnorDmkp7lmaggKi9cclxuICAgIGNvbGxpZGVyOmNjLkNvbGxpZGVyPW51bGw7XHJcbiAgICAvKirliqDpgJ/luqYgKi9cclxuICAgIGFjY2VsZXJhdGlvbjpudW1iZXI9MDtcclxuICAgIC8qKioqKioqKioqKioqKirmi5blsL4qKioqKioqKioqKioqKioqKiAqL1xyXG4gICAgQHByb3BlcnR5KHt0eXBlOmNjLlByZWZhYn0pXHJcbiAgICBwcmVmYWJfdHVvd2VpOmNjLlByZWZhYj1udWxsO1xyXG4gICAgLyoq5ouW5bC+6IqC54K5ICovXHJcbiAgICB0dW93ZWlfbm9kZTpjYy5Ob2RlPW51bGw7XHJcbiAgICAvKirmi5blsL7ouqvkvY0gKi9cclxuICAgIHR1b3dlaV9zcGFjZTpudW1iZXI9MC4yNTtcclxuICAgIHR1b3dlaV90aW1lOm51bWJlcj0wLjU7XHJcbiAgICAvKirmi5blsL7lvZIx77yI5Y6f54K55L2N572u77yJ55qE6Lqr5L2N5pWwICovXHJcbiAgICB0dW93ZWlfZ3VpeWk6bnVtYmVyPTA7XHJcblxyXG4gICAgaW5pdChtb25zdGVyQXR0RGF0YTpNb25zdGVyQXR0RGF0YSxnYW1lRWZmZWN0SWQ6R2FtZUVmZmVjdElkLGhpdEdhbWVFZmZlY3RJZDpudW1iZXIsc3BlZWQ6bnVtYmVyLGRpcjpudW1iZXIsYW5nbGU6bnVtYmVyPTkwKVxyXG4gICAge1xyXG4gICAgICAgIHRoaXMubW9uc3Rlcl9hdHRfZGF0YT1tb25zdGVyQXR0RGF0YTtcclxuICAgICAgICB0aGlzLmdhbWVfZWZmZWN0X2lkPWdhbWVFZmZlY3RJZDtcclxuICAgICAgICB0aGlzLmdhbWVfZWZmZWN0X2lkX2hpdD1oaXRHYW1lRWZmZWN0SWQ7XHJcbiAgICAgICAgdGhpcy5tb3ZlX3NwZWVkPXNwZWVkO1xyXG4gICAgICAgIHRoaXMub2Zmc2V0X3h4X2FuZ2xlPWFuZ2xlO1xyXG4gICAgICAgIHRoaXMuaXNfYXR0PWZhbHNlO1xyXG4gICAgICAgIHRoaXMuc2V0RGlyZWN0aW9uKGRpcik7XHJcbiAgICAgICAgdGhpcy5jb2xsaWRlcj10aGlzLmdldENvbXBvbmVudChjYy5Db2xsaWRlcik7XHJcbiAgICAgICAgaWYodGhpcy5wcmVmYWJfdHVvd2VpKXtcclxuICAgICAgICAgICAgdGhpcy50dW93ZWlfbm9kZT1jYy5pbnN0YW50aWF0ZSh0aGlzLnByZWZhYl90dW93ZWkpO1xyXG4gICAgICAgICAgICB0aGlzLnR1b3dlaV9ub2RlLnBhcmVudD10aGlzLm5vZGUucGFyZW50O1xyXG4gICAgICAgICAgICB0aGlzLm5vZGUuekluZGV4PTE7XHJcbiAgICAgICAgICAgIHRoaXMudHVvd2VpX3RpbWU9dGhpcy50dW93ZWlfbm9kZS5nZXRDb21wb25lbnQoY2MuTW90aW9uU3RyZWFrKS5mYWRlVGltZTtcclxuICAgICAgICAgICAgdGhpcy50dW93ZWlfZ3VpeWk9MS90aGlzLnR1b3dlaV90aW1lO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKirojrflj5bkuIvkuIDluKfkvY3nva4gKi9cclxuICAgIGdldE5leHRQb3MoZHQ6bnVtYmVyKTpjYy5WZWMyXHJcbiAgICB7XHJcbiAgICAgICAgbGV0IGdyPUdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0R2FtZVJhdGUoKTtcclxuICAgICAgICBpZihncjwxKXtcclxuICAgICAgICAgICAgZ3I9MTtcclxuICAgICAgICB9XHJcbiAgICAgICAgbGV0IGRpc3RhbmNlPXRoaXMudHVvd2VpX3NwYWNlKnRoaXMudHVvd2VpX2d1aXlpKnRoaXMubW92ZV9zcGVlZCpkdC9ncjtcclxuICAgICAgICBsZXQgeHg9dGhpcy5ub2RlLngrTWF0aC5jb3ModGhpcy5tb3ZlX2RpcmVjdGlvbikqZGlzdGFuY2U7XHJcbiAgICAgICAgbGV0IHl5PXRoaXMubm9kZS55K01hdGguc2luKHRoaXMubW92ZV9kaXJlY3Rpb24pKmRpc3RhbmNlO1xyXG4gICAgICAgIHJldHVybiBjYy52Mih4eCx5eSk7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0SGVhZFBvcygpOmNjLlZlYzJ7XHJcbiAgICAgICAgbGV0IGRpc3RhbmNlPXRoaXMubW92ZV9zcGVlZCpjYy5kaXJlY3Rvci5nZXREZWx0YVRpbWUoKTtcclxuICAgICAgICBsZXQgeHg9dGhpcy5ub2RlLngrTWF0aC5jb3ModGhpcy5tb3ZlX2RpcmVjdGlvbikqZGlzdGFuY2U7XHJcbiAgICAgICAgbGV0IHl5PXRoaXMubm9kZS55K01hdGguc2luKHRoaXMubW92ZV9kaXJlY3Rpb24pKmRpc3RhbmNlO1xyXG4gICAgICAgIHJldHVybiBjYy52Mih4eCx5eSk7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0QVBvcyhvZmZzZXREaXN0YW5jZTpudW1iZXIpOmNjLlZlYzJ7XHJcbiAgICAgICAgbGV0IGRpc3RhbmNlPXRoaXMubW92ZV9zcGVlZCpjYy5kaXJlY3Rvci5nZXREZWx0YVRpbWUoKS1vZmZzZXREaXN0YW5jZTtcclxuICAgICAgICBsZXQgeHg9dGhpcy5ub2RlLngrTWF0aC5jb3ModGhpcy5tb3ZlX2RpcmVjdGlvbikqZGlzdGFuY2U7XHJcbiAgICAgICAgbGV0IHl5PXRoaXMubm9kZS55K01hdGguc2luKHRoaXMubW92ZV9kaXJlY3Rpb24pKmRpc3RhbmNlO1xyXG4gICAgICAgIHJldHVybiBjYy52Mih4eCx5eSk7XHJcbiAgICB9XHJcblxyXG4gICAgdXBkYXRlIChkdCkge1xyXG4gICAgICAgIGlmKEdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuY3VyX2dhbWVfc3RhdGUhPUdhbWVTdGF0ZS5HYW1lX1BsYXlpbmcpXHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIGxldCB4eD10aGlzLm1vdmVfc3BlZWQqZHQqTWF0aC5jb3ModGhpcy5tb3ZlX2RpcmVjdGlvbik7XHJcbiAgICAgICAgbGV0IHl5PXRoaXMubW92ZV9zcGVlZCpkdCpNYXRoLnNpbih0aGlzLm1vdmVfZGlyZWN0aW9uKTtcclxuICAgICAgICB0aGlzLm5vZGUueCs9eHg7XHJcbiAgICAgICAgdGhpcy5ub2RlLnkrPXl5O1xyXG4gICAgICAgIGlmKHRoaXMubm9kZS55PmNjLndpblNpemUuaGVpZ2h0KXtcclxuICAgICAgICAgICAgdGhpcy5kZXN0cm95U2VsZigpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZihNYXRoLmFicyh0aGlzLm5vZGUueCk+Y2Mud2luU2l6ZS53aWR0aCl7XHJcbiAgICAgICAgICAgIHRoaXMuZGVzdHJveVNlbGYoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYodGhpcy50dW93ZWlfbm9kZSl7XHJcbiAgICAgICAgICAgIHRoaXMudHVvd2VpX25vZGUuc2V0UG9zaXRpb24odGhpcy5nZXROZXh0UG9zKGR0KSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGRlc3Ryb3lTZWxmKClcclxuICAgIHtcclxuICAgICAgICBHYW1lRWZmZWN0c01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5kZXN0cm95R2FtZUVmZmVjdEJ5SWQodGhpcy5nYW1lX2VmZmVjdF9pZCx0aGlzLm5vZGUpO1xyXG4gICAgfVxyXG5cclxuICAgIHNldERpcmVjdGlvbihkaXI6bnVtYmVyKVxyXG4gICAge1xyXG4gICAgICAgIHRoaXMubW92ZV9kaXJlY3Rpb249ZGlyO1xyXG4gICAgICAgIHRoaXMubm9kZS5hbmdsZT0xODAqZGlyL01hdGguUEktdGhpcy5vZmZzZXRfeHhfYW5nbGU7XHJcbiAgICB9XHJcbiAgICAvKirmt7vliqDln47lopnnorDmkp7nmoTnm5HlkKws5oyH546p5a625Y+s5ZSk55qE5Z+O5aKZICovXHJcbiAgICBhZGRDb2xsaXNpb25XYWxsTGlzdGVuKGNhbGxiYWNrOkZ1bmN0aW9uKXtcclxuICAgICAgICB0aGlzLmNvbGxpc2lvbl90YXJnZXRfY2FsbGJhY2s9Y2FsbGJhY2s7XHJcbiAgICB9XHJcblxyXG4gICAgLy8vLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0t56Kw5pKe5byA5aeLLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gICAgb25Db2xsaXNpb25FbnRlcihvdGhlcjpjYy5Db2xsaWRlcixzZWxmOmNjLkNvbGxpZGVyKSB7XHJcbiAgICAgICAgbGV0IGdtPUdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCk7ICAgICAgICBcclxuICAgICAgICBpZihnbS5jdXJfZ2FtZV9zdGF0ZT09R2FtZVN0YXRlLkdhbWVfTG9zZSB8fCB0aGlzLmlzX2F0dD09dHJ1ZSlcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIGxldCBncm91cD1vdGhlci5ub2RlLmdyb3VwO1xyXG4gICAgICAgIHN3aXRjaChncm91cCl7XHJcbiAgICAgICAgICAgIGNhc2UgJ3dhbGwnOntcclxuICAgICAgICAgICAgICAgIGxldCB3YWxsPW90aGVyLm5vZGUuZ2V0Q29tcG9uZW50KFdhbGwpO1xyXG4gICAgICAgICAgICAgICAgaWYodGhpcy5jb2xsaXNpb25fdGFyZ2V0X2NhbGxiYWNrKXtcclxuICAgICAgICAgICAgICAgICAgICAvL+acieWbnuiwg+WwseWkhOeQhuWbnuiwg1xyXG4gICAgICAgICAgICAgICAgICAgIGlmKHRoaXMuY29sbGlzaW9uX3RhcmdldF9jYWxsYmFjayh3YWxsKSlcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9ICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgbGV0IGFEYXRhPXdhbGwuYmVJbmp1cmVkKHRoaXMubW9uc3Rlcl9hdHRfZGF0YSk7XHJcbiAgICAgICAgICAgICAgICBpZihhRGF0YS5nZXREYW1hZ2VOdW0oKT4wKXtcclxuICAgICAgICAgICAgICAgICAgICBpZih0aGlzLmdhbWVfZWZmZWN0X2lkX2hpdD4wKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGhpdD1HYW1lRWZmZWN0c01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5jcmVhdGVHYW1lRWZmZWN0QnlJZCh0aGlzLmdhbWVfZWZmZWN0X2lkX2hpdCx0aGlzLm5vZGUuZ2V0UG9zaXRpb24oKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBhbmltYXRpb249aGl0LmdldENvbXBvbmVudChjYy5BbmltYXRpb24pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBhbmltYXRpb24ucGxheSgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBhbmltYXRpb24ub24oY2MuQW5pbWF0aW9uLkV2ZW50VHlwZS5GSU5JU0hFRCwoKT0+eyAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhbmltYXRpb24ub2ZmKGNjLkFuaW1hdGlvbi5FdmVudFR5cGUuRklOSVNIRUQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgR2FtZUVmZmVjdHNNYW5hZ2VyLmdldEluc3RhbmNlKCkuZGVzdHJveUdhbWVFZmZlY3RCeUlkKHRoaXMuZ2FtZV9lZmZlY3RfaWRfaGl0LHRoaXMubm9kZSkgICAgICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICB9ICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHRoaXMuZGVzdHJveVNlbGYoKTtcclxuICAgICAgICAgICAgfWJyZWFrO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG4iXX0=