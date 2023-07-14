
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Scripts/copy/voidcrack/MoppingVoid.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'ff24f7TRM1K4YdWC+EfWDi2', 'MoppingVoid');
// Scripts/copy/voidcrack/MoppingVoid.ts

"use strict";
// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html
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
var GameManager_1 = require("../../GameManager");
var Jackpot_1 = require("../../JsonData/Jackpot");
var PropManager_1 = require("../../Prop/PropManager");
var AudioConstants_1 = require("../../Sound/AudioConstants");
var StorageConfig_1 = require("../../Storage/StorageConfig");
var StorageManager_1 = require("../../Storage/StorageManager");
var UIComponent_1 = require("../../UI/UIComponent");
var RoguefastPass_1 = require("./RoguefastPass");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var MoppingVoid = /** @class */ (function (_super) {
    __extends(MoppingVoid, _super);
    function MoppingVoid() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.item = [];
        _this.type = 0; //打的那个的id
        return _this;
        // update (dt) {}
    }
    MoppingVoid.prototype.initUi = function (type) {
        this.type = type; //id
        var Prop1_ID = RoguefastPass_1.RoguefastPassManager.getInstance().getPropID_1(this.type);
        var Prop1_Sum = RoguefastPass_1.RoguefastPassManager.getInstance().getPropNum_1(this.type);
        var ietm1 = PropManager_1.PropManager.getInstance().createPropItem(Prop1_ID, Prop1_Sum);
        ietm1.parent = this.item[0];
        var Prop2_ID = RoguefastPass_1.RoguefastPassManager.getInstance().getPropID_2(this.type);
        var ietm2 = PropManager_1.PropManager.getInstance().createPropItem(Prop2_ID, 1);
        ietm2.parent = this.item[1];
    };
    MoppingVoid.prototype.clickBtnShow = function () {
        var Prop1_ID = RoguefastPass_1.RoguefastPassManager.getInstance().getPropID_1(this.type);
        var Prop1_Sum = RoguefastPass_1.RoguefastPassManager.getInstance().getPropNum_1(this.type);
        var Prop2_ID = RoguefastPass_1.RoguefastPassManager.getInstance().getPropID_2(this.type);
        var Prop2_Sum = RoguefastPass_1.RoguefastPassManager.getInstance().getPropNum_2(this.type);
        var rd = Jackpot_1.JackpotManager.getInstance().getRewardDataById(Prop2_ID);
        var ietm1 = PropManager_1.PropManager.getInstance().createPropItem(Prop1_ID, Prop1_Sum);
        var ietm2 = PropManager_1.PropManager.getInstance().createPropItem(rd.reward_id, Prop2_Sum);
        PropManager_1.PropManager.getInstance().changePropNum(Prop1_ID, Prop1_Sum);
        PropManager_1.PropManager.getInstance().changePropNum(rd.reward_id, Prop2_Sum);
        var myietm = [ietm1, ietm2];
        GameManager_1.default.getInstance().showMultipleGetTip(myietm);
        var totalnum = StorageManager_1.TheStorageManager.getInstance().getNumber(StorageConfig_1.StorageKey.TotalVoidCrackChallengeTimes, 0);
        var num = StorageManager_1.TheStorageManager.getInstance().getNumber(StorageConfig_1.StorageKey.VoidCrackChallengeTimes, 3);
        num--;
        totalnum++;
        StorageManager_1.TheStorageManager.getInstance().setItem(StorageConfig_1.StorageKey.TotalVoidCrackChallengeTimes, totalnum);
        StorageManager_1.TheStorageManager.getInstance().setItem(StorageConfig_1.StorageKey.VoidCrackChallengeTimes, num);
        this.clickBtnClose();
    };
    MoppingVoid.prototype.clickBtnClose = function () {
        this.item[0].children[0].destroy();
        this.item[1].children[0].destroy();
        GameManager_1.default.getInstance().sound_manager.playSound(AudioConstants_1.SoundIndex.click);
        this.onClose();
    };
    __decorate([
        property(cc.Node)
    ], MoppingVoid.prototype, "item", void 0);
    MoppingVoid = __decorate([
        ccclass
    ], MoppingVoid);
    return MoppingVoid;
}(UIComponent_1.default));
exports.default = MoppingVoid;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0c1xcY29weVxcdm9pZGNyYWNrXFxNb3BwaW5nVm9pZC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsb0JBQW9CO0FBQ3BCLHdFQUF3RTtBQUN4RSxtQkFBbUI7QUFDbkIsa0ZBQWtGO0FBQ2xGLDhCQUE4QjtBQUM5QixrRkFBa0Y7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUVsRixpREFBNEM7QUFDNUMsa0RBQXdEO0FBRXhELHNEQUFxRDtBQUNyRCw2REFBd0Q7QUFDeEQsNkRBQXlEO0FBQ3pELCtEQUFpRTtBQUNqRSxvREFBK0M7QUFDL0MsaURBQXVEO0FBSWpELElBQUEsS0FBc0IsRUFBRSxDQUFDLFVBQVUsRUFBbEMsT0FBTyxhQUFBLEVBQUUsUUFBUSxjQUFpQixDQUFDO0FBRzFDO0lBQXlDLCtCQUFXO0lBQXBEO1FBQUEscUVBdURDO1FBcERHLFVBQUksR0FBYSxFQUFFLENBQUM7UUFFcEIsVUFBSSxHQUFRLENBQUMsQ0FBQSxDQUFBLFNBQVM7O1FBaUR0QixpQkFBaUI7SUFDckIsQ0FBQztJQWhERyw0QkFBTSxHQUFOLFVBQU8sSUFBSTtRQUVQLElBQUksQ0FBQyxJQUFJLEdBQUMsSUFBSSxDQUFBLENBQUEsSUFBSTtRQUNsQixJQUFJLFFBQVEsR0FBQyxvQ0FBb0IsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFBO1FBQ3RFLElBQUksU0FBUyxHQUFDLG9DQUFvQixDQUFDLFdBQVcsRUFBRSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUE7UUFDeEUsSUFBSSxLQUFLLEdBQUMseUJBQVcsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxjQUFjLENBQUMsUUFBUSxFQUFDLFNBQVMsQ0FBQyxDQUFDO1FBQ3ZFLEtBQUssQ0FBQyxNQUFNLEdBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQTtRQUd6QixJQUFJ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RW5CLENBQUM7SUFsREQ7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQzs2Q0FDRTtJQUhILFdBQVc7UUFEL0IsT0FBTztPQUNhLFdBQVcsQ0F1RC9CO0lBQUQsa0JBQUM7Q0F2REQsQUF1REMsQ0F2RHdDLHFCQUFXLEdBdURuRDtrQkF2RG9CLFdBQVciLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyIvLyBMZWFybiBUeXBlU2NyaXB0OlxyXG4vLyAgLSBodHRwczovL2RvY3MuY29jb3MuY29tL2NyZWF0b3IvbWFudWFsL2VuL3NjcmlwdGluZy90eXBlc2NyaXB0Lmh0bWxcclxuLy8gTGVhcm4gQXR0cmlidXRlOlxyXG4vLyAgLSBodHRwczovL2RvY3MuY29jb3MuY29tL2NyZWF0b3IvbWFudWFsL2VuL3NjcmlwdGluZy9yZWZlcmVuY2UvYXR0cmlidXRlcy5odG1sXHJcbi8vIExlYXJuIGxpZmUtY3ljbGUgY2FsbGJhY2tzOlxyXG4vLyAgLSBodHRwczovL2RvY3MuY29jb3MuY29tL2NyZWF0b3IvbWFudWFsL2VuL3NjcmlwdGluZy9saWZlLWN5Y2xlLWNhbGxiYWNrcy5odG1sXHJcblxyXG5pbXBvcnQgR2FtZU1hbmFnZXIgZnJvbSBcIi4uLy4uL0dhbWVNYW5hZ2VyXCI7XHJcbmltcG9ydCB7IEphY2twb3RNYW5hZ2VyIH0gZnJvbSBcIi4uLy4uL0pzb25EYXRhL0phY2twb3RcIjtcclxuaW1wb3J0IHsgUHJvcElkIH0gZnJvbSBcIi4uLy4uL1Byb3AvUHJvcENvbmZpZ1wiO1xyXG5pbXBvcnQgeyBQcm9wTWFuYWdlciB9IGZyb20gXCIuLi8uLi9Qcm9wL1Byb3BNYW5hZ2VyXCI7XHJcbmltcG9ydCB7IFNvdW5kSW5kZXggfSBmcm9tIFwiLi4vLi4vU291bmQvQXVkaW9Db25zdGFudHNcIjtcclxuaW1wb3J0IHsgU3RvcmFnZUtleSB9IGZyb20gXCIuLi8uLi9TdG9yYWdlL1N0b3JhZ2VDb25maWdcIjtcclxuaW1wb3J0IHsgVGhlU3RvcmFnZU1hbmFnZXIgfSBmcm9tIFwiLi4vLi4vU3RvcmFnZS9TdG9yYWdlTWFuYWdlclwiO1xyXG5pbXBvcnQgVUlDb21wb25lbnQgZnJvbSBcIi4uLy4uL1VJL1VJQ29tcG9uZW50XCI7XHJcbmltcG9ydCB7IFJvZ3VlZmFzdFBhc3NNYW5hZ2VyIH0gZnJvbSBcIi4vUm9ndWVmYXN0UGFzc1wiO1xyXG4vLyBpbXBvcnQgeyBSb2d1ZUhleGFnb25UeXBlc01hbmFnZXIgfSBmcm9tIFwiLi9Sb2d1ZUhleGFnb25UeXBlc1wiO1xyXG5pbXBvcnQgVm9pZFNjZW5lIGZyb20gXCIuL1ZvaWRTY2VuZVwiO1xyXG5cclxuY29uc3Qge2NjY2xhc3MsIHByb3BlcnR5fSA9IGNjLl9kZWNvcmF0b3I7XHJcblxyXG5AY2NjbGFzc1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBNb3BwaW5nVm9pZCBleHRlbmRzIFVJQ29tcG9uZW50IHtcclxuXHJcbiAgICBAcHJvcGVydHkoY2MuTm9kZSlcclxuICAgIGl0ZW06IGNjLk5vZGVbXSA9W107XHJcblxyXG4gICAgdHlwZTpudW1iZXI9MC8v5omT55qE6YKj5Liq55qEaWRcclxuXHJcbiAgICBpbml0VWkodHlwZSkgey8v5omr6I2hICDmiavojaHlk6rkuIDnq6BcclxuXHJcbiAgICAgICAgdGhpcy50eXBlPXR5cGUvL2lkXHJcbiAgICAgICAgbGV0IFByb3AxX0lEPVJvZ3VlZmFzdFBhc3NNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0UHJvcElEXzEodGhpcy50eXBlKVxyXG4gICAgICAgIGxldCBQcm9wMV9TdW09Um9ndWVmYXN0UGFzc01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRQcm9wTnVtXzEodGhpcy50eXBlKVxyXG4gICAgICAgIGxldCBpZXRtMT1Qcm9wTWFuYWdlci5nZXRJbnN0YW5jZSgpLmNyZWF0ZVByb3BJdGVtKFByb3AxX0lELFByb3AxX1N1bSk7XHJcbiAgICAgICAgaWV0bTEucGFyZW50PXRoaXMuaXRlbVswXVxyXG5cclxuXHJcbiAgICAgICAgbGV0IFByb3AyX0lEPVJvZ3VlZmFzdFBhc3NNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0UHJvcElEXzIodGhpcy50eXBlKVxyXG4gICAgICAgIGxldCBpZXRtMj1Qcm9wTWFuYWdlci5nZXRJbnN0YW5jZSgpLmNyZWF0ZVByb3BJdGVtKFByb3AyX0lELDEpO1xyXG4gICAgICAgIGlldG0yLnBhcmVudD10aGlzLml0ZW1bMV1cclxuICAgIH1cclxuICAgIGNsaWNrQnRuU2hvdygpey8v56Gu6K6k5oyJ6ZKuXHJcbiAgICAgICAgbGV0IFByb3AxX0lEPVJvZ3VlZmFzdFBhc3NNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0UHJvcElEXzEodGhpcy50eXBlKVxyXG4gICAgICAgIGxldCBQcm9wMV9TdW09Um9ndWVmYXN0UGFzc01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRQcm9wTnVtXzEodGhpcy50eXBlKVxyXG5cclxuICAgICAgICBsZXQgUHJvcDJfSUQ9Um9ndWVmYXN0UGFzc01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRQcm9wSURfMih0aGlzLnR5cGUpXHJcbiAgICAgICAgbGV0IFByb3AyX1N1bT1Sb2d1ZWZhc3RQYXNzTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldFByb3BOdW1fMih0aGlzLnR5cGUpXHJcbiAgICAgICAgbGV0IHJkPUphY2twb3RNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0UmV3YXJkRGF0YUJ5SWQoUHJvcDJfSUQpO1xyXG5cclxuICAgICAgICBsZXQgaWV0bTE9UHJvcE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5jcmVhdGVQcm9wSXRlbShQcm9wMV9JRCxQcm9wMV9TdW0pO1xyXG4gICAgICAgIGxldCBpZXRtMj1Qcm9wTWFuYWdlci5nZXRJbnN0YW5jZSgpLmNyZWF0ZVByb3BJdGVtKHJkLnJld2FyZF9pZCxQcm9wMl9TdW0pO1xyXG5cclxuICAgICAgICBQcm9wTWFuYWdlci5nZXRJbnN0YW5jZSgpLmNoYW5nZVByb3BOdW0oUHJvcDFfSUQsUHJvcDFfU3VtKTtcclxuICAgICAgICBQcm9wTWFuYWdlci5nZXRJbnN0YW5jZSgpLmNoYW5nZVByb3BOdW0ocmQucmV3YXJkX2lkLFByb3AyX1N1bSk7XHJcblxyXG4gICAgICAgIGxldCBteWlldG09W2lldG0xLGlldG0yXVxyXG4gICAgICAgIEdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuc2hvd011bHRpcGxlR2V0VGlwKG15aWV0bSk7XHJcblxyXG4gICAgICAgIGxldCB0b3RhbG51bT1UaGVTdG9yYWdlTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldE51bWJlcihTdG9yYWdlS2V5LlRvdGFsVm9pZENyYWNrQ2hhbGxlbmdlVGltZXMsMCk7XHJcbiAgICAgICAgbGV0IG51bSA9IFRoZVN0b3JhZ2VNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0TnVtYmVyKFN0b3JhZ2VLZXkuVm9pZENyYWNrQ2hhbGxlbmdlVGltZXMsMyk7XHJcbiAgICAgICAgbnVtLS07XHJcbiAgICAgICAgdG90YWxudW0rK1xyXG4gICAgICAgIFRoZVN0b3JhZ2VNYW5hZ2VyLmdldEluc3RhbmNlKCkuc2V0SXRlbShTdG9yYWdlS2V5LlRvdGFsVm9pZENyYWNrQ2hhbGxlbmdlVGltZXMsdG90YWxudW0pO1xyXG4gICAgICAgIFRoZVN0b3JhZ2VNYW5hZ2VyLmdldEluc3RhbmNlKCkuc2V0SXRlbShTdG9yYWdlS2V5LlZvaWRDcmFja0NoYWxsZW5nZVRpbWVzLG51bSk7XHJcblxyXG4gICAgICAgIHRoaXMuY2xpY2tCdG5DbG9zZSgpO1xyXG4gICAgfVxyXG4gICAgY2xpY2tCdG5DbG9zZSgpLy/lhbPpl61cclxuICAgIHtcclxuICAgICAgICB0aGlzLml0ZW1bMF0uY2hpbGRyZW5bMF0uZGVzdHJveSgpXHJcbiAgICAgICAgdGhpcy5pdGVtWzFdLmNoaWxkcmVuWzBdLmRlc3Ryb3koKVxyXG4gICAgICAgIEdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuc291bmRfbWFuYWdlci5wbGF5U291bmQoU291bmRJbmRleC5jbGljayk7XHJcbiAgICAgICAgdGhpcy5vbkNsb3NlKCk7XHJcbiAgICBcclxuICAgIH1cclxuICAgIC8vIHVwZGF0ZSAoZHQpIHt9XHJcbn1cclxuIl19