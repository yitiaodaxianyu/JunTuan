"use strict";
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