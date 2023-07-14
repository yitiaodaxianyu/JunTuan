"use strict";
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