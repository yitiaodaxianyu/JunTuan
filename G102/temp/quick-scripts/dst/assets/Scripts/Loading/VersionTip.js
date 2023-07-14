
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Scripts/Loading/VersionTip.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'ee1ba6O+J5FNatvv78/poLi', 'VersionTip');
// Scripts/Loading/VersionTip.ts

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
var ApkManager_1 = require("../Ads/ApkManager");
var GameManager_1 = require("../GameManager");
var TextLanguage_1 = require("../multiLanguage/TextLanguage");
var AudioConstants_1 = require("../Sound/AudioConstants");
var UserData_1 = require("../UserData");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var VersionTip = /** @class */ (function (_super) {
    __extends(VersionTip, _super);
    function VersionTip() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.cur_dialog_index = 0;
        _this.arr_content_text = [];
        _this.arr_left_text = [];
        _this.arr_right_text = [];
        _this.text_content = null;
        _this.text_left = null;
        _this.text_right = null;
        return _this;
    }
    VersionTip.prototype.start = function () {
    };
    VersionTip.prototype.refreshUi = function () {
        if (this.text_content) {
            this.text_content.setTextId(this.arr_content_text[this.cur_dialog_index]);
            this.text_left.setTextId(this.arr_left_text[this.cur_dialog_index]);
            this.text_right.setTextId(this.arr_right_text[this.cur_dialog_index]);
        }
        else {
            this.text_content = this.node.getChildByName("mytxt").getComponent(TextLanguage_1.default);
            this.text_left = this.node.getChildByName("btnad").getChildByName("text").getComponent(TextLanguage_1.default);
            this.text_right = this.node.getChildByName("btnGo").getChildByName("text").getComponent(TextLanguage_1.default);
            this.text_content.setTextId(this.arr_content_text[this.cur_dialog_index]);
            this.text_left.setTextId(this.arr_left_text[this.cur_dialog_index]);
            this.text_right.setTextId(this.arr_right_text[this.cur_dialog_index]);
        }
    };
    VersionTip.prototype.clickBtnLeft = function () {
        GameManager_1.default.getInstance().sound_manager.playSound(AudioConstants_1.SoundIndex.click);
        switch (this.cur_dialog_index) {
            case 0:
                {
                    //取消，跳转下一个页面显示
                    this.cur_dialog_index++;
                    this.refreshUi();
                }
                break;
            case 1:
                {
                    //跳转到GP
                    this.jumpToGP();
                }
                break;
        }
    };
    VersionTip.prototype.clickBtnRight = function () {
        GameManager_1.default.getInstance().sound_manager.playSound(AudioConstants_1.SoundIndex.click);
        switch (this.cur_dialog_index) {
            case 0:
                {
                    //跳转到GP
                    this.jumpToGP();
                }
                break;
            case 1:
                {
                    //直接开始游戏
                    UserData_1.default.getInstance().version_is_ok = true;
                    this.node.removeFromParent();
                }
                break;
        }
    };
    VersionTip.prototype.jumpToGP = function () {
        ApkManager_1.default.getInstance().jumpToGP();
    };
    __decorate([
        property([cc.Integer])
    ], VersionTip.prototype, "arr_content_text", void 0);
    __decorate([
        property([cc.Integer])
    ], VersionTip.prototype, "arr_left_text", void 0);
    __decorate([
        property([cc.Integer])
    ], VersionTip.prototype, "arr_right_text", void 0);
    __decorate([
        property(TextLanguage_1.default)
    ], VersionTip.prototype, "text_content", void 0);
    __decorate([
        property(TextLanguage_1.default)
    ], VersionTip.prototype, "text_left", void 0);
    __decorate([
        property(TextLanguage_1.default)
    ], VersionTip.prototype, "text_right", void 0);
    VersionTip = __decorate([
        ccclass
    ], VersionTip);
    return VersionTip;
}(cc.Component));
exports.default = VersionTip;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0c1xcTG9hZGluZ1xcVmVyc2lvblRpcC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxnREFBMkM7QUFDM0MsOENBQXlDO0FBQ3pDLDhEQUF5RDtBQUN6RCwwREFBcUQ7QUFDckQsd0NBQW1DO0FBRTdCLElBQUEsS0FBc0IsRUFBRSxDQUFDLFVBQVUsRUFBbEMsT0FBTyxhQUFBLEVBQUUsUUFBUSxjQUFpQixDQUFDO0FBRzFDO0lBQXdDLDhCQUFZO0lBQXBEO1FBQUEscUVBMEVDO1FBeEVXLHNCQUFnQixHQUFRLENBQUMsQ0FBQztRQUdsQyxzQkFBZ0IsR0FBVSxFQUFFLENBQUM7UUFHN0IsbUJBQWEsR0FBVSxFQUFFLENBQUM7UUFHMUIsb0JBQWMsR0FBVSxFQUFFLENBQUM7UUFHM0Isa0JBQVksR0FBYyxJQUFJLENBQUM7UUFHL0IsZUFBUyxHQUFjLElBQUksQ0FBQztRQUc1QixnQkFBVSxHQUFjLElBQUksQ0FBQzs7SUFzRGpDLENBQUM7SUFwREcsMEJBQUssR0FBTDtJQUVBLENBQUM7SUFFRCw4QkFBUyxHQUFUO1FBQ0ksSUFBRyxJQUFJLENBQUMsWUFBWSxFQUFDO1lBQ2pCLElBQUksQ0FBQyxZQUFZLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsQ0FBQyxDQUFDO1lBQzFFLElBQUksQ0FBQyxTQUFTLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLENBQUMsQ0FBQztZQUNwRSxJQUFJLENBQUMsVUFBVSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDLENBQUM7U0FDekU7YUFBSTtZQUNELElBQUksQ0FBQyxZQUFZLEdBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxjQUFjLENB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Z2VyIGZyb20gXCIuLi9BZHMvQXBrTWFuYWdlclwiO1xyXG5pbXBvcnQgR2FtZU1hbmFnZXIgZnJvbSBcIi4uL0dhbWVNYW5hZ2VyXCI7XHJcbmltcG9ydCBUZXh0TGFuZ3VhZ2UgZnJvbSBcIi4uL211bHRpTGFuZ3VhZ2UvVGV4dExhbmd1YWdlXCI7XHJcbmltcG9ydCB7IFNvdW5kSW5kZXggfSBmcm9tIFwiLi4vU291bmQvQXVkaW9Db25zdGFudHNcIjtcclxuaW1wb3J0IFVzZXJEYXRhIGZyb20gXCIuLi9Vc2VyRGF0YVwiO1xyXG5cclxuY29uc3Qge2NjY2xhc3MsIHByb3BlcnR5fSA9IGNjLl9kZWNvcmF0b3I7XHJcblxyXG5AY2NjbGFzc1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBWZXJzaW9uVGlwIGV4dGVuZHMgY2MuQ29tcG9uZW50IHtcclxuXHJcbiAgICBwcml2YXRlIGN1cl9kaWFsb2dfaW5kZXg6bnVtYmVyPTA7XHJcblxyXG4gICAgQHByb3BlcnR5KFtjYy5JbnRlZ2VyXSlcclxuICAgIGFycl9jb250ZW50X3RleHQ6bnVtYmVyW109W107XHJcblxyXG4gICAgQHByb3BlcnR5KFtjYy5JbnRlZ2VyXSlcclxuICAgIGFycl9sZWZ0X3RleHQ6bnVtYmVyW109W107XHJcblxyXG4gICAgQHByb3BlcnR5KFtjYy5JbnRlZ2VyXSlcclxuICAgIGFycl9yaWdodF90ZXh0Om51bWJlcltdPVtdO1xyXG5cclxuICAgIEBwcm9wZXJ0eShUZXh0TGFuZ3VhZ2UpXHJcbiAgICB0ZXh0X2NvbnRlbnQ6VGV4dExhbmd1YWdlPW51bGw7XHJcblxyXG4gICAgQHByb3BlcnR5KFRleHRMYW5ndWFnZSlcclxuICAgIHRleHRfbGVmdDpUZXh0TGFuZ3VhZ2U9bnVsbDtcclxuXHJcbiAgICBAcHJvcGVydHkoVGV4dExhbmd1YWdlKVxyXG4gICAgdGV4dF9yaWdodDpUZXh0TGFuZ3VhZ2U9bnVsbDtcclxuXHJcbiAgICBzdGFydCAoKSB7XHJcblxyXG4gICAgfVxyXG5cclxuICAgIHJlZnJlc2hVaSgpeyAgICBcclxuICAgICAgICBpZih0aGlzLnRleHRfY29udGVudCl7XHJcbiAgICAgICAgICAgIHRoaXMudGV4dF9jb250ZW50LnNldFRleHRJZCh0aGlzLmFycl9jb250ZW50X3RleHRbdGhpcy5jdXJfZGlhbG9nX2luZGV4XSk7XHJcbiAgICAgICAgICAgIHRoaXMudGV4dF9sZWZ0LnNldFRleHRJZCh0aGlzLmFycl9sZWZ0X3RleHRbdGhpcy5jdXJfZGlhbG9nX2luZGV4XSk7XHJcbiAgICAgICAgICAgIHRoaXMudGV4dF9yaWdodC5zZXRUZXh0SWQodGhpcy5hcnJfcmlnaHRfdGV4dFt0aGlzLmN1cl9kaWFsb2dfaW5kZXhdKTtcclxuICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgdGhpcy50ZXh0X2NvbnRlbnQ9dGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKFwibXl0eHRcIikuZ2V0Q29tcG9uZW50KFRleHRMYW5ndWFnZSk7XHJcbiAgICAgICAgICAgIHRoaXMudGV4dF9sZWZ0PXRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZShcImJ0bmFkXCIpLmdldENoaWxkQnlOYW1lKFwidGV4dFwiKS5nZXRDb21wb25lbnQoVGV4dExhbmd1YWdlKTtcclxuICAgICAgICAgICAgdGhpcy50ZXh0X3JpZ2h0PXRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZShcImJ0bkdvXCIpLmdldENoaWxkQnlOYW1lKFwidGV4dFwiKS5nZXRDb21wb25lbnQoVGV4dExhbmd1YWdlKTtcclxuICAgICAgICAgICAgdGhpcy50ZXh0X2NvbnRlbnQuc2V0VGV4dElkKHRoaXMuYXJyX2NvbnRlbnRfdGV4dFt0aGlzLmN1cl9kaWFsb2dfaW5kZXhdKTtcclxuICAgICAgICAgICAgdGhpcy50ZXh0X2xlZnQuc2V0VGV4dElkKHRoaXMuYXJyX2xlZnRfdGV4dFt0aGlzLmN1cl9kaWFsb2dfaW5kZXhdKTtcclxuICAgICAgICAgICAgdGhpcy50ZXh0X3JpZ2h0LnNldFRleHRJZCh0aGlzLmFycl9yaWdodF90ZXh0W3RoaXMuY3VyX2RpYWxvZ19pbmRleF0pO1xyXG4gICAgICAgIH0gICAgICAgIFxyXG4gICAgfVxyXG4gICAgXHJcbiAgICBjbGlja0J0bkxlZnQoKXtcclxuICAgICAgICBHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNvdW5kX21hbmFnZXIucGxheVNvdW5kKFNvdW5kSW5kZXguY2xpY2spO1xyXG4gICAgICAgIHN3aXRjaCh0aGlzLmN1cl9kaWFsb2dfaW5kZXgpe1xyXG4gICAgICAgICAgICBjYXNlIDA6e1xyXG4gICAgICAgICAgICAgICAgLy/lj5bmtojvvIzot7PovazkuIvkuIDkuKrpobXpnaLmmL7npLpcclxuICAgICAgICAgICAgICAgIHRoaXMuY3VyX2RpYWxvZ19pbmRleCsrO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5yZWZyZXNoVWkoKTtcclxuICAgICAgICAgICAgfWJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIDE6e1xyXG4gICAgICAgICAgICAgICAgLy/ot7PovazliLBHUFxyXG4gICAgICAgICAgICAgICAgdGhpcy5qdW1wVG9HUCgpO1xyXG4gICAgICAgICAgICB9YnJlYWs7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGNsaWNrQnRuUmlnaHQoKXtcclxuICAgICAgICBHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNvdW5kX21hbmFnZXIucGxheVNvdW5kKFNvdW5kSW5kZXguY2xpY2spO1xyXG4gICAgICAgIHN3aXRjaCh0aGlzLmN1cl9kaWFsb2dfaW5kZXgpe1xyXG4gICAgICAgICAgICBjYXNlIDA6eyAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIC8v6Lez6L2s5YiwR1BcclxuICAgICAgICAgICAgICAgIHRoaXMuanVtcFRvR1AoKTtcclxuICAgICAgICAgICAgfWJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIDE6e1xyXG4gICAgICAgICAgICAgICAgLy/nm7TmjqXlvIDlp4vmuLjmiI9cclxuICAgICAgICAgICAgICAgIFVzZXJEYXRhLmdldEluc3RhbmNlKCkudmVyc2lvbl9pc19vaz10cnVlO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5ub2RlLnJlbW92ZUZyb21QYXJlbnQoKTtcclxuICAgICAgICAgICAgfWJyZWFrO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBqdW1wVG9HUCgpe1xyXG4gICAgICAgIEFwa01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5qdW1wVG9HUCgpO1xyXG4gICAgfVxyXG59XHJcbiJdfQ==