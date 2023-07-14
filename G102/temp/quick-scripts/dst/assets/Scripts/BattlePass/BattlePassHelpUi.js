
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Scripts/BattlePass/BattlePassHelpUi.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '9b112ezpr1ILZfdmrmTsZmm', 'BattlePassHelpUi');
// Scripts/BattlePass/BattlePassHelpUi.ts

"use strict";
// Learn TypeScript:
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
var LanguageManager_1 = require("../multiLanguage/LanguageManager");
var TextLanguage_1 = require("../multiLanguage/TextLanguage");
var AudioConstants_1 = require("../Sound/AudioConstants");
var UIComponent_1 = require("../UI/UIComponent");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var BattlePassHelpUi = /** @class */ (function (_super) {
    __extends(BattlePassHelpUi, _super);
    function BattlePassHelpUi() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.prefab_label = null;
        _this.titleId = 0;
        _this.contentIds = [];
        return _this;
    }
    BattlePassHelpUi.prototype.init = function (uiAc) {
        _super.prototype.init.call(this, uiAc);
    };
    BattlePassHelpUi.prototype.initData = function (titleId, contentIds) {
        this.titleId = titleId;
        this.contentIds = contentIds;
        this.refreshUi();
    };
    BattlePassHelpUi.prototype.refreshUi = function () {
        var _this = this;
        this.node.getChildByName("title").getComponent(TextLanguage_1.default).setTextId(this.titleId);
        var content = this.node.getChildByName("scrollView").getComponent(cc.ScrollView).content;
        this.contentIds.forEach(function (v, k) {
            var text = cc.instantiate(_this.prefab_label);
            text.getComponent(cc.Label).string = LanguageManager_1.default.getInstance().getStrByTextId(v);
            content.addChild(text);
        });
        // MyTool.allFadeIn(this.node);
        // this.node.on(cc.Node.EventType.TOUCH_START,()=>{
        //     MyTool.allFadeOut(this.node,()=>{
        //         this.node.removeFromParent();
        //         GameManager.getInstance().sound_manager.playSound(SoundIndex.click);
        //     })
        // },this);
    };
    BattlePassHelpUi.prototype.clickBtnClose = function () {
        GameManager_1.default.getInstance().sound_manager.playSound(AudioConstants_1.SoundIndex.click);
        this.destroySelf();
    };
    BattlePassHelpUi.prototype.destroySelf = function () {
        _super.prototype.onClose.call(this);
        ApkManager_1.default.getInstance().closeBanner();
        // EventManager.postRedEvent(RedEventString.RED_CHECK,RedEventType.Btn_Main_SignIn);
    };
    __decorate([
        property(cc.Prefab)
    ], BattlePassHelpUi.prototype, "prefab_label", void 0);
    BattlePassHelpUi = __decorate([
        ccclass
    ], BattlePassHelpUi);
    return BattlePassHelpUi;
}(UIComponent_1.default));
exports.default = BattlePassHelpUi;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0c1xcQmF0dGxlUGFzc1xcQmF0dGxlUGFzc0hlbHBVaS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsb0JBQW9COzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFFcEIsZ0RBQTJDO0FBQzNDLDhDQUF5QztBQUN6QyxvRUFBK0Q7QUFDL0QsOERBQXlEO0FBQ3pELDBEQUFxRDtBQUVyRCxpREFBNEM7QUFJdEMsSUFBQSxLQUFzQixFQUFFLENBQUMsVUFBVSxFQUFsQyxPQUFPLGFBQUEsRUFBRSxRQUFRLGNBQWlCLENBQUM7QUFHMUM7SUFBOEMsb0NBQVc7SUFBekQ7UUFBQSxxRUFpREM7UUE5Q0csa0JBQVksR0FBVyxJQUFJLENBQUM7UUFFNUIsYUFBTyxHQUFVLENBQUMsQ0FBQztRQUNuQixnQkFBVSxHQUFVLEVBQUUsQ0FBQzs7SUEyQzNCLENBQUM7SUF6Q0csK0JBQUksR0FBSixVQUFLLElBQWE7UUFDZCxpQkFBTSxJQUFJLFlBQUMsSUFBSSxDQUFDLENBQUM7SUFDckIsQ0FBQztJQUVELG1DQUFRLEdBQVIsVUFBUyxPQUFjLEVBQUMsVUFBbUI7UUFDdkMsSUFBSSxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUM7UUFDdkIsSUFBSSxDQUFDLFVBQVUsR0FBRyxVQUFVLENBQUM7UUFDN0IsSUFBSSxDQUFDLFNBQVMsRUFBRSxDQUFDO0lBQ3JCLENBQUM7SUFFRCxvQ0FBUyxHQUFUO1FBQUEsaUJBZ0JDO1FBZkcsSUFBSSxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsT0FBTyxDQUFDLENBQUMsWUFBWSxDQUFDLHNCQUFZLENBQUMsQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQ3JGLElBQUksT0FBTyxHQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLFlBQVksQ0FBQyxDQUFDLFlBQVksQ0FBQyxFQUFFLENBQUMsVUFBVSxDQUFDLENBQUMsT0FBTyxDQUFDO1FBQ3ZGLElBQUksQ0FBQyxVQUFVLENBQUMsT0FBTyxDQUFDLFVBQUMsQ0FBQyxFQUFDLENBQUM7WUFDeEIsSUFBSSxJQUFJLEdBQUMsRUFBRSxDQUFDLFdBQVcsQ0FBQyxLQUFJLENBQUMsWUFBWSxDQUFDLENBQUM7WUFDM0MsSUFBSSxDQUFDLFlBQVksQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDLENBQUMsTUFBTSxHQUFDLHlCQUFlLENBQUMsV0FBVyxFQUFFLENBQUMsY0FBYyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ25GLE9BQU8sQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDM0IsQ0FBQyxDQUFDLENBQUE7UUFFRiwrQkFBK0I7UUFDL0IsbURBQW1EO1FBQ25ELHdDQUF3QztRQUN4Qyx3Q0FBd0M7UUFDeEMsK0VBQStFO1FBQy9FLFNBQVM7UUFDVCxXQUFXO0lBQ2YsQ0FBQztJQUVELHdDQUFhLEdBQWI7UUFFSSxxQkFBVyxDQUFDLFdBQVcsRUFBRSxDQUFDLGFBQWEsQ0FBQyxTQUFTLENBQUMsMkJBQVUsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUNwRSxJQUFJLENBQUMsV0FBVyxFQUFFLENBQUM7SUFDdkIsQ0FBQztJQUVELHNDQUFXLEdBQVg7UUFFSSxpQkFBTSxPQUFPLFdBQUUsQ0FBQztRQUNoQixvQkFBVSxDQUFDLFdBQVcsRUFBRSxDQUFDLFdBQVcsRUFBRSxDQUFDO1FBQ3ZDLG9GQUFvRjtJQUN4RixDQUFDO0lBNUNEO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUM7MERBQ1E7SUFIWCxnQkFBZ0I7UUFEcEMsT0FBTztPQUNhLGdCQUFnQixDQWlEcEM7SUFBRCx1QkFBQztDQWpERCxBQWlEQyxDQWpENkMscUJBQVcsR0FpRHhEO2tCQWpEb0IsZ0JBQWdCIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiLy8gTGVhcm4gVHlwZVNjcmlwdDpcclxuXHJcbmltcG9ydCBBcGtNYW5hZ2VyIGZyb20gXCIuLi9BZHMvQXBrTWFuYWdlclwiO1xyXG5pbXBvcnQgR2FtZU1hbmFnZXIgZnJvbSBcIi4uL0dhbWVNYW5hZ2VyXCI7XHJcbmltcG9ydCBMYW5ndWFnZU1hbmFnZXIgZnJvbSBcIi4uL211bHRpTGFuZ3VhZ2UvTGFuZ3VhZ2VNYW5hZ2VyXCI7XHJcbmltcG9ydCBUZXh0TGFuZ3VhZ2UgZnJvbSBcIi4uL211bHRpTGFuZ3VhZ2UvVGV4dExhbmd1YWdlXCI7XHJcbmltcG9ydCB7IFNvdW5kSW5kZXggfSBmcm9tIFwiLi4vU291bmQvQXVkaW9Db25zdGFudHNcIjtcclxuaW1wb3J0IE15VG9vbCBmcm9tIFwiLi4vVG9vbHMvTXlUb29sXCI7XHJcbmltcG9ydCBVSUNvbXBvbmVudCBmcm9tIFwiLi4vVUkvVUlDb21wb25lbnRcIjtcclxuaW1wb3J0IHsgVWlBY3Rpb24gfSBmcm9tIFwiLi4vVUkvVWlJbnRlcmZhY2VcIjtcclxuXHJcblxyXG5jb25zdCB7Y2NjbGFzcywgcHJvcGVydHl9ID0gY2MuX2RlY29yYXRvcjtcclxuXHJcbkBjY2NsYXNzXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEJhdHRsZVBhc3NIZWxwVWkgZXh0ZW5kcyBVSUNvbXBvbmVudCB7XHJcblxyXG4gICAgQHByb3BlcnR5KGNjLlByZWZhYilcclxuICAgIHByZWZhYl9sYWJlbDpjYy5QcmVmYWI9bnVsbDtcclxuXHJcbiAgICB0aXRsZUlkOm51bWJlciA9IDA7XHJcbiAgICBjb250ZW50SWRzOm51bWJlcltdPVtdO1xyXG5cclxuICAgIGluaXQodWlBYzpVaUFjdGlvbil7XHJcbiAgICAgICAgc3VwZXIuaW5pdCh1aUFjKTtcclxuICAgIH1cclxuXHJcbiAgICBpbml0RGF0YSh0aXRsZUlkOm51bWJlcixjb250ZW50SWRzOm51bWJlcltdKXtcclxuICAgICAgICB0aGlzLnRpdGxlSWQgPSB0aXRsZUlkO1xyXG4gICAgICAgIHRoaXMuY29udGVudElkcyA9IGNvbnRlbnRJZHM7XHJcbiAgICAgICAgdGhpcy5yZWZyZXNoVWkoKTtcclxuICAgIH1cclxuXHJcbiAgICByZWZyZXNoVWkoKXtcclxuICAgICAgICB0aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJ0aXRsZVwiKS5nZXRDb21wb25lbnQoVGV4dExhbmd1YWdlKS5zZXRUZXh0SWQodGhpcy50aXRsZUlkKTtcclxuICAgICAgICBsZXQgY29udGVudD10aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJzY3JvbGxWaWV3XCIpLmdldENvbXBvbmVudChjYy5TY3JvbGxWaWV3KS5jb250ZW50O1xyXG4gICAgICAgIHRoaXMuY29udGVudElkcy5mb3JFYWNoKCh2LGspPT57XHJcbiAgICAgICAgICAgIGxldCB0ZXh0PWNjLmluc3RhbnRpYXRlKHRoaXMucHJlZmFiX2xhYmVsKTtcclxuICAgICAgICAgICAgdGV4dC5nZXRDb21wb25lbnQoY2MuTGFiZWwpLnN0cmluZz1MYW5ndWFnZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRTdHJCeVRleHRJZCh2KTtcclxuICAgICAgICAgICAgY29udGVudC5hZGRDaGlsZCh0ZXh0KTtcclxuICAgICAgICB9KVxyXG5cclxuICAgICAgICAvLyBNeVRvb2wuYWxsRmFkZUluKHRoaXMubm9kZSk7XHJcbiAgICAgICAgLy8gdGhpcy5ub2RlLm9uKGNjLk5vZGUuRXZlbnRUeXBlLlRPVUNIX1NUQVJULCgpPT57XHJcbiAgICAgICAgLy8gICAgIE15VG9vbC5hbGxGYWRlT3V0KHRoaXMubm9kZSwoKT0+e1xyXG4gICAgICAgIC8vICAgICAgICAgdGhpcy5ub2RlLnJlbW92ZUZyb21QYXJlbnQoKTtcclxuICAgICAgICAvLyAgICAgICAgIEdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuc291bmRfbWFuYWdlci5wbGF5U291bmQoU291bmRJbmRleC5jbGljayk7XHJcbiAgICAgICAgLy8gICAgIH0pXHJcbiAgICAgICAgLy8gfSx0aGlzKTtcclxuICAgIH1cclxuXHJcbiAgICBjbGlja0J0bkNsb3NlKClcclxuICAgIHtcclxuICAgICAgICBHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNvdW5kX21hbmFnZXIucGxheVNvdW5kKFNvdW5kSW5kZXguY2xpY2spO1xyXG4gICAgICAgIHRoaXMuZGVzdHJveVNlbGYoKTtcclxuICAgIH1cclxuXHJcbiAgICBkZXN0cm95U2VsZigpXHJcbiAgICB7XHJcbiAgICAgICAgc3VwZXIub25DbG9zZSgpO1xyXG4gICAgICAgIEFwa01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5jbG9zZUJhbm5lcigpO1xyXG4gICAgICAgIC8vIEV2ZW50TWFuYWdlci5wb3N0UmVkRXZlbnQoUmVkRXZlbnRTdHJpbmcuUkVEX0NIRUNLLFJlZEV2ZW50VHlwZS5CdG5fTWFpbl9TaWduSW4pO1xyXG4gICAgfVxyXG5cclxufVxyXG4iXX0=