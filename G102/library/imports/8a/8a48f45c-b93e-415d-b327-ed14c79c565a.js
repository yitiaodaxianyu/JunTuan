"use strict";
cc._RF.push(module, '8a48fRcuT5BXbMn7RTHnFZa', 'Hint');
// Scripts/Hint.ts

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
var Hint = /** @class */ (function (_super) {
    __extends(Hint, _super);
    function Hint() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.hint_label = null;
        return _this;
    }
    // LIFE-CYCLE CALLBACKS:
    Hint.prototype.onLoad = function () {
        this.hint_label = this.node.getChildByName('hintLabel').getComponent(cc.Label);
    };
    Hint.prototype.start = function () {
        this.node.zIndex = 9999;
    };
    Hint.prototype.showHintMessage = function (message, dt) {
        var _this = this;
        if (!dt) {
            dt = 1.5;
        }
        this.hint_label.string = message;
        this.node.opacity = 0;
        this.hint_label.enabled = false;
        this.scheduleOnce(function () {
            _this.node.opacity = 255;
            _this.hint_label.enabled = true;
            _this.node.height = _this.hint_label.node.height + (_this.hint_label.lineHeight - _this.hint_label.fontSize) * 2;
            cc.tween(_this.node).then(cc.sequence(cc.delayTime(dt), cc.fadeOut(1), cc.removeSelf())).start();
        }, 0.05);
    };
    Hint = __decorate([
        ccclass
    ], Hint);
    return Hint;
}(cc.Component));
exports.default = Hint;

cc._RF.pop();