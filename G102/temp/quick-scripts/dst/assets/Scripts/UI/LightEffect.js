
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Scripts/UI/LightEffect.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '497c1IOPYZIyo/lzPjtn+jz', 'LightEffect');
// Scripts/UI/LightEffect.ts

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
var LightEffect = /** @class */ (function (_super) {
    __extends(LightEffect, _super);
    function LightEffect() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.light_materail = null;
        _this.light_y = -0.5;
        return _this;
    }
    //cur_angle:number=45;
    LightEffect.prototype.start = function () {
        this.light_materail = this.node.getComponent(cc.Sprite).getMaterial(0);
    };
    LightEffect.prototype.update = function (dt) {
        this.light_y += dt * 1.2;
        if (this.light_y > 1.5) {
            this.light_y = -0.5;
            // this.cur_angle=180-this.cur_angle;
            // this.light_materail.setProperty('lightAngle',this.cur_angle);
        }
        this.light_materail.setProperty('lightCenterPoint', cc.v2(0.5, this.light_y));
    };
    __decorate([
        property()
    ], LightEffect.prototype, "light_y", void 0);
    LightEffect = __decorate([
        ccclass
    ], LightEffect);
    return LightEffect;
}(cc.Component));
exports.default = LightEffect;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0c1xcVUlcXExpZ2h0RWZmZWN0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUVNLElBQUEsS0FBc0IsRUFBRSxDQUFDLFVBQVUsRUFBbEMsT0FBTyxhQUFBLEVBQUUsUUFBUSxjQUFpQixDQUFDO0FBRzFDO0lBQXlDLCtCQUFZO0lBQXJEO1FBQUEscUVBdUJDO1FBckJHLG9CQUFjLEdBQWEsSUFBSSxDQUFDO1FBRWhDLGFBQU8sR0FBUSxDQUFDLEdBQUcsQ0FBQzs7SUFtQnhCLENBQUM7SUFsQkcsc0JBQXNCO0lBRXRCLDJCQUFLLEdBQUw7UUFDSSxJQUFJLENBQUMsY0FBYyxHQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUMsQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDekUsQ0FBQztJQUVELDRCQUFNLEdBQU4sVUFBTyxFQUFFO1FBRUwsSUFBSSxDQUFDLE9BQU8sSUFBRSxFQUFFLEdBQUMsR0FBRyxDQUFDO1FBQ3JCLElBQUcsSUFBSSxDQUFDLE9BQU8sR0FBQyxHQUFHLEVBQ25CO1lBQ0ksSUFBSSxDQUFDLE9BQU8sR0FBQyxDQUFDLEdBQUcsQ0FBQztZQUNsQixxQ0FBcUM7WUFDckMsZ0VBQWdFO1NBQ25FO1FBQ0QsSUFBSSxDQUFDLGNBQWMsQ0FBQyxXQUFXLENBQUMsa0JBQWtCLEVBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxHQUFHLEVBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7SUFDaEYsQ0FBQztJQWpCRDtRQURDLFFBQVEsRUFBRTtnREFDUztJQUpILFdBQVc7UUFEL0IsT0FBTztPQUNhLFdBQVcsQ0F1Qi9CO0lBQUQsa0JBQUM7Q0F2QkQsQUF1QkMsQ0F2QndDLEVBQUUsQ0FBQyxTQUFTLEdBdUJwRDtrQkF2Qm9CLFdBQVciLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJcclxuXHJcbmNvbnN0IHtjY2NsYXNzLCBwcm9wZXJ0eX0gPSBjYy5fZGVjb3JhdG9yO1xyXG5cclxuQGNjY2xhc3NcclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTGlnaHRFZmZlY3QgZXh0ZW5kcyBjYy5Db21wb25lbnQge1xyXG5cclxuICAgIGxpZ2h0X21hdGVyYWlsOmNjLk1hdGVyaWFsPW51bGw7XHJcbiAgICBAcHJvcGVydHkoKVxyXG4gICAgbGlnaHRfeTpudW1iZXI9LTAuNTtcclxuICAgIC8vY3VyX2FuZ2xlOm51bWJlcj00NTtcclxuXHJcbiAgICBzdGFydCAoKSB7XHJcbiAgICAgICAgdGhpcy5saWdodF9tYXRlcmFpbD10aGlzLm5vZGUuZ2V0Q29tcG9uZW50KGNjLlNwcml0ZSkuZ2V0TWF0ZXJpYWwoMCk7XHJcbiAgICB9XHJcblxyXG4gICAgdXBkYXRlKGR0KVxyXG4gICAge1xyXG4gICAgICAgIHRoaXMubGlnaHRfeSs9ZHQqMS4yO1xyXG4gICAgICAgIGlmKHRoaXMubGlnaHRfeT4xLjUpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLmxpZ2h0X3k9LTAuNTtcclxuICAgICAgICAgICAgLy8gdGhpcy5jdXJfYW5nbGU9MTgwLXRoaXMuY3VyX2FuZ2xlO1xyXG4gICAgICAgICAgICAvLyB0aGlzLmxpZ2h0X21hdGVyYWlsLnNldFByb3BlcnR5KCdsaWdodEFuZ2xlJyx0aGlzLmN1cl9hbmdsZSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMubGlnaHRfbWF0ZXJhaWwuc2V0UHJvcGVydHkoJ2xpZ2h0Q2VudGVyUG9pbnQnLGNjLnYyKDAuNSx0aGlzLmxpZ2h0X3kpKTtcclxuICAgIH1cclxuXHJcbn1cclxuIl19