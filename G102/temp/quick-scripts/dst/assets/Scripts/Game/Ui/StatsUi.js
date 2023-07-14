
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Scripts/Game/Ui/StatsUi.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '9ea4bU0cfRGOrjuWHcOzI0m', 'StatsUi');
// Scripts/Game/Ui/StatsUi.ts

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
var StatsUi = /** @class */ (function (_super) {
    __extends(StatsUi, _super);
    function StatsUi() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    StatsUi = __decorate([
        ccclass
    ], StatsUi);
    return StatsUi;
}(cc.Component));
exports.default = StatsUi;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0c1xcR2FtZVxcVWlcXFN0YXRzVWkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBR00sSUFBQSxLQUFzQixFQUFFLENBQUMsVUFBVSxFQUFsQyxPQUFPLGFBQUEsRUFBRSxRQUFRLGNBQWlCLENBQUM7QUFHMUM7SUFBcUMsMkJBQVk7SUFBakQ7O0lBbUVBLENBQUM7SUFuRW9CLE9BQU87UUFEM0IsT0FBTztPQUNhLE9BQU8sQ0FtRTNCO0lBQUQsY0FBQztDQW5FRCxBQW1FQyxDQW5Fb0MsRUFBRSxDQUFDLFNBQVMsR0FtRWhEO2tCQW5Fb0IsT0FBTyIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBNeVRvb2wgZnJvbSBcIi4uLy4uL1Rvb2xzL015VG9vbFwiO1xyXG5cclxuXHJcbmNvbnN0IHtjY2NsYXNzLCBwcm9wZXJ0eX0gPSBjYy5fZGVjb3JhdG9yO1xyXG5cclxuQGNjY2xhc3NcclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgU3RhdHNVaSBleHRlbmRzIGNjLkNvbXBvbmVudCB7XHJcblxyXG4gICAgLy8gY3VyX251bV8xOm51bWJlcj0wO1xyXG4gICAgLy8gY3VyX251bV8yOm51bWJlcj0wO1xyXG4gICAgLy8gdGFyZ2V0X251bV8xOm51bWJlcj0wO1xyXG4gICAgLy8gdGFyZ2V0X251bV8yOm51bWJlcj0wO1xyXG4gICAgLy8gcHJvZ3Jlc3NfMTpjYy5Qcm9ncmVzc0Jhcj1udWxsO1xyXG4gICAgLy8gcHJvZ3Jlc3NfMjpjYy5Qcm9ncmVzc0Jhcj1udWxsO1xyXG4gICAgLy8gbGFiZWxfMTpjYy5MYWJlbD1udWxsO1xyXG4gICAgLy8gbGFiZWxfMjpjYy5MYWJlbD1udWxsO1xyXG4gICAgLy8gLyoq5q+P5bin55qE5Y+Y5YyW5YC8ICovXHJcbiAgICAvLyBwcml2YXRlIGNoYW5naW5nXzE6bnVtYmVyPTA7XHJcbiAgICAvLyBwcml2YXRlIGNoYW5naW5nXzI6bnVtYmVyPTA7XHJcbiAgICAvLyAvKirmnIDpq5jov5vluqbns7vmlbAgKi9cclxuICAgIC8vIG1heF9wcm9ncmVzc18xOm51bWJlcj0wO1xyXG4gICAgLy8gbWF4X3Byb2dyZXNzXzI6bnVtYmVyPTA7XHJcblxyXG4gICAgLy8gamlzaGk6bnVtYmVyPTA7XHJcblxyXG4gICAgLy8gaW5pdCAodGFyZ2V0TnVtMTpudW1iZXIsdGFyZ2V0TnVtMjpudW1iZXIsY29tcGVsZXRlVGltZTpudW1iZXIsbWF4TnVtOm51bWJlcikge1xyXG4gICAgLy8gICAgIHRoaXMudGFyZ2V0X251bV8xPXRhcmdldE51bTE7XHJcbiAgICAvLyAgICAgdGhpcy50YXJnZXRfbnVtXzI9dGFyZ2V0TnVtMjtcclxuICAgIC8vICAgICB0aGlzLm1heF9wcm9ncmVzc18xPXRhcmdldE51bTEvbWF4TnVtO1xyXG4gICAgLy8gICAgIHRoaXMubWF4X3Byb2dyZXNzXzI9dGFyZ2V0TnVtMi9tYXhOdW07XHJcbiAgICAvLyAgICAgdGhpcy5wcm9ncmVzc18xPXRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZSgnYXR0JykuZ2V0Q29tcG9uZW50KGNjLlByb2dyZXNzQmFyKTtcclxuICAgIC8vICAgICB0aGlzLnByb2dyZXNzXzI9dGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKCdza2lsbCcpLmdldENvbXBvbmVudChjYy5Qcm9ncmVzc0Jhcik7XHJcbiAgICAvLyAgICAgdGhpcy5sYWJlbF8xPXRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZSgnYXR0TnVtJykuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKTtcclxuICAgIC8vICAgICB0aGlzLmxhYmVsXzI9dGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKCdza2lsbE51bScpLmdldENvbXBvbmVudChjYy5MYWJlbCk7XHJcbiAgICAvLyAgICAgbGV0IHRvdGFsRnJhbWU9TWF0aC5jZWlsKGNvbXBlbGV0ZVRpbWUvY2MuZGlyZWN0b3IuZ2V0RGVsdGFUaW1lKCkpO1xyXG4gICAgLy8gICAgIGxldCBvZmZzZXROdW0xPXRoaXMudGFyZ2V0X251bV8xLXRoaXMuY3VyX251bV8xO1xyXG4gICAgLy8gICAgIGxldCBvZmZzZXROdW0yPXRoaXMudGFyZ2V0X251bV8yLXRoaXMuY3VyX251bV8yO1xyXG4gICAgLy8gICAgIHRoaXMuY2hhbmdpbmdfMT1vZmZzZXROdW0xL3RvdGFsRnJhbWU7XHJcbiAgICAvLyAgICAgdGhpcy5jaGFuZ2luZ18yPW9mZnNldE51bTIvdG90YWxGcmFtZTtcclxuICAgIC8vIH1cclxuXHJcbiAgICAvLyBwcml2YXRlIHNob3dDdXJOdW0xKCl7XHJcbiAgICAvLyAgICAgdGhpcy5sYWJlbF8xLnN0cmluZz1NeVRvb2wuZ2V0Q29pbkRhbndlaSh0aGlzLmN1cl9udW1fMSwxKTtcclxuICAgIC8vICAgICB0aGlzLnByb2dyZXNzXzEucHJvZ3Jlc3M9dGhpcy5jdXJfbnVtXzEvdGhpcy50YXJnZXRfbnVtXzEqdGhpcy5tYXhfcHJvZ3Jlc3NfMTtcclxuICAgIC8vIH1cclxuICAgIFxyXG4gICAgLy8gcHJpdmF0ZSBzaG93Q3VyTnVtMigpe1xyXG4gICAgLy8gICAgIHRoaXMubGFiZWxfMi5zdHJpbmc9TXlUb29sLmdldENvaW5EYW53ZWkodGhpcy5jdXJfbnVtXzIsMSk7XHJcbiAgICAvLyAgICAgdGhpcy5wcm9ncmVzc18yLnByb2dyZXNzPXRoaXMuY3VyX251bV8yL3RoaXMudGFyZ2V0X251bV8yKnRoaXMubWF4X3Byb2dyZXNzXzI7XHJcbiAgICAvLyB9XHJcblxyXG4gICAgLy8gdXBkYXRlIChkdCkge1xyXG4gICAgLy8gICAgIGlmKHRoaXMuY3VyX251bV8xIT10aGlzLnRhcmdldF9udW1fMSl7XHJcbiAgICAvLyAgICAgICAgIHRoaXMuY3VyX251bV8xPU1hdGguY2VpbCh0aGlzLmN1cl9udW1fMSt0aGlzLmNoYW5naW5nXzEpO1xyXG4gICAgLy8gICAgICAgICB0aGlzLnNob3dDdXJOdW0xKCk7XHJcbiAgICAvLyAgICAgICAgIGxldCBvZmZzZXROdW0xPXRoaXMudGFyZ2V0X251bV8xLXRoaXMuY3VyX251bV8xO1xyXG4gICAgLy8gICAgICAgICBpZihNYXRoLmFicyhvZmZzZXROdW0xKTxNYXRoLmFicyh0aGlzLmNoYW5naW5nXzEpKXtcclxuICAgIC8vICAgICAgICAgICAgIHRoaXMuY3VyX251bV8xPXRoaXMudGFyZ2V0X251bV8xO1xyXG4gICAgLy8gICAgICAgICAgICAgdGhpcy5zaG93Q3VyTnVtMSgpO1xyXG4gICAgLy8gICAgICAgICB9ICAgICAgICAgICAgXHJcbiAgICAvLyAgICAgfVxyXG5cclxuICAgIC8vICAgICBpZih0aGlzLmN1cl9udW1fMiE9dGhpcy50YXJnZXRfbnVtXzIpe1xyXG4gICAgLy8gICAgICAgICB0aGlzLmN1cl9udW1fMj1NYXRoLmNlaWwodGhpcy5jdXJfbnVtXzIrdGhpcy5jaGFuZ2luZ18yKTtcclxuICAgIC8vICAgICAgICAgdGhpcy5zaG93Q3VyTnVtMigpO1xyXG4gICAgLy8gICAgICAgICBsZXQgb2Zmc2V0TnVtMj10aGlzLnRhcmdldF9udW1fMi10aGlzLmN1cl9udW1fMjtcclxuICAgIC8vICAgICAgICAgaWYoTWF0aC5hYnMob2Zmc2V0TnVtMik8TWF0aC5hYnModGhpcy5jaGFuZ2luZ18yKSl7XHJcbiAgICAvLyAgICAgICAgICAgICB0aGlzLmN1cl9udW1fMj10aGlzLnRhcmdldF9udW1fMjtcclxuICAgIC8vICAgICAgICAgICAgIHRoaXMuc2hvd0N1ck51bTIoKTtcclxuICAgIC8vICAgICAgICAgfVxyXG4gICAgLy8gICAgIH1cclxuICAgICAgICBcclxuICAgIC8vIH1cclxufVxyXG5cclxuIl19