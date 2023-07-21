
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Scripts/UI/UiTouch.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
            if (GameManager_1.default.getInstance().cur_game_state == Constants_1.GameState.Game_Pause || GameManager_1.default.getInstance().cur_game_state == Constants_1.GameState.Game_Roguelike) {
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0c1xcVUlcXFVpVG91Y2gudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsMENBQW9EO0FBQ3BELDhDQUF5QztBQUN6QywwREFBcUQ7QUFDckQseUNBQXdDO0FBR2xDLElBQUEsS0FBc0IsRUFBRSxDQUFDLFVBQVUsRUFBbEMsT0FBTyxhQUFBLEVBQUUsUUFBUSxjQUFpQixDQUFDO0FBRzFDO0lBQXFDLDJCQUFZO0lBQWpEOztJQW1CQSxDQUFDO0lBakJHLHdCQUFNLEdBQU47UUFBQSxpQkFnQkM7UUFmRyxJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxXQUFXLEVBQUMsVUFBQyxDQUFxQjtZQUM3RCxJQUFHLHFCQUFXLENBQUMsV0FBVyxFQUFFLENBQUMsY0FBYyxJQUFFLHFCQUFTLENBQUMsVUFBVSxJQUFFLHFCQUFXLENBQUMsV0FBVyxFQUFFLENBQUMsY0FBYyxJQUFFLHFCQUFTLENBQUMsY0FBYyxFQUFDO2dCQUNsSSxPQUFPO2FBQ1Y7WUFDRCxJQUFJLFFBQVEsR0FBQyxDQUFDLENBQUMsV0FBVyxFQUFFLENBQUM7WUFDN0IsSUFBSSxPQUFPLEdBQUMsS0FBSSxDQUFDLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxRQUFRLENBQUMsQ0FBQztZQUNyRCxxQkFBUyxDQUFDLFdBQVcsRUFBRSxDQUFDLGVBQWUsQ0FBQyxPQUFPLENBQUMsQ0FBQztZQUNqRCxxQkFBVyxDQUFDLFdBQVcsRUFBRSxDQUFDLGFBQWEsQ0FBQyxTQUFTLENBQUMsMkJBQVUsQ0FBQyxjQUFjLENBQUMsQ0FBQztRQUVqRixDQUFDLEVBQUMsSUFBSSxDQUFDLENBQUM7UUFDUixNQUFNO1FBQ04sSUFBRyxJQUFJLENBQUMsSUFBSSxDQUFDLGNBQWMsRUFDM0I7WUFDSSxJQUFJLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxpQkFBaUIsQ0FBQyxLQUFLLENBQUMsQ0FBQztTQUNyRDtJQUNMLENBQUM7SUFsQmdCLE9BQU87UUFEM0IsT0FBTztPQUNhLE9BQU8sQ0FtQjNCO0lBQUQsY0FBQztDQW5CRCxBQW1CQyxDQW5Cb0MsRUFBRSxDQUFDLFNBQVMsR0FtQmhEO2tCQW5Cb0IsT0FBTyIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEdhbWVTY2VuZSwgR2FtZVN0YXRlIH0gZnJvbSBcIi4uL0NvbnN0YW50c1wiO1xyXG5pbXBvcnQgR2FtZU1hbmFnZXIgZnJvbSBcIi4uL0dhbWVNYW5hZ2VyXCI7XHJcbmltcG9ydCB7IFNvdW5kSW5kZXggfSBmcm9tIFwiLi4vU291bmQvQXVkaW9Db25zdGFudHNcIjtcclxuaW1wb3J0IHsgVUlNYW5hZ2VyIH0gZnJvbSBcIi4vVUlNYW5hZ2VyXCI7XHJcblxyXG5cclxuY29uc3Qge2NjY2xhc3MsIHByb3BlcnR5fSA9IGNjLl9kZWNvcmF0b3I7XHJcblxyXG5AY2NjbGFzc1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBVaVRvdWNoIGV4dGVuZHMgY2MuQ29tcG9uZW50IHtcclxuXHJcbiAgICBvbkxvYWQgKCkge1xyXG4gICAgICAgIHRoaXMubm9kZS5vbihjYy5Ob2RlLkV2ZW50VHlwZS5UT1VDSF9TVEFSVCwoZTpjYy5FdmVudC5FdmVudFRvdWNoKT0+e1xyXG4gICAgICAgICAgICBpZihHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLmN1cl9nYW1lX3N0YXRlPT1HYW1lU3RhdGUuR2FtZV9QYXVzZXx8R2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5jdXJfZ2FtZV9zdGF0ZT09R2FtZVN0YXRlLkdhbWVfUm9ndWVsaWtlKXtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBsZXQgd29ybGRQb3M9ZS5nZXRMb2NhdGlvbigpO1xyXG4gICAgICAgICAgICBsZXQgbm9kZVBvcz10aGlzLm5vZGUuY29udmVydFRvTm9kZVNwYWNlQVIod29ybGRQb3MpO1xyXG4gICAgICAgICAgICBVSU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zaG93VG91Y2hFZmZlY3Qobm9kZVBvcyk7XHJcbiAgICAgICAgICAgIEdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuc291bmRfbWFuYWdlci5wbGF5U291bmQoU291bmRJbmRleC5ZWF9CdXR0b25DbGVhcik7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgIH0sdGhpcyk7XHJcbiAgICAgICAgLy/op6bmkbjnqb/pgI9cclxuICAgICAgICBpZih0aGlzLm5vZGUuX3RvdWNoTGlzdGVuZXIpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLm5vZGUuX3RvdWNoTGlzdGVuZXIuc2V0U3dhbGxvd1RvdWNoZXMoZmFsc2UpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG4iXX0=