"use strict";
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