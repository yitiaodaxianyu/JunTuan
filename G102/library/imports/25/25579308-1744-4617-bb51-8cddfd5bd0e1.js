"use strict";
cc._RF.push(module, '25579MIF0RGF7tRjN39W9Dh', 'BossAtt1');
// Scripts/Boss/Boss1/BossAtt1.ts

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
var GameManager_1 = require("../../GameManager");
var AudioConstants_1 = require("../../Sound/AudioConstants");
var BossBullet_1 = require("../BossBullet");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var BossAtt1 = /** @class */ (function (_super) {
    __extends(BossAtt1, _super);
    function BossAtt1() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        /**0：普通攻击的，1是技能的 */
        _this.bullet_type = 0;
        return _this;
    }
    BossAtt1.prototype.onLoad = function () {
        _super.prototype.addCollisionWallListen.call(this, this.onCollisionWall);
    };
    ////--------------------------------------碰撞开始----------------------------------------------------
    BossAtt1.prototype.onCollisionWall = function (wall) {
        if (wall) {
            switch (this.bullet_type) {
                case 0:
                    {
                        var data = wall.beInjured(this.monster_att_data);
                        _super.prototype.destroySelf.call(this);
                        if (data.getDamageNum() > 0) {
                            GameEffectsManager_1.GameEffectsManager.getInstance().createGameEffectById(GameEffectsManager_1.GameEffectId.boss1_normal_att_hit, this.node.getPosition());
                            GameManager_1.default.getInstance().sound_manager.playSound(AudioConstants_1.SoundIndex.YX_Boss1Attack);
                        }
                    }
                    break;
                case 1:
                    {
                        var data = wall.beInjured(this.monster_att_data);
                        _super.prototype.destroySelf.call(this);
                        if (data.getDamageNum() > 0) {
                            GameEffectsManager_1.GameEffectsManager.getInstance().createGameEffectById(GameEffectsManager_1.GameEffectId.boss1_normal_skill_hit, this.node.getPosition());
                            GameManager_1.default.getInstance().sound_manager.playSound(AudioConstants_1.SoundIndex.YX_Boss1Attack);
                        }
                    }
                    break;
            }
        }
    };
    __decorate([
        property()
    ], BossAtt1.prototype, "bullet_type", void 0);
    BossAtt1 = __decorate([
        ccclass
    ], BossAtt1);
    return BossAtt1;
}(BossBullet_1.default));
exports.default = BossAtt1;

cc._RF.pop();