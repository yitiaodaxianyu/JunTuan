"use strict";
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