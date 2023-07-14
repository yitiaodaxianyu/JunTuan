"use strict";
cc._RF.push(module, 'a67ed/AlFVEVI2PZb+//qgo', 'ShuangJuRen');
// Scripts/Monster/Elite/ShuangJuRen.ts

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
var EnemyConfig_1 = require("../../Enemy/EnemyConfig");
var GameEffectsManager_1 = require("../../Game/GameEffectsManager");
var GameManager_1 = require("../../GameManager");
var HeroManager_1 = require("../../Hero/Data/HeroManager");
var HeroConfig_1 = require("../../Hero/Game/HeroConfig");
var MonsterData_1 = require("../MonsterData");
var MonsterNewNormal_1 = require("../MonsterNewNormal");
var EliteAtt65_1 = require("./EliteAtt65");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var ShuangJuRen = /** @class */ (function (_super) {
    __extends(ShuangJuRen, _super);
    function ShuangJuRen() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ShuangJuRen.prototype.onLoad = function () {
        _super.prototype.onLoad.call(this);
        this.addMonsterNormalAttack(this.onMonsterNormalAttack);
        GameEffectsManager_1.GameEffectsManager.getInstance().addEffectPoolById(GameEffectsManager_1.GameEffectId.xuanyun, 2);
        GameEffectsManager_1.GameEffectsManager.getInstance().addEffectPoolById(GameEffectsManager_1.GameEffectId.monster65_shuangjuren_att);
        GameEffectsManager_1.GameEffectsManager.getInstance().addEffectPoolById(GameEffectsManager_1.GameEffectId.monster65_shuangjuren_att_hit);
        GameEffectsManager_1.GameEffectsManager.getInstance().addEffectPoolById(GameEffectsManager_1.GameEffectId.monster65_shuangjuren_att_hit_crit);
    };
    /**怪物开始攻击，返回是否截获本次攻击 */
    ShuangJuRen.prototype.onMonsterNormalAttack = function () {
        var _this = this;
        //发射
        this.att_jishu = 0;
        _super.prototype.setEnemyState.call(this, EnemyConfig_1.Enemy_State.att);
        var data = new MonsterData_1.KeyFrameData();
        data.name = 'OnDamaging';
        data.callback = function () {
            if (_this.getIsDie() == true) {
                return;
            }
            _this.att_jishu = 0;
            var attPos = _super.prototype.getAttPos.call(_this);
            var node = GameEffectsManager_1.GameEffectsManager.getInstance().createGameEffectById(GameEffectsManager_1.GameEffectId.monster65_shuangjuren_att, attPos);
            var tss = node.getComponent(EliteAtt65_1.default);
            //随机英雄
            var heroId = HeroManager_1.HeroManager.getInstance().getRandHeroId(GameManager_1.default.getInstance().cur_game_mode);
            if (heroId != HeroConfig_1.Hero_Type.NULL) {
                var heroPos = GameManager_1.default.getInstance().all_hero.get(heroId).node.getPosition();
                var offsetPos = heroPos.sub(attPos);
                var pi2 = Math.PI * 2;
                var attDir = (Math.atan2(offsetPos.y, offsetPos.x) + pi2) % pi2;
                tss.setAttHero(heroId);
                tss.init(_super.prototype.getAttData.call(_this, HeroConfig_1.DamageType.Normal, true, 0), GameEffectsManager_1.GameEffectId.monster65_shuangjuren_att, 1000, attDir, 1280, 270);
            }
        };
        _super.prototype.playSpinAnimaton.call(this, (this.getAnimaName(MonsterData_1.MonsterActionName.Attack)), false, data, function () {
            _super.prototype.setEnemyState.call(_this, EnemyConfig_1.Enemy_State.move);
            _this.startIdle();
            if (_this.att_wall) {
                _this.move_direction = Math.random() > 0.5 ? Math.PI : 0;
            }
        });
        return true;
    };
    ShuangJuRen = __decorate([
        ccclass
    ], ShuangJuRen);
    return ShuangJuRen;
}(MonsterNewNormal_1.default));
exports.default = ShuangJuRen;

cc._RF.pop();