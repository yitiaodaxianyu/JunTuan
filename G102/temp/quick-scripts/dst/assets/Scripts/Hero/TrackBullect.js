
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Scripts/Hero/TrackBullect.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '54e34dRAxNE0ZYKTu6VBW7z', 'TrackBullect');
// Scripts/Hero/TrackBullect.ts

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
var Monster_1 = require("../Monster/Monster");
var GameEffectsManager_1 = require("../Game/GameEffectsManager");
var GongJi_1 = require("./Game/GongJi");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var TrackBullect = /** @class */ (function (_super) {
    __extends(TrackBullect, _super);
    function TrackBullect() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        //目标
        _this.target_node = null;
        //目标位置
        _this.target_pos = cc.v2(0, 0);
        //移动速度
        _this.move_speed = 300;
        //移动方向
        _this.move_direction = Math.PI / 2;
        _this.follow_callback = null;
        _this.offset_xx_angle = 90;
        _this.game_effect_id = 0;
        return _this;
    }
    TrackBullect.prototype.init = function (gameEffectId, targetNode, speed, gjData, offsetAngle) {
        if (offsetAngle === void 0) { offsetAngle = 90; }
        _super.prototype.initData.call(this, gjData);
        this.game_effect_id = gameEffectId;
        this.target_node = targetNode;
        this.target_pos = targetNode.getComponent(Monster_1.default).getJuJiPos();
        var pi2 = Math.PI * 2;
        var offsetPos = this.target_pos.sub(this.node.getPosition());
        var dir = (Math.atan2(offsetPos.y, offsetPos.x) + pi2) % pi2;
        this.node.scale = 1;
        this.setDirection(dir);
        this.move_speed = speed;
        this.offset_xx_angle = offsetAngle;
        this.node.stopAllActions();
    };
    TrackBullect.prototype.addArriveListen = function (callback) {
        this.follow_callback = callback;
    };
    TrackBullect.prototype.update = function (dt) {
        if (GameManager_1.default.getInstance().cur_game_state != Constants_1.GameState.Game_Playing) {
            return;
        }
        //跟踪目标
        var sp = this.move_speed * dt;
        var disX = this.node.x;
        var disY = this.node.y;
        if (this.target_node) {
            var monsterTs = this.target_node.getComponent(Monster_1.default);
            this.target_pos = monsterTs.getJuJiPos();
            var offsetPos = this.target_pos.sub(this.node.getPosition());
            if (offsetPos.mag() < sp) {
                //中了
                if (this.follow_callback) {
                    this.follow_callback(monsterTs);
                }
            }
            else {
                var pi2 = Math.PI * 2;
                var dir = (Math.atan2(offsetPos.y, offsetPos.x) + pi2) % pi2;
                this.setDirection(dir);
                disX += sp * Math.cos(this.move_direction);
                disY += sp * Math.sin(this.move_direction);
            }
        }
        else {
            disX += sp * Math.cos(this.move_direction);
            disY += sp * Math.sin(this.move_direction);
            var offsetPos = this.target_pos.sub(this.node.getPosition());
            if (offsetPos.mag() < sp) {
                //消失
                this.destroySelf();
            }
        }
        this.node.x = disX;
        this.node.y = disY;
    };
    TrackBullect.prototype.setDirection = function (dir) {
        this.move_direction = dir;
        this.node.angle = 180 * dir / Math.PI - this.offset_xx_angle;
    };
    TrackBullect.prototype.destroySelf = function () {
        GameEffectsManager_1.GameEffectsManager.getInstance().destroyGameEffectById(this.game_effect_id, this.node);
    };
    TrackBullect = __decorate([
        ccclass
    ], TrackBullect);
    return TrackBullect;
}(GongJi_1.default));
exports.default = TrackBullect;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0c1xcSGVyb1xcVHJhY2tCdWxsZWN0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLDBDQUF5QztBQUN6Qyw4Q0FBeUM7QUFFekMsOENBQXlDO0FBQ3pDLGlFQUE4RTtBQUM5RSx3Q0FBbUM7QUFHN0IsSUFBQSxLQUFzQixFQUFFLENBQUMsVUFBVSxFQUFsQyxPQUFPLGFBQUEsRUFBRSxRQUFRLGNBQWlCLENBQUM7QUFHMUM7SUFBMEMsZ0NBQU07SUFBaEQ7UUFBQSxxRUF5RkM7UUF2RkcsSUFBSTtRQUNKLGlCQUFXLEdBQVMsSUFBSSxDQUFDO1FBQ3pCLE1BQU07UUFDTixnQkFBVSxHQUFTLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFDLENBQUMsQ0FBQyxDQUFDO1FBQzlCLE1BQU07UUFDTixnQkFBVSxHQUFRLEdBQUcsQ0FBQztRQUN0QixNQUFNO1FBQ04sb0JBQWMsR0FBUSxJQUFJLENBQUMsRUFBRSxHQUFDLENBQUMsQ0FBQztRQUNoQyxxQkFBZSxHQUFVLElBQUksQ0FBQztRQUM5QixxQkFBZSxHQUFRLEVBQUUsQ0FBQztRQUMxQixvQkFBYyxHQUFRLENBQUMsQ0FBQzs7SUE2RTVCLENBQUM7SUEzRUcsMkJBQUksR0FBSixVQUFNLFlBQXlCLEVBQUMsVUFBa0IsRUFBQyxLQUFZLEVBQUMsTUFBaUIsRUFBQyxXQUFxQjtRQUFyQiw0QkFBQSxFQUFBLGdCQUFxQjtRQUNuRyxpQkFBTSxRQUFRLFlBQUMsTUFBTSxDQUFDLENBQUM7UUFDdkIsSUFBSSxDQUFDLGNBQWMsR0FBQyxZQUFZLENBQUM7UUFDakMsSUFBSSxDQUFDLFdBQVcsR0FBQyxVQUFVLENBQUM7UUFDNUIsSUFBSSxDQUFDLFVBQVUsR0FBQyxVQUFVLENBQUMsWUFBWSxDQUFDLGlCQUFPLENBQUMsQ0FBQyxVQUFVLEVBQUUsQ0FBQztRQUM5RCxJQUFJLEdBQUcsR0FBQyxJQUFJLENB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QUFHLEVBQUUsR0FBQyxFQUFFLEVBQ3JCO2dCQUNJLElBQUk7Z0JBQ0osSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDO2FBQ3RCO1NBQ0o7UUFDRCxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsR0FBQyxJQUFJLENBQUM7UUFDakIsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLEdBQUMsSUFBSSxDQUFDO0lBQ3JCLENBQUM7SUFFRCxtQ0FBWSxHQUFaLFVBQWEsR0FBVTtRQUVuQixJQUFJLENBQUMsY0FBYyxHQUFDLEdBQUcsQ0FBQztRQUN4QixJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssR0FBQyxHQUFHLEdBQUMsR0FBRyxHQUFDLElBQUksQ0FBQyxFQUFFLEdBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQztJQUN6RCxDQUFDO0lBRUQsa0NBQVcsR0FBWDtRQUVJLHVDQUFrQixDQUFDLFdBQVcsRUFBRSxDQUFDLHFCQUFxQixDQUFDLElBQUksQ0FBQyxjQUFjLEVBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQzFGLENBQUM7SUF2RmdCLFlBQVk7UUFEaEMsT0FBTztPQUNhLFlBQVksQ0F5RmhDO0lBQUQsbUJBQUM7Q0F6RkQsQUF5RkMsQ0F6RnlDLGdCQUFNLEdBeUYvQztrQkF6Rm9CLFlBQVkiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBHYW1lU3RhdGUgfSBmcm9tIFwiLi4vQ29uc3RhbnRzXCI7XHJcbmltcG9ydCBHYW1lTWFuYWdlciBmcm9tIFwiLi4vR2FtZU1hbmFnZXJcIjtcclxuaW1wb3J0IHsgR29uZ0ppRGF0YSB9IGZyb20gXCIuL0RhdGEvSGVyb0RhdGFcIjtcclxuaW1wb3J0IE1vbnN0ZXIgZnJvbSBcIi4uL01vbnN0ZXIvTW9uc3RlclwiO1xyXG5pbXBvcnQgeyBHYW1lRWZmZWN0SWQsIEdhbWVFZmZlY3RzTWFuYWdlciB9IGZyb20gXCIuLi9HYW1lL0dhbWVFZmZlY3RzTWFuYWdlclwiO1xyXG5pbXBvcnQgR29uZ0ppIGZyb20gXCIuL0dhbWUvR29uZ0ppXCI7XHJcblxyXG5cclxuY29uc3Qge2NjY2xhc3MsIHByb3BlcnR5fSA9IGNjLl9kZWNvcmF0b3I7XHJcblxyXG5AY2NjbGFzc1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBUcmFja0J1bGxlY3QgZXh0ZW5kcyBHb25nSmkge1xyXG5cclxuICAgIC8v55uu5qCHXHJcbiAgICB0YXJnZXRfbm9kZTpjYy5Ob2RlPW51bGw7XHJcbiAgICAvL+ebruagh+S9jee9rlxyXG4gICAgdGFyZ2V0X3BvczpjYy5WZWMyPWNjLnYyKDAsMCk7XHJcbiAgICAvL+enu+WKqOmAn+W6plxyXG4gICAgbW92ZV9zcGVlZDpudW1iZXI9MzAwO1xyXG4gICAgLy/np7vliqjmlrnlkJFcclxuICAgIG1vdmVfZGlyZWN0aW9uOm51bWJlcj1NYXRoLlBJLzI7XHJcbiAgICBmb2xsb3dfY2FsbGJhY2s6RnVuY3Rpb249bnVsbDtcclxuICAgIG9mZnNldF94eF9hbmdsZTpudW1iZXI9OTA7XHJcbiAgICBnYW1lX2VmZmVjdF9pZDpudW1iZXI9MDsgICAgXHJcblxyXG4gICAgaW5pdCAoZ2FtZUVmZmVjdElkOkdhbWVFZmZlY3RJZCx0YXJnZXROb2RlOmNjLk5vZGUsc3BlZWQ6bnVtYmVyLGdqRGF0YTpHb25nSmlEYXRhLG9mZnNldEFuZ2xlOm51bWJlcj05MCkge1xyXG4gICAgICAgIHN1cGVyLmluaXREYXRhKGdqRGF0YSk7XHJcbiAgICAgICAgdGhpcy5nYW1lX2VmZmVjdF9pZD1nYW1lRWZmZWN0SWQ7XHJcbiAgICAgICAgdGhpcy50YXJnZXRfbm9kZT10YXJnZXROb2RlO1xyXG4gICAgICAgIHRoaXMudGFyZ2V0X3Bvcz10YXJnZXROb2RlLmdldENvbXBvbmVudChNb25zdGVyKS5nZXRKdUppUG9zKCk7XHJcbiAgICAgICAgbGV0IHBpMj1NYXRoLlBJKjI7XHJcbiAgICAgICAgbGV0IG9mZnNldFBvcz10aGlzLnRhcmdldF9wb3Muc3ViKHRoaXMubm9kZS5nZXRQb3NpdGlvbigpKTtcclxuICAgICAgICBsZXQgZGlyPShNYXRoLmF0YW4yKG9mZnNldFBvcy55LG9mZnNldFBvcy54KStwaTIpJXBpMjtcclxuICAgICAgICB0aGlzLm5vZGUuc2NhbGU9MTtcclxuICAgICAgICB0aGlzLnNldERpcmVjdGlvbihkaXIpO1xyXG4gICAgICAgIHRoaXMubW92ZV9zcGVlZD1zcGVlZDtcclxuICAgICAgICB0aGlzLm9mZnNldF94eF9hbmdsZT1vZmZzZXRBbmdsZTtcclxuICAgICAgICB0aGlzLm5vZGUuc3RvcEFsbEFjdGlvbnMoKTtcclxuICAgIH1cclxuXHJcbiAgICBhZGRBcnJpdmVMaXN0ZW4oY2FsbGJhY2s6RnVuY3Rpb24pe1xyXG4gICAgICAgIHRoaXMuZm9sbG93X2NhbGxiYWNrPWNhbGxiYWNrO1xyXG4gICAgfVxyXG5cclxuICAgIHVwZGF0ZShkdClcclxuICAgIHtcclxuICAgICAgICBpZihHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLmN1cl9nYW1lX3N0YXRlIT1HYW1lU3RhdGUuR2FtZV9QbGF5aW5nKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvL+i3n+i4quebruagh1xyXG4gICAgICAgIGxldCBzcD10aGlzLm1vdmVfc3BlZWQqZHQ7XHJcbiAgICAgICAgbGV0IGRpc1g9dGhpcy5ub2RlLng7XHJcbiAgICAgICAgbGV0IGRpc1k9dGhpcy5ub2RlLnk7XHJcbiAgICAgICAgaWYodGhpcy50YXJnZXRfbm9kZSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGxldCBtb25zdGVyVHM9dGhpcy50YXJnZXRfbm9kZS5nZXRDb21wb25lbnQoTW9uc3Rlcik7XHJcbiAgICAgICAgICAgIHRoaXMudGFyZ2V0X3Bvcz1tb25zdGVyVHMuZ2V0SnVKaVBvcygpO1xyXG4gICAgICAgICAgICBsZXQgb2Zmc2V0UG9zPXRoaXMudGFyZ2V0X3Bvcy5zdWIodGhpcy5ub2RlLmdldFBvc2l0aW9uKCkpO1xyXG4gICAgICAgICAgICBpZihvZmZzZXRQb3MubWFnKCk8c3ApXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIC8v5Lit5LqGXHJcbiAgICAgICAgICAgICAgICBpZih0aGlzLmZvbGxvd19jYWxsYmFjaylcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmZvbGxvd19jYWxsYmFjayhtb25zdGVyVHMpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9ZWxzZVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBsZXQgcGkyPU1hdGguUEkqMjtcclxuICAgICAgICAgICAgICAgIGxldCBkaXI9KE1hdGguYXRhbjIob2Zmc2V0UG9zLnksb2Zmc2V0UG9zLngpK3BpMiklcGkyO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zZXREaXJlY3Rpb24oZGlyKTtcclxuICAgICAgICAgICAgICAgIGRpc1grPXNwKk1hdGguY29zKHRoaXMubW92ZV9kaXJlY3Rpb24pO1xyXG4gICAgICAgICAgICAgICAgZGlzWSs9c3AqTWF0aC5zaW4odGhpcy5tb3ZlX2RpcmVjdGlvbik7XHJcbiAgICAgICAgICAgIH0gICAgICAgICAgICAgICAgXHJcbiAgICAgICAgfWVsc2VcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGRpc1grPXNwKk1hdGguY29zKHRoaXMubW92ZV9kaXJlY3Rpb24pO1xyXG4gICAgICAgICAgICBkaXNZKz1zcCpNYXRoLnNpbih0aGlzLm1vdmVfZGlyZWN0aW9uKTtcclxuICAgICAgICAgICAgbGV0IG9mZnNldFBvcz10aGlzLnRhcmdldF9wb3Muc3ViKHRoaXMubm9kZS5nZXRQb3NpdGlvbigpKTtcclxuICAgICAgICAgICAgaWYob2Zmc2V0UG9zLm1hZygpPHNwKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAvL+a2iOWksVxyXG4gICAgICAgICAgICAgICAgdGhpcy5kZXN0cm95U2VsZigpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSAgICAgICAgICAgIFxyXG4gICAgICAgIHRoaXMubm9kZS54PWRpc1g7XHJcbiAgICAgICAgdGhpcy5ub2RlLnk9ZGlzWTtcclxuICAgIH1cclxuXHJcbiAgICBzZXREaXJlY3Rpb24oZGlyOm51bWJlcilcclxuICAgIHtcclxuICAgICAgICB0aGlzLm1vdmVfZGlyZWN0aW9uPWRpcjtcclxuICAgICAgICB0aGlzLm5vZGUuYW5nbGU9MTgwKmRpci9NYXRoLlBJLXRoaXMub2Zmc2V0X3h4X2FuZ2xlO1xyXG4gICAgfVxyXG5cclxuICAgIGRlc3Ryb3lTZWxmKClcclxuICAgIHtcclxuICAgICAgICBHYW1lRWZmZWN0c01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5kZXN0cm95R2FtZUVmZmVjdEJ5SWQodGhpcy5nYW1lX2VmZmVjdF9pZCx0aGlzLm5vZGUpO1xyXG4gICAgfVxyXG5cclxufVxyXG4iXX0=