"use strict";
cc._RF.push(module, 'f6b5eETtTBK76aVwKi533eo', 'UnlockSkill');
// Scripts/UI/UnlockSkill.ts

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
var UnlockSkill = /** @class */ (function (_super) {
    __extends(UnlockSkill, _super);
    function UnlockSkill() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.yes_callback = null;
        _this.no_callback = null;
        return _this;
    }
    UnlockSkill.prototype.init = function (yesCallback, noCallback) {
        this.yes_callback = yesCallback;
        this.no_callback = noCallback;
    };
    UnlockSkill.prototype.clickBtnYes = function () {
        if (this.yes_callback) {
            this.yes_callback();
        }
        this.node.removeFromParent();
    };
    UnlockSkill.prototype.clickBtnNo = function () {
        if (this.yes_callback) {
            this.no_callback();
        }
        this.node.removeFromParent();
    };
    UnlockSkill = __decorate([
        ccclass
    ], UnlockSkill);
    return UnlockSkill;
}(cc.Component));
exports.default = UnlockSkill;

cc._RF.pop();