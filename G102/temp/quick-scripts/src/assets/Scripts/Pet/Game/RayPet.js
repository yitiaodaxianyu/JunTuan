"use strict";
cc._RF.push(module, '33a89gf8xVHuq7Z8lUd+LZ+', 'RayPet');
// Scripts/Pet/Game/RayPet.ts

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
var ChainLightning_1 = require("../../Hero/Game/LeiShen/ChainLightning");
var Monster_1 = require("../../Monster/Monster");
var MonsterManager_1 = require("../../Monster/MonsterManager");
var PetConfig_1 = require("../PetConfig");
var Pet_1 = require("./Pet");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var RayPet = /** @class */ (function (_super) {
    __extends(RayPet, _super);
    function RayPet() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        /**被闪电过的怪的uuid */
        _this.shandian_monster = [];
        return _this;
        // update(dt:number){
        //     if(GameManager.getInstance().cur_game_state!=GameState.Game_Playing)
        //     {
        //         return;
        //     }
        //     this.checkSkill(dt);
        // }
        // checkSkill(dt:number){
        //     this.cd_time-=dt;
        //     if(this.cd_time<0){
        //         this.cd_time=0;
        //     }
        // }
    }
    RayPet.prototype.onLoad = function () {
        _super.prototype.onLoad.call(this);
        this.addAttackListen(this.onAttack);
        this.addInitedListen(this.onPetInited);
    };
    RayPet.prototype.onPetInited = function () {
        this.cd_time = 0;
    };
    /**普攻对敌人释放一道闪电，可以连续弹射N次*/
    RayPet.prototype.onAttack = function (monster) {
        if (Math.random() < this.pet_data.getSkillValue1(PetConfig_1.PetSkillType.Active)) {
            this.shandian_monster = new Array();
            this.createShanDian(null, monster.getComponent(Monster_1.default));
            this.cd_time = 0;
        }
    };
    RayPet.prototype.createShanDian = function (firstMonster, endMonster) {
        this.shandian_monster.push(endMonster.uuid);
        var shandian = GameEffectsManager_1.GameEffectsManager.getInstance().createGameEffectById(GameEffectsManager_1.GameEffectId.pet4_skill, this.node.getPosition());
        shandian.getComponent(ChainLightning_1.default).init(GameEffectsManager_1.GameEffectId.pet4_skill, firstMonster, endMonster, this.onEndMonster.bind(this));
        var gjData = this.getGongJiData(false, this.pet_data.getSkillValue3(PetConfig_1.PetSkillType.Active));
        var data = endMonster.beFlashInjured(gjData);
    };
    RayPet.prototype.onEndMonster = function (endMonster) {
        var tansheNum = this.pet_data.getSkillValue2(PetConfig_1.PetSkillType.Active);
        if (this.shandian_monster.length < tansheNum) {
            var nextMonster = this.getMonster(endMonster.getCenterPos());
            if (nextMonster) {
                this.createShanDian(endMonster, nextMonster);
            }
        }
    };
    RayPet.prototype.getIsTanShe = function (uuid) {
        return this.shandian_monster.indexOf(uuid) >= 0;
    };
    RayPet.prototype.getMonster = function (pos) {
        var em = MonsterManager_1.default.getInstance();
        if (em.node.childrenCount <= 0) {
            return null;
        }
        //1.先检测在攻击范围内符合攻击单位的敌人
        var attMonsters = new Array();
        for (var _i = 0, _a = em.node.children; _i < _a.length; _i++) {
            var enemy = _a[_i];
            var enemyTS = enemy.getComponent(Monster_1.default);
            if (enemyTS && enemyTS.getIsCanCheck() == true) {
                var distance = pos.sub(enemyTS.getCenterPos()).mag();
                if (this.getIsTanShe(enemyTS.uuid) == false && distance <= 500) {
                    attMonsters.push(enemyTS);
                }
            }
        }
        if (attMonsters.length <= 0) {
            return null;
        }
        if (1 == attMonsters.length) {
            return attMonsters[0];
        }
        //2.1优先攻击跟目标位置最近的单位
        attMonsters.sort(function (a, b) {
            return a.getCenterPos().sub(pos).mag() - b.getCenterPos().sub(pos).mag();
        });
        return attMonsters[0];
    };
    RayPet = __decorate([
        ccclass
    ], RayPet);
    return RayPet;
}(Pet_1.default));
exports.default = RayPet;

cc._RF.pop();