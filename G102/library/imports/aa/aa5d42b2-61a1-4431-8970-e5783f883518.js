"use strict";
cc._RF.push(module, 'aa5d4KyYaFEMYlw5Xg/iDUY', 'ShuiJingJuXie');
// Scripts/Monster/Elite/ShuiJingJuXie.ts

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
var MyTool_1 = require("../../Tools/MyTool");
var MonsterNewNormal_1 = require("../MonsterNewNormal");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var ShuiJingJuXie = /** @class */ (function (_super) {
    __extends(ShuiJingJuXie, _super);
    function ShuiJingJuXie() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ShuiJingJuXie.prototype.onLoad = function () {
        _super.prototype.onLoad.call(this);
        _super.prototype.addMonsterNormalInited.call(this, this.onMonsterNormalInited);
    };
    ShuiJingJuXie.prototype.onMonsterNormalInited = function () {
        var _this = this;
        //钻地
        this.unschedule(this.idleToMove);
        this.setEnemyState(EnemyConfig_1.Enemy_State.born);
        this.collider.enabled = false;
        //设置一个随机的坐标
        this.node.y = MyTool_1.default.randomRangeInt(-100, 100);
        _super.prototype.playSpinAnimaton.call(this, "Side_Skill2", false, null, function () {
            _this.collider.enabled = true;
            _super.prototype.playSpinAnimaton.call(_this, "Side_Skill", false, null, function () {
                //恢复移动
                _this.idleToMove();
            });
        });
    };
    ShuiJingJuXie = __decorate([
        ccclass
    ], ShuiJingJuXie);
    return ShuiJingJuXie;
}(MonsterNewNormal_1.default));
exports.default = ShuiJingJuXie;

cc._RF.pop();