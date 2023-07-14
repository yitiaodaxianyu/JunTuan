"use strict";
cc._RF.push(module, 'b7b890z/zBLk640xE9rG/xI', 'IceBullect');
// Scripts/Pet/Game/IceBullect.ts

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
var BuffData_1 = require("../../Hero/Game/BuffData");
var Bullect_1 = require("../../Hero/Game/Bullect");
var HeroConfig_1 = require("../../Hero/Game/HeroConfig");
var Monster_1 = require("../../Monster/Monster");
var MonsterManager_1 = require("../../Monster/MonsterManager");
var PetConfig_1 = require("../PetConfig");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var IceBullect = /** @class */ (function (_super) {
    __extends(IceBullect, _super);
    function IceBullect() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.pet_data = null;
        return _this;
    }
    IceBullect.prototype.onLoad = function () {
        _super.prototype.onLoad.call(this);
        _super.prototype.addCollisionMonsterListen.call(this, this.onCollisionMonster);
    };
    IceBullect.prototype.initPetData = function (petData) {
        this.pet_data = petData;
    };
    IceBullect.prototype.start = function () {
        this.tuowei_space = 1;
    };
    IceBullect.prototype.onCollisionMonster = function (monsterTs) {
        if (monsterTs) {
            var radius = this.pet_data.getSkillValue1(PetConfig_1.PetSkillType.Active);
            var monsters = MonsterManager_1.default.getInstance().getMonstersForCenterPos(-1, monsterTs.getCenterPos(), radius);
            if (monsters) {
                var jiansuValue = this.pet_data.getSkillValue3(PetConfig_1.PetSkillType.Active);
                for (var i = 0; i < monsters.length; i++) {
                    var monsterTTs = monsters[i].getComponent(Monster_1.default);
                    var data = monsterTTs.beFlashInjured(this.gongji_data);
                    if (!data.is_die && data.getDamageNum() > 0) {
                        GameEffectsManager_1.GameEffectsManager.getInstance().createGameEffectById(GameEffectsManager_1.GameEffectId.pet1_attack_hit, monsterTTs.getCenterPos());
                        var buffData = new BuffData_1.BuffData();
                        buffData.buff_id = HeroConfig_1.BuffId.Pet1_JianSu;
                        buffData.buff_type = HeroConfig_1.BuffType.Slowdown;
                        buffData.buff_value = [jiansuValue];
                        buffData.remain_time = 3;
                        monsterTTs.addDeBuff(buffData, this.gongji_data);
                    }
                }
            }
        }
        this.destroySelf();
    };
    IceBullect = __decorate([
        ccclass
    ], IceBullect);
    return IceBullect;
}(Bullect_1.default));
exports.default = IceBullect;

cc._RF.pop();