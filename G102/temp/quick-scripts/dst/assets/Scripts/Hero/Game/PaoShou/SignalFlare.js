
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Scripts/Hero/Game/PaoShou/SignalFlare.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '11b21o3Em5Kx5+OlbieOXm7', 'SignalFlare');
// Scripts/Hero/Game/PaoShou/SignalFlare.ts

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
var Constants_1 = require("../../../Constants");
var GameEffectsManager_1 = require("../../../Game/GameEffectsManager");
var GameManager_1 = require("../../../GameManager");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var SignalFlare = /** @class */ (function (_super) {
    __extends(SignalFlare, _super);
    function SignalFlare() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.tuowei = null;
        _this.game_effect_id = GameEffectsManager_1.GameEffectId.Null;
        _this.move_speed = 700;
        _this.move_direction = Math.PI / 2;
        _this.bomb_size = 100;
        //目标地点，到达后爆炸
        _this.target_pos = null;
        _this.tuo_wei = null;
        _this.prev_pos = cc.v2(0, 0);
        /**蔓延特效 */
        _this.spread_time = 0.2;
        /**蔓延位置 */
        _this.spread_pos = [];
        _this.end_callback = null;
        /**是否到达目的地 */
        _this.is_arrive = false;
        return _this;
    }
    SignalFlare.prototype.init = function (id, speed, targetPos, endCallback) {
        this.game_effect_id = id;
        this.move_speed = speed;
        this.target_pos = targetPos;
        this.end_callback = endCallback;
        var offsetPos = targetPos.sub(this.node.getPosition());
        this.move_direction = Math.atan2(offsetPos.y, offsetPos.x);
        //距离
        var distance = offsetPos.mag();
        var sp = this.move_speed / GameManager_1.default.getInstance().getGameRate();
        this.spread_time = 0.02 * GameManager_1.default.getInstance().getGameRate();
        var jtTime = distance / sp / GameManager_1.default.getInstance().getGameRate();
        ;
        this.node.scale = 0.5;
        cc.tween(this.node).then(cc.spawn(cc.sequence(cc.scaleTo(jtTime / 4, 1.1), cc.scaleTo(jtTime * 3 / 4, 0.8)), cc.jumpTo(jtTime, targetPos, distance / 2, 1))).call(this.destroySelf, this).start();
        this.tuo_wei = cc.instantiate(this.tuowei);
        this.tuo_wei.parent = this.node.parent;
        this.node.zIndex = 2;
        this.prev_pos = this.node.getPosition();
        var ms = this.tuo_wei.getComponent(cc.MotionStreak);
        ms.fadeTime = ms.fadeTime * GameManager_1.default.getInstance().getGameRate();
        this.spread_pos = new Array(4);
        var len = this.spread_pos.length;
        for (var i = 0; i < len; i++) {
            this.spread_pos[i] = this.node.getPosition();
        }
        this.is_arrive = false;
    };
    SignalFlare.prototype.destroySelf = function () {
        var _this = this;
        if (this.tuo_wei) {
            cc.tween(this.tuo_wei).delay(this.tuo_wei.getComponent(cc.MotionStreak).fadeTime / (10 * GameManager_1.default.getInstance().getGameRate()))
                .to(0.1, { opacity: 0 })
                .removeSelf().start();
        }
        this.spread_time = 0.6;
        if (this.end_callback) {
            this.end_callback();
        }
        //GameManager.getInstance().sound_manager.playSound(SoundIndex.boom2);
        this.node.zIndex = 2;
        this.is_arrive = true;
        var miaozhun = GameEffectsManager_1.GameEffectsManager.getInstance().createGameEffectForParent(GameEffectsManager_1.GameEffectId.paoshou_dazhao_xinhaodan_miaozhun, this.node.getPosition(), this.node.parent);
        miaozhun.getComponent(sp.Skeleton).setAnimation(0, 'Skill_MiaoZhun', false);
        miaozhun.zIndex = 0;
        var end = GameEffectsManager_1.GameEffectsManager.getInstance().createGameEffectForParent(GameEffectsManager_1.GameEffectId.paoshou_dazhao_weiyan_end, this.node.getPosition(), this.node.parent);
        end.zIndex = 1;
        end.opacity = 255;
        end.getComponent(sp.Skeleton).setAnimation(0, 'Skill_WeiYan', false);
        cc.tween(end).to(1.3, { opacity: 88 }).start();
        cc.tween(this.node).to(1.3, { opacity: 168 }).call(function () {
            GameEffectsManager_1.GameEffectsManager.getInstance().destroyGameEffectById(_this.game_effect_id, _this.node);
            GameEffectsManager_1.GameEffectsManager.getInstance().destroyGameEffectById(GameEffectsManager_1.GameEffectId.paoshou_dazhao_xinhaodan_miaozhun, miaozhun);
            GameEffectsManager_1.GameEffectsManager.getInstance().destroyGameEffectById(GameEffectsManager_1.GameEffectId.paoshou_dazhao_weiyan_end, end);
        }).start();
    };
    SignalFlare.prototype.setDirection = function (dir) {
        this.move_direction = dir;
        //this.node.angle=180*dir/Math.PI;
    };
    SignalFlare.prototype.createSpread = function () {
        var node = GameEffectsManager_1.GameEffectsManager.getInstance().createGameEffectForParent(GameEffectsManager_1.GameEffectId.paoshou_dazhao_weiyan, this.spread_pos[this.getPosIndex()], this.node.parent);
        var anima = node.getComponent(cc.Animation);
        var state = anima.play();
        state.speed = 1 / GameManager_1.default.getInstance().getGameRate();
        anima.on(cc.Animation.EventType.FINISHED, function () {
            GameEffectsManager_1.GameEffectsManager.getInstance().destroyGameEffectById(GameEffectsManager_1.GameEffectId.paoshou_dazhao_weiyan, node);
        }, this);
        node.zIndex = 3;
        node.angle = Math.random() * 360;
        node.scale = Math.random() * 0.5 + 0.8;
    };
    SignalFlare.prototype.createEndSpread = function () {
    };
    SignalFlare.prototype.getPosIndex = function () {
        var maxCL = this.spread_pos.length - 1;
        var index = Math.floor(this.spread_pos.length / GameManager_1.default.getInstance().getGameRate());
        if (index >= maxCL) {
            index = maxCL;
        }
        return index;
    };
    SignalFlare.prototype.update = function (dt) {
        if (GameManager_1.default.getInstance().cur_game_state != Constants_1.GameState.Game_Playing)
            return;
        if (this.tuowei != null) {
            var gr = GameManager_1.default.getInstance().getGameRate();
            if (gr < 1) {
                gr = 1;
            }
            //添加在子弹前面           
            var pos = this.node.getPosition();
            var offsetPos = pos.sub(this.prev_pos);
            var distance = offsetPos.mag() * 4 / gr;
            var dir = Math.atan2(offsetPos.y, offsetPos.x);
            var xx = pos.x + Math.cos(dir) * distance;
            var yy = pos.y + Math.sin(dir) * distance;
            this.tuo_wei.setPosition(cc.v2(xx, yy));
            this.prev_pos = this.node.getPosition();
            this.spread_time -= dt;
            this.update_locus_shadow();
            if (this.spread_time <= 0) {
                this.spread_time = 0.02 * GameManager_1.default.getInstance().getGameRate();
                if (this.is_arrive == false) {
                    this.createSpread();
                }
            }
        }
    };
    SignalFlare.prototype.update_locus_shadow = function () {
        if (this.is_arrive == false) {
            //加入头部
            this.spread_pos.unshift(this.node.getPosition());
            //删除尾部
            this.spread_pos.pop();
        }
    };
    __decorate([
        property({ type: cc.Prefab })
    ], SignalFlare.prototype, "tuowei", void 0);
    SignalFlare = __decorate([
        ccclass
    ], SignalFlare);
    return SignalFlare;
}(cc.Component));
exports.default = SignalFlare;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0c1xcSGVyb1xcR2FtZVxcUGFvU2hvdVxcU2lnbmFsRmxhcmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsZ0RBQStDO0FBQy9DLHVFQUFvRjtBQUNwRixvREFBK0M7QUFJekMsSUFBQSxLQUFzQixFQUFFLENBQUMsVUFBVSxFQUFsQyxPQUFPLGFBQUEsRUFBRSxRQUFRLGNBQWlCLENBQUM7QUFHMUM7SUFBeUMsK0JBQVk7SUFBckQ7UUFBQSxxRUEySkM7UUF4SkcsWUFBTSxHQUFXLElBQUksQ0FBQztRQUV0QixvQkFBYyxHQUFjLGlDQUFZLENBQUMsSUFBSSxDQUFDO1FBQzlDLGdCQUFVLEdBQVEsR0FBRyxDQUFDO1FBQ3RCLG9CQUFjLEdBQVEsSUFBSSxDQUFDLEVBQUUsR0FBQyxDQUFDLENBQUM7UUFFaEMsZUFBUyxHQUFRLEdBQUcsQ0FBQztRQUNyQixZQUFZO1FBQ1osZ0JBQVUsR0FBUyxJQUFJLENBQUM7UUFFeEIsYUFBTyxHQUFTLElBQUksQ0FBQztRQUNyQixjQUFRLEdBQVMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxDQUFDLENBQUM7UUFDNUIsVUFBVTtRQUNWLGlCQUFXLEdBQVEsR0FBRyxDQUFDO1FBQ3ZCLFVBQVU7UUFDVixnQkFBVSxHQUFXLEVBQUUsQ0FBQztRQUN4QixrQkFBWSxHQUFVLElBQUksQ0FBQztRQUMzQixhQUFhO1FBQ2IsZUFBUyxHQUFTLEtBQUssQ0FBQzs7SUFzSTVCLENBQUM7SUFwSUcsMEJBQUksR0FBSixVQUFLLEVBQWUsRUFBQyxLQUFZLEVBQUMsU0FBaUIsRUFBQyxXQUFvQjtRQUVwRSxJQUFJLENBQUMsY0FBYyxHQUFDLEVBQUUsQ0FBQztRQUN2QixJQUFJLENBQUMsVUFBVSxHQUFDLEtBQUssQ0FBQztRQUN0QixJQUFJLENBQUMsVUFBVSxHQUFDLFNBQVMsQ0FBQztRQUMxQixJQUFJLENB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SUFBRSxDQUFDLEVBQUM7Z0JBQ25CLElBQUksQ0FBQyxXQUFXLEdBQUMsSUFBSSxHQUFDLHFCQUFXLENBQUMsV0FBVyxFQUFFLENBQUMsV0FBVyxFQUFFLENBQUM7Z0JBQzlELElBQUcsSUFBSSxDQUFDLFNBQVMsSUFBRSxLQUFLLEVBQUM7b0JBQ3JCLElBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQztpQkFDdkI7YUFDSjtTQUNKO0lBQ0wsQ0FBQztJQUVELHlDQUFtQixHQUFuQjtRQUVJLElBQUcsSUFBSSxDQUFDLFNBQVMsSUFBRSxLQUFLLEVBQUM7WUFDckIsTUFBTTtZQUNOLElBQUksQ0FBQyxVQUFVLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsV0FBVyxFQUFFLENBQUMsQ0FBQztZQUNqRCxNQUFNO1lBQ04sSUFBSSxDQUFDLFVBQVUsQ0FBQyxHQUFHLEVBQUUsQ0FBQztTQUN6QjtJQUVMLENBQUM7SUF2SkQ7UUFEQyxRQUFRLENBQUMsRUFBQyxJQUFJLEVBQUMsRUFBRSxDQUFDLE1BQU0sRUFBQyxDQUFDOytDQUNMO0lBSEwsV0FBVztRQUQvQixPQUFPO09BQ2EsV0FBVyxDQTJKL0I7SUFBRCxrQkFBQztDQTNKRCxBQTJKQyxDQTNKd0MsRUFBRSxDQUFDLFNBQVMsR0EySnBEO2tCQTNKb0IsV0FBVyIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEdhbWVTdGF0ZSB9IGZyb20gXCIuLi8uLi8uLi9Db25zdGFudHNcIjtcclxuaW1wb3J0IHsgR2FtZUVmZmVjdElkLCBHYW1lRWZmZWN0c01hbmFnZXIgfSBmcm9tIFwiLi4vLi4vLi4vR2FtZS9HYW1lRWZmZWN0c01hbmFnZXJcIjtcclxuaW1wb3J0IEdhbWVNYW5hZ2VyIGZyb20gXCIuLi8uLi8uLi9HYW1lTWFuYWdlclwiO1xyXG5cclxuXHJcblxyXG5jb25zdCB7Y2NjbGFzcywgcHJvcGVydHl9ID0gY2MuX2RlY29yYXRvcjtcclxuXHJcbkBjY2NsYXNzXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFNpZ25hbEZsYXJlIGV4dGVuZHMgY2MuQ29tcG9uZW50IHtcclxuXHJcbiAgICBAcHJvcGVydHkoe3R5cGU6Y2MuUHJlZmFifSlcclxuICAgIHR1b3dlaTpjYy5QcmVmYWI9bnVsbDtcclxuXHJcbiAgICBnYW1lX2VmZmVjdF9pZDpHYW1lRWZmZWN0SWQ9R2FtZUVmZmVjdElkLk51bGw7XHJcbiAgICBtb3ZlX3NwZWVkOm51bWJlcj03MDA7XHJcbiAgICBtb3ZlX2RpcmVjdGlvbjpudW1iZXI9TWF0aC5QSS8yO1xyXG5cclxuICAgIGJvbWJfc2l6ZTpudW1iZXI9MTAwO1xyXG4gICAgLy/nm67moIflnLDngrnvvIzliLDovr7lkI7niIbngrhcclxuICAgIHRhcmdldF9wb3M6Y2MuVmVjMj1udWxsO1xyXG5cclxuICAgIHR1b193ZWk6Y2MuTm9kZT1udWxsO1xyXG4gICAgcHJldl9wb3M6Y2MuVmVjMj1jYy52MigwLDApO1xyXG4gICAgLyoq6JST5bu254m55pWIICovXHJcbiAgICBzcHJlYWRfdGltZTpudW1iZXI9MC4yO1xyXG4gICAgLyoq6JST5bu25L2N572uICovXHJcbiAgICBzcHJlYWRfcG9zOmNjLlZlYzJbXT1bXTtcclxuICAgIGVuZF9jYWxsYmFjazpGdW5jdGlvbj1udWxsO1xyXG4gICAgLyoq5piv5ZCm5Yiw6L6+55uu55qE5ZywICovXHJcbiAgICBpc19hcnJpdmU6Ym9vbGVhbj1mYWxzZTtcclxuXHJcbiAgICBpbml0KGlkOkdhbWVFZmZlY3RJZCxzcGVlZDpudW1iZXIsdGFyZ2V0UG9zOmNjLlZlYzIsZW5kQ2FsbGJhY2s6RnVuY3Rpb24pXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy5nYW1lX2VmZmVjdF9pZD1pZDtcclxuICAgICAgICB0aGlzLm1vdmVfc3BlZWQ9c3BlZWQ7XHJcbiAgICAgICAgdGhpcy50YXJnZXRfcG9zPXRhcmdldFBvczsgICAgICAgIFxyXG4gICAgICAgIHRoaXMuZW5kX2NhbGxiYWNrPWVuZENhbGxiYWNrO1xyXG4gICAgICAgIGxldCBvZmZzZXRQb3M9dGFyZ2V0UG9zLnN1Yih0aGlzLm5vZGUuZ2V0UG9zaXRpb24oKSk7XHJcbiAgICAgICAgdGhpcy5tb3ZlX2RpcmVjdGlvbj1NYXRoLmF0YW4yKG9mZnNldFBvcy55LG9mZnNldFBvcy54KTtcclxuICAgICAgICAvL+i3neemu1xyXG4gICAgICAgIGxldCBkaXN0YW5jZT1vZmZzZXRQb3MubWFnKCk7XHJcbiAgICAgICAgbGV0IHNwPXRoaXMubW92ZV9zcGVlZC9HYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldEdhbWVSYXRlKCk7XHJcbiAgICAgICAgdGhpcy5zcHJlYWRfdGltZT0wLjAyKkdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0R2FtZVJhdGUoKTtcclxuICAgICAgICBsZXQganRUaW1lPWRpc3RhbmNlL3NwL0dhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0R2FtZVJhdGUoKTs7XHJcbiAgICAgICAgdGhpcy5ub2RlLnNjYWxlPTAuNTtcclxuICAgICAgICBjYy50d2Vlbih0aGlzLm5vZGUpLnRoZW4oY2Muc3Bhd24oY2Muc2VxdWVuY2UoY2Muc2NhbGVUbyhqdFRpbWUvNCwxLjEpLGNjLnNjYWxlVG8oanRUaW1lKjMvNCwwLjgpKSxjYy5qdW1wVG8oanRUaW1lLHRhcmdldFBvcyxkaXN0YW5jZS8yLDEpKSkuY2FsbCh0aGlzLmRlc3Ryb3lTZWxmLHRoaXMpLnN0YXJ0KCk7XHJcbiAgICAgICAgdGhpcy50dW9fd2VpPWNjLmluc3RhbnRpYXRlKHRoaXMudHVvd2VpKVxyXG4gICAgICAgIHRoaXMudHVvX3dlaS5wYXJlbnQ9dGhpcy5ub2RlLnBhcmVudDtcclxuICAgICAgICB0aGlzLm5vZGUuekluZGV4PTI7XHJcbiAgICAgICAgdGhpcy5wcmV2X3Bvcz10aGlzLm5vZGUuZ2V0UG9zaXRpb24oKTtcclxuICAgICAgICBsZXQgbXM9dGhpcy50dW9fd2VpLmdldENvbXBvbmVudChjYy5Nb3Rpb25TdHJlYWspO1xyXG4gICAgICAgIG1zLmZhZGVUaW1lPW1zLmZhZGVUaW1lKkdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0R2FtZVJhdGUoKTtcclxuXHJcbiAgICAgICAgdGhpcy5zcHJlYWRfcG9zPW5ldyBBcnJheSg0KTtcclxuICAgICAgICBsZXQgbGVuPXRoaXMuc3ByZWFkX3Bvcy5sZW5ndGg7XHJcbiAgICAgICAgZm9yKGxldCBpPTA7IGk8bGVuOyBpKyspXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLnNwcmVhZF9wb3NbaV09dGhpcy5ub2RlLmdldFBvc2l0aW9uKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuaXNfYXJyaXZlPWZhbHNlO1xyXG4gICAgfVxyXG5cclxuICAgIGRlc3Ryb3lTZWxmKClcclxuICAgIHtcclxuICAgICAgICBpZih0aGlzLnR1b193ZWkpe1xyXG4gICAgICAgICAgICBjYy50d2Vlbih0aGlzLnR1b193ZWkpLmRlbGF5KHRoaXMudHVvX3dlaS5nZXRDb21wb25lbnQoY2MuTW90aW9uU3RyZWFrKS5mYWRlVGltZS8oMTAqR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRHYW1lUmF0ZSgpKSlcclxuICAgICAgICAgICAgLnRvKDAuMSx7b3BhY2l0eTowfSlcclxuICAgICAgICAgICAgLnJlbW92ZVNlbGYoKS5zdGFydCgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLnNwcmVhZF90aW1lPTAuNjtcclxuICAgICAgICBpZih0aGlzLmVuZF9jYWxsYmFjayl7XHJcbiAgICAgICAgICAgIHRoaXMuZW5kX2NhbGxiYWNrKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zb3VuZF9tYW5hZ2VyLnBsYXlTb3VuZChTb3VuZEluZGV4LmJvb20yKTtcclxuICAgICAgICB0aGlzLm5vZGUuekluZGV4PTI7XHJcbiAgICAgICAgdGhpcy5pc19hcnJpdmU9dHJ1ZTtcclxuICAgICAgICBsZXQgbWlhb3podW49R2FtZUVmZmVjdHNNYW5hZ2VyLmdldEluc3RhbmNlKCkuY3JlYXRlR2FtZUVmZmVjdEZvclBhcmVudChHYW1lRWZmZWN0SWQucGFvc2hvdV9kYXpoYW9feGluaGFvZGFuX21pYW96aHVuLHRoaXMubm9kZS5nZXRQb3NpdGlvbigpLHRoaXMubm9kZS5wYXJlbnQpO1xyXG4gICAgICAgIG1pYW96aHVuLmdldENvbXBvbmVudChzcC5Ta2VsZXRvbikuc2V0QW5pbWF0aW9uKDAsJ1NraWxsX01pYW9aaHVuJyxmYWxzZSk7XHJcbiAgICAgICAgbWlhb3podW4uekluZGV4PTA7XHJcbiAgICAgICAgbGV0IGVuZD1HYW1lRWZmZWN0c01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5jcmVhdGVHYW1lRWZmZWN0Rm9yUGFyZW50KEdhbWVFZmZlY3RJZC5wYW9zaG91X2Rhemhhb193ZWl5YW5fZW5kLHRoaXMubm9kZS5nZXRQb3NpdGlvbigpLHRoaXMubm9kZS5wYXJlbnQpO1xyXG4gICAgICAgIGVuZC56SW5kZXg9MTtcclxuICAgICAgICBlbmQub3BhY2l0eT0yNTU7XHJcbiAgICAgICAgZW5kLmdldENvbXBvbmVudChzcC5Ta2VsZXRvbikuc2V0QW5pbWF0aW9uKDAsJ1NraWxsX1dlaVlhbicsZmFsc2UpO1xyXG4gICAgICAgIGNjLnR3ZWVuKGVuZCkudG8oMS4zLHtvcGFjaXR5Ojg4fSkuc3RhcnQoKTtcclxuICAgICAgICBjYy50d2Vlbih0aGlzLm5vZGUpLnRvKDEuMyx7b3BhY2l0eToxNjh9KS5jYWxsKCgpPT57XHJcbiAgICAgICAgICAgIEdhbWVFZmZlY3RzTWFuYWdlci5nZXRJbnN0YW5jZSgpLmRlc3Ryb3lHYW1lRWZmZWN0QnlJZCh0aGlzLmdhbWVfZWZmZWN0X2lkLHRoaXMubm9kZSk7XHJcbiAgICAgICAgICAgIEdhbWVFZmZlY3RzTWFuYWdlci5nZXRJbnN0YW5jZSgpLmRlc3Ryb3lHYW1lRWZmZWN0QnlJZChHYW1lRWZmZWN0SWQucGFvc2hvdV9kYXpoYW9feGluaGFvZGFuX21pYW96aHVuLG1pYW96aHVuKTtcclxuICAgICAgICAgICAgR2FtZUVmZmVjdHNNYW5hZ2VyLmdldEluc3RhbmNlKCkuZGVzdHJveUdhbWVFZmZlY3RCeUlkKEdhbWVFZmZlY3RJZC5wYW9zaG91X2Rhemhhb193ZWl5YW5fZW5kLGVuZCk7XHJcbiAgICAgICAgfSkuc3RhcnQoKTtcclxuICAgIH1cclxuXHJcbiAgICBzZXREaXJlY3Rpb24oZGlyOm51bWJlcilcclxuICAgIHtcclxuICAgICAgICB0aGlzLm1vdmVfZGlyZWN0aW9uPWRpcjtcclxuICAgICAgICAvL3RoaXMubm9kZS5hbmdsZT0xODAqZGlyL01hdGguUEk7XHJcbiAgICB9XHJcblxyXG4gICAgY3JlYXRlU3ByZWFkKCl7XHJcbiAgICAgICAgbGV0IG5vZGU9R2FtZUVmZmVjdHNNYW5hZ2VyLmdldEluc3RhbmNlKCkuY3JlYXRlR2FtZUVmZmVjdEZvclBhcmVudChHYW1lRWZmZWN0SWQucGFvc2hvdV9kYXpoYW9fd2VpeWFuLHRoaXMuc3ByZWFkX3Bvc1t0aGlzLmdldFBvc0luZGV4KCldLHRoaXMubm9kZS5wYXJlbnQpO1xyXG4gICAgICAgIGxldCBhbmltYT1ub2RlLmdldENvbXBvbmVudChjYy5BbmltYXRpb24pO1xyXG4gICAgICAgIGxldCBzdGF0ZT1hbmltYS5wbGF5KCk7XHJcbiAgICAgICAgc3RhdGUuc3BlZWQ9MS9HYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldEdhbWVSYXRlKCk7XHJcbiAgICAgICAgYW5pbWEub24oY2MuQW5pbWF0aW9uLkV2ZW50VHlwZS5GSU5JU0hFRCwoKT0+e1xyXG4gICAgICAgICAgICBHYW1lRWZmZWN0c01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5kZXN0cm95R2FtZUVmZmVjdEJ5SWQoR2FtZUVmZmVjdElkLnBhb3Nob3VfZGF6aGFvX3dlaXlhbixub2RlKTtcclxuICAgICAgICB9LHRoaXMpO1xyXG4gICAgICAgIG5vZGUuekluZGV4PTM7XHJcbiAgICAgICAgbm9kZS5hbmdsZT1NYXRoLnJhbmRvbSgpKjM2MDtcclxuICAgICAgICBub2RlLnNjYWxlPU1hdGgucmFuZG9tKCkqMC41KzAuODtcclxuICAgIH1cclxuXHJcbiAgICBjcmVhdGVFbmRTcHJlYWQoKXtcclxuXHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBnZXRQb3NJbmRleCgpOm51bWJlclxyXG4gICAge1xyXG4gICAgICAgIGxldCBtYXhDTD10aGlzLnNwcmVhZF9wb3MubGVuZ3RoLTE7XHJcbiAgICAgICAgbGV0IGluZGV4PU1hdGguZmxvb3IodGhpcy5zcHJlYWRfcG9zLmxlbmd0aC9HYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldEdhbWVSYXRlKCkpO1xyXG4gICAgICAgIGlmKGluZGV4Pj1tYXhDTClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGluZGV4PW1heENMO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gaW5kZXg7XHJcbiAgICB9XHJcblxyXG4gICAgdXBkYXRlIChkdCkge1xyXG4gICAgICAgIGlmKEdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuY3VyX2dhbWVfc3RhdGUhPUdhbWVTdGF0ZS5HYW1lX1BsYXlpbmcpXHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIGlmKHRoaXMudHVvd2VpIT1udWxsKXtcclxuICAgICAgICAgICAgbGV0IGdyPUdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0R2FtZVJhdGUoKTtcclxuICAgICAgICAgICAgaWYoZ3I8MSl7XHJcbiAgICAgICAgICAgICAgICBncj0xO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIC8v5re75Yqg5Zyo5a2Q5by55YmN6Z2iICAgICAgICAgICBcclxuICAgICAgICAgICAgbGV0IHBvcz10aGlzLm5vZGUuZ2V0UG9zaXRpb24oKTsgXHJcbiAgICAgICAgICAgIGxldCBvZmZzZXRQb3M9cG9zLnN1Yih0aGlzLnByZXZfcG9zKTtcclxuICAgICAgICAgICAgbGV0IGRpc3RhbmNlPW9mZnNldFBvcy5tYWcoKSo0L2dyO1xyXG4gICAgICAgICAgICBsZXQgZGlyPU1hdGguYXRhbjIob2Zmc2V0UG9zLnksb2Zmc2V0UG9zLngpO1xyXG4gICAgICAgICAgICBsZXQgeHg9cG9zLngrTWF0aC5jb3MoZGlyKSpkaXN0YW5jZTtcclxuICAgICAgICAgICAgbGV0IHl5PXBvcy55K01hdGguc2luKGRpcikqZGlzdGFuY2U7XHJcbiAgICAgICAgICAgIHRoaXMudHVvX3dlaS5zZXRQb3NpdGlvbihjYy52Mih4eCx5eSkpO1xyXG4gICAgICAgICAgICB0aGlzLnByZXZfcG9zPXRoaXMubm9kZS5nZXRQb3NpdGlvbigpO1xyXG4gICAgICAgICAgICB0aGlzLnNwcmVhZF90aW1lLT1kdDtcclxuICAgICAgICAgICAgdGhpcy51cGRhdGVfbG9jdXNfc2hhZG93KCk7XHJcbiAgICAgICAgICAgIGlmKHRoaXMuc3ByZWFkX3RpbWU8PTApe1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zcHJlYWRfdGltZT0wLjAyKkdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0R2FtZVJhdGUoKTtcclxuICAgICAgICAgICAgICAgIGlmKHRoaXMuaXNfYXJyaXZlPT1mYWxzZSl7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jcmVhdGVTcHJlYWQoKTtcclxuICAgICAgICAgICAgICAgIH0gICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSAgICAgICAgXHJcbiAgICB9XHJcblxyXG4gICAgdXBkYXRlX2xvY3VzX3NoYWRvdygpXHJcbiAgICB7XHJcbiAgICAgICAgaWYodGhpcy5pc19hcnJpdmU9PWZhbHNlKXtcclxuICAgICAgICAgICAgLy/liqDlhaXlpLTpg6hcclxuICAgICAgICAgICAgdGhpcy5zcHJlYWRfcG9zLnVuc2hpZnQodGhpcy5ub2RlLmdldFBvc2l0aW9uKCkpO1xyXG4gICAgICAgICAgICAvL+WIoOmZpOWwvumDqFxyXG4gICAgICAgICAgICB0aGlzLnNwcmVhZF9wb3MucG9wKCk7ICBcclxuICAgICAgICB9XHJcblxyXG4gICAgfVxyXG59XHJcbiJdfQ==