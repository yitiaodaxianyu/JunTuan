
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Scripts/UI/Dialog.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '92d32LcdttDU7T/2MhJ0gzn', 'Dialog');
// Scripts/UI/Dialog.ts

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
var GameManager_1 = require("../GameManager");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var Dialog = /** @class */ (function (_super) {
    __extends(Dialog, _super);
    function Dialog() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.btn_bottom = 30;
        _this.text_top = 20;
        _this.text_btn = 20;
        _this.filling_height = 40;
        _this.yes_callback = null;
        _this.no_callback = null;
        return _this;
    }
    Dialog.prototype.clickBtnYes = function () {
        GameManager_1.default.getInstance().is_show_exit = false;
        if (this.yes_callback) {
            this.yes_callback();
        }
        this.node.removeFromParent();
    };
    Dialog.prototype.clickBtnNo = function () {
        GameManager_1.default.getInstance().is_show_exit = false;
        if (this.no_callback) {
            this.no_callback();
        }
        this.node.removeFromParent();
    };
    /**
     *
     * @param message 显示的消息
     * @param yesCallback 点击yes按钮的回调
     * @param noCallback 点击no按钮的回调
     * @param showType 显示类型，0或者不填就是普通类型，1：视频，2：计费
     */
    Dialog.prototype.showDialog = function (message, yesCallback, noCallback, showType, num, currency) {
        var _this = this;
        this.yes_callback = yesCallback;
        this.no_callback = noCallback;
        var hintLabel = this.node.getChildByName('hintLabel').getComponent(cc.Label);
        hintLabel.string = message;
        this.node.opacity = 0;
        hintLabel.enabled = false;
        cc.tween(this.node).delay(0.05).call(function () {
            hintLabel.enabled = true;
            var btnYes = _this.node.getChildByName('btnYes');
            var btnNo = _this.node.getChildByName('btnNo');
            var btnHeight = btnYes.height;
            _this.node.height = hintLabel.node.height + btnHeight + _this.btn_bottom + _this.text_top + _this.text_top + _this.filling_height;
            hintLabel.node.y = _this.node.height / 2 - _this.text_top;
            btnYes.y = -_this.node.height / 2 + _this.btn_bottom + btnHeight / 2;
            _this.node.getChildByName("line").y = btnYes.y + 70;
            btnNo.y = btnYes.y;
            if (showType == 1) {
                btnYes.getChildByName('layout').getChildByName('ads').active = true;
            }
            if (showType == 2) {
                // btnYes.getChildByName('layout').getChildByName('yes').getComponent(cc.Label).string=num+currency;
                btnYes.getChildByName('layout').getChildByName('yes').getComponent(cc.Label).string = String(num);
            }
        }).to(0.2, { opacity: 255 }).start();
        // this.scheduleOnce(()=>{
        //     this.node.opacity=255;
        //     hintLabel.enabled=true;
        //     let btnYes=this.node.getChildByName('btnYes');
        //     let btnNo=this.node.getChildByName('btnNo');
        //     let btnHeight=btnYes.height;
        //     this.node.height=hintLabel.node.height+btnHeight+this.btn_bottom+this.text_top+this.text_top;
        //     hintLabel.node.y=this.node.height/2-this.text_top;
        //     btnYes.y=-this.node.height/2+this.btn_bottom+btnHeight/2;
        //     btnNo.y=btnYes.y;
        //     if(isVideo==true)
        //     {
        //         btnYes.getChildByName('layout').getChildByName('ads').active=true;
        //     }
        // },0.05);
    };
    __decorate([
        property({ tooltip: '按钮与底部的距离' })
    ], Dialog.prototype, "btn_bottom", void 0);
    __decorate([
        property({ tooltip: '文字与顶部的距离' })
    ], Dialog.prototype, "text_top", void 0);
    __decorate([
        property({ tooltip: '文字与按钮的距离' })
    ], Dialog.prototype, "text_btn", void 0);
    __decorate([
        property({ tooltip: '整体补间高度' })
    ], Dialog.prototype, "filling_height", void 0);
    Dialog = __decorate([
        ccclass
    ], Dialog);
    return Dialog;
}(cc.Component));
exports.default = Dialog;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0c1xcVUlcXERpYWxvZy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSw4Q0FBeUM7QUFFbkMsSUFBQSxLQUFzQixFQUFFLENBQUMsVUFBVSxFQUFsQyxPQUFPLGFBQUEsRUFBRSxRQUFRLGNBQWlCLENBQUM7QUFHMUM7SUFBb0MsMEJBQVk7SUFBaEQ7UUFBQSxxRUFxRkM7UUFsRkcsZ0JBQVUsR0FBUSxFQUFFLENBQUM7UUFFckIsY0FBUSxHQUFRLEVBQUUsQ0FBQztRQUduQixjQUFRLEdBQVEsRUFBRSxDQUFDO1FBRW5CLG9CQUFjLEdBQVUsRUFBRSxDQUFDO1FBRTNCLGtCQUFZLEdBQVUsSUFBSSxDQUFDO1FBQzNCLGlCQUFXLEdBQVUsSUFBSSxDQUFDOztJQXdFOUIsQ0FBQztJQXRFRyw0QkFBVyxHQUFYO1FBRUkscUJBQVcsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxZQUFZLEdBQUMsS0FBSyxDQUFDO1FBQzdDLElBQUcsSUFBSSxDQUFDLFlBQVksRUFDcEI7WUFDSSxJQUFJLENBQUMsWUFBWSxFQUFFLENBQUM7U0FDdkI7UUFDRCxJQUFJLENBQUMsSUFBSSxDQUFDLGdCQUFnQixFQUFFLENBQUM7SUFDakMsQ0FBQztJQUVELDJCQUFVLEdBQVY7UUFFSSxxQkFBVyxDQUFDLFdBQVcsRUFBRSxDQUFDLFlBQVksR0FBQyxLQUFLLENBQUM7UUFDN0MsSUFBRyxJQUFJLENBQUMsV0FBVyxFQUNuQjtZQUNJLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQztTQUN0QjtRQUNELElBQUksQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQztJQUNqQyxDQUFDO0lBQ0Q7Ozs7OztPQU1HO0lBQ0gsMkJBQVUsR0FBVixVQUFXLE9BQWMsRUFBQyxXQUFvQixFQUFDLFVBQW1CLEVBQUMsUUFBZ0IsRUFBQyxHQUFvQixFQUFDLFFBQWdCO1FBQXpILGlCQTJDQztRQXpDRyxJ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UUFBUSxDQUFDLEVBQUMsT0FBTyxFQUFDLFVBQVUsRUFBQyxDQUFDOzRDQUNaO0lBRW5CO1FBREMsUUFBUSxDQUFDLEVBQUMsT0FBTyxFQUFDLFFBQVEsRUFBQyxDQUFDO2tEQUNGO0lBVlYsTUFBTTtRQUQxQixPQUFPO09BQ2EsTUFBTSxDQXFGMUI7SUFBRCxhQUFDO0NBckZELEFBcUZDLENBckZtQyxFQUFFLENBQUMsU0FBUyxHQXFGL0M7a0JBckZvQixNQUFNIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IEdhbWVNYW5hZ2VyIGZyb20gXCIuLi9HYW1lTWFuYWdlclwiO1xyXG5cclxuY29uc3Qge2NjY2xhc3MsIHByb3BlcnR5fSA9IGNjLl9kZWNvcmF0b3I7XHJcblxyXG5AY2NjbGFzc1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBEaWFsb2cgZXh0ZW5kcyBjYy5Db21wb25lbnQge1xyXG5cclxuICAgIEBwcm9wZXJ0eSh7dG9vbHRpcDon5oyJ6ZKu5LiO5bqV6YOo55qE6Led56a7J30pXHJcbiAgICBidG5fYm90dG9tOm51bWJlcj0zMDtcclxuICAgIEBwcm9wZXJ0eSh7dG9vbHRpcDon5paH5a2X5LiO6aG26YOo55qE6Led56a7J30pXHJcbiAgICB0ZXh0X3RvcDpudW1iZXI9MjA7XHJcblxyXG4gICAgQHByb3BlcnR5KHt0b29sdGlwOifmloflrZfkuI7mjInpkq7nmoTot53nprsnfSlcclxuICAgIHRleHRfYnRuOm51bWJlcj0yMDtcclxuICAgIEBwcm9wZXJ0eSh7dG9vbHRpcDon5pW05L2T6KGl6Ze06auY5bqmJ30pXHJcbiAgICBmaWxsaW5nX2hlaWdodDpudW1iZXIgPSA0MDtcclxuXHJcbiAgICB5ZXNfY2FsbGJhY2s6RnVuY3Rpb249bnVsbDtcclxuICAgIG5vX2NhbGxiYWNrOkZ1bmN0aW9uPW51bGw7XHJcblxyXG4gICAgY2xpY2tCdG5ZZXMoKVxyXG4gICAge1xyXG4gICAgICAgIEdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuaXNfc2hvd19leGl0PWZhbHNlO1xyXG4gICAgICAgIGlmKHRoaXMueWVzX2NhbGxiYWNrKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy55ZXNfY2FsbGJhY2soKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5ub2RlLnJlbW92ZUZyb21QYXJlbnQoKTsgICAgICAgIFxyXG4gICAgfVxyXG5cclxuICAgIGNsaWNrQnRuTm8oKVxyXG4gICAge1xyXG4gICAgICAgIEdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuaXNfc2hvd19leGl0PWZhbHNlO1xyXG4gICAgICAgIGlmKHRoaXMubm9fY2FsbGJhY2spXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLm5vX2NhbGxiYWNrKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMubm9kZS5yZW1vdmVGcm9tUGFyZW50KCk7XHJcbiAgICB9XHJcbiAgICAvKipcclxuICAgICAqIFxyXG4gICAgICogQHBhcmFtIG1lc3NhZ2Ug5pi+56S655qE5raI5oGvXHJcbiAgICAgKiBAcGFyYW0geWVzQ2FsbGJhY2sg54K55Ye7eWVz5oyJ6ZKu55qE5Zue6LCDXHJcbiAgICAgKiBAcGFyYW0gbm9DYWxsYmFjayDngrnlh7tub+aMiemSrueahOWbnuiwg1xyXG4gICAgICogQHBhcmFtIHNob3dUeXBlIOaYvuekuuexu+Wei++8jDDmiJbogIXkuI3loavlsLHmmK/mma7pgJrnsbvlnovvvIwx77ya6KeG6aKR77yMMu+8muiuoei0uVxyXG4gICAgICovXHJcbiAgICBzaG93RGlhbG9nKG1lc3NhZ2U6c3RyaW5nLHllc0NhbGxiYWNrOkZ1bmN0aW9uLG5vQ2FsbGJhY2s6RnVuY3Rpb24sc2hvd1R5cGU/Om51bWJlcixudW0/Om51bWJlciB8IHN0cmluZyxjdXJyZW5jeT86c3RyaW5nKVxyXG4gICAge1xyXG4gICAgICAgIHRoaXMueWVzX2NhbGxiYWNrPXllc0NhbGxiYWNrO1xyXG4gICAgICAgIHRoaXMubm9fY2FsbGJhY2s9bm9DYWxsYmFjaztcclxuICAgICAgICBsZXQgaGludExhYmVsPXRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZSgnaGludExhYmVsJykuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKTtcclxuICAgICAgICBoaW50TGFiZWwuc3RyaW5nPW1lc3NhZ2U7XHJcbiAgICAgICAgdGhpcy5ub2RlLm9wYWNpdHk9MDtcclxuICAgICAgICBoaW50TGFiZWwuZW5hYmxlZD1mYWxzZTtcclxuICAgICAgICBjYy50d2Vlbih0aGlzLm5vZGUpLmRlbGF5KDAuMDUpLmNhbGwoKCk9PntcclxuICAgICAgICAgICAgaGludExhYmVsLmVuYWJsZWQ9dHJ1ZTtcclxuICAgICAgICAgICAgbGV0IGJ0blllcz10aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoJ2J0blllcycpO1xyXG4gICAgICAgICAgICBsZXQgYnRuTm89dGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKCdidG5ObycpO1xyXG4gICAgICAgICAgICBsZXQgYnRuSGVpZ2h0PWJ0blllcy5oZWlnaHQ7XHJcbiAgICAgICAgICAgIHRoaXMubm9kZS5oZWlnaHQ9aGludExhYmVsLm5vZGUuaGVpZ2h0K2J0bkhlaWdodCt0aGlzLmJ0bl9ib3R0b20rdGhpcy50ZXh0X3RvcCt0aGlzLnRleHRfdG9wICsgdGhpcy5maWxsaW5nX2hlaWdodDtcclxuICAgICAgICAgICAgaGludExhYmVsLm5vZGUueT10aGlzLm5vZGUuaGVpZ2h0LzItdGhpcy50ZXh0X3RvcDtcclxuICAgICAgICAgICAgYnRuWWVzLnk9LXRoaXMubm9kZS5oZWlnaHQvMit0aGlzLmJ0bl9ib3R0b20rYnRuSGVpZ2h0LzI7XHJcbiAgICAgICAgICAgIHRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZShcImxpbmVcIikueSA9IGJ0blllcy55ICsgNzA7XHJcbiAgICAgICAgICAgIGJ0bk5vLnk9YnRuWWVzLnk7XHJcbiAgICAgICAgICAgIGlmKHNob3dUeXBlPT0xKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBidG5ZZXMuZ2V0Q2hpbGRCeU5hbWUoJ2xheW91dCcpLmdldENoaWxkQnlOYW1lKCdhZHMnKS5hY3RpdmU9dHJ1ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZihzaG93VHlwZT09MilcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgLy8gYnRuWWVzLmdldENoaWxkQnlOYW1lKCdsYXlvdXQnKS5nZXRDaGlsZEJ5TmFtZSgneWVzJykuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmc9bnVtK2N1cnJlbmN5O1xyXG4gICAgICAgICAgICAgICAgYnRuWWVzLmdldENoaWxkQnlOYW1lKCdsYXlvdXQnKS5nZXRDaGlsZEJ5TmFtZSgneWVzJykuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmc9U3RyaW5nKG51bSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KS50bygwLjIse29wYWNpdHk6MjU1fSkuc3RhcnQoKTtcclxuICAgICAgICAvLyB0aGlzLnNjaGVkdWxlT25jZSgoKT0+e1xyXG4gICAgICAgIC8vICAgICB0aGlzLm5vZGUub3BhY2l0eT0yNTU7XHJcbiAgICAgICAgLy8gICAgIGhpbnRMYWJlbC5lbmFibGVkPXRydWU7XHJcbiAgICAgICAgLy8gICAgIGxldCBidG5ZZXM9dGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKCdidG5ZZXMnKTtcclxuICAgICAgICAvLyAgICAgbGV0IGJ0bk5vPXRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZSgnYnRuTm8nKTtcclxuICAgICAgICAvLyAgICAgbGV0IGJ0bkhlaWdodD1idG5ZZXMuaGVpZ2h0O1xyXG4gICAgICAgIC8vICAgICB0aGlzLm5vZGUuaGVpZ2h0PWhpbnRMYWJlbC5ub2RlLmhlaWdodCtidG5IZWlnaHQrdGhpcy5idG5fYm90dG9tK3RoaXMudGV4dF90b3ArdGhpcy50ZXh0X3RvcDtcclxuICAgICAgICAvLyAgICAgaGludExhYmVsLm5vZGUueT10aGlzLm5vZGUuaGVpZ2h0LzItdGhpcy50ZXh0X3RvcDtcclxuICAgICAgICAvLyAgICAgYnRuWWVzLnk9LXRoaXMubm9kZS5oZWlnaHQvMit0aGlzLmJ0bl9ib3R0b20rYnRuSGVpZ2h0LzI7XHJcbiAgICAgICAgLy8gICAgIGJ0bk5vLnk9YnRuWWVzLnk7XHJcbiAgICAgICAgLy8gICAgIGlmKGlzVmlkZW89PXRydWUpXHJcbiAgICAgICAgLy8gICAgIHtcclxuICAgICAgICAvLyAgICAgICAgIGJ0blllcy5nZXRDaGlsZEJ5TmFtZSgnbGF5b3V0JykuZ2V0Q2hpbGRCeU5hbWUoJ2FkcycpLmFjdGl2ZT10cnVlO1xyXG4gICAgICAgIC8vICAgICB9XHJcbiAgICAgICAgLy8gfSwwLjA1KTtcclxuICAgIH1cclxufVxyXG5cclxuIl19