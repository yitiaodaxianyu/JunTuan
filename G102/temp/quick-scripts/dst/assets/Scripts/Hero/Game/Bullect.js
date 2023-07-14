
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Scripts/Hero/Game/Bullect.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0c1xcSGVyb1xcR2FtZVxcQnVsbGVjdC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFDQSw2Q0FBNEM7QUFDNUMsb0VBQWlGO0FBQ2pGLGlEQUE0QztBQUM1QyxpREFBNEM7QUFFNUMsbUNBQThCO0FBR3hCLElBQUEsS0FBc0IsRUFBRSxDQUFDLFVBQVUsRUFBbEMsT0FBTyxhQUFBLEVBQUUsUUFBUSxjQUFpQixDQUFDO0FBRzFDO0lBQXFDLDJCQUFNO0lBQTNDO1FBQUEscUVBK0xDO1FBNUxHLG1CQUFhLEdBQVcsSUFBSSxDQUFDO1FBQzdCLFVBQVU7UUFDVixpQkFBVyxHQUFTLElBQUksQ0FBQztRQUV6QixvQkFBYyxHQUFRLENBQUMsQ0FBQztRQUN4QixvQkFBYyxHQUFRLENBQUMsQ0FBQztRQUN4QixnQkFBVSxHQUFRLEdBQUcsQ0FBQztRQUN0QixvQkFBYyxHQUFRLElBQUksQ0FBQyxFQUFFLEdBQUMsQ0FBQyxDQUFDO1FBQ2hDLGlCQUFXLEdBQVEsRUFBRSxDQUFDO1FBQ3RCLFlBQU0sR0FBUyxLQUFLLENBQUM7UUFDckIscUJBQWUsR0FBUSxFQUFFLENBQUM7UUFFMUIsZ0NBQTBCLEdBQVUsSUFBSSxDQUFDO1FBQ3pDLHVCQUFpQixHQUFRLENBQUMsQ0FBQztRQUMzQix1QkFBaUIsR0FBUSxDQUFDLENBQUM7UUFDM0IsZ0JBQVUsR0FBUSxDQUFDLENBQUM7UUFDcEIsMEJBQW9CLEdBQVUsSUFBSSxDQUFDO1FBQ25DLFNBQVM7UUFDVCxrQkFBWSxHQUFRLENBQUMsQ0FBQztRQUN0QixVQUFVO1FBQ1Ysa0JBQVksR0FBUSxDQUFDLENBQUM7UUFDdEIsaUJBQVcsR0FBUSxHQUFHLENBQUM7UUFDdkIsb0JBQW9CO1FBQ3BCLGtCQUFZLEdBQVEsQ0FBQyxDQUFDOztJQXFLMUIsQ0FBQztJQW5LRyx3QkFBTSxHQUFOO1FBRUksSUFBSSxDQUFDLFdBQVcsR0FB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MEI7WUFDMUIscURBQXFEO1lBQ3JELG9CQUFvQjtZQUNwQixxQkFBcUI7WUFDckIsMkZBQTJGO1lBQzNGLGlFQUFpRTtZQUNqRSwyRkFBMkY7WUFDM0Ysb0JBQW9CO1lBQ3BCLDZDQUE2QztZQUM3QyxXQUFXO1lBQ1gsVUFBVTtZQUNWLGdDQUFnQztZQUNoQyw2Q0FBNkM7WUFDN0MsVUFBVTtTQUNiO0lBQ0wsQ0FBQztJQTNMRDtRQURDLFFBQVEsQ0FBQyxFQUFDLElBQUksRUFBQyxFQUFFLENBQUMsTUFBTSxFQUFDLENBQUM7a0RBQ0U7SUFIWixPQUFPO1FBRDNCLE9BQU87T0FDYSxPQUFPLENBK0wzQjtJQUFELGNBQUM7Q0EvTEQsQUErTEMsQ0EvTG9DLGdCQUFNLEdBK0wxQztrQkEvTG9CLE9BQU8iLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJcclxuaW1wb3J0IHsgR2FtZVN0YXRlIH0gZnJvbSBcIi4uLy4uL0NvbnN0YW50c1wiO1xyXG5pbXBvcnQgeyBHYW1lRWZmZWN0SWQsIEdhbWVFZmZlY3RzTWFuYWdlciB9IGZyb20gXCIuLi8uLi9HYW1lL0dhbWVFZmZlY3RzTWFuYWdlclwiO1xyXG5pbXBvcnQgR2FtZU1hbmFnZXIgZnJvbSBcIi4uLy4uL0dhbWVNYW5hZ2VyXCI7XHJcbmltcG9ydCBNb25zdGVyIGZyb20gXCIuLi8uLi9Nb25zdGVyL01vbnN0ZXJcIjtcclxuaW1wb3J0IHsgR29uZ0ppRGF0YSB9IGZyb20gXCIuLi9EYXRhL0hlcm9EYXRhXCI7XHJcbmltcG9ydCBHb25nSmkgZnJvbSBcIi4vR29uZ0ppXCI7XHJcblxyXG5cclxuY29uc3Qge2NjY2xhc3MsIHByb3BlcnR5fSA9IGNjLl9kZWNvcmF0b3I7XHJcblxyXG5AY2NjbGFzc1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBCdWxsZWN0IGV4dGVuZHMgR29uZ0ppIHtcclxuXHJcbiAgICBAcHJvcGVydHkoe3R5cGU6Y2MuUHJlZmFifSlcclxuICAgIHByZWZhYl90dW93ZWk6Y2MuUHJlZmFiPW51bGw7XHJcbiAgICAvKirmi5blsL7oioLngrkgKi9cclxuICAgIHR1b3dlaV9ub2RlOmNjLk5vZGU9bnVsbDtcclxuXHJcbiAgICBnYW1lX2VmZmVjdF9pZDpudW1iZXI9MDtcclxuICAgIG1heF9tb3ZlX3NwZWVkOm51bWJlcj0wO1xyXG4gICAgbW92ZV9zcGVlZDpudW1iZXI9NzAwO1xyXG4gICAgbW92ZV9kaXJlY3Rpb246bnVtYmVyPU1hdGguUEkvMjtcclxuICAgIGppYW50b3VfZGlzOm51bWJlcj01MDtcclxuICAgIGlzX2F0dDpib29sZWFuPWZhbHNlO1xyXG4gICAgb2Zmc2V0X3h4X2FuZ2xlOm51bWJlcj05MDtcclxuXHJcbiAgICBjb2xsaXNpb25fbW9uc3Rlcl9jYWxsYmFjazpGdW5jdGlvbj1udWxsO1xyXG4gICAgbWF4X21vdmVfZGlzdGFuY2U6bnVtYmVyPTA7XHJcbiAgICBjdXJfbW92ZV9kaXN0YW5jZTpudW1iZXI9MDtcclxuICAgIHNwaW5fc3BlZWQ6bnVtYmVyPTA7XHJcbiAgICBpbml0X2ZpbmlzaF9jYWxsYmFjazpGdW5jdGlvbj1udWxsO1xyXG4gICAgLyoq5Yqg6YCf5bqmICovXHJcbiAgICBhY2NlbGVyYXRpb246bnVtYmVyPTA7XHJcbiAgICAvKirmi5blsL7ouqvkvY0gKi9cclxuICAgIHR1b3dlaV9zcGFjZTpudW1iZXI9MTtcclxuICAgIHR1b3dlaV90aW1lOm51bWJlcj0wLjU7XHJcbiAgICAvKirmi5blsL7lvZIx77yI5Y6f54K55L2N572u77yJ55qE6Lqr5L2N5pWwICovXHJcbiAgICB0dW93ZWlfZ3VpeWk6bnVtYmVyPTE7XHJcblxyXG4gICAgb25Mb2FkKClcclxuICAgIHtcclxuICAgICAgICB0aGlzLmppYW50b3VfZGlzPXRoaXMubm9kZS5oZWlnaHQvMjtcclxuICAgIH1cclxuXHJcbiAgICBpbml0KGdhbWVFZmZlY3RJZDpHYW1lRWZmZWN0SWQsc3BlZWQ6bnVtYmVyLGRpcjpudW1iZXIsZ2pEYXRhOkdvbmdKaURhdGEsb2Zmc2V0QW5nbGU6bnVtYmVyPTkwLG1vdmVEaXN0YW5jZTpudW1iZXI9MClcclxuICAgIHtcclxuICAgICAgICBzdXBlci5pbml0RGF0YShnakRhdGEpO1xyXG4gICAgICAgIHRoaXMuZ2FtZV9lZmZlY3RfaWQ9Z2FtZUVmZmVjdElkO1xyXG4gICAgICAgIHRoaXMubWF4X21vdmVfc3BlZWQ9dGhpcy5tb3ZlX3NwZWVkPXNwZWVkO1xyXG4gICAgICAgIHRoaXMuc2V0RGlyZWN0aW9uKGRpcik7XHJcbiAgICAgICAgdGhpcy5pc19hdHQ9ZmFsc2U7ICAgICAgICBcclxuICAgICAgICB0aGlzLm9mZnNldF94eF9hbmdsZT1vZmZzZXRBbmdsZTtcclxuICAgICAgICB0aGlzLm1heF9tb3ZlX2Rpc3RhbmNlPW1vdmVEaXN0YW5jZTtcclxuICAgICAgICB0aGlzLmN1cl9tb3ZlX2Rpc3RhbmNlPTA7XHJcbiAgICAgICAgaWYodGhpcy5pbml0X2ZpbmlzaF9jYWxsYmFjayl7XHJcbiAgICAgICAgICAgIHRoaXMuaW5pdF9maW5pc2hfY2FsbGJhY2soKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYodGhpcy5wcmVmYWJfdHVvd2VpKXtcclxuICAgICAgICAgICAgdGhpcy50dW93ZWlfbm9kZT1jYy5pbnN0YW50aWF0ZSh0aGlzLnByZWZhYl90dW93ZWkpO1xyXG4gICAgICAgICAgICB0aGlzLnR1b3dlaV9ub2RlLnBhcmVudD10aGlzLm5vZGUucGFyZW50O1xyXG4gICAgICAgICAgICB0aGlzLm5vZGUuekluZGV4PTE7XHJcbiAgICAgICAgICAgIHRoaXMudHVvd2VpX3RpbWU9dGhpcy50dW93ZWlfbm9kZS5nZXRDb21wb25lbnQoY2MuTW90aW9uU3RyZWFrKS5mYWRlVGltZTtcclxuICAgICAgICAgICAgdGhpcy50dW93ZWlfZ3VpeWk9MS90aGlzLnR1b3dlaV90aW1lO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBhZGRJbml0RmluaXNoZWRMaXN0ZW4oY2FsbGJhY2s6RnVuY3Rpb24pe1xyXG4gICAgICAgIHRoaXMuaW5pdF9maW5pc2hfY2FsbGJhY2s9Y2FsbGJhY2s7XHJcbiAgICB9XHJcblxyXG4gICAgcHJvdGVjdGVkIGFkZENvbGxpc2lvbk1vbnN0ZXJMaXN0ZW4oY2FsbGJhY2s6RnVuY3Rpb24pe1xyXG4gICAgICAgIHRoaXMuY29sbGlzaW9uX21vbnN0ZXJfY2FsbGJhY2s9Y2FsbGJhY2s7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBjaGFuZ2VEaXIoZGlyOm51bWJlcilcclxuICAgIHtcclxuICAgICAgICB0aGlzLm1vdmVfZGlyZWN0aW9uPShkaXIrTWF0aC5QSSoyKSUoTWF0aC5QSSoyKTtcclxuICAgIH1cclxuXHJcbiAgICBjb2xsaXNpb25Ub1dhbGwod2FsbE5hbWU6c3RyaW5nKVxyXG4gICAge1xyXG4gICAgICAgIGlmKHdhbGxOYW1lPT0nd2FsbF9sZWZ0JyB8fCB3YWxsTmFtZT09J3dhbGxfcmlnaHQnKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgaWYodGhpcy5tYXhfbW92ZV9kaXN0YW5jZT4wKXtcclxuICAgICAgICAgICAgICAgIHRoaXMuY29sbGlzaW9uX21vbnN0ZXJfY2FsbGJhY2sobnVsbClcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLmRlc3Ryb3lTZWxmKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmKHdhbGxOYW1lPT0nd2FsbF90b3AnKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgaWYodGhpcy5tYXhfbW92ZV9kaXN0YW5jZT4wKXtcclxuICAgICAgICAgICAgICAgIHRoaXMuY29sbGlzaW9uX21vbnN0ZXJfY2FsbGJhY2sobnVsbClcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLmRlc3Ryb3lTZWxmKCk7ICAgICAgICAgICAgXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgLyoq6I635Y+W5LiL5LiA5bin5L2N572uICovXHJcbiAgICBnZXROZXh0UG9zKGR0Om51bWJlcik6Y2MuVmVjMlxyXG4gICAge1xyXG4gICAgICAgIGxldCBncj1HYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldEdhbWVSYXRlKCk7XHJcbiAgICAgICAgaWYoZ3I8MSl7XHJcbiAgICAgICAgICAgIGdyPTE7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGxldCBkaXN0YW5jZT10aGlzLnR1b3dlaV9zcGFjZSp0aGlzLnR1b3dlaV9ndWl5aSp0aGlzLm1vdmVfc3BlZWQqZHQvZ3I7XHJcbiAgICAgICAgbGV0IHh4PXRoaXMubm9kZS54K01hdGguY29zKHRoaXMubW92ZV9kaXJlY3Rpb24pKmRpc3RhbmNlO1xyXG4gICAgICAgIGxldCB5eT10aGlzLm5vZGUueStNYXRoLnNpbih0aGlzLm1vdmVfZGlyZWN0aW9uKSpkaXN0YW5jZTtcclxuICAgICAgICByZXR1cm4gY2MudjIoeHgseXkpO1xyXG4gICAgfVxyXG5cclxuICAgIGdldEhlYWRQb3MoKTpjYy5WZWMye1xyXG4gICAgICAgIGxldCBkaXN0YW5jZT10aGlzLm1vdmVfc3BlZWQqY2MuZGlyZWN0b3IuZ2V0RGVsdGFUaW1lKCk7XHJcbiAgICAgICAgbGV0IHh4PXRoaXMubm9kZS54K01hdGguY29zKHRoaXMubW92ZV9kaXJlY3Rpb24pKmRpc3RhbmNlO1xyXG4gICAgICAgIGxldCB5eT10aGlzLm5vZGUueStNYXRoLnNpbih0aGlzLm1vdmVfZGlyZWN0aW9uKSpkaXN0YW5jZTtcclxuICAgICAgICByZXR1cm4gY2MudjIoeHgseXkpO1xyXG4gICAgfVxyXG5cclxuICAgIGdldEFQb3Mob2Zmc2V0RGlzdGFuY2U6bnVtYmVyKTpjYy5WZWMye1xyXG4gICAgICAgIGxldCBkaXN0YW5jZT10aGlzLm1vdmVfc3BlZWQqY2MuZGlyZWN0b3IuZ2V0RGVsdGFUaW1lKCktb2Zmc2V0RGlzdGFuY2U7XHJcbiAgICAgICAgbGV0IHh4PXRoaXMubm9kZS54K01hdGguY29zKHRoaXMubW92ZV9kaXJlY3Rpb24pKmRpc3RhbmNlO1xyXG4gICAgICAgIGxldCB5eT10aGlzLm5vZGUueStNYXRoLnNpbih0aGlzLm1vdmVfZGlyZWN0aW9uKSpkaXN0YW5jZTtcclxuICAgICAgICByZXR1cm4gY2MudjIoeHgseXkpO1xyXG4gICAgfVxyXG5cclxuICAgIHVwZGF0ZSAoZHQpIHtcclxuICAgICAgICBpZihHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLmN1cl9nYW1lX3N0YXRlIT1HYW1lU3RhdGUuR2FtZV9QbGF5aW5nKVxyXG4gICAgICAgIHJldHVybjtcclxuICAgICAgICB0aGlzLm1vdmVfc3BlZWQrPXRoaXMuYWNjZWxlcmF0aW9uKkdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0R2FtZVJhdGUoKTtcclxuICAgICAgICBsZXQgeHg9dGhpcy5tb3ZlX3NwZWVkKmR0Kk1hdGguY29zKHRoaXMubW92ZV9kaXJlY3Rpb24pO1xyXG4gICAgICAgIGxldCB5eT10aGlzLm1vdmVfc3BlZWQqZHQqTWF0aC5zaW4odGhpcy5tb3ZlX2RpcmVjdGlvbik7XHJcbiAgICAgICAgdGhpcy5ub2RlLngrPXh4O1xyXG4gICAgICAgIHRoaXMubm9kZS55Kz15eTtcclxuICAgICAgICBpZih0aGlzLnNwaW5fc3BlZWQ+MCl7XHJcbiAgICAgICAgICAgIHRoaXMubm9kZS5hbmdsZSs9dGhpcy5zcGluX3NwZWVkKmR0O1xyXG4gICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICB0aGlzLm5vZGUuYW5nbGU9MTgwKnRoaXMubW92ZV9kaXJlY3Rpb24vTWF0aC5QSS10aGlzLm9mZnNldF94eF9hbmdsZTtcclxuICAgICAgICB9ICAgICAgICBcclxuICAgICAgICBpZih0aGlzLm1heF9tb3ZlX2Rpc3RhbmNlPjAmJnRoaXMuY3VyX21vdmVfZGlzdGFuY2U8dGhpcy5tYXhfbW92ZV9kaXN0YW5jZSl7XHJcbiAgICAgICAgICAgIGxldCBkaXN0YW5jZT1jYy52Mih4eCx5eSkubWFnKCk7XHJcbiAgICAgICAgICAgIHRoaXMuY3VyX21vdmVfZGlzdGFuY2UrPWRpc3RhbmNlO1xyXG4gICAgICAgICAgICBpZih0aGlzLmN1cl9tb3ZlX2Rpc3RhbmNlPj10aGlzLm1heF9tb3ZlX2Rpc3RhbmNlKXtcclxuICAgICAgICAgICAgICAgIHRoaXMuY29sbGlzaW9uX21vbnN0ZXJfY2FsbGJhY2sobnVsbCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgaWYodGhpcy5ub2RlLnk+Y2Mud2luU2l6ZS5oZWlnaHQpe1xyXG4gICAgICAgICAgICB0aGlzLmRlc3Ryb3lTZWxmKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmKE1hdGguYWJzKHRoaXMubm9kZS54KT5jYy53aW5TaXplLndpZHRoKXtcclxuICAgICAgICAgICAgdGhpcy5kZXN0cm95U2VsZigpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZih0aGlzLnR1b3dlaV9ub2RlKXtcclxuICAgICAgICAgICAgdGhpcy50dW93ZWlfbm9kZS5zZXRQb3NpdGlvbih0aGlzLmdldE5leHRQb3MoZHQpKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgZGVzdHJveVNlbGYoKVxyXG4gICAge1xyXG4gICAgICAgIGlmKHRoaXMudHVvd2VpX25vZGUpe1xyXG4gICAgICAgICAgICBjYy50d2Vlbih0aGlzLnR1b3dlaV9ub2RlKS5kZWxheSh0aGlzLnR1b3dlaV90aW1lKS5yZW1vdmVTZWxmKCkuc3RhcnQoKTtcclxuICAgICAgICAgICAgdGhpcy50dW93ZWlfbm9kZT1udWxsO1xyXG4gICAgICAgIH1cclxuICAgICAgICBHYW1lRWZmZWN0c01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5kZXN0cm95R2FtZUVmZmVjdEJ5SWQodGhpcy5nYW1lX2VmZmVjdF9pZCx0aGlzLm5vZGUpO1xyXG4gICAgfVxyXG5cclxuICAgIHNldERpcmVjdGlvbihkaXI6bnVtYmVyKVxyXG4gICAge1xyXG4gICAgICAgIHRoaXMubW92ZV9kaXJlY3Rpb249KGRpcitNYXRoLlBJKjIpJShNYXRoLlBJKjIpO1xyXG4gICAgICAgIHRoaXMubm9kZS5hbmdsZT0xODAqZGlyL01hdGguUEktdGhpcy5vZmZzZXRfeHhfYW5nbGU7XHJcbiAgICB9XHJcblxyXG4gICAgLy8vLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0t56Kw5pKe5byA5aeLLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gICAgb25Db2xsaXNpb25FbnRlcihvdGhlcjpjYy5Db2xsaWRlcixzZWxmOmNjLkNvbGxpZGVyKSB7XHJcbiAgICAgICAgbGV0IGdtPUdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCk7ICAgICAgICBcclxuICAgICAgICBpZihnbS5jdXJfZ2FtZV9zdGF0ZT09R2FtZVN0YXRlLkdhbWVfTG9zZSB8fCB0aGlzLmlzX2F0dD09dHJ1ZSlcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIGxldCBncm91cD1vdGhlci5ub2RlLmdyb3VwO1xyXG4gICAgICAgIHN3aXRjaChncm91cCl7XHJcbiAgICAgICAgICAgIGNhc2UgJ2VuZW15Jzp7XHJcbiAgICAgICAgICAgICAgICBpZih0aGlzLmNvbGxpc2lvbl9tb25zdGVyX2NhbGxiYWNrKXtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgbW9uc3RlclRzPW90aGVyLm5vZGUuZ2V0Q29tcG9uZW50KE1vbnN0ZXIpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaXNfYXR0PXRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYobW9uc3RlclRzKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmNvbGxpc2lvbl9tb25zdGVyX2NhbGxiYWNrKG1vbnN0ZXJUcyk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1icmVhaztcclxuICAgICAgICAgICAgLy8gY2FzZSBcImVuZW15X2Jsb2NrXCI6e1xyXG4gICAgICAgICAgICAvLyAgICAgdGhpcy5pc19hdHQ9dHJ1ZTtcclxuICAgICAgICAgICAgLy8gICAgIHRoaXMuZGVzdHJveVNlbGYoKTtcclxuICAgICAgICAgICAgLy8gICAgIC8vIGxldCBnakRhdGE9b3RoZXIubm9kZS5nZXRDb21wb25lbnQoR29uZ0ppKTtcclxuICAgICAgICAgICAgLy8gICAgIC8vIC8v5pys5qyh5Lyk5a6z55u05o6l5YeP5LykXHJcbiAgICAgICAgICAgIC8vICAgICAvLyBpZihnakRhdGEpe1xyXG4gICAgICAgICAgICAvLyAgICAgLy8gICAgIHRoaXMubW9uc3Rlcl90cy5qaWFuc2hhbmdfcmF0ZSs9dGhpcy5tb25zdGVyX3RzLnNraWxsX2RhdGEuZ2V0U2tpbGxWYWx1ZTEoMSk7XHJcbiAgICAgICAgICAgIC8vICAgICAvLyAgICAgdGhpcy5tb25zdGVyX3RzLmJlRmxhc2hJbmp1cmVkKGdqRGF0YS5nb25namlfZGF0YSk7XHJcbiAgICAgICAgICAgIC8vICAgICAvLyAgICAgdGhpcy5tb25zdGVyX3RzLmppYW5zaGFuZ19yYXRlLT10aGlzLm1vbnN0ZXJfdHMuc2tpbGxfZGF0YS5nZXRTa2lsbFZhbHVlMSgxKTtcclxuICAgICAgICAgICAgLy8gICAgIC8vICAgICAvL+ebtOaOpemUgOavgVxyXG4gICAgICAgICAgICAvLyAgICAgLy8gICAgIGdqRGF0YS5ub2RlLnJlbW92ZUZyb21QYXJlbnQoKTtcclxuICAgICAgICAgICAgLy8gICAgIC8vIH1cclxuICAgICAgICAgICAgLy8gfWJyZWFrO1xyXG4gICAgICAgICAgICAvLyBjYXNlICd3YWxsJzp7ICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAvLyAgICAgdGhpcy5jb2xsaXNpb25Ub1dhbGwob3RoZXIubm9kZS5uYW1lKTtcclxuICAgICAgICAgICAgLy8gfWJyZWFrO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG4iXX0=