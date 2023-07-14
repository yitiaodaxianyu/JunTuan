"use strict";
cc._RF.push(module, '6c884BlZSBFyp1JjflOBJUx', 'BossAtt6');
// Scripts/Boss/Boss6/BossAtt6.ts

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
var BossBullet_1 = require("../BossBullet");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var BossAtt6 = /** @class */ (function (_super) {
    __extends(BossAtt6, _super);
    function BossAtt6() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        /**0：普通攻击的，1是技能的 */
        _this.bullet_type = 0;
        return _this;
    }
    BossAtt6.prototype.onLoad = function () {
        _super.prototype.addCollisionWallListen.call(this, this.onCollisionWall);
    };
    ////--------------------------------------碰撞开始----------------------------------------------------
    BossAtt6.prototype.onCollisionWall = function (wall) {
        if (wall) {
            switch (this.bullet_type) {
                case 0:
                    {
                        var data = wall.beInjured(this.monster_att_data);
                        _super.prototype.destroySelf.call(this);
                        if (data.getDamageNum() > 0) {
                            GameEffectsManager_1.GameEffectsManager.getInstance().createGameEffectById(GameEffectsManager_1.GameEffectId.boss6_skill2_hit, this.node.getPosition());
                            //GameManager.getInstance().sound_manager.playSound(SoundIndex.YX_Boss1Attack);
                        }
                    }
                    break;
                case 1:
                    {
                        var data = wall.beInjured(this.monster_att_data);
                        _super.prototype.destroySelf.call(this);
                        if (data.getDamageNum() > 0) {
                            GameEffectsManager_1.GameEffectsManager.getInstance().createGameEffectById(GameEffectsManager_1.GameEffectId.boss6_skill2_hit, this.node.getPosition());
                            //GameManager.getInstance().sound_manager.playSound(SoundIndex.YX_Boss1Attack);
                        }
                    }
                    break;
            }
        }
    };
    __decorate([
        property()
    ], BossAtt6.prototype, "bullet_type", void 0);
    BossAtt6 = __decorate([
        ccclass
    ], BossAtt6);
    return BossAtt6;
}(BossBullet_1.default));
exports.default = BossAtt6;

cc._RF.pop();