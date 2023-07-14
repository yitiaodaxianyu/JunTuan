"use strict";
cc._RF.push(module, '6646dqq97lG85yrdb/0c6Ny', 'TaskMainItemUi');
// Scripts/Task/TaskMainItemUi.ts

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
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var TaskMainItemUi = /** @class */ (function (_super) {
    __extends(TaskMainItemUi, _super);
    function TaskMainItemUi() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.call_back = null;
        _this.message = null;
        return _this;
    }
    TaskMainItemUi.prototype.initGoingItem = function (data, now, func) {
    };
    TaskMainItemUi.prototype.initFinishItem = function (data, now, func) {
    };
    TaskMainItemUi.prototype.onClickBtn = function () {
    };
    TaskMainItemUi = __decorate([
        ccclass
    ], TaskMainItemUi);
    return TaskMainItemUi;
}(cc.Component));
exports.default = TaskMainItemUi;

cc._RF.pop();