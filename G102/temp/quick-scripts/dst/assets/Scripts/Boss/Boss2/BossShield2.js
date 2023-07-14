
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Scripts/Boss/Boss2/BossShield2.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '1e8f4q9VXhGYZNN13f7u2z4', 'BossShield2');
// Scripts/Boss/Boss2/BossShield2.ts

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
var GameManager_1 = require("../../GameManager");
var HeroConfig_1 = require("../../Hero/Game/HeroConfig");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var BossShield2 = /** @class */ (function (_super) {
    __extends(BossShield2, _super);
    function BossShield2() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        /**护盾的唯一id */
        _this.shield_id = 0;
        /**剩余的时间 */
        _this.remain_time = 0;
        /**剩余的免疫次数 */
        _this.shield_value = 0;
        /**护盾类型，可以抵消的伤害类型 */
        _this.shield_type = HeroConfig_1.ShieldType.Normal;
        /**时间结束或护盾被破时的回调 */
        _this.destroy_callback = null;
        /**进度条 */
        _this.progress_bar = null;
        /**最大值*/
        _this.max_value = 0;
        /**最初持续时间 */
        _this.max_time = 0;
        //受伤动作
        _this.injured_action = null;
        _this.shield = null;
        /**地表节点 */
        _this.ground = null;
        /**地表节点 */
        _this.ground_progress = null;
        return _this;
    }
    BossShield2.prototype.init = function (id, type, remainTime, value, ground, callback) {
        this.progress_bar = this.node.getComponent(cc.ProgressBar);
        this.shield = this.node.getChildByName('shield');
        this.shield_id = id;
        this.remain_time = this.max_time = remainTime;
        this.shield_value = this.max_value = value;
        this.shield_type = type;
        this.destroy_callback = callback;
        this.ground = ground;
        this.ground_progress = ground.getChildByName('progress');
        this.ground_progress.scale = 0;
        this.shield.scale = 1;
    };
    BossShield2.prototype.startHurt = function () {
        if (this.injured_action) {
            this.injured_action.stop();
        }
        this.shield.color = cc.Color.RED;
        this.injured_action = cc.tween(this.shield).to(0.18, { color: cc.color(255, 255, 255) }).start();
    };
    /**更改护盾值，返回更改后的值值*/
    BossShield2.prototype.changeShieldValue = function (num) {
        var newValue = this.shield_value + num;
        var progress = 1 - (newValue / this.max_value);
        ;
        this.progress_bar.progress = progress;
        if (newValue < 0) {
            this.shield_value = 0;
            this.progress_bar.progress = 1;
            this.destroySelf();
        }
        else {
            this.shield_value = newValue;
        }
        if (num < 0) {
            this.startHurt();
        }
        return newValue;
    };
    BossShield2.prototype.getShieldValue = function () {
        return this.shield_value;
    };
    BossShield2.prototype.getRemainTime = function () {
        return this.remain_time;
    };
    BossShield2.prototype.getShieldType = function () {
        return this.shield_type;
    };
    BossShield2.prototype.refreshShield = function (remainTime, value) {
        this.remain_time = remainTime;
        this.shield_value = value;
    };
    BossShield2.prototype.getIsCanWithstand = function (type) {
        if (this.shield_type == HeroConfig_1.ShieldType.All || this.shield_type == type.valueOf()) {
            return true;
        }
        return false;
    };
    BossShield2.prototype.destroySelf = function () {
        this.ground.removeFromParent();
        this.node.removeFromParent();
        if (this.destroy_callback) {
            //是否自爆
            var isAuto = this.remain_time <= 0;
            this.destroy_callback(isAuto);
        }
    };
    BossShield2.prototype.destoryShield = function () {
        this.ground.removeFromParent();
        this.node.removeFromParent();
    };
    BossShield2.prototype.update = function (dt) {
        if (GameManager_1.default.getInstance().cur_game_state == Constants_1.GameState.Game_Playing) {
            if (this.remain_time > 0) {
                this.remain_time -= dt;
                var scale = 1 - this.remain_time / this.max_time;
                this.ground_progress.scale = scale;
                this.shield.scale = 1 + scale;
                if (this.remain_time < 0) {
                    this.remain_time = 0;
                    this.destroySelf();
                }
            }
        }
    };
    BossShield2 = __decorate([
        ccclass
    ], BossShield2);
    return BossShield2;
}(cc.Component));
exports.default = BossShield2;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0c1xcQm9zc1xcQm9zczJcXEJvc3NTaGllbGQyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLDZDQUE0QztBQUM1QyxpREFBNEM7QUFDNUMseURBQW9FO0FBSTlELElBQUEsS0FBc0IsRUFBRSxDQUFDLFVBQVUsRUFBbEMsT0FBTyxhQUFBLEVBQUUsUUFBUSxjQUFpQixDQUFDO0FBRzFDO0lBQXlDLCtCQUFZO0lBQXJEO1FBQUEscUVBdUhDO1FBdEhHLGFBQWE7UUFDTCxlQUFTLEdBQVEsQ0FBQyxDQUFDO1FBQzNCLFdBQVc7UUFDSCxpQkFBVyxHQUFRLENBQUMsQ0FBQztRQUM3QixhQUFhO1FBQ0wsa0JBQVksR0FBUSxDQUFDLENBQUM7UUFDOUIsb0JBQW9CO1FBQ1osaUJBQVcsR0FBWSx1QkFBVSxDQUFDLE1BQU0sQ0FBQztRQUNqRCxtQkFBbUI7UUFDWCxzQkFBZ0IsR0FBVSxJQUFJLENBQUM7UUFDdkMsU0FBUztRQUNELGtCQUFZLEdBQWdCLElBQUksQ0FBQztRQUN6QyxRQUFRO1FBQ0EsZUFBUyxHQUFRLENBQUMsQ0FBQztRQUMzQixZQUFZO1FBQ0osY0FBUSxHQUFRLENBQUMsQ0FBQztRQUMxQixNQUFNO1FBQ0Usb0JBQWMsR0FBVSxJQUFJLENBQUM7UUFDN0IsWUFBTSxHQUFTLElBQUksQ0FBQztRQUM1QixVQUFVO1FBQ0YsWUFBTSxHQUFTLElBQUksQ0FBQztRQUM1QixVQUFVO1FBQ0YscUJBQWUsR0FBUyxJQUFJLENBQUM7O0lBZ0d6QyxDQUFDO0lBOUZHLDBCQUFJLEdBQUosVUFBSyxFQUFTLEVBQUMsSUFBZSxFQUFDLFVBQWlCLEVBQUMsS0FBWSxFQUFDLE1BQWMsRUFBQyxRQUFpQjtRQUMxRixJQUFJLENBQUMsWUFBWSxHQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLEVBQUUsQ0FBQyxXQUFXLENBQUMsQ0FBQztRQUN6RCxJ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LE9BQU87T0FDYSxXQUFXLENBdUgvQjtJQUFELGtCQUFDO0NBdkhELEFBdUhDLENBdkh3QyxFQUFFLENBQUMsU0FBUyxHQXVIcEQ7a0JBdkhvQixXQUFXIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgR2FtZVN0YXRlIH0gZnJvbSBcIi4uLy4uL0NvbnN0YW50c1wiO1xyXG5pbXBvcnQgR2FtZU1hbmFnZXIgZnJvbSBcIi4uLy4uL0dhbWVNYW5hZ2VyXCI7XHJcbmltcG9ydCB7IFNoaWVsZFR5cGUsIERhbWFnZVR5cGUgfSBmcm9tIFwiLi4vLi4vSGVyby9HYW1lL0hlcm9Db25maWdcIjtcclxuXHJcblxyXG5cclxuY29uc3Qge2NjY2xhc3MsIHByb3BlcnR5fSA9IGNjLl9kZWNvcmF0b3I7XHJcblxyXG5AY2NjbGFzc1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBCb3NzU2hpZWxkMiBleHRlbmRzIGNjLkNvbXBvbmVudCB7XHJcbiAgICAvKirmiqTnm77nmoTllK/kuIBpZCAqLyAgICBcclxuICAgIHByaXZhdGUgc2hpZWxkX2lkOm51bWJlcj0wO1xyXG4gICAgLyoq5Ymp5L2Z55qE5pe26Ze0ICovXHJcbiAgICBwcml2YXRlIHJlbWFpbl90aW1lOm51bWJlcj0wO1xyXG4gICAgLyoq5Ymp5L2Z55qE5YWN55ar5qyh5pWwICovXHJcbiAgICBwcml2YXRlIHNoaWVsZF92YWx1ZTpudW1iZXI9MDtcclxuICAgIC8qKuaKpOebvuexu+Wei++8jOWPr+S7peaKtea2iOeahOS8pOWus+exu+WeiyAqL1xyXG4gICAgcHJpdmF0ZSBzaGllbGRfdHlwZTpTaGllbGRUeXBlPVNoaWVsZFR5cGUuTm9ybWFsO1xyXG4gICAgLyoq5pe26Ze057uT5p2f5oiW5oqk55u+6KKr56C05pe255qE5Zue6LCDICovXHJcbiAgICBwcml2YXRlIGRlc3Ryb3lfY2FsbGJhY2s6RnVuY3Rpb249bnVsbDtcclxuICAgIC8qKui/m+W6puadoSAqL1xyXG4gICAgcHJpdmF0ZSBwcm9ncmVzc19iYXI6Y2MuUHJvZ3Jlc3NCYXI9bnVsbDtcclxuICAgIC8qKuacgOWkp+WAvCovXHJcbiAgICBwcml2YXRlIG1heF92YWx1ZTpudW1iZXI9MDtcclxuICAgIC8qKuacgOWIneaMgee7reaXtumXtCAqL1xyXG4gICAgcHJpdmF0ZSBtYXhfdGltZTpudW1iZXI9MDtcclxuICAgIC8v5Y+X5Lyk5Yqo5L2cXHJcbiAgICBwcml2YXRlIGluanVyZWRfYWN0aW9uOmNjLlR3ZWVuPW51bGw7XHJcbiAgICBwcml2YXRlIHNoaWVsZDpjYy5Ob2RlPW51bGw7XHJcbiAgICAvKirlnLDooajoioLngrkgKi9cclxuICAgIHByaXZhdGUgZ3JvdW5kOmNjLk5vZGU9bnVsbDtcclxuICAgIC8qKuWcsOihqOiKgueCuSAqL1xyXG4gICAgcHJpdmF0ZSBncm91bmRfcHJvZ3Jlc3M6Y2MuTm9kZT1udWxsO1xyXG5cclxuICAgIGluaXQoaWQ6bnVtYmVyLHR5cGU6U2hpZWxkVHlwZSxyZW1haW5UaW1lOm51bWJlcix2YWx1ZTpudW1iZXIsZ3JvdW5kOmNjLk5vZGUsY2FsbGJhY2s6RnVuY3Rpb24pe1xyXG4gICAgICAgIHRoaXMucHJvZ3Jlc3NfYmFyPXRoaXMubm9kZS5nZXRDb21wb25lbnQoY2MuUHJvZ3Jlc3NCYXIpO1xyXG4gICAgICAgIHRoaXMuc2hpZWxkPXRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZSgnc2hpZWxkJyk7XHJcbiAgICAgICAgdGhpcy5zaGllbGRfaWQ9aWQ7XHJcbiAgICAgICAgdGhpcy5yZW1haW5fdGltZT10aGlzLm1heF90aW1lPXJlbWFpblRpbWU7XHJcbiAgICAgICAgdGhpcy5zaGllbGRfdmFsdWU9dGhpcy5tYXhfdmFsdWU9dmFsdWU7XHJcbiAgICAgICAgdGhpcy5zaGllbGRfdHlwZT10eXBlO1xyXG4gICAgICAgIHRoaXMuZGVzdHJveV9jYWxsYmFjaz1jYWxsYmFjaztcclxuICAgICAgICB0aGlzLmdyb3VuZD1ncm91bmQ7XHJcbiAgICAgICAgdGhpcy5ncm91bmRfcHJvZ3Jlc3M9Z3JvdW5kLmdldENoaWxkQnlOYW1lKCdwcm9ncmVzcycpO1xyXG4gICAgICAgIHRoaXMuZ3JvdW5kX3Byb2dyZXNzLnNjYWxlPTA7XHJcbiAgICAgICAgdGhpcy5zaGllbGQuc2NhbGU9MTtcclxuICAgIH1cclxuXHJcbiAgICBzdGFydEh1cnQoKXtcclxuICAgICAgICBpZih0aGlzLmluanVyZWRfYWN0aW9uKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5pbmp1cmVkX2FjdGlvbi5zdG9wKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuc2hpZWxkLmNvbG9yPWNjLkNvbG9yLlJFRDsgICAgICAgIFxyXG4gICAgICAgIHRoaXMuaW5qdXJlZF9hY3Rpb249Y2MudHdlZW4odGhpcy5zaGllbGQpLnRvKDAuMTgse2NvbG9yOmNjLmNvbG9yKDI1NSwyNTUsMjU1KX0pLnN0YXJ0KCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoq5pu05pS55oqk55u+5YC877yM6L+U5Zue5pu05pS55ZCO55qE5YC85YC8Ki9cclxuICAgIGNoYW5nZVNoaWVsZFZhbHVlKG51bTpudW1iZXIpOm51bWJlcntcclxuICAgICAgICBsZXQgbmV3VmFsdWU9dGhpcy5zaGllbGRfdmFsdWUrbnVtO1xyXG4gICAgICAgIGxldCBwcm9ncmVzcz0xLShuZXdWYWx1ZS90aGlzLm1heF92YWx1ZSk7O1xyXG4gICAgICAgIHRoaXMucHJvZ3Jlc3NfYmFyLnByb2dyZXNzPXByb2dyZXNzXHJcbiAgICAgICAgaWYobmV3VmFsdWU8MCl7XHJcbiAgICAgICAgICAgIHRoaXMuc2hpZWxkX3ZhbHVlPTA7XHJcbiAgICAgICAgICAgIHRoaXMucHJvZ3Jlc3NfYmFyLnByb2dyZXNzPTE7XHJcbiAgICAgICAgICAgIHRoaXMuZGVzdHJveVNlbGYoKTtcclxuICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgdGhpcy5zaGllbGRfdmFsdWU9bmV3VmFsdWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmKG51bTwwKXtcclxuICAgICAgICAgICAgdGhpcy5zdGFydEh1cnQoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIG5ld1ZhbHVlO1xyXG4gICAgfVxyXG5cclxuICAgIGdldFNoaWVsZFZhbHVlKCk6bnVtYmVye1xyXG4gICAgICAgIHJldHVybiB0aGlzLnNoaWVsZF92YWx1ZTtcclxuICAgIH1cclxuXHJcbiAgICBnZXRSZW1haW5UaW1lKCk6bnVtYmVye1xyXG4gICAgICAgIHJldHVybiB0aGlzLnJlbWFpbl90aW1lO1xyXG4gICAgfVxyXG5cclxuICAgIGdldFNoaWVsZFR5cGUoKTpTaGllbGRUeXBle1xyXG4gICAgICAgIHJldHVybiB0aGlzLnNoaWVsZF90eXBlO1xyXG4gICAgfVxyXG5cclxuICAgIHJlZnJlc2hTaGllbGQocmVtYWluVGltZTpudW1iZXIsdmFsdWU6bnVtYmVyKXtcclxuICAgICAgICB0aGlzLnJlbWFpbl90aW1lPXJlbWFpblRpbWU7XHJcbiAgICAgICAgdGhpcy5zaGllbGRfdmFsdWU9dmFsdWU7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0SXNDYW5XaXRoc3RhbmQodHlwZTpEYW1hZ2VUeXBlKTpib29sZWFueyAgICAgICAgXHJcbiAgICAgICAgaWYodGhpcy5zaGllbGRfdHlwZT09U2hpZWxkVHlwZS5BbGwgfHwgdGhpcy5zaGllbGRfdHlwZT09dHlwZS52YWx1ZU9mKCkpe1xyXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgZGVzdHJveVNlbGYoKXtcclxuICAgICAgICB0aGlzLmdyb3VuZC5yZW1vdmVGcm9tUGFyZW50KCk7XHJcbiAgICAgICAgdGhpcy5ub2RlLnJlbW92ZUZyb21QYXJlbnQoKTsgICAgICAgIFxyXG4gICAgICAgIGlmKHRoaXMuZGVzdHJveV9jYWxsYmFjayl7XHJcbiAgICAgICAgICAgIC8v5piv5ZCm6Ieq54iGXHJcbiAgICAgICAgICAgIGxldCBpc0F1dG89dGhpcy5yZW1haW5fdGltZTw9MDtcclxuICAgICAgICAgICAgdGhpcy5kZXN0cm95X2NhbGxiYWNrKGlzQXV0byk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBkZXN0b3J5U2hpZWxkKCl7XHJcbiAgICAgICAgdGhpcy5ncm91bmQucmVtb3ZlRnJvbVBhcmVudCgpO1xyXG4gICAgICAgIHRoaXMubm9kZS5yZW1vdmVGcm9tUGFyZW50KCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJvdGVjdGVkIHVwZGF0ZShkdDogbnVtYmVyKTogdm9pZCB7XHJcbiAgICAgICAgaWYoR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5jdXJfZ2FtZV9zdGF0ZT09R2FtZVN0YXRlLkdhbWVfUGxheWluZyl7XHJcbiAgICAgICAgICAgIGlmKHRoaXMucmVtYWluX3RpbWU+MCl7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnJlbWFpbl90aW1lLT1kdDtcclxuICAgICAgICAgICAgICAgIGxldCBzY2FsZT0xLXRoaXMucmVtYWluX3RpbWUvdGhpcy5tYXhfdGltZTtcclxuICAgICAgICAgICAgICAgIHRoaXMuZ3JvdW5kX3Byb2dyZXNzLnNjYWxlPXNjYWxlO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zaGllbGQuc2NhbGU9MStzY2FsZTtcclxuICAgICAgICAgICAgICAgIGlmKHRoaXMucmVtYWluX3RpbWU8MCl7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5yZW1haW5fdGltZT0wO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZGVzdHJveVNlbGYoKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0gICAgICAgIFxyXG4gICAgfVxyXG59XHJcbiJdfQ==