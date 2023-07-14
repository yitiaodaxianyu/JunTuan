"use strict";
cc._RF.push(module, '6bb67ebjRFOr4hQb7odFstz', 'BossSkill6');
// Scripts/Boss/Boss6/BossSkill6.ts

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
var BuffData_1 = require("../../Hero/Game/BuffData");
var HeroConfig_1 = require("../../Hero/Game/HeroConfig");
var WallConfig_1 = require("../../Wall/WallConfig");
var BossBullet_1 = require("../BossBullet");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var BossSkill6 = /** @class */ (function (_super) {
    __extends(BossSkill6, _super);
    function BossSkill6() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.att_hero = HeroConfig_1.Hero_Type.NULL;
        _this.gongsu_value = 0;
        return _this;
    }
    BossSkill6.prototype.onLoad = function () {
        _super.prototype.addCollisionWallListen.call(this, this.onCollisionWall);
    };
    BossSkill6.prototype.setHeroType = function (heroType, value) {
        this.att_hero = heroType;
        this.gongsu_value = value;
    };
    ////--------------------------------------碰撞开始----------------------------------------------------
    BossSkill6.prototype.onCollisionWall = function (wall) {
        if (wall) {
            this.monster_att_data.is_big = false;
            var data = wall.beInjured(this.monster_att_data);
            _super.prototype.destroySelf.call(this);
            if (data.getDamageNum() > 0) {
                GameEffectsManager_1.GameEffectsManager.getInstance().createGameEffectById(GameEffectsManager_1.GameEffectId.boss6_skill2_hit, this.node.getPosition());
                if (wall.getWallType() == WallConfig_1.WallType.Main && this.att_hero != HeroConfig_1.Hero_Type.NULL) {
                    //减速
                    var buffData = new BuffData_1.BuffData();
                    buffData.buff_id = HeroConfig_1.BuffId.Boss6_Skill_2_jiangongsu;
                    buffData.remain_time = 5;
                    buffData.buff_value = [this.gongsu_value];
                    buffData.max_floor = 5;
                    GameManager_1.default.getInstance().all_hero.get(this.att_hero).addDeBuff(buffData);
                }
            }
        }
    };
    BossSkill6 = __decorate([
        ccclass
    ], BossSkill6);
    return BossSkill6;
}(BossBullet_1.default));
exports.default = BossSkill6;

cc._RF.pop();