
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Scripts/Hero/TargetData.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
                    }
                    if (nodeEnv) {
                        __define(__module.exports, __require, __module);
                    }
                    else {
                        __quick_compile_project__.registerModuleFunc(__filename, function () {
                            __define(__module.exports, __require, __module);
                        });
                    }
                })();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0c1xcSGVyb1xcVGFyZ2V0RGF0YS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLGdEQUFxRDtBQUkvQyxJQUFBLEtBQXNCLEVBQUUsQ0FBQyxVQUFVLEVBQWxDLE9BQU8sYUFBQSxFQUFFLFFBQVEsY0FBaUIsQ0FBQztBQUcxQztJQUFBO1FBRUksZUFBZTtRQUNmLGVBQVUsR0FBUyxJQUFJLENBQUM7UUFDeEIsU0FBUztRQUNULHFCQUFnQixHQUFrQiw2QkFBZ0IsQ0FBQyxLQUFLLENBQUM7SUFDN0QsQ0FBQztJQU5vQixVQUFVO1FBRDlCLE9BQU87T0FDYSxVQUFVLENBTTlCO0lBQUQsaUJBQUM7Q0FORCxBQU1DLElBQUE7a0JBTm9CLFVBQVUiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBHb25nSmlfRmFuZ1hpYW5nIH0gZnJvbSBcIi4vR2FtZS9IZXJvQ29uZmlnXCI7XHJcblxyXG5cclxuXHJcbmNvbnN0IHtjY2NsYXNzLCBwcm9wZXJ0eX0gPSBjYy5fZGVjb3JhdG9yO1xyXG5cclxuQGNjY2xhc3NcclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVGFyZ2V0RGF0YSB7XHJcblxyXG4gICAgLy/nm67moIfmlbDmja7nmoRub2Rl77yM5oyH5pWM5Lq6XHJcbiAgICBlbmVteV9ub2RlOmNjLk5vZGU9bnVsbDtcclxuICAgIC8v5Yid5aeL5pS75Ye755qE5pa55ZCRXHJcbiAgICB0YXJnZXRfZmFuZ3hpYW5nOkdvbmdKaV9GYW5nWGlhbmc9R29uZ0ppX0ZhbmdYaWFuZy56aG9uZztcclxufVxyXG4iXX0=