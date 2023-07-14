
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Scripts/UI/home/LevelSelect.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0c1xcVUlcXGhvbWVcXExldmVsU2VsZWN0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUNBLHlEQUF3RDtBQUVsRCxJQUFBLEtBQXNCLEVBQUUsQ0FBQyxVQUFVLEVBQWxDLE9BQU8sYUFBQSxFQUFFLFFBQVEsY0FBaUIsQ0FBQztBQUcxQztJQUF5QywrQkFBWTtJQUFyRDtRQUFBLHFFQWdHQztRQTlGRyxhQUFPLEdBQVMsSUFBSSxDQUFDO1FBQ3JCLHNCQUFnQixHQUFlLElBQUksQ0FBQztRQUNwQyxrQkFBWSxHQUFVLElBQUksQ0FBQztRQUMzQixrQkFBWSxHQUFVLElBQUksQ0FBQzs7SUEyRi9CLENBQUM7SUF6RkcsNEJBQU0sR0FBTjtRQUNJLElBQUksQ0FBQyxnQkFBZ0IsR0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxFQUFFLENBQUMsVUFBVSxDQUFDLENBQUM7UUFDNUQsSUFBSSxDQUFDLE9BQU8sR0FBQyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsT0FBTyxDQUFDO0lBQy9DLENBQUM7SUFFRCwyQkFBSyxHQUFMO1FBQ0ksSUFBSSxTQUFTLEdBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUM7UUFFcEMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLEdBQUMsQ0FBQyxTQUFTLENBQUMsMkJBQVksQ0FBQyxXQUFXLEVBQUUsQ0FBQyxXQUFXLEdBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQzFFLENBQUM7SUFFRCwwRkFBMEY7SUFDMUYsNEJBQU0sR0FBTixVQUFRLEVBQUU7UUFDTixJQUFJLFNBQVMsR0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQztRQUNwQyxJQUFJLEdBQUcsR0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLGFBQWEsQ0FBQztRQUNuQyxLQUFJLElBQUksQ0FBQyxHQUFDLENBQUMsRUFBRSxD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QUFDLFlBQVksQ0FBQyxJQUFJLEVBQUUsQ0FBQztTQUM1QjtRQUNELElBQUksQ0FBQyxZQUFZLEdBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsRUFBRSxDQUFDLEdBQUcsRUFBQyxFQUFDLENBQUMsRUFBQyxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxDQUFDLEtBQUssRUFBRSxDQUFDO0lBQ3JGLENBQUM7SUEvRmdCLFdBQVc7UUFEL0IsT0FBTztPQUNhLFdBQVcsQ0FnRy9CO0lBQUQsa0JBQUM7Q0FoR0QsQUFnR0MsQ0FoR3dDLEVBQUUsQ0FBQyxTQUFTLEdBZ0dwRDtrQkFoR29CLFdBQVciLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgR2FtZURhdGEgZnJvbSBcIi4uLy4uL0dhbWVEYXRhXCI7XHJcbmltcG9ydCB7IExldmVsTWFuYWdlciB9IGZyb20gXCIuLi8uLi9MZXZlbC9MZXZlbE1hbmFnZXJcIjtcclxuXHJcbmNvbnN0IHtjY2NsYXNzLCBwcm9wZXJ0eX0gPSBjYy5fZGVjb3JhdG9yO1xyXG5cclxuQGNjY2xhc3NcclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTGV2ZWxTZWxlY3QgZXh0ZW5kcyBjYy5Db21wb25lbnQge1xyXG5cclxuICAgIGNvbnRlbnQ6Y2MuTm9kZT1udWxsO1xyXG4gICAgbGV2ZWxfc2Nyb2xsVmlldzpjYy5TY3JvbGxWaWV3PW51bGw7XHJcbiAgICB0b3VjaF9hY3Rpb246Y2MuVHdlZW49bnVsbDtcclxuICAgIGNsaWNrX2FjdGlvbjpjYy5Ud2Vlbj1udWxsO1xyXG5cclxuICAgIG9uTG9hZCAoKSB7XHJcbiAgICAgICAgdGhpcy5sZXZlbF9zY3JvbGxWaWV3PXRoaXMubm9kZS5nZXRDb21wb25lbnQoY2MuU2Nyb2xsVmlldyk7XHJcbiAgICAgICAgdGhpcy5jb250ZW50PXRoaXMubGV2ZWxfc2Nyb2xsVmlldy5jb250ZW50O1xyXG4gICAgfVxyXG5cclxuICAgIHN0YXJ0ICgpIHsgICAgICAgIFxyXG4gICAgICAgIGxldCBsZXZlbEJ0bnM9dGhpcy5jb250ZW50LmNoaWxkcmVuO1xyXG5cclxuICAgICAgICB0aGlzLmNvbnRlbnQueD0tbGV2ZWxCdG5zW0xldmVsTWFuYWdlci5nZXRJbnN0YW5jZSgpLnN0YXJ0X2xldmVsLTFdLng7XHJcbiAgICB9XHJcblxyXG4gICAgLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLeWFs+WNoeaMiemSri0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICAgIHVwZGF0ZSAoZHQpIHtcclxuICAgICAgICBsZXQgbGV2ZWxCdG5zPXRoaXMuY29udGVudC5jaGlsZHJlbjtcclxuICAgICAgICBsZXQgbGVuPXRoaXMuY29udGVudC5jaGlsZHJlbkNvdW50O1xyXG4gICAgICAgIGZvcihsZXQgaT0wOyBpPGxlbjsgaSsrKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgbGV0IGxldmVsQnRuPWxldmVsQnRuc1tpXTtcclxuICAgICAgICAgICAgbGV0IHNjYWxlPTAuOS1NYXRoLmFicyhsZXZlbEJ0bi54K3RoaXMuY29udGVudC54KS8yNDAqMC40O1xyXG4gICAgICAgICAgICBpZihzY2FsZTwwLjUpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHNjYWxlPTAuNTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBsZXZlbEJ0bi5zY2FsZT1zY2FsZTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgb25Ub3VjaFNjcm9sbFZpZXcoZTpjYy5TY3JvbGxWaWV3LGV2ZW50VHlwZTpjYy5TY3JvbGxWaWV3LkV2ZW50VHlwZSlcclxuICAgIHtcclxuICAgICAgICBpZihldmVudFR5cGU9PWNjLlNjcm9sbFZpZXcuRXZlbnRUeXBlLlNDUk9MTF9FTkRFRClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMub25Ub3VjaEVuZCgpO1xyXG4gICAgICAgIH1lbHNlIGlmKGV2ZW50VHlwZT09Y2MuU2Nyb2xsVmlldy5FdmVudFR5cGUuU0NST0xMX0JFR0FOKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgaWYodGhpcy5jbGlja19hY3Rpb24pXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuY2xpY2tfYWN0aW9uLnN0b3AoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZih0aGlzLnRvdWNoX2FjdGlvbilcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgdGhpcy50b3VjaF9hY3Rpb24uc3RvcCgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIC8vdGhpcy5jb250ZW50LnN0b3BBbGxBY3Rpb25zKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIG9uVG91Y2hFbmQoKVxyXG4gICAge1xyXG4gICAgICAgIC8v566X5Ye6bGV2ZWxCdG4ueCt0aGlzLmNvbnRlbnQueOacgOmdoOi/kTDnmoRsZXZlbEJ0blxyXG4gICAgICAgIGxldCBtaW5YPTM1MDtcclxuICAgICAgICBsZXQgbWluSW5kZXg9MDtcclxuICAgICAgICBsZXQgbGV2ZWxCdG5zPXRoaXMuY29udGVudC5jaGlsZHJlbjtcclxuICAgICAgICBsZXQgbGVuPXRoaXMuY29udGVudC5jaGlsZHJlbkNvdW50O1xyXG4gICAgICAgIGZvcihsZXQgaT0wOyBpPGxlbjsgaSsrKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgbGV0IGxldmVsQnRuPWxldmVsQnRuc1tpXTtcclxuICAgICAgICAgICAgbGV0IG9mZnNldFg9TWF0aC5hYnMobGV2ZWxCdG4ueCt0aGlzLmNvbnRlbnQueCk7XHJcbiAgICAgICAgICAgIGlmKG9mZnNldFg8bWluWClcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgbWluSW5kZXg9aTtcclxuICAgICAgICAgICAgICAgIG1pblg9b2Zmc2V0WDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBpZih0aGlzLmNsaWNrX2FjdGlvbilcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMuY2xpY2tfYWN0aW9uLnN0b3AoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYodGhpcy50b3VjaF9hY3Rpb24pXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLnRvdWNoX2FjdGlvbi5zdG9wKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8v54S25ZCO6K6pY29udGVudOa7muWKqOiHs2xldmVsQnRu55qE5Z2Q5qCH5L2N572uLlxyXG4gICAgICAgIHRoaXMudG91Y2hfYWN0aW9uPWNjLnR3ZWVuKHRoaXMuY29udGVudCkudG8oMC4yLHt4Oi1sZXZlbEJ0bnNbbWluSW5kZXhdLnh9KS5zdGFydCgpO1xyXG4gICAgfVxyXG5cclxuICAgIGNsaWNrQnRuTGV2ZWwoYixzdHJJbmRleDpzdHJpbmcpXHJcbiAgICB7XHJcbiAgICAgICAgbGV0IGluZGV4PXBhcnNlSW50KHN0ckluZGV4KTtcclxuICAgICAgICBsZXQgbGV2ZWxCdG5zPXRoaXMuY29udGVudC5jaGlsZHJlbjtcclxuICAgICAgICBpZih0aGlzLmNsaWNrX2FjdGlvbilcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMuY2xpY2tfYWN0aW9uLnN0b3AoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYodGhpcy50b3VjaF9hY3Rpb24pXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLnRvdWNoX2FjdGlvbi5zdG9wKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuY2xpY2tfYWN0aW9uPWNjLnR3ZWVuKHRoaXMuY29udGVudCkudG8oMC4yLHt4Oi1sZXZlbEJ0bnNbaW5kZXhdLnh9KS5zdGFydCgpO1xyXG4gICAgfVxyXG59XHJcbiJdfQ==