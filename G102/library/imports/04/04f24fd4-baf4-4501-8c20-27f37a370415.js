"use strict";
cc._RF.push(module, '04f24/UuvRFAYwgJ/N6NwQV', 'FishBully');
// Scripts/Monster/Elite/FishBully.ts

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
var EnemyConfig_1 = require("../../Enemy/EnemyConfig");
var GameManager_1 = require("../../GameManager");
var BuffData_1 = require("../../Hero/Game/BuffData");
var HeroConfig_1 = require("../../Hero/Game/HeroConfig");
var MonsterData_1 = require("../MonsterData");
var MonsterNewNormal_1 = require("../MonsterNewNormal");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var FishBully = /** @class */ (function (_super) {
    __extends(FishBully, _super);
    function FishBully() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.light = null;
        _this.load_num = 0;
        return _this;
    }
    FishBully.prototype.onLoad = function () {
        _super.prototype.onLoad.call(this);
        //GameEffectsManager.getInstance().addEffectPoolById(GameEffectId.monster68_niujiangjun_skill,1);
        _super.prototype.addMonsterNormalInited.call(this, this.onMonsterNormalInited);
    };
    FishBully.prototype.onMonsterNormalInited = function () {
        //this.skill_cold_down[0]=this.skill_data.getSkillValue1(1);
    };
    FishBully.prototype.startSkill = function () {
        var _this = this;
        _super.prototype.setEnemyState.call(this, EnemyConfig_1.Enemy_State.skill);
        var data = new MonsterData_1.KeyFrameData();
        data.name = 'Skill';
        data.callback = function () {
            //狂暴buff
            var ysData = new BuffData_1.BuffData();
            ysData.buff_value = [_this.skill_data.getSkillValue1(1)];
            ysData.buff_id = HeroConfig_1.BuffId.Elite71_FishBully_JiaYiSu;
            ysData.buff_type = HeroConfig_1.BuffType.MoveSpeedUp;
            ysData.remain_time = _this.skill_data.getSkillValue3(1);
            _super.prototype.addBuff.call(_this, ysData);
            var gsData = new BuffData_1.BuffData();
            gsData.buff_value = [_this.skill_data.getSkillValue2(1)];
            gsData.buff_id = HeroConfig_1.BuffId.Elite71_FishBully_JiaGongSu;
            gsData.buff_type = HeroConfig_1.BuffType.AttSpeedUp;
            gsData.remain_time = _this.skill_data.getSkillValue3(1);
            _super.prototype.addBuff.call(_this, gsData);
            _this.skill_cold_down[0] = _this.skill_data.getSkillColdDown(1);
        };
        this.skill_cold_down[0] = this.skill_data.getSkillColdDown(1);
        _super.prototype.playSpinAnimaton.call(this, "Side_Skill", false, data, function () {
            _this.startIdle();
            _this.setEnemyState(EnemyConfig_1.Enemy_State.move);
        });
    };
    FishBully.prototype.update = function (dt) {
        if ((GameManager_1.default.getInstance().cur_game_state != Constants_1.GameState.Game_Playing) || this.getIsDie()) {
            return;
        }
        _super.prototype.update.call(this, dt);
        this.checkSkill(dt);
    };
    FishBully.prototype.checkSkill = function (dt) {
        for (var i = 0; i < this.skill_cold_down.length; i++) {
            var isCanSkill = false;
            if (this.skill_cold_down[i] > 0) {
                this.skill_cold_down[i] -= dt;
                if (this.skill_cold_down[i] <= 0) {
                    isCanSkill = true;
                }
            }
            else {
                isCanSkill = true;
            }
            if (isCanSkill) {
                //buff
                this.startSkill();
            }
        }
    };
    FishBully = __decorate([
        ccclass
    ], FishBully);
    return FishBully;
}(MonsterNewNormal_1.default));
exports.default = FishBully;

cc._RF.pop();