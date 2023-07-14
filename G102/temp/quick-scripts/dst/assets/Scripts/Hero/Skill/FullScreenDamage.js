
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Scripts/Hero/Skill/FullScreenDamage.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'df3edphGL5JErmEGwRpdp1l', 'FullScreenDamage');
// Scripts/Hero/Skill/FullScreenDamage.ts

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
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var FullScreenDamage = /** @class */ (function (_super) {
    __extends(FullScreenDamage, _super);
    function FullScreenDamage() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        /**伤害间隔 */
        _this.damage_jiange = 0;
        /**伤害计数 */
        _this.damage_jishu = 0;
        /**特效 */
        _this.game_effect_id = 0;
        /**伤害监听回调 */
        _this.damage_callback = null;
        /**动画组件 */
        _this.animation = null;
        return _this;
    }
    FullScreenDamage.prototype.init = function (gameEffectId, damageJiange, damageCallback) {
        this.game_effect_id = gameEffectId;
        this.damage_jiange = damageJiange;
        this.damage_jishu = 0;
        this.damage_callback = damageCallback;
        this.node.opacity = 255;
        this.animation = this.node.getComponent(cc.Animation);
        this.checkDamage();
    };
    FullScreenDamage.prototype.destroySelf = function () {
        GameEffectsManager_1.GameEffectsManager.getInstance().destroyGameEffectById(this.game_effect_id, this.node);
    };
    FullScreenDamage.prototype.checkDamage = function () {
        var _this = this;
        //播放特效
        this.node.opacity = 255;
        this.animation.play();
        this.animation.on(cc.Animation.EventType.FINISHED, function () {
            _this.animation.off(cc.Animation.EventType.FINISHED);
            _this.node.opacity = 0;
        });
        if (this.damage_callback) {
            this.damage_callback();
        }
    };
    FullScreenDamage.prototype.update = function (dt) {
        if (GameManager_1.default.getInstance().cur_game_state != Constants_1.GameState.Game_Playing) {
            return;
        }
        this.damage_jishu += dt;
        if (this.damage_jishu >= this.damage_jiange) {
            this.damage_jishu = 0;
            this.checkDamage();
        }
    };
    FullScreenDamage = __decorate([
        ccclass
    ], FullScreenDamage);
    return FullScreenDamage;
}(cc.Component));
exports.default = FullScreenDamage;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0c1xcSGVyb1xcU2tpbGxcXEZ1bGxTY3JlZW5EYW1hZ2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsNkNBQTRDO0FBQzVDLG9FQUFpRjtBQUNqRixpREFBNEM7QUFJdEMsSUFBQSxLQUFzQixFQUFFLENBQUMsVUFBVSxFQUFsQyxPQUFPLGFBQUEsRUFBRSxRQUFRLGNBQWlCLENBQUM7QUFHMUM7SUFBOEMsb0NBQVk7SUFBMUQ7UUFBQSxxRUFrREM7UUFoREcsVUFBVTtRQUNWLG1CQUFhLEdBQVEsQ0FBQyxDQUFDO1FBQ3ZCLFVBQVU7UUFDVixrQkFBWSxHQUFRLENBQUMsQ0FBQztRQUN0QixRQUFRO1FBQ1Isb0JBQWMsR0FBUSxDQUFDLENBQUM7UUFDeEIsWUFBWTtRQUNaLHFCQUFlLEdBQVUsSUFBSSxDQUFDO1FBQzlCLFVBQVU7UUFDVixlQUFTLEdBQWMsSUFBSSxDQUFDOztJQXVDaEMsQ0FBQztJQXJDRywrQkFBSSxHQUFKLFVBQUssWUFBeUIsRUFBQyxZQUFtQixFQUFDLGNBQXVCO1FBQ3RFLElBQUksQ0FBQyxjQUFjLEdBQUMsWUFBWSxDQUFDO1FBQ2pDLElBQUksQ0FBQyxhQUFhLEdBQUMsWUFBWSxDQUFDO1FBQ2hDLElBQUksQ0FBQyxZQUFZLEdBQUMsQ0FBQyxDQUFDO1FBQ3BCLElBQUksQ0FBQyxlQUFlLEdBQUMsY0FBYyxDQUFDO1FBQ3BDLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxHQUFDLEdBQUcsQ0FBQztRQUN0QixJQUFJLENBQUMsU0FBUyxHQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLEVBQUUsQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUNwRCxJQUFJLENBQUMsV0FBVyxFQUFFLENBQUM7SUFDdkIsQ0FBQztJQUVELHNDQUFXLEdBQVg7UUFDSSx1Q0FBa0IsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxxQkFBcUIsQ0FBQyxJQUFJLENBQUMsY0FBYyxFQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUMxRixDQUFDO0lBRUQsc0NBQVcsR0FBWDtRQUFBLGlCQVdDO1FBVkcsTUFBTTtRQUNOLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxHQUFDLEdBQUcsQ0FBQztRQUN0QixJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksRUFBRSxDQUFDO1FBQ3RCLElBQUksQ0FBQyxTQUFTLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxTQUFTLENBQUMsU0FBUyxDQUFDLFFBQVEsRUFBQztZQUM5QyxLQUFJLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsU0FBUyxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsQ0FBQztZQUNwRCxLQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sR0FBQyxDQUFDLENBQUM7UUFDeEIsQ0FBQyxDQUFDLENBQUE7UUFDRixJQUFHLElBQUksQ0FBQyxlQUFlLEVBQUM7WUFDcEIsSUFBSSxDQUFDLGVBQWUsRUFBRSxDQUFDO1NBQzFCO0lBQ0wsQ0FBQztJQUVELGlDQUFNLEdBQU4sVUFBUSxFQUFTO1FBQ2IsSUFBRyxxQkFBVyxDQUFDLFdBQVcsRUFBRSxDQUFDLGNBQWMsSUFBRSxxQkFBUyxDQUFDLFlBQVksRUFBQztZQUNoRSxPQUFPO1NBQ1Y7UUFDRCxJQUFJLENBQUMsWUFBWSxJQUFFLEVBQUUsQ0FBQztRQUN0QixJQUFHLElBQUksQ0FBQyxZQUFZLElBQUUsSUFBSSxDQUFDLGFBQWEsRUFBQztZQUNyQyxJQUFJLENBQUMsWUFBWSxHQUFDLENBQUMsQ0FBQztZQUNwQixJQUFJLENBQUMsV0FBVyxFQUFFLENBQUM7U0FDdEI7SUFDTCxDQUFDO0lBakRnQixnQkFBZ0I7UUFEcEMsT0FBTztPQUNhLGdCQUFnQixDQWtEcEM7SUFBRCx1QkFBQztDQWxERCxBQWtEQyxDQWxENkMsRUFBRSxDQUFDLFNBQVMsR0FrRHpEO2tCQWxEb0IsZ0JBQWdCIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgR2FtZVN0YXRlIH0gZnJvbSBcIi4uLy4uL0NvbnN0YW50c1wiO1xyXG5pbXBvcnQgeyBHYW1lRWZmZWN0SWQsIEdhbWVFZmZlY3RzTWFuYWdlciB9IGZyb20gXCIuLi8uLi9HYW1lL0dhbWVFZmZlY3RzTWFuYWdlclwiO1xyXG5pbXBvcnQgR2FtZU1hbmFnZXIgZnJvbSBcIi4uLy4uL0dhbWVNYW5hZ2VyXCI7XHJcblxyXG5cclxuXHJcbmNvbnN0IHtjY2NsYXNzLCBwcm9wZXJ0eX0gPSBjYy5fZGVjb3JhdG9yO1xyXG5cclxuQGNjY2xhc3NcclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRnVsbFNjcmVlbkRhbWFnZSBleHRlbmRzIGNjLkNvbXBvbmVudCB7XHJcblxyXG4gICAgLyoq5Lyk5a6z6Ze06ZqUICovXHJcbiAgICBkYW1hZ2VfamlhbmdlOm51bWJlcj0wO1xyXG4gICAgLyoq5Lyk5a6z6K6h5pWwICovXHJcbiAgICBkYW1hZ2VfamlzaHU6bnVtYmVyPTA7XHJcbiAgICAvKirnibnmlYggKi9cclxuICAgIGdhbWVfZWZmZWN0X2lkOm51bWJlcj0wO1xyXG4gICAgLyoq5Lyk5a6z55uR5ZCs5Zue6LCDICovXHJcbiAgICBkYW1hZ2VfY2FsbGJhY2s6RnVuY3Rpb249bnVsbDtcclxuICAgIC8qKuWKqOeUu+e7hOS7tiAqL1xyXG4gICAgYW5pbWF0aW9uOmNjLkFuaW1hdGlvbj1udWxsO1xyXG5cclxuICAgIGluaXQoZ2FtZUVmZmVjdElkOkdhbWVFZmZlY3RJZCxkYW1hZ2VKaWFuZ2U6bnVtYmVyLGRhbWFnZUNhbGxiYWNrOkZ1bmN0aW9uKXtcclxuICAgICAgICB0aGlzLmdhbWVfZWZmZWN0X2lkPWdhbWVFZmZlY3RJZDtcclxuICAgICAgICB0aGlzLmRhbWFnZV9qaWFuZ2U9ZGFtYWdlSmlhbmdlO1xyXG4gICAgICAgIHRoaXMuZGFtYWdlX2ppc2h1PTA7XHJcbiAgICAgICAgdGhpcy5kYW1hZ2VfY2FsbGJhY2s9ZGFtYWdlQ2FsbGJhY2s7XHJcbiAgICAgICAgdGhpcy5ub2RlLm9wYWNpdHk9MjU1O1xyXG4gICAgICAgIHRoaXMuYW5pbWF0aW9uPXRoaXMubm9kZS5nZXRDb21wb25lbnQoY2MuQW5pbWF0aW9uKTtcclxuICAgICAgICB0aGlzLmNoZWNrRGFtYWdlKCk7XHJcbiAgICB9XHJcblxyXG4gICAgZGVzdHJveVNlbGYoKXtcclxuICAgICAgICBHYW1lRWZmZWN0c01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5kZXN0cm95R2FtZUVmZmVjdEJ5SWQodGhpcy5nYW1lX2VmZmVjdF9pZCx0aGlzLm5vZGUpO1xyXG4gICAgfVxyXG5cclxuICAgIGNoZWNrRGFtYWdlKCl7XHJcbiAgICAgICAgLy/mkq3mlL7nibnmlYhcclxuICAgICAgICB0aGlzLm5vZGUub3BhY2l0eT0yNTU7XHJcbiAgICAgICAgdGhpcy5hbmltYXRpb24ucGxheSgpO1xyXG4gICAgICAgIHRoaXMuYW5pbWF0aW9uLm9uKGNjLkFuaW1hdGlvbi5FdmVudFR5cGUuRklOSVNIRUQsKCk9PnsgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICB0aGlzLmFuaW1hdGlvbi5vZmYoY2MuQW5pbWF0aW9uLkV2ZW50VHlwZS5GSU5JU0hFRCk7XHJcbiAgICAgICAgICAgIHRoaXMubm9kZS5vcGFjaXR5PTA7XHJcbiAgICAgICAgfSlcclxuICAgICAgICBpZih0aGlzLmRhbWFnZV9jYWxsYmFjayl7XHJcbiAgICAgICAgICAgIHRoaXMuZGFtYWdlX2NhbGxiYWNrKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHVwZGF0ZSAoZHQ6bnVtYmVyKSB7XHJcbiAgICAgICAgaWYoR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5jdXJfZ2FtZV9zdGF0ZSE9R2FtZVN0YXRlLkdhbWVfUGxheWluZyl7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5kYW1hZ2VfamlzaHUrPWR0O1xyXG4gICAgICAgIGlmKHRoaXMuZGFtYWdlX2ppc2h1Pj10aGlzLmRhbWFnZV9qaWFuZ2Upe1xyXG4gICAgICAgICAgICB0aGlzLmRhbWFnZV9qaXNodT0wO1xyXG4gICAgICAgICAgICB0aGlzLmNoZWNrRGFtYWdlKCk7XHJcbiAgICAgICAgfSAgICBcclxuICAgIH1cclxufVxyXG4iXX0=