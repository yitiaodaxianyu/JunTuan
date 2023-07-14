
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Scripts/Tools/Content.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '60a8eTNfmZNIrHd5mN5/blp', 'Content');
// Scripts/Tools/Content.ts

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
var Content = /** @class */ (function (_super) {
    __extends(Content, _super);
    function Content() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.view_rect = null;
        return _this;
    }
    Content.prototype.start = function () {
        var view = this.node.parent;
        this.view_rect = view.getBoundingBox();
    };
    Content.prototype.update = function (dt) {
        var len = this.node.childrenCount;
        var childArr = this.node.children;
        for (var i = 0; i < len; i++) {
            var node = childArr[i];
            var rect = node.getBoundingBox();
            rect.x = node.parent.x + rect.x;
            rect.y = node.parent.y + rect.y;
            if (!this.view_rect.containsRect(rect) && !this.view_rect.intersects(rect)) {
                node.opacity = 0;
            }
            else {
                node.opacity = 255;
            }
        }
    };
    Content = __decorate([
        ccclass
    ], Content);
    return Content;
}(cc.Component));
exports.default = Content;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0c1xcVG9vbHNcXENvbnRlbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBRU0sSUFBQSxLQUFzQixFQUFFLENBQUMsVUFBVSxFQUFsQyxPQUFPLGFBQUEsRUFBRSxRQUFRLGNBQWlCLENBQUM7QUFHMUM7SUFBcUMsMkJBQVk7SUFBakQ7UUFBQSxxRUF5QkM7UUF2QkcsZUFBUyxHQUFTLElBQUksQ0FBQzs7SUF1QjNCLENBQUM7SUFyQmEsdUJBQUssR0FBZjtRQUNJLElBQUksSUFBSSxHQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDO1FBQzFCLElBQUksQ0FBQyxTQUFTLEdBQUMsSUFBSSxDQUFDLGNBQWMsRUFBRSxDQUFDO0lBQ3pDLENBQUM7SUFFRCx3QkFBTSxHQUFOLFVBQVEsRUFBRTtRQUNOLElBQUksR0FBRyxHQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDO1FBQ2hDLElBQUksUUFBUSxHQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDO1FBQ2hDLEtBQUksSUFBSSxDQUFDLEdBQUMsQ0FBQyxFQUFFLENBQUMsR0FBQyxHQUFHLEVBQUUsQ0FBQyxFQUFFLEVBQUM7WUFDcEIsSUFBSSxJQUFJLEdBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ3JCLElBQUksSUFBSSxHQUFDLElBQUksQ0FBQyxjQUFjLEVBQUUsQ0FBQztZQUMvQixJQUFJLENBQUMsQ0FBQyxHQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxHQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7WUFDNUIsSUFBSSxDQUFDLENBQUMsR0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsR0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO1lBQzVCLElBQUcsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsSUFBRSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxFQUFDO2dCQUNwRSxJQUFJLENBQUMsT0FBTyxHQUFDLENBQUMsQ0FBQzthQUNsQjtpQkFBSTtnQkFDRCxJQUFJLENBQUMsT0FBTyxHQUFDLEdBQUcsQ0FBQzthQUNwQjtTQUNKO0lBQ0wsQ0FBQztJQXZCZ0IsT0FBTztRQUQzQixPQUFPO09BQ2EsT0FBTyxDQXlCM0I7SUFBRCxjQUFDO0NBekJELEFBeUJDLENBekJvQyxFQUFFLENBQUMsU0FBUyxHQXlCaEQ7a0JBekJvQixPQUFPIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiXHJcblxyXG5jb25zdCB7Y2NjbGFzcywgcHJvcGVydHl9ID0gY2MuX2RlY29yYXRvcjtcclxuXHJcbkBjY2NsYXNzXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIENvbnRlbnQgZXh0ZW5kcyBjYy5Db21wb25lbnQge1xyXG5cclxuICAgIHZpZXdfcmVjdDpjYy5SZWN0PW51bGw7XHJcblxyXG4gICAgcHJvdGVjdGVkIHN0YXJ0KCk6IHZvaWQge1xyXG4gICAgICAgIGxldCB2aWV3PXRoaXMubm9kZS5wYXJlbnQ7XHJcbiAgICAgICAgdGhpcy52aWV3X3JlY3Q9dmlldy5nZXRCb3VuZGluZ0JveCgpO1xyXG4gICAgfVxyXG5cclxuICAgIHVwZGF0ZSAoZHQpIHtcclxuICAgICAgICBsZXQgbGVuPXRoaXMubm9kZS5jaGlsZHJlbkNvdW50O1xyXG4gICAgICAgIGxldCBjaGlsZEFycj10aGlzLm5vZGUuY2hpbGRyZW47XHJcbiAgICAgICAgZm9yKGxldCBpPTA7IGk8bGVuOyBpKyspe1xyXG4gICAgICAgICAgICBsZXQgbm9kZT1jaGlsZEFycltpXTtcclxuICAgICAgICAgICAgbGV0IHJlY3Q9bm9kZS5nZXRCb3VuZGluZ0JveCgpO1xyXG4gICAgICAgICAgICByZWN0Lng9bm9kZS5wYXJlbnQueCtyZWN0Lng7XHJcbiAgICAgICAgICAgIHJlY3QueT1ub2RlLnBhcmVudC55K3JlY3QueTtcclxuICAgICAgICAgICAgaWYoIXRoaXMudmlld19yZWN0LmNvbnRhaW5zUmVjdChyZWN0KSYmIXRoaXMudmlld19yZWN0LmludGVyc2VjdHMocmVjdCkpe1xyXG4gICAgICAgICAgICAgICAgbm9kZS5vcGFjaXR5PTA7XHJcbiAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgbm9kZS5vcGFjaXR5PTI1NTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbn1cclxuIl19