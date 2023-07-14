
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Scripts/UI/VideoTip.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '38d1aBeYBJDQJFjMYzfTxOW', 'VideoTip');
// Scripts/UI/VideoTip.ts

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
var LanguageManager_1 = require("../multiLanguage/LanguageManager");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var VideoTip = /** @class */ (function (_super) {
    __extends(VideoTip, _super);
    function VideoTip() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.remain_sec = 5;
        _this.yes_callback = null;
        _this.no_callback = null;
        return _this;
    }
    VideoTip.prototype.init = function (yesCallback, noCallback) {
        this.yes_callback = yesCallback;
        this.no_callback = noCallback;
        var text = this.node.getChildByName('jobLabel');
        text.getComponent(cc.Label).string = LanguageManager_1.default.getInstance().getStrByTextId(110008);
        var okText = this.node.getChildByName('btnVideo').getChildByName('text');
        okText.getComponent(cc.Label).string = LanguageManager_1.default.getInstance().getStrByTextId(100001);
    };
    VideoTip.prototype.clickBtnYes = function () {
        if (this.yes_callback) {
            this.yes_callback();
        }
        this.node.removeFromParent();
    };
    VideoTip.prototype.clickBtnNo = function () {
        if (this.no_callback) {
            this.no_callback();
        }
        this.node.removeFromParent();
    };
    VideoTip = __decorate([
        ccclass
    ], VideoTip);
    return VideoTip;
}(cc.Component));
exports.default = VideoTip;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0c1xcVUlcXFZpZGVvVGlwLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUNBLG9FQUErRDtBQUd6RCxJQUFBLEtBQXNCLEVBQUUsQ0FBQyxVQUFVLEVBQWxDLE9BQU8sYUFBQSxFQUFFLFFBQVEsY0FBaUIsQ0FBQztBQUcxQztJQUFzQyw0QkFBWTtJQUFsRDtRQUFBLHFFQWlDQztRQS9CRyxnQkFBVSxHQUFRLENBQUMsQ0FBQztRQUNwQixrQkFBWSxHQUFVLElBQUksQ0FBQztRQUMzQixpQkFBVyxHQUFVLElBQUksQ0FBQzs7SUE2QjlCLENBQUM7SUEzQkcsdUJBQUksR0FBSixVQUFLLFdBQW9CLEVBQUMsVUFBbUI7UUFDekMsSUFBSSxDQUFDLFlBQVksR0FBQyxXQUFXLENBQUM7UUFDOUIsSUFBSSxDQUFDLFdBQVcsR0FBQyxVQUFVLENBQUM7UUFDNUIsSUFBSSxJQUFJLEdBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsVUFBVSxDQUFDLENBQUM7UUFDOUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDLENBQUMsTUFBTSxHQUFDLHlCQUFlLENBQUMsV0FBVyxFQUFFLENBQUMsY0FBYyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQ3hGLElBQUksTUFBTSxHQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLFVBQVUsQ0FBQyxDQUFDLGNBQWMsQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUN2RSxNQUFNLENBQUMsWUFBWSxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUMsQ0FBQyxNQUFNLEdBQUMseUJBQWUsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxjQUFjLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDOUYsQ0FBQztJQUVELDhCQUFXLEdBQVg7UUFFSSxJQUFHLElBQUksQ0FBQyxZQUFZLEVBQ3BCO1lBQ0ksSUFBSSxDQUFDLFlBQVksRUFBRSxDQUFDO1NBQ3ZCO1FBQ0QsSUFBSSxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDO0lBQ2pDLENBQUM7SUFFRCw2QkFBVSxHQUFWO1FBRUksSUFBRyxJQUFJLENBQUMsV0FBVyxFQUNuQjtZQUNJLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQztTQUN0QjtRQUNELElBQUksQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQztJQUNqQyxDQUFDO0lBL0JnQixRQUFRO1FBRDVCLE9BQU87T0FDYSxRQUFRLENBaUM1QjtJQUFELGVBQUM7Q0FqQ0QsQUFpQ0MsQ0FqQ3FDLEVBQUUsQ0FBQyxTQUFTLEdBaUNqRDtrQkFqQ29CLFFBQVEiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJcclxuaW1wb3J0IExhbmd1YWdlTWFuYWdlciBmcm9tIFwiLi4vbXVsdGlMYW5ndWFnZS9MYW5ndWFnZU1hbmFnZXJcIjtcclxuXHJcblxyXG5jb25zdCB7Y2NjbGFzcywgcHJvcGVydHl9ID0gY2MuX2RlY29yYXRvcjtcclxuXHJcbkBjY2NsYXNzXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFZpZGVvVGlwIGV4dGVuZHMgY2MuQ29tcG9uZW50IHtcclxuXHJcbiAgICByZW1haW5fc2VjOm51bWJlcj01O1xyXG4gICAgeWVzX2NhbGxiYWNrOkZ1bmN0aW9uPW51bGw7XHJcbiAgICBub19jYWxsYmFjazpGdW5jdGlvbj1udWxsO1xyXG5cclxuICAgIGluaXQoeWVzQ2FsbGJhY2s6RnVuY3Rpb24sbm9DYWxsYmFjazpGdW5jdGlvbik6IHZvaWQge1xyXG4gICAgICAgIHRoaXMueWVzX2NhbGxiYWNrPXllc0NhbGxiYWNrO1xyXG4gICAgICAgIHRoaXMubm9fY2FsbGJhY2s9bm9DYWxsYmFjaztcclxuICAgICAgICBsZXQgdGV4dD10aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoJ2pvYkxhYmVsJyk7XHJcbiAgICAgICAgdGV4dC5nZXRDb21wb25lbnQoY2MuTGFiZWwpLnN0cmluZz1MYW5ndWFnZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRTdHJCeVRleHRJZCgxMTAwMDgpO1xyXG4gICAgICAgIGxldCBva1RleHQ9dGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKCdidG5WaWRlbycpLmdldENoaWxkQnlOYW1lKCd0ZXh0Jyk7XHJcbiAgICAgICAgb2tUZXh0LmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nPUxhbmd1YWdlTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldFN0ckJ5VGV4dElkKDEwMDAwMSk7ICAgICAgICBcclxuICAgIH1cclxuXHJcbiAgICBjbGlja0J0blllcygpXHJcbiAgICB7XHJcbiAgICAgICAgaWYodGhpcy55ZXNfY2FsbGJhY2spXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLnllc19jYWxsYmFjaygpO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLm5vZGUucmVtb3ZlRnJvbVBhcmVudCgpO1xyXG4gICAgfVxyXG5cclxuICAgIGNsaWNrQnRuTm8oKVxyXG4gICAge1xyXG4gICAgICAgIGlmKHRoaXMubm9fY2FsbGJhY2spXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLm5vX2NhbGxiYWNrKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMubm9kZS5yZW1vdmVGcm9tUGFyZW50KCk7XHJcbiAgICB9XHJcblxyXG59XHJcbiJdfQ==