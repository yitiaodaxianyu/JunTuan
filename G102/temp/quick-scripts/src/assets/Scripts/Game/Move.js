"use strict";
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