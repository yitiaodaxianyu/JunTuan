"use strict";
cc._RF.push(module, 'df968oG9ClOtaKssOzeyetw', 'UI');
// resources/test/scripts/UI.ts

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
var Joystick_1 = require("./Joystick");
var ccclass = cc._decorator.ccclass;
var UI = /** @class */ (function (_super) {
    __extends(UI, _super);
    function UI() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * 使用固定摇杆
     */
    UI.prototype.useFixedType = function () {
        Joystick_1.instance.emit("set_joystick_type", Joystick_1.JoystickType.FIXED);
    };
    /**
     * 使用跟随摇杆
     */
    UI.prototype.useFollowType = function () {
        Joystick_1.instance.emit("set_joystick_type", Joystick_1.JoystickType.FOLLOW);
    };
    UI = __decorate([
        ccclass
    ], UI);
    return UI;
}(cc.Component));
exports.default = UI;

cc._RF.pop();