
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Scripts/UI/AutoMove.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '2b27eoMiTxGL4Qsxlu7W4TE', 'AutoMove');
// Scripts/UI/AutoMove.ts

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
var AutoMove = /** @class */ (function (_super) {
    __extends(AutoMove, _super);
    function AutoMove() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.max_x = 0;
        return _this;
    }
    AutoMove.prototype.onLoad = function () {
        this.max_x = 384;
    };
    AutoMove.prototype.update = function (dt) {
        this.node.x += dt * 256;
        // if(this.node.x>=this.max_x)
        // {
        //     this.node.x=-this.max_x;
        // }
    };
    AutoMove = __decorate([
        ccclass
    ], AutoMove);
    return AutoMove;
}(cc.Component));
exports.default = AutoMove;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0c1xcVUlcXEF1dG9Nb3ZlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUVNLElBQUEsS0FBc0IsRUFBRSxDQUFDLFVBQVUsRUFBbEMsT0FBTyxhQUFBLEVBQUUsUUFBUSxjQUFpQixDQUFDO0FBRzFDO0lBQXNDLDRCQUFZO0lBQWxEO1FBQUEscUVBa0JDO1FBaEJHLFdBQUssR0FBUSxDQUFDLENBQUM7O0lBZ0JuQixDQUFDO0lBWkcseUJBQU0sR0FBTjtRQUVJLElBQUksQ0FBQyxLQUFLLEdBQUMsR0FBRyxDQUFDO0lBQ25CLENBQUM7SUFFRCx5QkFBTSxHQUFOLFVBQVEsRUFBRTtRQUNOLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxJQUFFLEVBQUUsR0FBQyxHQUFHLENBQUM7UUFDcEIsOEJBQThCO1FBQzlCLElBQUk7UUFDSiwrQkFBK0I7UUFDL0IsSUFBSTtJQUNSLENBQUM7SUFqQmdCLFFBQVE7UUFENUIsT0FBTztPQUNhLFFBQVEsQ0FrQjVCO0lBQUQsZUFBQztDQWxCRCxBQWtCQyxDQWxCcUMsRUFBRSxDQUFDLFNBQVMsR0FrQmpEO2tCQWxCb0IsUUFBUSIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbIlxyXG5cclxuY29uc3Qge2NjY2xhc3MsIHByb3BlcnR5fSA9IGNjLl9kZWNvcmF0b3I7XHJcblxyXG5AY2NjbGFzc1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBBdXRvTW92ZSBleHRlbmRzIGNjLkNvbXBvbmVudCB7XHJcblxyXG4gICAgbWF4X3g6bnVtYmVyPTA7XHJcblxyXG5cclxuXHJcbiAgICBvbkxvYWQoKVxyXG4gICAge1xyXG4gICAgICAgIHRoaXMubWF4X3g9Mzg0O1xyXG4gICAgfVxyXG5cclxuICAgIHVwZGF0ZSAoZHQpIHtcclxuICAgICAgICB0aGlzLm5vZGUueCs9ZHQqMjU2O1xyXG4gICAgICAgIC8vIGlmKHRoaXMubm9kZS54Pj10aGlzLm1heF94KVxyXG4gICAgICAgIC8vIHtcclxuICAgICAgICAvLyAgICAgdGhpcy5ub2RlLng9LXRoaXMubWF4X3g7XHJcbiAgICAgICAgLy8gfVxyXG4gICAgfVxyXG59XHJcbiJdfQ==