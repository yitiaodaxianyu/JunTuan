
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Scripts/GuaJi/GuaJiJianShi.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0c1xcR3VhSmlcXEd1YUppSmlhblNoaS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSwrQ0FBMEM7QUFDMUMsK0NBQTBDO0FBR3BDLElBQUEsS0FBc0IsRUFBRSxDQUFDLFVBQVUsRUFBbEMsT0FBTyxhQUFBLEVBQUUsUUFBUSxjQUFpQixDQUFDO0FBRzFDO0lBQTBDLGdDQUFZO0lBQXREO1FBQUEscUVBa0hDO1FBaEhHLGtCQUFZLEdBQVEsQ0FBQyxDQUFDO1FBQ3RCLGdCQUFVLEdBQVEsSUFBSSxDQUFDO1FBQ3ZCLG9CQUFjLEdBQVEsSUFBSSxDQUFDLEVBQUUsR0FBQyxDQUFDLENBQUM7UUFDaEMsaUJBQVcsR0FBUSxFQUFFLENBQUM7UUFDdEIsWUFBTSxHQUFTLEtBQUssQ0FBQztRQUNyQixxQkFBZSxHQUFRLEVBQUUsQ0FBQztRQUUxQixnQ0FBMEIsR0FBVSxJQUFJLENBQUM7UUFDekMsdUJBQWlCLEdBQVEsQ0FBQyxDQUFDO1FBQzNCLHVCQUFpQixHQUFRLENBQUMsQ0FBQztRQUMzQixnQkFBVSxHQUFRLENBQUMsQ0FBQztRQUNwQiwwQkFBb0IsR0FBVSxJQUFJLENBQUM7UUFDbkMsU0FBUztRQUNULGtCQUFZLEdBQVEsQ0FBQyxDQUFDO1FBQ3RCLE9BQU87UUFDUCxZQUFNLEdBQVMsSUFBSSxDQUFDOztJQWlHeEIsQ0FBQztJQS9GRyw2QkFBTSxHQUFOO1FBRUksSUFBSSxDQUFDLFdBQVcsR0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sR0FBQyxDQUFDLENBQUM7SUFDeEMsQ0FBQztJQUVELDJCQUFJLEdBQUosVUFBSyxHQUFVLEVBQUMsV0FBa0IsRUFBQyxRQUFzQjtRQUF0Qix5QkFBQSxFQUFBLGdCQUFzQjtRQUNyRCxJQUFJLENBQUMsWUFBWSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ3ZCLElBQUksQ0FBQyxNQUFNLEdBQUMsS0FBSyxD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QWEsRUFBRSxDQUFDLENBQUM7d0NBQzNELElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQztxQ0FDdEI7aUNBQ0o7NkJBQ0o7NEJBQUEsTUFBTTt3QkFDUCxLQUFLLENBQUM7NEJBQUM7Z0NBQ0gsSUFBRyxJQUFJLENBQUMsTUFBTSxJQUFFLEtBQUssRUFBQztvQ0FDbEIsSUFBSSxTQUFTLEdBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsc0JBQVksQ0FBQyxDQUFDO29DQUNwRCxJQUFHLENBQUMsU0FBUyxDQUFDLFFBQVEsRUFBRSxFQUFDO3dDQUNyQixJQUFJLENBQUMsTUFBTSxHQUFDLElBQUksQ0FBQzt3Q0FDakIsU0FBUyxDQUFDLFFBQVEsRUFBRSxDQUFDO3dDQUNyQixzQkFBWSxDQUFDLFdBQVcsRUFBRSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsYUFBYSxFQUFFLENBQUMsQ0FBQzt3Q0FDOUQsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDO3FDQUN0QjtpQ0FDSjs2QkFDSjs0QkFBQSxNQUFNO3FCQUNWO2lCQUVKO2dCQUFBLE1BQU07U0FDVjtJQUNMLENBQUM7SUFqSGdCLFlBQVk7UUFEaEMsT0FBTztPQUNhLFlBQVksQ0FrSGhDO0lBQUQsbUJBQUM7Q0FsSEQsQUFrSEMsQ0FsSHlDLEVBQUUsQ0FBQyxTQUFTLEdBa0hyRDtrQkFsSG9CLFlBQVkiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgR3VhSmlNYW5hZ2VyIGZyb20gXCIuL0d1YUppTWFuYWdlclwiO1xyXG5pbXBvcnQgR3VhSmlNb25zdGVyIGZyb20gXCIuL0d1YUppTW9uc3RlclwiO1xyXG5cclxuXHJcbmNvbnN0IHtjY2NsYXNzLCBwcm9wZXJ0eX0gPSBjYy5fZGVjb3JhdG9yO1xyXG5cclxuQGNjY2xhc3NcclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgR3VhSmlKaWFuU2hpIGV4dGVuZHMgY2MuQ29tcG9uZW50IHtcclxuXHJcbiAgICBqaWFuc2hpX3R5cGU6bnVtYmVyPTE7XHJcbiAgICBtb3ZlX3NwZWVkOm51bWJlcj0xNjAwO1xyXG4gICAgbW92ZV9kaXJlY3Rpb246bnVtYmVyPU1hdGguUEkvMjtcclxuICAgIGppYW50b3VfZGlzOm51bWJlcj0xNjtcclxuICAgIGlzX2F0dDpib29sZWFuPWZhbHNlO1xyXG4gICAgb2Zmc2V0X3h4X2FuZ2xlOm51bWJlcj05MDtcclxuXHJcbiAgICBjb2xsaXNpb25fbW9uc3Rlcl9jYWxsYmFjazpGdW5jdGlvbj1udWxsO1xyXG4gICAgbWF4X21vdmVfZGlzdGFuY2U6bnVtYmVyPTA7XHJcbiAgICBjdXJfbW92ZV9kaXN0YW5jZTpudW1iZXI9MDtcclxuICAgIHNwaW5fc3BlZWQ6bnVtYmVyPTA7XHJcbiAgICBpbml0X2ZpbmlzaF9jYWxsYmFjazpGdW5jdGlvbj1udWxsO1xyXG4gICAgLyoq5Yqg6YCf5bqmICovXHJcbiAgICBhY2NlbGVyYXRpb246bnVtYmVyPTA7XHJcbiAgICAvKirmi5blsL4qL1xyXG4gICAgdHVvd2VpOmNjLk5vZGU9bnVsbDtcclxuXHJcbiAgICBvbkxvYWQoKVxyXG4gICAge1xyXG4gICAgICAgIHRoaXMuamlhbnRvdV9kaXM9dGhpcy5ub2RlLmhlaWdodC80OyAgICAgICAgXHJcbiAgICB9XHJcblxyXG4gICAgaW5pdChkaXI6bnVtYmVyLGppYW5zaGlUeXBlOm51bWJlcixpc1R1b3dlaTpib29sZWFuPWZhbHNlKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5zZXREaXJlY3Rpb24oZGlyKTtcclxuICAgICAgICB0aGlzLmlzX2F0dD1mYWxzZTtcclxuICAgICAgICB0aGlzLmppYW5zaGlfdHlwZT1qaWFuc2hpVHlwZTtcclxuICAgICAgICBpZihpc1R1b3dlaSl7XHJcbiAgICAgICAgICAgIHRoaXMudHVvd2VpPUd1YUppTWFuYWdlci5nZXRJbnN0YW5jZSgpLmNyZWF0ZVR1b1dlaSh0aGlzLm5vZGUuZ2V0UG9zaXRpb24oKSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGdldEppYW5Ub3VQb3MoKTpjYy5WZWMyXHJcbiAgICB7XHJcbiAgICAgICAgbGV0IHh4PXRoaXMubm9kZS54K01hdGguY29zKHRoaXMubW92ZV9kaXJlY3Rpb24pKnRoaXMuamlhbnRvdV9kaXM7XHJcbiAgICAgICAgbGV0IHl5PXRoaXMubm9kZS55K01hdGguc2luKHRoaXMubW92ZV9kaXJlY3Rpb24pKnRoaXMuamlhbnRvdV9kaXM7XHJcbiAgICAgICAgcmV0dXJuIGNjLnYyKHh4LHl5KTtcclxuICAgIH1cclxuXHJcbiAgICB1cGRhdGUgKGR0KSB7XHJcbiAgICAgICAgdGhpcy5tb3ZlX3NwZWVkKz10aGlzLmFjY2VsZXJhdGlvbjtcclxuICAgICAgICBsZXQgcHJldlBvcz10aGlzLm5vZGUuZ2V0UG9zaXRpb24oKTtcclxuICAgICAgICBsZXQgeHg9dGhpcy5tb3ZlX3NwZWVkKmR0Kk1hdGguY29zKHRoaXMubW92ZV9kaXJlY3Rpb24pO1xyXG4gICAgICAgIGxldCB5eT10aGlzLm1vdmVfc3BlZWQqZHQqTWF0aC5zaW4odGhpcy5tb3ZlX2RpcmVjdGlvbik7XHJcbiAgICAgICAgdGhpcy5ub2RlLngrPXh4O1xyXG4gICAgICAgIHRoaXMubm9kZS55Kz15eTtcclxuICAgICAgICBpZih0aGlzLm5vZGUueT5jYy53aW5TaXplLmhlaWdodCl7XHJcbiAgICAgICAgICAgIHRoaXMuZGVzdHJveVNlbGYoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYoTWF0aC5hYnModGhpcy5ub2RlLngpPmNjLndpblNpemUud2lkdGgpe1xyXG4gICAgICAgICAgICB0aGlzLmRlc3Ryb3lTZWxmKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmKHRoaXMudHVvd2VpKXtcclxuICAgICAgICAgICAgbGV0IHBvcz10aGlzLm5vZGUuZ2V0UG9zaXRpb24oKTtcclxuICAgICAgICAgICAgLy/mt7vliqDlnKjlrZDlvLnliY3pnaIgICAgICAgICAgICBcclxuICAgICAgICAgICAgbGV0IG9mZnNldFBvcz1wb3Muc3ViKHByZXZQb3MpO1xyXG4gICAgICAgICAgICBsZXQgZGlzdGFuY2U9b2Zmc2V0UG9zLm1hZygpKjQ7XHJcbiAgICAgICAgICAgIGxldCBkaXI9TWF0aC5hdGFuMihvZmZzZXRQb3MueSxvZmZzZXRQb3MueCk7XHJcbiAgICAgICAgICAgIGxldCB4eD1wb3MueCtNYXRoLmNvcyhkaXIpKmRpc3RhbmNlO1xyXG4gICAgICAgICAgICBsZXQgeXk9cG9zLnkrTWF0aC5zaW4oZGlyKSpkaXN0YW5jZTtcclxuICAgICAgICAgICAgdGhpcy50dW93ZWkuc2V0UG9zaXRpb24oY2MudjIoeHgseXkpKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgZGVzdHJveVNlbGYoKVxyXG4gICAgeyAgICAgICAgXHJcbiAgICAgICAgaWYodGhpcy50dW93ZWkpeyAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBsZXQgZHQ9dGhpcy50dW93ZWkuZ2V0Q29tcG9uZW50KGNjLk1vdGlvblN0cmVhaykuZmFkZVRpbWU7XHJcbiAgICAgICAgICAgIGNjLnR3ZWVuKHRoaXMudHVvd2VpKS5kZWxheShkdC8xMCkucmVtb3ZlU2VsZigpLnN0YXJ0KCk7XHJcbiAgICAgICAgICAgIHRoaXMudHVvd2VpPW51bGw7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMubm9kZS5yZW1vdmVGcm9tUGFyZW50KCk7XHJcbiAgICB9XHJcblxyXG4gICAgc2V0RGlyZWN0aW9uKGRpcjpudW1iZXIpXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy5tb3ZlX2RpcmVjdGlvbj1kaXI7XHJcbiAgICAgICAgdGhpcy5ub2RlLmFuZ2xlPTE4MCpkaXIvTWF0aC5QSS10aGlzLm9mZnNldF94eF9hbmdsZTtcclxuICAgIH1cclxuICAgIFxyXG4gICAgLy8vLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0t56Kw5pKe5byA5aeLLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gICAgb25Db2xsaXNpb25FbnRlcihvdGhlcjpjYy5Db2xsaWRlcixzZWxmOmNjLkNvbGxpZGVyKSB7XHJcbiAgICAgICAgbGV0IGdyb3VwPW90aGVyLm5vZGUuZ3JvdXA7XHJcbiAgICAgICAgc3dpdGNoKGdyb3VwKXtcclxuICAgICAgICAgICAgY2FzZSAnZW5lbXknOntcclxuICAgICAgICAgICAgICAgIHN3aXRjaCh0aGlzLmppYW5zaGlfdHlwZSl7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAxOntcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYodGhpcy5pc19hdHQ9PWZhbHNlKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBtb25zdGVyVHM9b3RoZXIubm9kZS5nZXRDb21wb25lbnQoR3VhSmlNb25zdGVyKTsgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYoIW1vbnN0ZXJUcy5nZXRJc0RpZSgpKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmlzX2F0dD10cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1vbnN0ZXJUcy5jaGFuZ2VIcCgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIEd1YUppTWFuYWdlci5nZXRJbnN0YW5jZSgpLmNyZWF0ZUhpdCh0aGlzLmdldEppYW5Ub3VQb3MoKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5kZXN0cm95U2VsZigpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfWJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgMjp7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmKHRoaXMuaXNfYXR0PT1mYWxzZSl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgbW9uc3RlclRzPW90aGVyLm5vZGUuZ2V0Q29tcG9uZW50KEd1YUppTW9uc3Rlcik7ICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmKCFtb25zdGVyVHMuZ2V0SXNEaWUoKSl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5pc19hdHQ9dHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtb25zdGVyVHMuY2hhbmdlSHAoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBHdWFKaU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5jcmVhdGVQZXRIaXQodGhpcy5nZXRKaWFuVG91UG9zKCkpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZGVzdHJveVNlbGYoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1icmVhaztcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICB9YnJlYWs7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcbiJdfQ==