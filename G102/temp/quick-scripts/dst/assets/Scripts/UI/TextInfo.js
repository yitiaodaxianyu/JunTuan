
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Scripts/UI/TextInfo.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '9f8daeiV29DVqRoaVhW8CTI', 'TextInfo');
// Scripts/UI/TextInfo.ts

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
var MyTool_1 = require("../Tools/MyTool");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var TextInfo = /** @class */ (function (_super) {
    __extends(TextInfo, _super);
    function TextInfo() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.content = null;
        _this.title = null;
        _this.bg = null;
        _this.xian = null;
        //title字体至上方的高度
        _this.top = 22;
        //content字体至下方的高度
        _this.bottom = 22;
        //间隔线占用的高度
        _this.xian_height = 36;
        return _this;
    }
    TextInfo.prototype.onLoad = function () {
        var _this = this;
        this.bg = this.node.getChildByName('bg');
        this.xian = this.node.getChildByName('xian');
        this.content = this.node.getChildByName('content').getComponent(cc.RichText);
        this.title = this.node.getChildByName('title').getComponent(cc.Label);
        this.node.on(cc.Node.EventType.TOUCH_START, function () {
            MyTool_1.default.allFadeOut(_this.node, function () {
                _this.node.removeFromParent();
            });
        }, this);
        this.node._touchListener.setSwallowTouches(false);
    };
    TextInfo.prototype.start = function () {
        this.node.zIndex = 9999;
    };
    TextInfo.prototype.showInfo = function (titleText, contentStr) {
        var _this = this;
        this.title.string = titleText;
        this.content.string = contentStr;
        this.node.opacity = 0;
        this.content.enabled = false;
        this.scheduleOnce(function () {
            _this.node.opacity = 255;
            _this.content.enabled = true;
            _this.bg.height = _this.top + _this.title.node.height + _this.xian_height + _this.bottom + _this.content.node.height;
            _this.title.node.y = _this.bg.height / 2 - _this.title.node.height / 2 - _this.top;
            _this.xian.y = _this.title.node.y - _this.title.node.height / 2 - _this.xian_height / 2;
            _this.content.node.y = _this.xian.y - _this.xian_height / 2;
            MyTool_1.default.allFadeIn(_this.node);
        }, cc.director.getDeltaTime());
    };
    TextInfo = __decorate([
        ccclass
    ], TextInfo);
    return TextInfo;
}(cc.Component));
exports.default = TextInfo;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0c1xcVUlcXFRleHRJbmZvLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLDBDQUFxQztBQUUvQixJQUFBLEtBQXNCLEVBQUUsQ0FBQyxVQUFVLEVBQWxDLE9BQU8sYUFBQSxFQUFFLFFBQVEsY0FBaUIsQ0FBQztBQUcxQztJQUFzQyw0QkFBWTtJQUFsRDtRQUFBLHFFQStDQztRQTdDRyxhQUFPLEdBQWEsSUFBSSxDQUFDO1FBQ3pCLFdBQUssR0FBVSxJQUFJLENBQUM7UUFDcEIsUUFBRSxHQUFTLElBQUksQ0FBQztRQUNoQixVQUFJLEdBQVMsSUFBSSxDQUFDO1FBQ2xCLGVBQWU7UUFDZixTQUFHLEdBQVEsRUFBRSxDQUFDO1FBQ2QsaUJBQWlCO1FBQ2pCLFlBQU0sR0FBUSxFQUFFLENBQUM7UUFDakIsVUFBVTtRQUNWLGlCQUFXLEdBQVEsRUFBRSxDQUFDOztJQW9DMUIsQ0FBQztJQWxDYSx5QkFBTSxHQUFoQjtRQUFBLGlCQVdDO1FBVkcsSUFBSSxDQUFDLEVBQUUsR0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUN2QyxJQUFJLENBQUMsSUFBSSxHQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQzNDLElBQUksQ0FBQyxPQUFPLEdBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsU0FBUyxDQUFDLENBQUMsWUFBWSxDQUFDLEVBQUUsQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUMzRSxJQUFJLENBQUMsS0FBSyxHQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLE9BQU8sQ0FBQyxDQUFDLFlBQVksQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDcEUsSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsV0FBVyxFQUFDO1lBQ3ZDLGdCQUFNLENBQUMsVUFBVSxDQUFDLEtBQUksQ0FBQyxJQUFJLEVBQUM7Z0JBQ3hCLEtBQUksQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQztZQUNqQyxDQUFDLENBQUMsQ0FBQTtRQUNOLENBQUMsRUFBQyxJQUFJLENBQUMsQ0FBQztRQUNSLElBQUksQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLGlCQUFpQixDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ3RELENBQUM7SUFFRCx3QkFBSyxHQUFMO1FBQ0ksSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLEdBQUMsSUFBSSxDQUFDO0lBQzFCLENBQUM7SUFFRCwyQkFBUSxHQUFSLFVBQVMsU0FBZ0IsRUFBQyxVQUFpQjtRQUEzQyxpQkFlQztRQWJHLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxHQUFDLFNBQVMsQ0FBQztRQUM1QixJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sR0FBQyxVQUFVLENBQUM7UUFDL0IsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLEdBQUMsQ0FBQyxDQUFDO1FBQ3BCLElBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxHQUFDLEtBQUssQ0FBQztRQUMzQixJQUFJLENBQUMsWUFBWSxDQUFDO1lBQ2QsS0FBSSxDQUFDLElBQUksQ0FBQyxPQUFPLEdBQUMsR0FBRyxDQUFDO1lBQ3RCLEtBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxHQUFDLElBQUksQ0FBQztZQUMxQixLQUFJLENBQUMsRUFBRSxDQUFDLE1BQU0sR0FBQyxLQUFJLENBQUMsR0FBRyxHQUFDLEtBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLE1BQU0sR0FBQyxLQUFJLENBQUMsV0FBVyxHQUFDLEtBQUksQ0FBQyxNQUFNLEdBQUMsS0FBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDO1lBQ3JHLEtBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUMsR0FBQyxLQUFJLENBQUMsRUFBRSxDQUFDLE1BQU0sR0FBQyxDQUFDLEdBQUMsS0FBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsTUFBTSxHQUFDLENBQUMsR0FBQyxLQUFJLENBQUMsR0FBRyxDQUFDO1lBQ3JFLEtBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxHQUFDLEtBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUMsR0FBQyxLQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxNQUFNLEdBQUMsQ0FBQyxHQUFDLEtBQUksQ0FBQyxXQUFXLEdBQUMsQ0FBQyxDQUFDO1lBQzFFLEtBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUMsR0FBQyxLQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsR0FBQyxLQUFJLENBQUMsV0FBVyxHQUFDLENBQUMsQ0FBQztZQUNuRCxnQkFBTSxDQUFDLFNBQVMsQ0FBQyxLQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDaEMsQ0FBQyxFQUFDLEVBQUUsQ0FBQyxRQUFRLENBQUMsWUFBWSxFQUFFLENBQUMsQ0FBQztJQUNsQyxDQUFDO0lBN0NnQixRQUFRO1FBRDVCLE9BQU87T0FDYSxRQUFRLENBK0M1QjtJQUFELGVBQUM7Q0EvQ0QsQUErQ0MsQ0EvQ3FDLEVBQUUsQ0FBQyxTQUFTLEdBK0NqRDtrQkEvQ29CLFFBQVEiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgTXlUb29sIGZyb20gXCIuLi9Ub29scy9NeVRvb2xcIjtcclxuXHJcbmNvbnN0IHtjY2NsYXNzLCBwcm9wZXJ0eX0gPSBjYy5fZGVjb3JhdG9yO1xyXG5cclxuQGNjY2xhc3NcclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVGV4dEluZm8gZXh0ZW5kcyBjYy5Db21wb25lbnQge1xyXG5cclxuICAgIGNvbnRlbnQ6Y2MuUmljaFRleHQ9bnVsbDtcclxuICAgIHRpdGxlOmNjLkxhYmVsPW51bGw7XHJcbiAgICBiZzpjYy5Ob2RlPW51bGw7XHJcbiAgICB4aWFuOmNjLk5vZGU9bnVsbDtcclxuICAgIC8vdGl0bGXlrZfkvZPoh7PkuIrmlrnnmoTpq5jluqZcclxuICAgIHRvcDpudW1iZXI9MjI7XHJcbiAgICAvL2NvbnRlbnTlrZfkvZPoh7PkuIvmlrnnmoTpq5jluqZcclxuICAgIGJvdHRvbTpudW1iZXI9MjI7XHJcbiAgICAvL+mXtOmalOe6v+WNoOeUqOeahOmrmOW6plxyXG4gICAgeGlhbl9oZWlnaHQ6bnVtYmVyPTM2O1xyXG5cclxuICAgIHByb3RlY3RlZCBvbkxvYWQoKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5iZz10aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoJ2JnJyk7XHJcbiAgICAgICAgdGhpcy54aWFuPXRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZSgneGlhbicpO1xyXG4gICAgICAgIHRoaXMuY29udGVudD10aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoJ2NvbnRlbnQnKS5nZXRDb21wb25lbnQoY2MuUmljaFRleHQpO1xyXG4gICAgICAgIHRoaXMudGl0bGU9dGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKCd0aXRsZScpLmdldENvbXBvbmVudChjYy5MYWJlbCk7ICAgICAgICBcclxuICAgICAgICB0aGlzLm5vZGUub24oY2MuTm9kZS5FdmVudFR5cGUuVE9VQ0hfU1RBUlQsKCk9PntcclxuICAgICAgICAgICAgTXlUb29sLmFsbEZhZGVPdXQodGhpcy5ub2RlLCgpPT57XHJcbiAgICAgICAgICAgICAgICB0aGlzLm5vZGUucmVtb3ZlRnJvbVBhcmVudCgpO1xyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgIH0sdGhpcyk7XHJcbiAgICAgICAgdGhpcy5ub2RlLl90b3VjaExpc3RlbmVyLnNldFN3YWxsb3dUb3VjaGVzKGZhbHNlKTtcclxuICAgIH1cclxuXHJcbiAgICBzdGFydCAoKSB7XHJcbiAgICAgICAgdGhpcy5ub2RlLnpJbmRleD05OTk5OyAgICAgICAgXHJcbiAgICB9XHJcblxyXG4gICAgc2hvd0luZm8odGl0bGVUZXh0OnN0cmluZyxjb250ZW50U3RyOnN0cmluZylcclxuICAgIHtcclxuICAgICAgICB0aGlzLnRpdGxlLnN0cmluZz10aXRsZVRleHQ7XHJcbiAgICAgICAgdGhpcy5jb250ZW50LnN0cmluZz1jb250ZW50U3RyO1xyXG4gICAgICAgIHRoaXMubm9kZS5vcGFjaXR5PTA7XHJcbiAgICAgICAgdGhpcy5jb250ZW50LmVuYWJsZWQ9ZmFsc2U7XHJcbiAgICAgICAgdGhpcy5zY2hlZHVsZU9uY2UoKCk9PntcclxuICAgICAgICAgICAgdGhpcy5ub2RlLm9wYWNpdHk9MjU1O1xyXG4gICAgICAgICAgICB0aGlzLmNvbnRlbnQuZW5hYmxlZD10cnVlO1xyXG4gICAgICAgICAgICB0aGlzLmJnLmhlaWdodD10aGlzLnRvcCt0aGlzLnRpdGxlLm5vZGUuaGVpZ2h0K3RoaXMueGlhbl9oZWlnaHQrdGhpcy5ib3R0b20rdGhpcy5jb250ZW50Lm5vZGUuaGVpZ2h0O1xyXG4gICAgICAgICAgICB0aGlzLnRpdGxlLm5vZGUueT10aGlzLmJnLmhlaWdodC8yLXRoaXMudGl0bGUubm9kZS5oZWlnaHQvMi10aGlzLnRvcDtcclxuICAgICAgICAgICAgdGhpcy54aWFuLnk9dGhpcy50aXRsZS5ub2RlLnktdGhpcy50aXRsZS5ub2RlLmhlaWdodC8yLXRoaXMueGlhbl9oZWlnaHQvMjtcclxuICAgICAgICAgICAgdGhpcy5jb250ZW50Lm5vZGUueT10aGlzLnhpYW4ueS10aGlzLnhpYW5faGVpZ2h0LzI7XHJcbiAgICAgICAgICAgIE15VG9vbC5hbGxGYWRlSW4odGhpcy5ub2RlKTtcclxuICAgICAgICB9LGNjLmRpcmVjdG9yLmdldERlbHRhVGltZSgpKTtcclxuICAgIH1cclxuXHJcbn1cclxuIl19