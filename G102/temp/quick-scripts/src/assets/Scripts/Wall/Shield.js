"use strict";
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