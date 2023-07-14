
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Scripts/Game/ChuShengDian.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '7f9029/ZRNBJ5RMYaaf+NMv', 'ChuShengDian');
// Scripts/Game/ChuShengDian.ts

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
var GameManager_1 = require("../GameManager");
var NodePoolManager_1 = require("../NodePoolManager");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var ChuShengDian = /** @class */ (function (_super) {
    __extends(ChuShengDian, _super);
    function ChuShengDian() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ChuShengDian.prototype.onLoad = function () {
        this.init(8);
        GameManager_1.default.getInstance().chu_sheng_dian = this;
    };
    ChuShengDian.prototype.onDestroy = function () {
        GameManager_1.default.getInstance().chu_sheng_dian = null;
    };
    ChuShengDian.prototype.createChuShengDian = function (pos, scale) {
        var _this = this;
        var node = this.createNodeByType(0, pos);
        node.getComponent(sp.Skeleton).animation = 'animation';
        node.scale = scale;
        this.scheduleOnce(function () {
            _this.destroyChuShengDian(node);
        }, 3);
        return node;
    };
    ChuShengDian.prototype.destroyChuShengDian = function (node) {
        this.destroyNode(node, 0);
    };
    ChuShengDian = __decorate([
        ccclass
    ], ChuShengDian);
    return ChuShengDian;
}(NodePoolManager_1.default));
exports.default = ChuShengDian;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0c1xcR2FtZVxcQ2h1U2hlbmdEaWFuLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLDhDQUF5QztBQUN6QyxzREFBaUQ7QUFFM0MsSUFBQSxLQUFzQixFQUFFLENBQUMsVUFBVSxFQUFsQyxPQUFPLGFBQUEsRUFBRSxRQUFRLGNBQWlCLENBQUM7QUFHMUM7SUFBMEMsZ0NBQWU7SUFBekQ7O0lBMkJBLENBQUM7SUF4QkcsNkJBQU0sR0FBTjtRQUNJLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDYixxQkFBVyxDQUFDLFdBQVcsRUFBRSxDQUFDLGNBQWMsR0FBQyxJQUFJLENBQUM7SUFDbEQsQ0FBQztJQUNELGdDQUFTLEdBQVQ7UUFFSSxxQkFBVyxDQUFDLFdBQVcsRUFBRSxDQUFDLGNBQWMsR0FBQyxJQUFJLENBQUM7SUFDbEQsQ0FBQztJQUNELHlDQUFrQixHQUFsQixVQUFtQixHQUFXLEVBQUMsS0FBWTtRQUEzQyxpQkFTQztRQVBHLElBQUksSUFBSSxHQUFDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDLEVBQUMsR0FBRyxDQUFDLENBQUM7UUFDdEMsSUFBSSxDQUFDLFlBQVksQ0FBQyxFQUFFLENBQUMsUUFBUSxDQUFDLENBQUMsU0FBUyxHQUFDLFdBQVcsQ0FBQztRQUNyRCxJQUFJLENBQUMsS0FBSyxHQUFDLEtBQUssQ0FBQztRQUNqQixJQUFJLENBQUMsWUFBWSxDQUFDO1lBQ2QsS0FBSSxDQUFDLG1CQUFtQixDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ25DLENBQUMsRUFBQyxDQUFDLENBQUMsQ0FBQztRQUNMLE9BQU8sSUFBSSxDQUFDO0lBQ2hCLENBQUM7SUFFRCwwQ0FBbUIsR0FBbkIsVUFBb0IsSUFBWTtRQUU1QixJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksRUFBQyxDQUFDLENBQUMsQ0FBQztJQUM3QixDQUFDO0lBekJnQixZQUFZO1FBRGhDLE9BQU87T0FDYSxZQUFZLENBMkJoQztJQUFELG1CQUFDO0NBM0JELEFBMkJDLENBM0J5Qyx5QkFBZSxHQTJCeEQ7a0JBM0JvQixZQUFZIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IEdhbWVNYW5hZ2VyIGZyb20gXCIuLi9HYW1lTWFuYWdlclwiO1xyXG5pbXBvcnQgTm9kZVBvb2xNYW5hZ2VyIGZyb20gXCIuLi9Ob2RlUG9vbE1hbmFnZXJcIjtcclxuXHJcbmNvbnN0IHtjY2NsYXNzLCBwcm9wZXJ0eX0gPSBjYy5fZGVjb3JhdG9yO1xyXG5cclxuQGNjY2xhc3NcclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQ2h1U2hlbmdEaWFuIGV4dGVuZHMgTm9kZVBvb2xNYW5hZ2VyIHtcclxuXHJcblxyXG4gICAgb25Mb2FkICgpIHtcclxuICAgICAgICB0aGlzLmluaXQoOCk7XHJcbiAgICAgICAgR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5jaHVfc2hlbmdfZGlhbj10aGlzOyAgICAgICAgXHJcbiAgICB9XHJcbiAgICBvbkRlc3Ryb3koKVxyXG4gICAge1xyXG4gICAgICAgIEdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuY2h1X3NoZW5nX2RpYW49bnVsbDtcclxuICAgIH1cclxuICAgIGNyZWF0ZUNodVNoZW5nRGlhbihwb3M6Y2MuVmVjMixzY2FsZTpudW1iZXIpOmNjLk5vZGVcclxuICAgIHtcclxuICAgICAgICBsZXQgbm9kZT10aGlzLmNyZWF0ZU5vZGVCeVR5cGUoMCxwb3MpO1xyXG4gICAgICAgIG5vZGUuZ2V0Q29tcG9uZW50KHNwLlNrZWxldG9uKS5hbmltYXRpb249J2FuaW1hdGlvbic7XHJcbiAgICAgICAgbm9kZS5zY2FsZT1zY2FsZTtcclxuICAgICAgICB0aGlzLnNjaGVkdWxlT25jZSgoKT0+e1xyXG4gICAgICAgICAgICB0aGlzLmRlc3Ryb3lDaHVTaGVuZ0RpYW4obm9kZSk7XHJcbiAgICAgICAgfSwzKTtcclxuICAgICAgICByZXR1cm4gbm9kZTtcclxuICAgIH1cclxuXHJcbiAgICBkZXN0cm95Q2h1U2hlbmdEaWFuKG5vZGU6Y2MuTm9kZSlcclxuICAgIHtcclxuICAgICAgICB0aGlzLmRlc3Ryb3lOb2RlKG5vZGUsMCk7XHJcbiAgICB9XHJcblxyXG59XHJcbiJdfQ==