"use strict";
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