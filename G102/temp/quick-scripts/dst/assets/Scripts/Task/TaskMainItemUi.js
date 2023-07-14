
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Scripts/Task/TaskMainItemUi.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '6646dqq97lG85yrdb/0c6Ny', 'TaskMainItemUi');
// Scripts/Task/TaskMainItemUi.ts

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
var TaskMainItemUi = /** @class */ (function (_super) {
    __extends(TaskMainItemUi, _super);
    function TaskMainItemUi() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.call_back = null;
        _this.message = null;
        return _this;
    }
    TaskMainItemUi.prototype.initGoingItem = function (data, now, func) {
    };
    TaskMainItemUi.prototype.initFinishItem = function (data, now, func) {
    };
    TaskMainItemUi.prototype.onClickBtn = function () {
    };
    TaskMainItemUi = __decorate([
        ccclass
    ], TaskMainItemUi);
    return TaskMainItemUi;
}(cc.Component));
exports.default = TaskMainItemUi;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0c1xcVGFza1xcVGFza01haW5JdGVtVWkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBSU0sSUFBQSxLQUFzQixFQUFFLENBQUMsVUFBVSxFQUFsQyxPQUFPLGFBQUEsRUFBRSxRQUFRLGNBQWlCLENBQUM7QUFHMUM7SUFBNEMsa0NBQVk7SUFBeEQ7UUFBQSxxRUFpQkM7UUFmRyxlQUFTLEdBQVksSUFBSSxDQUFDO1FBQzFCLGFBQU8sR0FBNkIsSUFBSSxDQUFDOztJQWM3QyxDQUFDO0lBWkcsc0NBQWEsR0FBYixVQUFjLElBQThCLEVBQUMsR0FBVSxFQUFDLElBQWE7SUFFckUsQ0FBQztJQUVELHVDQUFjLEdBQWQsVUFBZSxJQUE4QixFQUFDLEdBQVUsRUFBQyxJQUFhO0lBRXRFLENBQUM7SUFFRCxtQ0FBVSxHQUFWO0lBRUEsQ0FBQztJQWZnQixjQUFjO1FBRGxDLE9BQU87T0FDYSxjQUFjLENBaUJsQztJQUFELHFCQUFDO0NBakJELEFBaUJDLENBakIyQyxFQUFFLENBQUMsU0FBUyxHQWlCdkQ7a0JBakJvQixjQUFjIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSnNvblRocmVhZFRhc2tJbmZvcm1hdGlvbiB9IGZyb20gXCIuL0RhdGEvVGhyZWFkVGFza0luZm9ybWF0aW9uXCI7XHJcbmltcG9ydCBUZXh0TGFuZ3VhZ2UgZnJvbSBcIi4uL211bHRpTGFuZ3VhZ2UvVGV4dExhbmd1YWdlXCI7XHJcbmltcG9ydCB7IFByb3BNYW5hZ2VyIH0gZnJvbSBcIi4uL1Byb3AvUHJvcE1hbmFnZXJcIjtcclxuXHJcbmNvbnN0IHtjY2NsYXNzLCBwcm9wZXJ0eX0gPSBjYy5fZGVjb3JhdG9yO1xyXG5cclxuQGNjY2xhc3NcclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVGFza01haW5JdGVtVWkgZXh0ZW5kcyBjYy5Db21wb25lbnQge1xyXG5cclxuICAgIGNhbGxfYmFjazpGdW5jdGlvbiA9IG51bGw7XHJcbiAgICBtZXNzYWdlOkpzb25UaHJlYWRUYXNrSW5mb3JtYXRpb24gPSBudWxsO1xyXG5cclxuICAgIGluaXRHb2luZ0l0ZW0oZGF0YTpKc29uVGhyZWFkVGFza0luZm9ybWF0aW9uLG5vdzpudW1iZXIsZnVuYzpGdW5jdGlvbil7XHJcbiAgICAgICAgXHJcbiAgICB9XHJcblxyXG4gICAgaW5pdEZpbmlzaEl0ZW0oZGF0YTpKc29uVGhyZWFkVGFza0luZm9ybWF0aW9uLG5vdzpudW1iZXIsZnVuYzpGdW5jdGlvbil7XHJcbiAgICAgICAgXHJcbiAgICB9XHJcblxyXG4gICAgb25DbGlja0J0bigpe1xyXG4gICAgICAgIFxyXG4gICAgfVxyXG5cclxufVxyXG4iXX0=