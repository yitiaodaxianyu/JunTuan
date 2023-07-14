"use strict";
cc._RF.push(module, 'ed634qeWEVD6KtbEPdaJAzx', 'GuaJiJianShi');
// Scripts/GuaJi/GuaJiJianShi.ts

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
var GuaJiManager_1 = require("./GuaJiManager");
var GuaJiMonster_1 = require("./GuaJiMonster");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var GuaJiJianShi = /** @class */ (function (_super) {
    __extends(GuaJiJianShi, _super);
    function GuaJiJianShi() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.jianshi_type = 1;
        _this.move_speed = 1600;
        _this.move_direction = Math.PI / 2;
        _this.jiantou_dis = 16;
        _this.is_att = false;
        _this.offset_xx_angle = 90;
        _this.collision_monster_callback = null;
        _this.max_move_distance = 0;
        _this.cur_move_distance = 0;
        _this.spin_speed = 0;
        _this.init_finish_callback = null;
        /**加速度 */
        _this.acceleration = 0;
        /**拖尾*/
        _this.tuowei = null;
        return _this;
    }
    GuaJiJianShi.prototype.onLoad = function () {
        this.jiantou_dis = this.node.height / 4;
    };
    GuaJiJianShi.prototype.init = function (dir, jianshiType, isTuowei) {
        if (isTuowei === void 0) { isTuowei = false; }
        this.setDirection(dir);
        this.is_att = false;
        this.jianshi_type = jianshiType;
        if (isTuowei) {
            this.tuowei = GuaJiManager_1.default.getInstance().createTuoWei(this.node.getPosition());
        }
    };
    GuaJiJianShi.prototype.getJianTouPos = function () {
        var xx = this.node.x + Math.cos(this.move_direction) * this.jiantou_dis;
        var yy = this.node.y + Math.sin(this.move_direction) * this.jiantou_dis;
        return cc.v2(xx, yy);
    };
    GuaJiJianShi.prototype.update = function (dt) {
        this.move_speed += this.acceleration;
        var prevPos = this.node.getPosition();
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
        if (this.tuowei) {
            var pos = this.node.getPosition();
            //添加在子弹前面            
            var offsetPos = pos.sub(prevPos);
            var distance = offsetPos.mag() * 4;
            var dir = Math.atan2(offsetPos.y, offsetPos.x);
            var xx_1 = pos.x + Math.cos(dir) * distance;
            var yy_1 = pos.y + Math.sin(dir) * distance;
            this.tuowei.setPosition(cc.v2(xx_1, yy_1));
        }
    };
    GuaJiJianShi.prototype.destroySelf = function () {
        if (this.tuowei) {
            var dt = this.tuowei.getComponent(cc.MotionStreak).fadeTime;
            cc.tween(this.tuowei).delay(dt / 10).removeSelf().start();
            this.tuowei = null;
        }
        this.node.removeFromParent();
    };
    GuaJiJianShi.prototype.setDirection = function (dir) {
        this.move_direction = dir;
        this.node.angle = 180 * dir / Math.PI - this.offset_xx_angle;
    };
    ////--------------------------------------碰撞开始----------------------------------------------------
    GuaJiJianShi.prototype.onCollisionEnter = function (other, self) {
        var group = other.node.group;
        switch (group) {
            case 'enemy':
                {
                    switch (this.jianshi_type) {
                        case 1:
                            {
                                if (this.is_att == false) {
                                    var monsterTs = other.node.getComponent(GuaJiMonster_1.default);
                                    if (!monsterTs.getIsDie()) {
                                        this.is_att = true;
                                        monsterTs.changeHp();
                                        GuaJiManager_1.default.getInstance().createHit(this.getJianTouPos());
                                        this.destroySelf();
                                    }
                                }
                            }
                            break;
                        case 2:
                            {
                                if (this.is_att == false) {
                                    var monsterTs = other.node.getComponent(GuaJiMonster_1.default);
                                    if (!monsterTs.getIsDie()) {
                                        this.is_att = true;
                                        monsterTs.changeHp();
                                        GuaJiManager_1.default.getInstance().createPetHit(this.getJianTouPos());
                                        this.destroySelf();
                                    }
                                }
                            }
                            break;
                    }
                }
                break;
        }
    };
    GuaJiJianShi = __decorate([
        ccclass
    ], GuaJiJianShi);
    return GuaJiJianShi;
}(cc.Component));
exports.default = GuaJiJianShi;

cc._RF.pop();