"use strict";
cc._RF.push(module, '41d5bNOIR1O6ICeK/v7BH80', 'Block75');
// Scripts/Monster/Elite/Block75.ts

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
var GameManager_1 = require("../../GameManager");
var GongJi_1 = require("../../Hero/Game/GongJi");
var Monster_1 = require("../Monster");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var Block75 = /** @class */ (function (_super) {
    __extends(Block75, _super);
    function Block75() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.monster_ts = null;
        return _this;
    }
    ////--------------------------------------碰撞开始----------------------------------------------------
    Block75.prototype.onCollisionEnter = function (other, self) {
        var gm = GameManager_1.default.getInstance();
        if (gm.cur_game_state != Constants_1.GameState.Game_Playing)
            return;
        var group = other.node.group;
        switch (group) {
            case 'gongji':
                {
                    var gjData = other.node.getComponent(GongJi_1.default);
                    //本次伤害直接减伤
                    if (gjData) {
                        this.monster_ts.jianshang_rate += this.monster_ts.skill_data.getSkillValue1(1);
                        this.monster_ts.beFlashInjured(gjData.gongji_data);
                        this.monster_ts.jianshang_rate -= this.monster_ts.skill_data.getSkillValue1(1);
                        //直接销毁
                        gjData.node.removeFromParent();
                    }
                }
                break;
        }
    };
    __decorate([
        property(Monster_1.default)
    ], Block75.prototype, "monster_ts", void 0);
    Block75 = __decorate([
        ccclass
    ], Block75);
    return Block75;
}(cc.CircleCollider));
exports.default = Block75;

cc._RF.pop();