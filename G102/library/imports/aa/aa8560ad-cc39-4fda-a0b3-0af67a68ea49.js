"use strict";
cc._RF.push(module, 'aa856CtzDlP2qCzCvZ6aOpJ', 'NiuJiangJun');
// Scripts/Monster/Elite/NiuJiangJun.ts

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
var GameEffectsManager_1 = require("../../Game/GameEffectsManager");
var GroundManager_1 = require("../../Game/GroundManager");
var GameManager_1 = require("../../GameManager");
var BuffData_1 = require("../../Hero/Game/BuffData");
var HeroConfig_1 = require("../../Hero/Game/HeroConfig");
var Monster_1 = require("../Monster");
var MonsterData_1 = require("../MonsterData");
var MonsterManager_1 = require("../MonsterManager");
var MonsterNewNormal_1 = require("../MonsterNewNormal");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var NiuJiangJun = /** @class */ (function (_super) {
    __extends(NiuJiangJun, _super);
    function NiuJiangJun() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.light = null;
        _this.load_num = 0;
        return _this;
    }
    NiuJiangJun.prototype.onLoad = function () {
        _super.prototype.onLoad.call(this);
        GameEffectsManager_1.GameEffectsManager.getInstance().addEffectPoolById(GameEffectsManager_1.GameEffectId.monster68_niujiangjun_skill, 1);
        _super.prototype.addMonsterNormalInited.call(this, this.onMonsterNormalInited);
    };
    NiuJiangJun.prototype.onMonsterNormalInited = function () {
        this.skill_cold_down[0] = this.skill_data.getSkillValue1(1);
    };
    NiuJiangJun.prototype.startSkill = function () {
        var _this = this;
        _super.prototype.setEnemyState.call(this, EnemyConfig_1.Enemy_State.skill);
        var data = new MonsterData_1.KeyFrameData();
        data.name = 'Skill';
        data.callback = function () {
            GroundManager_1.default.getInstance().createGameEffectById(GameEffectsManager_1.GameEffectId.monster68_niujiangjun_skill, _this.node.getPosition());
            //鼓舞buff
            var monsters = MonsterManager_1.default.getInstance().getMonstersForMonsterPos(-1, _this.node.getPosition(), 200);
            if (monsters) {
                for (var i = 0; i < monsters.length; i++) {
                    var monsterTs = monsters[i].getComponent(Monster_1.default);
                    if (monsterTs) {
                        var buffData = new BuffData_1.BuffData();
                        buffData.buff_value = [_this.skill_data.getSkillValue1(1)];
                        buffData.buff_id = HeroConfig_1.BuffId.Elite68_NiuJiangJun_JiaSu;
                        buffData.buff_type = HeroConfig_1.BuffType.MoveSpeedUp;
                        buffData.remain_time = _this.skill_data.getSkillValue2(1);
                        monsterTs.addBuff(buffData);
                    }
                }
            }
        };
        this.skill_cold_down[0] = this.skill_data.getSkillColdDown(1);
        _super.prototype.playSpinAnimaton.call(this, "Side_Skill", false, data, function () {
            _this.startIdle();
            _this.setEnemyState(EnemyConfig_1.Enemy_State.move);
        });
    };
    NiuJiangJun.prototype.update = function (dt) {
        if ((GameManager_1.default.getInstance().cur_game_state != Constants_1.GameState.Game_Playing) || this.getIsDie()) {
            return;
        }
        _super.prototype.update.call(this, dt);
        this.checkSkill(dt);
    };
    NiuJiangJun.prototype.checkSkill = function (dt) {
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
                //加速buff
                this.startSkill();
            }
        }
    };
    NiuJiangJun = __decorate([
        ccclass
    ], NiuJiangJun);
    return NiuJiangJun;
}(MonsterNewNormal_1.default));
exports.default = NiuJiangJun;

cc._RF.pop();