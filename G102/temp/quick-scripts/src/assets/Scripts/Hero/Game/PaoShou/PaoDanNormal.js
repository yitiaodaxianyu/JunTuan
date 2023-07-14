"use strict";
cc._RF.push(module, 'b124aUxl89APoFUqP6kRBxr', 'PaoDanNormal');
// Scripts/Hero/Game/PaoShou/PaoDanNormal.ts

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
var MonsterData_1 = require("../../../Monster/MonsterData");
var Bullect_1 = require("../Bullect");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var PaoDanNormal = /** @class */ (function (_super) {
    __extends(PaoDanNormal, _super);
    function PaoDanNormal() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    PaoDanNormal.prototype.onLoad = function () {
        _super.prototype.onLoad.call(this);
        _super.prototype.addCollisionMonsterListen.call(this, this.onCollisionMonster);
    };
    ////--------------------------------------碰撞开始----------------------------------------------------
    PaoDanNormal.prototype.onCollisionMonster = function (monsterTs) {
        if (monsterTs) {
            var data = monsterTs.beFlashInjured(this.gongji_data);
            if (data.getDamageNum() > 0) {
                //本次攻击有效
                //GameEffectsManager.getInstance().createGameEffectById(GameEffectId.sheshou_jianshi_att_hit,this.getJianTouPos());
                this.is_att = true;
                this.destroySelf();
            }
            else {
                if (data.feedback_type != MonsterData_1.FeedBackType.Die)
                    this.destroySelf();
            }
        }
    };
    PaoDanNormal = __decorate([
        ccclass
    ], PaoDanNormal);
    return PaoDanNormal;
}(Bullect_1.default));
exports.default = PaoDanNormal;

cc._RF.pop();