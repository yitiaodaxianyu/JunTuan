"use strict";
cc._RF.push(module, '38c967bTj5ICZByX6lVwHJ8', 'Bullect');
// Scripts/Hero/Game/Bullect.ts

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
var Monster_1 = require("../../Monster/Monster");
var GongJi_1 = require("./GongJi");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var Bullect = /** @class */ (function (_super) {
    __extends(Bullect, _super);
    function Bullect() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.prefab_tuowei = null;
        /**拖尾节点 */
        _this.tuowei_node = null;
        _this.game_effect_id = 0;
        _this.max_move_speed = 0;
        _this.move_speed = 700;
        _this.move_direction = Math.PI / 2;
        _this.jiantou_dis = 50;
        _this.is_att = false;
        _this.offset_xx_angle = 90;
        _this.collision_monster_callback = null;
        _this.max_move_distance = 0;
        _this.cur_move_distance = 0;
        _this.spin_speed = 0;
        _this.init_finish_callback = null;
        /**加速度 */
        _this.acceleration = 0;
        /**拖尾身位 */
        _this.tuowei_space = 1;
        _this.tuowei_time = 0.5;
        /**拖尾归1（原点位置）的身位数 */
        _this.tuowei_guiyi = 1;
        return _this;
    }
    Bullect.prototype.onLoad = function () {
        this.jiantou_dis = this.node.height / 2;
    };
    Bullect.prototype.init = function (gameEffectId, speed, dir, gjData, offsetAngle, moveDistance) {
        if (offsetAngle === void 0) { offsetAngle = 90; }
        if (moveDistance === void 0) { moveDistance = 0; }
        _super.prototype.initData.call(this, gjData);
        this.game_effect_id = gameEffectId;
        this.max_move_speed = this.move_speed = speed;
        this.setDirection(dir);
        this.is_att = false;
        this.offset_xx_angle = offsetAngle;
        this.max_move_distance = moveDistance;
        this.cur_move_distance = 0;
        if (this.init_finish_callback) {
            this.init_finish_callback();
        }
        if (this.prefab_tuowei) {
            this.tuowei_node = cc.instantiate(this.prefab_tuowei);
            this.tuowei_node.parent = this.node.parent;
            this.node.zIndex = 1;
            this.tuowei_time = this.tuowei_node.getComponent(cc.MotionStreak).fadeTime;
            this.tuowei_guiyi = 1 / this.tuowei_time;
        }
    };
    Bullect.prototype.addInitFinishedListen = function (callback) {
        this.init_finish_callback = callback;
    };
    Bullect.prototype.addCollisionMonsterListen = function (callback) {
        this.collision_monster_callback = callback;
    };
    Bullect.prototype.changeDir = function (dir) {
        this.move_direction = (dir + Math.PI * 2) % (Math.PI * 2);
    };
    Bullect.prototype.collisionToWall = function (wallName) {
        if (wallName == 'wall_left' || wallName == 'wall_right') {
            if (this.max_move_distance > 0) {
                this.collision_monster_callback(null);
            }
            this.destroySelf();
        }
        if (wallName == 'wall_top') {
            if (this.max_move_distance > 0) {
                this.collision_monster_callback(null);
            }
            this.destroySelf();
        }
    };
    /**获取下一帧位置 */
    Bullect.prototype.getNextPos = function (dt) {
        var gr = GameManager_1.default.getInstance().getGameRate();
        if (gr < 1) {
            gr = 1;
        }
        var distance = this.tuowei_space * this.tuowei_guiyi * this.move_speed * dt / gr;
        var xx = this.node.x + Math.cos(this.move_direction) * distance;
        var yy = this.node.y + Math.sin(this.move_direction) * distance;
        return cc.v2(xx, yy);
    };
    Bullect.prototype.getHeadPos = function () {
        var distance = this.move_speed * cc.director.getDeltaTime();
        var xx = this.node.x + Math.cos(this.move_direction) * distance;
        var yy = this.node.y + Math.sin(this.move_direction) * distance;
        return cc.v2(xx, yy);
    };
    Bullect.prototype.getAPos = function (offsetDistance) {
        var distance = this.move_speed * cc.director.getDeltaTime() - offsetDistance;
        var xx = this.node.x + Math.cos(this.move_direction) * distance;
        var yy = this.node.y + Math.sin(this.move_direction) * distance;
        return cc.v2(xx, yy);
    };
    Bullect.prototype.update = function (dt) {
        if (GameManager_1.default.getInstance().cur_game_state != Constants_1.GameState.Game_Playing)
            return;
        this.move_speed += this.acceleration * GameManager_1.default.getInstance().getGameRate();
        var xx = this.move_speed * dt * Math.cos(this.move_direction);
        var yy = this.move_speed * dt * Math.sin(this.move_direction);
        this.node.x += xx;
        this.node.y += yy;
        if (this.spin_speed > 0) {
            this.node.angle += this.spin_speed * dt;
        }
        else {
            this.node.angle = 180 * this.move_direction / Math.PI - this.offset_xx_angle;
        }
        if (this.max_move_distance > 0 && this.cur_move_distance < this.max_move_distance) {
            var distance = cc.v2(xx, yy).mag();
            this.cur_move_distance += distance;
            if (this.cur_move_distance >= this.max_move_distance) {
                this.collision_monster_callback(null);
            }
        }
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
    Bullect.prototype.destroySelf = function () {
        if (this.tuowei_node) {
            cc.tween(this.tuowei_node).delay(this.tuowei_time).removeSelf().start();
            this.tuowei_node = null;
        }
        GameEffectsManager_1.GameEffectsManager.getInstance().destroyGameEffectById(this.game_effect_id, this.node);
    };
    Bullect.prototype.setDirection = function (dir) {
        this.move_direction = (dir + Math.PI * 2) % (Math.PI * 2);
        this.node.angle = 180 * dir / Math.PI - this.offset_xx_angle;
    };
    ////--------------------------------------碰撞开始----------------------------------------------------
    Bullect.prototype.onCollisionEnter = function (other, self) {
        var gm = GameManager_1.default.getInstance();
        if (gm.cur_game_state == Constants_1.GameState.Game_Lose || this.is_att == true)
            return;
        var group = other.node.group;
        switch (group) {
            case 'enemy':
                {
                    if (this.collision_monster_callback) {
                        var monsterTs = other.node.getComponent(Monster_1.default);
                        this.is_att = true;
                        if (monsterTs)
                            this.collision_monster_callback(monsterTs);
                    }
                }
                break;
            // case "enemy_block":{
            //     this.is_att=true;
            //     this.destroySelf();
            //     // let gjData=other.node.getComponent(GongJi);
            //     // //本次伤害直接减伤
            //     // if(gjData){
            //     //     this.monster_ts.jianshang_rate+=this.monster_ts.skill_data.getSkillValue1(1);
            //     //     this.monster_ts.beFlashInjured(gjData.gongji_data);
            //     //     this.monster_ts.jianshang_rate-=this.monster_ts.skill_data.getSkillValue1(1);
            //     //     //直接销毁
            //     //     gjData.node.removeFromParent();
            //     // }
            // }break;
            // case 'wall':{                
            //     this.collisionToWall(other.node.name);
            // }break;
        }
    };
    __decorate([
        property({ type: cc.Prefab })
    ], Bullect.prototype, "prefab_tuowei", void 0);
    Bullect = __decorate([
        ccclass
    ], Bullect);
    return Bullect;
}(GongJi_1.default));
exports.default = Bullect;

cc._RF.pop();