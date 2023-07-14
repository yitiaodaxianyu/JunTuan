"use strict";
cc._RF.push(module, '55644Hy2jxEn7rgaxmWRkla', 'FireBullect');
// Scripts/Pet/Game/FireBullect.ts

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
var GroundManager_1 = require("../../Game/GroundManager");
var Bullect_1 = require("../../Hero/Game/Bullect");
var PetConfig_1 = require("../PetConfig");
var FireRing_1 = require("./FireRing");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var FireBullect = /** @class */ (function (_super) {
    __extends(FireBullect, _super);
    function FireBullect() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.pet_data = null;
        return _this;
    }
    FireBullect.prototype.onLoad = function () {
        _super.prototype.onLoad.call(this);
        _super.prototype.addCollisionMonsterListen.call(this, this.onCollisionMonster);
    };
    FireBullect.prototype.initPetData = function (petData) {
        this.pet_data = petData;
    };
    FireBullect.prototype.onCollisionMonster = function (monsterTs) {
        if (monsterTs) {
            GameEffectsManager_1.GameEffectsManager.getInstance().createGameEffectById(GameEffectsManager_1.GameEffectId.pet2_attack_hit, this.getHeadPos());
            var fireRing = GroundManager_1.default.getInstance().createGameEffectById(GameEffectsManager_1.GameEffectId.pet2_skill, monsterTs.node.getPosition());
            fireRing.getComponent(FireRing_1.default).init(GameEffectsManager_1.GameEffectId.pet2_skill, this.gongji_data, this.pet_data.getSkillValue3(PetConfig_1.PetSkillType.Active), this.pet_data.getSkillValue1(PetConfig_1.PetSkillType.Active), 1);
            //fireRing.getComponent(FireRing).init(GameEffectId.pet2_skill,this.gongji_data,10,200,1);
            this.destroySelf();
        }
    };
    FireBullect = __decorate([
        ccclass
    ], FireBullect);
    return FireBullect;
}(Bullect_1.default));
exports.default = FireBullect;

cc._RF.pop();