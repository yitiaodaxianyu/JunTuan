"use strict";
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