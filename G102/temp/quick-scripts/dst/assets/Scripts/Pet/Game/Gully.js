
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Scripts/Pet/Game/Gully.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'f6985tdhlNPLof43ERTUN/f', 'Gully');
// Scripts/Pet/Game/Gully.ts

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
var GongJi_1 = require("../../Hero/Game/GongJi");
var Monster_1 = require("../../Monster/Monster");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var Gully = /** @class */ (function (_super) {
    __extends(Gully, _super);
    function Gully() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.is_end = false;
        _this.game_effect_id = 0;
        _this.move_speed = 700;
        _this.move_direction = Math.PI / 2;
        _this.end_height = 1200;
        _this.destory_countdown = 2;
        _this.max_time = 2;
        _this.box_collision = null;
        return _this;
    }
    Gully.prototype.onLoad = function () {
        this.box_collision = this.node.getComponent(cc.BoxCollider);
    };
    Gully.prototype.init = function (gameEffectId, dir, gjData) {
        var _this = this;
        _super.prototype.initData.call(this, gjData);
        this.game_effect_id = gameEffectId;
        this.move_direction = dir;
        this.node.angle = 180 * dir / Math.PI - 90;
        this.destory_countdown = this.max_time;
        this.node.height = 0;
        this.is_end = false;
        this.node.opacity = 255;
        var animation = this.node.getComponent(cc.Animation);
        animation.play('e30191');
        this.box_collision.enabled = true;
        animation.on(cc.Animation.EventType.FINISHED, function () {
            _this.box_collision.enabled = false;
            animation.off(cc.Animation.EventType.FINISHED);
            animation.play('e30191_2');
            _this.scheduleOnce(function () {
                cc.tween(_this.node).to(0.4, { opacity: 64 }).start();
                animation.play('e30191_3');
                animation.on(cc.Animation.EventType.FINISHED, function () {
                    animation.off(cc.Animation.EventType.FINISHED);
                    _this.destroySelf();
                });
            }, 1);
        });
    };
    Gully.prototype.onCollisionEnter = function (other, self) {
        var gm = GameManager_1.default.getInstance();
        if (gm.cur_game_state == Constants_1.GameState.Game_Lose)
            return;
        var group = other.node.group;
        switch (group) {
            case 'enemy':
                {
                    var monsterTs = other.node.getComponent(Monster_1.default);
                    if (monsterTs.is_can_gully) {
                        var data = monsterTs.beFlashInjured(this.gongji_data);
                        if (data.getDamageNum() > 0) {
                            monsterTs.is_can_gully = false;
                        }
                    }
                }
                break;
        }
    };
    Gully.prototype.destroySelf = function () {
        GameEffectsManager_1.GameEffectsManager.getInstance().destroyGameEffectById(this.game_effect_id, this.node);
    };
    Gully = __decorate([
        ccclass
    ], Gully);
    return Gully;
}(GongJi_1.default));
exports.default = Gully;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0c1xcUGV0XFxHYW1lXFxHdWxseS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSw2Q0FBNEM7QUFDNUMsb0VBQWlGO0FBQ2pGLGlEQUE0QztBQUU1QyxpREFBNEM7QUFFNUMsaURBQTRDO0FBRXRDLElBQUEsS0FBc0IsRUFBRSxDQUFDLFVBQVUsRUFBbEMsT0FBTyxhQUFBLEVBQUUsUUFBUSxjQUFpQixDQUFDO0FBRzFDO0lBQW1DLHlCQUFNO0lBQXpDO1FBQUEscUVBa0VDO1FBaEVHLFlBQU0sR0FBUyxLQUFLLENBQUM7UUFDckIsb0JBQWMsR0FBUSxDQUFDLENBQUM7UUFDeEIsZ0JBQVUsR0FBUSxHQUFHLENBQUM7UUFDdEIsb0JBQWMsR0FBUSxJQUFJLENBQUMsRUFBRSxHQUFDLENBQUMsQ0FBQztRQUNoQyxnQkFBVSxHQUFRLElBQUksQ0FBQztRQUN2Qix1QkFBaUIsR0FBUSxDQUFDLENBQUM7UUFDM0IsY0FBUSxHQUFRLENBQUMsQ0FBQztRQUNsQixtQkFBYSxHQUFnQixJQUFJLENBQUM7O0lBeUR0QyxDQUFDO0lBdkRHLHNCQUFNLEdBQU47UUFDSSxJQUFJLENBQUMsYUFBYSxHQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLEVBQUUsQ0FBQyxXQUFXLENBQUMsQ0FBQztJQUM5RCxDQUFDO0lBRUQsb0JBQUksR0FBSixVQUFLLFlBQXlCLEVBQUMsR0FBVSxFQUFDLE1BQWlCO1FBQTNELGlCQXlCQztRQXhCRyxpQkFBTSxRQUFRLFlBQUMsTUFBTSxDQUFDLENBQUM7UUFDdkIsSUFBSSxDQUFDLGNBQWMsR0FBQyxZQUFZLENBQUM7UUFDakMsSUFBSSxDQUFDLGNBQWMsR0FBQyxHQUFHLENBQUM7UUFDeEIsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLEdBQUMsR0FBRyxHQUFDLEdBQUcsR0FBQyxJQUFJLENBQUMsRUFBRSxHQUFDLEVBQUUs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ImltcG9ydCB7IEdhbWVTdGF0ZSB9IGZyb20gXCIuLi8uLi9Db25zdGFudHNcIjtcclxuaW1wb3J0IHsgR2FtZUVmZmVjdElkLCBHYW1lRWZmZWN0c01hbmFnZXIgfSBmcm9tIFwiLi4vLi4vR2FtZS9HYW1lRWZmZWN0c01hbmFnZXJcIjtcclxuaW1wb3J0IEdhbWVNYW5hZ2VyIGZyb20gXCIuLi8uLi9HYW1lTWFuYWdlclwiO1xyXG5pbXBvcnQgeyBHb25nSmlEYXRhIH0gZnJvbSBcIi4uLy4uL0hlcm8vRGF0YS9IZXJvRGF0YVwiO1xyXG5pbXBvcnQgR29uZ0ppIGZyb20gXCIuLi8uLi9IZXJvL0dhbWUvR29uZ0ppXCI7XHJcblxyXG5pbXBvcnQgTW9uc3RlciBmcm9tIFwiLi4vLi4vTW9uc3Rlci9Nb25zdGVyXCI7XHJcblxyXG5jb25zdCB7Y2NjbGFzcywgcHJvcGVydHl9ID0gY2MuX2RlY29yYXRvcjtcclxuXHJcbkBjY2NsYXNzXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEd1bGx5IGV4dGVuZHMgR29uZ0ppIHtcclxuXHJcbiAgICBpc19lbmQ6Ym9vbGVhbj1mYWxzZTtcclxuICAgIGdhbWVfZWZmZWN0X2lkOm51bWJlcj0wO1xyXG4gICAgbW92ZV9zcGVlZDpudW1iZXI9NzAwO1xyXG4gICAgbW92ZV9kaXJlY3Rpb246bnVtYmVyPU1hdGguUEkvMjtcclxuICAgIGVuZF9oZWlnaHQ6bnVtYmVyPTEyMDA7XHJcbiAgICBkZXN0b3J5X2NvdW50ZG93bjpudW1iZXI9MjtcclxuICAgIG1heF90aW1lOm51bWJlcj0yO1xyXG4gICAgYm94X2NvbGxpc2lvbjpjYy5Cb3hDb2xsaWRlcj1udWxsO1xyXG5cclxuICAgIG9uTG9hZCgpe1xyXG4gICAgICAgIHRoaXMuYm94X2NvbGxpc2lvbj10aGlzLm5vZGUuZ2V0Q29tcG9uZW50KGNjLkJveENvbGxpZGVyKTtcclxuICAgIH1cclxuXHJcbiAgICBpbml0KGdhbWVFZmZlY3RJZDpHYW1lRWZmZWN0SWQsZGlyOm51bWJlcixnakRhdGE6R29uZ0ppRGF0YSl7XHJcbiAgICAgICAgc3VwZXIuaW5pdERhdGEoZ2pEYXRhKTtcclxuICAgICAgICB0aGlzLmdhbWVfZWZmZWN0X2lkPWdhbWVFZmZlY3RJZDtcclxuICAgICAgICB0aGlzLm1vdmVfZGlyZWN0aW9uPWRpcjtcclxuICAgICAgICB0aGlzLm5vZGUuYW5nbGU9MTgwKmRpci9NYXRoLlBJLTkwO1xyXG4gICAgICAgIHRoaXMuZGVzdG9yeV9jb3VudGRvd249dGhpcy5tYXhfdGltZTtcclxuICAgICAgICB0aGlzLm5vZGUuaGVpZ2h0PTA7XHJcbiAgICAgICAgdGhpcy5pc19lbmQ9ZmFsc2U7XHJcbiAgICAgICAgdGhpcy5ub2RlLm9wYWNpdHk9MjU1O1xyXG4gICAgICAgIGxldCBhbmltYXRpb249dGhpcy5ub2RlLmdldENvbXBvbmVudChjYy5BbmltYXRpb24pO1xyXG4gICAgICAgIGFuaW1hdGlvbi5wbGF5KCdlMzAxOTEnKTtcclxuICAgICAgICB0aGlzLmJveF9jb2xsaXNpb24uZW5hYmxlZD10cnVlO1xyXG4gICAgICAgIGFuaW1hdGlvbi5vbihjYy5BbmltYXRpb24uRXZlbnRUeXBlLkZJTklTSEVELCgpPT57XHJcbiAgICAgICAgICAgIHRoaXMuYm94X2NvbGxpc2lvbi5lbmFibGVkPWZhbHNlO1xyXG4gICAgICAgICAgICBhbmltYXRpb24ub2ZmKGNjLkFuaW1hdGlvbi5FdmVudFR5cGUuRklOSVNIRUQpO1xyXG4gICAgICAgICAgICBhbmltYXRpb24ucGxheSgnZTMwMTkxXzInKTsgICAgICAgICAgICBcclxuICAgICAgICAgICAgdGhpcy5zY2hlZHVsZU9uY2UoKCk9PntcclxuICAgICAgICAgICAgICAgIGNjLnR3ZWVuKHRoaXMubm9kZSkudG8oMC40LHtvcGFjaXR5OjY0fSkuc3RhcnQoKTtcclxuICAgICAgICAgICAgICAgIGFuaW1hdGlvbi5wbGF5KCdlMzAxOTFfMycpO1xyXG4gICAgICAgICAgICAgICAgYW5pbWF0aW9uLm9uKGNjLkFuaW1hdGlvbi5FdmVudFR5cGUuRklOSVNIRUQsKCk9PntcclxuICAgICAgICAgICAgICAgICAgICBhbmltYXRpb24ub2ZmKGNjLkFuaW1hdGlvbi5FdmVudFR5cGUuRklOSVNIRUQpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZGVzdHJveVNlbGYoKTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9LDEpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIG9uQ29sbGlzaW9uRW50ZXIob3RoZXI6Y2MuQ29sbGlkZXIsc2VsZjpjYy5Db2xsaWRlcikge1xyXG4gICAgICAgIGxldCBnbT1HYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpOyAgICAgICAgXHJcbiAgICAgICAgaWYoZ20uY3VyX2dhbWVfc3RhdGU9PUdhbWVTdGF0ZS5HYW1lX0xvc2UgKVxyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgbGV0IGdyb3VwPW90aGVyLm5vZGUuZ3JvdXA7XHJcbiAgICAgICAgc3dpdGNoKGdyb3VwKXtcclxuICAgICAgICAgICAgY2FzZSAnZW5lbXknOnsgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICBsZXQgbW9uc3RlclRzPW90aGVyLm5vZGUuZ2V0Q29tcG9uZW50KE1vbnN0ZXIpO1xyXG4gICAgICAgICAgICAgICAgaWYobW9uc3RlclRzLmlzX2Nhbl9ndWxseSl7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IGRhdGE9bW9uc3RlclRzLmJlRmxhc2hJbmp1cmVkKHRoaXMuZ29uZ2ppX2RhdGEpO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmKGRhdGEuZ2V0RGFtYWdlTnVtKCk+MCl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG1vbnN0ZXJUcy5pc19jYW5fZ3VsbHk9ZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9YnJlYWs7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuXHJcbiAgICBkZXN0cm95U2VsZigpXHJcbiAgICB7XHJcbiAgICAgICAgR2FtZUVmZmVjdHNNYW5hZ2VyLmdldEluc3RhbmNlKCkuZGVzdHJveUdhbWVFZmZlY3RCeUlkKHRoaXMuZ2FtZV9lZmZlY3RfaWQsdGhpcy5ub2RlKTtcclxuICAgIH1cclxuXHJcbn1cclxuIl19