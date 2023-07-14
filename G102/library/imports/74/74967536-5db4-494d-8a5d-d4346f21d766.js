"use strict";
cc._RF.push(module, '74967U2XbRJTYpd1DRvIddm', 'EliteAtt65');
// Scripts/Monster/Elite/EliteAtt65.ts

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
var GameManager_1 = require("../../GameManager");
var BuffData_1 = require("../../Hero/Game/BuffData");
var HeroConfig_1 = require("../../Hero/Game/HeroConfig");
var WallConfig_1 = require("../../Wall/WallConfig");
var MonsterData_1 = require("../MonsterData");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var EliteAtt65 = /** @class */ (function (_super) {
    __extends(EliteAtt65, _super);
    function EliteAtt65() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.att_hero = HeroConfig_1.Hero_Type.NULL;
        return _this;
    }
    EliteAtt65.prototype.onLoad = function () {
        _super.prototype.addCollisionWallListen.call(this, this.onCollisionWall);
    };
    EliteAtt65.prototype.setAttHero = function (heroId) {
        this.att_hero = heroId;
    };
    ////--------------------------------------碰撞开始----------------------------------------------------
    EliteAtt65.prototype.onCollisionWall = function (wall) {
        if (wall) {
            var data = wall.beInjured(this.monster_att_data);
            _super.prototype.destroySelf.call(this);
            if (data.getDamageNum() > 0) {
                if (data.feedback_type == MonsterData_1.FeedBackType.BaoJi) {
                    GameEffectsManager_1.GameEffectsManager.getInstance().createGameEffectById(GameEffectsManager_1.GameEffectId.monster65_shuangjuren_att_hit_crit, this.node.getPosition());
                    if (wall.getWallType() == WallConfig_1.WallType.Main && this.att_hero != HeroConfig_1.Hero_Type.NULL) {
                        //眩晕英雄
                        var buffData = new BuffData_1.BuffData();
                        buffData.buff_id = HeroConfig_1.BuffId.Monster_XuanYun;
                        buffData.game_effect_id = GameEffectsManager_1.GameEffectId.xuanyun;
                        buffData.remain_time = 1;
                        buffData.buff_type = HeroConfig_1.BuffType.Vertigo;
                        GameManager_1.default.getInstance().all_hero.get(this.att_hero).addDeBuff(buffData);
                    }
                }
                else {
                    GameEffectsManager_1.GameEffectsManager.getInstance().createGameEffectById(GameEffectsManager_1.GameEffectId.monster65_shuangjuren_att_hit, this.node.getPosition());
                }
            }
        }
    };
    EliteAtt65 = __decorate([
        ccclass
    ], EliteAtt65);
    return EliteAtt65;
}(BossBullet_1.default));
exports.default = EliteAtt65;

cc._RF.pop();