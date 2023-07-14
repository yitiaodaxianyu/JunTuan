
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Scripts/Joystick/UI.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xccmVzb3VyY2VzXFx0ZXN0XFxzY3JpcHRzXFxVSS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSx1Q0FBb0Q7QUFFNUMsSUFBQSxPQUFPLEdBQUssRUFBRSxDQUFDLFVBQVUsUUFBbEIsQ0FBbUI7QUFHbEM7SUFBZ0Msc0JBQVk7SUFBNUM7O0lBY0EsQ0FBQztJQWJDOztPQUVHO0lBQ0gseUJBQVksR0FBWjtRQUNFLG1CQUFRLENBQUMsSUFBSSxDQUFDLG1CQUFtQixFQUFFLHVCQUFZLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDekQsQ0FBQztJQUVEOztPQUVHO0lBQ0gsMEJBQWEsR0FBYjtRQUNFLG1CQUFRLENBQUMsSUFBSSxDQUFDLG1CQUFtQixFQUFFLHVCQUFZLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDMUQsQ0FBQztJQWJrQixFQUFFO1FBRHRCLE9BQU87T0FDYSxFQUFFLENBY3RCO0lBQUQsU0FBQztDQWRELEFBY0MsQ0FkK0IsRUFBRSxDQUFDLFNBQVMsR0FjM0M7a0JBZG9CLEVBQUUiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBKb3lzdGlja1R5cGUsIGluc3RhbmNlIH0gZnJvbSBcIi4vSm95c3RpY2tcIjtcblxuY29uc3QgeyBjY2NsYXNzIH0gPSBjYy5fZGVjb3JhdG9yO1xuXG5AY2NjbGFzc1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVUkgZXh0ZW5kcyBjYy5Db21wb25lbnQge1xuICAvKipcbiAgICog5L2/55So5Zu65a6a5pGH5p2GXG4gICAqL1xuICB1c2VGaXhlZFR5cGUoKSB7XG4gICAgaW5zdGFuY2UuZW1pdChcInNldF9qb3lzdGlja190eXBlXCIsIEpveXN0aWNrVHlwZS5GSVhFRCk7XG4gIH1cblxuICAvKipcbiAgICog5L2/55So6Lef6ZqP5pGH5p2GXG4gICAqL1xuICB1c2VGb2xsb3dUeXBlKCkge1xuICAgIGluc3RhbmNlLmVtaXQoXCJzZXRfam95c3RpY2tfdHlwZVwiLCBKb3lzdGlja1R5cGUuRk9MTE9XKTtcbiAgfVxufVxuIl19