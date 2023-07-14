"use strict";
cc._RF.push(module, '492e151rJhMA6QyJlWXyHF5', 'WindPet');
// Scripts/Pet/Game/WindPet.ts

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
var BuffData_1 = require("../../Hero/Game/BuffData");
var HeroConfig_1 = require("../../Hero/Game/HeroConfig");
var PetConfig_1 = require("../PetConfig");
var Pet_1 = require("./Pet");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var WindPet = /** @class */ (function (_super) {
    __extends(WindPet, _super);
    function WindPet() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.buff_node_back = null;
        _this.buff_node_front = null;
        return _this;
    }
    WindPet.prototype.onLoad = function () {
        _super.prototype.onLoad.call(this);
        this.addAttackListen(this.onAttack);
    };
    WindPet.prototype.onAttack = function (monster) {
        //加攻速
        var buff = new BuffData_1.BuffData();
        buff.buff_id = HeroConfig_1.BuffId.Pet3_JiaSu;
        buff.buff_value = [this.pet_data.getSkillValue1(PetConfig_1.PetSkillType.Active)];
        buff.remain_time = this.pet_data.getSkillValue2(PetConfig_1.PetSkillType.Active);
        buff.buff_type = HeroConfig_1.BuffType.Gain;
        var hero = GameManager_1.default.getInstance().getHero(this.hero_type);
        var buffTimer = hero.addBuff(buff);
        buffTimer.addDestroyListen(this.onBuffDestroy.bind(this));
        var pos = hero.node.getPosition();
        this.buff_node_back = GameEffectsManager_1.GameEffectsManager.getInstance().createGameEffectForParent(GameEffectsManager_1.GameEffectId.pet3_skill_back, pos, cc.find("Canvas/Hero_Shadow_Root"));
        this.buff_node_front = GameEffectsManager_1.GameEffectsManager.getInstance().createGameEffectForParent(GameEffectsManager_1.GameEffectId.pet3_skill_front, pos, cc.find("Canvas/Pet_Root"));
    };
    WindPet.prototype.onBuffDestroy = function (buff) {
        GameEffectsManager_1.GameEffectsManager.getInstance().destroyGameEffectById(GameEffectsManager_1.GameEffectId.pet3_skill_back, this.buff_node_back);
        GameEffectsManager_1.GameEffectsManager.getInstance().destroyGameEffectById(GameEffectsManager_1.GameEffectId.pet3_skill_front, this.buff_node_front);
    };
    WindPet.prototype.update = function (dt) {
        if (GameManager_1.default.getInstance().cur_game_state != Constants_1.GameState.Game_Playing) {
            return;
        }
        this.checkSkill(dt);
    };
    WindPet.prototype.checkSkill = function (dt) {
        this.cd_time -= dt;
        if (this.cd_time < 0) {
            this.cd_time = 0;
        }
    };
    WindPet = __decorate([
        ccclass
    ], WindPet);
    return WindPet;
}(Pet_1.default));
exports.default = WindPet;

cc._RF.pop();