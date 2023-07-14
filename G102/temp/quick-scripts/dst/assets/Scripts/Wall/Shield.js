
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Scripts/Wall/Shield.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '80586uDfGNIs5sPpF8U+m6C', 'Shield');
// Scripts/Wall/Shield.ts

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
var HeroConfig_1 = require("../Hero/Game/HeroConfig");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var Shield = /** @class */ (function (_super) {
    __extends(Shield, _super);
    function Shield() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        /**护盾的唯一id */
        _this.shield_id = 0;
        /**剩余的时间 */
        _this.remain_time = 0;
        /**剩余的护盾值 */
        _this.shield_value = 0;
        /**护盾类型，可以抵消的伤害类型 */
        _this.shield_type = HeroConfig_1.ShieldType.Normal;
        /**时间结束或护盾被破时的回调 */
        _this.destroy_callback = null;
        /**护盾的特效数据 */
        _this.game_effect_data = null;
        return _this;
    }
    Shield.prototype.init = function (id, type, remainTime, value, callback) {
        this.shield_id = id;
        this.remain_time = remainTime;
        this.shield_value = value;
        this.shield_type = type;
        this.destroy_callback = callback;
        this.game_effect_data = new Map();
    };
    /**更改护盾值，返回更改后的值值*/
    Shield.prototype.changeShieldValue = function (num) {
        var newValue = this.shield_value + num;
        if (newValue < 0) {
            this.shield_value = 0;
            this.destroySelf();
        }
        else {
            this.shield_value = newValue;
        }
        return newValue;
    };
    Shield.prototype.setGameEffectData = function (id, node) {
        this.game_effect_data.set(id, node);
    };
    Shield.prototype.getShieldValue = function () {
        return this.shield_value;
    };
    Shield.prototype.getRemainTime = function () {
        return this.remain_time;
    };
    Shield.prototype.getShieldType = function () {
        return this.shield_type;
    };
    Shield.prototype.refreshShield = function (remainTime, value) {
        this.remain_time = remainTime;
        this.shield_value = value;
    };
    Shield.prototype.getIsCanWithstand = function (type) {
        if (this.shield_type == HeroConfig_1.ShieldType.All || this.shield_type == type.valueOf()) {
            return true;
        }
        return false;
    };
    Shield.prototype.destroySelf = function () {
        this.game_effect_data.forEach(function (v, k) {
            GameEffectsManager_1.GameEffectsManager.getInstance().destroyGameEffectById(k, v);
        });
        this.node.removeFromParent();
        if (this.destroy_callback) {
            this.destroy_callback(this.shield_id);
        }
    };
    Shield.prototype.update = function (dt) {
        if (GameManager_1.default.getInstance().cur_game_state == Constants_1.GameState.Game_Playing) {
            if (this.remain_time > 0) {
                this.remain_time -= dt;
                if (this.remain_time < 0) {
                    this.remain_time = 0;
                    this.destroySelf();
                }
            }
        }
    };
    Shield = __decorate([
        ccclass
    ], Shield);
    return Shield;
}(cc.Component));
exports.default = Shield;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0c1xcV2FsbFxcU2hpZWxkLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLDBDQUF5QztBQUN6QyxpRUFBOEU7QUFDOUUsOENBQXlDO0FBQ3pDLHNEQUFpRTtBQUczRCxJQUFBLEtBQXNCLEVBQUUsQ0FBQyxVQUFVLEVBQWxDLE9BQU8sYUFBQSxFQUFFLFFBQVEsY0FBaUIsQ0FBQztBQUcxQztJQUFvQywwQkFBWTtJQUFoRDtRQUFBLHFFQW9GQztRQW5GRyxhQUFhO1FBQ0wsZUFBUyxHQUFRLENBQUMsQ0FBQztRQUMzQixXQUFXO1FBQ0gsaUJBQVcsR0FBUSxDQUFDLENBQUM7UUFDN0IsWUFBWTtRQUNKLGtCQUFZLEdBQVEsQ0FBQyxDQUFDO1FBQzlCLG9CQUFvQjtRQUNaLGlCQUFXLEdBQVksdUJBQVUsQ0FBQyxNQUFNLENBQUM7UUFDakQsbUJBQW1CO1FBQ1gsc0JBQWdCLEdBQVUsSUFBSSxDQUFDO1FBQ3ZDLGFBQWE7UUFDTCxzQkFBZ0IsR0FBMkIsSUFBSSxDQUFDOztJQXdFNUQsQ0FBQztJQXRFRyxxQkFBSSxHQUFKLFVBQUssRUFBUyxFQUFDLElBQWUsRUFBQyxVQUFpQixFQUFDLEtBQVksRUFBQyxRQUFpQjtRQUMzRSxJQUFJLENBQUMsU0FBUyxHQUFDLEVBQUUsQ0FBQztRQUNsQixJQUFJLENBQUMsV0FBVyxHQUFDLFVBQVUsQ0FBQztRQUM1QixJQUFJLENBQUMsWUFBWSxHQUFDLEtBQUssQ0FBQztRQUN4QixJQUFJLENBQUMsV0FBVyxHQUFDLElBQUksQ0FBQztRQUN0QixJQUFJLENBQUMsZ0JBQWdCLEdBQUMsUUFBUSxDQUFDO1FBQy9CLElBQUksQ0FBQyxnQkFBZ0IsR0FBQyxJQUFJLEdBQUcsRUFBd0IsQ0FBQztJQUMxRCxDQUFDO0lBRUQsbUJBQW1CO0lBQ25CLGtDQUFpQixHQUFqQixVQUFrQixHQUFVO1FBQ3hCLElBQUksUUFBUSxHQUFDLElBQUksQ0FBQyxZQUFZLEdBQUMsR0FBRyxDQUFDO1FBQ25DLElBQUcsUUFBUSxHQUFDLENBQUMsRUFBQztZQUNWLElBQUksQ0FBQyxZQUFZLEdBQUMsQ0FBQyxDQUFDO1lBQ3BCLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQztTQUN0QjthQUFJO1lBQ0QsSUFBSSxDQUFDLFlBQVksR0FBQyxRQUFRLENBQUM7U0FDOUI7UUFDRCxPQUFPLFFBQVEsQ0FBQztJQUNwQixDQUFDO0lBRUQsa0NBQWlCLEdBQWpCLFVBQWtCLEVBQWUsRUFBQyxJQUFZO1FBQzFDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxHQUFHLENBQUMsRUFBRSxFQUFDLElBQUksQ0FBQyxDQUFDO0lBQ3ZDLENBQUM7SUFFRCwrQkFBYyxHQUFkO1FBQ0ksT0FBTyxJQUFJLENBQUMsWUFBWSxDQUFDO0lBQzdCLENBQUM7SUFFRCw4QkFBYSxHQUFiO1FBQ0ksT0FBTyxJQUFJLENBQUMsV0FBVyxDQUFDO0lBQzVCLENBQUM7SUFFRCw4QkFBYSxHQUFiO1FBQ0ksT0FBTyxJQUFJLENBQUMsV0FBVyxDQUFDO0lBQzVCLENBQUM7SUFFRCw4QkFBYSxHQUFiLFVBQWMsVUFBaUIsRUFBQyxLQUFZO1FBQ3hDLElBQUksQ0FBQyxXQUFXLEdBQUMsVUFBVSxDQUFDO1FBQzVCLElBQUksQ0FBQyxZQUFZLEdBQUMsS0FBSyxDQUFDO0lBQzVCLENBQUM7SUFFRCxrQ0FBaUIsR0FBakIsVUFBa0IsSUFBZTtRQUM3QixJQUFHLElBQUksQ0FBQyxXQUFXLElBQUUsdUJBQVUsQ0FBQyxHQUFHLElBQUksSUFBSSxDQUFDLFdBQVcsSUFBRSxJQUFJLENBQUMsT0FBTyxFQUFFLEVBQUM7WUFDcEUsT0FBTyxJQUFJLENBQUM7U0FDZjtRQUNELE9BQU8sS0FBSyxDQUFDO0lBQ2pCLENBQUM7SUFFRCw0QkFBVyxHQUFYO1FBQ0ksSUFBSSxDQUFDLGdCQUFnQixDQUFDLE9BQU8sQ0FBQyxVQUFDLENBQUMsRUFBQyxDQUFDO1lBQzlCLHVDQUFrQixDQUFDLFdBQVcsRUFBRSxDQUFDLHFCQUFxQixDQUFDLENBQUMsRUFBQyxDQUFDLENBQUMsQ0FBQztRQUNoRSxDQUFDLENBQUMsQ0FBQztRQUNILElBQUksQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQztRQUM3QixJQUFHLElBQUksQ0FBQyxnQkFBZ0IsRUFBQztZQUNyQixJQUFJLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1NBQ3pDO0lBQ0wsQ0FBQztJQUVTLHVCQUFNLEdBQWhCLFVBQWlCLEVBQVU7UUFDdkIsSUFBRyxxQkFBVyxDQUFDLFdBQVcsRUFBRSxDQUFDLGNBQWMsSUFBRSxxQkFBUyxDQUFDLFlBQVksRUFBQztZQUNoRSxJQUFHLElBQUksQ0FBQyxXQUFXLEdBQUMsQ0FBQyxFQUFDO2dCQUNsQixJQUFJLENBQUMsV0FBVyxJQUFFLEVBQUUsQ0FBQztnQkFDckIsSUFBRyxJQUFJLENBQUMsV0FBVyxHQUFDLENBQUMsRUFBQztvQkFDbEIsSUFBSSxDQUFDLFdBQVcsR0FBQyxDQUFDLENBQUM7b0JBQ25CLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQztpQkFDdEI7YUFDSjtTQUNKO0lBQ0wsQ0FBQztJQW5GZ0IsTUFBTTtRQUQxQixPQUFPO09BQ2EsTUFBTSxDQW9GMUI7SUFBRCxhQUFDO0NBcEZELEFBb0ZDLENBcEZtQyxFQUFFLENBQUMsU0FBUyxHQW9GL0M7a0JBcEZvQixNQUFNIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgR2FtZVN0YXRlIH0gZnJvbSBcIi4uL0NvbnN0YW50c1wiO1xyXG5pbXBvcnQgeyBHYW1lRWZmZWN0SWQsIEdhbWVFZmZlY3RzTWFuYWdlciB9IGZyb20gXCIuLi9HYW1lL0dhbWVFZmZlY3RzTWFuYWdlclwiO1xyXG5pbXBvcnQgR2FtZU1hbmFnZXIgZnJvbSBcIi4uL0dhbWVNYW5hZ2VyXCI7XHJcbmltcG9ydCB7IFNoaWVsZFR5cGUsIERhbWFnZVR5cGUgfSBmcm9tIFwiLi4vSGVyby9HYW1lL0hlcm9Db25maWdcIjtcclxuXHJcblxyXG5jb25zdCB7Y2NjbGFzcywgcHJvcGVydHl9ID0gY2MuX2RlY29yYXRvcjtcclxuXHJcbkBjY2NsYXNzXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFNoaWVsZCBleHRlbmRzIGNjLkNvbXBvbmVudCB7XHJcbiAgICAvKirmiqTnm77nmoTllK/kuIBpZCAqLyAgICBcclxuICAgIHByaXZhdGUgc2hpZWxkX2lkOm51bWJlcj0wO1xyXG4gICAgLyoq5Ymp5L2Z55qE5pe26Ze0ICovXHJcbiAgICBwcml2YXRlIHJlbWFpbl90aW1lOm51bWJlcj0wO1xyXG4gICAgLyoq5Ymp5L2Z55qE5oqk55u+5YC8ICovXHJcbiAgICBwcml2YXRlIHNoaWVsZF92YWx1ZTpudW1iZXI9MDtcclxuICAgIC8qKuaKpOebvuexu+Wei++8jOWPr+S7peaKtea2iOeahOS8pOWus+exu+WeiyAqL1xyXG4gICAgcHJpdmF0ZSBzaGllbGRfdHlwZTpTaGllbGRUeXBlPVNoaWVsZFR5cGUuTm9ybWFsO1xyXG4gICAgLyoq5pe26Ze057uT5p2f5oiW5oqk55u+6KKr56C05pe255qE5Zue6LCDICovXHJcbiAgICBwcml2YXRlIGRlc3Ryb3lfY2FsbGJhY2s6RnVuY3Rpb249bnVsbDtcclxuICAgIC8qKuaKpOebvueahOeJueaViOaVsOaNriAqL1xyXG4gICAgcHJpdmF0ZSBnYW1lX2VmZmVjdF9kYXRhOk1hcDxHYW1lRWZmZWN0SWQsY2MuTm9kZT49bnVsbDtcclxuXHJcbiAgICBpbml0KGlkOm51bWJlcix0eXBlOlNoaWVsZFR5cGUscmVtYWluVGltZTpudW1iZXIsdmFsdWU6bnVtYmVyLGNhbGxiYWNrOkZ1bmN0aW9uKXtcclxuICAgICAgICB0aGlzLnNoaWVsZF9pZD1pZDtcclxuICAgICAgICB0aGlzLnJlbWFpbl90aW1lPXJlbWFpblRpbWU7XHJcbiAgICAgICAgdGhpcy5zaGllbGRfdmFsdWU9dmFsdWU7XHJcbiAgICAgICAgdGhpcy5zaGllbGRfdHlwZT10eXBlO1xyXG4gICAgICAgIHRoaXMuZGVzdHJveV9jYWxsYmFjaz1jYWxsYmFjaztcclxuICAgICAgICB0aGlzLmdhbWVfZWZmZWN0X2RhdGE9bmV3IE1hcDxHYW1lRWZmZWN0SWQsY2MuTm9kZT4oKTtcclxuICAgIH1cclxuXHJcbiAgICAvKirmm7TmlLnmiqTnm77lgLzvvIzov5Tlm57mm7TmlLnlkI7nmoTlgLzlgLwqL1xyXG4gICAgY2hhbmdlU2hpZWxkVmFsdWUobnVtOm51bWJlcik6bnVtYmVyeyAgICAgICAgXHJcbiAgICAgICAgbGV0IG5ld1ZhbHVlPXRoaXMuc2hpZWxkX3ZhbHVlK251bTtcclxuICAgICAgICBpZihuZXdWYWx1ZTwwKXtcclxuICAgICAgICAgICAgdGhpcy5zaGllbGRfdmFsdWU9MDtcclxuICAgICAgICAgICAgdGhpcy5kZXN0cm95U2VsZigpO1xyXG4gICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICB0aGlzLnNoaWVsZF92YWx1ZT1uZXdWYWx1ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIG5ld1ZhbHVlO1xyXG4gICAgfVxyXG5cclxuICAgIHNldEdhbWVFZmZlY3REYXRhKGlkOkdhbWVFZmZlY3RJZCxub2RlOmNjLk5vZGUpe1xyXG4gICAgICAgIHRoaXMuZ2FtZV9lZmZlY3RfZGF0YS5zZXQoaWQsbm9kZSk7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0U2hpZWxkVmFsdWUoKTpudW1iZXJ7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuc2hpZWxkX3ZhbHVlO1xyXG4gICAgfVxyXG5cclxuICAgIGdldFJlbWFpblRpbWUoKTpudW1iZXJ7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMucmVtYWluX3RpbWU7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0U2hpZWxkVHlwZSgpOlNoaWVsZFR5cGV7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuc2hpZWxkX3R5cGU7XHJcbiAgICB9XHJcblxyXG4gICAgcmVmcmVzaFNoaWVsZChyZW1haW5UaW1lOm51bWJlcix2YWx1ZTpudW1iZXIpe1xyXG4gICAgICAgIHRoaXMucmVtYWluX3RpbWU9cmVtYWluVGltZTtcclxuICAgICAgICB0aGlzLnNoaWVsZF92YWx1ZT12YWx1ZTtcclxuICAgIH1cclxuXHJcbiAgICBnZXRJc0NhbldpdGhzdGFuZCh0eXBlOkRhbWFnZVR5cGUpOmJvb2xlYW57ICAgICAgICBcclxuICAgICAgICBpZih0aGlzLnNoaWVsZF90eXBlPT1TaGllbGRUeXBlLkFsbCB8fCB0aGlzLnNoaWVsZF90eXBlPT10eXBlLnZhbHVlT2YoKSl7XHJcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcblxyXG4gICAgZGVzdHJveVNlbGYoKXtcclxuICAgICAgICB0aGlzLmdhbWVfZWZmZWN0X2RhdGEuZm9yRWFjaCgodixrKT0+e1xyXG4gICAgICAgICAgICBHYW1lRWZmZWN0c01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5kZXN0cm95R2FtZUVmZmVjdEJ5SWQoayx2KTtcclxuICAgICAgICB9KTtcclxuICAgICAgICB0aGlzLm5vZGUucmVtb3ZlRnJvbVBhcmVudCgpO1xyXG4gICAgICAgIGlmKHRoaXMuZGVzdHJveV9jYWxsYmFjayl7XHJcbiAgICAgICAgICAgIHRoaXMuZGVzdHJveV9jYWxsYmFjayh0aGlzLnNoaWVsZF9pZCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHByb3RlY3RlZCB1cGRhdGUoZHQ6IG51bWJlcik6IHZvaWQge1xyXG4gICAgICAgIGlmKEdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuY3VyX2dhbWVfc3RhdGU9PUdhbWVTdGF0ZS5HYW1lX1BsYXlpbmcpe1xyXG4gICAgICAgICAgICBpZih0aGlzLnJlbWFpbl90aW1lPjApe1xyXG4gICAgICAgICAgICAgICAgdGhpcy5yZW1haW5fdGltZS09ZHQ7XHJcbiAgICAgICAgICAgICAgICBpZih0aGlzLnJlbWFpbl90aW1lPDApe1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMucmVtYWluX3RpbWU9MDtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmRlc3Ryb3lTZWxmKCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9ICAgICAgICBcclxuICAgIH1cclxufVxyXG4iXX0=