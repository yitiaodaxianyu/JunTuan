
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Scripts/UI/home/FixedPos.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'f5a773Z9VdHQ5Uzlat8YurG', 'FixedPos');
// Scripts/UI/home/FixedPos.ts

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
var FixedPos = /** @class */ (function (_super) {
    __extends(FixedPos, _super);
    function FixedPos() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        //目标
        _this.target_node = null;
        _this.fixed_pos = cc.v2(0, 0);
        //content,如果有这个参数说明是在滚动容器里
        _this.content = null;
        return _this;
    }
    FixedPos.prototype.init = function (targetNode, fixedPos, content) {
        this.target_node = targetNode;
        this.fixed_pos = fixedPos;
        this.content = content;
    };
    FixedPos.prototype.update = function (dt) {
        if (this.target_node) {
            if (this.content) {
                this.node.setPosition(this.target_node.getPosition().add(this.fixed_pos).add(cc.v2(this.content.x, this.content.y)));
            }
            else {
                this.node.setPosition(this.target_node.getPosition().add(this.fixed_pos));
            }
        }
    };
    __decorate([
        property(cc.Node)
    ], FixedPos.prototype, "target_node", void 0);
    __decorate([
        property()
    ], FixedPos.prototype, "fixed_pos", void 0);
    __decorate([
        property(cc.Node)
    ], FixedPos.prototype, "content", void 0);
    FixedPos = __decorate([
        ccclass
    ], FixedPos);
    return FixedPos;
}(cc.Component));
exports.default = FixedPos;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0c1xcVUlcXGhvbWVcXEZpeGVkUG9zLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUNNLElBQUEsS0FBc0IsRUFBRSxDQUFDLFVBQVUsRUFBbEMsT0FBTyxhQUFBLEVBQUUsUUFBUSxjQUFpQixDQUFDO0FBRzFDO0lBQXNDLDRCQUFZO0lBQWxEO1FBQUEscUVBMkJDO1FBekJHLElBQUk7UUFFSixpQkFBVyxHQUFTLElBQUksQ0FBQztRQUV6QixlQUFTLEdBQVMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxDQUFDLENBQUM7UUFDN0IsMEJBQTBCO1FBRTFCLGFBQU8sR0FBUyxJQUFJLENBQUM7O0lBa0J6QixDQUFDO0lBaEJHLHVCQUFJLEdBQUosVUFBTSxVQUFrQixFQUFDLFFBQWdCLEVBQUMsT0FBZ0I7UUFDdEQsSUFBSSxDQUFDLFdBQVcsR0FBQyxVQUFVLENBQUM7UUFDNUIsSUFBSSxDQUFDLFNBQVMsR0FBQyxRQUFRLENBQUM7UUFDeEIsSUFBSSxDQUFDLE9BQU8sR0FBQyxPQUFPLENBQUM7SUFDekIsQ0FBQztJQUVELHlCQUFNLEdBQU4sVUFBTyxFQUFFO1FBRUwsSUFBRyxJQUFJLENBQUMsV0FBVyxFQUFDO1lBQ2hCLElBQUcsSUFBSSxDQUFDLE9BQU8sRUFBQztnQkFDWixJQUFJLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLFdBQVcsRUFBRSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLEVBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7YUFDdkg7aUJBQUk7Z0JBQ0QsSUFBSSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUM7YUFDN0U7U0FDSjtJQUNMLENBQUM7SUF0QkQ7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQztpREFDTztJQUV6QjtRQURDLFFBQVEsRUFBRTsrQ0FDa0I7SUFHN0I7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQzs2Q0FDRztJQVRKLFFBQVE7UUFENUIsT0FBTztPQUNhLFFBQVEsQ0EyQjVCO0lBQUQsZUFBQztDQTNCRCxBQTJCQyxDQTNCcUMsRUFBRSxDQUFDLFNBQVMsR0EyQmpEO2tCQTNCb0IsUUFBUSIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbIlxyXG5jb25zdCB7Y2NjbGFzcywgcHJvcGVydHl9ID0gY2MuX2RlY29yYXRvcjtcclxuXHJcbkBjY2NsYXNzXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEZpeGVkUG9zIGV4dGVuZHMgY2MuQ29tcG9uZW50IHtcclxuXHJcbiAgICAvL+ebruagh1xyXG4gICAgQHByb3BlcnR5KGNjLk5vZGUpXHJcbiAgICB0YXJnZXRfbm9kZTpjYy5Ob2RlPW51bGw7XHJcbiAgICBAcHJvcGVydHkoKVxyXG4gICAgZml4ZWRfcG9zOmNjLlZlYzI9Y2MudjIoMCwwKTtcclxuICAgIC8vY29udGVudCzlpoLmnpzmnInov5nkuKrlj4LmlbDor7TmmI7mmK/lnKjmu5rliqjlrrnlmajph4xcclxuICAgIEBwcm9wZXJ0eShjYy5Ob2RlKVxyXG4gICAgY29udGVudDpjYy5Ob2RlPW51bGw7XHJcblxyXG4gICAgaW5pdCAodGFyZ2V0Tm9kZTpjYy5Ob2RlLGZpeGVkUG9zOmNjLlZlYzIsY29udGVudD86Y2MuTm9kZSkge1xyXG4gICAgICAgIHRoaXMudGFyZ2V0X25vZGU9dGFyZ2V0Tm9kZTtcclxuICAgICAgICB0aGlzLmZpeGVkX3Bvcz1maXhlZFBvcztcclxuICAgICAgICB0aGlzLmNvbnRlbnQ9Y29udGVudDtcclxuICAgIH1cclxuXHJcbiAgICB1cGRhdGUoZHQpXHJcbiAgICB7XHJcbiAgICAgICAgaWYodGhpcy50YXJnZXRfbm9kZSl7XHJcbiAgICAgICAgICAgIGlmKHRoaXMuY29udGVudCl7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm5vZGUuc2V0UG9zaXRpb24odGhpcy50YXJnZXRfbm9kZS5nZXRQb3NpdGlvbigpLmFkZCh0aGlzLmZpeGVkX3BvcykuYWRkKGNjLnYyKHRoaXMuY29udGVudC54LHRoaXMuY29udGVudC55KSkpO1xyXG4gICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgIHRoaXMubm9kZS5zZXRQb3NpdGlvbih0aGlzLnRhcmdldF9ub2RlLmdldFBvc2l0aW9uKCkuYWRkKHRoaXMuZml4ZWRfcG9zKSk7XHJcbiAgICAgICAgICAgIH0gICAgICAgICAgICBcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuIl19