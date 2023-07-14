
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Scripts/Wall/ImmunityShield.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'e3d539oQlxAYoILsPEFewYs', 'ImmunityShield');
// Scripts/Wall/ImmunityShield.ts

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
var HeroConfig_1 = require("../Hero/Game/HeroConfig");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var ImmunityShield = /** @class */ (function (_super) {
    __extends(ImmunityShield, _super);
    function ImmunityShield() {
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
        return _this;
    }
    ImmunityShield.prototype.init = function (id, type, remainTime, value, callback) {
        this.shield_id = id;
        this.remain_time = remainTime;
        this.shield_value = value;
        this.shield_type = type;
        this.destroy_callback = callback;
    };
    /**更改护盾值，返回更改后的值值*/
    ImmunityShield.prototype.changeShieldValue = function (num) {
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
    ImmunityShield.prototype.getShieldValue = function () {
        return this.shield_value;
    };
    ImmunityShield.prototype.getRemainTime = function () {
        return this.remain_time;
    };
    ImmunityShield.prototype.getShieldType = function () {
        return this.shield_type;
    };
    ImmunityShield.prototype.refreshShield = function (remainTime, value) {
        this.remain_time = remainTime;
        this.shield_value = value;
    };
    ImmunityShield.prototype.getIsCanWithstand = function (type) {
        if (this.shield_type == HeroConfig_1.ShieldType.All || this.shield_type == type.valueOf()) {
            return true;
        }
        return false;
    };
    ImmunityShield.prototype.destroySelf = function () {
        this.node.removeFromParent();
        if (this.destroy_callback) {
            this.destroy_callback(this.shield_id);
        }
    };
    ImmunityShield.prototype.update = function (dt) {
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
    ImmunityShield = __decorate([
        ccclass
    ], ImmunityShield);
    return ImmunityShield;
}(cc.Component));
exports.default = ImmunityShield;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0c1xcV2FsbFxcSW1tdW5pdHlTaGllbGQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsMENBQXlDO0FBQ3pDLDhDQUF5QztBQUN6QyxzREFBaUU7QUFHM0QsSUFBQSxLQUFzQixFQUFFLENBQUMsVUFBVSxFQUFsQyxPQUFPLGFBQUEsRUFBRSxRQUFRLGNBQWlCLENBQUM7QUFHMUM7SUFBNEMsa0NBQVk7SUFBeEQ7UUFBQSxxRUEwRUM7UUF6RUcsYUFBYTtRQUNMLGVBQVMsR0FBUSxDQUFDLENBQUM7UUFDM0IsV0FBVztRQUNILGlCQUFXLEdBQVEsQ0FBQyxDQUFDO1FBQzdCLGFBQWE7UUFDTCxrQkFBWSxHQUFRLENBQUMsQ0FBQztRQUM5QixvQkFBb0I7UUFDWixpQkFBVyxHQUFZLHVCQUFVLENBQUMsTUFBTSxDQUFDO1FBQ2pELG1CQUFtQjtRQUNYLHNCQUFnQixHQUFVLElBQUksQ0FBQzs7SUFnRTNDLENBQUM7SUE5REcsNkJBQUksR0FBSixVQUFLLEVBQVMsRUFBQyxJQUFlLEVBQUMsVUFBaUIsRUFBQyxLQUFZLEVBQUMsUUFBaUI7UUFDM0UsSUFBSSxDQUFDLFNBQVMsR0FBQyxFQUFFLENBQUM7UUFDbEIsSUFBSSxDQUFDLFdBQVcsR0FBQyxVQUFVLENBQUM7UUFDNUIsSUFBSSxDQUFDLFlBQVksR0FBQyxLQUFLLENBQUM7UUFDeEIsSUFBSSxDQUFDLFdBQVcsR0FBQyxJQUFJLENBQUM7UUFDdEIsSUFBSSxDQUFDLGdCQUFnQixHQUFDLFFBQVEsQ0FBQztJQUNuQyxDQUFDO0lBRUQsbUJBQW1CO0lBQ25CLDBDQUFpQixHQUFqQixVQUFrQixHQUFVO1FBQ3hCLElBQUksUUFBUSxHQUFDLElBQUksQ0FBQyxZQUFZLEdBQUMsR0FBRyxDQUFDO1FBQ25DLElBQUcsUUFBUSxHQUFDLENBQUMsRUFBQztZQUNWLElBQUksQ0FBQyxZQUFZLEdBQUMsQ0FBQyxDQUFDO1lBQ3BCLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQztTQUN0QjthQUFJO1lBQ0QsSUFBSSxDQUFDLFlBQVksR0FBQyxRQUFRLENBQUM7U0FDOUI7UUFDRCxPQUFPLFFBQVEsQ0FBQztJQUNwQixDQUFDO0lBRUQsdUNBQWMsR0FBZDtRQUNJLE9BQU8sSUFBSSxDQUFDLFlBQVksQ0FBQztJQUM3QixDQUFDO0lBRUQsc0NBQWEsR0FBYjtRQUNJLE9BQU8sSUFBSSxDQUFDLFdBQVcsQ0FBQztJQUM1QixDQUFDO0lBRUQsc0NBQWEsR0FBYjtRQUNJLE9BQU8sSUFBSSxDQUFDLFdBQVcsQ0FBQztJQUM1QixDQUFDO0lBRUQsc0NBQWEsR0FBYixVQUFjLFVBQWlCLEVBQUMsS0FBWTtRQUN4QyxJQUFJLENBQUMsV0FBVyxHQUFDLFVBQVUsQ0FBQztRQUM1QixJQUFJLENBQUMsWUFBWSxHQUFDLEtBQUssQ0FBQztJQUM1QixDQUFDO0lBRUQsMENBQWlCLEdBQWpCLFVBQWtCLElBQWU7UUFDN0IsSUFBRyxJQUFJLENBQUMsV0FBVyxJQUFFLHVCQUFVLENBQUMsR0FBRyxJQUFJLElBQUksQ0FBQyxXQUFXLElBQUUsSUFBSSxDQUFDLE9BQU8sRUFBRSxFQUFDO1lBQ3BFLE9BQU8sSUFBSSxDQUFDO1NBQ2Y7UUFDRCxPQUFPLEtBQUssQ0FBQztJQUNqQixDQUFDO0lBRU8sb0NBQVcsR0FBbkI7UUFDSSxJQUFJLENBQUMsSUFBSSxDQUFDLGdCQUFnQixFQUFFLENBQUM7UUFDN0IsSUFBRyxJQUFJLENBQUMsZ0JBQWdCLEVBQUM7WUFDckIsSUFBSSxDQUFDLGdCQUFnQixDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQztTQUN6QztJQUNMLENBQUM7SUFFUywrQkFBTSxHQUFoQixVQUFpQixFQUFVO1FBQ3ZCLElBQUcscUJBQVcsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxjQUFjLElBQUUscUJBQVMsQ0FBQyxZQUFZLEVBQUM7WUFDaEUsSUFBRyxJQUFJLENBQUMsV0FBVyxHQUFDLENBQUMsRUFBQztnQkFDbEIsSUFBSSxDQUFDLFdBQVcsSUFBRSxFQUFFLENBQUM7Z0JBQ3JCLElBQUcsSUFBSSxDQUFDLFdBQVcsR0FBQyxDQUFDLEVBQUM7b0JBQ2xCLElBQUksQ0FBQyxXQUFXLEdBQUMsQ0FBQyxDQUFDO29CQUNuQixJQUFJLENBQUMsV0FBVyxFQUFFLENBQUM7aUJBQ3RCO2FBQ0o7U0FDSjtJQUNMLENBQUM7SUF6RWdCLGNBQWM7UUFEbEMsT0FBTztPQUNhLGNBQWMsQ0EwRWxDO0lBQUQscUJBQUM7Q0ExRUQsQUEwRUMsQ0ExRTJDLEVBQUUsQ0FBQyxTQUFTLEdBMEV2RDtrQkExRW9CLGNBQWMiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBHYW1lU3RhdGUgfSBmcm9tIFwiLi4vQ29uc3RhbnRzXCI7XHJcbmltcG9ydCBHYW1lTWFuYWdlciBmcm9tIFwiLi4vR2FtZU1hbmFnZXJcIjtcclxuaW1wb3J0IHsgU2hpZWxkVHlwZSwgRGFtYWdlVHlwZSB9IGZyb20gXCIuLi9IZXJvL0dhbWUvSGVyb0NvbmZpZ1wiO1xyXG5cclxuXHJcbmNvbnN0IHtjY2NsYXNzLCBwcm9wZXJ0eX0gPSBjYy5fZGVjb3JhdG9yO1xyXG5cclxuQGNjY2xhc3NcclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgSW1tdW5pdHlTaGllbGQgZXh0ZW5kcyBjYy5Db21wb25lbnQge1xyXG4gICAgLyoq5oqk55u+55qE5ZSv5LiAaWQgKi8gICAgXHJcbiAgICBwcml2YXRlIHNoaWVsZF9pZDpudW1iZXI9MDtcclxuICAgIC8qKuWJqeS9meeahOaXtumXtCAqL1xyXG4gICAgcHJpdmF0ZSByZW1haW5fdGltZTpudW1iZXI9MDtcclxuICAgIC8qKuWJqeS9meeahOWFjeeWq+asoeaVsCAqL1xyXG4gICAgcHJpdmF0ZSBzaGllbGRfdmFsdWU6bnVtYmVyPTA7XHJcbiAgICAvKirmiqTnm77nsbvlnovvvIzlj6/ku6XmirXmtojnmoTkvKTlrrPnsbvlnosgKi9cclxuICAgIHByaXZhdGUgc2hpZWxkX3R5cGU6U2hpZWxkVHlwZT1TaGllbGRUeXBlLk5vcm1hbDtcclxuICAgIC8qKuaXtumXtOe7k+adn+aIluaKpOebvuiiq+egtOaXtueahOWbnuiwgyAqL1xyXG4gICAgcHJpdmF0ZSBkZXN0cm95X2NhbGxiYWNrOkZ1bmN0aW9uPW51bGw7XHJcblxyXG4gICAgaW5pdChpZDpudW1iZXIsdHlwZTpTaGllbGRUeXBlLHJlbWFpblRpbWU6bnVtYmVyLHZhbHVlOm51bWJlcixjYWxsYmFjazpGdW5jdGlvbil7XHJcbiAgICAgICAgdGhpcy5zaGllbGRfaWQ9aWQ7XHJcbiAgICAgICAgdGhpcy5yZW1haW5fdGltZT1yZW1haW5UaW1lO1xyXG4gICAgICAgIHRoaXMuc2hpZWxkX3ZhbHVlPXZhbHVlO1xyXG4gICAgICAgIHRoaXMuc2hpZWxkX3R5cGU9dHlwZTtcclxuICAgICAgICB0aGlzLmRlc3Ryb3lfY2FsbGJhY2s9Y2FsbGJhY2s7XHJcbiAgICB9XHJcblxyXG4gICAgLyoq5pu05pS55oqk55u+5YC877yM6L+U5Zue5pu05pS55ZCO55qE5YC85YC8Ki9cclxuICAgIGNoYW5nZVNoaWVsZFZhbHVlKG51bTpudW1iZXIpOm51bWJlcnsgICAgICAgIFxyXG4gICAgICAgIGxldCBuZXdWYWx1ZT10aGlzLnNoaWVsZF92YWx1ZStudW07XHJcbiAgICAgICAgaWYobmV3VmFsdWU8MCl7XHJcbiAgICAgICAgICAgIHRoaXMuc2hpZWxkX3ZhbHVlPTA7XHJcbiAgICAgICAgICAgIHRoaXMuZGVzdHJveVNlbGYoKTtcclxuICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgdGhpcy5zaGllbGRfdmFsdWU9bmV3VmFsdWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBuZXdWYWx1ZTtcclxuICAgIH1cclxuXHJcbiAgICBnZXRTaGllbGRWYWx1ZSgpOm51bWJlcntcclxuICAgICAgICByZXR1cm4gdGhpcy5zaGllbGRfdmFsdWU7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0UmVtYWluVGltZSgpOm51bWJlcntcclxuICAgICAgICByZXR1cm4gdGhpcy5yZW1haW5fdGltZTtcclxuICAgIH1cclxuXHJcbiAgICBnZXRTaGllbGRUeXBlKCk6U2hpZWxkVHlwZXtcclxuICAgICAgICByZXR1cm4gdGhpcy5zaGllbGRfdHlwZTtcclxuICAgIH1cclxuXHJcbiAgICByZWZyZXNoU2hpZWxkKHJlbWFpblRpbWU6bnVtYmVyLHZhbHVlOm51bWJlcil7XHJcbiAgICAgICAgdGhpcy5yZW1haW5fdGltZT1yZW1haW5UaW1lO1xyXG4gICAgICAgIHRoaXMuc2hpZWxkX3ZhbHVlPXZhbHVlO1xyXG4gICAgfVxyXG5cclxuICAgIGdldElzQ2FuV2l0aHN0YW5kKHR5cGU6RGFtYWdlVHlwZSk6Ym9vbGVhbnsgICAgICAgIFxyXG4gICAgICAgIGlmKHRoaXMuc2hpZWxkX3R5cGU9PVNoaWVsZFR5cGUuQWxsIHx8IHRoaXMuc2hpZWxkX3R5cGU9PXR5cGUudmFsdWVPZigpKXtcclxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGRlc3Ryb3lTZWxmKCl7XHJcbiAgICAgICAgdGhpcy5ub2RlLnJlbW92ZUZyb21QYXJlbnQoKTtcclxuICAgICAgICBpZih0aGlzLmRlc3Ryb3lfY2FsbGJhY2spe1xyXG4gICAgICAgICAgICB0aGlzLmRlc3Ryb3lfY2FsbGJhY2sodGhpcy5zaGllbGRfaWQpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwcm90ZWN0ZWQgdXBkYXRlKGR0OiBudW1iZXIpOiB2b2lkIHtcclxuICAgICAgICBpZihHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLmN1cl9nYW1lX3N0YXRlPT1HYW1lU3RhdGUuR2FtZV9QbGF5aW5nKXtcclxuICAgICAgICAgICAgaWYodGhpcy5yZW1haW5fdGltZT4wKXtcclxuICAgICAgICAgICAgICAgIHRoaXMucmVtYWluX3RpbWUtPWR0O1xyXG4gICAgICAgICAgICAgICAgaWYodGhpcy5yZW1haW5fdGltZTwwKXtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnJlbWFpbl90aW1lPTA7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5kZXN0cm95U2VsZigpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSAgICAgICAgXHJcbiAgICB9XHJcbn1cclxuIl19