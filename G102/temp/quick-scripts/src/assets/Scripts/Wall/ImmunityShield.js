"use strict";
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