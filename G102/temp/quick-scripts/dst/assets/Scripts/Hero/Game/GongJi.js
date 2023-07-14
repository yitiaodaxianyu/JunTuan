
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Scripts/Hero/Game/GongJi.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '12889tgW/hBS6anoNV02VD6', 'GongJi');
// Scripts/Hero/Game/GongJi.ts

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
var GongJi = /** @class */ (function (_super) {
    __extends(GongJi, _super);
    function GongJi() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.gongji_data = null;
        return _this;
    }
    GongJi.prototype.initData = function (gjData) {
        this.gongji_data = gjData;
    };
    GongJi = __decorate([
        ccclass
    ], GongJi);
    return GongJi;
}(cc.Component));
exports.default = GongJi;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0c1xcSGVyb1xcR2FtZVxcR29uZ0ppLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUdNLElBQUEsS0FBc0IsRUFBRSxDQUFDLFVBQVUsRUFBbEMsT0FBTyxhQUFBLEVBQUUsUUFBUSxjQUFpQixDQUFDO0FBRzFDO0lBQW9DLDBCQUFZO0lBQWhEO1FBQUEscUVBUUM7UUFORyxpQkFBVyxHQUFZLElBQUksQ0FBQzs7SUFNaEMsQ0FBQztJQUphLHlCQUFRLEdBQWxCLFVBQW1CLE1BQWlCO1FBRWhDLElBQUksQ0FBQyxXQUFXLEdBQUMsTUFBTSxDQUFDO0lBQzVCLENBQUM7SUFQZ0IsTUFBTTtRQUQxQixPQUFPO09BQ2EsTUFBTSxDQVExQjtJQUFELGFBQUM7Q0FSRCxBQVFDLENBUm1DLEVBQUUsQ0FBQyxTQUFTLEdBUS9DO2tCQVJvQixNQUFNIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgR29uZ0ppRGF0YSB9IGZyb20gXCIuLi9EYXRhL0hlcm9EYXRhXCI7XHJcblxyXG5cclxuY29uc3Qge2NjY2xhc3MsIHByb3BlcnR5fSA9IGNjLl9kZWNvcmF0b3I7XHJcblxyXG5AY2NjbGFzc1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBHb25nSmkgZXh0ZW5kcyBjYy5Db21wb25lbnQge1xyXG5cclxuICAgIGdvbmdqaV9kYXRhOkdvbmdKaURhdGE9bnVsbDtcclxuXHJcbiAgICBwcm90ZWN0ZWQgaW5pdERhdGEoZ2pEYXRhOkdvbmdKaURhdGEpXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy5nb25namlfZGF0YT1nakRhdGE7XHJcbiAgICB9XHJcbn1cclxuIl19