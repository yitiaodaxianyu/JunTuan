"use strict";
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