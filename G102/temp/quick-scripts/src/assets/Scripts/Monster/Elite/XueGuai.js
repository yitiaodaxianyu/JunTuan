"use strict";
cc._RF.push(module, 'a722aBuhxNHsqV79/q1S9ri', 'XueGuai');
// Scripts/Monster/Elite/XueGuai.ts

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
var GroundManager_1 = require("../../Game/GroundManager");
var GameManager_1 = require("../../GameManager");
var Monster_1 = require("../Monster");
var MonsterManager_1 = require("../MonsterManager");
var MonsterNewNormal_1 = require("../MonsterNewNormal");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var XueGuai = /** @class */ (function (_super) {
    __extends(XueGuai, _super);
    function XueGuai() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.light = null;
        _this.is_loaded = false;
        _this.load_num = 0;
        return _this;
    }
    XueGuai.prototype.onLoad = function () {
        var _this = this;
        _super.prototype.onLoad.call(this);
        _super.prototype.addMonsterNormalInited.call(this, this.onMonsterNormalInited);
        _super.prototype.addMonsterNormalDeath.call(this, this.onMonsterNormalDeath);
        GameEffectsManager_1.GameEffectsManager.getInstance().addEffectPoolById(GameEffectsManager_1.GameEffectId.monster_zhiliao_halo, 1, function () {
            //添加光环特效
            if (!_this.light) {
                _this.light = GroundManager_1.default.getInstance().createGameEffectById(GameEffectsManager_1.GameEffectId.monster_zhiliao_halo, _this.node.getPosition());
            }
            _this.load_num++;
            if (_this.load_num >= 2) {
                _this.is_loaded = true;
            }
        });
        GameEffectsManager_1.GameEffectsManager.getInstance().addEffectPoolById(GameEffectsManager_1.GameEffectId.monster_zhiliao_halo_hit, 8, function () {
            _this.load_num++;
            if (_this.load_num >= 2) {
                _this.is_loaded = true;
            }
        });
    };
    XueGuai.prototype.onMonsterNormalInited = function () {
        if (this.is_loaded) {
            if (!this.light) {
                this.light = GroundManager_1.default.getInstance().createGameEffectById(GameEffectsManager_1.GameEffectId.monster_zhiliao_halo, this.node.getPosition());
            }
        }
        this.skill_cold_down[0] = this.skill_data.getSkillValue1(1);
    };
    XueGuai.prototype.onMonsterNormalDeath = function () {
        //以及删除所有光环数据
        if (this.light) {
            GameEffectsManager_1.GameEffectsManager.getInstance().destroyGameEffectById(GameEffectsManager_1.GameEffectId.monster_zhiliao_halo, this.light);
            this.light = null;
        }
    };
    XueGuai.prototype.update = function (dt) {
        if ((GameManager_1.default.getInstance().cur_game_state != Constants_1.GameState.Game_Playing) || this.getIsDie()) {
            return;
        }
        _super.prototype.update.call(this, dt);
        this.checkSkill(dt);
        if (this.light) {
            this.light.setPosition(this.getCenterPos());
        }
    };
    XueGuai.prototype.checkSkill = function (dt) {
        if (this.is_loaded == true) {
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
                    this.skill_cold_down[i] = this.skill_data.getSkillValue1(1);
                    var allMonster = MonsterManager_1.default.getInstance().node.children;
                    var len = allMonster.length;
                    if (len <= 0) {
                        return null;
                    }
                    for (var i_1 = 0; i_1 < len; i_1++) {
                        var monster = allMonster[i_1];
                        var monsterTS = monster.getComponent(Monster_1.default);
                        if (monsterTS && monsterTS.getIsCanCheck()) {
                            var pos = monsterTS.getCenterPos();
                            var distance = this.getCenterPos().sub(pos).mag();
                            if (distance <= 200) {
                                //恢复生命值
                                var isOk = monsterTS.beHeal(this.getMaxHp() * this.skill_data.getSkillValue2(1));
                                if (isOk) {
                                    //特效
                                    GameEffectsManager_1.GameEffectsManager.getInstance().createGameEffectById(GameEffectsManager_1.GameEffectId.monster_zhiliao_halo_hit, pos);
                                }
                            }
                        }
                    }
                }
            }
        }
    };
    XueGuai = __decorate([
        ccclass
    ], XueGuai);
    return XueGuai;
}(MonsterNewNormal_1.default));
exports.default = XueGuai;

cc._RF.pop();