
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Scripts/Boss/BossBullet.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '73af9vjmthLt7HucBhNcVuh', 'BossBullet');
// Scripts/Boss/BossBullet.ts

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
var BossBullet = /** @class */ (function (_super) {
    __extends(BossBullet, _super);
    function BossBullet() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.prefab_tuowei = null;
        _this.acc_num = 0;
        _this.sp_fly = null;
        _this.sp_create = null;
        /**拖尾节点 */
        _this.tuowei_node = null;
        _this.game_effect_id = 0;
        _this.move_speed = 700;
        _this.move_direction = Math.PI / 2;
        _this.offset_xx_angle = 90;
        _this.is_att = true;
        _this.monster_att_data = null;
        _this.cur_acc_num = 0;
        _this.collision_target_callback = null;
        _this.is_can_move = true;
        _this.boss_yy = 0;
        /**碰撞器 */
        _this.collider = null;
        return _this;
    }
    BossBullet.prototype.init = function (monsterAttData, gameEffectId, speed, dir, bossY, angle) {
        if (angle === void 0) { angle = 90; }
        this.monster_att_data = monsterAttData;
        this.game_effect_id = gameEffectId;
        this.move_speed = speed;
        this.offset_xx_angle = angle;
        this.is_att = false;
        this.cur_acc_num = this.acc_num;
        this.boss_yy = bossY;
        this.setDirection(dir);
        if (this.prefab_tuowei) {
            this.tuowei_node = cc.instantiate(this.prefab_tuowei);
            this.tuowei_node.parent = this.node.parent;
            this.node.zIndex = 1;
        }
        if (this.sp_create) {
            this.node.getComponent(cc.Sprite).spriteFrame = this.sp_create;
        }
        this.collider = this.getComponent(cc.Collider);
    };
    BossBullet.prototype.startFly = function () {
        this.is_can_move = true;
        this.node.getComponent(cc.Sprite).spriteFrame = this.sp_fly;
    };
    BossBullet.prototype.update = function (dt) {
        if (GameManager_1.default.getInstance().cur_game_state != Constants_1.GameState.Game_Playing)
            return;
        if (!this.is_can_move) {
            if (this.tuowei_node) {
                this.tuowei_node.opacity = 0;
                this.tuowei_node.active = false;
                var pos = this.node.getPosition();
                this.tuowei_node.setPosition(pos);
            }
            return;
        }
        var prevPos = this.node.getPosition();
        if (this.acc_num > 0) {
            this.cur_acc_num += this.acc_num * dt;
        }
        this.move_speed += this.cur_acc_num;
        if (this.move_speed >= 10000) {
            this.move_speed = 10000;
        }
        var xx = this.move_speed * dt * Math.cos(this.move_direction);
        var yy = this.move_speed * dt * Math.sin(this.move_direction);
        this.node.x += xx;
        this.node.y += yy;
        this.collider.enabled = this.node.y <= this.boss_yy;
        if (this.node.y > cc.winSize.height) {
            this.destroySelf();
        }
        if (Math.abs(this.node.x) > cc.winSize.width) {
            this.destroySelf();
        }
        if (this.tuowei_node) {
            this.tuowei_node.opacity = 255;
            this.tuowei_node.active = true;
            var gr = GameManager_1.default.getInstance().getGameRate();
            if (gr < 1) {
                gr = 1;
            }
            var pos = this.node.getPosition();
            //添加在子弹前面            
            var offsetPos = pos.sub(prevPos);
            var distance = offsetPos.mag() * 2 / gr;
            var dir = Math.atan2(offsetPos.y, offsetPos.x);
            var xx_1 = pos.x + Math.cos(dir) * distance;
            var yy_1 = pos.y + Math.sin(dir) * distance;
            this.tuowei_node.setPosition(cc.v2(xx_1, yy_1));
        }
    };
    BossBullet.prototype.destroySelf = function () {
        if (this.tuowei_node) {
            cc.tween(this.tuowei_node).delay(this.tuowei_node.getComponent(cc.MotionStreak).fadeTime / 5).removeSelf().start();
            this.tuowei_node = null;
        }
        GameEffectsManager_1.GameEffectsManager.getInstance().destroyGameEffectById(this.game_effect_id, this.node);
    };
    BossBullet.prototype.setDirection = function (dir) {
        this.move_direction = dir;
        this.node.angle = 180 * dir / Math.PI - this.offset_xx_angle;
    };
    /**添加城墙碰撞的监听,指玩家召唤的城墙 */
    BossBullet.prototype.addCollisionWallListen = function (callback) {
        this.collision_target_callback = callback;
    };
    ////--------------------------------------碰撞开始----------------------------------------------------
    BossBullet.prototype.onCollisionEnter = function (other, self) {
        var gm = GameManager_1.default.getInstance();
        if (gm.cur_game_state == Constants_1.GameState.Game_Lose || this.is_att == true)
            return;
        var group = other.node.group;
        switch (group) {
            case 'wall':
                {
                    if (this.collision_target_callback) {
                        this.is_att = true;
                        this.collision_target_callback(other.node.getComponent(Wall_1.default));
                    }
                }
                break;
            // case 'wall':{                
            //     this.collisionToWall(other.node.name);
            // }break;
        }
    };
    __decorate([
        property({ type: cc.Prefab })
    ], BossBullet.prototype, "prefab_tuowei", void 0);
    __decorate([
        property()
    ], BossBullet.prototype, "acc_num", void 0);
    __decorate([
        property(cc.SpriteFrame)
    ], BossBullet.prototype, "sp_fly", void 0);
    __decorate([
        property(cc.SpriteFrame)
    ], BossBullet.prototype, "sp_create", void 0);
    BossBullet = __decorate([
        ccclass
    ], BossBullet);
    return BossBullet;
}(cc.Component));
exports.default = BossBullet;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0c1xcQm9zc1xcQm9zc0J1bGxldC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSwwQ0FBZ0Q7QUFDaEQsaUVBQThFO0FBQzlFLDhDQUF5QztBQUV6QyxxQ0FBZ0M7QUFHMUIsSUFBQSxLQUFzQixFQUFFLENBQUMsVUFBVSxFQUFsQyxPQUFPLGFBQUEsRUFBRSxRQUFRLGNBQWlCLENBQUM7QUFHMUM7SUFBd0MsOEJBQVk7SUFBcEQ7UUFBQSxxRUEySUM7UUF4SUcsbUJBQWEsR0FBVyxJQUFJLENBQUM7UUFFN0IsYUFBTyxHQUFRLENBQUMsQ0FBQztRQUVqQixZQUFNLEdBQWdCLElBQUksQ0FBQztRQUUzQixlQUFTLEdBQWdCLElBQUksQ0FBQztRQUM5QixVQUFVO1FBQ1YsaUJBQVcsR0FBUyxJQUFJLENBQUM7UUFFekIsb0JBQWMsR0FBUSxDQUFDLENBQUM7UUFDeEIsZ0JBQVUsR0FBUSxHQUFHLENBQUM7UUFDdEIsb0JBQWMsR0FBUSxJQUFJLENBQUMsRUFBRSxHQUFDLENBQUMsQ0FBQztRQUNoQyxxQkFBZSxHQUFRLEVBQUUsQ0FBQztRQUMxQixZQUFNLEdBQVMsSUFBSSxDQUFDO1FBQ3BCLHNCQUFnQixHQUFnQixJQUFJLENBQUM7UUFDckMsaUJBQVcsR0FBUSxDQUFDLENBQUM7UUFFckIsK0JBQXlCLEdBQVUsSUFBSSxDQUFDO1FBQ3hDLGlCQUFXLEdBQVMsSUFBSSxDQUFDO1FBQ3pCLGFBQU8sR0FBUSxDQUFDLENBQUM7UUFDakIsU0FBUztRQUNULGNBQVEsR0FBYSxJQUFJLENBQUM7O0lBa0g5QixDQUFDO0lBaEhHLHlCQUFJLEdBQUosVUFBSyxjQUE2QixFQUFDLFlBQXlCLEVBQUMsS0FBWSxFQUFDLEdBQVUsRUFBQyxLQUFZLEVBQUMsS0FBZTtRQUFmLHNCQUFBLEVBQUEsVUFBZTtRQUU3RyxJQUFJLENBQUMsZ0JBQWdCLEdBQUMsY0FBYyxDQUFD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O1FBQy9DLElBQUksRUFBRSxHQUFDLHFCQUFXLENBQUMsV0FBVyxFQUFFLENBQUM7UUFDakMsSUFBRyxFQUFFLENBQUMsY0FBYyxJQUFFLHFCQUFTLENBQUMsU0FBUyxJQUFJLElBQUksQ0FBQyxNQUFNLElBQUUsSUFBSTtZQUMxRCxPQUFPO1FBQ1gsSUFBSSxLQUFLLEdBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUM7UUFDM0IsUUFBTyxLQUFLLEVBQUM7WUFDVCxLQUFLLE1BQU07Z0JBQUM7b0JBQ1IsSUFBRyxJQUFJLENBQUMseUJBQXlCLEVBQUM7d0JBQzlCLElBQUksQ0FBQyxNQUFNLEdBQUMsSUFBSSxDQUFDO3dCQUNqQixJQUFJLENBQUMseUJBQXlCLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsY0FBSSxDQUFDLENBQUMsQ0FBQztxQkFDakU7aUJBQ0o7Z0JBQUEsTUFBTTtZQUNQLGdDQUFnQztZQUNoQyw2Q0FBNkM7WUFDN0MsVUFBVTtTQUNiO0lBQ0wsQ0FBQztJQXZJRDtRQURDLFFBQVEsQ0FBQyxFQUFDLElBQUksRUFBQyxFQUFFLENBQUMsTUFBTSxFQUFDLENBQUM7cURBQ0U7SUFFN0I7UUFEQyxRQUFRLEVBQUU7K0NBQ007SUFFakI7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLFdBQVcsQ0FBQzs4Q0FDRTtJQUUzQjtRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsV0FBVyxDQUFDO2lEQUNLO0lBVGIsVUFBVTtRQUQ5QixPQUFPO09BQ2EsVUFBVSxDQTJJOUI7SUFBRCxpQkFBQztDQTNJRCxBQTJJQyxDQTNJdUMsRUFBRSxDQUFDLFNBQVMsR0EySW5EO2tCQTNJb0IsVUFBVSIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEdhbWVTdGF0ZSwgSmlhU3UgfSBmcm9tIFwiLi4vQ29uc3RhbnRzXCI7XHJcbmltcG9ydCB7IEdhbWVFZmZlY3RJZCwgR2FtZUVmZmVjdHNNYW5hZ2VyIH0gZnJvbSBcIi4uL0dhbWUvR2FtZUVmZmVjdHNNYW5hZ2VyXCI7XHJcbmltcG9ydCBHYW1lTWFuYWdlciBmcm9tIFwiLi4vR2FtZU1hbmFnZXJcIjtcclxuaW1wb3J0IHsgTW9uc3RlckF0dERhdGEgfSBmcm9tIFwiLi4vTW9uc3Rlci9Nb25zdGVyRGF0YVwiO1xyXG5pbXBvcnQgV2FsbCBmcm9tIFwiLi4vV2FsbC9XYWxsXCI7XHJcblxyXG5cclxuY29uc3Qge2NjY2xhc3MsIHByb3BlcnR5fSA9IGNjLl9kZWNvcmF0b3I7XHJcblxyXG5AY2NjbGFzc1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBCb3NzQnVsbGV0IGV4dGVuZHMgY2MuQ29tcG9uZW50IHtcclxuXHJcbiAgICBAcHJvcGVydHkoe3R5cGU6Y2MuUHJlZmFifSlcclxuICAgIHByZWZhYl90dW93ZWk6Y2MuUHJlZmFiPW51bGw7XHJcbiAgICBAcHJvcGVydHkoKVxyXG4gICAgYWNjX251bTpudW1iZXI9MDtcclxuICAgIEBwcm9wZXJ0eShjYy5TcHJpdGVGcmFtZSlcclxuICAgIHNwX2ZseTpjYy5TcHJpdGVGcmFtZT1udWxsO1xyXG4gICAgQHByb3BlcnR5KGNjLlNwcml0ZUZyYW1lKVxyXG4gICAgc3BfY3JlYXRlOmNjLlNwcml0ZUZyYW1lPW51bGw7XHJcbiAgICAvKirmi5blsL7oioLngrkgKi9cclxuICAgIHR1b3dlaV9ub2RlOmNjLk5vZGU9bnVsbDtcclxuXHJcbiAgICBnYW1lX2VmZmVjdF9pZDpudW1iZXI9MDtcclxuICAgIG1vdmVfc3BlZWQ6bnVtYmVyPTcwMDtcclxuICAgIG1vdmVfZGlyZWN0aW9uOm51bWJlcj1NYXRoLlBJLzI7XHJcbiAgICBvZmZzZXRfeHhfYW5nbGU6bnVtYmVyPTkwO1xyXG4gICAgaXNfYXR0OmJvb2xlYW49dHJ1ZTtcclxuICAgIG1vbnN0ZXJfYXR0X2RhdGE6TW9uc3RlckF0dERhdGE9bnVsbDtcclxuICAgIGN1cl9hY2NfbnVtOm51bWJlcj0wO1xyXG5cclxuICAgIGNvbGxpc2lvbl90YXJnZXRfY2FsbGJhY2s6RnVuY3Rpb249bnVsbDtcclxuICAgIGlzX2Nhbl9tb3ZlOmJvb2xlYW49dHJ1ZTtcclxuICAgIGJvc3NfeXk6bnVtYmVyPTA7XHJcbiAgICAvKirnorDmkp7lmaggKi9cclxuICAgIGNvbGxpZGVyOmNjLkNvbGxpZGVyPW51bGw7XHJcblxyXG4gICAgaW5pdChtb25zdGVyQXR0RGF0YTpNb25zdGVyQXR0RGF0YSxnYW1lRWZmZWN0SWQ6R2FtZUVmZmVjdElkLHNwZWVkOm51bWJlcixkaXI6bnVtYmVyLGJvc3NZOm51bWJlcixhbmdsZTpudW1iZXI9OTApXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy5tb25zdGVyX2F0dF9kYXRhPW1vbnN0ZXJBdHREYXRhO1xyXG4gICAgICAgIHRoaXMuZ2FtZV9lZmZlY3RfaWQ9Z2FtZUVmZmVjdElkO1xyXG4gICAgICAgIHRoaXMubW92ZV9zcGVlZD1zcGVlZDtcclxuICAgICAgICB0aGlzLm9mZnNldF94eF9hbmdsZT1hbmdsZTtcclxuICAgICAgICB0aGlzLmlzX2F0dD1mYWxzZTtcclxuICAgICAgICB0aGlzLmN1cl9hY2NfbnVtPXRoaXMuYWNjX251bTtcclxuICAgICAgICB0aGlzLmJvc3NfeXk9Ym9zc1k7XHJcbiAgICAgICAgdGhpcy5zZXREaXJlY3Rpb24oZGlyKTtcclxuICAgICAgICBpZih0aGlzLnByZWZhYl90dW93ZWkpe1xyXG4gICAgICAgICAgICB0aGlzLnR1b3dlaV9ub2RlPWNjLmluc3RhbnRpYXRlKHRoaXMucHJlZmFiX3R1b3dlaSk7XHJcbiAgICAgICAgICAgIHRoaXMudHVvd2VpX25vZGUucGFyZW50PXRoaXMubm9kZS5wYXJlbnQ7XHJcbiAgICAgICAgICAgIHRoaXMubm9kZS56SW5kZXg9MTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYodGhpcy5zcF9jcmVhdGUpe1xyXG4gICAgICAgICAgICB0aGlzLm5vZGUuZ2V0Q29tcG9uZW50KGNjLlNwcml0ZSkuc3ByaXRlRnJhbWU9dGhpcy5zcF9jcmVhdGU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuY29sbGlkZXI9dGhpcy5nZXRDb21wb25lbnQoY2MuQ29sbGlkZXIpO1xyXG4gICAgfVxyXG5cclxuICAgIHN0YXJ0Rmx5KCl7XHJcbiAgICAgICAgdGhpcy5pc19jYW5fbW92ZT10cnVlO1xyXG4gICAgICAgIHRoaXMubm9kZS5nZXRDb21wb25lbnQoY2MuU3ByaXRlKS5zcHJpdGVGcmFtZT10aGlzLnNwX2ZseTtcclxuICAgIH1cclxuXHJcbiAgICB1cGRhdGUgKGR0KSB7XHJcbiAgICAgICAgaWYoR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5jdXJfZ2FtZV9zdGF0ZSE9R2FtZVN0YXRlLkdhbWVfUGxheWluZylcclxuICAgICAgICByZXR1cm47XHJcbiAgICAgICAgaWYoIXRoaXMuaXNfY2FuX21vdmUpe1xyXG4gICAgICAgICAgICBpZih0aGlzLnR1b3dlaV9ub2RlKXtcclxuICAgICAgICAgICAgICAgIHRoaXMudHVvd2VpX25vZGUub3BhY2l0eT0wO1xyXG4gICAgICAgICAgICAgICAgdGhpcy50dW93ZWlfbm9kZS5hY3RpdmU9ZmFsc2U7XHJcbiAgICAgICAgICAgICAgICBsZXQgcG9zPXRoaXMubm9kZS5nZXRQb3NpdGlvbigpOyAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIHRoaXMudHVvd2VpX25vZGUuc2V0UG9zaXRpb24ocG9zKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGxldCBwcmV2UG9zPXRoaXMubm9kZS5nZXRQb3NpdGlvbigpO1xyXG4gICAgICAgIGlmKHRoaXMuYWNjX251bT4wKXsgICAgICAgICAgICBcclxuICAgICAgICAgICAgdGhpcy5jdXJfYWNjX251bSs9dGhpcy5hY2NfbnVtKmR0OyAgICAgICAgICAgIFxyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLm1vdmVfc3BlZWQrPXRoaXMuY3VyX2FjY19udW07XHJcbiAgICAgICAgaWYodGhpcy5tb3ZlX3NwZWVkPj0xMDAwMCl7XHJcbiAgICAgICAgICAgIHRoaXMubW92ZV9zcGVlZD0xMDAwMDtcclxuICAgICAgICB9XHJcbiAgICAgICAgbGV0IHh4PXRoaXMubW92ZV9zcGVlZCpkdCpNYXRoLmNvcyh0aGlzLm1vdmVfZGlyZWN0aW9uKTtcclxuICAgICAgICBsZXQgeXk9dGhpcy5tb3ZlX3NwZWVkKmR0Kk1hdGguc2luKHRoaXMubW92ZV9kaXJlY3Rpb24pO1xyXG4gICAgICAgIHRoaXMubm9kZS54Kz14eDtcclxuICAgICAgICB0aGlzLm5vZGUueSs9eXk7XHJcbiAgICAgICAgdGhpcy5jb2xsaWRlci5lbmFibGVkPXRoaXMubm9kZS55PD10aGlzLmJvc3NfeXk7XHJcbiAgICAgICAgaWYodGhpcy5ub2RlLnk+Y2Mud2luU2l6ZS5oZWlnaHQpe1xyXG4gICAgICAgICAgICB0aGlzLmRlc3Ryb3lTZWxmKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmKE1hdGguYWJzKHRoaXMubm9kZS54KT5jYy53aW5TaXplLndpZHRoKXtcclxuICAgICAgICAgICAgdGhpcy5kZXN0cm95U2VsZigpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZih0aGlzLnR1b3dlaV9ub2RlKXtcclxuICAgICAgICAgICAgdGhpcy50dW93ZWlfbm9kZS5vcGFjaXR5PTI1NTtcclxuICAgICAgICAgICAgdGhpcy50dW93ZWlfbm9kZS5hY3RpdmU9dHJ1ZTtcclxuICAgICAgICAgICAgbGV0IGdyPUdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0R2FtZVJhdGUoKTtcclxuICAgICAgICAgICAgaWYoZ3I8MSl7XHJcbiAgICAgICAgICAgICAgICBncj0xO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGxldCBwb3M9dGhpcy5ub2RlLmdldFBvc2l0aW9uKCk7XHJcbiAgICAgICAgICAgIC8v5re75Yqg5Zyo5a2Q5by55YmN6Z2iICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIGxldCBvZmZzZXRQb3M9cG9zLnN1YihwcmV2UG9zKTtcclxuICAgICAgICAgICAgbGV0IGRpc3RhbmNlPW9mZnNldFBvcy5tYWcoKSoyL2dyO1xyXG4gICAgICAgICAgICBsZXQgZGlyPU1hdGguYXRhbjIob2Zmc2V0UG9zLnksb2Zmc2V0UG9zLngpO1xyXG4gICAgICAgICAgICBsZXQgeHg9cG9zLngrTWF0aC5jb3MoZGlyKSpkaXN0YW5jZTtcclxuICAgICAgICAgICAgbGV0IHl5PXBvcy55K01hdGguc2luKGRpcikqZGlzdGFuY2U7XHJcbiAgICAgICAgICAgIHRoaXMudHVvd2VpX25vZGUuc2V0UG9zaXRpb24oY2MudjIoeHgseXkpKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgZGVzdHJveVNlbGYoKVxyXG4gICAge1xyXG4gICAgICAgIGlmKHRoaXMudHVvd2VpX25vZGUpe1xyXG4gICAgICAgICAgICBjYy50d2Vlbih0aGlzLnR1b3dlaV9ub2RlKS5kZWxheSh0aGlzLnR1b3dlaV9ub2RlLmdldENvbXBvbmVudChjYy5Nb3Rpb25TdHJlYWspLmZhZGVUaW1lLzUpLnJlbW92ZVNlbGYoKS5zdGFydCgpO1xyXG4gICAgICAgICAgICB0aGlzLnR1b3dlaV9ub2RlPW51bGw7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIEdhbWVFZmZlY3RzTWFuYWdlci5nZXRJbnN0YW5jZSgpLmRlc3Ryb3lHYW1lRWZmZWN0QnlJZCh0aGlzLmdhbWVfZWZmZWN0X2lkLHRoaXMubm9kZSk7XHJcbiAgICB9XHJcblxyXG4gICAgc2V0RGlyZWN0aW9uKGRpcjpudW1iZXIpXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy5tb3ZlX2RpcmVjdGlvbj1kaXI7XHJcbiAgICAgICAgdGhpcy5ub2RlLmFuZ2xlPTE4MCpkaXIvTWF0aC5QSS10aGlzLm9mZnNldF94eF9hbmdsZTtcclxuICAgIH1cclxuICAgIC8qKua3u+WKoOWfjuWimeeisOaSnueahOebkeWQrCzmjIfnjqnlrrblj6zllKTnmoTln47lopkgKi9cclxuICAgIGFkZENvbGxpc2lvbldhbGxMaXN0ZW4oY2FsbGJhY2s6RnVuY3Rpb24pe1xyXG4gICAgICAgIHRoaXMuY29sbGlzaW9uX3RhcmdldF9jYWxsYmFjaz1jYWxsYmFjaztcclxuICAgIH1cclxuXHJcbiAgICAvLy8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS3norDmkp7lvIDlp4stLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgICBvbkNvbGxpc2lvbkVudGVyKG90aGVyOmNjLkNvbGxpZGVyLHNlbGY6Y2MuQ29sbGlkZXIpIHtcclxuICAgICAgICBsZXQgZ209R2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKTsgICAgICAgIFxyXG4gICAgICAgIGlmKGdtLmN1cl9nYW1lX3N0YXRlPT1HYW1lU3RhdGUuR2FtZV9Mb3NlIHx8IHRoaXMuaXNfYXR0PT10cnVlKVxyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgbGV0IGdyb3VwPW90aGVyLm5vZGUuZ3JvdXA7XHJcbiAgICAgICAgc3dpdGNoKGdyb3VwKXtcclxuICAgICAgICAgICAgY2FzZSAnd2FsbCc6e1xyXG4gICAgICAgICAgICAgICAgaWYodGhpcy5jb2xsaXNpb25fdGFyZ2V0X2NhbGxiYWNrKXsgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaXNfYXR0PXRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jb2xsaXNpb25fdGFyZ2V0X2NhbGxiYWNrKG90aGVyLm5vZGUuZ2V0Q29tcG9uZW50KFdhbGwpKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfWJyZWFrO1xyXG4gICAgICAgICAgICAvLyBjYXNlICd3YWxsJzp7ICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAvLyAgICAgdGhpcy5jb2xsaXNpb25Ub1dhbGwob3RoZXIubm9kZS5uYW1lKTtcclxuICAgICAgICAgICAgLy8gfWJyZWFrO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG4iXX0=