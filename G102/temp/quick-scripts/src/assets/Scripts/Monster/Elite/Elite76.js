"use strict";
cc._RF.push(module, '01022Oy4Q9H4pC7Semzd3fZ', 'Elite76');
// Scripts/Monster/Elite/Elite76.ts

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
var HeroConfig_1 = require("../../Hero/Game/HeroConfig");
var Monster_1 = require("../Monster");
var MonsterManager_1 = require("../MonsterManager");
var MonsterNewNormal_1 = require("../MonsterNewNormal");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var Elite76 = /** @class */ (function (_super) {
    __extends(Elite76, _super);
    function Elite76() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.light = null;
        _this.halo_data = null;
        _this.is_loaded = false;
        _this.halo_radius = 200;
        return _this;
    }
    Elite76.prototype.onLoad = function () {
        var _this = this;
        _super.prototype.onLoad.call(this);
        _super.prototype.addMonsterNormalInited.call(this, this.onMonsterNormalInited);
        _super.prototype.addMonsterNormalDeath.call(this, this.onMonsterNormalDeath);
        GameEffectsManager_1.GameEffectsManager.getInstance().addEffectPoolById(GameEffectsManager_1.GameEffectId.monster76_attack_guanghuan, 1, function () {
            //添加光环特效
            if (!_this.light) {
                _this.light = GroundManager_1.default.getInstance().createGameEffectById(GameEffectsManager_1.GameEffectId.monster76_attack_guanghuan, _this.node.getPosition());
            }
            _this.is_loaded = true;
        });
    };
    Elite76.prototype.onMonsterNormalInited = function () {
        this.halo_radius = this.skill_data.getSkillValue1(1);
        this.halo_data = new HeroConfig_1.HaloData();
        this.halo_data.halo_id = HeroConfig_1.HaloId.Monster76_JianDuZhe_Skill_Halo;
        this.halo_data.halo_value = [this.skill_data.getSkillValue2(1)];
        this.halo_data.halo_source_uuid = this.uuid;
        if (this.is_loaded) {
            if (!this.light) {
                this.light = GroundManager_1.default.getInstance().createGameEffectById(GameEffectsManager_1.GameEffectId.monster76_attack_guanghuan, this.node.getPosition());
            }
        }
    };
    Elite76.prototype.onMonsterNormalDeath = function () {
        //以及删除所有光环数据
        if (this.light) {
            GameEffectsManager_1.GameEffectsManager.getInstance().destroyGameEffectById(GameEffectsManager_1.GameEffectId.monster76_attack_guanghuan, this.light);
            this.light = null;
        }
        var allMonster = MonsterManager_1.default.getInstance().node.children;
        var len = allMonster.length;
        if (len <= 0) {
            return null;
        }
        for (var i = 0; i < len; i++) {
            var monster = allMonster[i];
            var monsterTS = monster.getComponent(Monster_1.default);
            if (monsterTS && monsterTS.getIsCanCheck()) {
                //移除光环效果
                monsterTS.subHalo(HeroConfig_1.HaloId.Monster76_JianDuZhe_Skill_Halo, this.uuid);
            }
        }
    };
    Elite76.prototype.update = function (dt) {
        if ((GameManager_1.default.getInstance().cur_game_state != Constants_1.GameState.Game_Playing) || this.getIsDie()) {
            return;
        }
        _super.prototype.update.call(this, dt);
        this.checkSkill();
        if (this.light) {
            this.light.setPosition(this.node.getPosition());
        }
    };
    Elite76.prototype.checkSkill = function () {
        var allMonster = MonsterManager_1.default.getInstance().node.children;
        var len = allMonster.length;
        if (len <= 0) {
            return null;
        }
        for (var i = 0; i < len; i++) {
            var monster = allMonster[i];
            var monsterTS = monster.getComponent(Monster_1.default);
            if (monsterTS && monsterTS.getIsCanCheck()) {
                var distance = this.getCenterPos().sub(monsterTS.getCenterPos()).mag();
                if (distance <= 200) {
                    //添加光环效果                    
                    monsterTS.addHalo(this.halo_data);
                }
                else {
                    //移除光环效果
                    monsterTS.subHalo(HeroConfig_1.HaloId.Monster76_JianDuZhe_Skill_Halo, this.uuid);
                }
            }
        }
    };
    Elite76 = __decorate([
        ccclass
    ], Elite76);
    return Elite76;
}(MonsterNewNormal_1.default));
exports.default = Elite76;

cc._RF.pop();