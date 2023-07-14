"use strict";
cc._RF.push(module, 'c617196j3pHe5HEiYej045D', 'JianShiCrit');
// Scripts/Hero/Game/SheShou/JianShiCrit.ts

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
var GongJi_1 = require("../GongJi");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var JianShiCrit = /** @class */ (function (_super) {
    __extends(JianShiCrit, _super);
    function JianShiCrit() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.game_effect_id = GameEffectsManager_1.GameEffectId.sheshou_attack_ctrl_hit;
        return _this;
    }
    JianShiCrit.prototype.init = function (id, gjData) {
        _super.prototype.initData.call(this, gjData);
        this.game_effect_id = id;
    };
    ////--------------------------------------碰撞开始----------------------------------------------------
    JianShiCrit.prototype.onCollisionEnter = function (other, self) {
        var gm = GameManager_1.default.getInstance();
        if (gm.cur_game_state == Constants_1.GameState.Game_Lose)
            return;
        var group = other.node.group;
        switch (group) {
            case 'enemy':
                {
                    var monsterTs = other.node.getComponent(Monster_1.default);
                    if (monsterTs) {
                        var data = monsterTs.beFlashInjured(this.gongji_data);
                        if (data.getDamageNum() > 0) {
                            //本次攻击有效
                            var node = GameEffectsManager_1.GameEffectsManager.getInstance().createGameEffectById(GameEffectsManager_1.GameEffectId.sheshou_jianshi_att_hit, monsterTs.getJuJiPos());
                            //node.scale=monsterTs.getSheShouAttackScale();
                        }
                    }
                }
                break;
        }
    };
    JianShiCrit = __decorate([
        ccclass
    ], JianShiCrit);
    return JianShiCrit;
}(GongJi_1.default));
exports.default = JianShiCrit;

cc._RF.pop();