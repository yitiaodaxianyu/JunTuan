"use strict";
cc._RF.push(module, '168deaaxPdOnJe0aAOBa5KO', 'TargetData');
// Scripts/Hero/TargetData.ts

"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var HeroConfig_1 = require("./Game/HeroConfig");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var TargetData = /** @class */ (function () {
    function TargetData() {
        //目标数据的node，指敌人
        this.enemy_node = null;
        //初始攻击的方向
        this.target_fangxiang = HeroConfig_1.GongJi_FangXiang.zhong;
    }
    TargetData = __decorate([
        ccclass
    ], TargetData);
    return TargetData;
}());
exports.default = TargetData;

cc._RF.pop();