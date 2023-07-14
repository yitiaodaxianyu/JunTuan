
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Scripts/UI/UnlockSkill.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0c1xcVUlcXFVubG9ja1NraWxsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUVNLElBQUEsS0FBc0IsRUFBRSxDQUFDLFVBQVUsRUFBbEMsT0FBTyxhQUFBLEVBQUUsUUFBUSxjQUFpQixDQUFDO0FBRzFDO0lBQXlDLCtCQUFZO0lBQXJEO1FBQUEscUVBNkJDO1FBM0JHLGtCQUFZLEdBQVUsSUFBSSxDQUFDO1FBQzNCLGlCQUFXLEdBQVUsSUFBSSxDQUFDOztJQTBCOUIsQ0FBQztJQXhCRywwQkFBSSxHQUFKLFVBQUssV0FBb0IsRUFBQyxVQUFtQjtRQUV6QyxJQUFJLENBQUMsWUFBWSxHQUFDLFdBQVcsQ0FBQztRQUM5QixJQUFJLENBQUMsV0FBVyxHQUFDLFVBQVUsQ0FBQztJQUNoQyxDQUFDO0lBRUQsaUNBQVcsR0FBWDtRQUVJLElBQUcsSUFBSSxDQUFDLFlBQVksRUFDcEI7WUFDSSxJQUFJLENBQUMsWUFBWSxFQUFFLENBQUM7U0FDdkI7UUFDRCxJQUFJLENBQUMsSUFBSSxDQUFDLGdCQUFnQixFQUFFLENBQUM7SUFDakMsQ0FBQztJQUVELGdDQUFVLEdBQVY7UUFFSSxJQUFHLElBQUksQ0FBQyxZQUFZLEVBQ3BCO1lBQ0ksSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDO1NBQ3RCO1FBQ0QsSUFBSSxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDO0lBQ2pDLENBQUM7SUEzQmdCLFdBQVc7UUFEL0IsT0FBTztPQUNhLFdBQVcsQ0E2Qi9CO0lBQUQsa0JBQUM7Q0E3QkQsQUE2QkMsQ0E3QndDLEVBQUUsQ0FBQyxTQUFTLEdBNkJwRDtrQkE3Qm9CLFdBQVciLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJcclxuXHJcbmNvbnN0IHtjY2NsYXNzLCBwcm9wZXJ0eX0gPSBjYy5fZGVjb3JhdG9yO1xyXG5cclxuQGNjY2xhc3NcclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVW5sb2NrU2tpbGwgZXh0ZW5kcyBjYy5Db21wb25lbnQge1xyXG5cclxuICAgIHllc19jYWxsYmFjazpGdW5jdGlvbj1udWxsO1xyXG4gICAgbm9fY2FsbGJhY2s6RnVuY3Rpb249bnVsbDtcclxuXHJcbiAgICBpbml0KHllc0NhbGxiYWNrOkZ1bmN0aW9uLG5vQ2FsbGJhY2s6RnVuY3Rpb24pXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy55ZXNfY2FsbGJhY2s9eWVzQ2FsbGJhY2s7XHJcbiAgICAgICAgdGhpcy5ub19jYWxsYmFjaz1ub0NhbGxiYWNrO1xyXG4gICAgfVxyXG5cclxuICAgIGNsaWNrQnRuWWVzKClcclxuICAgIHtcclxuICAgICAgICBpZih0aGlzLnllc19jYWxsYmFjaylcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMueWVzX2NhbGxiYWNrKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMubm9kZS5yZW1vdmVGcm9tUGFyZW50KCk7XHJcbiAgICB9XHJcblxyXG4gICAgY2xpY2tCdG5ObygpXHJcbiAgICB7XHJcbiAgICAgICAgaWYodGhpcy55ZXNfY2FsbGJhY2spXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLm5vX2NhbGxiYWNrKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMubm9kZS5yZW1vdmVGcm9tUGFyZW50KCk7XHJcbiAgICB9XHJcblxyXG59XHJcbiJdfQ==