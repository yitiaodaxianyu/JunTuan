"use strict";
cc._RF.push(module, '843127SnhhEuqDoa3UDafaU', 'BuffState');
// Scripts/Hero/Game/BuffState.ts

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
var HeroConfig_1 = require("./HeroConfig");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var BuffState = /** @class */ (function (_super) {
    __extends(BuffState, _super);
    function BuffState() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        /**剩余的时间 */
        _this.remain_time = 0;
        /**护盾类型，可以抵消的伤害类型 */
        _this.buff_type = HeroConfig_1.BuffStateType.Attack;
        /**时间结束的回调 */
        _this.destroy_callback = null;
        _this.opacity_num = 5;
        return _this;
    }
    BuffState.prototype.init = function (type, remainTime, callback) {
        this.remain_time = remainTime;
        this.buff_type = type;
        this.node.opacity = 255;
        this.destroy_callback = callback;
    };
    BuffState.prototype.getRemainTime = function () {
        return this.remain_time;
    };
    BuffState.prototype.getBuffType = function () {
        return this.buff_type;
    };
    BuffState.prototype.refreshTime = function (remainTime) {
        if (remainTime > this.remain_time) {
            this.remain_time = remainTime;
            if (this.remain_time >= 3) {
                this.node.opacity = 255;
            }
        }
    };
    BuffState.prototype.destroySelf = function () {
        if (this.destroy_callback) {
            this.destroy_callback(this.buff_type);
        }
        this.node.removeFromParent();
    };
    BuffState.prototype.update = function (dt) {
        if (GameManager_1.default.getInstance().cur_game_state == Constants_1.GameState.Game_Playing) {
            if (this.remain_time > 0) {
                this.remain_time -= dt;
                if (this.remain_time < 0) {
                    this.remain_time = 0;
                    this.destroySelf();
                }
                if (this.remain_time <= 3) {
                    this.node.opacity += this.opacity_num;
                    if (this.node.opacity <= 128) {
                        this.opacity_num = 5;
                    }
                    else if (this.node.opacity >= 255) {
                        this.opacity_num = -5;
                    }
                }
                else {
                    this.node.opacity = 255;
                }
            }
        }
    };
    BuffState = __decorate([
        ccclass
    ], BuffState);
    return BuffState;
}(cc.Component));
exports.default = BuffState;

cc._RF.pop();