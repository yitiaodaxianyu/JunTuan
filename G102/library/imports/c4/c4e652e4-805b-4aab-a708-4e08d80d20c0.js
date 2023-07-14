"use strict";
cc._RF.push(module, 'c4e65LkgFtKq6cITgjYDSDA', 'DamageRecord');
// Scripts/Hero/Game/DamageRecord.ts

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
var HeroManager_1 = require("../Data/HeroManager");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var DamageRecord = /** @class */ (function (_super) {
    __extends(DamageRecord, _super);
    function DamageRecord() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        /**游戏特效id */
        _this.game_effect_id = GameEffectsManager_1.GameEffectId.Null;
        _this.value_label = null;
        _this.total_value = 0;
        _this.remain_time = 5;
        /**销毁回调 */
        _this.destroy_callback = null;
        _this.skill_release_id = 0;
        return _this;
    }
    DamageRecord.prototype.init = function (gameEffectId, skillReleaseId, value, callback) {
        this.game_effect_id = gameEffectId;
        this.skill_release_id = skillReleaseId;
        this.destroy_callback = callback;
        var heroId = Math.floor(skillReleaseId / 10000);
        var icon = this.node.getChildByName('icon').getComponent(cc.Sprite);
        icon.spriteFrame = HeroManager_1.HeroManager.getInstance().getSpriteFrameByNames('Hero_' + heroId + '_Skill_0');
        if (!this.value_label) {
            this.value_label = this.node.getChildByName('num').getComponent(cc.Label);
        }
        this.total_value = 0;
        this.refreshValue(value);
    };
    /**刷新伤害值 */
    DamageRecord.prototype.refreshValue = function (value) {
        this.remain_time = 5;
        this.node.opacity = 255;
        this.total_value += Math.round(value);
        this.value_label.string = this.total_value.toString();
    };
    DamageRecord.prototype.destroySelf = function () {
        GameEffectsManager_1.GameEffectsManager.getInstance().destroyGameEffectById(this.game_effect_id, this.node);
        if (this.destroy_callback) {
            this.destroy_callback(this.skill_release_id);
        }
    };
    DamageRecord.prototype.update = function (dt) {
        if (GameManager_1.default.getInstance().cur_game_state == Constants_1.GameState.Game_Playing) {
            if (this.remain_time > 0) {
                this.remain_time -= dt;
                if (this.remain_time <= 2) {
                    this.node.opacity -= 2;
                    if (this.remain_time <= 0) {
                        this.remain_time = 0;
                        this.destroySelf();
                    }
                }
            }
        }
    };
    DamageRecord = __decorate([
        ccclass
    ], DamageRecord);
    return DamageRecord;
}(cc.Component));
exports.default = DamageRecord;

cc._RF.pop();