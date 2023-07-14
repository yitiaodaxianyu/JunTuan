
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Scripts/Hint.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0c1xcSGludC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFFTSxJQUFBLEtBQXNCLEVBQUUsQ0FBQyxVQUFVLEVBQWxDLE9BQU8sYUFBQSxFQUFFLFFBQVEsY0FBaUIsQ0FBQztBQUcxQztJQUFrQyx3QkFBWTtJQUE5QztRQUFBLHFFQThCQztRQTVCRyxnQkFBVSxHQUFhLElBQUksQ0FBQzs7SUE0QmhDLENBQUM7SUExQkcsd0JBQXdCO0lBRXhCLHFCQUFNLEdBQU47UUFDSSxJQUFJLENBQUMsVUFBVSxHQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLFdBQVcsQ0FBQyxDQUFDLFlBQVksQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDakYsQ0FBQztJQUVELG9CQUFLLEdBQUw7UUFDSSxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sR0FBQyxJQUFJLENBQUM7SUFDMUIsQ0FBQztJQUVELDhCQUFlLEdBQWYsVUFBZ0IsT0FBYyxFQUFDLEVBQVU7UUFBekMsaUJBZUM7UUFiRyxJQUFHLENBQUMsRUFBRSxFQUNOO1lBQ0ksRUFBRSxHQUFDLEdBQUcsQ0FBQztTQUNWO1FBQ0QsSUFBSSxDQUFDLFVBQVUsQ0FBQyxNQUFNLEdBQUMsT0FBTyxDQUFDO1FBQy9CLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxHQUFDLENBQUMsQ0FBQztRQUNwQixJQUFJLENBQUMsVUFBVSxDQUFDLE9BQU8sR0FBQyxLQUFLLENBQUM7UUFDOUIsSUFBSSxDQUFDLFlBQVksQ0FBQztZQUNkLEtBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxHQUFDLEdBQUcsQ0FBQztZQUN0QixLQUFJLENBQUMsVUFBVSxDQUFDLE9BQU8sR0FBQyxJQUFJLENBQUM7WUFDN0IsS0FBSSxDQUFDLElBQUksQ0FBQyxNQUFNLEdBQUMsS0FBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsTUFBTSxHQUFDLENBQUMsS0FBSSxDQUFDLFVBQVUsQ0FBQyxVQUFVLEdBQUMsS0FBSSxDQUFDLFVBQVUsQ0FBQyxRQUFRLENBQUMsR0FBQyxDQUFDLENBQUM7WUFDckcsRUFBRSxDQUFDLEtBQUssQ0FBQyxLQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxRQUFRLENBQUMsRUFBRSxDQUFDLFNBQVMsQ0FBQyxFQUFFLENBQUMsRUFBQyxFQUFFLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxFQUFDLEVBQUUsQ0FBQyxVQUFVLEVBQUUsQ0FBQyxDQUFDLENBQUMsS0FBSyxFQUFFLENBQUM7UUFDbEcsQ0FBQyxFQUFDLElBQUksQ0FBQyxDQUFDO0lBQ1osQ0FBQztJQTdCZ0IsSUFBSTtRQUR4QixPQUFPO09BQ2EsSUFBSSxDQThCeEI7SUFBRCxXQUFDO0NBOUJELEFBOEJDLENBOUJpQyxFQUFFLENBQUMsU0FBUyxHQThCN0M7a0JBOUJvQixJQUFJIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiXHJcblxyXG5jb25zdCB7Y2NjbGFzcywgcHJvcGVydHl9ID0gY2MuX2RlY29yYXRvcjtcclxuXHJcbkBjY2NsYXNzXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEhpbnQgZXh0ZW5kcyBjYy5Db21wb25lbnQge1xyXG5cclxuICAgIGhpbnRfbGFiZWw6IGNjLkxhYmVsID0gbnVsbDtcclxuXHJcbiAgICAvLyBMSUZFLUNZQ0xFIENBTExCQUNLUzpcclxuXHJcbiAgICBvbkxvYWQgKCkge1xyXG4gICAgICAgIHRoaXMuaGludF9sYWJlbD10aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoJ2hpbnRMYWJlbCcpLmdldENvbXBvbmVudChjYy5MYWJlbCk7XHJcbiAgICB9XHJcblxyXG4gICAgc3RhcnQgKCkge1xyXG4gICAgICAgIHRoaXMubm9kZS56SW5kZXg9OTk5OTsgICAgICAgIFxyXG4gICAgfVxyXG5cclxuICAgIHNob3dIaW50TWVzc2FnZShtZXNzYWdlOnN0cmluZyxkdD86bnVtYmVyKVxyXG4gICAge1xyXG4gICAgICAgIGlmKCFkdClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGR0PTEuNTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5oaW50X2xhYmVsLnN0cmluZz1tZXNzYWdlO1xyXG4gICAgICAgIHRoaXMubm9kZS5vcGFjaXR5PTA7XHJcbiAgICAgICAgdGhpcy5oaW50X2xhYmVsLmVuYWJsZWQ9ZmFsc2U7XHJcbiAgICAgICAgdGhpcy5zY2hlZHVsZU9uY2UoKCk9PntcclxuICAgICAgICAgICAgdGhpcy5ub2RlLm9wYWNpdHk9MjU1O1xyXG4gICAgICAgICAgICB0aGlzLmhpbnRfbGFiZWwuZW5hYmxlZD10cnVlO1xyXG4gICAgICAgICAgICB0aGlzLm5vZGUuaGVpZ2h0PXRoaXMuaGludF9sYWJlbC5ub2RlLmhlaWdodCsodGhpcy5oaW50X2xhYmVsLmxpbmVIZWlnaHQtdGhpcy5oaW50X2xhYmVsLmZvbnRTaXplKSoyO1xyXG4gICAgICAgICAgICBjYy50d2Vlbih0aGlzLm5vZGUpLnRoZW4oY2Muc2VxdWVuY2UoY2MuZGVsYXlUaW1lKGR0KSxjYy5mYWRlT3V0KDEpLGNjLnJlbW92ZVNlbGYoKSkpLnN0YXJ0KCk7XHJcbiAgICAgICAgfSwwLjA1KTtcclxuICAgIH1cclxufVxyXG4iXX0=