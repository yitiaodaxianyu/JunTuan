"use strict";
cc._RF.push(module, 'd2653d/mq5BcJGcfSsLlnEz', 'KuangSha');
// Scripts/Hero/Game/ANuBiSi/KuangSha.ts

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
var Constants_1 = require("../../../Constants");
var GameEffectsManager_1 = require("../../../Game/GameEffectsManager");
var GameManager_1 = require("../../../GameManager");
var Monster_1 = require("../../../Monster/Monster");
var MonsterManager_1 = require("../../../Monster/MonsterManager");
var BuffData_1 = require("../BuffData");
var HeroConfig_1 = require("../HeroConfig");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var KuangSha = /** @class */ (function (_super) {
    __extends(KuangSha, _super);
    function KuangSha() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.remain_time = 0;
        _this.value = 0;
        return _this;
    }
    KuangSha.prototype.init = function (remainTime, jiansuValue) {
        this.remain_time = remainTime;
        this.value = jiansuValue;
    };
    KuangSha.prototype.destroySelf = function () {
        GameEffectsManager_1.GameEffectsManager.getInstance().destroyGameEffectById(GameEffectsManager_1.GameEffectId.a_nu_bi_si_active_skill_wind, this.node);
    };
    KuangSha.prototype.onAddBuff = function () {
        var _this = this;
        var allMonsterS = MonsterManager_1.default.getInstance().node.children;
        var len = allMonsterS.length;
        for (var i = 0; i < len; i++) {
            var monster = allMonsterS[i];
            var monsterTS = monster.getComponent(Monster_1.default);
            if (monsterTS && monsterTS.getIsCanCheck()) {
                var buffData = new BuffData_1.BuffData();
                buffData.buff_id = HeroConfig_1.BuffId.Hero_ANuBiSi_Active_Skill_JianSu;
                buffData.buff_type = HeroConfig_1.BuffType.Slowdown;
                buffData.buff_value = [this.value];
                buffData.remain_time = 1.5;
                monsterTS.addDeBuff(buffData, null);
            }
        }
        var _loop_1 = function (i) {
            this_1.scheduleOnce(function () {
                var xx = -375 + 150 * i + Math.random() * 40 - 20;
                var node = GameEffectsManager_1.GameEffectsManager.getInstance().createGameEffectForParent(GameEffectsManager_1.GameEffectId.a_nu_bi_si_active_skill_line, cc.v2(xx, 0), _this.node);
                cc.tween(node).by(0.48, { y: -cc.winSize.height }).call(function () {
                    GameEffectsManager_1.GameEffectsManager.getInstance().destroyGameEffectById(GameEffectsManager_1.GameEffectId.a_nu_bi_si_active_skill_line, node);
                }).start();
                if (Math.random() < 0.3) {
                    var quan = GameEffectsManager_1.GameEffectsManager.getInstance().createGameEffectForParent(GameEffectsManager_1.GameEffectId.a_nu_bi_si_active_skill_ring, cc.v2(Math.random() * 600 - 300, Math.random() * 1000 - 500), _this.node);
                    quan.scaleX = Math.random() < 0.5 ? -1 : 1;
                }
            }, Math.random() * 0.4);
        };
        var this_1 = this;
        for (var i = 0; i < 5; i++) {
            _loop_1(i);
        }
    };
    KuangSha.prototype.update = function (dt) {
        if (GameManager_1.default.getInstance().cur_game_state == Constants_1.GameState.Game_Playing) {
            if (this.remain_time > 0) {
                this.remain_time -= dt;
                if (this.remain_time <= 0) {
                    this.destroySelf();
                }
            }
            else {
                this.destroySelf();
            }
        }
    };
    KuangSha = __decorate([
        ccclass
    ], KuangSha);
    return KuangSha;
}(cc.Component));
exports.default = KuangSha;

cc._RF.pop();