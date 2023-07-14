"use strict";
cc._RF.push(module, 'ea625FWpVxHMIbwGLHxEZWA', 'IcePet');
// Scripts/Pet/Game/IcePet.ts

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
var Monster_1 = require("../../Monster/Monster");
var PetConfig_1 = require("../PetConfig");
var IceBullect_1 = require("./IceBullect");
var Pet_1 = require("./Pet");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var IcePet = /** @class */ (function (_super) {
    __extends(IcePet, _super);
    function IcePet() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    IcePet.prototype.onLoad = function () {
        _super.prototype.onLoad.call(this);
        this.addAttackListen(this.onAttack);
    };
    IcePet.prototype.onAttack = function (monster) {
        var pos = this.node.getPosition();
        var offsetPos = monster.getComponent(Monster_1.default).getCenterPos().sub(pos);
        var dir = Math.atan2(offsetPos.y, offsetPos.x);
        var fireBullect = GameEffectsManager_1.GameEffectsManager.getInstance().createGameEffectById(GameEffectsManager_1.GameEffectId.pet1_attack, pos);
        var ice = fireBullect.getComponent(IceBullect_1.default);
        ice.init(GameEffectsManager_1.GameEffectId.pet1_attack, 1000, dir, _super.prototype.getGongJiData.call(this, true, this.pet_data.getSkillValue2(PetConfig_1.PetSkillType.Active)));
        ice.initPetData(this.pet_data);
    };
    IcePet.prototype.update = function (dt) {
        if (GameManager_1.default.getInstance().cur_game_state != Constants_1.GameState.Game_Playing) {
            return;
        }
        this.checkSkill(dt);
    };
    IcePet.prototype.checkSkill = function (dt) {
        this.cd_time -= dt;
        if (this.cd_time < 0) {
            this.cd_time = 0;
        }
    };
    IcePet = __decorate([
        ccclass
    ], IcePet);
    return IcePet;
}(Pet_1.default));
exports.default = IcePet;

cc._RF.pop();