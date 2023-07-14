
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Scripts/Boss/Boss10/BossSkill10.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'a0adf4R0RpP9pXNjjKy1jUL', 'BossSkill10');
// Scripts/Boss/Boss10/BossSkill10.ts

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
var GameEffectsManager_1 = require("../../Game/GameEffectsManager");
var GameManager_1 = require("../../GameManager");
var Wall_1 = require("../../Wall/Wall");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var BossSkill10 = /** @class */ (function (_super) {
    __extends(BossSkill10, _super);
    function BossSkill10() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.acc_num = 0;
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
    BossSkill10.prototype.init = function (monsterAttData, gameEffectId, speed, dir, bossY, angle) {
        if (angle === void 0) { angle = 90; }
        this.monster_att_data = monsterAttData;
        this.game_effect_id = gameEffectId;
        this.move_speed = speed;
        this.offset_xx_angle = angle;
        this.is_att = false;
        this.cur_acc_num = this.acc_num;
        this.boss_yy = bossY;
        this.setDirection(dir);
        this.node.getComponent(cc.Animation).play("e51010");
        this.collider = this.getComponent(cc.Collider);
    };
    BossSkill10.prototype.startFly = function () {
        this.is_can_move = true;
        this.node.getComponent(cc.Animation).play("e51011");
    };
    BossSkill10.prototype.update = function (dt) {
        if (GameManager_1.default.getInstance().cur_game_state != Constants_1.GameState.Game_Playing)
            return;
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
    };
    BossSkill10.prototype.destroySelf = function () {
        GameEffectsManager_1.GameEffectsManager.getInstance().destroyGameEffectById(this.game_effect_id, this.node);
    };
    BossSkill10.prototype.setDirection = function (dir) {
        this.move_direction = dir;
        this.node.angle = 180 * dir / Math.PI - this.offset_xx_angle;
    };
    /**添加城墙碰撞的监听,指玩家召唤的城墙 */
    BossSkill10.prototype.addCollisionWallListen = function (callback) {
        this.collision_target_callback = callback;
    };
    ////--------------------------------------碰撞开始----------------------------------------------------
    BossSkill10.prototype.onCollisionEnter = function (other, self) {
        var gm = GameManager_1.default.getInstance();
        if (gm.cur_game_state == Constants_1.GameState.Game_Lose || this.is_att == true)
            return;
        var group = other.node.group;
        switch (group) {
            case 'wall':
                {
                    var wall = other.node.getComponent(Wall_1.default);
                    if (wall) {
                        this.monster_att_data.is_big = false;
                        var data = wall.beInjured(this.monster_att_data);
                        this.destroySelf();
                        if (data.getDamageNum() > 0) {
                            GameEffectsManager_1.GameEffectsManager.getInstance().createGameEffectById(GameEffectsManager_1.GameEffectId.boss10_skill2_hit, this.node.getPosition());
                        }
                    }
                }
                break;
            // case 'wall':{                
            //     this.collisionToWall(other.node.name);
            // }break;
        }
    };
    ////--------------------------------------碰撞开始----------------------------------------------------
    BossSkill10.prototype.onCollisionWall = function (wall) {
    };
    __decorate([
        property()
    ], BossSkill10.prototype, "acc_num", void 0);
    BossSkill10 = __decorate([
        ccclass
    ], BossSkill10);
    return BossSkill10;
}(cc.Component));
exports.default = BossSkill10;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0c1xcQm9zc1xcQm9zczEwXFxCb3NzU2tpbGwxMC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSw2Q0FBNEM7QUFDNUMsb0VBQWlGO0FBQ2pGLGlEQUE0QztBQUk1Qyx3Q0FBbUM7QUFJN0IsSUFBQSxLQUFzQixFQUFFLENBQUMsVUFBVSxFQUFsQyxPQUFPLGFBQUEsRUFBRSxRQUFRLGNBQWlCLENBQUM7QUFHMUM7SUFBeUMsK0JBQVk7SUFBckQ7UUFBQSxxRUEwR0M7UUF2R0csYUFBTyxHQUFRLENBQUMsQ0FBQztRQUVqQixvQkFBYyxHQUFRLENBQUMsQ0FBQztRQUN4QixnQkFBVSxHQUFRLEdBQUcsQ0FBQztRQUN0QixvQkFBYyxHQUFRLElBQUksQ0FBQyxFQUFFLEdBQUMsQ0FBQyxDQUFDO1FBQ2hDLHFCQUFlLEdBQVEsRUFBRSxDQUFDO1FBQzFCLFlBQU0sR0FBUyxJQUFJLENBQUM7UUFDcEIsc0JBQWdCLEdBQWdCLElBQUksQ0FBQztRQUNyQyxpQkFBVyxHQUFRLENBQUMsQ0FBQztRQUVyQiwrQkFBeUIsR0FBVSxJQUFJLENBQUM7UUFDeEMsaUJBQVcsR0FBUyxJQUFJLENBQUM7UUFDekIsYUFBTyxHQUFRLENBQUMsQ0FBQztRQUNqQixTQUFTO1FBQ1QsY0FBUSxHQUFhLElBQUksQ0FBQzs7SUF5RjlCLENBQUM7SUF2RkcsMEJBQUksR0FBSixVQUFLLGNBQTZCLEVBQUMsWUFBeUIsRUFBQyxLQUFZLEVBQUMsR0FBVSxFQUFDLEtBQVksRUFBQyxLQUFlO1FBQWYsc0JBQUEsRUFBQSxVQUFlO1FBRTdHLElBQUksQ0FBQyxnQkFBZ0IsR0FBQyxjQUFjLENBQUM7UUFDckMsSUFBSSxDQUFDLGNBQWMsR0FBQyxZQUFZLENBQUM7UUFDakMsSUFBSSxDQUFDLFVBQVUsR0FBQyxLQUFLLENBQUM7UUFDdEIsSUFBSSxDQUFDLGVBQWUsR0FBQyxLQUFLLENBQUM7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RC9CLE9BQU87T0FDYSxXQUFXLENBMEcvQjtJQUFELGtCQUFDO0NBMUdELEFBMEdDLENBMUd3QyxFQUFFLENBQUMsU0FBUyxHQTBHcEQ7a0JBMUdvQixXQUFXIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgR2FtZVN0YXRlIH0gZnJvbSBcIi4uLy4uL0NvbnN0YW50c1wiO1xyXG5pbXBvcnQgeyBHYW1lRWZmZWN0SWQsIEdhbWVFZmZlY3RzTWFuYWdlciB9IGZyb20gXCIuLi8uLi9HYW1lL0dhbWVFZmZlY3RzTWFuYWdlclwiO1xyXG5pbXBvcnQgR2FtZU1hbmFnZXIgZnJvbSBcIi4uLy4uL0dhbWVNYW5hZ2VyXCI7XHJcbmltcG9ydCB7IEJ1ZmZEYXRhIH0gZnJvbSBcIi4uLy4uL0hlcm8vR2FtZS9CdWZmRGF0YVwiO1xyXG5pbXBvcnQgeyBCdWZmSWQsIEJ1ZmZUeXBlLCBIZXJvX1R5cGUgfSBmcm9tIFwiLi4vLi4vSGVyby9HYW1lL0hlcm9Db25maWdcIjtcclxuaW1wb3J0IHsgTW9uc3RlckF0dERhdGEgfSBmcm9tIFwiLi4vLi4vTW9uc3Rlci9Nb25zdGVyRGF0YVwiO1xyXG5pbXBvcnQgV2FsbCBmcm9tIFwiLi4vLi4vV2FsbC9XYWxsXCI7XHJcbmltcG9ydCB7IFdhbGxUeXBlIH0gZnJvbSBcIi4uLy4uL1dhbGwvV2FsbENvbmZpZ1wiO1xyXG5pbXBvcnQgQm9zc0J1bGxldCBmcm9tIFwiLi4vQm9zc0J1bGxldFwiO1xyXG5cclxuY29uc3Qge2NjY2xhc3MsIHByb3BlcnR5fSA9IGNjLl9kZWNvcmF0b3I7XHJcblxyXG5AY2NjbGFzc1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBCb3NzU2tpbGwxMCBleHRlbmRzIGNjLkNvbXBvbmVudCB7XHJcblxyXG4gICAgQHByb3BlcnR5KClcclxuICAgIGFjY19udW06bnVtYmVyPTA7XHJcblxyXG4gICAgZ2FtZV9lZmZlY3RfaWQ6bnVtYmVyPTA7XHJcbiAgICBtb3ZlX3NwZWVkOm51bWJlcj03MDA7XHJcbiAgICBtb3ZlX2RpcmVjdGlvbjpudW1iZXI9TWF0aC5QSS8yO1xyXG4gICAgb2Zmc2V0X3h4X2FuZ2xlOm51bWJlcj05MDtcclxuICAgIGlzX2F0dDpib29sZWFuPXRydWU7XHJcbiAgICBtb25zdGVyX2F0dF9kYXRhOk1vbnN0ZXJBdHREYXRhPW51bGw7XHJcbiAgICBjdXJfYWNjX251bTpudW1iZXI9MDtcclxuXHJcbiAgICBjb2xsaXNpb25fdGFyZ2V0X2NhbGxiYWNrOkZ1bmN0aW9uPW51bGw7XHJcbiAgICBpc19jYW5fbW92ZTpib29sZWFuPXRydWU7XHJcbiAgICBib3NzX3l5Om51bWJlcj0wO1xyXG4gICAgLyoq56Kw5pKe5ZmoICovXHJcbiAgICBjb2xsaWRlcjpjYy5Db2xsaWRlcj1udWxsO1xyXG5cclxuICAgIGluaXQobW9uc3RlckF0dERhdGE6TW9uc3RlckF0dERhdGEsZ2FtZUVmZmVjdElkOkdhbWVFZmZlY3RJZCxzcGVlZDpudW1iZXIsZGlyOm51bWJlcixib3NzWTpudW1iZXIsYW5nbGU6bnVtYmVyPTkwKVxyXG4gICAge1xyXG4gICAgICAgIHRoaXMubW9uc3Rlcl9hdHRfZGF0YT1tb25zdGVyQXR0RGF0YTtcclxuICAgICAgICB0aGlzLmdhbWVfZWZmZWN0X2lkPWdhbWVFZmZlY3RJZDtcclxuICAgICAgICB0aGlzLm1vdmVfc3BlZWQ9c3BlZWQ7XHJcbiAgICAgICAgdGhpcy5vZmZzZXRfeHhfYW5nbGU9YW5nbGU7XHJcbiAgICAgICAgdGhpcy5pc19hdHQ9ZmFsc2U7XHJcbiAgICAgICAgdGhpcy5jdXJfYWNjX251bT10aGlzLmFjY19udW07XHJcbiAgICAgICAgdGhpcy5ib3NzX3l5PWJvc3NZO1xyXG4gICAgICAgIHRoaXMuc2V0RGlyZWN0aW9uKGRpcik7XHJcbiAgICAgICAgdGhpcy5ub2RlLmdldENvbXBvbmVudChjYy5BbmltYXRpb24pLnBsYXkoXCJlNTEwMTBcIik7XHJcbiAgICAgICAgdGhpcy5jb2xsaWRlcj10aGlzLmdldENvbXBvbmVudChjYy5Db2xsaWRlcik7XHJcbiAgICB9XHJcblxyXG4gICAgc3RhcnRGbHkoKXtcclxuICAgICAgICB0aGlzLmlzX2Nhbl9tb3ZlPXRydWU7XHJcbiAgICAgICAgdGhpcy5ub2RlLmdldENvbXBvbmVudChjYy5BbmltYXRpb24pLnBsYXkoXCJlNTEwMTFcIik7XHJcbiAgICB9XHJcblxyXG4gICAgdXBkYXRlIChkdCkge1xyXG4gICAgICAgIGlmKEdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuY3VyX2dhbWVfc3RhdGUhPUdhbWVTdGF0ZS5HYW1lX1BsYXlpbmcpXHJcbiAgICAgICAgcmV0dXJuOyAgICAgICAgXHJcbiAgICAgICAgbGV0IHByZXZQb3M9dGhpcy5ub2RlLmdldFBvc2l0aW9uKCk7XHJcbiAgICAgICAgaWYodGhpcy5hY2NfbnVtPjApeyAgICAgICAgICAgIFxyXG4gICAgICAgICAgICB0aGlzLmN1cl9hY2NfbnVtKz10aGlzLmFjY19udW0qZHQ7ICAgICAgICAgICAgXHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMubW92ZV9zcGVlZCs9dGhpcy5jdXJfYWNjX251bTtcclxuICAgICAgICBpZih0aGlzLm1vdmVfc3BlZWQ+PTEwMDAwKXtcclxuICAgICAgICAgICAgdGhpcy5tb3ZlX3NwZWVkPTEwMDAwO1xyXG4gICAgICAgIH1cclxuICAgICAgICBsZXQgeHg9dGhpcy5tb3ZlX3NwZWVkKmR0Kk1hdGguY29zKHRoaXMubW92ZV9kaXJlY3Rpb24pO1xyXG4gICAgICAgIGxldCB5eT10aGlzLm1vdmVfc3BlZWQqZHQqTWF0aC5zaW4odGhpcy5tb3ZlX2RpcmVjdGlvbik7XHJcbiAgICAgICAgdGhpcy5ub2RlLngrPXh4O1xyXG4gICAgICAgIHRoaXMubm9kZS55Kz15eTtcclxuICAgICAgICB0aGlzLmNvbGxpZGVyLmVuYWJsZWQ9dGhpcy5ub2RlLnk8PXRoaXMuYm9zc195eTtcclxuICAgICAgICBpZih0aGlzLm5vZGUueT5jYy53aW5TaXplLmhlaWdodCl7XHJcbiAgICAgICAgICAgIHRoaXMuZGVzdHJveVNlbGYoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYoTWF0aC5hYnModGhpcy5ub2RlLngpPmNjLndpblNpemUud2lkdGgpe1xyXG4gICAgICAgICAgICB0aGlzLmRlc3Ryb3lTZWxmKCk7XHJcbiAgICAgICAgfSAgICAgICAgXHJcbiAgICB9XHJcblxyXG4gICAgZGVzdHJveVNlbGYoKVxyXG4gICAge1xyXG4gICAgICAgIEdhbWVFZmZlY3RzTWFuYWdlci5nZXRJbnN0YW5jZSgpLmRlc3Ryb3lHYW1lRWZmZWN0QnlJZCh0aGlzLmdhbWVfZWZmZWN0X2lkLHRoaXMubm9kZSk7XHJcbiAgICB9XHJcblxyXG4gICAgc2V0RGlyZWN0aW9uKGRpcjpudW1iZXIpXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy5tb3ZlX2RpcmVjdGlvbj1kaXI7XHJcbiAgICAgICAgdGhpcy5ub2RlLmFuZ2xlPTE4MCpkaXIvTWF0aC5QSS10aGlzLm9mZnNldF94eF9hbmdsZTtcclxuICAgIH1cclxuICAgIC8qKua3u+WKoOWfjuWimeeisOaSnueahOebkeWQrCzmjIfnjqnlrrblj6zllKTnmoTln47lopkgKi9cclxuICAgIGFkZENvbGxpc2lvbldhbGxMaXN0ZW4oY2FsbGJhY2s6RnVuY3Rpb24pe1xyXG4gICAgICAgIHRoaXMuY29sbGlzaW9uX3RhcmdldF9jYWxsYmFjaz1jYWxsYmFjaztcclxuICAgIH1cclxuXHJcbiAgICAvLy8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS3norDmkp7lvIDlp4stLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgICBvbkNvbGxpc2lvbkVudGVyKG90aGVyOmNjLkNvbGxpZGVyLHNlbGY6Y2MuQ29sbGlkZXIpIHtcclxuICAgICAgICBsZXQgZ209R2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKTsgICAgICAgIFxyXG4gICAgICAgIGlmKGdtLmN1cl9nYW1lX3N0YXRlPT1HYW1lU3RhdGUuR2FtZV9Mb3NlIHx8IHRoaXMuaXNfYXR0PT10cnVlKVxyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgbGV0IGdyb3VwPW90aGVyLm5vZGUuZ3JvdXA7XHJcbiAgICAgICAgc3dpdGNoKGdyb3VwKXtcclxuICAgICAgICAgICAgY2FzZSAnd2FsbCc6e1xyXG4gICAgICAgICAgICAgICAgbGV0IHdhbGw9b3RoZXIubm9kZS5nZXRDb21wb25lbnQoV2FsbCk7XHJcbiAgICAgICAgICAgICAgICBpZih3YWxsKXtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLm1vbnN0ZXJfYXR0X2RhdGEuaXNfYmlnPWZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBkYXRhPXdhbGwuYmVJbmp1cmVkKHRoaXMubW9uc3Rlcl9hdHRfZGF0YSlcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmRlc3Ryb3lTZWxmKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYoZGF0YS5nZXREYW1hZ2VOdW0oKT4wKXsgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIEdhbWVFZmZlY3RzTWFuYWdlci5nZXRJbnN0YW5jZSgpLmNyZWF0ZUdhbWVFZmZlY3RCeUlkKEdhbWVFZmZlY3RJZC5ib3NzMTBfc2tpbGwyX2hpdCx0aGlzLm5vZGUuZ2V0UG9zaXRpb24oKSk7ICAgICAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9YnJlYWs7XHJcbiAgICAgICAgICAgIC8vIGNhc2UgJ3dhbGwnOnsgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIC8vICAgICB0aGlzLmNvbGxpc2lvblRvV2FsbChvdGhlci5ub2RlLm5hbWUpO1xyXG4gICAgICAgICAgICAvLyB9YnJlYWs7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8vLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLeeisOaSnuW8gOWniy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICAgIG9uQ29sbGlzaW9uV2FsbCh3YWxsOldhbGwpIHtcclxuICAgICAgICBcclxuICAgIH1cclxufVxyXG4iXX0=