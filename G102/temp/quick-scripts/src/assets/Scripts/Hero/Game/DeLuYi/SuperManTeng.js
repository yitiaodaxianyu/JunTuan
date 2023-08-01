"use strict";
cc._RF.push(module, '4528csXbi9Cvptzn0HwvYBM', 'SuperManTeng');
// Scripts/Hero/Game/DeLuYi/SuperManTeng.ts

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
var GameEffectsManager_1 = require("../../../Game/GameEffectsManager");
var GameManager_1 = require("../../../GameManager");
var AudioConstants_1 = require("../../../Sound/AudioConstants");
var BuffData_1 = require("../BuffData");
var Bullect_1 = require("../Bullect");
var HeroConfig_1 = require("../HeroConfig");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var SuperManTeng = /** @class */ (function (_super) {
    __extends(SuperManTeng, _super);
    function SuperManTeng() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.hero_lvl = 0;
        return _this;
    }
    SuperManTeng.prototype.onLoad = function () {
        _super.prototype.onLoad.call(this);
        _super.prototype.addCollisionMonsterListen.call(this, this.onCollisionMonster);
        this.addInitFinishedListen(this.onInitFinished);
    };
    SuperManTeng.prototype.onInitFinished = function () {
        this.move_speed = 100;
        this.acceleration = 10;
    };
    SuperManTeng.prototype.onCollisionMonster = function (monsterTs) {
        if (monsterTs) {
            var data = monsterTs.beFlashInjured(this.gongji_data);
            if (data.getDamageNum() > 0) {
                GameManager_1.default.getInstance().sound_manager.playSound(AudioConstants_1.SoundIndex.YX_FashiSkiill2);
                var node_1 = GameEffectsManager_1.GameEffectsManager.getInstance().createGameEffectById(GameEffectsManager_1.GameEffectId.deluyi_active_skill_hit, monsterTs.node.getPosition());
                node_1.getComponent(cc.Animation).play();
                var buffData = new BuffData_1.BuffData();
                buffData.buff_id = HeroConfig_1.BuffId.Hero_XuanYun;
                buffData.buff_type = HeroConfig_1.BuffType.Vertigo;
                buffData.remain_time = this.gongji_data.hero_data.getSkillValue2(HeroConfig_1.SkillType.Active) + this.hero_lvl * 0.5;
                buffData.game_effect_id = GameEffectsManager_1.GameEffectId.xuanyun;
                monsterTs.addDeBuff(buffData, this.gongji_data);
                cc.tween(node_1).delay(buffData.remain_time).call(function () {
                    GameEffectsManager_1.GameEffectsManager.getInstance().destroyGameEffectById(GameEffectsManager_1.GameEffectId.deluyi_active_skill_hit, node_1);
                }).start();
                //大招命中,专武debuff
                var ex1 = this.gongji_data.hero_data.ExclusiveWeaponSkillValue_1;
                if (ex1 && ex1 > 0) {
                    var debuffData = new BuffData_1.BuffData();
                    debuffData.buff_id = HeroConfig_1.BuffId.Hero_DeLuYi_Ex;
                    debuffData.buff_type = HeroConfig_1.BuffType.Normal;
                    debuffData.remain_time = 5;
                    monsterTs.addDeBuff(debuffData, this.gongji_data);
                }
            }
            this.is_att = false;
        }
    };
    SuperManTeng = __decorate([
        ccclass
    ], SuperManTeng);
    return SuperManTeng;
}(Bullect_1.default));
exports.default = SuperManTeng;

cc._RF.pop();