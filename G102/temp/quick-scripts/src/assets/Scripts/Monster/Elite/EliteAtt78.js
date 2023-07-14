"use strict";
cc._RF.push(module, '79c83vlvx9DJoavTG74W8vs', 'EliteAtt78');
// Scripts/Monster/Elite/EliteAtt78.ts

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
var BossBullet_1 = require("../../Boss/BossBullet");
var GameEffectsManager_1 = require("../../Game/GameEffectsManager");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var EliteAtt78 = /** @class */ (function (_super) {
    __extends(EliteAtt78, _super);
    function EliteAtt78() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    EliteAtt78.prototype.onLoad = function () {
        _super.prototype.addCollisionWallListen.call(this, this.onCollisionWall);
    };
    ////--------------------------------------碰撞开始----------------------------------------------------
    EliteAtt78.prototype.onCollisionWall = function (wall) {
        if (wall) {
            this.monster_att_data.is_big = false;
            var data = wall.beInjured(this.monster_att_data);
            _super.prototype.destroySelf.call(this);
            if (data.getDamageNum() > 0) {
                GameEffectsManager_1.GameEffectsManager.getInstance().createGameEffectById(GameEffectsManager_1.GameEffectId.monster78_skill_bullect_hit, this.node.getPosition());
            }
        }
    };
    EliteAtt78 = __decorate([
        ccclass
    ], EliteAtt78);
    return EliteAtt78;
}(BossBullet_1.default));
exports.default = EliteAtt78;

cc._RF.pop();