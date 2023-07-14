"use strict";
cc._RF.push(module, '0c991/CGo5KlJpn6YK4GcQw', 'FireRing');
// Scripts/Pet/Game/FireRing.ts

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
var GameEffectsManager_1 = require("../../Game/GameEffectsManager");
var GongJi_1 = require("../../Hero/Game/GongJi");
var Monster_1 = require("../../Monster/Monster");
var MonsterManager_1 = require("../../Monster/MonsterManager");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var FireRing = /** @class */ (function (_super) {
    __extends(FireRing, _super);
    function FireRing() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        /**持续时间 */
        _this.remain_time = 0;
        /**伤害间隔 */
        _this.damage_jiange = 0;
        /**伤害计数 */
        _this.damage_jishu = 0;
        /**半径 */
        _this.radius = 0;
        _this.game_effect_id = 0;
        _this.is_destroy = false;
        return _this;
    }
    FireRing.prototype.init = function (gameEffectId, gjData, remainTime, radius, damageJiange) {
        this.initData(gjData);
        this.game_effect_id = gameEffectId;
        this.remain_time = remainTime;
        this.radius = radius;
        this.damage_jiange = damageJiange;
        this.is_destroy = false;
        this.damage_jishu = 0;
        this.checkDamage();
        //标准半径是100.
        this.node.scale = radius / 100;
    };
    FireRing.prototype.destroySelf = function () {
        if (this.is_destroy) {
            return;
        }
        this.is_destroy = true;
        GameEffectsManager_1.GameEffectsManager.getInstance().destroyGameEffectById(this.game_effect_id, this.node);
    };
    FireRing.prototype.checkDamage = function () {
        var monsters = MonsterManager_1.default.getInstance().getMonstersForCenterPos(-1, this.node.getPosition(), this.radius);
        if (monsters) {
            for (var i = 0; i < monsters.length; i++) {
                var monsterTs = monsters[i].getComponent(Monster_1.default);
                monsterTs.beFlashInjured(this.gongji_data);
            }
        }
    };
    FireRing.prototype.update = function (dt) {
        if (this.remain_time > 0) {
            this.remain_time -= dt;
            this.damage_jishu += dt;
            if (this.damage_jishu >= this.damage_jiange) {
                this.damage_jishu = 0;
                this.checkDamage();
            }
        }
        else {
            this.destroySelf();
        }
    };
    FireRing = __decorate([
        ccclass
    ], FireRing);
    return FireRing;
}(GongJi_1.default));
exports.default = FireRing;

cc._RF.pop();