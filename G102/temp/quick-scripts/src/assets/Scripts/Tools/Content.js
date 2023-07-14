"use strict";
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