"use strict";
cc._RF.push(module, '08463xU4FFIKreDYrfvjUlb', 'ShuiJingYouLong');
// Scripts/Monster/Elite/ShuiJingYouLong.ts

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
var HeroConfig_1 = require("../../Hero/Game/HeroConfig");
var MonsterData_1 = require("../MonsterData");
var MonsterNewNormal_1 = require("../MonsterNewNormal");
var EliteAtt67_1 = require("./EliteAtt67");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var ShuiJingYouLong = /** @class */ (function (_super) {
    __extends(ShuiJingYouLong, _super);
    function ShuiJingYouLong() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ShuiJingYouLong.prototype.onLoad = function () {
        _super.prototype.onLoad.call(this);
        _super.prototype.addMonsterNormalInited.call(this, this.onMonsterNormalInited);
        _super.prototype.addMonsterNormalAttack.call(this, this.onMonsterNormalAttack);
        GameEffectsManager_1.GameEffectsManager.getInstance().addEffectPoolById(GameEffectsManager_1.GameEffectId.monster67_shuijingyoulong_att, 1);
        GameEffectsManager_1.GameEffectsManager.getInstance().addEffectPoolById(GameEffectsManager_1.GameEffectId.monster67_shuijingyoulong_att_hit, 1);
    };
    ShuiJingYouLong.prototype.onMonsterNormalInited = function () {
    };
    /**怪物开始攻击，返回是否截获本次攻击 */
    ShuiJingYouLong.prototype.onMonsterNormalAttack = function () {
        var _this = this;
        this.att_jishu = 0;
        _super.prototype.setEnemyState.call(this, EnemyConfig_1.Enemy_State.att);
        var data = new MonsterData_1.KeyFrameData();
        data.name = 'OnDamaging';
        data.callback = function () {
            _this.att_jishu = 0;
            if (_this.getIsDie()) {
                return;
            }
            var attNode = GameEffectsManager_1.GameEffectsManager.getInstance().createGameEffectById(GameEffectsManager_1.GameEffectId.monster67_shuijingyoulong_att, _super.prototype.getAttPos.call(_this));
            var attData = _super.prototype.getAttData.call(_this, HeroConfig_1.DamageType.Normal, true);
            attData.zengshang_rate += _this.skill_data.getSkillValue1(1);
            attNode.getComponent(EliteAtt67_1.default).init(attData, GameEffectsManager_1.GameEffectId.monster67_shuijingyoulong_att, 1200, Math.PI * 3 / 2, _this.node.y);
        };
        _super.prototype.playSpinAnimaton.call(this, this.getAnimaName(MonsterData_1.MonsterActionName.Attack), false, data, function () {
            _this.startIdle();
            _super.prototype.setEnemyState.call(_this, EnemyConfig_1.Enemy_State.move);
            if (_this.att_wall) {
                _this.move_direction = Math.random() > 0.5 ? Math.PI : 0;
            }
        });
        return true;
    };
    ShuiJingYouLong = __decorate([
        ccclass
    ], ShuiJingYouLong);
    return ShuiJingYouLong;
}(MonsterNewNormal_1.default));
exports.default = ShuiJingYouLong;

cc._RF.pop();