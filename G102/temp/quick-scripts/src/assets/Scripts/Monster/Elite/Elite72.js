"use strict";
cc._RF.push(module, '9d312Tvw/JOzbTCihFR9DEX', 'Elite72');
// Scripts/Monster/Elite/Elite72.ts

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
var MonsterNewNormal_1 = require("../MonsterNewNormal");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var Elite72 = /** @class */ (function (_super) {
    __extends(Elite72, _super);
    function Elite72() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Elite72.prototype.onLoad = function () {
        _super.prototype.onLoad.call(this);
        _super.prototype.addMonsterNormalInited.call(this, this.onMonsterNormalInited);
    };
    Elite72.prototype.onMonsterNormalInited = function () {
        //最大生命值的技能
        this.cur_hp = this.max_hp = this.monster_data.Health * (1 + 1);
    };
    Elite72 = __decorate([
        ccclass
    ], Elite72);
    return Elite72;
}(MonsterNewNormal_1.default));
exports.default = Elite72;

cc._RF.pop();