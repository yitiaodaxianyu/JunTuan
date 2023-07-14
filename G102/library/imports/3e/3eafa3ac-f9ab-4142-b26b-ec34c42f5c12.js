"use strict";
cc._RF.push(module, '3eafaOs+atBQrJr7DTEL1wS', 'LevelSelect');
// Scripts/UI/home/LevelSelect.ts

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
var LevelManager_1 = require("../../Level/LevelManager");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var LevelSelect = /** @class */ (function (_super) {
    __extends(LevelSelect, _super);
    function LevelSelect() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.content = null;
        _this.level_scrollView = null;
        _this.touch_action = null;
        _this.click_action = null;
        return _this;
    }
    LevelSelect.prototype.onLoad = function () {
        this.level_scrollView = this.node.getComponent(cc.ScrollView);
        this.content = this.level_scrollView.content;
    };
    LevelSelect.prototype.start = function () {
        var levelBtns = this.content.children;
        this.content.x = -levelBtns[LevelManager_1.LevelManager.getInstance().start_level - 1].x;
    };
    //--------------------------------------关卡按钮----------------------------------------------
    LevelSelect.prototype.update = function (dt) {
        var levelBtns = this.content.children;
        var len = this.content.childrenCount;
        for (var i = 0; i < len; i++) {
            var levelBtn = levelBtns[i];
            var scale = 0.9 - Math.abs(levelBtn.x + this.content.x) / 240 * 0.4;
            if (scale < 0.5) {
                scale = 0.5;
            }
            levelBtn.scale = scale;
        }
    };
    LevelSelect.prototype.onTouchScrollView = function (e, eventType) {
        if (eventType == cc.ScrollView.EventType.SCROLL_ENDED) {
            this.onTouchEnd();
        }
        else if (eventType == cc.ScrollView.EventType.SCROLL_BEGAN) {
            if (this.click_action) {
                this.click_action.stop();
            }
            if (this.touch_action) {
                this.touch_action.stop();
            }
            //this.content.stopAllActions();
        }
    };
    LevelSelect.prototype.onTouchEnd = function () {
        //算出levelBtn.x+this.content.x最靠近0的levelBtn
        var minX = 350;
        var minIndex = 0;
        var levelBtns = this.content.children;
        var len = this.content.childrenCount;
        for (var i = 0; i < len; i++) {
            var levelBtn = levelBtns[i];
            var offsetX = Math.abs(levelBtn.x + this.content.x);
            if (offsetX < minX) {
                minIndex = i;
                minX = offsetX;
            }
        }
        if (this.click_action) {
            this.click_action.stop();
        }
        if (this.touch_action) {
            this.touch_action.stop();
        }
        //然后让content滚动至levelBtn的坐标位置.
        this.touch_action = cc.tween(this.content).to(0.2, { x: -levelBtns[minIndex].x }).start();
    };
    LevelSelect.prototype.clickBtnLevel = function (b, strIndex) {
        var index = parseInt(strIndex);
        var levelBtns = this.content.children;
        if (this.click_action) {
            this.click_action.stop();
        }
        if (this.touch_action) {
            this.touch_action.stop();
        }
        this.click_action = cc.tween(this.content).to(0.2, { x: -levelBtns[index].x }).start();
    };
    LevelSelect = __decorate([
        ccclass
    ], LevelSelect);
    return LevelSelect;
}(cc.Component));
exports.default = LevelSelect;

cc._RF.pop();