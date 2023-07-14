
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Scripts/copy/voidcrack/Windfall.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '181348D4UJEvanbRfZEuum7', 'Windfall');
// Scripts/copy/voidcrack/Windfall.ts

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
var UIComponent_1 = require("../../UI/UIComponent");
var RogueHexagonTypes_1 = require("./RogueHexagonTypes");
var VoidScene_1 = require("./VoidScene");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var Windfall = /** @class */ (function (_super) {
    __extends(Windfall, _super);
    function Windfall() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.item = [];
        // @property
        // text: string = 'hello';
        // LIFE-CYCLE CALLBACKS:
        _this.type = 0; //打的那个的id
        _this.mynode = null; //选择格子的界面
        _this.index = 0; //行数
        _this.myindex = 0; //位置
        return _this;
        // update (dt) {}
    }
    // onLoad () {}
    Windfall.prototype.initUi = function (type, mynode, index, myindex) {
        this.type = type; //id
        this.mynode = mynode; //格子界面
        this.index = index; //行数
        this.myindex = myindex; //位置
        var Prop1_ID = RogueHexagonTypes_1.RogueHexagonTypesManager.getInstance().getRogueProp1_ID(this.type);
        var Prop1_Sum = RogueHexagonTypes_1.RogueHexagonTypesManager.getInstance().getRogueProp1_Sum(this.type);
        var ietm1 = PropManager_1.PropManager.getInstance().createPropItem(Prop1_ID, Prop1_Sum);
        ietm1.parent = this.item[0];
        var Prop2_ID = RogueHexagonTypes_1.RogueHexagonTypesManager.getInstance().getRogueProp2_ID(this.type);
        var ietm2 = PropManager_1.PropManager.getInstance().createPropItem(Prop2_ID, 1);
        ietm2.parent = this.item[1];
    };
    Windfall.prototype.clickBtnShow = function () {
        var Prop1_ID = RogueHexagonTypes_1.RogueHexagonTypesManager.getInstance().getRogueProp1_ID(this.type);
        var Prop1_Sum = RogueHexagonTypes_1.RogueHexagonTypesManager.getInstance().getRogueProp1_Sum(this.type);
        var Prop2_ID = RogueHexagonTypes_1.RogueHexagonTypesManager.getInstance().getRogueProp2_ID(this.type);
        var Prop2_Sum = RogueHexagonTypes_1.RogueHexagonTypesManager.getInstance().getRogueProp2_Sum(this.type);
        var rd = Jackpot_1.JackpotManager.getInstance().getRewardDataById(Prop2_ID);
        var ietm1 = PropManager_1.PropManager.getInstance().createPropItem(Prop1_ID, Prop1_Sum);
        var ietm2 = PropManager_1.PropManager.getInstance().createPropItem(rd.reward_id, Prop2_Sum);
        PropManager_1.PropManager.getInstance().changePropNum(Prop1_ID, Prop1_Sum);
        PropManager_1.PropManager.getInstance().changePropNum(rd.reward_id, Prop2_Sum);
        var myietm = [ietm1, ietm2];
        GameManager_1.default.getInstance().showMultipleGetTip(myietm);
        this.mynode.getComponent(VoidScene_1.default).Rowsnumber = this.index; //行数
        this.mynode.getComponent(VoidScene_1.default).Positionnumber = this.myindex; //位置数
        this.mynode.getComponent(VoidScene_1.default).Refresh();
        // this.mynode.getComponent(VoidScene).initUi(this.mytype,this.index,this.myindex)
        this.clickBtnClose();
    };
    Windfall.prototype.clickBtnClose = function () {
        this.item[0].children[0].destroy();
        this.item[1].children[0].destroy();
        GameManager_1.default.getInstance().sound_manager.playSound(AudioConstants_1.SoundIndex.click);
        this.onClose();
    };
    __decorate([
        property(cc.Node)
    ], Windfall.prototype, "item", void 0);
    Windfall = __decorate([
        ccclass
    ], Windfall);
    return Windfall;
}(UIComponent_1.default));
exports.default = Windfall;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0c1xcY29weVxcdm9pZGNyYWNrXFxXaW5kZmFsbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsb0JBQW9CO0FBQ3BCLHdFQUF3RTtBQUN4RSxtQkFBbUI7QUFDbkIsa0ZBQWtGO0FBQ2xGLDhCQUE4QjtBQUM5QixrRkFBa0Y7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUVsRixpREFBNEM7QUFDNUMsa0RBQXdEO0FBRXhELHNEQUFxRDtBQUNyRCw2REFBd0Q7QUFDeEQsb0RBQStDO0FBQy9DLHlEQUErRDtBQUMvRCx5Q0FBb0M7QUFFOUIsSUFBQSxLQUFzQixFQUFFLENBQUMsVUFBVSxFQUFsQyxPQUFPLGFBQUEsRUFBRSxRQUFRLGNBQWlCLENBQUM7QUFHMUM7SUFBc0MsNEJBQVc7SUFBakQ7UUFBQSxxRUFnRUM7UUE3REcsVUFBSSxHQUFhLEVBQUUsQ0FBQztRQUVwQixZQUFZO1FBQ1osMEJBQTBCO1FBRTFCLHdCQUF3QjtRQUN4QixVQUFJLEdBQVEsQ0FBQyxDQUFBLENBQUEsU0FBUztRQUN0QixZQUFNLEdBQVMsSUFBSSxDQUFBLENBQUEsU0FBUztRQUU1QixXQUFLLEdBQVEsQ0FBQyxDQUFBLENBQUEsSUFBSTtRQUNsQixhQUFPLEdBQVEsQ0FBQyxDQUFBLENBQUEsSUFBSTs7UUFrRHBCLGlCQUFpQjtJQUNyQixDQUFDO0lBbERHLGVBQWU7SUFDZix5QkFBTSxHQUFOLFVBQU8sSUFBSSxFQUFDLE1BQU0sRUFBQyxLQUFLLEVBQUMsT0FBTztRQUU1QixJQUFJLENBQUMsSUFBSSxHQUFDLElBQUksQ0FBQSxDQUFBLElBQUk7UUFDbEIsSUFBSSxDQUFDLE1BQU0sR0FBQyxNQUFNLENBQUEsQ0FBQSxNQUFNO1FBQ3hCLElBQUksQ0FBQyxLQUFLLEdBQUMsS0FBSyxDQUFBLENBQUEsSUFBSTtRQUNwQixJQUFJLENBQUMsT0FBTyxHQUFDLE9BQU8sQ0FBQSxDQUFBLElBQUk7UUFHeEIsSUFBSSxR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QUNsQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLEVBQUUsQ0FBQTtRQUNsQyxxQkFBVyxDQUFDLFdBQVcsRUFBRSxDQUFDLGFBQWEsQ0FBQyxTQUFTLENBQUMsMkJBQVUsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUNwRSxJQUFJLENBQUMsT0FBTyxFQUFFLENBQUM7SUFFbkIsQ0FBQztJQTNERDtRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDOzBDQUNFO0lBSEgsUUFBUTtRQUQ1QixPQUFPO09BQ2EsUUFBUSxDQWdFNUI7SUFBRCxlQUFDO0NBaEVELEFBZ0VDLENBaEVxQyxxQkFBVyxHQWdFaEQ7a0JBaEVvQixRQUFRIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiLy8gTGVhcm4gVHlwZVNjcmlwdDpcclxuLy8gIC0gaHR0cHM6Ly9kb2NzLmNvY29zLmNvbS9jcmVhdG9yL21hbnVhbC9lbi9zY3JpcHRpbmcvdHlwZXNjcmlwdC5odG1sXHJcbi8vIExlYXJuIEF0dHJpYnV0ZTpcclxuLy8gIC0gaHR0cHM6Ly9kb2NzLmNvY29zLmNvbS9jcmVhdG9yL21hbnVhbC9lbi9zY3JpcHRpbmcvcmVmZXJlbmNlL2F0dHJpYnV0ZXMuaHRtbFxyXG4vLyBMZWFybiBsaWZlLWN5Y2xlIGNhbGxiYWNrczpcclxuLy8gIC0gaHR0cHM6Ly9kb2NzLmNvY29zLmNvbS9jcmVhdG9yL21hbnVhbC9lbi9zY3JpcHRpbmcvbGlmZS1jeWNsZS1jYWxsYmFja3MuaHRtbFxyXG5cclxuaW1wb3J0IEdhbWVNYW5hZ2VyIGZyb20gXCIuLi8uLi9HYW1lTWFuYWdlclwiO1xyXG5pbXBvcnQgeyBKYWNrcG90TWFuYWdlciB9IGZyb20gXCIuLi8uLi9Kc29uRGF0YS9KYWNrcG90XCI7XHJcbmltcG9ydCB7IFByb3BJZCB9IGZyb20gXCIuLi8uLi9Qcm9wL1Byb3BDb25maWdcIjtcclxuaW1wb3J0IHsgUHJvcE1hbmFnZXIgfSBmcm9tIFwiLi4vLi4vUHJvcC9Qcm9wTWFuYWdlclwiO1xyXG5pbXBvcnQgeyBTb3VuZEluZGV4IH0gZnJvbSBcIi4uLy4uL1NvdW5kL0F1ZGlvQ29uc3RhbnRzXCI7XHJcbmltcG9ydCBVSUNvbXBvbmVudCBmcm9tIFwiLi4vLi4vVUkvVUlDb21wb25lbnRcIjtcclxuaW1wb3J0IHsgUm9ndWVIZXhhZ29uVHlwZXNNYW5hZ2VyIH0gZnJvbSBcIi4vUm9ndWVIZXhhZ29uVHlwZXNcIjtcclxuaW1wb3J0IFZvaWRTY2VuZSBmcm9tIFwiLi9Wb2lkU2NlbmVcIjtcclxuXHJcbmNvbnN0IHtjY2NsYXNzLCBwcm9wZXJ0eX0gPSBjYy5fZGVjb3JhdG9yO1xyXG5cclxuQGNjY2xhc3NcclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgV2luZGZhbGwgZXh0ZW5kcyBVSUNvbXBvbmVudCB7XHJcblxyXG4gICAgQHByb3BlcnR5KGNjLk5vZGUpXHJcbiAgICBpdGVtOiBjYy5Ob2RlW10gPVtdO1xyXG5cclxuICAgIC8vIEBwcm9wZXJ0eVxyXG4gICAgLy8gdGV4dDogc3RyaW5nID0gJ2hlbGxvJztcclxuXHJcbiAgICAvLyBMSUZFLUNZQ0xFIENBTExCQUNLUzpcclxuICAgIHR5cGU6bnVtYmVyPTAvL+aJk+eahOmCo+S4queahGlkXHJcbiAgICBteW5vZGU6Y2MuTm9kZT1udWxsLy/pgInmi6nmoLzlrZDnmoTnlYzpnaJcclxuXHJcbiAgICBpbmRleDpudW1iZXI9MC8v6KGM5pWwXHJcbiAgICBteWluZGV4Om51bWJlcj0wLy/kvY3nva5cclxuICAgIC8vIG9uTG9hZCAoKSB7fVxyXG4gICAgaW5pdFVpKHR5cGUsbXlub2RlLGluZGV4LG15aW5kZXgpIHsvL+aEj+WkluS5i+i0oiAgIOaYr+WTquS4quS9jee9rueahOWlluWKsSAgIOagvOWtkOiKgueCuSAgLy/ooYzmlbAgICDkvY3nva4gICBcclxuXHJcbiAgICAgICAgdGhpcy50eXBlPXR5cGUvL2lkXHJcbiAgICAgICAgdGhpcy5teW5vZGU9bXlub2RlLy/moLzlrZDnlYzpnaJcclxuICAgICAgICB0aGlzLmluZGV4PWluZGV4Ly/ooYzmlbBcclxuICAgICAgICB0aGlzLm15aW5kZXg9bXlpbmRleC8v5L2N572uXHJcbiAgICAgICAgXHJcbiAgICAgICAgXHJcbiAgICAgICAgbGV0IFByb3AxX0lEPVJvZ3VlSGV4YWdvblR5cGVzTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldFJvZ3VlUHJvcDFfSUQodGhpcy50eXBlKVxyXG4gICAgICAgIGxldCBQcm9wMV9TdW09Um9ndWVIZXhhZ29uVHlwZXNNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0Um9ndWVQcm9wMV9TdW0odGhpcy50eXBlKVxyXG4gICAgICAgIGxldCBpZXRtMT1Qcm9wTWFuYWdlci5nZXRJbnN0YW5jZSgpLmNyZWF0ZVByb3BJdGVtKFByb3AxX0lELFByb3AxX1N1bSk7XHJcbiAgICAgICAgaWV0bTEucGFyZW50PXRoaXMuaXRlbVswXVxyXG4gICAgICAgIGxldCBQcm9wMl9JRD1Sb2d1ZUhleGFnb25UeXBlc01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRSb2d1ZVByb3AyX0lEKHRoaXMudHlwZSlcclxuXHJcbiAgICAgICAgbGV0IGlldG0yPVByb3BNYW5hZ2VyLmdldEluc3RhbmNlKCkuY3JlYXRlUHJvcEl0ZW0oUHJvcDJfSUQsMSk7XHJcbiAgICAgICAgaWV0bTIucGFyZW50PXRoaXMuaXRlbVsxXVxyXG4gICAgfVxyXG4gICAgY2xpY2tCdG5TaG93KCl7Ly/noa7orqTmjInpkq5cclxuICAgICAgICBsZXQgUHJvcDFfSUQ9Um9ndWVIZXhhZ29uVHlwZXNNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0Um9ndWVQcm9wMV9JRCh0aGlzLnR5cGUpXHJcbiAgICAgICAgbGV0IFByb3AxX1N1bT1Sb2d1ZUhleGFnb25UeXBlc01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRSb2d1ZVByb3AxX1N1bSh0aGlzLnR5cGUpXHJcblxyXG4gICAgICAgIGxldCBQcm9wMl9JRD1Sb2d1ZUhleGFnb25UeXBlc01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRSb2d1ZVByb3AyX0lEKHRoaXMudHlwZSlcclxuICAgICAgICBsZXQgUHJvcDJfU3VtPVJvZ3VlSGV4YWdvblR5cGVzTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldFJvZ3VlUHJvcDJfU3VtKHRoaXMudHlwZSlcclxuICAgICAgICBsZXQgcmQ9SmFja3BvdE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRSZXdhcmREYXRhQnlJZChQcm9wMl9JRCk7XHJcblxyXG4gICAgICAgIGxldCBpZXRtMT1Qcm9wTWFuYWdlci5nZXRJbnN0YW5jZSgpLmNyZWF0ZVByb3BJdGVtKFByb3AxX0lELFByb3AxX1N1bSk7XHJcbiAgICAgICAgbGV0IGlldG0yPVByb3BNYW5hZ2VyLmdldEluc3RhbmNlKCkuY3JlYXRlUHJvcEl0ZW0ocmQucmV3YXJkX2lkLFByb3AyX1N1bSk7XHJcblxyXG4gICAgICAgIFByb3BNYW5hZ2VyLmdldEluc3RhbmNlKCkuY2hhbmdlUHJvcE51bShQcm9wMV9JRCxQcm9wMV9TdW0pO1xyXG4gICAgICAgIFByb3BNYW5hZ2VyLmdldEluc3RhbmNlKCkuY2hhbmdlUHJvcE51bShyZC5yZXdhcmRfaWQsUHJvcDJfU3VtKTtcclxuXHJcbiAgICAgICAgbGV0IG15aWV0bT1baWV0bTEsaWV0bTJdXHJcbiAgICAgICAgR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zaG93TXVsdGlwbGVHZXRUaXAobXlpZXRtKTtcclxuXHJcbiAgICAgICAgdGhpcy5teW5vZGUuZ2V0Q29tcG9uZW50KFZvaWRTY2VuZSkuUm93c251bWJlcj10aGlzLmluZGV4Ly/ooYzmlbBcclxuICAgICAgICB0aGlzLm15bm9kZS5nZXRDb21wb25lbnQoVm9pZFNjZW5lKS5Qb3NpdGlvbm51bWJlcj10aGlzLm15aW5kZXgvL+S9jee9ruaVsFxyXG4gICAgICAgIHRoaXMubXlub2RlLmdldENvbXBvbmVudChWb2lkU2NlbmUpLlJlZnJlc2goKVxyXG4gICAgICAgIC8vIHRoaXMubXlub2RlLmdldENvbXBvbmVudChWb2lkU2NlbmUpLmluaXRVaSh0aGlzLm15dHlwZSx0aGlzLmluZGV4LHRoaXMubXlpbmRleClcclxuICAgICAgICB0aGlzLmNsaWNrQnRuQ2xvc2UoKTtcclxuICAgIH1cclxuICAgIGNsaWNrQnRuQ2xvc2UoKS8v5YWz6ZetXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy5pdGVtWzBdLmNoaWxkcmVuWzBdLmRlc3Ryb3koKVxyXG4gICAgICAgIHRoaXMuaXRlbVsxXS5jaGlsZHJlblswXS5kZXN0cm95KClcclxuICAgICAgICBHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNvdW5kX21hbmFnZXIucGxheVNvdW5kKFNvdW5kSW5kZXguY2xpY2spO1xyXG4gICAgICAgIHRoaXMub25DbG9zZSgpO1xyXG4gICAgXHJcbiAgICB9XHJcbiAgICAvLyB1cGRhdGUgKGR0KSB7fVxyXG59XHJcbiJdfQ==