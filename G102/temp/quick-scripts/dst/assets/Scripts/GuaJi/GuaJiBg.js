
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Scripts/GuaJi/GuaJiBg.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '4ec2dcS20FPcrtECdPSKmhR', 'GuaJiBg');
// Scripts/GuaJi/GuaJiBg.ts

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
var GuaJiBg = /** @class */ (function (_super) {
    __extends(GuaJiBg, _super);
    function GuaJiBg() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.speed_x = 40;
        return _this;
    }
    // onLoad () {}
    GuaJiBg.prototype.start = function () {
    };
    GuaJiBg.prototype.update = function (dt) {
        var xx = -(this.speed_x * dt);
        this.node.x += xx;
        if (this.node.x <= -1500) {
            this.node.x += 3000;
        }
    };
    __decorate([
        property()
    ], GuaJiBg.prototype, "speed_x", void 0);
    GuaJiBg = __decorate([
        ccclass
    ], GuaJiBg);
    return GuaJiBg;
}(cc.Component));
exports.default = GuaJiBg;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0c1xcR3VhSmlcXEd1YUppQmcudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBR00sSUFBQSxLQUFzQixFQUFFLENBQUMsVUFBVSxFQUFsQyxPQUFPLGFBQUEsRUFBRSxRQUFRLGNBQWlCLENBQUM7QUFHMUM7SUFBcUMsMkJBQVk7SUFBakQ7UUFBQSxxRUFxQkM7UUFsQkcsYUFBTyxHQUFRLEVBQUUsQ0FBQzs7SUFrQnRCLENBQUM7SUFkRyxlQUFlO0lBRWYsdUJBQUssR0FBTDtJQUVBLENBQUM7SUFFRCx3QkFBTSxHQUFOLFVBQVEsRUFBRTtRQUNOLElBQUksRUFBRSxHQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsT0FBTyxHQUFDLEVBQUUsQ0FBQyxDQUFBO1FBQ3pCLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxJQUFFLEVBQUUsQ0FBQztRQUVoQixJQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxJQUFFLENBQUMsSUFBSSxFQUFDO1lBQ2xCLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxJQUFFLElBQUksQ0FBQztTQUNyQjtJQUNMLENBQUM7SUFqQkQ7UUFEQyxRQUFRLEVBQUU7NENBQ087SUFIRCxPQUFPO1FBRDNCLE9BQU87T0FDYSxPQUFPLENBcUIzQjtJQUFELGNBQUM7Q0FyQkQsQUFxQkMsQ0FyQm9DLEVBQUUsQ0FBQyxTQUFTLEdBcUJoRDtrQkFyQm9CLE9BQU8iLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgR3VhSmlNYW5hZ2VyIGZyb20gXCIuL0d1YUppTWFuYWdlclwiO1xyXG5cclxuXHJcbmNvbnN0IHtjY2NsYXNzLCBwcm9wZXJ0eX0gPSBjYy5fZGVjb3JhdG9yO1xyXG5cclxuQGNjY2xhc3NcclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgR3VhSmlCZyBleHRlbmRzIGNjLkNvbXBvbmVudCB7XHJcblxyXG4gICAgQHByb3BlcnR5KClcclxuICAgIHNwZWVkX3g6bnVtYmVyPTQwO1xyXG5cclxuICAgIFxyXG5cclxuICAgIC8vIG9uTG9hZCAoKSB7fVxyXG5cclxuICAgIHN0YXJ0ICgpIHtcclxuXHJcbiAgICB9XHJcblxyXG4gICAgdXBkYXRlIChkdCkge1xyXG4gICAgICAgIGxldCB4eD0tKHRoaXMuc3BlZWRfeCpkdClcclxuICAgICAgICB0aGlzLm5vZGUueCs9eHg7XHJcblxyXG4gICAgICAgIGlmKHRoaXMubm9kZS54PD0tMTUwMCl7XHJcbiAgICAgICAgICAgIHRoaXMubm9kZS54Kz0zMDAwO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG4iXX0=