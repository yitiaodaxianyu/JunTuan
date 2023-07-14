
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Scripts/Game/Move.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'b3adbJiS9pHy5FZRhio8heL', 'Move');
// Scripts/Game/Move.ts

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
var GameManager_1 = require("../GameManager");
var GameEffectsManager_1 = require("./GameEffectsManager");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var Move = /** @class */ (function (_super) {
    __extends(Move, _super);
    function Move() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.move_speed = 320;
        _this.move_direction = Math.PI * 3 / 2;
        //移动的目标地点
        _this.move_target_pos = null;
        /**移动到目标地点后的回调 */
        _this.move_end_callback = null;
        /**移动到城墙位置后的回调 */
        _this.move_wall_callback = null;
        _this.prefab_tuowei = null;
        /**拖尾节点 */
        _this.tuowei_node = null;
        _this.game_effect_id = GameEffectsManager_1.GameEffectId.Null;
        return _this;
    }
    Move.prototype.onLoad = function () {
    };
    Move.prototype.init = function (speed, dir, id) {
        this.game_effect_id = id;
        this.move_speed = speed;
        this.update(0.015);
        if (this.prefab_tuowei) {
            this.tuowei_node = cc.instantiate(this.prefab_tuowei);
            this.tuowei_node.parent = this.node.parent;
            this.node.zIndex = 1;
        }
    };
    Move.prototype.changeDir = function (dir) {
        this.move_direction = (dir + Math.PI * 2) % (Math.PI * 2);
    };
    /**设置移动的目标位置，以及到达目标后需要做的事情 */
    Move.prototype.setTargetPos = function (pos, endCallback, wallCallback) {
        this.move_target_pos = pos;
        this.move_end_callback = endCallback;
        this.move_wall_callback = wallCallback;
        this.update(0.015);
    };
    Move.prototype.update = function (dt) {
        if (GameManager_1.default.getInstance().cur_game_state != Constants_1.GameState.Game_Playing)
            return;
        var prevPos = this.node.getPosition();
        var disX = this.node.x;
        var disY = this.node.y;
        if (this.move_target_pos) {
            var speed = this.move_speed * dt;
            var offsetPos = this.move_target_pos.sub(this.node.getPosition());
            if (offsetPos.mag() < speed) {
                if (this.move_end_callback) {
                    this.destroySelf();
                    this.move_end_callback();
                    this.move_end_callback = null;
                }
            }
            else {
                var pi2 = Math.PI * 2;
                this.move_direction = (Math.atan2(offsetPos.y, offsetPos.x) + pi2) % pi2;
                disX += speed * Math.cos(this.move_direction);
                disY += speed * Math.sin(this.move_direction);
            }
        }
        this.setDirection(this.move_direction);
        this.node.x = disX;
        this.node.y = disY;
        if (this.move_wall_callback && disY <= GameManager_1.default.getInstance().enemy_att_y) {
            this.destroySelf();
            this.move_wall_callback();
            this.move_wall_callback = null;
        }
        if (this.tuowei_node) {
            var pos = this.node.getPosition();
            //添加在子弹前面
            var offsetPos = pos.sub(prevPos);
            var distance = offsetPos.mag() * 4;
            var dir = Math.atan2(offsetPos.y, offsetPos.x);
            var xx = pos.x + Math.cos(dir) * distance;
            var yy = pos.y + Math.sin(dir) * distance;
            this.tuowei_node.setPosition(cc.v2(xx, yy));
        }
    };
    Move.prototype.destroySelf = function () {
        GameEffectsManager_1.GameEffectsManager.getInstance().destroyGameEffectById(this.game_effect_id, this.node);
        if (this.tuowei_node) {
            var dt = this.tuowei_node.getComponent(cc.MotionStreak).fadeTime;
            cc.tween(this.tuowei_node).delay(dt / 10).removeSelf().start();
            this.tuowei_node = null;
        }
    };
    Move.prototype.setDirection = function (dir) {
        this.move_direction = dir;
        this.node.angle = 180 * dir / Math.PI + 90;
    };
    __decorate([
        property({ type: cc.Prefab })
    ], Move.prototype, "prefab_tuowei", void 0);
    Move = __decorate([
        ccclass
    ], Move);
    return Move;
}(cc.Component));
exports.default = Move;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0c1xcR2FtZVxcTW92ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSwwQ0FBeUM7QUFDekMsOENBQXlDO0FBQ3pDLDJEQUF3RTtBQUdsRSxJQUFBLEtBQXNCLEVBQUUsQ0FBQyxVQUFVLEVBQWxDLE9BQU8sYUFBQSxFQUFFLFFBQVEsY0FBaUIsQ0FBQztBQUcxQztJQUFrQyx3QkFBWTtJQUE5QztRQUFBLHFFQTZHQztRQTNHRyxnQkFBVSxHQUFRLEdBQUcsQ0FBQztRQUN0QixvQkFBYyxHQUFRLElBQUksQ0FBQyxFQUFFLEdBQUMsQ0FBQyxHQUFDLENBQUMsQ0FBQztRQUVsQyxTQUFTO1FBQ0QscUJBQWUsR0FBUyxJQUFJLENBQUM7UUFDckMsaUJBQWlCO1FBQ1QsdUJBQWlCLEdBQVUsSUFBSSxDQUFDO1FBQ3hDLGlCQUFpQjtRQUNULHdCQUFrQixHQUFVLElBQUksQ0FBQztRQUd6QyxtQkFBYSxHQUFXLElBQUksQ0FBQztRQUM3QixVQUFVO1FBQ1YsaUJBQVcsR0FBUyxJQUFJLENBQUM7UUFFekIsb0JBQWMsR0FBYyxpQ0FBWSxDQUFDLElBQUksQ0FBQzs7SUE0RmxELENBQUM7SUExRkcscUJBQU0sR0FBTjtJQUdBLENBQUM7SUFFRCxtQkFBSSxHQUFKLFVBQUssS0FBWSxFQUFDLEdBQVUsRUFBQyxFQUFlO1FBRXhDLElBQUksQ0FBQyxjQUFjLEdBQUMsRUFBRSxDQUFDO1FBQ3ZCLElBQUksQ0FBQyxVQUFVLEdBQUMsS0FBSyxDQUFDO1FBQ3RCLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDbkIsSUFBRyxJQUFJLENBQUMsYUFBYSxFQUFDO1lBQ2xCLElBQUksQ0FBQyxXQUFXLEdBQUMsRUFBRSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLENBQUM7WUFDcEQsSUFBSSxDQUFDLFdBQVcsQ0FBQyxNQUFNLEdBQUMs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QUM7U0FDekI7SUFDTCxDQUFDO0lBRUQsMkJBQVksR0FBWixVQUFhLEdBQVU7UUFFbkIsSUFBSSxDQUFDLGNBQWMsR0FBQyxHQUFHLENBQUM7UUFDeEIsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLEdBQUMsR0FBRyxHQUFDLEdBQUcsR0FBQyxJQUFJLENBQUMsRUFBRSxHQUFDLEVBQUUsQ0FBQztJQUN2QyxDQUFDO0lBOUZEO1FBREMsUUFBUSxDQUFDLEVBQUMsSUFBSSxFQUFDLEVBQUUsQ0FBQyxNQUFNLEVBQUMsQ0FBQzsrQ0FDRTtJQWJaLElBQUk7UUFEeEIsT0FBTztPQUNhLElBQUksQ0E2R3hCO0lBQUQsV0FBQztDQTdHRCxBQTZHQyxDQTdHaUMsRUFBRSxDQUFDLFNBQVMsR0E2RzdDO2tCQTdHb0IsSUFBSSIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEdhbWVTdGF0ZSB9IGZyb20gXCIuLi9Db25zdGFudHNcIjtcclxuaW1wb3J0IEdhbWVNYW5hZ2VyIGZyb20gXCIuLi9HYW1lTWFuYWdlclwiO1xyXG5pbXBvcnQgeyBHYW1lRWZmZWN0SWQsIEdhbWVFZmZlY3RzTWFuYWdlciB9IGZyb20gXCIuL0dhbWVFZmZlY3RzTWFuYWdlclwiO1xyXG5cclxuXHJcbmNvbnN0IHtjY2NsYXNzLCBwcm9wZXJ0eX0gPSBjYy5fZGVjb3JhdG9yO1xyXG5cclxuQGNjY2xhc3NcclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTW92ZSBleHRlbmRzIGNjLkNvbXBvbmVudCB7XHJcblxyXG4gICAgbW92ZV9zcGVlZDpudW1iZXI9MzIwO1xyXG4gICAgbW92ZV9kaXJlY3Rpb246bnVtYmVyPU1hdGguUEkqMy8yO1xyXG5cclxuICAgIC8v56e75Yqo55qE55uu5qCH5Zyw54K5XHJcbiAgICBwcml2YXRlIG1vdmVfdGFyZ2V0X3BvczpjYy5WZWMyPW51bGw7XHJcbiAgICAvKirnp7vliqjliLDnm67moIflnLDngrnlkI7nmoTlm57osIMgKi9cclxuICAgIHByaXZhdGUgbW92ZV9lbmRfY2FsbGJhY2s6RnVuY3Rpb249bnVsbDtcclxuICAgIC8qKuenu+WKqOWIsOWfjuWimeS9jee9ruWQjueahOWbnuiwgyAqL1xyXG4gICAgcHJpdmF0ZSBtb3ZlX3dhbGxfY2FsbGJhY2s6RnVuY3Rpb249bnVsbDtcclxuXHJcbiAgICBAcHJvcGVydHkoe3R5cGU6Y2MuUHJlZmFifSlcclxuICAgIHByZWZhYl90dW93ZWk6Y2MuUHJlZmFiPW51bGw7XHJcbiAgICAvKirmi5blsL7oioLngrkgKi9cclxuICAgIHR1b3dlaV9ub2RlOmNjLk5vZGU9bnVsbDtcclxuXHJcbiAgICBnYW1lX2VmZmVjdF9pZDpHYW1lRWZmZWN0SWQ9R2FtZUVmZmVjdElkLk51bGw7XHJcblxyXG4gICAgb25Mb2FkKClcclxuICAgIHtcclxuICAgICAgICBcclxuICAgIH1cclxuXHJcbiAgICBpbml0KHNwZWVkOm51bWJlcixkaXI6bnVtYmVyLGlkOkdhbWVFZmZlY3RJZClcclxuICAgIHtcclxuICAgICAgICB0aGlzLmdhbWVfZWZmZWN0X2lkPWlkO1xyXG4gICAgICAgIHRoaXMubW92ZV9zcGVlZD1zcGVlZDtcclxuICAgICAgICB0aGlzLnVwZGF0ZSgwLjAxNSk7XHJcbiAgICAgICAgaWYodGhpcy5wcmVmYWJfdHVvd2VpKXtcclxuICAgICAgICAgICAgdGhpcy50dW93ZWlfbm9kZT1jYy5pbnN0YW50aWF0ZSh0aGlzLnByZWZhYl90dW93ZWkpO1xyXG4gICAgICAgICAgICB0aGlzLnR1b3dlaV9ub2RlLnBhcmVudD10aGlzLm5vZGUucGFyZW50O1xyXG4gICAgICAgICAgICB0aGlzLm5vZGUuekluZGV4PTE7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgY2hhbmdlRGlyKGRpcjpudW1iZXIpXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy5tb3ZlX2RpcmVjdGlvbj0oZGlyK01hdGguUEkqMiklKE1hdGguUEkqMik7XHJcbiAgICB9XHJcblxyXG4gICAgLyoq6K6+572u56e75Yqo55qE55uu5qCH5L2N572u77yM5Lul5Y+K5Yiw6L6+55uu5qCH5ZCO6ZyA6KaB5YGa55qE5LqL5oOFICovXHJcbiAgICBzZXRUYXJnZXRQb3MocG9zOmNjLlZlYzIsZW5kQ2FsbGJhY2s6RnVuY3Rpb24sd2FsbENhbGxiYWNrPzpGdW5jdGlvbil7XHJcbiAgICAgICAgdGhpcy5tb3ZlX3RhcmdldF9wb3M9cG9zO1xyXG4gICAgICAgIHRoaXMubW92ZV9lbmRfY2FsbGJhY2s9ZW5kQ2FsbGJhY2s7XHJcbiAgICAgICAgdGhpcy5tb3ZlX3dhbGxfY2FsbGJhY2s9d2FsbENhbGxiYWNrO1xyXG4gICAgICAgIHRoaXMudXBkYXRlKDAuMDE1KTtcclxuICAgIH1cclxuXHJcbiAgICB1cGRhdGUgKGR0KSB7XHJcbiAgICAgICAgaWYoR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5jdXJfZ2FtZV9zdGF0ZSE9R2FtZVN0YXRlLkdhbWVfUGxheWluZylcclxuICAgICAgICByZXR1cm47XHJcbiAgICAgICAgbGV0IHByZXZQb3M9dGhpcy5ub2RlLmdldFBvc2l0aW9uKCk7XHJcbiAgICAgICAgbGV0IGRpc1g9dGhpcy5ub2RlLng7XHJcbiAgICAgICAgbGV0IGRpc1k9dGhpcy5ub2RlLnk7XHJcbiAgICAgICAgaWYodGhpcy5tb3ZlX3RhcmdldF9wb3Mpe1xyXG4gICAgICAgICAgICBsZXQgc3BlZWQ9dGhpcy5tb3ZlX3NwZWVkKmR0O1xyXG4gICAgICAgICAgICBsZXQgb2Zmc2V0UG9zPXRoaXMubW92ZV90YXJnZXRfcG9zLnN1Yih0aGlzLm5vZGUuZ2V0UG9zaXRpb24oKSk7XHJcbiAgICAgICAgICAgIGlmKG9mZnNldFBvcy5tYWcoKTxzcGVlZClcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgaWYodGhpcy5tb3ZlX2VuZF9jYWxsYmFjayl7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5kZXN0cm95U2VsZigpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMubW92ZV9lbmRfY2FsbGJhY2soKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLm1vdmVfZW5kX2NhbGxiYWNrPW51bGw7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1lbHNlXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGxldCBwaTI9TWF0aC5QSSoyO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5tb3ZlX2RpcmVjdGlvbj0oTWF0aC5hdGFuMihvZmZzZXRQb3MueSxvZmZzZXRQb3MueCkrcGkyKSVwaTI7XHJcbiAgICAgICAgICAgICAgICBkaXNYKz1zcGVlZCpNYXRoLmNvcyh0aGlzLm1vdmVfZGlyZWN0aW9uKTtcclxuICAgICAgICAgICAgICAgIGRpc1krPXNwZWVkKk1hdGguc2luKHRoaXMubW92ZV9kaXJlY3Rpb24pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuc2V0RGlyZWN0aW9uKHRoaXMubW92ZV9kaXJlY3Rpb24pO1xyXG4gICAgICAgIHRoaXMubm9kZS54PWRpc1g7XHJcbiAgICAgICAgdGhpcy5ub2RlLnk9ZGlzWTtcclxuICAgICAgICBpZih0aGlzLm1vdmVfd2FsbF9jYWxsYmFjayAmJiBkaXNZPD1HYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLmVuZW15X2F0dF95KXtcclxuICAgICAgICAgICAgdGhpcy5kZXN0cm95U2VsZigpO1xyXG4gICAgICAgICAgICB0aGlzLm1vdmVfd2FsbF9jYWxsYmFjaygpO1xyXG4gICAgICAgICAgICB0aGlzLm1vdmVfd2FsbF9jYWxsYmFjaz1udWxsO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZih0aGlzLnR1b3dlaV9ub2RlKXtcclxuICAgICAgICAgICAgbGV0IHBvcz10aGlzLm5vZGUuZ2V0UG9zaXRpb24oKTtcclxuICAgICAgICAgICAgLy/mt7vliqDlnKjlrZDlvLnliY3pnaJcclxuICAgICAgICAgICAgbGV0IG9mZnNldFBvcz1wb3Muc3ViKHByZXZQb3MpO1xyXG4gICAgICAgICAgICBsZXQgZGlzdGFuY2U9b2Zmc2V0UG9zLm1hZygpKjQ7XHJcbiAgICAgICAgICAgIGxldCBkaXI9TWF0aC5hdGFuMihvZmZzZXRQb3MueSxvZmZzZXRQb3MueCk7XHJcbiAgICAgICAgICAgIGxldCB4eD1wb3MueCtNYXRoLmNvcyhkaXIpKmRpc3RhbmNlO1xyXG4gICAgICAgICAgICBsZXQgeXk9cG9zLnkrTWF0aC5zaW4oZGlyKSpkaXN0YW5jZTtcclxuICAgICAgICAgICAgdGhpcy50dW93ZWlfbm9kZS5zZXRQb3NpdGlvbihjYy52Mih4eCx5eSkpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBkZXN0cm95U2VsZigpXHJcbiAgICB7XHJcbiAgICAgICAgR2FtZUVmZmVjdHNNYW5hZ2VyLmdldEluc3RhbmNlKCkuZGVzdHJveUdhbWVFZmZlY3RCeUlkKHRoaXMuZ2FtZV9lZmZlY3RfaWQsdGhpcy5ub2RlKTtcclxuICAgICAgICBpZih0aGlzLnR1b3dlaV9ub2RlKXsgICAgICAgICAgICBcclxuICAgICAgICAgICAgbGV0IGR0PXRoaXMudHVvd2VpX25vZGUuZ2V0Q29tcG9uZW50KGNjLk1vdGlvblN0cmVhaykuZmFkZVRpbWU7XHJcbiAgICAgICAgICAgIGNjLnR3ZWVuKHRoaXMudHVvd2VpX25vZGUpLmRlbGF5KGR0LzEwKS5yZW1vdmVTZWxmKCkuc3RhcnQoKTtcclxuICAgICAgICAgICAgdGhpcy50dW93ZWlfbm9kZT1udWxsO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBzZXREaXJlY3Rpb24oZGlyOm51bWJlcilcclxuICAgIHtcclxuICAgICAgICB0aGlzLm1vdmVfZGlyZWN0aW9uPWRpcjtcclxuICAgICAgICB0aGlzLm5vZGUuYW5nbGU9MTgwKmRpci9NYXRoLlBJKzkwO1xyXG4gICAgfVxyXG5cclxufVxyXG4iXX0=