"use strict";
cc._RF.push(module, '6283aL0NMZNbaR8ROTANKLE', 'UiTouch');
// Scripts/UI/UiTouch.ts

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
var Constants_1 = require("../Constants");
var GameManager_1 = require("../GameManager");
var AudioConstants_1 = require("../Sound/AudioConstants");
var UIManager_1 = require("./UIManager");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var UiTouch = /** @class */ (function (_super) {
    __extends(UiTouch, _super);
    function UiTouch() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    UiTouch.prototype.onLoad = function () {
        var _this = this;
        this.node.on(cc.Node.EventType.TOUCH_START, function (e) {
            if (GameManager_1.default.getInstance().cur_game_state == Constants_1.GameState.Game_Pause) {
                return;
            }
            var worldPos = e.getLocation();
            var nodePos = _this.node.convertToNodeSpaceAR(worldPos);
            UIManager_1.UIManager.getInstance().showTouchEffect(nodePos);
            GameManager_1.default.getInstance().sound_manager.playSound(AudioConstants_1.SoundIndex.YX_ButtonClear);
        }, this);
        //触摸穿透
        if (this.node._touchListener) {
            this.node._touchListener.setSwallowTouches(false);
        }
    };
    UiTouch = __decorate([
        ccclass
    ], UiTouch);
    return UiTouch;
}(cc.Component));
exports.default = UiTouch;

cc._RF.pop();