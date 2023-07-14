
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Scripts/Tools/PressButton.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '140a8h4pO5G55+CfKrXL/8d', 'PressButton');
// Scripts/Tools/PressButton.ts

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
var PressButton = /** @class */ (function (_super) {
    __extends(PressButton, _super);
    function PressButton() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.press_events = [];
        // @property([cc.Component.EventHandler])
        // release_events: cc.Component.EventHandler[]=[];
        _this.interval = 0.1;
        _this.is_can_press = true;
        _this.is_click = false;
        _this.is_press = false;
        return _this;
    }
    PressButton.prototype.onLoad = function () {
        this.node.on(cc.Node.EventType.TOUCH_START, this.onTouchStart, this);
        this.node.on(cc.Node.EventType.TOUCH_END, this.onTouchEnd, this);
        this.node.on(cc.Node.EventType.TOUCH_CANCEL, this.onTouchEnd, this);
        if (this.interval <= 0) {
            this.interval = 0.1;
        }
    };
    PressButton.prototype.onDestroy = function () {
        this.node.off(cc.Node.EventType.TOUCH_START, this.onTouchStart, this);
        this.node.off(cc.Node.EventType.TOUCH_END, this.onTouchEnd, this);
        this.node.off(cc.Node.EventType.TOUCH_CANCEL, this.onTouchEnd, this);
    };
    PressButton.prototype.onTouchStart = function (btn) {
        if (this.is_can_press) {
            //默认使用放大处理按下操作
            this.is_press = true;
            cc.tween(btn.currentTarget).to(0.1, { scale: 0.9 }).start();
            this.is_click = false;
            this.onClick(btn);
            this.schedule(this.onClick, this.interval);
            //cc.log('onTouchStart');
        }
    };
    PressButton.prototype.onTouchEnd = function (btn) {
        if (this.is_press) {
            this.is_press = false;
            cc.tween(btn.currentTarget).to(0.1, { scale: 1.0 }).start();
            this.unschedule(this.onClick);
            if (!this.is_click) {
                this.onClick(btn);
            }
            // for(let i=0; i<this.release_events.length; i++){
            //     this.release_events[i].emit([btn]);
            // }
            //cc.log('onTouchEnd');
        }
    };
    PressButton.prototype.onClick = function (btn) {
        this.is_click = true;
        for (var i = 0; i < this.press_events.length; i++) {
            this.press_events[i].emit([this.node]);
        }
    };
    PressButton.prototype.setIsCanPress = function (isCan) {
        this.is_can_press = isCan;
        this.setMat();
    };
    PressButton.prototype.getIsCanPress = function () {
        return this.is_can_press;
    };
    PressButton.prototype.setMat = function () {
        var normalMaterial = cc.Material.getBuiltinMaterial('2d-sprite');
        var grayMaterial = cc.Material.getBuiltinMaterial('2d-gray-sprite');
        this.node.getComponent(cc.Sprite).setMaterial(0, this.is_can_press ? normalMaterial : grayMaterial);
        if (this.is_can_press == false) {
            this.unschedule(this.onClick);
        }
    };
    __decorate([
        property([cc.Component.EventHandler])
    ], PressButton.prototype, "press_events", void 0);
    __decorate([
        property()
    ], PressButton.prototype, "interval", void 0);
    PressButton = __decorate([
        ccclass
    ], PressButton);
    return PressButton;
}(cc.Component));
exports.default = PressButton;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0c1xcVG9vbHNcXFByZXNzQnV0dG9uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUVNLElBQUEsS0FBc0IsRUFBRSxDQUFDLFVBQVUsRUFBbEMsT0FBTyxhQUFBLEVBQUUsUUFBUSxjQUFpQixDQUFDO0FBRzFDO0lBQXlDLCtCQUFZO0lBQXJEO1FBQUEscUVBb0ZDO1FBakZHLGtCQUFZLEdBQThCLEVBQUUsQ0FBQztRQUU3Qyx5Q0FBeUM7UUFDekMsa0RBQWtEO1FBR2xELGNBQVEsR0FBUSxHQUFHLENBQUM7UUFFWixrQkFBWSxHQUFTLElBQUksQ0FBQztRQUUxQixjQUFRLEdBQVMsS0FBSyxDQUFDO1FBQ3ZCLGNBQVEsR0FBUyxLQUFLLENBQUM7O0lBc0VuQyxDQUFDO0lBcEVHLDRCQUFNLEdBQU47UUFDSSxJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxXQUFXLEVBQUMsSUFBSSxDQUFDLFlBQVksRUFBQyxJQUFJLENBQUMsQ0FBQztRQUNuRSxJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxTQUFTLEVBQUMsSUFBSSxDQUFDLFVBQVUsRUFBQyxJQUFJLENBQUMsQ0FBQztRQUMvRCxJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxZQUFZLEVBQUMsSUFBSSxDQUFDLFVBQVUsRUFBQyxJQUFJLENBQUMsQ0FBQztRQUNsRSxJQUFHLElBQUksQ0FBQyxRQUFRLElBQUUsQ0FBQyxFQUFDO1lBQ2hCLElBQUksQ0FBQyxRQUFRLEdBQUMsR0FBRyxDQUFDO1NBQ3JCO0lBQ0wsQ0FBQztJQUVELCtCQUFTLEdBQVQ7UUFDSSxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENB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LENBQUEsQ0FBQyxDQUFBLFlBQVksQ0FBQyxDQUFDO1FBQy9GLElBQUcsSUFBSSxDQUFDLFlBQVksSUFBRSxLQUFLLEVBQUM7WUFDeEIsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7U0FDakM7SUFDTCxDQUFDO0lBaEZEO1FBREMsUUFBUSxDQUFDLENBQUMsRUFBRSxDQUFDLFNBQVMsQ0FBQyxZQUFZLENBQUMsQ0FBQztxREFDTztJQU03QztRQURDLFFBQVEsRUFBRTtpREFDUztJQVRILFdBQVc7UUFEL0IsT0FBTztPQUNhLFdBQVcsQ0FvRi9CO0lBQUQsa0JBQUM7Q0FwRkQsQUFvRkMsQ0FwRndDLEVBQUUsQ0FBQyxTQUFTLEdBb0ZwRDtrQkFwRm9CLFdBQVciLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJcclxuXHJcbmNvbnN0IHtjY2NsYXNzLCBwcm9wZXJ0eX0gPSBjYy5fZGVjb3JhdG9yO1xyXG5cclxuQGNjY2xhc3NcclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUHJlc3NCdXR0b24gZXh0ZW5kcyBjYy5Db21wb25lbnQge1xyXG5cclxuICAgIEBwcm9wZXJ0eShbY2MuQ29tcG9uZW50LkV2ZW50SGFuZGxlcl0pXHJcbiAgICBwcmVzc19ldmVudHM6IGNjLkNvbXBvbmVudC5FdmVudEhhbmRsZXJbXT1bXTtcclxuXHJcbiAgICAvLyBAcHJvcGVydHkoW2NjLkNvbXBvbmVudC5FdmVudEhhbmRsZXJdKVxyXG4gICAgLy8gcmVsZWFzZV9ldmVudHM6IGNjLkNvbXBvbmVudC5FdmVudEhhbmRsZXJbXT1bXTtcclxuXHJcbiAgICBAcHJvcGVydHkoKVxyXG4gICAgaW50ZXJ2YWw6bnVtYmVyPTAuMTtcclxuXHJcbiAgICBwcml2YXRlIGlzX2Nhbl9wcmVzczpib29sZWFuPXRydWU7XHJcblxyXG4gICAgcHJpdmF0ZSBpc19jbGljazpib29sZWFuPWZhbHNlO1xyXG4gICAgcHJpdmF0ZSBpc19wcmVzczpib29sZWFuPWZhbHNlO1xyXG5cclxuICAgIG9uTG9hZCgpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLm5vZGUub24oY2MuTm9kZS5FdmVudFR5cGUuVE9VQ0hfU1RBUlQsdGhpcy5vblRvdWNoU3RhcnQsdGhpcyk7XHJcbiAgICAgICAgdGhpcy5ub2RlLm9uKGNjLk5vZGUuRXZlbnRUeXBlLlRPVUNIX0VORCx0aGlzLm9uVG91Y2hFbmQsdGhpcyk7XHJcbiAgICAgICAgdGhpcy5ub2RlLm9uKGNjLk5vZGUuRXZlbnRUeXBlLlRPVUNIX0NBTkNFTCx0aGlzLm9uVG91Y2hFbmQsdGhpcyk7XHJcbiAgICAgICAgaWYodGhpcy5pbnRlcnZhbDw9MCl7XHJcbiAgICAgICAgICAgIHRoaXMuaW50ZXJ2YWw9MC4xO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIFxyXG4gICAgb25EZXN0cm95KCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMubm9kZS5vZmYoY2MuTm9kZS5FdmVudFR5cGUuVE9VQ0hfU1RBUlQsdGhpcy5vblRvdWNoU3RhcnQsdGhpcyk7XHJcbiAgICAgICAgdGhpcy5ub2RlLm9mZihjYy5Ob2RlLkV2ZW50VHlwZS5UT1VDSF9FTkQsdGhpcy5vblRvdWNoRW5kLHRoaXMpO1xyXG4gICAgICAgIHRoaXMubm9kZS5vZmYoY2MuTm9kZS5FdmVudFR5cGUuVE9VQ0hfQ0FOQ0VMLHRoaXMub25Ub3VjaEVuZCx0aGlzKTtcclxuICAgIH1cclxuXHJcbiAgICBvblRvdWNoU3RhcnQoYnRuOmNjLkV2ZW50LkV2ZW50VG91Y2gpXHJcbiAgICB7XHJcbiAgICAgICAgaWYodGhpcy5pc19jYW5fcHJlc3Mpe1xyXG4gICAgICAgICAgICAvL+m7mOiupOS9v+eUqOaUvuWkp+WkhOeQhuaMieS4i+aTjeS9nFxyXG4gICAgICAgICAgICB0aGlzLmlzX3ByZXNzPXRydWU7XHJcbiAgICAgICAgICAgIGNjLnR3ZWVuKGJ0bi5jdXJyZW50VGFyZ2V0KS50bygwLjEse3NjYWxlOjAuOX0pLnN0YXJ0KCk7XHJcbiAgICAgICAgICAgIHRoaXMuaXNfY2xpY2s9ZmFsc2U7XHJcbiAgICAgICAgICAgIHRoaXMub25DbGljayhidG4pO1xyXG4gICAgICAgICAgICB0aGlzLnNjaGVkdWxlKHRoaXMub25DbGljayx0aGlzLmludGVydmFsKTsgICAgICAgICAgICBcclxuICAgICAgICAgICAgLy9jYy5sb2coJ29uVG91Y2hTdGFydCcpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBvblRvdWNoRW5kKGJ0bjpjYy5FdmVudC5FdmVudFRvdWNoKVxyXG4gICAge1xyXG4gICAgICAgIGlmKHRoaXMuaXNfcHJlc3Mpe1xyXG4gICAgICAgICAgICB0aGlzLmlzX3ByZXNzPWZhbHNlO1xyXG4gICAgICAgICAgICBjYy50d2VlbihidG4uY3VycmVudFRhcmdldCkudG8oMC4xLHtzY2FsZToxLjB9KS5zdGFydCgpO1xyXG4gICAgICAgICAgICB0aGlzLnVuc2NoZWR1bGUodGhpcy5vbkNsaWNrKTtcclxuICAgICAgICAgICAgaWYoIXRoaXMuaXNfY2xpY2spe1xyXG4gICAgICAgICAgICAgICAgdGhpcy5vbkNsaWNrKGJ0bik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgLy8gZm9yKGxldCBpPTA7IGk8dGhpcy5yZWxlYXNlX2V2ZW50cy5sZW5ndGg7IGkrKyl7XHJcbiAgICAgICAgICAgIC8vICAgICB0aGlzLnJlbGVhc2VfZXZlbnRzW2ldLmVtaXQoW2J0bl0pO1xyXG4gICAgICAgICAgICAvLyB9XHJcbiAgICAgICAgICAgIC8vY2MubG9nKCdvblRvdWNoRW5kJyk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgXHJcbiAgICBvbkNsaWNrKGJ0bjpjYy5FdmVudC5FdmVudFRvdWNoKXtcclxuICAgICAgICB0aGlzLmlzX2NsaWNrPXRydWU7XHJcbiAgICAgICAgZm9yKGxldCBpPTA7IGk8dGhpcy5wcmVzc19ldmVudHMubGVuZ3RoOyBpKyspe1xyXG4gICAgICAgICAgICB0aGlzLnByZXNzX2V2ZW50c1tpXS5lbWl0KFt0aGlzLm5vZGVdKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgc2V0SXNDYW5QcmVzcyhpc0Nhbjpib29sZWFuKXtcclxuICAgICAgICB0aGlzLmlzX2Nhbl9wcmVzcz1pc0NhbjtcclxuICAgICAgICB0aGlzLnNldE1hdCgpO1xyXG4gICAgfVxyXG5cclxuICAgIGdldElzQ2FuUHJlc3MoKTpib29sZWFue1xyXG4gICAgICAgIHJldHVybiB0aGlzLmlzX2Nhbl9wcmVzcztcclxuICAgIH1cclxuXHJcbiAgICBzZXRNYXQoKXtcclxuICAgICAgICBsZXQgbm9ybWFsTWF0ZXJpYWw9Y2MuTWF0ZXJpYWwuZ2V0QnVpbHRpbk1hdGVyaWFsKCcyZC1zcHJpdGUnKTtcclxuICAgICAgICBsZXQgZ3JheU1hdGVyaWFsPWNjLk1hdGVyaWFsLmdldEJ1aWx0aW5NYXRlcmlhbCgnMmQtZ3JheS1zcHJpdGUnKTtcclxuICAgICAgICB0aGlzLm5vZGUuZ2V0Q29tcG9uZW50KGNjLlNwcml0ZSkuc2V0TWF0ZXJpYWwoMCx0aGlzLmlzX2Nhbl9wcmVzcz9ub3JtYWxNYXRlcmlhbDpncmF5TWF0ZXJpYWwpO1xyXG4gICAgICAgIGlmKHRoaXMuaXNfY2FuX3ByZXNzPT1mYWxzZSl7XHJcbiAgICAgICAgICAgIHRoaXMudW5zY2hlZHVsZSh0aGlzLm9uQ2xpY2spO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG4iXX0=